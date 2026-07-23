"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { AuditReport } from "@/lib/audit/types";

const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047";

interface Props {
  report: AuditReport;
}

export default function ManualReview({ report }: Props) {
  return (
    <div className="min-h-screen bg-[#060d1f] flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(36,120,229,0.11) 0%, transparent 60%)",
        }}
      />

      <header className="border-b border-white/5 py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="GetRealFlow" width={1200} height={280} className="h-8 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-[#8899bb] text-sm hover:text-white transition-colors">← Home</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{
              background: "rgba(36,120,229,0.09)",
              border: "2px solid rgba(36,120,229,0.32)",
              boxShadow: "0 16px 42px rgba(36,120,229,0.18)",
            }}
          >
            <CheckCircle2 className="w-9 h-9 text-[#2478e5]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-2xl font-black text-white mb-3">
              We received your audit request.
            </h1>
            <p className="text-[#8899bb] leading-relaxed mb-8">
              Some Google Maps links need manual verification. Our team will review your profile
              {(report.businessName ?? report.submittedName) && (
                <> for <span className="text-white font-medium">{report.businessName ?? report.submittedName}</span></>
              )}
              {(report.submittedCity ?? report.formattedAddress) && (
                <> in <span className="text-white font-medium">{report.submittedCity ?? report.formattedAddress}</span></>
              )}{" "}
              and send the audit shortly.
            </p>

            <div
              className="rounded-xl p-4 mb-8 text-left"
              style={{
                background: "#f7faff",
                border: "1px solid #cbdaf0",
              }}
            >
              <div className="flex items-center gap-2 text-sm text-[#8899bb] mb-3">
                <Clock className="w-4 h-4 text-[#2478e5]" />
                What happens next
              </div>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Our team reviews your Google Maps profile manually",
                  "We prepare a personalized audit report",
                  "You receive the report within 24–48 hours",
                  "We follow up with ranking recommendations",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#8899bb]">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: "#eaf2ff", color: "#2478e5" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <motion.a
              href={`https://wa.me/${WA_NUM}?text=Hi%20Get%20Real%20Flow%2C%20I%20submitted%20a%20GMB%20audit%20request${report.businessName ? `%20for%20${encodeURIComponent(report.businessName)}` : ""}.%20Can%20you%20expedite%20it%3F`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 14px 32px rgba(37,211,102,0.28)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base"
              style={{
                background: "#25d366",
                border: "1px solid #1ebd59",
                color: "#ffffff",
              }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: "#ffffff" }} />
              WhatsApp Us for Faster Audit
            </motion.a>

            <Link
              href="/"
              className="mt-4 block text-[#8899bb] text-sm hover:text-white transition-colors"
            >
              ← Back to Get Real Flow home
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
