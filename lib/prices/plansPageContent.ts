import type { PlanFilters, PriceBand } from "./planTypes";

export interface AudienceOption {
  id: PlanFilters["audience"];
  label: string;
}

export interface ChooseRow {
  id: string;
  need: string;
  lookAt: string;
  why: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface RelatedPageLink {
  id: string;
  title: string;
  reason: string;
  href: string;
}

/** Price bands in US dollars per month, billed monthly. The free band is under one cent so only $0 falls in it. */
export const PLAN_PRICE_BANDS: readonly PriceBand[] = [
  { id: "free", label: "Free", minPrice: 0, maxPrice: 0.01 },
  { id: "under-10", label: "Under $10", minPrice: 0.01, maxPrice: 10 },
  { id: "10-to-30", label: "$10 to $30", minPrice: 10, maxPrice: 30 },
  { id: "30-to-150", label: "$30 to $150", minPrice: 30, maxPrice: 150 },
  { id: "150-and-over", label: "$150 and over", minPrice: 150, maxPrice: null },
];

export const AUDIENCE_OPTIONS: readonly AudienceOption[] = [
  { id: "all", label: "Individual and team" },
  { id: "individual", label: "Individual plans" },
  { id: "team", label: "Team seats" },
];

export const TABLE_LEGEND =
  "A dash means no annual price or no extra is listed. Usage levels are measured against each provider's own plans, so 5x on one provider is not the same amount as 5x on another.";

export const CHOOSE_ROWS: readonly ChooseRow[] = [
  { id: "light", need: "I ask a few questions a week", lookAt: "Free plans", why: "You are unlikely to hit a limit, so there is nothing to gain from paying." },
  { id: "budget", need: "I want a little more than free, for less", lookAt: "The lowest-priced paid plans", why: "They raise limits for a small fee, but may keep ads or leave out features. Check what is missing." },
  { id: "daily", need: "I use AI most days for study, writing or work", lookAt: "The standard individual plan", why: "It is the usual step when free limits start to get in your way. Try free first and note when you hit a limit." },
  { id: "heavy", need: "I hit limits every day, or code and research for hours", lookAt: "The higher usage tiers", why: "Pay only if lost time costs you more than the difference. Compare the multipliers within one provider." },
  { id: "team", need: "Several people at work will use it", lookAt: "Team plans", why: "They add admin controls and central billing. Check the minimum seats and the data and training settings before you buy." },
];

export const PRICE_EXCLUDES: readonly string[] = [
  "Prices are US list prices. Tax and local prices can differ.",
  "Annual billing can lower the monthly figure. Check the commitment before you choose it.",
  "Usage limits change often. Re-check them before you pay.",
  "A subscription and the API are billed separately unless a plan page says a credit is included.",
  "Promotions, student offers and regional plans are not listed.",
];

export const PLANS_FAQ: readonly FaqEntry[] = [
  { id: "api", question: "Is a subscription the same as the API?", answer: "No. A subscription is a flat monthly fee for using an app. The API charges for the tokens you use. Paying for one does not give you the other, unless a plan page says a credit is included." },
  { id: "tax", question: "Do these prices include tax?", answer: "They are the providers' US list prices. Tax may be added at checkout, depending on where you live." },
  { id: "country", question: "Why does the price differ in my country?", answer: "Providers set regional prices. This page lists US prices, so use it to compare plans, then check your own price on the provider's page." },
  { id: "stale", question: "Why are some rows marked \"Not yet verified\"?", answer: "We read prices from third-party reports first, then replace them with a check against the provider's own page and record the date. Until that date appears, treat a row as a lead, not a fact." },
  { id: "updates", question: "How often is this page updated?", answer: "Whenever a provider changes a plan. The hub shows when each page was last checked." },
];

export const PLANS_RELATED: readonly RelatedPageLink[] = [
  { id: "subscription-vs-api", title: "Subscription vs API", reason: "How the two are priced, and which one a price refers to.", href: "/prices#subscription-vs-api" },
  { id: "free-limits", title: "Free-plan limits", reason: "What each free plan includes and where it stops.", href: "/prices/free-limits" },
  { id: "privacy", title: "Privacy matrix", reason: "Training settings and data controls by plan.", href: "/prices/privacy" },
  { id: "free-vs-paid", title: "Free vs paid plans", reason: "When paying makes sense.", href: "/learn/foundations#free-vs-paid" },
];