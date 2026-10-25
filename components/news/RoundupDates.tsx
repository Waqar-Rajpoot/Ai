"use client";

import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { sortDateNotes } from "@/lib/news/roundupDates";
import type { RoundupDateNote } from "@/lib/news/roundupTypes";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeDaysLeft } from "@/lib/prices/retirementLogic";
import { calendarDaysUntil } from "@/lib/shared/dates";

interface RoundupDatesProps {
  items: readonly RoundupDateNote[];
  publishedOn: string;
}

function describeOffset(days: number): string {
  if (days === 0) return "On the day this roundup was published";
  return `${days} day${days === 1 ? "" : "s"} after this roundup`;
}

/** Dates in the week after publishing. Shows the gap from the publish date, plus a live count once the browser knows today. */
export function RoundupDates({ items, publishedOn }: RoundupDatesProps) {
  const today = useToday();
  const published = new Date(`${publishedOn}T00:00:00Z`);

  return (
    <div>
      <ol className="m-0 grid list-none gap-3 p-0">
        {sortDateNotes(items).map((item) => {
          const daysLeft = today ? calendarDaysUntil(item.isoDate, today) : null;
          return (
            <li key={item.id} className={`${CARD_CLASS} grid gap-2 sm:grid-cols-[12rem_1fr]`}>
              <div>
                <p className="m-0 font-bold tabular-nums text-[var(--color-accent)]">{formatIsoDate(item.isoDate)}</p>
                <p className="m-0 text-xs text-[var(--color-muted)]">{describeOffset(calendarDaysUntil(item.isoDate, published))}</p>
                {daysLeft !== null && (
                  <p className="mb-0 mt-1"><span className={BADGE_CLASS}>{daysLeft < 0 ? "Already passed" : describeDaysLeft(daysLeft)}</span></p>
                )}
              </div>
              <div>
                <p className="m-0 text-sm font-semibold">{item.title}</p>
                <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{item.detail}</p>
                <p className="mb-0 mt-1 text-xs"><Link href={item.href}>Details</Link></p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Dates were read when this roundup was published and are treated as UTC. They may have moved since, so confirm on the provider&apos;s page.</p>
    </div>
  );
}