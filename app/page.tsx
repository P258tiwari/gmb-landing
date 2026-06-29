import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemScroll from "@/components/ProblemScroll";
import AuditScanner from "@/components/AuditScanner";
import USPBucket from "@/components/USPBucket";
import BeforeAfter from "@/components/BeforeAfter";
import WhyAmpwake from "@/components/WhyAmpwake";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import AddOns from "@/components/AddOns";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemScroll />
      <AuditScanner />
      <USPBucket />
      <BeforeAfter />
      <WhyAmpwake />
      <Process />
      <Pricing />
      <Guarantee />
      <AddOns />
      <Industries />
      <CaseStudies />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
