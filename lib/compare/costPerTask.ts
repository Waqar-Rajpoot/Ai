import type { CostScenario } from "./bestFor";

const TOKENS_PER_MILLION = 1_000_000;
const SMALL_COST_THRESHOLD_USD = 0.01;
const MAX_PERCENT = 100;

/** Prices in US dollars per million tokens. `cachedInput` is null when the model has no cache price. */
export interface TokenRates {
  input: number;
  output: number;
  cachedInput: number | null;
}

/** One model's estimated cost for every scenario, in the same order as the scenarios. */
export interface CostRow {
  modelId: string;
  modelName: string;
  costs: readonly number[];
}

/**
 * Estimates the cost of one scenario in US dollars.
 * Cached input is billed at the cache rate, or at the normal input rate when no cache price exists.
 * Surcharges for very long prompts are not included, so very large scenarios are a lower bound.
 * @param scenario The job to price.
 * @param rates Token prices for the model.
 * @returns Cost in US dollars.
 */
export function estimateScenarioCost(scenario: CostScenario, rates: TokenRates): number {
  const cachedShare = Math.min(Math.max(scenario.cachedSharePercent, 0), MAX_PERCENT) / MAX_PERCENT;
  const totalInput = scenario.requests * scenario.inputPerRequest;
  const totalOutput = scenario.requests * scenario.outputPerRequest;
  const cachedInput = totalInput * cachedShare;
  const freshInput = totalInput - cachedInput;
  const cachedRate = rates.cachedInput ?? rates.input;
  return (freshInput * rates.input + cachedInput * cachedRate + totalOutput * rates.output) / TOKENS_PER_MILLION;
}

/**
 * Builds one row per model, skipping ids that have no price.
 * @param scenarios Jobs to price.
 * @param models Models with their names and token prices.
 */
export function buildCostRows(
  scenarios: readonly CostScenario[],
  models: readonly { modelId: string; modelName: string; rates: TokenRates }[],
): CostRow[] {
  return models.map((model) => ({
    modelId: model.modelId,
    modelName: model.modelName,
    costs: scenarios.map((scenario) => estimateScenarioCost(scenario, model.rates)),
  }));
}

/**
 * Returns the index of the cheapest model for each scenario column.
 * @param rows Rows from `buildCostRows`.
 */
export function findCheapestPerScenario(rows: readonly CostRow[]): number[] {
  const scenarioCount = rows[0]?.costs.length ?? 0;
  return Array.from({ length: scenarioCount }, (_, column) =>
    rows.reduce((best, row, index) => (row.costs[column] < rows[best].costs[column] ? index : best), 0),
  );
}

/**
 * Formats a dollar amount for a table cell. Amounts under one cent keep four decimals.
 * @param costUsd Cost in US dollars.
 */
export function formatCostUsd(costUsd: number): string {
  const digits = costUsd < SMALL_COST_THRESHOLD_USD ? 4 : 2;
  return `$${costUsd.toFixed(digits)}`;
}