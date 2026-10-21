import type { VerifiableRecord } from "./verification";

export type ProviderId = "chatgpt" | "claude" | "gemini";
export type PlanAudience = "individual" | "team";
export type PricedPer = "account" | "seat";
export type BillingCycle = "monthly" | "annual";

export interface Provider {
  id: ProviderId;
  name: string;
  maker: string;
  /** The provider's own pricing page. */
  pricingUrl: string;
  /** ISO date a third-party source reported these prices. Used only until the provider's page has been checked. */
  reportedAsOf: string;
}

export interface PlanRecord extends VerifiableRecord {
  id: string;
  providerId: ProviderId;
  name: string;
  audience: PlanAudience;
  pricedPer: PricedPer;
  /** US dollars per month, billed monthly. */
  monthlyPrice: number;
  /** US dollars per month when billed annually, or null if no annual price is listed. */
  annualBilledMonthlyPrice: number | null;
  /** Usage level relative to another plan of the same provider, or null. */
  usage: string | null;
  /** Included extras such as storage, or null. */
  extras: string | null;
  notes: string;
  minSeats: number | null;
  /** Official page this price comes from. */
  sourceUrl: string;
}

export interface PlanFilters {
  providerId: ProviderId | "all";
  audience: PlanAudience | "all";
  /** Compared with the monthly-billing price. Null means no limit. */
  maxMonthlyPrice: number | null;
}

export interface PriceBand {
  id: string;
  label: string;
  /** Inclusive lower bound, US dollars per month. */
  minPrice: number;
  /** Exclusive upper bound, or null for no upper bound. */
  maxPrice: number | null;
}