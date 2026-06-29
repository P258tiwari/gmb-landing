"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Grade } from "@/lib/audit/types";

const GRADE_COLOR: Record<Grade, string> = {
  Strong: "#00ff88",
  Good: "#4d9fff",
  "Needs Optimization": "#f59e0b",
  "Visibility Risk": "#ef4444",
};

const GRADE_BG: Record<Grade, string> = {
  Strong: "rgba(0,255,136,0.12)",
  Good: "rgba(77,159,255,0.12)",
  "Needs Optimization": "rgba(245,158,11,0.12)",
  "Visibility Risk": "rgba(239,68,68,0.12)",
};

interface Props {
  score: number;
  grade: Grade;
  size?: number;
}

export default function ScoreRing({ score, grade, size = 180 }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = GRADE_COLOR[grade];

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const duration = 1600;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const t = setTimeout(() => { frame = requestAnimationFrame(animate); }, 300);
    return () => { clearTimeout(t); cancelAnimationFrame(frame); };
  }, [score]);

  const dashOffset = circumference - (displayed / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={12}
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white tabular-nums leading-none">
            {displayed}
          </span>
          <span className="text-[#8899bb] text-xs mt-1">/ 100</span>
        </div>
      </div>

      {/* Grade badge */}
      <div
        className="px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ background: GRADE_BG[grade], color }}
      >
        {grade}
      </div>
    </div>
  );
}
