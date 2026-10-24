import type {
  CoverageRow,
  CoverageStatus,
  IndependentScore,
  IndependentSource,
  ScoreFilters,
  ScoreGapInput,
  ScoreGapResult,
  ScoreSortKey,
} from "./benchmarkTypes";
import { formatVerifiedDate, type VerificationSummary } from "./verification";

const MS_PER_DAY = 86_400_000;

/** A weekly page with a row older than two weekly checks is flagged as stale. */
export const BENCHMARK_STALE_AFTER_DAYS = 14;

export const ALL_MAKERS = "all";

export const SCORE_GAP_PROBLEM_MESSAGES = {
  "not-a-number": "Enter a number for both scores. Margins can be left blank.",
  "negative-margin": "A margin cannot be negative.",
} as const;

export interface ScoreGapMessage {
  headline: string;
  detail: string;
}

/** Whole days from one ISO date to another (UTC). */
export function daysBetweenIso(fromIso: string, toIso: string): number {
  return Math.round((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / MS_PER_DAY);
}

/** True when a snapshot is older than the weekly cycle allows. */
export function isScoreStale(asOf: string, todayIso: string): boolean {
  return daysBetweenIso(asOf, todayIso) > BENCHMARK_STALE_AFTER_DAYS;
}

/** "1,525" or "86.69": thousands separators and at most two decimals. */
export function formatScore(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

/** "±9", or an em dash when no margin is published. */
export function formatMargin(margin: number | null): string {
  return margin === null ? "—" : `±${formatScore(margin)}`;
}

/** Sorted, de-duplicated maker names for a filter list. */
export function listMakers(scores: readonly IndependentScore[]): string[] {
  return [...new Set(scores.map((entry) => entry.maker))].sort((a, b) => a.localeCompare(b));
}

/** Keeps rows that match the maker and the model-name search. */
export function filterScores(scores: readonly IndependentScore[], filters: ScoreFilters): IndependentScore[] {
  const needle = filters.query.trim().toLowerCase();
  return scores.filter((entry) => {
    if (filters.maker !== ALL_MAKERS && entry.maker !== filters.maker) return false;
    return needle === "" || entry.modelName.toLowerCase().includes(needle);
  });
}

/** Sorts by score (highest first, unscored rows last) or by model name. Returns a new array. */
export function sortScores(scores: readonly IndependentScore[], key: ScoreSortKey): IndependentScore[] {
  return [...scores].sort((a, b) => {
    if (key === "name") return a.modelName.localeCompare(b.modelName);
    if (a.score === null && b.score === null) return a.modelName.localeCompare(b.modelName);
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || a.modelName.localeCompare(b.modelName);
  });
}

/**
 * Tells whether two scores are really different. Two scores are separated only when the gap is larger than
 * the two margins added together, which means their ranges do not overlap. Without both margins it cannot tell.
 */
export function compareScores(input: ScoreGapInput): ScoreGapResult {
  const { scoreA, scoreB, marginA, marginB } = input;
  const margins = [marginA, marginB];
  if (!Number.isFinite(scoreA) || !Number.isFinite(scoreB)) return { ok: false, reason: "not-a-number" };
  if (margins.some((margin) => margin !== null && !Number.isFinite(margin))) return { ok: false, reason: "not-a-number" };
  if (margins.some((margin) => margin !== null && margin < 0)) return { ok: false, reason: "negative-margin" };

  const difference = scoreA - scoreB;
  const gap = Math.abs(difference);
  const leader = difference === 0 ? "none" : difference > 0 ? "a" : "b";

  if (marginA === null || marginB === null) {
    return { ok: true, gap, leader, verdict: "unknown-margin", combinedMargin: null };
  }
  const combinedMargin = marginA + marginB;
  const verdict = gap > combinedMargin ? "separated" : "overlap";
  return { ok: true, gap, leader: verdict === "overlap" ? "none" : leader, verdict, combinedMargin };
}

/** Plain-language result for the gap checker. */
export function describeScoreGap(result: ScoreGapResult): ScoreGapMessage {
  if (!result.ok) return { headline: "Check the numbers", detail: SCORE_GAP_PROBLEM_MESSAGES[result.reason] };

  const gap = formatScore(result.gap);
  if (result.verdict === "unknown-margin") {
    return {
      headline: "Margins needed",
      detail: `The gap is ${gap}, but without a margin for both scores you cannot tell whether it is real. Look for the vote count or interval on the source page.`,
    };
  }
  if (result.verdict === "overlap") {
    return {
      headline: "Too close to call",
      detail: `The gap is ${gap}, and the two margins add up to ${formatScore(result.combinedMargin ?? 0)}. The ranges overlap, so treat the two as level.`,
    };
  }
  return {
    headline: `Score ${result.leader === "a" ? "A" : "B"} is ahead beyond the margins`,
    detail: `The gap is ${gap}, larger than the two margins combined (${formatScore(result.combinedMargin ?? 0)}). The ranges do not overlap. A real gap on this test still says nothing about your own tasks.`,
  };
}

/** For each directory model and each source: scored, listed without a score, or not captured yet. */
export function buildCoverage(
  modelNames: readonly string[],
  sources: readonly IndependentSource[],
  scores: readonly IndependentScore[],
): CoverageRow[] {
  return modelNames.map((modelName) => ({
    modelName,
    cells: sources.map((source) => {
      const match = scores.find((entry) => entry.sourceId === source.id && entry.modelName === modelName);
      const status: CoverageStatus = match ? (match.score === null ? "not-ranked" : "scored") : "not-captured";
      return { sourceId: source.id, status };
    }),
  }));
}

/** One plain sentence about how far the page has been checked against source pages. */
export function describeBenchmarkVerification(summary: VerificationSummary): string {
  if (summary.verifiedCount === 0) {
    return `None of the ${summary.total} records below has been checked on its source page yet. They were read through third-party reports and may be out of date.`;
  }
  if (summary.pendingCount > 0) {
    return `${summary.verifiedCount} of ${summary.total} records have been checked on the source page. The rest were read through third-party reports.`;
  }
  return `All ${summary.total} records were checked on their source pages. Oldest check: ${formatVerifiedDate(summary.oldestVerifiedOn ?? "")}.`;
}