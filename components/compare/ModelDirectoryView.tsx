import Link from "next/link";
import { DIRECTORY_SCORES_AS_OF, formatIsoDate, formatMonthDay, formatPricePair, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { FRESHNESS_LABELS } from "@/lib/compare/compareStandards";
import {
  COLUMN_GUIDE,
  DIRECTORY_FAQ,
  RANKING_CHECKS,
  READING_TIPS,
  SUBSCRIPTION_VS_API_NOTE,
  UPDATE_RULES,
} from "@/lib/compare/modelDirectoryContent";
import { getDirectoryStatItems, getIntroRateModels } from "@/lib/compare/modelStats";
import { LearnSection as Section } from "../learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { DefinitionList } from "./DefinitionList";
import { FaqList } from "./FaqList";
import { ModelDirectoryTable } from "./ModelDirectoryTable";
import { ModelShortlist } from "./ModelShortlist";
import { StatStrip } from "./StatStrip";
import { TaskCostTable } from "./TaskCostTable";

const PAGE_LINKS: readonly { id: string; label: string }[] = [
  { id: "shortlist", label: "Quick shortlist" },
  { id: "table", label: "Table" },
  { id: "task-cost", label: "Cost per task" },
  { id: "how-to-read", label: "How to read it" },
  { id: "intro-rates", label: "Intro rates" },
  { id: "sources", label: "Sources and labels" },
  { id: "ranking-note", label: "Ranking note" },
  { id: "updates", label: "Updates" },
  { id: "faq", label: "FAQ" },
];

/** Model directory page: shortlist, table, cost per task, reading guide, sources, ranking note, updates and FAQ. */
export function ModelDirectoryView() {
  const scoresAsOf = formatIsoDate(DIRECTORY_SCORES_AS_OF);
  const introRateModels = getIntroRateModels(MODEL_DIRECTORY_ROWS);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Levels 2-4 · Compare
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Model directory</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Named AI models side by side: API price, context size, independent score and best use. Use it to build a shortlist, then confirm with a review or your own test.
        </p>
        <StatStrip items={getDirectoryStatItems(MODEL_DIRECTORY_ROWS)} />
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          BenchLM scores as of {scoresAsOf}. Prices and features change. Confirm on the provider&apos;s website before buying.
        </p>
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {PAGE_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Section id="shortlist" title="Quick shortlist" intro="Not sure where to start? One pick per need, based on the 'best for' label in the table below. These are starting points, not test results.">
        <ModelShortlist />
      </Section>

      <Section id="table" title="Table" intro="Search, filter or change the sort order. Scroll sideways on a small screen.">
        <ModelDirectoryTable />
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Verified on {scoresAsOf} (BenchLM scores). Review links appear as each review is published.
        </p>
      </Section>

      <Section id="task-cost" title="What one task costs" intro="Price per million tokens is hard to picture. Pick an example task, or type your own token counts, to see what each model would charge at list price.">
        <TaskCostTable />
        <ul className="mb-0 mt-4 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
          <li>The example token counts are illustrations, not our test tasks. Our own cost-per-task figures come from our test battery.</li>
          <li>Models that think before answering can use extra output tokens on some services, which raises the cost.</li>
          <li>Prices shown are list prices, including any introductory or off-peak rate noted in the last column.</li>
        </ul>
        <p className="mb-0 mt-3 text-sm">
          Learn how this works in <Link href="/learn/power-user/ai-api-pricing-for-non-engineers">AI API pricing for non-engineers</Link>, or see the <Link href="/prices/api">API price table</Link>.
        </p>
      </Section>

      <Section id="how-to-read" title="How to read this table" intro="Four things to keep in mind, then a guide to every column.">
        <DefinitionList items={READING_TIPS} />
        <h3 className="mb-3 mt-8">Column guide</h3>
        <DefinitionList items={COLUMN_GUIDE} />
        <div className={`${CARD_CLASS} mt-6 border-amber-500/60`}>
          <p className="m-0 font-semibold">Subscription is not an API</p>
          <p className="mb-0 mt-1 text-sm">{SUBSCRIPTION_VS_API_NOTE}</p>
          <p className="mb-0 mt-3 text-sm">
            <Link href="/prices/plans">Consumer plan prices</Link> · <Link href="/learn/foundations/free-vs-paid-ai">Free vs paid AI</Link>
          </p>
        </div>
      </Section>

      <Section id="intro-rates" title="Intro rates to watch" intro="These prices are introductory. Check what they cost after the end date before you build on them.">
        {introRateModels.length === 0 ? (
          <p className="m-0 text-[var(--color-muted)]">No introductory rates are listed right now.</p>
        ) : (
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
            {introRateModels.map((row) => (
              <li key={row.id}>
                <div className={`${CARD_CLASS} h-full`}>
                  <strong className="block">{row.name}</strong>
                  <span className="mt-1 block text-sm text-[var(--color-muted)]">
                    {formatPricePair(row)} per million tokens, intro rate to {row.introRateEndsOn ? formatMonthDay(row.introRateEndsOn) : "an unconfirmed date"}.
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          End dates are checked again close to each update. Always confirm on the provider&apos;s own pricing page.
        </p>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Every number on this page carries a date and a label.">
        <DefinitionList items={FRESHNESS_LABELS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <ul className="m-0 grid gap-2 pl-5">
            <li><strong>Verified on:</strong> {scoresAsOf}, the date the BenchLM scores were read.</li>
            <li><strong>Independent third party:</strong> BenchLM is an independent composite.</li>
            <li>
              <strong>Vendor-reported:</strong> numbers from a maker&apos;s own announcement are never mixed into this table. They sit in the separate table on the <Link href="/prices/benchmarks">benchmark digest</Link>.
            </li>
          </ul>
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/how-we-test">How we test</Link>
          </p>
        </div>
      </Section>

      <Section id="ranking-note" title="Ranking note">
        <div className={CARD_CLASS}>
          <p className="m-0">
            Human-preference arenas such as LMArena rank models from head-to-head votes. When you read one, check these four things:
          </p>
          <ul className="mb-0 mt-3 grid gap-1 pl-5">
            {RANKING_CHECKS.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
          <p className="mb-0 mt-3 text-sm">
            Read more in <Link href="/learn/expert/how-to-read-ai-benchmark">How to read an AI benchmark</Link>, or use the <Link href="/tools/benchmark-checklist">benchmark reading checklist</Link>.
          </p>
        </div>
      </Section>

      <Section id="updates" title="How this table stays current" intro="The directory changes only when we edit it. Nothing is fetched live.">
        <DefinitionList items={UPDATE_RULES} />
        <p className="mb-0 mt-4 text-sm">
          See what changed on the <Link href="/news/changelog">changelog</Link>, or read the <Link href="/news/weekly">weekly roundup</Link>.
        </p>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={DIRECTORY_FAQ} />
      </Section>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Want more detail?</p>
          <p className="m-0 font-semibold">Read the reviews, or compare by use case</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare/best" className={BUTTON_OUTLINE}>Best-for roundups</Link>
          <Link href="/compare/open-vs-closed" className={BUTTON_OUTLINE}>Open vs closed</Link>
          <Link href="/compare/reviews" className={BUTTON_PRIMARY}>Browse the reviews</Link>
        </div>
      </footer>
    </div>
  );
}