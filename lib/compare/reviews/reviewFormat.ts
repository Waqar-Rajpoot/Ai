import type { ModelDirectoryRow } from "@/lib/compare/modelDirectory";
import { BENCHLM_SNAPSHOT } from "./benchLmSnapshot";

/** Formats a per-million-token price: $4, $0.10, $0.435. */
export function formatPricePerMillion(price: number): string {
  if (Number.isInteger(price)) return `$${price}`;
  const decimals = String(price).split(".")[1]?.length ?? 0;
  return `$${price.toFixed(Math.max(2, decimals))}`;
}

/** "in / out" API price of a model, e.g. "$4 / $20". */
export function formatPriceRange(row: ModelDirectoryRow): string {
  return `${formatPricePerMillion(row.inputPricePerMillion)} / ${formatPricePerMillion(row.outputPricePerMillion)}`;
}

/** Formats a calculated cost with enough decimals to stay readable. */
export function formatMoney(value: number): string {
  if (value >= 100) return `$${Math.round(value).toLocaleString("en-US")}`;
  if (value >= 0.1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(4)}`;
}

/** "October 17, 2026" from an ISO date (YYYY-MM-DD). */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** "Nov 30" from an ISO date (YYYY-MM-DD). */
export function formatShortDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** Current BenchLM score: "86.29", "56.44 (est.)" or "Not ranked". */
export function formatBenchLm(row: ModelDirectoryRow): string {
  const entry = BENCHLM_SNAPSHOT[row.id];
  if (!entry) return "Not ranked";
  const score = entry.score.toFixed(2);
  return entry.evidence === "estimated" ? `${score} (est.)` : score;
}

/** Sentence-friendly description of the BenchLM score. */
export function describeBenchLm(row: ModelDirectoryRow): string {
  return BENCHLM_SNAPSHOT[row.id]
    ? `a BenchLM score of ${formatBenchLm(row)}`
    : "no ranked BenchLM entry";
}

/** "+2.17", "−0.31" (with a real minus sign). */
export function formatSigned(value: number, decimals = 2): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(decimals)}`;
}

/** "75%" with no decimals. */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/** "2.5×" or "12×". */
export function formatMultiple(value: number): string {
  return `${value.toFixed(value >= 10 ? 0 : 1)}×`;
}