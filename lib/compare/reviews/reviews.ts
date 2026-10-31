import { MODEL_DIRECTORY_ROWS, getReviewHref } from "@/lib/compare/modelDirectory";
import type { ModelDirectoryRow } from "@/lib/compare/modelDirectory";
import { NOT_IN_DIRECTORY_MODELS } from "./benchLmSnapshot";
import {
  COST_SCENARIOS,
  DIRECTORY_SNAPSHOT_DATE,
  MONTHLY_PLANS,
  OPEN_WEIGHT_MODEL_IDS,
  TASKS_FOR_VOLUME_ESTIMATE,
} from "./reviewConfig";
import { REVIEW_EDITORIAL } from "./reviewEditorial";
import { REVIEW_EVIDENCE } from "./reviewEvidence";
import {
  buildAlternativeSuggestions,
  buildCostEstimates,
  buildMonthlyCostEstimates,
  buildSkipReasons,
  getPriceTier,
} from "./reviewAnalysis";
import {
  buildHeadToHead,
  buildPricePosition,
  buildRankingFacts,
  buildSnapshotTakeaway,
  buildValueMetrics,
} from "./reviewComparison";
import { formatDate } from "./reviewFormat";
import type { ReviewEditorial, ReviewPageModel } from "./reviewTypes";

function buildFallbackEditorial(row: ModelDirectoryRow, takeaway: string): ReviewEditorial {
  return {
    whatItDoes: `${row.name} is a model from ${row.maker}. Our directory lists it under "${row.bestFor}".`,
    bestFor: [row.bestFor],
    caveats: [],
    interimVerdict: takeaway,
  };
}

/** Route slugs for every review page (one per directory row). */
export function getReviewSlugs(): string[] {
  return MODEL_DIRECTORY_ROWS.map((row) => row.id);
}

/** Builds everything a review page needs, or null when the slug is unknown. */
export function getReviewPageModel(slug: string): ReviewPageModel | null {
  const row = MODEL_DIRECTORY_ROWS.find((candidate) => candidate.id === slug);
  if (!row) return null;

  const tier = getPriceTier(row.inputPricePerMillion);
  const ranking = buildRankingFacts(row, MODEL_DIRECTORY_ROWS);
  const value = buildValueMetrics(row, MODEL_DIRECTORY_ROWS);
  const position = buildPricePosition(row, MODEL_DIRECTORY_ROWS);
  const snapshotTakeaway = buildSnapshotTakeaway(row, tier, ranking);
  const editorial = REVIEW_EDITORIAL[row.id] ?? buildFallbackEditorial(row, snapshotTakeaway);
  const hasTestRun = Boolean(editorial.testRun);
  const isOpenWeight = OPEN_WEIGHT_MODEL_IDS.includes(row.id);
  const suggestions = buildAlternativeSuggestions(row, MODEL_DIRECTORY_ROWS);
  const successorRow = editorial.supersededById
    ? MODEL_DIRECTORY_ROWS.find((candidate) => candidate.id === editorial.supersededById)
    : undefined;

  return {
    row,
    href: getReviewHref(row),
    tier,
    isOpenWeight,
    ranking,
    value,
    position,
    outrankedBy:
      ranking.liveScore === null
        ? []
        : NOT_IN_DIRECTORY_MODELS.filter((model) => model.score > (ranking.liveScore ?? 0)),
    snapshotTakeaway,
    skipReasons: buildSkipReasons({ row, tier, isOpenWeight, hasTestRun, beatenBy: position.beatenBy }),
    costEstimates: buildCostEstimates(row, COST_SCENARIOS, TASKS_FOR_VOLUME_ESTIMATE),
    monthlyCosts: buildMonthlyCostEstimates(row, MONTHLY_PLANS),
    alternatives: suggestions.map((suggestion) => ({ ...suggestion, href: getReviewHref(suggestion.row) })),
    headToHead: buildHeadToHead(
      row,
      suggestions.map((suggestion) => suggestion.row),
      getReviewHref,
    ),
    evidence: REVIEW_EVIDENCE[row.id] ?? null,
    editorial,
    hasTestRun,
    successor: successorRow ? { name: successorRow.name, href: getReviewHref(successorRow) } : null,
  };
}

/** Title and description for the page metadata, or null for an unknown slug. */
export function getReviewMetadata(slug: string): { title: string; description: string } | null {
  const row = MODEL_DIRECTORY_ROWS.find((candidate) => candidate.id === slug);
  if (!row) return null;
  return {
    title: `${row.name} review`,
    description: `${row.name} by ${row.maker}: price, rank, value, independent evidence, who should skip it and alternatives. Prices as of ${formatDate(DIRECTORY_SNAPSHOT_DATE)}.`,
  };
}