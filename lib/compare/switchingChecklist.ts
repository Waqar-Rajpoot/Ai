export type SwitchingPhase = "before" | "during" | "after";
export type SwitchingStage = "not-started" | "preparing" | "ready-to-switch" | "finished";

export interface SwitchingChecklistItem {
  id: string;
  phase: SwitchingPhase;
  label: string;
  hint: string;
  /** Optional page that helps with this step. */
  href?: string;
}

export interface SwitchingPhaseInfo {
  id: SwitchingPhase;
  title: string;
  intro: string;
}

export interface SwitchingProgress {
  doneCount: number;
  total: number;
  percentDone: number;
  byPhase: Record<SwitchingPhase, { done: number; total: number }>;
  stage: SwitchingStage;
  title: string;
  advice: string;
}

export const SWITCHING_PHASES: readonly SwitchingPhaseInfo[] = [
  { id: "before", title: "Before you switch", intro: "Do these while the old tool still works." },
  { id: "during", title: "While you switch", intro: "Test the new tool without cutting off the old one." },
  { id: "after", title: "After you switch", intro: "Check the result, then clean up." },
];

export const SWITCHING_CHECKLIST: readonly SwitchingChecklistItem[] = [
  { id: "why", phase: "before", label: "Write down why you are switching", hint: "One sentence. It tells you what to test." },
  { id: "tasks", phase: "before", label: "List the five to ten tasks you use it for", hint: "These become your test set.", href: "/learn/power-user/build-your-own-ai-test-set" },
  { id: "export", phase: "before", label: "Export your data", hint: "Look in settings for an export or download option. Availability differs by app." },
  { id: "save-setup", phase: "before", label: "Save your custom instructions, saved prompts and project setups as plain text", hint: "Settings and instructions rarely move over by themselves." },
  { id: "billing", phase: "before", label: "Note what you pay and when the plan renews", hint: "So you can cancel on the right date and avoid a surprise renewal.", href: "/learn/foundations/free-vs-paid-ai" },
  { id: "lose", phase: "before", label: "List what you would lose", hint: "Memory, saved chats, connected apps, voice or file features." },
  { id: "trial", phase: "during", label: "Start on a free or monthly plan first", hint: "Avoid paying for a year before you know it fits." },
  { id: "retest", phase: "during", label: "Re-create your prompts and run the same tasks on both", hint: "Use the same day, the same files and the same settings." },
  { id: "privacy", phase: "during", label: "Check privacy and training settings before you paste anything", hint: "Turn off what you do not need.", href: "/prices/privacy" },
  { id: "limits", phase: "during", label: "Check the limits on your plan", hint: "Messages, file size and features can differ by tier.", href: "/prices/free-limits" },
  { id: "compare", phase: "after", label: "Compare results with your test set after a few weeks of real use", hint: "Judge it on your tasks, not on a headline score." },
  { id: "cancel", phase: "after", label: "Cancel the old plan on the right date and confirm it", hint: "Keep the confirmation." },
  { id: "delete", phase: "after", label: "Delete data you no longer want the old service to hold", hint: "Where the service lets you." },
  { id: "keep-export", phase: "after", label: "Keep your export until you are sure", hint: "You can delete it once the new tool has proved itself." },
];

const STAGE_MESSAGES: Record<SwitchingStage, { title: string; advice: string }> = {
  "not-started": { title: "Not started", advice: "Tick steps as you finish them. Nothing is stored, so ticks reset if you leave the page." },
  preparing: { title: "Preparing", advice: "Finish the steps before you switch before you cancel or pay for anything new." },
  "ready-to-switch": { title: "Ready to switch", advice: "Your preparation is done. Try the new tool while you keep the old one." },
  finished: { title: "All steps done", advice: "You switched with a safety net. Re-test now and then, because plans and models change." },
};

/** Counts ticked steps by phase and works out the stage. Unknown ids are ignored. */
export function summariseSwitchingProgress(checkedIds: readonly string[]): SwitchingProgress {
  const checked = new Set(checkedIds);
  const byPhase: Record<SwitchingPhase, { done: number; total: number }> = {
    before: { done: 0, total: 0 },
    during: { done: 0, total: 0 },
    after: { done: 0, total: 0 },
  };

  for (const item of SWITCHING_CHECKLIST) {
    byPhase[item.phase].total += 1;
    if (checked.has(item.id)) byPhase[item.phase].done += 1;
  }

  const total = SWITCHING_CHECKLIST.length;
  const doneCount = byPhase.before.done + byPhase.during.done + byPhase.after.done;

  let stage: SwitchingStage = "preparing";
  if (doneCount === 0) stage = "not-started";
  else if (doneCount === total) stage = "finished";
  else if (byPhase.before.done === byPhase.before.total) stage = "ready-to-switch";

  return {
    doneCount,
    total,
    percentDone: Math.round((doneCount / total) * 100),
    byPhase,
    stage,
    ...STAGE_MESSAGES[stage],
  };
}