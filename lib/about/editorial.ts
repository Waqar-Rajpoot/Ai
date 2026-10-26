import { calendarDaysUntil } from "@/lib/shared/dates";
import type { NavLink, TeamRole } from "./about";

export type StageOwner = "writer" | "reviewer" | "both";
export type CheckScope = "all" | "reviews" | "prices" | "affiliate";
export type ScopeFilter = CheckScope | "everything";
export type ReviewAgeStatus = "invalid" | "future" | "recent" | "past-quarter" | "stale";

export interface PublishingStage {
  id: string;
  title: string;
  owner: StageOwner;
  what: string;
  /** What the reader can see as a result. */
  readerSees: string;
}

export interface TopicSource {
  id: string;
  name: string;
  whereItComes: readonly string[];
  whatWeDo: string;
  links: readonly NavLink[];
}

export interface NewsTrigger {
  trigger: string;
  whatWePublish: string;
  target: string;
}

export interface PreCheck {
  id: string;
  scope: CheckScope;
  text: string;
  why: string;
}

/** One AI tool that helped draft content. Names must be real before launch. */
export interface AiToolUse {
  model: string;
  maker: string;
  whatItDid: string;
  humanEdit: string;
  /** True if we also review this model on the site (a conflict we must disclose). */
  isAlsoReviewed: boolean;
}

export interface RuleLine {
  title: string;
  detail: string;
}

export interface ContentBadge {
  type: string;
  meaning: string;
  exampleHref: string;
  exampleLabel: string;
}

export interface FirstTenEntry {
  number: number;
  title: string;
  href: string;
}

export interface ReviewRule {
  quarterDays: number;
  /** Null until the stale-review rule is decided. */
  staleAfterDays: number | null;
}

export interface ReviewAgeResult {
  status: ReviewAgeStatus;
  /** Whole days since the test date. Negative for a future date, 0 when invalid. */
  days: number;
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const STAGE_OWNER_LABELS: Record<StageOwner, string> = {
  writer: "Writer",
  reviewer: "Reviewer",
  both: "Writer and reviewer",
};

export const SCOPE_LABELS: Record<ScopeFilter, string> = {
  everything: "Every check",
  all: "All pages",
  reviews: "Reviews",
  prices: "Pages with prices",
  affiliate: "Affiliate links",
};

/** True for a real calendar date written as YYYY-MM-DD. */
export function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/**
 * How old a test date is, and what that means under the rule.
 * It reports age and a status. It never calls a review wrong, because age is not accuracy.
 */
export function assessReviewAge(testedOn: string, now: Date, rule: ReviewRule): ReviewAgeResult {
  if (!isValidIsoDate(testedOn)) return { status: "invalid", days: 0 };
  const days = -calendarDaysUntil(testedOn, now);
  if (days < 0) return { status: "future", days };
  if (rule.staleAfterDays !== null && days > rule.staleAfterDays) return { status: "stale", days };
  if (days > rule.quarterDays) return { status: "past-quarter", days };
  return { status: "recent", days };
}

/** Checks that apply to a kind of page. "everything" returns all. Returns a new array. */
export function filterChecks(checks: readonly PreCheck[], scope: ScopeFilter): PreCheck[] {
  if (scope === "everything") return [...checks];
  return checks.filter((check) => check.scope === scope);
}

export function countChecksByScope(checks: readonly PreCheck[]): Record<CheckScope, number> {
  const counts: Record<CheckScope, number> = { all: 0, reviews: 0, prices: 0, affiliate: 0 };
  for (const check of checks) counts[check.scope] += 1;
  return counts;
}

export function countStagesByOwner(stages: readonly PublishingStage[]): Record<StageOwner, number> {
  const counts: Record<StageOwner, number> = { writer: 0, reviewer: 0, both: 0 };
  for (const stage of stages) counts[stage.owner] += 1;
  return counts;
}

/** The AI-tools list is only "published" once at least one complete entry exists. */
export function hasPublishedAiDisclosure(uses: readonly AiToolUse[]): boolean {
  return uses.length > 0 && findIncompleteAiUses(uses).length === 0;
}

/** Entries with a blank field. Use it in a test or build check. */
export function findIncompleteAiUses(uses: readonly AiToolUse[]): AiToolUse[] {
  return uses.filter((use) =>
    [use.model, use.maker, use.whatItDid, use.humanEdit].some((field) => field.trim() === ""),
  );
}

/** Reviewed models that also helped draft. These need the conflict-of-interest disclosure. */
export function listConflictedTools(uses: readonly AiToolUse[]): AiToolUse[] {
  return uses.filter((use) => use.isAlsoReviewed);
}

/** Roles with no named person, for the build check that stops a launch with placeholders. */
export function listUnnamedRoleTitles(roles: readonly TeamRole[]): string[] {
  return roles.filter((role) => !role.name?.trim()).map((role) => role.role);
}