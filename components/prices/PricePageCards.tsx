import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import type { PricePage } from "@/lib/prices/priceHubContent";
import { VerifiedOnLabel } from "./VerifiedOnLabel";

/** Cards for the data pages. Unpublished pages show "Coming soon" and are not links. */
export function PricePageCards({ pages }: { pages: readonly PricePage[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => {
        const body = (
          <>
            <span className="text-xs font-bold text-[var(--color-accent)]">{page.levels.toUpperCase()}</span>
            <strong className="mt-1 block text-lg">{page.title}</strong>
            <span className="mt-1 block text-sm text-[var(--color-muted)]">{page.summary}</span>
            <dl className="mb-0 mt-3 grid gap-1 text-xs text-[var(--color-muted)]">
              <div className="flex gap-1">
                <dt className="font-semibold">Updated:</dt>
                <dd className="m-0">{page.cadence}</dd>
              </div>
              <div>
                <VerifiedOnLabel verifiedOn={page.verifiedOn} />
              </div>
            </dl>
            {!page.isPublished && (
              <span className="mt-3 inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Coming soon</span>
            )}
          </>
        );

        return (
          <li key={page.id}>
            {page.isPublished ? (
              <Link
                href={page.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {body}
              </Link>
            ) : (
              <div className={`${CARD_CLASS} h-full opacity-80`}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}