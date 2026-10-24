import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { PRIVACY_CHECKED_ON, PRIVACY_NEXT_REFRESH, PRIVACY_REFRESH_CADENCE } from "@/lib/prices/privacyConstants";
import {
  FAQ,
  MYTHS,
  PRIVACY_TERMS,
  PROVIDER_SOURCES,
  SITUATIONS,
  TRACKER_SOURCES,
  VENDOR_QUESTIONS,
} from "@/lib/prices/privacyContent";
import { countTrainingLevels, PRIVACY_ROWS, TRAINING_LABELS, type TrainingLevel } from "@/lib/prices/privacyMatrix";
import { PrivacyMatrixTable } from "./PrivacyMatrixTable";
import { PrivacySettingsGuide } from "./PrivacySettingsGuide";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "situations", label: "What should I do?" },
  { id: "terms", label: "Key words" },
  { id: "matrix", label: "The matrix" },
  { id: "settings", label: "Turn off sharing" },
  { id: "myths", label: "Myths" },
  { id: "vendor-questions", label: "Questions for vendors" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const GLANCE_ORDER: readonly TrainingLevel[] = ["trains-by-default", "your-choice", "no-training", "unclear"];

/** Full Privacy matrix page: summary, situations, matrix, settings guide, myths, vendor questions, FAQ and sources. */
export function PrivacyView() {
  const counts = countTrainingLevels(PRIVACY_ROWS);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Prices · Levels 1 to 3</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {PRIVACY_CHECKED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Refreshed {PRIVACY_REFRESH_CADENCE.toLowerCase()}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI privacy matrix: who trains on your chats, how long data is kept, and how to switch it off</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {PRIVACY_ROWS.length} services compared on training, retention, deletion and data location, with plain steps to protect yourself. For app users, workers and builders.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#matrix" className={BUTTON_PRIMARY}>See the matrix</a>
          <a href="#settings" className={BUTTON_OUTLINE}>Turn off sharing</a>
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
            <li><strong>On personal plans, your chats can train the AI unless you opt out.</strong> That is the default or near-default on ChatGPT, Grok and the Gemini app. On Claude it depends on a setting you should check.</li>
            <li><strong>Work plans and APIs are different.</strong> OpenAI and Anthropic say they do not train on that data by default. Google&apos;s paid Gemini API does not, but its free tier does.</li>
            <li><strong>Delete does not mean instantly gone.</strong> Most services remove deleted chats within about 30 days, and some keep a copy for safety, review or law.</li>
            <li><strong>Where data lives matters.</strong> Most services publish no region choice for personal plans, and DeepSeek says its data is stored in China.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Training by default: at a glance</p>
            <dl className="m-0 mt-2 grid gap-1 text-sm">
              {GLANCE_ORDER.map((level) => (
                <div key={level} className="flex justify-between gap-3">
                  <dt>{TRAINING_LABELS[level]}</dt>
                  <dd className="m-0 font-bold tabular-nums">{counts[level]} of {PRIVACY_ROWS.length}</dd>
                </div>
              ))}
            </dl>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">This is a count of services, not a score. A service is not &quot;safe&quot; because a number is low.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">This page is not legal advice. Prices and features change. Confirm on the provider&apos;s website before buying or sharing sensitive data.</p>
      </PageSection>

      {/* Situations */}
      <PageSection id="situations" title="What should I do?" intro="Pick the row that matches what you are about to paste. No setting makes every situation safe.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <caption className="sr-only">Safest choice for common situations</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">If you are...</th>
                <th scope="col" className="p-3">Safest choice</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {SITUATIONS.map((row) => (
                <tr key={row.situation} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.situation}</th>
                  <td className="p-3 align-top">{row.safestChoice}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">
                    {row.why}
                    {row.link && <> <Link href={row.link.href}>{row.link.label}</Link></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Terms */}
      <PageSection id="terms" title="Key words in 60 seconds" intro="Privacy pages use these words loosely. Here is what we mean.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY_TERMS.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      {/* Matrix */}
      <PageSection id="matrix" title="The privacy matrix" intro="Filter by who the service is for, then switch between training, retention, deletion and data location. Open any row for all four topics, warnings and sources.">
        <PrivacyMatrixTable />
      </PageSection>

      {/* Settings guide */}
      <PageSection id="settings" title="How to turn off data sharing" intro="Choose a service for step-by-step instructions. Work plans and APIs have no switch, because sharing is off by default.">
        <PrivacySettingsGuide />
        <p className="mb-0 mt-4 text-sm">
          Also read <Link href="/learn/foundations/never-share-with-ai-chatbot">what you should never share with an AI chatbot</Link> and the <Link href="/tools/ai-safety-checklist">AI safety checklist</Link>.
        </p>
      </PageSection>

      {/* Myths */}
      <PageSection id="myths" title="Five privacy myths">
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {MYTHS.map((entry) => (
            <li key={entry.myth} className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Myth: {entry.myth}</p>
              <p className="mb-0 mt-2 text-sm">{entry.truth}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Vendor questions */}
      <PageSection id="vendor-questions" title="Eight questions to ask any AI vendor" intro="For teams and builders signing up for a work plan or API. Get the answers in writing.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {VENDOR_QUESTIONS.map((question, index) => (
            <li key={question.term} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{question.term}</strong> {question.meaning}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-4 text-sm">
          A model swap can change data terms. See the <Link href="/prices/retirements">retirements tracker</Link> and the <Link href="/prices/api">API costs</Link> page.
        </p>
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

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            <li>Defaults and menus change. A switch moved or renamed last week can make a step here wrong.</li>
            <li>Several rows rely partly on trackers. Always confirm on the provider&apos;s own page before you share anything sensitive.</li>
            <li>A privacy page is a promise, not a guarantee. Law, security and safety exceptions apply everywhere.</li>
            <li>This matrix covers consumer apps, work plans and APIs. Your own employer, school or cloud contract may add stricter rules.</li>
          </ul>
        </div>
      </PageSection>

      {/* Sources */}
      <PageSection id="sources" title="Sources and labels" intro={`Verified on ${PRIVACY_CHECKED_ON}. The full matrix is refreshed ${PRIVACY_REFRESH_CADENCE.toLowerCase()} (next: ${PRIVACY_NEXT_REFRESH}). Rows say whether we read them on the provider's pages or partly through trackers. Trackers are leads only.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Provider pages</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {PROVIDER_SOURCES.map((source) => (
                <li key={source.href}>
                  <span className={`${BADGE_CLASS} mr-2`}>{source.kind}</span>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Trackers and guides (secondary)</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {TRACKER_SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report a wrong setting</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Compare what each plan costs before you choose</p>
        </div>
        <Link href="/prices/plans" className={BUTTON_PRIMARY}>See consumer plans</Link>
      </footer>
    </div>
  );
}