"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Crosshair, MapPin, Mic, MoreVertical, Search, Star, X } from "lucide-react";

const places = [
  { name: "Kanpur Dental World", rating: "4.9", reviews: "1.2K", category: "Dentist", address: "124/10 · On-site services", tone: "#d9c9b5", imagePosition: "0% 0%" },
  { name: "Dr. Vij Dental Clinic", rating: "4.9", reviews: "1.4K", category: "Dentist", address: "Lal Quarter, main road", tone: "#b7d7d4", imagePosition: "100% 0%" },
  { name: "VarRdan Dental Clinic", rating: "5.0", reviews: "184", category: "Dental clinic", address: "Raja Tower Complex", tone: "#e3d5a8", imagePosition: "0% 100%" },
];

export default function GoogleMapsCard() {
  const [rank, setRank] = useState(14);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const interval = window.setInterval(() => setRank((value) => {
        if (value <= 3) { window.clearInterval(interval); return 3; }
        return value - 1;
      }), 100);
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  const isTop = rank <= 3;

  return (
    <motion.div initial={{ scale: .9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: .9, delay: .3, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[22px] border border-[#cbdaf0] bg-white shadow-[0_24px_60px_rgba(7,17,40,.18)]">
      <div className="border-b border-[#e5e7eb] px-4 pb-3 pt-4">
        <div className="flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-3 shadow-sm">
          <span className="flex-1 truncate text-[13px] text-[#3c4043]">best dentist near me</span>
          <X className="h-4 w-4 text-[#5f6368]" /><span className="h-5 w-px bg-[#dadce0]" />
          <Mic className="h-4 w-4 text-[#4285f4]" /><Search className="h-4 w-4 text-[#4285f4]" />
        </div>
        <div className="mt-3 flex gap-5 px-2 text-[11px] text-[#5f6368]">
          {["All", "Maps", "Images", "More"].map((tab) => <span key={tab} className={tab === "Maps" ? "border-b-2 border-[#1a73e8] pb-2 font-semibold text-[#1a73e8]" : "pb-2"}>{tab}</span>)}
        </div>
      </div>

      <div className="grid min-h-[390px] grid-cols-[52%_48%]">
        <div className="bg-white px-4 py-4 text-[#202124]">
          <div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-[10px] font-semibold"><MapPin className="h-3.5 w-3.5" /> Kanpur, Uttar Pradesh</div><MoreVertical className="h-4 w-4 text-[#5f6368]" /></div>
          <div className="mt-3 text-[22px]">Places</div>
          <div className="mt-3 space-y-3">
            {places.map((place, index) => (
              <motion.div key={place.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 + index * .1 }} className="flex gap-3">
                <div
                  className="h-[58px] w-[58px] shrink-0 rounded-lg border border-[#e1e8f0] bg-cover shadow-sm"
                  style={{
                    backgroundImage: "url('/business-locations-grid.png')",
                    backgroundSize: "200% 200%",
                    backgroundPosition: place.imagePosition,
                  }}
                />
                <div className="min-w-0 pt-0.5"><div className="truncate text-[11px] font-semibold">{place.name}</div><div className="mt-0.5 flex items-center text-[9px] text-[#5f6368]"><span>{place.rating}</span><span className="mx-1 flex">{[0,1,2,3,4].map((star) => <Star key={star} className="h-2.5 w-2.5 fill-[#fbbc04] text-[#fbbc04]" />)}</span><span>({place.reviews}) · {place.category}</span></div><div className="mt-1 truncate text-[9px] text-[#70757a]">{place.address}</div><div className="text-[9px] text-[#70757a]">On-site services</div></div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center rounded-full bg-[#f1f3f4] py-2 text-[10px] text-[#3c4043]">More places <ChevronRight className="ml-2 h-3 w-3" /></div>
          <motion.div className="mt-3 flex items-center gap-2 rounded-xl border px-3 py-2" animate={{ borderColor: isTop ? "#7fb2f5" : "#dfe3e7", backgroundColor: isTop ? "#eaf2ff" : "#ffffff" }}><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2478e5] text-xs font-bold" style={{ color: "#ffffff" }}>{isTop ? "★" : rank}</div><div><div className="text-[10px] font-bold text-[#123f80]">Your Business</div><div className="text-[9px] text-[#5f6368]">{isTop ? "Now visible in the top 3" : "Moving up in Maps results"}</div></div></motion.div>
        </div>

        <div className="relative overflow-hidden bg-[#e8f0e8]" style={{ backgroundImage: "linear-gradient(30deg, transparent 47%, #fff 48%, #fff 52%, transparent 53%), linear-gradient(150deg, transparent 44%, #fff 45%, #fff 49%, transparent 50%), linear-gradient(90deg, rgba(174,203,223,.45) 1px, transparent 1px), linear-gradient(rgba(174,203,223,.45) 1px, transparent 1px)", backgroundSize: "145px 120px, 180px 150px, 42px 42px, 42px 42px" }}>
          <div className="absolute left-[20%] top-[56%] -rotate-45 text-[10px] text-[#5f6368]">Mall Road</div><div className="absolute bottom-[24%] right-[10%] rotate-45 text-[10px] text-[#5f6368]">Canal Road</div><div className="absolute left-[28%] top-[45%] text-[15px] font-bold text-[#3c4043]">KANPUR</div>
          {[[24,28],[68,20],[38,64],[76,58],[57,78],[18,82]].map(([left, top], index) => <MapPin key={index} className="absolute h-5 w-5 fill-[#ea4335] drop-shadow" style={{ left: `${left}%`, top: `${top}%`, color: "#ffffff" }} />)}
          <motion.div className="absolute" animate={{ left: isTop ? "55%" : "82%", top: isTop ? "34%" : "82%" }} transition={{ duration: 1.5, ease: "easeInOut" }}><div className="relative"><MapPin className="h-8 w-8 fill-[#2478e5] drop-shadow-lg" style={{ color: "#ffffff" }} />{isTop && <span className="absolute inset-0 rounded-full bg-[#4285f4]/30 animate-ping" />}</div></motion.div>
          <div className="absolute right-3 top-3 rounded-full border border-white/70 bg-[#2478e5] px-3 py-2 text-[9px] font-semibold shadow-md" style={{ color: "#ffffff" }}>Open in Maps</div>
          <div className="absolute bottom-3 right-3 flex flex-col gap-2"><button aria-label="Find my location" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5f6368] shadow"><Crosshair className="h-4 w-4" /></button><div className="overflow-hidden rounded-lg bg-white text-center text-[#5f6368] shadow"><div className="border-b px-2 py-1 text-base">+</div><div className="px-2 py-1 text-base">−</div></div></div>
          <div className="absolute bottom-2 left-3 rounded bg-white/80 px-1 text-[8px] text-[#5f6368]">Map data ©2026</div>
        </div>
      </div>
    </motion.div>
  );
}
