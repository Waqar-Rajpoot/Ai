import Link from "next/link";
import type { FaqItem } from "@/lib/compare/compareStandards";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

/** Questions and answers that open and close without client code. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.id} className={`${CARD_CLASS} group`}>
          <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>{item.question}</summary>
          <p className="mb-0 mt-3">{item.answer}</p>
          {item.link && (
            <p className="mb-0 mt-2 text-sm">
              <Link href={item.link.href}>{item.link.label}</Link>
            </p>
          )}
        </details>
      ))}
    </div>
  );
}