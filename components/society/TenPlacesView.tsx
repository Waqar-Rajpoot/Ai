import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  ADOPTION_FROM_QUARTER,
  ADOPTION_GROUP,
  ADOPTION_ROWS,
  ADOPTION_SOURCE_LABEL,
  ADOPTION_SOURCE_URL,
  ADOPTION_TO_QUARTER,
  ADOPTION_VERIFIED_ON,
  percentagePointChange,
} from "@/lib/society/adoptionData";
import {
  CONTROL_LABELS,
  KIND_LABELS,
  VISIBILITY_LABELS,
  describeKinds,
  formatClockTime,
} from "@/lib/society/tenPlaces";
import { ARTICLE_AUTHOR_LABEL, PERCENT_SCALE, TEN_PLACES_REVIEWED_ON } from "@/lib/society/tenPlacesConstants";
import {
  AUDIT_STEPS,
  FAQ,
  GLOSSARY,
  KIND_EXPLAINERS,
  MYTHS,
  RELATED_LINKS,
  SCORECARD_ROWS,
  SOURCES,
  SUMMARY_POINTS,
} from "@/lib/society/tenPlacesContent";
import { TEN_PLACES } from "@/lib/society/tenPlacesData";
import { DayTimeline } from "./DayTimeline";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "day", label: "Your day" },
  { id: "glance", label: "At a glance" },
  { id: "kinds", label: "Four jobs" },
  { id: "adoption", label: "Adoption snapshot" },
  { id: "balance", label: "Both sides" },
  { id: "audit", label: "Five-minute audit" },
  { id: "myths", label: "Myths" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const FIRST_TIME = formatClockTime(TEN_PLACES[0].minutesSinceMidnight);
const LAST_TIME = formatClockTime(TEN_PLACES[TEN_PLACES.length - 1].minutesSinceMidnight);

/** Article 31: ten everyday places where people meet AI, with a plain and a technical layer. */
export function TenPlacesView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/society">AI &amp; Society</Link> › <span aria-current="page">Ten places you meet AI</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">AI &amp; Society · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Explainer</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {TEN_PLACES_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Plain and Technical layers</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Ten places you meet AI in a normal day</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          From {FIRST_TIME} to {LAST_TIME}: what the AI is doing, what it gives you, what to watch out for and what you can change. No chatbot required.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#day" className={BUTTON_PRIMARY}>Follow the day</a>
          <Link href="/society/day-quiz" className={BUTTON_OUTLINE}>Take the day quiz</Link>
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
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Try this tomorrow</p>
            <p className="mb-2 mt-1 text-sm">Count how many of the ten you meet, then compare with the quiz result. Many people find the number is higher than they expected.</p>
            <p className="m-0 text-sm"><Link href="/society/day-quiz">Take the day quiz</Link></p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="day" title="A day with AI, hour by hour" intro="Each card says what the AI does, what it gives you, what to watch out for and one thing you can do. Switch to Technical for how it works, or filter by kind of AI.">
        <DayTimeline />
      </PageSection>

      <PageSection id="glance" title="The ten at a glance" intro="Where you would notice AI, and where you can do something about it.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">The ten places, the kind of AI in each, whether you notice it and how much control you have</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Time</th>
                <th scope="col" className="p-3">Place</th>
                <th scope="col" className="p-3">What AI does</th>
                <th scope="col" className="p-3">Do you notice it?</th>
                <th scope="col" className="p-3">Control</th>
              </tr>
            </thead>
            <tbody>
              {TEN_PLACES.map((place) => (
                <tr key={place.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold tabular-nums">{formatClockTime(place.minutesSinceMidnight)}</th>
                  <td className="p-3 align-top"><a href={`#${place.id}`}>{place.title}</a></td>
                  <td className="p-3 align-top capitalize text-[var(--color-muted)]">{describeKinds(place.kinds)}</td>
                  <td className="p-3 align-top">{VISIBILITY_LABELS[place.visibility]}</td>
                  <td className="p-3 align-top">{CONTROL_LABELS[place.control]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">The links jump to each card above. Labels are our judgement for a typical app, so your own settings may differ.</p>
      </PageSection>

      <PageSection id="kinds" title="The four jobs AI does" intro="Every place above comes down to one or more of these.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {KIND_EXPLAINERS.map((explainer) => (
            <li key={explainer.kind} className={CARD_CLASS}>
              <h3 className="mt-0">{KIND_LABELS[explainer.kind]}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{explainer.plainMeaning}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Everyday example:</strong> {explainer.everydayExample}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">New to the idea? Start with <Link href="/learn/foundations/what-is-ai">What is AI?</Link></p>
      </PageSection>

      <PageSection id="adoption" title="Adoption snapshot: how many people use generative AI?" intro={`${ADOPTION_GROUP}, ${ADOPTION_FROM_QUARTER} compared with ${ADOPTION_TO_QUARTER}.`}>
        <div className={`${CARD_CLASS} grid gap-5`}>
          {ADOPTION_ROWS.map((row) => (
            <div key={row.id}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-semibold">{row.label}</span>
                <span className="tabular-nums text-[var(--color-muted)]">
                  {row.fromPercent}% to {row.toPercent}% (+{percentagePointChange(row)} points)
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-[var(--color-border)]" role="img" aria-label={`${row.label}: ${row.fromPercent} percent in ${ADOPTION_FROM_QUARTER}, ${row.toPercent} percent in ${ADOPTION_TO_QUARTER}`}>
                <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)] opacity-40" style={{ width: `${(row.fromPercent / PERCENT_SCALE) * PERCENT_SCALE}%` }} />
                <div className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-accent)]" style={{ width: `${row.toPercent}%` }} />
              </div>
            </div>
          ))}
          <p className="m-0 text-xs text-[var(--color-muted)]">
            Pale bar: {ADOPTION_FROM_QUARTER}. Solid bar: {ADOPTION_TO_QUARTER}. Source:{" "}
            {ADOPTION_SOURCE_URL ? (
              <a href={ADOPTION_SOURCE_URL} target="_blank" rel="noopener noreferrer">{ADOPTION_SOURCE_LABEL}</a>
            ) : (
              ADOPTION_SOURCE_LABEL
            )}
            .{" "}
            {ADOPTION_VERIFIED_ON ? `Verified on ${ADOPTION_VERIFIED_ON}.` : "Check the tracker's own page for the latest figures."}
          </p>
        </div>
        <div className={`${CARD_CLASS} mt-4 border-amber-500/60`}>
          <p className="m-0 text-sm"><strong>How to read this.</strong> These numbers count people who say they use <em>generative</em> AI tools. They do not include the AI inside feeds, maps, spam filters and fraud checks, which you meet whether or not you choose to. So this is a count of chosen use, not of total exposure. Full explanation: <Link href="/society/ai-adoption-data">How fast is AI spreading?</Link></p>
        </div>
      </PageSection>

      <PageSection id="balance" title="What it adds up to: both sides" intro="Every convenience in the ten places has a cost. Here they are side by side.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Benefits and costs of everyday AI by theme</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Theme</th>
                <th scope="col" className="p-3">What helps</th>
                <th scope="col" className="p-3">What it costs</th>
              </tr>
            </thead>
            <tbody>
              {SCORECARD_ROWS.map((row) => (
                <tr key={row.theme} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.theme}</th>
                  <td className="p-3 align-top">{row.helps}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.costs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">Longer view: <Link href="/society/pros-and-cons-of-ai">Pros and cons of AI: an honest scorecard</Link>.</p>
      </PageSection>

      <PageSection id="audit" title="A five-minute audit" intro="You cannot switch AI off, but you can choose what it knows about you and how long it keeps you.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {AUDIT_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">Want the longer version? Use the <Link href="/tools/ai-safety-checklist">AI safety checklist</Link>.</p>
      </PageSection>

      <PageSection id="myths" title="Three common myths">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {MYTHS.map((entry) => (
            <li key={entry.myth} className={CARD_CLASS}>
              <p className="m-0 font-bold">{entry.myth}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Fact:</strong> {entry.fact}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">More: <Link href="/society/ai-myths-and-facts">AI myths and facts</Link> or the <Link href="/society/myth-or-fact">flip-card game</Link>.</p>
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
            <li>The ten places are common examples. Your apps and settings may behave differently, and companies do not always say where they use AI.</li>
            <li>Labels such as “easy to limit” are our judgement for a typical app, not a test of a specific product.</li>
            <li>Adoption figures describe chosen use of generative AI only, and later releases of the tracker may revise them.</li>
            <li>This page is general information, not legal, medical or financial advice.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${TEN_PLACES_REVIEWED_ON}. The ten places are hand-written explanations, labelled “Tested by us: no”. The one number series on this page comes from a named tracker.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Data source</h3>
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
          <p className="m-0 font-semibold">See how your own day compares</p>
        </div>
        <Link href="/society/day-quiz" className={BUTTON_PRIMARY}>Take the day quiz</Link>
      </footer>
    </div>
  );
}