import Link from "next/link";
import { formatBenchLm, formatPricePair, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { TASK_PRESETS } from "@/lib/compare/modelCost";
import { comparePair, getMatchupHref, getMatchupRows, summarizePair, TASKS_PER_MATCHUP, type Matchup } from "@/lib/compare/matchups";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const TAG_CLASS = "shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]";

/** One matchup: both models side by side on paper, and whether the full test is published. */
export function MatchupCard({ matchup }: { matchup: Matchup }) {
  const pair = getMatchupRows(MODEL_DIRECTORY_ROWS, matchup);
  const comparison = pair ? comparePair(pair[0], pair[1], TASK_PRESETS[0]) : null;

  return (
    <article id={matchup.id} className={`${CARD_CLASS} scroll-mt-24`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="m-0 text-xl">{matchup.title}</h3>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li className={TAG_CLASS}>{matchup.levelLabel}</li>
          {matchup.articleNumber !== undefined && <li className={TAG_CLASS}>Article {matchup.articleNumber}</li>}
          <li className={TAG_CLASS}>{TASKS_PER_MATCHUP} tasks</li>
        </ul>
      </div>

      {comparison ? (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[comparison.first, comparison.second].map((row) => (
              <div key={row.id} className="rounded-xl border border-[var(--color-border)] p-4">
                <p className="m-0 font-semibold">{row.name}</p>
                <p className="mb-0 mt-0.5 text-sm text-[var(--color-muted)]">{row.maker}</p>
                <dl className="mb-0 mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Price, in / out</dt>
                    <dd className="m-0">{formatPricePair(row)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Context</dt>
                    <dd className="m-0">{row.contextLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">BenchLM</dt>
                    <dd className="m-0">{formatBenchLm(row.benchLm)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mb-0 mt-4 text-sm">
            <strong>On paper:</strong> {summarizePair(comparison)}
          </p>
          <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">
            From list prices and independent scores in the model directory. This is not our test result.
          </p>
        </>
      ) : (
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">One of these models is missing from the directory.</p>
      )}

      <p className="mb-0 mt-4 text-sm">
        {matchup.isPublished ? (
          <Link href={getMatchupHref(matchup)} className={FOCUS_RING}>Read the matchup</Link>
        ) : (
          <span className="text-[var(--color-muted)]">Matchup coming after our test run</span>
        )}
      </p>
    </article>
  );
}