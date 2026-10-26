import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { READER_PATHS } from "@/lib/home/homeContent";

/** Six reader paths, each with three guides to open first. */
export function StartHerePaths() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
      {READER_PATHS.map((path) => (
        <li key={path.id} className={`${CARD_CLASS} flex flex-col`}>
          <h3 className="m-0">{path.title}</h3>
          <p className="mb-3 mt-1 text-sm text-[var(--color-muted)]">{path.description}</p>
          <ul className="m-0 grid list-none gap-2 p-0 text-sm">
            {path.picks.map((pick, index) => (
              <li key={pick.href} className="flex gap-2">
                <span aria-hidden="true" className="text-[var(--color-accent)]">{index === 0 ? "★" : "•"}</span>
                <Link href={pick.href} className={FOCUS_RING}>{pick.label}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}