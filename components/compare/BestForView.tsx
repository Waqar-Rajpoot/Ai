import Link from "next/link";
import { FRESHNESS_LABELS, RESULT_LABELS } from "@/lib/compare/compareStandards";
import {
  getBestForStatItems,
  getRoundupsByGroup,
  ROUNDUP_GROUPS,
  ROUNDUPS,
} from "@/lib/compare/bestFor";
import {
  BEST_FOR_FAQ,
  HOW_WE_RANK,
  RANKING_LIMITS,
  ROUNDUP_TEMPLATE_SECTIONS,
  ROUNDUP_UPDATE_RULES,
  SUPERSEDED_RULES,
} from "@/lib/compare/bestForContent";
import { DIRECTORY_SCORES_AS_OF, formatIsoDate, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { LearnSection as Section } from "../learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { DefinitionList } from "./DefinitionList";
import { FaqList } from "./FaqList";
import { RoundupCard } from "./RoundupCard";
import { RoundupGlanceTable } from "./RoundupGlanceTable";
import { StatStrip } from "./StatStrip";

const PAGE_LINKS: readonly { id: string; label: string }[] = [
  { id: "glance", label: "At a glance" },
  ...ROUNDUP_GROUPS.map((group) => ({ id: `group-${group.id}`, label: group.title })),
  { id: "how-we-rank", label: "How we rank" },
  { id: "inside", label: "Inside a roundup" },
  { id: "freshness", label: "Staying fresh" },
  { id: "superseded", label: "Superseded models" },
  { id: "faq", label: "FAQ" },
];

/** Best-for hub: all roundups by group, how we rank, what a roundup contains, freshness rules and FAQ. */
export function BestForView() {
  const scoresAsOf = formatIsoDate(DIRECTORY_SCORES_AS_OF);
  const groupedRoundups = getRoundupsByGroup(ROUNDUPS, ROUNDUP_GROUPS);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Levels 2-3 · Compare
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Best AI models by use</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Thirteen roundups, each answering one question: coding, writing, agents, value, local use and more. Rankings are tied to a use case, dated and checked monthly.
        </p>
        <StatStrip items={getBestForStatItems(ROUNDUPS, MODEL_DIRECTORY_ROWS)} />
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#group-start" className={BUTTON_PRIMARY}>Start with the quick answers</a>
          <Link href="/compare/models" className={BUTTON_OUTLINE}>Open the model directory</Link>
        </div>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Directory scores as of {scoresAsOf}. Prices and features change. Confirm on the provider&apos;s website before buying.
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

      <Section id="glance" title="All roundups at a glance" intro="Every roundup in one table. Starting points come from the model directory and are not final rankings.">
        <RoundupGlanceTable />
      </Section>

      {groupedRoundups.map(({ group, roundups }) => (
        <Section key={group.id} id={`group-${group.id}`} title={group.title} intro={group.intro}>
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {roundups.map((roundup) => (
              <li key={roundup.id}>
                <RoundupCard roundup={roundup} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section id="how-we-rank" title="How we rank" intro="The same rules apply to every roundup.">
        <DefinitionList items={HOW_WE_RANK} />
        <div className={`${CARD_CLASS} mt-6`}>
          <p className="m-0 font-semibold">Dates on this hub</p>
          <ul className="mb-0 mt-2 grid gap-2 pl-5 text-sm">
            <li><strong>Verified on:</strong> {scoresAsOf}, the date the directory&apos;s BenchLM scores were read.</li>
            <li><strong>Tested on:</strong> no test run is published yet, so until each roundup shows its own test date, the starting points here rest on independent scores only.</li>
          </ul>
        </div>
        <div className={`${CARD_CLASS} mt-6 border-amber-500/60`}>
          <p className="m-0 font-semibold">What a ranking cannot tell you</p>
          <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
            {RANKING_LIMITS.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </div>
        <h3 className="mb-3 mt-8">Labels on every number</h3>
        <DefinitionList items={RESULT_LABELS} />
        <h3 className="mb-3 mt-8">Date labels</h3>
        <DefinitionList items={FRESHNESS_LABELS} />
        <p className="mb-0 mt-4 text-sm">
          <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/source-policy">Source policy</Link>
        </p>
      </Section>

      <Section id="inside" title="Inside a roundup" intro="Every roundup page uses the same seven sections, so you always know where to look.">
        <DefinitionList items={ROUNDUP_TEMPLATE_SECTIONS} />
      </Section>

      <Section id="freshness" title="How roundups stay fresh" intro="Rankings change only when we edit them. Nothing is fetched live.">
        <DefinitionList items={ROUNDUP_UPDATE_RULES} />
        <p className="mb-0 mt-4 text-sm">
          See what changed on the <Link href="/news/changelog">changelog</Link>, or read the <Link href="/news/weekly">weekly roundup</Link>.
        </p>
      </Section>

      <Section id="superseded" title="Superseded models">
        <div className={CARD_CLASS}>
          <ul className="m-0 grid gap-2 pl-5">
            {SUPERSEDED_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mb-0 mt-3 text-sm">
            Spot a stale pick? <Link href="/about/corrections">Report an error</Link>.
          </p>
        </div>
      </Section>

      <Section id="independence" title="Independence">
        <div className={CARD_CLASS}>
          <p className="m-0">
            Payment never changes a score or verdict. Affiliate links are always disclosed, sponsored content is kept apart from reviews, and makers get no pre-publication access.
          </p>
          <p className="mb-0 mt-3 text-sm">
            <Link href="/about/independence">Independence and disclosure</Link> · <Link href="/about/editorial-standards">Editorial standards</Link>
          </p>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={BEST_FOR_FAQ} />
      </Section>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Want to go deeper?</p>
          <p className="m-0 font-semibold">Read a full review, or test two models head to head</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare" className={BUTTON_OUTLINE}>Back to Compare</Link>
          <Link href="/compare/vs" className={BUTTON_OUTLINE}>Head-to-head tests</Link>
          <Link href="/compare/reviews" className={BUTTON_PRIMARY}>Browse the reviews</Link>
        </div>
      </footer>
    </div>
  );
}