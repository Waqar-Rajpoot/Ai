export type CheckLevel = "light" | "standard" | "extra";

export interface CheckContext {
  id: string;
  label: string;
  level: CheckLevel;
  /** Plain-language limits note for health, legal and money topics. */
  limitsNote?: string;
}

export interface CheckGuidance {
  level: CheckLevel;
  title: string;
  actions: readonly string[];
  limitsNote: string | null;
}

export const CHECK_CONTEXTS: readonly CheckContext[] = [
  { id: "ideas", label: "Brainstorming or casual ideas", level: "light" },
  { id: "school", label: "School or college work", level: "standard" },
  { id: "work", label: "A work document or email", level: "standard" },
  { id: "public", label: "Something I will publish or share", level: "standard" },
  { id: "health", label: "A health question", level: "extra", limitsNote: "AI is not a doctor. For symptoms, medicines or test results, ask a qualified health professional." },
  { id: "legal", label: "A legal question", level: "extra", limitsNote: "AI is not a lawyer. Laws differ by place and change, so confirm with an official source or a qualified professional." },
  { id: "money", label: "A money or tax question", level: "extra", limitsNote: "AI is not a financial advisor. For tax, debt, investing or big purchases, check official sources or a qualified adviser." },
];

const LEVEL_GUIDANCE: Record<CheckLevel, { title: string; actions: readonly string[] }> = {
  light: {
    title: "Light check",
    actions: ["Skim for anything that looks odd.", "Check any name, number or date you plan to reuse."],
  },
  standard: {
    title: "Standard check",
    actions: [
      "Mark every figure, date, name and quote.",
      "Open the source for each and confirm it says that.",
      "Remove anything you cannot confirm.",
    ],
  },
  extra: {
    title: "Extra care",
    actions: [
      "Use the AI to understand the topic and prepare questions, not to decide.",
      "Confirm every point with an official source or a qualified professional before you act.",
      "Do not rely on the answer for treatment, legal deadlines or money decisions.",
    ],
  },
};

/** Returns how closely to check an AI answer for the chosen situation, or null if none is chosen. */
export function getCheckGuidance(contextId: string | null): CheckGuidance | null {
  const context = CHECK_CONTEXTS.find((item) => item.id === contextId);
  if (!context) return null;
  const { title, actions } = LEVEL_GUIDANCE[context.level];
  return { level: context.level, title, actions, limitsNote: context.limitsNote ?? null };
}