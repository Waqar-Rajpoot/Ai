"use client";

import { useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { GAP_VERDICT_COPY, MARGIN_EXAMPLES } from "@/lib/tools/benchmarkChecklistData";
import {
  DEFAULT_MARGIN_FORM,
  formatCount,
  formatPoints,
  runMarginCheck,
  type GapVerdict,
  type MarginFormValues,
} from "@/lib/tools/benchmarkMargin";
import { NEAR_CEILING_PERCENT } from "@/lib/tools/benchmarkConstants";

const VERDICT_BORDERS: Record<GapVerdict, string> = {
  clear: "border-emerald-500",
  narrow: "border-amber-500",
  noise: "border-red-500",
};

/** Tests whether the gap between two scores is bigger than the 95% margin. Runs in the browser. */
export function BenchmarkMarginCheck() {
  const [values, setValues] = useState<MarginFormValues>(DEFAULT_MARGIN_FORM);
  const outcome = useMemo(() => runMarginCheck(values), [values]);

  function updateValue<Key extends keyof MarginFormValues>(key: Key, value: MarginFormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <div className={`${CARD_CLASS} grid gap-4 self-start`}>
        <div className="grid gap-1">
          <label htmlFor="margin-score-a" className="text-sm font-semibold">Score of model A (%)</label>
          <input id="margin-score-a" type="text" inputMode="decimal" value={values.scoreAText} onChange={(event) => updateValue("scoreAText", event.target.value)} className={INPUT_CLASS} />
        </div>
        <div className="grid gap-1">
          <label htmlFor="margin-score-b" className="text-sm font-semibold">Score of model B (%)</label>
          <input id="margin-score-b" type="text" inputMode="decimal" value={values.scoreBText} onChange={(event) => updateValue("scoreBText", event.target.value)} className={INPUT_CLASS} />
        </div>
        <div className="grid gap-1">
          <label htmlFor="margin-sample" className="text-sm font-semibold">Questions or votes per model</label>
          <p id="margin-sample-hint" className="m-0 text-xs text-[var(--color-muted)]">Usually stated in the benchmark description or the arena page.</p>
          <input id="margin-sample" type="text" inputMode="numeric" aria-describedby="margin-sample-hint" value={values.sampleSizeText} onChange={(event) => updateValue("sampleSizeText", event.target.value)} className={INPUT_CLASS} />
        </div>
        <div>
          <p className="m-0 mb-2 text-sm font-semibold">Try an example</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Margin examples">
            {MARGIN_EXAMPLES.map((example) => (
              <button key={example.id} type="button" onClick={() => setValues(example.values)} className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}>
                {example.title}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => setValues(DEFAULT_MARGIN_FORM)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Reset</button>
        <p className="m-0 text-xs text-[var(--color-muted)]">Runs in your browser. Nothing is sent or saved.</p>
      </div>

      <div aria-live="polite">
        {outcome.ok ? (
          <div className="grid gap-4">
            <section className={`${CARD_CLASS} border-2 ${VERDICT_BORDERS[outcome.result.verdict]}`}>
              <h3 className="m-0">{GAP_VERDICT_COPY[outcome.result.verdict].heading}</h3>
              <p className="mb-0 mt-2 text-sm">{GAP_VERDICT_COPY[outcome.result.verdict].body}</p>
              <dl className="m-0 mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-[var(--color-muted)]">Gap</dt>
                  <dd className="m-0 text-2xl font-extrabold tabular-nums">{formatPoints(outcome.result.gapPoints)} points</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-muted)]">Margin (95%)</dt>
                  <dd className="m-0 text-2xl font-extrabold tabular-nums">±{formatPoints(outcome.result.marginPoints)} points</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-muted)]">Gap ÷ margin</dt>
                  <dd className="m-0 text-2xl font-extrabold tabular-nums">
                    {outcome.result.gapToMarginRatio === null ? "n/a" : outcome.result.gapToMarginRatio.toFixed(1)}
                  </dd>
                </div>
              </dl>
            </section>

            <section className={CARD_CLASS}>
              <h3 className="m-0">How many questions would settle it?</h3>
              {outcome.result.requiredSampleSize !== null ? (
                <p className="mb-0 mt-2 text-sm">
                  To tell models this far apart with 95% confidence you would need about <strong>{formatCount(outcome.result.requiredSampleSize)}</strong> questions or votes per model. This test used {formatCount(outcome.result.sampleSizePerModel)}.
                </p>
              ) : (
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">The scores are identical, so no number of questions would separate them.</p>
              )}
            </section>

            {outcome.result.isNearCeiling && (
              <section className={`${CARD_CLASS} border-amber-500/60`}>
                <p className="m-0 text-sm">
                  <strong>Near the ceiling.</strong> A score of {NEAR_CEILING_PERCENT} or more means little room is left, so this test may no longer separate models. The formula also understates the uncertainty here.
                </p>
              </section>
            )}

            <p className="m-0 text-xs text-[var(--color-muted)]">
              Assumes independent questions. Run-to-run variation and grader noise add uncertainty, so treat the margin as a minimum.
            </p>
          </div>
        ) : (
          <div role="alert" className={`${CARD_CLASS} border-red-500`}>
            <h3 className="m-0">Check these inputs</h3>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {outcome.errors.map((message) => <li key={message}>{message}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}