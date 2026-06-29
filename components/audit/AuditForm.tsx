"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, MapPin, AlertCircle, User, Phone } from "lucide-react";
import AuditLoading from "@/components/audit/AuditLoading";

export default function AuditForm() {
  const router = useRouter();
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim()) {
      e.phone = "Please enter your phone number";
    } else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (!googleMapsUrl.trim()) {
      e.url = "Please enter your Google Maps URL";
    } else if (
      !/maps\.google|g\.page|goo\.gl\/maps|maps\.app\.goo\.gl|google\.com\/maps/.test(googleMapsUrl)
    ) {
      e.url = "Enter a valid Google Maps link";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/audit/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleMapsUrl, name: name.trim(), phone: phone.trim(), source: "free_audit_page" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push(`/audit-report/${data.reportId}`);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  if (loading) return <AuditLoading />;

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#4a5a7a] focus:outline-none transition-all duration-200 ${
      errors[field]
        ? "border border-red-500/50 focus:border-red-500/70"
        : "border border-white/10 focus:border-[rgba(0,255,136,0.4)] focus:bg-white/[0.06]"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name + Phone — 50/50 on desktop, stacked on mobile */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[#8899bb] text-xs font-medium mb-1.5">
            <User className="w-3.5 h-3.5 inline mr-1 text-[#00ff88]" />
            Your Name
          </label>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: "" })); }}
            type="text"
            placeholder="Rahul Sharma"
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[#8899bb] text-xs font-medium mb-1.5">
            <Phone className="w-3.5 h-3.5 inline mr-1 text-[#00ff88]" />
            Phone Number
          </label>
          <div className={`flex overflow-hidden ${errors.phone ? "rounded-xl border border-red-500/50" : "rounded-xl border border-white/10 focus-within:border-[rgba(0,255,136,0.4)]"} transition-all duration-200`}>
            <span className="flex items-center px-3 bg-white/[0.03] text-[#8899bb] text-sm border-r border-white/10 shrink-0 select-none">
              +91
            </span>
            <input
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(digits);
                if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
              }}
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              maxLength={10}
              className="flex-1 bg-white/[0.04] px-3 py-3.5 text-white text-sm placeholder-[#4a5a7a] focus:outline-none focus:bg-white/[0.06] transition-all duration-200"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Google Maps URL */}
      <div className="mb-6">
        <label className="block text-[#8899bb] text-xs font-medium mb-1.5">
          <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#00ff88]" />
          Google Maps URL
        </label>
        <input
          value={googleMapsUrl}
          onChange={(e) => { setGoogleMapsUrl(e.target.value); if (errors.url) setErrors((p) => ({ ...p, url: "" })); }}
          type="url"
          placeholder="https://maps.app.goo.gl/... or https://maps.google.com/..."
          className={inputClass("url")}
        />
        {errors.url ? (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.url}
          </p>
        ) : (
          <p className="text-[#8899bb] text-xs mt-1.5">
            Open your business on Google Maps → tap Share → copy the link
          </p>
        )}
      </div>

      {apiError && (
        <div
          className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {apiError}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-[#00ff88] text-[#060d1f] font-bold text-base flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] active:scale-[0.97] transition-all"
      >
        <Send className="w-4 h-4" />
        Generate My Free Audit →
      </button>

      <p className="mt-4 text-center text-[#8899bb] text-xs">
        Free public audit using Google Maps data. No credit card required.
      </p>
    </form>
  );
}
