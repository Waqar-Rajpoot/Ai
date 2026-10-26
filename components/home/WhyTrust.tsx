import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { TRUST_PLEDGES, TRUST_POINTS } from "@/lib/home/homeContent";

/** How we test, our independence and our corrections policy, plus four pledges. */
export function WhyTrust() {
  return (
    <div className="grid gap-6">
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
        {TRUST_POINTS.map((point) => (
          <li key={point.title} className={CARD_CLASS}>
            <h3 className="m-0">{point.title}</h3>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{point.description}</p>
            <p className="mb-0 mt-3 text-sm"><Link href={point.link.href} className={`font-semibold ${FOCUS_RING}`}>{point.link.label} →</Link></p>
          </li>
        ))}
      </ul>
      <ul className={`${CARD_CLASS} m-0 grid list-none gap-2 text-sm md:grid-cols-2`}>
        {TRUST_PLEDGES.map((pledge) => (
          <li key={pledge} className="flex gap-2">
            <span aria-hidden="true" className="text-[var(--color-accent)]">✓</span>
            {pledge}
          </li>
        ))}
      </ul>
    </div>
  );
}