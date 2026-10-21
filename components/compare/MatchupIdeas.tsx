import { findSamePricePairs, summarizePair, comparePair } from "@/lib/compare/matchups";
import { formatMonthDay, formatPricePair, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { TASK_PRESETS } from "@/lib/compare/modelCost";
import { CARD_CLASS } from "../learn/learnStyles";

/** Matchup ideas: pairs from different makers with the same list price. Not scheduled. */
export function MatchupIdeas() {
  const pairs = findSamePricePairs(MODEL_DIRECTORY_ROWS);

  if (pairs.length === 0) {
    return <p className="m-0 text-[var(--color-muted)]">No same-price pairs from different makers are in the directory right now.</p>;
  }

  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {pairs.map(({ id, first, second }) => {
        const introRates = [first, second].filter((row) => row.introRateEndsOn !== undefined);
        const notes = [first, second].filter((row) => row.priceNote !== undefined);

        return (
          <li key={id}>
            <article className={`${CARD_CLASS} h-full`}>
              <h3 className="m-0 text-lg">{first.name} vs {second.name}</h3>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
                Same list price: {formatPricePair(first)} per million tokens (in / out)
              </p>
              <p className="mb-0 mt-3 text-sm">{summarizePair(comparePair(first, second, TASK_PRESETS[0]))}</p>
              {introRates.map((row) => (
                <p key={`intro-${row.id}`} className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
                  {row.name}: intro rate to {row.introRateEndsOn ? formatMonthDay(row.introRateEndsOn) : "an unconfirmed date"}.
                </p>
              ))}
              {notes.map((row) => (
                <p key={`note-${row.id}`} className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
                  {row.name}: {row.priceNote}.
                </p>
              ))}
            </article>
          </li>
        );
      })}
    </ul>
  );
}