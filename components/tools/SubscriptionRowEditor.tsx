import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import type { ConsumerPlan } from "@/lib/prices/planTable";
import { DEFAULT_CURRENCY_SYMBOL } from "@/lib/tools/subscriptionConstants";
import {
  BILLING_CYCLE_LABELS,
  SUBSCRIPTION_KIND_LABELS,
  formatMoney,
  getAnnualSavingsPerYear,
  getRowCost,
  parseSeats,
  type BillingCycle,
  type PlanBilling,
  type SubscriptionKind,
  type SubscriptionRow,
} from "@/lib/tools/subscriptionCost";

interface SubscriptionRowEditorProps {
  row: SubscriptionRow;
  index: number;
  plan: ConsumerPlan | null;
  currencySymbol: string;
  taxPercent: number;
  onChange: (patch: Partial<SubscriptionRow>) => void;
  onSwitchBilling: (billing: PlanBilling) => void;
  onRemove: () => void;
}

const KIND_IDS = Object.keys(SUBSCRIPTION_KIND_LABELS) as SubscriptionKind[];
const CYCLE_IDS = Object.keys(BILLING_CYCLE_LABELS) as BillingCycle[];

/** Fields for one subscription, with its live cost and plan-specific hints. */
export function SubscriptionRowEditor({
  row,
  index,
  plan,
  currencySymbol,
  taxPercent,
  onChange,
  onSwitchBilling,
  onRemove,
}: SubscriptionRowEditorProps) {
  const cost = getRowCost(row, taxPercent);
  const seats = parseSeats(row.seatsText);
  const savings = plan ? getAnnualSavingsPerYear(plan, seats) : null;
  const label = `Subscription ${index + 1}`;

  return (
    <li className={CARD_CLASS}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="m-0 text-base">{label}</h3>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}${row.name.trim() ? `: ${row.name.trim()}` : ""}`}
          className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold ${FOCUS_RING}`}
        >
          Remove
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="text-sm lg:col-span-2">
          <span className="text-[var(--color-muted)]">Name</span>
          <input type="text" value={row.name} onChange={(event) => onChange({ name: event.target.value })} placeholder="for example Claude Pro" className={`${INPUT_CLASS} mt-1`} />
        </label>
        <label className="text-sm lg:col-span-2">
          <span className="text-[var(--color-muted)]">Type</span>
          <select value={row.kind} onChange={(event) => onChange({ kind: event.target.value as SubscriptionKind })} className={`${INPUT_CLASS} mt-1`}>
            {KIND_IDS.map((kind) => <option key={kind} value={kind}>{SUBSCRIPTION_KIND_LABELS[kind]}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Price ({currencySymbol})</span>
          <input type="text" inputMode="decimal" value={row.priceText} onChange={(event) => onChange({ priceText: event.target.value })} placeholder="20" className={`${INPUT_CLASS} mt-1 tabular-nums`} />
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Billed</span>
          <select value={row.cycle} onChange={(event) => onChange({ cycle: event.target.value as BillingCycle })} className={`${INPUT_CLASS} mt-1`}>
            {CYCLE_IDS.map((cycle) => <option key={cycle} value={cycle}>{BILLING_CYCLE_LABELS[cycle]}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Seats</span>
          <input type="text" inputMode="numeric" value={row.seatsText} onChange={(event) => onChange({ seatsText: event.target.value })} className={`${INPUT_CLASS} mt-1 tabular-nums`} />
        </label>
        <label className="text-sm lg:col-span-2">
          <span className="text-[var(--color-muted)]">Next renewal (optional)</span>
          <input type="date" value={row.renewsOn} onChange={(event) => onChange({ renewsOn: event.target.value })} className={`${INPUT_CLASS} mt-1`} />
        </label>
        <p className="m-0 self-end text-sm sm:col-span-2 lg:col-span-3">
          {cost ? (
            <>
              <strong className="tabular-nums">{formatMoney(cost.monthly, currencySymbol)}</strong> a month ·{" "}
              <strong className="tabular-nums">{formatMoney(cost.yearly, currencySymbol)}</strong> a year
            </>
          ) : (
            <span className="text-[var(--color-muted)]">Enter a price to see the cost.</span>
          )}
        </p>
      </div>

      {plan && (
        <div className="mt-3 grid gap-2 border-t border-[var(--color-border)] pt-3 text-sm">
          <p className="m-0 text-[var(--color-muted)]">
            <span className={`${BADGE_CLASS} mr-2`}>Preset</span>
            {plan.priceNote}. {plan.note}.
          </p>
          {plan.annualMonthlyPrice !== null && (
            <p className="m-0">
              {row.cycle === "year" ? (
                <button type="button" onClick={() => onSwitchBilling("monthly")} className={`font-semibold underline ${FOCUS_RING}`}>Switch back to monthly billing</button>
              ) : (
                <button type="button" onClick={() => onSwitchBilling("annual")} className={`font-semibold underline ${FOCUS_RING}`}>Switch to yearly billing</button>
              )}
              {savings !== null && (
                <span className="text-[var(--color-muted)]"> (yearly billing is listed about {formatMoney(savings, DEFAULT_CURRENCY_SYMBOL)} a year cheaper for {seats} seat{seats === 1 ? "" : "s"})</span>
              )}
            </p>
          )}
          {seats < plan.minimumSeats && (
            <p className="m-0" role="alert">{plan.label} lists a minimum of {plan.minimumSeats} seats. Raise the seat count to match.</p>
          )}
          {currencySymbol !== DEFAULT_CURRENCY_SYMBOL && (
            <p className="m-0 text-[var(--color-muted)]">Preset prices are in US dollars. Edit the price to your own currency.</p>
          )}
        </div>
      )}
    </li>
  );
}