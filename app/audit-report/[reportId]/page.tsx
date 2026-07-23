import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReport } from "@/lib/audit/reportStorage";
import ReportHero from "@/components/audit/ReportHero";
import ScoreRing from "@/components/audit/ScoreRing";
import ScoreBreakdownChart from "@/components/audit/ScoreBreakdownChart";
import FindingCard from "@/components/audit/FindingCard";
import Recommendations from "@/components/audit/Recommendations";
import RecommendedPlan from "@/components/audit/RecommendedPlan";
import AuditCTA from "@/components/audit/AuditCTA";
import ManualReview from "@/components/audit/ManualReview";
import ScrollReset from "@/components/audit/ScrollReset";
import type { AuditReport } from "@/lib/audit/types";

const WA_NUM =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918452013047";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>;
}): Promise<Metadata> {
  const { reportId } = await params;
  const report = await getReport(reportId);
  const name = report?.businessName ?? "Your Business";
  return {
    title: `Public GMB Optimization Score — ${name} | Get Real Flow`,
    description: `Free public GMB audit for ${name}. Score: ${report?.publicAuditScore ?? "—"}/100. See what's holding your Google Maps visibility back.`,
    robots: { index: false, follow: false },
  };
}

export default async function AuditReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const report: AuditReport | null = await getReport(reportId);

  if (!report) notFound();

  if (report.status === "manual_review") {
    return <ManualReview report={report} />;
  }

  const aiSummary = report.aiSummary;
  const bd = report.scoreBreakdown;

  const date = new Date(report.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const waHref = `https://wa.me/${WA_NUM}?text=Hi%20Get%20Real%20Flow%2C%20I%27d%20like%20to%20connect%20and%20improve%20my%20GMB%20profile.`;

  return (
    <div className="audit-report-surface min-h-screen bg-[#f7faff]" style={{ overflowX: "hidden", overflowWrap: "break-word" }}>
      <ScrollReset />

      {/* Light Google Maps-inspired report canvas */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: "#edf4f2",
          backgroundImage:
            "linear-gradient(90deg, rgba(151,185,210,.2) 1px, transparent 1px), linear-gradient(rgba(151,185,210,.2) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="fixed -left-[12%] top-[18%] h-16 w-[65%] -rotate-[8deg] rounded-full bg-white/90 pointer-events-none" />
      <div className="fixed -right-[12%] top-[58%] h-14 w-[68%] rotate-[10deg] rounded-full bg-white/90 pointer-events-none" />
      <div className="fixed left-[18%] -top-[12%] h-[130%] w-12 rotate-[17deg] rounded-full bg-white/70 pointer-events-none" />
      <div className="fixed right-[4%] top-[14%] h-32 w-80 rounded-[48%] bg-[#d9edf7]/65 pointer-events-none" />
      <div className="fixed left-[3%] bottom-[12%] h-24 w-72 rounded-[48%] bg-[#e3ebf5]/70 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none bg-white/70" />

      <ReportHero report={report} />

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-10 relative">

        {/* ══════════════════════════════════════
            1. HERO — Business name, score, date
            ══════════════════════════════════════ */}
        <div className="mb-10">
          <p className="text-[#00ff88] text-xs font-medium uppercase tracking-widest mb-2">
            Public GMB Optimization Score
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            {report.businessName ?? report.submittedName ?? "Business Profile"}
          </h1>
          {report.formattedAddress && (
            <p className="text-[#8899bb] text-sm mb-1">{report.formattedAddress}</p>
          )}
          {report.primaryCategory && (
            <p className="text-[#8899bb] text-sm mb-3">
              {[report.primaryCategory, report.formattedAddress ? null : undefined]
                .filter((x) => x !== undefined && x !== null)
                .join(" · ")}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#8899bb",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d9fff]" />
              Based on publicly available Google Maps data
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#8899bb",
              }}
            >
              Report generated {date}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            2. SCORE OVERVIEW — Ring + Section chart
            ══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div
            className="rounded-2xl p-8 flex flex-col items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {report.grade && (
              <ScoreRing
                score={report.publicAuditScore}
                grade={report.grade}
                size={180}
              />
            )}
            <p className="text-white text-xs font-medium text-center mt-4">
              Public GMB Optimization Score
            </p>
            <p className="text-[#8899bb] text-[10px] text-center mt-2 leading-relaxed">
              Based on 6 signal categories out of 100 points. Full citation, competitor,
              and keyword data available via Get Real Flow onboarding.
            </p>
          </div>

          <div
            className="lg:col-span-2 rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2 className="text-white font-bold mb-5">Score Breakdown by Section</h2>
            {bd && <ScoreBreakdownChart breakdown={bd} />}
          </div>
        </div>

        {/* ══════════════════════════════════════
            3. AI DIAGNOSIS
            ══════════════════════════════════════ */}
        {aiSummary?.diagnosis && (
          <div
            className="mb-8 rounded-2xl p-6"
            style={{
              background: "#eef5ff",
              border: "1px solid #b8d5fb",
            }}
          >
            <p className="text-[#00ff88] text-xs font-medium uppercase tracking-widest mb-2">
              Audit Diagnosis
            </p>
            <p className="text-white text-base leading-relaxed">{aiSummary.diagnosis}</p>
          </div>
        )}

        {/* Problems + Opportunities */}
        {(aiSummary?.problems?.length || aiSummary?.opportunities?.length) ? (
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {aiSummary?.problems && aiSummary.problems.length > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-white font-bold mb-4">Key Problems Found</h2>
                <ul className="space-y-3">
                  {aiSummary.problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                      >
                        !
                      </span>
                      <span className="text-[#8899bb]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {aiSummary?.opportunities && aiSummary.opportunities.length > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-white font-bold mb-4">Growth Opportunities</h2>
                <ul className="space-y-3">
                  {aiSummary.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: "#eaf2ff", color: "#2478e5" }}
                      >
                        ↑
                      </span>
                      <span className="text-[#8899bb]">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* ══════════════════════════════════════
            4. OPTIMIZATION CHECKLIST — 17 rows
            ══════════════════════════════════════ */}
        {report.basicFindings.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-white font-bold text-xl">Optimization Checklist</h2>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "#eaf2ff",
                  color: "#2478e5",
                  border: "1px solid #b8d5fb",
                }}
              >
                {report.basicFindings.filter((f) => f.status === "good").length} of{" "}
                {report.basicFindings.length} passing
              </span>
            </div>
            <div className="grid gap-3">
              {report.basicFindings.map((f, i) => (
                <FindingCard key={f.key} finding={f} index={i} number={i + 1} />
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            5. KEYWORD ANALYSIS
            ══════════════════════════════════════ */}
        {bd?.titleSignal && (
          <section className="mb-10">
            <h2 className="text-white font-bold text-xl mb-5">Keyword Analysis</h2>
            <div
              className="rounded-2xl p-6 space-y-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Row 1: Title keywords */}
              <div>
                <p className="text-[#8899bb] text-xs font-medium uppercase tracking-widest mb-2">
                  Keywords Extracted from Business Title
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(bd.titleSignal.extractedTitleKeywords ?? []).length > 0 ? (
                    bd.titleSignal.extractedTitleKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(77,159,255,0.1)",
                          color: "#4d9fff",
                          border: "1px solid rgba(77,159,255,0.2)",
                        }}
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#4a5a7a] text-xs">No keywords extracted</span>
                  )}
                </div>
              </div>

              {/* Row 2: Business/category keywords */}
              <div>
                <p className="text-[#8899bb] text-xs font-medium uppercase tracking-widest mb-2">
                  Business / Category Keywords (from Profile Type)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(bd.titleSignal.allCategoryKeywords ?? []).slice(0, 18).length > 0 ? (
                    (bd.titleSignal.allCategoryKeywords ?? []).slice(0, 18).map((kw) => {
                      const inTitle = (bd.titleSignal.categoryKeywords ?? []).includes(kw);
                      return (
                        <span
                          key={kw}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={
                            inTitle
                              ? {
                                  background: "rgba(0,255,136,0.08)",
                                  color: "#00ff88",
                                  border: "1px solid rgba(0,255,136,0.2)",
                                }
                              : {
                                  background: "rgba(255,255,255,0.04)",
                                  color: "#8899bb",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }
                          }
                        >
                          {kw}
                          {inTitle && (
                            <span className="ml-1 text-[9px] opacity-70">✓ title</span>
                          )}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[#4a5a7a] text-xs">No category keywords detected</span>
                  )}
                </div>
              </div>

              {/* Row 3: Location keywords */}
              <div>
                <p className="text-[#8899bb] text-xs font-medium uppercase tracking-widest mb-2">
                  Location Keywords (from Address)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(bd.titleSignal.allLocationTerms ?? []).slice(0, 8).length > 0 ? (
                    (bd.titleSignal.allLocationTerms ?? []).slice(0, 8).map((t) => {
                      const inTitle =
                        bd.titleSignal.locationKeyword?.toLowerCase() === t.toLowerCase();
                      return (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={
                            inTitle
                              ? {
                                  background: "rgba(0,255,136,0.08)",
                                  color: "#00ff88",
                                  border: "1px solid rgba(0,255,136,0.2)",
                                }
                              : {
                                  background: "rgba(255,255,255,0.04)",
                                  color: "#8899bb",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }
                          }
                        >
                          {t}
                          {inTitle && (
                            <span className="ml-1 text-[9px] opacity-70">✓ title</span>
                          )}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[#4a5a7a] text-xs">No location terms detected</span>
                  )}
                </div>
              </div>

              {/* Row 4: Marketing intent keywords */}
              <div>
                <p className="text-[#8899bb] text-xs font-medium uppercase tracking-widest mb-2">
                  Marketing Intent Keywords (in Title)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(bd.titleSignal.marketingIntentKeywords ?? []).length > 0 ? (
                    bd.titleSignal.marketingIntentKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(0,255,136,0.08)",
                          color: "#00ff88",
                          border: "1px solid rgba(0,255,136,0.2)",
                        }}
                      >
                        {kw} <span className="ml-1 text-[9px] opacity-70">✓</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-[#4a5a7a] text-xs">
                      No marketing intent keywords detected in title
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            6. BASIC RECOMMENDATIONS
            ══════════════════════════════════════ */}
        {aiSummary?.recommendations && aiSummary.recommendations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold text-xl mb-5">
              Immediate Recommendations
            </h2>
            <Recommendations items={aiSummary.recommendations} />
          </section>
        )}

        {/* ══════════════════════════════════════
            7. CONNECT CTA
            ══════════════════════════════════════ */}
        <section className="mb-10">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "#eef5ff",
              border: "1px solid #b8d5fb",
            }}
          >
            <h2 className="text-white font-bold text-xl mb-3">
              Want the exact improvement plan?
            </h2>
            <p className="text-[#8899bb] text-sm leading-relaxed max-w-xl mx-auto mb-6">
              Connect with Get Real Flow and our team will review your profile, explain the fixes,
              and guide you toward better local visibility.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{
                background: "#2478e5",
                border: "1px solid #2478e5",
                color: "#ffffff",
              }}
            >
              Connect with Get Real Flow
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. RECOMMENDED PLAN + CTA
            ══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-white font-bold text-xl mb-2">
            Recommended Plan for You
          </h2>
          {aiSummary?.ctaText && (
            <p className="text-[#8899bb] text-sm mb-6">{aiSummary.ctaText}</p>
          )}
          <RecommendedPlan recommended={report.recommendedPlan} />
        </section>

        <AuditCTA />

        {/* Disclaimer */}
        <p className="mt-8 text-center text-[#8899bb]/40 text-xs leading-relaxed">
          This free report uses publicly available Google Maps profile data. Scores are based
          on 6 signal categories totalling 100 points. Complete keyword tracking, competitor
          benchmarking, citation audit, and owner-level insights require onboarding with
          Get Real Flow. Report ID: {report.id}
        </p>
      </main>
    </div>
  );
}
