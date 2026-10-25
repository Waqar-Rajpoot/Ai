import { VERDICT_LABELS, type MythVerdict } from "@/lib/society/mythsFacts";

export const VERDICT_BORDER_CLASSES: Record<MythVerdict, string> = {
  myth: "border-l-4 border-l-red-500",
  "mostly-myth": "border-l-4 border-l-orange-500",
  depends: "border-l-4 border-l-sky-500",
  "mostly-fact": "border-l-4 border-l-teal-500",
  fact: "border-l-4 border-l-emerald-500",
};

const VERDICT_SYMBOLS: Record<MythVerdict, string> = {
  myth: "✕",
  "mostly-myth": "✕",
  depends: "◐",
  "mostly-fact": "✓",
  fact: "✓",
};

const VERDICT_TEXT_CLASSES: Record<MythVerdict, string> = {
  myth: "text-red-600 dark:text-red-400",
  "mostly-myth": "text-orange-600 dark:text-orange-400",
  depends: "text-sky-600 dark:text-sky-400",
  "mostly-fact": "text-teal-600 dark:text-teal-400",
  fact: "text-emerald-600 dark:text-emerald-400",
};

interface VerdictBadgeProps {
  verdict: MythVerdict;
}

/** Verdict with a symbol and a word, so colour is never the only signal. */
export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-current px-2.5 py-0.5 text-xs font-bold ${VERDICT_TEXT_CLASSES[verdict]}`}>
      <span aria-hidden="true">{VERDICT_SYMBOLS[verdict]}</span>
      {VERDICT_LABELS[verdict]}
    </span>
  );
}