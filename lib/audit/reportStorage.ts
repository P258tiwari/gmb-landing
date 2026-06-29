// ponytail: memory-only storage — reports are session-scoped and temporary.
// All lead data is captured via Google Sheets webhook before this is called.
import type { Lead, AuditReport } from "@/lib/audit/types";

const memLeads = new Map<string, Lead>();
const memReports = new Map<string, AuditReport>();

export async function saveLead(lead: Lead): Promise<void> {
  memLeads.set(lead.id, lead);
}

export async function getLead(id: string): Promise<Lead | null> {
  return memLeads.get(id) ?? null;
}

export async function saveReport(report: AuditReport): Promise<void> {
  memReports.set(report.id, report);
}

export async function getReport(id: string): Promise<AuditReport | null> {
  return memReports.get(id) ?? null;
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
