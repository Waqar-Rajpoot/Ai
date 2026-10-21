"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { API_MODELS } from "@/lib/prices/apiCostTable";
import {
  CACHE_STEP_PERCENT,
  DEFAULT_TASKS_PER_MONTH,
  MAX_CACHED_SHARE_PERCENT,
  MAX_INPUT_TOKENS,
  MAX_OUTPUT_MULTIPLIER,
  MAX_OUTPUT_TOKENS,
  MAX_TASKS_PER_MONTH,
  MIN_OUTPUT_MULTIPLIER,
  OUTPUT_MULTIPLIER_STEP,
} from "@/lib/prices/apiPricesConstants";
import { formatTokens, formatUsd } from "@/lib/prices/formatPrice";
import { CUSTOM_TASK_ID, DEFAULT_TASK_ID, findStandardTask, STANDARD_TASKS } from "@/lib/prices/standardTasks";
import { createUsage, logBarPercent, parseWholeNumber, rankModelsByCost } from "@/lib/tools/apiCost";

const DEFAULT_CUSTOM_INPUT = 5000;
const DEFAULT_CUSTOM_OUTPUT = 800;

/** Pick a task size and see what each model would charge, cheapest first. */
export function TaskCostEstimator() {
  const [taskId, setTaskId] = useState(DEFAULT_TASK_ID);
  const [customInputText, setCustomInputText] = useState(String(DEFAULT_CUSTOM_INPUT));
  const [customOutputText, setCustomOutputText] = useState(String(DEFAULT_CUSTOM_OUTPUT));
  const [tasksText, setTasksText] = useState(String(DEFAULT_TASKS_PER_MONTH));
  const [cachedSharePercent, setCachedSharePercent] = useState(0);
  const [useBatch, setUseBatch] = useState(false);
  const [useHigherRate, setUseHigherRate] = useState(false);
  const [outputMultiplier, setOutputMultiplier] = useState(MIN_OUTPUT_MULTIPLIER);

  const selectedTask = findStandardTask(taskId);
  const inputTokens = selectedTask
    ? selectedTask.inputTokens
    : parseWholeNumber(customInputText, 1, MAX_INPUT_TOKENS, DEFAULT_CUSTOM_INPUT);
  const outputTokens = selectedTask
    ? selectedTask.outputTokens
    : parseWholeNumber(customOutputText, 0, MAX_OUTPUT_TOKENS, DEFAULT_CUSTOM_OUTPUT);
  const tasksPerMonth = parseWholeNumber(tasksText, 1, MAX_TASKS_PER_MONTH, DEFAULT_TASKS_PER_MONTH);

  const ranked = useMemo(
    () =>
      rankModelsByCost(
        API_MODELS,
        createUsage(inputTokens, outputTokens, { cachedSharePercent, useBatch, useHigherRate, outputMultiplier }),
        tasksPerMonth,
      ),
    [inputTokens, outputTokens, tasksPerMonth, cachedSharePercent, useBatch, useHigherRate, outputMultiplier],
  );

  const usable = ranked.filter((entry) => !entry.cost.exceedsContext);
  const cheapest = usable[0];
  const priciest = usable[usable.length - 1];
  const minCost = cheapest?.cost.totalUsd ?? 0;
  const maxCost = priciest?.cost.totalUsd ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      {/* Controls */}
      <div className={`${CARD_CLASS} self-start`}>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-semibold">1. What is the task?</legend>
          <div className="grid gap-2">
            {[...STANDARD_TASKS, { id: CUSTOM_TASK_ID, label: "My own numbers", description: "Enter your own token counts." }].map((task) => (
              <button
                key={task.id}
                type="button"
                aria-pressed={taskId === task.id}
                onClick={() => setTaskId(task.id)}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition motion-reduce:transition-none ${FOCUS_RING} ${
                  taskId === task.id
                    ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                }`}
              >
                <strong className="block">{task.label}</strong>
                <span className="text-[var(--color-muted)]">{task.description}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {selectedTask ? (
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            About {formatTokens(inputTokens)} tokens in, {formatTokens(outputTokens)} out. These sizes are our own assumptions.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="text-sm">
              Input tokens
              <input inputMode="numeric" value={customInputText} onChange={(event) => setCustomInputText(event.target.value)} className={`${INPUT_CLASS} mt-1`} />
            </label>
            <label className="text-sm">
              Output tokens
              <input inputMode="numeric" value={customOutputText} onChange={(event) => setCustomOutputText(event.target.value)} className={`${INPUT_CLASS} mt-1`} />
            </label>
          </div>
        )}

        <h3 className="mb-2 mt-6 text-base">2. How often?</h3>
        <label className="text-sm">
          Tasks per month
          <input inputMode="numeric" value={tasksText} onChange={(event) => setTasksText(event.target.value)} className={`${INPUT_CLASS} mt-1`} />
        </label>

        <h3 className="mb-2 mt-6 text-base">3. Savings and risks</h3>
        <label className="block text-sm">
          Input served from cache: <strong>{cachedSharePercent}%</strong>
          <input
            type="range"
            min={0}
            max={MAX_CACHED_SHARE_PERCENT}
            step={CACHE_STEP_PERCENT}
            value={cachedSharePercent}
            onChange={(event) => setCachedSharePercent(Number(event.target.value))}
            className="mt-1 w-full accent-[var(--color-accent)]"
          />
        </label>
        <label className="mt-3 block text-sm">
          Hidden thinking: output tokens ×<strong>{outputMultiplier}</strong>
          <input
            type="range"
            min={MIN_OUTPUT_MULTIPLIER}
            max={MAX_OUTPUT_MULTIPLIER}
            step={OUTPUT_MULTIPLIER_STEP}
            value={outputMultiplier}
            onChange={(event) => setOutputMultiplier(Number(event.target.value))}
            className="mt-1 w-full accent-[var(--color-accent)]"
          />
        </label>
        <label className="mt-3 flex items-start gap-2 text-sm">
          <input type="checkbox" checked={useBatch} onChange={(event) => setUseBatch(event.target.checked)} className="mt-1 accent-[var(--color-accent)]" />
          <span>Run as a batch (about half price, where offered)</span>
        </label>
        <label className="mt-2 flex items-start gap-2 text-sm">
          <input type="checkbox" checked={useHigherRate} onChange={(event) => setUseHigherRate(event.target.checked)} className="mt-1 accent-[var(--color-accent)]" />
          <span>Budget for the higher rate (after intro prices end, or at peak hours)</span>
        </label>
      </div>

      {/* Results */}
      <div>
        <p className="mt-0 text-sm" role="status" aria-live="polite">
          {cheapest && priciest ? (
            <>
              Cheapest: <strong>{cheapest.model.name}</strong> at {formatUsd(minCost)} per task. Most expensive:{" "}
              <strong>{priciest.model.name}</strong> at {formatUsd(maxCost)}
              {minCost > 0 ? `, about ${Math.round(maxCost / minCost).toLocaleString("en-US")}× more.` : "."}
            </>
          ) : (
            "No model in this list can take an input that large."
          )}
        </p>

        <ol className="m-0 grid list-none gap-2 p-0">
          {ranked.map((entry, index) => {
            const { model, cost } = entry;
            return (
              <li key={model.id} className={`${CARD_CLASS} py-3 ${cost.exceedsContext ? "opacity-60" : ""}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-semibold">
                    <span className="mr-2 text-xs text-[var(--color-muted)]">{index + 1}</span>
                    {model.name}
                    <span className="ml-2 text-xs font-normal text-[var(--color-muted)]">{model.maker}</span>
                  </span>
                  {cost.exceedsContext ? (
                    <span className="text-sm">Input is larger than its {formatTokens(model.contextTokens)} context window</span>
                  ) : (
                    <span className="text-sm tabular-nums">
                      <strong>{formatUsd(cost.totalUsd)}</strong> per task · <strong>{formatUsd(entry.monthlyUsd)}</strong> per month
                    </span>
                  )}
                </div>
                {!cost.exceedsContext && (
                  <>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-border)]" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-[image:var(--gradient-accent)] transition-[width] duration-300 motion-reduce:transition-none"
                        style={{ width: `${logBarPercent(cost.totalUsd, minCost, maxCost)}%` }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {cost.usedLongPromptRate && <span className={`${BADGE_CLASS} border-amber-500`}>Long-prompt rate applied</span>}
                      {cost.usedAlternateRate && <span className={`${BADGE_CLASS} border-amber-500`}>Higher rate applied</span>}
                      {useBatch && !cost.batchApplied && <span className={BADGE_CLASS}>No batch discount, full price</span>}
                      {cost.batchApplied && <span className={BADGE_CLASS}>Batch discount applied</span>}
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Bars use a log scale so cheap and expensive models both stay readable. Estimates use list prices, exclude tax, and ignore
          cache-storage charges and built-in tool fees. Treat them as a planning guide, then confirm in the provider&apos;s console.
        </p>
      </div>
    </div>
  );
}