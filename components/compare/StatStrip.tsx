import type { StatItem } from "@/lib/compare/modelStats";

/** Four small boxes of headline numbers, used inside a page hero. */
export function StatStrip({ items }: { items: readonly StatItem[] }) {
  return (
    <dl className="relative mt-8 grid max-w-3xl grid-cols-2 gap-4 text-center sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
          <dt className="text-xs text-[var(--color-muted)]">{item.label}</dt>
          <dd className="m-0 text-2xl font-extrabold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}