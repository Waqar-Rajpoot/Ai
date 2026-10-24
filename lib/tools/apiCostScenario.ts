import { effectiveRate, type ApiPriceRow } from "@/lib/prices/apiCostTable";
import { calculateApiCost, type ApiCostProblem } from "./apiCost";

export interface TaskPreset {
  id: string;
  label: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
}

export interface ApiCostScenarioInput {
  inputTokens: number;
  outputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  tasksPerMonth: number;
  /** Share of input tokens read from a cache, 0 to 100. */
  cachedInputSharePercent: number;
  /** Only read when the cached share is above zero. */
  cachedInputPricePerMillion: number;
  /** Share of tasks run in batch mode, 0 to 100. */
  batchSharePercent: number;
  /** Discount on batch tasks, 0 to 100. */
  batchDiscountPercent: number;
}

export type ScenarioProblem = ApiCostProblem | "bad-percent" | "no-cache-price";

export type ScenarioResult =
  | {
      ok: true;
      inputCost: number;
      outputCost: number;
      costPerTask: number;
      monthlyCost: number;
      yearlyCost: number;
      cacheSavingsPerMonth: number;
      batchSavingsPerMonth: number;
    }
  | { ok: false; reason: ScenarioProblem };

export type SubscriptionVerdict = "api-cheaper" | "subscription-cheaper" | "about-equal";

export interface SubscriptionComparison {
  verdict: SubscriptionVerdict;
  /** Subscription minus API. Positive means the API costs less. */
  monthlyDifference: number;
  /** Tasks per month at which the API costs the same as the subscription. */
  breakEvenTasksPerMonth: number;
}

export interface RankedPrice {
  row: ApiPriceRow;
  costPerTask: number;
  monthlyCost: number;
  timesCheapest: number;
  longPromptApplied: boolean;
}

export const CUSTOM_PRESET_ID = "custom";
export const CUSTOM_MODEL_ID = "custom";
export const DEFAULT_PRESET_ID = "summary";
export const DEFAULT_TASKS_PER_MONTH = "1000";
/** Monthly volumes shown in the "what if volume changes" table, as multiples of the current volume. */
export const SCALE_FACTORS: readonly number[] = [0.5, 1, 2, 5, 10];
/** Costs within this share of each other count as about equal. */
export const SUBSCRIPTION_TIE_PERCENT = 5;

/** Illustrative sizes. Real counts vary, so measure a few of your own tasks. */
export const TASK_PRESETS: readonly TaskPreset[] = [
  { id: "quick-question", label: "Quick question", description: "A short question and a few paragraphs of answer.", inputTokens: 300, outputTokens: 400 },
  { id: "email", label: "Email draft or rewrite", description: "A short email thread in, a polished reply out.", inputTokens: 600, outputTokens: 500 },
  { id: "support-reply", label: "Customer support reply", description: "A customer message plus policy text in, a reply out.", inputTokens: 3000, outputTokens: 400 },
  { id: "summary", label: "Summarize a 10-page document", description: "About 5,000 words in, a one-page summary out.", inputTokens: 7000, outputTokens: 700 },
  { id: "code-review", label: "Review a code file", description: "A source file and instructions in, comments out.", inputTokens: 4000, outputTokens: 1500 },
  { id: "long-report", label: "Analyze a 50-page report", description: "About 25,000 words in, a structured analysis out.", inputTokens: 35000, outputTokens: 2000 },
  { id: "chat-session", label: "A 20-turn chat, history re-sent", description: "The whole conversation: each turn re-sends the earlier messages.", inputTokens: 100000, outputTokens: 8000 },
  { id: "agent-run", label: "Agent task with many steps", description: "An agent that reads files and calls tools over many steps.", inputTokens: 150000, outputTokens: 20000 },
];

export const SCENARIO_PROBLEM_MESSAGES: Record<ScenarioProblem, string> = {
  "not-a-number": "Enter a number in every box.",
  negative: "Numbers cannot be negative.",
  "no-tokens": "Enter at least some input or output tokens.",
  "bad-percent": "Percentages must be between 0 and 100.",
  "no-cache-price": "Enter a cached input price, or set the cached share to 0.",
};

export const SUBSCRIPTION_VERDICT_MESSAGES: Record<SubscriptionVerdict, string> = {
  "api-cheaper": "At this volume, paying per token costs less than the subscription. The subscription may still include features the API does not.",
  "subscription-cheaper": "At this volume, the subscription costs less. The API only pays off at lower volume, or if you need the API for an app or automation.",
  "about-equal": "About equal. Features, limits and privacy terms should decide it, not price.",
};

/**
 * Cost of one task and one month, with optional caching and batch discounts.
 * Builds on calculateApiCost, so the basic checks (numbers, no negatives, some tokens) are shared.
 */
export function calculateApiCostScenario(input: ApiCostScenarioInput): ScenarioResult {
  const base = {
    inputTokens: input.inputTokens,
    outputTokens: input.outputTokens,
    inputPricePerMillion: input.inputPricePerMillion,
    outputPricePerMillion: input.outputPricePerMillion,
    tasksPerMonth: input.tasksPerMonth,
  };

  const list = calculateApiCost(base);
  if (!list.ok) return list;

  const percents = [input.cachedInputSharePercent, input.batchSharePercent, input.batchDiscountPercent];
  if (percents.some((value) => !Number.isFinite(value) || value < 0 || value > 100)) {
    return { ok: false, reason: "bad-percent" };
  }

  const cachedShare = input.cachedInputSharePercent / 100;
  if (cachedShare > 0 && (!Number.isFinite(input.cachedInputPricePerMillion) || input.cachedInputPricePerMillion < 0)) {
    return { ok: false, reason: "no-cache-price" };
  }

  const effectiveInputPrice =
    cachedShare > 0
      ? (1 - cachedShare) * input.inputPricePerMillion + cachedShare * input.cachedInputPricePerMillion
      : input.inputPricePerMillion;

  const cached = calculateApiCost({ ...base, inputPricePerMillion: effectiveInputPrice });
  if (!cached.ok) return cached;

  const batchMultiplier = 1 - (input.batchSharePercent / 100) * (input.batchDiscountPercent / 100);
  const costPerTask = cached.costPerTask * batchMultiplier;
  const monthlyCost = cached.monthlyCost * batchMultiplier;

  return {
    ok: true,
    inputCost: cached.inputCost * batchMultiplier,
    outputCost: cached.outputCost * batchMultiplier,
    costPerTask,
    monthlyCost,
    yearlyCost: monthlyCost * 12,
    cacheSavingsPerMonth: list.monthlyCost - cached.monthlyCost,
    batchSavingsPerMonth: cached.monthlyCost - monthlyCost,
  };
}

/** Whole tasks a monthly budget covers, or null when the budget or cost is not usable. */
export function tasksWithinBudget(budgetDollars: number, costPerTask: number): number | null {
  if (!Number.isFinite(budgetDollars) || budgetDollars <= 0 || !Number.isFinite(costPerTask) || costPerTask <= 0) return null;
  return Math.floor(budgetDollars / costPerTask);
}

/** Monthly cost at several multiples of the current volume. */
export function scaleMonthlyCost(
  monthlyCost: number,
  tasksPerMonth: number,
  factors: readonly number[],
): { factor: number; tasksPerMonth: number; monthlyCost: number }[] {
  return factors.map((factor) => ({ factor, tasksPerMonth: tasksPerMonth * factor, monthlyCost: monthlyCost * factor }));
}

/** Compares the API cost with a subscription price. Returns null when the subscription price is not usable. */
export function compareWithSubscription(
  apiMonthlyCost: number,
  subscriptionMonthlyPrice: number,
  costPerTask: number,
): SubscriptionComparison | null {
  if (!Number.isFinite(subscriptionMonthlyPrice) || subscriptionMonthlyPrice <= 0 || !Number.isFinite(costPerTask) || costPerTask <= 0) {
    return null;
  }

  const monthlyDifference = subscriptionMonthlyPrice - apiMonthlyCost;
  const largerCost = Math.max(apiMonthlyCost, subscriptionMonthlyPrice);
  const differencePercent = (Math.abs(monthlyDifference) / largerCost) * 100;

  let verdict: SubscriptionVerdict = "about-equal";
  if (differencePercent > SUBSCRIPTION_TIE_PERCENT) {
    verdict = monthlyDifference > 0 ? "api-cheaper" : "subscription-cheaper";
  }

  return { verdict, monthlyDifference, breakEvenTasksPerMonth: subscriptionMonthlyPrice / costPerTask };
}

/** Prices the same task on every model at its current list price (no caching or batch), cheapest first. */
export function rankPriceRows(
  rows: readonly ApiPriceRow[],
  inputTokens: number,
  outputTokens: number,
  tasksPerMonth: number,
): RankedPrice[] {
  const priced: Omit<RankedPrice, "timesCheapest">[] = [];

  for (const row of rows) {
    const { rate, longPromptApplied } = effectiveRate(row, "current", inputTokens);
    const result = calculateApiCost({
      inputTokens,
      outputTokens,
      inputPricePerMillion: rate.inputPricePerMillion,
      outputPricePerMillion: rate.outputPricePerMillion,
      tasksPerMonth,
    });
    if (!result.ok) return [];
    priced.push({ row, costPerTask: result.costPerTask, monthlyCost: result.monthlyCost, longPromptApplied });
  }

  priced.sort((first, second) => first.costPerTask - second.costPerTask);
  const cheapest = priced[0]?.costPerTask ?? 0;
  return priced.map((item) => ({ ...item, timesCheapest: cheapest > 0 ? item.costPerTask / cheapest : 1 }));
}