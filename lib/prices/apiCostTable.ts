import { formatTokens } from "./formatPrice";

export { API_PRICES_CHECKED_ON } from "./apiPricesConstants";

export type VerificationLevel = "provider" | "secondary";

export type PricePeriod = "current" | "later" | "peak";
export type ModelAccess = "closed" | "open-weight";
export type ModelTier = "flagship" | "workhorse" | "budget";
export type TierFilter = "all" | ModelTier;
export type SortKey = "input" | "output" | "context" | "name";

export interface ApiRate {
  /** US dollars per one million input tokens. */
  inputPricePerMillion: number;
  /** US dollars per one million output tokens. */
  outputPricePerMillion: number;
  /** US dollars per one million cached input tokens, when the provider publishes it. */
  cachedInputPricePerMillion?: number;
}

export interface ApiPriceVariant {
  label: string;
  rate: ApiRate;
  
  rateEndsOn?: string | null;
}

/** Some providers bill the whole request at a higher rate once the prompt is long enough. */
export interface LongPromptRule {
  /** The first input-token count at which the higher rate applies. */
  fromInputTokens: number;
  rate: ApiRate;
  note: string;
}

export interface ApiPriceRow {
  /** Matches the review slug under /compare/reviews. */
  id: string;
  model: string;
  maker: string;
  access: ModelAccess;
  tier: ModelTier;
  bestFor: string;
  /** Context window in tokens. */
  contextTokens: number;
  /** Display form of the context window, for example "1.05M". Filled in from contextTokens. */
  contextWindow: string;
  rate: ApiRate;
  /** A different price that starts later, such as when an introductory price ends. */
  laterRate?: ApiPriceVariant;
  /** A different price at busy times. */
  peakRate?: ApiPriceVariant;
  longPrompt?: LongPromptRule;
  /** Share taken off by the batch option (0.5 = half price). Null when not offered or not confirmed. */
  batchDiscount: number | null;
  /** Plain-text notes with no prices in them. Prices in notes are built from the rates above. */
  notes: readonly string[];
  verification: VerificationLevel;
  sourceName: string;
  sourceHref: string;
}

type ApiPriceRowInput = Omit<ApiPriceRow, "contextWindow">;

/** Fills in the display context window so it can never disagree with contextTokens. */
function defineRow(input: ApiPriceRowInput): ApiPriceRow {
  return { ...input, contextWindow: formatTokens(input.contextTokens) };
}

const ANTHROPIC = { sourceName: "Anthropic pricing", sourceHref: "https://platform.claude.com/docs/en/about-claude/pricing" } as const;
const OPENAI = { sourceName: "OpenAI API pricing", sourceHref: "https://developers.openai.com/api/docs/pricing" } as const;
const GOOGLE = { sourceName: "Google Cloud pricing", sourceHref: "https://cloud.google.com/vertex-ai/generative-ai/pricing" } as const;
const XAI = { sourceName: "xAI models and pricing", sourceHref: "https://docs.x.ai/docs/models" } as const;
const XIAOMI = { sourceName: "Xiaomi MiMo", sourceHref: "https://mimo.mi.com" } as const;
const MOONSHOT = { sourceName: "Moonshot AI pricing", sourceHref: "https://platform.kimi.com/docs/pricing/chat" } as const;
const ALIBABA = { sourceName: "Alibaba Cloud Model Studio pricing", sourceHref: "https://www.alibabacloud.com/help/en/model-studio/pricing" } as const;
const DEEPSEEK = { sourceName: "DeepSeek API pricing", sourceHref: "https://api-docs.deepseek.com/quick_start/pricing" } as const;

const ROW_INPUTS: readonly ApiPriceRowInput[] = [
  {
    id: "claude-opus-5-5", model: "Claude Opus 5.5", maker: "Anthropic", access: "closed", tier: "flagship", bestFor: "All-round flagship",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 4, outputPricePerMillion: 20, cachedInputPricePerMillion: 0.2 },
    batchDiscount: 0.5,
    notes: [
      "Thinking tokens are billed as output.",
      "Fast mode costs twice the standard rate.",
      "Writing a prompt to the cache costs more than reading it back. Cache-write charges are not in our estimates.",
    ],
    verification: "secondary", ...ANTHROPIC,
  },
  {
    id: "gpt-6-1-sol", model: "GPT-6.1 Sol", maker: "OpenAI", access: "closed", tier: "workhorse", bestFor: "Best value near the frontier",
    contextTokens: 1_050_000,
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 10, cachedInputPricePerMillion: 0.1 },
    batchDiscount: 0.5,
    notes: [
      "Higher long-prompt rates may apply above 272K input tokens. Check the provider page for this model's rate.",
      "OpenAI describes it as near Astra's capability at about one-fifth of Astra's price.",
      "Fast mode costs twice the standard rate.",
    ],
    verification: "provider", ...OPENAI,
  },
  {
    id: "gpt-6-astra", model: "GPT-6 Astra", maker: "OpenAI", access: "closed", tier: "flagship", bestFor: "Maths, science, research",
    contextTokens: 1_050_000,
    rate: { inputPricePerMillion: 10, outputPricePerMillion: 50, cachedInputPricePerMillion: 1 },
    longPrompt: { fromInputTokens: 272_001, rate: { inputPricePerMillion: 20, outputPricePerMillion: 75, cachedInputPricePerMillion: 2 }, note: "Whole request billed at a higher rate once the prompt passes 272K input tokens" },
    batchDiscount: 0.5,
    notes: ["Fast mode costs twice the standard rate.", "Batch and long-prompt rules come from price trackers, not OpenAI's launch post."],
    verification: "provider", ...OPENAI,
  },
  {
    id: "claude-fable-5-1", model: "Claude Fable 5.1", maker: "Anthropic", access: "closed", tier: "flagship", bestFor: "Hardest agentic coding",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 10, outputPricePerMillion: 50, cachedInputPricePerMillion: 0.25 },
    batchDiscount: 0.5,
    notes: ["Thinking tokens are billed as output."],
    verification: "secondary", ...ANTHROPIC,
  },
  {
    id: "claude-sonnet-5-5", model: "Claude Sonnet 5.5", maker: "Anthropic", access: "closed", tier: "workhorse", bestFor: "Everyday coding and knowledge work",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 10, cachedInputPricePerMillion: 0.1 },
    batchDiscount: 0.5,
    notes: [
      "Thinking tokens are billed as output.",
      "No surcharge for long prompts.",
      "Cache reads were halved on October 7, 2026, so older articles may show the earlier rate.",
    ],
    verification: "secondary", ...ANTHROPIC,
  },
  {
    id: "gemini-4-argon", model: "Gemini 4 Argon", maker: "Google", access: "closed", tier: "flagship", bestFor: "Complex reasoning",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 10, cachedInputPricePerMillion: 0.1 },
    laterRate: {
      label: "Standard price from December 1, 2026 (the introductory price ends November 30)",
      rate: { inputPricePerMillion: 4, outputPricePerMillion: 20, cachedInputPricePerMillion: 0.2 },
      rateEndsOn: "2026-11-30",
    },
    batchDiscount: 0.5,
    notes: [
      "Reasoning tokens are billed as output.",
      "Independent testing reports it writes far more output tokens per task than some rivals, so compare cost per task, not only price per token.",
      "The batch discount comes from a third-party table. Confirm it.",
    ],
    verification: "secondary", ...GOOGLE,
  },
  {
    id: "gemini-3-8-flash", model: "Gemini 3.8 Flash", maker: "Google", access: "closed", tier: "budget", bestFor: "Fast, cheap multimodal",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 0.75, outputPricePerMillion: 3.75, cachedInputPricePerMillion: 0.075 },
    laterRate: {
      label: "Standard price from January 1, 2027 (the introductory price ends December 31)",
      rate: { inputPricePerMillion: 1.5, outputPricePerMillion: 7.5, cachedInputPricePerMillion: 0.15 },
      rateEndsOn: "2026-12-31",
    },
    batchDiscount: 0.5,
    notes: ["Only one tracker lists the later price. Treat it as a planning figure and confirm with Google."],
    verification: "secondary", ...GOOGLE,
  },
  {
    id: "claude-haiku-5-5", model: "Claude Haiku 5.5", maker: "Anthropic", access: "closed", tier: "budget", bestFor: "High-volume, low-cost work",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 0.1, outputPricePerMillion: 0.5, cachedInputPricePerMillion: 0.01 },
    longPrompt: { fromInputTokens: 100_001, rate: { inputPricePerMillion: 0.5, outputPricePerMillion: 2.5, cachedInputPricePerMillion: 0.05 }, note: "Whole request billed at five times the rate once the prompt passes 100K input tokens" },
    batchDiscount: 0.5,
    notes: [
      "Anthropic lists this as a 'from' price: the lower rate applies to prompts of up to 100K tokens.",
      "Haiku 5.5 uses an updated tokenizer, so it can use slightly more tokens per task than older models.",
    ],
    verification: "secondary", ...ANTHROPIC,
  },
  {
    id: "gpt-6-luna", model: "GPT-6 Luna", maker: "OpenAI", access: "closed", tier: "budget", bestFor: "Cheapest bulk work",
    contextTokens: 1_050_000,
    rate: { inputPricePerMillion: 0.1, outputPricePerMillion: 0.5, cachedInputPricePerMillion: 0.01 },
    longPrompt: { fromInputTokens: 272_001, rate: { inputPricePerMillion: 0.2, outputPricePerMillion: 0.75, cachedInputPricePerMillion: 0.02 }, note: "Whole request billed at a higher rate once the prompt passes 272K input tokens" },
    batchDiscount: 0.5,
    notes: ["Built for classification, extraction and other focused, high-volume jobs."],
    verification: "provider", ...OPENAI,
  },
  {
    id: "grok-4-7", model: "Grok 4.7", maker: "xAI", access: "closed", tier: "workhorse", bestFor: "Low output price; live web",
    contextTokens: 500_000,
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 6, cachedInputPricePerMillion: 0.5 },
    longPrompt: { fromInputTokens: 200_000, rate: { inputPricePerMillion: 4, outputPricePerMillion: 12, cachedInputPricePerMillion: 1 }, note: "Whole request billed at a higher rate once the prompt reaches 200K input tokens" },
    batchDiscount: null,
    notes: [
      "No batch discount.",
      "Reasoning tokens are billed at the output rate.",
      "Built-in tools such as web and X search are billed per call on top of tokens.",
    ],
    verification: "secondary", ...XAI,
  },
  {
    id: "mimo-v2-6-pro", model: "MiMo-V2.6-Pro", maker: "Xiaomi", access: "open-weight", tier: "budget", bestFor: "Top open-weight value",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 0.435, outputPricePerMillion: 0.87, cachedInputPricePerMillion: 0.0036 },
    batchDiscount: 0.5,
    notes: [
      "Open weights (MIT licence). Batch work is billed at half price.",
      "Thinking is on by default, which adds output tokens.",
      "A faster UltraSpeed mode costs ten times the standard rate.",
      "Prices shown are the international rate card.",
    ],
    verification: "secondary", ...XIAOMI,
  },
  {
    id: "kimi-k3", model: "Kimi K3", maker: "Moonshot AI", access: "open-weight", tier: "workhorse", bestFor: "Coding and agents",
    contextTokens: 1_048_576,
    rate: { inputPricePerMillion: 3, outputPricePerMillion: 15, cachedInputPricePerMillion: 0.3 },
    batchDiscount: null,
    notes: [
      "Open weights (custom licence).",
      "Reasoning is always on and is billed as output, so cost per task can run higher than the price per token suggests.",
      "One flat price across the whole context window.",
      "Prices exclude taxes, which are added at checkout.",
    ],
    verification: "secondary", ...MOONSHOT,
  },
  {
    id: "qwen3-8-max-27b", model: "Qwen3.8 Max", maker: "Alibaba", access: "open-weight", tier: "workhorse", bestFor: "Agentic work, long context",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 6, cachedInputPricePerMillion: 0.25 },
    batchDiscount: null,
    notes: [
      "This row prices Max. The Qwen3.8-27B open weights are free to self-host and have a 262K context window.",
      "Prices differ by region. The international (Singapore) rate card is shown.",
      "It can spend a large reasoning budget on one task, so compare cost per finished task.",
    ],
    verification: "secondary", ...ALIBABA,
  },
  {
    id: "deepseek-v4-1-flash", model: "DeepSeek V4.1 Flash", maker: "DeepSeek", access: "open-weight", tier: "budget", bestFor: "Cheapest capable API",
    contextTokens: 1_000_000,
    rate: { inputPricePerMillion: 0.15, outputPricePerMillion: 0.6, cachedInputPricePerMillion: 0.003 },
    peakRate: {
      label: "Peak-hour price (Beijing time, Monday to Friday, 09:00 to 12:00 and 14:00 to 18:00)",
      rate: { inputPricePerMillion: 0.3, outputPricePerMillion: 1.2, cachedInputPricePerMillion: 0.006 },
    },
    batchDiscount: null,
    notes: [
      "The price shown is the off-peak price.",
      "Requests to the older V4 Pro name are now routed to this model at Flash prices.",
    ],
    verification: "secondary", ...DEEPSEEK,
  },
];

/** One row per model in the Blueprint's directory, in directory order. */
export const API_PRICE_ROWS: readonly ApiPriceRow[] = ROW_INPUTS.map(defineRow);

/** Formats a price per million tokens, keeping tiny prices visible, for example "$0.0036". */
export function formatPricePerMillion(price: number): string {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
}

/** Formats a rate as "$2.00 in / $10.00 out". */
export function formatRate(rate: ApiRate): string {
  return `${formatPricePerMillion(rate.inputPricePerMillion)} in / ${formatPricePerMillion(rate.outputPricePerMillion)} out`;
}

export function findPriceRow(id: string): ApiPriceRow | undefined {
  return API_PRICE_ROWS.find((row) => row.id === id);
}

/** The price periods a row offers. Every row has "current". */
export function availablePeriods(row: ApiPriceRow): readonly PricePeriod[] {
  const periods: PricePeriod[] = ["current"];
  if (row.laterRate) periods.push("later");
  if (row.peakRate) periods.push("peak");
  return periods;
}

export function periodLabel(row: ApiPriceRow, period: PricePeriod): string {
  if (period === "later" && row.laterRate) return row.laterRate.label;
  if (period === "peak" && row.peakRate) return row.peakRate.label;
  return "Current price";
}

/** The rate that applies for a period and a prompt size. Long-prompt rules only apply to the current price. */
export function effectiveRate(row: ApiPriceRow, period: PricePeriod, inputTokens: number): { rate: ApiRate; longPromptApplied: boolean } {
  if (period === "later" && row.laterRate) return { rate: row.laterRate.rate, longPromptApplied: false };
  if (period === "peak" && row.peakRate) return { rate: row.peakRate.rate, longPromptApplied: false };
  if (row.longPrompt && inputTokens >= row.longPrompt.fromInputTokens) return { rate: row.longPrompt.rate, longPromptApplied: true };
  return { rate: row.rate, longPromptApplied: false };
}

/** Notes for the table: prices come from the rate data above, so the two never disagree. */
export function buildPriceNotes(row: ApiPriceRow): string[] {
  const notes: string[] = [];
  if (row.rate.cachedInputPricePerMillion !== undefined) notes.push(`Cached input: ${formatPricePerMillion(row.rate.cachedInputPricePerMillion)}`);
  if (row.laterRate) notes.push(`${row.laterRate.label}: ${formatRate(row.laterRate.rate)}`);
  if (row.peakRate) notes.push(`${row.peakRate.label}: ${formatRate(row.peakRate.rate)}`);
  if (row.longPrompt) notes.push(`${row.longPrompt.note}: ${formatRate(row.longPrompt.rate)}`);
  notes.push(...row.notes);
  return notes;
}

/** Distinct provider pages behind the table, for a sources list. */
export function uniquePriceSources(rows: readonly ApiPriceRow[]): { name: string; href: string }[] {
  const seen = new Set<string>();
  const sources: { name: string; href: string }[] = [];
  for (const row of rows) {
    if (seen.has(row.sourceHref)) continue;
    seen.add(row.sourceHref);
    sources.push({ name: row.sourceName, href: row.sourceHref });
  }
  return sources;
}

/**
 * Sanity-checks the price data and returns a list of problems (empty when clean).
 * Meant for a unit test, so a typo in a price fails the build instead of reaching readers.
 */
export function validatePriceRows(rows: readonly ApiPriceRow[]): string[] {
  const problems: string[] = [];
  const seenIds = new Set<string>();

  for (const row of rows) {
    if (seenIds.has(row.id)) problems.push(`Duplicate id "${row.id}"`);
    seenIds.add(row.id);

    const rates: [string, ApiRate][] = [["current", row.rate]];
    if (row.laterRate) rates.push(["later", row.laterRate.rate]);
    if (row.peakRate) rates.push(["peak", row.peakRate.rate]);
    if (row.longPrompt) rates.push(["long-prompt", row.longPrompt.rate]);

    for (const [name, rate] of rates) {
      if (rate.inputPricePerMillion <= 0 || rate.outputPricePerMillion <= 0) {
        problems.push(`${row.id}: the ${name} price must be above zero`);
      }
      if (rate.cachedInputPricePerMillion !== undefined && rate.cachedInputPricePerMillion > rate.inputPricePerMillion) {
        problems.push(`${row.id}: the ${name} cached price is above the input price`);
      }
    }
    if (row.batchDiscount !== null && (row.batchDiscount <= 0 || row.batchDiscount >= 1)) {
      problems.push(`${row.id}: batchDiscount must be between 0 and 1`);
    }
    if (row.laterRate) {
      if (!row.laterRate.rateEndsOn) problems.push(`${row.id}: a later price needs rateEndsOn`);
      if (row.laterRate.rate.inputPricePerMillion < row.rate.inputPricePerMillion) {
        problems.push(`${row.id}: the later price is below the current price`);
      }
    }
  }
  return problems;
}

/* ------------------------------------------------------------------------------------------
 * Model view used by the cost table, the estimator and the cost logic in lib/tools/apiCost.ts.
 * It is derived from API_PRICE_ROWS above, so there is only one set of numbers to keep right.
 * ---------------------------------------------------------------------------------------- */

/** Dollar prices per one million tokens. Cached falls back to the input price when no cache price is listed. */
export interface RateSet {
  inputPer1M: number;
  cachedInputPer1M: number;
  outputPer1M: number;
}

/** A higher price that applies to the whole request once the input is large enough. */
export interface ModelLongPromptRule {
  thresholdTokens: number;
  /** True when a prompt at exactly the threshold already pays the higher rate. */
  isInclusive: boolean;
  rates: RateSet;
  description: string;
}

/** A second price a reader should budget for: after an intro rate ends, or at peak hours. */
export interface AlternateRate {
  kind: "after-intro" | "peak-hours";
  label: string;
  /** Last day of the cheaper rate (ISO date). Null for recurring peak windows. */
  endsOn: string | null;
  rates: RateSet;
}

export interface ApiModel {
  id: string;
  name: string;
  maker: string;
  tier: ModelTier;
  bestFor: string;
  /** The rate in force today. */
  rates: RateSet;
  contextTokens: number;
  batchDiscount: number | null;
  longPrompt: ModelLongPromptRule | null;
  alternateRate: AlternateRate | null;
  notes: readonly string[];
  verification: VerificationLevel;
  providerPageUrl: string | null;
}

export const TIER_LABELS: Record<ModelTier, string> = {
  flagship: "Flagship",
  workhorse: "Workhorse",
  budget: "Budget",
};

function toRateSet(rate: ApiRate): RateSet {
  return {
    inputPer1M: rate.inputPricePerMillion,
    cachedInputPer1M: rate.cachedInputPricePerMillion ?? rate.inputPricePerMillion,
    outputPer1M: rate.outputPricePerMillion,
  };
}

/** A row can have both a later and a peak price. The model view carries one: the later price wins. */
function toAlternateRate(row: ApiPriceRow): AlternateRate | null {
  if (row.laterRate) {
    return { kind: "after-intro", label: row.laterRate.label, endsOn: row.laterRate.rateEndsOn ?? null, rates: toRateSet(row.laterRate.rate) };
  }
  if (row.peakRate) {
    return { kind: "peak-hours", label: row.peakRate.label, endsOn: null, rates: toRateSet(row.peakRate.rate) };
  }
  return null;
}

function toApiModel(row: ApiPriceRow): ApiModel {
  return {
    id: row.id,
    name: row.model,
    maker: row.maker,
    tier: row.tier,
    bestFor: row.bestFor,
    rates: toRateSet(row.rate),
    contextTokens: row.contextTokens,
    batchDiscount: row.batchDiscount,
    longPrompt: row.longPrompt
      ? {
          thresholdTokens: row.longPrompt.fromInputTokens,
          isInclusive: true,
          rates: toRateSet(row.longPrompt.rate),
          description: row.longPrompt.note,
        }
      : null,
    alternateRate: toAlternateRate(row),
    notes: row.notes,
    verification: row.verification,
    providerPageUrl: row.sourceHref,
  };
}

export const API_MODELS: readonly ApiModel[] = API_PRICE_ROWS.map(toApiModel);

/** Finds one model by its id, or undefined. */
export function findModelById(modelId: string): ApiModel | undefined {
  return API_MODELS.find((model) => model.id === modelId);
}

/** Batch prices per million tokens, or null when no batch discount is listed. */
export function getBatchRates(model: ApiModel): { inputPer1M: number; outputPer1M: number } | null {
  if (model.batchDiscount === null) return null;
  const keep = 1 - model.batchDiscount;
  return { inputPer1M: model.rates.inputPer1M * keep, outputPer1M: model.rates.outputPer1M * keep };
}

/** Filters by tier and sorts. Ties are broken by name so the order is stable. */
export function filterAndSortModels(
  models: readonly ApiModel[],
  tier: TierFilter,
  sortKey: SortKey,
): ApiModel[] {
  const compareBy: Record<SortKey, (a: ApiModel, b: ApiModel) => number> = {
    input: (a, b) => a.rates.inputPer1M - b.rates.inputPer1M,
    output: (a, b) => a.rates.outputPer1M - b.rates.outputPer1M,
    context: (a, b) => b.contextTokens - a.contextTokens,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  const visible = tier === "all" ? [...models] : models.filter((model) => model.tier === tier);
  return visible.sort((a, b) => compareBy[sortKey](a, b) || a.name.localeCompare(b.name));
}