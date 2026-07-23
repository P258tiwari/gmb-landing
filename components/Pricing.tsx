"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Crown, Info, Sparkles } from "lucide-react";
import { pricingPlans } from "@/data/pricing";

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [billing, setBilling] = useState<"yearly" | "monthly">("yearly");

  const handleCTA = () => {
    document.querySelector("#final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#f8fafd" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 60%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(77,159,255,0.3)] bg-[rgba(77,159,255,0.06)] mb-4"
          >
            <span className="text-[#4d9fff] text-xs font-medium">Transparent Pricing</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-3"
          >
            One plan. Full focus.{" "}
            <span className="text-gradient-neon">Real rankings.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#8899bb] text-base max-w-2xl mx-auto mb-8"
          >
            Pick the plan that matches where your business is today. Upgrade anytime.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            {(["yearly", "monthly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: billing === b ? "#2478e5" : "transparent",
                  color: billing === b ? "#ffffff" : "#5f6368",
                }}
              >
                {b === "yearly" ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Yearly — Best Value
                  </span>
                ) : "Monthly"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* GST note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs text-[#8899bb]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-[#00ff88] font-semibold whitespace-nowrap">GST extra:</span>
            <span className="whitespace-nowrap">All prices excl. GST (18%). Added at checkout.</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 transition-transform duration-200"
              style={
                plan.popular
                  ? {
                      background: "linear-gradient(145deg, #ffffff 0%, #f3f8ff 100%)",
                      border: "2px solid #4285f4",
                      boxShadow: "0 10px 32px rgba(66,133,244,0.16)",
                    }
                  : {
                      background: "#ffffff",
                      border: "1px solid #dadce0",
                    }
              }
            >
              {/* Top accent line for popular */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{
                  background: "linear-gradient(90deg, transparent, #2478e5, transparent)"
                }} />
              )}

              {/* Plan header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      {plan.id === "max" && <Crown className="w-4 h-4 text-[#00ff88]" />}
                    </div>
                    <p className="text-[#8899bb] text-xs">{plan.tagline}</p>
                  </div>
                  {plan.badge && (
                    <div
                      className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{
                        background: plan.popular ? "#2478e5" : "rgba(77,159,255,0.15)",
                        color: plan.popular ? "#ffffff" : "#1b63c3",
                      }}
                    >
                      {plan.popular && <Star className="w-2.5 h-2.5 fill-current" />}
                      {plan.badge}
                    </div>
                  )}
                </div>

                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing + plan.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {billing === "yearly" || !plan.monthlyPrice ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-white">{plan.yearlyPrice}</span>
                          <span className="text-[#8899bb] text-sm">/year</span>
                        </div>
                        <div className="text-[#8899bb] text-xs mt-1">Billed annually · excl. GST</div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-white">{plan.monthlyPrice}</span>
                        </div>
                        <div className="text-[#8899bb] text-xs mt-1">{plan.monthlyMin} · excl. GST</div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Guarantee chip */}
                <div
                  className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{
                    background: "rgba(36,120,229,0.08)",
                    border: "1px solid rgba(36,120,229,0.2)",
                  }}
                >
                  <Zap className="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" />
                  <span className="text-[11px] text-[#00ff88] font-medium flex-1">
                    Top 3 for {plan.guaranteeKeywords} keywords in 6 months
                  </span>
                  {/* Info icon with tooltip */}
                  <div className="relative group flex-shrink-0">
                    <Info className="w-3.5 h-3.5 text-[#00ff88]/60 cursor-pointer hover:text-[#00ff88] transition-colors" />
                    <div
                      className="absolute bottom-full right-0 mb-2 w-56 px-3 py-2 rounded-lg text-[11px] leading-relaxed text-[#8899bb] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                      style={{
                        background: "#0a1628",
                        border: "1px solid rgba(0,255,136,0.25)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      <span className="text-[#00ff88] font-semibold block mb-1">Money-back guarantee</span>
                      If your business doesn&apos;t reach Top 3 for the committed keywords within 6 months, we work for free until it does — or refund you fully.
                      {/* Arrow */}
                      <div
                        className="absolute top-full right-2 w-0 h-0"
                        style={{
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid rgba(0,255,136,0.25)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature list */}
              <div className="p-6 flex-1">
                <p className="text-[#8899bb] text-[10px] uppercase tracking-widest font-semibold mb-3">What&apos;s included</p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: feature.highlight ? "#2478e5" : "#4d9fff" }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: feature.highlight ? "#1b63c3" : "#5f6368", fontWeight: feature.highlight ? 600 : 400 }}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleCTA}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.97]"
                  style={
                    plan.popular
                      ? { background: "#2478e5", color: "#ffffff", boxShadow: "0 10px 24px rgba(36,120,229,0.2)" }
                      : { border: "1px solid #9fc5ff", color: "#123f80", background: "#ffffff" }
                  }
                >
                  {plan.cta} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[#8899bb]/50 text-xs">
          Yearly and monthly are separate options — you choose one at signup. No hidden fees.
        </p>
      </div>
    </section>
  );
}
