import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  LEDGER_KIND_LABELS,
  buildPowerLedger,
  countLedgerByKind,
  decodeHeadline,
  figureText,
  requireSeries,
} from "@/lib/society/aiPowerUse";
import {
  AI_POWER_REVIEWED_ON,
  AI_POWER_VERIFIED_ON,
  IEA_2026_PDF_URL,
  IEA_2026_PUBLISHED_ON,
  IEA_2026_SOURCE_LABEL,
} from "@/lib/society/aiPowerUseConstants";
import {
  CAN_SAY,
  CANNOT_SAY,
  FAQ,
  GLOSSARY,
  HEADLINES,
  MONEY_POINTS,
  ONE_LINE_SUMMARY,
  POWERING_POINTS,
  READER_ACTIONS,
  RELATED_LINKS,
  SCALE_POINTS,
  SOURCES,
  SUMMARY_POINTS,
  TASK_POINTS,
  UPSIDE_POINTS,
  WHAT_CAN_GO_WRONG,
  WHERE_POINTS,
} from "@/lib/society/aiPowerUseContent";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { HeadlineDecoderPanel } from "./HeadlineDecoderPanel";
import { LedgerTable } from "./LedgerTable";
import { QueryEnergyCalculator } from "./QueryEnergyCalculator";
import { SeriesCard } from "./SeriesCard";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "scale", label: "How big" },
  { id: "task", label: "Per question vs total" },
  { id: "where", label: "Where it lands" },
  { id: "powering", label: "How it is powered" },
  { id: "money", label: "Money and bottlenecks" },
  { id: "upside", label: "The other side" },
  { id: "readers", label: "For readers" },
  { id: "decode", label: "Decode a headline" },
  { id: "ledger", label: "Source for every number" },
  { id: "limits", label: "What it cannot show" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const LEDGER = buildPowerLedger();
const LEDGER_COUNTS = countLedgerByKind(LEDGER);
const DECODED_HEADLINES = HEADLINES.map(decodeHeadline);

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Data centres, 2025", value: figureText("dc-2025") },
  { label: "Projected, 2030", value: figureText("dc-2030") },
  { label: "AI-focused growth, 2025", value: figureText("ai-growth-2025") },
  { label: "Share of global electricity, 2025", value: figureText("dc-share-2025") },
];

function PointCards({ points }: { points: readonly { headline: string; detail: string }[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {points.map((point) => (
        <li key={point.headline} className={CARD_CLASS}>
          <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
        </li>
      ))}
    </ul>
  );
}

/** Article 37: how much electricity AI uses, read from the IEA's 2026 report and its 2025 predecessor. */
export function AiPowerUseView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">How much power does AI use?</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>IEA report {IEA_2026_PUBLISHED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Figures checked {AI_POWER_VERIFIED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">How much power does AI use? The data, read carefully</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          One question, one query, one data centre, one grid. What the International Energy Agency measures, what it projects, what nobody can yet say, and the source for every number.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL} · Reviewed {AI_POWER_REVIEWED_ON}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#summary" className={BUTTON_PRIMARY}>Read the short answer</a>
          <a href="#task" className={BUTTON_OUTLINE}>Try the query calculator</a>
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
            <p className="mb-0 mt-1 text-sm">{ONE_LINE_SUMMARY}</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Source: <a href={IEA_2026_PDF_URL} target="_blank" rel="noopener noreferrer">{IEA_2026_SOURCE_LABEL}</a>. Checked on {AI_POWER_VERIFIED_ON}.
        </p>
      </PageSection>

      <PageSection id="scale" title="How big is it?" intro="Data centres are the buildings that train and run AI. The IEA counts their electricity, and treats AI-focused data centres as a faster-growing subset.">
        <div className="grid gap-4 lg:grid-cols-2">
          <SeriesCard series={requireSeries("dc-electricity")} />
          <SeriesCard series={requireSeries("scenarios-2035")} />
        </div>
        <div className="mt-4"><PointCards points={SCALE_POINTS} /></div>
      </PageSection>

      <PageSection id="task" title="Per question versus in total" intro="A single query is tiny. Billions of queries, and heavier kinds of query, are not.">
        <QueryEnergyCalculator />
        <div className="mt-6"><PointCards points={TASK_POINTS} /></div>
      </PageSection>

      <PageSection id="where" title="Where the load lands" intro="Electricity is a local matter. What a grid can connect, and how fast, shapes where AI gets built.">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <SeriesCard series={requireSeries("ercot-queue")} />
          <div className="grid content-start gap-3">
            <div className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">A data centre of {figureText("dc100-mw")} can use as much electricity as</p>
              <p className="m-0 text-2xl font-extrabold tabular-nums">{figureText("dc100-households")} households</p>
              <p className="m-0 text-xs text-[var(--color-muted)]">IEA, 2025 report</p>
            </div>
            <div className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">Data centres’ share of demand where they cluster</p>
              <p className="m-0 text-2xl font-extrabold tabular-nums">{figureText("cluster-share")}</p>
              <p className="m-0 text-xs text-[var(--color-muted)]">Against {figureText("dc-share-2025")} of global demand</p>
            </div>
          </div>
        </div>
        <div className="mt-4"><PointCards points={WHERE_POINTS} /></div>
      </PageSection>

      <PageSection id="powering" title="How it is powered" intro="Companies sign contracts for clean power, but the grid and onsite generators fill the gaps.">
        <div className="grid gap-4 lg:grid-cols-[22rem_1fr]">
          <SeriesCard series={requireSeries("smr-offtake")} />
          <PointCards points={POWERING_POINTS.slice(0, 2)} />
        </div>
        <div className="mt-4"><PointCards points={POWERING_POINTS.slice(2)} /></div>
      </PageSection>

      <PageSection id="money" title="Money and bottlenecks" intro="Demand for electricity depends on whether the money keeps flowing and the equipment can be built.">
        <PointCards points={MONEY_POINTS} />
      </PageSection>

      <PageSection id="upside" title="The other side of the ledger" intro="The IEA also looks at what AI could save, and at what that depends on.">
        <PointCards points={UPSIDE_POINTS} />
      </PageSection>

      <PageSection id="readers" title="If you are reading this for…">
        <div className="grid gap-4 md:grid-cols-2">
          {READER_ACTIONS.map((group) => (
            <article key={group.reader} className={CARD_CLASS}>
              <h3 className="mt-0">{group.reader}</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">{group.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="decode" title="Decode a headline" intro="Pick a claim you might see. It shows what the number measures, what it does not say, and the figures behind it.">
        <HeadlineDecoderPanel entries={DECODED_HEADLINES} sourceNote="Every figure is in the ledger below" />
      </PageSection>

      <PageSection id="ledger" title="Source and date for every number" intro="Every figure on this page, what it covers, when, where it sits in the source, and how we checked it.">
        <ul className="m-0 mb-4 flex list-none flex-wrap gap-2 p-0 text-xs">
          <li className={BADGE_CLASS}>Reported in the source: <strong className="tabular-nums">{LEDGER_COUNTS.reported}</strong></li>
          <li className={BADGE_CLASS}>Our arithmetic: <strong className="tabular-nums">{LEDGER_COUNTS.arithmetic}</strong></li>
        </ul>
        <LedgerTable rows={LEDGER} kindLabels={LEDGER_KIND_LABELS} caption="Ledger of every number on the page with what it covers, period, section, source, kind and check status" showSource />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">This table is generated from the same figure list that draws the page, so a number cannot change in one place and not the other. The calculator’s results are illustrations and are not listed. Our rules: <Link href="/about/source-policy">source policy</Link>.</p>
      </PageSection>

      <PageSection id="limits" title="What this can and cannot show">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What we can say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CAN_SAY.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What we cannot say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">{CANNOT_SAY.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">For the wider balance, see <Link href="/society/pros-and-cons-of-ai">Pros and cons of AI</Link>.</p>
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

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${AI_POWER_REVIEWED_ON}. The explanations are hand-written, labelled “Tested by us: no”. Every figure is listed in the ledger above.`}>
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
          <p className="m-0 font-semibold">Weigh the benefits against the costs</p>
        </div>
        <Link href="/society/pros-and-cons-of-ai" className={BUTTON_PRIMARY}>Read the scorecard</Link>
      </footer>
    </div>
  );
}