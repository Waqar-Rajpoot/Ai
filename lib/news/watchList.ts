import type { VerificationLevel } from "@/lib/prices/apiCostTable";
import { describeRetirementDate } from "@/lib/prices/retirementLogic";
import type { RetirementEntry } from "@/lib/prices/retirements";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { calendarDaysUntil } from "@/lib/shared/dates";
import type { PriceDate } from "./watchData";

export type WatchKind = "retirement" | "price";

export interface WatchItem {
  id: string;
  kind: WatchKind;
  isoDate: string;
  /** Date as shown, including "Earliest " style prefixes. */
  dateLabel: string;
  title: string;
  detail: string;
  href: string;
  verification: VerificationLevel;
}

export const WATCH_KIND_LABELS: Record<WatchKind, string> = {
  retirement: "Retirement",
  price: "Price date",
};

const RETIREMENTS_HREF = "/prices/retirements";

function fromRetirement(entry: RetirementEntry): WatchItem {
  const detailParts = [entry.platform, entry.replacement ? `replacement: ${entry.replacement}` : null];
  return {
    id: `retirement-${entry.id}`,
    kind: "retirement",
    isoDate: entry.retiresOn,
    dateLabel: describeRetirementDate(entry),
    title: entry.name,
    detail: detailParts.filter((part): part is string => part !== null).join(" · "),
    href: RETIREMENTS_HREF,
    verification: entry.verification,
  };
}

function fromPriceDate(priceDate: PriceDate): WatchItem {
  return {
    id: `price-${priceDate.id}`,
    kind: "price",
    isoDate: priceDate.isoDate,
    dateLabel: formatIsoDate(priceDate.isoDate),
    title: priceDate.title,
    detail: priceDate.detail,
    href: priceDate.href,
    verification: priceDate.verification,
  };
}

/**
 * Dates that fall from today up to and including the horizon, soonest first.
 * Retirement floors are not announcements, so they are left out.
 */
export function buildWatchList(
  retirements: readonly RetirementEntry[],
  priceDates: readonly PriceDate[],
  now: Date,
  horizonDays: number,
): WatchItem[] {
  const items = [
    ...retirements.filter((entry) => entry.dateType !== "floor").map(fromRetirement),
    ...priceDates.map(fromPriceDate),
  ];
  return items
    .filter((item) => {
      const daysLeft = calendarDaysUntil(item.isoDate, now);
      return daysLeft >= 0 && daysLeft <= horizonDays;
    })
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.title.localeCompare(b.title));
}

export function countWatchKinds(items: readonly WatchItem[]): Record<WatchKind, number> {
  const counts: Record<WatchKind, number> = { retirement: 0, price: 0 };
  for (const item of items) counts[item.kind] += 1;
  return counts;
}