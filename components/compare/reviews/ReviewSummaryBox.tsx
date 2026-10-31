import { PRICE_TIER_LABELS } from "@/lib/compare/reviews/reviewConfig";
import { formatBenchLm, formatPriceRange } from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewSummaryBoxProps {
  model: ReviewPageModel;
}

/** What the model does, headline numbers and a one-line verdict. */
export function ReviewSummaryBox({ model }: ReviewSummaryBoxProps) {
  const { row, tier, isOpenWeight, ranking, editorial, hasTestRun } = model;

  const modelType = isOpenWeight
    ? "Open-weight or local"
    : ranking.entry?.licence === "open-weight"
      ? "Hosted API (BenchLM lists open weights)"
      : "Hosted API";

  const facts: readonly { label: string; value: string }[] = [
    { label: "Maker", value: row.maker },
    { label: "Best for", value: row.bestFor },
    { label: "API price, in / out", value: formatPriceRange(row) },
    { label: "Price tier", value: PRICE_TIER_LABELS[tier] },
    { label: "Context", value: row.contextLabel },
    {
      label: "BenchLM overall",
      value:
        ranking.liveRank === null
          ? "Not ranked"
          : `${formatBenchLm(row)} · #${ranking.liveRank} of ${ranking.rankedModelCount}`,
    },
    {
      label: "Rank in our directory",
      value:
        ranking.directoryRank === null
          ? "Not scored"
          : `#${ranking.directoryRank} of ${ranking.directoryScoredCount}`,
    },
    { label: "Model type", value: modelType },
  ];

  return (
    <section id="summary" className={styles.section} aria-labelledby="summary-title">
      <h2 id="summary-title" className={styles.sectionTitle}>Summary</h2>
      <dl className={styles.factGrid}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p>{editorial.whatItDoes}</p>
      <div className={styles.callout}>
        <strong>{hasTestRun && editorial.verdict ? "Verdict: " : "Interim verdict: "}</strong>
        {hasTestRun && editorial.verdict ? editorial.verdict : editorial.interimVerdict}
        {hasTestRun ? null : (
          <p className={styles.muted}>
            Based on independent scores and list prices, not on our own test run.
          </p>
        )}
      </div>
    </section>
  );
}