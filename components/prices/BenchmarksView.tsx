import Link from "next/link";
import { InfoCards } from "@/components/learn/InfoCards";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { describeBenchmarkVerification } from "@/lib/prices/benchmarkLogic";
import {
  BENCHMARKS_LIMITS_NOTE,
  DIFFERENCE_ROWS,
  FAQ,
  READER_PATHS,
  READING_QUESTIONS,
  RELATED_LINKS,
  SHORT_ANSWER,
  SOURCE_LINKS,
  TERMS,
  THIRD_PARTY_LINKS,
  UPDATE_STEPS,
  WHY_SCORES_DISAGREE,
} from "@/lib/prices/benchmarkPageContent";
import { INDEPENDENT_SCORES, INDEPENDENT_SOURCES, VENDOR_TABLES } from "@/lib/prices/benchmarkRecords";
import { summarizeVerification } from "@/lib/prices/verification";
import { BenchmarkCoverageTable } from "./BenchmarkCoverageTable";
import { IndependentScoresExplorer } from "./IndependentScoresExplorer";
import { ScoreGapChecker } from "./ScoreGapChecker";
import { VendorScoreTable } from "./VendorScoreTable";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "terms", label: "Key words" },
  { id: "independent", label: "Independent scores" },
  { id: "gap-checker", label: "Is the gap real?" },
  { id: "vendor", label: "Vendor-reported" },
  { id: "two-numbers", label: "Two numbers" },
  { id: "why-disagree", label: "Why scores disagree" },
  { id: "ten-questions", label: "Ten questions" },
  { id: "coverage", label: "Directory coverage" },
  { id: "updates", label: "How we update" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const TERM_CARDS = TERMS.map((entry) => ({ id: entry.term, title: entry.term, summary: entry.meaning }));

/** Benchmark digest: independent and vendor-reported scores kept apart, with tools and guidance for reading them. */
export function BenchmarksView() {
  // Computed at build time, so the "older than 14 days" flags are as fresh as the last build.
  const todayIso = new Date().toISOString().slice(0, 10);
  const verification = summarizeVerification([...INDEPENDENT_SCORES, ...VENDOR_TABLES]);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Prices · Level 4 · Updated weekly
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI benchmark digest: independent scores and vendor-reported scores, kept apart</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          What independent groups measured, what the makers say about their own models, and how to tell whether a gap between two scores is real. New to this? Start with <Link href="/learn/practitioner#choosing-model">choosing a model by task</Link>.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#independent" className={BUTTON_PRIMARY}>See independent scores</a>
          <a href="#gap-checker" className={BUTTON_OUTLINE}>Is a gap real?</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: INDEPENDENT_SOURCES.length, label: "independent tables" },
            { value: INDEPENDENT_SCORES.length, label: "scores" },
            { value: VENDOR_TABLES.length, label: "vendor tables" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p role="status" className="relative mb-0 mt-6 max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm">
          {describeBenchmarkVerification(verification)} <Link href="/about/source-policy">How we verify</Link>
        </p>
      </header>

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

      <Section id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className={CARD_CLASS}>
            <CheckList items={SHORT_ANSWER} mark="✓" />
          </div>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Two kinds of number</p>
            <p className="mb-2 mt-1 text-sm"><strong>Independent:</strong> produced by a group with no stake in the model, using a published method.</p>
            <p className="m-0 text-sm"><strong>Vendor-reported:</strong> published by the maker about its own model. They never share a column.</p>
          </aside>
        </div>
      </Section>

      <Section id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one points to the part of this page you need.">
        <div className="grid gap-6 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <article key={path.id} className={CARD_CLASS}>
              <h3 className="mt-0">{path.title}</h3>
              <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {path.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="mb-0 mt-4 text-sm"><Link href={path.link.href}>{path.link.label}</Link></p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="terms" title="Key words in two minutes" intro="You will see these on every benchmark page.">
        <InfoCards items={TERM_CARDS} />
      </Section>

      <Section id="independent" title="Independent scores" intro="Four tables from three independent sources. Each source has its own scale, so scores are never added, averaged or compared across tables. Every row shows the date of its snapshot.">
        <IndependentScoresExplorer todayIso={todayIso} />
      </Section>

      <Section id="gap-checker" title="Is the gap real?" intro="Type two scores and their margins. If the ranges overlap, the models are level, however the table is ordered.">
        <ScoreGapChecker />
      </Section>

      <Section id="vendor" title="Vendor-reported scores" intro="These are the makers' own numbers, read as claims. Makers choose the benchmarks, the settings and the competitors they show, so keep these apart from the independent tables above.">
        <div className="grid gap-8">
          {VENDOR_TABLES.map((table) => <VendorScoreTable key={table.id} table={table} />)}
        </div>
      </Section>

      <Section id="two-numbers" title="Same test, two numbers" intro="Maker and independent numbers for the same model can disagree. They sit in separate columns because they were produced under different conditions.">
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">Examples where a maker's number and an independent number differ</caption>
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Case</th>
                <th scope="col" className="p-3">Vendor-reported</th>
                <th scope="col" className="p-3">Independent</th>
                <th scope="col" className="p-3">Why they differ</th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENCE_ROWS.map((entry) => (
                <tr key={entry.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{entry.case}</th>
                  <td className="p-3 align-top">{entry.makerSays}</td>
                  <td className="p-3 align-top">{entry.independentSays}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{entry.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Both rows were read through third-party reports, not the makers' or Artificial Analysis's own pages.</p>
      </Section>

      <Section id="why-disagree" title="Why scores disagree">
        <div className={CARD_CLASS}>
          <CheckList items={WHY_SCORES_DISAGREE} mark="•" />
        </div>
      </Section>

      <Section id="ten-questions" title="Ten questions before you trust a score" intro="Run any score past these. Print the same list from the benchmark checklist tool.">
        <ol className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {READING_QUESTIONS.map((question) => <li key={question}>{question}</li>)}
        </ol>
        <p className="mb-0 mt-3 text-sm">
          <Link href="/tools/benchmark-checklist">Open the checklist</Link> · <Link href="/learn/expert/how-to-read-ai-benchmark">Read the guide</Link>
        </p>
      </Section>

      <Section id="coverage" title="Which directory models each source covers" intro="Missing from a table is not the same as scoring badly. Many models are simply not captured yet.">
        <BenchmarkCoverageTable />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Until our own test results are published on the reviews, the model directory shows independent scores only. <Link href="/compare/models">Open the directory</Link>.
        </p>
      </Section>

      <Section id="updates" title="How we keep it current" intro="This page is checked every week, and sooner after a major model release.">
        <ol className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {UPDATE_STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </Section>

      <Section id="faq" title="Frequently asked questions">
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
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            <li>Scores move after our weekly check, and benchmarks get rebuilt.</li>
            <li>Most rows were read through third-party reports. Confirm on the source page before you rely on one.</li>
            <li>A leading score on one test can hide a weak result on the task you care about.</li>
            <li>Vendor numbers are claims. Do not compare them with the independent scores.</li>
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Independent sources and makers' pages come first. Third-party reports are leads only, and the source's own page always wins.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Source and maker pages</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {SOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <span className="mr-2 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{link.kind}</span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Third-party reports we read</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {THIRD_PARTY_LINKS.map((link) => (
                <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_LINKS.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <strong className="block">{item.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.reason}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <footer className={`${CARD_CLASS} mt-4 grid gap-3`}>
        <p className="m-0 text-sm text-[var(--color-muted)]">{BENCHMARKS_LIMITS_NOTE}</p>
      </footer>
    </div>
  );
}