"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { filterPlans, parseBudget } from "@/lib/prices/planLogic";
import { PLAN_RECORDS, PROVIDERS } from "@/lib/prices/planRecords";
import type { PlanFilters } from "@/lib/prices/planTypes";
import { AUDIENCE_OPTIONS, TABLE_LEGEND } from "@/lib/prices/plansPageContent";
import { PlanTable } from "./PlanTable";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

const PROVIDER_OPTIONS: readonly { id: PlanFilters["providerId"]; label: string }[] = [
  { id: "all", label: "All providers" },
  ...PROVIDERS.map((provider) => ({ id: provider.id, label: provider.name })),
];

/** Filter the plans by provider, audience and monthly budget, then see one table per provider. */
export function PlanExplorer() {
  const [providerId, setProviderId] = useState<PlanFilters["providerId"]>("all");
  const [audience, setAudience] = useState<PlanFilters["audience"]>("all");
  const [budgetText, setBudgetText] = useState("");

  const budget = parseBudget(budgetText);
  const filtered = useMemo(
    () => filterPlans(PLAN_RECORDS, { providerId, audience, maxMonthlyPrice: budget.ok ? budget.value : null }),
    [providerId, audience, budget],
  );

  function resetFilters() {
    setProviderId("all");
    setAudience("all");
    setBudgetText("");
  }

  return (
    <div>
      <div className={`${CARD_CLASS} grid gap-4 sm:grid-cols-3`}>
        <div>
          <label htmlFor="plan-provider" className="mb-1 block text-sm font-semibold">Provider</label>
          <select
            id="plan-provider"
            value={providerId}
            onChange={(event) => {
              const option = PROVIDER_OPTIONS.find((item) => item.id === event.target.value);
              if (option) setProviderId(option.id);
            }}
            className={FIELD_CLASS}
          >
            {PROVIDER_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="plan-audience" className="mb-1 block text-sm font-semibold">Who is it for?</label>
          <select
            id="plan-audience"
            value={audience}
            onChange={(event) => {
              const option = AUDIENCE_OPTIONS.find((item) => item.id === event.target.value);
              if (option) setAudience(option.id);
            }}
            className={FIELD_CLASS}
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="plan-budget" className="mb-1 block text-sm font-semibold">
            Most I would pay per month (US$)
          </label>
          <input
            id="plan-budget"
            type="text"
            inputMode="decimal"
            value={budgetText}
            placeholder="No limit"
            aria-invalid={!budget.ok}
            onChange={(event) => setBudgetText(event.target.value)}
            className={FIELD_CLASS}
          />
          {!budget.ok && <p className="mb-0 mt-1 text-xs text-rose-500">Enter a number of zero or more, or leave it blank.</p>}
        </div>
      </div>

      <p className="mb-4 mt-4 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {filtered.length} of {PLAN_RECORDS.length} plans. The budget compares the price billed monthly.
      </p>

      {filtered.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="mt-0 font-semibold">No plans match these filters.</p>
          <p className="text-[var(--color-muted)]">Raise the budget or choose a different audience.</p>
          <button
            type="button"
            onClick={resetFilters}
            className={`inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2.5 font-semibold ${FOCUS_RING}`}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8">
          {PROVIDERS.map((provider) => {
            const plans = filtered.filter((plan) => plan.providerId === provider.id);
            return plans.length > 0 ? <PlanTable key={provider.id} provider={provider} plans={plans} /> : null;
          })}
        </div>
      )}

      <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">{TABLE_LEGEND}</p>
    </div>
  );
}