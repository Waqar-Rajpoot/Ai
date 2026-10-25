"use client";

import { useMemo, useRef, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { PAID_CONSUMER_PLANS, findPlanById, getPlanById, type PlanProvider } from "@/lib/prices/planTable";
import {
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY_SYMBOL,
  MAX_SUBSCRIPTION_ROWS,
  MAX_TAX_PERCENT,
} from "@/lib/tools/subscriptionConstants";
import {
  buildRowCosts,
  buildSubscriptionSummary,
  calculateTotals,
  createBlankRow,
  findOverlap,
  findRenewals,
  formatMoney,
  parseTaxPercent,
  rowFromPlan,
  switchRowBilling,
  type NewSubscriptionRow,
  type PlanBilling,
  type SubscriptionRow,
} from "@/lib/tools/subscriptionCost";
import { SubscriptionRowEditor } from "./SubscriptionRowEditor";
import { SubscriptionTotals } from "./SubscriptionTotals";
import { SubscriptionWorthCheck } from "./SubscriptionWorthCheck";

const PROVIDERS: readonly PlanProvider[] = ["ChatGPT", "Claude", "Gemini"];
const EXAMPLE_PLAN_IDS: readonly string[] = ["chatgpt-plus", "claude-pro"];

type CopyState = "idle" | "copied" | "failed";

/** The calculator. Everything stays in memory in this page: nothing is sent or saved. */
export function SubscriptionCostCalculator() {
  const today = useToday();
  const nextRowNumber = useRef(1);
  const [rows, setRows] = useState<SubscriptionRow[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState(DEFAULT_CURRENCY_SYMBOL);
  const [taxText, setTaxText] = useState("");
  const [planToAddId, setPlanToAddId] = useState(PAID_CONSUMER_PLANS[0]?.id ?? "");
  const [hoursSavedText, setHoursSavedText] = useState("");
  const [hourlyValueText, setHourlyValueText] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const taxPercent = parseTaxPercent(taxText);
  const totals = useMemo(() => calculateTotals(rows, taxPercent), [rows, taxPercent]);
  const costs = useMemo(() => buildRowCosts(rows, taxPercent), [rows, taxPercent]);
  const overlap = useMemo(() => findOverlap(rows, taxPercent), [rows, taxPercent]);
  const renewals = useMemo(() => (today ? findRenewals(rows, taxPercent, today) : []), [rows, taxPercent, today]);
  const isFull = rows.length >= MAX_SUBSCRIPTION_ROWS;

  function createRowId(): string {
    const id = `row-${nextRowNumber.current}`;
    nextRowNumber.current += 1;
    return id;
  }

  function appendRows(newRows: readonly NewSubscriptionRow[]) {
    const withIds = newRows.map((row) => ({ ...row, id: createRowId() }));
    setRows((current) => [...current, ...withIds].slice(0, MAX_SUBSCRIPTION_ROWS));
    setCopyState("idle");
  }

  function updateRow(id: string, patch: Partial<SubscriptionRow>) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    setCopyState("idle");
  }

  function switchBilling(id: string, billing: PlanBilling) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        const plan = findPlanById(row.presetId);
        return plan ? switchRowBilling(row, plan, billing) : row;
      }),
    );
  }

  function removeRow(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
    setCopyState("idle");
  }

  function loadExample() {
    const exampleRows = EXAMPLE_PLAN_IDS.map((planId) => rowFromPlan(getPlanById(planId), "monthly", 1));
    setRows(exampleRows.map((row) => ({ ...row, id: createRowId() })));
    setCopyState("idle");
  }

  function clearAll() {
    setRows([]);
    setTaxText("");
    setHoursSavedText("");
    setHourlyValueText("");
    setCopyState("idle");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSubscriptionSummary(costs, totals, currencySymbol));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="grid gap-8">
      <div className={`${CARD_CLASS} grid gap-4`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-[var(--color-muted)]">Currency symbol (label only, nothing is converted)</span>
            <select value={currencySymbol} onChange={(event) => setCurrencySymbol(event.target.value)} className={`${INPUT_CLASS} mt-1`}>
              {CURRENCY_OPTIONS.map((option) => <option key={option.symbol} value={option.symbol}>{option.label}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-[var(--color-muted)]">Tax on your bills, % (optional, 0 to {MAX_TAX_PERCENT})</span>
            <input type="text" inputMode="decimal" value={taxText} onChange={(event) => setTaxText(event.target.value)} placeholder="0" className={`${INPUT_CLASS} mt-1 tabular-nums`} />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <label className="text-sm">
            <span className="text-[var(--color-muted)]">Add a plan you pay for</span>
            <select value={planToAddId} onChange={(event) => setPlanToAddId(event.target.value)} className={`${INPUT_CLASS} mt-1`}>
              {PROVIDERS.map((provider) => (
                <optgroup key={provider} label={provider}>
                  {PAID_CONSUMER_PLANS.filter((plan: any    ) => plan.provider === provider).map((plan: any) => (
                    <option key={plan.id} value={plan.id}>{plan.label}: {plan.priceNote}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button type="button" disabled={isFull} onClick={() => appendRows([rowFromPlan(getPlanById(planToAddId), "monthly", 1)])} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm disabled:opacity-50`}>
            Add plan
          </button>
          <button type="button" disabled={isFull} onClick={() => appendRows([createBlankRow()])} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold disabled:opacity-50 ${FOCUS_RING}`}>
            Add my own
          </button>
        </div>
        <p className="m-0 text-xs text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying. Presets are US dollars before tax. You can add up to {MAX_SUBSCRIPTION_ROWS} subscriptions.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="mb-3 mt-0">No subscriptions yet. Add a plan above, or start from a typical setup.</p>
          <button type="button" onClick={loadExample} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Try an example</button>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0">
          {rows.map((row, index) => (
            <SubscriptionRowEditor
              key={row.id}
              row={row}
              index={index}
              plan={findPlanById(row.presetId)}
              currencySymbol={currencySymbol}
              taxPercent={taxPercent}
              onChange={(patch) => updateRow(row.id, patch)}
              onSwitchBilling={(billing) => switchBilling(row.id, billing)}
              onRemove={() => removeRow(row.id)}
            />
          ))}
        </ul>
      )}

      <section aria-labelledby="subscription-results">
        <h3 id="subscription-results" className="mt-0">Your totals</h3>
        <p className="mb-3 mt-0 text-sm" role="status" aria-live="polite">
          {totals.countedRows > 0
            ? `${totals.countedRows} subscription${totals.countedRows === 1 ? "" : "s"}: ${formatMoney(totals.monthly, currencySymbol)} a month, ${formatMoney(totals.yearly, currencySymbol)} a year.`
            : "Totals appear here once a subscription has a price."}
        </p>
        <SubscriptionTotals totals={totals} costs={costs} currencySymbol={currencySymbol} overlap={overlap} renewals={renewals} />
      </section>

      <SubscriptionWorthCheck
        monthlyCost={totals.monthly}
        currencySymbol={currencySymbol}
        hoursSavedText={hoursSavedText}
        hourlyValueText={hourlyValueText}
        onHoursSavedChange={setHoursSavedText}
        onHourlyValueChange={setHourlyValueText}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" disabled={totals.countedRows === 0} onClick={copySummary} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm disabled:opacity-50`}>
          Copy my summary
        </button>
        <button type="button" disabled={rows.length === 0} onClick={clearAll} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold disabled:opacity-50 ${FOCUS_RING}`}>
          Clear everything
        </button>
        <span className="text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          {copyState === "copied" && "Copied."}
          {copyState === "failed" && "Could not copy. Select the text and copy it yourself."}
        </span>
      </div>
    </div>
  );
}