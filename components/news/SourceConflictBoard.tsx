import Link from "next/link";
import { CARD_CLASS } from "@/components/shared/pageStyles";
import { CONFIDENCE_LABELS } from "@/lib/news/changelogConstants";
import { formatIsoLabel } from "@/lib/news/changelogLogic";
import type { ChangeEntry, SourceConflict } from "@/lib/news/changelogTypes";

/** Two sources side by side, what we chose, and what we will do next. */
export function SourceConflictCard({ conflict }: { conflict: SourceConflict }) {
  const open = conflict.status === "open";
  return (
    <div className="mt-3 rounded-lg border border-[var(--color-border)] p-3 text-sm">
      <p className="m-0 font-semibold">{conflict.question}</p>
      <dl className="mb-0 mt-2 grid gap-2 md:grid-cols-2">
        {[conflict.sideA, conflict.sideB].map((side) => (
          <div key={side.source} className="rounded-md bg-[var(--color-surface,transparent)] p-2">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{side.source}</dt>
            <dd className="m-0">{side.says}</dd>
          </div>
        ))}
      </dl>
      <p className="mb-0 mt-2">
        <strong>What the site shows:</strong> {conflict.resolution}
      </p>
      <p className="mb-0 mt-1 text-[var(--color-muted)]">
        <strong>{open ? "Still open" : "Resolved"}</strong> · {CONFIDENCE_LABELS[conflict.confidence]} · checked {formatIsoLabel(conflict.checkedOnIso)}
      </p>
      <p className="mb-0 mt-1">
        <strong>Next:</strong> {conflict.nextStep}
      </p>
    </div>
  );
}

/** The unsettled conflicts, pulled to the top so nobody has to hunt for them. */
export function SourceConflictBoard({ entries }: { entries: readonly ChangeEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className={CARD_CLASS}>
        <p className="m-0 text-sm">No open source conflicts right now.</p>
      </div>
    );
  }
  return (
    <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.id} className={CARD_CLASS}>
          <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">Check before you rely on it</p>
          <h3 className="mb-1 mt-1 text-base">
            <Link href={`#${entry.id}`}>{entry.title}</Link>
          </h3>
          <p className="m-0 text-sm">{entry.conflict?.resolution}</p>
          {entry.conflict && (
            <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
              {CONFIDENCE_LABELS[entry.conflict.confidence]} · next: {entry.conflict.nextStep}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}