import Link from "next/link";
import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { NEWSLETTER_ACTION_URL } from "@/lib/config/env";
import { NEWSLETTER_EMAIL_FIELD_NAME, NEWS_REVIEWED_ON, WEEKLY_PREVIEW_COUNT } from "@/lib/news/newsConstants";
import {
  BEFORE_YOU_ACT,
  CADENCE_ROWS,
  FAQ,
  GLOSSARY,
  LABELS,
  NEWSLETTER_BENEFITS,
  POST_BOTTOM_PARTS,
  POST_TOP_PARTS,
  PRICE_NOTE_FIELDS,
  READER_ROUTES,
  RELATED_LINKS,
  SOURCES,
  SOURCE_STEPS,
  STANDING_PAGES,
  SUMMARY_POINTS,
  WEEKLY_PARTS,
} from "@/lib/news/newsContent";
import { NEWS_POSTS, PRICE_CHANGE_NOTES } from "@/lib/news/newsIndex";
import { describePostLevels, sortNewestFirst, sortNotesNewestFirst } from "@/lib/news/news";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { NewsFeed } from "./NewsFeed";
import { WatchList } from "./WatchList";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "latest", label: "Latest posts" },
  { id: "weekly", label: "Weekly roundups" },
  { id: "price-changes", label: "Price-change notes" },
  { id: "coming-up", label: "Coming up" },
  { id: "how-we-publish", label: "How we publish" },
  { id: "anatomy", label: "Inside a post" },
  { id: "readers", label: "Where to start" },
  { id: "standing", label: "Standing pages" },
  { id: "subscribe", label: "Subscribe" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const RECENT_WEEKLY = sortNewestFirst(NEWS_POSTS.filter((post) => post.type === "weekly")).slice(0, WEEKLY_PREVIEW_COUNT);
const SORTED_PRICE_NOTES = sortNotesNewestFirst(PRICE_CHANGE_NOTES);

/** News hub: latest posts, weekly roundups, price-change notes, upcoming dates and signup. */
export function NewsHubView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <span aria-current="page">News</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">News · All levels</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {NEWS_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Dated and sourced</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI news that is short, dated and sourced</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          New models, price changes and safety and policy news in plain English. Every item says when it was checked and who said it, and links to the guide that explains the background.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#latest" className={BUTTON_PRIMARY}>Read the latest</a>
          <a href="#subscribe" className={BUTTON_OUTLINE}>Get the weekly email</a>
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
            <p className="mb-2 mt-1 text-sm">Read the weekly roundup, then check <a href="#coming-up">Coming up</a> for dates that affect you.</p>
            <p className="m-0 text-sm">Prefer email? <a href="#subscribe">Subscribe</a> and the roundup comes to you.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying.</p>
      </PageSection>

      <PageSection id="latest" title="Latest posts" intro="The newest of each type, then every post. Filter by type or search.">
        <NewsFeed />
      </PageSection>

      <PageSection id="weekly" title="Weekly roundups" intro="One post a week that pulls everything together. It is also the newsletter.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What every roundup contains</h3>
            <ol className="m-0 grid gap-2 pl-5 text-sm">
              {WEEKLY_PARTS.map((part) => <li key={part}>{part}</li>)}
            </ol>
            <p className="mb-0 mt-3 text-sm"><Link href="/news/weekly">Open the full archive</Link></p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Most recent</h3>
            {RECENT_WEEKLY.length === 0 ? (
              <p className="m-0 text-sm text-[var(--color-muted)]">The first roundup has not been published yet. It will appear here, and in the archive, when it is.</p>
            ) : (
              <ul className="m-0 grid list-none gap-3 p-0 text-sm">
                {RECENT_WEEKLY.map((post) => (
                  <li key={post.id}>
                    <Link href={post.href}>{post.title}</Link>
                    <span className="block text-xs text-[var(--color-muted)]">{formatIsoDate(post.publishedOn)} · {describePostLevels(post.levels)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </PageSection>

      <PageSection id="price-changes" title="Price-change notes" intro="When a price, plan or limit changes, we publish a short note, then update the tables. Newest first.">
        {SORTED_PRICE_NOTES.length === 0 ? (
          <div className={CARD_CLASS}>
            <p className="m-0 font-semibold">No price changes recorded yet.</p>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">Notes appear here within 24 hours of a confirmed change. Until then, the current prices are on the <Link href="/prices/plans">plans</Link> and <Link href="/prices/api">API</Link> pages.</p>
          </div>
        ) : (
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <caption className="sr-only">Recent price, plan and limit changes</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Published</th>
                  <th scope="col" className="p-3">What changed</th>
                  <th scope="col" className="p-3">Before</th>
                  <th scope="col" className="p-3">After</th>
                  <th scope="col" className="p-3">Takes effect</th>
                  <th scope="col" className="p-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {SORTED_PRICE_NOTES.map((note) => (
                  <tr key={note.id} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-normal tabular-nums">{formatIsoDate(note.publishedOn)}</th>
                    <td className="p-3 align-top font-semibold">{note.provider}: {note.subject}</td>
                    <td className="p-3 align-top">{note.before}</td>
                    <td className="p-3 align-top">{note.after}</td>
                    <td className="p-3 align-top tabular-nums">{formatIsoDate(note.effectiveOn)}</td>
                    <td className="p-3 align-top text-xs text-[var(--color-muted)]">
                      Verified on {formatIsoDate(note.verifiedOn)}
                      {note.sourceUrl && (<><br /><a href={note.sourceUrl} target="_blank" rel="noopener noreferrer">Provider page</a></>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={`${CARD_CLASS} mt-4`}>
          <h3 className="mt-0">What each note tells you</h3>
          <ul className="m-0 grid list-none gap-2 p-0 text-sm md:grid-cols-2">
            {PRICE_NOTE_FIELDS.map((field) => (
              <li key={field.headline}><strong>{field.headline}</strong> {field.detail}</li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection id="coming-up" title="Coming up" intro="Dates that may affect you: models and features being retired, and introductory prices that end. Pick how far ahead to look.">
        <WatchList />
        <p className="mb-0 mt-4 text-sm">
          Full list with model IDs: <Link href="/prices/retirements">Retirements tracker</Link>. Prices: <Link href="/prices/api">API costs</Link>.
        </p>
      </PageSection>

      <PageSection id="how-we-publish" title="How and when we publish" intro="Our targets for each kind of item. They are targets, not guarantees, and the date on each post shows what actually happened.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption className="sr-only">Kinds of news item, what each is, how long, when we aim to publish and where it lives</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Kind</th>
                <th scope="col" className="p-3">What it is</th>
                <th scope="col" className="p-3">Format</th>
                <th scope="col" className="p-3">Our target</th>
                <th scope="col" className="p-3">Readers</th>
                <th scope="col" className="p-3">Where</th>
              </tr>
            </thead>
            <tbody>
              {CADENCE_ROWS.map((row) => (
                <tr key={row.kind} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.kind}</th>
                  <td className="p-3 align-top">{row.whatItIs}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.format}</td>
                  <td className="p-3 align-top">{row.target}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.readers}</td>
                  <td className="p-3 align-top font-mono text-xs">{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm">After a release post, a full review with our scorecard follows within 7 days of our own test run. See <Link href="/about/how-we-test">how we test</Link>.</p>
      </PageSection>

      <PageSection id="anatomy" title="Inside a news post" intro="Every post has the same frame, so you can find what you need quickly.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">At the top</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {POST_TOP_PARTS.map((part) => <li key={part}>{part}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">At the bottom</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {POST_BOTTOM_PARTS.map((part) => <li key={part}>{part}</li>)}
            </ul>
          </div>
        </div>
        <h3>Four labels you will see</h3>
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LABELS.map((entry) => (
            <div key={entry.label} className={CARD_CLASS}>
              <dt className="font-bold">{entry.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
        <h3>Where a number comes from</h3>
        <p className="mt-0 text-sm text-[var(--color-muted)]">We use the first source on this list that answers the question. Vendor numbers never share a column with independent ones.</p>
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {SOURCE_STEPS.map((step) => (
            <li key={step.headline} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{step.headline}</strong> {step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">Read more: <Link href="/about/source-policy">source policy</Link> and <Link href="/about/editorial-standards">editorial standards</Link>.</p>
      </PageSection>

      <PageSection id="readers" title="Where to start" intro="Pick the line that sounds like you.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Which part of the news section suits which reader</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">If you are</th>
                <th scope="col" className="p-3">Start with</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {READER_ROUTES.map((route) => (
                <tr key={route.reader} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{route.reader}</th>
                  <td className="p-3 align-top"><a href={route.href}>{route.start}</a></td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{route.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Five questions before you act on any news item</h3>
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {BEFORE_YOU_ACT.map((question, index) => (
            <li key={question.headline} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{question.headline}</strong> {question.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="standing" title="Standing pages" intro="Pages that are updated in place, not posted once.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {STANDING_PAGES.map((page) => (
            <li key={page.href} className={CARD_CLASS}>
              <h3 className="mt-0"><Link href={page.href}>{page.title}</Link></h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{page.detail}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="subscribe" title="Subscribe">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <NewsletterBox
            actionUrl={NEWSLETTER_ACTION_URL}
            emailFieldName={NEWSLETTER_EMAIL_FIELD_NAME}
            heading="The weekly roundup, by email"
            description="The same roundup we publish here, sent on a fixed weekday."
            benefits={NEWSLETTER_BENEFITS}
          />
          <div className={CARD_CLASS}>
            <h3 className="mt-0">About sponsors</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              The newsletter may carry one sponsor slot. It is always labelled, kept apart from editorial content, and never changes a score or a verdict. Read our <Link href="/about/independence">independence and disclosure</Link> page.
            </p>
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">You can unsubscribe in one click from any email.</p>
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
            <li>News ages quickly. A post is accurate as of its verified-on date, so check the date and the provider&apos;s own page.</li>
            <li>The site is static and hand-written, so it can lag behind a late-breaking change. Our publishing times are targets.</li>
            <li>Day counts in Coming up use your browser&apos;s date and read dates as UTC.</li>
            <li>This page is general information, not legal, financial or investment advice.</li>
          </ul>
        </div>
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${NEWS_REVIEWED_ON}. The explanations are hand-written. The dates in Coming up come from our own retirements and price data, and each says whether it was read on the provider's page or through a tracker.`}>
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
          <p className="m-0 font-semibold">See every model and feature being retired, with a model ID checker</p>
        </div>
        <Link href="/prices/retirements" className={BUTTON_PRIMARY}>Open the retirements tracker</Link>
      </footer>
    </div>
  );
}