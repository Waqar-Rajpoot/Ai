"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { assessWorkProfile } from "@/lib/society/jobs";
import { READING_COPY } from "@/lib/society/jobsContent";
import { WORK_TRAITS } from "@/lib/society/jobsData";
import { toggleChecked } from "@/lib/tools/checklists";

/** A private thinking aid: which kinds of task fill your week. Nothing is saved or sent. */
export function TaskProfileCheck() {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const result = useMemo(() => assessWorkProfile(WORK_TRAITS, selectedIds), [selectedIds]);
  const reading = READING_COPY[result.reading];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 text-sm font-semibold">Tick every statement that describes most of your work</legend>
        <ul className="m-0 grid list-none gap-3 p-0">
          {WORK_TRAITS.map((trait) => {
            const isSelected = selectedIds.has(trait.id);
            return (
              <li key={trait.id} className={CARD_CLASS}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => setSelectedIds((current) => toggleChecked(current, trait.id))}
                    className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                  />
                  <span className="text-sm font-semibold">{trait.text}</span>
                </label>
                <details className="ml-8 mt-1 text-sm">
                  <summary className={`cursor-pointer text-[var(--color-muted)] ${FOCUS_RING}`}>Why this matters</summary>
                  <p className="mb-0 mt-2">{trait.why}</p>
                </details>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <aside className={`${CARD_CLASS} self-start border-[var(--color-accent)] lg:sticky lg:top-24`} aria-live="polite">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Your reading</p>
        <p className="mb-1 mt-1 text-lg font-extrabold">{reading.label}</p>
        <p className="mb-2 mt-0 text-xs tabular-nums text-[var(--color-muted)]">
          {result.ticked} ticked · <span className={BADGE_CLASS}>{result.moreChange} tool-friendly</span>{" "}
          <span className={BADGE_CLASS}>{result.lessChange} human-centred</span>
        </p>
        <p className="m-0 text-sm">{reading.message}</p>
        {reading.nextSteps.length > 0 && (
          <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
            {reading.nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setSelectedIds(new Set())}
          className={`mt-4 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
        >
          Clear
        </button>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
          This is a thinking aid based on our own judgement. It is not a prediction, it is not a measurement of any real job, and nothing you tick leaves your browser.
        </p>
      </aside>
    </div>
  );
}