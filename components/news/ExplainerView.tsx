import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LEVEL_LABELS, TOPIC_LABELS } from "@/lib/news/explainerConstants";
import { countSources, formatDateLabel, getMoreExplainers } from "@/lib/news/explainerLogic";
import type { Explainer } from "@/lib/news/explainerTypes";
import { ActionChecklist } from "./ActionChecklist";
import { ExplainerDates } from "./ExplainerDates";
import { ExplainerTimeline } from "./ExplainerTimeline";
import { LevelImpactPicker } from "./LevelImpactPicker";

const TOC = [
  { id: "quick-take", label: "Quick take" },
  { id: "what-happened", label: "What happened" },
  { id: "what-changed", label: "What changed" },
  { id: "timeline", label: "Timeline" },
  { id: "for-you", label: "What it means for you" },
  { id: "do-today", label: "Do this today" },
  { id: "misreadings", label: "Common misreadings" },
  { id: "unknowns", label: "What we could not confirm" },
  { id: "related", label: "Related guides" },
  { id: "date-and-source", label: "Date and source" },
] as const;

/** One safety, privacy or policy explainer, following Blueprint 5.7. */
export function ExplainerView({ explainer }: { explainer: Explainer }) {
  const sourceCounts = countSources(explainer);
  const more = getMoreExplainers(explainer);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <Link href="/news" className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white no-underline">News · {TOPIC_LABELS[explainer.topic]} explainer</Link>
          {explainer.levels.map((level) => (
            <span key={level} className={`${BADGE_CLASS} normal-case tracking-normal`}>Level {level} · {LEVEL_LABELS[level]}</span>
          ))}
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">{explainer.title}</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">{explainer.description}</p>
        <ExplainerDates publishedIso={explainer.publishedIso} updatedIso={explainer.updatedIso} eventLabel={explainer.eventLabel} />
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

      <PageSection id="quick-take" title="Quick take">
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-3 border-[var(--color-accent)]`}>
          {explainer.quickTake.map((point) => <li key={point} className="font-semibold">{point}</li>)}
        </ul>
        {explainer.notice && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{explainer.notice}</p>}
      </PageSection>

      <PageSection id="what-happened" title="What happened">
        <div className="grid max-w-3xl gap-4">
          {explainer.whatHappened.map((paragraph) => <p key={paragraph} className="m-0">{paragraph}</p>)}
        </div>
      </PageSection>

      <PageSection id="what-changed" title="What changed" intro="The before and the after, side by side.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">What changed, before and now</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">What</th>
                <th scope="col" className="p-3">Before</th>
                <th scope="col" className="p-3">Now</th>
              </tr>
            </thead>
            <tbody>
              {explainer.whatChanged.map((row) => (
                <tr key={row.aspect} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.aspect}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.before}</td>
                  <td className="p-3 align-top font-semibold">{row.now}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="timeline" title="Timeline" intro="Dates in order, with how far away each one is.">
        <ExplainerTimeline entries={explainer.timeline} />
      </PageSection>

      <PageSection id="for-you" title="What it means for you" intro="Pick your level. The advice changes with how you use AI.">
        <LevelImpactPicker levels={explainer.levels} impacts={explainer.impacts} />
      </PageSection>

      <PageSection id="do-today" title="Do this today" intro="Small steps, tagged by level. Tick them off as you go.">
        <ActionChecklist actions={explainer.actions} />
      </PageSection>

      <PageSection id="misreadings" title="Common misreadings">
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {explainer.misreadings.map((item) => (
            <li key={item.claim} className={CARD_CLASS}>
              <p className="m-0 font-semibold line-through decoration-[var(--color-muted)]">{item.claim}</p>
              <p className="mb-0 mt-2 text-sm"><strong>In fact:</strong> {item.fact}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="unknowns" title="What we could not confirm">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-2 pl-5 text-sm">
            {explainer.unknowns.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      <PageSection id="related" title="Related guides" intro="Go deeper, at the level that suits you.">
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {explainer.related.map((guide) => (
            <li key={guide.href} className={CARD_CLASS}>
              <span className={BADGE_CLASS}>Level {guide.level} · {LEVEL_LABELS[guide.level]}</span>
              <p className="mb-1 mt-3 font-semibold"><Link href={guide.href}>{guide.label}</Link></p>
              <p className="m-0 text-sm text-[var(--color-muted)]">{guide.description}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="date-and-source" title="Date and source" intro="When this was written, and what it rests on.">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <dl className={`${CARD_CLASS} m-0 grid gap-3 text-sm`}>
            <div><dt className="text-[var(--color-muted)]">Published</dt><dd className="m-0 font-semibold">{formatDateLabel(explainer.publishedIso)}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Last updated</dt><dd className="m-0 font-semibold">{formatDateLabel(explainer.updatedIso)}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Event</dt><dd className="m-0 font-semibold">{explainer.eventLabel}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Source quality</dt><dd className="m-0 font-semibold">{sourceCounts.provider} provider, {sourceCounts.secondary} secondary</dd></div>
          </dl>
          <div className={CARD_CLASS}>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {explainer.sources.map((source) => (
                <li key={source.url}>
                  <span className={`${BADGE_CLASS} mr-2`}>{source.kind === "provider" ? "Provider page" : "Secondary: confirm"}</span>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.label}</a>
                </li>
              ))}
            </ul>
            {sourceCounts.provider === 0 && (
              <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Every source here is secondary. We link the provider&apos;s own page as soon as we can read it.</p>
            )}
            <p className="mb-0 mt-3 text-sm">
              <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
            </p>
          </div>
        </div>
        {explainer.notice && <p className="mb-0 mt-4 text-sm font-semibold">{explainer.notice}</p>}
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions">
        <div className="grid gap-3">
          {explainer.faq.map((entry) => (
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

      {more.length > 0 && (
        <PageSection id="more" title="More explainers">
          <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
            {more.map((item) => (
              <li key={item.slug} className={CARD_CLASS}>
                <span className={BADGE_CLASS}>{TOPIC_LABELS[item.topic]}</span>
                <p className="mb-1 mt-3 font-semibold"><Link href={`/news/explainers/${item.slug}`}>{item.title}</Link></p>
                <p className="m-0 text-xs text-[var(--color-muted)]">{formatDateLabel(item.publishedIso)}</p>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Stay current</p>
          <p className="m-0 font-semibold">Every new explainer goes into the weekly roundup</p>
        </div>
        <Link href="/news" className={BUTTON_PRIMARY}>Back to News</Link>
      </footer>
    </div>
  );
}