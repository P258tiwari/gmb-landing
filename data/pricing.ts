export interface PricingFeature {
  text: string;
  highlight?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  yearlyPrice: string;
  monthlyPrice?: string;
  monthlyMin?: string;
  popular?: boolean;
  guaranteeKeywords: number;
  features: PricingFeature[];
  cta: string;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For new & solo businesses",
    yearlyPrice: "₹15,000",
    monthlyPrice: "₹2,500/mo",
    monthlyMin: "min. 3 months",
    guaranteeKeywords: 2,
    features: [
      { text: "Complete 100-point GMB audit" },
      { text: "Full profile optimization (one-time)" },
      { text: "2 Google Posts / month" },
      { text: "Review responses" },
      { text: "Photos uploaded as needed" },
      { text: "Quarterly ranking reports" },
      { text: "5 keywords tracked" },
      { text: "Top 3 for 2 keywords in 6 months", highlight: true },
      { text: "Email support within 24 hours" },
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing businesses",
    yearlyPrice: "₹20,000",
    monthlyPrice: "₹3,500/mo",
    monthlyMin: "min. 3 months",
    popular: true,
    guaranteeKeywords: 5,
    features: [
      { text: "100-point audit + quarterly re-audit" },
      { text: "Full optimization + quarterly refresh" },
      { text: "4 Google Posts / month" },
      { text: "Proactive review generation + responses" },
      { text: "Photos uploaded as needed" },
      { text: "Monthly ranking reports" },
      { text: "10 keywords tracked" },
      { text: "Top 3 for 5 keywords in 6 months", highlight: true },
      { text: "Phone support" },
      { text: "Monthly competitor tracking" },
      { text: "10 local citations" },
    ],
    cta: "Choose Growth",
    badge: "Most Popular",
  },
  {
    id: "max",
    name: "Max",
    tagline: "For established businesses",
    yearlyPrice: "₹30,000",
    monthlyPrice: "₹5,000/mo",
    monthlyMin: "min. 3 months",
    guaranteeKeywords: 8,
    features: [
      { text: "100-point audit + strategy session" },
      { text: "Monthly full optimization updates" },
      { text: "6 Google Posts / month" },
      { text: "Aggressive review generation + responses" },
      { text: "Photos uploaded as needed (priority)" },
      { text: "Weekly ranking reports" },
      { text: "10 keywords tracked" },
      { text: "Top 3 for 8 keywords in 6 months", highlight: true },
      { text: "Priority phone support" },
      { text: "Dedicated account manager" },
      { text: "Weekly competitor tracking" },
      { text: "25 local citations" },
      { text: "Schema markup" },
      { text: "Call tracking setup" },
      { text: "Conversion optimization" },
      { text: "Quarterly strategy review" },
    ],
    cta: "Go Max",
    badge: "Best Results",
  },
];
