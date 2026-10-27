import Link from "next/link";
import { COMING_SOON_LABEL, GUIDE_KIND_LABELS } from "@/lib/learn/guideConfig";
import type { GuideCardData } from "@/lib/learn/guideTypes";

interface GuideCardProps {
  readonly card: GuideCardData;
  /** Position shown to the reader, starting at 1. */
  readonly position: number;
}

/**
 * One guide entry on a level hub. The badge comes from `card.published`, so
 * "Coming soon" can never disagree with whether the page exists.
 */
export function GuideCard({ card, position }: GuideCardProps) {
  const body = (
    <>
      <p className="text-sm text-slate-600">
        {GUIDE_KIND_LABELS[card.kind]} {position} · {card.readMinutes} min read
      </p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{card.title}</h3>
      <p className="mt-1 text-slate-700">{card.summary}</p>
      {!card.published && (
        <p className="mt-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-700">
          {COMING_SOON_LABEL}
        </p>
      )}
    </>
  );

  if (!card.published) {
    return <li className="rounded-lg border border-slate-200 p-4 opacity-80">{body}</li>;
  }

  return (
    <li>
      <Link
        href={card.href}
        className="block rounded-lg border border-slate-200 p-4 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        {body}
      </Link>
    </li>
  );
}
