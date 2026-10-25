"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { describePostLevels } from "@/lib/news/news";
import { NEWS_POSTS } from "@/lib/news/newsIndex";
import {
  countByYear,
  filterWeeklyPosts,
  getWeekdayName,
  getWeeklyPosts,
  groupByMonth,
  listYears,
  type YearFilter,
} from "@/lib/news/weeklyArchive";
import { ROUNDUPS_PER_PAGE } from "@/lib/news/weeklyArchiveConstants";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeDaysLeft } from "@/lib/prices/retirementLogic";
import { calendarDaysUntil } from "@/lib/shared/dates";

const ALL_ROUNDUPS = getWeeklyPosts(NEWS_POSTS);
const YEARS = listYears(ALL_ROUNDUPS);
const COUNTS_BY_YEAR = countByYear(ALL_ROUNDUPS);

/** Every weekly roundup by date: year filter, search, and month groups. */
export function WeeklyArchive() {
  const today = useToday();
  const [year, setYear] = useState<YearFilter>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ROUNDUPS_PER_PAGE);

  const filtered = useMemo(() => filterWeeklyPosts(ALL_ROUNDUPS, year, query), [year, query]);
  const shown = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const groups = useMemo(() => groupByMonth(shown), [shown]);

  const latest = ALL_ROUNDUPS[0];
  const filters: readonly { id: YearFilter; label: string }[] = [
    { id: "all", label: `All (${ALL_ROUNDUPS.length})` },
    ...YEARS.map((value) => ({ id: value, label: `${value} (${COUNTS_BY_YEAR.get(value) ?? 0})` })),
  ];

  function selectYear(next: YearFilter) {
    setYear(next);
    setVisibleCount(ROUNDUPS_PER_PAGE);
  }

  if (ALL_ROUNDUPS.length === 0) {
    return (
      <div className={CARD_CLASS}>
        <p className="m-0 font-semibold">No roundups yet.</p>
        <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
          The first weekly roundup has not been published. It will appear here, grouped by month, as soon as it is. We would rather show an empty archive than invent news.{" "}
          <a href="#subscribe">Subscribe</a> to get it by email, or see the <Link href="/news">News hub</Link> for upcoming dates.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">
        Latest roundup: <strong>{formatIsoDate(latest.publishedOn)}</strong>
        {today ? ` (${describeDaysLeft(calendarDaysUntil(latest.publishedOn, today))})` : ""}.
      </p>

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_16rem]">
        <div role="group" aria-label="Filter by year" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={String(filter.id)}
              type="button"
              aria-pressed={year === filter.id}
              onClick={() => selectYear(filter.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                year === filter.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="text-sm">
          <span className="sr-only">Search roundups</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(ROUNDUPS_PER_PAGE);
            }}
            placeholder="Search roundups"
            className={INPUT_CLASS}
          />
        </label>
      </div>

      <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {shown.length} of {filtered.length} roundup{filtered.length === 1 ? "" : "s"}, newest first.
      </p>

      {filtered.length === 0 ? (
        <div className={CARD_CLASS}>
          <p className="m-0 text-sm text-[var(--color-muted)]">Nothing matches that search. Try fewer words, or choose All.</p>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.monthKey} aria-labelledby={`month-${group.monthKey}`} className="mb-8">
            <h3 id={`month-${group.monthKey}`} className="mb-3 mt-0">
              {group.label}{" "}
              <span className="text-sm font-normal text-[var(--color-muted)]">({group.posts.length})</span>
            </h3>
            <ul className="m-0 grid list-none gap-3 p-0">
              {group.posts.map((post) => (
                <li key={post.id} className={CARD_CLASS}>
                  <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold tabular-nums text-[var(--color-accent)]">{formatIsoDate(post.publishedOn)}</span>
                    <span className="text-[var(--color-muted)]">{getWeekdayName(post.publishedOn)}</span>
                    <span className={BADGE_CLASS}>{describePostLevels(post.levels)}</span>
                    {post.verifiedOn && <span className="text-[var(--color-muted)]">Verified on {formatIsoDate(post.verifiedOn)}</span>}
                  </p>
                  <h4 className="mb-1 mt-2 text-lg"><Link href={post.href}>{post.title}</Link></h4>
                  <p className="m-0 text-sm text-[var(--color-muted)]">{post.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      {filtered.length > shown.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((current) => current + ROUNDUPS_PER_PAGE)}
          className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
        >
          Show more
        </button>
      )}
    </div>
  );
}