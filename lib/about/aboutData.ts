import type { CadenceRow, DataPageRow, FundingRow, LearningLevel, Pillar, TeamRole } from "./about";

/**
 * Who writes and who reviews (Blueprint 5.1). Names are null on purpose: Blueprint 7.3 lists
 * "decide who writes, who reviews" as an open item. Fill these in before launch.
 */
export const TEAM_ROLES: readonly TeamRole[] = [
  {
    id: "author",
    role: "Author",
    name: null,
    background: null,
    responsibilities: [
      "Writes guides, reviews, news posts and the AI & Society explainers",
      "Runs our own tests and records the date, model version and effort setting",
      "Checks prices and facts on the provider's own page and records the verified-on date",
    ],
  },
  {
    id: "editor",
    role: "Editor and reviewer",
    name: null,
    background: null,
    responsibilities: [
      "Reads each page before it is published, and checks claims against their sources",
      "Applies the stale-review rule, so an old test date does not stay on a live review",
      "Handles corrections and keeps the corrections log and changelog",
    ],
  },
];

export const PILLARS: readonly Pillar[] = [
  {
    id: "learn",
    name: "Learn",
    question: "How do I use AI well, and safely?",
    whatItDoes: "Structured guides from first steps to expert topics, a plain-English glossary and free tools you can use in your browser.",
    sections: [
      { label: "Learn: guides by level", href: "/learn" },
      { label: "Glossary", href: "/learn/glossary" },
      { label: "Tools", href: "/tools" },
    ],
    start: { label: "Start with the Foundations level", href: "/learn/foundations" },
  },
  {
    id: "compare",
    name: "Compare",
    question: "Which model or plan should I choose, and what does it cost?",
    whatItDoes: "Reviews and comparisons of named AI models with dated tests, plus price and data tables that we keep sourced and dated.",
    sections: [
      { label: "Compare: models and reviews", href: "/compare" },
      { label: "Model directory", href: "/compare/models" },
      { label: "Prices and data", href: "/prices" },
    ],
    start: { label: "Open the model directory", href: "/compare/models" },
  },
  {
    id: "stay-current",
    name: "Stay current",
    question: "What changed this week, and does it matter to me?",
    whatItDoes: "Short dated explainers on releases, prices and rules, a weekly roundup, and the AI & Society hub on what AI means for work, school and daily life.",
    sections: [
      { label: "News", href: "/news" },
      { label: "AI & Society", href: "/society" },
      { label: "Retirements tracker", href: "/prices/retirements" },
    ],
    start: { label: "Read the News hub", href: "/news" },
  },
];

export const LEVELS: readonly LearningLevel[] = [
  { level: 1, name: "Foundations", reader: "Complete beginner, parent, student", afterThisLevel: "Explain what AI is, write a clear prompt, spot a wrong answer and keep private data out of chats", typicalPage: "A 5 to 10 minute guide", href: "/learn/foundations" },
  { level: 2, name: "Practitioner", reader: "Student, office worker, job seeker, small business owner", afterThisLevel: "Use AI for real tasks with files and web search, choose the right plan and verify results", typicalPage: "A task guide with copy-ready prompts", href: "/learn/practitioner" },
  { level: 3, name: "Power user and builder", reader: "Freelancer, analyst, developer, team lead", afterThisLevel: "Pick a model per task, control cost per task, build automations and run your own tests", typicalPage: "A workflow guide or tested comparison", href: "/learn/power-user" },
  { level: 4, name: "Expert", reader: "Developer, researcher, IT or compliance lead", afterThisLevel: "Read benchmarks critically, self-host open-weight models, assess safety reports and map legal duties", typicalPage: "A deep dive with sources", href: "/learn/expert" },
];

/** Our publishing targets (Blueprint 6.4). They are targets, not guarantees. */
export const CADENCE: readonly CadenceRow[] = [
  { trigger: "A frontier or popular model is released", whatWePublish: "A short “what changed and should you care?” post (300 to 500 words) and a row in the model directory", target: "Within 48 hours", where: { label: "News hub", href: "/news" } },
  { trigger: "We finish our own test run of that model", whatWePublish: "A full review with the scorecard and the test date", target: "Within 7 days", where: { label: "Reviews", href: "/compare/reviews" } },
  { trigger: "A price, plan or limit changes", whatWePublish: "A price-change note, then the plan and cost tables are updated", target: "Within 24 hours", where: { label: "Price-change notes", href: "/news#price-changes" } },
  { trigger: "Safety, privacy or policy news", whatWePublish: "A short explainer linked to the relevant guide", target: "Within 3 days", where: { label: "News hub", href: "/news" } },
  { trigger: "Every week", whatWePublish: "The weekly roundup, also sent as the newsletter", target: "A fixed weekday", where: { label: "Weekly roundups", href: "/news/weekly" } },
  { trigger: "Every month", whatWePublish: "A review of every best-for page and the free-limits table", target: "First week of the month", where: { label: "Best-for roundups", href: "/compare/best" } },
  { trigger: "Every quarter", whatWePublish: "The full test battery is re-run and the privacy matrix is refreshed", target: "Fixed dates", where: { label: "How we test", href: "/about/how-we-test" } },
];

/** How often each data page is refreshed (Blueprint 6.5). */
export const DATA_PAGES: readonly DataPageRow[] = [
  { page: { label: "Model directory", href: "/compare/models" }, updateTrigger: "Any model launch or price change" },
  { page: { label: "Consumer plan table", href: "/prices/plans" }, updateTrigger: "Any plan change" },
  { page: { label: "API price and cost-per-task table", href: "/prices/api" }, updateTrigger: "Monthly, or on a price change" },
  { page: { label: "Benchmark digest", href: "/prices/benchmarks" }, updateTrigger: "Weekly" },
  { page: { label: "Free-plan limits", href: "/prices/free-limits" }, updateTrigger: "Monthly" },
  { page: { label: "Feature matrix", href: "/prices/features" }, updateTrigger: "Monthly" },
  { page: { label: "Privacy matrix", href: "/prices/privacy" }, updateTrigger: "Quarterly" },
  { page: { label: "Retirements tracker", href: "/prices/retirements" }, updateTrigger: "Weekly" },
  { page: { label: "Changelog", href: "/news/changelog" }, updateTrigger: "Every update" },
];

/** Ways the site may earn money, and the rule for each (Blueprint Part H). */
export const FUNDING: readonly FundingRow[] = [
  { source: "Affiliate links", ourRule: "Always disclosed on the page where they appear. Affiliate status is never a scoring input." },
  { source: "Display ads", ourRule: "Only once traffic is steady, and always clearly marked as advertising." },
  { source: "A newsletter sponsor slot", ourRule: "At most one slot, labelled, and kept apart from the editorial parts." },
  { source: "Sponsored content", ourRule: "Labelled “Sponsored” and kept apart from reviews." },
  { source: "Digital products and courses", ourRule: "Prompt packs, templates and checklists sold through an external checkout, with future courses for teachers, job seekers and builders." },
];