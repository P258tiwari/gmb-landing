"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047";

export default function AuditCTA() {
  return (
    <section
      className="rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,40,20,0.8) 0%, rgba(0,12,5,0.95) 100%)",
        border: "1px solid rgba(0,255,136,0.25)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-xs font-medium">
              Your profile has ranking potential
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Let&apos;s unlock it.
          </h2>
          <p className="text-[#8899bb] text-base max-w-lg mx-auto mb-8">
            Unlock complete competitor analysis, keyword ranking map, and full
            100-point GMB audit — and start getting more calls from Google Maps.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href={`https://wa.me/${WA_NUM}?text=Hi%20Ampwake%2C%20I%20want%20to%20unlock%20my%20full%20100-point%20GMB%20audit%20and%20discuss%20ranking%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,255,136,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#060d1f] bg-[#00ff88] hover:bg-[#00cc6a] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Ampwake
            </motion.a>

            <motion.a
              href={`https://wa.me/${WA_NUM}?text=Hi%20Ampwake%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#00ff88] transition-all"
              style={{ border: "1px solid rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.05)" }}
            >
              <Phone className="w-4 h-4" />
              Book Strategy Call
            </motion.a>

            <Link
              href="/#pricing"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#8899bb] hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="mt-6 text-[#8899bb] text-xs">
            Unlock complete competitor analysis, keyword ranking map, and full 100-point GMB audit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
