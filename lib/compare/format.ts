import type { DirectoryModel } from "./models";

/** Illustrative short-chat task used for cost comparisons; not our test battery. */
export const SAMPLE_TASK_INPUT_TOKENS = 500;
export const SAMPLE_TASK_OUTPUT_TOKENS = 300;

const TOKENS_PER_MILLION = 1_000_000;

/** Formats a per-million-token price, e.g. 4 -> "$4", 0.435 -> "$0.435". */
export function formatPricePerMillion(price: number): string {
  return `$${Number(price.toFixed(3))}`;
}

/** Formats "input / output" prices for display, e.g. "$4 / $20". */
export function formatPricePair(model: DirectoryModel): string {
  return `${formatPricePerMillion(model.inputPricePerMillion)} / ${formatPricePerMillion(model.outputPricePerMillion)}`;
}

/** Formats a BenchLM score, keeping the "est." and "Not in top 25" labels. */
export function formatBenchScore(model: DirectoryModel): string {
  if (model.benchScore === null) return "Not in top 25";
  const score = model.benchScore.toFixed(1);
  return model.benchScoreIsEstimate ? `${score} (est.)` : score;
}

/** List-price cost of the sample task in US dollars. */
export function calculateSampleTaskCost(model: DirectoryModel): number {
  return (
    (SAMPLE_TASK_INPUT_TOKENS * model.inputPricePerMillion +
      SAMPLE_TASK_OUTPUT_TOKENS * model.outputPricePerMillion) /
    TOKENS_PER_MILLION
  );
}

/** Formats a small dollar cost, using four decimals under one cent. */
export function formatTaskCost(cost: number): string {
  return cost < 0.01 ? `$${cost.toFixed(4)}` : `$${cost.toFixed(2)}`;
}