import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.getrealflow.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/free-audit"],
      disallow: ["/api/", "/audit-report/", "/privacy-policy", "/terms-of-service", "/refund-policy"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
