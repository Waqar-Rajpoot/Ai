import type { ChecklistProgress } from "@/lib/tools/checklists";

interface ProgressBarProps {
  progress: ChecklistProgress;
  label: string;
}

/** Thin progress bar for any tickable checklist. */
export function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress.percent}
      className="h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
    >
      <div
        className="h-full bg-[image:var(--gradient-accent)] transition-[width] motion-reduce:transition-none"
        style={{ width: `${progress.percent}%` }}
      />
    </div>
  );
}