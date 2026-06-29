import { NextRequest, NextResponse } from "next/server";

const SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

interface ContactPayload {
  name?: string;
  business?: string;
  phone?: string;
  city?: string;
  category?: string;
  profileLink?: string;
  problem?: string;
  pageUrl?: string;
  utm?: Record<string, string>;
  website?: string;
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  // ponytail: crude cap prevents unbounded growth on long-running servers
  if (attempts.size > 50_000) attempts.clear();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function cleanText(value: unknown, maxLength: number): string {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidOptionalUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true, sheetSaved: false });
  }

  const lead = {
    type: "contact_lead",
    timestamp: new Date().toISOString(),
    name: cleanText(body.name, 80),
    business: cleanText(body.business, 120),
    phone: cleanText(body.phone, 20).replace(/[^\d+\s-]/g, ""),
    city: cleanText(body.city, 80),
    category: cleanText(body.category, 80),
    problem: cleanText(body.problem, 100),
    profileLink: cleanText(body.profileLink, 500),
    pageUrl: cleanText(body.pageUrl, 500),
    utm: body.utm ?? {},
  };

  if (!lead.name || !lead.business || !lead.phone || !lead.city || !lead.category || !lead.problem) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!/^(?:\+?91)?[6-9]\d{9}$/.test(lead.phone.replace(/\D/g, ""))) {
    return NextResponse.json({ error: "Enter a valid Indian mobile number." }, { status: 400 });
  }

  if (!isValidOptionalUrl(lead.profileLink)) {
    return NextResponse.json({ error: "Enter a valid profile URL." }, { status: 400 });
  }

  if (!SHEET_WEBHOOK_URL) {
    return NextResponse.json({ ok: true, sheetSaved: false });
  }

  try {
    const res = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    return NextResponse.json({ ok: true, sheetSaved: res.ok });
  } catch {
    return NextResponse.json({ ok: true, sheetSaved: false });
  }
}
