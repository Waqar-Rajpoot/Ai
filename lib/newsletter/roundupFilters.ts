import {
  ALL_FILTER_ID,
  MS_PER_DAY,
  SOON_WITHIN_DAYS,
  URGENT_WITHIN_DAYS,
  type AllFilterId,
} from "./newsletterConstants";
import type { Deadline, FaqItem, IssueCategory, IssueCategoryOption, IssueItem } from "./newsletterContent";

export type Urgency = "past" | "urgent" | "soon" | "later";

/**
 * Converts an ISO date (yyyy-mm-dd) to a UTC timestamp.
 * @throws If the string is not a valid date.
 */
export function parseIsoDateUtc(isoDate: string): number {
  const timestamp = Date.parse(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid ISO date: ${isoDate}`);
  }
  return timestamp;
}

/**
 * Whole days from today to a date, counted in UTC.
 * @param isoDate - Target date, yyyy-mm-dd.
 * @param nowMs - Current time in milliseconds (pass `Date.now()`).
 * @returns Positive for future dates, 0 for today, negative for past dates.
 */
export function daysUntil(isoDate: string, nowMs: number): number {
  const todayStartMs = Math.floor(nowMs / MS_PER_DAY) * MS_PER_DAY;
  return Math.round((parseIsoDateUtc(isoDate) - todayStartMs) / MS_PER_DAY);
}

/** Turns a day count into a short phrase such as "In 12 days" or "Tomorrow". */
export function describeCountdown(days: number): string {
  if (days < -1) return `Ended ${Math.abs(days)} days ago`;
  if (days === -1) return "Ended yesterday";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

/** Buckets a day count so the UI can colour it. */
export function getUrgency(days: number): Urgency {
  if (days < 0) return "past";
  if (days <= URGENT_WITHIN_DAYS) return "urgent";
  if (days <= SOON_WITHIN_DAYS) return "soon";
  return "later";
}

const DISPLAY_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date as "23 Oct 2026". Fixed locale and time zone, so server and browser agree. */
export function formatDisplayDate(isoDate: string): string {
  return DISPLAY_DATE_FORMAT.format(parseIsoDateUtc(isoDate));
}

/** Narrows a chip id to a category id or the "all" option. */
export function isCategoryFilter(
  value: string,
  categories: readonly IssueCategoryOption[],
): value is IssueCategory | AllFilterId {
  return value === ALL_FILTER_ID || categories.some((category) => category.id === value);
}

/** Returns the items in one category, or every item for "all". */
export function filterIssueItems(items: readonly IssueItem[], selected: IssueCategory | AllFilterId): readonly IssueItem[] {
  return selected === ALL_FILTER_ID ? items : items.filter((item) => item.category === selected);
}

/** Counts items per category, including categories with zero items. */
export function countByCategory(items: readonly IssueItem[]): Record<IssueCategory, number> {
  const counts: Record<IssueCategory, number> = { release: 0, price: 0, retirement: 0, policy: 0 };
  for (const item of items) {
    counts[item.category] += 1;
  }
  return counts;
}

/** Unique provider names, sorted alphabetically. */
export function listProviders(deadlines: readonly Deadline[]): readonly string[] {
  return [...new Set(deadlines.map((deadline) => deadline.provider))].sort((a, b) => a.localeCompare(b));
}

/** Deadlines for one provider (or all), soonest first. */
export function filterDeadlines(deadlines: readonly Deadline[], provider: string): readonly Deadline[] {
  const matching = provider === ALL_FILTER_ID ? deadlines : deadlines.filter((deadline) => deadline.provider === provider);
  return [...matching].sort((a, b) => parseIsoDateUtc(a.isoDate) - parseIsoDateUtc(b.isoDate));
}

/** Case-insensitive match against a question and its answer. An empty query matches everything. */
export function matchesFaqQuery(item: FaqItem, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return true;
  return `${item.question} ${item.answer}`.toLowerCase().includes(needle);
}