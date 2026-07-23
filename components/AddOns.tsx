"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TrendingUp, Check, X, Calculator, ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

const PLATFORMS = [
  {
    id: "client",
    label: "Your Ads Account",
    description: "We set up your account & Maps campaign",
    setupFee: 5000,
    badge: "You own the account",
    badgeColor: "#4d9fff",
  },
  {
    id: "ampwake",
    label: "Get Real Flow Account",
    description: "We set up the Maps campaign only",
    setupFee: 3000,
    badge: "No account needed",
    badgeColor: "#2478e5",
  },
] as const;

const FEATURES = [
  "Google Maps ad campaign management",
  "Keyword research & ad copy",
  "Call & direction conversion tracking",
  "Weekly performance reports",
  "A/B testing & bid optimization",
];

const PLATFORM_EXTRAS: Record<string, string[]> = {
  client: ["We set up your Google Ads account", "Full account ownership — your data, always"],
  ampwake: ["Campaign runs on Get Real Flow's account", "No Google Ads account setup required"],
};

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function CalcModal({
  defaultPlatform,
  onClose,
}: {
  defaultPlatform: "client" | "ampwake";
  onClose: () => void;
}) {
  const [platform, setPlatform] = useState<"client" | "ampwake">(defaultPlatform);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  const budgetNum = parseFloat(budget.replace(/,/g, "")) || 0;
  const plat = PLATFORMS.find((p) => p.id === platform)!;
  const performanceFee = Math.round(budgetNum * 0.2);
  const mgmtFee = 1000;
  const totalMonthly = mgmtFee + performanceFee;
  const hasCalc = budgetNum > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#08111f",
          border: "1px solid rgba(77,159,255,0.2)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,159,255,0.08)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(77,159,255,0.12)", border: "1px solid rgba(77,159,255,0.25)" }}
            >
              <Calculator className="w-4 h-4 text-[#4d9fff]" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Add-On Price Calculator</div>
              <div className="text-[#8899bb] text-xs">Google Ads Management</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8899bb] hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Platform selector */}
          <div>
            <label className="text-[#8899bb] text-xs font-semibold uppercase tracking-widest mb-2 block">
              Ad Account Platform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className="relative p-3.5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: platform === p.id
                      ? "rgba(36,120,229,0.1)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${platform === p.id
                      ? "rgba(36,120,229,0.4)"
                      : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <div
                    className="text-sm font-semibold mb-0.5"
                    style={{ color: platform === p.id ? p.badgeColor : "#fff" }}
                  >
                    {p.label}
                  </div>
                  <div className="text-[10px] text-[#8899bb] whitespace-nowrap overflow-hidden text-ellipsis">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget input */}
          <div>
            <label className="text-[#8899bb] text-xs font-semibold uppercase tracking-widest mb-2 block">
              Monthly Ad Budget (₹)
            </label>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-[#8899bb] text-lg font-bold">₹</span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 20000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="flex-1 bg-transparent text-white font-semibold text-base outline-none placeholder-[#445566]"
              />
              <span className="text-[#8899bb] text-xs">/month</span>
            </div>
            <p className="text-[#445566] text-xs mt-1.5">Enter how much you plan to spend on ads each month</p>
          </div>

          {/* Breakdown */}
          <AnimatePresence mode="wait">
            {hasCalc ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.04)" }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(0,255,136,0.1)" }}>
                  <div className="text-[#00ff88] text-[10px] font-bold uppercase tracking-widest">Your Estimated Cost</div>
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8899bb]">One-time setup fee</span>
                    <span className="text-white font-semibold">{formatINR(plat.setupFee)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8899bb]">Management fee</span>
                    <span className="text-white font-semibold">₹1,000/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8899bb]">Performance fee (20% of {formatINR(budgetNum)})</span>
                    <span className="text-white font-semibold">{formatINR(performanceFee)}/mo</span>
                  </div>
                  <div
                    className="flex justify-between items-center pt-2.5 mt-1 border-t"
                    style={{ borderColor: "rgba(0,255,136,0.15)" }}
                  >
                    <span className="text-white font-bold text-sm">Get Real Flow fee monthly</span>
                    <span className="text-[#00ff88] font-black text-lg">{formatINR(totalMonthly)}/mo</span>
                  </div>
                  <p className="text-[#445566] text-[10px] mt-1">
                    <span className="text-white font-bold">+ {formatINR(plat.setupFee)}</span> one-time setup fee
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <ChevronDown className="w-5 h-5 text-[#445566] mx-auto mb-1" />
                <p className="text-[#445566] text-xs">Enter your budget above to see your cost breakdown</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.a
            href="#final-cta"
            onClick={onClose}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,255,136,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm cursor-pointer"
            style={{ background: "#00ff88", color: "#060d1f" }}
          >
            <MessageCircle className="w-4 h-4" />
            Connect with an Expert
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <p className="text-center text-[#445566] text-xs">Free consultation · No commitment</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AddOns() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [platform, setPlatform] = useState<"client" | "ampwake">("client");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="addons" ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#030810" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(77,159,255,0.05) 0%, transparent 60%)"
      }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(77,159,255,0.3)] bg-[rgba(77,159,255,0.06)] mb-4"
          >
            <span className="text-[#4d9fff] text-xs font-medium">Add-On Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white"
          >
            Accelerate with{" "}
            <span className="text-gradient-neon">Google Ads.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-[#8899bb] text-base max-w-lg mx-auto"
          >
We run Google Maps ads to put your business at the very top of Maps results — more calls, more walk-ins.
          </motion.p>
        </div>

        {/* Single card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(77,159,255,0.15)",
            boxShadow: "0 0 60px rgba(77,159,255,0.05)",
          }}
        >
          {/* Card header */}
          <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(77,159,255,0.1)", border: "1px solid rgba(77,159,255,0.2)" }}
              >
                <TrendingUp className="w-5 h-5 text-[#4d9fff]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Google Ads Management</h3>
                <p className="text-[#8899bb] text-xs">Google Maps ads · ₹1,000/mo + 20% of your ad budget</p>
              </div>
            </div>

            {/* Platform toggle */}
            <div className="mb-1">
              <p className="text-[#8899bb] text-[10px] uppercase tracking-widest font-semibold mb-2">
                Run ads on
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className="relative p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: platform === p.id
                        ? "rgba(36,120,229,0.09)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${platform === p.id
                        ? "rgba(36,120,229,0.35)"
                        : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="text-sm font-bold"
                        style={{ color: platform === p.id ? p.badgeColor : "#fff" }}
                      >
                        {p.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8899bb] whitespace-nowrap overflow-hidden text-ellipsis">{p.description}</div>
                    <div
                      className="mt-1.5 text-xs font-bold"
                      style={{ color: platform === p.id ? p.badgeColor : "#445566" }}
                    >
                      {formatINR(p.setupFee)} setup
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-6">
            <p className="text-[#8899bb] text-[10px] uppercase tracking-widest font-semibold mb-3">
              What&apos;s included
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {[...FEATURES, ...PLATFORM_EXTRAS[platform]].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#8899bb]">
                  <Check className="w-3.5 h-3.5 text-[#4d9fff] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(77,159,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(77,159,255,0.15) 0%, rgba(77,159,255,0.08) 100%)",
                border: "1px solid rgba(77,159,255,0.35)",
                color: "#4d9fff",
              }}
            >
              <Calculator className="w-4 h-4" />
              Calculate My Add-On Price
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <CalcModal defaultPlatform={platform} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
