import Link from "next/link";
import {
  CODING_TASK_SCENARIO_ID,
  REVIEW_SITE_PATHS,
  TASKS_FOR_VOLUME_ESTIMATE,
} from "@/lib/compare/reviews/reviewConfig";
import {
  formatDate,
  formatMoney,
  formatPricePerMillion,
} from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewNoteList } from "./ReviewNoteList";
import styles from "./ReviewPage.module.css";

interface ReviewPriceAndContextProps {
  model: ReviewPageModel;
}

/** List price, cost per task, monthly cost plans and where to get the model. */
export function ReviewPriceAndContext({ model }: ReviewPriceAndContextProps) {
  const { row, costEstimates, monthlyCosts, editorial } = model;
  const extras = editorial.pricingExtras;
  const codingEstimate = costEstimates.find((estimate) => estimate.scenario.id === CODING_TASK_SCENARIO_ID);

  return (
    <section id="price" className={styles.section} aria-labelledby="price-title">
      <h2 id="price-title" className={styles.sectionTitle}>Price and cost</h2>
      <p className={styles.sectionIntro}>
        Prices change. Confirm on the provider&rsquo;s website before buying.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">API input price</th>
              <td>{formatPricePerMillion(row.inputPricePerMillion)} per million tokens</td>
            </tr>
            <tr>
              <th scope="row">API output price</th>
              <td>{formatPricePerMillion(row.outputPricePerMillion)} per million tokens</td>
            </tr>
            {extras?.cachedInputPerMillion !== undefined ? (
              <tr>
                <th scope="row">Cached input price</th>
                <td>{formatPricePerMillion(extras.cachedInputPerMillion)} per million tokens</td>
              </tr>
            ) : null}
            {extras?.batchDiscountPercent !== undefined && codingEstimate ? (
              <tr>
                <th scope="row">Batch API</th>
                <td>
                  {extras.batchDiscountPercent}% off input and output. A coding task drops from{" "}
                  {formatMoney(codingEstimate.costPerTask)} to{" "}
                  {formatMoney(codingEstimate.costPerTask * (1 - extras.batchDiscountPercent / 100))}.
                </td>
              </tr>
            ) : null}
            {row.priceNote ? (
              <tr>
                <th scope="row">Price note</th>
                <td>{row.priceNote}</td>
              </tr>
            ) : null}
            {row.introRateEndsOn ? (
              <tr>
                <th scope="row">Introductory rate</th>
                <td>Ends {formatDate(row.introRateEndsOn)}</td>
              </tr>
            ) : null}
            <tr>
              <th scope="row">Context window</th>
              <td>
                {row.contextLabel}
                {extras?.maxOutputLabel ? ` · ${extras.maxOutputLabel}` : ""}
              </td>
            </tr>
            <tr>
              <th scope="row">Consumer plan</th>
              <td>
                {editorial.consumerPlanNote ?? (
                  <>
                    See <Link href={REVIEW_SITE_PATHS.consumerPlans}>consumer plans</Link>.
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>What one task costs</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Workload</th>
              <th scope="col">Per task</th>
              <th scope="col">Per {TASKS_FOR_VOLUME_ESTIMATE.toLocaleString("en-US")} tasks</th>
            </tr>
          </thead>
          <tbody>
            {costEstimates.map((estimate) => (
              <tr key={estimate.scenario.id}>
                <th scope="row">
                  {estimate.scenario.label}
                  <p className={styles.muted}>{estimate.scenario.description}</p>
                </th>
                <td className={styles.numeric}>{formatMoney(estimate.costPerTask)}</td>
                <td className={styles.numeric}>{formatMoney(estimate.costPerThousandTasks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>What a month costs</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Usage level</th>
              <th scope="col">Per month</th>
            </tr>
          </thead>
          <tbody>
            {monthlyCosts.map((estimate) => (
              <tr key={estimate.plan.id}>
                <th scope="row">
                  {estimate.plan.label}
                  <p className={styles.muted}>{estimate.plan.description}</p>
                </th>
                <td className={styles.numeric}>{formatMoney(estimate.monthlyCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.muted}>
        Calculated from list prices with illustrative token counts. Not a measured result, and it
        ignores retries, caching and discounts{extras ? " other than those listed above" : ""}.
      </p>

      <h3>Where you can get it</h3>
      <ReviewNoteList
        notes={editorial.availability}
        emptyText="Check the maker's site for current availability and plans."
      />
    </section>
  );
}