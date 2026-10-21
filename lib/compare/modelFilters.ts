import { ALL_MAKERS, filterByMaker, type ModelDirectoryRow } from "./modelDirectory";

export type PriceTier = "budget" | "mid" | "premium";
export type PriceTierFilter = PriceTier | "all";
export type ModelAccessFilter = "all" | "open-weight-or-local";

/** Input price (US dollars per million tokens) up to which a model counts as budget. */
export const BUDGET_TIER_MAX_INPUT_PRICE = 1;
/** Input price up to which a model counts as mid-priced. Above it, premium. */
export const MID_TIER_MAX_INPUT_PRICE = 5;

export const PRICE_TIER_FILTERS: readonly { id: PriceTierFilter; label: string; description: string }[] = [
  { id: "all", label: "All prices", description: "" },
  { id: "budget", label: "Budget", description: `Input price up to $${BUDGET_TIER_MAX_INPUT_PRICE} per million tokens` },
  { id: "mid", label: "Mid-priced", description: `Input price above $${BUDGET_TIER_MAX_INPUT_PRICE} and up to $${MID_TIER_MAX_INPUT_PRICE}` },
  { id: "premium", label: "Premium", description: `Input price above $${MID_TIER_MAX_INPUT_PRICE}` },
];

export const PRICE_TIER_LABELS: Record<PriceTier, string> = {
  budget: "Budget",
  mid: "Mid-priced",
  premium: "Premium",
};

export const ACCESS_FILTERS: readonly { id: ModelAccessFilter; label: string }[] = [
  { id: "all", label: "All models" },
  { id: "open-weight-or-local", label: "Open-weight and local" },
];

/**
 * Models whose weights can be downloaded, from the Blueprint 6.7 "best for" notes
 * (MiMo and Kimi K3: open-weight, Qwen 27B: local). Check each licence before relying on this list.
 */
export const OPEN_WEIGHT_OR_LOCAL_MODEL_IDS: readonly string[] = ["mimo-v2-6-pro", "kimi-k3", "qwen3-8-max-27b"];

export interface ModelFilters {
  query: string;
  maker: string;
  priceTier: PriceTierFilter;
  access: ModelAccessFilter;
}

export const DEFAULT_MODEL_FILTERS: ModelFilters = { query: "", maker: ALL_MAKERS, priceTier: "all", access: "all" };

/** Places a model in a price tier by its input price. */
export function getPriceTier(row: ModelDirectoryRow): PriceTier {
  if (row.inputPricePerMillion <= BUDGET_TIER_MAX_INPUT_PRICE) return "budget";
  if (row.inputPricePerMillion <= MID_TIER_MAX_INPUT_PRICE) return "mid";
  return "premium";
}

/** True when the model is on the open-weight or local list above. */
export function isOpenWeightOrLocal(row: ModelDirectoryRow): boolean {
  return OPEN_WEIGHT_OR_LOCAL_MODEL_IDS.includes(row.id);
}

/** Keeps rows whose name, maker or "best for" text contains the query. An empty query keeps all rows. */
export function searchModels(rows: readonly ModelDirectoryRow[], query: string): ModelDirectoryRow[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === "") return [...rows];
  return rows.filter((row) =>
    [row.name, row.maker, row.bestFor].some((text) => text.toLowerCase().includes(normalizedQuery)),
  );
}

/** Applies search, maker, price tier and access filters. The result is not sorted. */
export function filterModels(rows: readonly ModelDirectoryRow[], filters: ModelFilters): ModelDirectoryRow[] {
  const byMaker = filterByMaker(searchModels(rows, filters.query), filters.maker);
  const byTier = filters.priceTier === "all" ? byMaker : byMaker.filter((row) => getPriceTier(row) === filters.priceTier);
  return filters.access === "all" ? byTier : byTier.filter(isOpenWeightOrLocal);
}

/** True when any filter differs from its default. */
export function hasActiveFilters(filters: ModelFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.maker !== DEFAULT_MODEL_FILTERS.maker ||
    filters.priceTier !== DEFAULT_MODEL_FILTERS.priceTier ||
    filters.access !== DEFAULT_MODEL_FILTERS.access
  );
}