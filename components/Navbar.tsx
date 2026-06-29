"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#why", label: "Why Us" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#guarantee", label: "Guarantee" },
  { href: "#addons", label: "Add-On" },
  { href: "#case-studies", label: "Case Study" },
  { href: "#faq", label: "FAQs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                  style={{ color: isActive ? "#fff" : "#8899bb" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="/free-audit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:block px-4 py-2 rounded-xl bg-[#00ff88] text-[#060d1f] text-sm font-semibold hover:bg-[#00cc6a] transition-all"
            >
              Free Audit
            </motion.a>

            <button
              className="lg:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[72px] left-6 right-6 max-w-7xl mx-auto rounded-2xl px-5 pb-5 pt-3"
              style={{
                background: "rgba(6,13,31,0.97)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left text-base px-3 py-2.5 rounded-lg transition-colors"
                      style={{
                        color: isActive ? "#fff" : "#8899bb",
                        background: isActive ? "rgba(0,255,136,0.08)" : "transparent",
                      }}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <a
                  href="/free-audit"
                  className="mt-2 w-full py-3 rounded-xl bg-[#00ff88] text-[#060d1f] font-semibold text-sm text-center block"
                >
                  Free Audit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
