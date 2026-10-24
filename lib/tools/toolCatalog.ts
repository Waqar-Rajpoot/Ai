export type ToolLevel = 1 | 2 | 3 | 4;

export const TOOL_LEVELS: readonly ToolLevel[] = [1, 2, 3, 4];

export type ToolCategory = "calculators" | "quiz-and-library" | "checklists-and-downloads";

/** "soon" shows the card without a link, so a tool can be listed before its page is built. */
export type ToolStatus = "live" | "soon";

export interface ToolGuideLink {
  href: string;
  label: string;
}

export interface ToolEntry {
  id: string;
  name: string;
  route: string;
  category: ToolCategory;
  /** Every level the tool suits. A tool can appear under several levels. */
  levels: readonly ToolLevel[];
  status: ToolStatus;
  summary: string;
  youEnter: string;
  youGet: string;
  timeToUse: string;
  /** What the result is built on, in plain words. */
  builtOn: string;
  /** Articles and data pages that explain the result. */
  guides: readonly ToolGuideLink[];
  /** Ids of tools that work well after or alongside this one. */
  pairsWith: readonly string[];
  /** Extra words the search box should match. */
  keywords: readonly string[];
}

export const LEVEL_NAMES: Record<ToolLevel, string> = {
  1: "Foundations",
  2: "Practitioner",
  3: "Power user and builder",
  4: "Expert",
};

/** Who each level is for (Blueprint 1.3). */
export const LEVEL_BLURBS: Record<ToolLevel, string> = {
  1: "Complete beginners, parents and students taking first steps.",
  2: "Students, office workers, job seekers and small business owners using AI for real tasks.",
  3: "Freelancers, analysts, developers and team leads choosing models and controlling cost.",
  4: "Developers, researchers, IT and compliance leads reading benchmarks, self-hosting and assessing risk.",
};

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  calculators: "Calculators",
  "quiz-and-library": "Quiz and library",
  "checklists-and-downloads": "Checklists and downloads",
};

/** All tools. The order here is the order shown on the page. */
export const TOOLS: readonly ToolEntry[] = [
  {
    id: "which-ai-fits-me",
    name: "Which AI fits me?",
    route: "/tools/which-ai-fits-me",
    category: "quiz-and-library",
    levels: [1],
    status: "live",
    summary: "Three questions about your task, budget and privacy needs suggest a type of model to look at first.",
    youEnter: "Your main task, your budget and how private your data needs to be.",
    youGet: "A suggested type of model, with links to matching reviews.",
    timeToUse: "About 1 minute",
    builtOn: "Hand-written rules. No AI is used to pick the result.",
    guides: [
      { href: "/compare/best/by-job", label: "Best AI model right now, by job" },
      { href: "/compare/models", label: "Model directory" },
    ],
    pairsWith: ["subscription-cost-calculator"],
    keywords: ["quiz", "recommend", "choose", "model", "chatbot", "budget", "privacy"],
  },
  {
    id: "subscription-cost-calculator",
    name: "Subscription cost calculator",
    route: "/tools/subscription-cost-calculator",
    category: "calculators",
    levels: [1],
    status: "live",
    summary: "Add up what your AI plans cost each month and each year, to see whether you pay for more than you use.",
    youEnter: "The plans you pay for or are thinking about, and their monthly prices.",
    youGet: "A monthly total and a yearly total.",
    timeToUse: "About 1 minute",
    builtOn: "Simple arithmetic on the prices you type in.",
    guides: [
      { href: "/prices/plans", label: "Consumer plan table" },
      { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" },
      { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI" },
    ],
    pairsWith: ["which-ai-fits-me"],
    keywords: ["plan", "price", "monthly", "yearly", "cost", "chatgpt", "claude", "gemini", "subscription"],
  },
  {
    id: "prompt-library",
    name: "Prompt library",
    route: "/tools/prompt-library",
    category: "quiz-and-library",
    levels: [1, 2, 3],
    status: "live",
    summary: "Copy-ready prompts for study, work, home and money. Each one shows the level it suits, so you can start simple and grow.",
    youEnter: "A task or a level to filter by, or a word to search for.",
    youGet: "A prompt to copy, with blanks to fill in.",
    timeToUse: "About 1 minute",
    builtOn: "Prompts written by hand and labelled by level.",
    guides: [
      { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
      { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
    ],
    pairsWith: ["cheat-sheets"],
    keywords: ["prompt", "template", "copy", "study", "work", "email", "resume", "money", "write"],
  },
  {
    id: "token-estimator",
    name: "Token and context estimator",
    route: "/tools/token-estimator",
    category: "calculators",
    levels: [2],
    status: "live",
    summary: "Turn a word count into a rough token count, to see how a document might fit a model's context window.",
    youEnter: "A word count.",
    youGet: "A rough token count, with a warning that it is an estimate.",
    timeToUse: "Under 1 minute",
    builtOn: "A fixed words-to-tokens rule of thumb.",
    guides: [
      { href: "/learn/power-user/context-windows-tokens-memory", label: "Context windows, tokens and memory explained" },
    ],
    pairsWith: ["api-cost-calculator"],
    keywords: ["token", "context", "window", "words", "document", "length", "limit"],
  },
  {
    id: "api-cost-calculator",
    name: "API cost calculator",
    route: "/tools/api-cost-calculator",
    category: "calculators",
    levels: [3],
    status: "live",
    summary: "Turn tokens per task and tasks per month into a monthly estimate for a model you pick from our price table.",
    youEnter: "Tokens per task, tasks per month and a price row from our API table.",
    youGet: "A monthly estimate.",
    timeToUse: "About 2 minutes",
    builtOn: "Dated price rows from our API price table.",
    guides: [
      { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
      { href: "/prices/api", label: "API price and cost-per-task table" },
    ],
    pairsWith: ["token-estimator"],
    keywords: ["api", "cost", "price", "tokens", "monthly", "estimate", "budget", "input", "output"],
  },
  {
    id: "local-model-memory",
    name: "Local model memory estimator",
    route: "/tools/local-model-memory",
    category: "calculators",
    levels: [4],
    status: "live",
    summary: "Estimate how much memory a model needs to run on your own computer, from its size and precision.",
    youEnter: "The number of parameters and the bytes per parameter.",
    youGet: "The memory needed for the model's weights.",
    timeToUse: "About 1 minute",
    builtOn: "Simple arithmetic: parameters times bytes per parameter.",
    guides: [
      { href: "/learn/expert/run-ai-on-your-own-computer", label: "Run an AI model on your own computer" },
      { href: "/compare/open-vs-closed", label: "Open-weight vs closed models" },
    ],
    pairsWith: [],
    keywords: ["local", "memory", "ram", "vram", "gpu", "quantization", "open weight", "parameters", "self-host"],
  },
  {
    id: "benchmark-checklist",
    name: "Benchmark reading checklist",
    route: "/tools/benchmark-checklist",
    category: "checklists-and-downloads",
    levels: [4],
    status: "live",
    summary: "Ten questions to ask before you trust a benchmark score in a headline or a launch post.",
    youEnter: "Nothing to type. Read each question against the score you are checking.",
    youGet: "A repeatable way to tell a solid result from a weak one.",
    timeToUse: "About 5 minutes",
    builtOn: "Questions drawn from our guide to reading benchmarks.",
    guides: [
      { href: "/learn/expert/how-to-read-ai-benchmark", label: "How to read an AI benchmark" },
      { href: "/prices/benchmarks", label: "Benchmark digest" },
    ],
    pairsWith: [],
    keywords: ["benchmark", "score", "leaderboard", "vendor", "independent", "contamination", "evaluation"],
  },
  {
    id: "ai-safety-checklist",
    name: "AI safety checklist",
    route: "/tools/ai-safety-checklist",
    category: "checklists-and-downloads",
    levels: [1],
    status: "live",
    summary: "Short lists of safe habits for individuals, schools and small businesses. Print one and keep it by the desk.",
    youEnter: "Choose the list that fits you.",
    youGet: "A printable checklist.",
    timeToUse: "About 3 minutes",
    builtOn: "Hand-written checklists.",
    guides: [
      { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
      { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes" },
    ],
    pairsWith: ["cheat-sheets"],
    keywords: ["safety", "privacy", "school", "business", "print", "scam", "checklist", "family"],
  },
  {
    id: "cheat-sheets",
    name: "Cheat sheets and templates",
    route: "/tools/cheat-sheets",
    category: "checklists-and-downloads",
    levels: [1, 2, 3],
    status: "live",
    summary: "One-page downloads: the prompt formula, a model-choice sheet, a resume prompt template and an agent permission checklist.",
    youEnter: "Choose a sheet.",
    youGet: "A PDF to download or print.",
    timeToUse: "Under 1 minute",
    builtOn: "Hand-written one-pagers.",
    guides: [
      { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
      { href: "/learn/practitioner/ai-resume-and-interview-prep", label: "Resume and interview prep with AI" },
      { href: "/learn/power-user/ai-agents-explained", label: "AI agents explained" },
    ],
    pairsWith: ["prompt-library"],
    keywords: ["download", "pdf", "print", "template", "resume", "agent", "permission", "formula", "model choice"],
  },
];