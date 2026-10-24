"use client";

import Link from "next/link";
import { useState } from "react";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  API_PRICE_ROWS,
  API_PRICES_CHECKED_ON,
  availablePeriods,
  effectiveRate,
  findPriceRow,
  formatPricePerMillion,
  formatRate,
  periodLabel,
  type PricePeriod,
} from "@/lib/prices/apiCostTable";
import { formatWholeNumber, parseNumberField } from "@/lib/shared/numberInput";
import { formatDollars } from "@/lib/tools/apiCost";
import {
  calculateApiCostScenario,
  compareWithSubscription,
  CUSTOM_MODEL_ID,
  CUSTOM_PRESET_ID,
  DEFAULT_PRESET_ID,
  DEFAULT_TASKS_PER_MONTH,
  rankPriceRows,
  SCALE_FACTORS,
  scaleMonthlyCost,
  SCENARIO_PROBLEM_MESSAGES,
  SUBSCRIPTION_VERDICT_MESSAGES,
  TASK_PRESETS,
  tasksWithinBudget,
} from "@/lib/tools/apiCostScenario";

const INPUT_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

interface NumberFieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (text: string) => void;
}

function NumberField({ id, label, hint, value, onChange }: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
        {hint && <span className="ml-2 font-normal text-[var(--color-muted)]">{hint}</span>}
      </label>
      <input id={id} type="text" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} className={INPUT_CLASS} />
    </div>
  );
}

function formatMultiple(value: number): string {
  return value < 10 ? `${value.toFixed(1)}x` : `${Math.round(value).toLocaleString("en-US")}x`;
}

/** Works out cost per task, month and year from tokens, volume and a price. Runs entirely in the browser. */
export function ApiCostCalculator() {
  const startingPreset = TASK_PRESETS.find((preset) => preset.id === DEFAULT_PRESET_ID) ?? TASK_PRESETS[0];

  const [modelId, setModelId] = useState("");
  const [period, setPeriod] = useState<PricePeriod>("current");
  const [presetId, setPresetId] = useState(startingPreset.id);
  const [inputTokensText, setInputTokensText] = useState(String(startingPreset.inputTokens));
  const [outputTokensText, setOutputTokensText] = useState(String(startingPreset.outputTokens));
  const [tasksText, setTasksText] = useState(DEFAULT_TASKS_PER_MONTH);
  const [customInputPriceText, setCustomInputPriceText] = useState("");
  const [customOutputPriceText, setCustomOutputPriceText] = useState("");
  const [cachedShareText, setCachedShareText] = useState("0");
  const [cachedPriceText, setCachedPriceText] = useState("");
  const [batchShareText, setBatchShareText] = useState("0");
  const [batchDiscountText, setBatchDiscountText] = useState("0");
  const [budgetText, setBudgetText] = useState("");
  const [subscriptionText, setSubscriptionText] = useState("");

  function chooseModel(nextId: string) {
    setModelId(nextId);
    setPeriod("current");
    const cachedPrice = findPriceRow(nextId)?.rate.cachedInputPricePerMillion;
    setCachedPriceText(cachedPrice !== undefined ? String(cachedPrice) : "");
  }

  function choosePreset(nextId: string) {
    setPresetId(nextId);
    const preset = TASK_PRESETS.find((item) => item.id === nextId);
    if (preset) {
      setInputTokensText(String(preset.inputTokens));
      setOutputTokensText(String(preset.outputTokens));
    }
  }

  function editInputTokens(text: string) {
    setInputTokensText(text);
    setPresetId(CUSTOM_PRESET_ID);
  }

  function editOutputTokens(text: string) {
    setOutputTokensText(text);
    setPresetId(CUSTOM_PRESET_ID);
  }

  const inputTokens = parseNumberField(inputTokensText);
  const outputTokens = parseNumberField(outputTokensText);
  const tasksPerMonth = parseNumberField(tasksText);

  const row = findPriceRow(modelId);
  const isCustomPrice = modelId === CUSTOM_MODEL_ID;
  const hasPriceChoice = row !== undefined || isCustomPrice;
  const periods = row ? availablePeriods(row) : [];
  const rateInfo = row ? effectiveRate(row, period, inputTokens) : null;

  const inputPrice = isCustomPrice ? parseNumberField(customInputPriceText) : (rateInfo?.rate.inputPricePerMillion ?? Number.NaN);
  const outputPrice = isCustomPrice ? parseNumberField(customOutputPriceText) : (rateInfo?.rate.outputPricePerMillion ?? Number.NaN);

  const scenarioInput = {
    inputTokens,
    outputTokens,
    inputPricePerMillion: inputPrice,
    outputPricePerMillion: outputPrice,
    tasksPerMonth,
    cachedInputSharePercent: parseNumberField(cachedShareText),
    cachedInputPricePerMillion: parseNumberField(cachedPriceText),
    batchSharePercent: parseNumberField(batchShareText),
    batchDiscountPercent: parseNumberField(batchDiscountText),
  };

  const result = hasPriceChoice ? calculateApiCostScenario(scenarioInput) : null;

  // The price after an introductory rate ends, shown as a plain list price with no discounts.
  const laterResult =
    row?.laterRate && period === "current" && result?.ok
      ? calculateApiCostScenario({
          ...scenarioInput,
          inputPricePerMillion: row.laterRate.rate.inputPricePerMillion,
          outputPricePerMillion: row.laterRate.rate.outputPricePerMillion,
          cachedInputSharePercent: 0,
          batchSharePercent: 0,
        })
      : null;

  const affordableTasks = result?.ok ? tasksWithinBudget(parseNumberField(budgetText), result.costPerTask) : null;
  const subscription = result?.ok ? compareWithSubscription(result.monthlyCost, parseNumberField(subscriptionText), result.costPerTask) : null;
  const scaled = result?.ok ? scaleMonthlyCost(result.monthlyCost, tasksPerMonth, SCALE_FACTORS) : [];

  const ranking = rankPriceRows(API_PRICE_ROWS, inputTokens, outputTokens, tasksPerMonth);
  const rankingRows = ranking.map((item) => [
    `${item.row.model}${item.longPromptApplied ? " (long-prompt rate)" : ""}`,
    formatDollars(item.costPerTask),
    formatDollars(item.monthlyCost),
    formatMultiple(item.timesCheapest),
  ]);

  const activePreset = TASK_PRESETS.find((preset) => preset.id === presetId);

  return (
    <div>
      <div className={`${CARD_CLASS} grid gap-8 lg:grid-cols-2`}>
        {/* Inputs */}
        <div className="grid content-start gap-6">
          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="mb-1 font-bold">1. Pick a price</legend>
            <div>
              <label htmlFor="api-calc-model" className="mb-1 block text-sm font-semibold">Model</label>
              <select id="api-calc-model" value={modelId} onChange={(event) => chooseModel(event.target.value)} className={INPUT_CLASS}>
                <option value="">Choose a model…</option>
                {API_PRICE_ROWS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.model} ({item.maker})
                  </option>
                ))}
                <option value={CUSTOM_MODEL_ID}>Enter my own prices</option>
              </select>
            </div>

            {row && periods.length > 1 && (
              <div>
                <label htmlFor="api-calc-period" className="mb-1 block text-sm font-semibold">Which price?</label>
                <select id="api-calc-period" value={period} onChange={(event) => setPeriod(event.target.value as PricePeriod)} className={INPUT_CLASS}>
                  {periods.map((item) => (
                    <option key={item} value={item}>
                      {periodLabel(row, item)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {row && rateInfo && (
              <p className="m-0 text-sm text-[var(--color-muted)]">
                Using {formatRate(rateInfo.rate)} per million tokens. Checked {API_PRICES_CHECKED_ON}. Source:{" "}
                <a href={row.sourceHref} target="_blank" rel="noopener noreferrer">{row.sourceName}</a>.
              </p>
            )}

            {isCustomPrice && (
              <>
                <NumberField id="api-calc-input-price" label="Input price (US$ per million tokens)" value={customInputPriceText} onChange={setCustomInputPriceText} />
                <NumberField id="api-calc-output-price" label="Output price (US$ per million tokens)" value={customOutputPriceText} onChange={setCustomOutputPriceText} />
              </>
            )}
          </fieldset>

          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="mb-1 font-bold">2. Describe one task</legend>
            <div>
              <label htmlFor="api-calc-preset" className="mb-1 block text-sm font-semibold">Typical task</label>
              <select id="api-calc-preset" value={presetId} onChange={(event) => choosePreset(event.target.value)} className={INPUT_CLASS}>
                {TASK_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
                <option value={CUSTOM_PRESET_ID}>My own numbers</option>
              </select>
              {activePreset && <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">{activePreset.description} Illustrative size. Measure your own.</p>}
            </div>
            <NumberField id="api-calc-input-tokens" label="Input tokens per task" hint="Everything you send." value={inputTokensText} onChange={editInputTokens} />
            <NumberField id="api-calc-output-tokens" label="Output tokens per task" hint="What comes back, including reasoning." value={outputTokensText} onChange={editOutputTokens} />
            <p className="m-0 text-xs text-[var(--color-muted)]">
              No counts yet? Use the <Link href="/tools/token-estimator">token estimator</Link>.
            </p>
          </fieldset>

          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="mb-1 font-bold">3. Set your volume</legend>
            <NumberField id="api-calc-tasks" label="Tasks per month" value={tasksText} onChange={setTasksText} />
          </fieldset>

          <details className="rounded-xl border border-[var(--color-border)] p-4">
            <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>Caching and batch discounts (optional)</summary>
            <div className="mt-3 grid gap-3">
              <NumberField id="api-calc-cached-share" label="Share of input read from cache (%)" hint="Repeated input, such as a long shared instruction." value={cachedShareText} onChange={setCachedShareText} />
              <NumberField id="api-calc-cached-price" label="Cached input price (US$ per million tokens)" hint={row?.rate.cachedInputPricePerMillion !== undefined ? "Filled in from our table." : "Check your provider."} value={cachedPriceText} onChange={setCachedPriceText} />
              <NumberField id="api-calc-batch-share" label="Share of tasks run in batch mode (%)" value={batchShareText} onChange={setBatchShareText} />
              <NumberField id="api-calc-batch-discount" label="Batch discount (%)" hint="Check your provider. Not every provider offers one." value={batchDiscountText} onChange={setBatchDiscountText} />
            </div>
          </details>

          <details className="rounded-xl border border-[var(--color-border)] p-4">
            <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>Budget and subscription check (optional)</summary>
            <div className="mt-3 grid gap-3">
              <NumberField id="api-calc-budget" label="Monthly budget (US$)" hint="See how many tasks it covers." value={budgetText} onChange={setBudgetText} />
              <NumberField id="api-calc-subscription" label="Subscription price (US$ per month)" hint="Compare with a chat plan." value={subscriptionText} onChange={setSubscriptionText} />
            </div>
          </details>

          <p className="m-0 text-xs text-[var(--color-muted)]">Your numbers stay in your browser. Nothing is sent or saved.</p>
        </div>

        {/* Results */}
        <div role="status" aria-live="polite" className="grid content-start gap-4">
          {!hasPriceChoice && (
            <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
              Choose a model, or enter your own prices, to see the cost. The table below already compares every model for the task you described.
            </p>
          )}

          {result && !result.ok && (
            <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
              {SCENARIO_PROBLEM_MESSAGES[result.reason]}
            </p>
          )}

          {result?.ok && (
            <>
              {rateInfo?.longPromptApplied && row?.longPrompt && (
                <p className="m-0 rounded-xl border border-amber-500 bg-amber-500/10 p-3 text-sm">
                  <strong>Long-prompt rate applied.</strong> This provider bills the whole request at a higher rate once the prompt is this long. Splitting the input can cost less.
                </p>
              )}

              <div className="rounded-2xl border border-[var(--color-accent)] p-5">
                <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Cost per task</p>
                <p className="my-1 text-3xl font-extrabold">{formatDollars(result.costPerTask)}</p>
                <p className="m-0 text-sm text-[var(--color-muted)]">
                  Input {formatDollars(result.inputCost)} + output {formatDollars(result.outputCost)}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Per month</p>
                    <p className="m-0 text-2xl font-extrabold">{formatDollars(result.monthlyCost)}</p>
                  </div>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Per year</p>
                    <p className="m-0 text-2xl font-extrabold">{formatDollars(result.yearlyCost)}</p>
                  </div>
                </div>
                {(result.cacheSavingsPerMonth > 0 || result.batchSavingsPerMonth > 0) && (
                  <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
                    Saved each month: {formatDollars(result.cacheSavingsPerMonth)} from caching and {formatDollars(result.batchSavingsPerMonth)} from batch.
                  </p>
                )}
              </div>

              {row?.laterRate && laterResult?.ok && (
                <p className="m-0 rounded-xl bg-[var(--color-surface)] p-4 text-sm">
                  <strong>Price change ahead.</strong> {row.laterRate.label}: {formatRate(row.laterRate.rate)}. At the later list price (no caching or batch), this task costs{" "}
                  {formatDollars(laterResult.costPerTask)} and {formatDollars(laterResult.monthlyCost)} a month.
                </p>
              )}

              {affordableTasks !== null && (
                <p className="m-0 rounded-xl bg-[var(--color-surface)] p-4 text-sm">
                  <strong>Budget:</strong> {formatDollars(parseNumberField(budgetText))} a month covers about {formatWholeNumber(affordableTasks)} tasks.
                </p>
              )}

              {subscription && (
                <div className="rounded-xl bg-[var(--color-surface)] p-4 text-sm">
                  <p className="m-0">
                    <strong>Versus the subscription:</strong>{" "}
                    {subscription.monthlyDifference >= 0
                      ? `the API costs ${formatDollars(subscription.monthlyDifference)} less a month.`
                      : `the subscription costs ${formatDollars(Math.abs(subscription.monthlyDifference))} less a month.`}{" "}
                    They break even at about {formatWholeNumber(subscription.breakEvenTasksPerMonth)} tasks a month.
                  </p>
                  <p className="mb-0 mt-2 text-[var(--color-muted)]">{SUBSCRIPTION_VERDICT_MESSAGES[subscription.verdict]}</p>
                </div>
              )}

              <div>
                <p className="mb-2 mt-0 text-sm font-semibold">What if volume changes?</p>
                <ComparisonTable
                  caption="Monthly cost at different volumes"
                  headers={["Volume", "Tasks per month", "Monthly cost"]}
                  rows={scaled.map((item) => [
                    item.factor === 1 ? "Your volume" : `${item.factor}x`,
                    formatWholeNumber(item.tasksPerMonth),
                    formatDollars(item.monthlyCost),
                  ])}
                />
              </div>

              <p className="m-0 text-xs text-[var(--color-muted)]">
                An estimate only, at list prices. Prices and features change. Confirm on the provider&apos;s website before buying. Cached input from our table: {row?.rate.cachedInputPricePerMillion !== undefined ? formatPricePerMillion(row.rate.cachedInputPricePerMillion) : "not published for this model"}.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Compare every model */}
      <div className="mt-8">
        <h3 className="mb-2 mt-0">The same task on every model</h3>
        {ranking.length > 0 ? (
          <>
            <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">
              Cheapest first, at current list prices with no caching or batch discount. This is cost only, not quality. A cheaper model that fails your task costs more in the end, so read the{" "}
              <Link href="/compare/reviews">reviews</Link> and test your own tasks.
            </p>
            <ComparisonTable
              caption="Cost of the same task on every model in our table"
              headers={["Model", "Cost per task", "Cost per month", "Compared with cheapest"]}
              rows={rankingRows}
            />
          </>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Enter valid token counts and a task volume to compare every model.
          </p>
        )}
      </div>
    </div>
  );
}