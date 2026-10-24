import { formatPlanPrice, yearlyCost } from "@/lib/prices/planLogic";
import type { PlanRecord, Provider } from "@/lib/prices/planTypes";
import { formatVerifiedDate, isIsoDate } from "@/lib/prices/verification";
import { VerifiedOnLabel } from "./VerifiedOnLabel";

function StatusCell({ plan, provider }: { plan: PlanRecord; provider: Provider }) {
  const isVerified = plan.verifiedOn !== null && isIsoDate(plan.verifiedOn);
  return (
    <div className="grid gap-1 text-xs">
      {isVerified ? (
        <VerifiedOnLabel verifiedOn={plan.verifiedOn} />
      ) : (
        <span className="text-[var(--color-muted)]">
          Not yet verified. Third-party reports as of {formatVerifiedDate(provider.reportedAsOf)}.
        </span>
      )}
      <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer">
        Provider page
      </a>
    </div>
  );
}

/** One provider's plans, with the same columns for every provider. */
export function PlanTable({ provider, plans }: { provider: Provider; plans: readonly PlanRecord[] }) {
  return (
    <section aria-labelledby={`plans-${provider.id}`}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`plans-${provider.id}`} className="m-0">
          {provider.name}
        </h3>
        <p className="m-0 text-sm text-[var(--color-muted)]">
          Maker: {provider.maker} ·{" "}
          <a href={provider.pricingUrl} target="_blank" rel="noopener noreferrer">
            Official pricing page
          </a>
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
        <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
          <caption className="sr-only">{provider.name} plans and US prices</caption>
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th scope="col" className="p-3">Plan</th>
              <th scope="col" className="p-3">Per month, billed monthly</th>
              <th scope="col" className="p-3">Per month, billed annually</th>
              <th scope="col" className="p-3">12 months, billed monthly</th>
              <th scope="col" className="p-3">Usage</th>
              <th scope="col" className="p-3">Extras</th>
              <th scope="col" className="p-3">Notes</th>
              <th scope="col" className="p-3">Check</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const yearly = yearlyCost(plan, "monthly");
              return (
                <tr key={plan.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">
                    {plan.name}
                    <span className="block text-xs font-normal text-[var(--color-muted)]">
                      {plan.audience === "team" ? "Team" : "Individual"} · per {plan.pricedPer}
                    </span>
                  </th>
                  <td className="p-3 align-top font-semibold">
                    {formatPlanPrice(plan.monthlyPrice)}
                    {plan.monthlyPrice > 0 && <span className="font-normal text-[var(--color-muted)]"> /month</span>}
                  </td>
                  <td className="p-3 align-top">
                    {plan.annualBilledMonthlyPrice === null ? "—" : `${formatPlanPrice(plan.annualBilledMonthlyPrice)} /month`}
                  </td>
                  <td className="p-3 align-top">{yearly === null ? "—" : formatPlanPrice(yearly)}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{plan.usage ?? "—"}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{plan.extras ?? "—"}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">
                    {plan.notes}
                    {plan.minSeats !== null && ` Minimum ${plan.minSeats} seats.`}
                  </td>
                  <td className="p-3 align-top">
                    <StatusCell plan={plan} provider={provider} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}