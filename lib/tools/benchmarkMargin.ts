import {
  CLEAR_GAP_RATIO,
  DEFAULT_SAMPLE_SIZE_TEXT,
  DEFAULT_SCORE_A_TEXT,
  DEFAULT_SCORE_B_TEXT,
  MAX_SAMPLE_SIZE,
  MAX_SCORE_PERCENT,
  MIN_SAMPLE_SIZE,
  MIN_SCORE_PERCENT,
  NEAR_CEILING_PERCENT,
  PERCENT,
  Z_SCORE_95_PERCENT,
} from "./benchmarkConstants";

export type GapVerdict = "clear" | "narrow" | "noise";

export interface MarginFormValues {
  scoreAText: string;
  scoreBText: string;
  sampleSizeText: string;
}

export const DEFAULT_MARGIN_FORM: MarginFormValues = {
  scoreAText: DEFAULT_SCORE_A_TEXT,
  scoreBText: DEFAULT_SCORE_B_TEXT,
  sampleSizeText: DEFAULT_SAMPLE_SIZE_TEXT,
};

export interface MarginResult {
  scoreAPercent: number;
  scoreBPercent: number;
  sampleSizePerModel: number;
  /** Absolute difference, in percentage points. */
  gapPoints: number;
  /** 95% margin on that difference, in percentage points. */
  marginPoints: number;
  /** Gap divided by margin, or null when the margin is zero. */
  gapToMarginRatio: number | null;
  verdict: GapVerdict;
  /** Questions or votes per model needed for the margin to fit inside the gap, or null if no gap. */
  requiredSampleSize: number | null;
  isNearCeiling: boolean;
}

export type MarginOutcome = { ok: true; result: MarginResult } | { ok: false; errors: string[] };

/**
 * 95% margin on the difference of two scores, assuming independent questions or votes:
 * z x sqrt((pA(1-pA) + pB(1-pB)) / n).
 */
export function estimateGapMargin(
  scoreAPercent: number,
  scoreBPercent: number,
  sampleSizePerModel: number,
): MarginResult {
  const proportionA = scoreAPercent / PERCENT;
  const proportionB = scoreBPercent / PERCENT;
  const spread = proportionA * (1 - proportionA) + proportionB * (1 - proportionB);
  const marginPoints = Z_SCORE_95_PERCENT * Math.sqrt(spread / sampleSizePerModel) * PERCENT;
  const gapPoints = Math.abs(scoreAPercent - scoreBPercent);
  const gapToMarginRatio = marginPoints > 0 ? gapPoints / marginPoints : null;

  let verdict: GapVerdict = "noise";
  if (gapPoints > 0 && marginPoints === 0) verdict = "clear";
  else if (gapToMarginRatio !== null && gapToMarginRatio >= CLEAR_GAP_RATIO) verdict = "clear";
  else if (gapToMarginRatio !== null && gapToMarginRatio > 1) verdict = "narrow";

  const gapProportion = gapPoints / PERCENT;
  const requiredSampleSize =
    gapPoints > 0 && spread > 0 ? Math.ceil((Z_SCORE_95_PERCENT ** 2 * spread) / gapProportion ** 2) : null;

  return {
    scoreAPercent,
    scoreBPercent,
    sampleSizePerModel,
    gapPoints,
    marginPoints,
    gapToMarginRatio,
    verdict,
    requiredSampleSize,
    isNearCeiling: Math.max(scoreAPercent, scoreBPercent) >= NEAR_CEILING_PERCENT,
  };
}

function parseNumberInRange(text: string, min: number, max: number): number | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}

/** Validates the form and computes the margin check. Pure and easy to test. */
export function runMarginCheck(values: MarginFormValues): MarginOutcome {
  const errors: string[] = [];
  const scoreA = parseNumberInRange(values.scoreAText, MIN_SCORE_PERCENT, MAX_SCORE_PERCENT);
  const scoreB = parseNumberInRange(values.scoreBText, MIN_SCORE_PERCENT, MAX_SCORE_PERCENT);
  const sampleSize = parseNumberInRange(values.sampleSizeText, MIN_SAMPLE_SIZE, MAX_SAMPLE_SIZE);

  if (scoreA === null) errors.push(`Score A must be a number from ${MIN_SCORE_PERCENT} to ${MAX_SCORE_PERCENT}.`);
  if (scoreB === null) errors.push(`Score B must be a number from ${MIN_SCORE_PERCENT} to ${MAX_SCORE_PERCENT}.`);
  if (sampleSize === null || !Number.isInteger(sampleSize)) {
    errors.push(`The number of questions or votes must be a whole number from ${MIN_SAMPLE_SIZE} to ${MAX_SAMPLE_SIZE.toLocaleString("en-US")}.`);
  }
  if (errors.length > 0 || scoreA === null || scoreB === null || sampleSize === null) {
    return { ok: false, errors };
  }
  return { ok: true, result: estimateGapMargin(scoreA, scoreB, sampleSize) };
}

/** "2.4" for 2.35 and so on. */
export function formatPoints(points: number): string {
  return points.toFixed(1);
}

export function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}