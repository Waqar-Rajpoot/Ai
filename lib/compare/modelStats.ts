import { formatPricePerMillion, getMakers, sortModels, type ModelDirectoryRow } from "./modelDirectory";
import { isOpenWeightOrLocal } from "./modelFilters";

export interface StatItem {
  label: string;
  value: string;
}

export interface MakerSummary {
  maker: string;
  /** Highest BenchLM score first. */
  models: ModelDirectoryRow[];
}

/** Four headline numbers for the Model directory hero. */
export function getDirectoryStatItems(rows: readonly ModelDirectoryRow[]): StatItem[] {
  const inputPrices = rows.map((row) => row.inputPricePerMillion);
  const scoredCount = rows.filter((row) => row.benchLm.status !== "unranked").length;

  return [
    { value: String(rows.length), label: "models" },
    { value: String(getMakers(rows).length), label: "makers" },
    { value: inputPrices.length > 0 ? formatPricePerMillion(Math.min(...inputPrices)) : "n/a", label: "lowest input price per 1M tokens" },
    { value: String(scoredCount), label: "with a BenchLM score" },
  ];
}

/** Four headline numbers for the Reviews index hero. */
export function getReviewStatItems(rows: readonly ModelDirectoryRow[]): StatItem[] {
  return [
    { value: String(rows.length), label: "models planned" },
    { value: String(rows.filter((row) => row.isReviewPublished).length), label: "reviews published" },
    { value: String(getMakers(rows).length), label: "makers" },
    { value: String(rows.filter(isOpenWeightOrLocal).length), label: "open-weight or local" },
  ];
}

/** Groups models by maker, makers A to Z. */
export function getMakerSummaries(rows: readonly ModelDirectoryRow[]): MakerSummary[] {
  return getMakers(rows).map((maker) => ({
    maker,
    models: sortModels(rows.filter((row) => row.maker === maker), "score"),
  }));
}

/** Models with an introductory rate, soonest end date first. */
export function getIntroRateModels(rows: readonly ModelDirectoryRow[]): ModelDirectoryRow[] {
  return rows
    .filter((row) => row.introRateEndsOn !== undefined)
    .sort((first, second) => (first.introRateEndsOn ?? "").localeCompare(second.introRateEndsOn ?? ""));
}