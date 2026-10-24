"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  BREAK_EVEN_FIELDS,
  BREAK_EVEN_PROBLEM_MESSAGES,
  BREAK_EVEN_STARTING_VALUES,
  BREAK_EVEN_VERDICT_MESSAGES,
  calculateBreakEven,
  type BreakEvenInput,
} from "@/lib/compare/selfHostBreakEven";
import { formatWholeNumber, parseNumberField } from "@/lib/shared/numberInput";
import { formatDollars } from "@/lib/tools/apiCost";

/** Type your own numbers to compare a month of hosted use with running a model yourself. */
export function SelfHostBreakEven() {
  const [values, setValues] = useState<Record<keyof BreakEvenInput, string>>(BREAK_EVEN_STARTING_VALUES);

  const result = useMemo(
    () =>
      calculateBreakEven({
        hostedCostPerTask: parseNumberField(values.hostedCostPerTask),
        tasksPerMonth: parseNumberField(values.tasksPerMonth),
        selfHostMonthlyCost: parseNumberField(values.selfHostMonthlyCost),
      }),
    [values],
  );

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        {BREAK_EVEN_FIELDS.map((field) => (
          <div key={field.key}>
            <label htmlFor={`break-even-${field.key}`} className="mb-1 block text-sm font-semibold">
              {field.label}
              <span className="ml-2 font-normal text-[var(--color-muted)]">{field.hint}</span>
            </label>
            <input
              id={`break-even-${field.key}`}
              type="text"
              inputMode="decimal"
              value={values[field.key]}
              onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))}
              className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
            />
          </div>
        ))}
        <p className="m-0 text-xs text-[var(--color-muted)]">The task count is an example. Enter your own prices, which are not shown on this page.</p>
      </div>

      <div role="status" aria-live="polite" className="self-start">
        {result.ok ? (
          <div className="rounded-2xl border border-[var(--color-accent)] p-5">
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Hosted, per month</p>
            <p className="my-1 text-3xl font-extrabold">{formatDollars(result.hostedMonthlyCost)}</p>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              {result.monthlyDifference >= 0
                ? `Self-hosting costs ${formatDollars(result.monthlyDifference)} less per month.`
                : `Hosted costs ${formatDollars(Math.abs(result.monthlyDifference))} less per month.`}
            </p>
            <p className="mb-1 mt-4 text-sm font-semibold text-[var(--color-accent)]">Break-even</p>
            <p className="m-0 text-lg font-bold">About {formatWholeNumber(result.breakEvenTasksPerMonth)} tasks a month</p>
            <p className="mb-0 mt-4">{BREAK_EVEN_VERDICT_MESSAGES[result.verdict]}</p>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">An estimate only. Count every self-hosting cost, including your own time.</p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            {BREAK_EVEN_PROBLEM_MESSAGES[result.reason]}
          </p>
        )}
      </div>
    </div>
  );
}