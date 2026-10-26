import {
  CLAIM_TYPES,
  SCORE_LABEL_BY_SOURCE,
  SOURCE_TYPES,
  SOURCE_USE_MATRIX,
  USE_COPY,
  type ClaimType,
  type ClaimTypeId,
  type SourceType,
  type SourceTypeId,
  type SourceUse,
  type UseCopy,
} from "./sourcePolicyData";

export interface SourceCheckInput {
  sourceTypeId: SourceTypeId;
  claimTypeId: ClaimTypeId;
  /** The source, or your check of it, carries a date. */
  isDated: boolean;
  /** You opened the original page rather than relying on a quote, copy or screenshot. */
  openedOriginal: boolean;
}

export interface SourceAssessment {
  use: SourceUse;
  copy: UseCopy;
  /** Level in the hierarchy, or null for sources outside it. */
  rank: number | null;
  /** Result label for a score (Vendor-reported, Independent third party, Tested by us), else null. */
  resultLabel: string | null;
  notes: string[];
  checks: readonly string[];
}

export const DEFAULT_CHECK_INPUT: SourceCheckInput = {
  sourceTypeId: "provider-page",
  claimTypeId: "price-plan-limit",
  isDated: true,
  openedOriginal: true,
};

export function findSourceType(sourceTypeId: SourceTypeId): SourceType {
  const found = SOURCE_TYPES.find((sourceType) => sourceType.id === sourceTypeId);
  if (!found) throw new Error(`Unknown source type: ${sourceTypeId}`);
  return found;
}

export function findClaimType(claimTypeId: ClaimTypeId): ClaimType {
  const found = CLAIM_TYPES.find((claimType) => claimType.id === claimTypeId);
  if (!found) throw new Error(`Unknown claim type: ${claimTypeId}`);
  return found;
}

/** One step weaker. "Lead only" and "not used" stay where they are. */
export function downgradeUse(use: SourceUse): SourceUse {
  if (use === "primary") return "supporting";
  if (use === "supporting") return "lead-only";
  return use;
}

/**
 * How we would treat a source for a claim. Starts from the rules matrix, then weakens the
 * rating if the original was not opened or the source is undated. Pure and easy to test.
 */
export function assessSource(input: SourceCheckInput): SourceAssessment {
  const sourceType = findSourceType(input.sourceTypeId);
  const claimType = findClaimType(input.claimTypeId);
  const baseUse = SOURCE_USE_MATRIX[input.sourceTypeId][input.claimTypeId];
  const notes: string[] = [];
  let use = baseUse;

  if (baseUse === "primary" || baseUse === "supporting") {
    if (sourceType.requiresOpenedOriginal && !input.openedOriginal) {
      use = "lead-only";
      notes.push("You have not opened the original page. A quote, copy or screenshot is a lead until you do.");
    } else if (!input.isDated) {
      use = downgradeUse(baseUse);
      notes.push("No date. Record the day you opened the source, because figures change.");
    }
  }

  if (baseUse === "lead-only" || baseUse === "not-used") {
    notes.push(`Next step: look for ${claimType.primaryPointer}.`);
  } else if (use === "lead-only") {
    notes.push(`Once you have opened it, look for ${claimType.primaryPointer}.`);
  }

  const scoreLabel =
    input.claimTypeId === "benchmark-score" && (use === "primary" || use === "supporting")
      ? SCORE_LABEL_BY_SOURCE[input.sourceTypeId] ?? null
      : null;
  if (scoreLabel === "Vendor-reported") {
    notes.push("Show it as Vendor-reported, in a separate column or table from independent scores.");
  } else if (scoreLabel === "Independent third party") {
    notes.push("Show vote counts or margins where the evaluator publishes them.");
  } else if (scoreLabel === "Tested by us") {
    notes.push("Record the test date, model version and effort setting next to it.");
  }

  return {
    use,
    copy: USE_COPY[use],
    rank: sourceType.rank,
    resultLabel: scoreLabel,
    notes,
    checks: claimType.checks,
  };
}