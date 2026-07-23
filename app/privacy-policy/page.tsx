import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy — Get Real Flow",
  description: "Privacy policy for Get Real Flow GMB Optimization services.",
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

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-[#8899bb] text-sm">Last updated: June 2026</p>
        </div>

        <Section title="1. Who We Are">
          <p>Get Real Flow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a Google Business Profile optimization and local SEO service based in Kanpur, India. We can be reached at <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a> or +91 84520 13047.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When you submit a free audit request or contact us, we collect:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Your name and business name</li>
            <li>Phone number and email address</li>
            <li>City and business category</li>
            <li>Google Business Profile link (if provided)</li>
            <li>Any messages or queries you send us</li>
          </ul>
          <p>We also collect standard technical data such as browser type, IP address, and pages visited through analytics tools, used solely to improve our website.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Respond to your audit request or enquiry within 24 hours</li>
            <li>Deliver and manage our GMB optimization services</li>
            <li>Send service-related communications (reports, updates)</li>
            <li>Improve our website and services</li>
          </ul>
          <p>We do not use your information for unsolicited marketing without your explicit consent.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We do not sell, trade, or rent your personal information to third parties. We may share data only with:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Service providers who assist in delivering our services (e.g., email platforms), bound by confidentiality agreements</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by emailing <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a>.</p>
        </Section>

        <Section title="6. Cookies">
          <p>Our website may use cookies to enhance user experience and gather analytics data. You can disable cookies in your browser settings; however, some features of the website may not function correctly as a result.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, contact us at <a href="mailto:info@ampwake.com" className="text-[#00ff88] hover:underline">info@ampwake.com</a>.</p>
        </Section>

        <Section title="8. Security">
          <p>We take reasonable technical and organisational precautions to protect your personal data from unauthorised access, loss, or misuse. However, no internet transmission is fully secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. The latest version will always be available on this page with the updated date at the top.</p>
        </Section>

        <Section title="10. Contact Us">
          <p>For any privacy-related queries, reach out to us:</p>
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
