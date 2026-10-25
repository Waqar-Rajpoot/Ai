import { calendarDaysUntil } from "@/lib/shared/dates";
import { sortNewestFirst, type NewsPost } from "./news";
import { DAYS_BETWEEN_ROUNDUPS, GAP_TOLERANCE_DAYS } from "./weeklyArchiveConstants";

export type YearFilter = number | "all";

export interface MonthGroup {
  /** "2026-10". */
  monthKey: string;
  /** "October 2026". */
  label: string;
  posts: NewsPost[];
}

/** A stretch between two roundups that is longer than a week plus the tolerance. */
export interface PublishingGap {
  fromOn: string;
  toOn: string;
  days: number;
  /** Whole weeks with no roundup in between. At least 1. */
  missedWeeks: number;
}

export interface ArchiveSummary {
  count: number;
  firstOn: string | null;
  latestOn: string | null;
  /** Longest stretch between two roundups, in days. 0 when there are fewer than two. */
  longestGapDays: number;
  gaps: PublishingGap[];
}

/** Weekly roundups only, newest first. Returns a new array. */
export function getWeeklyPosts(posts: readonly NewsPost[]): NewsPost[] {
  return sortNewestFirst(posts.filter((post) => post.type === "weekly"));
}

export function getYear(isoDate: string): number {
  return Number(isoDate.slice(0, 4));
}

/** Years that have at least one post, newest first. */
export function listYears(posts: readonly NewsPost[]): number[] {
  return [...new Set(posts.map((post) => getYear(post.publishedOn)))].sort((a, b) => b - a);
}

export function countByYear(posts: readonly NewsPost[]): Map<number, number> {
  const counts = new Map<number, number>();
  for (const post of posts) {
    const year = getYear(post.publishedOn);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return counts;
}

/** Filters by year and by search text in the title or summary. Returns a new array. */
export function filterWeeklyPosts(posts: readonly NewsPost[], year: YearFilter, query: string): NewsPost[] {
  const needle = query.trim().toLowerCase();
  return posts.filter((post) => {
    if (year !== "all" && getYear(post.publishedOn) !== year) return false;
    if (needle && !`${post.title} ${post.summary}`.toLowerCase().includes(needle)) return false;
    return true;
  });
}

function formatMonthLabel(monthKey: string): string {
  return new Date(`${monthKey}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Groups posts by calendar month (UTC), newest month first, newest post first inside each month. */
export function groupByMonth(posts: readonly NewsPost[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();
  for (const post of sortNewestFirst(posts)) {
    const monthKey = post.publishedOn.slice(0, 7);
    let group = groups.get(monthKey);
    if (!group) {
      group = { monthKey, label: formatMonthLabel(monthKey), posts: [] };
      groups.set(monthKey, group);
    }
    group.posts.push(post);
  }
  return [...groups.values()];
}

/** "Monday". The date is read as UTC. */
export function getWeekdayName(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}

/** Whole days from one ISO date to a later one. */
function daysBetween(fromIso: string, toIso: string): number {
  return calendarDaysUntil(toIso, new Date(`${fromIso}T00:00:00Z`));
}

/** Gaps between consecutive roundups that are longer than a week plus the tolerance. */
export function findPublishingGaps(posts: readonly NewsPost[]): PublishingGap[] {
  const oldestFirst = [...getWeeklyPosts(posts)].reverse();
  const gaps: PublishingGap[] = [];
  for (let index = 1; index < oldestFirst.length; index += 1) {
    const fromOn = oldestFirst[index - 1].publishedOn;
    const toOn = oldestFirst[index].publishedOn;
    const days = daysBetween(fromOn, toOn);
    if (days > DAYS_BETWEEN_ROUNDUPS + GAP_TOLERANCE_DAYS) {
      const missedWeeks = Math.max(1, Math.round(days / DAYS_BETWEEN_ROUNDUPS) - 1);
      gaps.push({ fromOn, toOn, days, missedWeeks });
    }
  }
  return gaps;
}

/** Counts, date range and publishing gaps for the coverage panel. */
export function summarizeArchive(posts: readonly NewsPost[]): ArchiveSummary {
  const newestFirst = getWeeklyPosts(posts);
  const oldestFirst = [...newestFirst].reverse();
  let longestGapDays = 0;
  for (let index = 1; index < oldestFirst.length; index += 1) {
    longestGapDays = Math.max(longestGapDays, daysBetween(oldestFirst[index - 1].publishedOn, oldestFirst[index].publishedOn));
  }
  return {
    count: newestFirst.length,
    firstOn: oldestFirst[0]?.publishedOn ?? null,
    latestOn: newestFirst[0]?.publishedOn ?? null,
    longestGapDays,
    gaps: findPublishingGaps(posts),
  };
}