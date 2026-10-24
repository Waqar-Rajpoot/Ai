import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { ADOPTION_GROUP, ADOPTION_ROWS, ADOPTION_TO_QUARTER, ADOPTION_FROM_QUARTER } from "@/lib/society/adoptionData";
import { ANCHOR_FIGURES_VERIFIED_ON, JOBS_FINDINGS } from "@/lib/society/anchorFigures";
import { JOBS_REVIEWED_ON } from "@/lib/society/jobsConstants";
import {
  CANNOT_SAY,
  CAN_SAY,
  DISAGREEMENTS,
  ENTRY_LEVEL_CAUTION,
  ENTRY_LEVEL_WORRY,
  FAQ,
  GLOSSARY,
  READER_ACTIONS,
  RELATED_LINKS,
  SIGNALS,
  SOURCES,
  SUMMARY_POINTS,
  TASK_SHIFTS,
  UNUSED_FIGURES,
} from "@/lib/society/jobsContent";
import { SURVEY_PROFILES } from "@/lib/society/jobsData";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { SurveyReader } from "./SurveyReader";
import { TaskProfileCheck } from "./TaskProfileCheck";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "surveys", label: "What the surveys say" },
  { id: "together", label: "Put together" },
  { id: "not-used", label: "Figures we do not use" },
  { id: "tasks", label: "Tasks, not jobs" },
  { id: "entry-level", label: "Entry-level work" },
  { id: "check", label: "Tasks check" },
  { id: "disagree", label: "Where experts differ" },
  { id: "signals", label: "Signals to watch" },
  { id: "actions", label: "What you can do" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const WORK_ADOPTION = ADOPTION_ROWS.find((row) => row.id === "work");

/** Article 34: what named surveys say about AI and jobs, what they cannot say, and what a reader can do. */
export function JobsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">Is AI taking jobs?</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {JOBS_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Plain and Technical layers</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Is AI taking jobs? What current surveys actually say</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Three named sources, what each one measured, what none of them can tell you, and what you can do about it. No round totals, no panic, no reassurance we cannot back up.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#surveys" className={BUTTON_PRIMARY}>See what the surveys say</a>
          <a href="#check" className={BUTTON_OUTLINE}>Check your own tasks</a>
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

      <PageSection id="summary" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SUMMARY_POINTS.map((point) => (
              <li key={point.headline}><strong>{point.headline}</strong> {point.detail}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Plans and use are not outcomes</p>
            <p className="mb-2 mt-1 text-sm"><strong>{JOBS_FINDINGS.surveyorNet.publisher}:</strong> {JOBS_FINDINGS.surveyorNet.finding}</p>
            {WORK_ADOPTION && (
              <p className="m-0 text-sm">
                <strong>Fed-hosted tracker:</strong> use at work among {ADOPTION_GROUP} went from {WORK_ADOPTION.fromPercent}% ({ADOPTION_FROM_QUARTER}) to {WORK_ADOPTION.toPercent}% ({ADOPTION_TO_QUARTER}). That measures use, not job changes.
              </p>
            )}
          </aside>
        </div>
      </PageSection>

      <PageSection id="surveys" title="What named surveys say" intro="We use three sources, and only these. Each answers a different question, so read them one at a time.">
        <SurveyReader />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          {ANCHOR_FIGURES_VERIFIED_ON ? `Verified on ${ANCHOR_FIGURES_VERIFIED_ON}.` : "Check each publisher's own page for the latest figures and the exact wording."} Sources are listed at the end of this page.
        </p>
      </PageSection>

      <PageSection id="together" title="The three sources put together" intro="They sit at different distances from what actually happens to jobs, so they cannot simply be added up.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">The three sources compared by who answered, kind of evidence and distance from real job changes</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Who answered</th>
                <th scope="col" className="p-3">Kind of evidence</th>
                <th scope="col" className="p-3">How close to real job changes</th>
              </tr>
            </thead>
            <tbody>
              {SURVEY_PROFILES.map((profile) => (
                <tr key={profile.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><a href={`#survey-${profile.id}`}>{profile.publisher}</a></th>
                  <td className="p-3 align-top">{profile.whoAnswered}</td>
                  <td className="p-3 align-top">{profile.evidenceKind}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{profile.closenessToOutcomes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What we can say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {CAN_SAY.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What we cannot say</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {CANNOT_SAY.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="not-used" title="Why many online figures are not used" intro="You will see bigger and more dramatic numbers elsewhere. Here is why we leave most of them out.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <caption className="sr-only">Kinds of figure we do not use, why, and what we do instead</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Kind of figure</th>
                <th scope="col" className="p-3">What it looks like</th>
                <th scope="col" className="p-3">Why we do not use it</th>
                <th scope="col" className="p-3">What we do instead</th>
              </tr>
            </thead>
            <tbody>
              {UNUSED_FIGURES.map((row) => (
                <tr key={row.kind} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.kind}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.example}</td>
                  <td className="p-3 align-top">{row.whyNotUsed}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.whatWeDo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">This is our source rule, applied to jobs. See the <Link href="/about/source-policy">source policy</Link>, and the six headline questions in <Link href="/society/pros-and-cons-of-ai#headlines">Pros and cons of AI</Link>.</p>
      </PageSection>

      <PageSection id="tasks" title="Tasks, not jobs" intro="Most jobs are bundles of tasks. AI changes some tasks, and what that means for a job depends on the mix.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <caption className="sr-only">Kinds of work, where AI often helps, what still needs a person and what to watch for</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Kind of work</th>
                <th scope="col" className="p-3">Where AI often helps</th>
                <th scope="col" className="p-3">What still needs a person</th>
                <th scope="col" className="p-3">Watch for</th>
              </tr>
            </thead>
            <tbody>
              {TASK_SHIFTS.map((row) => (
                <tr key={row.task} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.task}</th>
                  <td className="p-3 align-top">{row.aiOftenHelps}</td>
                  <td className="p-3 align-top">{row.humanStillNeeded}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.watchFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">This table is hand-written and general. It describes common uses, not a test of any product, and it names no figures.</p>
      </PageSection>

      <PageSection id="entry-level" title="Entry-level and routine tasks" intro="The most common worry is about people starting out. It is plausible, and it is not yet measured in the figures we use.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mt-0">Why people worry</h3>
            <ul className="m-0 grid list-none gap-3 p-0">
              {ENTRY_LEVEL_WORRY.map((point) => (
                <li key={point.headline} className={CARD_CLASS}>
                  <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mt-0">Why we are cautious</h3>
            <ul className="m-0 grid list-none gap-3 p-0">
              {ENTRY_LEVEL_CAUTION.map((point) => (
                <li key={point.headline} className={CARD_CLASS}>
                  <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${CARD_CLASS} mt-4 border-[var(--color-accent)]`}>
          <p className="m-0 text-sm"><strong>Where that leaves us.</strong> The worry is serious enough to watch closely and unproven enough that we do not state it as fact. The signals below show what evidence would settle it.</p>
        </div>
      </PageSection>

      <PageSection id="check" title="Check your own tasks" intro="A two-minute thinking aid: which kinds of task fill your week? It looks at tasks, not at whether your job is safe.">
        <TaskProfileCheck />
      </PageSection>

      <PageSection id="disagree" title="Where informed people disagree" intro="Each side has a case, and we say what evidence would settle it.">
        <div className="grid gap-4 md:grid-cols-2">
          {DISAGREEMENTS.map((entry) => (
            <article key={entry.topic} className={CARD_CLASS}>
              <h3 className="mt-0">{entry.topic}</h3>
              <p className="m-0 text-sm"><strong>One view:</strong> {entry.oneView}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Another view:</strong> {entry.otherView}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>What would help:</strong> {entry.whatWouldHelp}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="signals" title="Signals to watch" intro="The strongest evidence will come from measured data, not from opinions or plans. These are the signals that matter most.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Signals that would show real changes in work, and where to look</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Signal</th>
                <th scope="col" className="p-3">Why it matters</th>
                <th scope="col" className="p-3">Where to look</th>
              </tr>
            </thead>
            <tbody>
              {SIGNALS.map((signal) => (
                <tr key={signal.signal} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{signal.signal}</th>
                  <td className="p-3 align-top">{signal.why}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{signal.whereToLook}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">For a longer view of where these trends could go, see <Link href="/society/future-of-ai">The future of AI</Link>. Anything about the future there is labelled as a framework, not a forecast.</p>
      </PageSection>

      <PageSection id="actions" title="What a reader can do" intro="Whatever the big picture turns out to be, these steps are useful now.">
        <div className="grid gap-4 md:grid-cols-2">
          {READER_ACTIONS.map((group) => (
            <article key={group.reader} className={CARD_CLASS}>
              <h3 className="mt-0">{group.reader}</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {group.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm">Practical help: <Link href="/learn/practitioner/ai-resume-and-interview-prep">resume and interview prep with AI</Link> and the <Link href="/tools/cheat-sheets">resume prompt templates</Link>.</p>
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

      <PageSection id="glossary" title="Terms in plain English">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            <li>Survey figures are snapshots from one date, and later releases may revise them.</li>
            <li>A percentage means little until you know its base. Check the original for who the percentage is of.</li>
            <li>The tasks check is our own thinking aid. It is not a prediction or a measurement of any real job.</li>
            <li>This page is general information, not career, legal or financial advice.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${JOBS_REVIEWED_ON}. The explanations are hand-written, labelled “Tested by us: no”. Every figure comes from one of the three named sources below.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Data sources</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? (
                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                  ) : (
                    <span className="font-semibold">{source.publisher}: {source.title}</span>
                  )}
                  <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Keep reading</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {RELATED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                  <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See which industries are changing most, and which are next</p>
        </div>
        <Link href="/society/industries-changing-most" className={BUTTON_PRIMARY}>Read about industries</Link>
      </footer>
    </div>
  );
}