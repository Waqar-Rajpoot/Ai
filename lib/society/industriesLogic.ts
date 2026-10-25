import { daysSince } from "@/lib/shared/dates";
import { CHART_MAX_PERCENT, INDUSTRIES_VERIFIED_ISO, REVIEW_INTERVAL_DAYS } from "./industriesConstants";
import {
  ADOPTION_POINTS,
  INDUSTRIES,
  type AdoptionPoint,
  type EvidenceLevel,
  type Industry,
  type IndustryId,
  type Stage,
} from "./industries";

export interface IndustryFilter {
  stage: Stage | "all";
  evidence: EvidenceLevel | "all";
  industryId: IndustryId | "all";
}

export const NO_FILTER: IndustryFilter = { stage: "all", evidence: "all", industryId: "all" };

/** Applies the stage, evidence and single-industry filters. "all" skips a filter. */
export function filterIndustries(filter: IndustryFilter, list: readonly Industry[] = INDUSTRIES): Industry[] {
  return list.filter(
    (industry) =>
      (filter.stage === "all" || industry.stage === filter.stage) &&
      (filter.evidence === "all" || industry.evidence === filter.evidence) &&
      (filter.industryId === "all" || industry.id === filter.industryId),
  );
}

/** How many industries sit at each stage. */
export function countByStage(list: readonly Industry[] = INDUSTRIES): Record<Stage, number> {
  const counts: Record<Stage, number> = { now: 0, next: 0, later: 0 };
  for (const industry of list) counts[industry.stage] += 1;
  return counts;
}

/** How many industries are backed by a named survey versus directional. */
export function countByEvidence(list: readonly Industry[] = INDUSTRIES): Record<EvidenceLevel, number> {
  const counts: Record<EvidenceLevel, number> = { "named-survey": 0, directional: 0 };
  for (const industry of list) counts[industry.evidence] += 1;
  return counts;
}

/** Percentage points between current use and the top of the expected range. */
export function expectedGain(point: AdoptionPoint): number {
  return Math.round((point.expectedHigh - point.current) * 10) / 10;
}

/** Chart points with the biggest expected rise first. */
export function sortByExpectedGain(points: readonly AdoptionPoint[] = ADOPTION_POINTS): AdoptionPoint[] {
  return [...points].sort((a, b) => expectedGain(b) - expectedGain(a));
}

/** Bar width as a whole percent of the chart axis, clamped to 0 to 100. */
export function barPercent(value: number): number {
  const raw = (value / CHART_MAX_PERCENT) * 100;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

/** True when the last check is older than the review interval. */
export function isReviewDue(now: Date): boolean {
  return daysSince(INDUSTRIES_VERIFIED_ISO, now) > REVIEW_INTERVAL_DAYS;
}

/** Industries that carry no numbers and must say so. */
export function findDirectionalWithFigures(list: readonly Industry[] = INDUSTRIES): string[] {
  return list.filter((industry) => industry.evidence === "directional" && industry.figures.length > 0).map((industry) => industry.id);
}