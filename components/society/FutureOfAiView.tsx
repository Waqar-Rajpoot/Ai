import Link from "next/link";
import { FaqList } from "@/components/compare/FaqList";
import { RelatedLinks } from "@/components/compare/RelatedLinks";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  FORECASTS_SHIFTED_TABLE,
  FUTURE_OF_AI_AUTHOR,
  FUTURE_OF_AI_CHECKED_ON,
  FUTURE_OF_AI_FAQ,
  FUTURE_OF_AI_READ_MINUTES,
  FUTURE_OF_AI_RELATED,
  FUTURE_OF_AI_SECTIONS,
  FUTURE_OF_AI_SOURCES,
  FUTURE_OF_AI_WHAT_CAN_GO_WRONG,
  HABITS_CHECKLIST,
  KEY_NUMBERS,
  LEGEND_TABLE,
  READER_LINKS,
  READER_TABLE,
  RULES_OF_THE_PAGE,
  SHORT_ANSWER_POINTS,
  SIGNALS_TABLE,
} from "@/lib/society/futureOfAiContent";
import { FORCES } from "@/lib/society/forces";
import { ForceCard } from "./ForceCard";
import { ScenarioExplorer } from "./ScenarioExplorer";

/** Article 36: the future of AI, told through six forces, a signals table and three scenarios. */
export function FutureOfAiView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          All levels · Explainer
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">The future of AI: six forces to watch to 2030</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          No one knows how AI will unfold. This page shows what the data says today, what is still unknown, and which signals will tell you which way things are heading.
        </p>
        <p className="relative mb-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
          <span>By {FUTURE_OF_AI_AUTHOR}</span>
          <span>Figures checked {FUTURE_OF_AI_CHECKED_ON}</span>
          <span>{FUTURE_OF_AI_READ_MINUTES} min read</span>
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#six-forces" className={BUTTON_PRIMARY}>See the six forces</a>
          <a href="#scenarios" className={BUTTON_OUTLINE}>See the three scenarios</a>
        </div>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {FUTURE_OF_AI_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <Section id="short-answer" title="The short answer">
        <dl className="m-0 grid gap-4 sm:grid-cols-2">
          {SHORT_ANSWER_POINTS.map((point) => (
            <div key={point.id} className={CARD_CLASS}>
              <dt className="font-bold">{point.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{point.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="how-to-read" title="How to read this page" intro="Four rules apply to every figure here, and each figure carries a label.">
        <div className={CARD_CLASS}>
          <CheckList items={RULES_OF_THE_PAGE} mark="✓" />
        </div>
        <div className="mt-6">
          <ComparisonTable {...LEGEND_TABLE} />
        </div>
      </Section>

      <Section id="where-we-stand" title="Where we stand today" intro="One number per force, each with its source and date. The sections below give the context.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_NUMBERS.map((item) => (
            <li key={item.id} className={CARD_CLASS}>
              <p className="m-0 text-2xl font-extrabold">{item.value}</p>
              <p className="mb-2 mt-1 text-sm">{item.label}</p>
              <p className="m-0 text-xs text-[var(--color-muted)]">
                {item.kind} · {item.source} · {item.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="six-forces" title="The six forces" intro="Each force shows what we know, what we do not, the upside and the risk, and the signals to watch. Open 'Go deeper' for the technical layer.">
        <nav aria-label="The six forces" className="mb-6 flex flex-wrap gap-2">
          {FORCES.map((force) => (
            <a
              key={force.id}
              href={`#${force.id}`}
              className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
            >
              {force.number}. {force.title}
            </a>
          ))}
        </nav>
        <div className="grid gap-6">
          {FORCES.map((force) => (
            <ForceCard key={force.id} force={force} />
          ))}
        </div>
      </Section>

      <Section id="signals" title="Signals to watch" intro="These sources update on their own schedules. A change in one of them is a reason to revisit your plans, not a verdict.">
        <ComparisonTable {...SIGNALS_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Weekly scores are in the <Link href="/prices/benchmarks">benchmark digest</Link>, and rule changes are in the <Link href="/news/eu-ai-act">EU AI Act timeline</Link>.
        </p>
      </Section>

      <Section id="scenarios" title="Three scenarios" intro="Scenarios are stories built to test ideas. They are frameworks, not forecasts. Each one lists the evidence today that fits and does not fit.">
        <ScenarioExplorer />
      </Section>

      <Section id="for-you" title="What it means for you" intro="The same forces matter differently depending on who you are.">
        <ComparisonTable {...READER_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Start with:{" "}
          {READER_LINKS.map((link, index) => (
            <span key={link.href}>
              {index > 0 && " · "}
              <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
        </p>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Habits that hold up in any scenario</h3>
          <CheckList items={HABITS_CHECKLIST} mark="✓" />
        </div>
      </Section>

      <Section id="forecasts-shift" title="Frameworks, not forecasts" intro="Four examples show why a single number should never be treated as settled.">
        <ComparisonTable {...FORECASTS_SHIFTED_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          This page is general information. It is not financial, legal or career advice, and none of the scenarios is a prediction.
        </p>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={FUTURE_OF_AI_FAQ} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {FUTURE_OF_AI_WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Official means a government or central-bank body. Independent third party means an outside group that publishes its own work. Secondary sources are leads, not the final word.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {FUTURE_OF_AI_SOURCES.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.label}</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.publisher}: {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/news/changelog">Changelog</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <RelatedLinks items={FUTURE_OF_AI_RELATED} />
      </Section>

      {/* Previous and next */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next in AI &amp; Society</p>
          <p className="m-0 font-semibold">How much power does AI use?</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
            Want the signals as they change? <Link href="/newsletter">Get the weekly roundup</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/society" className={BUTTON_OUTLINE}>Back to AI &amp; Society</Link>
          <Link href="/society/ai-power-use" className={BUTTON_PRIMARY}>Continue</Link>
        </div>
      </footer>
    </div>
  );
}