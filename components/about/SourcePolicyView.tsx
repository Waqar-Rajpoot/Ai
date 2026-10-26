import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { SOURCE_POLICY_UPDATED_ON } from "@/lib/about/sourcePolicyConstants";
import {
  CITE_US_FORMAT,
  CONFLICT_EXAMPLES,
  EVALUATOR_CRITERIA,
  FAQ,
  GLOSSARY,
  GOTCHAS,
  HIERARCHY_LEVELS,
  LABEL_GROUPS,
  METHOD_NOTES,
  NOT_USED,
  PAGE_SOURCE_MAP,
  READER_PATHS,
  RELATED_LINKS,
  RESOLUTION_STEPS,
  SHORT_ANSWER,
  SOCIETY_NOTE,
  SOURCE_LINE_EXAMPLE,
  SOURCE_LINE_PARTS,
  UPDATE_CADENCE,
  VENDOR_RULES,
} from "@/lib/about/sourcePolicyContent";
import { SourceChecker } from "./SourceChecker";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "hierarchy", label: "Source hierarchy" },
  { id: "checker", label: "Source checker" },
  { id: "labels", label: "Labels" },
  { id: "source-line", label: "Reading a source line" },
  { id: "vendor", label: "Vendor-reported numbers" },
  { id: "conflicts", label: "Resolving conflicts" },
  { id: "not-used", label: "What we don't use" },
  { id: "page-map", label: "What backs each page" },
  { id: "cadence", label: "When sources change" },
  { id: "evaluators", label: "Independent evaluators" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "method", label: "Method" },
] as const;

const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS = "bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]";

/** Full Source policy page: hierarchy, labels, conflict rules, checker, page map, FAQ and glossary. */
export function SourcePolicyView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Applies to every page</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Updated {SOURCE_POLICY_UPDATED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Source policy: where our numbers come from, and what we do when sources disagree</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Every price, date, score and statistic here has a named source, a date and a label. This page explains the rules, so you can check our work.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#hierarchy" className={BUTTON_PRIMARY}>See the hierarchy</a>
          <a href="#checker" className={BUTTON_OUTLINE}>Check a source</a>
        </div>
      </header>

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

      {/* Short answer */}
      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SHORT_ANSWER.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Our promise</p>
            <p className="mb-2 mt-1 text-lg font-semibold">Payment never changes a score, a verdict or which source we use.</p>
            <p className="m-0 text-sm">See <Link href="/about/independence">Independence and disclosure</Link>.</p>
          </aside>
        </div>
      </PageSection>

      {/* Reader paths */}
      <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one points to the part of this page you need.">
        <div className="grid gap-6 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <article key={path.id} className={CARD_CLASS}>
              <h3 className="mt-0">{path.title}</h3>
              <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {path.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="mb-0 mt-4 text-sm">
                {path.link.href.startsWith("#") ? <a href={path.link.href}>{path.link.label}</a> : <Link href={path.link.href}>{path.link.label}</Link>}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Hierarchy */}
      <PageSection id="hierarchy" title="Source hierarchy" intro="We use the first source that answers the question. Higher levels win for the questions they can answer.">
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {HIERARCHY_LEVELS.map((level) => (
            <li key={level.rank} className={CARD_CLASS}>
              <p className="m-0 flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{level.rank}</span>
                <span className="text-lg font-bold">{level.title}</span>
              </p>
              <p className="mb-2 mt-2 text-sm text-[var(--color-muted)]">{level.whatCounts}</p>
              <p className="m-0 text-sm font-semibold">How we use it</p>
              <ul className="mb-2 mt-1 grid gap-1 pl-5 text-sm">
                {level.howWeUse.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="m-0 text-sm font-semibold">Limits</p>
              <ul className="mb-2 mt-1 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
                {level.limits.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="m-0 text-xs text-[var(--color-muted)]">Label you will see: {level.label}</p>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">{SOCIETY_NOTE}</p>
      </PageSection>

      {/* Checker */}
      <PageSection id="checker" title="Source checker: how would we treat this source?" intro="Pick a kind of source and the kind of claim you want to use it for. See how we would treat it, and what to check next.">
        <SourceChecker />
      </PageSection>

      {/* Labels */}
      <PageSection id="labels" title="The labels you will see" intro="Three families of label tell you who produced a number, how fresh it is and how closely we read the source.">
        <div className="grid gap-6">
          {LABEL_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="mb-1 mt-0">{group.title}</h3>
              <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{group.intro}</p>
              <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
                <table className={`${TABLE_CLASS} min-w-[40rem]`}>
                  <caption className="sr-only">{group.title}</caption>
                  <thead className={TABLE_HEAD_CLASS}>
                    <tr>
                      <th scope="col" className="p-3">Label</th>
                      <th scope="col" className="p-3">What it means</th>
                      <th scope="col" className="p-3">Where you see it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.entries.map((entry) => (
                      <tr key={entry.label} className="border-t border-[var(--color-border)]">
                        <th scope="row" className="p-3 text-left align-top font-semibold">{entry.label}</th>
                        <td className="p-3 align-top">{entry.meaning}</td>
                        <td className="p-3 align-top text-[var(--color-muted)]">{entry.whereSeen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Source line */}
      <PageSection id="source-line" title="How to read a source line" intro="Under each table and claim you will find a line like this one.">
        <div className={`${CARD_CLASS} border-[var(--color-accent)]`}>
          <p className="m-0 text-sm font-semibold">Example</p>
          <p className="mb-0 mt-1 text-lg">{SOURCE_LINE_EXAMPLE}</p>
        </div>
        <dl className="m-0 mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCE_LINE_PARTS.map((part) => (
            <div key={part.part} className={CARD_CLASS}>
              <dt className="font-bold">{part.part}</dt>
              <dd className="m-0 mt-1 text-xs text-[var(--color-accent)]">{part.example}</dd>
              <dd className="m-0 mt-2 text-sm text-[var(--color-muted)]">{part.meaning}</dd>
            </div>
          ))}
        </dl>
        <div className={`${CARD_CLASS} mt-4`}>
          <h3 className="mt-0">How to cite us</h3>
          <p className="mb-0 mt-1 text-sm">{CITE_US_FORMAT}</p>
        </div>
      </PageSection>

      {/* Vendor */}
      <PageSection id="vendor" title="Vendor-reported numbers: labelling and separate tables" intro="A maker's own numbers are useful, and they are not independent. We keep them apart.">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
            {VENDOR_RULES.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
          <aside className={CARD_CLASS}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Why</p>
            <p className="mb-2 mt-1 text-sm">Makers choose which tests, settings and results to show. A number can be accurate and still flatter the model.</p>
            <p className="m-0 text-sm">
              Learn to read a score with the <Link href="/tools/benchmark-checklist">benchmark reading checklist</Link>, or see both kinds in the <Link href="/prices/benchmarks">benchmark digest</Link>.
            </p>
          </aside>
        </div>
      </PageSection>

      {/* Conflicts */}
      <PageSection id="conflicts" title="Resolving conflicts: provider-level resolution and the changelog note" intro="When two sources disagree, we follow the same six steps.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {RESOLUTION_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Scores are different. Two evaluators measuring performance are not in conflict about a fact, so we show both with their labels and never merge them.
        </p>

        <h3 className="mb-3 mt-8">Worked examples</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {CONFLICT_EXAMPLES.map((example) => (
            <article key={example.pattern} className={CARD_CLASS}>
              <p className="m-0 font-semibold">{example.pattern}</p>
              <p className="mb-0 mt-2 text-sm"><strong>What we do:</strong> {example.whatWeDo}</p>
              <p className="mb-0 mt-3 text-sm"><Link href={example.link.href}>{example.link.label}</Link></p>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Examples are simplified patterns, not a record of specific cases. Real cases are in the <Link href="/news/changelog">changelog</Link>.</p>
      </PageSection>

      {/* Not used */}
      <PageSection id="not-used" title="What we do not use as a source">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {NOT_USED.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </PageSection>

      {/* Page map */}
      <PageSection id="page-map" title="What backs each page" intro="The main source type for each kind of page, and how often it is checked.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[52rem]`}>
            <caption className="sr-only">Main source and update frequency for each data page</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Page</th>
                <th scope="col" className="p-3">Main source</th>
                <th scope="col" className="p-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {PAGE_SOURCE_MAP.map((row) => (
                <tr key={row.href} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><Link href={row.href}>{row.page}</Link></th>
                  <td className="p-3 align-top">{row.primarySource}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Cadence */}
      <PageSection id="cadence" title="When a source changes" intro="Deadlines for acting on a change. Every update is recorded in the changelog, and replaced items are marked Superseded, not deleted.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[44rem]`}>
            <caption className="sr-only">What we publish when a source changes, and by when</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Trigger</th>
                <th scope="col" className="p-3">What we publish</th>
                <th scope="col" className="p-3">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {UPDATE_CADENCE.map((row) => (
                <tr key={row.trigger} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.trigger}</th>
                  <td className="p-3 align-top">{row.published}</td>
                  <td className="p-3 align-top font-semibold">{row.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Evaluators */}
      <PageSection id="evaluators" title="What makes an evaluator independent" intro="An evaluator counts at Level 2 only if it meets these tests.">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {EVALUATOR_CRITERIA.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">An evaluator that fails a test can still be a lead. It is not cited as an independent source.</p>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {GOTCHAS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      {/* FAQ */}
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

      {/* Glossary */}
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

      {/* Method */}
      <PageSection id="method" title="Method and related pages">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How this policy works</h3>
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
        <p className="mb-0 mt-4 text-sm"><Link href="/about/corrections">Report a wrong figure or a missing source</Link></p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See how we test models and label the results</p>
        </div>
        <Link href="/about/how-we-test" className={BUTTON_PRIMARY}>Open How we test</Link>
      </footer>
    </div>
  );
}