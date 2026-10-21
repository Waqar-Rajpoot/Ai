export type ModelTier = "flagship" | "workhorse" | "budget";
export type TierFilter = "all" | ModelTier;
export type SortKey = "input" | "output" | "context" | "name";

/** "provider" means the base price is on the provider's own announcement. "secondary" means cross-checked on price trackers. */
export type VerificationLevel = "provider" | "secondary";

/** Dollar prices per one million tokens. */
export interface RateSet {
  inputPer1M: number;
  cachedInputPer1M: number;
  outputPer1M: number;
}

/** A higher price that applies to the whole request once the input is large enough. */
export interface LongPromptRule {
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
  /** Share taken off by the batch option (0.5 = half price). Null when not offered or not confirmed. */
  batchDiscount: number | null;
  longPrompt: LongPromptRule | null;
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

export const API_MODELS: readonly ApiModel[] = [
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1",
    maker: "Anthropic",
    tier: "flagship",
    bestFor: "Hardest agentic coding",
    rates: { inputPer1M: 10, cachedInputPer1M: 0.25, outputPer1M: 50 },
    contextTokens: 1_000_000,
    batchDiscount: null,
    longPrompt: null,
    alternateRate: null,
    notes: ["Thinking tokens are billed as output.", "A batch discount for this model was not confirmed."],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    maker: "Anthropic",
    tier: "flagship",
    bestFor: "All-round flagship",
    rates: { inputPer1M: 4, cachedInputPer1M: 0.2, outputPer1M: 20 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: null,
    alternateRate: null,
    notes: [
      "Thinking tokens are billed as output.",
      "Fast mode costs twice the standard rate ($8 in / $40 out).",
      "Storing a prompt in the cache costs more than normal input ($5 for a 5-minute write).",
    ],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    maker: "Anthropic",
    tier: "workhorse",
    bestFor: "Everyday coding and knowledge work",
    rates: { inputPer1M: 2, cachedInputPer1M: 0.1, outputPer1M: 10 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: null,
    alternateRate: null,
    notes: ["Thinking tokens are billed as output.", "No surcharge for long prompts."],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    maker: "Anthropic",
    tier: "budget",
    bestFor: "High-volume, low-cost work",
    rates: { inputPer1M: 0.1, cachedInputPer1M: 0.01, outputPer1M: 0.5 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: {
      thresholdTokens: 100_000,
      isInclusive: false,
      rates: { inputPer1M: 0.5, cachedInputPer1M: 0.05, outputPer1M: 2.5 },
      description: "Prompts over 100K tokens bill the whole request at five times the normal rates.",
    },
    alternateRate: null,
    notes: ["Watch the 100K-token price step: it applies to the entire request, not just the extra tokens."],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    maker: "OpenAI",
    tier: "flagship",
    bestFor: "Maths, science, research",
    rates: { inputPer1M: 10, cachedInputPer1M: 1, outputPer1M: 50 },
    contextTokens: 1_050_000,
    batchDiscount: 0.5,
    longPrompt: {
      thresholdTokens: 272_000,
      isInclusive: false,
      rates: { inputPer1M: 20, cachedInputPer1M: 2, outputPer1M: 75 },
      description: "Prompts over 272K input tokens bill the whole request at 2× input and 1.5× output.",
    },
    alternateRate: null,
    notes: ["Fast mode costs twice the standard rate.", "Batch and long-prompt rules come from price trackers, not the launch post."],
    verification: "provider",
    providerPageUrl: "https://openai.com/index/introducing-gpt-6-1-sol/",
  },
  {
    id: "gpt-6-1-sol",
    name: "GPT-6.1 Sol",
    maker: "OpenAI",
    tier: "workhorse",
    bestFor: "Best value near the frontier",
    rates: { inputPer1M: 2, cachedInputPer1M: 0.1, outputPer1M: 10 },
    contextTokens: 1_050_000,
    batchDiscount: 0.5,
    longPrompt: {
      thresholdTokens: 272_000,
      isInclusive: false,
      rates: { inputPer1M: 4, cachedInputPer1M: 0.2, outputPer1M: 15 },
      description: "Prompts over 272K input tokens bill the whole request at 2× input and 1.5× output.",
    },
    alternateRate: null,
    notes: ["OpenAI describes it as near Astra's capability at one-fifth of Astra's price.", "Fast mode costs twice the standard rate."],
    verification: "provider",
    providerPageUrl: "https://openai.com/index/introducing-gpt-6-1-sol/",
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    maker: "OpenAI",
    tier: "budget",
    bestFor: "Cheapest bulk work",
    rates: { inputPer1M: 0.1, cachedInputPer1M: 0.01, outputPer1M: 0.5 },
    contextTokens: 1_050_000,
    batchDiscount: 0.5,
    longPrompt: {
      thresholdTokens: 272_000,
      isInclusive: false,
      rates: { inputPer1M: 0.2, cachedInputPer1M: 0.02, outputPer1M: 0.75 },
      description: "Prompts over 272K input tokens bill the whole request at 2× input and 1.5× output.",
    },
    alternateRate: null,
    notes: ["Built for classification, extraction and other focused, high-volume jobs."],
    verification: "provider",
    providerPageUrl: "https://openai.com/index/introducing-gpt-6-1-sol/",
  },
  {
    id: "gemini-4-argon",
    name: "Gemini 4 Argon",
    maker: "Google",
    tier: "flagship",
    bestFor: "Complex reasoning",
    rates: { inputPer1M: 2, cachedInputPer1M: 0.1, outputPer1M: 10 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: null,
    alternateRate: {
      kind: "after-intro",
      label: "From Dec 1, 2026",
      endsOn: "2026-11-30",
      rates: { inputPer1M: 4, cachedInputPer1M: 0.2, outputPer1M: 20 },
    },
    notes: [
      "The introductory rate doubles on December 1, 2026.",
      "Independent testing reports it writes far more output tokens per task than some rivals, so check cost per task, not only price per token.",
      "The batch discount is inferred from a third-party table. Confirm it.",
    ],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    maker: "Google",
    tier: "budget",
    bestFor: "Fast, cheap multimodal",
    rates: { inputPer1M: 0.75, cachedInputPer1M: 0.075, outputPer1M: 3.75 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: null,
    alternateRate: {
      kind: "after-intro",
      label: "From Jan 1, 2027 (one tracker)",
      endsOn: "2026-12-31",
      rates: { inputPer1M: 1.5, cachedInputPer1M: 0.15, outputPer1M: 7.5 },
    },
    notes: [
      "Introductory rate runs through December 31, 2026.",
      "Only one tracker lists the later price, so treat it as a planning figure and confirm with Google.",
    ],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "grok-4-7",
    name: "Grok 4.7",
    maker: "xAI",
    tier: "workhorse",
    bestFor: "Low output price; live web",
    rates: { inputPer1M: 2, cachedInputPer1M: 0.5, outputPer1M: 6 },
    contextTokens: 500_000,
    batchDiscount: null,
    longPrompt: {
      thresholdTokens: 200_000,
      isInclusive: true,
      rates: { inputPer1M: 4, cachedInputPer1M: 1, outputPer1M: 12 },
      description: "Prompts that reach 200K input tokens bill the whole request at double the normal rates.",
    },
    alternateRate: null,
    notes: [
      "No batch discount.",
      "Reasoning tokens bill at the output rate.",
      "Built-in tools such as web and X search are billed per call on top of tokens.",
    ],
    verification: "secondary",
    providerPageUrl: "https://docs.x.ai/docs/models",
  },
  {
    id: "mimo-v2-6-pro",
    name: "MiMo-V2.6-Pro",
    maker: "Xiaomi",
    tier: "budget",
    bestFor: "Top open-weight value",
    rates: { inputPer1M: 0.435, cachedInputPer1M: 0.0036, outputPer1M: 0.87 },
    contextTokens: 1_000_000,
    batchDiscount: 0.5,
    longPrompt: null,
    alternateRate: null,
    notes: [
      "Thinking is on by default, which adds output tokens.",
      "A faster UltraSpeed mode costs ten times as much ($4.35 in / $8.70 out).",
      "Prices shown are the international rate card.",
    ],
    verification: "secondary",
    providerPageUrl: null,
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    maker: "Moonshot AI",
    tier: "workhorse",
    bestFor: "Coding and agents",
    rates: { inputPer1M: 3, cachedInputPer1M: 0.3, outputPer1M: 15 },
    contextTokens: 1_048_576,
    batchDiscount: null,
    longPrompt: null,
    alternateRate: null,
    notes: [
      "Thinking is always on and billed as output, so per-task cost can run higher than the per-token price suggests.",
      "One flat price across the whole context window.",
      "Prices exclude taxes, which are added at checkout.",
    ],
    verification: "secondary",
    providerPageUrl: "https://platform.kimi.com/docs/pricing/chat",
  },
  {
    id: "qwen3-8-max",
    name: "Qwen3.8 Max",
    maker: "Alibaba",
    tier: "workhorse",
    bestFor: "Agentic work, long context",
    rates: { inputPer1M: 2, cachedInputPer1M: 0.25, outputPer1M: 6 },
    contextTokens: 1_000_000,
    batchDiscount: null,
    longPrompt: null,
    alternateRate: null,
    notes: [
      "Prices differ by region. The international (Singapore) rate card is shown.",
      "It can spend a large reasoning budget on one task, so compare cost per finished task.",
    ],
    verification: "secondary",
    providerPageUrl: "https://www.alibabacloud.com/help/en/model-studio/pricing",
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    maker: "DeepSeek",
    tier: "budget",
    bestFor: "Cheapest capable API",
    rates: { inputPer1M: 0.15, cachedInputPer1M: 0.003, outputPer1M: 0.6 },
    contextTokens: 1_000_000,
    batchDiscount: null,
    longPrompt: null,
    alternateRate: {
      kind: "peak-hours",
      label: "Peak hours (Mon to Fri, 09:00–12:00 and 14:00–18:00 Beijing time)",
      endsOn: null,
      rates: { inputPer1M: 0.3, cachedInputPer1M: 0.006, outputPer1M: 1.2 },
    },
    notes: [
      "The headline price is the off-peak rate. Peak hours cost twice as much.",
      "Requests to the older V4 Pro name are now routed to this model at Flash prices.",
    ],
    verification: "secondary",
    providerPageUrl: null,
  },
];

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