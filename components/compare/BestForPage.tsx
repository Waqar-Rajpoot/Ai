import Link from "next/link";
import {
  PRICES_VERIFIED_ON,
  RESEARCHED_ON,
  SCORES_AS_OF,
  getBestForRoundup,
  getPageSections,
  getStartingPointModels,
} from "@/lib/compare/bestFor";
import {
  SAMPLE_TASK_INPUT_TOKENS,
  SAMPLE_TASK_OUTPUT_TOKENS,
  calculateSampleTaskCost,
  formatBenchScore,
  formatPricePair,
  formatTaskCost,
} from "@/lib/compare/format";
import type { BestForSlug, FigureLabel } from "@/lib/compare/types";
import styles from "./BestForPage.module.css";

interface BestForPageProps {
  /** Which best-for roundup to render. */
  readonly slug: BestForSlug;
}

const FIGURE_LABEL_CLASS: Record<FigureLabel, string> = {
  Independent: styles.labelIndependent,
  "Vendor-reported": styles.labelVendor,
  "Third-party roundup": styles.labelThirdParty,
  Directory: styles.labelDirectory,
};

/** Renders a link as <Link> for site paths and <a> for external URLs. */
function SourceLink({ url, name }: { url?: string; name: string }) {
  if (!url) return <>{name}</>;
  if (url.startsWith("/")) return <Link href={url}>{name}</Link>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
}

/**
 * Shared layout for every /compare/best/<slug> roundup.
 * Renders content from `lib/compare`; contains no business logic.
 */
export default function BestForPage({ slug }: BestForPageProps) {
  const roundup = getBestForRoundup(slug);
  const models = getStartingPointModels(slug);
  const sections = getPageSections(slug);
  const hasModels = models.length > 0;

  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/compare">Compare</Link>
          </li>
          <li>
            <Link href="/compare/best">Best for</Link>
          </li>
          <li aria-current="page">{roundup.label}</li>
        </ol>
      </nav>

      <header className={styles.header}>
        <p className={styles.meta}>{roundup.level} &middot; Compare</p>
        <h1>{roundup.metaTitle}</h1>
        <p className={styles.question}>{roundup.question}</p>
        <p className={styles.lead}>{roundup.description}</p>
        <p className={styles.statusNote} role="status">
          Roundup coming after our test run. Until then this page shows starting
          points and reported numbers, not a final ranking.
        </p>
        <p className={styles.dates}>
          Directory scores as of {SCORES_AS_OF}. Prices verified on{" "}
          {PRICES_VERIFIED_ON}. Extra research gathered {RESEARCHED_ON}. Prices
          and features change. Confirm on the provider&rsquo;s website before
          buying.
        </p>
      </header>

      <nav aria-label="On this page" className={styles.jumpNav}>
        <p className={styles.jumpTitle}>On this page</p>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="quick-answer" aria-labelledby="quick-heading" className={styles.section}>
        <h2 id="quick-heading">Quick answer</h2>
        <p className={styles.quickAnswer}>{roundup.quickAnswer}</p>
      </section>

      {roundup.whoItIsFor.length > 0 ? (
        <section id="who" aria-labelledby="who-heading" className={styles.section}>
          <h2 id="who-heading">Who this is for</h2>
          <ul className={styles.plainList}>
            {roundup.whoItIsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="starting-points" aria-labelledby="summary-heading" className={styles.section}>
        <h2 id="summary-heading">Starting points</h2>
        <p>{roundup.startingPointsNote}</p>
        {hasModels ? (
          <ul className={styles.cardList}>
            {models.map((model) => (
              <li key={model.id} className={styles.card}>
                <h3>{model.name}</h3>
                <p className={styles.maker}>
                  {model.maker}
                  {model.released ? ` · Released ${model.released}` : ""}
                </p>
                <dl className={styles.facts}>
                  <div>
                    <dt>API price, in / out</dt>
                    <dd>{formatPricePair(model)}</dd>
                  </div>
                  <div>
                    <dt>BenchLM score</dt>
                    <dd>{formatBenchScore(model)}</dd>
                  </div>
                  <div>
                    <dt>Context</dt>
                    <dd>{model.contextLabel}</dd>
                  </div>
                  <div>
                    <dt>Licence</dt>
                    <dd>{model.license}</dd>
                  </div>
                </dl>
                {model.priceNote ? (
                  <p className={styles.priceNote}>{model.priceNote}</p>
                ) : null}
                <p>{roundup.modelRoleNotes[model.id] ?? model.bestFor}</p>
                {model.highlights.length > 0 ? (
                  <ul className={styles.highlights}>
                    {model.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            No starting points yet. The pick appears here once our test run is
            published.
          </p>
        )}
      </section>

      {roundup.candidates.length > 0 ? (
        <section id="candidates" aria-labelledby="candidates-heading" className={styles.section}>
          <h2 id="candidates-heading">Tools to test</h2>
          <p>{roundup.candidatesNote}</p>
          <ul className={styles.cardList}>
            {roundup.candidates.map((candidate) => (
              <li key={candidate.name} className={styles.card}>
                <h3>{candidate.name}</h3>
                <p className={styles.maker}>{candidate.maker}</p>
                <p>{candidate.role}</p>
                <ul className={styles.highlights}>
                  {candidate.reportedFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <p className={styles.watchOut}>
                  <strong>Watch out:</strong> {candidate.watchOut}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {roundup.decisionGuide.length > 0 ? (
        <section id="decide" aria-labelledby="decide-heading" className={styles.section}>
          <h2 id="decide-heading">How to decide</h2>
          <dl className={styles.decisionList}>
            {roundup.decisionGuide.map((rule) => (
              <div key={rule.situation} className={styles.decisionRow}>
                <dt>{rule.situation}</dt>
                <dd>{rule.advice}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {roundup.reportedFigures.length > 0 ? (
        <section id="figures" aria-labelledby="figures-heading" className={styles.section}>
          <h2 id="figures-heading">Reported numbers</h2>
          <p>
            Every number has a label and a date. Vendor-reported figures are a
            maker&rsquo;s own claim and are never mixed with independent ones.
            None of these are our test results.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.visuallyHidden}>
                Reported figures with label, source and date
              </caption>
              <thead>
                <tr>
                  <th scope="col">Subject</th>
                  <th scope="col">Measure</th>
                  <th scope="col">Figure</th>
                  <th scope="col">Label</th>
                  <th scope="col">Source and date</th>
                </tr>
              </thead>
              <tbody>
                {roundup.reportedFigures.map((figure) => (
                  <tr key={`${figure.subject}-${figure.measure}-${figure.source}`}>
                    <th scope="row">{figure.subject}</th>
                    <td>{figure.measure}</td>
                    <td>{figure.value}</td>
                    <td>
                      <span className={`${styles.label} ${FIGURE_LABEL_CLASS[figure.label]}`}>
                        {figure.label}
                      </span>
                    </td>
                    <td>
                      {figure.source}, {figure.asOf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {roundup.glossary.length > 0 ? (
        <section id="terms" aria-labelledby="terms-heading" className={styles.section}>
          <h2 id="terms-heading">Terms explained</h2>
          <dl className={styles.glossary}>
            {roundup.glossary.map((item) => (
              <div key={item.term} className={styles.glossaryRow}>
                <dt>{item.term}</dt>
                <dd>
                  {item.meaning}
                  <span className={styles.caution}> Careful: {item.caution}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section id="how-we-rank" aria-labelledby="how-heading" className={styles.section}>
        <h2 id="how-heading">How we will rank</h2>
        <ul className={styles.plainList}>
          {roundup.howWeWillRank.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
        <p>
          Every ranking will show the date of our own test run, the model
          version and the effort setting. Ranked list: not published yet.{" "}
          <Link href="/about/how-we-test">See how we test</Link>.
        </p>
      </section>

      {hasModels ? (
        <>
          <section id="cost" aria-labelledby="cost-heading" className={styles.section}>
            <h2 id="cost-heading">Cost per task</h2>
            <p>
              List-price cost of one short chat question ({SAMPLE_TASK_INPUT_TOKENS}{" "}
              tokens in, {SAMPLE_TASK_OUTPUT_TOKENS} tokens out). This is an
              illustration, not one of our test tasks.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <caption className={styles.visuallyHidden}>
                  List-price cost of one short chat question for each starting point
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    <th scope="col">Cost for this task</th>
                    <th scope="col">Price conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id}>
                      <th scope="row">{model.name}</th>
                      <td>{formatTaskCost(calculateSampleTaskCost(model))}</td>
                      <td>{model.priceNote ?? "None noted"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Models that think before answering can use extra output tokens,
              which raises the cost.
            </p>
          </section>

          <section id="skip" aria-labelledby="skip-heading" className={styles.section}>
            <h2 id="skip-heading">Who should skip each</h2>
            <ul className={styles.plainList}>
              {models.map((model) => (
                <li key={model.id}>
                  <strong>{model.name}.</strong> {model.skipIf}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}

      {roundup.selfTest.length > 0 ? (
        <section id="self-test" aria-labelledby="test-heading" className={styles.section}>
          <h2 id="test-heading">Test it yourself</h2>
          <p>
            A score is a shortlist. This short test takes an afternoon and
            tells you more about your own needs than any ranking.
          </p>
          <ol className={styles.steps}>
            {roundup.selfTest.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.detail}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {roundup.tips.length > 0 || roundup.commonMistakes.length > 0 ? (
        <section id="tips" aria-labelledby="tips-heading" className={styles.section}>
          <h2 id="tips-heading">Tips and mistakes</h2>
          <div className={styles.twoColumns}>
            {roundup.tips.length > 0 ? (
              <div>
                <h3>Do this</h3>
                <ul className={styles.plainList}>
                  {roundup.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {roundup.commonMistakes.length > 0 ? (
              <div>
                <h3>Avoid this</h3>
                <ul className={styles.plainList}>
                  {roundup.commonMistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section id="keep-in-mind" aria-labelledby="keep-heading" className={styles.section}>
        <h2 id="keep-heading">Keep in mind</h2>
        <ul className={styles.plainList}>
          {roundup.keepInMind.map((note) => (
            <li key={note}>{note}</li>
          ))}
          <li>A ranking is a shortlist. Your own tasks may favour a different model.</li>
        </ul>
        <h3>What changed since last review</h3>
        <p>
          Nothing yet. This roundup has not been reviewed. Changes will be
          listed here after each monthly review. See the{" "}
          <Link href="/news/changelog">changelog</Link>.
        </p>
        <h3>Superseded models</h3>
        <p>
          None yet. A replaced model is marked superseded and links to its
          successor instead of being deleted.
        </p>
      </section>

      {roundup.faq.length > 0 ? (
        <section id="faq" aria-labelledby="faq-heading" className={styles.section}>
          <h2 id="faq-heading">Frequently asked questions</h2>
          <div className={styles.faqList}>
            {roundup.faq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {roundup.sources.length > 0 ? (
        <section id="sources" aria-labelledby="sources-heading" className={styles.section}>
          <h2 id="sources-heading">Sources and labels</h2>
          <ul className={styles.plainList}>
            {roundup.sources.map((source) => (
              <li key={source.name}>
                <SourceLink url={source.url} name={source.name} />. {source.note}
              </li>
            ))}
          </ul>
          <p>
            <Link href="/about/source-policy">How we choose sources</Link>
          </p>
        </section>
      ) : null}

      <nav aria-label="Related pages" className={styles.related}>
        <h2>Keep going</h2>
        <ul>
          {roundup.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/compare/best">All best-for roundups</Link>
          </li>
        </ul>
      </nav>

      <p className={styles.independence}>
        Payment, affiliate links and sponsorship never change a score or
        verdict. <Link href="/about/independence">Independence and disclosure</Link>.
      </p>
    </div>
  );
}