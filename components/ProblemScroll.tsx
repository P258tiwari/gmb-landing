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
    color: "#1b63c3",
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
          scrub: 1.2,
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
          { opacity: 0, y: 40, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: step * 0.4, ease: "power2.out" },
          enterAt,
        );
        if (i < problems.length - 1) {
          tl.to(
            el,
            { opacity: 0, y: -30, filter: "blur(4px)", duration: step * 0.3, ease: "power2.in" },
            exitAt - step * 0.3,
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
        {/* Background blurred map grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(#4d9fff 1px, transparent 1px), linear-gradient(90deg, #4d9fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(77,159,255,0.07) 0%, transparent 65%)"
        }} />

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
