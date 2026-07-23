"use client";

import { useRef } from "react";
import { Search, Settings, Image, TrendingUp, Trophy, MapPin } from "lucide-react";
import { processSteps } from "@/data/usps";
import { useInView } from "@/hooks/useInView";

const iconMap: Record<string, React.ElementType> = { Search, Settings, Image, TrendingUp, Trophy };

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-60px");

  return (
    <section id="how-it-works" ref={ref} className="py-20 lg:py-28 relative overflow-hidden border-y border-[#e8eaed] bg-[#f8fafd]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 85% 25%, rgba(66,133,244,0.12) 0%, transparent 48%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#a8c7fa] bg-[#e8f0fe] mb-5 transition-all duration-[600ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span className="text-[#174ea6] text-xs font-semibold">Your Google Maps growth roadmap</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#202124] transition-all duration-[600ms] delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            From overlooked to visible in the{" "}
            <span className="text-[#1a73e8]">Google Map Pack.</span>
          </h2>
          <p
            className={`mt-5 text-[#5f6368] leading-7 text-base max-w-2xl mx-auto transition-opacity duration-[600ms] delay-200 ${inView ? "opacity-100" : "opacity-0"}`}
          >
            We improve every part of your Google Business Profile, then track the local signals that turn searches into calls, visits, and customers.
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
                background: "linear-gradient(90deg, #a8c7fa 0%, #fdd663 55%, #f6aea9 100%)",
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.2s ease-in-out 0.5s",
              }}
            />

            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const colors = ["#1a73e8", "#4285f4", "#f9ab00", "#ea4335", "#1967d2"];
              const color = colors[i];

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
                      background: "#ffffff",
                      border: "4px solid #f8fafd",
                      boxShadow: "0 3px 12px rgba(60,64,67,0.18)",
                    }}
                  >
                    {Icon && <Icon className="w-6 h-6" style={{ color }} />}
                    <div
                      className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{
                        background: color,
                        color: "#fff",
                        zIndex: 2,
                      }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-[#202124] font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-[#5f6368] text-xs leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical cards */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#a8c7fa]" />

          <div className="space-y-4 pl-4">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const colors = ["#1a73e8", "#4285f4", "#f9ab00", "#ea4335", "#1967d2"];
              const color = colors[i];
              return (
                <div
                  key={step.step}
                  className="flex gap-4 items-start rounded-xl p-4 ml-4 transition-all duration-[500ms]"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dadce0",
                    boxShadow: "0 2px 8px rgba(60,64,67,0.07)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-15px)",
                    transitionDelay: `${0.1 + i * 0.08}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: "#f8fafd",
                      border: `1px solid ${color}55`,
                    }}
                  >
                    {Icon && <Icon className="w-5 h-5" style={{ color }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold" style={{ color }}>{step.step}</span>
                      <h3 className="text-[#202124] font-semibold text-sm">{step.title}</h3>
                    </div>
                    <p className="text-[#5f6368] text-xs leading-relaxed">{step.body}</p>
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
