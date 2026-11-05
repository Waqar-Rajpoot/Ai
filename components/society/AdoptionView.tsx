import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  ADOPTION_FROM_QUARTER,
  ADOPTION_GROUP,
  ADOPTION_SOURCE_LABEL,
  ADOPTION_SOURCE_URL,
  ADOPTION_TO_QUARTER,
  ADOPTION_VERIFIED_ON,
} from "@/lib/society/adoptionData";
import {
  LEDGER_KIND_LABELS,
  buildNumberLedger,
  countLedgerByKind,
  estimateOverlap,
  findRow,
  formatPercent,
  formatPoints,
  outsideMinusWorkGap,
  quartersBetween,
  shareOfUsersAtWork,
} from "@/lib/society/adoptionExplained";
import { ADOPTION_EXPLAINED_REVIEWED_ON } from "@/lib/society/adoptionExplainedConstants";
import {
  CAN_SAY,
  CANNOT_SAY,
  CITE_STEPS,
  FAQ,
  GLOSSARY,
  READER_ACTIONS,
  RELATED_LINKS,
  SOURCES,
  SUMMARY_POINTS,
  WHAT_CAN_GO_WRONG,
  WORK_OUTSIDE_POINTS,
} from "@/lib/society/adoptionExplainedContent";
import { DIFFERENCE_FACTORS, SECONDARY_FIGURES, USE_LADDER } from "@/lib/society/adoptionSurveysData";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { AdoptionExplorer } from "./AdoptionExplorer";
import { ClaimChecker } from "./ClaimChecker";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "series", label: "The tracker series" },
  { id: "work-outside", label: "Work vs outside work" },
  { id: "differ", label: "Why surveys differ" },
  { id: "ledger", label: "Source and date for every number" },
  { id: "check", label: "Check a claim" },
  { id: "limits", label: "What it cannot show" },
  { id: "cite", label: "How to cite it" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const OVERALL = findRow("overall");
const WORK = findRow("work");
const OUTSIDE = findRow("outside-work");
const START_OVERLAP = OVERALL && WORK && OUTSIDE ? estimateOverlap(OVERALL.fromPercent, WORK.fromPercent, OUTSIDE.fromPercent) : null;
const END_OVERLAP = OVERALL && WORK && OUTSIDE ? estimateOverlap(OVERALL.toPercent, WORK.toPercent, OUTSIDE.toPercent) : null;
const LEDGER = buildNumberLedger();
const LEDGER_COUNTS = countLedgerByKind(LEDGER);
const QUARTER_COUNT = quartersBetween(ADOPTION_FROM_QUARTER, ADOPTION_TO_QUARTER);

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Overall use, latest", value: OVERALL ? formatPercent(OVERALL.toPercent) : "n/a" },
  { label: "Use at work, latest", value: WORK ? formatPercent(WORK.toPercent) : "n/a" },
  { label: "Quarters between the two dates", value: QUARTER_COUNT === null ? "n/a" : String(QUARTER_COUNT) },
  { label: "Numbers in the ledger", value: String(LEDGER.length) },
];

const OVERLAP_ROWS: readonly { label: string; start: string; end: string }[] =
  START_OVERLAP && END_OVERLAP
    ? [
        { label: "Use it in both settings", start: formatPercent(START_OVERLAP.both), end: formatPercent(END_OVERLAP.both) },
        { label: "Use it only outside work", start: formatPercent(START_OVERLAP.onlyOutsideWork), end: formatPercent(END_OVERLAP.onlyOutsideWork) },
        { label: "Use it only at work", start: formatPercent(START_OVERLAP.onlyWork), end: formatPercent(END_OVERLAP.onlyWork) },
        { label: "Do not use it", start: formatPercent(START_OVERLAP.neither), end: formatPercent(END_OVERLAP.neither) },
      ]
    : [];

/** Article 41: the Fed-hosted adoption series explained, with sources and dates for every number. */
export function AdoptionView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">How fast is AI spreading?</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {ADOPTION_EXPLAINED_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Plain and Technical layers</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">How fast is AI spreading? The adoption data explained</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          One named series, read carefully: who was counted, what counted as use, how work and home use differ, why other surveys disagree, and the source and date for every number.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#series" className={BUTTON_PRIMARY}>See the series</a>
          <a href="#check" className={BUTTON_OUTLINE}>Check a number you saw</a>
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
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">The number in one line</p>
            {OVERALL && (
              <p className="mb-2 mt-1 text-sm">
                {formatPercent(OVERALL.toPercent)} of {ADOPTION_GROUP} used generative AI in {ADOPTION_TO_QUARTER}, up from {formatPercent(OVERALL.fromPercent)} in {ADOPTION_FROM_QUARTER}.
              </p>
            )}
            <p className="m-0 text-sm">That is use, in one country and age group. Not jobs, and not the world.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Source: {ADOPTION_SOURCE_LABEL}. {ADOPTION_VERIFIED_ON ? `Verified on ${ADOPTION_VERIFIED_ON}.` : "Check the tracker's own page for the latest figures."}</p>
      </PageSection>

      <PageSection id="series" title="The Fed-hosted tracker series" intro={`${ADOPTION_GROUP}, ${ADOPTION_FROM_QUARTER} compared with ${ADOPTION_TO_QUARTER}. Choose a measure.`}>
        <AdoptionExplorer />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What we can say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CAN_SAY.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What we cannot say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CANNOT_SAY.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">
          Source:{" "}
          {ADOPTION_SOURCE_URL ? <a href={ADOPTION_SOURCE_URL} target="_blank" rel="noopener noreferrer">{ADOPTION_SOURCE_LABEL}</a> : ADOPTION_SOURCE_LABEL}.
        </p>
      </PageSection>

      <PageSection id="work-outside" title="Work vs outside work" intro="The tracker splits use by setting. The two overlap, so they cannot be added, and the overlap is worth working out.">
        {WORK && OUTSIDE && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">At work</p>
              <p className="m-0 text-2xl font-extrabold tabular-nums">{formatPercent(WORK.fromPercent)} to {formatPercent(WORK.toPercent)}</p>
            </div>
            <div className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">Outside work</p>
              <p className="m-0 text-2xl font-extrabold tabular-nums">{formatPercent(OUTSIDE.fromPercent)} to {formatPercent(OUTSIDE.toPercent)}</p>
            </div>
            <div className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">Outside minus work</p>
              <p className="m-0 text-2xl font-extrabold tabular-nums">
                {formatPoints(outsideMinusWorkGap(WORK.fromPercent, OUTSIDE.fromPercent))} to {formatPoints(outsideMinusWorkGap(WORK.toPercent, OUTSIDE.toPercent))}
              </p>
              <p className="m-0 text-xs text-[var(--color-muted)]">The gap widened.</p>
            </div>
          </div>
        )}
        <ul className="m-0 mt-4 grid list-none gap-3 p-0 md:grid-cols-3">
          {WORK_OUTSIDE_POINTS.map((point) => (
            <li key={point.headline} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
            </li>
          ))}
        </ul>

        {OVERLAP_ROWS.length > 0 && (
          <>
            <h3>How the overlap splits (our arithmetic)</h3>
            <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <caption className="sr-only">Estimated overlap between work and outside-work use, as a share of US adults 18 to 64</caption>
                <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  <tr>
                    <th scope="col" className="p-3">Share of {ADOPTION_GROUP} who…</th>
                    <th scope="col" className="p-3">{ADOPTION_FROM_QUARTER}</th>
                    <th scope="col" className="p-3">{ADOPTION_TO_QUARTER}</th>
                  </tr>
                </thead>
                <tbody>
                  {OVERLAP_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="p-3 text-left font-semibold">{row.label}</th>
                      <td className="p-3 tabular-nums">{row.start}</td>
                      <td className="p-3 tabular-nums">{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${CARD_CLASS} mt-4 border-amber-500/60`}>
              <p className="m-0 text-sm"><strong>How we worked this out.</strong> We assumed the overall figure counts anyone who uses generative AI at work or outside work. Then both = work + outside − overall, only-work = overall − outside, and only-outside = overall − work. These are not published by the tracker. If it defines “overall” differently, they do not hold, so check the original.</p>
            </div>
            {OVERALL && WORK && (
              <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
                By the same arithmetic, about {shareOfUsersAtWork(OVERALL.fromPercent, WORK.fromPercent)}% of users also used it at work in {ADOPTION_FROM_QUARTER} and about {shareOfUsersAtWork(OVERALL.toPercent, WORK.toPercent)}% in {ADOPTION_TO_QUARTER}.
              </p>
            )}
          </>
        )}
      </PageSection>

      <PageSection id="differ" title="Why different surveys differ" intro="Two honest surveys can give very different numbers for “AI use”. Eight things usually explain it.">
        <div className="grid gap-4 md:grid-cols-2">
          {DIFFERENCE_FACTORS.map((factor, index) => (
            <article key={factor.id} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <div className="text-sm">
                <p className="m-0 font-semibold">{factor.factor}</p>
                <p className="mb-0 mt-1 text-[var(--color-muted)]">{factor.question}</p>
                <p className="mb-0 mt-2">{factor.whyItMatters}</p>
              </div>
            </article>
          ))}
        </div>

        <h3>The use ladder: same people, four different claims</h3>
        <p className="mt-0 text-sm text-[var(--color-muted)]">Each rung counts fewer people than the one above. We give no numbers here, because the point is the wording.</p>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Four ways of defining AI use, from widest to narrowest</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Rung</th>
                <th scope="col" className="p-3">Typical wording</th>
                <th scope="col" className="p-3">What it captures</th>
              </tr>
            </thead>
            <tbody>
              {USE_LADDER.map((rung) => (
                <tr key={rung.level} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{rung.level}</th>
                  <td className="p-3 align-top">{rung.wording}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{rung.whatItCaptures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Other figures you may see (not verified by us)</h3>
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <p className="m-0 text-sm"><strong>Do not cite these.</strong> We have seen them only in secondary summaries and have not opened the originals, so we do not know the group, the date or the exact wording. They are here to show why such numbers cannot be compared with the tracker without checking.</p>
        </div>
        <div className={`${CARD_CLASS} mt-4 overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Secondary figures, shown unverified</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Figure</th>
                <th scope="col" className="p-3">As summarised</th>
                <th scope="col" className="p-3">Group</th>
                <th scope="col" className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {SECONDARY_FIGURES.map((figure) => (
                <tr key={figure.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{figure.publisher}</th>
                  <td className="p-3 align-top tabular-nums">{figure.valueText}</td>
                  <td className="p-3 align-top">{figure.measure}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{figure.group ?? "Not confirmed"}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{figure.period ?? "Not confirmed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="ledger" title="Source and date for every number" intro="Every figure on this page, where it comes from, who it covers, when, and whether we have checked it against the original.">
        <ul className="m-0 mb-4 flex list-none flex-wrap gap-2 p-0 text-xs">
          <li className={BADGE_CLASS}>Tracker figures: <strong className="tabular-nums">{LEDGER_COUNTS.tracker}</strong></li>
          <li className={BADGE_CLASS}>Our arithmetic: <strong className="tabular-nums">{LEDGER_COUNTS.arithmetic}</strong></li>
          <li className={`${BADGE_CLASS} border-amber-500`}>Secondary, unverified: <strong className="tabular-nums">{LEDGER_COUNTS.secondary}</strong></li>
        </ul>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
            <caption className="sr-only">Ledger of every number on the page with source, group, period, kind and check status</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Number</th>
                <th scope="col" className="p-3">What it is</th>
                <th scope="col" className="p-3">Group</th>
                <th scope="col" className="p-3">Period</th>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Kind</th>
                <th scope="col" className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold tabular-nums">{row.number}</th>
                  <td className="p-3 align-top">{row.meaning}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.group}</td>
                  <td className="p-3 align-top tabular-nums">{row.period}</td>
                  <td className="p-3 align-top">{row.source}</td>
                  <td className="p-3 align-top"><span className={BADGE_CLASS}>{LEDGER_KIND_LABELS[row.kind]}</span></td>
                  <td className="p-3 align-top text-xs text-[var(--color-muted)]">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">This table is generated from the same data that draws the charts, so a number cannot change in one place and not the other. Our rules: <Link href="/about/source-policy">source policy</Link>.</p>
      </PageSection>

      <PageSection id="check" title="Check an adoption number you saw" intro="Use it on any claim about AI use, including ours. It rates how checkable a claim is, not whether it is true.">
        <ClaimChecker />
      </PageSection>

      <PageSection id="limits" title="What this series does not show" intro="Four gaps to keep in mind before you build an argument on it.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {CANNOT_SAY.map((line) => (
            <li key={line} className={CARD_CLASS}><p className="m-0 text-sm">{line}</p></li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">For work and jobs, see <Link href="/society/is-ai-taking-jobs">Is AI taking jobs?</Link>. For the wider balance, see <Link href="/society/pros-and-cons-of-ai">Pros and cons of AI</Link>.</p>
      </PageSection>

      <PageSection id="cite" title="How to cite it" intro="Five habits that keep an adoption number honest.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {CITE_STEPS.map((step, index) => (
            <li key={step.headline} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.headline}</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <h3>By reader</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {READER_ACTIONS.map((group) => (
            <article key={group.reader} className={CARD_CLASS}>
              <h4 className="mt-0">{group.reader}</h4>
              <ul className="m-0 grid gap-2 pl-5 text-sm">{group.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            </article>
          ))}
        </div>
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
          <ul className="m-0 grid gap-1 pl-5 text-sm">{WHAT_CAN_GO_WRONG.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${ADOPTION_EXPLAINED_REVIEWED_ON}. The explanations are hand-written, labelled “Tested by us: no”. Every figure is listed in the ledger above.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Data sources</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a> : <span className="font-semibold">{source.publisher}: {source.title}</span>}
                  <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Keep reading</h3>
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
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See what named surveys say about AI and jobs</p>
        </div>
        <Link href="/society/is-ai-taking-jobs" className={BUTTON_PRIMARY}>Read about jobs</Link>
      </footer>
    </div>
  );
}