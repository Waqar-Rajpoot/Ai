import type { ClaimLabel } from "@/lib/news/roundupTypes";
import { PERCENT_SCALE } from "@/lib/society/societyConstants";
import type { NavLink } from "./about";
import { isValidIsoDate } from "./editorial";
import {
  RESULT_DECIMALS_FACTOR,
  SMALL_COST_THRESHOLD_DOLLARS,
  TOKENS_PER_MILLION,
  WEIGHT_MAX,
  WEIGHT_MIN,
} from "./howWeTestConstants";

export type PointId =
  | "accuracy"
  | "reasoning"
  | "writing"
  | "coding"
  | "long-documents"
  | "cost"
  | "privacy";

export interface TestPoint {
  id: PointId;
  /** 1 to 7, as in Blueprint 6.6. */
  number: number;
  name: string;
  whatWeTest: string;
  howWeRunIt: readonly string[];
  whatItShows: string;
  whatItCannotShow: string;
  /** Null until the weights are decided (Blueprint 5.1 lists them; no values are given). */
  weight: number | null;
  /** Why this weight, once a weight is set. Null while the weight is null. */
  whyThisWeight: string | null;
  /** Questions that would push the weight up or down. Shown while weights are unpublished. */
  weightConsiderations: readonly string[];
  relatedLinks: readonly NavLink[];
}

export interface WeightShare {
  id: PointId;
  percent: number;
}

export interface WeightedResult {
  scoredCount: number;
  totalCount: number;
  weightUsed: number;
  weightTotal: number;
  /** On the 0 to scoreMax scale. Null when nothing with a weight above zero is scored. */
  weightedScore: number | null;
  /** Share of the maximum score, 0 to 100. Null when there is no score. */
  percent: number | null;
  /** True when some points with weight were left unscored. */
  isPartial: boolean;
}

export interface TestRecord {
  modelVersion: string;
  /** For example "low", "high", or "not applicable" for a model without the setting. */
  effortSetting: string;
  /** ISO date (YYYY-MM-DD). */
  testedOn: string;
}

export interface RecordField {
  id: keyof TestRecord;
  label: string;
  whatItIs: string;
  whyItMatters: string;
  formatHint: string;
}

export interface LabelDetail {
  label: ClaimLabel;
  meaning: string;
  whoProduced: string;
  strength: string;
  howShown: string;
}

export interface CostExample {
  inputTokens: number;
  outputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
}

export interface OpenDecision {
  id: string;
  question: string;
  whyItMatters: string;
  whatThePageDoesMeanwhile: string;
}

/** Sum of the weights that are set. Unset (null) weights count as zero. */
export function weightsTotal(points: readonly TestPoint[]): number {
  return points.reduce((sum, point) => sum + (point.weight ?? 0), 0);
}

/** Weights count as published only when every point has one and they are not all zero. */
export function hasPublishedWeights(points: readonly TestPoint[]): boolean {
  return points.every((point) => point.weight !== null && point.weight >= 0) && weightsTotal(points) > 0;
}

/** Each point's share of the total weight, in percent to one decimal. Empty while weights are unpublished. */
export function getWeightShares(points: readonly TestPoint[]): WeightShare[] {
  if (!hasPublishedWeights(points)) return [];
  const total = weightsTotal(points);
  return points.map((point) => ({
    id: point.id,
    percent: Math.round(((point.weight ?? 0) / total) * PERCENT_SCALE * RESULT_DECIMALS_FACTOR) / RESULT_DECIMALS_FACTOR,
  }));
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Reader tool: every point starts at the same weight. */
export function createStartingWeights(points: readonly TestPoint[], startingWeight: number): Record<PointId, number> {
  return Object.fromEntries(points.map((point) => [point.id, startingWeight])) as Record<PointId, number>;
}

/** Turns typed text into a clamped number, or null for blank or non-numeric text. */
export function parseBoundedNumber(text: string, min: number, max: number): number | null {
  if (text.trim() === "") return null;
  const value = Number(text);
  if (!Number.isFinite(value)) return null;
  return clampNumber(value, min, max);
}

/**
 * Weighted average of the scores a reader entered. Only scored points with weight above zero count,
 * so a partly finished card is shown as partial and not as a low score.
 */
export function computeWeightedScore(
  points: readonly TestPoint[],
  weights: Readonly<Record<string, number>>,
  scores: Readonly<Record<string, number | null>>,
  scoreMax: number,
): WeightedResult {
  let weightedSum = 0;
  let weightUsed = 0;
  let weightTotal = 0;
  let scoredCount = 0;

  for (const point of points) {
    const weight = clampNumber(weights[point.id] ?? 0, WEIGHT_MIN, WEIGHT_MAX);
    weightTotal += weight;
    const score = scores[point.id];
    if (score === null || score === undefined || weight === 0) continue;
    scoredCount += 1;
    weightUsed += weight;
    weightedSum += weight * score;
  }

  if (weightUsed === 0) {
    return { scoredCount, totalCount: points.length, weightUsed, weightTotal, weightedScore: null, percent: null, isPartial: false };
  }
  const weightedScore = Math.round((weightedSum / weightUsed) * RESULT_DECIMALS_FACTOR) / RESULT_DECIMALS_FACTOR;
  const percent = Math.round((weightedScore / scoreMax) * PERCENT_SCALE * RESULT_DECIMALS_FACTOR) / RESULT_DECIMALS_FACTOR;
  return { scoredCount, totalCount: points.length, weightUsed, weightTotal, weightedScore, percent, isPartial: weightUsed < weightTotal };
}

/** Problems that make a test record unfit to publish. Use it in a build check for reviews. */
export function findTestRecordIssues(record: TestRecord, today: Date): string[] {
  const issues: string[] = [];
  if (record.modelVersion.trim() === "") issues.push("Model version is empty.");
  if (record.effortSetting.trim() === "") issues.push("Effort setting is empty. Write “not applicable” if the model has none.");
  if (!isValidIsoDate(record.testedOn)) {
    issues.push("Test day must be a real date written as YYYY-MM-DD.");
  } else if (Date.parse(`${record.testedOn}T00:00:00Z`) > today.getTime()) {
    issues.push("Test day is in the future.");
  }
  return issues;
}

/** Dollars for one task from token counts and prices per million tokens. */
export function estimateCostPerTask(example: CostExample): number {
  return (
    (example.inputTokens * example.inputPricePerMillion + example.outputTokens * example.outputPricePerMillion) /
    TOKENS_PER_MILLION
  );
}

export function formatCostInDollars(value: number): string {
  return value < SMALL_COST_THRESHOLD_DOLLARS ? `$${value.toFixed(4)}` : `$${value.toFixed(2)}`;
}