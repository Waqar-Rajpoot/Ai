import { calendarDaysUntil } from "@/lib/shared/dates";
import { formatIsoDate } from "./formatPrice";
import {
  MAX_MODEL_IDS_TO_CHECK,
  MIN_MODEL_ID_LENGTH,
  NEXT_QUARTER_DAYS,
  THIS_MONTH_DAYS,
  THIS_WEEK_DAYS,
} from "./retirementsConstants";
import { DATE_TYPE_PREFIX, type RetirementEntry, type RetirementStatus } from "./retirements";

export const ALL_OPTION = "all";

export type ShowFilter = "all" | "upcoming" | "retired";

export interface RetirementFilters {
  query: string;
  maker: string;
  platform: string;
  show: ShowFilter;
}

export interface MonthGroup {
  monthKey: string;
  label: string;
  entries: RetirementEntry[];
}

export interface IdCheckResult {
  rawId: string;
  normalizedId: string;
  matches: RetirementEntry[];
}

/** Days from today (UTC) to the entry's date. Negative once passed. */
export function getDaysLeft(entry: RetirementEntry, now: Date): number {
  return calendarDaysUntil(entry.retiresOn, now);
}

/** Floors are not announcements, so they never count as due. */
export function getRetirementStatus(entry: RetirementEntry, now: Date): RetirementStatus {
  if (entry.dateType === "floor") return "floor-only";
  const daysLeft = getDaysLeft(entry, now);
  if (daysLeft < 0) return "retired";
  if (daysLeft <= THIS_WEEK_DAYS) return "this-week";
  if (daysLeft <= THIS_MONTH_DAYS) return "this-month";
  if (daysLeft <= NEXT_QUARTER_DAYS) return "next-90-days";
  return "later";
}

/** "today", "in 3 days" or "5 days ago". */
export function describeDaysLeft(daysLeft: number): string {
  if (daysLeft === 0) return "today";
  const count = Math.abs(daysLeft);
  const unit = count === 1 ? "day" : "days";
  return daysLeft > 0 ? `in ${count} ${unit}` : `${count} ${unit} ago`;
}

/** "Oct 23, 2026", "Earliest Jun 1, 2026" or "Not sooner than Feb 5, 2027". */
export function describeRetirementDate(entry: RetirementEntry): string {
  return `${DATE_TYPE_PREFIX[entry.dateType]}${formatIsoDate(entry.retiresOn)}`;
}

/** Sorted by date, then name, so the order is stable. Returns a new array. */
export function sortByRetirementDate(entries: readonly RetirementEntry[]): RetirementEntry[] {
  return [...entries].sort(
    (a, b) => a.retiresOn.localeCompare(b.retiresOn) || a.name.localeCompare(b.name),
  );
}

/** Sorted, de-duplicated option list for a filter dropdown. */
export function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

/** Filters by search text, maker, platform and (once the date is known) retired or upcoming. */
export function filterRetirements(
  entries: readonly RetirementEntry[],
  filters: RetirementFilters,
  now: Date | null,
): RetirementEntry[] {
  const needle = filters.query.trim().toLowerCase();
  return entries.filter((entry) => {
    if (filters.maker !== ALL_OPTION && entry.maker !== filters.maker) return false;
    if (filters.platform !== ALL_OPTION && entry.platform !== filters.platform) return false;
    if (needle) {
      const haystack = [entry.name, entry.maker, entry.platform, entry.replacement ?? "", ...entry.modelIds]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    if (now && filters.show !== "all") {
      const isRetired = getRetirementStatus(entry, now) === "retired";
      if (filters.show === "retired" && !isRetired) return false;
      if (filters.show === "upcoming" && isRetired) return false;
    }
    return true;
  });
}

/** Counts entries per status. */
export function countByStatus(
  entries: readonly RetirementEntry[],
  now: Date,
): Record<RetirementStatus, number> {
  const counts: Record<RetirementStatus, number> = {
    retired: 0,
    "this-week": 0,
    "this-month": 0,
    "next-90-days": 0,
    later: 0,
    "floor-only": 0,
  };
  for (const entry of entries) counts[getRetirementStatus(entry, now)] += 1;
  return counts;
}

/** Groups entries by calendar month (UTC), in date order. */
export function groupByMonth(entries: readonly RetirementEntry[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();
  for (const entry of sortByRetirementDate(entries)) {
    const monthKey = entry.retiresOn.slice(0, 7);
    let group = groups.get(monthKey);
    if (!group) {
      const label = new Date(`${monthKey}-01T00:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      group = { monthKey, label, entries: [] };
      groups.set(monthKey, group);
    }
    group.entries.push(entry);
  }
  return [...groups.values()];
}

/**
 * Strips cloud prefixes and version suffixes so one ID matches across platforms:
 * "us.anthropic.claude-opus-4-1-20250805-v1:0" becomes "claude-opus-4-1-20250805".
 */
export function normalizeModelId(rawId: string): string {
  return rawId
    .trim()
    .toLowerCase()
    .replace(/^models\//, "")
    .replace(/^(?:(?:us|eu|apac|global)\.)?(?:anthropic\.)?/, "")
    .replace(/-v\d+:\d+$/, "");
}

/** Splits pasted text on spaces, commas, semicolons and new lines. Removes quotes and duplicates. */
export function parseModelIdList(text: string): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const piece of text.split(/[\s,;]+/)) {
    const cleaned = piece.replace(/^["'`]+|["'`]+$/g, "");
    if (cleaned.length < MIN_MODEL_ID_LENGTH) continue;
    const key = normalizeModelId(cleaned);
    if (seen.has(key)) continue;
    seen.add(key);
    ids.push(cleaned);
  }
  return ids.slice(0, MAX_MODEL_IDS_TO_CHECK);
}

/** Exact-match lookup. One ID can match several platforms, each with its own date. */
export function findRetirementsForIds(
  rawIds: readonly string[],
  entries: readonly RetirementEntry[],
): IdCheckResult[] {
  const index = new Map<string, RetirementEntry[]>();
  for (const entry of entries) {
    for (const modelId of entry.modelIds) {
      const key = normalizeModelId(modelId);
      const list = index.get(key) ?? [];
      if (!list.includes(entry)) list.push(entry);
      index.set(key, list);
    }
  }
  return rawIds.map((rawId) => {
    const normalizedId = normalizeModelId(rawId);
    return { rawId, normalizedId, matches: sortByRetirementDate(index.get(normalizedId) ?? []) };
  });
}

/** The soonest announced retirement that has not happened yet, or undefined. */
export function findEarliestUpcoming(
  entries: readonly RetirementEntry[],
  now: Date,
): RetirementEntry | undefined {
  return sortByRetirementDate(entries).find(
    (entry) => entry.dateType !== "floor" && getDaysLeft(entry, now) >= 0,
  );
}