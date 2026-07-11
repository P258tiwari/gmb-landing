"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2, MessageCircle, Send, ChevronDown, Check } from "lucide-react";

const categories = [
  "Doctors & Dentists",
  "Clinic / Hospital",
  "Salon / Spa",
  "Cafe / Restaurant",
  "Retail Shop",
  "Coaching Center",
  "Real Estate",
  "Plumber / Electrician",
  "Other",
];

const problems = [
  "Low Ranking",
  "No Calls",
  "Bad Reviews",
  "New Business",
  "Need Full Audit",
];

/* ── Custom Dropdown ─────────────────────────────────────────── */
function CustomSelect({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  /* close on outside click — also exclude the portal dropdown itself */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!wrapRef.current?.contains(target) && !dropdownRef.current?.contains(target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen((o) => !o);
  };

  /* keep position in sync while open */
  useEffect(() => {
    if (!open) return;
    const update = () => { if (btnRef.current) setRect(btnRef.current.getBoundingClientRect()); };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
  }, [open]);

  const dropdown = rect && open && createPortal(
    <AnimatePresence>
      {open && (
        <motion.ul
          ref={dropdownRef}
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden py-1"
          data-lenis-prevent
          style={{
            position: "fixed",
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
            maxHeight: 240,
            overflowY: "auto",
            zIndex: 99999,
            background: "#0a1628",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
          }}
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors duration-150"
                  style={{
                    color: selected ? "#00ff88" : "#ccd6f0",
                    background: selected ? "rgba(0,255,136,0.07)" : "transparent",
                  }}
                  onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {opt}
                  {selected && <Check className="w-3.5 h-3.5 text-[#00ff88]" />}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm transition-all duration-200 text-left cursor-pointer"
        style={{
          background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
          border: open ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(255,255,255,0.10)",
          color: value ? "#fff" : "#4a5a7a",
        }}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: "#8899bb", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {dropdown}
    </div>
  );
}

/* ── Form ────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  business: string;
  phone: string;
  city: string;
  category: string;
  profileLink: string;
  problem: string;
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    business: "",
    phone: "",
    city: "",
    category: "",
    profileLink: "",
    problem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.category || !form.problem) {
      setError("Please select your business category and main problem.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    setSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries(
        [...params.entries()].filter(([key]) => key.toLowerCase().startsWith("utm_"))
      );

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: phoneDigits,
          website,
          pageUrl: window.location.href,
          utm,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5a7a] focus:outline-none focus:border-[rgba(0,255,136,0.4)] focus:bg-white/[0.06] transition-all duration-200";
  const labelClass = "block text-[#8899bb] text-xs font-medium mb-1.5";

  return (
    <section id="final-cta" ref={ref} className="py-24 lg:py-32 bg-[#030810] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.07) 0%, transparent 65%)"
      }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-xs font-medium">Free Audit — No Credit Card Required</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-white text-center"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Find out why your business
            <br />
            <span className="text-gradient-neon">is not ranking.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#8899bb] text-lg max-w-2xl mx-auto"
          >
            Book a free GMB audit and see what your competitors are doing better.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card rounded-2xl border border-white/8 overflow-visible"
        >
          {submitted ? (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-[rgba(0,255,136,0.15)] border-2 border-[#00ff88] flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: "0 0 40px rgba(0,255,136,0.3)" }}
              >
                <Send className="w-8 h-8 text-[#00ff88]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Audit Request Received!</h3>
              <p className="text-[#8899bb] max-w-md mx-auto">
                Our team will review your Google Business Profile and reach out within 24 hours with a personalized audit report.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 lg:p-8">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Raj Sharma" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Name *</label>
                  <input name="business" value={form.business} onChange={handleChange} required placeholder="Sharma Dental Clinic" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <div className="flex overflow-hidden rounded-xl border border-white/10 focus-within:border-[rgba(0,255,136,0.4)] transition-all duration-200">
                    <span className="flex items-center px-3 bg-white/[0.03] text-[#8899bb] text-sm border-r border-white/10 shrink-0 select-none">+91</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setForm((prev) => ({ ...prev, phone: digits }));
                      }}
                      required
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      maxLength={10}
                      className="flex-1 bg-white/[0.04] px-3 py-3 text-white text-sm placeholder-[#4a5a7a] focus:outline-none focus:bg-white/[0.06] transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} required placeholder="Mumbai" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Business Category *</label>
                  <CustomSelect
                    placeholder="Select category"
                    options={categories}
                    value={form.category}
                    onChange={(v) => setForm((p) => ({ ...p, category: v }))}
                  />
                </div>

                <div>
                  <label className={labelClass}>Main Problem *</label>
                  <CustomSelect
                    placeholder="Select your problem"
                    options={problems}
                    value={form.problem}
                    onChange={(v) => setForm((p) => ({ ...p, problem: v }))}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={labelClass}>Google Business Profile Link</label>
                <input name="profileLink" value={form.profileLink} onChange={handleChange} type="url" placeholder="https://g.page/your-business" className={inputClass} />
              </div>

              {error && (
                <div
                  className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                  }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,255,136,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-4 rounded-xl bg-[#00ff88] text-[#060d1f] font-bold text-base flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "Submitting..." : "Book My Free Audit"}
                </motion.button>

                <motion.a
                  href="https://wa.me/919876543210?text=Hi%20Get%20Real%20Flow%2C%20I%27d%20like%20a%20free%20GMB%20audit%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[rgba(37,211,102,0.4)] text-[#25d366] font-semibold text-sm hover:bg-[rgba(37,211,102,0.08)] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us Now
                </motion.a>
              </div>

              <p className="mt-4 text-center text-[#8899bb] text-xs">
                We respond within 24 hours. No spam, no sales calls unless you want them.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
