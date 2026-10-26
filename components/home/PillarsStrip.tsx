import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { PILLARS } from "@/lib/home/homeContent";

/** The three pillars of the site, each with what it offers and one link in. */
export function PillarsStrip() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
      {PILLARS.map((pillar) => (
        <li key={pillar.id} className={`${CARD_CLASS} border-t-4 border-t-[var(--color-accent)]`}>
          <h2 className="m-0 text-2xl font-extrabold tracking-tight">{pillar.title}</h2>
          <p className="mb-3 mt-1 text-sm font-semibold text-[var(--color-accent)]">{pillar.tagline}</p>
          <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
            {pillar.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <p className="mb-0 mt-4">
            <Link href={pillar.link.href} className={`font-semibold ${FOCUS_RING}`}>{pillar.link.label} →</Link>
          </p>
        </li>
      ))}
    </ul>
  );
}