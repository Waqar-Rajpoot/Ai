import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import type { RelatedLink } from "@/lib/compare/openVsClosedContent";

/** Grid of linked cards, each with a title and a one-line reason to visit. */
export function RelatedLinks({ items }: { items: readonly RelatedLink[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            <strong className="block">{item.title}</strong>
            <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.reason}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}