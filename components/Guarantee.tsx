"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, MapPin, TrendingUp } from "lucide-react";

const tiers = [
  {
    plan: "Starter",
    keywords: 2,
    icon: MapPin,
    color: "#4d9fff",
    bg: "rgba(77,159,255,0.08)",
    border: "rgba(77,159,255,0.25)",
  },
  {
    plan: "Growth",
    keywords: 5,
    icon: TrendingUp,
    color: "#2478e5",
    bg: "rgba(36,120,229,0.08)",
    border: "rgba(36,120,229,0.3)",
  },
  {
    plan: "Max",
    keywords: 8,
    icon: BadgeCheck,
    color: "#071128",
    bg: "rgba(36,120,229,0.12)",
    border: "rgba(36,120,229,0.45)",
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
          className="mt-4 text-2xl sm:text-3xl font-bold text-white/60"
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
          className="mt-12 grid sm:grid-cols-3 gap-4"
        >
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.plan}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: tier.bg,
                  border: `1px solid ${tier.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${tier.color}18`, border: `1px solid ${tier.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: tier.color }} />
                </div>
                <div className="text-white font-bold text-base mb-2">{tier.plan}</div>
                <div
                  className="text-4xl font-black mb-1"
                  style={{ color: tier.color }}
                >
                  Top 3
                </div>
                <div className="text-[#8899bb] text-sm">
                  for <span className="text-white font-semibold">{tier.keywords} keywords</span> in 6 months
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
            whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(0,255,136,0.35)" }}
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
