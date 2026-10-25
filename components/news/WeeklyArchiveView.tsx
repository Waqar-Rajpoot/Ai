import Link from "next/link";
import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { NEWSLETTER_ACTION_URL } from "@/lib/config/env";
import { NEWSLETTER_EMAIL_FIELD_NAME } from "@/lib/news/newsConstants";
import { NEWSLETTER_BENEFITS, WEEKLY_PARTS } from "@/lib/news/newsContent";
import { NEWS_POSTS } from "@/lib/news/newsIndex";
import { summarizeArchive } from "@/lib/news/weeklyArchive";
import { WEEKLY_ARCHIVE_REVIEWED_ON } from "@/lib/news/weeklyArchiveConstants";
import {
  FAQ,
  GLOSSARY,
  READ_IN_FIVE,
  RELATED_LINKS,
  SECTION_GUIDE,
  SOURCES,
  SUMMARY_POINTS,
  WEEKLY_ROUTINE,
} from "@/lib/news/weeklyArchiveContent";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { WeeklyArchive } from "./WeeklyArchive";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "archive", label: "The archive" },
  { id: "coverage", label: "Coverage" },
  { id: "inside", label: "Inside a roundup" },
  { id: "read", label: "Read in five minutes" },
  { id: "routine", label: "Behind each roundup" },
  { id: "subscribe", label: "Subscribe" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const SUMMARY = summarizeArchive(NEWS_POSTS);

/** Weekly roundup archive: every roundup by date, a coverage check, a section guide and signup. */
export function WeeklyArchiveView() {
  const stats: readonly { label: string; value: string }[] = [
    { label: "Roundups published", value: String(SUMMARY.count) },
    { label: "First roundup", value: SUMMARY.firstOn ? formatIsoDate(SUMMARY.firstOn) : "None yet" },
    { label: "Latest roundup", value: SUMMARY.latestOn ? formatIsoDate(SUMMARY.latestOn) : "None yet" },
    { label: "Longest gap", value: SUMMARY.count > 1 ? `${SUMMARY.longestGapDays} days` : "Not enough data" },
  ];

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/news">News</Link> › <span aria-current="page">Weekly roundups</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">News · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Archive</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {WEEKLY_ARCHIVE_REVIEWED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Weekly AI roundups, by date</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Every weekly roundup in one place: new models, price changes, safety and policy news, and what to watch next week. Dated, sourced and sent by email on a fixed weekday.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#archive" className={BUTTON_PRIMARY}>Browse the archive</a>
          <a href="#subscribe" className={BUTTON_OUTLINE}>Get it by email</a>
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
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Short on time?</p>
            <p className="mb-2 mt-1 text-sm">Open the newest roundup and read only the summary and <em>Next week</em>.</p>
            <p className="m-0 text-sm">Prefer email? <a href="#subscribe">Subscribe</a>.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying. Old roundups show what was true on their own date.</p>
      </PageSection>

      <PageSection id="archive" title="The archive" intro="Newest first, grouped by month. Filter by year or search a title.">
        <WeeklyArchive />
      </PageSection>

      <PageSection id="coverage" title="Coverage: have we kept to the schedule?" intro="We aim for one roundup every week. This panel is worked out from the archive itself, so it shows any week we missed.">
        <dl className="m-0 mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`${CARD_CLASS} py-3`}>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
              <dd className="m-0 text-lg font-extrabold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
        {SUMMARY.count < 2 ? (
          <div className={CARD_CLASS}>
            <p className="m-0 text-sm text-[var(--color-muted)]">We need at least two roundups before we can measure gaps. Until then, this panel only counts what has been published.</p>
          </div>
        ) : SUMMARY.gaps.length === 0 ? (
          <div className={CARD_CLASS}>
            <p className="m-0 text-sm">No missed weeks so far. Every roundup came within the expected window.</p>
          </div>
        ) : (
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <p className="m-0 text-sm font-semibold">Weeks we missed</p>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {SUMMARY.gaps.map((gap) => (
                <li key={`${gap.fromOn}-${gap.toOn}`}>
                  {formatIsoDate(gap.fromOn)} to {formatIsoDate(gap.toOn)}: {gap.days} days between roundups, about {gap.missedWeeks} missed week{gap.missedWeeks === 1 ? "" : "s"}.
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageSection>

      <PageSection id="inside" title="Inside a roundup" intro="Every roundup has the same six parts, in the same order.">
        <ol className="m-0 mb-4 flex list-none flex-wrap gap-2 p-0">
          {WEEKLY_PARTS.map((part, index) => (
            <li key={part} className={BADGE_CLASS}>{index + 1}. {part}</li>
          ))}
        </ol>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <caption className="sr-only">The parts of a weekly roundup, what each covers, who it suits and where to go deeper</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Part</th>
                <th scope="col" className="p-3">What it covers</th>
                <th scope="col" className="p-3">Best for</th>
                <th scope="col" className="p-3">Go deeper</th>
              </tr>
            </thead>
            <tbody>
              {SECTION_GUIDE.map((row) => (
                <tr key={row.section} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.section}</th>
                  <td className="p-3 align-top">{row.covers}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.bestFor}</td>
                  <td className="p-3 align-top">
                    <ul className="m-0 grid list-none gap-1 p-0">
                      {row.goDeeper.map((link) => (
                        <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="read" title="Read a roundup in five minutes">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {READ_IN_FIVE.map((step, index) => (
            <li key={step.headline} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.headline}</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="routine" title="What happens behind each roundup" intro="The weekly routine that feeds every post, in the order we do it. It takes about two hours.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {WEEKLY_ROUTINE.map((step, index) => (
            <li key={step.headline} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-accent)] text-sm font-bold text-[var(--color-accent)]">{index + 1}</span>
              <span className="text-sm"><strong>{step.headline}</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">Where the facts come from: <Link href="/about/source-policy">source policy</Link>. Mistakes: <Link href="/about/corrections">corrections log</Link> and <Link href="/news/changelog">changelog</Link>.</p>
      </PageSection>

      <PageSection id="subscribe" title="Subscribe">
        <div className="grid gap-6 lg:grid-cols-2">
          <NewsletterBox
            actionUrl={NEWSLETTER_ACTION_URL}
            emailFieldName={NEWSLETTER_EMAIL_FIELD_NAME}
            heading="The weekly roundup, by email"
            description="The same roundup you see in this archive, sent on a fixed weekday."
            benefits={NEWSLETTER_BENEFITS}
          />
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Other ways to follow</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              <li>Bookmark this page and check it once a week.</li>
              <li>Use the <Link href="/news">News hub</Link> for release posts, price-change notes and explainers between roundups.</li>
              <li>Check <Link href="/prices/retirements">the retirements tracker</Link> if you build with an API.</li>
            </ul>
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">The newsletter may carry one labelled sponsor slot, which never changes a score or a verdict. See <Link href="/about/independence">independence and disclosure</Link>.</p>
          </div>
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
            <li>A roundup is accurate as of its verified-on date. Prices, plans and dates can change afterwards, so confirm on the provider&apos;s own page.</li>
            <li>The site is static and hand-written, so it can lag behind a late change. Our weekly schedule is a target, and the coverage panel shows when we missed it.</li>
            <li>The latest-roundup day count uses your browser&apos;s date and reads dates as UTC.</li>
            <li>This page is general information, not legal, financial or investment advice.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${WEEKLY_ARCHIVE_REVIEWED_ON}. The explanations are hand-written. Each roundup says which numbers are ours, independent or reported by the maker.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Where our data comes from</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? (
                    <Link href={source.href}>{source.publisher}: {source.title}</Link>
                  ) : (
                    <span className="font-semibold">{source.publisher}: {source.title}</span>
                  )}
                  <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Related on this site</h3>
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
          <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See the dates coming up: retirements and price changes</p>
        </div>
        <Link href="/news#coming-up" className={BUTTON_PRIMARY}>Open Coming up</Link>
      </footer>
    </div>
  );
}