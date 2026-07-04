import { Redis } from "@upstash/redis";
import type { Lead, AuditReport } from "@/lib/audit/types";

// Reports/leads must survive across serverless instances and deploys, so they're
// persisted in Upstash Redis (works as the Vercel KV / Vercel Marketplace store too).
// Falls back to an in-memory Map only when no Redis credentials are configured
// (e.g. local dev without a store hooked up) — that fallback stays session-scoped.
const REPORT_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days
const LEAD_TTL_SECONDS = 90 * 24 * 60 * 60;

const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

if (!redis) {
  console.warn(
    "[reportStorage] No Redis credentials found (KV_REST_API_URL/UPSTASH_REDIS_REST_URL). " +
      "Falling back to in-memory storage — audit report links will not survive across " +
      "server instances or restarts in production."
  );
}

const memLeads = new Map<string, Lead>();
const memReports = new Map<string, AuditReport>();

export async function saveLead(lead: Lead): Promise<void> {
  if (redis) {
    await redis.set(`lead:${lead.id}`, lead, { ex: LEAD_TTL_SECONDS });
    return;
  }
  memLeads.set(lead.id, lead);
}

export async function getLead(id: string): Promise<Lead | null> {
  if (redis) {
    return (await redis.get<Lead>(`lead:${id}`)) ?? null;
  }
  return memLeads.get(id) ?? null;
}

export async function saveReport(report: AuditReport): Promise<void> {
  if (redis) {
    await redis.set(`report:${report.id}`, report, { ex: REPORT_TTL_SECONDS });
    return;
  }
  memReports.set(report.id, report);
}

export async function getReport(id: string): Promise<AuditReport | null> {
  if (redis) {
    return (await redis.get<AuditReport>(`report:${id}`)) ?? null;
  }
  return memReports.get(id) ?? null;
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
