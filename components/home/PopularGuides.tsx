import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { POPULAR_GUIDES } from "@/lib/home/homeContent";

/** The ten guides to read first, numbered like a "most useful" list. */
export function PopularGuides() {
  return (
    <ol className={`${CARD_CLASS} m-0 grid list-none gap-0 p-0 md:grid-cols-2`}>
      {POPULAR_GUIDES.map((guide, index) => (
        <li key={guide.number} className="flex items-center gap-4 border-t border-[var(--color-border)] p-4 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
          <span className="w-8 shrink-0 text-3xl font-extrabold tabular-nums text-[var(--color-accent)]">{index + 1}</span>
          <div>
            <Link href={guide.href} className={`font-semibold ${FOCUS_RING}`}>{guide.title}</Link>
            <p className="m-0 mt-1 flex flex-wrap gap-1">
              <span className={BADGE_CLASS}>{guide.levelLabel}</span>
              <span className={BADGE_CLASS}>{guide.kind}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}