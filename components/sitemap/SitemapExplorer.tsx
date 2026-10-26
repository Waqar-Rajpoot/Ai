"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BUTTON_OUTLINE, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { KIND_LABELS, LEVEL_LABELS, SEARCH_PLACEHOLDER } from "@/lib/sitemap/sitemapConstants";
import { countFiltered, filterSections, getPageStatus } from "@/lib/sitemap/sitemapLogic";
import type { SitePage, SiteSection, StatusFilter } from "@/lib/sitemap/sitemapTypes";

interface Props {
  home: SitePage;
  sections: readonly SiteSection[];
  publishedPaths: readonly string[];
  updatedOn: Readonly<Record<string, string>>;
  liveCount: number;
  soonCount: number;
}

const OPEN_LIMIT = 9;

/** "October 25, 2026". UTC so the day never shifts. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

function PageRow({ page, live, updatedIso }: { page: SitePage; live: boolean; updatedIso?: string }) {
  return (
    <li className="py-2">
      <p className="m-0 flex flex-wrap items-baseline gap-x-2 text-sm">
        {live ? (
          <Link href={page.path} className="font-semibold">{page.title}</Link>
        ) : (
          <span className="font-semibold text-[var(--color-muted)]">{page.title}</span>
        )}
        <span className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
          {KIND_LABELS[page.kind]}
          {page.level ? ` · ${LEVEL_LABELS[page.level]}` : ""}
        </span>
        {!live && <span className="rounded border border-[var(--color-border)] px-1.5 text-xs">Coming soon</span>}
        {live && updatedIso && <span className="text-xs text-[var(--color-muted)]">Updated {formatDate(updatedIso)}</span>}
      </p>
      <p className="m-0 mt-0.5 text-sm text-[var(--color-muted)]">{page.description}</p>
    </li>
  );
}

/** Search, filter by status, and browse every page grouped by section. */
export function SitemapExplorer({ home, sections, publishedPaths, updatedOn, liveCount, soonCount }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const published = useMemo(() => new Set(publishedPaths), [publishedPaths]);

  const filtered = useMemo(() => filterSections(sections, query, status, published), [sections, query, status, published]);
  const shown = countFiltered(filtered);
  const searching = query.trim() !== "";
  const showHome = (status === "all" || status === getPageStatus(home.path, published)) && (!searching || "home start".includes(query.trim().toLowerCase()));

  const statusButtons: { id: StatusFilter; label: string }[] = [
    { id: "all", label: `All (${liveCount + soonCount})` },
    { id: "live", label: `Live now (${liveCount})` },
    { id: "soon", label: `Coming soon (${soonCount})` },
  ];

  return (
    <div>
      <div className={`${CARD_CLASS} mb-6`}>
        <label htmlFor="sitemap-query" className="text-sm font-semibold">Search every page</label>
        <input
          id="sitemap-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={SEARCH_PLACEHOLDER}
          className={`${INPUT_CLASS} mt-2`}
        />
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {statusButtons.map((button) => (
            <button
              key={button.id}
              type="button"
              aria-pressed={status === button.id}
              onClick={() => setStatus(button.id)}
              className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm ${status === button.id ? "font-bold" : ""}`}
            >
              {button.label}
            </button>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          Showing {shown + (showHome ? 1 : 0)} pages.
        </p>
      </div>

      {shown === 0 && !showHome && (
        <div className={CARD_CLASS}>
          <p className="m-0 text-sm text-[var(--color-muted)]">
            No page matches. Try fewer words, or use the search page. If you expected a page to be here, tell us on the corrections page.
          </p>
        </div>
      )}

      {showHome && (
        <ul className="m-0 mb-6 list-none p-0">
          <PageRow page={home} live={getPageStatus(home.path, published) === "live"} updatedIso={updatedOn[home.path]} />
        </ul>
      )}

      {filtered.map(({ section, groups }) => (
        <section key={section.id} aria-labelledby={`sm-${section.id}`} className="mb-10">
          <h2 id={`sm-${section.id}`} className="mb-1">
            <Link href={section.hubPath} className={getPageStatus(section.hubPath, published) === "live" ? "" : "pointer-events-none text-[var(--color-muted)]"}>
              {section.title}
            </Link>
          </h2>
          <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">{section.summary}</p>
          <div className="grid gap-4">
            {groups.map((group) => (
              <details key={`${group.id}-${searching}-${status}`} open={searching || status !== "all" || group.pages.length <= OPEN_LIMIT} className={CARD_CLASS}>
                <summary className="cursor-pointer text-base font-semibold">
                  {group.title} <span className="text-sm font-normal text-[var(--color-muted)]">({group.pages.length})</span>
                </summary>
                {group.note && <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{group.note}</p>}
                <ul className="m-0 mt-2 list-none divide-y divide-[var(--color-border)] p-0">
                  {group.pages.map((page) => (
                    <PageRow key={page.path} page={page} live={getPageStatus(page.path, published) === "live"} updatedIso={updatedOn[page.path]} />
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}