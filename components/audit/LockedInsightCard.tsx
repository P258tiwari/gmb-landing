"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { LockedFinding } from "@/lib/audit/types";
import Link from "next/link";

interface Props {
  finding: LockedFinding;
  index: number;
}

export default function LockedInsightCard({ finding, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(13,27,58,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        minHeight: 170,
      }}
    >
      {/* Real visible header */}
      <div className="p-4 flex items-start gap-3 flex-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <Lock className="w-4 h-4 text-[#00ff88]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold mb-1">{finding.label}</p>
          <p className="text-[#8899bb] text-xs leading-relaxed">{finding.preview}</p>
        </div>
      </div>

      {/* Fake blurred data rows */}
      <div className="relative mx-4 mb-4 rounded-lg overflow-hidden" style={{ height: 52 }}>
        {/* Fake bars */}
        <div className="absolute inset-0 p-2.5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-[rgba(0,255,136,0.25)]" style={{ width: "68%" }} />
            <div className="h-2 w-8 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-[rgba(77,159,255,0.25)]" style={{ width: "45%" }} />
            <div className="h-2 w-6 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-[rgba(245,158,11,0.25)]" style={{ width: "82%" }} />
            <div className="h-2 w-10 rounded-full bg-white/10" />
          </div>
        </div>
        {/* Blur + lock overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backdropFilter: "blur(4px)", background: "rgba(6,13,31,0.55)" }}
        >
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#00ff88]" />
            <span className="text-[#00ff88] text-[10px] font-semibold tracking-wide uppercase">
              Locked
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center justify-between border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
          style={{
            background: "rgba(0,255,136,0.08)",
            color: "#00ff88",
            border: "1px solid rgba(0,255,136,0.2)",
          }}
        >
          {finding.plan} Plan
        </span>
        <Link
          href="/#pricing"
          className="text-[11px] text-[#00ff88] font-semibold hover:underline"
        >
          Unlock Full Audit →
        </Link>
      </div>
    </motion.div>
  );
}
