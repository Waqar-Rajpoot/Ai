import {
  LEVEL_NAMES,
  TOOL_LEVELS,
  type ToolCategory,
  type ToolEntry,
  type ToolLevel,
} from "./toolCatalog";

export const ALL_OPTION = "all";

export type LevelFilter = typeof ALL_OPTION | ToolLevel;
export type CategoryFilter = typeof ALL_OPTION | ToolCategory;

export interface ToolFilters {
  query: string;
  level: LevelFilter;
  category: CategoryFilter;
}

/** Filters by level, group and search text. Keeps the original order. */
export function filterTools(tools: readonly ToolEntry[], filters: ToolFilters): ToolEntry[] {
  const needle = filters.query.trim().toLowerCase();
  return tools.filter((tool) => {
    if (filters.level !== ALL_OPTION && !tool.levels.includes(filters.level)) return false;
    if (filters.category !== ALL_OPTION && tool.category !== filters.category) return false;
    if (needle) {
      const haystack = [tool.name, tool.summary, tool.youEnter, tool.youGet, ...tool.keywords]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

/** How many tools suit each level. A tool with several levels is counted in each. */
export function countToolsByLevel(tools: readonly ToolEntry[]): Record<ToolLevel, number> {
  const counts: Record<ToolLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const tool of tools) {
    for (const level of tool.levels) counts[level] += 1;
  }
  return counts;
}

export function getToolById(tools: readonly ToolEntry[], id: string): ToolEntry | undefined {
  return tools.find((tool) => tool.id === id);
}

/** Tools in the order the ids are given. Unknown ids are skipped. */
export function getToolsByIds(tools: readonly ToolEntry[], ids: readonly string[]): ToolEntry[] {
  const found: ToolEntry[] = [];
  for (const id of ids) {
    const tool = getToolById(tools, id);
    if (tool) found.push(tool);
  }
  return found;
}

/** Ids that do not match any tool. Useful in a test that guards the hub content. */
export function findUnknownToolIds(tools: readonly ToolEntry[], ids: readonly string[]): string[] {
  return ids.filter((id) => !getToolById(tools, id));
}

/** "Level 1", "Levels 1 to 3" or "Levels 1 and 3". */
export function describeToolLevels(levels: readonly ToolLevel[]): string {
  const sorted = [...levels].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return `Level ${sorted[0]}`;
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const isContiguous = last - first + 1 === sorted.length;
  if (isContiguous) return `Levels ${first} to ${last}`;
  return `Levels ${sorted.slice(0, -1).join(", ")} and ${last}`;
}

/** "Foundations, Practitioner", for screen readers. */
export function listToolLevelNames(levels: readonly ToolLevel[]): string {
  return TOOL_LEVELS.filter((level) => levels.includes(level))
    .map((level) => LEVEL_NAMES[level])
    .join(", ");
}