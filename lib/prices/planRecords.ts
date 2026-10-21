import type { PlanRecord, Provider } from "./planTypes";
import { oldestVerifiedOnAll } from "./verification";

const CHATGPT_PRICING_URL = "https://chatgpt.com/pricing";
const CLAUDE_PRICING_URL = "https://claude.com/pricing";
const GEMINI_PRICING_URL = "https://gemini.google/subscriptions";

export const PROVIDERS: readonly Provider[] = [
  { id: "chatgpt", name: "ChatGPT", maker: "OpenAI", pricingUrl: CHATGPT_PRICING_URL, reportedAsOf: "2026-10-17" },
  { id: "claude", name: "Claude", maker: "Anthropic", pricingUrl: CLAUDE_PRICING_URL, reportedAsOf: "2026-10-16" },
  { id: "gemini", name: "Gemini (Google AI plans)", maker: "Google", pricingUrl: GEMINI_PRICING_URL, reportedAsOf: "2026-10-10" },
];

/**
 * US plan records. Every `verifiedOn` is null: these figures come from third-party reports (see
 * `reportedAsOf` on each provider). Open `sourceUrl`, confirm the row, then set `verifiedOn` to that day (YYYY-MM-DD).
 */
export const PLAN_RECORDS: readonly PlanRecord[] = [
  // ChatGPT
  { id: "chatgpt-free", providerId: "chatgpt", name: "Free", audience: "individual", pricedPer: "account", monthlyPrice: 0, annualBilledMonthlyPrice: null, usage: "Lowest limits", extras: null, notes: "Limited use. Ads have appeared in the US free tier since February 2026.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-go", providerId: "chatgpt", name: "Go", audience: "individual", pricedPer: "account", monthlyPrice: 8, annualBilledMonthlyPrice: null, usage: "More than Free, less than Plus", extras: null, notes: "Budget step up. May include ads. Monthly billing only.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-plus", providerId: "chatgpt", name: "Plus", audience: "individual", pricedPer: "account", monthlyPrice: 20, annualBilledMonthlyPrice: null, usage: "Base for the Pro multipliers", extras: null, notes: "The standard paid individual plan. Monthly billing only.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-pro-100", providerId: "chatgpt", name: "Pro (first tier)", audience: "individual", pricedPer: "account", monthlyPrice: 100, annualBilledMonthlyPrice: null, usage: "5x Plus", extras: null, notes: "One of three Pro tiers.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-pro-200", providerId: "chatgpt", name: "Pro (second tier)", audience: "individual", pricedPer: "account", monthlyPrice: 200, annualBilledMonthlyPrice: null, usage: "20x Plus", extras: null, notes: "One of three Pro tiers.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-pro-500", providerId: "chatgpt", name: "Pro (third tier)", audience: "individual", pricedPer: "account", monthlyPrice: 500, annualBilledMonthlyPrice: null, usage: "Highest included usage of the Pro tiers", extras: null, notes: "One of three Pro tiers. Ultrafast, a faster-response option, is listed only on this tier.", minSeats: null, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-business-standard", providerId: "chatgpt", name: "Business Standard", audience: "team", pricedPer: "seat", monthlyPrice: 25, annualBilledMonthlyPrice: 20, usage: null, extras: null, notes: "Team workspace with admin controls.", minSeats: 2, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },
  { id: "chatgpt-business-premium", providerId: "chatgpt", name: "Business Premium", audience: "team", pricedPer: "seat", monthlyPrice: 125, annualBilledMonthlyPrice: 100, usage: "5x Standard", extras: null, notes: "For team members who need higher usage.", minSeats: 2, sourceUrl: CHATGPT_PRICING_URL, verifiedOn: null },

  // Claude
  { id: "claude-free", providerId: "claude", name: "Free", audience: "individual", pricedPer: "account", monthlyPrice: 0, annualBilledMonthlyPrice: null, usage: "Lowest limits", extras: null, notes: "Limited use.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },
  { id: "claude-pro", providerId: "claude", name: "Pro", audience: "individual", pricedPer: "account", monthlyPrice: 20, annualBilledMonthlyPrice: 17, usage: "About 5x Free", extras: null, notes: "Adds Claude Code access and more usage.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },
  { id: "claude-max-5x", providerId: "claude", name: "Max (5x)", audience: "individual", pricedPer: "account", monthlyPrice: 100, annualBilledMonthlyPrice: null, usage: "5x Pro", extras: null, notes: "For heavy daily or coding use. Listed with a monthly API credit: check the provider's terms.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },
  { id: "claude-max-20x", providerId: "claude", name: "Max (20x)", audience: "individual", pricedPer: "account", monthlyPrice: 200, annualBilledMonthlyPrice: null, usage: "20x Pro", extras: null, notes: "For heavy daily or coding use. Listed with a monthly API credit: check the provider's terms.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },
  { id: "claude-team-standard", providerId: "claude", name: "Team Standard", audience: "team", pricedPer: "seat", monthlyPrice: 25, annualBilledMonthlyPrice: 20, usage: null, extras: null, notes: "Shared workspace with admin controls, SSO and central billing.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },
  { id: "claude-team-premium", providerId: "claude", name: "Team Premium", audience: "team", pricedPer: "seat", monthlyPrice: 125, annualBilledMonthlyPrice: 100, usage: "5x Standard", extras: null, notes: "For team members who need higher usage.", minSeats: null, sourceUrl: CLAUDE_PRICING_URL, verifiedOn: null },

  // Gemini (Google AI plans)
  { id: "gemini-free", providerId: "gemini", name: "Free", audience: "individual", pricedPer: "account", monthlyPrice: 0, annualBilledMonthlyPrice: null, usage: "Lowest limits", extras: "15 GB storage", notes: "Limited use.", minSeats: null, sourceUrl: GEMINI_PRICING_URL, verifiedOn: null },
  { id: "gemini-ai-plus", providerId: "gemini", name: "Google AI Plus", audience: "individual", pricedPer: "account", monthlyPrice: 4.99, annualBilledMonthlyPrice: null, usage: "2x Free", extras: "400 GB storage", notes: "Entry paid plan.", minSeats: null, sourceUrl: GEMINI_PRICING_URL, verifiedOn: null },
  { id: "gemini-ai-pro", providerId: "gemini", name: "Google AI Pro", audience: "individual", pricedPer: "account", monthlyPrice: 19.99, annualBilledMonthlyPrice: null, usage: "4x Free", extras: "5 TB storage", notes: "The standard paid individual plan.", minSeats: null, sourceUrl: GEMINI_PRICING_URL, verifiedOn: null },
  { id: "gemini-ai-ultra-5x", providerId: "gemini", name: "Google AI Ultra (5x)", audience: "individual", pricedPer: "account", monthlyPrice: 99.99, annualBilledMonthlyPrice: null, usage: "5x AI Pro", extras: "Storage starting at 20 TB", notes: "One of two Ultra tiers.", minSeats: null, sourceUrl: GEMINI_PRICING_URL, verifiedOn: null },
  { id: "gemini-ai-ultra-20x", providerId: "gemini", name: "Google AI Ultra (20x)", audience: "individual", pricedPer: "account", monthlyPrice: 199.99, annualBilledMonthlyPrice: null, usage: "20x AI Pro", extras: "Storage starting at 20 TB", notes: "One of two Ultra tiers.", minSeats: null, sourceUrl: GEMINI_PRICING_URL, verifiedOn: null },
];

/** Oldest check date when every record is verified, otherwise null. Feeds the hub and the page's indexing rule. */
export const PLANS_VERIFIED_ON: string | null = oldestVerifiedOnAll(PLAN_RECORDS);