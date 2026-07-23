"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Star, BarChart2, Shield } from "lucide-react";

const steps = [
  { icon: MapPin,    text: "Locating your business on Google Maps…" },
  { icon: Search,    text: "Scanning your public profile data…" },
  { icon: Star,      text: "Analyzing review signals…" },
  { icon: BarChart2, text: "Calculating your visibility score…" },
  { icon: Shield,    text: "Generating your audit report…" },
];

export default function AuditLoading() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const Icon = steps[step].icon;

  const content = (
    <div className="fixed inset-0 z-[200] bg-[#060d1f] flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(36,120,229,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative text-center max-w-sm w-full">
        {/* Animated icon ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid transparent",
              borderTopColor: "#2478e5",
              borderRightColor: "rgba(36,120,229,0.3)",
            }}
          />
          <div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(36,120,229,0.08)",
              border: "1px solid rgba(36,120,229,0.2)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-8 h-8 text-[#2478e5]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white font-medium mb-2"
          >
            {steps[step].text}
          </motion.p>
        </AnimatePresence>

        <p className="text-[#8899bb] text-sm mb-8">
          This takes about 10–15 seconds.
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                background: i <= step ? "#2478e5" : "#dbe3ef",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
