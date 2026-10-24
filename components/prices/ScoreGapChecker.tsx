"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { compareScores, describeScoreGap } from "@/lib/prices/benchmarkLogic";
import { GAP_EXAMPLES } from "@/lib/prices/benchmarkPageContent";
import { parseNumberField } from "@/lib/shared/numberInput";

type FieldKey = "scoreA" | "marginA" | "scoreB" | "marginB";

const FIELDS: readonly { key: FieldKey; label: string; hint: string }[] = [
  { key: "scoreA", label: "Score A", hint: "For example 1519" },
  { key: "marginA", label: "Margin A (±)", hint: "Optional" },
  { key: "scoreB", label: "Score B", hint: "For example 1517" },
  { key: "marginB", label: "Margin B (±)", hint: "Optional" },
];

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

/** A blank margin means "not published"; any other text must be a number. */
function parseMargin(text: string): number | null {
  return text.trim() === "" ? null : parseNumberField(text);
}

/** Type two scores and their margins to see whether the gap is real. Runs in the browser. */
export function ScoreGapChecker() {
  const [values, setValues] = useState<Record<FieldKey, string>>(GAP_EXAMPLES[0].values);

  const message = useMemo(
    () =>
      describeScoreGap(
        compareScores({
          scoreA: parseNumberField(values.scoreA),
          marginA: parseMargin(values.marginA),
          scoreB: parseNumberField(values.scoreB),
          marginB: parseMargin(values.marginB),
        }),
      ),
    [values],
  );

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div>
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Examples">
          {GAP_EXAMPLES.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => setValues(example.values)}
              className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
            >
              {example.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label htmlFor={`gap-${field.key}`} className="mb-1 block text-sm font-semibold">{field.label}</label>
              <input
                id={`gap-${field.key}`}
                type="text"
                inputMode="decimal"
                value={values[field.key]}
                placeholder={field.hint}
                onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))}
                className={FIELD_CLASS}
              />
            </div>
          ))}
        </div>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">The examples use real rows from the Arena tables above. Nothing leaves your browser.</p>
      </div>

      <div role="status" aria-live="polite" className="self-start rounded-2xl border border-[var(--color-accent)] p-5">
        <p className="m-0 text-lg font-bold">{message.headline}</p>
        <p className="mb-0 mt-2 text-sm">{message.detail}</p>
      </div>
    </div>
  );
}