import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeDaysLeft } from "@/lib/prices/retirementLogic";
import type { DateToWatch } from "@/lib/home/homeLogic";

interface DatesToWatchProps {
  items: readonly DateToWatch[];
}

/** Upcoming price changes and retirements, soonest first. */
export function DatesToWatch({ items }: DatesToWatchProps) {
  return (
    <aside className={CARD_CLASS} aria-labelledby="dates-to-watch-heading">
      <h3 id="dates-to-watch-heading" className="mt-0">Dates to watch</h3>
      {items.length === 0 ? (
        <p className="m-0 text-sm text-[var(--color-muted)]">Nothing is scheduled right now. Check the retirements tracker for what is next.</p>
      ) : (
        <ul className="m-0 grid list-none gap-3 p-0">
          {items.map((item) => (
            <li key={item.id} className="border-t border-[var(--color-border)] pt-3 first:border-t-0 first:pt-0">
              <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
                <span className={BADGE_CLASS}>{item.kind}</span>
                <time dateTime={item.isoDate} className="font-semibold tabular-nums text-[var(--color-accent)]">{formatIsoDate(item.isoDate)}</time>
                <span className="text-[var(--color-muted)]">{describeDaysLeft(item.daysLeft)}</span>
              </p>
              <p className="mb-0 mt-1 text-sm font-semibold">{item.title}</p>
              <p className="m-0 text-xs text-[var(--color-muted)]">{item.detail}</p>
              <p className="mb-0 mt-1 text-xs"><Link href={item.link.href} className={FOCUS_RING}>{item.link.label}</Link></p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}