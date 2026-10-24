export interface BreakEvenInput {
  /** US dollars for one task on a hosted model. */
  hostedCostPerTask: number;
  tasksPerMonth: number;
  /** US dollars per month to run a model yourself, counting hardware, power and your time. */
  selfHostMonthlyCost: number;
}

export type BreakEvenProblem = "not-a-number" | "negative" | "no-hosted-price";
export type BreakEvenVerdict = "hosted-cheaper" | "self-host-cheaper" | "about-equal";

export type BreakEvenResult =
  | {
      ok: true;
      hostedMonthlyCost: number;
      /** Hosted minus self-hosted. Positive means self-hosting costs less. */
      monthlyDifference: number;
      /** Tasks per month at which both routes cost the same. */
      breakEvenTasksPerMonth: number;
      verdict: BreakEvenVerdict;
    }
  | { ok: false; reason: BreakEvenProblem };

export interface BreakEvenField {
  key: keyof BreakEvenInput;
  label: string;
  hint: string;
}

/** Costs within this share of each other count as about equal. */
export const BREAK_EVEN_TIE_PERCENT = 5;

export const BREAK_EVEN_FIELDS: readonly BreakEvenField[] = [
  { key: "hostedCostPerTask", label: "Hosted cost per task (US$)", hint: "From the cost-per-task estimator or the provider's prices." },
  { key: "tasksPerMonth", label: "Tasks per month", hint: "How many times you run this task." },
  { key: "selfHostMonthlyCost", label: "Self-hosting cost per month (US$)", hint: "Hardware spread over its life, power, hosting and the time you spend on upkeep." },
];

/** Example task count so the tool shows a result shape. Money fields start blank on purpose. */
export const BREAK_EVEN_STARTING_VALUES: Record<keyof BreakEvenInput, string> = {
  hostedCostPerTask: "",
  tasksPerMonth: "5000",
  selfHostMonthlyCost: "",
};

export const BREAK_EVEN_PROBLEM_MESSAGES: Record<BreakEvenProblem, string> = {
  "not-a-number": "Enter a number in every box.",
  negative: "Numbers cannot be negative.",
  "no-hosted-price": "Enter the hosted cost per task. It must be more than zero.",
};

export const BREAK_EVEN_VERDICT_MESSAGES: Record<BreakEvenVerdict, string> = {
  "hosted-cheaper": "Hosted is cheaper at this volume. Self-hosting only pays off with more tasks, or if the machine does other work too.",
  "self-host-cheaper": "Self-hosting is cheaper on these numbers, as long as the model is good enough for your task and the machine stays busy.",
  "about-equal": "About equal. Privacy, control and effort will decide it, not price.",
};

/** Compares a month of hosted use with a month of running a model yourself. */
export function calculateBreakEven(input: BreakEvenInput): BreakEvenResult {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value))) return { ok: false, reason: "not-a-number" };
  if (values.some((value) => value < 0)) return { ok: false, reason: "negative" };
  if (input.hostedCostPerTask === 0) return { ok: false, reason: "no-hosted-price" };

  const hostedMonthlyCost = input.hostedCostPerTask * input.tasksPerMonth;
  const monthlyDifference = hostedMonthlyCost - input.selfHostMonthlyCost;
  const breakEvenTasksPerMonth = input.selfHostMonthlyCost / input.hostedCostPerTask;

  const largerCost = Math.max(hostedMonthlyCost, input.selfHostMonthlyCost);
  const differencePercent = largerCost === 0 ? 0 : (Math.abs(monthlyDifference) / largerCost) * 100;

  let verdict: BreakEvenVerdict = "about-equal";
  if (differencePercent > BREAK_EVEN_TIE_PERCENT) {
    verdict = monthlyDifference > 0 ? "self-host-cheaper" : "hosted-cheaper";
  }

  return { ok: true, hostedMonthlyCost, monthlyDifference, breakEvenTasksPerMonth, verdict };
}