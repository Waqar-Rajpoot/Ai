import type { FaqEntry } from "@/lib/shared/contentTypes";
import { CARD_CLASS, FOCUS_RING } from "./pageStyles";

interface FaqListProps {
  entries: readonly FaqEntry[];
}

/** Expandable question-and-answer list. Uses native details, so it works without JavaScript. */
export function FaqList({ entries }: FaqListProps) {
  return (
    <div className="grid gap-3">
      {entries.map((entry) => (
        <details key={entry.question} className={`${CARD_CLASS} group py-3`}>
          <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
            <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none">▸</span>
            {entry.question}
          </summary>
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}