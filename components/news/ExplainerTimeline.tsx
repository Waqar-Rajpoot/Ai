"use client";

import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { describeRelative, findNextUpcoming } from "@/lib/news/explainerLogic";
import type { TimelineEntry } from "@/lib/news/explainerTypes";

/** Dated timeline. Once the browser knows today's date, each row says how far away it is and the next date is highlighted. */
export function ExplainerTimeline({ entries }: { entries: readonly TimelineEntry[] }) {
  const today = useToday();
  const next = today ? findNextUpcoming(entries, today) : undefined;

  return (
    <ol className="m-0 grid list-none gap-3 p-0">
      {entries.map((entry) => {
        const isNext = next === entry;
        return (
          <li key={`${entry.isoDate}-${entry.label}`} className={`${CARD_CLASS} grid gap-1 sm:grid-cols-[11rem_1fr] ${isNext ? "border-[var(--color-accent)]" : ""}`}>
            <div>
              <p className="m-0 font-semibold tabular-nums text-[var(--color-accent)]">{entry.label}</p>
              {today && <p className="m-0 text-xs text-[var(--color-muted)]">{describeRelative(entry.isoDate, today)}</p>}
              {isNext && <span className={`${BADGE_CLASS} mt-1`}>Next date</span>}
            </div>
            <div className="text-sm">
              <p className="m-0">{entry.text}</p>
              {entry.sourceNote && <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">{entry.sourceNote}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}