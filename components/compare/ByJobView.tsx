import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { findPriceRow, formatRate } from "@/lib/prices/apiCostTable";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeRetirementDate } from "@/lib/prices/retirementLogic";
import { RETIREMENTS } from "@/lib/prices/retirements";
import type { ByJobPage, EvidenceStrength, JobPick } from "@/lib/compare/byJob";
import { STRENGTH_LABELS, STRENGTH_MEANINGS } from "@/lib/compare/byJob";
import { BestForCostTable } from "./BestForCostTable";

interface ByJobViewProps {
  page: ByJobPage;
}

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "jobs", label: "Best model by job" },
  { id: "details", label: "Evidence for each job" },
  { id: "newcomers", label: "Newest models" },
  { id: "cost", label: "Cost per task" },
  { id: "how-to-choose", label: "How to choose" },
  { id: "changes", label: "What changed" },
  { id: "retiring", label: "Retiring models" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const STRENGTH_STYLES: Record<EvidenceStrength, string> = {
  strong: "border-emerald-500 text-emerald-700 dark:text-emerald-400",
  moderate: "border-sky-500 text-sky-700 dark:text-sky-400",
  thin: "border-dashed",
};

/** Model name with a link to its review, or the plain id if the price row is missing. */
function ModelLink({ pick }: { pick: JobPick | null }) {
  if (!pick) return <span className="text-[var(--color-muted)]">No pick yet</span>;
  const row = findPriceRow(pick.modelId);
  if (!row) return <span>{pick.modelId}</span>;
  return <Link href={`/compare/reviews/${row.id}`} className={`font-semibold ${FOCUS_RING}`}>{row.model}</Link>;
}

/** Best AI model by job: summary, job table, evidence, newcomers, cost per task, changes, retirements, FAQ and sources. */
export function ByJobView({ page }: ByJobViewProps) {
  const summaryCards = [
    { label: "For hard, high-stakes work", pick: page.summary.hardWork },
    { label: "For everyday value", pick: page.summary.everyday },
    { label: "For bulk and budget work", pick: page.summary.budget },
  ];
  const retiring = page.retiringIds
    .map((id) => RETIREMENTS.find((entry) => entry.id === id))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> / <Link href="/compare">Compare</Link> / <Link href="/compare/best">Best for</Link> / By job
      </nav>

      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <p className="m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-[var(--color-accent-contrast)]">Compare · Best for · Levels 2 to 3</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {page.checkedOn}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Evidence-only ranking: our own tests are not run yet</span>
        </p>
        <h1 className="mb-3 mt-4 max-w-3xl">{page.pageTitle}</h1>
        <p className="m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          There is no single best model. This page picks one for each common job, shows the evidence behind it, says how strong that evidence is, and names the newest models you cannot use yet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#jobs" className={BUTTON_PRIMARY}>See the picks</a>
          <a href="#cost" className={BUTTON_OUTLINE}>Compare cost per task</a>
        </div>
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] ${FOCUS_RING}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <PageSection id="summary" title="The short answer">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {summaryCards.map((card) => {
            const row = findPriceRow(card.pick.modelId);
            return (
              <li key={card.label} className={CARD_CLASS}>
                <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">{card.label}</p>
                <h3 className="mb-1 mt-1 text-xl">{row?.model ?? card.pick.modelId}</h3>
                <p className="m-0 text-sm">{card.pick.reason}</p>
                {row && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{formatRate(row.rate)} per million tokens</p>}
              </li>
            );
          })}
        </ul>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying. A score is a shortlist, not a verdict: test your top two or three on your own work.
        </p>
      </PageSection>

      <PageSection id="jobs" title="Best model by job" intro="Top pick, runner-up and budget pick for each job, with how strong the evidence is. Open any job below for the numbers.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
            <caption className="sr-only">Top pick, runner-up and budget pick for each job, with evidence strength</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Job</th>
                <th scope="col" className="p-3">Top pick</th>
                <th scope="col" className="p-3">Runner-up</th>
                <th scope="col" className="p-3">Budget pick</th>
                <th scope="col" className="p-3">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {page.jobs.map((job) => (
                <tr key={job.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">
                    <a href={`#job-${job.id}`} className={FOCUS_RING}>{job.job}</a>
                    <span className="mt-0.5 block text-xs font-normal text-[var(--color-muted)]">{job.forWhom}</span>
                  </th>
                  <td className="p-3 align-top"><ModelLink pick={job.top} /></td>
                  <td className="p-3 align-top"><ModelLink pick={job.runnerUp} /></td>
                  <td className="p-3 align-top"><ModelLink pick={job.budget} /></td>
                  <td className="p-3 align-top"><span className={`${BADGE_CLASS} ${STRENGTH_STYLES[job.strength]}`}>{STRENGTH_LABELS[job.strength]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="mb-0 mt-4 grid gap-2 text-sm md:grid-cols-3">
          {(Object.keys(STRENGTH_LABELS) as EvidenceStrength[]).map((strength) => (
            <div key={strength}>
              <dt className="font-semibold">{STRENGTH_LABELS[strength]}</dt>
              <dd className="m-0 text-[var(--color-muted)]">{STRENGTH_MEANINGS[strength]}</dd>
            </div>
          ))}
        </dl>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Jobs we do not rank yet</h3>
          <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
            {page.notRankedYet.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      <PageSection id="details" title="Evidence for each job" intro="Where each pick comes from. Vendor claims are not used here. For maker-reported numbers, see the benchmark digest.">
        <div className="grid gap-4">
          {page.jobs.map((job) => (
            <article key={job.id} id={`job-${job.id}`} className={`${CARD_CLASS} scroll-mt-24`}>
              <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
                <span className={`${BADGE_CLASS} ${STRENGTH_STYLES[job.strength]}`}>{STRENGTH_LABELS[job.strength]}</span>
              </p>
              <h3 className="mb-1 mt-2">{job.job}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{job.forWhom}</p>

              <ol className="mb-0 mt-3 grid list-none gap-2 p-0 text-sm md:grid-cols-3">
                {[
                  { label: "Top pick", pick: job.top },
                  { label: "Runner-up", pick: job.runnerUp },
                  { label: "Budget pick", pick: job.budget },
                ].map((item) => (
                  <li key={item.label} className="rounded-xl border border-[var(--color-border)] p-3">
                    <span className="block text-xs text-[var(--color-muted)]">{item.label}</span>
                    <ModelLink pick={item.pick} />
                    {item.pick && <span className="mt-1 block text-[var(--color-muted)]">{item.pick.reason}</span>}
                  </li>
                ))}
              </ol>

              <h4 className="mb-1 mt-4 text-sm font-semibold">Evidence</h4>
              <ul className="m-0 grid gap-1 pl-5 text-sm">
                {job.evidence.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]"><strong>Caveat:</strong> {job.caveat}</p>
              {job.links.length > 0 && (
                <p className="mb-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {job.links.map((link) => <Link key={link.href} href={link.href} className={FOCUS_RING}>{link.label}</Link>)}
                </p>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="newcomers" title="Newest models, not ranked yet" intro="Three models from the last two weeks that are not in our directory. Two of them cannot be used by the public, or are too new to judge.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {page.newcomers.map((model) => (
            <li key={model.id} className={CARD_CLASS}>
              <p className="m-0 text-xs text-[var(--color-muted)]">{model.maker} · announced {formatIsoDate(model.announced)}</p>
              <h3 className="mb-2 mt-1">{model.name}</h3>
              <p className="m-0 text-sm"><strong>Access:</strong> {model.access}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Price:</strong> {model.price}</p>
              <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
                {model.whatWeKnow.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="mb-0 mt-3 rounded-xl border border-[var(--color-border)] p-3 text-sm">{model.caution}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="cost" title="Cost per task" intro="Price per token hides the real bill. Here is what three everyday jobs cost on the main models, calculated from our API price data.">
        <BestForCostTable scenarios={page.costScenarios} modelIds={page.costModelIds} />
      </PageSection>

      <PageSection id="how-to-choose" title="How to choose in three questions">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {page.howToChoose.map((item, index) => (
            <li key={item.question} className={CARD_CLASS}>
              <span className="text-3xl font-extrabold tabular-nums text-[var(--color-accent)]">{index + 1}</span>
              <p className="mb-1 mt-1 font-semibold">{item.question}</p>
              <p className="m-0 text-sm text-[var(--color-muted)]">{item.answer}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="changes" title="What changed since the last review" intro="Launches and score changes that affect these picks, newest first.">
        <ol className="m-0 grid list-none gap-3 p-0">
          {page.changes.map((change) => (
            <li key={`${change.isoDate}-${change.title}`} className={`${CARD_CLASS} py-3`}>
              <p className="m-0 text-sm font-bold tabular-nums text-[var(--color-accent)]">{formatIsoDate(change.isoDate)}</p>
              <p className="mb-0 mt-1 font-semibold">{change.title}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{change.detail}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="retiring" title="Retiring models to move off" intro="If your tools still point at these, plan the move now.">
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-3 text-sm`}>
          {retiring.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.name}</strong> ({entry.platform}): {describeRetirementDate(entry)}.
              {entry.replacement && <span className="text-[var(--color-muted)]"> Replacement: {entry.replacement}.</span>}
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">Full list, and a tool to check your own model IDs: <Link href="/prices/retirements">retirements tracker</Link>.</p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions">
        <div className="grid gap-3">
          {page.faq.map((entry) => (
            <details key={entry.question} className={`${CARD_CLASS} group py-3`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] group-open:rotate-90">▸</span>
                {entry.question}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            <li>Leaderboards move weekly, and a new model can reorder a job overnight.</li>
            <li>Most numbers here were read through trackers, not the operator&apos;s own page. Confirm before you quote one.</li>
            <li>Benchmarks test narrow tasks. Your own work can behave differently, so check the output.</li>
            <li>Never paste private, client or personal data into a tool without checking its data settings first.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Verified on ${page.checkedOn}. Independent evidence only. Trackers are leads, and operator pages win where both exist.`}>
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-2 text-sm md:grid-cols-2`}>
          {page.sources.map((source) => (
            <li key={source.href}>
              <span className={`${BADGE_CLASS} mr-2`}>{source.kind}</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/corrections">Report a wrong score</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <PageSection id="related" title="Keep reading">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {page.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`${BADGE_CLASS} text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] ${FOCUS_RING}`}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </div>
  );
}