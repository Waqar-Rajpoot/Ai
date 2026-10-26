import { ISO_DATE_PATTERN, MILLISECONDS_PER_DAY } from "./correctionsConstants";
import type { CorrectionEntry } from "./correctionsLog";
import { fixTargetDaysFor, type CorrectionSeverity, type CorrectionStatus } from "./correctionsPolicy";

export type StatusFilter = CorrectionStatus | "all";
export type SeverityFilter = CorrectionSeverity | "all";

export interface CorrectionFilters {
  status: StatusFilter;
  severity: SeverityFilter;
}

export interface LogSummary {
  total: number;
  fixed: number;
  declined: number;
  open: number;
  /** Median days from report to fix across fixed entries, or null when nothing has been fixed. */
  medianDaysToFix: number | null;
  /** Share of fixed entries that met their severity target, 0 to 100, or null when nothing has been fixed. */
  fixedWithinTargetPercent: number | null;
}

export const DEFAULT_FILTERS: CorrectionFilters = { status: "all", severity: "all" };

const SHORT_MONTHS: readonly string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Milliseconds since 1970 for a YYYY-MM-DD date at midnight UTC, or null if the text is not a real date. */
export function parseIsoDate(isoDate: string): number | null {
  const match = ISO_DATE_PATTERN.exec(isoDate);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const time = Date.UTC(year, month - 1, day);
  const check = new Date(time);
  // Date.UTC rolls an impossible date such as 2026-02-31 into March, so compare the parts back.
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
  return time;
}

/** Whole days from one date to another. Negative when `to` is earlier. Null if either date is invalid. */
export function daysBetween(from: string, to: string): number | null {
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  if (start === null || end === null) return null;
  return Math.round((end - start) / MILLISECONDS_PER_DAY);
}

/** "2026-10-25" becomes "Oct 25, 2026". Invalid text is returned unchanged so a typo is visible, not hidden. */
export function formatLogDate(isoDate: string): string {
  const time = parseIsoDate(isoDate);
  if (time === null) return isoDate;
  const date = new Date(time);
  const month = SHORT_MONTHS[date.getUTCMonth()] ?? "";
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/** Days between report and fix for a fixed entry. Null for open or declined entries and for invalid dates. */
export function daysToFix(entry: CorrectionEntry): number | null {
  if (entry.status !== "fixed" || entry.fixedOn === null) return null;
  return daysBetween(entry.reportedOn, entry.fixedOn);
}

/** True when a fixed entry was fixed within the target for its severity. Null if it is not a fixed entry. */
export function wasFixedWithinTarget(entry: CorrectionEntry): boolean | null {
  const days = daysToFix(entry);
  if (days === null) return null;
  return days <= fixTargetDaysFor(entry.severity);
}

/** Newest report first. Entries reported on the same day sort by id so the order never flickers. */
export function sortNewestFirst(entries: readonly CorrectionEntry[]): CorrectionEntry[] {
  return [...entries].sort((first, second) => {
    const firstTime = parseIsoDate(first.reportedOn) ?? 0;
    const secondTime = parseIsoDate(second.reportedOn) ?? 0;
    if (firstTime !== secondTime) return secondTime - firstTime;
    return first.id.localeCompare(second.id);
  });
}

export function filterCorrections(
  entries: readonly CorrectionEntry[],
  filters: CorrectionFilters,
): CorrectionEntry[] {
  return entries.filter(
    (entry) =>
      (filters.status === "all" || entry.status === filters.status) &&
      (filters.severity === "all" || entry.severity === filters.severity),
  );
}

/** The middle value of a list of numbers. For an even count, the mean of the two middle values. Null for an empty list. */
export function median(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((first, second) => first - second);
  const middle = Math.floor(sorted.length / 2);
  const upper = sorted[middle];
  const lower = sorted[middle - 1];
  if (upper === undefined) return null;
  if (sorted.length % 2 === 1) return upper;
  return lower === undefined ? upper : (lower + upper) / 2;
}

export function summarizeCorrections(entries: readonly CorrectionEntry[]): LogSummary {
  const fixedEntries = entries.filter((entry) => entry.status === "fixed");
  const fixDays = fixedEntries.map(daysToFix).filter((days): days is number => days !== null);
  const withinTarget = fixedEntries.filter((entry) => wasFixedWithinTarget(entry) === true).length;
  return {
    total: entries.length,
    fixed: fixedEntries.length,
    declined: entries.filter((entry) => entry.status === "declined").length,
    open: entries.filter((entry) => entry.status === "open").length,
    medianDaysToFix: median(fixDays),
    fixedWithinTargetPercent: fixedEntries.length === 0 ? null : (withinTarget / fixedEntries.length) * 100,
  };
}

/** "0 days" becomes "same day", 1 becomes "1 day". */
export function formatDays(days: number): string {
  if (days === 0) return "same day";
  const rounded = Number.isInteger(days) ? String(days) : days.toFixed(1);
  return days === 1 ? "1 day" : `${rounded} days`;
}