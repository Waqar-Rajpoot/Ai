import type { ChecklistGroup } from "./checklists";
import { DOWNLOAD_EXTENSION, PLACEHOLDER_SOURCE, SHEET_FOOTER_LINE } from "./cheatSheetConstants";

export type SheetId = "prompt-formula" | "model-choice" | "resume-prompt" | "agent-permissions";
export type SheetLevel = 1 | 2 | 3;
export type LevelFilter = SheetLevel | "all";

interface BlockBase {
  id: string;
  heading: string;
  intro?: string;
}

export interface StepItem {
  title: string;
  detail: string;
}

export interface StepsBlock extends BlockBase {
  kind: "steps";
  items: readonly StepItem[];
}

export interface TableBlock extends BlockBase {
  kind: "table";
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}

export interface TemplateBlock extends BlockBase {
  kind: "template";
  /** Text with [PLACEHOLDERS] the reader can fill in. */
  text: string;
  /** Placeholders that need a large text box, such as a pasted resume. */
  longFields?: readonly string[];
}

export interface ChecklistBlock extends BlockBase {
  kind: "checklist";
  groups: readonly ChecklistGroup[];
  storageKey: string;
}

export interface NoteBlock extends BlockBase {
  kind: "note";
  text: string;
}

export type SheetBlock = StepsBlock | TableBlock | TemplateBlock | ChecklistBlock | NoteBlock;

export interface CheatSheet {
  id: SheetId;
  title: string;
  shortTitle: string;
  levels: readonly SheetLevel[];
  whoFor: string;
  summary: string;
  blocks: readonly SheetBlock[];
}

/** "Level 1" or "Levels 2 to 3". */
export function describeLevels(levels: readonly SheetLevel[]): string {
  if (levels.length === 0) return "";
  const lowest = Math.min(...levels);
  const highest = Math.max(...levels);
  return lowest === highest ? `Level ${lowest}` : `Levels ${lowest} to ${highest}`;
}

/** Sheets that suit a level. "all" returns every sheet. Returns a new array. */
export function filterSheetsByLevel(sheets: readonly CheatSheet[], level: LevelFilter): CheatSheet[] {
  if (level === "all") return [...sheets];
  return sheets.filter((sheet) => sheet.levels.includes(level));
}

/** Unique placeholder names in a template, in order of first appearance. */
export function extractPlaceholders(template: string): string[] {
  const found: string[] = [];
  for (const match of template.matchAll(new RegExp(PLACEHOLDER_SOURCE, "g"))) {
    const token = match[1];
    if (token && !found.includes(token)) found.push(token);
  }
  return found;
}

/** "JOB TITLE" becomes "Job title", for form labels. */
export function describePlaceholder(token: string): string {
  return token.charAt(0) + token.slice(1).toLowerCase();
}

/** Replaces each [PLACEHOLDER] that has a value. Empty ones stay visible so nothing is silently lost. */
export function fillTemplate(template: string, values: Readonly<Record<string, string>>): string {
  return template.replace(new RegExp(PLACEHOLDER_SOURCE, "g"), (match: string, token: string) => {
    const value = values[token]?.trim();
    return value ? value : match;
  });
}

function blockToPlainText(block: SheetBlock): string {
  const lines: string[] = [block.heading.toUpperCase()];
  if (block.intro) lines.push(block.intro);

  switch (block.kind) {
    case "steps":
      block.items.forEach((item, index) => lines.push(`${index + 1}. ${item.title}: ${item.detail}`));
      break;
    case "table":
      for (const row of block.rows) {
        lines.push(`- ${row.map((cell, index) => `${block.columns[index] ?? ""}: ${cell}`).join(" | ")}`);
      }
      break;
    case "template":
      lines.push("", block.text);
      break;
    case "checklist":
      for (const group of block.groups) {
        lines.push("", group.title);
        for (const item of group.items) lines.push(`[ ] ${item.text}`);
      }
      break;
    case "note":
      lines.push(block.text);
      break;
  }
  return lines.join("\n");
}

/** Whole sheet as plain text for copying or downloading. Checklists come out unticked, ready to print. */
export function sheetToPlainText(sheet: CheatSheet, reviewedOn: string): string {
  const header = [sheet.title, `${describeLevels(sheet.levels)} · Reviewed ${reviewedOn}`, sheet.summary].join("\n");
  return [header, ...sheet.blocks.map(blockToPlainText), SHEET_FOOTER_LINE].join("\n\n");
}

export function buildDownloadFileName(sheet: CheatSheet): string {
  return `${sheet.id}${DOWNLOAD_EXTENSION}`;
}