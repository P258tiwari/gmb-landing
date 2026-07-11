import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shield, Star, Clock } from "lucide-react";
import AuditForm from "@/components/audit/AuditForm";

export const metadata: Metadata = {
  title: "Free GMB Audit — Get Real Flow",
  description:
    "Get a free AI-powered Google Business Profile audit. See your public visibility score, what's missing, and what's costing you calls.",
  alternates: {
    canonical: "/free-audit",
  },
  openGraph: {
    title: "Free GMB Audit - Get Real Flow",
    description:
      "Get a free AI-powered Google Business Profile audit and see what's costing you calls from Google Maps.",
    url: "/free-audit",
  },
};

const TRUST = [
  { icon: Shield, text: "100% Free — No Credit Card" },
  { icon: Star, text: "Real Google Maps Data" },
  { icon: Clock, text: "Report in Under 30 Seconds" },
];

export default function FreeAuditPage() {
  return (
    <div className="min-h-screen bg-[#060d1f]">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(0,255,136,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="border-b border-white/5 py-4 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Get Real Flow"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-[#8899bb] text-sm hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 lg:px-8 py-14 relative">
        {/* Hero text */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-xs font-medium">
              Free AI-Powered GMB Audit
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Find out why your business
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00ff88 0%, #4d9fff 100%)",
              }}
            >
              is not ranking on Google.
            </span>
          </h1>
          <p className="text-[#8899bb] text-base max-w-md mx-auto">
            Submit your Google Maps URL and we&apos;ll generate a public visibility
            audit with your score, gaps, and what to fix first.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {TRUST.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-[#8899bb]">
              <Icon className="w-3.5 h-3.5 text-[#00ff88]" />
              {text}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-6 lg:p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <AuditForm />
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[#8899bb]/60 text-xs leading-relaxed">
          This free report uses publicly available Google Maps profile data. Complete
          keyword tracking, competitor benchmarking, citation audit, and owner-level
          performance insights are available after onboarding.
        </p>
      </main>
    </div>
  );
}
