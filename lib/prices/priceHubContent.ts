import type { TopicCard } from "@/lib/learn/foundationsContent";
import { PLANS_VERIFIED_ON } from "./planRecords";
import type { VerifiableRecord } from "./verification";

export interface PricePage extends VerifiableRecord {
  id: string;
  title: string;
  summary: string;
  href: string;
  levels: string;
  /** How often the page is re-checked (Blueprint 6.5). */
  cadence: string;
  /** Set to true when the page exists, so readers never hit a 404. */
  isPublished: boolean;
}

export interface RelatedLink {
  id: string;
  title: string;
  reason: string;
  href: string;
}

/**
 * The seven data pages. A page's `verifiedOn` comes from its data module and is null until every record
 * in that module has been checked, so the hub never shows a date nobody checked.
 * Pages without a data module yet keep `verifiedOn: null`.
 */
export const PRICE_PAGES: readonly PricePage[] = [
  { id: "plans", title: "Consumer plans", summary: "US monthly prices for chatbot plans, with notes and a link to each provider's own page.", href: "/prices/plans", levels: "Levels 1 to 2", cadence: "On any plan change", isPublished: true, verifiedOn: PLANS_VERIFIED_ON },
  { id: "api", title: "API prices and cost per task", summary: "Price per million input and output tokens, the cost to finish a standard task, and intro-rate end dates.", href: "/prices/api", levels: "Level 3", cadence: "Monthly, or on a price change", isPublished: false, verifiedOn: null },
  { id: "free-limits", title: "Free-plan limits", summary: "What each free plan includes and where it stops, plus ads in free tiers.", href: "/prices/free-limits", levels: "Levels 1 to 2", cadence: "Monthly", isPublished: false, verifiedOn: null },
  { id: "features", title: "Feature matrix", summary: "Voice, images, video, file upload, web search, agents and memory, side by side.", href: "/prices/features", levels: "Level 2", cadence: "Monthly", isPublished: false, verifiedOn: null },
  { id: "privacy", title: "Privacy matrix", summary: "Training settings, retention, deletion and data location, and how to turn off data sharing.", href: "/prices/privacy", levels: "Levels 1 to 3", cadence: "Quarterly", isPublished: false, verifiedOn: null },
  { id: "retirements", title: "Retirements tracker", summary: "Models and features being retired, with dates and successors.", href: "/prices/retirements", levels: "Levels 2 to 3", cadence: "Weekly", isPublished: false, verifiedOn: null },
  { id: "benchmarks", title: "Benchmark digest", summary: "Independent scores in one table and vendor-reported scores in a separate, labelled one.", href: "/prices/benchmarks", levels: "Level 4", cadence: "Weekly", isPublished: false, verifiedOn: null },
];

export const SUBSCRIPTION_VS_API: readonly TopicCard[] = [
  { id: "subscription", title: "Subscription", summary: "A flat monthly fee for using a chatbot app. It comes with usage limits that depend on the plan. Best for everyday chatting, writing and research." },
  { id: "api", title: "API", summary: "You pay for the tokens you use, through code or an automation tool. The cost depends on how much you send and receive. Best for building tools and for high-volume work." },
];

export const SUBSCRIPTION_VS_API_RULE =
  "A subscription is not an API. Paying for one does not give you the other, so check which one a price refers to.";

export const TABLE_LABELS: readonly TopicCard[] = [
  { id: "verified-on", title: "Verified on", summary: "The date we checked the price or fact against the provider's own page. A row without a date is marked \"Not yet verified\"." },
  { id: "source", title: "Source link", summary: "Each row links to the official page it came from, so you can check it yourself." },
  { id: "intro-rate", title: "Intro rate", summary: "A temporary price. Its end date sits in the same cell, so you can see when it changes." },
  { id: "vendor-reported", title: "Vendor-reported", summary: "A number from the maker's own announcement. It never shares a column with independent results." },
  { id: "superseded", title: "Superseded", summary: "A model or plan that has been replaced. The row stays and links to its successor." },
];

export const UPDATE_PROMISES: readonly string[] = [
  "Price, plan or limit change: a price-change note first, then the tables, within 24 hours.",
  "Every week: the retirements tracker and benchmark digest are reviewed.",
  "Every month: the free-plan limits table and the best-for pages are reviewed in the first week.",
  "Every quarter: the privacy matrix is refreshed.",
];

export const PRICES_LIMITS_NOTE =
  "These tables describe published prices and features. They are not financial advice, and we are paid nothing to place a plan higher or lower.";

export const RELATED_LINKS: readonly RelatedLink[] = [
  { id: "free-vs-paid", title: "Free vs paid plans", reason: "What you get at each step, and when paying makes sense.", href: "/learn/foundations#free-vs-paid" },
  { id: "choosing-model", title: "Choosing a model by task", reason: "What to look for before you compare prices.", href: "/learn/practitioner#choosing-model" },
  { id: "api-pricing", title: "API for non-engineers", reason: "Cost per task, with an estimator you can try.", href: "/learn/power-user#api-pricing" },
];