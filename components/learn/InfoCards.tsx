import { CARD_CLASS } from "./learnStyles";

export interface InfoCardItem {
  id: string;
  title: string;
  summary: string;
}

/** Card grid for title + summary pairs. */
export function InfoCards({ items }: { items: readonly InfoCardItem[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className={CARD_CLASS}>
          <strong>{item.title}</strong>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}

interface NumberedStepsProps {
  items: readonly InfoCardItem[];
  /** Tailwind grid-column classes, so four- and five-step lists both fit. */
  columnsClass?: string;
}

/** Ordered cards with a numbered badge. */
export function NumberedSteps({ items, columnsClass = "sm:grid-cols-2 lg:grid-cols-4" }: NumberedStepsProps) {
  return (
    <ol className={`m-0 grid list-none gap-4 p-0 ${columnsClass}`}>
      {items.map((step, index) => (
        <li key={step.id} className={CARD_CLASS}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
          <strong className="mt-3 block">{step.title}</strong>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{step.summary}</p>
        </li>
      ))}
    </ol>
  );
}