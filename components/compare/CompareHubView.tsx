import Link from "next/link";
import { LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  COMPARE_PAGE_TYPES,
  COMPARE_SECTION_LINKS,
  DIRECTORY_COLUMNS,
  DIRECTORY_NOTES,
  INDEPENDENCE_PROMISE,
  LATEST_TESTS,
  LATEST_TESTS_NOTE,
  RESULT_LABELS,
  SCORECARD_POINTS,
} from "@/lib/compare/compareHubContent";

/** Compare hub: directory first, then the page types, latest tests and the test method. */
export function CompareHubView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Levels 2-4 · Compare
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Compare AI models with dated tests and sourced prices</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Shortlist models in one table, then open a review, a ranking for your use case, a head-to-head test, an app comparison or an alternative.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
          <Link href="/about/how-we-test" className={BUTTON_OUTLINE}>See how we test</Link>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: COMPARE_PAGE_TYPES.length, label: "page types" },
            { value: SCORECARD_POINTS.length, label: "scorecard points" },
            { value: RESULT_LABELS.length, label: "result labels" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Looking for plans and costs? See <Link href="/prices">Prices</Link>. Need help reading a score? Start with{" "}
          <Link href="/learn/expert#evaluation">Evaluation in Level 4</Link>.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {COMPARE_SECTION_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Section id="directory" title="Start with the model directory" intro="One table for every model we cover. Use it to build a shortlist, then open the review.">
        <div className={CARD_CLASS}>
          <h3 className="mt-0">What the table shows</h3>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {DIRECTORY_COLUMNS.map((column) => (
              <li key={column} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm">
                {column}
              </li>
            ))}
          </ul>
          <h3 className="mb-2 mt-6">How to read it</h3>
          <ul className="m-0 grid gap-1 pl-5 text-[var(--color-muted)]">
            {DIRECTORY_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
          </div>
        </div>
      </Section>

      <Section id="page-types" title="Page types" intro="Six ways to compare. Pick the one that matches your question.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {COMPARE_PAGE_TYPES.map((pageType) => (
            <li key={pageType.id}>
              <Link
                href={pageType.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <span className="text-xs font-bold text-[var(--color-accent)]">{pageType.levelLabel}</span>
                <strong className="mt-1 block">{pageType.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{pageType.summary}</span>
                <span className="mt-3 block text-xs text-[var(--color-muted)]">{pageType.entryLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="latest-tests" title="Latest tests" intro="Our own test runs, newest first.">
        <ul className="m-0 grid list-none gap-4 p-0">
          {LATEST_TESTS.map((test) => (
            <li key={test.id} className={`${CARD_CLASS} flex flex-wrap items-start justify-between gap-4`}>
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-[var(--color-accent)]">{test.levelLabel} · Head-to-head</span>
                <strong className="mt-1 block">
                  {test.isPublished ? <Link href={test.href}>{test.title}</Link> : test.title}
                </strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{test.summary}</span>
              </div>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs">
                {test.testedOn ? `Tested on ${test.testedOn}` : "Coming at launch"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{LATEST_TESTS_NOTE}</p>
      </Section>

      <Section id="how-we-test" title="How we test" intro="Every review and head-to-head uses the same method, so results can be compared.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">The seven-point scorecard</h3>
            <ol className="m-0 grid gap-1 pl-5">
              {SCORECARD_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Result labels</h3>
            <ul className="m-0 grid list-none gap-3 p-0">
              {RESULT_LABELS.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span className="block text-sm text-[var(--color-muted)]">{item.meaning}</span>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Each test records the model version, effort setting and test day.</p>
          </div>
        </div>
        <p className="mt-4 text-sm">{INDEPENDENCE_PROMISE}</p>
        <p className="mt-2 text-sm">
          <Link href="/about/how-we-test">Full test method</Link> · <Link href="/about/source-policy">How we choose sources</Link> ·{" "}
          <Link href="/about/independence">Independence and disclosure</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      {/* Next steps */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Not sure where to start?</p>
          <p className="m-0 font-semibold">Answer three questions and get a model type to look at first</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools/which-ai-fits-me" className={BUTTON_OUTLINE}>Which AI fits me?</Link>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Browse the model directory</Link>
        </div>
      </footer>
    </div>
  );
}