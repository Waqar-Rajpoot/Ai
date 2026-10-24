import type { StepEntry } from "@/lib/shared/contentTypes";
import { CARD_CLASS } from "./pageStyles";

interface StepListProps {
  steps: readonly StepEntry[];
}

/** Numbered steps in a two-column grid. */
export function StepList({ steps }: StepListProps) {
  return (
    <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
          <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
        </li>
      ))}
    </ol>
  );
}