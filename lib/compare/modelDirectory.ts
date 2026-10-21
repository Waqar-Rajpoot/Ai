/** How a model appears in the BenchLM composite. */
export type BenchLmRating =
  | { status: "ranked"; score: number; /** Which variant the score covers, for example "Max". */ appliesTo?: string }
  | { status: "estimated"; score: number }
  | { status: "unranked" };

export interface ModelDirectoryRow {
  /** Slug used for the review route: /compare/reviews/[id]. */
  id: string;
  name: string;
  maker: string;
  /** API list price in US dollars per million input tokens. */
  inputPricePerMillion: number;
  /** API list price in US dollars per million output tokens. */
  outputPricePerMillion: number;
  /** Extra pricing detail, for example a self-hosting or off-peak note. */
  priceNote?: string;
  /** ISO date (YYYY-MM-DD) when an introductory rate ends. */
  introRateEndsOn?: string;
  /** Shown as written, because sizes differ by variant and one is not confirmed. */
  contextLabel: string;
  benchLm: BenchLmRating;
  bestFor: string;
  /** False until our own review is published. */
  isReviewPublished: boolean;
}

export type DirectorySortKey = "score" | "price" | "name";

export const DEFAULT_SORT_KEY: DirectorySortKey = "score";
export const ALL_MAKERS = "all";

export const SORT_OPTIONS: readonly { id: DirectorySortKey; label: string }[] = [
  { id: "score", label: "BenchLM score, highest first" },
  { id: "price", label: "Input price, lowest first" },
  { id: "name", label: "Name, A to Z" },
];

/** Date the BenchLM composite was read (Blueprint 6.7). Update it whenever the scores are refreshed. */
export const DIRECTORY_SCORES_AS_OF = "2026-10-17";

/** Launch data from Blueprint 6.7. Re-check every row against the provider's own page before publishing. */
export const MODEL_DIRECTORY_ROWS: readonly ModelDirectoryRow[] = [
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", maker: "Anthropic", inputPricePerMillion: 4, outputPricePerMillion: 20, contextLabel: "1M", benchLm: { status: "ranked", score: 86.6 }, bestFor: "All-round flagship", isReviewPublished: false },
  { id: "gpt-6-1-sol", name: "GPT-6.1 Sol", maker: "OpenAI", inputPricePerMillion: 2, outputPricePerMillion: 10, contextLabel: "1.05M", benchLm: { status: "ranked", score: 84.1 }, bestFor: "Best value near the frontier", isReviewPublished: false },
  { id: "gpt-6-astra", name: "GPT-6 Astra", maker: "OpenAI", inputPricePerMillion: 10, outputPricePerMillion: 50, contextLabel: "1.05M", benchLm: { status: "ranked", score: 83.9 }, bestFor: "Maths, science, research", isReviewPublished: false },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", maker: "Anthropic", inputPricePerMillion: 10, outputPricePerMillion: 50, contextLabel: "1M", benchLm: { status: "ranked", score: 83.2 }, bestFor: "Hardest agentic coding", isReviewPublished: false },
  { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5", maker: "Anthropic", inputPricePerMillion: 2, outputPricePerMillion: 10, contextLabel: "1M", benchLm: { status: "ranked", score: 82.2 }, bestFor: "Everyday coding and knowledge work", isReviewPublished: false },
  { id: "gemini-4-argon", name: "Gemini 4 Argon", maker: "Google", inputPricePerMillion: 2, outputPricePerMillion: 10, introRateEndsOn: "2026-11-30", contextLabel: "1M", benchLm: { status: "ranked", score: 81.0 }, bestFor: "Complex reasoning", isReviewPublished: false },
  { id: "gemini-3-8-flash", name: "Gemini 3.8 Flash", maker: "Google", inputPricePerMillion: 0.75, outputPricePerMillion: 3.75, introRateEndsOn: "2026-12-31", contextLabel: "1M", benchLm: { status: "ranked", score: 69.3 }, bestFor: "Fast, cheap multimodal", isReviewPublished: false },
  { id: "claude-haiku-5-5", name: "Claude Haiku 5.5", maker: "Anthropic", inputPricePerMillion: 0.1, outputPricePerMillion: 0.5, contextLabel: "1M", benchLm: { status: "ranked", score: 70.0 }, bestFor: "High-volume, low-cost", isReviewPublished: false },
  { id: "gpt-6-luna", name: "GPT-6 Luna", maker: "OpenAI", inputPricePerMillion: 0.1, outputPricePerMillion: 0.5, contextLabel: "Not confirmed", benchLm: { status: "unranked" }, bestFor: "Cheapest bulk work", isReviewPublished: false },
  { id: "grok-4-7", name: "Grok 4.7", maker: "xAI", inputPricePerMillion: 2, outputPricePerMillion: 6, priceNote: "Higher above 200K tokens", contextLabel: "500K", benchLm: { status: "unranked" }, bestFor: "Low output price; live web", isReviewPublished: false },
  { id: "mimo-v2-6-pro", name: "MiMo-V2.6-Pro", maker: "Xiaomi", inputPricePerMillion: 0.435, outputPricePerMillion: 0.87, contextLabel: "1M", benchLm: { status: "estimated", score: 73.6 }, bestFor: "Top open-weight; MIT licence", isReviewPublished: false },
  { id: "kimi-k3", name: "Kimi K3", maker: "Moonshot AI", inputPricePerMillion: 3, outputPricePerMillion: 15, contextLabel: "1.05M", benchLm: { status: "ranked", score: 69.9 }, bestFor: "Open-weight coding and agents", isReviewPublished: false },
  { id: "qwen3-8-max-27b", name: "Qwen3.8 Max / 27B", maker: "Alibaba", inputPricePerMillion: 2, outputPricePerMillion: 6, priceNote: "Max API price. 27B is free to self-host", contextLabel: "1M / 262K", benchLm: { status: "ranked", score: 69.7, appliesTo: "Max" }, bestFor: "27B: best single-GPU local", isReviewPublished: false },
  { id: "deepseek-v4-1-flash", name: "DeepSeek V4.1 Flash", maker: "DeepSeek", inputPricePerMillion: 0.15, outputPricePerMillion: 0.6, priceNote: "Off-peak price", contextLabel: "1M", benchLm: { status: "unranked" }, bestFor: "Cheapest capable API", isReviewPublished: false },
];

const MONTH_NAMES: readonly string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Splits an ISO date by hand so the result never shifts with the reader's time zone. */
function parseIsoDate(isoDate: string): { year: number; monthIndex: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;
  return { year: Number(match[1]), monthIndex, day: Number(match[3]) };
}

/** "2026-10-17" becomes "October 17, 2026". Returns the input unchanged if it is not an ISO date. */
export function formatIsoDate(isoDate: string): string {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return isoDate;
  return `${MONTH_NAMES[parsed.monthIndex]} ${parsed.day}, ${parsed.year}`;
}

/** "2026-11-30" becomes "Nov 30". Returns the input unchanged if it is not an ISO date. */
export function formatMonthDay(isoDate: string): string {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return isoDate;
  return `${MONTH_NAMES[parsed.monthIndex].slice(0, 3)} ${parsed.day}`;
}

/** One price in dollars. Whole dollars have no decimals, others keep at least two: $4, $0.10, $0.435. */
export function formatPricePerMillion(dollars: number): string {
  const decimals = dollars.toString().split(".")[1]?.length ?? 0;
  return decimals === 0 ? `$${dollars}` : `$${dollars.toFixed(Math.max(2, decimals))}`;
}

/** "$4 / $20": input price, then output price, per million tokens. */
export function formatPricePair(row: ModelDirectoryRow): string {
  return `${formatPricePerMillion(row.inputPricePerMillion)} / ${formatPricePerMillion(row.outputPricePerMillion)}`;
}

/** Display text for a BenchLM rating, including the "est." and "not in top 25" cases. */
export function formatBenchLm(rating: BenchLmRating): string {
  switch (rating.status) {
    case "ranked":
      return rating.appliesTo ? `${rating.appliesTo} ${rating.score.toFixed(1)}` : rating.score.toFixed(1);
    case "estimated":
      return `${rating.score.toFixed(1)} (est.)`;
    case "unranked":
      return "Not in top 25";
  }
}

/** Route for a model's own review page. */
export function getReviewHref(row: ModelDirectoryRow): string {
  return `/compare/reviews/${row.id}`;
}

/** Makers in the directory, A to Z, without repeats. */
export function getMakers(rows: readonly ModelDirectoryRow[]): string[] {
  return [...new Set(rows.map((row) => row.maker))].sort((first, second) => first.localeCompare(second, "en"));
}

/** Keeps one maker's rows, or all rows when the maker is "all". */
export function filterByMaker(rows: readonly ModelDirectoryRow[], maker: string): ModelDirectoryRow[] {
  return maker === ALL_MAKERS ? [...rows] : rows.filter((row) => row.maker === maker);
}

function compareByName(first: ModelDirectoryRow, second: ModelDirectoryRow): number {
  return first.name.localeCompare(second.name, "en", { sensitivity: "base" });
}

/** Score used for ordering. Models without a score sort last. */
function getSortableScore(rating: BenchLmRating): number {
  return rating.status === "unranked" ? Number.NEGATIVE_INFINITY : rating.score;
}

/** Returns a sorted copy. Ties fall back to name, so the order is stable. */
export function sortModels(rows: readonly ModelDirectoryRow[], sortKey: DirectorySortKey): ModelDirectoryRow[] {
  const sortedRows = [...rows];

  switch (sortKey) {
    case "score":
      return sortedRows.sort(
        (first, second) => getSortableScore(second.benchLm) - getSortableScore(first.benchLm) || compareByName(first, second),
      );
    case "price":
      return sortedRows.sort(
        (first, second) =>
          first.inputPricePerMillion - second.inputPricePerMillion ||
          first.outputPricePerMillion - second.outputPricePerMillion ||
          compareByName(first, second),
      );
    case "name":
      return sortedRows.sort(compareByName);
  }
}