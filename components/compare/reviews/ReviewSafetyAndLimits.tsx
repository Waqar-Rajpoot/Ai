import Link from "next/link";
import { REVIEW_SITE_PATHS } from "@/lib/compare/reviews/reviewConfig";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewNoteList } from "./ReviewNoteList";
import styles from "./ReviewPage.module.css";

interface ReviewSafetyAndLimitsProps {
  model: ReviewPageModel;
}

/** Published safety documentation, restricted domains and privacy terms. */
export function ReviewSafetyAndLimits({ model }: ReviewSafetyAndLimitsProps) {
  const { row, editorial } = model;

  return (
    <section id="safety" className={styles.section} aria-labelledby="safety-title">
      <h2 id="safety-title" className={styles.sectionTitle}>Safety and limits</h2>

      <h3>Published safety documentation</h3>
      <ReviewNoteList
        notes={editorial.safetyNotes}
        emptyText={`We have not logged safety documentation for ${row.name} yet. Look for a system card or model card on ${row.maker}'s site before using it with sensitive work.`}
      />

      <h3>Restricted domains and limits</h3>
      <ReviewNoteList
        notes={editorial.limitsNotes}
        emptyText="No extra limits are logged. Check the maker's usage policy for restricted domains and rate limits."
      />

      <h3>Privacy terms for the plan</h3>
      <p>
        Training settings and data retention differ by plan. Compare them in the{" "}
        <Link href={REVIEW_SITE_PATHS.privacyMatrix}>privacy matrix</Link> before you share
        anything sensitive.
      </p>
    </section>
  );
}