"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { AuditReport } from "@/lib/audit/types";

interface Props {
  report: AuditReport;
}

export default function ReportHero({ report }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const date = new Date(report.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Floating pill navbar — same style as Navbar.tsx */}
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
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Ampwake"
              width={130}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Report meta — center */}
          <div className="hidden md:flex items-center gap-5 text-xs text-[#8899bb]">
            {(report.submittedCategory ?? report.primaryCategory) && (
              <>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#00ff88]" />
                  {report.submittedCategory ?? report.primaryCategory}
                </span>
                <span className="w-px h-3 bg-white/10" />
              </>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#00ff88]" />
              {date}
            </span>
          </div>

          {/* CTA */}
          <motion.a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047"}?text=Hi%20Ampwake%2C%20I%20want%20to%20unlock%20my%20full%20GMB%20audit.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-xl bg-[#00ff88] text-[#060d1f] text-sm font-semibold hover:bg-[#00cc6a] transition-all flex-shrink-0"
          >
            Unlock Full Audit
          </motion.a>
        </motion.nav>
      </div>

      {/* Spacer matching navbar height (56px pill + 16px top padding) */}
      <div style={{ height: "80px" }} />
    </>
  );
}
