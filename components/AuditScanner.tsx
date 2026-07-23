"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Circle, Zap } from "lucide-react";
import { auditChecklist } from "@/data/usps";
import { useGsapPin } from "@/hooks/useGsapPin";
import { useInView } from "@/hooks/useInView";

export default function AuditScanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [litItems, setLitItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const inView = useInView(sectionRef, "-100px");

  useGsapPin(
    sectionRef,
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const count = Math.floor(progress * auditChecklist.length);
          setLitItems(Array.from({ length: count }, (_, i) => i));
          setScore(Math.round(progress * 100));
          if (scanLineRef.current && listRef.current) {
            const h = listRef.current.getBoundingClientRect().height;
            gsap.set(scanLineRef.current, { y: progress * h });
          }
        },
      });
    },
    () => {
      setLitItems(auditChecklist.map((_, i) => i));
      setScore(100);
    },
  );

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="relative min-h-screen md:h-[320vh]"
    >
      <div
        ref={stickyRef}
        className="md:sticky top-0 min-h-screen md:h-screen flex items-center justify-center overflow-hidden py-20 md:py-0"
        style={{ background: "#f8fafd" }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 25% 50%, rgba(36,120,229,0.08) 0%, transparent 55%)"
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(36,120,229,0.3)] bg-[rgba(36,120,229,0.07)] mb-4 transition-all duration-[600ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <Zap className="w-3 h-3 text-[#2478e5]" />
              <span className="text-[#2478e5] text-xs font-medium">100-Point Audit System</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-[600ms] delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              We optimize what{" "}
              <span className="text-gradient-neon">Google actually checks.</span>
            </h2>
            <p className={`mt-3 text-[#8899bb] text-base max-w-xl mx-auto transition-opacity duration-[600ms] delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>
              Our 100-point system fixes the signals most local businesses ignore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Scanner */}
            <div
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-[700ms] delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
              style={{ border: "1px solid rgba(36,120,229,0.18)" }}
            >
              {/* Title bar */}
              <div className="bg-[#0a1628] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[#8899bb] text-xs ml-2">GMB Audit Scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${score < 100 ? "bg-yellow-400 animate-pulse" : "bg-[#2478e5]"}`} />
                  <span className="text-[#2478e5] text-xs font-mono font-bold">{score}/100</span>
                </div>
              </div>

              {/* Checklist grid */}
              <div className="p-4 relative">
                <div
                  ref={scanLineRef}
                  className="absolute left-4 right-4 h-0.5 z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #2478e5 30%, #60a5fa 70%, transparent 100%)",
                    boxShadow: "0 0 12px 2px rgba(36,120,229,0.35)",
                    top: 16,
                  }}
                />

                <div ref={listRef} className="grid grid-cols-2 gap-1.5">
                  {auditChecklist.map((item, i) => {
                    const isLit = litItems.includes(i);
                    return (
                      <div
                        key={item}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors duration-[250ms] ${
                          isLit
                            ? "bg-[rgba(36,120,229,0.08)] border-[rgba(36,120,229,0.3)]"
                            : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)]"
                        }`}
                      >
                        <div className={`transition-all duration-200 ${isLit ? "scale-100 opacity-100" : "scale-[0.8] opacity-30"}`}>
                          {isLit
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-[#2478e5] flex-shrink-0" />
                            : <Circle className="w-3.5 h-3.5 text-[#8899bb] flex-shrink-0" />
                          }
                        </div>
                        <span className={`text-[11px] font-medium transition-colors duration-300 ${isLit ? "text-white" : "text-[#8899bb]/50"}`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-4 pb-4">
                <div className="flex justify-between text-[10px] text-[#8899bb] mb-1.5">
                  <span>Optimization Progress</span>
                  <span className="text-[#2478e5] font-semibold">{score}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${score}%`,
                      background: "linear-gradient(90deg, #2478e5, #60a5fa)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className={`space-y-4 transition-all duration-[700ms] delay-[400ms] ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}>
              <div className="glass-card rounded-xl p-5 border border-white/5">
                <h3 className="text-white font-semibold mb-2 text-sm">Why most local businesses are invisible</h3>
                <p className="text-[#8899bb] text-sm leading-relaxed">
                  Google evaluates over 100 signals before deciding which business shows in the Top 3. Most owners set up their profile once and never touch it again — leaving ranking points on the table every single day.
                </p>
              </div>
              <div className="glass-card rounded-xl p-5 border border-white/5">
                <h3 className="text-white font-semibold mb-2 text-sm">What we fix for you</h3>
                <p className="text-[#8899bb] text-sm leading-relaxed">
                  From incomplete categories to missing Q&A, unanswered reviews to citation inconsistencies — every item on our checklist directly impacts your ranking. We fix all of it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="neon-border rounded-xl p-4 text-center" style={{ background: "rgba(36,120,229,0.05)" }}>
                  <div className="text-3xl font-black text-[#2478e5]">100</div>
                  <div className="text-white text-xs font-medium mt-1">Ranking Factors</div>
                  <div className="text-[#8899bb] text-[10px]">Audited & optimized</div>
                </div>
                <div className="rounded-xl p-4 text-center border border-[rgba(77,159,255,0.2)]" style={{ background: "rgba(77,159,255,0.04)" }}>
                  <div className="text-3xl font-black text-[#4d9fff]">6mo</div>
                  <div className="text-white text-xs font-medium mt-1">Average Timeline</div>
                  <div className="text-[#8899bb] text-[10px]">To Top 3 position</div>
                </div>
              </div>

              {score === 100 && (
                <div
                  className="neon-border rounded-xl p-4 text-center"
                  style={{ background: "rgba(36,120,229,0.08)", animation: "fadeIn 0.4s ease forwards" }}
                >
                  <span className="text-[#2478e5] text-sm font-semibold">
                    ✓ Profile fully optimized — rankings incoming
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
