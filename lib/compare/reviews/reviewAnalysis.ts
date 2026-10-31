import type { ModelDirectoryRow } from "@/lib/compare/modelDirectory";
import { BENCHLM_SNAPSHOT, BENCHLM_SNAPSHOT_DATE } from "./benchLmSnapshot";
import {
  MAX_ALTERNATIVES,
  PRICE_TIER_LABELS,
  PRICE_TIER_LIMITS,
  STRONG_SCORE_THRESHOLD,
  THIN_EVIDENCE_SOURCE_FAMILIES,
  TOKENS_PER_MILLION,
  UNCONFIRMED_CONTEXT_LABEL,
} from "./reviewConfig";
import { describeBenchLm, formatBenchLm, formatDate, formatPriceRange } from "./reviewFormat";
import type {
  AlternativeSuggestion,
  CostEstimate,
  CostScenario,
  MonthlyCostEstimate,
  MonthlyPlan,
  PriceTier,
} from "./reviewTypes";

/** Score from our directory table (October 17). Null when unranked. */
export function getDirectoryScore(row: ModelDirectoryRow): number | null {
  const { benchLm } = row;
  return "score" in benchLm && typeof benchLm.score === "number" ? benchLm.score : null;
}

/** Current BenchLM score (October 29). Null when not ranked. */
export function getBenchLmScore(row: ModelDirectoryRow): number | null {
  return BENCHLM_SNAPSHOT[row.id]?.score ?? null;
}

export function getPriceTier(inputPricePerMillion: number): PriceTier {
  if (inputPricePerMillion <= PRICE_TIER_LIMITS.budgetMaxInputPrice) return "budget";
  if (inputPricePerMillion <= PRICE_TIER_LIMITS.midPricedMaxInputPrice) return "mid-priced";
  return "premium";
}

/** Average of the input and output rates, as BenchLM computes "blended". */
export function getBlendedPrice(row: ModelDirectoryRow): number {
  return (row.inputPricePerMillion + row.outputPricePerMillion) / 2;
}

/** Cost of one task of the given size at list price. */
export function calculateTaskCost(row: ModelDirectoryRow, scenario: CostScenario): number {
  return (
    (scenario.inputTokens / TOKENS_PER_MILLION) * row.inputPricePerMillion +
    (scenario.outputTokens / TOKENS_PER_MILLION) * row.outputPricePerMillion
  );
}

export function buildCostEstimates(
  row: ModelDirectoryRow,
  scenarios: readonly CostScenario[],
  tasksForVolume: number,
): CostEstimate[] {
  return scenarios.map((scenario) => {
    const costPerTask = calculateTaskCost(row, scenario);
    return { scenario, costPerTask, costPerThousandTasks: costPerTask * tasksForVolume };
  });
}

export function buildMonthlyCostEstimates(
  row: ModelDirectoryRow,
  plans: readonly MonthlyPlan[],
): MonthlyCostEstimate[] {
  return plans.map((plan) => ({
    plan,
    monthlyCost:
      (plan.inputTokens / TOKENS_PER_MILLION) * row.inputPricePerMillion +
      (plan.outputTokens / TOKENS_PER_MILLION) * row.outputPricePerMillion,
  }));
}

interface SkipReasonInput {
  row: ModelDirectoryRow;
  tier: PriceTier;
  isOpenWeight: boolean;
  hasTestRun: boolean;
  beatenBy: readonly string[];
}

/** Calculated "skip it if" statements, drawn from price, evidence and rank. */
export function buildSkipReasons({
  row,
  tier,
  isOpenWeight,
  hasTestRun,
  beatenBy,
}: SkipReasonInput): string[] {
  const entry = BENCHLM_SNAPSHOT[row.id];
  const score = entry?.score ?? null;
  const snapshotDate = formatDate(BENCHLM_SNAPSHOT_DATE);
  const reasons: string[] = [];

  if (tier === "premium") {
    reasons.push(
      `Skip it if cost matters most: it is in the premium tier at ${formatPriceRange(row)}, so a busy workload costs far more than on a budget model.`,
    );
  }
  if (tier === "budget" && (score === null || score < STRONG_SCORE_THRESHOLD)) {
    reasons.push(
      "Skip it if you need the best results on the hardest tasks: budget-tier models are not the strongest in the snapshot.",
    );
  }
  if (score === null) {
    reasons.push(
      `Skip it if you need an independent score to go on: it has no ranked BenchLM entry on ${snapshotDate}.`,
    );
  } else if (entry?.evidence === "estimated") {
    reasons.push(
      `Skip it if you need a confirmed ranking: its BenchLM score is an estimate based on ${entry.sourceFamilies} source families.`,
    );
  } else if (entry && entry.sourceFamilies < THIN_EVIDENCE_SOURCE_FAMILIES) {
    reasons.push(
      `Skip it if you want a thick evidence base: its BenchLM score rests on only ${entry.sourceFamilies} source families.`,
    );
  }
  if (beatenBy.length > 0) {
    const shown = beatenBy.slice(0, 2).join(" and ");
    const extra = beatenBy.length > 2 ? ` (and ${beatenBy.length - 2} more)` : "";
    reasons.push(
      `Skip it if overall score per dollar decides it: ${shown}${extra} score at least as high on BenchLM for the same or a lower list price.`,
    );
  }
  if (row.introRateEndsOn) {
    reasons.push(
      `Skip it if you are budgeting beyond ${formatDate(row.introRateEndsOn)}: the price shown is an introductory rate.`,
    );
  }
  if (row.priceNote) {
    reasons.push(`Read the price note before you commit: "${row.priceNote.replace(/\.$/, "")}".`);
  }
  if (row.contextLabel === UNCONFIRMED_CONTEXT_LABEL) {
    reasons.push("Skip it if you need a confirmed context window: the size is not confirmed in our directory.");
  }
  if (isOpenWeight) {
    reasons.push(
      "Skip it if you only want a hosted app with no setup: open-weight models need a licence check and, for self-hosting, suitable hardware.",
    );
  }
  if (!hasTestRun) {
    reasons.push("Skip it if you need our own test results today: the test run for this model has not been done yet.");
  }
  return reasons;
}

function closestByCombinedPrice(
  candidates: readonly ModelDirectoryRow[],
  targetPrice: number,
): ModelDirectoryRow | undefined {
  const combined = (row: ModelDirectoryRow): number => row.inputPricePerMillion + row.outputPricePerMillion;
  return [...candidates].sort(
    (first, second) => Math.abs(combined(first) - targetPrice) - Math.abs(combined(second) - targetPrice),
  )[0];
}

/**
 * Up to MAX_ALTERNATIVES models worth a look: a step up in score (or a scored
 * model at a similar price), a cheaper option, and one from the same maker.
 */
export function buildAlternativeSuggestions(
  row: ModelDirectoryRow,
  rows: readonly ModelDirectoryRow[],
): AlternativeSuggestion[] {
  const combined = (candidate: ModelDirectoryRow): number =>
    candidate.inputPricePerMillion + candidate.outputPricePerMillion;
  const others = rows.filter((candidate) => candidate.id !== row.id);
  const scoredOthers = others.filter((candidate) => getBenchLmScore(candidate) !== null);
  const ownScore = getBenchLmScore(row);
  const ownPrice = combined(row);
  const suggestions: AlternativeSuggestion[] = [];

  const add = (candidate: ModelDirectoryRow | undefined, reason: string): void => {
    if (!candidate || suggestions.some((entry) => entry.row.id === candidate.id)) return;
    suggestions.push({ row: candidate, reason });
  };

  if (ownScore === null) {
    const similar = closestByCombinedPrice(scoredOthers, ownPrice);
    if (similar) {
      add(similar, `A scored model at a similar price: BenchLM ${formatBenchLm(similar)}, ${formatPriceRange(similar)}.`);
    }
  } else {
    const stepUp = scoredOthers
      .filter((candidate) => (getBenchLmScore(candidate) ?? 0) > ownScore)
      .sort((first, second) => (getBenchLmScore(first) ?? 0) - (getBenchLmScore(second) ?? 0))[0];
    if (stepUp) {
      const gap = ((getBenchLmScore(stepUp) ?? 0) - ownScore).toFixed(2);
      add(stepUp, `Scores ${gap} points higher (BenchLM ${formatBenchLm(stepUp)}), at ${formatPriceRange(stepUp)}.`);
    }
  }

  const cheaper = others
    .filter((candidate) => combined(candidate) < ownPrice)
    .sort(
      (first, second) =>
        (getBenchLmScore(second) ?? -1) - (getBenchLmScore(first) ?? -1) || combined(first) - combined(second),
    )[0];
  if (cheaper) {
    add(cheaper, `Lower list price at ${formatPriceRange(cheaper)}, with ${describeBenchLm(cheaper)}.`);
  }

  const sameMaker = closestByCombinedPrice(
    others.filter((candidate) => candidate.maker === row.maker),
    ownPrice,
  );
  if (sameMaker) {
    add(sameMaker, `Also from ${row.maker}: ${sameMaker.bestFor}, at ${formatPriceRange(sameMaker)}.`);
  }

  return suggestions.slice(0, MAX_ALTERNATIVES);
}

export { PRICE_TIER_LABELS };