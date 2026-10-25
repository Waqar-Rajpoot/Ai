// import {
//   CONSUMER_PLANS,
//   findPlanById,
//   PAID_CONSUMER_PLANS,
//   PLAN_PRICES_AS_REPORTED,
//   getPlanById,
//   type ConsumerPlan,
//   type PlanProvider,
// } from "./consumerPlans";

// export {
//   CONSUMER_PLANS,
//   findPlanById,
//   getPlanById,
//   PAID_CONSUMER_PLANS,
//   PLAN_PRICES_AS_REPORTED,
// };
// export type { ConsumerPlan, PlanProvider };

// /** The apps on the Plans page, in display order (Blueprint 5.4). */
// export const PLAN_PROVIDERS: readonly PlanProvider[] = ["ChatGPT", "Claude", "Gemini"];

// export type AppFilter = PlanProvider | "all";

// /** The plan most readers mean by "the paid plan" for each app. */
// const MAINSTREAM_PLAN_IDS: Record<PlanProvider, string> = {
//   ChatGPT: "chatgpt-plus",
//   Claude: "claude-pro",
//   Gemini: "google-ai-pro",
// };

// const SNAPSHOT_TAGLINES: Record<PlanProvider, string> = {
//   ChatGPT: "The widest ladder of paid tiers, and a free plan that can show ads.",
//   Claude: "Pro adds Claude Code access. Max steps usage up for heavy daily or coding use.",
//   Gemini: "Plans bundle storage with AI access, from a low-cost Plus tier up to Ultra.",
// };

// /** ISO dates the plan prices were read (Blueprint 6.8: ChatGPT and Gemini updated Oct 8, Claude plans read Sep 14). */
// const PLAN_SOURCE_DATES: Record<PlanProvider, string> = {
//   ChatGPT: "2026-10-08",
//   Claude: "2026-09-14",
//   Gemini: "2026-10-08",
// };

// const USAGE_MULTIPLES: Readonly<Record<string, number>> = {
//   "claude-pro": 1,
//   "claude-max-5x": 5,
//   "claude-max-20x": 20,
//   "google-ai-pro": 1,
//   "google-ai-ultra-5x": 5,
//   "google-ai-ultra-20x": 20,
// };

// /** What each multiple is measured against. Null when we have no confirmed multiples for the app. */
// const USAGE_BASIS: Record<PlanProvider, string | null> = {
//   ChatGPT: null,
//   Claude: "Claude Pro usage",
//   Gemini: "Google AI Pro usage",
// };

// const CENTS_PER_DOLLAR = 100;

// export interface UsageValue {
//   plan: ConsumerPlan;
//   /** Usage as a multiple of the basis plan, or null when it is not stated. */
//   usageMultiple: number | null;
//   /** Monthly price divided by the multiple, or null when there is no multiple. */
//   pricePerUsageUnit: number | null;
//   /** What the multiple is measured against, or null. */
//   basis: string | null;
// }

// export interface PlanSnapshot {
//   app: PlanProvider;
//     /** The app id used by the compare pages. */
//   appId: AppId;
//   /** ISO date the plan prices were read, or null. */
//   sourceDate: string | null;
//   tagline: string;
//   freePlan: ConsumerPlan | null;
//   /** The plan most readers mean by the paid plan. */
//   mainstreamPlan: ConsumerPlan;
//   cheapestPaidPlan: ConsumerPlan;
//   /** The most expensive individual (not per-seat) plan. */
//   topPlan: ConsumerPlan;
//   paidIndividualPlanCount: number;
//   teamPlans: readonly ConsumerPlan[];
//   /** For example "$0 to $200 a month". */
//   priceRangeLabel: string;
  
// }

// /** Formats US dollars: whole amounts without cents, others with two decimals ("$8", "$19.99"). */
// export function formatPlanDollars(amount: number): string {
//   const hasCents = Math.round(amount * CENTS_PER_DOLLAR) % CENTS_PER_DOLLAR !== 0;
//   return `$${amount.toLocaleString("en-US", {
//     minimumFractionDigits: hasCents ? 2 : 0,
//     maximumFractionDigits: 2,
//   })}`;
// }

// /** Plans for one app in listed order, or every plan for "all". Also accepts a plan list and an app id: getPlansForApp(plans, "claude"). */
// export function getPlansForApp(app: AppFilter): ConsumerPlan[];
// export function getPlansForApp(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan[];
// export function getPlansForApp(first: AppFilter | readonly ConsumerPlan[], appId?: AppId): ConsumerPlan[] {
//   if (typeof first !== "string") return first.filter((plan) => plan.appId === appId);
//   return first === "all" ? [...CONSUMER_PLANS] : CONSUMER_PLANS.filter((plan: ConsumerPlan) => plan.provider === first);
// }

// /** Usage multiple and price per unit of usage for each plan. Plans without a stated multiple get nulls. */
// export function getUsageValues(plans: readonly ConsumerPlan[]): UsageValue[] {
//   return plans.map((plan) => {
//     const usageMultiple = USAGE_MULTIPLES[plan.id] ?? null;
//     const pricePerUsageUnit =
//       usageMultiple === null || plan.monthlyPrice === 0
//         ? null
//         : Math.round((plan.monthlyPrice / usageMultiple) * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
//     return { plan, usageMultiple, pricePerUsageUnit, basis: USAGE_BASIS[plan.provider] };
//   });
// }

// function buildSnapshot(app: PlanProvider): PlanSnapshot {
//   const plans = getPlansForApp(app);
//   const paidIndividual = plans.filter((plan) => !plan.perSeat && plan.monthlyPrice > 0);
//   if (paidIndividual.length === 0) throw new Error(`No paid individual plans for "${app}"`);

//   const cheapestPaidPlan = paidIndividual.reduce((cheapest, plan) =>
//     plan.monthlyPrice < cheapest.monthlyPrice ? plan : cheapest,
//   );
//   const topPlan = paidIndividual.reduce((top, plan) => (plan.monthlyPrice > top.monthlyPrice ? plan : top));
//   const freePlan = plans.find((plan) => plan.monthlyPrice === 0) ?? null;
//   const lowestPrice = freePlan ? 0 : cheapestPaidPlan.monthlyPrice;

//   return {
//     app,
//     tagline: SNAPSHOT_TAGLINES[app],
//     freePlan,
//     mainstreamPlan: getPlanById(MAINSTREAM_PLAN_IDS[app]),
//     cheapestPaidPlan,
//     topPlan,
//     paidIndividualPlanCount: paidIndividual.length,
//     teamPlans: plans.filter((plan) => plan.perSeat),
//     priceRangeLabel: `${formatPlanDollars(lowestPrice)} to ${formatPlanDollars(topPlan.monthlyPrice)} a month`,
//   };
// }

// /** One summary per app, in display order. Built from the plan data, so it cannot disagree with it. */
// export const PLAN_SNAPSHOTS: readonly PlanSnapshot[] = PLAN_PROVIDERS.map(buildSnapshot);

// /** The snapshot for one app, or undefined. */
// export function findPlanSnapshot(app: PlanProvider): PlanSnapshot | undefined {
//   return PLAN_SNAPSHOTS.find((snapshot) => snapshot.app === app);
// }

// /**
//  * Sanity-checks the plan data and returns a list of problems (empty when clean).
//  * Meant for a unit test, so a typo in a price fails the build instead of reaching readers.
//  */
// export function validateConsumerPlans(plans: readonly ConsumerPlan[]): string[] {
//   const problems: string[] = [];
//   const seenIds = new Set<string>();

//   for (const plan of plans) {
//     if (seenIds.has(plan.id)) problems.push(`Duplicate id "${plan.id}"`);
//     seenIds.add(plan.id);
//     if (plan.monthlyPrice < 0) problems.push(`${plan.id}: price cannot be negative`);
//     if (plan.annualMonthlyPrice !== null && plan.annualMonthlyPrice >= plan.monthlyPrice) {
//       problems.push(`${plan.id}: the annual monthly price should be below the monthly price`);
//     }
//     if (plan.minimumSeats < 1) problems.push(`${plan.id}: minimumSeats must be at least 1`);
//     if (!plan.perSeat && plan.minimumSeats !== 1) problems.push(`${plan.id}: only per-seat plans can need more than one seat`);
//     if (!findPlanById(MAINSTREAM_PLAN_IDS[plan.provider])) {
//       problems.push(`${plan.provider}: the mainstream plan id does not exist`);
//     }
//   }
//   return problems;
// }









import {
  CONSUMER_PLANS,
  findPlanById,
  PAID_CONSUMER_PLANS,
  PLAN_PRICES_AS_REPORTED,
  getPlanById,
  type ConsumerPlan,
  type PlanProvider,
} from "./consumerPlans";

export {
  CONSUMER_PLANS,
  findPlanById,
  getPlanById,
  PAID_CONSUMER_PLANS,
  PLAN_PRICES_AS_REPORTED,
};
export type { ConsumerPlan, PlanProvider };

/** The apps on the Plans page, in display order (Blueprint 5.4). */
export const PLAN_PROVIDERS: readonly PlanProvider[] = ["ChatGPT", "Claude", "Gemini"];

export type AppFilter = PlanProvider | "all";

/** The plan most readers mean by "the paid plan" for each app. */
const MAINSTREAM_PLAN_IDS: Record<PlanProvider, string> = {
  ChatGPT: "chatgpt-plus",
  Claude: "claude-pro",
  Gemini: "google-ai-pro",
};

const SNAPSHOT_TAGLINES: Record<PlanProvider, string> = {
  ChatGPT: "The widest ladder of paid tiers, and a free plan that can show ads.",
  Claude: "Pro adds Claude Code access. Max steps usage up for heavy daily or coding use.",
  Gemini: "Plans bundle storage with AI access, from a low-cost Plus tier up to Ultra.",
};

/** ISO dates the plan prices were read (Blueprint 6.8: ChatGPT and Gemini updated Oct 8, Claude plans read Sep 14). */
const PLAN_SOURCE_DATES: Record<PlanProvider, string> = {
  ChatGPT: "2026-10-08",
  Claude: "2026-09-14",
  Gemini: "2026-10-08",
};

const USAGE_MULTIPLES: Readonly<Record<string, number>> = {
  "claude-pro": 1,
  "claude-max-5x": 5,
  "claude-max-20x": 20,
  "google-ai-pro": 1,
  "google-ai-ultra-5x": 5,
  "google-ai-ultra-20x": 20,
};

/** What each multiple is measured against. Null when we have no confirmed multiples for the app. */
const USAGE_BASIS: Record<PlanProvider, string | null> = {
  ChatGPT: null,
  Claude: "Claude Pro usage",
  Gemini: "Google AI Pro usage",
};

const CENTS_PER_DOLLAR = 100;

export interface UsageValue {
  plan: ConsumerPlan;
  /** Usage as a multiple of the basis plan, or null when it is not stated. */
  usageMultiple: number | null;
  /** Monthly price divided by the multiple, or null when there is no multiple. */
  pricePerUsageUnit: number | null;
  /** What the multiple is measured against, or null. */
  basis: string | null;
}

export interface PlanSnapshot {
  app: PlanProvider;
  /** The app id used by the compare pages. */
  appId: AppId;
  /** ISO date the plan prices were read, or null. */
  sourceDate: string | null;
  tagline: string;
  freePlan: ConsumerPlan | null;
  /** The plan most readers mean by the paid plan. */
  mainstreamPlan: ConsumerPlan;
  cheapestPaidPlan: ConsumerPlan;
  /** The most expensive individual (not per-seat) plan. */
  topPlan: ConsumerPlan;
  paidIndividualPlanCount: number;
  teamPlans: readonly ConsumerPlan[];
  /** For example "$0 to $200 a month". */
  priceRangeLabel: string;
}

/** Formats US dollars: whole amounts without cents, others with two decimals ("$8", "$19.99"). */
export function formatPlanDollars(amount: number): string {
  const hasCents = Math.round(amount * CENTS_PER_DOLLAR) % CENTS_PER_DOLLAR !== 0;
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Plans for one app in listed order, or every plan for "all". Also accepts a plan list and an app id: getPlansForApp(plans, "claude"). */
export function getPlansForApp(app: AppFilter): ConsumerPlan[];
export function getPlansForApp(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan[];
export function getPlansForApp(first: AppFilter | readonly ConsumerPlan[], appId?: AppId): ConsumerPlan[] {
  if (typeof first !== "string") return first.filter((plan) => plan.appId === appId);
  return first === "all" ? [...CONSUMER_PLANS] : CONSUMER_PLANS.filter((plan: ConsumerPlan) => plan.provider === first);
}

/** Usage multiple and price per unit of usage for each plan. Plans without a stated multiple get nulls. */
export function getUsageValues(plans: readonly ConsumerPlan[]): UsageValue[] {
  return plans.map((plan) => {
    const usageMultiple = USAGE_MULTIPLES[plan.id] ?? null;
    const pricePerUsageUnit =
      usageMultiple === null || plan.monthlyPrice === 0
        ? null
        : Math.round((plan.monthlyPrice / usageMultiple) * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
    return { plan, usageMultiple, pricePerUsageUnit, basis: USAGE_BASIS[plan.provider] };
  });
}

function buildSnapshot(app: PlanProvider): PlanSnapshot {
  const plans = getPlansForApp(app);
  const paidIndividual = plans.filter((plan) => !plan.perSeat && plan.monthlyPrice > 0);
  if (paidIndividual.length === 0) throw new Error(`No paid individual plans for "${app}"`);

  const cheapestPaidPlan = paidIndividual.reduce((cheapest, plan) =>
    plan.monthlyPrice < cheapest.monthlyPrice ? plan : cheapest,
  );
  const topPlan = paidIndividual.reduce((top, plan) => (plan.monthlyPrice > top.monthlyPrice ? plan : top));
  const freePlan = plans.find((plan) => plan.monthlyPrice === 0) ?? null;
  const lowestPrice = freePlan ? 0 : cheapestPaidPlan.monthlyPrice;

  return {
    app,
    appId: paidIndividual[0].appId,
    sourceDate: PLAN_SOURCE_DATES[app],
    tagline: SNAPSHOT_TAGLINES[app],
    freePlan,
    mainstreamPlan: getPlanById(MAINSTREAM_PLAN_IDS[app]),
    cheapestPaidPlan,
    topPlan,
    paidIndividualPlanCount: paidIndividual.length,
    teamPlans: plans.filter((plan) => plan.perSeat),
    priceRangeLabel: `${formatPlanDollars(lowestPrice)} to ${formatPlanDollars(topPlan.monthlyPrice)} a month`,
  };
}

/** One summary per app, in display order. Built from the plan data, so it cannot disagree with it. */
export const PLAN_SNAPSHOTS: readonly PlanSnapshot[] = PLAN_PROVIDERS.map(buildSnapshot);

/** The snapshot for one app, or undefined. */
export function findPlanSnapshot(app: PlanProvider): PlanSnapshot | undefined {
  return PLAN_SNAPSHOTS.find((snapshot) => snapshot.app === app);
}

/**
 * Sanity-checks the plan data and returns a list of problems (empty when clean).
 * Meant for a unit test, so a typo in a price fails the build instead of reaching readers.
 */
export function validateConsumerPlans(plans: readonly ConsumerPlan[]): string[] {
  const problems: string[] = [];
  const seenIds = new Set<string>();

  for (const plan of plans) {
    if (seenIds.has(plan.id)) problems.push(`Duplicate id "${plan.id}"`);
    seenIds.add(plan.id);
    if (plan.monthlyPrice < 0) problems.push(`${plan.id}: price cannot be negative`);
    if (plan.annualMonthlyPrice !== null && plan.annualMonthlyPrice >= plan.monthlyPrice) {
      problems.push(`${plan.id}: the annual monthly price should be below the monthly price`);
    }
    if (plan.minimumSeats < 1) problems.push(`${plan.id}: minimumSeats must be at least 1`);
    if (!plan.perSeat && plan.minimumSeats !== 1) problems.push(`${plan.id}: only per-seat plans can need more than one seat`);
    if (!findPlanById(MAINSTREAM_PLAN_IDS[plan.provider])) {
      problems.push(`${plan.provider}: the mainstream plan id does not exist`);
    }
  }
  return problems;
}

/** App ids used by the compare pages. Grok has no consumer plans collected yet. */
export type AppId = ConsumerPlan["appId"];

/** Who a plan is for. */
export type PlanAudience = ConsumerPlan["audience"];

/** Plan-type options in the budget finder. */
export type PlanAudienceFilter = "any-paid" | PlanAudience;

export interface PlanBudgetFilter {
  maxMonthlyDollars: number;
  audience: PlanAudienceFilter;
}

export interface TeamBill {
  seats: number;
  monthlyDollars: number;
  /** Monthly cost when billed yearly, or null when no yearly price is listed. */
  annualMonthlyDollars: number | null;
}

export const PLAN_AUDIENCE_LABELS: Record<PlanAudience, string> = {
  free: "Free",
  individual: "One person",
  team: "Teams, per seat",
};

export const AUDIENCE_FILTERS: readonly { id: PlanAudienceFilter; label: string }[] = [
  { id: "any-paid", label: "Any paid plan" },
  { id: "individual", label: "Paid, for one person" },
  { id: "team", label: "Team plans (price per seat)" },
  { id: "free", label: "Free plans" },
];

export const DEFAULT_PLAN_BUDGET_DOLLARS = 20;
export const MAX_PLAN_BUDGET_DOLLARS = 1000;

const MONTHS_PER_YEAR = 12;

/** A standard team seat and the premium seat it is sold next to. */
const PREMIUM_SEAT_PLAN_IDS: Readonly<Record<string, string>> = {
  "chatgpt-business": "chatgpt-business-premium",
  "claude-team-standard": "claude-team-premium",
};

function roundToCents(amount: number): number {
  return Math.round(amount * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
}

/** Plans at or under a monthly budget, in listed order. "any-paid" leaves out free plans. */
export function filterPlansByBudget(plans: readonly ConsumerPlan[], filter: PlanBudgetFilter): ConsumerPlan[] {
  return plans.filter((plan) => {
    if (plan.monthlyDollars > filter.maxMonthlyDollars) return false;
    if (filter.audience === "any-paid") return plan.audience !== "free";
    return plan.audience === filter.audience;
  });
}

/** The cheapest plan with a price above zero, or null when there is none. */
export function getLowestPaidPlan(plans: readonly ConsumerPlan[]): ConsumerPlan | null {
  const paid = plans.filter((plan) => plan.monthlyDollars > 0);
  if (paid.length === 0) return null;
  return paid.reduce((lowest, plan) => (plan.monthlyDollars < lowest.monthlyDollars ? plan : lowest));
}

/** The cheapest paid plan for one person on one app, or null. */
export function getEntryPaidPlan(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan | null {
  return getLowestPaidPlan(plans.filter((plan) => plan.appId === appId && plan.audience === "individual"));
}

/** The plan most readers mean by "the paid plan" for an app, or null when none is marked. */
export function getMainstreamPlan(plans: readonly ConsumerPlan[], appId: AppId): ConsumerPlan | null {
  const provider = plans.find((plan) => plan.appId === appId)?.provider;
  if (!provider) return null;
  return plans.find((plan) => plan.id === MAINSTREAM_PLAN_IDS[provider]) ?? null;
}

/** Dollars saved per year (per seat on team plans) by billing yearly. Null when no yearly price is listed. */
export function getAnnualSavingsPerYear(plan: ConsumerPlan): number | null {
  if (plan.annualMonthlyDollars === undefined) return null;
  const savings = roundToCents((plan.monthlyDollars - plan.annualMonthlyDollars) * MONTHS_PER_YEAR);
  return savings > 0 ? savings : null;
}

/** Yearly saving per seat on the premium seat sold next to this plan. Null when the plan has no premium seat. */
export function getPremiumSeatSavingsPerYear(plan: ConsumerPlan): number | null {
  const premiumPlanId = PREMIUM_SEAT_PLAN_IDS[plan.id];
  if (!premiumPlanId) return null;
  const premiumPlan = findPlanById(premiumPlanId);
  return premiumPlan ? getAnnualSavingsPerYear(premiumPlan) : null;
}

/** The smallest team bill, only where the source gives a seat minimum of two or more. Otherwise null. */
export function getSmallestTeamBill(plan: ConsumerPlan): TeamBill | null {
  if (!plan.isPerSeat || plan.minimumSeats < 2) return null;
  return {
    seats: plan.minimumSeats,
    monthlyDollars: roundToCents(plan.monthlyDollars * plan.minimumSeats),
    annualMonthlyDollars:
      plan.annualMonthlyDollars === undefined ? null : roundToCents(plan.annualMonthlyDollars * plan.minimumSeats),
  };
}

/** One line such as "Smallest team bill: 2 seats, $50 a month, or $40 a month billed yearly." */
export function describeTeamBill(bill: TeamBill): string {
  const monthly = `${formatPlanDollars(bill.monthlyDollars)} a month`;
  const yearly =
    bill.annualMonthlyDollars === null ? "" : `, or ${formatPlanDollars(bill.annualMonthlyDollars)} a month billed yearly`;
  return `Smallest team bill: ${bill.seats} seats, ${monthly}${yearly}.`;
}