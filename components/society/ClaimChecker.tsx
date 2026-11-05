"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { rateClaim } from "@/lib/society/adoptionExplained";
import { READING_COPY } from "@/lib/society/adoptionExplainedContent";
import { CLAIM_QUESTIONS } from "@/lib/society/adoptionSurveysData";
import { toggleChecked } from "@/lib/tools/checklists";

/** Tick what an adoption claim tells you. Runs in your browser and stores nothing. */
export function ClaimChecker() {
  const [ticked, setTicked] = useState<ReadonlySet<string>>(new Set());
  const reading = useMemo(() => READING_COPY[rateClaim(ticked.size)], [ticked]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 text-sm font-semibold">Tick every statement that is true of the claim you are checking</legend>
        <ul className="m-0 grid list-none gap-3 p-0">
          {CLAIM_QUESTIONS.map((question) => (
            <li key={question.id} className={CARD_CLASS}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={ticked.has(question.id)}
                  onChange={() => setTicked((current) => toggleChecked(current, question.id))}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                />
                <span className="text-sm font-semibold">{question.question}</span>
              </label>
              <details className="ml-8 mt-1 text-sm">
                <summary className={`cursor-pointer text-[var(--color-muted)] ${FOCUS_RING}`}>Why this matters</summary>
                <p className="mb-0 mt-2">{question.whyItMatters}</p>
              </details>
            </li>
          ))}
        </ul>
      </fieldset>

      <aside className={`${CARD_CLASS} self-start border-[var(--color-accent)] lg:sticky lg:top-24`} aria-live="polite">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Your reading</p>
        <p className="mb-1 mt-1 text-lg font-extrabold">{reading.label}</p>
        <p className="mb-2 mt-0"><span className={BADGE_CLASS}>{ticked.size} of {CLAIM_QUESTIONS.length} answered</span></p>
        <p className="m-0 text-sm">{reading.message}</p>
        <button
          type="button"
          onClick={() => setTicked(new Set())}
          className={`mt-4 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
        >
          Clear
        </button>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">This says how checkable a claim is, not whether it is true. Nothing you tick leaves your browser.</p>
      </aside>
    </div>
  );
}