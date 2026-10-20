export interface ApiCostInput {
  inputTokens: number;
  outputTokens: number;
  /** US dollars per one million input tokens. */
  inputPricePerMillion: number;
  /** US dollars per one million output tokens. */
  outputPricePerMillion: number;
  tasksPerMonth: number;
}

export type ApiCostProblem = "not-a-number" | "negative" | "no-tokens";

export type ApiCostResult =
  | { ok: true; inputCost: number; outputCost: number; costPerTask: number; monthlyCost: number }
  | { ok: false; reason: ApiCostProblem };

export interface ApiCostField {
  key: keyof ApiCostInput;
  label: string;
  hint: string;
}

const TOKENS_PER_MILLION = 1_000_000;

export const API_COST_FIELDS: readonly ApiCostField[] = [
  { key: "inputTokens", label: "Input tokens per task", hint: "Everything you send: instructions, files, chat history." },
  { key: "outputTokens", label: "Output tokens per task", hint: "What the model writes back, including any visible reasoning." },
  { key: "inputPricePerMillion", label: "Input price (US$ per million tokens)", hint: "Copy it from the API price table." },
  { key: "outputPricePerMillion", label: "Output price (US$ per million tokens)", hint: "Copy it from the API price table." },
  { key: "tasksPerMonth", label: "Tasks per month", hint: "How many times you run this task." },
];

/** Example token and task counts so the tool shows a result shape. Prices start blank on purpose. */
export const API_COST_STARTING_VALUES: Record<keyof ApiCostInput, string> = {
  inputTokens: "3000",
  outputTokens: "800",
  inputPricePerMillion: "",
  outputPricePerMillion: "",
  tasksPerMonth: "200",
};

export const API_COST_PROBLEM_MESSAGES: Record<ApiCostProblem, string> = {
  "not-a-number": "Enter a number in every box.",
  negative: "Numbers cannot be negative.",
  "no-tokens": "Enter at least some input or output tokens.",
};

/** Works out the cost of one task and of a month of tasks. Validates every field. */
export function calculateApiCost(input: ApiCostInput): ApiCostResult {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value))) return { ok: false, reason: "not-a-number" };
  if (values.some((value) => value < 0)) return { ok: false, reason: "negative" };
  if (input.inputTokens + input.outputTokens === 0) return { ok: false, reason: "no-tokens" };

  const inputCost = (input.inputTokens / TOKENS_PER_MILLION) * input.inputPricePerMillion;
  const outputCost = (input.outputTokens / TOKENS_PER_MILLION) * input.outputPricePerMillion;
  const costPerTask = inputCost + outputCost;

  return { ok: true, inputCost, outputCost, costPerTask, monthlyCost: costPerTask * input.tasksPerMonth };
}

/** Formats US dollars, keeping up to four decimals so tiny per-task costs stay visible. */
export function formatDollars(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}