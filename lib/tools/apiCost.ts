import type { ApiModel, RateSet } from "@/lib/prices/apiCostTable";
import { TOKENS_PER_WORD } from "@/lib/prices/apiPricesConstants";

const TOKENS_PER_MILLION = 1_000_000;
const MS_PER_DAY = 86_400_000;
const MIN_BAR_PERCENT = 6;

export interface ApiCostInput {
  inputTokens: number;
  outputTokens: number;
  /** US dollars per one million input tokens. */
  inputPricePerMillion: number;
  /** US dollars per one million output tokens. */
  outputPricePerMillion: number;
  tasksPerMonth: number;
}

export type ApiCostProblem = "not-a-number" | "negative" | "no-tokens";

export type ApiCostResult =
  | { ok: true; inputCost: number; outputCost: number; costPerTask: number; monthlyCost: number }
  | { ok: false; reason: ApiCostProblem };

export interface ApiCostField {
  key: keyof ApiCostInput;
  label: string;
  hint: string;
}

export const API_COST_FIELDS: readonly ApiCostField[] = [
  { key: "inputTokens", label: "Input tokens per task", hint: "Everything you send: instructions, files, chat history." },
  { key: "outputTokens", label: "Output tokens per task", hint: "What the model writes back, including any visible reasoning." },
  { key: "inputPricePerMillion", label: "Input price (US$ per million tokens)", hint: "Copy it from the API price table." },
  { key: "outputPricePerMillion", label: "Output price (US$ per million tokens)", hint: "Copy it from the API price table." },
  { key: "tasksPerMonth", label: "Tasks per month", hint: "How many times you run this task." },
];

/** Example token and task counts so the tool shows a result shape. Prices start blank on purpose. */
export const API_COST_STARTING_VALUES: Record<keyof ApiCostInput, string> = {
  inputTokens: "3000",
  outputTokens: "800",
  inputPricePerMillion: "",
  outputPricePerMillion: "",
  tasksPerMonth: "200",
};

export const API_COST_PROBLEM_MESSAGES: Record<ApiCostProblem, string> = {
  "not-a-number": "Enter a number in every box.",
  negative: "Numbers cannot be negative.",
  "no-tokens": "Enter at least some input or output tokens.",
};

/** Works out the cost of one task and of a month of tasks. Validates every field. */
export function calculateApiCost(input: ApiCostInput): ApiCostResult {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value))) return { ok: false, reason: "not-a-number" };
  if (values.some((value) => value < 0)) return { ok: false, reason: "negative" };
  if (input.inputTokens + input.outputTokens === 0) return { ok: false, reason: "no-tokens" };

  const inputCost = (input.inputTokens / TOKENS_PER_MILLION) * input.inputPricePerMillion;
  const outputCost = (input.outputTokens / TOKENS_PER_MILLION) * input.outputPricePerMillion;
  const costPerTask = inputCost + outputCost;

  return { ok: true, inputCost, outputCost, costPerTask, monthlyCost: costPerTask * input.tasksPerMonth };
}

/** Formats US dollars, keeping up to four decimals so tiny per-task costs stay visible. */
export function formatDollars(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export interface TaskUsage {
  inputTokens: number;
  outputTokens: number;
  cachedSharePercent: number;
  useBatch: boolean;
  outputMultiplier: number;
  useHigherRate: boolean;
}

export interface CostBreakdown {
  totalUsd: number;
  inputUsd: number;
  outputUsd: number;
  appliedRates: RateSet;
  usedLongPromptRate: boolean;
  usedAlternateRate: boolean;
  /** True when batch was requested and this model offers it. */
  batchApplied: boolean;
  /** True when the input is larger than the model's context window. */
  exceedsContext: boolean;
}

export interface RankedModel {
  model: ApiModel;
  cost: CostBreakdown;
  monthlyUsd: number;
}

/** Builds a usage object with sensible defaults. */
export function createUsage(
  inputTokens: number,
  outputTokens: number,
  options: Partial<Omit<TaskUsage, "inputTokens" | "outputTokens">> = {},
): TaskUsage {
  return {
    inputTokens,
    outputTokens,
    cachedSharePercent: options.cachedSharePercent ?? 0,
    useBatch: options.useBatch ?? false,
    outputMultiplier: options.outputMultiplier ?? 1,
    useHigherRate: options.useHigherRate ?? false,
  };
}

function isOverThreshold(inputTokens: number, threshold: number, isInclusive: boolean): boolean {
  return isInclusive ? inputTokens >= threshold : inputTokens > threshold;
}

export function calculateTaskCost(model: ApiModel, usage: TaskUsage): CostBreakdown {
  let appliedRates = model.rates;
  let usedAlternateRate = false;
  let usedLongPromptRate = false;

  if (usage.useHigherRate && model.alternateRate) {
    appliedRates = model.alternateRate.rates;
    usedAlternateRate = true;
  }
  if (model.longPrompt && isOverThreshold(usage.inputTokens, model.longPrompt.thresholdTokens, model.longPrompt.isInclusive)) {
    appliedRates = model.longPrompt.rates;
    usedLongPromptRate = true;
  }

  const cachedShare = Math.min(100, Math.max(0, usage.cachedSharePercent)) / 100;
  const cachedTokens = usage.inputTokens * cachedShare;
  const freshTokens = usage.inputTokens - cachedTokens;
  const billedOutputTokens = usage.outputTokens * usage.outputMultiplier;

  const discount = usage.useBatch ? model.batchDiscount : null;
  const keepShare = discount === null ? 1 : 1 - discount;

  const inputUsd =
    ((freshTokens * appliedRates.inputPer1M + cachedTokens * appliedRates.cachedInputPer1M) / TOKENS_PER_MILLION) * keepShare;
  const outputUsd = ((billedOutputTokens * appliedRates.outputPer1M) / TOKENS_PER_MILLION) * keepShare;

  return {
    totalUsd: inputUsd + outputUsd,
    inputUsd,
    outputUsd,
    appliedRates,
    usedLongPromptRate,
    usedAlternateRate,
    batchApplied: discount !== null,
    exceedsContext: usage.inputTokens > model.contextTokens,
  };
}

export function rankModelsByCost(
  models: readonly ApiModel[],
  usage: TaskUsage,
  tasksPerMonth: number,
): RankedModel[] {
  return models
    .map((model) => {
      const cost = calculateTaskCost(model, usage);
      return { model, cost, monthlyUsd: cost.totalUsd * tasksPerMonth };
    })
    .sort((a, b) => {
      if (a.cost.exceedsContext !== b.cost.exceedsContext) return a.cost.exceedsContext ? 1 : -1;
      return a.cost.totalUsd - b.cost.totalUsd || a.model.name.localeCompare(b.model.name);
    });
}


export function logBarPercent(value: number, min: number, max: number): number {
  if (value <= 0 || min <= 0 || max <= min) return value > 0 ? 100 : MIN_BAR_PERCENT;
  const position = (Math.log10(value) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
  return MIN_BAR_PERCENT + position * (100 - MIN_BAR_PERCENT);
}

/** Reads a whole number from text, clamped to a range. Falls back when the text is empty. */
export function parseWholeNumber(text: string, min: number, max: number, fallback: number): number {
  const parsed = Number.parseInt(text.replace(/[^0-9]/g, ""), 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

/** Rough token count for a number of English words. */
export function tokensFromWords(wordCount: number): number {
  return Math.round(wordCount * TOKENS_PER_WORD);
}

/** Whole days from now until the end of an ISO date (UTC). Negative once it has passed. */
export function daysUntil(isoDate: string, now: Date): number {
  const endOfDay = Date.parse(`${isoDate}T23:59:59Z`);
  return Math.ceil((endOfDay - now.getTime()) / MS_PER_DAY);
}