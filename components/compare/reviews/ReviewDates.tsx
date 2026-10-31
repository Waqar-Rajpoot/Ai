import Link from "next/link";
import { BENCHLM_SNAPSHOT_DATE } from "@/lib/compare/reviews/benchLmSnapshot";
import { DIRECTORY_SNAPSHOT_DATE, REVIEW_SITE_PATHS } from "@/lib/compare/reviews/reviewConfig";
import { formatDate } from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewSourceBadge } from "./ReviewSourceBadge";
import styles from "./ReviewPage.module.css";

interface ReviewDatesProps {
  model: ReviewPageModel;
}

/** Verified on, Tested on, source labels and review status. */
export function ReviewDates({ model }: ReviewDatesProps) {
  const { ranking, editorial, successor } = model;
  const testRun = editorial.testRun;

  return (
    <section id="dates" className={styles.section} aria-labelledby="dates-title">
      <h2 id="dates-title" className={styles.sectionTitle}>Dates and labels</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">List prices and context, verified on</th>
              <td>{formatDate(DIRECTORY_SNAPSHOT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">BenchLM overall score, read on</th>
              <td>
                {formatDate(BENCHLM_SNAPSHOT_DATE)} <ReviewSourceBadge source="independent" />
                {ranking.entry?.evidence === "estimated" ? " This score is an estimate." : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Benchmark rows</th>
              <td>Each row in the evidence table carries its own source, label and date.</td>
            </tr>
            <tr>
              <th scope="row">Tested on</th>
              <td>
                {testRun
                  ? `${formatDate(testRun.testedOn)}, model version ${testRun.modelVersion}, effort ${testRun.effortSetting}`
                  : "Not yet tested"}
              </td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>
                {successor ? (
                  <>
                    Superseded by <Link href={successor.href}>{successor.name}</Link>
                  </>
                ) : testRun ? (
                  "Tested"
                ) : (
                  "Independent data only. Test run not done yet."
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={styles.muted}>
        See <Link href={REVIEW_SITE_PATHS.howWeTest}>how we test</Link> and our{" "}
        <Link href={REVIEW_SITE_PATHS.corrections}>corrections log</Link>.
      </p>
    </section>
  );
}