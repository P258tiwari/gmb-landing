"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowRight, Check, ChevronRight, MapPin, Search, Star, TrendingUp, X } from "lucide-react";

const beforeItems = ["Rank #14 on Google Maps", "Incomplete business profile", "No recent posts or updates", "Unanswered customer reviews", "Only 2 calls per month"];
const afterItems = ["Top 3 ranking on Google Maps", "100% fully optimized profile", "Fresh posts every week", "Proactive review management", "10x calls increase"];

type PlacePanelProps = { optimized?: boolean; inView: boolean };

function PlacePanel({ optimized = false, inView }: PlacePanelProps) {
  const items = optimized ? afterItems : beforeItems;
  const accent = optimized ? "#2478e5" : "#d93025";

  return (
    <motion.article initial={{ opacity: 0, x: optimized ? 40 : -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .7, delay: optimized ? .3 : .2 }} className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-[#dadce0] bg-white shadow-[0_18px_55px_rgba(0,0,0,.24)]">
      <div className="flex items-center gap-2 border-b border-[#e8eaed] px-5 py-3.5"><span className="h-2 w-2 rounded-full" style={{ background: accent }} /><span className="text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: accent }}>{optimized ? "After Get Real Flow" : "Before Get Real Flow"}</span></div>

      <div className="border-b border-[#e8eaed] px-4 pb-3 pt-4">
        <div className="flex items-center rounded-full border border-[#dadce0] px-4 py-2.5 shadow-sm"><span className="flex-1 text-[11px] text-[#3c4043]">your business near me</span><Search className="h-4 w-4 text-[#4285f4]" /></div>
        <div className="mt-3 flex gap-5 px-2 text-[9px] text-[#5f6368]"><span>All</span><span className="border-b-2 border-[#1a73e8] pb-1.5 font-semibold text-[#1a73e8]">Maps</span><span>Images</span><span>More</span></div>
      </div>

      <div className="flex-1 p-4 text-[#202124]">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold"><MapPin className="h-3.5 w-3.5" /> Kanpur, Uttar Pradesh</div>
        <div className="overflow-hidden rounded-xl border border-[#dadce0]">
          <div className="relative h-28 overflow-hidden bg-[#e8f0e8]" style={{ backgroundImage: "linear-gradient(32deg, transparent 46%, #fff 47%, #fff 52%, transparent 53%), linear-gradient(145deg, transparent 43%, #fff 44%, #fff 49%, transparent 50%), linear-gradient(90deg, rgba(174,203,223,.42) 1px, transparent 1px), linear-gradient(rgba(174,203,223,.42) 1px, transparent 1px)", backgroundSize: "150px 110px, 170px 130px, 38px 38px, 38px 38px" }}>
            <div className="absolute right-[-8%] top-1 h-8 w-36 -rotate-12 bg-[#a8dff0]" /><div className="absolute left-[35%] top-[43%] text-[12px] font-bold text-[#5f6368]">KANPUR</div>
            {[[18,25],[72,20],[24,70],[78,68]].map(([left, top], index) => <MapPin key={index} className="absolute h-4 w-4 fill-[#ea4335]" style={{ left: `${left}%`, top: `${top}%`, color: "#ffffff", strokeWidth: 2.5 }} />)}
            <motion.div initial={{ left: optimized ? "82%" : "86%", top: optimized ? "80%" : "82%" }} animate={inView && optimized ? { left: "53%", top: "31%" } : {}} transition={{ delay: .8, duration: 1.2 }} className="absolute"><MapPin className={`h-7 w-7 drop-shadow ${optimized ? "fill-[#2478e5]" : "fill-[#9aa0a6]"}`} style={{ color: "#ffffff", strokeWidth: 2.5 }} /></motion.div>
            <span className="absolute bottom-1 left-2 rounded bg-white/80 px-1 text-[7px] text-[#70757a]">Map data ©2026</span>
          </div>

          <div className="flex gap-3 bg-white p-3">
            <div
              className="h-16 w-16 shrink-0 rounded-lg border border-[#e1e8f0] bg-cover shadow-sm"
              style={{
                backgroundImage: "url('/business-locations-grid.png')",
                backgroundSize: "200% 200%",
                backgroundPosition: optimized ? "100% 100%" : "0% 0%",
              }}
            />
            <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><span className="truncate text-[12px] font-semibold">Your Business</span><span className="rounded-full px-2 py-1 text-[8px] font-bold" style={{ color: accent, background: optimized ? "#eaf2ff" : "#fce8e6" }}>{optimized ? "TOP 3" : "RANK #14"}</span></div><div className="mt-1 flex items-center text-[9px] text-[#5f6368]"><span>{optimized ? "4.8" : "3.2"}</span><span className="mx-1 flex">{[0,1,2,3,4].map((star) => <Star key={star} className={`h-2.5 w-2.5 ${optimized || star < 2 ? "fill-[#fbbc04] text-[#fbbc04]" : "text-[#dadce0]"}`} />)}</span><span>({optimized ? "127" : "8"}) · Business</span></div><div className="mt-1 text-[9px] text-[#70757a]">Open · On-site services</div><button className="mt-1.5 rounded-full border border-[#dadce0] px-3 py-1 text-[8px] font-semibold text-[#1a73e8]">{optimized ? "Call now" : "View details"}</button></div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">{items.map((item, index) => <motion.div key={item} initial={{ opacity: 0, x: optimized ? 10 : -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: .48 + index * .07 }} className="flex items-center gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: optimized ? "#eaf2ff" : "#fce8e6" }}>{optimized ? <Check className="h-3 w-3 text-[#2478e5]" /> : <X className="h-3 w-3 text-[#c5221f]" />}</span><span className="text-[12px] text-[#3c4043]">{item}</span></motion.div>)}</div>
      </div>

      <div className="mx-4 mb-4 flex items-center justify-between rounded-full px-4 py-2.5 text-[10px] font-semibold" style={{ color: accent, background: optimized ? "#eaf2ff" : "#fce8e6" }}><span>{optimized ? "10x calls increase · Rank #2" : "2 calls / month · Rank #14"}</span><ChevronRight className="h-3.5 w-3.5" /></div>
    </motion.article>
  );
}

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="before-after" ref={ref} className="relative overflow-hidden bg-[#060d1f] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,rgba(36,120,229,.07),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-14 text-center"><motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(36,120,229,.35)] bg-[rgba(36,120,229,.1)] px-3 py-1.5"><TrendingUp className="h-3 w-3 text-[#60a5fa]" /><span className="text-xs font-medium text-[#60a5fa]">Real Transformation</span></motion.div><motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: .1 }} className="text-3xl font-black text-white sm:text-5xl lg:text-6xl">From invisible to <span className="text-gradient-neon">searchable.</span></motion.h2><motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: .25 }} className="mx-auto mt-4 max-w-md text-base text-[#8899bb]">See exactly what changes when Get Real Flow optimizes your Google Business Profile.</motion.p></div>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row">
          <PlacePanel inView={inView} />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: .55, type: "spring", stiffness: 200 }} className="flex shrink-0 flex-col items-center justify-center gap-3 py-4 lg:px-2 lg:py-0"><div className="h-10 w-px bg-gradient-to-b from-transparent to-[rgba(36,120,229,.45)] lg:h-20" /><div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[rgba(36,120,229,.55)] bg-[rgba(36,120,229,.1)] shadow-[0_0_30px_rgba(36,120,229,.22)]"><ArrowDown className="h-5 w-5 text-[#60a5fa] lg:hidden" /><ArrowRight className="hidden h-5 w-5 text-[#60a5fa] lg:block" /></div><div className="text-center"><div className="text-xs font-bold text-[#60a5fa]">6 months</div><div className="text-[10px] text-[#8899bb]">guaranteed</div></div><div className="h-10 w-px bg-gradient-to-b from-[rgba(36,120,229,.45)] to-transparent lg:h-20" /></motion.div>
          <PlacePanel optimized inView={inView} />
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: .75 }} className="mt-10 grid grid-cols-3 gap-3">{[["10x","Avg. Call Growth"],["Top 3","Target Ranking"],["6 mo","Guarantee Period"]].map(([value,label]) => <div key={label} className="glass-card rounded-xl px-3 py-3 text-center"><div className="text-xl font-black text-gradient-neon">{value}</div><div className="mt-0.5 text-[11px] text-[#8899bb]">{label}</div></div>)}</motion.div>
      </div>
    </section>
  );
}
