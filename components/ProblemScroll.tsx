"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useGsapPin } from "@/hooks/useGsapPin";

const problems = [
  {
    text: "No Calls.",
    sub: "Your phone stays silent while competitors are flooded with inquiries.",
    color: "#ff4444",
  },
  {
    text: "Low Ranking.",
    sub: "You're buried below rank #10 while competitors own the Top 3.",
    color: "#071128",
  },
  {
    text: "Incomplete Profile.",
    sub: "Google ignores incomplete profiles. You're sending the wrong signals.",
    color: "#2478e5",
  },
  {
    text: "Competitors Winning.",
    sub: "Every day you're not in Top 3, someone else takes your customer.",
    color: "#4d9fff",
  },
];

export default function ProblemScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useGsapPin(
    sectionRef,
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          scrub: 1.8,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      const step = 1 / problems.length;
      problems.forEach((_, i) => {
        const el = wordsRef.current[i];
        if (!el) return;
        const enterAt = i * step;
        const exitAt = (i + 1) * step;
        tl.fromTo(
          el,
          { opacity: 0, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: step * 0.55, ease: "power2.out" },
          enterAt,
        );
        if (i < problems.length - 1) {
          tl.to(
            el,
            { opacity: 0, y: -20, filter: "blur(3px)", duration: step * 0.4, ease: "power2.inOut" },
            exitAt - step * 0.4,
          );
        }
      });

      if (lineRef.current) {
        tl.fromTo(lineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.85);
      }
    },
    () => {
      wordsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      });
    },
  );

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative min-h-screen md:h-[360vh]"
    >
      <div
        ref={stickyRef}
        className="md:sticky top-0 min-h-screen md:h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#f8fafd" }}
      >
        {/* Subtle Google Maps-inspired background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "#edf4f2",
            backgroundImage:
              "linear-gradient(90deg, rgba(151,185,210,.22) 1px, transparent 1px), linear-gradient(rgba(151,185,210,.22) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute -left-[6%] top-[20%] h-8 w-[42%] -rotate-[8deg] rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(203,218,232,.32)]" />
        <div className="absolute -right-[5%] top-[66%] h-7 w-[46%] rotate-[11deg] rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(203,218,232,.32)]" />
        <div className="absolute left-[31%] -top-[10%] h-[120%] w-6 rotate-[18deg] rounded-full bg-white/65" />
        <div className="absolute left-[7%] bottom-[14%] h-12 w-44 rounded-[45%] bg-[#dcefdc]/55" />
        <div className="absolute right-[7%] top-[15%] h-16 w-44 rounded-[48%] bg-[#d9edf7]/52" />
        <div className="absolute left-[12%] top-[34%] text-[11px] font-medium tracking-wide text-[#7c8b91]/55">Mall Road</div>
        <div className="absolute right-[18%] bottom-[26%] rotate-[11deg] text-[11px] font-medium tracking-wide text-[#7c8b91]/55">Canal Road</div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(248,250,253,0.48) 72%, rgba(248,250,253,0.78) 100%)"
        }} />
        <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-white via-white/75 to-transparent" />

        {/* Problem Label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-400 text-xs font-medium tracking-wide">The Reality Right Now</span>
        </div>

        {/* Desktop: overlapping words */}
        <div className="hidden md:block relative z-10 w-full max-w-5xl mx-auto px-8 text-center">
          <div className="relative" style={{ height: "220px" }}>
            {problems.map((item, i) => (
              <div
                key={i}
                ref={(el) => { wordsRef.current[i] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ opacity: 0 }}
              >
                <h2
                  className="font-black tracking-tight leading-none whitespace-nowrap"
                  style={{
                    color: item.color,
                    textShadow: `0 0 80px ${item.color}44`,
                    fontSize: "clamp(2.5rem, 8vw, 9rem)",
                  }}
                >
                  {item.text}
                </h2>
                <p className="text-[#8899bb] text-base mt-4 max-w-3xl mx-auto">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom copy — fades in at end */}
          <div ref={lineRef} className="mt-10 opacity-0">
            <p className="text-xl lg:text-2xl font-semibold text-[#8899bb] max-w-2xl mx-auto leading-relaxed">
              If your business is not visible in the top results,{" "}
              <span className="text-white">your competitors are getting the calls, visits, and bookings</span>{" "}
              that should be yours.
            </p>
          </div>
        </div>

        {/* Mobile: scroll-reveal one by one */}
        <div className="md:hidden w-full text-center">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              className="min-h-[65vh] flex flex-col items-center justify-center px-6"
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2
                className="text-5xl font-black"
                style={{ color: item.color, textShadow: `0 0 60px ${item.color}44` }}
              >
                {item.text}
              </h2>
              <p className="text-[#8899bb] text-sm mt-3 max-w-xs">{item.sub}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-6 py-12 border-t border-white/10"
          >
            <p className="text-base font-semibold text-[#8899bb]">
              If your business is not in the Top 3,{" "}
              <span className="text-white">your competitors are getting your customers.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
