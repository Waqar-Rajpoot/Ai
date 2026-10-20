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

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

/** 404 page: a short message, a search box and three popular links. */
export default function NotFound() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Error 404
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Page not found</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          The page you asked for does not exist, or it has moved. Try a search, or use one of the links below.
        </p>

        <form action="/search" method="get" role="search" className="relative mt-6 flex max-w-xl flex-wrap gap-3">
          <label htmlFor="not-found-search" className="sr-only">
            Search the site
          </label>
          <input
            id="not-found-search"
            name="q"
            type="search"
            placeholder="For example: prompts, pricing, RAG"
            className={`min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
          />
          <button
            type="submit"
            className={`rounded-full bg-[image:var(--gradient-accent)] px-5 py-2 font-semibold text-white ${FOCUS_RING}`}
          >
            Search
          </button>
        </form>
      </header>

      <section aria-labelledby="popular-links-heading" className="mt-10">
        <h2 id="popular-links-heading" className="mb-4 mt-0">
          Popular links
        </h2>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-3">
          {POPULAR_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <strong className="block">{link.label}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-6 text-sm">
          <Link href="/">Back to the home page</Link>
        </p>
      </section>
    </div>
  );
}