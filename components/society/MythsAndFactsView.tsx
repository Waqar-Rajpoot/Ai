import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { countByVerdict, findEvidenceSource } from "@/lib/society/mythFactLogic";
import { MYTHS_FACTS_CHECKED_ON } from "@/lib/society/mythsFactsConstants";
import {
  EVIDENCE_KIND_LABELS,
  MYTH_FACTS,
  SOURCE_CHECK_LABELS,
  VERDICT_LABELS,
  VERDICT_MEANINGS,
  VERDICT_ORDER,
} from "@/lib/society/mythsFacts";
import {
  FAQ,
  GLOSSARY,
  GOTCHAS,
  KEY_FIGURES,
  METHOD_NOTES,
  NUMBERS_DISAGREE,
  READER_PATHS,
  RELATED_LINKS,
  SHORT_ANSWER,
  SOCIETY_RULES,
  SPOT_A_MYTH_ROUTINE,
  WHY_MYTHS_STICK,
} from "@/lib/society/mythsFactsContent";
import { MythFactCards } from "./MythFactCards";
import { MythFactList } from "./MythFactList";
import { VerdictBadge } from "./VerdictBadge";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "list", label: "Myth-or-fact list" },
  { id: "flip-cards", label: "Flip cards" },
  { id: "evidence", label: "Evidence links" },
  { id: "disagree", label: "Why numbers differ" },
  { id: "why-stick", label: "Why myths stick" },
  { id: "spot", label: "Spot a myth" },
  { id: "rules", label: "Our rules" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Key words" },
  { id: "method", label: "Method" },
] as const;

const VERDICT_COUNTS = countByVerdict(MYTH_FACTS);
const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS = "bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]";

/** Full AI myths and facts article: list, flip cards, evidence, routine, FAQ and glossary. */
export function MythsAndFactsView() {
  const mythCount = VERDICT_COUNTS.myth + VERDICT_COUNTS["mostly-myth"];
  const factCount = VERDICT_COUNTS.fact + VERDICT_COUNTS["mostly-fact"];

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {MYTHS_FACTS_CHECKED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Two-sided · dated · sourced</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI myths and facts: what the evidence says</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {MYTH_FACTS.length} common claims about AI, checked against named surveys and official trackers: {mythCount} myths or mostly myths, {VERDICT_COUNTS.depends} that depend, and {factCount} facts or mostly facts.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#list" className={BUTTON_PRIMARY}>Read the claims</a>
          <a href="#flip-cards" className={BUTTON_OUTLINE}>Test yourself</a>
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
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">How to read the verdicts</p>
            <ul className="mb-0 mt-2 grid list-none gap-3 p-0 text-sm">
              {VERDICT_ORDER.map((verdict) => (
                <li key={verdict}>
                  <VerdictBadge verdict={verdict} /> <span className="text-[var(--color-muted)]">{VERDICT_MEANINGS[verdict]} ({VERDICT_COUNTS[verdict]})</span>
                </li>
              ))}
            </ul>
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

      {/* List */}
      <PageSection id="list" title="Myth-or-fact list" intro="Search or filter the claims. Switch to Technical for the figures behind each verdict.">
        <MythFactList />
      </PageSection>

      {/* Flip cards */}
      <PageSection id="flip-cards" title="Flip-card feature: test your instincts" intro="Read the claim, pick Myth, Fact or It depends, and see the verdict. Your score stays in your browser.">
        <MythFactCards />
        <p className="mb-0 mt-4 text-sm">Prefer a dedicated page? Open the <Link href="/society/myth-or-fact">myth-or-fact flip cards</Link>.</p>
      </PageSection>

      {/* Evidence */}
      <PageSection id="evidence" title="Evidence links: the numbers behind the verdicts" intro={`Each figure shows who measured it and when. Checked ${MYTHS_FACTS_CHECKED_ON}. Forecasts are labelled as forecasts.`}>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[60rem]`}>
            <caption className="sr-only">Key figures with their source, period and how the source was checked</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Figure</th>
                <th scope="col" className="p-3">What it measures</th>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Type and check</th>
                <th scope="col" className="p-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {KEY_FIGURES.map((row) => {
                const source = findEvidenceSource(row.sourceId);
                return (
                  <tr key={`${row.figure}-${row.measures}`} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-bold tabular-nums">{row.figure}</th>
                    <td className="p-3 align-top">{row.measures}</td>
                    <td className="p-3 align-top">
                      {source ? <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}</a> : "Source missing"}
                      {source && <span className="block text-xs text-[var(--color-muted)]">{source.asOf}</span>}
                    </td>
                    <td className="p-3 align-top text-xs text-[var(--color-muted)]">
                      {source ? `${EVIDENCE_KIND_LABELS[source.kind]} · ${SOURCE_CHECK_LABELS[source.check]}` : ""}
                    </td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Verdict counts: {VERDICT_ORDER.map((verdict) => `${VERDICT_LABELS[verdict]} ${VERDICT_COUNTS[verdict]}`).join(" · ")}.
        </p>
      </PageSection>

      {/* Disagreement */}
      <PageSection id="disagree" title="Three honest numbers that disagree" intro="All three describe US AI use. They differ because they count different people and different things.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[48rem]`}>
            <caption className="sr-only">Three US AI adoption figures and what each one counts</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Number</th>
                <th scope="col" className="p-3">Who was counted</th>
                <th scope="col" className="p-3">What counted as use</th>
                <th scope="col" className="p-3">When</th>
              </tr>
            </thead>
            <tbody>
              {NUMBERS_DISAGREE.map((row) => (
                <tr key={row.source} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.source}</th>
                  <td className="p-3 align-top font-bold tabular-nums">{row.number}</td>
                  <td className="p-3 align-top">{row.whoCounted}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.whatCounted}</td>
                  <td className="p-3 align-top">{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">See <Link href="/society/ai-adoption-data">How fast is AI spreading?</Link> for the full series.</p>
      </PageSection>

      {/* Why myths stick */}
      <PageSection id="why-stick" title="Why myths stick" intro="Knowing the pattern makes the next one easier to catch.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {WHY_MYTHS_STICK.map((entry) => (
            <li key={entry.reason} className={CARD_CLASS}>
              <p className="m-0 font-semibold">{entry.reason}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Try:</strong> {entry.whatToDo}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Routine */}
      <PageSection id="spot" title="Spot a myth in 60 seconds" intro="Five checks you can run on any claim about AI, including the ones on this page.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {SPOT_A_MYTH_ROUTINE.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">Then use the <Link href="/learn/practitioner/fact-check-ai-answers">fact-check routine</Link> for AI answers, and the <Link href="/tools/benchmark-checklist">benchmark reading checklist</Link> for scores.</p>
      </PageSection>

      {/* Rules */}
      <PageSection id="rules" title="The four rules behind this page">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIETY_RULES.map((entry) => (
            <div key={entry.rule} className={CARD_CLASS}>
              <dt className="font-bold">{entry.rule}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.detail}</dd>
            </div>
          ))}
        </dl>
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
      <PageSection id="method" title="Method, labels and related pages">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How we checked</h3>
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
        <p className="mb-0 mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report a wrong figure</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See how fast AI is really spreading</p>
        </div>
        <Link href="/society/ai-adoption-data" className={BUTTON_PRIMARY}>Open the adoption data</Link>
      </footer>
    </div>
  );
}