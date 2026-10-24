import Link from "next/link";
import {
  formatBenchLm,
  formatMonthDay,
  formatPricePair,
  getReviewHref,
  MODEL_DIRECTORY_ROWS,
} from "@/lib/compare/modelDirectory";
import { getShortlist } from "@/lib/compare/modelShortlist";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

/** "Where to start" cards: one model per need, with price, score and review status. */
export function ModelShortlist() {
  const shortlist = getShortlist(MODEL_DIRECTORY_ROWS);

  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {shortlist.map(({ pick, row }) => (
        <li key={pick.id}>
          <article className={`${CARD_CLASS} flex h-full flex-col`}>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{pick.need}</p>
            <h3 className="mb-0 mt-1 text-lg">{row.name}</h3>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{row.maker}</p>
            <p className="mb-0 mt-3 text-sm">{pick.reason}</p>
            <dl className="mb-0 mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-xs text-[var(--color-muted)]">API price, in / out</dt>
                <dd className="m-0">{formatPricePair(row)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-muted)]">BenchLM score</dt>
                <dd className="m-0">{formatBenchLm(row.benchLm)}</dd>
              </div>
            </dl>
            {row.introRateEndsOn && (
              <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Intro rate to {formatMonthDay(row.introRateEndsOn)}</p>
            )}
            <p className="mb-0 mt-auto pt-4 text-sm">
              {row.isReviewPublished ? (
                <Link href={getReviewHref(row)} className={FOCUS_RING}>Read the review</Link>
              ) : (
                <span className="text-[var(--color-muted)]">Review coming</span>
              )}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}