import { formatMonthDay, type ModelDirectoryRow } from "./modelDirectory";

export interface TaskPreset {
  id: string;
  label: string;
  inputTokens: number;
  outputTokens: number;
}

export interface TaskCostEntry {
  row: ModelDirectoryRow;
  dollars: number;
  /** Cost divided by the cheapest model's cost. The cheapest model is 1. */
  timesCheapest: number;
}

export const CUSTOM_TASK_ID = "custom";
/** Upper limit for a typed-in token count, so a typo cannot produce absurd results. */
export const MAX_TASK_TOKENS = 10_000_000;

/** Illustrative sizes only. They are not the site's test battery. */
export const TASK_PRESETS: readonly TaskPreset[] = [
  { id: "short-question", label: "Short chat question", inputTokens: 500, outputTokens: 300 },
  { id: "email-draft", label: "Draft an email", inputTokens: 1_000, outputTokens: 500 },
  { id: "document-summary", label: "Summarize a long document", inputTokens: 30_000, outputTokens: 1_500 },
  { id: "coding-task", label: "Small coding task", inputTokens: 20_000, outputTokens: 4_000 },
];

const TOKENS_PER_PRICE_UNIT = 1_000_000;

function isValidTokenCount(tokens: number): boolean {
  return Number.isFinite(tokens) && tokens >= 0 && tokens <= MAX_TASK_TOKENS;
}

/** Cost in dollars: tokens in and out times the list price per million tokens. */
export function calculateTaskCostInDollars(row: ModelDirectoryRow, inputTokens: number, outputTokens: number): number {
  return (
    (inputTokens / TOKENS_PER_PRICE_UNIT) * row.inputPricePerMillion +
    (outputTokens / TOKENS_PER_PRICE_UNIT) * row.outputPricePerMillion
  );
}

/** Ranks every model by cost for one task, cheapest first. Returns null for invalid or empty token counts. */
export function rankByTaskCost(
  rows: readonly ModelDirectoryRow[],
  inputTokens: number,
  outputTokens: number,
): TaskCostEntry[] | null {
  if (!isValidTokenCount(inputTokens) || !isValidTokenCount(outputTokens)) return null;
  if (inputTokens === 0 && outputTokens === 0) return null;

  const priced = rows
    .map((row) => ({ row, dollars: calculateTaskCostInDollars(row, inputTokens, outputTokens) }))
    .sort((first, second) => first.dollars - second.dollars || first.row.name.localeCompare(second.row.name, "en"));

  const cheapestDollars = priced[0]?.dollars ?? 0;
  return priced.map((entry) => ({
    ...entry,
    timesCheapest: cheapestDollars > 0 ? entry.dollars / cheapestDollars : 1,
  }));
}

/** "$0.12" for a cent or more, four decimals below that, and a floor for tiny amounts. */
export function formatTaskCost(dollars: number): string {
  if (dollars >= 0.01) return `$${dollars.toFixed(2)}`;
  if (dollars >= 0.0001) return `$${dollars.toFixed(4)}`;
  return "Under $0.0001";
}

/** "Lowest" for the cheapest model, otherwise "3.2x" or "45x". */
export function formatCostMultiple(timesCheapest: number): string {
  if (timesCheapest <= 1.005) return "Lowest";
  return `${timesCheapest.toFixed(timesCheapest < 10 ? 1 : 0)}x`;
}

/** Price conditions that can change the cost shown, or an empty string. */
export function getCostCaveat(row: ModelDirectoryRow): string {
  const parts: string[] = [];
  if (row.priceNote) parts.push(row.priceNote);
  if (row.introRateEndsOn) parts.push(`Intro rate to ${formatMonthDay(row.introRateEndsOn)}`);
  return parts.join(". ");
}