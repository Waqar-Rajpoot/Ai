export type PasteVerdict = "ok" | "think" | "never";

export interface PasteItem {
  id: string;
  label: string;
  verdict: PasteVerdict;
}

export const PASTE_ITEMS: readonly PasteItem[] = [
  { id: "password", label: "A password, PIN or one-time code", verdict: "never" },
  { id: "card", label: "A bank account or card number", verdict: "never" },
  { id: "government-id", label: "A passport, national ID or tax number", verdict: "never" },
  { id: "health", label: "My medical records or test results", verdict: "never" },
  { id: "client", label: "Client or customer data", verdict: "never" },
  { id: "others-private", label: "Someone else's private details", verdict: "think" },
  { id: "work-doc", label: "An internal work document", verdict: "think" },
  { id: "own-draft", label: "My own draft essay or email", verdict: "ok" },
  { id: "public-text", label: "A public article or web page", verdict: "ok" },
  { id: "general-question", label: "A general question with no personal details", verdict: "ok" },
];

const VERDICT_RANK: Record<PasteVerdict, number> = { ok: 0, think: 1, never: 2 };

export const VERDICT_MESSAGES: Record<PasteVerdict, { title: string; advice: string }> = {
  never: {
    title: "Do not paste this",
    advice:
      "Remove it or describe it in general terms instead. For client data, use only a tool your employer has approved in writing.",
  },
  think: {
    title: "Think first",
    advice:
      "Remove names and details, ask permission if it is not yours, and check your employer's AI policy and your privacy settings.",
  },
  ok: {
    title: "Fine to paste",
    advice: "Low risk. Still check the answer, and keep your training setting where you want it.",
  },
};

/** Returns the most serious verdict among the selected items, or null when nothing is selected. */
export function worstVerdict(selectedIds: readonly string[]): PasteVerdict | null {
  const verdicts = PASTE_ITEMS.filter((item) => selectedIds.includes(item.id)).map((item) => item.verdict);
  if (verdicts.length === 0) return null;
  return verdicts.reduce((worst, current) => (VERDICT_RANK[current] > VERDICT_RANK[worst] ? current : worst));
}