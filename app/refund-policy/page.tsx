import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Refund Policy — Get Real Flow",
  description: "Refund and money-back guarantee policy for Get Real Flow GMB Optimization services.",
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="text-[#8899bb] text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#030810]">
      <header className="border-b border-white/5 py-4 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="GetRealFlow" width={1200} height={280} className="h-9 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-[#8899bb] text-sm hover:text-white transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-12">
          <p className="text-[#00ff88] text-xs font-medium uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black text-white mb-3">Refund Policy</h1>
          <p className="text-[#8899bb] text-sm">Last updated: June 2026</p>
        </div>

        {/* Guarantee highlight */}
        <div
          className="rounded-2xl p-6 mb-12"
          style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <p className="text-[#00ff88] font-bold text-lg mb-2">Our Commitment</p>
          <p className="text-[#8899bb] text-sm leading-relaxed">
            We back every plan with a money-back guarantee. If we don&apos;t get your business to Top 3 on Google Maps for the committed keywords within 6 months, you get a <strong className="text-white">full refund</strong> — no questions asked.
          </p>
        </div>

        <Section title="1. Money-Back Guarantee">
          <p>Get Real Flow guarantees Top 3 Google Maps rankings for the following number of keywords, depending on your plan:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-white">Starter Plan</strong> — Top 3 for 2 keywords within 6 months</li>
            <li><strong className="text-white">Growth Plan</strong> — Top 3 for 5 keywords within 6 months</li>
            <li><strong className="text-white">Max Plan</strong> — Top 3 for 8 keywords within 6 months</li>
          </ul>
          <p>If these targets are not achieved within 6 months from the start date, we will first continue working at no additional charge. If results are still not achieved within a reasonable extended period, a full refund of fees paid will be issued.</p>
        </Section>

        <Section title="2. Eligibility for Refund">
          <p>To be eligible for the money-back guarantee, the following conditions must be met:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You have completed at least 6 months with us under the plan</li>
            <li>You provided all required business information on time</li>
            <li>You granted necessary access to your Google Business Profile throughout the engagement</li>
            <li>You followed our optimization recommendations without making conflicting changes to your profile</li>
            <li>Your business has not violated Google&apos;s Terms of Service</li>
            <li>Your account is in good standing with no outstanding payments</li>
          </ul>
        </Section>

        <Section title="3. Non-Refundable Situations">
          <p>Refunds will NOT be issued in the following cases:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Client did not provide required information or access within agreed timelines</li>
            <li>Client made unauthorized changes to their Google Business Profile against our recommendations</li>
            <li>Google suspended or removed the client&apos;s business listing due to policy violations</li>
            <li>Client cancelled the service before the 6-month guarantee period was complete</li>
            <li>Annual plan cancellations outside of guarantee conditions</li>
            <li>Setup fees for Google Ads management add-on</li>
          </ul>
        </Section>

        <Section title="4. Cancellation Refunds">
          <p><strong className="text-white">Monthly plans:</strong> No refund for the current billing period. Cancellation takes effect at the end of the current month after the minimum 3-month commitment is met.</p>
          <p><strong className="text-white">Annual plans:</strong> Non-refundable once work has commenced, except under the money-back guarantee conditions above.</p>
        </Section>

        <Section title="5. How to Claim a Refund">
          <p>To initiate a refund claim under the money-back guarantee:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Email us at <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a> with subject line &quot;Refund Claim&quot;</li>
            <li>Include your business name, plan, and start date</li>
            <li>We will review the claim within 5 business days</li>
            <li>If eligible, the refund will be processed within 7–10 business days via the original payment method</li>
          </ul>
        </Section>

        <Section title="6. GST on Refunds">
          <p>GST collected on payments is remitted to the government and cannot be refunded by Get Real Flow. Refunds will be issued for the base service amount exclusive of GST.</p>
        </Section>

        <Section title="7. Contact Us">
          <p>For any refund or cancellation queries:</p>
          <ul className="list-none space-y-1.5">
            <li>Email: <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a></li>
            <li>Phone: +91 84520 13047</li>
            <li>Address: Kanpur, Uttar Pradesh, India</li>
          </ul>
        </Section>
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-[#8899bb]/50">
        &copy; {new Date().getFullYear()} Get Real Flow. All rights reserved.
      </footer>
    </div>
  );
}
