import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CADENCE } from "@/lib/about/aboutData";
import {
  estimateCostPerTask,
  formatCostInDollars,
  getWeightShares,
  hasPublishedWeights,
} from "@/lib/about/howWeTest";
import { HOW_WE_TEST_REVIEWED_ON } from "@/lib/about/howWeTestConstants";
import {
  COST_NOTE,
  FAQ,
  GLOSSARY,
  RELATED_LINKS,
  SOURCES,
  SUMMARY_POINTS,
  VENDOR_SPLIT_NOTE,
  WEIGHT_PUBLISHED_NOTE,
  WEIGHT_STATUS_NOTE,
  WHAT_CAN_GO_WRONG,
} from "@/lib/about/howWeTestContent";
import {
  CANNOT_TELL_YOU,
  CAN_TELL_YOU,
  COST_EXAMPLE,
  FAIRNESS_RULES,
  LABEL_DETAILS,
  OPEN_DECISIONS,
  RECORD_FIELDS,
  TEST_DAY_STEPS,
  TEST_POINTS,
} from "@/lib/about/howWeTestData";
import { CLAIM_LABEL_TEXT } from "@/lib/news/roundupTypes";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { ReviewAgeChecker } from "./ReviewAgeChecker";
import { ScorecardWeighter } from "./ScorecardWeighter";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "battery", label: "The seven tests" },
  { id: "weights", label: "Scorecard weights" },
  { id: "settings", label: "Settings and test dates" },
  { id: "labels", label: "Result labels" },
  { id: "cost", label: "Cost per task" },
  { id: "meaning", label: "What a score means" },
  { id: "open", label: "Open decisions" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const WEIGHTS_PUBLISHED = hasPublishedWeights(TEST_POINTS);
const SHARES = new Map(getWeightShares(TEST_POINTS).map((share) => [share.id, share.percent]));
const COST = estimateCostPerTask(COST_EXAMPLE);
const REVIEW_CADENCE = CADENCE.filter((row) => row.where.href === "/compare/reviews" || row.where.href === "/about/how-we-test");

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Test points", value: String(TEST_POINTS.length) },
  { label: "Result labels", value: String(LABEL_DETAILS.length) },
  { label: "Facts recorded per test", value: String(RECORD_FIELDS.length) },
  { label: "Open decisions", value: String(OPEN_DECISIONS.length) },
];

/** How we test: the seven-point battery, weights, settings and dates, and the three result labels. */
export function HowWeTestView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/about">About</Link> › <span aria-current="page">How we test</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">About · Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {HOW_WE_TEST_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Policy page</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">How we test AI models</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          The seven tests behind every review, how results are weighted, what we record on each test day, and what the three result labels mean.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#battery" className={BUTTON_PRIMARY}>See the seven tests</a>
          <a href="#labels" className={BUTTON_OUTLINE}>What the labels mean</a>
        </div>
      </header>

      <dl className="m-0 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">{fact.label}</dt>
            <dd className="m-0 text-2xl font-extrabold tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <PageSection id="summary" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SUMMARY_POINTS.map((point) => (
              <li key={point.headline}><strong>{point.headline}</strong> {point.detail}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Reading a review?</p>
            <p className="mb-0 mt-1 text-sm">Look for the tested-on date, the effort setting and the label on each number. A review without them is not following this page.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="battery" title="The test battery: seven points" intro="Every review runs the same seven tests, so models can be compared. Each shows what it can and cannot tell you.">
        <div className="grid gap-4">
          {TEST_POINTS.map((point) => (
            <article key={point.id} id={point.id} className={`${CARD_CLASS} scroll-mt-24`}>
              <header className="mb-2 flex flex-wrap items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{point.number}</span>
                <h3 className="m-0">{point.name}</h3>
                <span className={BADGE_CLASS}>{CLAIM_LABEL_TEXT.tested}</span>
              </header>
              <p className="m-0 text-sm">{point.whatWeTest}</p>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">How we run it</p>
                  <ul className="mb-0 mt-1 grid gap-1 pl-5 text-sm">
                    {point.howWeRunIt.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">What it shows</p>
                  <p className="mb-0 mt-1 text-sm">{point.whatItShows}</p>
                </div>
                <div>
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">What it cannot show</p>
                  <p className="mb-0 mt-1 text-sm">{point.whatItCannotShow}</p>
                </div>
              </div>
              <p className="mb-0 mt-3 flex flex-wrap gap-4 text-sm">
                {point.relatedLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
              </p>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">A head-to-head uses the same ten everyday tasks for both models, on one test day, and reports a winner per task and on cost.</p>
      </PageSection>

      <PageSection id="weights" title="Scorecard weights" intro="Weights say how much each test counts when the seven results are combined, and why.">
        <div className={`${CARD_CLASS} ${WEIGHTS_PUBLISHED ? "border-[var(--color-accent)]" : "border-amber-500/60"}`}>
          <p className="m-0 text-sm font-semibold">{WEIGHTS_PUBLISHED ? WEIGHT_PUBLISHED_NOTE : WEIGHT_STATUS_NOTE}</p>
        </div>
        <div className={`${CARD_CLASS} mt-4 overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Weight per test point and the reason, or what would move each weight while weights are unpublished</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Test point</th>
                <th scope="col" className="p-3">Weight</th>
                <th scope="col" className="p-3">{WEIGHTS_PUBLISHED ? "Why" : "What would move it"}</th>
              </tr>
            </thead>
            <tbody>
              {TEST_POINTS.map((point) => (
                <tr key={point.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><a href={`#${point.id}`}>{point.number}. {point.name}</a></th>
                  <td className="p-3 align-top tabular-nums">
                    {WEIGHTS_PUBLISHED ? `${point.weight} (${SHARES.get(point.id)}%)` : <span className="text-[var(--color-muted)]">Not decided</span>}
                  </td>
                  <td className="p-3 align-top">
                    {WEIGHTS_PUBLISHED && point.whyThisWeight ? point.whyThisWeight : (
                      <ul className="m-0 grid gap-1 pl-5 text-[var(--color-muted)]">
                        {point.weightConsiderations.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Set your own weights</h3>
        <ScorecardWeighter />
      </PageSection>

      <PageSection id="settings" title="Settings and test dates" intro="Three facts are recorded for every test. Without them, a result cannot be compared or aged.">
        <div className="grid gap-4 md:grid-cols-3">
          {RECORD_FIELDS.map((field) => (
            <article key={field.id} className={CARD_CLASS}>
              <h3 className="mt-0">{field.label}</h3>
              <p className="m-0 text-sm"><strong>What it is:</strong> {field.whatItIs}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Why it matters:</strong> {field.whyItMatters}</p>
              <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Format: {field.formatHint}</p>
            </article>
          ))}
        </div>

        <h3>A test day, step by step</h3>
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {TEST_DAY_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How we keep it fair</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {FAIRNESS_RULES.map((rule) => <li key={rule.title}><strong>{rule.title}</strong> {rule.detail}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">When we publish and re-test</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {REVIEW_CADENCE.map((row) => (
                <li key={row.trigger}><strong>{row.trigger}:</strong> {row.whatWePublish}. Target: {row.target}.</li>
              ))}
            </ul>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">These are targets, not guarantees. The date on each review shows what actually happened.</p>
          </div>
        </div>

        <h3>How old is the review you are reading?</h3>
        <ReviewAgeChecker />
      </PageSection>

      <PageSection id="labels" title="Result labels" intro="Every number is labelled by who produced it. Vendor numbers never share a column with independent ones.">
        <div className="grid gap-4 lg:grid-cols-3">
          {LABEL_DETAILS.map((detail) => (
            <article key={detail.label} className={CARD_CLASS}>
              <p className="m-0"><span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{CLAIM_LABEL_TEXT[detail.label]}</span></p>
              <p className="mb-0 mt-3 text-sm">{detail.meaning}</p>
              <dl className="mb-0 mt-3 grid gap-2 text-sm">
                <div><dt className="font-semibold">Who produced it</dt><dd className="m-0 text-[var(--color-muted)]">{detail.whoProduced}</dd></div>
                <div><dt className="font-semibold">How strong it is</dt><dd className="m-0 text-[var(--color-muted)]">{detail.strength}</dd></div>
                <div><dt className="font-semibold">How it is shown</dt><dd className="m-0 text-[var(--color-muted)]">{detail.howShown}</dd></div>
              </dl>
            </article>
          ))}
        </div>

        <h3>How a score block is laid out</h3>
        <p className="mt-0 text-sm text-[var(--color-muted)]">{VENDOR_SPLIT_NOTE}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
              <caption className="p-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Table 1: our tests and independent sources</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Model</th>
                  <th scope="col" className="p-3">{CLAIM_LABEL_TEXT.tested}</th>
                  <th scope="col" className="p-3">{CLAIM_LABEL_TEXT.independent}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">Example model</th>
                  <td className="p-3 text-[var(--color-muted)]">value, test day</td>
                  <td className="p-3 text-[var(--color-muted)]">value, evaluator, date</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${CARD_CLASS} overflow-x-auto border-dashed p-0`}>
            <table className="w-full min-w-[18rem] border-collapse text-left text-sm">
              <caption className="p-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Table 2: separate and labelled</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Model</th>
                  <th scope="col" className="p-3">{CLAIM_LABEL_TEXT["vendor-reported"]}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">Example model</th>
                  <td className="p-3 text-[var(--color-muted)]">value, maker&apos;s page, date</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">Where numbers come from, and how conflicts are settled: <Link href="/about/source-policy">source policy</Link>.</p>
      </PageSection>

      <PageSection id="cost" title="How cost per task is worked out" intro="Price per token is not the whole story. A cheap model that needs three tries can cost more.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">The formula</h3>
            <p className="m-0 text-sm">(input tokens × input price + output tokens × output price) ÷ 1,000,000, plus the cost of any retries.</p>
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Prices are per million tokens, read on the provider&apos;s own page on the test day. Introductory rates show their end date.</p>
          </div>
          <div className={`${CARD_CLASS} border-dashed`}>
            <h3 className="mt-0">A hypothetical example</h3>
            <p className="m-0 text-sm tabular-nums">
              {COST_EXAMPLE.inputTokens.toLocaleString("en-US")} input tokens at ${COST_EXAMPLE.inputPricePerMillion} and {COST_EXAMPLE.outputTokens.toLocaleString("en-US")} output tokens at ${COST_EXAMPLE.outputPricePerMillion} per million tokens cost <strong>{formatCostInDollars(COST)}</strong> for one task.
            </p>
            <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{COST_NOTE}</p>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">Try your own numbers in the <Link href="/tools/api-cost-calculator">API cost calculator</Link>, or read <Link href="/learn/power-user/ai-api-pricing-for-non-engineers">AI API pricing for non-engineers</Link>.</p>
      </PageSection>

      <PageSection id="meaning" title="What a score can and cannot tell you">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">It can tell you</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CAN_TELL_YOU.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">It cannot tell you</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CANNOT_TELL_YOU.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">Build a test on your own tasks: <Link href="/learn/power-user/build-your-own-ai-test-set">Build your own AI test set</Link>. Read other people&apos;s benchmarks with our <Link href="/tools/benchmark-checklist">checklist</Link>.</p>
      </PageSection>

      <PageSection id="open" title="Decisions still open" intro="Four parts of our method are not decided yet. We list them so you know what this page does not yet promise.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {OPEN_DECISIONS.map((decision) => (
            <li key={decision.id} className={`${CARD_CLASS} border-amber-500/60`}>
              <h3 className="mt-0 text-base">{decision.question}</h3>
              <p className="m-0 text-sm"><strong>Why it matters:</strong> {decision.whyItMatters}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Meanwhile:</strong> {decision.whatThePageDoesMeanwhile}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions">
        <div className="grid gap-3">
          {FAQ.map((entry) => (
            <details key={entry.question} className={`${CARD_CLASS} group py-3`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none">▸</span>
                {entry.question}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
      </PageSection>

      <PageSection id="glossary" title="Terms in plain English">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {WHAT_CAN_GO_WRONG.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${HOW_WE_TEST_REVIEWED_ON}. This page is hand-written policy, labelled “Tested by us: no”. It describes our method. Results live in each review.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Our trust pages</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? <Link href={source.href}>{source.title}</Link> : <span className="font-semibold">{source.title}</span>}
                  <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Also useful</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {RELATED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                  <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Where our numbers come from, and how conflicts are settled</p>
        </div>
        <Link href="/about/source-policy" className={BUTTON_PRIMARY}>Read the source policy</Link>
      </footer>
    </div>
  );
}