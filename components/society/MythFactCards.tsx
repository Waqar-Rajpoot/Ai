"use client";

import { useState } from "react";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  isGuessCorrect,
  MYTH_FACT_VERDICTS,
  summariseMythFactScore,
  type MythFactItem,
  type MythFactVerdict,
} from "@/lib/society/mythsFacts";

/** Judge a claim as myth or fact, then read the evidence. Nothing is stored. */
export function MythFactCards({ items }: { items: readonly MythFactItem[] }) {
  const [guesses, setGuesses] = useState<Record<string, MythFactVerdict>>({});
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (items.length === 0) return null;

  const item = items[index];
  const guess = guesses[item.id];
  const hasGuessed = guess !== undefined;
  const isLast = index === items.length - 1;
  const score = summariseMythFactScore(items, guesses);

  function choose(verdict: MythFactVerdict) {
    if (hasGuessed) return;
    setGuesses((previous) => ({ ...previous, [item.id]: verdict }));
  }

  function next() {
    if (!hasGuessed) return;
    if (isLast) setIsFinished(true);
    else setIndex((current) => current + 1);
  }

  function restart() {
    setGuesses({});
    setIndex(0);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <div className={`${CARD_CLASS} border-[var(--color-accent)] text-center`} role="status">
        <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Your score</p>
        <p className="my-2 text-5xl font-extrabold">
          {score.correct}
          <span className="text-2xl text-[var(--color-muted)]"> / {score.total}</span>
        </p>
        <h3 className="mb-1 mt-0">{score.headline}</h3>
        <p className="mx-auto mb-5 mt-0 max-w-md text-[var(--color-muted)]">{score.advice}</p>
        <ul className="m-0 mb-5 grid list-none gap-2 p-0 text-left text-sm">
          {items.map((entry) => {
            const entryGuess = guesses[entry.id];
            const right = entryGuess !== undefined && isGuessCorrect(entry, entryGuess);
            return (
              <li key={entry.id} className="flex items-start gap-2">
                <span aria-label={right ? "Correct" : "Incorrect"}>{right ? "✓" : "✗"}</span>
                <span>
                  {entry.claim} <strong>({entry.verdict})</strong>
                </span>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={restart} className={BUTTON_OUTLINE}>
          Try again
        </button>
      </div>
    );
  }

  const correct = hasGuessed && isGuessCorrect(item, guess);

  return (
    <div className={`${CARD_CLASS} mx-auto max-w-3xl`}>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-[var(--color-accent)]">
          Card {index + 1} of {items.length}
        </span>
        <span className="text-[var(--color-muted)]">{score.answered} answered</span>
      </div>

      <p className="mb-4 mt-0 text-lg font-semibold leading-snug">{item.claim}</p>

      <div role="group" aria-label="Is this a myth or a fact?" className="flex flex-wrap gap-3">
        {MYTH_FACT_VERDICTS.map((verdict) => (
          <button
            key={verdict}
            type="button"
            aria-pressed={guess === verdict}
            aria-disabled={hasGuessed}
            onClick={() => choose(verdict)}
            className={`rounded-xl border px-6 py-2 font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              guess === verdict ? "border-[var(--color-accent)] bg-[var(--color-surface)]" : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            } ${hasGuessed ? "cursor-default" : ""}`}
          >
            {verdict}
          </button>
        ))}
      </div>

      {/* The feedback area keeps its height reserved so the card does not jump. */}
      <div className="mt-4 min-h-[9rem]" role="status" aria-live="polite">
        {hasGuessed && (
          <div className="text-sm">
            <p className="m-0">
              <strong className={correct ? "text-emerald-500" : "text-rose-500"}>{correct ? "Correct. " : "Not quite. "}</strong>
              This is a <strong>{item.verdict.toLowerCase()}</strong>. {item.explanation}
            </p>
            <p className="mb-0 mt-3 rounded-xl bg-[var(--color-surface)] p-3 text-xs text-[var(--color-muted)]">
              {item.evidence.text} {item.kind} ·{" "}
              <a href={item.evidence.href} target="_blank" rel="noopener noreferrer">
                {item.evidence.source}
              </a>{" "}
              · {item.evidence.date}
            </p>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        <button type="button" onClick={next} disabled={!hasGuessed} className={`${BUTTON_PRIMARY} disabled:cursor-not-allowed disabled:opacity-50`}>
          {isLast ? "See result" : "Next card"}
        </button>
      </div>
    </div>
  );
}