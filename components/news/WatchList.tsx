"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { DEFAULT_WATCH_HORIZON_DAYS, WATCH_HORIZONS } from "@/lib/news/newsConstants";
import { PRICE_DATES } from "@/lib/news/watchData";
import { WATCH_KIND_LABELS, buildWatchList, countWatchKinds } from "@/lib/news/watchList";
import { describeDaysLeft } from "@/lib/prices/retirementLogic";
import { RETIREMENTS } from "@/lib/prices/retirements";
import { calendarDaysUntil } from "@/lib/shared/dates";

/** Upcoming retirements and introductory-rate end dates, with live day counts once the browser knows today's date. */
export function WatchList() {
  const today = useToday();
  const [horizonDays, setHorizonDays] = useState(DEFAULT_WATCH_HORIZON_DAYS);

  const items = useMemo(
    () => (today ? buildWatchList(RETIREMENTS, PRICE_DATES, today, horizonDays) : []),
    [today, horizonDays],
  );
  const counts = useMemo(() => countWatchKinds(items), [items]);

  return (
    <div>
      <div role="group" aria-label="How far ahead to look" className="mb-4 flex flex-wrap gap-2">
        {WATCH_HORIZONS.map((horizon) => (
          <button
            key={horizon.days}
            type="button"
            aria-pressed={horizonDays === horizon.days}
            onClick={() => setHorizonDays(horizon.days)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              horizonDays === horizon.days
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {horizon.label}
          </button>
        ))}
      </div>

      <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        {today
          ? `${items.length} date${items.length === 1 ? "" : "s"}: ${counts.retirement} retirement${counts.retirement === 1 ? "" : "s"} and ${counts.price} price date${counts.price === 1 ? "" : "s"}.`
          : "Loading dates…"}
      </p>

      {today && items.length === 0 && (
        <div className={CARD_CLASS}>
          <p className="m-0 text-sm text-[var(--color-muted)]">No dates in this window. Try a longer one.</p>
        </div>
      )}

      <ol className="m-0 grid list-none gap-3 p-0">
        {items.map((item) => (
          <li key={item.id} className={`${CARD_CLASS} grid gap-2 sm:grid-cols-[11rem_1fr]`}>
            <div>
              <p className="m-0 font-bold tabular-nums text-[var(--color-accent)]">{item.dateLabel}</p>
              {today && <p className="m-0 text-xs text-[var(--color-muted)]">{describeDaysLeft(calendarDaysUntil(item.isoDate, today))}</p>}
            </div>
            <div>
              <p className="m-0 flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span className={BADGE_CLASS}>{WATCH_KIND_LABELS[item.kind]}</span>
                {item.title}
              </p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{item.detail}</p>
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">
                {item.verification === "provider" ? "Date read on the provider's own page." : "Date read through a tracker. Confirm on the provider's page."}{" "}
                <Link href={item.href}>Details</Link>
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Dates are read as UTC, so a day count can be off by a few hours near midnight.</p>
    </div>
  );
}