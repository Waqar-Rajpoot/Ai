import type { TermEntry } from "@/lib/shared/contentTypes";
import { CARD_CLASS } from "./pageStyles";

interface TermGridProps {
  terms: readonly TermEntry[];
}

/** A grid of short definitions. */
export function TermGrid({ terms }: TermGridProps) {
  return (
    <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {terms.map((entry) => (
        <div key={entry.term} className={CARD_CLASS}>
          <dt className="font-bold">{entry.term}</dt>
          <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}