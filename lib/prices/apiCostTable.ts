export type PricePeriod = "current" | "later" | "peak";
export type ModelAccess = "closed" | "open-weight";

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
  contextWindow: string;
  rate: ApiRate;
  /** A different price that starts later, such as when an introductory price ends. */
  laterRate?: ApiPriceVariant;
  /** A different price at busy times. */
  peakRate?: ApiPriceVariant;
  longPrompt?: LongPromptRule;
  /** Plain-text notes with no prices in them. Prices in notes are built from the rates above. */
  notes: readonly string[];
  sourceName: string;
  sourceHref: string;
}

/** Date the prices below were last checked. */
export const API_PRICES_CHECKED_ON = "October 21, 2026";

const ANTHROPIC = { sourceName: "Anthropic pricing", sourceHref: "https://platform.claude.com/docs/en/about-claude/pricing" } as const;
const OPENAI = { sourceName: "OpenAI API pricing", sourceHref: "https://developers.openai.com/api/docs/pricing" } as const;
const GOOGLE = { sourceName: "Google Cloud pricing", sourceHref: "https://cloud.google.com/vertex-ai/generative-ai/pricing" } as const;
const XAI = { sourceName: "xAI models and pricing", sourceHref: "https://docs.x.ai/docs/models" } as const;
const XIAOMI = { sourceName: "Xiaomi MiMo", sourceHref: "https://mimo.mi.com" } as const;
const MOONSHOT = { sourceName: "Moonshot AI pricing", sourceHref: "https://platform.kimi.com/docs/pricing/chat" } as const;
const ALIBABA = { sourceName: "Alibaba Cloud Model Studio pricing", sourceHref: "https://www.alibabacloud.com/help/en/model-studio/pricing" } as const;
const DEEPSEEK = { sourceName: "DeepSeek API pricing", sourceHref: "https://api-docs.deepseek.com/quick_start/pricing" } as const;

/** One row per model in the Blueprint's directory, in directory order. */
export const API_PRICE_ROWS: readonly ApiPriceRow[] = [
  { id: "claude-opus-5-5", model: "Claude Opus 5.5", maker: "Anthropic", access: "closed", contextWindow: "1M", rate: { inputPricePerMillion: 4, outputPricePerMillion: 20, cachedInputPricePerMillion: 0.2 }, notes: [], ...ANTHROPIC },
  {
    id: "gpt-6-1-sol", model: "GPT-6.1 Sol", maker: "OpenAI", access: "closed", contextWindow: "1.05M",
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 10 },
    notes: ["Higher long-prompt rates may apply above 272K input tokens. Check the provider page for this model's rate."],
    ...OPENAI,
  },
  {
    id: "gpt-6-astra", model: "GPT-6 Astra", maker: "OpenAI", access: "closed", contextWindow: "1.05M",
    rate: { inputPricePerMillion: 10, outputPricePerMillion: 50, cachedInputPricePerMillion: 1 },
    longPrompt: { fromInputTokens: 272_001, rate: { inputPricePerMillion: 20, outputPricePerMillion: 75, cachedInputPricePerMillion: 2 }, note: "Whole request billed at a higher rate once the prompt passes 272K input tokens" },
    notes: [], ...OPENAI,
  },
  { id: "claude-fable-5-1", model: "Claude Fable 5.1", maker: "Anthropic", access: "closed", contextWindow: "1M", rate: { inputPricePerMillion: 10, outputPricePerMillion: 50 }, notes: [], ...ANTHROPIC },
  { id: "claude-sonnet-5-5", model: "Claude Sonnet 5.5", maker: "Anthropic", access: "closed", contextWindow: "1M", rate: { inputPricePerMillion: 2, outputPricePerMillion: 10, cachedInputPricePerMillion: 0.2 }, notes: [], ...ANTHROPIC },
  {
    id: "gemini-4-argon", model: "Gemini 4 Argon", maker: "Google", access: "closed", contextWindow: "1M",
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 10, cachedInputPricePerMillion: 0.1 },
    laterRate: { label: "Standard price from December 1, 2026 (the introductory price ends November 30)", rate: { inputPricePerMillion: 4, outputPricePerMillion: 20 } },
    notes: ["Reasoning tokens are billed as output."], ...GOOGLE,
  },
  {
    id: "gemini-3-8-flash", model: "Gemini 3.8 Flash", maker: "Google", access: "closed", contextWindow: "1M",
    rate: { inputPricePerMillion: 0.75, outputPricePerMillion: 3.75 },
    laterRate: { label: "Standard price from January 1, 2027 (the introductory price ends December 31)", rate: { inputPricePerMillion: 1.5, outputPricePerMillion: 7.5 } },
    notes: [], ...GOOGLE,
  },
  { id: "claude-haiku-5-5", model: "Claude Haiku 5.5", maker: "Anthropic", access: "closed", contextWindow: "1M", rate: { inputPricePerMillion: 0.1, outputPricePerMillion: 0.5 }, notes: ["Anthropic lists this as a 'from' price."], ...ANTHROPIC },
  {
    id: "gpt-6-luna", model: "GPT-6 Luna", maker: "OpenAI", access: "closed", contextWindow: "1.05M",
    rate: { inputPricePerMillion: 0.1, outputPricePerMillion: 0.5, cachedInputPricePerMillion: 0.01 },
    longPrompt: { fromInputTokens: 272_001, rate: { inputPricePerMillion: 0.2, outputPricePerMillion: 0.75, cachedInputPricePerMillion: 0.02 }, note: "Whole request billed at a higher rate once the prompt passes 272K input tokens" },
    notes: [], ...OPENAI,
  },
  {
    id: "grok-4-7", model: "Grok 4.7", maker: "xAI", access: "closed", contextWindow: "500K",
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 6, cachedInputPricePerMillion: 0.5 },
    longPrompt: { fromInputTokens: 200_000, rate: { inputPricePerMillion: 4, outputPricePerMillion: 12, cachedInputPricePerMillion: 1 }, note: "Whole request billed at a higher rate once the prompt reaches 200K input tokens" },
    notes: [], ...XAI,
  },
  {
    id: "mimo-v2-6-pro", model: "MiMo-V2.6-Pro", maker: "Xiaomi", access: "open-weight", contextWindow: "1M",
    rate: { inputPricePerMillion: 0.435, outputPricePerMillion: 0.87, cachedInputPricePerMillion: 0.0036 },
    notes: ["Open weights (MIT licence). Batch work is billed at half price.", "Thinking is on by default."], ...XIAOMI,
  },
  {
    id: "kimi-k3", model: "Kimi K3", maker: "Moonshot AI", access: "open-weight", contextWindow: "1.05M",
    rate: { inputPricePerMillion: 3, outputPricePerMillion: 15, cachedInputPricePerMillion: 0.3 },
    notes: ["Open weights (custom licence).", "Reasoning is always on, and reasoning tokens are billed as output."], ...MOONSHOT,
  },
  {
    id: "qwen3-8-max-27b", model: "Qwen3.8 Max", maker: "Alibaba", access: "open-weight", contextWindow: "1M",
    rate: { inputPricePerMillion: 2, outputPricePerMillion: 6, cachedInputPricePerMillion: 0.25 },
    notes: ["This row prices Max. The Qwen3.8-27B open weights are free to self-host."], ...ALIBABA,
  },
  {
    id: "deepseek-v4-1-flash", model: "DeepSeek V4.1 Flash", maker: "DeepSeek", access: "open-weight", contextWindow: "1M",
    rate: { inputPricePerMillion: 0.15, outputPricePerMillion: 0.6, cachedInputPricePerMillion: 0.003 },
    peakRate: { label: "Peak-hour price (Beijing time, Monday to Friday, 09:00 to 12:00 and 14:00 to 18:00)", rate: { inputPricePerMillion: 0.3, outputPricePerMillion: 1.2, cachedInputPricePerMillion: 0.006 } },
    notes: ["The price shown is the off-peak price."], ...DEEPSEEK,
  },
];

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