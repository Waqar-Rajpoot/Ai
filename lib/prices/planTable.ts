export type AppId = "chatgpt" | "claude" | "gemini" | "grok";
export type PlanAudience = "free" | "personal" | "heavy" | "team";
export type PlanAudienceFilter = PlanAudience | "any-paid";

export interface SeatPrice {
  monthlyDollars: number;
  /** Per-month price when billed yearly. */
  annualMonthlyDollars: number;
}

export interface UsageTier {
  monthlyDollars: number;
  /** How many times the base allowance this tier gives. */
  usageMultiple: number;
  /** Plan the multiple is measured against, when the source names one. */
  basePlanId?: string;
}

export interface ConsumerPlan {
  id: string;
  appId: AppId;
  name: string;
  audience: PlanAudience;
  /** Lowest US price per month, per person or per seat, billed monthly. */
  monthlyDollars: number;
  /** Per-month price when billed yearly, if offered. */
  annualMonthlyDollars?: number;
  /** True when the source gives several prices and monthlyDollars is the lowest. */
  isFromPrice?: boolean;
  /** Price exactly as the source gives it. */
  priceLabel: string;
  isPerSeat?: boolean;
  minimumSeats?: number;
  premiumSeat?: SeatPrice;
  usageTiers?: readonly UsageTier[];
  /** The plan most people mean by "the paid version". */
  isMainstream?: boolean;
  notes: string;
  /** Set only where the source says the plan shows ads. */
  adsNote?: string;
}

export interface PlanSnapshot {
  appId: AppId;
  /** ISO date the secondary source was updated or read, or null when no plan data was collected. */
  sourceDate: string | null;
}

export interface UsageValue {
  monthlyDollars: number;
  usageMultiple: number;
  baseName: string | null;
  /** This tier's price divided by the base plan's price. Null when no base plan is named. */
  priceMultiple: number | null;
}

export interface TeamBill {
  seats: number;
  monthlyDollars: number;
  annualMonthlyDollars?: number;
}

export const PLAN_AUDIENCE_LABELS: Record<PlanAudience, string> = {
  free: "Free",
  personal: "Personal",
  heavy: "Heavy use",
  team: "Teams",
};

export const AUDIENCE_FILTERS: readonly { id: PlanAudienceFilter; label: string }[] = [
  { id: "any-paid", label: "Any paid plan" },
  { id: "personal", label: "Personal" },
  { id: "heavy", label: "Heavy use" },
  { id: "team", label: "Teams (per seat)" },
  { id: "free", label: "Free plans" },
];

export const DEFAULT_PLAN_BUDGET_DOLLARS = 20;
/** Upper limit for a typed-in budget, so a typo cannot produce absurd results. */
export const MAX_PLAN_BUDGET_DOLLARS = 1000;
const MONTHS_PER_YEAR = 12;

/** Blueprint 6.8: ChatGPT and Gemini sources updated Oct 8, Claude plans read Sep 14, no Grok plan data. */
export const PLAN_SNAPSHOTS: readonly PlanSnapshot[] = [
  { appId: "chatgpt", sourceDate: "2026-10-08" },
  { appId: "claude", sourceDate: "2026-09-14" },
  { appId: "gemini", sourceDate: "2026-10-08" },
  { appId: "grok", sourceDate: null },
];

/**
 * Blueprint 6.8: US monthly prices as reported in Oct 2026. These come from secondary sources.
 * The launch task is to replace each with the provider's own page and record the date.
 */
export const CONSUMER_PLANS: readonly ConsumerPlan[] = [
  { id: "chatgpt-free", appId: "chatgpt", name: "ChatGPT Free", audience: "free", monthlyDollars: 0, priceLabel: "$0", notes: "Limited use.", adsNote: "Ads in the US free tier since Feb 2026." },
  { id: "chatgpt-go", appId: "chatgpt", name: "ChatGPT Go", audience: "personal", monthlyDollars: 8, priceLabel: "$8 / month", notes: "Budget step up.", adsNote: "May include ads." },
  { id: "chatgpt-plus", appId: "chatgpt", name: "ChatGPT Plus", audience: "personal", monthlyDollars: 20, priceLabel: "$20 / month", isMainstream: true, notes: "Default paid plan." },
  { id: "chatgpt-pro", appId: "chatgpt", name: "ChatGPT Pro", audience: "heavy", monthlyDollars: 100, isFromPrice: true, priceLabel: "$100, $200 or $500 / month", notes: "Three tiers with rising usage." },
  {
    id: "chatgpt-business", appId: "chatgpt", name: "ChatGPT Business", audience: "team", monthlyDollars: 25, annualMonthlyDollars: 20,
    isPerSeat: true, minimumSeats: 2, premiumSeat: { monthlyDollars: 125, annualMonthlyDollars: 100 },
    priceLabel: "$25 per seat ($20 annual); Premium $125 ($100 annual)", notes: "Two-seat minimum.",
  },
  { id: "claude-free", appId: "claude", name: "Claude Free", audience: "free", monthlyDollars: 0, priceLabel: "$0", notes: "Limited usage." },
  { id: "claude-pro", appId: "claude", name: "Claude Pro", audience: "personal", monthlyDollars: 20, annualMonthlyDollars: 17, isMainstream: true, priceLabel: "$20 / month ($17 annual)", notes: "Adds Claude Code access and more usage." },
  {
    id: "claude-max", appId: "claude", name: "Claude Max", audience: "heavy", monthlyDollars: 100, isFromPrice: true,
    priceLabel: "$100 (5x Pro) or $200 (20x Pro) / month", notes: "Heavy daily or coding use.",
    usageTiers: [
      { monthlyDollars: 100, usageMultiple: 5, basePlanId: "claude-pro" },
      { monthlyDollars: 200, usageMultiple: 20, basePlanId: "claude-pro" },
    ],
  },
  {
    id: "claude-team", appId: "claude", name: "Claude Team", audience: "team", monthlyDollars: 25, annualMonthlyDollars: 20,
    isPerSeat: true, premiumSeat: { monthlyDollars: 125, annualMonthlyDollars: 100 },
    priceLabel: "$25 or $125 per seat ($20 or $100 annual)", notes: "Standard and premium seats.",
  },
  { id: "gemini-free", appId: "gemini", name: "Gemini Free", audience: "free", monthlyDollars: 0, priceLabel: "$0", notes: "Limited Pro model access." },
  { id: "gemini-plus", appId: "gemini", name: "Google AI Plus", audience: "personal", monthlyDollars: 4.99, priceLabel: "$4.99 / month", notes: "400 GB storage. Older articles quote $7.99." },
  { id: "gemini-pro", appId: "gemini", name: "Google AI Pro", audience: "personal", monthlyDollars: 19.99, isMainstream: true, priceLabel: "$19.99 / month", notes: "5 TB storage. Mainstream paid plan." },
  {
    id: "gemini-ultra", appId: "gemini", name: "Google AI Ultra", audience: "heavy", monthlyDollars: 99.99, isFromPrice: true,
    priceLabel: "From $99.99 (5x), $199.99 (20x)", notes: "Highest limits.",
    usageTiers: [
      { monthlyDollars: 99.99, usageMultiple: 5 },
      { monthlyDollars: 199.99, usageMultiple: 20 },
    ],
  },
];

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/** "$20" for whole dollars, "$4.99" otherwise. */
export function formatPlanDollars(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function getPlansForApp(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan[] {
  return plans.filter((plan) => plan.appId === appId);
}

/** The cheapest paid plan for one person (personal or heavy use). Team seats are not counted. */
export function getEntryPaidPlan(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan | undefined {
  return plans
    .filter((plan) => plan.appId === appId && (plan.audience === "personal" || plan.audience === "heavy"))
    .sort((first, second) => first.monthlyDollars - second.monthlyDollars)[0];
}

export function getMainstreamPlan(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan | undefined {
  return plans.find((plan) => plan.appId === appId && plan.isMainstream === true);
}

/** The cheapest paid plan across every app. */
export function getLowestPaidPlan(plans: readonly ConsumerPlan[]): ConsumerPlan | undefined {
  return plans
    .filter((plan) => plan.audience !== "free")
    .sort((first, second) => first.monthlyDollars - second.monthlyDollars)[0];
}

/** Yearly saving from annual billing, per person or per seat. Null when no annual price is given. */
export function getAnnualSavingsPerYear(plan: ConsumerPlan): number | null {
  if (plan.annualMonthlyDollars === undefined) return null;
  return roundToCents((plan.monthlyDollars - plan.annualMonthlyDollars) * MONTHS_PER_YEAR);
}

/** Yearly saving on a premium seat from annual billing. */
export function getPremiumSeatSavingsPerYear(plan: ConsumerPlan): number | null {
  if (!plan.premiumSeat) return null;
  return roundToCents((plan.premiumSeat.monthlyDollars - plan.premiumSeat.annualMonthlyDollars) * MONTHS_PER_YEAR);
}

/** The smallest allowed team bill, or null when the plan has no seat minimum. */
export function getSmallestTeamBill(plan: ConsumerPlan): TeamBill | null {
  if (!plan.isPerSeat || plan.minimumSeats === undefined) return null;
  return {
    seats: plan.minimumSeats,
    monthlyDollars: roundToCents(plan.monthlyDollars * plan.minimumSeats),
    annualMonthlyDollars:
      plan.annualMonthlyDollars === undefined ? undefined : roundToCents(plan.annualMonthlyDollars * plan.minimumSeats),
  };
}

/** "Smallest team: 2 seats, $50 a month ($40 a month billed yearly)." */
export function describeTeamBill(bill: TeamBill): string {
  const yearly =
    bill.annualMonthlyDollars === undefined ? "" : ` (${formatPlanDollars(bill.annualMonthlyDollars)} a month billed yearly)`;
  return `Smallest team: ${bill.seats} seats, ${formatPlanDollars(bill.monthlyDollars)} a month${yearly}.`;
}

/** Usage multiple and price multiple for each heavy tier. The price multiple needs a named base plan. */
export function getUsageValues(plans: readonly ConsumerPlan[], plan: ConsumerPlan): UsageValue[] {
  return (plan.usageTiers ?? []).map((tier) => {
    const base = tier.basePlanId ? plans.find((candidate) => candidate.id === tier.basePlanId) : undefined;
    return {
      monthlyDollars: tier.monthlyDollars,
      usageMultiple: tier.usageMultiple,
      baseName: base?.name ?? null,
      priceMultiple: base && base.monthlyDollars > 0 ? roundToCents(tier.monthlyDollars / base.monthlyDollars) : null,
    };
  });
}

export interface PlanBudgetFilter {
  maxMonthlyDollars: number;
  audience: PlanAudienceFilter;
}

/** Plans at or under the budget for one audience, cheapest first. "any-paid" leaves out free plans. */
export function filterPlansByBudget(plans: readonly ConsumerPlan[], filter: PlanBudgetFilter): ConsumerPlan[] {
  return plans
    .filter((plan) => plan.monthlyDollars <= filter.maxMonthlyDollars)
    .filter((plan) => (filter.audience === "any-paid" ? plan.audience !== "free" : plan.audience === filter.audience))
    .sort(
      (first, second) =>
        first.monthlyDollars - second.monthlyDollars ||
        first.appId.localeCompare(second.appId, "en") ||
        first.name.localeCompare(second.name, "en"),
    );
}