import { formatDate } from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewSourceBadge } from "./ReviewSourceBadge";
import styles from "./ReviewPage.module.css";

interface ReviewEvidenceProps {
  model: ReviewPageModel;
}

/** Dated benchmark results with their sources. Nothing here is our own test. */
export function ReviewEvidence({ model }: ReviewEvidenceProps) {
  const { evidence, ranking, row } = model;
  const profileUrl = ranking.entry ? `https://benchlm.ai${ranking.entry.profilePath}` : null;

  return (
    <section id="evidence" className={styles.section} aria-labelledby="evidence-title">
      <h2 id="evidence-title" className={styles.sectionTitle}>Independent evidence</h2>
      <p className={styles.sectionIntro}>
        Results from third-party leaderboards and from the maker&rsquo;s own reports. Each row says
        which, and when it was read. Nothing in this section is a result from our own test run.
      </p>

      {evidence?.categories && evidence.categories.length > 0 ? (
        <>
          <h3>BenchLM category scores</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Score</th>
                  <th scope="col">Rank</th>
                </tr>
              </thead>
              <tbody>
                {evidence.categories.map((category) => (
                  <tr key={category.category}>
                    <th scope="row">{category.category}</th>
                    <td className={styles.numeric}>{category.score.toFixed(1)}</td>
                    <td className={styles.numeric}>{category.rankLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {evidence && evidence.highlights.length > 0 ? (
        <>
          <h3>Benchmark results</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Benchmark</th>
                  <th scope="col">Result</th>
                  <th scope="col">What it means</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {evidence.highlights.map((highlight) => (
                  <tr key={`${highlight.label}-${highlight.sourceUrl}`}>
                    <th scope="row">{highlight.label}</th>
                    <td className={styles.numeric}>{highlight.value}</td>
                    <td>{highlight.context}</td>
                    <td>
                      <ReviewSourceBadge source={highlight.source} />
                      <p className={styles.muted}>
                        <a href={highlight.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {highlight.sourceName}
                        </a>
                        {" · "}
                        {/^\d{4}-\d{2}-\d{2}$/.test(highlight.asOf) ? formatDate(highlight.asOf) : highlight.asOf}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className={styles.pending}>
          We have logged no benchmark rows for {row.name} beyond its overall BenchLM score.
          {profileUrl ? (
            <>
              {" "}
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                See its BenchLM profile
              </a>{" "}
              for the full ledger.
            </>
          ) : null}
        </p>
      )}
    </section>
  );
}