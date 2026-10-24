export type PromptPartId = "role" | "task" | "context" | "format" | "limits";

export interface PromptPart {
  id: PromptPartId;
  label: string;
  hint: string;
  placeholder: string;
}

export type PromptDraft = Record<PromptPartId, string>;

export interface PromptPreset {
  id: string;
  label: string;
  draft: PromptDraft;
}

export const PROMPT_PARTS: readonly PromptPart[] = [
  { id: "role", label: "Role", hint: "Who should the AI act as?", placeholder: "a patient maths tutor" },
  { id: "task", label: "Task", hint: "What exactly should it do?", placeholder: "Explain how to add fractions with different denominators." },
  { id: "context", label: "Context", hint: "What background does it need?", placeholder: "I am in year 7 and keep mixing up common denominators." },
  { id: "format", label: "Format", hint: "What should the answer look like?", placeholder: "Three numbered steps, then one worked example." },
  { id: "limits", label: "Limits", hint: "What length, tone or rules apply?", placeholder: "Under 150 words. Friendly tone. No jargon." },
];

export const EMPTY_DRAFT: PromptDraft = { role: "", task: "", context: "", format: "", limits: "" };

export const PROMPT_PRESETS: readonly PromptPreset[] = [
  {
    id: "study",
    label: "Study",
    draft: {
      role: "a patient maths tutor",
      task: "Explain how to add fractions with different denominators.",
      context: "I am in year 7 and keep mixing up common denominators.",
      format: "Three numbered steps, then one worked example.",
      limits: "Under 150 words. Friendly tone. No jargon.",
    },
  },
  {
    id: "work",
    label: "Work",
    draft: {
      role: "a clear business writer",
      task: "Draft a reply asking a supplier to confirm a delivery date.",
      context: "The order was due Friday and I have not heard back. We have worked together for two years.",
      format: "A short email with a subject line.",
      limits: "Polite but firm. Under 120 words. Do not include any prices.",
    },
  },
  {
    id: "home",
    label: "Home",
    draft: {
      role: "a practical home cook",
      task: "Plan five dinners using chicken, rice and frozen vegetables.",
      context: "Cooking for two. We have 30 minutes on weeknights and no oven.",
      format: "A table with the day, the meal and the steps in one line.",
      limits: "Cheap ingredients only. Under 200 words.",
    },
  },
  {
    id: "money",
    label: "Money",
    draft: {
      role: "a plain-English money explainer",
      task: "Explain the difference between a credit card and a debit card.",
      context: "I am 19 and about to get my first bank account.",
      format: "Two short paragraphs and one list of three pros and cons for each.",
      limits: "General information only, not personal advice. Under 200 words.",
    },
  },
];

const PROMPT_LINE_BUILDERS: Record<PromptPartId, (value: string) => string> = {
  role: (value) => `Act as ${value}.`,
  task: (value) => value,
  context: (value) => `Context: ${value}`,
  format: (value) => `Format: ${value}`,
  limits: (value) => `Limits: ${value}`,
};

/** Turns the five parts into one ready-to-paste prompt. Empty parts are skipped. */
export function assemblePrompt(draft: PromptDraft): string {
  return PROMPT_PARTS.map((part) => ({ id: part.id, value: draft[part.id].trim() }))
    .filter((entry) => entry.value.length > 0)
    .map((entry) => PROMPT_LINE_BUILDERS[entry.id](entry.value))
    .join("\n");
}

/** Counts how many of the five parts have text. */
export function countCompleteParts(draft: PromptDraft): number {
  return PROMPT_PARTS.filter((part) => draft[part.id].trim().length > 0).length;
}

/** Lists the parts still empty, so the page can nudge the reader. */
export function findMissingParts(draft: PromptDraft): PromptPart[] {
  return PROMPT_PARTS.filter((part) => draft[part.id].trim().length === 0);
}