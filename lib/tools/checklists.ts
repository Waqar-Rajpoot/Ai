import { GETTING_THERE_RATIO, PERCENT_MULTIPLIER } from "./safetyChecklistConstants";

export type ChecklistPriority = "essential" | "recommended";

export interface ChecklistGuideLink {
  href: string;
  label: string;
}

export interface ChecklistItem {
  /** Unique across all checklists. Stored in the browser, so do not rename lightly. */
  id: string;
  text: string;
  why: string;
  how?: string;
  priority: ChecklistPriority;
  guide?: ChecklistGuideLink;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  summary: string;
  items: readonly ChecklistItem[];
}

export interface ChecklistProgress {
  done: number;
  total: number;
  percent: number;
  essentialDone: number;
  essentialTotal: number;
}

export type ReadinessLevel = "starting" | "getting-there" | "essentials-done" | "complete";

/** Every item in a list of groups, in order. */
export function getAllItems(groups: readonly ChecklistGroup[]): ChecklistItem[] {
  return groups.flatMap((group) => [...group.items]);
}

/** Counts ticked items overall and among the essential ones. */
export function calculateProgress(
  items: readonly ChecklistItem[],
  checkedIds: ReadonlySet<string>,
): ChecklistProgress {
  let done = 0;
  let essentialDone = 0;
  let essentialTotal = 0;
  for (const item of items) {
    const isChecked = checkedIds.has(item.id);
    if (isChecked) done += 1;
    if (item.priority === "essential") {
      essentialTotal += 1;
      if (isChecked) essentialDone += 1;
    }
  }
  const total = items.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * PERCENT_MULTIPLIER);
  return { done, total, percent, essentialDone, essentialTotal };
}

/** Plain-language readiness level. Essentials matter more than the overall count. */
export function getReadiness(progress: ChecklistProgress): ReadinessLevel {
  if (progress.total > 0 && progress.done === progress.total) return "complete";
  const ratio = progress.essentialTotal === 0 ? 1 : progress.essentialDone / progress.essentialTotal;
  if (ratio === 1) return "essentials-done";
  if (ratio >= GETTING_THERE_RATIO) return "getting-there";
  return "starting";
}

/** Returns a new set with the id added or removed. */
export function toggleChecked(checkedIds: ReadonlySet<string>, id: string): Set<string> {
  const next = new Set(checkedIds);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/** Returns a new set without the given ids. */
export function removeIds(checkedIds: ReadonlySet<string>, idsToRemove: readonly string[]): Set<string> {
  const next = new Set(checkedIds);
  for (const id of idsToRemove) next.delete(id);
  return next;
}

/** Keeps only essential items when asked, and drops groups left empty. */
export function filterGroups(
  groups: readonly ChecklistGroup[],
  essentialsOnly: boolean,
): ChecklistGroup[] {
  if (!essentialsOnly) return [...groups];
  return groups
    .map((group) => ({ ...group, items: group.items.filter((item) => item.priority === "essential") }))
    .filter((group) => group.items.length > 0);
}

export function serializeCheckedIds(checkedIds: ReadonlySet<string>): string {
  return JSON.stringify([...checkedIds]);
}

/** Reads saved ids. Anything malformed or unknown is ignored, so old saves never break the page. */
export function parseCheckedIds(raw: string | null, validIds: ReadonlySet<string>): Set<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((value): value is string => typeof value === "string" && validIds.has(value)));
  } catch {
    return new Set();
  }
}

// ---- Scored yes / no / not-sure checklists (used by the benchmark checklist) ----

export type ChecklistAnswer = "yes" | "no" | "unsure" | "unanswered";

/** Answers keyed by question id. A missing key counts as unanswered. */
export type ChecklistAnswers = Readonly<Record<string, ChecklistAnswer>>;

export type ScoreTier = "strong" | "moderate" | "weak";

/** The fields scoring needs. Question types with more fields satisfy this. */
export interface ScoredQuestion {
  id: string;
  /** Importance of the question. Higher counts for more. */
  weight: number;
  /** A "no" on a critical question is a red flag and caps the rating at moderate. */
  critical?: boolean;
}

export interface ChecklistThresholds {
  /** Minimum weighted percent for a strong rating. */
  strongPercent: number;
  /** Minimum weighted percent for a moderate rating. */
  moderatePercent: number;
  /** Fewest answered questions before any rating is given. */
  minAnswered: number;
}

export interface ChecklistScore {
  answeredCount: number;
  totalCount: number;
  /** Weighted share of "yes" among answered questions, 0 to 100. */
  percent: number;
  /** Null until enough questions are answered. */
  tier: ScoreTier | null;
  /** Ids of critical questions answered "no". */
  criticalNoIds: string[];
}

/** Every question starts unanswered. */
export function createBlankAnswers(
  questions: readonly { id: string }[],
): Record<string, ChecklistAnswer> {
  return Object.fromEntries(questions.map((question) => [question.id, "unanswered" as const]));
}

export function getAnswer(answers: ChecklistAnswers, questionId: string): ChecklistAnswer {
  return answers[questionId] ?? "unanswered";
}

/**
 * Rates the answers. Only answered questions count, so a partly finished
 * list is not punished. "Not sure" earns nothing, like "no", but is not a red flag.
 */
export function scoreChecklist(
  questions: readonly ScoredQuestion[],
  answers: ChecklistAnswers,
  thresholds: ChecklistThresholds,
): ChecklistScore {
  let answeredCount = 0;
  let answeredWeight = 0;
  let earnedWeight = 0;
  const criticalNoIds: string[] = [];

  for (const question of questions) {
    const answer = getAnswer(answers, question.id);
    if (answer === "unanswered") continue;
    answeredCount += 1;
    answeredWeight += question.weight;
    if (answer === "yes") earnedWeight += question.weight;
    if (answer === "no" && question.critical) criticalNoIds.push(question.id);
  }

  const percent = answeredWeight === 0 ? 0 : (earnedWeight / answeredWeight) * PERCENT_MULTIPLIER;

  let tier: ScoreTier | null = null;
  if (answeredCount >= thresholds.minAnswered) {
    if (percent >= thresholds.strongPercent && criticalNoIds.length === 0) tier = "strong";
    else if (percent >= thresholds.moderatePercent) tier = "moderate";
    else tier = "weak";
  }

  return { answeredCount, totalCount: questions.length, percent, tier, criticalNoIds };
}

/** Ids answered "no" or "not sure", heaviest first, then in list order. */
export function listOpenItemIds(
  questions: readonly ScoredQuestion[],
  answers: ChecklistAnswers,
): string[] {
  return questions
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => {
      const answer = getAnswer(answers, question.id);
      return answer === "no" || answer === "unsure";
    })
    .sort((a, b) => b.question.weight - a.question.weight || a.index - b.index)
    .map(({ question }) => question.id);
}