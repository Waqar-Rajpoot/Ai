import Link from "next/link";
import { APPS, getApiSnapshot } from "@/lib/compare/appsComparison";
import { formatIsoDate, formatPricePerMillion, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import {
  CONSUMER_PLANS,
  getEntryPaidPlan,
  getMainstreamPlan,
  getPlansForApp,
  PLAN_SNAPSHOTS,
} from "@/lib/prices/planTable";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

/** One card per app: free plan, cheapest paid plan, mainstream plan, API range and the date of the plan source. */
export function AppSummaryCards() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {APPS.map((app) => {
        const plans = getPlansForApp(CONSUMER_PLANS, app.id);
        const freePlan = plans.find((plan) => plan.audience === "free");
        const entryPlan = getEntryPaidPlan(CONSUMER_PLANS, app.id);
        const mainstreamPlan = getMainstreamPlan(CONSUMER_PLANS, app.id);
        const api = getApiSnapshot(MODEL_DIRECTORY_ROWS, app.maker);
        const sourceDate = PLAN_SNAPSHOTS.find((snapshot) => snapshot.appId === app.id)?.sourceDate ?? null;

        return (
          <li key={app.id}>
            <article className={`${CARD_CLASS} h-full`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="m-0 text-xl">{app.name}</h3>
                <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                  by {app.maker}
                </span>
              </div>

              {plans.length === 0 ? (
                <p className="mb-0 mt-3 rounded-xl border border-dashed border-[var(--color-border)] p-3 text-sm text-[var(--color-muted)]">
                  Consumer plans are not collected yet. Only API prices are in our data.
                </p>
              ) : (
                <dl className="mb-0 mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Free plan</dt>
                    <dd className="m-0">{freePlan ? `${freePlan.priceLabel}. ${freePlan.notes}` : "None in our snapshot"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Lowest paid plan for one person</dt>
                    <dd className="m-0">{entryPlan ? `${entryPlan.name}: ${entryPlan.priceLabel}` : "None in our snapshot"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Mainstream paid plan</dt>
                    <dd className="m-0">{mainstreamPlan ? `${mainstreamPlan.name}: ${mainstreamPlan.priceLabel}` : "None marked"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Plans in our snapshot</dt>
                    <dd className="m-0">{plans.length}</dd>
                  </div>
                </dl>
              )}

              <p className="mb-0 mt-4 text-sm">
                <strong>API models in the directory:</strong>{" "}
                {api.modelCount === 0
                  ? "none"
                  : `${api.modelCount} (${api.modelNames.join(", ")}), input price ${formatPricePerMillion(api.lowestInputPrice ?? 0)} to ${formatPricePerMillion(api.highestInputPrice ?? 0)} per 1M tokens`}
                .
              </p>
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">
                The Blueprint does not say which model each plan uses. Check the provider&apos;s page.
              </p>
              <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
                {sourceDate ? `Plan source read ${formatIsoDate(sourceDate)}.` : "No plan source yet."}{" "}
                <Link href="/compare/models" className={FOCUS_RING}>Model directory</Link>
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}