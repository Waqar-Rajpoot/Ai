"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { assessReviewAge } from "@/lib/about/editorial";
import { REVIEW_RULE } from "@/lib/about/editorialData";
import { REVIEW_AGE_COPY } from "@/lib/about/editorialContent";

/** Type the "Tested on" date from a review to see how old it is. Runs in the browser and stores nothing. */
export function ReviewAgeChecker() {
  const today = useToday();
  const [testedOn, setTestedOn] = useState("");
  const result = useMemo(
    () => (today && testedOn ? assessReviewAge(testedOn, today, REVIEW_RULE) : null),
    [today, testedOn],
  );
  const copy = result ? REVIEW_AGE_COPY[result.status] : null;

  return (
    <div className={`${CARD_CLASS} grid gap-4 md:grid-cols-[18rem_1fr]`}>
      <div>
        <label htmlFor="tested-on" className="text-sm font-semibold">Tested on</label>
        <p className="mb-2 mt-1 text-xs text-[var(--color-muted)]">The date printed on a review, such as 2026-10-17.</p>
        <input
          id="tested-on"
          type="date"
          value={testedOn}
          onChange={(event) => setTestedOn(event.target.value)}
          className={INPUT_CLASS}
        />
      </div>
      <div aria-live="polite">
        {!result || !copy ? (
          <p className="m-0 text-sm text-[var(--color-muted)]">{today ? "Pick a date to see how old the test is." : "Loading today's date…"}</p>
        ) : (
          <>
            <p className="m-0 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{copy.label}</span>
              {result.status !== "invalid" && result.status !== "future" && (
                <span className="tabular-nums text-[var(--color-muted)]">{result.days} day{result.days === 1 ? "" : "s"} old</span>
              )}
            </p>
            <p className="mb-0 mt-2 text-sm">{copy.message}</p>
          </>
        )}
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
          {REVIEW_RULE.staleAfterDays === null
            ? "Our maximum age for a review is still being decided, so this tool compares only with the quarterly re-test."
            : `Our stale limit is ${REVIEW_RULE.staleAfterDays} days.`}{" "}
          Age is not accuracy: a recent test can still be wrong, and an old one can still hold.
        </p>
      </div>
    </div>
  );
}