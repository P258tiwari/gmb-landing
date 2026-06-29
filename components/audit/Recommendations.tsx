"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  items: string[];
}

export default function Recommendations({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((rec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-3 p-4 rounded-xl"
          style={{
            background: "rgba(0,255,136,0.04)",
            border: "1px solid rgba(0,255,136,0.1)",
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(0,255,136,0.12)" }}
          >
            <span className="text-[#00ff88] text-xs font-bold">{i + 1}</span>
          </div>
          <p className="text-[#ccd6f0] text-sm leading-relaxed flex-1">{rec}</p>
          <ArrowRight className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
        </motion.div>
      ))}
    </div>
  );
}
