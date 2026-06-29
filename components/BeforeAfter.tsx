"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, Phone, Navigation2, Star, TrendingUp, ArrowRight, ArrowDown } from "lucide-react";

const beforeItems = [
  { text: "Rank #14 on Google Maps" },
  { text: "Incomplete business profile" },
  { text: "No recent posts or updates" },
  { text: "Unanswered customer reviews" },
  { text: "Only 2 calls per month" },
];

const afterItems = [
  { text: "Top 3 ranking on Google Maps" },
  { text: "100% fully optimized profile" },
  { text: "Fresh posts every week" },
  { text: "Proactive review management" },
  { text: "10x calls increase" },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="before-after"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#060d1f" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(0,255,136,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-5"
          >
            <TrendingUp className="w-3 h-3 text-[#00ff88]" />
            <span className="text-[#00ff88] text-xs font-medium">Real Transformation</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white"
          >
            From invisible to{" "}
            <span className="text-gradient-neon">searchable.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="mt-4 text-[#8899bb] text-base max-w-md mx-auto"
          >
            See exactly what changes when Ampwake optimizes your Google Business Profile.
          </motion.p>
        </div>

        {/* ── Side-by-side row ── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4">

          {/* ── BEFORE card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(35,8,8,0.95) 0%, rgba(12,3,3,0.98) 100%)",
              border: "1px solid rgba(239,68,68,0.22)",
            }}
          >
            {/* Label bar */}
            <div
              className="px-5 py-3 flex items-center gap-2 border-b"
              style={{ borderColor: "rgba(239,68,68,0.12)" }}
            >
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
                Before Ampwake
              </span>
            </div>

            {/* Fake Maps result */}
            <div className="mx-4 mt-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-[#8899bb]">
                  14
                </div>
                <span className="text-[#8899bb] text-sm font-medium">Your Business</span>
                <span className="ml-auto text-[10px] text-red-400 font-semibold">Not in Top 10</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < 2 ? "text-yellow-400 fill-current" : "text-white/10"}`}
                  />
                ))}
                <span className="text-[10px] text-[#8899bb] ml-1.5">3.2 · 8 reviews</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 py-2 rounded-lg bg-white/5 text-[#8899bb] text-[10px] flex items-center justify-center gap-1">
                  <Phone className="w-2.5 h-2.5" /> Call
                </div>
                <div className="flex-1 py-2 rounded-lg bg-white/5 text-[#8899bb] text-[10px] flex items-center justify-center gap-1">
                  <Navigation2 className="w-2.5 h-2.5" /> Directions
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="px-4 py-4 flex-1 space-y-2.5">
              {beforeItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/12 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-[#8899bb] text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer stat */}
            <div className="mx-4 mb-4 py-3 rounded-xl text-center" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
              <span className="text-red-400 text-xs font-semibold">2 calls / month · Rank #14</span>
            </div>
          </motion.div>

          {/* ── Center arrow ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center justify-center gap-3 lg:gap-4 py-4 lg:py-0 lg:px-2 flex-shrink-0"
          >
            <div className="h-12 lg:h-20 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.4))" }} />
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                border: "2px solid rgba(0,255,136,0.5)",
                background: "rgba(0,255,136,0.08)",
                boxShadow: "0 0 30px rgba(0,255,136,0.2)",
              }}
            >
              <ArrowDown className="w-5 h-5 text-[#00ff88] lg:hidden" />
              <ArrowRight className="w-5 h-5 text-[#00ff88] hidden lg:block" />
            </div>
            <div className="text-center">
              <div className="text-[#00ff88] text-xs font-bold">6 months</div>
              <div className="text-[#8899bb] text-[10px]">guaranteed</div>
            </div>
            <div className="h-12 lg:h-20 w-px" style={{ background: "linear-gradient(180deg, rgba(0,255,136,0.4), transparent)" }} />
          </motion.div>

          {/* ── AFTER card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(0,35,15,0.95) 0%, rgba(0,12,5,0.98) 100%)",
              border: "1px solid rgba(0,255,136,0.3)",
              boxShadow: "0 0 50px rgba(0,255,136,0.07)",
            }}
          >
            {/* Label bar */}
            <div
              className="px-5 py-3 flex items-center gap-2 border-b"
              style={{ borderColor: "rgba(0,255,136,0.12)" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span className="text-[#00ff88] text-xs font-bold uppercase tracking-widest">
                After Ampwake
              </span>
            </div>

            {/* Fake Maps result */}
            <div className="mx-4 mt-4 rounded-xl p-4" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[rgba(0,255,136,0.18)] flex items-center justify-center text-xs font-bold text-[#00ff88]">
                  2
                </div>
                <span className="text-white text-sm font-semibold">Your Business</span>
                <span className="ml-auto text-[10px] text-[#00ff88] font-bold">TOP 3 ✓</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#00ff88] fill-current" />
                ))}
                <span className="text-[10px] text-[#8899bb] ml-1.5">4.8 · 127 reviews</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 py-2 rounded-lg bg-[#00ff88] text-[#060d1f] text-[10px] flex items-center justify-center gap-1 font-bold">
                  <Phone className="w-2.5 h-2.5" /> Call Now
                </div>
                <div className="flex-1 py-2 rounded-lg border border-[rgba(0,255,136,0.3)] text-[#00ff88] text-[10px] flex items-center justify-center gap-1">
                  <Navigation2 className="w-2.5 h-2.5" /> Directions
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="px-4 py-4 flex-1 space-y-2.5">
              {afterItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[rgba(0,255,136,0.1)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                  </div>
                  <span className="text-white text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer stat */}
            <div className="mx-4 mb-4 py-3 rounded-xl text-center" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <span className="text-[#00ff88] text-xs font-semibold">10x calls increase · Rank #2 on Maps</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 grid grid-cols-3 gap-3"
        >
          {[
            { label: "Avg. Call Growth", value: "10x" },
            { label: "Target Ranking", value: "Top 3" },
            { label: "Guarantee Period", value: "6 mo" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl px-6 py-3 text-center"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-xl font-black text-gradient-neon">{stat.value}</div>
              <div className="text-[#8899bb] text-[11px] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
