export type FileAdviceSeverity = "stop" | "check" | "tip";

export interface FileTrait {
  id: string;
  label: string;
  severity: FileAdviceSeverity;
  advice: string;
}

export const FILE_TRAITS: readonly FileTrait[] = [
  { id: "confidential", label: "It contains private, client or confidential information", severity: "stop", advice: "Do not upload it unless your employer or school has approved the tool in writing. Remove names and numbers first." },
  { id: "scanned", label: "It is a scan or a photo of pages", severity: "check", advice: "Text read from an image can contain mistakes. Spot-check names and numbers against the original." },
  { id: "tables", label: "It has tables or charts", severity: "check", advice: "Tables and charts can be misread. Ask the AI to list the numbers it used, then check them against the original." },
  { id: "long", label: "It is very long", severity: "check", advice: "Long files may be cut short or have details missed. Work one section at a time, or ask for the page where each point appears." },
  { id: "distant-page", label: "I need one detail from deep inside it", severity: "tip", advice: "Ask for the page number and the exact wording, then read that page yourself." },
  { id: "several", label: "I am uploading several files", severity: "tip", advice: "Say what each file is, and ask the AI to name the file behind every point." },
];

export const FILE_ADVICE_FALLBACK =
  "Upload limits and supported file types differ by provider and plan. Check the provider's help page for the current limits.";

const SEVERITY_RANK: Record<FileAdviceSeverity, number> = { stop: 0, check: 1, tip: 2 };

/** Returns advice for the ticked traits, most serious first. Empty when nothing is ticked. */
export function adviceForTraits(selectedIds: readonly string[]): FileTrait[] {
  return FILE_TRAITS.filter((trait) => selectedIds.includes(trait.id)).sort(
    (first, second) => SEVERITY_RANK[first.severity] - SEVERITY_RANK[second.severity],
  );
}