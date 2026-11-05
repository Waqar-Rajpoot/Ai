import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  LEDGER_KIND_LABELS,
  buildBankingLedger,
  countLedgerByKind,
  formatFigureValue,
  formatPercent,
  investmentShareOfRespondents,
  requireComparison,
  requireFigure,
  resolveOutlookRows,
} from "@/lib/society/bankingFinance";
import {
  BANKING_FINANCE_REVIEWED_ON,
  BANKING_FINANCE_VERIFIED_ON,
  SURVEY_PUBLISHED_ON,
  SURVEY_SOURCE_LABEL,
  SURVEY_URL,
} from "@/lib/society/bankingFinanceConstants";
import {
  ADOPTION_NOTES,
  AGENT_POINTS,
  CAN_SAY,
  CANNOT_SAY,
  CUSTOMER_POINTS,
  FAQ,
  GLOSSARY,
  ONE_LINE_SUMMARY,
  READER_ACTIONS,
  RELATED_LINKS,
  RISK_POINTS,
  SOURCES,
  SUMMARY_POINTS,
  SUPPLIER_POINTS,
  WHAT_CAN_GO_WRONG,
  WHERE_POINTS,
  WHO_POINTS,
} from "@/lib/society/bankingFinanceContent";
import { AGENT_TYPES, AUTONOMY_LEVELS, AUTONOMY_ROWS, DOMAIN_USE, SECTORS } from "@/lib/society/bankingFinanceData";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { ComparisonCard } from "./ComparisonCard";
import { HeadlineDecoder } from "./HeadlineDecoder";
import { PercentBar } from "./PercentBar";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "who", label: "Who answered" },
  { id: "adoption", label: "How many use AI" },
  { id: "where", label: "Where it is used" },
  { id: "agents", label: "AI agents" },
  { id: "suppliers", label: "Outside suppliers" },
  { id: "risk", label: "Risks and checks" },
  { id: "customers", label: "For customers" },
  { id: "decode", label: "Decode a headline" },
  { id: "ledger", label: "Source for every number" },
  { id: "limits", label: "What it cannot show" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const LEDGER = buildBankingLedger();
const LEDGER_COUNTS = countLedgerByKind(LEDGER);
const OUTLOOK_ROWS = resolveOutlookRows();
const INVESTMENT_SHARE = investmentShareOfRespondents();

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Firms using AI, 2026", value: formatFigureValue(requireFigure("adoption-2026")) },
  { label: "Firms with AI agents deployed", value: formatFigureValue(requireFigure("agents-deployed")) },
  { label: "Agents with broad autonomy", value: formatFigureValue(requireFigure("autonomy-all-broad-autonomy")) },
  { label: "Firms that responded", value: formatFigureValue(requireFigure("respondents-total")) },
];

const METHOD_FIGURE_IDS = ["respondents-total", "respondents-large", "respondents-small", "respondents-full"] as const;
const PLANNED_ACTION_IDS = [
  { label: "Automated customer communications", nowId: "agent-customer-comms-now", plannedId: "agent-customer-comms-planned" },
  { label: "Creating or changing records in core systems", nowId: "agent-records-now", plannedId: "agent-records-planned" },
] as const;

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

/** Article 40: AI in banking and finance, read from the Bank of England and FCA 2026 survey. */
export function BankingFinanceView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">AI in banking and finance</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Survey published {SURVEY_PUBLISHED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Figures checked {BANKING_FINANCE_VERIFIED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI in banking and finance: what the regulators’ survey actually shows</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          One primary source, read carefully: the Bank of England and FCA survey of UK financial firms. Who answered, what they reported, where they are cautious, and the source for every number.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL} · Reviewed {BANKING_FINANCE_REVIEWED_ON}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#summary" className={BUTTON_PRIMARY}>Read the short answer</a>
          <a href="#decode" className={BUTTON_OUTLINE}>Decode a headline</a>
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
          Source: <a href={SURVEY_URL} target="_blank" rel="noopener noreferrer">{SURVEY_SOURCE_LABEL}</a>. Checked against the original on {BANKING_FINANCE_VERIFIED_ON}.
        </p>
      </PageSection>

      <PageSection id="who" title="Who answered" intro="A survey is only as broad as the people who answered it. This one was sent to firms regulated by the Bank of England or the FCA, and firms chose whether to take part.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {METHOD_FIGURE_IDS.map((id) => {
            const figure = requireFigure(id);
            return (
              <div key={id} className={CARD_CLASS}>
                <p className="m-0 text-xs text-[var(--color-muted)]">{figure.measure}</p>
                <p className="m-0 text-2xl font-extrabold tabular-nums">{formatFigureValue(figure)}</p>
              </div>
            );
          })}
        </div>

        <div className={`${CARD_CLASS} mt-4 overflow-x-auto p-0`}>
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="sr-only">Responders by sector and reported AI use where the report text gives it</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Sector</th>
                <th scope="col" className="p-3">Responders</th>
                <th scope="col" className="p-3">Using AI</th>
              </tr>
            </thead>
            <tbody>
              {SECTORS.map((sector) => (
                <tr key={sector.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{sector.label}</th>
                  <td className="p-3 tabular-nums">{sector.count}</td>
                  <td className="p-3 tabular-nums">{sector.adoptionPercent === null ? <span className="text-[var(--color-muted)]">Not given in the report text</span> : formatPercent(sector.adoptionPercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-4 mt-3 text-sm">
          <span className={BADGE_CLASS}>Arithmetic, not data</span>{" "}
          Investment and capital-markets firms are {formatPercent(INVESTMENT_SHARE)} of responders, and {requireFigure("sector-investment-small").value} of those {requireFigure("sector-investment-count").value} are small firms.
        </p>
        <PointCards points={WHO_POINTS} />
      </PageSection>

      <PageSection id="adoption" title="How many firms use AI" intro="Three surveys, three years. Read the direction, not the exact gaps.">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <ComparisonCard comparison={requireComparison("adoption")} />
          <ul className="m-0 grid list-none gap-3 p-0">
            {ADOPTION_NOTES.map((note) => (
              <li key={note.headline} className={CARD_CLASS}>
                <p className="m-0 text-sm"><strong>{note.headline}</strong> {note.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection id="where" title="Where AI is used" intro={`Share of firms using AI in each business activity, today and including planned use. Base: ${requireFigure("domain-enterprise-productivity-current").base}.`}>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Current and planned use of AI by business activity</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Activity</th>
                <th scope="col" className="p-3">Now</th>
                <th scope="col" className="p-3">With planned use</th>
                <th scope="col" className="w-56 p-3"><span className="sr-only">Bar</span></th>
              </tr>
            </thead>
            <tbody>
              {DOMAIN_USE.map((domain) => (
                <tr key={domain.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{domain.label}</th>
                  <td className="p-3 tabular-nums">{formatPercent(domain.currentPercent)}</td>
                  <td className="p-3 tabular-nums">{formatPercent(domain.withPlannedPercent)}</td>
                  <td className="p-3"><PercentBar percent={domain.currentPercent} outerPercent={domain.withPlannedPercent} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-4 mt-2 text-xs text-[var(--color-muted)]">Solid bar: now. Pale bar: now plus planned use. Ordered as in the report.</p>
        <PointCards points={WHERE_POINTS} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ComparisonCard comparison={requireComparison("operations-it-share")} />
          <ComparisonCard comparison={requireComparison("high-materiality-share")} />
        </div>
      </PageSection>

      <PageSection id="agents" title="AI agents: common, but mostly advisory" intro="The report asks how much freedom firms give agents, from recommending an action to acting alone.">
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {AUTONOMY_LEVELS.map((level, index) => (
            <li key={level.id} className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">Level {index + 1}</p>
              <p className="m-0 font-semibold">{level.label}</p>
              <p className="my-1 text-3xl font-extrabold tabular-nums">{formatPercent(AUTONOMY_ROWS[0].values[index])}</p>
              <p className="m-0 text-xs text-[var(--color-muted)]">{level.description}</p>
            </li>
          ))}
        </ol>
        <p className="mb-4 mt-2 text-xs text-[var(--color-muted)]">Share of full-survey respondents with agents deployed at each level.</p>
        <PointCards points={AGENT_POINTS} />

        <h3>Where firms use agents, and where they plan to</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
              <caption className="sr-only">Agent types, current and planned deployment</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Agent type</th>
                  <th scope="col" className="p-3">Now</th>
                  <th scope="col" className="p-3">With plans</th>
                </tr>
              </thead>
              <tbody>
                {AGENT_TYPES.map((type) => (
                  <tr key={type.id} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left font-semibold">{type.label}</th>
                    <td className="p-3 tabular-nums">{formatPercent(type.currentPercent)}</td>
                    <td className="p-3 tabular-nums">{formatPercent(type.withPlannedPercent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {PLANNED_ACTION_IDS.map((action) => (
              <li key={action.nowId} className={CARD_CLASS}>
                <p className="m-0 text-sm font-semibold">{action.label}</p>
                <p className="m-0 text-2xl font-extrabold tabular-nums">
                  {formatFigureValue(requireFigure(action.nowId))} <span className="text-base font-normal text-[var(--color-muted)]">now</span> to {formatFigureValue(requireFigure(action.plannedId))} <span className="text-base font-normal text-[var(--color-muted)]">with plans</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <h3>Autonomy by business area</h3>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Share of respondents with agents deployed at each autonomy level, selected business areas</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Business area</th>
                {AUTONOMY_LEVELS.map((level) => (
                  <th key={level.id} scope="col" className="p-3">{level.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUTONOMY_ROWS.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={AUTONOMY_LEVELS[index].id} className="p-3 tabular-nums">{formatPercent(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Selected rows from the report’s Table B. The full table has 19 business areas.</p>
      </PageSection>

      <PageSection id="suppliers" title="Outside suppliers" intro="More of the AI that firms rely on is supplied by someone else, and a few providers dominate.">
        <div className="grid gap-4 md:grid-cols-3">
          <ComparisonCard comparison={requireComparison("third-party-systems")} />
          <ComparisonCard comparison={requireComparison("third-party-high-materiality")} />
          <ComparisonCard comparison={requireComparison("cloud-concentration")} />
        </div>
        <div className="mt-4"><PointCards points={SUPPLIER_POINTS} /></div>
      </PageSection>

      <PageSection id="risk" title="Risks, benefits and checks" intro="These are firms rating themselves. Read them as opinions, not measurements.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Perceived benefits and risks today and over the next one to three years</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Measure</th>
                <th scope="col" className="p-3">Scale</th>
                <th scope="col" className="p-3">Today</th>
                <th scope="col" className="p-3">Next one to three years</th>
              </tr>
            </thead>
            <tbody>
              {OUTLOOK_ROWS.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{row.label}</th>
                  <td className="p-3 text-xs text-[var(--color-muted)]">{row.scaleNote}</td>
                  <td className="p-3 tabular-nums">{row.today}</td>
                  <td className="p-3 tabular-nums">{row.future}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-4 mt-2 text-xs text-[var(--color-muted)]">The report notes that firms rated risks as less severe on average in 2026 than in 2024, and that none of the listed benefits was widely rated above moderate today.</p>
        <PointCards points={RISK_POINTS} />
      </PageSection>

      <PageSection id="customers" title="What it means for customers" intro="The survey asks firms, so it can only say so much about the people on the other side of the counter.">
        <PointCards points={CUSTOMER_POINTS} />
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

      <PageSection id="decode" title="Decode a headline" intro="Pick a claim you might see in the news. It shows what the number measures, what it does not say, and the figures behind it.">
        <HeadlineDecoder />
      </PageSection>

      <PageSection id="ledger" title="Source and date for every number" intro="Every figure on this page, who or what it is a share of, when, where it sits in the report, and whether we checked it against the original.">
        <ul className="m-0 mb-4 flex list-none flex-wrap gap-2 p-0 text-xs">
          <li className={BADGE_CLASS}>Reported by the survey: <strong className="tabular-nums">{LEDGER_COUNTS.reported}</strong></li>
          <li className={BADGE_CLASS}>Our arithmetic: <strong className="tabular-nums">{LEDGER_COUNTS.arithmetic}</strong></li>
        </ul>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
            <caption className="sr-only">Ledger of every number on the page with base, period, report section, kind and check status</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Number</th>
                <th scope="col" className="p-3">What it is</th>
                <th scope="col" className="p-3">Share of</th>
                <th scope="col" className="p-3">Period</th>
                <th scope="col" className="p-3">Report section</th>
                <th scope="col" className="p-3">Kind</th>
                <th scope="col" className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold tabular-nums">{row.number}</th>
                  <td className="p-3 align-top">{row.meaning}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.base}</td>
                  <td className="p-3 align-top">{row.period}</td>
                  <td className="p-3 align-top tabular-nums">{row.reportSection}</td>
                  <td className="p-3 align-top"><span className={BADGE_CLASS}>{LEDGER_KIND_LABELS[row.kind]}</span></td>
                  <td className="p-3 align-top text-xs text-[var(--color-muted)]">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">This table is generated from the same figure list that draws the page, so a number cannot change in one place and not the other. Our rules: <Link href="/about/source-policy">source policy</Link>.</p>
      </PageSection>

      <PageSection id="limits" title="What this survey can and cannot show">
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
        <p className="mb-0 mt-3 text-sm">For people rather than firms, see <Link href="/society/ai-adoption-data">How fast is AI spreading?</Link>. For work, see <Link href="/society/is-ai-taking-jobs">Is AI taking jobs?</Link>.</p>
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

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${BANKING_FINANCE_REVIEWED_ON}. The explanations are hand-written, labelled “Tested by us: no”. Every figure is listed in the ledger above.`}>
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
          <p className="m-0 font-semibold">See how fast AI is spreading among people, not firms</p>
        </div>
        <Link href="/society/ai-adoption-data" className={BUTTON_PRIMARY}>Read the adoption data</Link>
      </footer>
    </div>
  );
}