"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  assessSource,
  DEFAULT_CHECK_INPUT,
  findSourceType,
  type SourceCheckInput,
} from "@/lib/about/sourceCheck";
import {
  CHECKER_EXAMPLES,
  CLAIM_TYPES,
  SOURCE_TYPES,
  type ClaimTypeId,
  type SourceTypeId,
  type SourceUse,
} from "@/lib/about/sourcePolicyData";

const USE_BORDERS: Record<SourceUse, string> = {
  primary: "border-emerald-500",
  supporting: "border-sky-500",
  "lead-only": "border-amber-500",
  "not-used": "border-red-500",
};

const USE_SYMBOLS: Record<SourceUse, string> = {
  primary: "\u2713",
  supporting: "\u25D0",
  "lead-only": "\u2192",
  "not-used": "\u2715",
};

function describeLevel(rank: number | null): string {
  return rank === null ? "Outside the hierarchy" : `Level ${rank} of 4`;
}

/** Shows how we would treat a source for a claim. All rules live in lib/about. Nothing is saved or sent. */
export function SourceChecker() {
  const [input, setInput] = useState<SourceCheckInput>(DEFAULT_CHECK_INPUT);
  const assessment = useMemo(() => assessSource(input), [input]);
  const sourceType = findSourceType(input.sourceTypeId);

  function updateInput<Key extends keyof SourceCheckInput>(key: Key, value: SourceCheckInput[Key]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <div className={`${CARD_CLASS} grid gap-5 self-start`}>
        <div className="grid gap-1">
          <label htmlFor="checker-source" className="text-sm font-semibold">What kind of source is it?</label>
          <select
            id="checker-source"
            value={input.sourceTypeId}
            onChange={(event) => updateInput("sourceTypeId", event.target.value as SourceTypeId)}
            aria-describedby="checker-source-hint"
            className={INPUT_CLASS}
          >
            {SOURCE_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <p id="checker-source-hint" className="m-0 text-xs text-[var(--color-muted)]">{sourceType.description}</p>
        </div>

        <div className="grid gap-1">
          <label htmlFor="checker-claim" className="text-sm font-semibold">What do you want to use it for?</label>
          <select
            id="checker-claim"
            value={input.claimTypeId}
            onChange={(event) => updateInput("claimTypeId", event.target.value as ClaimTypeId)}
            className={INPUT_CLASS}
          >
            {CLAIM_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <fieldset className="m-0 grid gap-2 border-0 p-0">
          <legend className="mb-1 p-0 text-sm font-semibold">About your check</legend>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={input.isDated} onChange={(event) => updateInput("isDated", event.target.checked)} className="mt-1" />
            <span>The source or my check carries a date</span>
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={input.openedOriginal} onChange={(event) => updateInput("openedOriginal", event.target.checked)} className="mt-1" />
            <span>I opened the original page myself, not a quote, copy or screenshot</span>
          </label>
        </fieldset>

        <div>
          <p className="m-0 mb-2 text-sm font-semibold">Try an example</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Examples">
            {CHECKER_EXAMPLES.map((example) => (
              <button
                key={example.id}
                type="button"
                onClick={() =>
                  setInput({
                    sourceTypeId: example.sourceTypeId,
                    claimTypeId: example.claimTypeId,
                    isDated: example.isDated,
                    openedOriginal: example.openedOriginal,
                  })
                }
                className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => setInput(DEFAULT_CHECK_INPUT)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Reset</button>
        <p className="m-0 text-xs text-[var(--color-muted)]">Runs in your browser. Nothing is sent or saved.</p>
      </div>

      <div aria-live="polite" className="grid gap-4 self-start">
        <section className={`${CARD_CLASS} border-2 ${USE_BORDERS[assessment.use]}`}>
          <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
            <span className={BADGE_CLASS}>{describeLevel(assessment.rank)}</span>
            {assessment.resultLabel && <span className={BADGE_CLASS}>Label: {assessment.resultLabel}</span>}
          </p>
          <h3 className="mb-1 mt-3 text-2xl font-extrabold">
            <span aria-hidden="true" className="mr-2">{USE_SYMBOLS[assessment.use]}</span>
            {assessment.copy.headline}
          </h3>
          <p className="m-0 text-sm">{assessment.copy.meaning}</p>
          {assessment.notes.length > 0 && (
            <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
              {assessment.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          )}
        </section>

        <section className={CARD_CLASS}>
          <h3 className="m-0">Before you rely on it, check</h3>
          <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
            {assessment.checks.map((check) => <li key={check}>{check}</li>)}
          </ul>
        </section>

        <p className="m-0 text-xs text-[var(--color-muted)]">
          A simplified guide to our rules, not a ruling. Where it and the hierarchy above differ, the hierarchy wins.
        </p>
      </div>
    </div>
  );
}