"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Star, Phone, Navigation2, ChevronDown, TrendingUp } from "lucide-react";

const mockTopResults = [
  { rank: 1, name: "Sharma Dental Clinic", rating: 4.9, reviews: 312, distance: "0.3 km", open: true },
  { rank: 2, name: "City Care Hospital", rating: 4.8, reviews: 189, distance: "0.5 km", open: true },
  { rank: 3, name: "Apollo Health Centre", rating: 4.7, reviews: 143, distance: "0.9 km", open: false },
];

function FloatingPin({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute" style={{ ...style, animation: "float 4s ease-in-out infinite" }}>
      <div className="relative">
        <div className="w-7 h-7 rounded-full bg-[rgba(0,255,136,0.15)] border border-[rgba(0,255,136,0.4)] flex items-center justify-center">
          <MapPin className="w-3.5 h-3.5 text-[#00ff88]" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-transparent border-t-[rgba(0,255,136,0.4)]" />
      </div>
    </div>
  );
}

function AnimatedMapsCard() {
  const [currentRank, setCurrentRank] = useState(14);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentRank((prev) => {
          if (prev <= 3) { clearInterval(interval); return 3; }
          return prev - 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isTop = currentRank <= 3;
  const progress = Math.max(0, (14 - currentRank) / (14 - 3));

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #0d1b3a 0%, #060d1f 100%)",
        border: "1px solid rgba(77,159,255,0.2)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* Maps header */}
      <div className="px-4 pt-3 pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#4d9fff]" />
          <span className="text-xs text-[#8899bb] flex-1">best dentist near me</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[8px] text-[#8899bb]">⊕</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {["All", "Maps", "Open now"].map((tab) => (
            <span key={tab} className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${tab === "Maps" ? "bg-[#4d9fff] text-white" : "bg-white/5 text-[#8899bb]"}`}>{tab}</span>
          ))}
        </div>
      </div>

      {/* Fake mini map */}
      <div className="relative h-24 overflow-hidden border-b border-white/5" style={{
        background: "linear-gradient(180deg, #0a1628 0%, #061020 100%)"
      }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "linear-gradient(rgba(77,159,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        {/* Road lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(255,255,255,0.08)]" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[rgba(255,255,255,0.06)]" />
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-[rgba(255,255,255,0.06)]" />
        {/* Map pins */}
        {[
          { top: "20%", left: "20%", color: "#00ff88", rank: "1" },
          { top: "40%", left: "55%", color: "#00ff88", rank: "2" },
          { top: "65%", left: "35%", color: "#00ff88", rank: "3" },
        ].map((pin) => (
          <div key={pin.rank} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: pin.top, left: pin.left }}>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
              style={{ background: "rgba(0,255,136,0.15)", borderColor: pin.color, color: pin.color }}>
              {pin.rank}
            </div>
          </div>
        ))}
        {/* Your business pin - animated */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{ top: isTop ? "30%" : "80%", left: isTop ? "75%" : "80%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${isTop ? "border-[#00ff88] bg-[rgba(0,255,136,0.2)] text-[#00ff88]" : "border-[#4d9fff] bg-[rgba(77,159,255,0.15)] text-[#4d9fff]"}`}>
              {isTop ? "★" : currentRank}
            </div>
            {isTop && <div className="absolute inset-0 rounded-full bg-[rgba(0,255,136,0.3)] animate-ping" />}
          </div>
        </motion.div>
      </div>

      {/* Results list */}
      <div className="p-3 space-y-2">
        {mockTopResults.map((r, i) => (
          <motion.div
            key={r.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-2.5 p-2 rounded-xl"
            style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.1)" }}
          >
            <div className="w-6 h-6 rounded-lg bg-[rgba(0,255,136,0.12)] flex items-center justify-center text-[10px] font-bold text-[#00ff88]">
              #{r.rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white font-medium truncate">{r.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-2 h-2 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-[9px] text-[#8899bb]">{r.rating} · {r.reviews} reviews · {r.distance}</span>
              </div>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${r.open ? "bg-[rgba(0,255,136,0.12)] text-[#00ff88]" : "bg-white/5 text-[#8899bb]"}`}>
              {r.open ? "Open" : "Closed"}
            </span>
          </motion.div>
        ))}

        {/* Separator */}
        <div className="border-t border-white/5 pt-2">
          <div className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-500"
            style={{
              background: isTop ? "rgba(0,255,136,0.08)" : "rgba(77,159,255,0.05)",
              border: isTop ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(77,159,255,0.15)",
            }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500"
              style={{
                background: isTop ? "rgba(0,255,136,0.2)" : "rgba(77,159,255,0.1)",
                color: isTop ? "#00ff88" : "#4d9fff",
              }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRank}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {isTop ? "★" : `#${currentRank}`}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold transition-colors duration-500" style={{ color: isTop ? "#00ff88" : "#4d9fff" }}>
                Your Business
              </div>
              <div className="text-[10px] text-[#8899bb] mt-0.5">
                {isTop ? "Top 3 · More calls incoming" : `Moving up... (${14 - currentRank + 1} positions gained)`}
              </div>
            </div>
            {!isTop && (
              <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-[#00ff88] rounded-full"
                  animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.2 }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call / Directions buttons */}
      <div className="px-3 pb-3 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all"
          style={{ background: isTop ? "#00ff88" : "rgba(255,255,255,0.05)", color: isTop ? "#060d1f" : "#8899bb" }}>
          <Phone className="w-3 h-3" /> Call Now
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 text-[#8899bb] text-xs">
          <Navigation2 className="w-3 h-3" /> Directions
        </button>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const handleCTA = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: "#060d1f" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(77,159,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.12] blur-3xl" style={{ background: "#4d9fff" }} />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-[0.07] blur-3xl" style={{ background: "#00ff88" }} />

      {/* Floating map pins */}
      <FloatingPin style={{ top: "15%", left: "8%", opacity: 0.4 }} />
      <FloatingPin style={{ top: "25%", right: "6%", opacity: 0.3 }} />
      <FloatingPin style={{ bottom: "20%", left: "5%", opacity: 0.25 }} />
      <FloatingPin style={{ bottom: "30%", right: "8%", opacity: 0.35 }} />
      <FloatingPin style={{ top: "55%", left: "12%", opacity: 0.2 }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[#00ff88] text-xs font-medium">India&apos;s #1 Local SEO Growth Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-black leading-[1.15] tracking-tight text-white"
            >
              Your customers
              <br />
              are searching.
              <br />
              <span className="text-gradient-neon whitespace-nowrap">Are they finding you?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-[#8899bb] text-lg leading-relaxed max-w-lg"
            >
              AI-powered Google Business Profile optimization that helps local businesses rank higher, get more calls, and win customers from Google Maps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => handleCTA("#final-cta")}
                className="px-7 py-4 rounded-xl font-bold text-base text-[#060d1f] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,255,136,0.35)] active:scale-[0.97]"
                style={{ background: "#00ff88" }}
              >
                Book Free GMB Audit →
              </button>
              <button
                onClick={() => handleCTA("#pricing")}
                className="px-7 py-4 rounded-xl border border-white/15 text-white font-semibold text-base hover:bg-white/5 hover:scale-[1.02] hover:border-white/30 active:scale-[0.97] transition-all"
              >
                View Pricing Plans
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00ff88] fill-current" />
                  ))}
                </div>
                <span className="text-[#8899bb] text-sm">
                  <span className="text-white font-semibold">Top 3 in 6 months</span> or money back
                </span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex gap-6"
            >
              {[
                { value: "100+", label: "Local Businesses" },
                { value: "Top 3", label: "Avg. Result" },
                { value: "6mo", label: "Guaranteed" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-black text-gradient-neon">{s.value}</div>
                  <div className="text-[#8899bb] text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Maps card */}
          <div className="relative">
            <AnimatedMapsCard />

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="absolute -top-5 -right-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
              style={{ border: "1px solid rgba(0,255,136,0.25)" }}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#00ff88]" />
              <span className="text-[11px] text-white font-semibold">+340% more calls</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="absolute -bottom-5 -left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
              style={{ border: "1px solid rgba(77,159,255,0.25)" }}
            >
              <MapPin className="w-3.5 h-3.5 text-[#4d9fff]" />
              <span className="text-[11px] text-white font-semibold">Ranking live now</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            </motion.div>

            {/* Glow behind card */}
            <div className="absolute -inset-8 -z-10 blur-3xl opacity-20 rounded-full" style={{
              background: "radial-gradient(circle, #4d9fff 0%, transparent 70%)"
            }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleCTA("#problem")}
      >
        <span className="text-[#8899bb] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-[#8899bb]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
