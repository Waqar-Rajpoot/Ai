import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeDaysFromToday } from "@/lib/shared/dates";
import {
  SUBSCRIPTION_KIND_LABELS,
  formatMoney,
  type OverlapNotice,
  type RenewalNotice,
  type RowCost,
  type Totals,
} from "@/lib/tools/subscriptionCost";

interface SubscriptionTotalsProps {
  totals: Totals;
  costs: readonly RowCost[];
  currencySymbol: string;
  overlap: OverlapNotice | null;
  renewals: readonly RenewalNotice[];
}

/** Four totals, a per-subscription breakdown, and any overlap or renewal notices. */
export function SubscriptionTotals({ totals, costs, currencySymbol, overlap, renewals }: SubscriptionTotalsProps) {
  if (totals.countedRows === 0) {
    return (
      <p className={`${CARD_CLASS} m-0 text-sm text-[var(--color-muted)]`}>
        Add a subscription with a price to see your totals.
        {totals.skippedRows > 0 ? ` ${totals.skippedRows} row${totals.skippedRows === 1 ? " has" : "s have"} no valid price yet.` : ""}
      </p>
    );
  }

  const stats: readonly { label: string; value: number }[] = [
    { label: "Per month", value: totals.monthly },
    { label: "Per year", value: totals.yearly },
    { label: "Per week", value: totals.weekly },
    { label: "Per day", value: totals.daily },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <dl className="m-0 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`${CARD_CLASS} py-3`}>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
              <dd className="m-0 text-2xl font-extrabold tabular-nums">{formatMoney(stat.value, currencySymbol)}</dd>
            </div>
          ))}
        </dl>
        {totals.taxPercent > 0 && (
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
            Includes {totals.taxPercent}% tax. Before tax: {formatMoney(totals.monthlyBeforeTax, currencySymbol)} a month, {formatMoney(totals.yearlyBeforeTax, currencySymbol)} a year.
          </p>
        )}
        {totals.skippedRows > 0 && (
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
            {totals.skippedRows} row{totals.skippedRows === 1 ? " has" : "s have"} no valid price and {totals.skippedRows === 1 ? "is" : "are"} not counted.
          </p>
        )}
      </div>

      <section aria-labelledby="subscription-breakdown">
        <h3 id="subscription-breakdown" className="mt-0">Where the money goes</h3>
        <ul className="m-0 grid list-none gap-3 p-0">
          {costs.map((cost, index) => (
            <li key={cost.id} className={CARD_CLASS}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="m-0 font-semibold">
                  {cost.name}{" "}
                  <span className={`${BADGE_CLASS} ml-1 font-normal`}>{SUBSCRIPTION_KIND_LABELS[cost.kind]}</span>
                  {index === 0 && costs.length > 1 && <span className={`${BADGE_CLASS} ml-1`}>Biggest cost</span>}
                </p>
                <p className="m-0 text-sm tabular-nums">
                  {formatMoney(cost.monthly, currencySymbol)} a month · {formatMoney(cost.yearly, currencySymbol)} a year
                </p>
              </div>
              <div aria-hidden="true" className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                <div className="h-full bg-[image:var(--gradient-accent)]" style={{ width: `${Math.max(cost.sharePercent, 2)}%` }} />
              </div>
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">{Math.round(cost.sharePercent)}% of your spend</p>
            </li>
          ))}
        </ul>
      </section>

      {overlap && (
        <section className={`${CARD_CLASS} border-amber-500/60`} aria-labelledby="subscription-overlap">
          <h3 id="subscription-overlap" className="mt-0">You pay for {overlap.count} chat assistants</h3>
          <p className="m-0 text-sm">
            {overlap.names.join(", ")}. Dropping the cheapest, {overlap.cheapestName}, would save about {formatMoney(overlap.cheapestMonthly, currencySymbol)} a month. Many people need only one. If you use each for a different job, keep both.
          </p>
        </section>
      )}

      {renewals.length > 0 && (
        <section className={CARD_CLASS} aria-labelledby="subscription-renewals">
          <h3 id="subscription-renewals" className="mt-0">Renewals to watch</h3>
          <ul className="m-0 grid list-none gap-2 p-0 text-sm">
            {renewals.map((renewal) => (
              <li key={renewal.id} className="border-t border-[var(--color-border)] pt-2 first:border-t-0 first:pt-0">
                {renewal.status === "upcoming" ? (
                  <>
                    <strong>{renewal.name}</strong> renews on {formatIsoDate(renewal.renewsOn)} ({describeDaysFromToday(renewal.daysLeft)}) and charges about {formatMoney(renewal.charge, currencySymbol)}. Cancel before then if you do not want it.
                  </>
                ) : (
                  <>
                    <strong>{renewal.name}</strong>: the date {formatIsoDate(renewal.renewsOn)} has passed. Update it to your next renewal.
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}