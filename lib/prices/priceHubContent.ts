import type { VerificationLevel } from "./apiCostTable";
import { RETIREMENTS_CHECKED_ON } from "./retirementsConstants";


export const SUBSCRIPTION_VS_API_RULE =
  "A chat subscription is not an API plan. A monthly plan for a chat app does not include API access, and API use is billed separately by the token.";

/** Note about what the price tables leave out. Shown in the footer under the price disclaimer. */
export const PRICES_LIMITS_NOTE =
  "Prices on this site are US list prices in US dollars. They leave out tax, regional pricing, promotions, student or education discounts, and offers bundled with a phone or internet plan. Check your own checkout for the price you will pay.";

/** Your original hub content, kept as given so nothing that already imports it breaks. */
export const PRICE_HUB_CONTENT = {
  title: "AI Model Pricing Directory",
  description: "Compare current pricing, rate limits, and feature access across leading LLM providers.",
  sections: [
    {
      id: "plans",
      title: "Subscription Plans",
      description: "Standard monthly consumer and enterprise subscription levels.",
    },
    {
      id: "api",
      title: "API Tokens",
      description: "Pay-as-you-go developer rates calculated per million input/output tokens.",
    },
  ],
};

/** One of the seven data pages listed on the Prices hub. */
export interface PricePage {
  id: string;
  title: string;
  href: string;
  isPublished: boolean;
  /** For example "Levels 1 to 2". */
  levels: string;
  summary: string;
  /** What the page contains, from the Blueprint headings. */
  covers: readonly string[];
  /** How often the page is updated (Blueprint 6.5). */
  cadence: string;
  /** Date the data was last checked, or null if it has not been checked on the provider's own page yet. */
  verifiedOn: string | null;
  verification: VerificationLevel;
}

/** A titled text card for the hub's explainer sections. */
export interface PriceInfoCard {
  id: string;
  title: string;
  summary: string;
}

export interface PriceRelatedLink {
  id: string;
  href: string;
  title: string;
  reason: string;
}

/**
 * The seven data pages (Blueprint 5.4 and 6.5).
 * Set verifiedOn when a page's data has been checked, ideally from that page's own checked-on constant.
 */
export const PRICE_PAGES: readonly PricePage[] = [
  {
    id: "plans",
    title: "Consumer plans",
    href: "/prices/plans",
    levels: "Levels 1 to 2",
    summary: "US monthly prices for ChatGPT, Claude and Gemini plans, with notes and a link to each provider's own page.",
    covers: ["ChatGPT, Claude and Gemini plans", "Subscription is not an API box", "Provider links and verified-on date"],
    cadence: "On any plan change",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,
  },
  {
    id: "api",
    title: "API prices and cost per task",
    href: "/prices/api",
    levels: "Level 3",
    summary: "Price per million input and output tokens, the cost to finish a standard task, and introductory-rate end dates.",
    covers: ["Input and output price per million tokens", "Cost to finish a standard task", "Intro-rate end dates in the same cell"],
    cadence: "Monthly, or on a price change",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,  
  },
  {
    id: "free-limits",
    title: "Free-plan limits",
    href: "/prices/free-limits",
    levels: "Levels 1 to 2",
    summary: "What each free plan includes, where it stops, and which free tiers show ads.",
    covers: ["What each free plan includes", "Where each plan stops", "Ads in free tiers"],
    cadence: "Monthly",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,        
  },
  {
    id: "features",
    title: "Feature matrix",
    href: "/prices/features",
    levels: "Level 2",
    summary: "Voice, images, video, file upload, web search, agents and memory compared across the main apps.",
    covers: ["Voice and images", "Video and file upload", "Web search, agents and memory"],
    cadence: "Monthly",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,
  },
  {
    id: "privacy",
    title: "Privacy matrix",
    href: "/prices/privacy",
    levels: "Levels 1 to 3",
    summary: "Training settings, data retention, deletion and data location, with steps to turn off data sharing.",
    covers: ["Training settings", "Retention and deletion", "Data location and how to turn off sharing"],
    cadence: "Quarterly",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,
  },
  {
    id: "retirements",
    title: "Retirements tracker",
    href: "/prices/retirements",
    levels: "Levels 2 to 3",
    summary: "Models and features being retired, with dates, successors and what happens on the day.",
    covers: ["Models being retired", "Features being retired", "Superseded label rules"],
    cadence: "Weekly",
    verifiedOn: RETIREMENTS_CHECKED_ON,
    // Most entries are read through trackers. Each entry carries its own label.
    verification: "secondary",
    isPublished: true,
  },
  {
    id: "benchmarks",
    title: "Benchmark digest",
    href: "/prices/benchmarks",
    levels: "Level 4",
    summary: "Independent scores with their source, method and date, and vendor-reported scores in a separate table.",
    covers: ["Independent scores", "Vendor-reported scores in a separate table", "How to read a score"],
    cadence: "Weekly",
    verifiedOn: null,
    verification: "secondary",
    isPublished: true,
  },
];

/** The two cards above the pinned rule on the "Subscription vs API" section. */
export const SUBSCRIPTION_VS_API: readonly PriceInfoCard[] = [
  {
    id: "subscription",
    title: "Chat subscription",
    summary: "A flat monthly fee for an app such as ChatGPT, Claude or Gemini. You chat in the app, and the plan sets your usage limits. It suits daily personal use.",  },
  {
    id: "api",
    title: "API (pay per use)",
    summary: "You pay per million tokens of input and output, billed separately from any chat plan. Cost follows use, which suits automations and repeated tasks. Judge it by cost per task, not price per token.",
  },
];

/** What the labels on every data page mean (Blueprint 6.2). */
export const TABLE_LABELS: readonly PriceInfoCard[] = [
  {
    id: "verified-on",
    title: "Verified on",
    summary: "The date we checked a price or fact against its source. If the date is old, treat the number with care.",
  },
  {
    id: "provider-or-tracker",
    title: "Provider page or tracker",
    summary: "Provider page means we read it on the maker's own site. Tracker (secondary) means we read it through a third party. A tracker is a lead, never the final word.",
  },
  {
    id: "tested-on",
    title: "Tested on",
    summary: "The date of our own test run, with the model version and effort setting.",
  },
  {
    id: "vendor-reported",
    title: "Vendor-reported",
    summary: "The number comes from the maker's own announcement. Vendor numbers never share a column with independent ones.",
  },
  {
    id: "superseded",
    title: "Superseded",
    summary: "The model or plan has been replaced. The row stays and links to its successor instead of being deleted.",
  },
  {
    id: "intro-rate",
    title: "Introductory rate",
    summary: "A temporary price with its end date shown in the same cell. After that date the price changes.",
  },
];

/** The update schedule shown with a tick mark (Blueprint 6.4 and 6.5). */
export const UPDATE_PROMISES: readonly string[] = [
  "Price, plan or limit changes: a price-change note first, then the plan and cost tables, within 24 hours.",
  "New popular models: a directory row within 48 hours.",
  "Weekly: the retirements tracker and the benchmark digest.",
  "Monthly: API prices, free-plan limits and the feature matrix.",
  "Quarterly: the privacy matrix.",
  "Every update is logged in the changelog, and conflicts between sources are noted there.",
];

/** Guides linked from the bottom of the Prices hub. */
export const RELATED_LINKS: readonly PriceRelatedLink[] = [
  {
    id: "free-vs-paid",
    href: "/learn/foundations/free-vs-paid-ai",
    title: "Free vs paid AI: what you actually get",
    reason: "Who needs to upgrade, and how to avoid surprise renewals.",
  },
  {
    id: "worth-paying",
    href: "/learn/practitioner/is-ai-worth-paying-for",
    title: "Is AI worth paying for?",
    reason: "Who should stay free, who should pay and which tier to look at.",
  },
  {
    id: "api-pricing",
    href: "/learn/power-user/ai-api-pricing-for-non-engineers",
    title: "AI API pricing for non-engineers",
    reason: "Cost per task, not per token, with a worked example.",
  },
];