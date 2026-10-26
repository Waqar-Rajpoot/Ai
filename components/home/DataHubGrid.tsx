import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { PRICE_HUB_PAGES } from "@/lib/home/homeContent";

/** One card per Prices page, with how often each is updated. */
export function DataHubGrid() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {PRICE_HUB_PAGES.map((page) => (
        <li key={page.href} className={`${CARD_CLASS} flex flex-col`}>
          <h3 className="m-0">
            <Link href={page.href} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>{page.title}</Link>
          </h3>
          <p className="mb-3 mt-1 flex-1 text-sm text-[var(--color-muted)]">{page.summary}</p>
          <p className="m-0 flex flex-wrap gap-1">
            <span className={BADGE_CLASS}>{page.levelLabel}</span>
            <span className={BADGE_CLASS}>Updated: {page.updated}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}