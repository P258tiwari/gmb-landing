"use client";

import { motion } from "framer-motion";
import type { ScoreBreakdown } from "@/lib/audit/types";

const LABELS: Record<keyof ScoreBreakdown, string> = {
  titleSignal:          "Business Title Signal",
  reviewStrength:       "Reviews & Reputation",
  photoStrength:        "Photo Strength",
  profileCompleteness:  "Profile Completeness",
  categoryRelevance:    "Category & Types",
  websiteValidity:      "Website Validity",
};

function barColor(pct: number): string {
  if (pct >= 75) return "#00ff88";
  if (pct >= 50) return "#4d9fff";
  if (pct >= 30) return "#f59e0b";
  return "#ef4444";
}

interface Props {
  breakdown: ScoreBreakdown;
}

export default function ScoreBreakdownChart({ breakdown }: Props) {
  const entries = (
    Object.entries(breakdown) as [keyof ScoreBreakdown, { score: number; max: number }][]
  ).map(([key, cat]) => ({
    key,
    label: LABELS[key] ?? key,
    score: cat.score,
    max: cat.max,
    pct: cat.max > 0 ? Math.round((cat.score / cat.max) * 100) : 0,
  }));

  return (
    <div className="space-y-4">
      {entries.map(({ key, label, score, max, pct }, i) => (
        <div key={key}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[#8899bb] text-sm">{label}</span>
            <span className="text-white text-sm font-semibold tabular-nums">
              {score}
              <span className="text-[#8899bb] font-normal">/{max}</span>
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: barColor(pct),
                boxShadow: `0 0 8px ${barColor(pct)}60`,
              }}
            />
          </div>
        </div>
      ))}

      <p className="text-[#4a5a7a] text-[10px] pt-1 leading-relaxed">
        Raw max = 100 points across 6 signal categories.
      </p>
    </div>
  );
}
