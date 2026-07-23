"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, BarChart3, Globe, Layers, ArrowUpRight } from "lucide-react";
import { whyCards } from "@/data/usps";

const iconMap: Record<string, React.ElementType> = { Cpu, BarChart3, Globe, Layers };

export default function WhyAmpwake() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why" ref={ref} className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#030810" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%)"
      }} />
      {/* Decorative grid dots */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(77,159,255,0.3)] bg-[rgba(77,159,255,0.06)] mb-5"
          >
            <span className="text-[#4d9fff] text-xs font-medium">Why Choose Get Real Flow</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto"
          >
            Built different.
            <br />
            <span className="text-gradient-neon">Built for results.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#8899bb] text-base max-w-xl mx-auto"
          >
            Four pillars that separate Get Real Flow from every other
            <br />
            local SEO agency in India.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {whyCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            const accentColor = "#2478e5";
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="relative group rounded-2xl p-7 overflow-hidden cursor-default"
                style={{
                  background: "linear-gradient(145deg, #ffffff 0%, #f7faff 100%)",
                  border: "1px solid rgba(36,120,229,0.2)",
                }}
              >
                {/* Top corner glow on hover */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`, transform: "translate(30%, -30%)" }}
                />

                <div className="flex items-start gap-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(36,120,229,0.09)", border: "1px solid rgba(36,120,229,0.22)" }}
                  >
                    {Icon && <Icon className="w-5 h-5" style={{ color: accentColor }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#8899bb]/30 group-hover:text-[#8899bb] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-[#8899bb] text-sm leading-relaxed">{card.body}</p>
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
