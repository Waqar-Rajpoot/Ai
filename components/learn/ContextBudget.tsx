"use client";

import { useMemo, useState } from "react";
import {
  calculateContextBudget,
  CONTEXT_FIELDS,
  CONTEXT_PROBLEM_MESSAGES,
  CONTEXT_STARTING_VALUES,
  CONTEXT_STATUS_MESSAGES,
  type ContextBudgetInput,
  type ContextBudgetStatus,
} from "@/lib/learn/contextBudget";
import { formatWholeNumber, parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const STATUS_STYLES: Record<ContextBudgetStatus, { box: string; bar: string }> = {
  fits: { box: "border-emerald-500 bg-emerald-500/10", bar: "bg-emerald-500" },
  tight: { box: "border-amber-500 bg-amber-500/10", bar: "bg-amber-500" },
  over: { box: "border-rose-500 bg-rose-500/10", bar: "bg-rose-500" },
};

/** Add up what must fit in a context window and see how full it is. */
export function ContextBudget() {
  const [values, setValues] = useState<Record<keyof ContextBudgetInput, string>>(CONTEXT_STARTING_VALUES);

  const result = useMemo(
    () =>
      calculateContextBudget({
        windowTokens: parseNumberField(values.windowTokens),
        instructionTokens: parseNumberField(values.instructionTokens),
        documentTokens: parseNumberField(values.documentTokens),
        historyTokens: parseNumberField(values.historyTokens),
        replyTokens: parseNumberField(values.replyTokens),
      }),
    [values],
  );

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        {CONTEXT_FIELDS.map((field) => (
          <div key={field.key}>
            <label htmlFor={`context-${field.key}`} className="mb-1 block text-sm font-semibold">
              {field.label}
              <span className="ml-2 font-normal text-[var(--color-muted)]">{field.hint}</span>
            </label>
            <input
              id={`context-${field.key}`}
              type="text"
              inputMode="numeric"
              value={values[field.key]}
              onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))}
              className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
            />
          </div>
        ))}
        <p className="m-0 text-xs text-[var(--color-muted)]">The numbers in the boxes are examples. Replace them with your own.</p>
      </div>

      <div role="status" aria-live="polite" className="self-start">
        {result.ok ? (
          <div className={`rounded-2xl border p-5 ${STATUS_STYLES[result.status].box}`}>
            <p className="m-0 text-lg font-bold">
              {formatWholeNumber(result.usedTokens)} tokens used ({Math.round(result.percentUsed)}%)
            </p>
            <div
              role="progressbar"
              aria-label="Context window used"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(100, Math.round(result.percentUsed))}
              className="my-3 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
            >
              <div className={`h-full ${STATUS_STYLES[result.status].bar}`} style={{ width: `${Math.min(100, result.percentUsed)}%` }} />
            </div>
            <p className="m-0 text-sm">
              {result.remainingTokens >= 0
                ? `${formatWholeNumber(result.remainingTokens)} tokens left.`
                : `Over by ${formatWholeNumber(Math.abs(result.remainingTokens))} tokens.`}{" "}
              {CONTEXT_STATUS_MESSAGES[result.status]}
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            {CONTEXT_PROBLEM_MESSAGES[result.reason]}
          </p>
        )}
      </div>
    </div>
  );
}