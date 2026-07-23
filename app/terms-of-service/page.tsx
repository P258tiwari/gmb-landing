import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service — Get Real Flow",
  description: "Terms and conditions for using Get Real Flow GMB Optimization services.",
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

export default function TermsOfService() {
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
          <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
          <p className="text-[#8899bb] text-sm">Last updated: June 2026</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By engaging with Get Real Flow&apos;s services — whether through this website, email, phone, or WhatsApp — you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </Section>

        <Section title="2. Services Provided">
          <p>Get Real Flow provides Google Business Profile (GMB) optimization and local SEO services, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>100-point GMB audits</li>
            <li>Profile setup and optimization</li>
            <li>Google Posts creation and publishing</li>
            <li>Photo uploads and management</li>
            <li>Review generation and response management</li>
            <li>Local citation building</li>
            <li>Ranking reports and analytics</li>
            <li>Google Maps Ads management (add-on)</li>
          </ul>
        </Section>

        <Section title="3. Plans and Pricing">
          <p>We offer three plans:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-white">Starter</strong> — ₹15,000/year or ₹2,500/month (min. 3 months)</li>
            <li><strong className="text-white">Growth</strong> — ₹20,000/year or ₹3,500/month (min. 3 months)</li>
            <li><strong className="text-white">Max</strong> — ₹30,000/year or ₹5,000/month (min. 3 months)</li>
          </ul>
          <p>All prices are exclusive of GST (18%). GST will be charged additionally as applicable under Indian law.</p>
        </Section>

        <Section title="4. Payment Terms">
          <p>Payment is due in advance before services commence. Annual plans are billed upfront. Monthly plans require payment at the start of each month. We accept bank transfer, UPI, and other agreed payment methods.</p>
          <p>Delayed payments may result in suspension of services until dues are cleared.</p>
        </Section>

        <Section title="5. Client Obligations">
          <p>To enable us to deliver results, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Provide accurate business information in a timely manner</li>
            <li>Grant necessary access to your Google Business Profile</li>
            <li>Follow our optimization recommendations</li>
            <li>Respond to our queries within 3 business days</li>
          </ul>
          <p>Failure to fulfil these obligations may void the money-back guarantee.</p>
        </Section>

        <Section title="6. Money-Back Guarantee">
          <p>We guarantee Top 3 rankings on Google Maps for the committed number of keywords (2, 5, or 8 depending on plan) within 6 months of the start date, provided the client fulfils their obligations under Clause 5.</p>
          <p>If the guarantee is not met, we will continue working at no additional charge until the target is reached, or issue a full refund of fees paid. The guarantee does not apply if the client has violated their obligations.</p>
        </Section>

        <Section title="7. Cancellation Policy">
          <p>Monthly plans may be cancelled after the minimum 3-month period with 30 days written notice to <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a>. Annual plans are non-refundable once work has commenced, except under the money-back guarantee conditions.</p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>All content, reports, strategies, and materials created by Get Real Flow remain the intellectual property of Get Real Flow until full payment is received. Upon payment, you are granted a non-exclusive licence to use the deliverables for your business.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>Get Real Flow is not liable for ranking changes caused by Google algorithm updates, changes to Google&apos;s platform policies, or actions taken by the client outside our recommendations. Our total liability is limited to the fees paid in the preceding 3 months.</p>
        </Section>

        <Section title="10. Governing Law">
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Kanpur, Uttar Pradesh.</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We reserve the right to update these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>
        </Section>

        <Section title="12. Contact">
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
