import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewVerdictProps {
  model: ReviewPageModel;
}

/** The tested verdict, or the interim verdict until a test run exists. */
export function ReviewVerdict({ model }: ReviewVerdictProps) {
  const { editorial, hasTestRun, snapshotTakeaway } = model;
  const isTested = hasTestRun && Boolean(editorial.verdict);

  return (
    <section id="verdict" className={styles.section} aria-labelledby="verdict-title">
      <h2 id="verdict-title" className={styles.sectionTitle}>
        {isTested ? "Verdict" : "Interim verdict"}
      </h2>
      <p>{isTested ? editorial.verdict : editorial.interimVerdict}</p>
      {isTested ? null : (
        <p className={styles.muted}>
          Written from independent scores, list prices and the calculations above. It will be
          replaced by a tested verdict after our test run. {snapshotTakeaway}
        </p>
      )}
    </section>
  );
}