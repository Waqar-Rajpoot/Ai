import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING, BADGE_CLASS } from "@/components/shared/pageStyles";
import { BENCHMARK_QUESTIONS } from "@/lib/tools/benchmarkChecklistData";
import {
  BEYOND_CHECKLIST,
  BENCHMARK_TYPES,
  CHART_TRICKS,
  FAQ,
  GLOSSARY,
  GOTCHAS,
  METHOD_NOTES,
  READER_PATHS,
  RELATED_LINKS,
  SHORT_ANSWER,
  SITE_LABELS,
  SIXTY_SECOND_ROUTINE,
  SOURCE_HIERARCHY,
} from "@/lib/tools/benchmarkChecklistContent";
import { BenchmarkChecklist } from "./BenchmarkChecklist";
import { BenchmarkMarginCheck } from "./BenchmarkMarginCheck";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "routine", label: "60-second routine" },
  { id: "checklist", label: "Checklist" },
  { id: "questions", label: "The ten at a glance" },
  { id: "margin-check", label: "Margin check" },
  { id: "types", label: "Benchmark types" },
  { id: "tricks", label: "Chart tricks" },
  { id: "labels", label: "Our labels" },
  { id: "beyond", label: "Beyond scores" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "method", label: "Method" },
] as const;

const NO_PRINT = "print:hidden";
const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS = "bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]";

/** Full Benchmark reading checklist page: checklist, margin check, guides, FAQ and glossary. */
export function BenchmarkChecklistView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className={`relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 ${NO_PRINT}`}>
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 4</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Checklist, not a benchmark</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Printable</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Benchmark reading checklist: ten questions to ask before you trust an AI score</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Answer ten short questions about a benchmark score and see how much weight it deserves. Check whether a gap is real, and print the result.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#checklist" className={BUTTON_PRIMARY}>Start the checklist</a>
          <a href="#margin-check" className={BUTTON_OUTLINE}>Check a gap</a>
        </div>
      </header>

      <nav aria-label="On this page" className={`mt-6 flex flex-wrap gap-2 ${NO_PRINT}`}>
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

      <aside className={`${CARD_CLASS} mt-6 text-sm ${NO_PRINT}`}>
        <p className="m-0 font-semibold">Before you start</p>
        <p className="mb-0 mt-1 text-[var(--color-muted)]">
          This is a Level 4 tool. New to checking claims? Read <Link href="/learn/practitioner/fact-check-ai-answers">How to fact-check AI answers</Link> first, and{" "}
          <Link href="/learn/foundations/how-ai-chatbots-work">How AI chatbots work</Link> for the basics. The full guide is{" "}
          <Link href="/learn/expert/how-to-read-ai-benchmark">How to read an AI benchmark</Link>.
        </p>
      </aside>

      <div className={NO_PRINT}>
        <PageSection id="short-answer" title="The short answer">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
            <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
              {SHORT_ANSWER.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Remember this</p>
              <p className="mb-2 mt-1 text-lg font-semibold">A score is a shortlist, not a verdict.</p>
              <p className="m-0 text-sm">Use scores to decide what to test. Use your own tasks to decide what to use.</p>
            </aside>
          </div>
        </PageSection>

        <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one points to the part of this page you need.">
          <div className="grid gap-6 lg:grid-cols-3">
            {READER_PATHS.map((path) => (
              <article key={path.id} className={CARD_CLASS}>
                <h3 className="mt-0">{path.title}</h3>
                <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
                <ul className="m-0 grid gap-2 pl-5 text-sm">
                  {path.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <p className="mb-0 mt-4 text-sm"><Link href={path.link.href}>{path.link.label}</Link></p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection id="routine" title="The 60-second routine" intro="No time for ten questions? These five checks catch most weak claims.">
          <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
            {SIXTY_SECOND_ROUTINE.map((step, index) => (
              <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
              </li>
            ))}
          </ol>
        </PageSection>
      </div>

      {/* Checklist (prints) */}
      <PageSection id="checklist" title="The checklist" intro="Answer Yes only when you have seen the evidence. Not sure is a fair answer, and it tells you what to look up next.">
        <BenchmarkChecklist />
      </PageSection>

      <div className={NO_PRINT}>
        <PageSection id="questions" title="The ten questions at a glance" intro="Yes is always the reassuring answer. Key questions lower the rating by a step when the answer is No.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className={`${TABLE_CLASS} min-w-[52rem]`}>
              <caption className="sr-only">The ten benchmark questions with the red flag and a quick check for each</caption>
              <thead className={TABLE_HEAD_CLASS}>
                <tr>
                  <th scope="col" className="p-3">#</th>
                  <th scope="col" className="p-3">Question</th>
                  <th scope="col" className="p-3">Red flag</th>
                  <th scope="col" className="p-3">Quick check</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_QUESTIONS.map((question) => (
                  <tr key={question.id} className="border-t border-[var(--color-border)]">
                    <td className="p-3 align-top tabular-nums">{question.number}</td>
                    <th scope="row" className="p-3 text-left align-top font-semibold">
                      {question.shortTitle}
                      {question.isCritical && <span className={`${BADGE_CLASS} ml-2`}>Key</span>}
                      <span className="mt-1 block text-xs font-normal text-[var(--color-muted)]">{question.question}</span>
                    </th>
                    <td className="p-3 align-top">{question.redFlag}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{question.ifUnsure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection id="margin-check" title="Margin check: is the gap bigger than the noise?" intro="Enter two scores and the number of questions or votes behind them. See whether the gap is real on that test.">
          <BenchmarkMarginCheck />
        </PageSection>

        <PageSection id="types" title="Kinds of benchmark and what each can tell you" intro="Each type has a strength and a blind spot. Family names are examples and change over time.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className={`${TABLE_CLASS} min-w-[60rem]`}>
              <caption className="sr-only">Benchmark types with what they measure, strengths and what to watch out for</caption>
              <thead className={TABLE_HEAD_CLASS}>
                <tr>
                  <th scope="col" className="p-3">Type</th>
                  <th scope="col" className="p-3">What it measures</th>
                  <th scope="col" className="p-3">Strength</th>
                  <th scope="col" className="p-3">Watch out for</th>
                  <th scope="col" className="p-3">Examples</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_TYPES.map((row) => (
                  <tr key={row.type} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.type}</th>
                    <td className="p-3 align-top">{row.measures}</td>
                    <td className="p-3 align-top">{row.strength}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.watchOut}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection id="tricks" title="Nine patterns that make a chart look better than it is" intro="These are common ways a fair number gets presented unfairly. They are patterns to check, not accusations.">
          <div className="grid gap-4 md:grid-cols-2">
            {CHART_TRICKS.map((trick) => (
              <article key={trick.pattern} className={CARD_CLASS}>
                <p className="m-0 font-semibold">{trick.pattern}</p>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Check:</strong> {trick.check}</p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection id="labels" title="How this site labels scores" intro="Every number on this site carries one of three labels, a date and a source.">
          <div className="grid gap-6 lg:grid-cols-2">
            <dl className="m-0 grid gap-3">
              {SITE_LABELS.map((entry) => (
                <div key={entry.label} className={CARD_CLASS}>
                  <dt className="font-bold">{entry.label}</dt>
                  <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
                </div>
              ))}
            </dl>
            <div className={CARD_CLASS}>
              <h3 className="mt-0">Which source wins</h3>
              <ol className="m-0 grid gap-2 pl-5 text-sm">
                {SOURCE_HIERARCHY.map((source) => <li key={source}>{source}</li>)}
              </ol>
              <p className="mb-0 mt-3 text-sm">
                <Link href="/about/source-policy">Source policy</Link> · <Link href="/prices/benchmarks">Benchmark digest</Link>
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection id="beyond" title="Beyond the score" intro="A score is one input. These pages cover the rest.">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {BEYOND_CHECKLIST.map((entry) => (
              <li key={entry.href} className={CARD_CLASS}>
                <h3 className="mt-0"><Link href={entry.href}>{entry.title}</Link></h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{entry.note}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="gotchas" title="What can go wrong">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {GOTCHAS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
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

        <PageSection id="glossary" title="Key words" intro="Short definitions. The full list is in the glossary.">
          <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map((entry) => (
              <div key={entry.term} className={CARD_CLASS}>
                <dt className="font-bold">{entry.term}</dt>
                <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
              </div>
            ))}
          </dl>
          <p className="mb-0 mt-3 text-sm"><Link href="/learn/glossary">Open the full glossary</Link></p>
        </PageSection>

        <PageSection id="method" title="Method and related pages" intro="How this checklist works, and where to read more.">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={CARD_CLASS}>
              <h3 className="mt-0">How it works</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {METHOD_NOTES.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </div>
            <div className={CARD_CLASS}>
              <h3 className="mt-0">Related pages</h3>
              <ul className="m-0 grid list-none gap-2 p-0 text-sm">
                {RELATED_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.title}</Link>
                    <span className="text-[var(--color-muted)]"> · {link.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mb-0 mt-4 text-sm"><Link href="/about/corrections">Report a mistake</Link></p>
        </PageSection>

        <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
            <p className="m-0 font-semibold">Read the full guide: how to read an AI benchmark</p>
          </div>
          <Link href="/learn/expert/how-to-read-ai-benchmark" className={BUTTON_PRIMARY}>Open the guide</Link>
        </footer>
      </div>
    </div>
  );
}