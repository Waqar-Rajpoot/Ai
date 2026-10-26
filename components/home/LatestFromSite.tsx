import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LATEST_STORIES } from "@/lib/home/homeContent";
import { formatIsoDate } from "@/lib/prices/formatPrice";

/** A lead story and a list of recent ones, newest first. */
export function LatestFromSite() {
  const [lead, ...others] = [...LATEST_STORIES].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  if (!lead) return null;

  return (
    <div className="grid gap-4">
      <article className={`${CARD_CLASS} border-t-4 border-t-[var(--color-accent)]`}>
        <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
          <span className={BADGE_CLASS}>{lead.kind}</span>
          <time dateTime={lead.publishedOn} className="text-[var(--color-muted)]">{formatIsoDate(lead.publishedOn)}</time>
        </p>
        <h3 className="mb-2 mt-3 text-2xl">
          <Link href={lead.href} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>{lead.title}</Link>
        </h3>
        <p className="m-0 text-[var(--color-muted)]">{lead.summary}</p>
        <p className="mb-0 mt-3"><Link href={lead.href} className={`font-semibold ${FOCUS_RING}`}>Read the post →</Link></p>
      </article>

      <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
        {others.map((story) => (
          <li key={story.id} className={CARD_CLASS}>
            <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
              <span className={BADGE_CLASS}>{story.kind}</span>
              <time dateTime={story.publishedOn} className="text-[var(--color-muted)]">{formatIsoDate(story.publishedOn)}</time>
            </p>
            <h4 className="mb-1 mt-2 text-base">
              <Link href={story.href} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>{story.title}</Link>
            </h4>
            <p className="m-0 text-sm text-[var(--color-muted)]">{story.summary}</p>
          </li>
        ))}
      </ul>
      <p className="m-0 text-sm"><Link href="/news">All news and explainers</Link> · <Link href="/news/changelog">Changelog</Link></p>
    </div>
  );
}