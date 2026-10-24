import { FOCUS_RING } from "@/components/shared/pageStyles";

interface PlainTechnicalToggleProps {
  isTechnical: boolean;
  onChange: (isTechnical: boolean) => void;
}

const OPTIONS: readonly { isTechnical: boolean; label: string }[] = [
  { isTechnical: false, label: "Plain" },
  { isTechnical: true, label: "Technical" },
];

/** Switches a page between the plain-English layer and the “go deeper” layer. */
export function PlainTechnicalToggle({ isTechnical, onChange }: PlainTechnicalToggleProps) {
  return (
    <div role="group" aria-label="Reading level" className="inline-flex rounded-full border border-[var(--color-border)] p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.label}
          type="button"
          aria-pressed={isTechnical === option.isTechnical}
          onClick={() => onChange(option.isTechnical)}
          className={`rounded-full px-4 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
            isTechnical === option.isTechnical ? "bg-[image:var(--gradient-accent)] text-white" : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}