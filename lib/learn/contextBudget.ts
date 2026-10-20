import { CONTEXT_TIGHT_PERCENT } from "./learnConstants";

export interface ContextBudgetInput {
  windowTokens: number;
  instructionTokens: number;
  documentTokens: number;
  historyTokens: number;
  replyTokens: number;
}

export type ContextBudgetStatus = "fits" | "tight" | "over";
export type ContextBudgetProblem = "not-a-number" | "negative" | "no-window";

export type ContextBudgetResult =
  | { ok: true; usedTokens: number; remainingTokens: number; percentUsed: number; status: ContextBudgetStatus }
  | { ok: false; reason: ContextBudgetProblem };

export interface ContextBudgetField {
  key: keyof ContextBudgetInput;
  label: string;
  hint: string;
}

export const CONTEXT_FIELDS: readonly ContextBudgetField[] = [
  { key: "windowTokens", label: "Context window (tokens)", hint: "Find it in the model directory." },
  { key: "instructionTokens", label: "Instructions", hint: "Your prompt, role and rules." },
  { key: "documentTokens", label: "Documents and files", hint: "Anything you paste or upload." },
  { key: "historyTokens", label: "Chat history", hint: "Earlier messages the tool keeps sending." },
  { key: "replyTokens", label: "Space for the reply", hint: "Leave room for the answer." },
];

/** Example sizes so the tool shows a result shape. The window starts blank on purpose. */
export const CONTEXT_STARTING_VALUES: Record<keyof ContextBudgetInput, string> = {
  windowTokens: "",
  instructionTokens: "500",
  documentTokens: "20000",
  historyTokens: "4000",
  replyTokens: "2000",
};

export const CONTEXT_PROBLEM_MESSAGES: Record<ContextBudgetProblem, string> = {
  "not-a-number": "Enter a number in every box.",
  negative: "Numbers cannot be negative.",
  "no-window": "The context window must be more than zero.",
};

export const CONTEXT_STATUS_MESSAGES: Record<ContextBudgetStatus, string> = {
  fits: "Fits, with room to spare.",
  tight: "Tight. Trim the history, or retrieve only the passages you need.",
  over: "Over the limit. The tool may cut text or refuse the request. Remove or retrieve less.",
};

/** Adds up everything that must fit in the window and reports how full it is. */
export function calculateContextBudget(input: ContextBudgetInput): ContextBudgetResult {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value))) return { ok: false, reason: "not-a-number" };
  if (values.some((value) => value < 0)) return { ok: false, reason: "negative" };
  if (input.windowTokens === 0) return { ok: false, reason: "no-window" };

  const usedTokens = input.instructionTokens + input.documentTokens + input.historyTokens + input.replyTokens;
  const percentUsed = (usedTokens / input.windowTokens) * 100;

  let status: ContextBudgetStatus = "fits";
  if (usedTokens > input.windowTokens) status = "over";
  else if (percentUsed >= CONTEXT_TIGHT_PERCENT) status = "tight";

  return { ok: true, usedTokens, remainingTokens: input.windowTokens - usedTokens, percentUsed, status };
}