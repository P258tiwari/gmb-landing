"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Navigation2, Star, MapPin } from "lucide-react";

const cases = [
  {
    name: "Dr. Manish Gupta's Kanpur Dental & Maxillofacial Centre",
    city: "Kanpur",
    months: 11,
    keywordsTop3: 12,
    callsGrowth: "+746%",
    dirGrowth: "+509%",
    reviews: "5 → 210+",
  },
  {
    name: "Unnao Medical Centre",
    city: "Unnao",
    months: 8,
    keywordsTop3: 16,
    callsGrowth: "+201%",
    dirGrowth: "+204%",
    reviews: "54 → 258+",
  },
  {
    name: "Dr. Shwetanjali's Makeup Studio & Unisex Salon",
    city: "Orai",
    months: 12,
    keywordsTop3: "08",
    callsGrowth: "+900%",
    dirGrowth: "+385%",
    reviews: "42 → 180+",
  },
];

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="case-studies" ref={ref} className="py-24 lg:py-32 bg-[#030810] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(36,120,229,0.07) 0%, transparent 70%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#b8d5fb] bg-[#eef5ff] mb-4"
          >
            <Star className="w-3 h-3 text-[#00ff88]" />
            <span className="text-[#00ff88] text-xs font-medium">Client Results</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Built for businesses that
            <br />
            want <span className="text-gradient-neon">calls, not vanity metrics.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-[#d9e2ef] flex flex-col shadow-[0_8px_24px_rgba(7,17,40,.08)]"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Truncated name with hover tooltip */}
                  <div className="relative group min-w-0 flex-1">
                    <p className="text-white font-semibold text-sm truncate cursor-default">
                      {c.name}
                    </p>
                    {/* Tooltip */}
                    <div
                      className="absolute left-0 top-full mt-2 z-50 px-3 py-2 rounded-xl text-xs text-white leading-snug
                                 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 w-64"
                      style={{
                        background: "#0a1628",
                        border: "1px solid rgba(77,159,255,0.25)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                      }}
                    >
                      {c.name}
                    </div>
                  </div>
                  <span className="text-[#8899bb] text-xs flex-shrink-0">{c.city}</span>
                </div>
                <div className="text-[#8899bb] text-xs">{c.months} months</div>
              </div>

              {/* Metrics */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Calls + Directions */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Phone className="w-3 h-3 text-[#00ff88]" />
                      <span className="text-[10px] text-[#8899bb]">Calls</span>
                    </div>
                    <div className="text-[#00ff88] font-black text-xl">{c.callsGrowth}</div>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Navigation2 className="w-3 h-3 text-[#4d9fff]" />
                      <span className="text-[10px] text-[#8899bb]">Directions</span>
                    </div>
                    <div className="text-[#4d9fff] font-black text-xl">{c.dirGrowth}</div>
                  </div>
                </div>

                {/* Keywords in Top 3 — full-width, styled like reviews row */}
                <div className="glass-card rounded-lg p-3 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-[#00ff88] flex-shrink-0" />
                  <span className="text-xs text-[#8899bb]">Keywords in Top 3</span>
                  <span className="text-[#00ff88] font-black text-sm ml-auto">{c.keywordsTop3}</span>
                </div>

                {/* Reviews */}
                <div className="glass-card rounded-lg p-3 flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs text-[#8899bb]">Reviews</span>
                  <span className="text-white text-xs font-semibold ml-auto">{c.reviews}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
