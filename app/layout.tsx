import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmb.ampwake.com";

export const metadata: Metadata = {
  title: {
    default: "Ampwake GMB Optimization India | Google Maps Ranking Service",
    template: "%s | Ampwake",
  },
  description:
    "Get your business ranked in the Top 3 on Google Maps with Ampwake's AI-powered Google Business Profile optimization, 100-point audit, review management, posts, photos, and ranking reports.",
  keywords:
    "GMB optimization India, Google My Business optimization, local SEO India, Google Maps ranking, Google Business Profile, Top 3 Google Maps, local SEO service India",
  authors: [{ name: "Ampwake" }],
  creator: "Ampwake",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Ampwake",
    title: "Ampwake GMB Optimization India | Google Maps Ranking Service",
    description:
      "AI-powered Google Business Profile optimization that helps local Indian businesses rank higher, get more calls, and win customers from Google Maps.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ampwake GMB Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ampwake GMB Optimization India",
    description: "Get your business into the Top 3 on Google Maps in 6 months or your money back.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://gmb.ampwake.com",
      name: "Ampwake",
      description:
        "AI-powered Google Business Profile optimization and local SEO service for Indian businesses.",
      url: "https://gmb.ampwake.com",
      telephone: "+91-84520-13047",
      email: "info@ampwake.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      areaServed: "IN",
      serviceType: "Google My Business Optimization",
      priceRange: "₹₹",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is GMB optimization?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Google My Business optimization is the process of improving every element of your business listing on Google so that Google ranks your business higher in local search results and Google Maps.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to rank in the Top 3?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients see measurable ranking improvements within 60-90 days. Our guarantee is Top 3 for the committed number of keywords within 6 months.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Top 3 guarantee mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your business does not reach Top 3 rankings for the guaranteed number of keywords within 6 months, we will continue working for free until it does — or refund your payment.",
          },
        },
      ],
    },
  ],
};

const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#060d1f]" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
