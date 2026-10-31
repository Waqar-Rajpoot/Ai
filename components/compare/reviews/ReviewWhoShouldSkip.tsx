import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewWhoShouldSkipProps {
  model: ReviewPageModel;
}

/** Who the model suits, who should skip it, and what to watch out for. */
export function ReviewWhoShouldSkip({ model }: ReviewWhoShouldSkipProps) {
  const { editorial, skipReasons } = model;

  return (
    <section id="skip" className={styles.section} aria-labelledby="skip-title">
      <h2 id="skip-title" className={styles.sectionTitle}>Who it suits, and who should skip it</h2>
      <div className={styles.twoColumn}>
        <div>
          <h3 className={styles.columnTitle}>Best for</h3>
          <ul className={styles.list}>
            {editorial.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.columnTitle}>Skip it if</h3>
          <ul className={styles.list}>
            {skipReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
      {editorial.caveats.length > 0 ? (
        <>
          <h3 className={styles.columnTitle}>Watch-outs</h3>
          <ul className={styles.list}>
            {editorial.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}