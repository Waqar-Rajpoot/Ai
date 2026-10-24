"use client";

import { useId, useMemo, useState } from "react";
import { TASK_PRESETS } from "@/lib/compare/modelCost";
import { getMakers, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import {
  DAYS_PER_MONTH,
  DEFAULT_SUBSCRIPTION_BUDGET_DOLLARS,
  estimateTasksForBudget,
  formatCount,
  MAX_SUBSCRIPTION_BUDGET_DOLLARS,
} from "@/lib/compare/subscriptionVsApi";
import { formatTaskCost } from "@/lib/compare/modelCost";
import { parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;
const MAKERS = getMakers(MODEL_DIRECTORY_ROWS);

/** How many example tasks a monthly budget buys through the API, at list price. */
export function SubscriptionVsApiEstimator() {
  const budgetId = useId();
  const modelId = useId();
  const taskId = useId();
  const [budgetText, setBudgetText] = useState(String(DEFAULT_SUBSCRIPTION_BUDGET_DOLLARS));
  const [selectedModelId, setSelectedModelId] = useState(MODEL_DIRECTORY_ROWS[0].id);
  const [selectedTaskId, setSelectedTaskId] = useState(TASK_PRESETS[0].id);

  const row = MODEL_DIRECTORY_ROWS.find((candidate) => candidate.id === selectedModelId) ?? MODEL_DIRECTORY_ROWS[0];
  const preset = TASK_PRESETS.find((candidate) => candidate.id === selectedTaskId) ?? TASK_PRESETS[0];

  const estimate = useMemo(
    () => estimateTasksForBudget(row, preset, parseNumberField(budgetText)),
    [row, preset, budgetText],
  );

  return (
    <div className="grid gap-4">
      <div className={`${CARD_CLASS} grid gap-4 md:grid-cols-3`}>
        <div>
          <label htmlFor={budgetId} className="mb-1 block text-sm font-semibold">Monthly budget (US dollars)</label>
          <input id={budgetId} type="text" inputMode="decimal" value={budgetText} onChange={(event) => setBudgetText(event.target.value)} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor={modelId} className="mb-1 block text-sm font-semibold">API model</label>
          <select id={modelId} value={selectedModelId} onChange={(event) => setSelectedModelId(event.target.value)} className={FIELD_CLASS}>
            {MAKERS.map((maker) => (
              <optgroup key={maker} label={maker}>
                {MODEL_DIRECTORY_ROWS.filter((candidate) => candidate.maker === maker).map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={taskId} className="mb-1 block text-sm font-semibold">Example task</label>
          <select id={taskId} value={selectedTaskId} onChange={(event) => setSelectedTaskId(event.target.value)} className={FIELD_CLASS}>
            {TASK_PRESETS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {estimate ? (
          <div className="rounded-2xl border border-[var(--color-accent)] p-5">
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">At API list price, this budget buys about</p>
            <p className="my-1 text-3xl font-extrabold">{formatCount(estimate.tasks)} tasks</p>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              That is about {formatCount(estimate.tasksPerDay)} a day over {DAYS_PER_MONTH} days, at {formatTaskCost(estimate.costPerTaskDollars)} per task.
            </p>
            <p className="mb-0 mt-4 text-xs text-[var(--color-muted)]">
              Not a like-for-like comparison. A subscription also gives you the app, its features and its own limits, and the example token counts are illustrations. Intro and off-peak rates are not applied.
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Enter a budget above $0 and up to ${MAX_SUBSCRIPTION_BUDGET_DOLLARS.toLocaleString("en-US")}.
          </p>
        )}
      </div>
    </div>
  );
}