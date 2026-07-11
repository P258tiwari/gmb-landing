"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress-bar" style={{ width }} />

      {/* Floating pill navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-6 lg:px-8 pt-4">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? "rgba(6,13,31,0.92)" : "rgba(6,13,31,0.6)",
            backdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.45)"
              : "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <Image src="/logo.png" alt="Ampwake" width={130} height={36} className="h-9 w-auto object-contain" priority />
          </Link>

          {/* CTA */}
          <motion.a
            href="/free-audit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-xl bg-[#00ff88] text-[#060d1f] text-sm font-semibold hover:bg-[#00cc6a] transition-all"
          >
            Check Free Audit
          </motion.a>
        </motion.nav>
      </div>
    </>
  );
}
