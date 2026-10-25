// import { GETTING_THERE_RATIO, PERCENT_MULTIPLIER } from "./safetyChecklistConstants";

// export type ChecklistPriority = "essential" | "recommended";

// export interface ChecklistGuideLink {
//   href: string;
//   label: string;
// }

// export interface ChecklistItem {
//   /** Unique across all checklists. Stored in the browser, so do not rename lightly. */
//   id: string;
//   text: string;
//   why: string;
//   how?: string;
//   priority: ChecklistPriority;
//   guide?: ChecklistGuideLink;
// }

// export interface ChecklistGroup {
//   id: string;
//   title: string;
//   summary: string;
//   items: readonly ChecklistItem[];
// }

// export interface ChecklistProgress {
//   done: number;
//   total: number;
//   percent: number;
//   essentialDone: number;
//   essentialTotal: number;
// }

// export type ReadinessLevel = "starting" | "getting-there" | "essentials-done" | "complete";

// /** Every item in a list of groups, in order. */
// export function getAllItems(groups: readonly ChecklistGroup[]): ChecklistItem[] {
//   return groups.flatMap((group) => [...group.items]);
// }

// /** Counts ticked items overall and among the essential ones. */
// export function calculateProgress(
//   items: readonly ChecklistItem[],
//   checkedIds: ReadonlySet<string>,
// ): ChecklistProgress {
//   let done = 0;
//   let essentialDone = 0;
//   let essentialTotal = 0;
//   for (const item of items) {
//     const isChecked = checkedIds.has(item.id);
//     if (isChecked) done += 1;
//     if (item.priority === "essential") {
//       essentialTotal += 1;
//       if (isChecked) essentialDone += 1;
//     }
//   }
//   const total = items.length;
//   const percent = total === 0 ? 0 : Math.round((done / total) * PERCENT_MULTIPLIER);
//   return { done, total, percent, essentialDone, essentialTotal };
// }

// /** Plain-language readiness level. Essentials matter more than the overall count. */
// export function getReadiness(progress: ChecklistProgress): ReadinessLevel {
//   if (progress.total > 0 && progress.done === progress.total) return "complete";
//   const ratio = progress.essentialTotal === 0 ? 1 : progress.essentialDone / progress.essentialTotal;
//   if (ratio === 1) return "essentials-done";
//   if (ratio >= GETTING_THERE_RATIO) return "getting-there";
//   return "starting";
// }

// /** Returns a new set with the id added or removed. */
// export function toggleChecked(checkedIds: ReadonlySet<string>, id: string): Set<string> {
//   const next = new Set(checkedIds);
//   if (next.has(id)) next.delete(id);
//   else next.add(id);
//   return next;
// }

// /** Returns a new set without the given ids. */
// export function removeIds(checkedIds: ReadonlySet<string>, idsToRemove: readonly string[]): Set<string> {
//   const next = new Set(checkedIds);
//   for (const id of idsToRemove) next.delete(id);
//   return next;
// }

// /** Keeps only essential items when asked, and drops groups left empty. */
// export function filterGroups(
//   groups: readonly ChecklistGroup[],
//   essentialsOnly: boolean,
// ): ChecklistGroup[] {
//   if (!essentialsOnly) return [...groups];
//   return groups
//     .map((group) => ({ ...group, items: group.items.filter((item) => item.priority === "essential") }))
//     .filter((group) => group.items.length > 0);
// }

// export function serializeCheckedIds(checkedIds: ReadonlySet<string>): string {
//   return JSON.stringify([...checkedIds]);
// }

// /** Reads saved ids. Anything malformed or unknown is ignored, so old saves never break the page. */
// export function parseCheckedIds(raw: string | null, validIds: ReadonlySet<string>): Set<string> {
//   if (!raw) return new Set();
//   try {
//     const parsed: unknown = JSON.parse(raw);
//     if (!Array.isArray(parsed)) return new Set();
//     return new Set(parsed.filter((value): value is string => typeof value === "string" && validIds.has(value)));
//   } catch {
//     return new Set();
//   }
// }

// // ---- Scored yes / no / not-sure checklists (used by the benchmark checklist) ----

// export type ChecklistAnswer = "yes" | "no" | "unsure" | "unanswered";

// /** Answers keyed by question id. A missing key counts as unanswered. */
// export type ChecklistAnswers = Readonly<Record<string, ChecklistAnswer>>;

// /** How strongly a set of answers supports trusting what is being checked. */
// export type EvidenceTier = "strong" | "moderate" | "weak";

// export type ScoreTier = EvidenceTier;

// /** The fields scoring needs. Question types with more fields satisfy this. */
// export interface ScoredQuestion {
//   id: string;
//   /** Importance of the question. Higher counts for more. */
//   weight: number;
//   /** A "no" on a critical question is a red flag and caps the rating at moderate. */
//   critical?: boolean;
// }

// export interface ChecklistThresholds {
//   /** Minimum weighted percent for a strong rating. */
//   strongPercent: number;
//   /** Minimum weighted percent for a moderate rating. */
//   moderatePercent: number;
//   /** Fewest answered questions before any rating is given. */
//   minAnswered: number;
// }

// export interface ChecklistScore {
//   answeredCount: number;
//   totalCount: number;
//   /** Weighted share of "yes" among answered questions, 0 to 100. */
//   percent: number;
//   /** Null until enough questions are answered. */
//   tier: ScoreTier | null;
//   /** Ids of critical questions answered "no". */
//   criticalNoIds: string[];
// }

// /** Every question starts unanswered. */
// export function createBlankAnswers(
//   questions: readonly { id: string }[],
// ): Record<string, ChecklistAnswer> {
//   return Object.fromEntries(questions.map((question) => [question.id, "unanswered" as const]));
// }

// export function getAnswer(answers: ChecklistAnswers, questionId: string): ChecklistAnswer {
//   return answers[questionId] ?? "unanswered";
// }

// /**
//  * Rates the answers. Only answered questions count, so a partly finished
//  * list is not punished. "Not sure" earns nothing, like "no", but is not a red flag.
//  */
// export function scoreChecklist(
//   questions: readonly ScoredQuestion[],
//   answers: ChecklistAnswers,
//   thresholds: ChecklistThresholds,
// ): ChecklistScore {
//   let answeredCount = 0;
//   let answeredWeight = 0;
//   let earnedWeight = 0;
//   const criticalNoIds: string[] = [];

//   for (const question of questions) {
//     const answer = getAnswer(answers, question.id);
//     if (answer === "unanswered") continue;
//     answeredCount += 1;
//     answeredWeight += question.weight;
//     if (answer === "yes") earnedWeight += question.weight;
//     if (answer === "no" && question.critical) criticalNoIds.push(question.id);
//   }

//   const percent = answeredWeight === 0 ? 0 : (earnedWeight / answeredWeight) * PERCENT_MULTIPLIER;

//   let tier: ScoreTier | null = null;
//   if (answeredCount >= thresholds.minAnswered) {
//     if (percent >= thresholds.strongPercent && criticalNoIds.length === 0) tier = "strong";
//     else if (percent >= thresholds.moderatePercent) tier = "moderate";
//     else tier = "weak";
//   }

//   return { answeredCount, totalCount: questions.length, percent, tier, criticalNoIds };
// }

// /** Ids answered "no" or "not sure", heaviest first, then in list order. */
// export function listOpenItemIds(
//   questions: readonly ScoredQuestion[],
//   answers: ChecklistAnswers,
// ): string[] {
//   return questions
//     .map((question, index) => ({ question, index }))
//     .filter(({ question }) => {
//       const answer = getAnswer(answers, question.id);
//       return answer === "no" || answer === "unsure";
//     })
//     .sort((a, b) => b.question.weight - a.question.weight || a.index - b.index)
//     .map(({ question }) => question.id);
// }







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

/** How strongly a set of answers supports trusting what is being checked. */
export type EvidenceTier = "strong" | "moderate" | "weak";

export type ScoreTier = EvidenceTier;

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

// ---- Benchmark reading checklist: ten questions, tick each one you can answer yes to ----

/** How far a benchmark score can be trusted, from which of the ten questions have a yes. */
export type BenchmarkTrust = "lead-only" | "partly-checked" | "well-documented";

export interface BenchmarkQuestion extends ScoredQuestion {
  question: string;
  /** Why the question matters, in one short line. */
  why: string;
}

export interface BenchmarkAssessment {
  trust: BenchmarkTrust;
  yesCount: number;
  total: number;
  title: string;
  advice: string;
}

const BENCHMARK_STRONG_PERCENT = 80;
const BENCHMARK_MODERATE_PERCENT = 50;
const BENCHMARK_MIN_ANSWERED = 1;

const BENCHMARK_WEIGHT_CRITICAL = 3;
const BENCHMARK_WEIGHT_HIGH = 2;
const BENCHMARK_WEIGHT_LOW = 1;

const BENCHMARK_THRESHOLDS: ChecklistThresholds = {
  strongPercent: BENCHMARK_STRONG_PERCENT,
  moderatePercent: BENCHMARK_MODERATE_PERCENT,
  minAnswered: BENCHMARK_MIN_ANSWERED,
};

/** The ten questions to ask before trusting a score (Blueprint 5.5). The first two are red flags if missing. */
export const BENCHMARK_QUESTIONS: readonly BenchmarkQuestion[] = [
  {
    id: "independent-source",
    question: "Does the score come from an independent evaluator, not only from the maker?",
    why: "Makers choose what to publish. Vendor-reported numbers are leads, and they should never share a column with independent ones.",
    weight: BENCHMARK_WEIGHT_CRITICAL,
    critical: true,
  },
  {
    id: "method-published",
    question: "Is the test method published, including the prompts, settings and how answers were scored?",
    why: "Without the method, nobody can tell what the number measures.",
    weight: BENCHMARK_WEIGHT_CRITICAL,
    critical: true,
  },
  {
    id: "version-and-settings",
    question: "Are the exact model version and its settings named?",
    why: "Versions and effort settings change results. A model name alone is not enough.",
    weight: BENCHMARK_WEIGHT_HIGH,
  },
  {
    id: "test-date",
    question: "Is the test date shown, and recent enough to match the model you would use?",
    why: "Models are updated often, so an old score may describe an older model.",
    weight: BENCHMARK_WEIGHT_LOW,
  },
  {
    id: "same-conditions",
    question: "Were all the models in the comparison tested the same way?",
    why: "Different settings or different days make a ranking unfair.",
    weight: BENCHMARK_WEIGHT_HIGH,
  },
  {
    id: "matches-your-task",
    question: "Does the benchmark measure the kind of work you will do?",
    why: "A strong maths score says little about email or summaries.",
    weight: BENCHMARK_WEIGHT_HIGH,
  },
  {
    id: "margins-shown",
    question: "Are margins of error or vote counts shown, and is the gap between models bigger than they are?",
    why: "Small gaps between models often sit inside the statistical noise.",
    weight: BENCHMARK_WEIGHT_HIGH,
  },
  {
    id: "contamination",
    question: "Is there a reason to think the test questions were not in the model's training data?",
    why: "A model that has seen the answers can score well without being able to do the task.",
    weight: BENCHMARK_WEIGHT_HIGH,
  },
  {
    id: "reproducible",
    question: "Has someone else reproduced the result, or could you run the test yourself?",
    why: "A result that only one party can produce is hard to check.",
    weight: BENCHMARK_WEIGHT_LOW,
  },
  {
    id: "full-results-and-cost",
    question: "Do you see the full results and the cost per task, not just one headline number?",
    why: "A top score that costs far more per task may not be the better choice.",
    weight: BENCHMARK_WEIGHT_LOW,
  },
];

const BENCHMARK_TRUST_BY_TIER: Record<ScoreTier, BenchmarkTrust> = {
  strong: "well-documented",
  moderate: "partly-checked",
  weak: "lead-only",
};

const BENCHMARK_TRUST_COPY: Record<BenchmarkTrust, { title: string; advice: string }> = {
  "lead-only": {
    title: "Treat this score as a lead only",
    advice:
      "Too many questions have no answer yet. Use the number to decide what to look into, not to choose a model or to repeat it. Look for the maker's method, an independent evaluator, or run your own test.",
  },
  "partly-checked": {
    title: "Partly checked",
    advice:
      "Some of the evidence is there. Use the score as one input, name its source and date when you quote it, and find out about the questions you could not tick.",
  },
  "well-documented": {
    title: "Well documented",
    advice:
      "The source, method and conditions are clear. It is still one test, so check that it matches your task and try the model on your own work before you rely on it.",
  },
};

const BENCHMARK_RED_FLAG_NOTE =
  " The independent source or the published method is missing, which is a red flag on its own.";

/**
 * Rates a benchmark score from the ticked questions. Unticked questions count as "no".
 * Returns null while nothing is ticked, so the page can show its starting message.
 */
export function assessBenchmarkChecklist(yesIds: readonly string[]): BenchmarkAssessment | null {
  const tickedIds = new Set(
    BENCHMARK_QUESTIONS.filter((question) => yesIds.includes(question.id)).map((question) => question.id),
  );
  if (tickedIds.size === 0) return null;

  const answers: Record<string, ChecklistAnswer> = {};
  for (const question of BENCHMARK_QUESTIONS) {
    answers[question.id] = tickedIds.has(question.id) ? "yes" : "no";
  }

  const score = scoreChecklist(BENCHMARK_QUESTIONS, answers, BENCHMARK_THRESHOLDS);
  const trust = BENCHMARK_TRUST_BY_TIER[score.tier ?? "weak"];
  const copy = BENCHMARK_TRUST_COPY[trust];
  const hasRedFlag = score.criticalNoIds.length > 0 && trust !== "lead-only";

  return {
    trust,
    yesCount: tickedIds.size,
    total: BENCHMARK_QUESTIONS.length,
    title: copy.title,
    advice: hasRedFlag ? `${copy.advice}${BENCHMARK_RED_FLAG_NOTE}` : copy.advice,
  };
}