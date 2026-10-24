import Link from "next/link";
import type { TipEntry } from "@/lib/shared/contentTypes";
import { CARD_CLASS } from "./pageStyles";

interface TipGridProps {
  tips: readonly TipEntry[];
}

/** Cards with a tip and a link to the page that explains more. */
export function TipGrid({ tips }: TipGridProps) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => (
        <li key={tip.title} className={CARD_CLASS}>
          <h3 className="mt-0 text-base">{tip.title}</h3>
          <p className="m-0 text-sm text-[var(--color-muted)]">{tip.detail}</p>
          <p className="mb-0 mt-3 text-sm"><Link href={tip.link.href}>{tip.link.label}</Link></p>
        </li>
      ))}
    </ul>
  );
}