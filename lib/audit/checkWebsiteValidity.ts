import type { WebsiteValidityBreakdown } from "@/lib/audit/types";

const SOCIAL_OR_DIRECTORY =
  /facebook\.com|instagram\.com|twitter\.com|x\.com|linkedin\.com|justdial|sulekha|indiamart|magicbricks|99acres|practo\.com|booking\.com|zomato\.com|swiggy\.com|yelp\.com|tripadvisor|urbancompany\.com|housejoy\.in|google\.com\/maps/i;

export async function checkWebsiteValidity(
  website: string | null,
  businessName: string | null,
  category: string | null
): Promise<WebsiteValidityBreakdown> {
  if (!website) {
    return {
      score: 0,
      max: 10,
      websiteExists: false,
      websiteOpens: null,
      isGenericOrSocial: false,
      businessNameInMeta: false,
      fetchedTitle: null,
      fetchError: false,
      reason: "No website linked to this Google Business Profile.",
    };
  }

  const isGenericOrSocial = SOCIAL_OR_DIRECTORY.test(website);

  if (isGenericOrSocial) {
    return {
      score: 2,
      max: 10,
      websiteExists: true,
      websiteOpens: null,
      isGenericOrSocial: true,
      businessNameInMeta: false,
      fetchedTitle: null,
      fetchError: false,
      reason:
        "Website is linked to a third-party directory or social profile, not an owned domain. A dedicated business website provides significantly stronger authority and trust signals.",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(website, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timer);

    if (res.status >= 400) {
      return {
        score: 1,
        max: 10,
        websiteExists: true,
        websiteOpens: false,
        isGenericOrSocial: false,
        businessNameInMeta: false,
        fetchedTitle: null,
        fetchError: false,
        reason: `Website exists but returned HTTP ${res.status}. The page may be down, misconfigured, or blocking crawlers.`,
      };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      clearTimeout(timer);
      return {
        score: 6,
        max: 10,
        websiteExists: true,
        websiteOpens: true,
        isGenericOrSocial: false,
        businessNameInMeta: false,
        fetchedTitle: null,
        fetchError: false,
        reason:
          "Website opens successfully. Full title/meta verification not possible for this content type.",
      };
    }

    // Only read first 8KB to avoid large downloads
    const reader = res.body?.getReader();
    let html = "";
    if (reader) {
      let totalBytes = 0;
      while (totalBytes < 8192) {
        const { done, value } = await reader.read();
        if (done) break;
        html += new TextDecoder().decode(value);
        totalBytes += value.length;
      }
      reader.cancel();
    } else {
      html = await res.text();
    }

    const titleMatch = html.match(/<title[^>]*>([^<]{0,200})<\/title>/i);
    const fetchedTitle = titleMatch ? titleMatch[1].trim() : null;

    const metaDescMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{0,400})["']/i
    );
    const metaDesc = metaDescMatch?.[1] ?? "";
    const combined = `${fetchedTitle ?? ""} ${metaDesc}`.toLowerCase();

    const bizName = (businessName ?? "").toLowerCase();
    const nameParts = bizName
      .split(/[\s,]+/)
      .map((p) => p.replace(/[^a-z]/g, ""))
      .filter((p) => p.length > 3);

    const businessNameInMeta =
      nameParts.length > 0 && nameParts.some((p) => combined.includes(p));

    const cat = (category ?? "").toLowerCase().replace(/_/g, " ");
    const catParts = cat
      .split(/[\s_,]+/)
      .map((p) => p.replace(/[^a-z]/g, ""))
      .filter((p) => p.length > 3);
    const categoryInMeta =
      catParts.length > 0 && catParts.some((p) => combined.includes(p));

    if (businessNameInMeta || categoryInMeta) {
      return {
        score: 10,
        max: 10,
        websiteExists: true,
        websiteOpens: true,
        isGenericOrSocial: false,
        businessNameInMeta,
        fetchedTitle,
        fetchError: false,
        reason: `Website opens and ${businessNameInMeta ? "business name" : "category keyword"} found in page metadata. Strong owned-domain authority signal.`,
      };
    }

    return {
      score: 6,
      max: 10,
      websiteExists: true,
      websiteOpens: true,
      isGenericOrSocial: false,
      businessNameInMeta: false,
      fetchedTitle,
      fetchError: false,
      reason:
        "Website opens successfully but business name or category could not be confirmed in page metadata. Ensure your business name and primary service appear in the page title tag.",
    };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = (err as Error)?.name === "AbortError";
    return {
      score: 1,
      max: 10,
      websiteExists: true,
      websiteOpens: false,
      isGenericOrSocial: false,
      businessNameInMeta: false,
      fetchedTitle: null,
      fetchError: true,
      reason: isTimeout
        ? "Website could not be fully verified (request timed out after 5 seconds). A slow or inaccessible website can hurt user experience and local authority signals."
        : "Website could not be reached during the audit. Ensure the URL is correct and the site is publicly accessible.",
    };
  }
}
