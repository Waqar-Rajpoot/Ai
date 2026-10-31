import type { CostScenario, MonthlyPlan, PriceTier, SourceLabel } from "./reviewTypes";

/** Date of the directory table (prices, context, directory scores). */
export const DIRECTORY_SNAPSHOT_DATE = "2026-10-17";

export const PRICE_TIER_LIMITS = {
  budgetMaxInputPrice: 1,
  midPricedMaxInputPrice: 5,
} as const;

export const PRICE_TIER_LABELS: Readonly<Record<PriceTier, string>> = {
  budget: "Budget",
  "mid-priced": "Mid-priced",
  premium: "Premium",
};

export const SOURCE_LABEL_TEXT: Readonly<Record<SourceLabel, string>> = {
  tested: "Tested by us",
  independent: "Independent third party",
  "vendor-reported": "Vendor-reported",
};

/** Models counted as open-weight or local in the directory. */
export const OPEN_WEIGHT_MODEL_IDS: readonly string[] = [
  "mimo-v2-6-pro",
  "kimi-k3",
  "qwen3-8-max-27b",
];

export const UNCONFIRMED_CONTEXT_LABEL = "Not confirmed";
export const STRONG_SCORE_THRESHOLD = 80;
/** Fewer source families than this is treated as thin evidence. */
export const THIN_EVIDENCE_SOURCE_FAMILIES = 3;
/** Top score on the scorecard. Confirm it matches the "How we test" page. */
export const SCORECARD_MAX_SCORE = 10;
export const MAX_ALTERNATIVES = 3;
export const TOKENS_PER_MILLION = 1_000_000;
export const TASKS_FOR_VOLUME_ESTIMATE = 1_000;
export const CODING_TASK_SCENARIO_ID = "coding-task";

/** Illustrative workloads. Assumptions, not measured token counts. */
export const COST_SCENARIOS: readonly CostScenario[] = [
  {
    id: "chat-reply",
    label: "Short chat reply",
    description: "About 1,000 tokens in and 500 tokens out.",
    inputTokens: 1_000,
    outputTokens: 500,
  },
  {
    id: "document-summary",
    label: "Long document summary",
    description: "About 20,000 tokens in and 1,000 tokens out.",
    inputTokens: 20_000,
    outputTokens: 1_000,
  },
  {
    id: CODING_TASK_SCENARIO_ID,
    label: "Coding task",
    description: "About 50,000 tokens in and 8,000 tokens out.",
    inputTokens: 50_000,
    outputTokens: 8_000,
  },
];

/** Illustrative monthly usage levels. */
export const MONTHLY_PLANS: readonly MonthlyPlan[] = [
  {
    id: "light",
    label: "Light use",
    description: "Solo user or small script: 2M tokens in, 0.5M out per month.",
    inputTokens: 2_000_000,
    outputTokens: 500_000,
  },
  {
    id: "team",
    label: "Team use",
    description: "Small team or one product feature: 20M in, 5M out per month.",
    inputTokens: 20_000_000,
    outputTokens: 5_000_000,
  },
  {
    id: "production",
    label: "Production",
    description: "Busy app: 200M in, 50M out per month.",
    inputTokens: 200_000_000,
    outputTokens: 50_000_000,
  },
];

export const REVIEW_SECTION_LINKS: readonly { id: string; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "skip", label: "Who it suits" },
  { id: "price", label: "Price and cost" },
  { id: "ranking", label: "How it ranks" },
  { id: "evidence", label: "Independent evidence" },
  { id: "versus", label: "Head to head" },
  { id: "tests", label: "Our test run" },
  { id: "safety", label: "Safety and limits" },
  { id: "alternatives", label: "Alternatives" },
  { id: "verdict", label: "Verdict" },
  { id: "dates", label: "Dates and labels" },
];

export const REVIEW_SITE_PATHS = {
  reviewsHub: "/compare/reviews",
  compareHub: "/compare",
  headToHead: "/compare/vs",
  alternativesHub: "/compare/alternatives",
  howWeTest: "/about/how-we-test",
  independence: "/about/independence",
  corrections: "/about/corrections",
  privacyMatrix: "/prices/privacy",
  consumerPlans: "/prices/plans",
} as const;