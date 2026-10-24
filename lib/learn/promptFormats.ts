export type FormatId = "table" | "bullets" | "steps" | "email" | "paragraph" | "checklist";

export interface FormatOption {
  id: FormatId;
  label: string;
  /** Sentence added after "Format:" in the prompt. */
  instruction: string;
  /** Placeholder showing what extra detail helps. */
  detailHint: string;
}

export interface FormattedPromptInput {
  task: string;
  formatId: FormatId;
  formatDetail: string;
  example: string;
}

export type FormattedPromptResult =
  | { ok: true; prompt: string }
  | { ok: false; reason: "empty-task" | "unknown-format" };

export const FORMAT_OPTIONS: readonly FormatOption[] = [
  { id: "table", label: "Table", instruction: "Present the answer as a table.", detailHint: "Columns: feature, option A, option B." },
  { id: "bullets", label: "Bullet points", instruction: "Present the answer as short bullet points.", detailHint: "No more than six bullets." },
  { id: "steps", label: "Numbered steps", instruction: "Present the answer as numbered steps.", detailHint: "One action per step." },
  { id: "email", label: "Short email", instruction: "Write the answer as a short email with a subject line.", detailHint: "Polite tone. Under 120 words." },
  { id: "paragraph", label: "One paragraph", instruction: "Write the answer as one plain paragraph.", detailHint: "Under 100 words." },
  { id: "checklist", label: "Checklist", instruction: "Present the answer as a checklist I can tick off.", detailHint: "Group items by day." },
];

/** Builds a prompt that names the task, a fixed output format and an optional example. */
export function buildFormattedPrompt(input: FormattedPromptInput): FormattedPromptResult {
  const task = input.task.trim();
  if (!task) return { ok: false, reason: "empty-task" };

  const format = FORMAT_OPTIONS.find((option) => option.id === input.formatId);
  if (!format) return { ok: false, reason: "unknown-format" };

  const detail = input.formatDetail.trim();
  const example = input.example.trim();

  const lines = [task, `Format: ${format.instruction}${detail ? ` ${detail}` : ""}`];
  if (example) lines.push(`Match the style of this example:\n${example}`);

  return { ok: true, prompt: lines.join("\n") };
}