import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  AGENCY_SOURCES,
  CAVEATS,
  EVIDENCE_RULES,
  FAQ,
  JOBS_CAVEATS,
  JOBS_FIGURES,
  JOBS_MECHANISM,
  MEASURE_ROWS,
  READER_ACTIONS,
  SECONDARY_SOURCES,
  SHORT_ANSWER,
  SIGNALS,
  WHY_NOT_USED,
} from "@/lib/society/industriesContent";
import { INDUSTRIES_VERIFIED_ON } from "@/lib/society/industriesConstants";
import { AdoptionOutlookChart } from "./AdoptionOutlookChart";
import { IndustriesFreshness } from "./IndustriesFreshness";
import { IndustryFilterCards } from "./IndustryFilterCards";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "four-answers", label: "Four answers" },
  { id: "next-chart", label: "What firms expect" },
  { id: "industries", label: "Eight industries" },
  { id: "jobs", label: "Jobs signal" },
  { id: "evidence", label: "How we label" },
  { id: "watch", label: "Next to watch" },
  { id: "what-to-do", label: "What you can do" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

/** Article 35: which industries are changing most and which are next. */
export function IndustriesView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {INDUSTRIES_VERIFIED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Which industries are changing most with AI, and which are next</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Eight industries, the surveys behind each, and one finding that surprises most people: most firms still haven&apos;t adopted AI, even though most workers in some sectors already use it.
        </p>
        <IndustriesFreshness />
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#industries" className={BUTTON_PRIMARY}>Find my industry</a>
          <a href="#four-answers" className={BUTTON_OUTLINE}>Why the numbers differ</a>
        </div>
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

      <PageSection id="short-answer" title="The short answer">
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
          {SHORT_ANSWER.map((item) => (
            <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>
          ))}
        </ul>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Two-sided by design: every card shows what is changing and what is not yet known. All figures are US data. Forecasts are labelled and uncertain.
        </p>
      </PageSection>

      <PageSection id="four-answers" title="&ldquo;How many use AI?&rdquo; has four correct answers" intro="They range from 19.8% to 61.8% because they count different things. Read this before quoting any number about AI use.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption className="sr-only">Four measures of AI use in the United States and why they differ</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">What is counted</th>
                <th scope="col" className="p-3">Share</th>
                <th scope="col" className="p-3">Period</th>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Why it differs</th>
              </tr>
            </thead>
            <tbody>
              {MEASURE_ROWS.map((row) => (
                <tr key={row.measure} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top font-semibold">{row.measure}<span className="block text-xs font-normal text-[var(--color-muted)]">{row.who}</span></th>
                  <td className="p-3 align-top text-lg font-extrabold tabular-nums">{row.value}</td>
                  <td className="p-3 align-top">{row.period}</td>
                  <td className="p-3 align-top">{row.source}<span className="block text-xs text-[var(--color-muted)]">{row.verification === "provider" ? "Agency page" : "Secondary: confirm"}</span></td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.whyDifferent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">More on the series: <Link href="/society/ai-adoption-data">How fast is AI spreading?</Link></p>
      </PageSection>

      <PageSection id="next-chart" title="What firms say they will do next" intro="The best hint of which sectors are next is what firms expect, with the caveat that expectation is not action.">
        <AdoptionOutlookChart />
      </PageSection>

      <PageSection id="industries" title="Eight industries, one honest card each" intro="Cards with a numbers panel are backed by a named survey. Dashed cards are directional and carry no numbers.">
        <IndustryFilterCards />
        <p className="mb-0 mt-4 text-sm">Prefer to explore by figure? Try the <Link href="/society/industry-explorer">industry explorer</Link>.</p>
      </PageSection>

      <PageSection id="jobs" title="The jobs signal: who gets hired" intro="The clearest measured effect is not layoffs. It is who companies stop hiring.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Stanford Digital Economy Lab, ADP payroll data</p>
            <p className="mb-3 mt-1 text-sm text-[var(--color-muted)]">Jan 2021 to Jun 2026, revision dated Aug 12, 2026. Read through a news report; the paper is to be checked.</p>
            <dl className="m-0 grid gap-3 text-sm">
              {JOBS_FIGURES.map((figure) => (
                <div key={figure.label}>
                  <dt className="text-[var(--color-muted)]">{figure.label}</dt>
                  <dd className="m-0 font-extrabold">{figure.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mb-0 mt-4 text-sm">{JOBS_MECHANISM}</p>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">Before you quote this</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {JOBS_CAVEATS.map((caveat) => <li key={caveat}>{caveat}</li>)}
            </ul>
            <p className="mb-0 mt-4 text-sm">The wider picture is in <Link href="/society/is-ai-taking-jobs">Is AI taking jobs?</Link></p>
          </div>
        </div>
      </PageSection>

      <PageSection id="evidence" title="How we label evidence, and what we leave out">
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {EVIDENCE_RULES.map((rule) => (
              <li key={rule.lead} className="text-sm"><strong>{rule.lead}</strong> {rule.text}</li>
            ))}
          </ul>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Why many online figures are not used</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {WHY_NOT_USED.map((item) => (
                <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <details className={`${CARD_CLASS} mt-4`}>
          <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>Go deeper: how the main surveys define &ldquo;use&rdquo;</summary>
          <div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]">
            <p className="m-0"><strong>Census BTOS</strong> asks whether the business used AI in any business function in the past two weeks and whether it expects to in the next six months. It reports firms, not people.</p>
            <p className="m-0"><strong>Federal Reserve note (Real-Time Population Survey)</strong> asks &ldquo;Do you use Generative AI for your job?&rdquo;, defining it as AI that creates text, images, audio or video from prompts. It reports individuals and uses roughly 5,000 to 6,000 responses per wave.</p>
            <p className="m-0"><strong>AMA physician survey</strong> asks about professional use among about 1,700 physicians and reports percentages of those who answered, not of all physicians.</p>
          </div>
        </details>
      </PageSection>

      <PageSection id="watch" title="Next to watch: six signals that will tell us more" intro="If you only check back for one reason, check these.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {SIGNALS.map((signal, index) => (
            <li key={signal.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm">
                <strong>{signal.title}</strong> {signal.why}
                <span className="mt-1 block text-xs text-[var(--color-muted)]">Where to look: {signal.whereToLook}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-4 text-sm">These feed our scenarios in <Link href="/society/future-of-ai">The future of AI: six forces to watch to 2030</Link>, which are frameworks, not forecasts.</p>
      </PageSection>

      <PageSection id="what-to-do" title="What you can do with this" intro="Practical steps, matched to where you sit.">
        <div className="grid gap-4 md:grid-cols-2">
          {READER_ACTIONS.map((group) => (
            <article key={group.audience} className={CARD_CLASS}>
              <h3 className="mt-0">{group.audience}</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {group.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-4 text-sm">
          Start with <Link href="/learn/practitioner/fact-check-ai-answers">how to fact-check AI answers</Link> and <Link href="/prices/privacy">the privacy matrix</Link>.
        </p>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {CAVEATS.map((caveat) => <li key={caveat}>{caveat}</li>)}
          </ul>
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

      <PageSection id="sources" title="Sources and labels" intro={`Verified on ${INDUSTRIES_VERIFIED_ON}. Agency pages win over trackers, and every figure says which one we read.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Agency and provider pages</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {AGENCY_SOURCES.map((source) => (
                <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a></li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Secondary, to be replaced</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {SECONDARY_SOURCES.map((source) => (
                <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report a wrong figure</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See the six forces shaping the next five years</p>
        </div>
        <Link href="/society/future-of-ai" className={BUTTON_PRIMARY}>The future of AI</Link>
      </footer>
    </div>
  );
}