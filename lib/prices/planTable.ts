import type { VerificationLevel } from "./apiCostTable";

export type PlanProvider = "ChatGPT" | "Claude" | "Gemini";

export interface ConsumerPlan {
  id: string;
  provider: PlanProvider;
  plan: string;
  /** Name shown in lists and calculators. */
  label: string;
  /** US dollars per month, per seat on team plans. 0 for free plans. */
  monthlyPrice: number;
  /** US dollars per month when billed once a year, or null if no yearly price is listed. */
  annualMonthlyPrice: number | null;
  perSeat: boolean;
  minimumSeats: number;
  /** The price as the provider is reported to state it. */
  priceNote: string;
  note: string;
  verification: VerificationLevel;
}

/** Month the prices were reported (Blueprint 6.8). Not yet read on provider pages. */
export const PLAN_PRICES_AS_REPORTED = "October 2026";

/** US monthly prices from Blueprint 6.8. Replace each with the provider's own page, then record the check date. */
export const CONSUMER_PLANS: readonly ConsumerPlan[] = [
  { id: "chatgpt-free", provider: "ChatGPT", plan: "Free", label: "ChatGPT Free", monthlyPrice: 0, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$0", note: "Limited use; ads in the US free tier since Feb 2026", verification: "secondary" },
  { id: "chatgpt-go", provider: "ChatGPT", plan: "Go", label: "ChatGPT Go", monthlyPrice: 8, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$8 / month", note: "Budget step up; may include ads", verification: "secondary" },
  { id: "chatgpt-plus", provider: "ChatGPT", plan: "Plus", label: "ChatGPT Plus", monthlyPrice: 20, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$20 / month", note: "Default paid plan", verification: "secondary" },
  { id: "chatgpt-pro-100", provider: "ChatGPT", plan: "Pro", label: "ChatGPT Pro ($100 tier)", monthlyPrice: 100, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$100 / month", note: "Three tiers with rising usage", verification: "secondary" },
  { id: "chatgpt-pro-200", provider: "ChatGPT", plan: "Pro", label: "ChatGPT Pro ($200 tier)", monthlyPrice: 200, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$200 / month", note: "Three tiers with rising usage", verification: "secondary" },
  { id: "chatgpt-pro-500", provider: "ChatGPT", plan: "Pro", label: "ChatGPT Pro ($500 tier)", monthlyPrice: 500, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$500 / month", note: "Three tiers with rising usage", verification: "secondary" },
  { id: "chatgpt-business", provider: "ChatGPT", plan: "Business", label: "ChatGPT Business (per seat)", monthlyPrice: 25, annualMonthlyPrice: 20, perSeat: true, minimumSeats: 2, priceNote: "$25 per seat ($20 annual)", note: "Two-seat minimum", verification: "secondary" },
  { id: "chatgpt-business-premium", provider: "ChatGPT", plan: "Business Premium", label: "ChatGPT Business Premium (per seat)", monthlyPrice: 125, annualMonthlyPrice: 100, perSeat: true, minimumSeats: 2, priceNote: "$125 per seat ($100 annual)", note: "Two-seat minimum", verification: "secondary" },
  { id: "claude-free", provider: "Claude", plan: "Free", label: "Claude Free", monthlyPrice: 0, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$0", note: "Limited usage", verification: "secondary" },
  { id: "claude-pro", provider: "Claude", plan: "Pro", label: "Claude Pro", monthlyPrice: 20, annualMonthlyPrice: 17, perSeat: false, minimumSeats: 1, priceNote: "$20 / month ($17 annual)", note: "Adds Claude Code access and more usage", verification: "secondary" },
  { id: "claude-max-5x", provider: "Claude", plan: "Max", label: "Claude Max (5x Pro)", monthlyPrice: 100, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$100 / month", note: "Heavy daily or coding use", verification: "secondary" },
  { id: "claude-max-20x", provider: "Claude", plan: "Max", label: "Claude Max (20x Pro)", monthlyPrice: 200, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$200 / month", note: "Heavy daily or coding use", verification: "secondary" },
  { id: "claude-team-standard", provider: "Claude", plan: "Team", label: "Claude Team standard (per seat)", monthlyPrice: 25, annualMonthlyPrice: 20, perSeat: true, minimumSeats: 1, priceNote: "$25 per seat ($20 annual)", note: "Standard seat", verification: "secondary" },
  { id: "claude-team-premium", provider: "Claude", plan: "Team", label: "Claude Team premium (per seat)", monthlyPrice: 125, annualMonthlyPrice: 100, perSeat: true, minimumSeats: 1, priceNote: "$125 per seat ($100 annual)", note: "Premium seat", verification: "secondary" },
  { id: "gemini-free", provider: "Gemini", plan: "Free", label: "Gemini Free", monthlyPrice: 0, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$0", note: "Limited Pro model access", verification: "secondary" },
  { id: "google-ai-plus", provider: "Gemini", plan: "Google AI Plus", label: "Google AI Plus", monthlyPrice: 4.99, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$4.99 / month", note: "400 GB storage; older articles quote $7.99", verification: "secondary" },
  { id: "google-ai-pro", provider: "Gemini", plan: "Google AI Pro", label: "Google AI Pro", monthlyPrice: 19.99, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$19.99 / month", note: "5 TB storage; mainstream paid plan", verification: "secondary" },
  { id: "google-ai-ultra-5x", provider: "Gemini", plan: "Google AI Ultra", label: "Google AI Ultra (5x)", monthlyPrice: 99.99, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "From $99.99 / month", note: "Highest limits", verification: "secondary" },
  { id: "google-ai-ultra-20x", provider: "Gemini", plan: "Google AI Ultra", label: "Google AI Ultra (20x)", monthlyPrice: 199.99, annualMonthlyPrice: null, perSeat: false, minimumSeats: 1, priceNote: "$199.99 / month", note: "Highest limits", verification: "secondary" },
];

export const PAID_CONSUMER_PLANS: readonly ConsumerPlan[] = CONSUMER_PLANS.filter((plan) => plan.monthlyPrice > 0);

/** Returns the plan, or null when the id is empty or unknown. */
export function findPlanById(id: string | null): ConsumerPlan | null {
  if (!id) return null;
  return CONSUMER_PLANS.find((plan) => plan.id === id) ?? null;
}

/** Like findPlanById, but a missing plan is a bug in the caller, so it throws. */
export function getPlanById(id: string): ConsumerPlan {
  const plan = findPlanById(id);
  if (!plan) throw new Error(`Unknown consumer plan "${id}"`);
  return plan;
}