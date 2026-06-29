"use client";

import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { uspChips } from "@/data/usps";
import { useGsapPin } from "@/hooks/useGsapPin";
import { useInView } from "@/hooks/useInView";

export default function USPBucket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [visibleChips, setVisibleChips] = useState<number[]>([]);
  const inView = useInView(sectionRef, "-100px");

  useGsapPin(
    sectionRef,
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 0.8,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const count = Math.ceil(self.progress * uspChips.length);
          setVisibleChips(Array.from({ length: count }, (_, i) => i));
        },
      });
    },
    () => {
      setVisibleChips(uspChips.map((_, i) => i));
    },
  );

  const allDone = visibleChips.length === uspChips.length;

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative min-h-screen md:h-[320vh]"
    >
      <div
        ref={stickyRef}
        className="md:sticky top-0 min-h-screen md:h-screen flex items-center justify-center overflow-hidden py-20 md:py-0"
        style={{ background: "#07101f" }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 70% 40%, rgba(77,159,255,0.07) 0%, transparent 55%)"
        }} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center w-full">
          <div className={`mb-8 transition-all duration-[600ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(77,159,255,0.3)] bg-[rgba(77,159,255,0.06)] mb-5">
              <span className="text-[#4d9fff] text-xs font-medium">Everything Included</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Your Google Profile Gets
            </h2>
            <p className="text-[#8899bb] text-base mt-3">
              Scroll to see everything we deliver — all in one plan.
            </p>
          </div>

          {/* Bucket card */}
          <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-[700ms] delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(13,27,58,0.95) 0%, rgba(6,13,31,0.98) 100%)",
              border: allDone ? "1px solid rgba(0,255,136,0.35)" : "1px solid rgba(77,159,255,0.2)",
              boxShadow: allDone ? "0 0 40px rgba(0,255,136,0.12)" : "none",
              transition: "all 0.5s ease",
            }}
          >
            <div className="px-5 pt-4 pb-1 border-b border-white/5 flex items-center justify-between">
              <span className="text-[#8899bb] text-xs">Optimization Package</span>
              <span className="text-xs font-mono" style={{ color: allDone ? "#00ff88" : "#4d9fff" }}>
                {visibleChips.length}/{uspChips.length} active
              </span>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 justify-center min-h-[180px] items-center">
                {uspChips.map((chip, i) => (
                  <div
                    key={chip}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      visibleChips.includes(i) ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
                    style={{
                      background: allDone ? "rgba(0,255,136,0.1)" : "rgba(77,159,255,0.08)",
                      border: allDone ? "1px solid rgba(0,255,136,0.25)" : "1px solid rgba(77,159,255,0.2)",
                      color: allDone ? "#00ff88" : "#4d9fff",
                      transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    {visibleChips.includes(i) && (
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    )}
                    {chip}
                  </div>
                ))}

                {visibleChips.length === 0 && (
                  <p className="text-[#8899bb]/40 text-sm">Scroll down to reveal...</p>
                )}
              </div>

              {/* Loading dots */}
              {!allDone && visibleChips.length > 0 && (
                <div className="flex justify-center gap-1 mt-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#4d9fff] animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {allDone && (
              <div
                className="px-5 pb-4 text-center"
                style={{ animation: "fadeIn 0.4s 0.3s ease forwards", opacity: 0 }}
              >
                <div className="py-3 rounded-xl border border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.08)]">
                  <p className="text-[#00ff88] text-sm font-semibold">
                    ✓ Everything optimized. Rankings on their way.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
