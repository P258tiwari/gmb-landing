"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, XCircle, Lock } from "lucide-react";
import type { BasicFinding } from "@/lib/audit/types";

const WA_NUM =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047"
    : "918452013047";

const STATUS_CONFIG = {
  good: {
    icon: CheckCircle2,
    color: "#00ff88",
    bg: "rgba(0,255,136,0.06)",
    border: "rgba(0,255,136,0.15)",
    badge: "Good",
    badgeBg: "rgba(0,255,136,0.1)",
  },
  needs_work: {
    icon: AlertCircle,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.18)",
    badge: "Needs Work",
    badgeBg: "rgba(245,158,11,0.1)",
  },
  missing: {
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.05)",
    border: "rgba(239,68,68,0.15)",
    badge: "Missing",
    badgeBg: "rgba(239,68,68,0.1)",
  },
  locked: {
    icon: Lock,
    color: "#8899bb",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.08)",
    badge: "Locked",
    badgeBg: "rgba(255,255,255,0.05)",
  },
};

const IMPACT_CONFIG: Record<string, { color: string; bg: string }> = {
  High:   { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Low:    { color: "#4d9fff", bg: "rgba(77,159,255,0.1)" },
};

interface Props {
  finding: BasicFinding;
  index: number;
  number: number;
}

export default function FindingCard({ finding, index, number }: Props) {
  const cfg = STATUS_CONFIG[finding.status];
  const Icon = cfg.icon;
  const impactCfg = IMPACT_CONFIG[finding.impact] ?? IMPACT_CONFIG.High;

  const waHref = `https://wa.me/${WA_NUM}?text=Hi%20Ampwake%2C%20I%27d%20like%20to%20connect%20and%20improve%20my%20GMB%20profile.`;

  const showTip = finding.tip !== null && finding.status !== "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl p-4"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Row number */}
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
          style={{ background: "rgba(255,255,255,0.06)", color: "#8899bb" }}
        >
          {number}
        </span>

        <div className="flex-1 min-w-0">
          {/* Label + status + impact badges */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-white text-sm font-semibold">{finding.label}</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
              style={{ background: cfg.badgeBg, color: cfg.color }}
            >
              {cfg.badge}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
              style={{ background: impactCfg.bg, color: impactCfg.color }}
            >
              {finding.impact} Impact
            </span>
          </div>

          {/* Current value + score contribution */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[#8899bb] text-xs truncate">
              {finding.currentValue ?? "—"}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-medium tabular-nums"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: finding.status === "locked" ? "#4a5a7a" : cfg.color,
              }}
            >
              {finding.scoreContribution}
            </span>
          </div>

          {/* Visible issue explanation */}
          <div className="flex items-start gap-1.5 mb-0">
            <Icon
              className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
              style={{ color: cfg.color }}
            />
            <p className="text-[#8899bb] text-xs leading-relaxed">{finding.note}</p>
          </div>

          {/* Blurred tip box — shown for non-locked rows that have a tip */}
          {showTip && (
            <div
              className="relative mt-3 rounded-lg overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: 48,
              }}
            >
              {/* Tip text — blurred underneath */}
              <div
                className="absolute inset-0 flex items-center px-3 py-2"
                style={{ userSelect: "none", pointerEvents: "none" }}
                aria-hidden="true"
              >
                <p
                  className="text-[#8899bb] text-xs leading-relaxed"
                  style={{ filter: "blur(5px)" }}
                >
                  {finding.tip}
                </p>
              </div>

              {/* Frosted overlay with CTA */}
              <div
                className="relative flex items-center justify-between gap-2 px-3 py-2.5"
                style={{ backdropFilter: "blur(8px)", background: "rgba(6,13,31,0.6)" }}
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 flex-shrink-0" style={{ color: "#00ff88" }} />
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "#00ff88" }}
                  >
                    Locked
                  </span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all hover:opacity-90"
                  style={{
                    background: "rgba(0,255,136,0.12)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    color: "#00ff88",
                    whiteSpace: "nowrap",
                  }}
                >
                  {finding.ctaText}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
