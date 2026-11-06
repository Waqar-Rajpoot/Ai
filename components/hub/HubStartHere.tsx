import Link from "next/link";
import type { HubTopic } from "@/lib/hub/hubTypes";
import { HUB_CARD_FOCUS, HUB_STRETCHED_LINK } from "./hubStyles";

interface HubStartHereProps {
  intro: string;
  /** The first topic is featured; the rest are listed beside it. */
  topics: readonly HubTopic[];
}

/** "Start here" block: one featured page with highlights, plus up to two quick picks. */
export function HubStartHere({ intro, topics }: HubStartHereProps) {
  const [featured, ...others] = topics;

  return (
    <section id="start-here" aria-labelledby="start-here-title" className="scroll-mt-24 py-10">
      <h2 id="start-here-title" className="m-0 text-2xl">
        Start here
      </h2>
      <p className="mb-0 mt-2 max-w-2xl text-[var(--color-muted)]">{intro}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[3fr_2fr]">
        <article className={`group relative rounded-xl border border-[var(--color-border)] border-t-4 border-t-[var(--color-accent)] bg-[var(--color-surface)] p-6 sm:p-8 ${HUB_CARD_FOCUS}`}>
          {featured.kind && <p className="m-0 text-sm font-medium text-[var(--color-accent)]">{featured.kind}</p>}
          <h3 className="mb-0 mt-2 text-2xl">
            <Link href={featured.href} className={HUB_STRETCHED_LINK}>
              {featured.title}
            </Link>
          </h3>
          <p className="mb-0 mt-3 max-w-prose text-[var(--color-muted)]">{featured.description}</p>
          {featured.points && (
            <ul className="mb-0 mt-5 grid gap-2 pl-5 text-sm">
              {featured.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </article>

        {others.length > 0 && (
          <ul className="m-0 grid list-none content-start gap-4 p-0">
            {others.map((topic) => (
              <li key={topic.href} className={`group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 ${HUB_CARD_FOCUS}`}>
                {topic.kind && <p className="m-0 text-sm text-[var(--color-muted)]">{topic.kind}</p>}
                <h3 className="mb-0 mt-1 text-lg">
                  <Link href={topic.href} className={HUB_STRETCHED_LINK}>
                    {topic.title}
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{topic.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}