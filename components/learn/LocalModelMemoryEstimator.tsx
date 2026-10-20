"use client";

import { useMemo, useState } from "react";
import {
  calculateLocalModelMemory,
  DEFAULT_PRECISION_ID,
  formatGigabytes,
  MEMORY_OVERHEAD_FACTOR,
  MEMORY_PROBLEM_MESSAGES,
  MEMORY_STARTING_PARAMETERS,
  PRECISION_OPTIONS,
} from "@/lib/tools/memoryEstimate";
import { parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const INPUT_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

/** Estimate the memory a local model needs from its parameter count and precision. */
export function LocalModelMemoryEstimator() {
  const [parametersText, setParametersText] = useState(MEMORY_STARTING_PARAMETERS);
  const [precisionId, setPrecisionId] = useState(DEFAULT_PRECISION_ID);

  const precision = PRECISION_OPTIONS.find((option) => option.id === precisionId) ?? PRECISION_OPTIONS[0];

  const result = useMemo(
    () =>
      calculateLocalModelMemory({
        parametersInBillions: parseNumberField(parametersText),
        bytesPerParameter: precision.bytesPerParameter,
      }),
    [parametersText, precision.bytesPerParameter],
  );

  const overheadPercent = Math.round((MEMORY_OVERHEAD_FACTOR - 1) * 100);

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        <div>
          <label htmlFor="memory-parameters" className="mb-1 block text-sm font-semibold">
            Parameters (billions)
            <span className="ml-2 font-normal text-[var(--color-muted)]">For mixture-of-experts, use the total, not the active count.</span>
          </label>
          <input
            id="memory-parameters"
            type="text"
            inputMode="decimal"
            value={parametersText}
            onChange={(event) => setParametersText(event.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="memory-precision" className="mb-1 block text-sm font-semibold">
            Precision
            <span className="ml-2 font-normal text-[var(--color-muted)]">Fewer bits means less memory.</span>
          </label>
          <select id="memory-precision" value={precisionId} onChange={(event) => setPrecisionId(event.target.value)} className={INPUT_CLASS}>
            {PRECISION_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="m-0 text-xs text-[var(--color-muted)]">The values shown are examples. Replace them with your own.</p>
      </div>

      <div role="status" aria-live="polite" className="self-start">
        {result.ok ? (
          <div className="rounded-2xl border border-[var(--color-accent)] p-5">
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Memory needed, about</p>
            <p className="my-1 text-3xl font-extrabold">{formatGigabytes(result.estimatedGigabytes)}</p>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              Weights alone: {formatGigabytes(result.weightsGigabytes)}, plus about {overheadPercent}% for working space.
            </p>
            <p className="mb-0 mt-4 text-xs text-[var(--color-muted)]">
              An estimate only. A longer context needs more memory, and real use varies by software and hardware.
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            {MEMORY_PROBLEM_MESSAGES[result.reason]}
          </p>
        )}
      </div>
    </div>
  );
}