export interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  businessName?: string;
  businessCategory?: string;
  googleMapsUrl: string;
  createdAt: string;
  source: string;
  status: "pending" | "processed" | "manual_review" | "failed";
}

export type ReportStatus = "complete" | "manual_review" | "failed";
export type Grade = "Strong" | "Good" | "Needs Optimization" | "Visibility Risk";
export type FindingStatus = "good" | "needs_work" | "missing" | "locked";
export type Impact = "High" | "Medium" | "Low";

/* ── Score breakdown sub-types (raw max per section) ── */

// Section 1 — Business Title Signal  (max 25)
export interface TitleSignalBreakdown {
  score: number;
  max: number;
  title: string | null;
  titleLength: number;
  titleLengthScore: number;         // 0-8
  allCategoryKeywords: string[];    // all keywords extracted from types/category
  categoryKeywords: string[];       // those matched in title
  categoryKeywordScore: number;     // 0-7
  allLocationTerms: string[];       // all location terms from address/city
  locationKeyword: string | null;   // location term found in title
  locationKeywordScore: number;     // 0-5
  marketingIntentScore: number;     // 0-5
  marketingIntentKeywords: string[]; // marketing intent terms found in title
  extractedTitleKeywords: string[]; // useful words from title text
  reason: string;
}

// Section 2 — Rating & Review Power  (max 30)
export interface ReviewStrengthBreakdown {
  score: number;
  max: number;
  belowVolumeGate: boolean;
  ratingScore: number;            // 0-12 (0-3 when gated)
  reviewCountScore: number;       // 0-15
  recentReviewScore: number;      // 0-3
  reason: string;
}

// Section 3 — Photo Strength  (max 15)
export interface PhotoStrengthBreakdown {
  score: number;
  max: number;
  photoCount: number;
  reason: string;
}

// Section 4 — Profile Completeness  (max 10)
export interface ProfileCompletenessBreakdown {
  score: number;
  max: number;
  hasAddress: boolean;
  hasPhone: boolean;
  hasWebsite: boolean;
  hasHours: boolean;
  isOperational: boolean;
  reason: string;
}

// Section 5 — Category Relevance & Depth  (max 10)
export interface CategoryRelevanceBreakdown {
  score: number;
  max: number;
  primaryType: string | null;
  primaryCategoryScore: number;   // 0-3
  relevantTypeCount: number;
  additionalDepthScore: number;   // 0-4
  consistencyScore: number;       // 0-3
  reason: string;
}

// Section 6 — Website Validity  (max 10)
export interface WebsiteValidityBreakdown {
  score: number;
  max: number;
  websiteExists: boolean;
  websiteOpens: boolean | null;
  isGenericOrSocial: boolean;
  businessNameInMeta: boolean;
  fetchedTitle: string | null;
  fetchError: boolean;
  reason: string;
}

export interface ScoreBreakdown {
  titleSignal: TitleSignalBreakdown;
  reviewStrength: ReviewStrengthBreakdown;
  photoStrength: PhotoStrengthBreakdown;
  profileCompleteness: ProfileCompletenessBreakdown;
  categoryRelevance: CategoryRelevanceBreakdown;
  websiteValidity: WebsiteValidityBreakdown;
}

/* ── Findings ── */

export interface BasicFinding {
  key: string;
  label: string;
  currentValue: string | null;
  status: FindingStatus;
  impact: Impact;
  note: string;
  tip: string | null;
  ctaText: string;
  scoreContribution: string;
}

export interface LockedFinding {
  label: string;
  preview: string;
  plan: "Growth" | "Max";
}

/* ── AI Summary ── */

export interface AISummary {
  diagnosis: string;
  problems: string[];
  opportunities: string[];
  recommendations: string[];
  suggestedPlan: "Starter" | "Growth" | "Max";
  ctaText: string;
}

/* ── Google Place data (from Places API v1) ── */

export interface PlaceData {
  placeId: string;
  businessName: string | null;
  formattedAddress: string | null;
  phoneNumber: string | null;
  website: string | null;
  googleMapsUri: string | null;
  rating: number | null;
  reviewCount: number | null;
  businessStatus: string | null;
  hasOpeningHours: boolean;
  primaryCategory: string | null;
  types: string[];
  photosCount: number;
  recentReviewCount: number;
}

/* ── Full Audit Report (stored + served) ── */

export interface AuditReport {
  id: string;
  leadId: string;
  status: ReportStatus;
  submittedName?: string;
  submittedCity?: string;
  submittedCategory?: string;
  submittedMapsUrl: string;
  placeId: string | null;
  businessName: string | null;
  formattedAddress: string | null;
  phoneNumber: string | null;
  website: string | null;
  googleMapsUri: string | null;
  rating: number | null;
  reviewCount: number | null;
  businessStatus: string | null;
  hasOpeningHours: boolean;
  primaryCategory: string | null;
  types: string[];
  photosCount: number;
  publicAuditScore: number;
  grade: Grade | null;
  scoreBreakdown: ScoreBreakdown | null;
  basicFindings: BasicFinding[];
  lockedFindings: LockedFinding[];
  aiSummary: AISummary | null;
  recommendedPlan: "Starter" | "Growth" | "Max";
  createdAt: string;
}
