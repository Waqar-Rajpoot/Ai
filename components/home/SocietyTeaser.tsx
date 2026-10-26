import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { SOCIETY_CARDS, SOCIETY_STAT } from "@/lib/home/homeContent";

/** One headline number and four doors into the AI and society hub. */
export function SocietyTeaser() {
  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <figure className={`${CARD_CLASS} m-0 border-t-4 border-t-[var(--color-accent)]`}>
        <p className="m-0 text-6xl font-extrabold tabular-nums tracking-tight">{SOCIETY_STAT.value}</p>
        <figcaption>
          <p className="mb-0 mt-2 font-semibold">{SOCIETY_STAT.label}</p>
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{SOCIETY_STAT.context}</p>
          <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
            Source: {SOCIETY_STAT.source}. <Link href={SOCIETY_STAT.href} className={FOCUS_RING}>See the data explained</Link>
          </p>
        </figcaption>
      </figure>
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
        {SOCIETY_CARDS.map((card) => (
          <li key={card.href} className={CARD_CLASS}>
            <h3 className="m-0">
              <Link href={card.href} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>{card.title}</Link>
            </h3>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{card.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}