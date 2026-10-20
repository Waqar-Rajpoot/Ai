export interface CompareSectionLink {
  id: string;
  label: string;
}

export interface ComparePageType {
  id: string;
  title: string;
  summary: string;
  href: string;
  /** Level badge text, from Blueprint 5.3. */
  levelLabel: string;
  /** Launch scope from Blueprint 5.3. */
  entryLabel: string;
}

export interface LatestTest {
  id: string;
  title: string;
  summary: string;
  href: string;
  levelLabel: string;
  /** Test day, or null until the test battery has run. */
  testedOn: string | null;
  isPublished: boolean;
}

export interface ResultLabel {
  label: string;
  meaning: string;
}

export const COMPARE_SECTION_LINKS: readonly CompareSectionLink[] = [
  { id: "directory", label: "Model directory" },
  { id: "page-types", label: "Page types" },
  { id: "latest-tests", label: "Latest tests" },
  { id: "how-we-test", label: "How we test" },
];

export const DIRECTORY_COLUMNS: readonly string[] = [
  "Model",
  "Maker",
  "API price in and out",
  "Context",
  "BenchLM score",
  "Best for",
  "Review link",
];

export const DIRECTORY_NOTES: readonly string[] = [
  "A score is a shortlist, not a verdict.",
  "Every row carries a verified-on date and a source label.",
  "Introductory-rate end dates sit in the same cell as the price.",
  "Independent and vendor-reported numbers never share a column.",
  "Arena rankings are shown with vote counts and statistical margins.",
];

export const COMPARE_PAGE_TYPES: readonly ComparePageType[] = [
  {
    id: "reviews",
    title: "Reviews",
    summary: "One model per page, scored on the same seven points, with a Who should skip it section and a one-line verdict.",
    href: "/compare/reviews",
    levelLabel: "Levels 2-4",
    entryLabel: "14 reviews at launch",
  },
  {
    id: "best-for",
    title: "Best for",
    summary: "Models ranked by use case, such as coding, writing or students, with a top pick, a runner-up and a budget pick.",
    href: "/compare/best",
    levelLabel: "Levels 2-3",
    entryLabel: "13 roundups at launch",
  },
  {
    id: "head-to-head",
    title: "Head-to-head",
    summary: "Two models, the same ten tasks, one test day, and a direct answer on the winner overall and on cost.",
    href: "/compare/vs",
    levelLabel: "Level 3",
    entryLabel: "1 matchup at launch",
  },
  {
    id: "apps",
    title: "Apps",
    summary: "ChatGPT, Claude, Gemini and Grok compared as consumer products: plans, limits, features and privacy.",
    href: "/compare/apps",
    levelLabel: "Level 2",
    entryLabel: "1 comparison",
  },
  {
    id: "open-vs-closed",
    title: "Open vs closed",
    summary: "Open-weight and hosted models compared on cost, privacy, licence and hardware, for advanced and privacy-minded readers.",
    href: "/compare/open-vs-closed",
    levelLabel: "Level 4",
    entryLabel: "1 explainer",
  },
  {
    id: "alternatives",
    title: "Alternatives",
    summary: "For readers ready to switch: why people switch, the best options, and what you give up.",
    href: "/compare/alternatives",
    levelLabel: "Levels 2-3",
    entryLabel: "One page per tool, list still to be set",
  },
];

/** Article 24 is the only launch test in Blueprint 5.3. testedOn stays null until the test battery has run. */
export const LATEST_TESTS: readonly LatestTest[] = [
  {
    id: "opus-vs-sol",
    title: "Claude Opus 5.5 vs GPT-6.1 Sol: tested on ten everyday tasks",
    summary: "The same ten tasks on one test day, with a winner per task, cost per task and a verdict.",
    href: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol",
    levelLabel: "Level 3",
    testedOn: null,
    isPublished: false,
  },
];

export const LATEST_TESTS_NOTE =
  "Until the test battery has run on the launch models, the model directory shows independent scores only. Every result gets its model version, effort setting and test day when it is published.";

export const SCORECARD_POINTS: readonly string[] = [
  "Accuracy on factual questions, with sources checked by hand",
  "Reasoning and maths on a fixed set of problems",
  "Writing and instruction following, with strict format limits",
  "Coding and tool use on a small repository task",
  "Long documents: a PDF summary and a question about a distant page",
  "Cost per task, not only price per token",
  "Privacy and limits: training settings, data retention and free-plan caps",
];

export const RESULT_LABELS: readonly ResultLabel[] = [
  { label: "Tested by us", meaning: "We ran it, and we publish the model version, settings and date." },
  { label: "Independent third party", meaning: "An outside group ran it and publishes its method." },
  { label: "Vendor-reported", meaning: "The maker's own announcement. A lead to check, kept apart from independent scores." },
];

export const INDEPENDENCE_PROMISE = "Payment never changes a score or verdict. Affiliate and sponsor status is never a scoring input.";