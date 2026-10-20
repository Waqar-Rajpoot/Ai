import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

export interface GuideListItem {
  number: number;
  title: string;
  summary: string;
  href: string;
  kind: string;
  minutes: number;
  isPublished: boolean;
}

/** Numbered article cards. Unpublished articles show "Coming soon" and are not links. */
export function GuideCardList({ items }: { items: readonly GuideListItem[] }) {
  return (
    <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {items.map((guide) => {
        const body = (
          <>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[var(--color-accent)]">
                {guide.kind.toUpperCase()} {guide.number}
              </span>
              <span className="text-[var(--color-muted)]">{guide.minutes} min read</span>
            </div>
            <strong className="mt-2 block text-lg">{guide.title}</strong>
            <span className="mt-1 block text-sm text-[var(--color-muted)]">{guide.summary}</span>
            {!guide.isPublished && (
              <span className="mt-3 inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Coming soon</span>
            )}
          </>
        );

        return (
          <li key={guide.number}>
            {guide.isPublished ? (
              <Link
                href={guide.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {body}
              </Link>
            ) : (
              <div className={`${CARD_CLASS} h-full opacity-80`}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}