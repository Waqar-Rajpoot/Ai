import type { ModelDirectoryRow } from "./modelDirectory";

export interface ShortlistPick {
  id: string;
  need: string;
  modelId: string;
  /** Based on the Blueprint 6.7 "best for" label. Not a test result. */
  reason: string;
}

export interface ShortlistEntry {
  pick: ShortlistPick;
  row: ModelDirectoryRow;
}

export const SHORTLIST_PICKS: readonly ShortlistPick[] = [
  { id: "all-round", need: "An all-round flagship", modelId: "claude-opus-5-5", reason: "Listed as the all-round flagship, and it has the highest score in the snapshot." },
  { id: "value", need: "Value near the frontier", modelId: "gpt-6-1-sol", reason: "Listed as the best value near the frontier." },
  { id: "everyday", need: "Everyday coding and knowledge work", modelId: "claude-sonnet-5-5", reason: "Listed for everyday coding and knowledge work." },
  { id: "agentic", need: "The hardest agentic coding", modelId: "claude-fable-5-1", reason: "Listed for the hardest agentic coding. It is in the premium price tier." },
  { id: "science", need: "Maths, science and research", modelId: "gpt-6-astra", reason: "Listed for maths, science and research. It is in the premium price tier." },
  { id: "reasoning", need: "Complex reasoning", modelId: "gemini-4-argon", reason: "Listed for complex reasoning, at an introductory rate." },
  { id: "multimodal", need: "Fast, cheap multimodal work", modelId: "gemini-3-8-flash", reason: "Listed for fast, cheap multimodal work, at an introductory rate." },
  { id: "volume", need: "High-volume, low-cost tasks", modelId: "claude-haiku-5-5", reason: "Listed for high-volume, low-cost work, and it has a ranked score." },
  { id: "cheapest-api", need: "The cheapest capable API", modelId: "deepseek-v4-1-flash", reason: "Listed as the cheapest capable API. The price shown is the off-peak price." },
  { id: "open-weight", need: "A top open-weight model", modelId: "mimo-v2-6-pro", reason: "Listed as the top open-weight model, under an MIT licence. Its score is an estimate." },
  { id: "open-coding", need: "Open-weight coding and agents", modelId: "kimi-k3", reason: "Listed for open-weight coding and agents." },
  { id: "local", need: "Running on your own computer", modelId: "qwen3-8-max-27b", reason: "The 27B version is listed as the best single-GPU local model, and it is free to self-host." },
];

/** Matches each pick to its directory row and skips any pick whose model id no longer exists. */
export function getShortlist(rows: readonly ModelDirectoryRow[]): ShortlistEntry[] {
  return SHORTLIST_PICKS.flatMap((pick) => {
    const row = rows.find((candidate) => candidate.id === pick.modelId);
    return row ? [{ pick, row }] : [];
  });
}