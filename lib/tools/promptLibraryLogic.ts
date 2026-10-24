import type { ToolLevel } from "./toolCatalog";
import { ALL_OPTION, type LevelFilter } from "./toolCatalogLogic";
import {
  TASK_LABELS,
  TASK_ORDER,
  type PromptEntry,
  type PromptField,
  type PromptTask,
} from "./promptLibrary";

export type TaskFilter = typeof ALL_OPTION | PromptTask;

export interface PromptFilters {
  query: string;
  task: TaskFilter;
  level: LevelFilter;
}

const PLACEHOLDER_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

/** The distinct {{keys}} used in a template, in order of first use. */
export function listPlaceholderKeys(template: string): string[] {
  return [...new Set([...template.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]))];
}

/** Replaces each {{key}} with what the reader typed, or with [Label] while it is still empty. */
export function fillPrompt(
  template: string,
  fields: readonly PromptField[],
  values: Readonly<Record<string, string>>,
): string {
  const labels = new Map(fields.map((field) => [field.key, field.label]));
  return template.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
    const typed = (values[key] ?? "").trim();
    return typed || `[${labels.get(key) ?? key}]`;
  });
}

/** How many blanks are still empty. */
export function countUnfilledFields(
  fields: readonly PromptField[],
  values: Readonly<Record<string, string>>,
): number {
  return fields.filter((field) => !(values[field.key] ?? "").trim()).length;
}

/** The example text for every field, keyed by field key. */
export function buildExampleValues(fields: readonly PromptField[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, field.example]));
}

/** Filters by task, level and search text. Keeps the original order. */
export function filterPrompts(prompts: readonly PromptEntry[], filters: PromptFilters): PromptEntry[] {
  const needle = filters.query.trim().toLowerCase();
  return prompts.filter((prompt) => {
    if (filters.task !== ALL_OPTION && prompt.task !== filters.task) return false;
    if (filters.level !== ALL_OPTION && prompt.level !== filters.level) return false;
    if (needle) {
      const haystack = [prompt.title, prompt.whenToUse, prompt.template, TASK_LABELS[prompt.task], ...(prompt.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

export function hasActiveFilters(filters: PromptFilters): boolean {
  return filters.query.trim() !== "" || filters.task !== ALL_OPTION || filters.level !== ALL_OPTION;
}

export function countPromptsByTask(prompts: readonly PromptEntry[]): Record<PromptTask, number> {
  const counts = Object.fromEntries(TASK_ORDER.map((task) => [task, 0])) as Record<PromptTask, number>;
  for (const prompt of prompts) counts[prompt.task] += 1;
  return counts;
}

export function countPromptsByLevel(prompts: readonly PromptEntry[]): Record<ToolLevel, number> {
  const counts: Record<ToolLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const prompt of prompts) counts[prompt.level] += 1;
  return counts;
}

/** Problems in the prompt data: blanks with no field, fields never used, repeated ids. Empty means clean. */
export function findPromptDataProblems(prompts: readonly PromptEntry[]): string[] {
  const problems: string[] = [];
  const seenIds = new Set<string>();
  for (const prompt of prompts) {
    if (seenIds.has(prompt.id)) problems.push(`${prompt.id}: id is used twice`);
    seenIds.add(prompt.id);
    const used = new Set(listPlaceholderKeys(prompt.template));
    const declared = new Set(prompt.fields.map((field) => field.key));
    for (const key of used) {
      if (!declared.has(key)) problems.push(`${prompt.id}: {{${key}}} has no field`);
    }
    for (const key of declared) {
      if (!used.has(key)) problems.push(`${prompt.id}: field "${key}" is never used`);
    }
  }
  return problems;
}