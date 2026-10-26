import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { getLevelHref, LEVEL_DEFINITIONS, LEVEL_ORDER } from "@/lib/shared/levels";

/** The four learning levels, from Foundations to Expert, in order. */
export function LevelRow() {
  return (
    <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
      {LEVEL_ORDER.map((levelKey) => {
        const level = LEVEL_DEFINITIONS[levelKey];
        return (
          <li key={levelKey} className={`${CARD_CLASS} flex flex-col`}>
            <span className={`${BADGE_CLASS} self-start`}>Level {level.number}</span>
            <h3 className="mb-1 mt-3">{level.name}</h3>
            <p className="m-0 text-xs text-[var(--color-muted)]">For: {level.reader}</p>
            <p className="mb-0 mt-3 flex-1 text-sm">After this level you can: {level.outcome.charAt(0).toLowerCase()}{level.outcome.slice(1)}.</p>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Typical page: {level.typicalPage}</p>
            <p className="mb-0 mt-4">
              <Link href={getLevelHref(levelKey)} className={`font-semibold ${FOCUS_RING}`}>Open {level.name} →</Link>
            </p>
          </li>
        );
      })}
    </ol>
  );
}