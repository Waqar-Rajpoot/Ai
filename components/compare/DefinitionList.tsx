import type { DefinitionItem } from "@/lib/compare/compareStandards";
import { CARD_CLASS } from "../learn/learnStyles";

/** A card holding a two-column grid of terms and descriptions. */
export function DefinitionList({ items }: { items: readonly DefinitionItem[] }) {
  return (
    <dl className={`${CARD_CLASS} m-0 grid gap-x-8 gap-y-4 sm:grid-cols-2`}>
      {items.map((item) => (
        <div key={item.id}>
          <dt className="font-semibold">{item.term}</dt>
          <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}