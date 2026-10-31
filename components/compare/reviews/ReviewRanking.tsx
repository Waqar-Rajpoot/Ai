import { BENCHLM_LEADER, BENCHLM_SNAPSHOT_DATE, BENCHLM_URL } from "@/lib/compare/reviews/benchLmSnapshot";
import { DIRECTORY_SNAPSHOT_DATE } from "@/lib/compare/reviews/reviewConfig";
import {
  formatBenchLm,
  formatDate,
  formatMoney,
  formatMultiple,
  formatPercent,
  formatSigned,
} from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewRankingProps {
  model: ReviewPageModel;
}

function changeClass(change: number | null): string {
  if (change === null || change === 0) return styles.numeric;
  return `${styles.numeric} ${change > 0 ? styles.positive : styles.negative}`;
}

/** Live rank, change since our directory snapshot, value metrics and price position. */
export function ReviewRanking({ model }: ReviewRankingProps) {
  const { row, ranking, value, position, outrankedBy } = model;
  const { entry } = ranking;

  return (
    <section id="ranking" className={styles.section} aria-labelledby="ranking-title">
      <h2 id="ranking-title" className={styles.sectionTitle}>How it ranks</h2>
      <p className={styles.sectionIntro}>
        Overall scores come from{" "}
        <a href={BENCHLM_URL} target="_blank" rel="noopener noreferrer">BenchLM</a>, an independent
        third party, as of {formatDate(BENCHLM_SNAPSHOT_DATE)}. The directory table was last
        checked on {formatDate(DIRECTORY_SNAPSHOT_DATE)}.
      </p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">BenchLM overall score</th>
              <td className={styles.numeric}>{formatBenchLm(row)}</td>
            </tr>
            <tr>
              <th scope="row">Rank on BenchLM</th>
              <td className={styles.numeric}>
                {ranking.liveRank === null ? "Not ranked" : `#${ranking.liveRank} of ${ranking.rankedModelCount}`}
              </td>
            </tr>
            <tr>
              <th scope="row">Rank in our directory</th>
              <td className={styles.numeric}>
                {ranking.directoryRank === null
                  ? "Not scored"
                  : `#${ranking.directoryRank} of ${ranking.directoryScoredCount} scored models`}
              </td>
            </tr>
            <tr>
              <th scope="row">Directory score on {formatDate(DIRECTORY_SNAPSHOT_DATE)}</th>
              <td className={changeClass(ranking.scoreChange)}>
                {ranking.directoryScore === null ? "Unranked" : ranking.directoryScore.toFixed(1)}
                {ranking.scoreChange !== null ? ` → change ${formatSigned(ranking.scoreChange)}` : ""}
              </td>
            </tr>
            {ranking.gapToLeader !== null && ranking.percentOfLeader !== null ? (
              <tr>
                <th scope="row">Gap to BenchLM leader ({BENCHLM_LEADER.name}, {BENCHLM_LEADER.score})</th>
                <td className={styles.numeric}>
                  {formatSigned(-ranking.gapToLeader)} points · {formatPercent(ranking.percentOfLeader)} of the leader&rsquo;s score
                </td>
              </tr>
            ) : null}
            {ranking.percentOfDirectoryBest !== null ? (
              <tr>
                <th scope="row">Against the top scorer in our directory</th>
                <td className={styles.numeric}>
                  {formatPercent(ranking.percentOfDirectoryBest)} of {value.topScorerName}&rsquo;s score
                  at {formatPercent(value.costVsTopScorer * 100)} of its list price
                </td>
              </tr>
            ) : null}
            {entry ? (
              <>
                <tr>
                  <th scope="row">Strength of evidence</th>
                  <td>
                    {entry.evidence === "supported" ? "Supported" : "Estimated"}, from {entry.sourceFamilies} source{" "}
                    {entry.sourceFamilies === 1 ? "family" : "families"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">BenchLM entry</th>
                  <td>
                    <a href={`https://benchlm.ai${entry.profilePath}`} target="_blank" rel="noopener noreferrer">
                      {entry.benchLmName}
                    </a>
                    {entry.companion
                      ? ` · also ${entry.companion.label}: ${entry.companion.score} (#${entry.companion.rank})`
                      : ""}
                  </td>
                </tr>
              </>
            ) : null}
          </tbody>
        </table>
      </div>

      {ranking.priceMismatch ? <p className={styles.callout}>{ranking.priceMismatch}</p> : null}

      <h3>Value</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">Blended list price</th>
              <td className={styles.numeric}>{formatMoney(value.blendedPrice)} per million tokens (average of input and output)</td>
            </tr>
            <tr>
              <th scope="row">Price rank in our directory</th>
              <td className={styles.numeric}>
                #{value.priceRank} cheapest of 14 · {value.costlierModelCount} models cost more
              </td>
            </tr>
            <tr>
              <th scope="row">Cost against {value.topScorerName}</th>
              <td className={styles.numeric}>{formatMultiple(value.costVsTopScorer)} its blended price</td>
            </tr>
            {value.scorePerBlendedDollar !== null && value.blendedPricePerScorePoint !== null ? (
              <>
                <tr>
                  <th scope="row">BenchLM points per blended dollar</th>
                  <td className={styles.numeric}>{value.scorePerBlendedDollar.toFixed(1)}</td>
                </tr>
                <tr>
                  <th scope="row">Blended price per BenchLM point</th>
                  <td className={styles.numeric}>{formatMoney(value.blendedPricePerScorePoint)}</td>
                </tr>
              </>
            ) : null}
          </tbody>
        </table>
      </div>

      <h3>Price and score position</h3>
      {position.status === "efficient" ? (
        <p>
          No other model in our directory scores at least as high for the same or a lower blended
          price, so it sits on the price and score frontier.
        </p>
      ) : position.status === "beaten" ? (
        <p>
          {position.beatenBy.join(", ")} score{position.beatenBy.length === 1 ? "s" : ""} at least as
          high on BenchLM for the same or a lower blended price.
        </p>
      ) : (
        <p>There is no BenchLM score to place it against yet.</p>
      )}
      <p className={styles.muted}>
        This uses the overall score only. It ignores workload-specific results, caching and batch
        discounts, and self-hosting costs, so check the evidence below before you decide.
      </p>

      {outrankedBy.length > 0 ? (
        <div className={styles.callout}>
          <strong>Ranked higher, not in our directory yet: </strong>
          {outrankedBy.map((other) => `${other.name} (${other.score}, #${other.rank}, $${other.outputPricePerMillion} output)`).join("; ")}.
        </div>
      ) : null}
    </section>
  );
}