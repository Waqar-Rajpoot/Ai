import { TOKENS_PER_WORD, WORDS_PER_PAGE } from "./apiPricesConstants";

export interface StandardTask {
  id: string;
  label: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
}

export const CUSTOM_TASK_ID = "custom";
export const DEFAULT_TASK_ID = "summary-10";

/** Our own size assumptions, based on about 500 words per page and 4/3 tokens per word. */
const TOKENS_PER_PAGE = Math.round(WORDS_PER_PAGE * TOKENS_PER_WORD);

export const STANDARD_TASKS: readonly StandardTask[] = [
  { id: "chat", label: "Quick chat question", description: "A short question and a short answer.", inputTokens: 500, outputTokens: 400 },
  { id: "email", label: "Draft or polish an email", description: "Paste a draft, get a rewrite.", inputTokens: 800, outputTokens: 300 },
  { id: "support", label: "Support reply with a help article", description: "A customer message plus one help-centre article.", inputTokens: 4000, outputTokens: 350 },
  { id: "summary-10", label: "Summarize a 10-page document", description: "About 10 pages in, a one-page summary out.", inputTokens: 10 * TOKENS_PER_PAGE, outputTokens: 600 },
  { id: "report-100", label: "Summarize a 100-page report", description: "About 100 pages in, a two-page summary out.", inputTokens: 100 * TOKENS_PER_PAGE, outputTokens: 1200 },
  { id: "codebase", label: "Review a large codebase in one request", description: "A very long prompt that crosses several price thresholds.", inputTokens: 300_000, outputTokens: 8000 },
];

export function findStandardTask(taskId: string): StandardTask | undefined {
  return STANDARD_TASKS.find((task) => task.id === taskId);
}