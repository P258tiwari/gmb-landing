"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const PLANS = [
  {
    id: "Starter",
    tagline: "For new & solo businesses",
    yearly: "₹15,000/year",
    monthly: "₹2,500/mo",
    keywords: 2,
    features: [
      "Full GMB profile optimization",
      "2 Google Posts/month",
      "Review responses",
      "5 keywords tracked",
      "Top 3 for 2 keywords in 6 months",
      "Quarterly ranking reports",
    ],
  },
  {
    id: "Growth",
    tagline: "For growing businesses",
    yearly: "₹20,000/year",
    monthly: "₹3,500/mo",
    keywords: 5,
    popular: true,
    features: [
      "Everything in Starter",
      "4 Google Posts/month",
      "Monthly ranking reports",
      "10 keywords tracked",
      "Top 3 for 5 keywords in 6 months",
      "Competitor tracking",
      "Phone support",
    ],
  },
  {
    id: "Max",
    tagline: "For established businesses",
    yearly: "₹30,000/year",
    monthly: "₹5,000/mo",
    keywords: 8,
    features: [
      "Everything in Growth",
      "6 Google Posts/month",
      "Weekly ranking reports",
      "10 keywords tracked",
      "Top 3 for 8 keywords in 6 months",
      "Dedicated account manager",
      "Quarterly strategy review",
    ],
  },
];

interface Props {
  recommended: "Starter" | "Growth" | "Max";
}

export default function RecommendedPlan({ recommended }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {PLANS.map((plan, i) => {
        const isRecommended = plan.id === recommended;
        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="relative rounded-2xl p-5 flex flex-col"
            style={
              isRecommended
                ? {
                    background:
                      "linear-gradient(145deg, rgba(0,40,20,0.9) 0%, rgba(0,12,5,0.95) 100%)",
                    border: "1px solid rgba(0,255,136,0.35)",
                    boxShadow: "0 0 40px rgba(0,255,136,0.08)",
                  }
                : {
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
            }
          >
            {isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                  style={{ background: "#00ff88", color: "#060d1f" }}
                >
                  <Star className="w-3 h-3 fill-current flex-shrink-0" />
                  Recommended for you
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-white font-bold text-lg">{plan.id}</p>
              <p className="text-[#8899bb] text-xs">{plan.tagline}</p>
            </div>

            <div className="mb-4">
              <span className="text-white text-2xl font-black">{plan.yearly}</span>
              <span className="text-[#8899bb] text-xs ml-2">or {plan.monthly}</span>
            </div>

            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-xs">
                  <Check
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: isRecommended ? "#00ff88" : "#4d9fff" }}
                  />
                  <span className="text-[#8899bb]">{f}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047"}?text=Hi%20Get%20Real%20Flow%2C%20I%27m%20interested%20in%20the%20${plan.id}%20plan.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                isRecommended
                  ? { background: "#00ff88", color: "#060d1f" }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "#8899bb",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              Choose {plan.id}
            </motion.a>
          </motion.div>
        );
      })}
    </div>
  );
}
