import type { FaqItem, RelatedLink } from "@/lib/compare/openVsClosedContent";
import type { ComparisonTableContent } from "@/lib/learn/expertContent";
import {
  FUTURE_OF_AI_CHECKED_ON,
  FUTURE_OF_AI_SOURCES,
  KEY_NUMBERS,
  LEGEND_TABLE,
  RULES_OF_THE_PAGE,
  type FutureSource,
  type KeyNumber,
} from "./futureOfAiContent";

export type ArticleGroupId = "big-picture" | "work-money" | "planet" | "health-learning" | "numbers";
export type ArticleType = "Explainer" | "Data explainer";

export interface HubArticle {
  number: number;
  slug: string;
  title: string;
  plain: string;
  /** Extra detail shown when the reader switches to Technical. */
  technical: string;
  type: ArticleType;
  /** Placeholder reading time. */
  minutes: number;
  group: ArticleGroupId;
  /** Set to true when the article page is live. */
  isPublished: boolean;
  /** Short label used on the Start here cards. */
  shortLabel?: string;
}

export interface InteractiveFeature {
  id: string;
  title: string;
  href: string;
  minutes: number;
  whatItDoes: string;
  youGet: string;
  articleNumber: number;
  /** Set to true when the feature page is live. */
  isPublished: boolean;
}

export interface ReadingPath {
  id: string;
  title: string;
  bestFor: string;
  articleNumbers: readonly number[];
  extra?: string;
}

export interface LatestDatum extends KeyNumber {
  technical: string;
}

export const SOCIETY_ROUTE = "/society";
/** Date the figures on the hub were last checked. */
export const SOCIETY_CHECKED_ON = FUTURE_OF_AI_CHECKED_ON;
/** Placeholder byline until the author and editor are named. */
export const SOCIETY_AUTHOR = "Editorial team";
export const SOCIETY_READ_MINUTES = 10;

export const SOCIETY_SECTIONS: readonly { id: string; label: string }[] = [
  { id: "start-here", label: "Start here" },
  { id: "reading-paths", label: "Reading paths" },
  { id: "all-articles", label: "All articles" },
  { id: "interactive-features", label: "Interactive features" },
  { id: "latest-data", label: "Latest data" },
  { id: "how-we-cover", label: "How we cover AI" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export const ARTICLE_GROUPS: readonly { id: ArticleGroupId; title: string; intro: string }[] = [
  { id: "big-picture", title: "The big picture", intro: "Where AI shows up, what it helps with, what it risks and where it may be heading." },
  { id: "work-money", title: "Work, industry and money", intro: "Jobs, the industries changing most, and finance." },
  { id: "planet", title: "Energy and the planet", intro: "What AI costs in electricity." },
  { id: "health-learning", title: "Health and learning", intro: "What AI can and cannot do for patients, students and teachers." },
  { id: "numbers", title: "The numbers", intro: "How adoption is counted, and why surveys disagree." },
];

export const SOCIETY_ARTICLES: readonly HubArticle[] = [
  { number: 31, slug: "ten-places-you-meet-ai", title: "Ten places you meet AI in a normal day", plain: "A morning-to-night tour of the AI you already use without noticing.", technical: "Includes a 'go deeper' layer on how each system works, and links to the day quiz.", type: "Explainer", minutes: 6, group: "big-picture", isPublished: false },
  { number: 32, slug: "role-of-ai-in-our-lives", title: "The role of AI in our lives: home, school and work", plain: "Where people meet AI today: search, phone and home, work, school, health, money, creativity and media.", technical: "Adoption snapshot from the Fed-hosted tracker, labelled separately from other surveys, plus a technical layer.", type: "Data explainer", minutes: 9, group: "big-picture", isPublished: false, shortLabel: "Role in life" },
  { number: 33, slug: "pros-and-cons-of-ai", title: "Pros and cons of AI: an honest scorecard", plain: "What AI helps with, what it risks, and what a reader can do about it.", technical: "Nine themes, each two-sided, with anchor figures on electricity (Gartner) and jobs (S&P Global).", type: "Data explainer", minutes: 9, group: "big-picture", isPublished: false, shortLabel: "Pros and cons" },
  { number: 36, slug: "future-of-ai", title: "The future of AI: six forces to watch to 2030", plain: "Six forces to watch, the signals that matter, and three scenarios. Frameworks, not forecasts.", technical: "A signals table with sources and update cadence, and scenarios with the evidence that fits and does not fit.", type: "Explainer", minutes: 12, group: "big-picture", isPublished: true, shortLabel: "Future" },
  { number: 42, slug: "ai-myths-and-facts", title: "AI myths and facts", plain: "Common claims about AI, checked against evidence.", technical: "A myth-or-fact list with evidence links and a flip-card feature.", type: "Explainer", minutes: 8, group: "big-picture", isPublished: false },
  { number: 34, slug: "is-ai-taking-jobs", title: "Is AI taking jobs? What current surveys actually say", plain: "What named surveys say about jobs, and why many online figures are not used here.", technical: "S&P Global, ISM and the Fed-hosted tracker, plus effects on entry-level and routine tasks.", type: "Data explainer", minutes: 10, group: "work-money", isPublished: false, shortLabel: "Jobs" },
  { number: 35, slug: "industries-changing-most", title: "Which industries are changing most, and which are next", plain: "Eight industries, what is changing in each, and where to look next.", technical: "Industry cards with evidence, and 'directional' labels where only weaker evidence exists.", type: "Explainer", minutes: 10, group: "work-money", isPublished: false, shortLabel: "Industries" },
  { number: 40, slug: "ai-in-banking-and-finance", title: "AI in banking and finance", plain: "Fraud detection, customer service and credit decisions, and the risks of each.", technical: "Credit decisions and bias, and the explainability rules.", type: "Explainer", minutes: 8, group: "work-money", isPublished: false },
  { number: 37, slug: "ai-power-use", title: "How much power does AI use?", plain: "Where the electricity goes, and what efficient use looks like.", technical: "Data-centre electricity figures, the AI share of servers, and grid and power limits.", type: "Data explainer", minutes: 8, group: "planet", isPublished: false },
  { number: 38, slug: "ai-in-healthcare", title: "AI in healthcare: what it can and cannot do", plain: "Where AI helps, where it falls short, and what to keep private.", technical: "Accuracy limits, privacy, and medical-device rules.", type: "Explainer", minutes: 8, group: "health-learning", isPublished: false },
  { number: 39, slug: "ai-in-education", title: "AI in education: tutor, teacher aid or shortcut?", plain: "How AI can help learning and save teacher time, and how it tempts shortcuts.", technical: "Integrity and assessment, plus the EU's high-risk duties for education.", type: "Explainer", minutes: 8, group: "health-learning", isPublished: false },
  { number: 41, slug: "ai-adoption-data", title: "How fast is AI spreading? The adoption data explained", plain: "How many people use AI, and why surveys disagree.", technical: "The Fed-hosted tracker series, work versus outside work, and a source and date for every number.", type: "Data explainer", minutes: 9, group: "numbers", isPublished: false },
];

/** Start here: five articles in reading order. */
export const START_HERE_NUMBERS: readonly number[] = [32, 33, 34, 35, 36];

export const READING_PATHS: readonly ReadingPath[] = [
  { id: "five", title: "Five minutes", bestFor: "You want the gist, today.", articleNumbers: [31], extra: "Then try the day quiz below." },
  { id: "twenty", title: "Twenty minutes", bestFor: "You want a fair picture of benefits and risks.", articleNumbers: [32, 33, 42] },
  { id: "hour", title: "An hour", bestFor: "You want the evidence and the numbers.", articleNumbers: [34, 35, 36, 37, 41] },
];

export const BY_INTEREST_TABLE: ComparisonTableContent = {
  caption: "Where to start, by what you care about",
  headers: ["If you care about…", "Start with", "Then read"],
  rows: [
    ["My job or my team's work", "Article 34: Is AI taking jobs?", "Article 35: Which industries are changing most"],
    ["Money and banking", "Article 40: AI in banking and finance", "Article 34: Is AI taking jobs?"],
    ["My family's health", "Article 38: AI in healthcare", "Article 42: AI myths and facts"],
    ["School and learning", "Article 39: AI in education", "Article 32: The role of AI in our lives"],
    ["The environment and power", "Article 37: How much power does AI use?", "Article 36: The future of AI"],
    ["Where it is all heading", "Article 36: The future of AI", "Article 41: How fast is AI spreading?"],
  ],
};

export const INTERACTIVE_FEATURES: readonly InteractiveFeature[] = [
  { id: "day-quiz", title: "How much AI is in your day?", href: "/society/day-quiz", minutes: 3, whatItDoes: "A short quiz about an ordinary day, from your morning phone check to your evening shows.", youGet: "A score, a plain-English result and a shareable card.", articleNumber: 31, isPublished: false },
  { id: "weigh-up", title: "Pros and cons weigh-up", href: "/society/weigh-up", minutes: 4, whatItDoes: "Tick what matters to you, such as time, privacy, jobs, fairness or the environment.", youGet: "A balanced summary that shows both sides of the themes you picked.", articleNumber: 33, isPublished: false },
  { id: "industry-explorer", title: "Industry explorer", href: "/society/industry-explorer", minutes: 5, whatItDoes: "Filter industry cards by their latest figure, source and date.", youGet: "Each card shows where its evidence comes from, and whether that evidence is named or only directional.", articleNumber: 35, isPublished: false },
  { id: "myth-or-fact", title: "Myth-or-fact flip cards", href: "/society/myth-or-fact", minutes: 5, whatItDoes: "Judge a claim, flip the card and read the evidence.", youGet: "A verdict, a short explanation and a link to the source.", articleNumber: 42, isPublished: false },
];

export const INTERACTIVE_NOTE =
  "All four run in your browser, use hand-written rules and sources, and do not send or save your answers. Results are a way to think, not advice.";

/** Which key numbers appear under Latest data, with a technical note for each. */
export const LATEST_DATA_NOTES: readonly { id: string; technical: string }[] = [
  { id: "people", technical: "Real-Time Population Survey: adults aged 18 to 64 who use generative AI for work, personal use or both. Quarterly, via FRED." },
  { id: "firms", technical: "Census Bureau Business Trends and Outlook Survey: employer businesses using AI in any business function in the past two weeks. The question wording changed in November 2025." },
  { id: "energy", technical: "Gartner forecast of global data-centre electricity use. A forecast, not a measurement, and the IEA's base case for 2030 is lower (about 945 TWh)." },
  { id: "work", technical: "S&P Global PMI special survey: the share of firms reporting higher employment due to AI minus the share reporting lower. A survey of managers, not payroll data." },
];

export const LATEST_DATA: readonly LatestDatum[] = LATEST_DATA_NOTES.flatMap((note) => {
  const item = KEY_NUMBERS.find((candidate) => candidate.id === note.id);
  return item ? [{ ...item, technical: note.technical }] : [];
});

export const LATEST_DATA_NOTE =
  "We only publish numbers we can trace to a named survey, an official tracker or a named forecaster, with a date. Popular figures that only appear in summaries are left out until we find the original.";

export const HOW_WE_COVER_RULES = RULES_OF_THE_PAGE;
export const HOW_WE_COVER_LEGEND = LEGEND_TABLE;

export const NOT_ADVICE_NOTE =
  "Everything in this section is general information. It is not medical, legal, financial or career advice, and none of it is a prediction.";

export const SOCIETY_FAQ: readonly FaqItem[] = [
  { question: "What is AI & Society?", answer: "The part of the site about how AI affects daily life, work, health, learning, money, energy and rules, rather than how to use it." },
  { question: "Do I need to know anything about AI first?", answer: "No. Every article is written for all levels. Use the Plain / Technical switch if you want more detail. For tool skills, start with the Learn section." },
  { question: "What does the Plain / Technical switch do?", answer: "Plain keeps everyday language. Technical adds survey names, definitions and units under each description. Nothing is stored, and it resets when you leave the page." },
  { question: "Are the interactive features private?", answer: "Yes. They run in your browser, and your answers are not sent or saved." },
  { question: "Why do you not use some popular statistics?", answer: "We only publish numbers we can trace to a named survey, an official tracker or a named forecaster. Many figures online are copied from summaries and cannot be traced to an original." },
  { question: "How do I know the figures are current?", answer: "Every figure shows its source and date, and the signals table in article 36 shows when new data is due." },
  { question: "Is any of this advice?", answer: "No. It is general information, not medical, legal, financial or career advice." },
  { question: "Can I suggest a topic or report a mistake?", answer: "Yes. Use the contact page for suggestions, and the corrections page to report an error." },
];

export const SOCIETY_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Treating one survey as the whole picture.",
  "Reading a forecast as a measurement.",
  "Skipping the date on a figure.",
  "Mixing surveys that ask different questions.",
  "Taking an interactive result as advice.",
  "Reading only the benefits, or only the risks.",
];

/** Sources behind the Latest data cards and the myth-or-fact cards. */
const HUB_SOURCE_HREFS: readonly string[] = [
  "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREALL",
  "https://census.gov/library/stories/2026/05/ai-use-businesses.html",
  "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026",
  "https://www.iea.org/reports/energy-and-ai/executive-summary",
  "https://www.spglobal.com/en/research-insights/special-reports/ai-impact-on-employment-2026",
  "https://www.staffingindustry.com/news/global-daily-news/only-modest-employment-expectations-for-remainder-of-the-year",
  "https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027",
];

export const SOCIETY_SOURCES: readonly FutureSource[] = FUTURE_OF_AI_SOURCES.filter((source) => HUB_SOURCE_HREFS.includes(source.href));

export const SOCIETY_RELATED: readonly RelatedLink[] = [
  { id: "what-is-ai", title: "What is AI? A plain-English guide", reason: "Article 1: the basics, if you are new.", href: "/learn/foundations/what-is-ai" },
  { id: "never-share", title: "What you should never share with an AI chatbot", reason: "Article 5: protect your privacy.", href: "/learn/foundations/never-share-with-ai-chatbot" },
  { id: "scams", title: "AI scams and deepfakes", reason: "Article 6: how to spot them.", href: "/learn/foundations/ai-scams-and-deepfakes" },
  { id: "fact-check", title: "How to fact-check AI answers", reason: "Article 7: a five-step routine.", href: "/learn/practitioner/fact-check-ai-answers" },
  { id: "eu-ai-act", title: "EU AI Act timeline", reason: "Dates and a plain-English summary.", href: "/news/eu-ai-act" },
  { id: "agents", title: "AI agents explained", reason: "Article 20: what they can do and how they fail.", href: "/learn/power-user/ai-agents-explained" },
  { id: "benchmarks", title: "Benchmark digest", reason: "Independent scores, updated weekly.", href: "/prices/benchmarks" },
  { id: "directory", title: "Model directory", reason: "Every model we cover.", href: "/compare/models" },
];

export function findArticle(number: number): HubArticle | undefined {
  return SOCIETY_ARTICLES.find((article) => article.number === number);
}

export function articleHref(article: HubArticle): string {
  return `${SOCIETY_ROUTE}/${article.slug}`;
}