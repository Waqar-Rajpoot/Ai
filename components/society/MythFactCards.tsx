"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { filterMythFacts, isGuessCorrect, scoreGuesses, type GuessMap } from "@/lib/society/mythFactLogic";
import { ALL_FILTER_VALUE, MYTHS_FACTS_ARTICLE_HREF } from "@/lib/society/mythsFactsConstants";
import { GUESS_OPTIONS, MYTH_FACTS, THEME_LABELS, THEME_ORDER, type GuessChoice } from "@/lib/society/mythsFacts";
import { VERDICT_BORDER_CLASSES, VerdictBadge } from "./VerdictBadge";

interface MythFactCardsProps {
  /** Route of the article the "read the evidence" links point to. */
  articleHref?: string;
}

/** Flip cards: guess myth, fact or it depends, then reveal the verdict. Reusable on /society/myth-or-fact. */
export function MythFactCards({ articleHref = MYTHS_FACTS_ARTICLE_HREF }: MythFactCardsProps) {
  const [theme, setTheme] = useState<string>(ALL_FILTER_VALUE);
  const [guesses, setGuesses] = useState<GuessMap>({});
  const [revealed, setRevealed] = useState<Readonly<Record<string, boolean | undefined>>>({});

  const cards = useMemo(
    () => filterMythFacts(MYTH_FACTS, { query: "", theme, verdict: ALL_FILTER_VALUE }),
    [theme],
  );
  const score = useMemo(() => scoreGuesses(MYTH_FACTS, guesses), [guesses]);

  function choose(cardId: string, choice: GuessChoice) {
    setGuesses((current) => ({ ...current, [cardId]: choice }));
    setRevealed((current) => ({ ...current, [cardId]: true }));
  }

  function showAnswer(cardId: string) {
    setRevealed((current) => ({ ...current, [cardId]: true }));
  }

  function tryAgain(cardId: string) {
    setGuesses((current) => ({ ...current, [cardId]: undefined }));
    setRevealed((current) => ({ ...current, [cardId]: false }));
  }

  function resetAll() {
    setGuesses({});
    setRevealed({});
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)} className={`${INPUT_CLASS} mt-1 min-w-[14rem]`}>
            <option value={ALL_FILTER_VALUE}>All themes</option>
            {THEME_ORDER.map((themeId) => (
              <option key={themeId} value={themeId}>{THEME_LABELS[themeId]}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <p className="m-0 text-sm" role="status" aria-live="polite">
            {score.answered === 0
              ? "Pick an answer on any card."
              : `Score: ${score.correct} of ${score.answered} right (${score.percent}%).`}
          </p>
          <button type="button" onClick={resetAll} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Reset all</button>
        </div>
      </div>

      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {cards.map((card) => {
          const guess = guesses[card.id];
          const isRevealed = revealed[card.id] === true;
          return (
            <li key={card.id} className={`${CARD_CLASS} ${isRevealed ? VERDICT_BORDER_CLASSES[card.verdict] : ""} flex flex-col`}>
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{THEME_LABELS[card.theme]}</p>
              <p className="mb-3 mt-1 text-lg font-semibold">&ldquo;{card.statement}&rdquo;</p>

              {!isRevealed ? (
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2" role="group" aria-label={`Your answer for: ${card.statement}`}>
                    {GUESS_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => choose(card.id, option.id)}
                        className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => showAnswer(card.id)} className={`mt-3 text-sm underline ${FOCUS_RING}`}>
                    Just show the answer
                  </button>
                </div>
              ) : (
                <div className="mt-auto grid gap-2">
                  <p className="m-0 flex flex-wrap items-center gap-2">
                    <VerdictBadge verdict={card.verdict} />
                    {guess !== undefined && (
                      <span className="text-sm font-semibold">
                        {isGuessCorrect(guess, card.verdict) ? "You guessed right." : "Not quite."}
                      </span>
                    )}
                  </p>
                  <p className="m-0 text-sm">{card.plain}</p>
                  <p className="m-0 flex flex-wrap items-center gap-4 text-sm">
                    <Link href={`${articleHref}#${card.id}`}>Read the evidence</Link>
                    <button type="button" onClick={() => tryAgain(card.id)} className={`underline ${FOCUS_RING}`}>Try again</button>
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}