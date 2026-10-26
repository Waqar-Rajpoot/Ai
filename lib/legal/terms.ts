import { isValidIsoDate } from "@/lib/about/editorial";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { UNSET_DETAIL_LABEL } from "./termsConstants";

export type ClauseGroup = "core" | "supporting";
export type TermsMode = "plain" | "full";

export interface TermsClause {
  id: string;
  title: string;
  group: ClauseGroup;
  /** One or two sentences in everyday words. */
  plain: string;
  /** Short bullet points that make the clause concrete. */
  points: readonly string[];
  /** The fuller wording, one paragraph per entry. */
  full: readonly string[];
  /** True where the wording is a legal choice that a lawyer must confirm. */
  needsLegalReview: boolean;
}

export interface OperatorDetail {
  id: string;
  label: string;
  /** Null until a real value is supplied. */
  value: string | null;
  required: boolean;
}

export interface TermsHistoryEntry {
  version: string;
  /** ISO date. */
  effectiveOn: string;
  summary: string;
}

export interface LaunchInput {
  isDraft: boolean;
  effectiveOn: string | null;
  details: readonly OperatorDetail[];
  clauses: readonly TermsClause[];
}

export const CLAUSE_GROUP_LABELS: Record<ClauseGroup, string> = {
  core: "Core terms",
  supporting: "Also covered",
};

/** Shown value for an operator detail, or the honest placeholder. */
export function describeDetail(detail: OperatorDetail): string {
  return detail.value?.trim() ? detail.value : UNSET_DETAIL_LABEL;
}

/** Required details that still have no value. */
export function findMissingOperatorDetails(details: readonly OperatorDetail[]): OperatorDetail[] {
  return details.filter((detail) => detail.required && !detail.value?.trim());
}

export function describeEffectiveDate(effectiveOn: string | null): string {
  return effectiveOn && isValidIsoDate(effectiveOn) ? formatIsoDate(effectiveOn) : UNSET_DETAIL_LABEL;
}

export function countFlaggedClauses(clauses: readonly TermsClause[]): number {
  return clauses.filter((clause) => clause.needsLegalReview).length;
}

export function countByGroup(clauses: readonly TermsClause[]): Record<ClauseGroup, number> {
  const counts: Record<ClauseGroup, number> = { core: 0, supporting: 0 };
  for (const clause of clauses) counts[clause.group] += 1;
  return counts;
}

/** Newest first. Returns a new array. */
export function sortHistoryNewestFirst(history: readonly TermsHistoryEntry[]): TermsHistoryEntry[] {
  return [...history].sort((a, b) => b.effectiveOn.localeCompare(a.effectiveOn));
}

/** Everything that must change before the terms go live. An empty list means ready. Use it in a build check. */
export function findLaunchIssues(input: LaunchInput): string[] {
  const issues: string[] = [];
  if (input.isDraft) issues.push("Terms are still marked as a draft (TERMS_IS_DRAFT).");
  if (!input.effectiveOn || !isValidIsoDate(input.effectiveOn)) issues.push("Effective date is missing or not a real date.");
  for (const detail of findMissingOperatorDetails(input.details)) issues.push(`Operator detail missing: ${detail.label}.`);
  const flagged = countFlaggedClauses(input.clauses);
  if (flagged > 0) issues.push(`${flagged} clause(s) are marked for legal review. Clear the flag once a lawyer has confirmed them.`);
  return issues;
}