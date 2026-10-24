import { getPlanById, type ConsumerPlan } from "@/lib/prices/planTable";
import { localCalendarDaysUntil } from "@/lib/shared/dates";
import {
  DAYS_PER_YEAR,
  MAX_HOURLY_VALUE,
  MAX_HOURS_SAVED_PER_MONTH,
  MAX_PRICE,
  MAX_SEATS,
  MAX_TAX_PERCENT,
  MONTHS_PER_YEAR,
  RENEWAL_WINDOW_DAYS,
  WEEKS_PER_YEAR,
  WORTH_CLEARLY_RATIO,
} from "./subscriptionConstants";

export type BillingCycle = "month" | "year";
export type PlanBilling = "monthly" | "annual";
export type SubscriptionKind = "chat" | "coding" | "media" | "writing" | "other";

export const SUBSCRIPTION_KIND_LABELS: Record<SubscriptionKind, string> = {
  chat: "Chat assistant",
  coding: "Coding or agent tool",
  media: "Image, audio or video tool",
  writing: "Writing or document tool",
  other: "Other",
};

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  month: "Every month",
  year: "Every year",
};

/** Number fields are kept as typed text so a field can be empty or half-typed. */
export interface SubscriptionRow {
  id: string;
  name: string;
  kind: SubscriptionKind;
  priceText: string;
  cycle: BillingCycle;
  seatsText: string;
  /** "" or YYYY-MM-DD. */
  renewsOn: string;
  /** Set when the row came from a plan preset. */
  presetId: string | null;
}

export type NewSubscriptionRow = Omit<SubscriptionRow, "id">;

export interface Totals {
  countedRows: number;
  skippedRows: number;
  taxPercent: number;
  monthlyBeforeTax: number;
  yearlyBeforeTax: number;
  monthly: number;
  yearly: number;
  weekly: number;
  daily: number;
}

export interface RowCost {
  id: string;
  name: string;
  kind: SubscriptionKind;
  monthly: number;
  yearly: number;
  sharePercent: number;
}

export interface OverlapNotice {
  count: number;
  names: string[];
  cheapestName: string;
  cheapestMonthly: number;
}

export type RenewalStatus = "upcoming" | "passed";

export interface RenewalNotice {
  id: string;
  name: string;
  renewsOn: string;
  daysLeft: number;
  /** What the renewal charges, with tax. */
  charge: number;
  status: RenewalStatus;
}

export type WorthVerdict = "needs-inputs" | "clearly-worth-it" | "covers-cost" | "falls-short";

export interface WorthResult {
  verdict: WorthVerdict;
  monthlyValue: number;
  netPerMonth: number;
  breakEvenHours: number | null;
}

export interface ExampleItem {
  planId: string;
  billing: PlanBilling;
  seats: number;
}

export interface PlanYearlyRow {
  plan: ConsumerPlan;
  yearlyBilledMonthly: number;
  yearlyBilledAnnually: number | null;
  yearlySavings: number | null;
}

/**
 * Reads a typed amount. Accepts "1,234.50", "19,99" and "$20". Returns null for blank, negative or too-large input.
 * A lone comma followed by one or two digits is read as a decimal comma.
 */
export function parseAmount(text: string, max: number = MAX_PRICE): number | null {
  const trimmed = text.trim();
  if (trimmed === "" || trimmed.startsWith("-")) return null;
  const cleaned = trimmed.replace(/[^\d.,]/g, "");
  if (cleaned === "") return null;
  let normalized: string;
  if (cleaned.includes(",") && cleaned.includes(".")) {
    normalized = cleaned.replace(/,/g, "");
  } else if (/^\d+,\d{1,2}$/.test(cleaned)) {
    normalized = cleaned.replace(",", ".");
  } else {
    normalized = cleaned.replace(/,/g, "");
  }
  const value = Number(normalized);
  return Number.isFinite(value) && value >= 0 && value <= max ? value : null;
}

/** Whole seats, at least 1. Blank or invalid input counts as 1. */
export function parseSeats(text: string): number {
  const value = Math.floor(Number(text.trim()));
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.min(value, MAX_SEATS);
}

/** Tax rate from 0 to MAX_TAX_PERCENT. Blank or invalid input counts as 0. */
export function parseTaxPercent(text: string): number {
  return parseAmount(text, MAX_TAX_PERCENT) ?? 0;
}

export function isValidIsoDate(text: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const [year = 0, month = 0, day = 0] = text.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function taxFactor(taxPercent: number): number {
  return 1 + taxPercent / 100;
}

function toPlainNumberText(value: number): string {
  return String(Math.round(value * 100) / 100);
}

/** "$20.00", or "Rs 20.00" for multi-character symbols. Fixed locale so server and browser agree. */
export function formatMoney(amount: number, symbol: string): string {
  const digits = amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${symbol}${symbol.length > 1 ? " " : ""}${digits}`;
}

export function createBlankRow(): NewSubscriptionRow {
  return { name: "", kind: "chat", priceText: "", cycle: "month", seatsText: "1", renewsOn: "", presetId: null };
}

/** The charge for one seat on a plan, for the chosen billing. Falls back to monthly when no yearly price is listed. */
export function getPlanCharge(plan: ConsumerPlan, billing: PlanBilling): { price: number; cycle: BillingCycle } {
  if (billing === "annual" && plan.annualMonthlyPrice !== null) {
    return { price: plan.annualMonthlyPrice * MONTHS_PER_YEAR, cycle: "year" };
  }
  return { price: plan.monthlyPrice, cycle: "month" };
}

export function rowFromPlan(plan: ConsumerPlan, billing: PlanBilling, seats: number): NewSubscriptionRow {
  const { price, cycle } = getPlanCharge(plan, billing);
  return {
    name: plan.label,
    kind: "chat",
    priceText: toPlainNumberText(price),
    cycle,
    seatsText: String(Math.max(seats, plan.minimumSeats)),
    renewsOn: "",
    presetId: plan.id,
  };
}

/** Moves a preset row between monthly and yearly billing. Overwrites any price the person typed. */
export function switchRowBilling(row: SubscriptionRow, plan: ConsumerPlan, billing: PlanBilling): SubscriptionRow {
  const { price, cycle } = getPlanCharge(plan, billing);
  return { ...row, priceText: toPlainNumberText(price), cycle };
}

/** What yearly billing saves per year across the seats, or null if the plan has no yearly price. */
export function getAnnualSavingsPerYear(plan: ConsumerPlan, seats: number): number | null {
  if (plan.annualMonthlyPrice === null) return null;
  return (plan.monthlyPrice - plan.annualMonthlyPrice) * MONTHS_PER_YEAR * seats;
}

/** Cost per month before tax, or null when the price is missing or invalid. */
export function getRowMonthlyCost(row: SubscriptionRow): number | null {
  const price = parseAmount(row.priceText);
  if (price === null) return null;
  const total = price * parseSeats(row.seatsText);
  return row.cycle === "year" ? total / MONTHS_PER_YEAR : total;
}

/** Monthly and yearly cost with tax, or null when the price is missing or invalid. */
export function getRowCost(row: SubscriptionRow, taxPercent: number): { monthly: number; yearly: number } | null {
  const monthly = getRowMonthlyCost(row);
  if (monthly === null) return null;
  const monthlyWithTax = monthly * taxFactor(taxPercent);
  return { monthly: monthlyWithTax, yearly: monthlyWithTax * MONTHS_PER_YEAR };
}

export function calculateTotals(rows: readonly SubscriptionRow[], taxPercent: number): Totals {
  let monthlyBeforeTax = 0;
  let countedRows = 0;
  for (const row of rows) {
    const monthly = getRowMonthlyCost(row);
    if (monthly === null) continue;
    monthlyBeforeTax += monthly;
    countedRows += 1;
  }
  const monthly = monthlyBeforeTax * taxFactor(taxPercent);
  const yearly = monthly * MONTHS_PER_YEAR;
  return {
    countedRows,
    skippedRows: rows.length - countedRows,
    taxPercent,
    monthlyBeforeTax,
    yearlyBeforeTax: monthlyBeforeTax * MONTHS_PER_YEAR,
    monthly,
    yearly,
    weekly: yearly / WEEKS_PER_YEAR,
    daily: yearly / DAYS_PER_YEAR,
  };
}

/** Per-subscription costs with tax, most expensive first. Blank names become "Subscription N". */
export function buildRowCosts(rows: readonly SubscriptionRow[], taxPercent: number): RowCost[] {
  const priced = rows.flatMap((row, index) => {
    const cost = getRowCost(row, taxPercent);
    return cost === null ? [] : [{ row, index, cost }];
  });
  const totalMonthly = priced.reduce((sum, item) => sum + item.cost.monthly, 0);
  return priced
    .map(({ row, index, cost }) => ({
      id: row.id,
      name: row.name.trim() || `Subscription ${index + 1}`,
      kind: row.kind,
      monthly: cost.monthly,
      yearly: cost.yearly,
      sharePercent: totalMonthly > 0 ? (cost.monthly / totalMonthly) * 100 : 0,
    }))
    .sort((a, b) => b.monthly - a.monthly);
}

/** Flags two or more chat assistant plans, and what dropping the cheapest would save each month. */
export function findOverlap(rows: readonly SubscriptionRow[], taxPercent: number): OverlapNotice | null {
  const chatCosts = buildRowCosts(rows, taxPercent).filter((cost) => cost.kind === "chat");
  const cheapest = chatCosts[chatCosts.length - 1];
  if (chatCosts.length < 2 || !cheapest) return null;
  return {
    count: chatCosts.length,
    names: chatCosts.map((cost) => cost.name),
    cheapestName: cheapest.name,
    cheapestMonthly: cheapest.monthly,
  };
}

/** Renewals within RENEWAL_WINDOW_DAYS, plus dates that have already passed, soonest first. Uses the browser's local date. */
export function findRenewals(rows: readonly SubscriptionRow[], taxPercent: number, now: Date): RenewalNotice[] {
  const factor = taxFactor(taxPercent);
  const notices: RenewalNotice[] = [];
  rows.forEach((row, index) => {
    if (!isValidIsoDate(row.renewsOn)) return;
    const price = parseAmount(row.priceText);
    if (price === null) return;
    const daysLeft = localCalendarDaysUntil(row.renewsOn, now);
    if (daysLeft > RENEWAL_WINDOW_DAYS) return;
    notices.push({
      id: row.id,
      name: row.name.trim() || `Subscription ${index + 1}`,
      renewsOn: row.renewsOn,
      daysLeft,
      charge: price * parseSeats(row.seatsText) * factor,
      status: daysLeft < 0 ? "passed" : "upcoming",
    });
  });
  return notices.sort((a, b) => a.daysLeft - b.daysLeft);
}

/** Compares the value of time saved with the monthly cost. Both inputs are the person's own estimates. */
export function calculateWorth(monthlyCost: number, hoursSavedText: string, hourlyValueText: string): WorthResult {
  const hoursSaved = parseAmount(hoursSavedText, MAX_HOURS_SAVED_PER_MONTH);
  const hourlyValue = parseAmount(hourlyValueText, MAX_HOURLY_VALUE);
  const breakEvenHours =
    hourlyValue !== null && hourlyValue > 0 && monthlyCost > 0 ? monthlyCost / hourlyValue : null;

  if (hoursSaved === null || hourlyValue === null || monthlyCost <= 0) {
    return { verdict: "needs-inputs", monthlyValue: 0, netPerMonth: 0, breakEvenHours };
  }

  const monthlyValue = hoursSaved * hourlyValue;
  const verdict: WorthVerdict =
    monthlyValue >= monthlyCost * WORTH_CLEARLY_RATIO
      ? "clearly-worth-it"
      : monthlyValue >= monthlyCost
        ? "covers-cost"
        : "falls-short";
  return { verdict, monthlyValue, netPerMonth: monthlyValue - monthlyCost, breakEvenHours };
}

/** One plain-English sentence for the worth-it result. */
export function describeWorthResult(result: WorthResult, monthlyCost: number, symbol: string): string {
  const cost = formatMoney(monthlyCost, symbol);
  const breakEven = result.breakEvenHours === null ? "" : ` You would need to save about ${result.breakEvenHours.toFixed(1)} hours a month to break even.`;
  switch (result.verdict) {
    case "needs-inputs":
      return result.breakEvenHours === null
        ? "Add your monthly cost and the two numbers above to see whether it pays for itself."
        : `At that hourly value you would need to save about ${result.breakEvenHours.toFixed(1)} hours a month to cover ${cost}.`;
    case "clearly-worth-it":
      return `On your numbers, the time you save is worth ${formatMoney(result.monthlyValue, symbol)} a month, more than twice the ${cost} it costs.${breakEven}`;
    case "covers-cost":
      return `On your numbers, the time you save is worth ${formatMoney(result.monthlyValue, symbol)} a month, which covers the ${cost} it costs.${breakEven}`;
    case "falls-short":
      return `On your numbers, the time you save is worth ${formatMoney(result.monthlyValue, symbol)} a month, below the ${cost} it costs.${breakEven} A cheaper plan or a free plan may fit better.`;
  }
}

/** Totals for an example setup, using the same maths as the calculator. */
export function calculateExampleTotals(items: readonly ExampleItem[]): Totals {
  const rows = items.map((item, index) => ({
    id: `example-${index}`,
    ...rowFromPlan(getPlanById(item.planId), item.billing, item.seats),
  }));
  return calculateTotals(rows, 0);
}

/** Yearly cost of each paid plan for one seat, billed monthly and billed yearly, cheapest first. */
export function buildPlanYearlyRows(plans: readonly ConsumerPlan[]): PlanYearlyRow[] {
  return plans
    .filter((plan) => plan.monthlyPrice > 0)
    .map((plan) => {
      const yearlyBilledMonthly = plan.monthlyPrice * MONTHS_PER_YEAR;
      const yearlyBilledAnnually = plan.annualMonthlyPrice === null ? null : plan.annualMonthlyPrice * MONTHS_PER_YEAR;
      return {
        plan,
        yearlyBilledMonthly,
        yearlyBilledAnnually,
        yearlySavings: yearlyBilledAnnually === null ? null : yearlyBilledMonthly - yearlyBilledAnnually,
      };
    })
    .sort((a, b) => a.plan.monthlyPrice - b.plan.monthlyPrice || a.plan.label.localeCompare(b.plan.label));
}

/** Plain-text summary for the copy button. */
export function buildSubscriptionSummary(costs: readonly RowCost[], totals: Totals, symbol: string): string {
  const lines = ["My AI subscriptions (AI Tools for Everyday People)", ""];
  for (const cost of costs) {
    lines.push(`- ${cost.name}: ${formatMoney(cost.monthly, symbol)} a month, ${formatMoney(cost.yearly, symbol)} a year`);
  }
  lines.push(
    "",
    `Total: ${formatMoney(totals.monthly, symbol)} a month, ${formatMoney(totals.yearly, symbol)} a year (about ${formatMoney(totals.daily, symbol)} a day)`,
  );
  if (totals.taxPercent > 0) lines.push(`Includes ${totals.taxPercent}% tax.`);
  lines.push("", "Prices and features change. Confirm on the provider's website before buying.");
  return lines.join("\n");
}