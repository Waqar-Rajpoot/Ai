import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { describeRetirementDate, sortByRetirementDate } from "@/lib/prices/retirementLogic";
import { RETIREMENTS } from "@/lib/prices/retirements";
import {
  BUILDER_STEPS,
  DIRECTORY_STATUS,
  FAQ,
  LIFECYCLE_TERMS,
  NOTICE_POLICIES,
  ON_THE_DAY_BEHAVIOURS,
  PLATFORM_CLOCKS,
  PROVIDER_SOURCES,
  READER_PATHS,
  SUPERSEDED_RULES,
  TRACKER_SOURCES,
} from "@/lib/prices/retirementsContent";
import { RETIREMENTS_CHECKED_ON } from "@/lib/prices/retirementsConstants";
import { RetirementIdChecker } from "./RetirementIdChecker";
import { RetirementTimeline } from "./RetirementTimeline";
import { RetirementsTracker } from "./RetirementsTracker";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "terms", label: "Key words" },
  { id: "models", label: "Models being retired" },
  { id: "id-check", label: "Check your IDs" },
  { id: "features", label: "Features being retired" },
  { id: "calendar", label: "Calendar" },
  { id: "clocks", label: "Different clocks" },
  { id: "on-the-day", label: "On the day" },
  { id: "notice", label: "Notice policies" },
  { id: "directory", label: "Directory models" },
  { id: "playbook", label: "What to do" },
  { id: "superseded", label: "Superseded labels" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const FEATURE_ENTRIES = sortByRetirementDate(RETIREMENTS.filter((entry) => entry.kind === "feature"));
const PLATFORM_COUNT = new Set(RETIREMENTS.map((entry) => entry.platform)).size;

/** Full Retirements page: tracker, ID checker, calendar, platform clocks, policies, playbook, FAQ and sources. */
export function RetirementsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Prices · Levels 2 to 3</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {RETIREMENTS_CHECKED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Updated weekly</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI model and feature retirements: what is ending, when, and what replaces it</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {RETIREMENTS.length} retirements across {PLATFORM_COUNT} platforms, each with its date, successor and what happens when the day arrives. Works for app users, builders and team leads.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#models" className={BUTTON_PRIMARY}>See what is retiring</a>
          <a href="#id-check" className={BUTTON_OUTLINE}>Check my model IDs</a>
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
            <li><strong>Makers retire models on a schedule.</strong> After the date, the model either stops working or the old name quietly serves a different model.</li>
            <li><strong>The date depends on where you use it.</strong> The same model can retire on different days on the maker&apos;s own API, Amazon Bedrock, Microsoft Foundry and Google Vertex AI.</li>
            <li><strong>Notice varies a lot.</strong> Policies promise 60 days to 6 months, but 2026 brought cases of 3 months and even 20 days. Plan for the shortest.</li>
            <li><strong>App users rarely need to act.</strong> Builders do: a hard-coded model ID is a date on your calendar.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Gone from the app is not gone from the API</p>
            <p className="mb-2 mt-1 text-sm">GPT-4o left ChatGPT on Feb 13, 2026, while its API snapshots keep running until their own dates. Apps and APIs retire on separate schedules.</p>
            <p className="m-0 text-sm">Choosing a plan? See the <Link href="/prices/plans">consumer plan table</Link>.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying. Dates here are checked weekly and can change without notice.</p>
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
              <p className="mb-0 mt-4 text-sm"><Link href={path.link.href}>{path.link.label}</Link></p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Terms */}
      <PageSection id="terms" title="Key words in 60 seconds" intro="Makers use these words differently, so read the label on each entry below.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIFECYCLE_TERMS.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      {/* Models */}
      <PageSection id="models" title="Models being retired" intro="Every model and chat-app removal we track, soonest first. Filter by maker or platform, or search a model ID. Status badges use today's date in your browser.">
        <RetirementsTracker />
      </PageSection>

      {/* ID checker */}
      <PageSection id="id-check" title="Check your model IDs" intro="Paste the model IDs from your code or settings to see every date that applies. It runs in your browser and saves nothing.">
        <RetirementIdChecker />
      </PageSection>

      {/* Features */}
      <PageSection id="features" title="Features being retired" intro="Not every ending is a model. Some are whole tools or APIs, and these usually need code changes, not just a new model name.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {FEATURE_ENTRIES.map((entry) => (
            <li key={entry.id} className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">{describeRetirementDate(entry)} · {entry.platform}</p>
              <h3 className="mb-1 mt-1">{entry.name}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{entry.note}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Replacement:</strong> {entry.replacement ?? "None named"}</p>
              <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
                {entry.verification === "provider" ? "Read on the provider's page." : "Read through a tracker."}{" "}
                <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer">Provider page</a>
                {entry.announcedOn ? ` · announced ${formatIsoDate(entry.announcedOn)}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Calendar */}
      <PageSection id="calendar" title="Calendar by month" intro="The same entries, grouped by month, including features and floors. Use it to plan a quarter of migrations.">
        <RetirementTimeline />
      </PageSection>

      {/* Clocks */}
      <PageSection id="clocks" title="One model, several clocks" intro="A model ID retires per platform. Check the row for the place you actually call it.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">Retirement dates for the same model on different platforms</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Model</th>
                <th scope="col" className="p-3">Maker&apos;s own API</th>
                <th scope="col" className="p-3">Cloud platforms</th>
                <th scope="col" className="p-3">Takeaway</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_CLOCKS.map((row) => (
                <tr key={row.model} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.model}</th>
                  <td className="p-3 align-top">{row.providerApi}</td>
                  <td className="p-3 align-top">{row.cloud}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.takeaway}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Where two dates differ, plan against the earlier one for any platform you use as a fallback.</p>
      </PageSection>

      {/* On the day */}
      <PageSection id="on-the-day" title="What happens on the day" intro="Retirements do not all fail the same way. The quiet ones are the risky ones.">
        <div className="grid gap-4 md:grid-cols-2">
          {ON_THE_DAY_BEHAVIOURS.map((behaviour) => (
            <article key={behaviour.label} className={CARD_CLASS}>
              <h3 className="mt-0">{behaviour.label}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]"><strong>Who:</strong> {behaviour.who}</p>
              <p className="mb-0 mt-2 text-sm">{behaviour.whatHappens}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Risk:</strong> {behaviour.risk}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Notice */}
      <PageSection id="notice" title="How much warning do you get?" intro="Published minimums, with real 2026 exceptions noted. Policies change, so confirm on each provider's page.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Minimum retirement notice by provider</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Provider</th>
                <th scope="col" className="p-3">Minimum notice</th>
                <th scope="col" className="p-3">Worth knowing</th>
              </tr>
            </thead>
            <tbody>
              {NOTICE_POLICIES.map((row) => (
                <tr key={row.provider} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.provider}</th>
                  <td className="p-3 align-top">{row.minimumNotice}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Directory */}
      <PageSection id="directory" title="The models in our directory" intro="Retirement status of the 14 models on the model directory, as of the check date. No date found means none appeared in the sources we checked, not a promise.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Retirement status of directory models</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Model</th>
                <th scope="col" className="p-3">Maker</th>
                <th scope="col" className="p-3">Finding</th>
              </tr>
            </thead>
            <tbody>
              {DIRECTORY_STATUS.map((row) => (
                <tr key={row.model} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.model}</th>
                  <td className="p-3 align-top">{row.maker}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">See prices and context for each in the <Link href="/compare/models">model directory</Link> and the <Link href="/prices/api">API costs</Link> page.</p>
      </PageSection>

      {/* Playbook */}
      <PageSection id="playbook" title="Seven steps to survive a retirement" intro="A short routine for anyone with a model ID in code, a workflow or a vendor contract.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {BUILDER_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* Superseded */}
      <PageSection id="superseded" title="Superseded label rules" intro="How retirements show up across the rest of the site.">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {SUPERSEDED_RULES.map((rule) => <li key={rule}>{rule}</li>)}
        </ul>
        <p className="mb-0 mt-3 text-sm">
          See <Link href="/compare/best">best-for roundups</Link>, <Link href="/compare/reviews">model reviews</Link> and the <Link href="/news/changelog">changelog</Link>.
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
            <li>Dates move. A provider can add, shorten or change a retirement after our weekly check.</li>
            <li>Most entries were read through trackers, not the provider&apos;s page. Always confirm before scheduling work.</li>
            <li>Replacement names change quickly and may differ from newer model names elsewhere on this site.</li>
            <li>This list covers the models we track. Your provider may retire others.</li>
          </ul>
        </div>
      </PageSection>

      {/* Sources */}
      <PageSection id="sources" title="Sources and labels" intro={`Verified on ${RETIREMENTS_CHECKED_ON}. Each entry says whether its date was read on the provider's own page or through a tracker. Trackers are leads only, and provider pages always win.`}>
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
            <h3 className="mt-0">Trackers used (secondary)</h3>
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
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report a wrong date</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Compare what a replacement will cost you per task</p>
        </div>
        <Link href="/prices/api" className={BUTTON_PRIMARY}>Open API costs</Link>
      </footer>
    </div>
  );
}