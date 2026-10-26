import Link from "next/link";
import { CARD_CLASS } from "@/components/shared/pageStyles";
import { SitemapExplorer } from "@/components/sitemap/SitemapExplorer";
import { SitemapIntentFinder } from "@/components/sitemap/SitemapIntentFinder";
import { LEVEL_BLURBS, LEVEL_LABELS, PUBLISHED_PATHS, UPDATED_ON, XML_SITEMAP_PATH } from "@/lib/sitemap/sitemapConstants";
import { HOME_PAGE, INTENTS, SECTIONS } from "@/lib/sitemap/sitemapData";
import { countPages, flattenPages, getRecentlyUpdated, validateSitemap } from "@/lib/sitemap/sitemapLogic";
import type { PageLevel } from "@/lib/sitemap/sitemapTypes";

const problems = validateSitemap(HOME_PAGE, SECTIONS, INTENTS);
if (problems.length > 0) {
  throw new Error(`Sitemap data is invalid:\n${problems.join("\n")}`);
}

const COUNTS = countPages(HOME_PAGE, SECTIONS);
const RECENT = getRecentlyUpdated(flattenPages(HOME_PAGE, SECTIONS));
const PUBLISHED_ARRAY = Array.from(PUBLISHED_PATHS);
const LEVELS: readonly PageLevel[] = [1, 2, 3, 4];

/** "October 25, 2026". UTC so the day never shifts. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** /sitemap: every page, what is live, what is next, and the fastest way to the one you want. */
export function SitemapView() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">Sitemap</p>
        <h1 className="mb-2 mt-1">Every page on this site, and the fastest way to the one you need</h1>
        <p className="m-0 text-lg">
          {COUNTS.total} pages in {COUNTS.sections} sections. Tell us what you want to do and we point you to one page. Or search, or browse. Pages that are not published yet are marked, so you never click a dead link.
        </p>
      </header>

      <section aria-label="At a glance" className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{COUNTS.total}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">pages planned</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{COUNTS.live}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">live now</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{COUNTS.soon}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">coming soon</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{COUNTS.sections}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">sections</p>
        </div>
      </section>

      <section aria-labelledby="finder" className="mb-10">
        <h2 id="finder" className="mb-1">Not sure where to start?</h2>
        <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">Pick the closest match.</p>
        <SitemapIntentFinder intents={INTENTS} publishedPaths={PUBLISHED_ARRAY} />
      </section>

      <section aria-labelledby="recent" className="mb-10">
        <h2 id="recent" className="mb-3">Updated lately</h2>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {RECENT.map(({ page, updatedIso }) => (
            <li key={page.path} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">Updated {formatDate(updatedIso)}</p>
              <h3 className="mb-1 mt-1 text-base">
                <Link href={page.path}>{page.title}</Link>
              </h3>
              <p className="m-0 text-sm">{page.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="all-pages" className="mb-10">
        <h2 id="all-pages" className="mb-3">All pages</h2>
        <SitemapExplorer
          home={HOME_PAGE}
          sections={SECTIONS}
          publishedPaths={PUBLISHED_ARRAY}
          updatedOn={UPDATED_ON}
          liveCount={COUNTS.live}
          soonCount={COUNTS.soon}
        />
      </section>

      <section aria-labelledby="levels" className={`${CARD_CLASS} mb-10`}>
        <h2 id="levels" className="mt-0">What the four levels mean</h2>
        <p className="mt-0 text-sm text-[var(--color-muted)]">Guides in Learn carry a level so you can skip what is too easy or too hard.</p>
        <dl className="mb-0 grid gap-3 text-sm sm:grid-cols-2">
          {LEVELS.map((level) => (
            <div key={level}>
              <dt className="font-semibold">{LEVEL_LABELS[level]}</dt>
              <dd className="m-0 text-[var(--color-muted)]">{LEVEL_BLURBS[level]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="trust" className="mb-4">
        <h2 id="trust" className="mt-0">Trust, in two clicks</h2>
        <ul className="space-y-1 pl-5 text-sm">
          <li>Every page shows a date. The <Link href="/news/changelog">changelog</Link> lists what changed and which sources disagreed.</li>
          <li>Found a mistake? Use the <Link href="/about/corrections">corrections log</Link>.</li>
          <li>Looking for the machine-readable version? It is at <a href={XML_SITEMAP_PATH}>{XML_SITEMAP_PATH}</a> and lists live pages only.</li>
        </ul>
      </section>
    </main>
  );
}