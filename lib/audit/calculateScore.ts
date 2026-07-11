import type {
  PlaceData,
  ScoreBreakdown,
  TitleSignalBreakdown,
  ReviewStrengthBreakdown,
  PhotoStrengthBreakdown,
  ProfileCompletenessBreakdown,
  CategoryRelevanceBreakdown,
  WebsiteValidityBreakdown,
  BasicFinding,
  LockedFinding,
  Grade,
  FindingStatus,
  Impact,
} from "@/lib/audit/types";

export interface ScoreContext {
  submittedCategory?: string;
  submittedCity?: string;
}

export interface ScoreResult {
  totalScore: number;
  grade: Grade;
  scoreBreakdown: ScoreBreakdown;
  basicFindings: BasicFinding[];
  lockedFindings: LockedFinding[];
}

/* ── Generic types to exclude from category relevance ── */
const GENERIC_TYPES = new Set([
  "point_of_interest", "establishment", "premise", "geocode", "political",
  "locality", "administrative_area_level_1", "administrative_area_level_2",
  "sublocality", "sublocality_level_1", "sublocality_level_2", "country",
  "natural_feature", "neighborhood", "transit_station", "route",
  "street_address", "intersection", "colloquial_area",
]);

/* ── Stop words for title keyword extraction ── */
const STOP_WORDS = new Set([
  "best","near","me","in","at","the","and","of","for","with","shop","a","an",
  "by","from","to","is","are","was","were","be","been","having","have","has",
  "had","do","does","did","will","would","could","should","may","might","your",
  "our","their","its","this","that","we","you","he","she","it","they","my",
  "his","her","on","as","or","but","so","yet","nor","not","only","own","same",
  "than","too","very","just","then","once","ltd","pvt","inc","llp","co","dr",
  "mr","mrs","prof","the","&",
]);

/* ── Soft singular/plural match ── */
function softMatch(haystack: string, keyword: string): boolean {
  const kw = keyword.toLowerCase();
  if (haystack.includes(kw)) return true;
  if (kw.endsWith("s") && haystack.includes(kw.slice(0, -1))) return true;
  if (!kw.endsWith("s") && haystack.includes(kw + "s")) return true;
  return false;
}

/* ── Extract useful keywords from a title string ── */
export function extractTitleKeywords(title: string): string[] {
  return [
    ...new Set(
      title
        .split(/[\s\-,&|()\/\\+_.]+/)
        .map((w) => w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
        .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    ),
  ];
}

/* ── Extract category keywords from types + submitted category ── */
function extractCategoryKeywords(place: PlaceData, submittedCategory?: string): string[] {
  const sources: string[] = [];

  if (place.primaryCategory) {
    sources.push(place.primaryCategory.replace(/_/g, " ").toLowerCase());
  }
  for (const t of place.types) {
    if (!GENERIC_TYPES.has(t.toLowerCase())) {
      sources.push(t.replace(/_/g, " ").toLowerCase());
    }
  }
  if (submittedCategory) {
    sources.push(submittedCategory.toLowerCase());
  }

  const keywords: string[] = [];
  for (const src of sources) {
    const words = src
      .split(/[\s\-_,&|()]+/)
      .map((w) => w.replace(/[^a-z]/g, "").trim())
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
    keywords.push(...words);
    const phrase = src.replace(/[^a-z\s]/g, "").trim();
    if (phrase.includes(" ") && phrase.length > 3) {
      keywords.push(phrase);
    }
  }

  return [...new Set(keywords)];
}

/* ── Extract location terms from address + submitted city ── */
function extractLocationTerms(place: PlaceData, submittedCity?: string): string[] {
  const terms: string[] = [];

  if (submittedCity?.trim()) {
    terms.push(submittedCity.trim().toLowerCase());
  }

  if (place.formattedAddress) {
    const skip = new Set([
      "india", "pakistan", "usa", "uk", "united states", "united kingdom",
      "australia", "canada", "uae", "emirates",
    ]);
    const parts = place.formattedAddress
      .split(",")
      .map((p) => p.trim().toLowerCase())
      .filter(
        (p) =>
          p.length > 2 &&
          !/^\d+$/.test(p) &&
          !/^\d{3,}.*/.test(p) &&
          !skip.has(p)
      );
    terms.push(...parts);
  }

  return [...new Set(terms)].filter((t) => t.length > 2);
}

/* ══════════════════════════════════════════════════════
   1. Business Title Signal  (max 25 pts)
   ══════════════════════════════════════════════════════ */
function calcTitleSignal(
  place: PlaceData,
  catKeywords: string[],
  locTerms: string[]
): TitleSignalBreakdown {
  const title = place.businessName ?? "";
  const titleLength = title.length;
  const titleLower = title.toLowerCase();

  // A. Title length — 8 pts
  const titleLengthScore =
    titleLength === 0 ? 0
    : titleLength >= 80 ? 8
    : titleLength >= 60 ? 7
    : titleLength >= 45 ? 5
    : titleLength >= 30 ? 3
    : 0;

  // B. Category/business keyword match — 7 pts
  const categoryKeywords = catKeywords.filter((kw) => softMatch(titleLower, kw));
  const categoryKeywordScore =
    categoryKeywords.length >= 3 ? 7
    : categoryKeywords.length === 2 ? 5
    : categoryKeywords.length === 1 ? 3
    : 0;

  // C. Location keyword in title — 5 pts
  let locationKeyword: string | null = null;
  let locationKeywordScore = 0;

  for (const loc of locTerms) {
    if (loc.length > 2 && titleLower.includes(loc)) {
      locationKeyword = loc;
      locationKeywordScore = 5;
      break;
    }
  }
  if (locationKeywordScore === 0) {
    for (const loc of locTerms) {
      const locWords = loc.split(/\s+/).filter((w) => w.length > 3);
      if (locWords.length > 0 && locWords.some((w) => titleLower.includes(w))) {
        locationKeyword = loc;
        locationKeywordScore = 3;
        break;
      }
    }
  }

  // D. Marketing intent keywords — 5 pts
  const MARKETING_TERMS = [
    "best", "top", "trusted", "affordable", "premium", "expert",
    "specialist", "near me", "number one", "no 1", "no.1", "#1", "no1",
  ];
  const marketingIntentKeywords = MARKETING_TERMS.filter((t) => titleLower.includes(t));
  const marketingIntentScore =
    marketingIntentKeywords.length >= 2 ? 5 : marketingIntentKeywords.length === 1 ? 3 : 0;

  const extractedTitleKeywords = extractTitleKeywords(title);
  const score = Math.min(
    25,
    titleLengthScore + categoryKeywordScore + locationKeywordScore + marketingIntentScore
  );

  let reason: string;
  if (titleLength === 0) {
    reason = "Business name not detected on the public profile.";
  } else if (titleLength < 30) {
    reason = `Your business title is very short (${titleLength} characters). Short titles miss important service and location context that affect keyword signals.`;
  } else if (titleLength < 60) {
    reason = `Your business title is ${titleLength} characters. Profiles with richer, more descriptive titles tend to show stronger keyword signals. ${categoryKeywords.length} category signal(s) detected.`;
  } else {
    reason = `Business title is ${titleLength} characters with ${categoryKeywords.length} category signal(s) and ${locationKeyword ? "a location signal" : "no location signal"} detected.`;
  }

  return {
    score,
    max: 25,
    title: place.businessName,
    titleLength,
    titleLengthScore,
    allCategoryKeywords: catKeywords,
    categoryKeywords,
    categoryKeywordScore,
    allLocationTerms: locTerms,
    locationKeyword,
    locationKeywordScore,
    marketingIntentScore,
    marketingIntentKeywords,
    extractedTitleKeywords,
    reason,
  };
}

/* ══════════════════════════════════════════════════════
   2. Rating & Review Power  (max 30 pts)
   ══════════════════════════════════════════════════════ */
function calcReviewStrength(place: PlaceData): ReviewStrengthBreakdown {
  const rating = place.rating ?? 0;
  const count = place.reviewCount ?? 0;
  const belowVolumeGate = count < 50;

  // A. Rating score — 12 pts (gated to 3 if count < 50)
  let ratingScore: number;
  if (!place.rating) {
    ratingScore = 0;
  } else if (belowVolumeGate) {
    ratingScore =
      rating >= 4.7 ? 3
      : rating >= 4.3 ? 2
      : rating >= 4.1 ? 1
      : 0;
  } else {
    ratingScore =
      rating >= 4.7 ? 12
      : rating >= 4.5 ? 10
      : rating >= 4.3 ? 8
      : rating >= 4.2 ? 5
      : rating >= 4.1 ? 3
      : 0;
  }

  // B. Review count score — 15 pts (0 if < 50)
  const reviewCountScore =
    !place.reviewCount ? 0
    : count >= 500 ? 15
    : count >= 300 ? 13
    : count >= 150 ? 10
    : count >= 100 ? 8
    : count >= 50  ? 5
    : 0;

  // C. Recent reviews — 3 pts
  const recentReviewScore =
    place.recentReviewCount >= 5 ? 3
    : place.recentReviewCount >= 3 ? 2
    : place.recentReviewCount >= 1 ? 1
    : 0;

  const rawScore = ratingScore + reviewCountScore + recentReviewScore;
  const score = belowVolumeGate ? Math.min(7, rawScore) : Math.min(30, rawScore);

  let reason: string;
  if (!place.rating) {
    reason =
      "No public rating found. Rating and review data are the single most impactful ranking and trust factors on Google Maps.";
  } else if (belowVolumeGate) {
    reason = `Review volume is below the minimum trust threshold (${count} reviews). A high rating with fewer than 50 reviews has limited ranking and conversion strength. Focus on building review volume urgently.`;
  } else if (rating < 4.1) {
    reason = `Rating of ${rating.toFixed(1)} is below the competitive threshold. Improving to 4.3+ is the highest-impact single change available.`;
  } else if (count < 150) {
    reason = `Rating ${rating.toFixed(1)} with ${count} reviews. Aim for 150+ reviews for strong competitive local ranking.`;
  } else {
    reason = `Strong review signals: ${rating.toFixed(1)} rating with ${count} reviews.`;
  }

  return {
    score,
    max: 30,
    belowVolumeGate,
    ratingScore,
    reviewCountScore,
    recentReviewScore,
    reason,
  };
}

/* ══════════════════════════════════════════════════════
   3. Photo Strength  (max 15 pts)
   ══════════════════════════════════════════════════════ */
function calcPhotoStrength(place: PlaceData): PhotoStrengthBreakdown {
  const photoCount = place.photosCount;

  const score =
    photoCount >= 100 ? 15
    : photoCount >= 75  ? 13
    : photoCount >= 50  ? 11
    : photoCount >= 10  ? 8
    : 0;

  const reason =
    photoCount === 0
      ? "No publicly visible photos detected. Profiles without photos receive significantly fewer clicks and engagement."
      : photoCount < 10
      ? `Only ${photoCount} photo(s) detected — below the 10-photo minimum threshold. Photo score is 0 until this threshold is met.`
      : photoCount < 50
      ? `${photoCount} photos detected — meets the minimum. Aim for 50+ including interior, exterior, team, and service shots.`
      : photoCount < 100
      ? `${photoCount} photos — good presence. Aim for 100+ for maximum engagement signals.`
      : `Strong photo presence (${photoCount} detected). Google's public API may show limited photo data; full media audit available in paid report.`;

  return { score, max: 15, photoCount, reason };
}

/* ══════════════════════════════════════════════════════
   4. Profile Completeness  (max 10 pts)
   ══════════════════════════════════════════════════════ */
function calcProfileCompleteness(place: PlaceData): ProfileCompletenessBreakdown {
  const hasAddress = !!place.formattedAddress;
  const hasPhone = !!place.phoneNumber;
  const hasWebsite = !!place.website;
  const hasHours = place.hasOpeningHours;
  const isOperational = place.businessStatus === "OPERATIONAL";

  const score = Math.min(
    10,
    (hasAddress ? 2 : 0) +
    (hasPhone ? 2 : 0) +
    (hasWebsite ? 2 : 0) +
    (hasHours ? 2 : 0) +
    (isOperational ? 2 : 0)
  );

  const missing: string[] = [];
  if (!hasAddress) missing.push("address");
  if (!hasPhone) missing.push("phone number");
  if (!hasWebsite) missing.push("website");
  if (!hasHours) missing.push("opening hours");
  if (!isOperational) missing.push("operational status");

  const reason =
    score === 10
      ? "All basic profile signals present. Customers can call, visit, and navigate directly from search."
      : missing.length > 0
      ? `Missing or incomplete: ${missing.join(", ")}. Each gap reduces direct contact from Google Search and Maps.`
      : "Partial profile completeness.";

  return {
    score,
    max: 10,
    hasAddress,
    hasPhone,
    hasWebsite,
    hasHours,
    isOperational,
    reason,
  };
}

/* ══════════════════════════════════════════════════════
   5. Category Relevance & Depth  (max 10 pts)
   ══════════════════════════════════════════════════════ */
function calcCategoryRelevance(place: PlaceData): CategoryRelevanceBreakdown {
  const primaryCategoryScore = place.primaryCategory ? 3 : 0;

  const relevantTypes = place.types.filter(
    (t) => !GENERIC_TYPES.has(t.toLowerCase())
  );
  const additionalTypes = relevantTypes.filter(
    (t) => t.toLowerCase() !== (place.primaryCategory ?? "").toLowerCase()
  );
  const relevantTypeCount = additionalTypes.length;

  const additionalDepthScore =
    relevantTypeCount >= 6 ? 4
    : relevantTypeCount >= 4 ? 3
    : relevantTypeCount >= 2 ? 1
    : 0;

  let consistencyScore = 0;
  if (place.primaryCategory && relevantTypes.length > 0) {
    const primaryWords = place.primaryCategory
      .toLowerCase()
      .replace(/_/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3);

    if (primaryWords.length > 0) {
      const matchCount = relevantTypes.filter((t) => {
        const typeWords = t.toLowerCase().replace(/_/g, " ").split(/\s+/);
        return primaryWords.some((pw) =>
          typeWords.some((tw) => tw.includes(pw) || pw.includes(tw))
        );
      }).length;
      const ratio = matchCount / relevantTypes.length;
      consistencyScore = ratio >= 0.6 ? 3 : ratio >= 0.3 ? 1 : 0;
    } else {
      consistencyScore = relevantTypes.length > 0 ? 1 : 0;
    }
  }

  const score = Math.min(10, primaryCategoryScore + additionalDepthScore + consistencyScore);

  const reason =
    !place.primaryCategory
      ? "Primary category not detected. Category is the strongest single ranking signal on Google Maps."
      : relevantTypeCount < 2
      ? `Primary category set (${place.primaryCategory}), but only ${relevantTypeCount} additional type(s) detected. More relevant types improve search query coverage.`
      : relevantTypeCount < 6
      ? `${relevantTypeCount} relevant types detected alongside primary category. Aim for 6+ to maximise search query coverage.`
      : `Strong category depth: ${relevantTypeCount} relevant types alongside primary category "${place.primaryCategory}".`;

  return {
    score,
    max: 10,
    primaryType: place.primaryCategory,
    primaryCategoryScore,
    relevantTypeCount,
    additionalDepthScore,
    consistencyScore,
    reason,
  };
}

/* ══════════════════════════════════════════════════════
   Findings builder — 17 rows, no locked rows
   ══════════════════════════════════════════════════════ */
const CTA = "Connect to Improve";
const TIP = "Get the improvement plan by connecting with Get Real Flow.";

function finding(
  key: string,
  label: string,
  currentValue: string | null,
  status: FindingStatus,
  impact: Impact,
  note: string,
  showTip: boolean,
  scoreContribution: string
): BasicFinding {
  return {
    key,
    label,
    currentValue,
    status,
    impact,
    note,
    tip: showTip ? TIP : null,
    ctaText: showTip ? CTA : "",
    scoreContribution,
  };
}

function buildFindings(
  place: PlaceData,
  title: TitleSignalBreakdown,
  reviews: ReviewStrengthBreakdown,
  photos: PhotoStrengthBreakdown,
  profile: ProfileCompletenessBreakdown,
  category: CategoryRelevanceBreakdown,
  website: WebsiteValidityBreakdown
): BasicFinding[] {
  return [
    /* ── 1. Business Title Length ── */
    finding(
      "titleLength",
      "Business Title Length",
      title.titleLength > 0 ? `${title.titleLength} characters` : "Not detected",
      title.titleLength === 0 ? "missing"
        : title.titleLength >= 60 ? "good"
        : "needs_work",
      "High",
      title.titleLength === 0
        ? "Business name not detected on this public profile."
        : title.titleLength < 30
        ? `Your business title is very short (${title.titleLength} characters). Short titles miss important service and location context that affect keyword signals.`
        : title.titleLength < 60
        ? `Your business title is ${title.titleLength} characters, below the 60+ character signal threshold. Profiles with more descriptive titles show stronger keyword signals across search.`
        : `Business title is ${title.titleLength} characters — meets the keyword signal threshold.`,
      title.titleLength < 60,
      `${title.titleLengthScore} / 8 pts`
    ),

    /* ── 2. Title Business Keywords ── */
    finding(
      "titleCategoryKeywords",
      "Title Business Keywords",
      title.categoryKeywords.length > 0
        ? `${title.categoryKeywords.length} keyword(s) matched: ${title.categoryKeywords.slice(0, 3).join(", ")}`
        : "No category keywords found in title",
      title.categoryKeywordScore >= 7 ? "good"
        : title.categoryKeywordScore >= 3 ? "needs_work"
        : "missing",
      "High",
      title.categoryKeywords.length === 0
        ? "No business or category keywords detected in your title. Category keyword signals help Google understand what your business offers."
        : title.categoryKeywords.length < 3
        ? `${title.categoryKeywords.length} category keyword(s) found in title. Stronger category alignment improves relevance for more related searches.`
        : `${title.categoryKeywords.length} category keyword(s) detected in title — good signal breadth.`,
      title.categoryKeywordScore < 7,
      `${title.categoryKeywordScore} / 7 pts`
    ),

    /* ── 3. Title Location Signal ── */
    finding(
      "titleLocationSignal",
      "Title Location Signal",
      title.locationKeyword ? `"${title.locationKeyword}" detected` : "No location signal found",
      title.locationKeywordScore >= 5 ? "good"
        : title.locationKeywordScore >= 3 ? "needs_work"
        : "missing",
      "High",
      title.locationKeyword
        ? `Location signal "${title.locationKeyword}" found in business title. Local keywords improve proximity relevance in search.`
        : "No city or location signal detected in your business title. Location keywords in the title help Google associate your profile with local searches.",
      !title.locationKeyword,
      `${title.locationKeywordScore} / 5 pts`
    ),

    /* ── 4. Title Marketing Intent Keywords ── */
    finding(
      "titleMarketingIntent",
      "Title Marketing Intent Keywords",
      title.marketingIntentKeywords.length > 0
        ? title.marketingIntentKeywords.slice(0, 3).join(", ")
        : "No intent keywords found",
      title.marketingIntentScore >= 5 ? "good"
        : title.marketingIntentScore >= 3 ? "needs_work"
        : "missing",
      "Medium",
      title.marketingIntentKeywords.length === 0
        ? "No marketing intent keywords detected in your title. Intent signals like 'trusted', 'specialist', or 'expert' can improve click-through rates from search results."
        : title.marketingIntentKeywords.length === 1
        ? `"${title.marketingIntentKeywords[0]}" found in title. Profiles with 2+ intent signals tend to show stronger conversion performance.`
        : `Multiple intent keywords detected: ${title.marketingIntentKeywords.join(", ")} — good conversion signal.`,
      title.marketingIntentScore < 5,
      `${title.marketingIntentScore} / 5 pts`
    ),

    /* ── 5. Rating Quality ── */
    finding(
      "ratingQuality",
      "Rating Quality",
      place.rating ? `${place.rating.toFixed(1)} ★` : "No rating yet",
      !place.rating ? "missing"
        : place.rating >= 4.5 ? "good"
        : place.rating >= 4.0 ? "needs_work"
        : "missing",
      "High",
      !place.rating
        ? "No public rating yet. Getting even 5 honest reviews will start improving your Google Maps visibility."
        : reviews.belowVolumeGate
        ? `Rating is ${place.rating.toFixed(1)} ★ but with only ${place.reviewCount} reviews, the ranking impact is severely limited. Review volume must reach 50+ before rating carries full weight.`
        : place.rating >= 4.7
        ? `${place.rating.toFixed(1)} ★ — excellent rating. Maintain it by collecting reviews consistently.`
        : place.rating >= 4.3
        ? `${place.rating.toFixed(1)} ★ — good. Pushing to 4.7+ unlocks significantly stronger ranking performance.`
        : `${place.rating.toFixed(1)} ★ — below the competitive threshold. Improving to 4.5+ is a top priority.`,
      reviews.ratingScore < 12,
      `${reviews.ratingScore} / 12 pts`
    ),

    /* ── 6. Review Count ── */
    finding(
      "reviewCount",
      "Review Count",
      place.reviewCount !== null ? `${place.reviewCount} reviews` : "No reviews",
      (place.reviewCount ?? 0) >= 100 ? "good"
        : (place.reviewCount ?? 0) >= 50 ? "needs_work"
        : "missing",
      "High",
      (place.reviewCount ?? 0) === 0
        ? "No reviews found. Getting your first 10 reviews is the single highest-impact action you can take right now."
        : (place.reviewCount ?? 0) < 50
        ? `Only ${place.reviewCount} reviews — below the 50-review trust threshold. Review volume matters as much as rating quality for local ranking.`
        : (place.reviewCount ?? 0) < 150
        ? `${place.reviewCount} reviews — decent, but 150+ is the threshold for strong competitive local ranking.`
        : `${place.reviewCount} reviews — strong review volume.`,
      (place.reviewCount ?? 0) < 100,
      `${reviews.reviewCountScore} / 15 pts`
    ),

    /* ── 7. Recent Review Activity ── */
    finding(
      "recentReviews",
      "Recent Review Activity",
      place.recentReviewCount > 0
        ? `${place.recentReviewCount} recent review(s) detected`
        : "No recent reviews available",
      place.recentReviewCount >= 5 ? "good"
        : place.recentReviewCount >= 3 ? "needs_work"
        : "missing",
      "Medium",
      place.recentReviewCount === 0
        ? "No recent review data available. Google favours profiles that receive reviews consistently — review freshness is an active ranking signal."
        : place.recentReviewCount < 3
        ? `${place.recentReviewCount} recent review(s) detected. Aim for consistent review frequency to maintain freshness signals.`
        : `${place.recentReviewCount} recent reviews detected — good review freshness signal.`,
      place.recentReviewCount < 5,
      `${reviews.recentReviewScore} / 3 pts`
    ),

    /* ── 8. Photo Count ── */
    finding(
      "photoCount",
      "Photo Count",
      place.photosCount > 0 ? `${place.photosCount} photos detected` : "No photos detected",
      photos.score >= 11 ? "good"
        : photos.score >= 8 ? "needs_work"
        : "missing",
      "Medium",
      photos.reason,
      photos.score < 11,
      `${photos.score} / 15 pts`
    ),

    /* ── 9. Address Availability ── */
    finding(
      "addressAvailability",
      "Address Availability",
      place.formattedAddress ?? "Not available",
      profile.hasAddress ? "good" : "missing",
      "Medium",
      profile.hasAddress
        ? "Business address is publicly visible on your Google Maps profile."
        : "Address is not publicly visible. A complete address enables map directions and improves local trust.",
      !profile.hasAddress,
      `${profile.hasAddress ? 2 : 0} / 2 pts`
    ),

    /* ── 10. Phone Availability ── */
    finding(
      "phoneAvailability",
      "Phone Availability",
      place.phoneNumber ?? "Not available",
      profile.hasPhone ? "good" : "missing",
      "High",
      profile.hasPhone
        ? "Phone number is publicly listed. Customers can call directly from Google Maps and Search."
        : "No phone number detected. A missing phone number prevents direct calls from Google Maps and Search results.",
      !profile.hasPhone,
      `${profile.hasPhone ? 2 : 0} / 2 pts`
    ),

    /* ── 11. Website Availability ── */
    finding(
      "websiteAvailability",
      "Website Availability",
      place.website ?? "No website linked",
      profile.hasWebsite ? "good" : "missing",
      "High",
      profile.hasWebsite
        ? "Website is linked to the profile."
        : "No website linked. A website significantly improves authority signals and click-through from search results.",
      !profile.hasWebsite,
      `${profile.hasWebsite ? 2 : 0} / 2 pts`
    ),

    /* ── 12. Website Validity ── */
    finding(
      "websiteValidity",
      "Website Validity",
      !website.websiteExists ? "No website"
        : website.fetchedTitle ? website.fetchedTitle.slice(0, 64)
        : website.isGenericOrSocial ? "Third-party / directory link"
        : website.websiteOpens === false ? "Could not be reached"
        : "Website opens",
      !website.websiteExists ? "missing"
        : website.score >= 8 ? "good"
        : website.score >= 4 ? "needs_work"
        : "missing",
      "High",
      website.reason,
      website.score < 8,
      `${website.score} / 10 pts`
    ),

    /* ── 13. Opening Hours ── */
    finding(
      "openingHours",
      "Opening Hours",
      profile.hasHours ? "Hours are set" : "Hours not set",
      profile.hasHours ? "good" : "missing",
      "Medium",
      profile.hasHours
        ? "Business hours are set on the profile. Customers and Google can see when you are open."
        : "Opening hours are not set. Profiles with hours appear in time-filtered searches and score higher for trust signals.",
      !profile.hasHours,
      `${profile.hasHours ? 2 : 0} / 2 pts`
    ),

    /* ── 14. Business Status ── */
    finding(
      "businessStatus",
      "Business Status",
      place.businessStatus ?? "Unknown",
      profile.isOperational ? "good" : "needs_work",
      "Low",
      profile.isOperational
        ? "Business status shows as OPERATIONAL — Google confirms this business is active."
        : `Business status is "${place.businessStatus ?? "unknown"}". Non-operational status can significantly suppress profile visibility.`,
      !profile.isOperational,
      `${profile.isOperational ? 2 : 0} / 2 pts`
    ),

    /* ── 15. Primary Category ── */
    finding(
      "primaryCategory",
      "Primary Category",
      category.primaryType ?? "Not detected",
      category.primaryType ? "good" : "missing",
      "High",
      category.primaryType
        ? `Primary category is set to "${category.primaryType}". This is the strongest single ranking signal on Google Maps.`
        : "Primary category not detected. Setting the correct primary category is the single most impactful ranking action available.",
      !category.primaryType,
      `${category.primaryCategoryScore} / 3 pts`
    ),

    /* ── 16. Additional Category Depth ── */
    finding(
      "categoryDepth",
      "Additional Category Depth",
      `${category.relevantTypeCount} relevant type(s) detected`,
      category.additionalDepthScore >= 4 ? "good"
        : category.additionalDepthScore >= 1 ? "needs_work"
        : "missing",
      "Medium",
      category.relevantTypeCount === 0
        ? "No relevant additional types detected. Profiles with 6+ types rank for a broader range of search queries."
        : category.relevantTypeCount < 4
        ? `Only ${category.relevantTypeCount} relevant type(s) detected. Aim for 6+ to maximise search coverage.`
        : `${category.relevantTypeCount} relevant types detected — good category depth.`,
      category.additionalDepthScore < 4,
      `${category.additionalDepthScore} / 4 pts`
    ),

    /* ── 17. Category Consistency ── */
    finding(
      "categoryConsistency",
      "Category Consistency",
      !category.primaryType ? "No primary category"
        : category.consistencyScore === 3 ? "Categories are consistent"
        : category.consistencyScore === 1 ? "Partially consistent"
        : "Low consistency",
      !category.primaryType ? "missing"
        : category.consistencyScore === 3 ? "good"
        : "needs_work",
      "Low",
      !category.primaryType
        ? "No primary category set — consistency cannot be checked."
        : category.consistencyScore === 3
        ? "Profile categories appear consistent with your primary business type."
        : category.consistencyScore === 1
        ? "Category types are partially consistent with your primary category. Mixed signals can dilute Google's relevance classification."
        : "Category types appear inconsistent with the primary category. This can weaken your ranking relevance for core searches.",
      category.consistencyScore < 3 && !!category.primaryType,
      `${category.consistencyScore} / 3 pts`
    ),
  ];
}

/* ══════════════════════════════════════════════════════
   Main export
   ══════════════════════════════════════════════════════ */
export function calculateScore(
  place: PlaceData,
  context: ScoreContext,
  websiteValidity: WebsiteValidityBreakdown
): ScoreResult {
  const catKeywords = extractCategoryKeywords(place, context.submittedCategory);
  const locTerms = extractLocationTerms(place, context.submittedCity);

  const titleBreakdown = calcTitleSignal(place, catKeywords, locTerms);
  const reviewBreakdown = calcReviewStrength(place);
  const photoBreakdown = calcPhotoStrength(place);
  const profileBreakdown = calcProfileCompleteness(place);
  const categoryBreakdown = calcCategoryRelevance(place);

  const scoreBreakdown: ScoreBreakdown = {
    titleSignal: titleBreakdown,
    reviewStrength: reviewBreakdown,
    photoStrength: photoBreakdown,
    profileCompleteness: profileBreakdown,
    categoryRelevance: categoryBreakdown,
    websiteValidity,
  };

  // 6 sections sum to max 100 — no normalization needed
  const totalScore =
    titleBreakdown.score +
    reviewBreakdown.score +
    photoBreakdown.score +
    profileBreakdown.score +
    categoryBreakdown.score +
    websiteValidity.score;

  const grade: Grade =
    totalScore >= 85 ? "Strong"
    : totalScore >= 70 ? "Good"
    : totalScore >= 50 ? "Needs Optimization"
    : "Visibility Risk";

  const basicFindings = buildFindings(
    place,
    titleBreakdown,
    reviewBreakdown,
    photoBreakdown,
    profileBreakdown,
    categoryBreakdown,
    websiteValidity
  );

  const lockedFindings: LockedFinding[] = [];

  return { totalScore, grade, scoreBreakdown, basicFindings, lockedFindings };
}
