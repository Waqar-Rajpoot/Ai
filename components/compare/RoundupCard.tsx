import Link from "next/link";
import { formatBenchLm, formatPricePair, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { getCandidateCaption, getRoundupCandidates, getRoundupHref, type Roundup } from "@/lib/compare/bestFor";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const TAG_CLASS = "shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]";

/** One roundup: the question it answers, starting-point models and whether the page is published. */
export function RoundupCard({ roundup }: { roundup: Roundup }) {
  const candidates = getRoundupCandidates(MODEL_DIRECTORY_ROWS, roundup.candidates);

  return (
    <article id={roundup.id} className={`${CARD_CLASS} flex h-full scroll-mt-24 flex-col`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="m-0 text-lg">{roundup.title}</h3>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li className={TAG_CLASS}>{roundup.levelLabel}</li>
          {roundup.articleNumber !== undefined && <li className={TAG_CLASS}>Article {roundup.articleNumber}</li>}
        </ul>
      </div>
      <p className="mb-0 mt-2 font-semibold">{roundup.question}</p>
      <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{roundup.summary}</p>

      <h4 className="mb-1 mt-4 text-sm">Starting points</h4>
      {candidates.length > 0 ? (
        <ul className="m-0 grid list-none gap-1 p-0 text-sm">
          {candidates.map((row) => (
            <li key={row.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span>{row.name}</span>
              <span className="text-xs text-[var(--color-muted)]">
                {formatPricePair(row)} · BenchLM {formatBenchLm(row.benchLm)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{getCandidateCaption(roundup.candidates)}</p>

      <p className="mb-0 mt-auto pt-4 text-sm">
        {roundup.isPublished ? (
          <Link href={getRoundupHref(roundup)} className={FOCUS_RING}>Read the roundup</Link>
        ) : (
          <span className="text-[var(--color-muted)]">Roundup coming after our test run</span>
        )}
      </p>
    </article>
  );
}