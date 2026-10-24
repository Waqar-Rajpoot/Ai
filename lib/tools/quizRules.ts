import type { GuideLink } from "@/lib/shared/contentTypes";
import { MAX_PICKS_SHOWN } from "./quizConstants";
import {
  LOCAL_PICKS_CODING,
  LOCAL_PICKS_DEFAULT,
  LOCAL_ROUNDUPS,
  QUIZ_MODELS,
  ROUNDUP_BY_TASK,
  TASK_PICKS,
  type ModelPick,
} from "./quizModels";
import {
  BUDGET_QUESTION,
  PRIVACY_QUESTION,
  TASK_QUESTION,
  getOption,
  type BudgetId,
  type PartialQuizAnswers,
  type PrivacyId,
  type QuizAnswers,
  type TaskId,
} from "./quizQuestions";
import { RESULT_TYPES, type ResultType, type ResultTypeId } from "./quizResultTypes";

export interface AlternativeChoice {
  typeId: ResultTypeId;
  reason: string;
}

export interface ResultChoice {
  primary: ResultTypeId;
  alternative: AlternativeChoice | null;
}

export interface QuizResult {
  primary: ResultType;
  alternative: { type: ResultType; reason: string } | null;
  reasons: string[];
  cautions: string[];
  picks: ModelPick[];
  roundups: GuideLink[];
}

export interface RuleMatrixRow {
  budget: BudgetId;
  cells: Record<PrivacyId, ResultTypeId>;
}

/** What each budget leads to when no other rule applies. */
export const BASE_TYPE_BY_BUDGET: Record<BudgetId, ResultTypeId> = {
  free: "free-assistant",
  low: "budget-plan",
  standard: "standard-plan",
  high: "heavy-plan",
  "pay-per-use": "api-pay-per-use",
};

const PRIVACY_FIRST_REASON =
  "Privacy comes first: confidential information narrows the choice before budget does.";
const BULK_PRICING_REASON =
  "Repeated small jobs are priced per task, so pay-per-use leads over a monthly plan.";

/** True once all three questions have an answer. */
export function isComplete(answers: PartialQuizAnswers): answers is QuizAnswers {
  return Boolean(answers.task && answers.budget && answers.privacy);
}

export function countAnswered(answers: PartialQuizAnswers): number {
  return [answers.task, answers.budget, answers.privacy].filter(Boolean).length;
}

/**
 * Rules, in order:
 * 1. Confidential information decides the type before budget does.
 * 2. Bulk work with any budget above free leads with pay-per-use.
 * 3. Otherwise the budget picks the type.
 * A second option is added only where it has a clear reason.
 */
export function chooseResultTypes(answers: QuizAnswers): ResultChoice {
  const { task, budget, privacy } = answers;

  if (privacy === "strict") {
    if (budget === "free" || budget === "low") {
      return { primary: "local-open-weight", alternative: null };
    }
    return {
      primary: "business-plan",
      alternative: {
        typeId: "local-open-weight",
        reason: "Keeps every prompt on your own computer, if you have enough memory and are comfortable installing software.",
      },
    };
  }

  if (task === "bulk" && budget !== "free") {
    const base = BASE_TYPE_BY_BUDGET[budget];
    return {
      primary: "api-pay-per-use",
      alternative:
        base === "api-pay-per-use"
          ? null
          : { typeId: base, reason: "Works for small batches. Large batches may hit the plan's usage limits." },
    };
  }

  const primary = BASE_TYPE_BY_BUDGET[budget];
  return { primary, alternative: pickAlternative(answers) };
}

function pickAlternative(answers: QuizAnswers): AlternativeChoice | null {
  const { task, budget, privacy } = answers;

  if (privacy === "careful" && (budget === "standard" || budget === "high")) {
    return {
      typeId: "business-plan",
      reason: "Worth a look if you handle work or client details, because its data terms are written for organisations.",
    };
  }

  if (task === "coding" && (budget === "free" || budget === "low" || budget === "standard")) {
    return {
      typeId: "api-pay-per-use",
      reason: "Coding sessions can use a lot of tokens. If you keep hitting plan limits, paying per use may suit you better. Compare both with the API cost calculator.",
    };
  }

  return null;
}

/** Up to MAX_PICKS_SHOWN models for the task. Media has none because the directory does not rank it. */
export function selectPicks(task: TaskId, primary: ResultTypeId): ModelPick[] {
  if (task === "media") return [];
  const rules =
    primary === "local-open-weight"
      ? task === "coding"
        ? LOCAL_PICKS_CODING
        : LOCAL_PICKS_DEFAULT
      : TASK_PICKS[task];
  return rules.slice(0, MAX_PICKS_SHOWN).map((rule) => ({ model: QUIZ_MODELS[rule.modelId], role: rule.role }));
}

export function selectRoundups(task: TaskId, primary: ResultTypeId): GuideLink[] {
  return primary === "local-open-weight" ? [...LOCAL_ROUNDUPS] : [...ROUNDUP_BY_TASK[task]];
}

/** Task, budget and privacy reasons. An override replaces the budget reason, which would otherwise contradict the result. */
export function buildReasons(answers: QuizAnswers, primary: ResultTypeId): string[] {
  const budgetReason =
    primary === BASE_TYPE_BY_BUDGET[answers.budget]
      ? getOption(BUDGET_QUESTION, answers.budget).reason
      : answers.privacy === "strict"
        ? PRIVACY_FIRST_REASON
        : BULK_PRICING_REASON;
  return [
    getOption(TASK_QUESTION, answers.task).reason,
    budgetReason,
    getOption(PRIVACY_QUESTION, answers.privacy).reason,
  ];
}

/** Extra warnings that depend on the combination of answers. */
export function buildCautions(answers: QuizAnswers, primary: ResultTypeId): string[] {
  const cautions: string[] = [];
  if (answers.task === "media") {
    cautions.push("Our directory does not rank image, audio or video tools yet. Use the roundups and judge samples by eye.");
  }
  if (answers.task === "documents") {
    cautions.push("Check any answer about a distant page against the file itself.");
  }
  if (primary === "api-pay-per-use" && answers.budget === "pay-per-use") {
    cautions.push("An API is not a chat app. You need a tool, or a little code, that accepts an API key.");
  }
  if (answers.privacy === "careful") {
    cautions.push("Switch off data sharing in settings before you paste anything personal, and check how long chats are kept.");
  }
  if (answers.privacy === "strict") {
    cautions.push("Even with a business plan or a local model, never paste passwords or ID numbers, and follow your employer's and clients' rules.");
    if (answers.budget === "pay-per-use") {
      cautions.push("If you build on an API, read the provider's API data terms. They are separate from its chat-plan terms.");
    }
  }
  return cautions;
}

export function buildQuizResult(answers: QuizAnswers): QuizResult {
  const choice = chooseResultTypes(answers);
  return {
    primary: RESULT_TYPES[choice.primary],
    alternative: choice.alternative
      ? { type: RESULT_TYPES[choice.alternative.typeId], reason: choice.alternative.reason }
      : null,
    reasons: buildReasons(answers, choice.primary),
    cautions: buildCautions(answers, choice.primary),
    picks: selectPicks(answers.task, choice.primary),
    roundups: selectRoundups(answers.task, choice.primary),
  };
}

/** The budget-by-privacy grid for one task, built from the real rules so the page cannot drift from them. */
export function buildRuleMatrix(task: TaskId): RuleMatrixRow[] {
  return BUDGET_QUESTION.options.map((option) => ({
    budget: option.id,
    cells: {
      relaxed: chooseResultTypes({ task, budget: option.id, privacy: "relaxed" }).primary,
      careful: chooseResultTypes({ task, budget: option.id, privacy: "careful" }).primary,
      strict: chooseResultTypes({ task, budget: option.id, privacy: "strict" }).primary,
    },
  }));
}

/** Plain-text summary for the copy button. */
export function buildSummaryText(answers: QuizAnswers, result: QuizResult): string {
  const lines = [
    "Which AI fits me? (AI Tools for Everyday People)",
    `Use: ${getOption(TASK_QUESTION, answers.task).label}`,
    `Budget: ${getOption(BUDGET_QUESTION, answers.budget).label}`,
    `Privacy: ${getOption(PRIVACY_QUESTION, answers.privacy).label}`,
    "",
    `Suggested: ${result.primary.title} (${result.primary.costSummary})`,
  ];
  if (result.alternative) lines.push(`If it is not enough: ${result.alternative.type.title}`);
  if (result.picks.length > 0) {
    lines.push("", "Models to look at:");
    for (const pick of result.picks) lines.push(`- ${pick.model.name} (${pick.model.maker}): ${pick.role}`);
  }
  lines.push("", "Prices and features change. Confirm on the provider's website before buying.");
  return lines.join("\n");
}