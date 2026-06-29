export function recommendPlan(score: number): "Starter" | "Growth" | "Max" {
  if (score < 70) return "Max";
  // Even high-scoring profiles benefit from Growth — more conversion-friendly
  return "Growth";
}
