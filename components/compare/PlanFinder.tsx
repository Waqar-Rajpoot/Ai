"use client";

import { useId, useMemo, useState } from "react";
import { APPS, summarizeBudgetFit } from "@/lib/compare/appsComparison";
import {
  AUDIENCE_FILTERS,
  CONSUMER_PLANS,
  DEFAULT_PLAN_BUDGET_DOLLARS,
  formatPlanDollars,
  MAX_PLAN_BUDGET_DOLLARS,
  PLAN_AUDIENCE_LABELS,
  type PlanAudienceFilter,
} from "@/lib/prices/planTable";
import { parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

function joinNames(names: readonly string[]): string {
  return names.join(", ");
}

/** Shows the plans that cost no more than a monthly budget. Team prices are per seat. */
export function PlanFinder() {
  const budgetId = useId();
  const audienceId = useId();
  const [budgetText, setBudgetText] = useState(String(DEFAULT_PLAN_BUDGET_DOLLARS));
  const [audience, setAudience] = useState<PlanAudienceFilter>("any-paid");

  const budget = parseNumberField(budgetText);
  const isBudgetValid = Number.isFinite(budget) && budget >= 0 && budget <= MAX_PLAN_BUDGET_DOLLARS;

  const fit = useMemo(
    () => (isBudgetValid ? summarizeBudgetFit(CONSUMER_PLANS, APPS, { maxMonthlyDollars: budget, audience }) : null),
    [budget, isBudgetValid, audience],
  );

  return (
    <div className="grid gap-4">
      <div className={`${CARD_CLASS} grid gap-4 sm:grid-cols-2`}>
        <div>
          <label htmlFor={budgetId} className="mb-1 block text-sm font-semibold">Most I would pay per month (US dollars)</label>
          <input id={budgetId} type="text" inputMode="decimal" value={budgetText} onChange={(event) => setBudgetText(event.target.value)} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor={audienceId} className="mb-1 block text-sm font-semibold">Plan type</label>
          <select id={audienceId} value={audience} onChange={(event) => setAudience(event.target.value as PlanAudienceFilter)} className={FIELD_CLASS}>
            {AUDIENCE_FILTERS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {fit ? (
          <div className="grid gap-4">
            {fit.matches.length === 0 ? (
              <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
                No plan in our snapshot costs {formatPlanDollars(budget)} a month or less for this plan type. Try a higher budget.
              </p>
            ) : (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                {fit.matches.map((plan) => {
                  const app = APPS.find((candidate) => candidate.id === plan.appId);
                  return (
                    <li key={plan.id}>
                      <div className={`${CARD_CLASS} h-full`}>
                        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                          {app?.name} · {PLAN_AUDIENCE_LABELS[plan.audience]}
                        </p>
                        <p className="mb-0 mt-1 font-semibold">{plan.name}</p>
                        <p className="mb-0 mt-1 text-sm">{plan.priceLabel}</p>
                        <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
                          {plan.notes}
                          {plan.adsNote ? ` ${plan.adsNote}` : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {fit.appsWithoutMatch.length > 0 && (
              <p className="m-0 text-sm text-[var(--color-muted)]">
                Nothing at this price in our snapshot: {joinNames(fit.appsWithoutMatch.map((app) => app.name))}.
              </p>
            )}
            {fit.appsWithoutPlanData.length > 0 && (
              <p className="m-0 text-sm text-[var(--color-muted)]">
                Plan data not collected yet: {joinNames(fit.appsWithoutPlanData.map((app) => app.name))}.
              </p>
            )}
            <p className="m-0 text-xs text-[var(--color-muted)]">
              Matches use the lowest listed price. Plans with several price points appear when their lowest price fits. Team prices are per seat.
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Enter a budget between $0 and {formatPlanDollars(MAX_PLAN_BUDGET_DOLLARS)}.
          </p>
        )}
      </div>
    </div>
  );
}