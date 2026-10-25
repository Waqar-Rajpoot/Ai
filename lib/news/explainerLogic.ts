import { calendarDaysUntil } from "@/lib/shared/dates";
import { EXPLAINERS } from "./explainerData";
import { MAX_QUICK_TAKE, MORE_EXPLAINERS_LIMIT, NEW_BADGE_DAYS, REVIEW_INTERVAL_DAYS } from "./explainerConstants";
import type { Explainer, ExplainerAction, ExplainerLevel, LevelImpact, TimelineEntry } from "./explainerTypes";

export type LevelSelection = ExplainerLevel | "all";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date written YYYY-MM-DD. */
export function isValidIsoDate(value: string): boolean {
  if (!ISO_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}

/** "Oct 25, 2026". Fixed to UTC and en-US so server and browser render the same text. */
export function formatDateLabel(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Whole days since an ISO date. 0 is today, negative means the date is in the future. */
export function ageInDays(isoDate: string, now: Date): number {
  return -calendarDaysUntil(isoDate, now);
}

/** "today", "tomorrow", "in 38 days", "yesterday" or "12 days ago". */
export function describeRelative(isoDate: string, now: Date): string {
  const days = calendarDaysUntil(isoDate, now);
  if (days === 0) return "today";
  if (days > 0) return days === 1 ? "tomorrow" : `in ${days} days`;
  const ago = -days;
  return ago === 1 ? "yesterday" : `${ago} days ago`;
}

/** The first timeline date that is today or later, or undefined if all have passed. */
export function findNextUpcoming(entries: readonly TimelineEntry[], now: Date): TimelineEntry | undefined {
  return entries.find((entry) => calendarDaysUntil(entry.isoDate, now) >= 0);
}

/** All explainers, newest first. */
export function getExplainers(): Explainer[] {
  return [...EXPLAINERS].sort(
    (a, b) => b.publishedIso.localeCompare(a.publishedIso) || a.title.localeCompare(b.title),
  );
}

export function getExplainerSlugs(): string[] {
return EXPLAINERS.map((explainer: Explainer) => explainer.slug);
}

export function getExplainerBySlug(slug: string): Explainer | undefined {
  return EXPLAINERS.find((explainer: Explainer) => explainer.slug === slug);
}

/** Other explainers to suggest. Same topic first, then newest. */
export function getMoreExplainers(current: Explainer, limit: number = MORE_EXPLAINERS_LIMIT): Explainer[] {
  const others = getExplainers().filter((explainer: Explainer) => explainer.slug !== current.slug);
  const sameTopic = others.filter((explainer: Explainer) => explainer.topic === current.topic);
  const rest = others.filter((explainer: Explainer) => explainer.topic !== current.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}

/** Flagged when the explainer has not been updated within the review interval. */
export function isReviewDue(explainer: Explainer, now: Date): boolean {
  return ageInDays(explainer.updatedIso, now) > REVIEW_INTERVAL_DAYS;
}

export function isNew(explainer: Explainer, now: Date): boolean {
  return ageInDays(explainer.publishedIso, now) <= NEW_BADGE_DAYS;
}

/** The impacts to show for a selection, lowest level first. */
export function impactsForSelection(impacts: readonly LevelImpact[], selection: LevelSelection): LevelImpact[] {
  return impacts.filter((impact) => selection === "all" || impact.level === selection).sort((a, b) => a.level - b.level);
}

/** Actions lowest level first, keeping the written order within a level. */
export function sortActions(actions: readonly ExplainerAction[]): ExplainerAction[] {
  return [...actions].sort((a, b) => a.level - b.level);
}

export function countSources(explainer: Explainer): { provider: number; secondary: number } {
  const provider = explainer.sources.filter((source) => source.kind === "provider").length;
  return { provider, secondary: explainer.sources.length - provider };
}

/**
 * Checks the Blueprint's template rules for one explainer and returns the problems found.
 * An empty list means the explainer is complete.
 */
export function validateExplainer(explainer: Explainer): string[] {
  const problems: string[] = [];
  const { slug } = explainer;

  if (!SLUG_PATTERN.test(slug)) problems.push("slug must be lowercase kebab-case");
  if (!isValidIsoDate(explainer.publishedIso)) problems.push("publishedIso is not a valid date");
  if (!isValidIsoDate(explainer.updatedIso)) problems.push("updatedIso is not a valid date");
  if (
    isValidIsoDate(explainer.publishedIso) &&
    isValidIsoDate(explainer.updatedIso) &&
    explainer.updatedIso < explainer.publishedIso
  ) {
    problems.push("updatedIso is earlier than publishedIso");
  }

  if (explainer.quickTake.length < 1 || explainer.quickTake.length > MAX_QUICK_TAKE) {
    problems.push(`quickTake needs 1 to ${MAX_QUICK_TAKE} bullets`);
  }
  if (explainer.whatHappened.length < 1) problems.push("whatHappened is empty");
  if (explainer.sources.length < 1) problems.push("no sources: every explainer needs a source");
  if (explainer.related.length < 1) problems.push("no related guide");
  if (explainer.actions.length < 1) problems.push("no actions");
  if (explainer.unknowns.length < 1) problems.push("unknowns is empty");
  if (explainer.topic === "policy" && !explainer.notice) problems.push("policy explainers need a notice");

  const impactLevels = explainer.impacts.map((impact) => impact.level);
  for (const level of explainer.levels) {
    const count = impactLevels.filter((entry) => entry === level).length;
    if (count !== 1) problems.push(`level ${level} needs exactly one impact (found ${count})`);
  }
  for (const level of impactLevels) {
    if (!explainer.levels.includes(level)) problems.push(`impact for level ${level} is not in levels`);
  }

  const actionIds = explainer.actions.map((action) => action.id);
  if (new Set(actionIds).size !== actionIds.length) problems.push("action ids must be unique");

  for (let index = 0; index < explainer.timeline.length; index += 1) {
    const entry = explainer.timeline[index];
    if (!isValidIsoDate(entry.isoDate)) problems.push(`timeline entry ${index + 1} has an invalid date`);
    if (index > 0 && entry.isoDate < explainer.timeline[index - 1].isoDate) {
      problems.push(`timeline entry ${index + 1} is out of order`);
    }
  }

  return problems;
}

/** Problems across every explainer, keyed by slug. Also flags duplicate slugs. */
export function validateAllExplainers(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  const seen = new Set<string>();
  for (const explainer of EXPLAINERS) {
    const problems = validateExplainer(explainer);
    if (seen.has(explainer.slug)) problems.push("duplicate slug");
    seen.add(explainer.slug);
    if (problems.length > 0) result[explainer.slug] = problems;
  }
  return result;
}