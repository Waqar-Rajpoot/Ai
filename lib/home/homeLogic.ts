import type { HomeLink } from "./homeContent";
import { API_PRICE_ROWS, type ApiPriceRow } from "@/lib/prices/apiCostTable";
import { getSourceRows, type IndependentScore } from "@/lib/prices/benchmarkDigest";
import { RETIREMENTS, type RetirementEntry } from "@/lib/prices/retirements";
import { calendarDaysUntil } from "@/lib/shared/dates";

export type DateToWatchKind = "Price change" | "Retirement";

export interface DateToWatch {
  id: string;
  isoDate: string;
  kind: DateToWatchKind;
  title: string;
  detail: string;
  link: HomeLink;
  daysLeft: number;
}

export interface TopModel {
  score: IndependentScore;
  /** The matching price row, or null when the model is not in the price data. */
  price: ApiPriceRow | null;
}

/** The highest BenchLM scores, joined to price data by model name. */
export function getTopModels(limit: number): TopModel[] {
  return getSourceRows("benchlm")
    .filter((score: IndependentScore) => score.score !== null)
    .slice(0, limit)
    .map((score: IndependentScore) => ({ score, price: API_PRICE_ROWS.find((row) => row.model === score.model) ?? null }));
}

/** Retirements that share a date and platform are folded into one line, so one big shutdown does not fill the list. */
function groupRetirements(entries: readonly RetirementEntry[], now: Date): DateToWatch[] {
  const groups = new Map<string, RetirementEntry[]>();
  for (const entry of entries) {
    if (entry.dateType !== "firm") continue;
    if (calendarDaysUntil(entry.retiresOn, now) < 0) continue;
    const key = `${entry.retiresOn}|${entry.platform}`;
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  }
  return [...groups.entries()].map(([key, group]) => {
    const [first] = group;
    const isSingle = group.length === 1;
    return {
      id: `retirement-${key}`,
      isoDate: first.retiresOn,
      kind: "Retirement" as const,
      title: isSingle ? first.name : `${first.platform}: ${group.length} models or features retire`,
      detail: isSingle
        ? first.replacement ? `Replacement: ${first.replacement}` : "No replacement named."
        : group.slice(0, 3).map((entry) => entry.name).join("; "),
      link: { href: "/prices/retirements", label: "See the retirements tracker" },
      daysLeft: calendarDaysUntil(first.retiresOn, now),
    };
  });
}

function listPriceChanges(now: Date): DateToWatch[] {
  const items: DateToWatch[] = [];
  for (const row of API_PRICE_ROWS) {
    const endsOn = row.laterRate?.rateEndsOn;
    if (!endsOn) continue;
    const daysLeft = calendarDaysUntil(endsOn, now);
    if (daysLeft < 0) continue;
    items.push({
      id: `price-${row.id}`,
      isoDate: endsOn,
      kind: "Price change",
      title: `${row.model}: introductory price ends`,
      detail: "The price rises the next day. See the new rate on the API costs page.",
      link: { href: "/prices/api", label: "See API costs" },
      daysLeft,
    });
  }
  return items;
}

/**
 * The next dates readers should know about: price changes and retirements, soonest first.
 * Runs at build time on a static site, so rebuild when you publish the weekly update.
 */
export function getDatesToWatch(now: Date, limit: number): DateToWatch[] {
  return [...listPriceChanges(now), ...groupRetirements(RETIREMENTS, now)]
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.title.localeCompare(b.title))
    .slice(0, limit);
}