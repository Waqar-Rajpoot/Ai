import {
  CONSUMER_PLANS,
  describeTeamBill,
  formatPlanDollars,
  getAnnualSavingsPerYear,
  getPlansForApp,
  getPremiumSeatSavingsPerYear,
  getSmallestTeamBill,
  PLAN_AUDIENCE_LABELS,
} from "@/lib/prices/planTable";
import { APPS } from "@/lib/compare/appsComparison";

/** Every plan in one table, with annual savings and the smallest team bill where the source gives a seat minimum. */
export function PlanLadderTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
        <caption className="sr-only">US consumer plans for ChatGPT, Claude, Gemini and Grok, with prices, annual prices and notes</caption>
        <thead className="bg-[var(--color-surface)]">
          <tr>
            <th scope="col" className="p-3">App</th>
            <th scope="col" className="p-3">Plan</th>
            <th scope="col" className="p-3">For</th>
            <th scope="col" className="p-3">Price per month</th>
            <th scope="col" className="p-3">If billed yearly</th>
            <th scope="col" className="p-3">Notes</th>
          </tr>
        </thead>
        {APPS.map((app) => {
          const plans = getPlansForApp(CONSUMER_PLANS, app.id);
          return (
            <tbody key={app.id} className="border-t-2 border-[var(--color-border)]">
              {plans.length === 0 ? (
                <tr>
                  <td className="p-3 align-top font-semibold">{app.name}</td>
                  <td colSpan={5} className="p-3 text-[var(--color-muted)]">Plans not collected yet. We add them once they are checked on the provider&apos;s own page.</td>
                </tr>
              ) : (
                plans.map((plan, index) => {
                  const savings = getAnnualSavingsPerYear(plan);
                  const premiumSavings = getPremiumSeatSavingsPerYear(plan);
                  const teamBill = getSmallestTeamBill(plan);
                  const seatText = plan.isPerSeat ? " a year per seat" : " a year";
                  return (
                    <tr key={plan.id} className={index > 0 ? "border-t border-[var(--color-border)]" : undefined}>
                      <td className="p-3 align-top font-semibold">{index === 0 ? app.name : ""}</td>
                      <th scope="row" className="p-3 align-top">{plan.name}</th>
                      <td className="p-3 align-top text-[var(--color-muted)]">{PLAN_AUDIENCE_LABELS[plan.audience]}</td>
                      <td className="p-3 align-top">
                        {plan.priceLabel}
                        {plan.isFromPrice && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">Several price points</span>}
                      </td>
                      <td className="p-3 align-top">
                        {plan.annualMonthlyDollars === undefined ? (
                          <span className="text-[var(--color-muted)]">Not listed</span>
                        ) : (
                          <>
                            {formatPlanDollars(plan.annualMonthlyDollars)} a month
                            {savings !== null && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">Saves {formatPlanDollars(savings)}{seatText}</span>}
                            {premiumSavings !== null && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">Premium seat saves {formatPlanDollars(premiumSavings)}{seatText}</span>}
                          </>
                        )}
                      </td>
                      <td className="p-3 align-top text-[var(--color-muted)]">
                        {plan.notes}
                        {plan.adsNote && <span className="mt-0.5 block text-xs">{plan.adsNote}</span>}
                        {teamBill && <span className="mt-0.5 block text-xs">{describeTeamBill(teamBill)}</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}