import Link from "next/link";
import { RESULT_LABELS } from "@/lib/compare/compareStandards";
import {
  HEAD_TO_HEAD_FAQ,
  HOW_TO_READ_A_MATCHUP,
  HOW_WE_RUN,
  HOW_WINNERS_ARE_PICKED,
  IDEA_SELECTION_RULES,
  MATCHUP_LIMITS,
  MATCHUP_SECTIONS,
  MATCHUP_UPDATE_RULES,
  READER_PATHS,
  REQUEST_CHECKLIST,
  TASK_AREAS,
  WHEN_NOT_TO_USE,
} from "@/lib/compare/headToHeadContent";
import { getHeadToHeadStatItems, MATCHUPS, TASKS_PER_MATCHUP } from "@/lib/compare/matchups";
import { DIRECTORY_SCORES_AS_OF, formatIsoDate, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { LearnSection as Section } from "../learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { DefinitionList } from "./DefinitionList";
import { FaqList } from "./FaqList";
import { MatchupCard } from "./MatchupCard";
import { MatchupIdeas } from "./MatchupIdeas";
import { PairCompare } from "./PairCompare";
import { StatStrip } from "./StatStrip";

const PAGE_LINKS: readonly { id: string; label: string }[] = [
  { id: "which-page", label: "Which page?" },
  { id: "matchups", label: "All matchups" },
  { id: "on-paper", label: "Compare on paper" },
  { id: "ideas", label: "Matchup ideas" },
  { id: "inside", label: "Inside a matchup" },
  { id: "how-we-run", label: "How we run one" },
  { id: "winners", label: "How winners are picked" },
  { id: "how-to-read", label: "How to read one" },
  { id: "limits", label: "Limits" },
  { id: "freshness", label: "Staying fresh" },
  { id: "request", label: "Request a matchup" },
  { id: "faq", label: "FAQ" },
];

/** Head-to-head hub: reader guide, all matchups, on-paper comparison, method, scoring, freshness, requests and FAQ. */
export function HeadToHeadView() {
  const scoresAsOf = formatIsoDate(DIRECTORY_SCORES_AS_OF);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 3 · Compare
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Head-to-head: two models, one test day</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          When you have narrowed the choice to two models, a head-to-head gives them the same {TASKS_PER_MATCHUP} everyday tasks on the same day, names a winner for each task and shows what each costs.
        </p>
        <StatStrip items={getHeadToHeadStatItems(MATCHUPS, MODEL_DIRECTORY_ROWS)} />
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#matchups" className={BUTTON_PRIMARY}>See the matchups</a>
          <a href="#on-paper" className={BUTTON_OUTLINE}>Compare two models on paper</a>
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

      <Section id="which-page" title="Is a head-to-head what you need?" intro="Compare has six kinds of page. Find the line that sounds like your question.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <li key={path.id}>
              <Link
                href={path.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <span className="block text-sm text-[var(--color-muted)]">{path.question}</span>
                <strong className="mt-1 block">{path.pageLabel}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{path.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="matchups" title="All matchups" intro="Each matchup is a full test of two named models. More are added after launch.">
        <ul className="m-0 grid list-none gap-4 p-0">
          {MATCHUPS.map((matchup) => (
            <li key={matchup.id}>
              <MatchupCard matchup={matchup} />
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Want a different pair? See <a href="#request">Request a matchup</a>.
        </p>
      </Section>

      <Section id="on-paper" title="Compare any two models on paper" intro="Not ready to wait for a full matchup? See how two directory models line up on list price, the cost of an example task and the independent score.">
        <PairCompare />
        <ul className="mb-0 mt-4 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
          <li>This is not a test. It shows where a model leads on price and on its independent score, not how it handles your tasks.</li>
          <li>A score is only compared when both models have a ranked score. Estimated or missing scores are shown but not compared.</li>
          <li>Prices are list prices. Intro-rate and off-peak conditions appear in the last row.</li>
        </ul>
      </Section>

      <Section id="ideas" title="Matchup ideas" intro="Pairs from different makers with the same list price, so quality is the only open question. These are ideas, not scheduled tests.">
        <MatchupIdeas />
        <div className={`${CARD_CLASS} mt-6`}>
          <p className="m-0 font-semibold">How these pairs are chosen</p>
          <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
            {IDEA_SELECTION_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="inside" title="Inside a matchup" intro="Every matchup page uses the same six sections, so you always know where to look.">
        <DefinitionList items={MATCHUP_SECTIONS} />
      </Section>

      <Section id="how-we-run" title="How we run a matchup" intro="The rules that keep it fair.">
        <DefinitionList items={HOW_WE_RUN} />
        <h3 className="mb-3 mt-8">What the ten tasks draw on</h3>
        <DefinitionList items={TASK_AREAS} />
        <p className="mb-0 mt-4 text-sm">
          The exact ten tasks are published on each matchup page. See the full method on <Link href="/about/how-we-test">How we test</Link>.
        </p>
        <h3 className="mb-3 mt-8">Labels on every result</h3>
        <DefinitionList items={RESULT_LABELS} />
      </Section>

      <Section id="winners" title="How winners are picked">
        <DefinitionList items={HOW_WINNERS_ARE_PICKED} />
      </Section>

      <Section id="how-to-read" title="How to read a matchup">
        <DefinitionList items={HOW_TO_READ_A_MATCHUP} />
        <div className={`${CARD_CLASS} mt-6`}>
          <p className="m-0 font-semibold">Want to check a result yourself?</p>
          <p className="mb-0 mt-1 text-sm">
            Pick ten real tasks, run them on both models and compare. <Link href="/learn/power-user/build-your-own-ai-test-set">Build your own AI test set</Link>.
          </p>
        </div>
      </Section>

      <Section id="limits" title="Limits, and when to use something else">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <p className="m-0 font-semibold">What a matchup cannot tell you</p>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {MATCHUP_LIMITS.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <p className="m-0 font-semibold">Use another page when</p>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {WHEN_NOT_TO_USE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="freshness" title="How matchups stay fresh" intro="Matchups change only when we edit them. Nothing is fetched live.">
        <DefinitionList items={MATCHUP_UPDATE_RULES} />
        <p className="mb-0 mt-4 text-sm">
          See what changed on the <Link href="/news/changelog">changelog</Link>, or read the <Link href="/news/weekly">weekly roundup</Link>.
        </p>
      </Section>

      <Section id="request" title="Request a matchup" intro="Tell us which two models you are stuck between. Requests help us choose what to test next.">
        <div className={CARD_CLASS}>
          <p className="m-0 font-semibold">Include in your message</p>
          <ul className="mb-0 mt-2 grid gap-1 pl-5">
            {REQUEST_CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/contact" className={BUTTON_PRIMARY}>Request a matchup</Link>
            <span className="text-sm text-[var(--color-muted)]">We cannot promise every request, but each one is read.</span>
          </div>
        </div>
      </Section>

      <Section id="independence" title="Independence">
        <div className={CARD_CLASS}>
          <p className="m-0">
            Payment never changes a score or verdict. Affiliate links are always disclosed, sponsored content is kept apart from matchups, and makers get no pre-publication access.
          </p>
          <p className="mb-0 mt-3 text-sm">
            <Link href="/about/independence">Independence and disclosure</Link> · <Link href="/about/editorial-standards">Editorial standards</Link> · <Link href="/about/corrections">Corrections log</Link>
          </p>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={HEAD_TO_HEAD_FAQ} />
      </Section>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Not sure about a pair yet?</p>
          <p className="m-0 font-semibold">Start with the shortlist, or read a full review</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare" className={BUTTON_OUTLINE}>Back to Compare</Link>
          <Link href="/compare/best" className={BUTTON_OUTLINE}>Best-for roundups</Link>
          <Link href="/compare/reviews" className={BUTTON_PRIMARY}>Browse the reviews</Link>
        </div>
      </footer>
    </div>
  );
}