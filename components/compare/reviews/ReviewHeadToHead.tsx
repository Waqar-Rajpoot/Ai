import Link from "next/link";
import { CODING_TASK_SCENARIO_ID } from "@/lib/compare/reviews/reviewConfig";
import { formatBenchLm, formatMoney, formatMultiple, formatSigned } from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewHeadToHeadProps {
  model: ReviewPageModel;
}

/** This model against the rivals most worth weighing it against. */
export function ReviewHeadToHead({ model }: ReviewHeadToHeadProps) {
  const { row, headToHead, costEstimates } = model;
  const ownCodingCost = costEstimates.find((estimate) => estimate.scenario.id === CODING_TASK_SCENARIO_ID);

  return (
    <section id="versus" className={styles.section} aria-labelledby="versus-title">
      <h2 id="versus-title" className={styles.sectionTitle}>Head to head</h2>
      <p className={styles.sectionIntro}>
        Score difference is the rival&rsquo;s BenchLM score minus {row.name}&rsquo;s. Price ratio is
        the rival&rsquo;s blended list price divided by {row.name}&rsquo;s.
        {ownCodingCost ? ` ${row.name} costs ${formatMoney(ownCodingCost.costPerTask)} for the coding task.` : ""}
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Rival</th>
              <th scope="col">BenchLM</th>
              <th scope="col">Score difference</th>
              <th scope="col">Price ratio</th>
              <th scope="col">Coding task</th>
              <th scope="col">Context</th>
            </tr>
          </thead>
          <tbody>
            {headToHead.map((entry) => (
              <tr key={entry.rival.id}>
                <th scope="row">
                  <Link href={entry.href}>{entry.rival.name}</Link>
                </th>
                <td className={styles.numeric}>{formatBenchLm(entry.rival)}</td>
                <td
                  className={
                    entry.scoreDelta === null || entry.scoreDelta === 0
                      ? styles.numeric
                      : `${styles.numeric} ${entry.scoreDelta > 0 ? styles.positive : styles.negative}`
                  }
                >
                  {entry.scoreDelta === null ? "n/a" : formatSigned(entry.scoreDelta)}
                </td>
                <td className={styles.numeric}>{formatMultiple(entry.priceRatio)}</td>
                <td className={styles.numeric}>{formatMoney(entry.rivalCodingTaskCost)}</td>
                <td className={styles.numeric}>{entry.rival.contextLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}