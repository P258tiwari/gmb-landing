"use client";

import { useRef } from "react";
import { Search, Settings, Image, TrendingUp, Trophy } from "lucide-react";
import { processSteps } from "@/data/usps";
import { useInView } from "@/hooks/useInView";

const iconMap: Record<string, React.ElementType> = { Search, Settings, Image, TrendingUp, Trophy };

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-60px");

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#060d1f" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 65%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-5 transition-all duration-[600ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <span className="text-[#00ff88] text-xs font-medium">The Process</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-[600ms] delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            How we get you to{" "}
            <span className="text-gradient-neon">Top 3.</span>
          </h2>
          <p
            className={`mt-4 text-[#8899bb] text-base max-w-2xl mx-auto transition-opacity duration-[600ms] delay-200 ${inView ? "opacity-100" : "opacity-0"}`}
          >
            A clear, systematic process from your first audit to a sustained Top 3 ranking.
          </p>
        </div>

        {/* Desktop: connected timeline */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-5 gap-0">
            {/* Connector line */}
            <div
              className="absolute h-px origin-left"
              style={{
                top: "32px",
                left: "10%",
                right: "10%",
                zIndex: 0,
                background: "linear-gradient(90deg, rgba(77,159,255,0.4) 0%, rgba(0,255,136,0.6) 100%)",
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.2s ease-in-out 0.5s",
              }}
            />

            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isFinal = i === processSteps.length - 1;
              const progress = i / (processSteps.length - 1);
              const color = isFinal ? "#00ff88" : `rgba(77,159,255,${0.5 + progress * 0.5})`;

              return (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center text-center px-3 transition-all duration-[600ms]"
                  style={{
                    zIndex: 1,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="relative flex items-center justify-center mb-5 rounded-2xl"
                    style={{
                      width: 64,
                      height: 64,
                      background: isFinal ? "#0a2016" : "#0a1628",
                      border: `1px solid ${color}`,
                      boxShadow: isFinal ? "0 0 30px rgba(0,255,136,0.2)" : "none",
                    }}
                  >
                    {Icon && <Icon className="w-6 h-6" style={{ color }} />}
                    <div
                      className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{
                        background: isFinal ? "#00ff88" : "#1a4a8a",
                        color: isFinal ? "#060d1f" : "#fff",
                        zIndex: 2,
                      }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-[#8899bb] text-xs leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical cards */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, rgba(77,159,255,0.3) 0%, rgba(0,255,136,0.5) 100%)" }} />

          <div className="space-y-4 pl-4">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isFinal = i === processSteps.length - 1;
              const color = isFinal ? "#00ff88" : "#4d9fff";
              return (
                <div
                  key={step.step}
                  className="flex gap-4 items-start rounded-xl p-4 ml-4 transition-all duration-[500ms]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-15px)",
                    transitionDelay: `${0.1 + i * 0.08}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: isFinal ? "rgba(0,255,136,0.1)" : "rgba(77,159,255,0.08)",
                      border: `1px solid ${color}40`,
                    }}
                  >
                    {Icon && <Icon className="w-5 h-5" style={{ color }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold" style={{ color }}>{step.step}</span>
                      <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                    </div>
                    <p className="text-[#8899bb] text-xs leading-relaxed">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
