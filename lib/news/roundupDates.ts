import { RETIREMENTS } from "@/lib/prices/retirements";
import { NEXT_WEEK_WINDOW_DAYS } from "./roundupConstants";
import type { RoundupDateNote } from "./roundupTypes";
import { PRICE_DATES } from "./watchData";
import { buildWatchList } from "./watchList";

/**
 * Dates from our retirements and price data that fall in the week after a publish date.
 * Use it while drafting, then paste the literal values into the roundup so old posts do not shift
 * when the tracker changes.
 */
export function suggestNextWeek(publishedOn: string): RoundupDateNote[] {
  const start = new Date(`${publishedOn}T00:00:00Z`);
  return buildWatchList(RETIREMENTS, PRICE_DATES, start, NEXT_WEEK_WINDOW_DAYS).map((item) => ({
    id: item.id,
    isoDate: item.isoDate,
    title: item.title,
    detail: item.detail,
    href: item.href,
  }));
}

/** Soonest first, then by title. Returns a new array. */
export function sortDateNotes(notes: readonly RoundupDateNote[]): RoundupDateNote[] {
  return [...notes].sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.title.localeCompare(b.title));
}