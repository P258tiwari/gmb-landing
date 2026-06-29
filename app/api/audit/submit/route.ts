import { NextRequest, NextResponse } from "next/server";
import { isGoogleMapsUrl } from "@/lib/utils/validateMapsUrl";
import { resolvePlace } from "@/lib/google/resolvePlace";
import { getPlaceDetails } from "@/lib/google/getPlaceDetails";
import { checkWebsiteValidity } from "@/lib/audit/checkWebsiteValidity";
import { calculateScore } from "@/lib/audit/calculateScore";
import { generateAISummary } from "@/lib/audit/generateAISummary";
import { recommendPlan } from "@/lib/audit/recommendPlan";
import { saveLead, saveReport, generateId } from "@/lib/audit/reportStorage";
import type { Lead, AuditReport } from "@/lib/audit/types";

const SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

const auditAttempts = new Map<string, { count: number; resetAt: number }>();

function auditRateLimited(key: string): boolean {
  const now = Date.now();
  if (auditAttempts.size > 10_000) auditAttempts.clear();
  const entry = auditAttempts.get(key);
  if (!entry || entry.resetAt < now) {
    auditAttempts.set(key, { count: 1, resetAt: now + 5 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 3;
}

async function sendFreeAuditToSheet({
  lead,
  reportId,
  status,
}: {
  lead: Lead;
  reportId: string;
  status: "complete" | "manual_review" | "failed";
}) {
  if (!SHEET_WEBHOOK_URL) return;

  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "free_audit",
        timestamp: new Date().toISOString(),
        name: lead.name ?? "",
        phone: lead.phone ?? "",
        googleMapsUrl: lead.googleMapsUrl,
        source: lead.source,
        status,
        reportId,
      }),
    });
  } catch {
    // Sheet logging should never block the user's audit flow.
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (auditRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many audit requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let lead: Lead | null = null;

  try {
    const body = await req.json();
    const {
      googleMapsUrl,
      source,
      name,
      phone,
    } = body as {
      googleMapsUrl?: string;
      source?: string;
      submittedCity?: string;
      submittedCategory?: string;
      name?: string;
      phone?: string;
    };

    // Sanitize free-text fields used in AI prompts
    const submittedCity = typeof body.submittedCity === "string"
      ? body.submittedCity.trim().replace(/\s+/g, " ").slice(0, 80)
      : undefined;
    const submittedCategory = typeof body.submittedCategory === "string"
      ? body.submittedCategory.trim().replace(/\s+/g, " ").slice(0, 80)
      : undefined;

    if (!googleMapsUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!isGoogleMapsUrl(googleMapsUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid Google Maps URL." },
        { status: 400 }
      );
    }

    // Save lead immediately — even if audit fails
    const leadId = generateId();
    lead = {
      id: leadId,
      googleMapsUrl,
      name,
      phone,
      createdAt: new Date().toISOString(),
      source: source ?? "landing_page",
      status: "pending",
    };
    await saveLead(lead);

    // Resolve place ID from URL
    const resolved = await resolvePlace(googleMapsUrl);

    if (!resolved) {
      const reportId = generateId();
      const report: AuditReport = buildManualReport(reportId, leadId, googleMapsUrl, null);
      await saveReport(report);
      lead.status = "manual_review";
      await saveLead(lead);
      await sendFreeAuditToSheet({ lead, reportId, status: "manual_review" });
      return NextResponse.json({ reportId, status: "manual_review" });
    }

    // Fetch full place details
    const place = await getPlaceDetails(resolved.placeId);

    if (!place) {
      const reportId = generateId();
      const report: AuditReport = buildManualReport(reportId, leadId, googleMapsUrl, resolved.placeId);
      await saveReport(report);
      lead.status = "manual_review";
      await saveLead(lead);
      await sendFreeAuditToSheet({ lead, reportId, status: "manual_review" });
      return NextResponse.json({ reportId, status: "manual_review" });
    }

    // Pre-compute website validity before scoring
    const websiteValidity = await checkWebsiteValidity(
      place.website,
      place.businessName,
      place.primaryCategory
    );

    // Calculate score
    const { totalScore, grade, scoreBreakdown, basicFindings, lockedFindings } = calculateScore(
      place,
      { submittedCity, submittedCategory },
      websiteValidity
    );

    // Build missing fields list for AI context
    const missingFields = basicFindings
      .filter((f) => f.status === "missing")
      .map((f) => f.label);

    // Derive city for AI if not submitted
    const resolvedCity =
      submittedCity ??
      place.formattedAddress?.split(",").slice(-4, -2).map((s) => s.trim()).join(", ") ??
      undefined;

    // Generate AI summary
    const aiSummary = await generateAISummary({
      place,
      score: totalScore,
      grade,
      city: resolvedCity,
      category: submittedCategory ?? place.primaryCategory ?? undefined,
      missingFields,
      scoreBreakdown,
    });

    const recommendedPlanValue = recommendPlan(totalScore);
    const reportId = generateId();

    const report: AuditReport = {
      id: reportId,
      leadId,
      status: "complete",
      submittedCity,
      submittedCategory,
      submittedMapsUrl: googleMapsUrl,
      placeId: place.placeId,
      businessName: place.businessName,
      formattedAddress: place.formattedAddress,
      phoneNumber: place.phoneNumber,
      website: place.website,
      googleMapsUri: place.googleMapsUri,
      rating: place.rating,
      reviewCount: place.reviewCount,
      businessStatus: place.businessStatus,
      hasOpeningHours: place.hasOpeningHours,
      primaryCategory: place.primaryCategory,
      types: place.types,
      photosCount: place.photosCount,
      publicAuditScore: totalScore,
      grade,
      scoreBreakdown,
      basicFindings,
      lockedFindings,
      aiSummary,
      recommendedPlan: recommendedPlanValue,
      createdAt: new Date().toISOString(),
    };

    await saveReport(report);
    lead.status = "processed";
    await saveLead(lead);
    await sendFreeAuditToSheet({ lead, reportId, status: "complete" });

    return NextResponse.json({ reportId, status: "complete" });
  } catch (err) {
    console.error("Audit submit error:", err);

    if (lead) {
      try {
        const reportId = generateId();
        const report: AuditReport = buildManualReport(reportId, lead.id, lead.googleMapsUrl, null);
        await saveReport(report);
        lead.status = "failed";
        await saveLead(lead);
        await sendFreeAuditToSheet({ lead, reportId, status: "failed" });
        return NextResponse.json({ reportId, status: "manual_review" });
      } catch {
        // ignore secondary error
      }
    }

    return NextResponse.json({ error: "Failed to generate audit." }, { status: 500 });
  }
}

function buildManualReport(
  reportId: string,
  leadId: string,
  mapsUrl: string,
  placeId: string | null
): AuditReport {
  return {
    id: reportId,
    leadId,
    status: "manual_review",
    submittedMapsUrl: mapsUrl,
    placeId,
    businessName: null,
    formattedAddress: null,
    phoneNumber: null,
    website: null,
    googleMapsUri: null,
    rating: null,
    reviewCount: null,
    businessStatus: null,
    hasOpeningHours: false,
    primaryCategory: null,
    types: [],
    photosCount: 0,
    publicAuditScore: 0,
    grade: null,
    scoreBreakdown: null,
    basicFindings: [],
    lockedFindings: [],
    aiSummary: null,
    recommendedPlan: "Max",
    createdAt: new Date().toISOString(),
  };
}
