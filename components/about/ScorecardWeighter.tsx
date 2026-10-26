"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  computeWeightedScore,
  createStartingWeights,
  parseBoundedNumber,
  type PointId,
} from "@/lib/about/howWeTest";
import { SCORE_MAX, SCORE_MIN, STARTING_WEIGHT, WEIGHT_MAX, WEIGHT_MIN } from "@/lib/about/howWeTestConstants";
import { TEST_POINTS } from "@/lib/about/howWeTestData";
import { WEIGHTER_NOTE } from "@/lib/about/howWeTestContent";

/** Set your own weights and scores for the seven points. Runs in the browser and stores nothing. */
export function ScorecardWeighter() {
  const [weights, setWeights] = useState<Record<PointId, number>>(() => createStartingWeights(TEST_POINTS, STARTING_WEIGHT));
  const [scoreText, setScoreText] = useState<Record<string, string>>({});

  const scores = useMemo(
    () => Object.fromEntries(TEST_POINTS.map((point) => [point.id, parseBoundedNumber(scoreText[point.id] ?? "", SCORE_MIN, SCORE_MAX)])),
    [scoreText],
  );
  const result = useMemo(() => computeWeightedScore(TEST_POINTS, weights, scores, SCORE_MAX), [weights, scores]);

  function reset() {
    setWeights(createStartingWeights(TEST_POINTS, STARTING_WEIGHT));
    setScoreText({});
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div>
        <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{WEIGHTER_NOTE}</p>
        <ul className="m-0 grid list-none gap-3 p-0">
          {TEST_POINTS.map((point) => {
            const weightId = `weight-${point.id}`;
            const scoreId = `score-${point.id}`;
            return (
              <li key={point.id} className={`${CARD_CLASS} grid gap-3 md:grid-cols-[1fr_12rem_7rem]`}>
                <p className="m-0 text-sm font-semibold">{point.number}. {point.name}</p>
                <label htmlFor={weightId} className="text-xs text-[var(--color-muted)]">
                  Weight: <strong className="tabular-nums">{weights[point.id]}</strong>
                  <input
                    id={weightId}
                    type="range"
                    min={WEIGHT_MIN}
                    max={WEIGHT_MAX}
                    step={1}
                    value={weights[point.id]}
                    onChange={(event) => setWeights((current) => ({ ...current, [point.id]: Number(event.target.value) }))}
                    className="mt-1 w-full accent-[var(--color-accent)]"
                  />
                </label>
                <label htmlFor={scoreId} className="text-xs text-[var(--color-muted)]">
                  Score (0 to {SCORE_MAX})
                  <input
                    id={scoreId}
                    type="number"
                    inputMode="decimal"
                    min={SCORE_MIN}
                    max={SCORE_MAX}
                    step="0.5"
                    value={scoreText[point.id] ?? ""}
                    onChange={(event) => setScoreText((current) => ({ ...current, [point.id]: event.target.value }))}
                    placeholder="Skip"
                    className={`${INPUT_CLASS} mt-1`}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className={`${CARD_CLASS} self-start border-[var(--color-accent)] lg:sticky lg:top-24`} aria-live="polite">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Your weighted result</p>
        {result.weightedScore === null ? (
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">Enter a score for at least one point that has a weight above zero.</p>
        ) : (
          <>
            <p className="mb-0 mt-2 text-3xl font-extrabold tabular-nums">
              {result.weightedScore} <span className="text-base font-normal text-[var(--color-muted)]">out of {SCORE_MAX}</span>
            </p>
            <p className="m-0 text-sm tabular-nums text-[var(--color-muted)]">{result.percent}% of the maximum</p>
          </>
        )}
        <p className="mb-0 mt-3 flex flex-wrap gap-2 text-xs">
          <span className={BADGE_CLASS}>{result.scoredCount} of {result.totalCount} scored</span>
          {result.isPartial && <span className={`${BADGE_CLASS} border-amber-500`}>Partial: some weighted points have no score</span>}
        </p>
        <button
          type="button"
          onClick={reset}
          className={`mt-4 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
        >
          Reset
        </button>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">A weighted average hides trade-offs. Look at each point too, especially the ones you weighted highest.</p>
      </aside>
    </div>
  );
}