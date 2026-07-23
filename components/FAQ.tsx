"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="py-24 lg:py-32 bg-[#060d1f] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(77,159,255,0.04) 0%, transparent 70%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(77,159,255,0.3)] bg-[rgba(77,159,255,0.06)] mb-4"
          >
            <span className="text-[#4d9fff] text-xs font-medium">FAQs</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Questions, answered.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.04 }}
              className="rounded-xl p-5 flex flex-col gap-2"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-1 h-full rounded-full mt-1"
                  style={{ background: "#2478e5", minHeight: "14px", width: "3px" }}
                />
                <p className="text-white font-semibold text-sm leading-snug">{faq.question}</p>
              </div>
              <p className="text-[#8899bb] text-sm leading-relaxed pl-4">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
