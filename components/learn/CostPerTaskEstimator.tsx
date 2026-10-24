"use client";

import { useMemo, useState } from "react";
import {
  API_COST_FIELDS,
  API_COST_PROBLEM_MESSAGES,
  API_COST_STARTING_VALUES,
  calculateApiCost,
  formatDollars,
  type ApiCostInput,
} from "@/lib/tools/apiCost";
import { parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Type your own token counts and prices to see cost per task and per month. */
export function CostPerTaskEstimator() {
  const [values, setValues] = useState<Record<keyof ApiCostInput, string>>(API_COST_STARTING_VALUES);

  const result = useMemo(
    () =>
      calculateApiCost({
        inputTokens: parseNumberField(values.inputTokens),
        outputTokens: parseNumberField(values.outputTokens),
        inputPricePerMillion: parseNumberField(values.inputPricePerMillion),
        outputPricePerMillion: parseNumberField(values.outputPricePerMillion),
        tasksPerMonth: parseNumberField(values.tasksPerMonth),
      }),
    [values],
  );

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        {API_COST_FIELDS.map((field) => (
          <div key={field.key}>
            <label htmlFor={`cost-${field.key}`} className="mb-1 block text-sm font-semibold">
              {field.label}
              <span className="ml-2 font-normal text-[var(--color-muted)]">{field.hint}</span>
            </label>
            <input
              id={`cost-${field.key}`}
              type="text"
              inputMode="decimal"
              value={values[field.key]}
              onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))}
              className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
            />
          </div>
        ))}
        <p className="m-0 text-xs text-[var(--color-muted)]">Token counts are examples. Enter prices from the provider, which are not shown on this page.</p>
      </div>

      <div role="status" aria-live="polite" className="self-start">
        {result.ok ? (
          <div className="rounded-2xl border border-[var(--color-accent)] p-5">
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Cost per task</p>
            <p className="my-1 text-3xl font-extrabold">{formatDollars(result.costPerTask)}</p>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              Input {formatDollars(result.inputCost)} + output {formatDollars(result.outputCost)}
            </p>
            <p className="mb-1 mt-4 text-sm font-semibold text-[var(--color-accent)]">Per month</p>
            <p className="m-0 text-2xl font-extrabold">{formatDollars(result.monthlyCost)}</p>
            <p className="mb-0 mt-4 text-xs text-[var(--color-muted)]">An estimate only. Prices and features change. Confirm on the provider&apos;s website before buying.</p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            {API_COST_PROBLEM_MESSAGES[result.reason]}
          </p>
        )}
      </div>
    </div>
  );
}