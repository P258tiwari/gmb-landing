"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Stethoscope,
  Building2,
  Scissors,
  UtensilsCrossed,
  ShoppingBag,
  BookOpen,
  Home,
  Wrench,
} from "lucide-react";
import { industries } from "@/data/industries";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Building2,
  Scissors,
  UtensilsCrossed,
  ShoppingBag,
  BookOpen,
  Home,
  Wrench,
};

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" ref={ref} className="py-24 lg:py-32 bg-[#060d1f] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(77,159,255,0.04) 0%, transparent 70%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#b8d5fb] bg-[#eef5ff] mb-4"
          >
            <span className="text-[#00ff88] text-xs font-medium">Industries We Serve</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            We grow every type of{" "}
            <span className="text-gradient-neon">local business.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon];
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(36,120,229,0.35)",
                  transition: { duration: 0.2 },
                }}
                className="glass-card rounded-xl p-5 border border-white/6 cursor-default group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#eef5ff] flex items-center justify-center mb-3 group-hover:bg-[#dbeafe] transition-colors duration-200">
                  {Icon && (
                    <Icon className="w-5 h-5 text-[#2478e5] group-hover:text-[#071128] transition-colors duration-200" />
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{industry.name}</h3>
                <p className="text-[#8899bb] text-xs leading-relaxed">{industry.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
