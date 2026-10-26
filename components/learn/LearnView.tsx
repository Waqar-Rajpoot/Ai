import Link from "next/link";
import {
  getGlossaryShortcutTerms,
  GLOSSARY_TERM_COUNT,
  HOW_LEVELS_WORK,
  LEVEL_CARDS,
  POPULAR_GUIDES,
  START_HERE_HINTS,
} from "@/lib/learn/learnHubContent";
import { LearnSection as Section } from "./LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

const LEVEL_TAG_CLASS = "shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs font-semibold";
const LINK_CARD_CLASS = `${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`;

/** Learn hub: choose a level, see how levels work, and jump to popular guides, the glossary and the model directory. */
export function LearnView() {
  const glossaryShortcutTerms = getGlossaryShortcutTerms();

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          All levels · Learn
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Learn AI at your own level</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Four levels, from first steps to expert topics. Each guide is dated and sourced, and each level tells you what to read next.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#levels" className={BUTTON_PRIMARY}>Choose your level</a>
          <Link href="/learn/glossary" className={BUTTON_OUTLINE}>Browse the glossary</Link>
        </div>
      </header>

      <Section id="levels" title="Choose your level" intro="Not sure? Start with the line that sounds most like you.">
        <ul className="m-0 mb-6 grid list-none gap-3 p-0 sm:grid-cols-2">
          {START_HERE_HINTS.map((hint) => (
            <li key={hint.id}>
              <Link href={`#level-${hint.level}`} className={`${CARD_CLASS} flex items-center justify-between gap-3 text-[var(--color-text)] no-underline ${FOCUS_RING}`}>
                <span className="text-sm">{hint.situation}</span>
                <span className={LEVEL_TAG_CLASS}>Level {hint.level}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-2">
          {LEVEL_CARDS.map((card) => (
            <li key={card.level} id={`level-${card.level}`} className="scroll-mt-24">
              <article className={`${CARD_CLASS} flex h-full flex-col`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="m-0 text-xl">{card.name}</h3>
                  <span className={LEVEL_TAG_CLASS}>Level {card.level}</span>
                </div>
                <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">For {card.audience}.</p>
                <p className="mb-0 mt-3">
                  <strong>After this level you can:</strong> {card.outcome}
                </p>

                <h4 className="mb-1 mt-4 text-sm">Topics</h4>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {card.topics.map((topic) => (
                    <li key={topic} className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                      {topic}
                    </li>
                  ))}
                </ul>

                <h4 className="mb-1 mt-4 text-sm">Self-check</h4>
                <ul className="m-0 grid gap-1 pl-5 text-sm">
                  {card.selfCheckPrompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <span className="text-sm text-[var(--color-muted)]">
                    {card.guideCount} {card.guideCount === 1 ? "guide" : "guides"}
                    {card.linkedCount > 0 && ` + ${card.linkedCount} linked ${card.linkedCount === 1 ? "comparison" : "comparisons"}`}
                  </span>
                  <Link href={card.hubHref} className={BUTTON_PRIMARY}>
                    Open Level {card.level}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-levels-work" title="How levels work" intro="Three features help you find the right page and move up when you are ready.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {HOW_LEVELS_WORK.map((item) => (
            <li key={item.id}>
              <div className={`${CARD_CLASS} h-full`}>
                <strong className="block">{item.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="popular-guides" title="Popular guides" intro="Good places to start. Each shows its level.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {POPULAR_GUIDES.map((guide) => (
            <li key={guide.number}>
              <Link href={guide.href} className={LINK_CARD_CLASS}>
                <span className={LEVEL_TAG_CLASS}>Level {guide.level}</span>
                <strong className="mt-2 block">{guide.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="glossary" title="Glossary" intro={`${GLOSSARY_TERM_COUNT} plain-English definitions, each tagged by level and linked to the guide that explains it.`}>
        <div className={`${CARD_CLASS} flex flex-wrap items-center justify-between gap-4`}>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {glossaryShortcutTerms.map((entry: any) => {
              const termIdentifier = entry.slug || entry.id || entry.term;
              return (
                <li key={termIdentifier}>
                  <Link
                    href={`/learn/glossary#${termIdentifier}`}
                    className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
                  >
                    {entry.term}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/learn/glossary" className={BUTTON_OUTLINE}>Open the glossary</Link>
        </div>
      </Section>

      <Section id="compare-models" title="Compare models">
        <div className={`${CARD_CLASS} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 font-semibold">Ready to choose a model?</p>
            <p className="m-0 text-sm text-[var(--color-muted)]">See named models side by side, with dated prices and test results.</p>
          </div>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Browse the model directory</Link>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying.
        </p>
      </Section>
    </div>
  );
}