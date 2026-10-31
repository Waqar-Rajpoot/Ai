import Link from "next/link";
import { REVIEW_SITE_PATHS } from "@/lib/compare/reviews/reviewConfig";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewAlternativesProps {
  model: ReviewPageModel;
}

/** Other models worth considering, with links to their reviews. */
export function ReviewAlternatives({ model }: ReviewAlternativesProps) {
  return (
    <section id="alternatives" className={styles.section} aria-labelledby="alternatives-title">
      <h2 id="alternatives-title" className={styles.sectionTitle}>Alternatives</h2>
      <ul className={styles.cardList}>
        {model.alternatives.map((alternative) => (
          <li key={alternative.row.id} className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Link href={alternative.href}>{alternative.row.name}</Link>
            </h3>
            <p>{alternative.reason}</p>
          </li>
        ))}
      </ul>
      <p className={styles.muted}>
        Want a direct comparison? See the{" "}
        <Link href={REVIEW_SITE_PATHS.headToHead}>head-to-head tests</Link> or the{" "}
        <Link href={REVIEW_SITE_PATHS.alternativesHub}>alternatives hub</Link>.
      </p>
    </section>
  );
}