import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { FREE_TOOLS } from "@/lib/home/homeContent";

/** The nine free tools, each with a level badge. */
export function FreeToolsGrid() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {FREE_TOOLS.map((tool) => (
        <li key={tool.id} className={`${CARD_CLASS} flex flex-col`}>
          <span className={`${BADGE_CLASS} self-start`}>{tool.levelLabel}</span>
          <h3 className="mb-1 mt-3">
            <Link href={tool.href} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>{tool.title}</Link>
          </h3>
          <p className="m-0 text-sm text-[var(--color-muted)]">{tool.description}</p>
        </li>
      ))}
    </ul>
  );
}