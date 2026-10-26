import Link from "next/link";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, FOCUS_RING } from "@/components/shared/pageStyles";
import type { HomeLink } from "@/lib/home/homeContent";

export interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  stats: readonly HeroStat[];
  popularSearches: readonly HomeLink[];
}

const TRUST_BAR: readonly string[] = [
  "Every number dated and sourced",
  "Payment never changes a score",
  "Updated every week",
];

/** Headline, promise, two main actions, popular searches and key numbers. */
export function Hero({ stats, popularSearches }: HeroProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-10 blur-3xl" />

      <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
        <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Learn</span>
        <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Compare</span>
        <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Stay current</span>
      </p>

      <h1 className="relative mb-4 mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Understand AI. Compare the models. Stay current.
      </h1>
      <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
        Plain-English guides, dated tests and sourced prices for everyday people, from your first prompt to expert topics. No hype, and nothing that cannot be checked.
      </p>

      <div className="relative mt-7 flex flex-wrap gap-3">
        <Link href="/compare/models" className={BUTTON_PRIMARY}>Compare models</Link>
        <Link href="/learn" className={BUTTON_OUTLINE}>Start learning</Link>
      </div>

      <div className="relative mt-7">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Popular right now</p>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {popularSearches.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <dl className="relative m-0 mt-8 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            <dd className="m-0 text-3xl font-extrabold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="relative m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
        {TRUST_BAR.map((text) => (
          <li key={text} className={BADGE_CLASS}>
            <span aria-hidden="true" className="mr-1 text-[var(--color-accent)]">✓</span>
            {text}
          </li>
        ))}
      </ul>
    </header>
  );
}