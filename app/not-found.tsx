import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Search the site or use one of the popular links.",
};

/** Blueprint 5.1: popular links shown on the 404 page. */
const POPULAR_LINKS: readonly { label: string; description: string; href: string }[] = [
  { label: "Start here", description: "Choose a learning level, from first steps to expert topics.", href: "/learn" },
  { label: "Model directory", description: "Compare named AI models with dated prices and test results.", href: "/compare/models" },
  { label: "Glossary", description: "AI terms in plain English, tagged by level.", href: "/learn/glossary" },
];

/** Links kept at the foot of the page. */
const FOOT_LINKS: readonly { label: string; href: string }[] = [
  { label: "Report a broken link", href: "/about/corrections" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms" },
];

/** A serif system stack, so the page does not fall back on a default UI font. */
const HEADING_FONT = 'Georgia, "Iowan Old Style", "Palatino Linotype", serif';

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

/** 404 page: a short message, a working search box and three popular links. */
export default function NotFound() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-20 pt-10">
      <section
        aria-labelledby="not-found-heading"
        className="grid gap-6 border-b border-[var(--color-border)] pb-10 md:grid-cols-[auto_1fr] md:items-end md:gap-14"
      >
        <p
          aria-hidden="true"
          style={{ fontFamily: HEADING_FONT }}
          className="m-0 select-none text-[clamp(5.5rem,17vw,12rem)] leading-[0.85] text-[color-mix(in_srgb,var(--color-text)_20%,var(--color-bg))]"
        >
          404
        </p>

        <div>
          <h1
            id="not-found-heading"
            style={{ fontFamily: HEADING_FONT }}
            className="m-0 text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight"
          >
            Page not found
          </h1>
          <p className="mb-0 mt-3 max-w-xl text-lg text-[var(--color-muted)]">
            The address you opened does not lead to a page on this site. It may have moved, or the link may have a typo.
          </p>

          <form action="/search" method="get" role="search" className="mt-6 flex max-w-xl flex-wrap gap-3">
            <label htmlFor="not-found-search" className="sr-only">
              Search the site
            </label>
            <input
              id="not-found-search"
              name="q"
              type="search"
              placeholder="For example: prompts, pricing, RAG"
              className={`min-w-0 flex-1 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
            />
            <button
              type="submit"
              className={`rounded-sm bg-[var(--color-accent)] px-5 py-2 font-semibold text-[var(--color-accent-contrast)] hover:opacity-90 ${FOCUS_RING}`}
            >
              Search
            </button>
          </form>

          <p className="mb-0 mt-5 max-w-xl text-sm text-[var(--color-muted)]">
            Some guides are still being written, so a link may point to a page that does not exist yet. The{" "}
            <Link href="/learn" className={`underline underline-offset-4 ${FOCUS_RING}`}>
              level pages
            </Link>{" "}
            show which ones are ready.
          </p>
        </div>
      </section>

      <section aria-labelledby="popular-links-heading" className="pt-10">
        <h2
          id="popular-links-heading"
          style={{ fontFamily: HEADING_FONT }}
          className="m-0 mb-2 text-2xl font-bold tracking-tight"
        >
          Start from one of these
        </h2>
        <ul className="m-0 list-none divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] p-0">
          {POPULAR_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group grid gap-1 py-4 text-[var(--color-text)] no-underline sm:grid-cols-[13rem_1fr] sm:gap-8 ${FOCUS_RING}`}
              >
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                <span className="text-[var(--color-muted)]">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-6">
          <Link href="/" className={`underline underline-offset-4 ${FOCUS_RING}`}>
            Back to the home page
          </Link>
        </p>
      </section>

      <nav aria-label="Legal and support" className="mt-14 border-t border-[var(--color-border)] pt-5">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm">
          {FOOT_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`text-[var(--color-muted)] underline underline-offset-4 hover:text-[var(--color-text)] ${FOCUS_RING}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}