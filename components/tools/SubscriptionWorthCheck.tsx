import { CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { calculateWorth, describeWorthResult, formatMoney } from "@/lib/tools/subscriptionCost";

interface SubscriptionWorthCheckProps {
  monthlyCost: number;
  currencySymbol: string;
  hoursSavedText: string;
  hourlyValueText: string;
  onHoursSavedChange: (text: string) => void;
  onHourlyValueChange: (text: string) => void;
}

/** Compares the value of time saved with the monthly cost, using the person's own estimates. */
export function SubscriptionWorthCheck({
  monthlyCost,
  currencySymbol,
  hoursSavedText,
  hourlyValueText,
  onHoursSavedChange,
  onHourlyValueChange,
}: SubscriptionWorthCheckProps) {
  const result = calculateWorth(monthlyCost, hoursSavedText, hourlyValueText);
  return (
    <section className={CARD_CLASS} aria-labelledby="worth-check-title">
      <h3 id="worth-check-title" className="mt-0">Does it pay for itself?</h3>
      <p className="mt-0 text-sm text-[var(--color-muted)]">A rough check. Both numbers are your own estimates, so be honest with them.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Hours AI saves you each month</span>
          <input type="text" inputMode="decimal" value={hoursSavedText} onChange={(event) => onHoursSavedChange(event.target.value)} placeholder="5" className={`${INPUT_CLASS} mt-1 tabular-nums`} />
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">What one hour of your time is worth ({currencySymbol})</span>
          <input type="text" inputMode="decimal" value={hourlyValueText} onChange={(event) => onHourlyValueChange(event.target.value)} placeholder="15" className={`${INPUT_CLASS} mt-1 tabular-nums`} />
        </label>
      </div>
      <p className="mb-0 mt-3 text-sm" role="status" aria-live="polite">
        <strong>Monthly cost: {formatMoney(monthlyCost, currencySymbol)}.</strong> {describeWorthResult(result, monthlyCost, currencySymbol)}
      </p>
      <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
        Use your pay rate, your billing rate, or what you would pay someone else to do the task. Time one real task with and without AI before you trust the hours.
      </p>
    </section>
  );
}