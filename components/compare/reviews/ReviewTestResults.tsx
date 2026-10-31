import Link from "next/link";
import { SCORECARD_MAX_SCORE } from "@/lib/compare/reviews/reviewConfig";
import { formatDate } from "@/lib/compare/reviews/reviewFormat";
import { buildTestSignals, countSignals } from "@/lib/compare/reviews/reviewTestSignals";
import type { TestSignal, TestSignalKind } from "@/lib/compare/reviews/reviewTestSignals";
import { SCORECARD_POINTS } from "@/lib/compare/reviews/scorecardPoints";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewSourceBadge } from "./ReviewSourceBadge";
import styles from "./ReviewPage.module.css";

interface ReviewTestResultsProps {
  model: ReviewPageModel;
}

const PLAIN_KIND_LABELS: Readonly<Record<"calculated" | "directory", string>> = {
  calculated: "Calculated",
  directory: "Directory",
};

function SignalKind({ kind }: { kind: TestSignalKind }) {
  if (kind === "independent" || kind === "vendor-reported") {
    return <ReviewSourceBadge source={kind} />;
  }
  if (kind === "none") return null;
  return <span className={styles.signalKind}>{PLAIN_KIND_LABELS[kind]}</span>;
}

function SignalCell({ signal }: { signal: TestSignal }) {
  return (
    <>
      <SignalKind kind={signal.kind} />
      <p className={signal.kind === "none" ? styles.signalNone : styles.signalText}>
        {signal.text}
        {signal.href ? (
          <>
            {" · "}
            <Link href={signal.href}>See plan terms</Link>
          </>
        ) : null}
      </p>
    </>
  );
}

/** Our own seven-point test run, with the closest independent signal for each point. */
export function ReviewTestResults({ model }: ReviewTestResultsProps) {
  const testRun = model.editorial.testRun;
  const signals = buildTestSignals(model);
  const signalCount = countSignals(signals);

  return (
    <section id="tests" className={styles.section} aria-labelledby="tests-title">
      <h2 id="tests-title" className={styles.sectionTitle}>Our test run</h2>

      {testRun ? (
        <p className={styles.sectionIntro}>
          One test on one day: {formatDate(testRun.testedOn)}, model version {testRun.modelVersion},
          effort setting {testRun.effortSetting}.
        </p>
      ) : (
        <div className={styles.callout}>
          <strong>Not tested by us yet.</strong> Our seven fixed tests have not been run on{" "}
          {model.row.name}. The last column shows the closest independent or calculated data for
          each point ({signalCount} of {SCORECARD_POINTS.length} have one). These are stand-ins, not
          our results, so compare scorecards rather than single numbers.
        </div>
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Point</th>
              <th scope="col">Our fixed test</th>
              {testRun ? <th scope="col">Our result</th> : null}
              <th scope="col">Closest signal today</th>
            </tr>
          </thead>
          <tbody>
            {SCORECARD_POINTS.map((point) => {
              const result = testRun?.results[point.id];
              return (
                <tr key={point.id}>
                  <th scope="row">{point.title}</th>
                  <td>{point.fixedTest}</td>
                  {testRun ? (
                    <td>
                      {result ? (
                        <>
                          <span className={styles.numeric}>
                            {result.score} / {SCORECARD_MAX_SCORE}
                          </span>{" "}
                          <ReviewSourceBadge source="tested" />
                          <p className={styles.muted}>{result.summary}</p>
                        </>
                      ) : (
                        <span className={styles.signalNone}>Not tested</span>
                      )}
                    </td>
                  ) : null}
                  <td>
                    <SignalCell signal={signals[point.id]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}