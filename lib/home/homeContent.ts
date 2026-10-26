export interface HomeLink {
  href: string;
  label: string;
}

export interface Pillar {
  id: string;
  title: string;
  tagline: string;
  points: readonly string[];
  link: HomeLink;
}

export interface ReaderPath {
  id: string;
  title: string;
  description: string;
  picks: readonly HomeLink[];
}

export type StoryKind = "Release post" | "Price change" | "Weekly roundup" | "Explainer" | "Data page";

export interface Story {
  id: string;
  kind: StoryKind;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  publishedOn: string;
  href: string;
}

export interface GuideLink {
  /** Article number from the Blueprint's launch list. */
  number: number;
  title: string;
  href: string;
  levelLabel: string;
  kind: string;
}

export interface FreeTool {
  id: string;
  title: string;
  description: string;
  levelLabel: string;
  href: string;
}

export interface PriceHubPage {
  title: string;
  summary: string;
  href: string;
  updated: string;
  levelLabel: string;
}

export interface SocietyCard {
  title: string;
  description: string;
  href: string;
}

export interface TrustPoint {
  title: string;
  description: string;
  link: HomeLink;
}

/** How many models the home page snapshot shows. */
export const HOME_TOP_MODEL_COUNT = 5;
/** How many upcoming dates the home page lists. */
export const HOME_DATES_TO_WATCH_COUNT = 5;

export const POPULAR_SEARCHES: readonly HomeLink[] = [
  { href: "/compare/best/coding", label: "Best AI for coding" },
  { href: "/compare/apps", label: "ChatGPT vs Claude vs Gemini" },
  { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" },
  { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
  { href: "/learn/foundations/what-is-ai", label: "What is AI?" },
  { href: "/prices/api", label: "AI API prices" },
];

export const PILLARS: readonly Pillar[] = [
  {
    id: "learn",
    title: "Learn",
    tagline: "From your first prompt to expert topics",
    points: ["Guides in four levels, each with a short self-check", "Copy-ready prompts and a plain-English glossary", "Free tools that run in your browser"],
    link: { href: "/learn", label: "Start learning" },
  },
  {
    id: "compare",
    title: "Compare",
    tagline: "Dated tests, reviews and price tables",
    points: ["Reviews with a seven-point scorecard", "Best-for roundups and head-to-head tests", "Prices, limits, privacy and benchmarks in one place"],
    link: { href: "/compare", label: "Compare models" },
  },
  {
    id: "stay-current",
    title: "Stay current",
    tagline: "Short, dated explainers on what just changed",
    points: ["Release posts within 48 hours", "A weekly roundup, also sent as the newsletter", "A plain-English EU AI Act timeline"],
    link: { href: "/news", label: "Read the news" },
  },
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "beginners",
    title: "Beginners",
    description: "New to AI and want the basics without jargon.",
    picks: [
      { href: "/learn/foundations/what-is-ai", label: "What is AI? A plain-English guide" },
      { href: "/learn/foundations/how-ai-chatbots-work", label: "How AI chatbots work, without math" },
      { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI: what you actually get" },
    ],
  },
  {
    id: "students",
    title: "Students",
    description: "Learn faster, stay honest, and check what AI tells you.",
    picks: [
      { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
      { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
      { href: "/compare/best/students", label: "Best AI tools for students" },
    ],
  },
  {
    id: "parents-teachers",
    title: "Parents and teachers",
    description: "Keep children safe and know where AI helps in class.",
    picks: [
      { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes: how to spot them" },
      { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
      { href: "/society/ai-in-education", label: "AI in education: tutor, teacher aid or shortcut?" },
    ],
  },
  {
    id: "job-seekers",
    title: "Job seekers",
    description: "Write a stronger resume and prepare for interviews.",
    picks: [
      { href: "/learn/practitioner/ai-resume-and-interview-prep", label: "Resume and interview prep with AI" },
      { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts (20 examples)" },
      { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs? What surveys say" },
    ],
  },
  {
    id: "office-freelancers",
    title: "Office workers and freelancers",
    description: "Save hours on email, documents and research.",
    picks: [
      { href: "/learn/practitioner/ai-for-email-and-writing-at-work", label: "How to use AI for email and writing at work" },
      { href: "/learn/practitioner/summarize-pdf-with-ai", label: "How to summarize a PDF with AI" },
      { href: "/compare/best/by-job", label: "Best AI model right now, by job" },
    ],
  },
  {
    id: "small-business",
    title: "Small business owners",
    description: "Pick the right plan, control costs and know the rules.",
    picks: [
      { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" },
      { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
      { href: "/learn/expert/eu-ai-act-for-everyday-users", label: "The EU AI Act for small businesses" },
    ],
  },
];

/** Hand-written stories. Replace each with a real post when the news pages exist. */
export const LATEST_STORIES: readonly Story[] = [
  {
    id: "gemini-4-argon-public",
    kind: "Release post",
    title: "Gemini 4 Argon is now public: what changed and should you care?",
    summary:
      "Google opened its new model across the Gemini API, AI Studio and the Gemini app on October 13. It leads the Arena text chart, but the introductory price ends on November 30, and independent tests show it writing far more output tokens per task than some rivals.",
    publishedOn: "2026-10-13",
    href: "/news/releases/gemini-4-argon",
  },
  {
    id: "weekly-oct-23",
    kind: "Weekly roundup",
    title: "Weekly roundup: OpenAI retires GPT-4 and o1, and Argon tops the Arena",
    summary:
      "The week's releases, price changes and policy news in one read: OpenAI's biggest legacy shutdown lands on October 23, and Claude Haiku 5.5 launched with a price step above 100K tokens.",
    publishedOn: "2026-10-23",
    href: "/news/weekly/2026-10-23",
  },
  {
    id: "sonnet-cache-price",
    kind: "Price change",
    title: "Claude Sonnet 5.5 cache reads cut in half",
    summary: "Anthropic halved Sonnet 5.5's cache-read price on October 7, the day Claude Haiku 5.5 launched. Heavy cached workloads cost less.",
    publishedOn: "2026-10-07",
    href: "/prices/api",
  },
  {
    id: "retirements-tracker",
    kind: "Data page",
    title: "The retirements tracker: which models and features are ending",
    summary: "More than 50 retirements across the major platforms, with dates, successors and a tool to check your own model IDs.",
    publishedOn: "2026-10-21",
    href: "/prices/retirements",
  },
  {
    id: "privacy-matrix",
    kind: "Data page",
    title: "Which AI chatbots train on your chats?",
    summary: "A matrix of training, retention, deletion and data location for eleven services, with steps to turn off sharing.",
    publishedOn: "2026-10-23",
    href: "/prices/privacy",
  },
];

/** The ten articles to write first (Blueprint 7.2). */
export const POPULAR_GUIDES: readonly GuideLink[] = [
  { number: 1, title: "What is AI? A plain-English guide", href: "/learn/foundations/what-is-ai", levelLabel: "Level 1", kind: "Guide" },
  { number: 3, title: "How to write better prompts (20 examples)", href: "/learn/foundations/write-better-prompts", levelLabel: "Level 1", kind: "Guide" },
  { number: 5, title: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot", levelLabel: "Level 1", kind: "Safety" },
  { number: 7, title: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers", levelLabel: "Level 2", kind: "Guide" },
  { number: 13, title: "ChatGPT vs Claude vs Gemini vs Grok", href: "/compare/apps", levelLabel: "Level 2", kind: "Comparison" },
  { number: 14, title: "Best AI model right now, by job", href: "/compare/best/by-job", levelLabel: "Level 2", kind: "Roundup" },
  { number: 17, title: "Context windows, tokens and memory explained", href: "/learn/power-user/context-windows-tokens-memory", levelLabel: "Level 3", kind: "Explainer" },
  { number: 18, title: "Reasoning models and effort settings", href: "/learn/power-user/reasoning-models-effort-settings", levelLabel: "Level 3", kind: "Explainer" },
  { number: 22, title: "AI API pricing for non-engineers", href: "/learn/power-user/ai-api-pricing-for-non-engineers", levelLabel: "Level 3", kind: "Guide" },
  { number: 24, title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks", href: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol", levelLabel: "Level 3", kind: "Head-to-head" },
];

export const BEST_FOR_LINKS: readonly HomeLink[] = [
  { href: "/compare/best/overall", label: "Overall" },
  { href: "/compare/best/coding", label: "Coding" },
  { href: "/compare/best/writing", label: "Writing" },
  { href: "/compare/best/agents", label: "Agents" },
  { href: "/compare/best/value", label: "Value" },
  { href: "/compare/best/cheap-and-fast", label: "Cheap and fast" },
  { href: "/compare/best/open-weights", label: "Open weights" },
  { href: "/compare/best/local", label: "Local" },
  { href: "/compare/best/students", label: "Students" },
  { href: "/compare/best/small-business", label: "Small business" },
  { href: "/compare/best/image", label: "Image" },
  { href: "/compare/best/video", label: "Video" },
];

export const PRICE_HUB_PAGES: readonly PriceHubPage[] = [
  { title: "Consumer plans", summary: "ChatGPT, Claude and Gemini plans side by side.", href: "/prices/plans", updated: "On any plan change", levelLabel: "Levels 1 to 2" },
  { title: "API costs", summary: "Price per token and what one finished task costs.", href: "/prices/api", updated: "Monthly, or on a price change", levelLabel: "Level 3" },
  { title: "Free limits", summary: "What each free plan includes and where it stops.", href: "/prices/free-limits", updated: "Monthly", levelLabel: "Levels 1 to 2" },
  { title: "Feature matrix", summary: "Voice, images, video, files, search, agents and memory.", href: "/prices/features", updated: "Monthly", levelLabel: "Level 2" },
  { title: "Privacy matrix", summary: "Who trains on your chats, and how to switch it off.", href: "/prices/privacy", updated: "Quarterly", levelLabel: "Levels 1 to 3" },
  { title: "Retirements", summary: "Models and features being retired, with successors.", href: "/prices/retirements", updated: "Weekly", levelLabel: "Levels 2 to 3" },
  { title: "Benchmark digest", summary: "Independent and vendor scores, kept apart.", href: "/prices/benchmarks", updated: "Weekly", levelLabel: "Level 4" },
];

export const FREE_TOOLS: readonly FreeTool[] = [
  { id: "prompt-library", title: "Prompt library", description: "Copy-ready prompts you can search by task and level.", levelLabel: "Levels 1 to 3", href: "/tools/prompt-library" },
  { id: "which-ai", title: "Which AI fits me?", description: "Answer three questions and get a model type to start with.", levelLabel: "Level 1", href: "/tools/which-ai-fits-me" },
  { id: "subscription-cost", title: "Subscription cost calculator", description: "Add up the monthly and yearly cost of the plans you use.", levelLabel: "Level 1", href: "/tools/subscription-cost-calculator" },
  { id: "api-cost", title: "API cost calculator", description: "Estimate a monthly bill from tokens per task and tasks per month.", levelLabel: "Level 3", href: "/tools/api-cost-calculator" },
  { id: "token-estimator", title: "Token and context estimator", description: "Turn a word count into a rough token count.", levelLabel: "Level 2", href: "/tools/token-estimator" },
  { id: "local-memory", title: "Local model memory estimator", description: "How much memory a model needs to run on your own computer.", levelLabel: "Level 4", href: "/tools/local-model-memory" },
  { id: "benchmark-checklist", title: "Benchmark reading checklist", description: "Ten questions to ask before you trust a score.", levelLabel: "Level 4", href: "/tools/benchmark-checklist" },
  { id: "safety-checklist", title: "AI safety checklist", description: "Printable lists for individuals, schools and small businesses.", levelLabel: "Level 1", href: "/tools/ai-safety-checklist" },
  { id: "cheat-sheets", title: "Cheat sheets and templates", description: "Prompt formula, model-choice sheet, resume prompt and more.", levelLabel: "Levels 1 to 3", href: "/tools/cheat-sheets" },
];

export const SOCIETY_CARDS: readonly SocietyCard[] = [
  { title: "Role in our lives", description: "Where people meet AI today at home, school and work.", href: "/society/role-of-ai-in-our-lives" },
  { title: "Pros and cons", description: "An honest scorecard, with both sides on every page.", href: "/society/pros-and-cons-of-ai" },
  { title: "Jobs", description: "What named surveys actually say about work.", href: "/society/is-ai-taking-jobs" },
  { title: "The future", description: "Six forces to watch to 2030, framed as scenarios, not forecasts.", href: "/society/future-of-ai" },
];

export const SOCIETY_STAT = {
  value: "61.8%",
  label: "of US adults aged 18 to 64 used generative AI in the second quarter of 2026",
  context: "Up from 44.6% in the third quarter of 2024. At work the share rose from 33.3% to 45.2%.",
  source: "Fed-hosted adoption tracker",
  href: "/society/ai-adoption-data",
} as const;

export const TRUST_POINTS: readonly TrustPoint[] = [
  { title: "How we test", description: "A seven-point scorecard run on a fixed battery, with the model version, effort setting and test day recorded.", link: { href: "/about/how-we-test", label: "See the method" } },
  { title: "Independence", description: "Affiliate links and sponsors are always disclosed. Payment never changes a score or a verdict.", link: { href: "/about/independence", label: "Read our promise" } },
  { title: "Corrections", description: "Spot a wrong price or score? Tell us. Every fix is logged with the date it was reported and fixed.", link: { href: "/about/corrections", label: "Report an error" } },
];

export const TRUST_PLEDGES: readonly string[] = [
  "Every price, score and rule is dated and sourced.",
  "Vendor-reported and independent numbers never share a column.",
  "A score is a shortlist, not a verdict.",
  "Pages are re-checked on a schedule, and old models are marked superseded, not deleted.",
];