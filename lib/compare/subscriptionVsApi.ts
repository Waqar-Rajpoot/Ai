import { calculateTaskCostInDollars, type TaskPreset } from "./modelCost";
import type { ModelDirectoryRow } from "./modelDirectory";

export interface BudgetTaskEstimate {
  tasks: number;
  tasksPerDay: number;
  costPerTaskDollars: number;
}

export const DEFAULT_SUBSCRIPTION_BUDGET_DOLLARS = 20;
export const MAX_SUBSCRIPTION_BUDGET_DOLLARS = 10_000;
export const DAYS_PER_MONTH = 30;

/**
 * How many example tasks a monthly budget buys at API list price. Returns null for an invalid budget.
 * A subscription also includes app features and its own limits, so this is not a like-for-like comparison.
 */
export function estimateTasksForBudget(
  row: ModelDirectoryRow,
  preset: TaskPreset,
  budgetDollars: number,
): BudgetTaskEstimate | null {
  if (!Number.isFinite(budgetDollars) || budgetDollars <= 0 || budgetDollars > MAX_SUBSCRIPTION_BUDGET_DOLLARS) return null;

  const costPerTaskDollars = calculateTaskCostInDollars(row, preset.inputTokens, preset.outputTokens);
  if (costPerTaskDollars <= 0) return null;

  // The small offset stops floating-point error from rounding an exact answer down.
  const tasks = Math.floor(budgetDollars / costPerTaskDollars + 1e-9);
  return { tasks, tasksPerDay: Math.floor(tasks / DAYS_PER_MONTH), costPerTaskDollars };
}

export function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}