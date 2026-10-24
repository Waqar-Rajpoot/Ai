import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { ADOPTION_FROM_QUARTER, ADOPTION_GROUP, ADOPTION_ROWS, ADOPTION_TO_QUARTER } from "@/lib/society/adoptionData";
import {
  ANCHOR_FIGURES_VERIFIED_ON,
  DATA_CENTRE_ELECTRICITY,
  JOBS_FINDINGS,
  barWidthPercent,
  electricityAddedTwh,
  percentChange,
} from "@/lib/society/anchorFigures";
import { BALANCE_LABELS, BALANCE_MEANINGS, BALANCE_ORDER, EVIDENCE_LABELS } from "@/lib/society/prosCons";
import { PERCENT_SCALE, PROS_CONS_REVIEWED_ON } from "@/lib/society/prosConsConstants";
import {
  CLAIM_PAIRS,
  DISAGREEMENTS,
  FAQ,
  GLOSSARY,
  HEADLINE_QUESTIONS,
  METHOD_POINTS,
  READER_ACTIONS,
  RELATED_LINKS,
  SOURCES,
  SUMMARY_POINTS,
} from "@/lib/society/prosConsContent";
import { PROS_CONS_THEMES } from "@/lib/society/prosConsData";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { ThemeExplorer } from "./ThemeExplorer";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "method", label: "How we score" },
  { id: "scorecard", label: "The scorecard" },
  { id: "themes", label: "Nine themes" },
  { id: "figures", label: "Anchor figures" },
  { id: "disagree", label: "Where experts differ" },
  { id: "claims", label: "One-sided claims" },
  { id: "headlines", label: "Judge a headline" },
  { id: "actions", label: "What you can do" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const ELECTRICITY = DATA_CENTRE_ELECTRICITY;
const ELECTRICITY_BARS: readonly { id: string; label: string; value: number; isForecast: boolean }[] = [
  { id: "2025", label: "2025", value: ELECTRICITY.twh2025, isForecast: false },
  { id: "2026", label: "2026", value: ELECTRICITY.twh2026, isForecast: false },
  { id: "2030", label: "2030 (forecast: above)", value: ELECTRICITY.twh2030Forecast, isForecast: true },
];
const OVERALL_ADOPTION = ADOPTION_ROWS.find((row) => row.id === "overall");

/** Article 33: an honest, two-sided scorecard of AI across nine themes, with named anchor figures. */
export function ProsConsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">Pros and cons of AI</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {PROS_CONS_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Plain and Technical layers</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Pros and cons of AI: an honest scorecard</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Nine themes, benefits and costs side by side, and a clear label for how strong the evidence is. No hype, no panic, no single score.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#scorecard" className={BUTTON_PRIMARY}>See the scorecard</a>
          <Link href="/society/weigh-up" className={BUTTON_OUTLINE}>Weigh it up yourself</Link>
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

      <PageSection id="summary" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SUMMARY_POINTS.map((point) => (
              <li key={point.headline}><strong>{point.headline}</strong> {point.detail}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Why it matters now</p>
            {OVERALL_ADOPTION && (
              <p className="mb-2 mt-1 text-sm">
                Among {ADOPTION_GROUP}, use of generative AI rose from {OVERALL_ADOPTION.fromPercent}% ({ADOPTION_FROM_QUARTER}) to {OVERALL_ADOPTION.toPercent}% ({ADOPTION_TO_QUARTER}), per the Fed-hosted tracker.
              </p>
            )}
            <p className="m-0 text-sm">More people use it, so the trade-offs reach more people. Details: <Link href="/society/ai-adoption-data">the adoption data explained</Link>.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="method" title="How we score" intro="Four rules apply to every AI & Society page: both sides, dated and sourced, forecasts labelled, named surveys only.">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-1">
            {METHOD_POINTS.map((point) => (
              <li key={point.headline} className={CARD_CLASS}>
                <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
              </li>
            ))}
          </ul>
          <div className={`${CARD_CLASS} self-start`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">What the balance labels mean</p>
            <dl className="mb-0 mt-2 grid gap-3 text-sm">
              {BALANCE_ORDER.map((balance) => (
                <div key={balance}>
                  <dt className="font-semibold">{BALANCE_LABELS[balance]}</dt>
                  <dd className="m-0 text-[var(--color-muted)]">{BALANCE_MEANINGS[balance]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </PageSection>

      <PageSection id="scorecard" title="The scorecard at a glance" intro="Each theme has a balance label (our judgement) and a separate evidence label (how well supported). Select a theme for the detail.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Nine themes with balance label, evidence strength and the main benefit and cost</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Theme</th>
                <th scope="col" className="p-3">Balance today</th>
                <th scope="col" className="p-3">Evidence</th>
                <th scope="col" className="p-3">Main benefit</th>
                <th scope="col" className="p-3">Main cost</th>
              </tr>
            </thead>
            <tbody>
              {PROS_CONS_THEMES.map((theme) => (
                <tr key={theme.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><a href={`#${theme.id}`}>{theme.title}</a></th>
                  <td className="p-3 align-top"><span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{BALANCE_LABELS[theme.balance]}</span></td>
                  <td className="p-3 align-top">{EVIDENCE_LABELS[theme.evidence]}</td>
                  <td className="p-3 align-top">{theme.pros[0]}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{theme.cons[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Balance labels are an editorial judgement as of {PROS_CONS_REVIEWED_ON}, not a measurement. They can change when evidence changes.</p>
      </PageSection>

      <PageSection id="themes" title="The nine themes in detail" intro="Benefits and costs side by side, with what the evidence says and one thing you can do. Filter by balance, or switch to Technical for how it works.">
        <ThemeExplorer />
      </PageSection>

      <PageSection id="figures" title="Anchor figures" intro="Two themes have named, dated figures we can show. Everything else on this page is explained without invented numbers.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Environment · {ELECTRICITY.publisher}, {ELECTRICITY.published}</p>
            <h3 className="mb-1 mt-1">Data-centre electricity</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">{ELECTRICITY.scope}.</p>
            <p className="mb-3 mt-3 text-2xl font-extrabold tabular-nums">
              {ELECTRICITY.twh2026} TWh <span className="text-sm font-normal text-[var(--color-muted)]">in 2026, up {percentChange(ELECTRICITY.twh2025, ELECTRICITY.twh2026)}% from {ELECTRICITY.twh2025} TWh in 2025</span>
            </p>
            <div className="grid gap-3">
              {ELECTRICITY_BARS.map((bar) => (
                <div key={bar.id}>
                  <div className="mb-1 flex justify-between gap-2 text-xs">
                    <span>{bar.label}</span>
                    <span className="tabular-nums text-[var(--color-muted)]">{bar.isForecast ? `above ${bar.value.toLocaleString("en-US")}` : bar.value} TWh</span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-[var(--color-border)]"
                    role="img"
                    aria-label={`${bar.label}: ${bar.isForecast ? "above " : ""}${bar.value} terawatt-hours`}
                  >
                    <div
                      className={`h-full rounded-full ${bar.isForecast ? "border border-dashed border-[var(--color-accent)] bg-transparent" : "bg-[image:var(--gradient-accent)]"}`}
                      style={{ width: `${barWidthPercent(bar.value, ELECTRICITY.twh2030Forecast)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
              The 2030 bar is a <strong>forecast</strong> and carries uncertainty. The 2026 figure adds {electricityAddedTwh(ELECTRICITY)} TWh in one year. These figures cover all data-centre use, not only AI. The AI share is covered in <Link href="/society/ai-power-use">How much power does AI use?</Link>
            </p>
          </div>

          <div className={CARD_CLASS}>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Jobs · {JOBS_FINDINGS.surveyorNet.publisher} and {JOBS_FINDINGS.ism.publisher}, June 2026</p>
            <h3 className="mb-1 mt-1">Two surveys, modest signals</h3>
            <p className="m-0 text-sm"><strong>{JOBS_FINDINGS.surveyorNet.publisher}:</strong> {JOBS_FINDINGS.surveyorNet.finding}</p>
            <p className="mb-2 mt-4 text-sm"><strong>{JOBS_FINDINGS.ism.publisher}:</strong> {JOBS_FINDINGS.ism.statement}</p>
            <div className="grid gap-3">
              {JOBS_FINDINGS.ism.rows.map((row) => (
                <div key={row.id}>
                  <div className="mb-1 flex justify-between gap-2 text-xs">
                    <span>{row.label}</span>
                    <span className="tabular-nums text-[var(--color-muted)]">{row.percent}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[var(--color-border)]" role="img" aria-label={`${row.label}: ${row.percent} percent`}>
                    <div className="h-full min-w-1 rounded-full bg-[image:var(--gradient-accent)]" style={{ width: `${barWidthPercent(row.percent, PERCENT_SCALE)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Scale: 0 to 100% of surveyed firms. These are manager surveys of plans and views, not measured job losses. See <Link href="/society/is-ai-taking-jobs">Is AI taking jobs?</Link></p>
          </div>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          {ANCHOR_FIGURES_VERIFIED_ON ? `Verified on ${ANCHOR_FIGURES_VERIFIED_ON}.` : "Check each publisher's own page for the latest figures."} Sources are listed at the end of this page.
        </p>
      </PageSection>

      <PageSection id="disagree" title="Where informed people disagree" intro="Good-faith disagreement is normal here. Each side has a case, and we say what evidence would settle it.">
        <div className="grid gap-4 md:grid-cols-2">
          {DISAGREEMENTS.map((entry) => (
            <article key={entry.topic} className={CARD_CLASS}>
              <h3 className="mt-0">{entry.topic}</h3>
              <p className="m-0 text-sm"><strong>One view:</strong> {entry.oneView}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Another view:</strong> {entry.otherView}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>What would help:</strong> {entry.whatWouldHelp}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="claims" title="One-sided claims, side by side" intro="Loud claims on both sides usually go further than the evidence. Here is how we would put each pair.">
        <div className="grid gap-4">
          {CLAIM_PAIRS.map((pair) => (
            <article key={pair.id} className={CARD_CLASS}>
              <div className="grid gap-3 md:grid-cols-2">
                <p className="m-0 text-sm"><span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Enthusiastic</span><br />{pair.boldClaim}</p>
                <p className="m-0 text-sm"><span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Alarmed</span><br />{pair.alarmedClaim}</p>
              </div>
              <p className="mb-0 mt-3 border-t border-[var(--color-border)] pt-3 text-sm"><strong>Closer to the evidence:</strong> {pair.closerToTheEvidence}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="headlines" title="Six questions for any AI headline" intro="Use these on any number or claim you see, including ours.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {HEADLINE_QUESTIONS.map((question, index) => (
            <li key={question.headline} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{question.headline}</strong> {question.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="actions" title="What a reader can do" intro="Most of the themes above have a habit that lowers the cost without giving up the benefit.">
        <div className="grid gap-4 md:grid-cols-2">
          {READER_ACTIONS.map((group) => (
            <article key={group.reader} className={CARD_CLASS}>
              <h3 className="mt-0">{group.reader}</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {group.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm">Want a longer list? Use the <Link href="/tools/ai-safety-checklist">AI safety checklist</Link>, or <Link href="/society/weigh-up">weigh up what matters to you</Link>.</p>
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
            <li>Balance labels are our judgement, not a measurement. Reasonable people could place a theme differently.</li>
            <li>Survey figures are snapshots from one month, and later releases may revise them.</li>
            <li>Electricity figures cover all data centres, and the 2030 number is a forecast.</li>
            <li>This page is general information, not legal, medical, financial or career advice.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${PROS_CONS_REVIEWED_ON}. The theme text is hand-written, labelled “Tested by us: no”. Figures come only from the named surveys and trackers below.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Data sources</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? (
                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                  ) : (
                    <span className="font-semibold">{source.publisher}: {source.title}</span>
                  )}
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
          <p className="m-0 font-semibold">Tick what matters to you and get a balanced summary</p>
        </div>
        <Link href="/society/weigh-up" className={BUTTON_PRIMARY}>Open the weigh-up</Link>
      </footer>
    </div>
  );
}