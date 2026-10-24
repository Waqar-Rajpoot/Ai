import type { ScoreSortKey } from "./benchmarkTypes";

export interface GlossaryTerm {
  term: string;
  meaning: string;
}

export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface DifferenceRow {
  id: string;
  case: string;
  makerSays: string;
  independentSays: string;
  why: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SourceLink {
  label: string;
  href: string;
  kind: "Source page" | "Maker page" | "Third-party report";
}

export interface GapExample {
  id: string;
  label: string;
  values: { scoreA: string; marginA: string; scoreB: string; marginB: string };
}

export const BENCHMARKS_LIMITS_NOTE =
  "A score is a shortlist, not a verdict. This page describes published results. It is not buying advice, and we are paid nothing to place a model higher or lower.";

export const SORT_OPTIONS: readonly { id: ScoreSortKey; label: string }[] = [
  { id: "score", label: "Highest score first" },
  { id: "name", label: "Model name, A to Z" },
];

/** The 14 models on the model directory. Names must match the model names in the score records. */
export const DIRECTORY_MODELS: readonly string[] = [
  "Claude Opus 5.5",
  "GPT-6.1 Sol",
  "GPT-6 Astra",
  "Claude Fable 5.1",
  "Claude Sonnet 5.5",
  "Gemini 4 Argon",
  "Gemini 3.8 Flash",
  "Claude Haiku 5.5",
  "GPT-6 Luna",
  "Grok 4.7",
  "MiMo-V2.6-Pro",
  "Kimi K3",
  "Qwen3.8 Max",
  "DeepSeek V4.1 Flash",
];

export const SHORT_ANSWER: readonly string[] = [
  "A benchmark score helps you pick which models to test. It does not tell you which one is best for your work.",
  "Independent scores and vendor-reported scores sit in separate tables and are never mixed or averaged.",
  "A score belongs to a setting. A \"Max effort\" run and a \"High effort\" run are different entries.",
  "If two scores' margins overlap, treat the models as level. Use the gap checker below.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "curious",
    title: "I just want to know which AI is best",
    who: "Everyday users and beginners",
    points: [
      "No single model wins every test. The leader changes with the benchmark.",
      "Look at the sections side by side: a model that leads one table can trail in another.",
      "Treat a close race as a tie, and pick on price, features and privacy instead.",
    ],
    link: { href: "/compare/best", label: "See best-for roundups" },
  },
  {
    id: "choosing",
    title: "I am choosing a model for work",
    who: "Freelancers, analysts, team leads and builders",
    points: [
      "Use scores to shortlist two or three models, not to decide.",
      "Run your own ten tasks on the shortlist and compare cost per task.",
      "Check the retirements tracker before you build on a model.",
    ],
    link: { href: "/learn/power-user#test-set", label: "Build your own test set" },
  },
  {
    id: "reading",
    title: "I read benchmarks closely",
    who: "Developers, researchers and compliance leads",
    points: [
      "Compare versions, effort settings, margins and who ran the test.",
      "Read vendor tables as claims. Look for an independent number on the same task.",
      "Watch for contamination and saturation on older benchmarks.",
    ],
    link: { href: "/learn/expert/how-to-read-ai-benchmark", label: "Read the full guide" },
  },
];

export const TERMS: readonly GlossaryTerm[] = [
  { term: "Independent score", meaning: "A result produced by a group with no stake in the model, using a method it publishes." },
  { term: "Vendor-reported", meaning: "A number the model's maker published about its own model, usually on benchmarks the maker chose." },
  { term: "Composite score", meaning: "One number built from many tests. The weighting decides what it rewards, so check what is inside." },
  { term: "Evidence label", meaning: "BenchLM's tag for how much independent evidence backs a score: Supported or Estimated." },
  { term: "Margin or interval", meaning: "The range a score could plausibly sit in. A ±9 rating means the true value may be 9 points either way." },
  { term: "Arena rating", meaning: "A rating built from people voting between two anonymous answers. It reflects preference, not correctness." },
  { term: "Effort setting", meaning: "How much thinking the model was allowed. Higher settings often score more and cost more." },
  { term: "Pass rate", meaning: "The share of tasks a model completes correctly. The task set decides what that means." },
  { term: "Harness or setup", meaning: "The tools, prompts, retries and time limits around the model. Different setups give different scores for the same model." },
  { term: "Contamination", meaning: "When test questions or answers leaked into a model's training data, which inflates its score." },
  { term: "Saturation", meaning: "When most top models score near the maximum, so the test can no longer tell them apart." },
  { term: "Version", meaning: "Benchmarks and indexes get rebuilt. A score without its version cannot be compared with another." },
];

export const DIFFERENCE_ROWS: readonly DifferenceRow[] = [
  {
    id: "terminal-bench",
    case: "Terminal-Bench 4.0, Claude Opus 5.5",
    makerSays: "66.4%, reported by Anthropic and copied into Google's table.",
    independentSays: "About 59.6%, measured by Artificial Analysis with a different setup.",
    why: "The setups differ, so the two numbers do not compare. Neither is wrong on its own terms.",
  },
  {
    id: "wrong-facts",
    case: "Wrong or invented facts",
    makerSays: "7.7% of answers had a factual error on hard flagged prompts (GPT-6.1 Sol at low effort, reported by OpenAI).",
    independentSays: "A 54% hallucination rate for GPT-6.1 Sol on Artificial Analysis's own test (Argon 15%, GPT-6 Astra 51%).",
    why: "Different questions and different definitions of an error. A low number on one test says little about the other.",
  },
];

export const WHY_SCORES_DISAGREE: readonly string[] = [
  "Different questions: each benchmark samples a different slice of work.",
  "Different settings: effort level, tools, retries and time limits all move a score.",
  "Different versions and dates: benchmarks and models both change.",
  "Different runners: a maker knows its own model best, and chooses which benchmarks to show.",
  "Different scoring rules: the same answer can pass under one harness and fail under another.",
  "Different sample sizes: few questions or votes mean wide margins.",
  "Contamination and saturation: old tests can be leaked or maxed out.",
  "Different weights: a composite rewards whatever its builders chose to count.",
];

export const READING_QUESTIONS: readonly string[] = [
  "Who ran the test: the maker or an independent group?",
  "Which version of the benchmark, which model version and what date?",
  "What effort or reasoning setting was used?",
  "Were tools, retries or fallbacks allowed, and the same for every model?",
  "What does it actually measure, and is that close to your task?",
  "How big is the margin, and how many questions or votes sit behind it?",
  "Do the margins of the models you are comparing overlap?",
  "Could the questions have leaked into training, or is the test close to maxed out?",
  "Does a second independent source agree?",
  "Does it report cost and speed as well as accuracy?",
];

export const UPDATE_STEPS: readonly string[] = [
  "Open each independent source and record every score for the 14 directory models, with its date, version and effort setting.",
  "Note any model that appears, drops out or changes rank, and say why if the source explains it.",
  "Read each new maker announcement within 48 hours of a release and add its table to the vendor section.",
  "Where two sources disagree, use the source's own page, note the conflict and add a line to the changelog.",
  "Mark any row older than 14 days as stale, and replace it at the next check.",
  "Replace third-party reads with the source's own page, and record the check date as the verified-on date.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Which AI model is the best?", answer: "It depends on the job. The leader changes between tables, and close scores are often ties. Use the scores to build a shortlist, then test it on your own tasks." },
  { question: "Why are vendor-reported scores in a separate table?", answer: "A maker chooses the benchmarks, the settings and the competitors it shows. Its numbers are useful claims, but they should never share a column with independent results." },
  { question: "Can I trust a score from the model's own maker?", answer: "Treat it as a claim. It may be accurate, but it was produced by the party with the most to gain. Look for an independent number on the same task." },
  { question: "Why do the same models rank differently on different sites?", answer: "Each source measures something different, with its own tasks, settings, weights and version. That is why we show them side by side, not as one ranking." },
  { question: "What does ±9 mean?", answer: "It is the margin: the score could plausibly be 9 points higher or lower. If two models' ranges overlap, you cannot say which is ahead." },
  { question: "What is the difference between Supported and Estimated?", answer: "These are BenchLM's evidence labels. Supported means more independent evidence sits behind the score. Estimated means less." },
  { question: "Do you run your own tests?", answer: "Not yet on this page. Until our own test results are published on the reviews, the directory shows independent scores only." },
  { question: "How often is this page updated?", answer: "Weekly. Each row shows the date of its snapshot, and rows older than 14 days are flagged." },
];

export const GAP_EXAMPLES: readonly GapExample[] = [
  { id: "close", label: "Two close creative-writing ratings", values: { scoreA: "1519", marginA: "20", scoreB: "1517", marginB: "17" } },
  { id: "clear", label: "A clear gap in text ratings", values: { scoreA: "1525", marginA: "9", scoreB: "1484", marginB: "9" } },
];

export const SOURCE_LINKS: readonly SourceLink[] = [
  { label: "BenchLM", href: "https://benchlm.ai/", kind: "Source page" },
  { label: "Arena leaderboard", href: "https://arena.ai/leaderboard", kind: "Source page" },
  { label: "Artificial Analysis", href: "https://artificialanalysis.ai/", kind: "Source page" },
  { label: "OpenAI: Introducing GPT-6.1 Sol", href: "https://openai.com/index/introducing-gpt-6-1-sol/", kind: "Maker page" },
  { label: "Google DeepMind: Gemini models", href: "https://deepmind.google/models/gemini/", kind: "Maker page" },
];

export const THIRD_PARTY_LINKS: readonly SourceLink[] = [
  { label: "BenchLM: leaderboard, October 2026", href: "https://benchlm.ai/", kind: "Third-party report" },
  { label: "BenchLM: ChatGPT vs Claude vs Gemini (Arena scores of Oct 12)", href: "https://benchlm.ai/blog/posts/chatgpt-vs-claude-vs-gemini-2026", kind: "Third-party report" },
  { label: "Trending Topics: Gemini 4 and the Artificial Analysis index", href: "https://www.trendingtopics.eu/gemini-4-artificial-analysis-en/", kind: "Third-party report" },
  { label: "Trending Topics: Gemini 4 Argon benchmarks", href: "https://www.trendingtopics.eu/gemini-4-argon-google-anthropic-openai/", kind: "Third-party report" },
  { label: "Emergent: Gemini 4 Argon benchmarks and sources", href: "https://emergent.sh/learn/gemini-4-argon-benchmarks", kind: "Third-party report" },
  { label: "IQ Metrics: what the Artificial Analysis index measures", href: "https://iqmetrics.org/news/artificial-analysis-intelligence-index-explained/", kind: "Third-party report" },
  { label: "Tech Insider: Gemini 4 Argon, Sonnet 5.5 and the AA index", href: "https://tech-insider.org/gemini-4-argon-price-doubles-sonnet-5-5-holds-2026/", kind: "Third-party report" },
];

export const RELATED_LINKS: readonly { id: string; title: string; reason: string; href: string }[] = [
  { id: "directory", title: "Model directory", reason: "Prices, context and scores for the 14 models.", href: "/compare/models" },
  { id: "api", title: "API prices and cost per task", reason: "What each model costs to run.", href: "/prices/api" },
  { id: "retirements", title: "Retirements tracker", reason: "Which models are being switched off, and when.", href: "/prices/retirements" },
  { id: "checklist", title: "Benchmark reading checklist", reason: "The ten questions as a printable list.", href: "/tools/benchmark-checklist" },
];