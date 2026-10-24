import { CARD_CLASS } from "@/components/learn/learnStyles";
import { formatPlanPrice, groupByPriceBand } from "@/lib/prices/planLogic";
import { PLAN_RECORDS, PROVIDERS } from "@/lib/prices/planRecords";
import { PLAN_PRICE_BANDS } from "@/lib/prices/plansPageContent";

const PROVIDER_BY_ID = new Map(PROVIDERS.map((provider) => [provider.id, provider]));

/** Every plan sorted into a price band. Grouped by price only, listed by provider, not ranked. */
export function PriceBandsView() {
  const groups = groupByPriceBand(PLAN_RECORDS, PLAN_PRICE_BANDS).filter((group) => group.plans.length > 0);

  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
      {groups.map(({ band, plans }) => (
        <li key={band.id} className={CARD_CLASS}>
          <h3 className="mt-0">{band.label}</h3>
          <ul className="m-0 grid list-none gap-1 p-0 text-sm">
            {plans.map((plan) => (
              <li key={plan.id} className="flex flex-wrap justify-between gap-2">
                <span>
                  {PROVIDER_BY_ID.get(plan.providerId)?.name ?? plan.providerId}: {plan.name}
                  {plan.pricedPer === "seat" && <span className="text-[var(--color-muted)]"> (per seat)</span>}
                </span>
                <span className="font-semibold">{formatPlanPrice(plan.monthlyPrice)}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}