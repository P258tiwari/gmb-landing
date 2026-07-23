"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, MapPin, TrendingUp } from "lucide-react";

const tiers = [
  {
    plan: "Starter",
    keywords: 2,
    icon: MapPin,
    label: "Local foundation",
  },
  {
    plan: "Growth",
    keywords: 5,
    icon: TrendingUp,
    label: "Most popular",
    featured: true,
  },
  {
    plan: "Max",
    keywords: 8,
    icon: BadgeCheck,
    label: "Market coverage",
  },
];

export default function Guarantee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="guarantee" ref={ref} className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#060d1f" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(36,120,229,0.16) 0%, transparent 62%)"
      }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">

        {/* Icon + Eyebrow — stacked vertically */}
        <div className="flex flex-col items-center gap-5 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-20 h-20 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(36,120,229,0.2) 0%, rgba(36,120,229,0.05) 100%)",
              border: "1.5px solid rgba(36,120,229,0.45)",
              boxShadow: "0 18px 55px rgba(36,120,229,0.22), 0 0 0 8px rgba(36,120,229,0.05)",
            }}
          >
            <BadgeCheck className="w-9 h-9 text-[#00ff88]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-xs font-medium">Risk-Free Promise</span>
          </motion.div>
        </div>

        {/* Heading — Money Back Guaranteed big, Top 3 in 6 months as sub */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Money Back
          <br />
          <span className="text-gradient-neon">Guaranteed.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-3xl font-bold text-[#202124]"
        >
          Top 3 in 6 months — or we refund you fully.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-[#8899bb] text-base max-w-lg mx-auto"
        >
          We put our money where our mouth is. If your business doesn&apos;t hit the guaranteed ranking in 6 months, you get every rupee back — no questions asked.
        </motion.p>

        {/* Tier cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative mt-14 grid items-stretch gap-5 sm:grid-cols-3"
        >
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-[#b8d5fb] via-[#2478e5] to-[#b8d5fb] sm:block" />
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const featured = "featured" in tier && tier.featured;
            return (
              <motion.div
                key={tier.plan}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                whileHover={{ y: -7, transition: { duration: 0.2 } }}
                className="relative flex min-h-[290px] flex-col overflow-hidden rounded-[24px] p-6 text-left"
                style={{
                  background: featured
                    ? "linear-gradient(145deg, #2478e5 0%, #1557b5 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
                  border: featured ? "1px solid #2478e5" : "1px solid #c6dcfb",
                  boxShadow: featured
                    ? "0 24px 55px rgba(36,120,229,0.28)"
                    : "0 12px 34px rgba(7,17,40,0.09)",
                  transform: featured ? "translateY(-10px)" : undefined,
                }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: featured ? "rgba(255,255,255,.16)" : "#eaf2ff",
                      border: featured ? "1px solid rgba(255,255,255,.3)" : "1px solid #b8d5fb",
                      color: featured ? "#ffffff" : "#2478e5",
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em]"
                    style={{
                      background: featured ? "rgba(255,255,255,.16)" : "#eaf2ff",
                      color: featured ? "#ffffff" : "#1b63c3",
                    }}
                  >
                    {tier.label}
                  </span>
                </div>
                <div className="text-sm font-bold uppercase tracking-[.14em]" style={{ color: featured ? "#dbeafe" : "#5f6368" }}>
                  {tier.plan}
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-6xl font-black leading-none" style={{ color: featured ? "#ffffff" : "#071128" }}>
                    {tier.keywords}
                  </span>
                  <span className="pb-1 text-sm font-semibold" style={{ color: featured ? "#dbeafe" : "#1b63c3" }}>
                    keywords
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: featured ? "rgba(255,255,255,.22)" : "#dbeafe" }}>
                  <span className="text-sm font-bold" style={{ color: featured ? "#ffffff" : "#2478e5" }}>Top 3 target</span>
                  <span className="text-xs" style={{ color: featured ? "#dbeafe" : "#5f6368" }}>within 6 months</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fine print */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 glass-card rounded-xl px-6 py-4 border border-white/5 inline-block"
        >
          <p className="text-[#8899bb] text-xs leading-relaxed max-w-lg">
            Guarantee applies to eligible local search rankings when the client provides required information and follows our recommendations. Terms apply.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-8"
        >
          <motion.button
            onClick={() => document.querySelector("#final-cta")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.03, boxShadow: "0 14px 34px rgba(36,120,229,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl font-bold text-base"
            style={{ background: "#2478e5", color: "#ffffff", boxShadow: "0 12px 30px rgba(36,120,229,0.28)" }}
          >
            Claim Your Free Audit →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
