import { parseNumberField } from "@/lib/shared/numberInput";
import type { BillingCycle, PlanFilters, PlanRecord, PriceBand } from "./planTypes";
import { formatVerifiedDate, type VerificationSummary } from "./verification";

const MONTHS_PER_YEAR = 12;
const CENTS_PER_DOLLAR = 100;

export type BudgetParseResult = { ok: true; value: number | null } | { ok: false };

export interface PriceBandGroup {
  band: PriceBand;
  plans: PlanRecord[];
}

/** Twelve months of the plan in US dollars, or null when annual billing is asked for but not listed. */
export function yearlyCost(plan: PlanRecord, billing: BillingCycle): number | null {
  const monthly = billing === "monthly" ? plan.monthlyPrice : plan.annualBilledMonthlyPrice;
  if (monthly === null) return null;
  return Math.round(monthly * MONTHS_PER_YEAR * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
}

/** "$0", "$8", "$4.99": no trailing zeros for whole dollars, two decimals otherwise. */
export function formatPlanPrice(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/** Blank means no limit. Negative or non-numeric text is invalid. */
export function parseBudget(text: string): BudgetParseResult {
  if (text.trim() === "") return { ok: true, value: null };
  const value = parseNumberField(text);
  if (!Number.isFinite(value) || value < 0) return { ok: false };
  return { ok: true, value };
}

/** Keeps plans that match the provider, the audience and the monthly budget. */
export function filterPlans(plans: readonly PlanRecord[], filters: PlanFilters): PlanRecord[] {
  return plans.filter((plan) => {
    if (filters.providerId !== "all" && plan.providerId !== filters.providerId) return false;
    if (filters.audience !== "all" && plan.audience !== filters.audience) return false;
    if (filters.maxMonthlyPrice !== null && plan.monthlyPrice > filters.maxMonthlyPrice) return false;
    return true;
  });
}

/** Sorts plans into price bands, keeping the input order inside each band. Bands with no plans stay in the result. */
export function groupByPriceBand(plans: readonly PlanRecord[], bands: readonly PriceBand[]): PriceBandGroup[] {
  return bands.map((band) => ({
    band,
    plans: plans.filter(
      (plan) => plan.monthlyPrice >= band.minPrice && (band.maxPrice === null || plan.monthlyPrice < band.maxPrice),
    ),
  }));
}

/** One sentence about how far the plan prices have been checked against provider pages. */
export function describePlanVerification(summary: VerificationSummary): string {
  if (summary.verifiedCount === 0) {
    return `None of the ${summary.total} plans below has been checked against the provider's own page yet. Prices are as reported by third-party sources and may be out of date.`;
  }
  if (summary.pendingCount > 0) {
    return `${summary.verifiedCount} of ${summary.total} plans have been checked on the provider's own page. The rest are still as reported by third-party sources.`;
  }
  return `All ${summary.total} plans were checked on the providers' own pages. Oldest check: ${formatVerifiedDate(summary.oldestVerifiedOn ?? "")}.`;
}