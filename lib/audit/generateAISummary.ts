import type { AISummary, PlaceData, Grade, ScoreBreakdown } from "@/lib/audit/types";

export interface SummaryInput {
  place: PlaceData;
  score: number;
  grade: Grade;
  city?: string;
  category?: string;
  missingFields: string[];
  scoreBreakdown: ScoreBreakdown;
}

function ruleBasedSummary(input: SummaryInput): AISummary {
  const { place, score, city, category, scoreBreakdown } = input;

  const profileLabel =
    [category, city ? `in ${city}` : null].filter(Boolean).join(" ") || "profile";

  const diagnosis =
    score >= 85
      ? `Your ${profileLabel} has strong public signals — focus on review velocity and maintaining category depth to stay ahead.`
      : score >= 70
      ? `Your ${profileLabel} has decent foundations but several optimisation gaps are limiting your ranking potential.`
      : score >= 50
      ? `Your ${profileLabel} has significant gaps that are costing you visibility and leads from local search.`
      : `Your ${profileLabel} has critical gaps — competitors are capturing customers that should be finding you.`;

  const problems: string[] = [];
  const opportunities: string[] = [];
  const recommendations: string[] = [];

  const reviews = scoreBreakdown.reviewStrength;
  const photos = scoreBreakdown.photoStrength;
  const title = scoreBreakdown.titleSignal;

  if (reviews.belowVolumeGate) {
    problems.push(`Review volume is critically low (${place.reviewCount ?? 0} reviews) — below the 50-review trust threshold for competitive ranking.`);
    opportunities.push("Getting to 50+ reviews unlocks the full rating score weight and significantly improves local ranking competitiveness.");
    recommendations.push("Start a structured review generation campaign — request reviews from every satisfied customer at the point of service.");
  } else if ((place.reviewCount ?? 0) < 150) {
    problems.push(`Review count (${place.reviewCount ?? 0}) is below the 150-review threshold for strong competitive ranking.`);
    opportunities.push("A consistent review generation strategy can push you into the top 3 positions for local searches.");
    recommendations.push("Set a target of 5 new reviews per week through a structured follow-up process after each service.");
  }

  if (photos.score === 0) {
    problems.push(`Photo count (${photos.photoCount}) is below the 10-photo minimum threshold — photo score is 0 until this is resolved.`);
    opportunities.push("Profiles with 10+ photos receive significantly more clicks and direction requests from Maps.");
    recommendations.push("Upload at least 10 high-quality photos: exterior, interior, team, service in progress, and completed work.");
  } else if (photos.score < 11) {
    problems.push(`${photos.photoCount} photos detected — below the threshold for strong engagement signals.`);
    opportunities.push("Profiles with 50+ photos consistently outperform those with fewer photos in engagement and conversions.");
    recommendations.push("Aim for 50+ photos. Add new photos monthly to signal active profile maintenance.");
  }

  if (title.titleLength < 45) {
    problems.push(`Business title is short (${title.titleLength} characters) with limited keyword signal breadth.`);
    opportunities.push("A more descriptive title can improve category and location keyword signals without violating Google's naming policy.");
    recommendations.push("Review your business name to ensure it accurately and fully represents your services.");
  }

  if (!place.website) {
    problems.push("No website linked to your Google Business Profile — reduces authority signals and click-through opportunities.");
    opportunities.push("Adding a website can increase profile click-through and strengthens local domain authority.");
    recommendations.push("Add your business website URL to your Google Business Profile immediately.");
  }

  if (!place.hasOpeningHours) {
    problems.push("Business hours are not set on your profile — a trust and ranking signal gap.");
    opportunities.push("Profiles with hours appear in time-filtered searches and show higher trust signals.");
    recommendations.push("Add complete business hours including special hours for holidays.");
  }

  const fallbackProblems = [
    "Local citation consistency has not been checked — inconsistent NAP data can silently suppress local authority.",
    "Category depth signals may be limited — profiles with fewer relevant types rank for fewer search queries.",
    "Profile freshness signals are difficult to measure publicly — regular updates and photos strengthen algorithmic ranking.",
  ];
  const fallbackOpportunities = [
    "Consistent NAP data across directories strengthens local authority and prevents ranking suppression.",
    "Adding more relevant category types expands the range of search queries your profile can rank for.",
    "Regular activity on your Business Profile keeps it fresh and can improve visibility for local searches.",
  ];
  const fallbackRecommendations = [
    "Ensure your business name, address, and phone are identical across all online directories and listings.",
    "Review your additional category types and add relevant ones to improve search query coverage.",
    "Update your Business Profile regularly with new photos, service additions, or business information changes.",
  ];

  let pi = 0, oi = 0, ri = 0;
  while (problems.length < 3) problems.push(fallbackProblems[pi++ % 3]);
  while (opportunities.length < 3) opportunities.push(fallbackOpportunities[oi++ % 3]);
  while (recommendations.length < 3) recommendations.push(fallbackRecommendations[ri++ % 3]);

  const suggestedPlan: AISummary["suggestedPlan"] =
    score < 70 ? "Max" : score < 85 ? "Growth" : "Starter";

  const ctaText =
    score < 50
      ? "Your profile has critical gaps — connect with Ampwake and start capturing leads you are losing right now."
      : score < 70
      ? "You are underperforming your potential. Connect with Ampwake and start ranking properly."
      : score < 85
      ? "Your profile is decent but competitors may be outranking you. Let us close the remaining gaps."
      : "Strong profile — let us turn it into a consistent lead generation machine.";

  return {
    diagnosis,
    problems: problems.slice(0, 3),
    opportunities: opportunities.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
    suggestedPlan,
    ctaText,
  };
}

async function openaiSummary(input: SummaryInput): Promise<AISummary | null> {
  const apiKey = process.env.AI_PROVIDER_API_KEY;
  if (!apiKey) return null;

  const { place, score, grade, city, category, scoreBreakdown } = input;
  const reviews = scoreBreakdown.reviewStrength;

  const systemPrompt =
    "You are a Google Business Profile (GMB) analyst for Indian local businesses. Your role is to write honest, specific, and conversion-focused audit summaries based ONLY on the data provided. Never invent metrics (calls, impressions, rankings, profile views, revenue). Never mention business description because it is not available from the public API. Never mention review replies, Google Posts, Q&A, or GBP Insights as audited data. Never advise violating Google's Business Profile naming guidelines.";

  const userPrompt = `Write a structured GMB audit summary based on the data below.

Business: ${place.businessName ?? "Unknown"}
Category: ${category ?? place.primaryCategory ?? "Unknown"} | City: ${city ?? "Unknown"}
Audit Score: ${score}/100 | Grade: ${grade}

Key metrics:
- Title length: ${scoreBreakdown.titleSignal.titleLength} characters
- Category keywords in title: ${scoreBreakdown.titleSignal.categoryKeywords.length}
- Location signal in title: ${scoreBreakdown.titleSignal.locationKeyword ?? "None"}
- Marketing intent keywords in title: ${scoreBreakdown.titleSignal.marketingIntentKeywords.join(", ") || "None"}
- Google rating: ${place.rating?.toFixed(1) ?? "N/A"}
- Total reviews: ${place.reviewCount ?? 0}
- Below 50-review gate: ${reviews.belowVolumeGate ? "Yes" : "No"}
- Recent reviews detected: ${place.recentReviewCount}
- Photos: ${place.photosCount}
- Website: ${place.website ? "Yes" : "No"}
- Website validity score: ${scoreBreakdown.websiteValidity.score}/10
- Phone: ${place.phoneNumber ? "Yes" : "No"}
- Opening hours: ${place.hasOpeningHours ? "Yes" : "No"}
- Business status: ${place.businessStatus ?? "Unknown"}
- Primary category: ${place.primaryCategory ?? "Not detected"}
- Relevant additional types: ${scoreBreakdown.categoryRelevance.relevantTypeCount}
- Missing fields: ${input.missingFields.slice(0, 6).join(", ") || "None"}

STRICT RULES:
- Use ONLY the data above. Do not invent calls, impressions, rankings, revenue, or owner-level metrics.
- Do NOT mention business description — it is not available from the public API.
- Do NOT mention review reply coverage, Google Posts, Q&A, or GBP Insights as audited data.
- Do NOT advise keyword stuffing in the business name or violations of GBP naming policy.
- Recommended plan: Max (score < 70), Growth (70-84), Starter (85+).

Reply ONLY with this JSON (no markdown, no extra text):
{
  "diagnosis": "One direct sentence about their profile situation and main gap.",
  "problems": ["specific problem 1", "specific problem 2", "specific problem 3"],
  "opportunities": ["concrete opportunity 1", "concrete opportunity 2", "concrete opportunity 3"],
  "recommendations": ["actionable fix 1", "actionable fix 2", "actionable fix 3"],
  "suggestedPlan": "Max|Growth|Starter",
  "ctaText": "Short persuasive CTA encouraging the business to connect with Ampwake"
}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 700,
        temperature: 0.35,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenAI error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const text: string = data.choices?.[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]) as AISummary;
  } catch (err) {
    console.error("openaiSummary error:", err);
    return null;
  }
}

export async function generateAISummary(input: SummaryInput): Promise<AISummary> {
  const aiResult = await openaiSummary(input);
  if (aiResult) return aiResult;
  return ruleBasedSummary(input);
}
