import { MAX_TOOL_NAME_LENGTH } from "./learnConstants";

export interface DisclosureUse {
  id: string;
  label: string;
  /** Wording used inside the sentence. */
  phrase: string;
}

export interface DisclosureInput {
  toolName: string;
  useIds: readonly string[];
  wasReviewed: boolean;
}

export type DisclosureProblem = "missing-tool" | "tool-too-long" | "missing-use";

export type DisclosureResult = { ok: true; text: string } | { ok: false; reason: DisclosureProblem };

export const DISCLOSURE_USES: readonly DisclosureUse[] = [
  { id: "brainstorm", label: "Brainstorming ideas", phrase: "brainstorming ideas" },
  { id: "draft", label: "Drafting text", phrase: "drafting text" },
  { id: "edit", label: "Editing and grammar", phrase: "editing and grammar" },
  { id: "summarise", label: "Summarising material", phrase: "summarising material" },
  { id: "translate", label: "Translation", phrase: "translation" },
  { id: "research", label: "Background research", phrase: "background research" },
];

export const DISCLOSURE_PROBLEM_MESSAGES: Record<DisclosureProblem, string> = {
  "missing-tool": "Enter the name of the AI tool you used.",
  "tool-too-long": `Use a shorter tool name (up to ${MAX_TOOL_NAME_LENGTH} characters).`,
  "missing-use": "Tick at least one way you used it.",
};

function joinWithAnd(items: readonly string[]): string {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Builds a one-sentence AI-use disclosure. Uses appear in a fixed order, whatever order they were ticked. */
export function buildDisclosure(input: DisclosureInput): DisclosureResult {
  const toolName = input.toolName.trim().replace(/\s+/g, " ");
  if (!toolName) return { ok: false, reason: "missing-tool" };
  if (toolName.length > MAX_TOOL_NAME_LENGTH) return { ok: false, reason: "tool-too-long" };

  const phrases = DISCLOSURE_USES.filter((use) => input.useIds.includes(use.id)).map((use) => use.phrase);
  if (phrases.length === 0) return { ok: false, reason: "missing-use" };

  const reviewSentence = input.wasReviewed ? " I checked the facts and edited the result myself." : "";
  return { ok: true, text: `AI use disclosure: I used ${toolName} for ${joinWithAnd(phrases)}.${reviewSentence}` };
}