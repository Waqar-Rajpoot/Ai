import {
  formatBenchLm,
  formatPricePerMillion,
  type BenchLmRating,
  type ModelDirectoryRow,
} from "./modelDirectory";
import { calculateTaskCostInDollars, formatTaskCost, getCostCaveat, type TaskPreset } from "./modelCost";
import type { StatItem } from "./modelStats";

export interface Matchup {
  /** Slug used for the route: /compare/vs/[id]. */
  id: string;
  title: string;
  /** Directory ids of the two models, in the order they appear in the title. */
  modelIds: readonly [string, string];
  /** Level badge text, from Blueprint 5.3. */
  levelLabel: string;
  /** Launch article number, when the matchup is one of the first 42 articles. */
  articleNumber?: number;
  /** False until the matchup page is written. */
  isPublished: boolean;
}

export type PairEdge = "first" | "second" | "even" | "none";

export interface PairLine {
  id: string;
  label: string;
  /** Short wording used in the summary sentence, for example "input price". */
  summaryLabel: string;
  firstValue: string;
  secondValue: string;
  edge: PairEdge;
  /** Word shown next to the leading model, for example "cheaper" or "higher". */
  betterWord?: string;
}

export interface PairComparison {
  first: ModelDirectoryRow;
  second: ModelDirectoryRow;
  preset: TaskPreset;
  lines: PairLine[];
}

export interface SamePricePair {
  id: string;
  first: ModelDirectoryRow;
  second: ModelDirectoryRow;
}

/** Blueprint 5.3: every matchup runs the same ten tasks. */
export const TASKS_PER_MATCHUP = 10;

/** Prices within this distance of each other are treated as equal, to avoid floating-point noise. */
const EQUAL_TOLERANCE = 1e-9;

/** Blueprint 5.3 and 7.1: the launch matchup (article 24). */
export const LAUNCH_MATCHUP: Matchup = {
  id: "claude-opus-5-5-vs-gpt-6-1-sol",
  title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks",
  modelIds: ["claude-opus-5-5", "gpt-6-1-sol"],
  levelLabel: "Level 3",
  articleNumber: 24,
  isPublished: false,
};

export const MATCHUPS: readonly Matchup[] = [LAUNCH_MATCHUP];

/** Route for a matchup page. */
export function getMatchupHref(matchup: Matchup): string {
  return `/compare/vs/${matchup.id}`;
}

/** Finds the two directory rows for a matchup, or null if either id is missing. */
export function getMatchupRows(
  rows: readonly ModelDirectoryRow[],
  matchup: Matchup,
): readonly [ModelDirectoryRow, ModelDirectoryRow] | null {
  const first = rows.find((row) => row.id === matchup.modelIds[0]);
  const second = rows.find((row) => row.id === matchup.modelIds[1]);
  return first && second ? [first, second] : null;
}

/** Finds a matchup for two model ids, in either order. */
export function findMatchupForPair(
  matchups: readonly Matchup[],
  firstId: string,
  secondId: string,
): Matchup | undefined {
  return matchups.find(
    (matchup) =>
      (matchup.modelIds[0] === firstId && matchup.modelIds[1] === secondId) ||
      (matchup.modelIds[0] === secondId && matchup.modelIds[1] === firstId),
  );
}

function compareNumbers(first: number, second: number, lowerIsBetter: boolean): PairEdge {
  if (Math.abs(first - second) < EQUAL_TOLERANCE) return "even";
  const firstIsLower = first < second;
  return firstIsLower === lowerIsBetter ? "first" : "second";
}

/** A score can only be compared when both models have a ranked (not estimated or missing) score. */
function getRankedScore(rating: BenchLmRating): number | null {
  return rating.status === "ranked" ? rating.score : null;
}

/**
 * Compares two models on paper: list prices, the cost of one example task, and the independent
 * BenchLM score. This is not a test result, and the page says so wherever it is shown.
 */
export function comparePair(first: ModelDirectoryRow, second: ModelDirectoryRow, preset: TaskPreset): PairComparison {
  const firstTaskCost = calculateTaskCostInDollars(first, preset.inputTokens, preset.outputTokens);
  const secondTaskCost = calculateTaskCostInDollars(second, preset.inputTokens, preset.outputTokens);
  const firstScore = getRankedScore(first.benchLm);
  const secondScore = getRankedScore(second.benchLm);

  const lines: PairLine[] = [
    {
      id: "input-price",
      label: "Input price per 1M tokens",
      summaryLabel: "input price",
      firstValue: formatPricePerMillion(first.inputPricePerMillion),
      secondValue: formatPricePerMillion(second.inputPricePerMillion),
      edge: compareNumbers(first.inputPricePerMillion, second.inputPricePerMillion, true),
      betterWord: "cheaper",
    },
    {
      id: "output-price",
      label: "Output price per 1M tokens",
      summaryLabel: "output price",
      firstValue: formatPricePerMillion(first.outputPricePerMillion),
      secondValue: formatPricePerMillion(second.outputPricePerMillion),
      edge: compareNumbers(first.outputPricePerMillion, second.outputPricePerMillion, true),
      betterWord: "cheaper",
    },
    {
      id: "task-cost",
      label: `Cost of one example task (${preset.label.toLowerCase()})`,
      summaryLabel: "the cost of the example task",
      firstValue: formatTaskCost(firstTaskCost),
      secondValue: formatTaskCost(secondTaskCost),
      edge: compareNumbers(firstTaskCost, secondTaskCost, true),
      betterWord: "cheaper",
    },
    {
      id: "benchlm",
      label: "BenchLM score",
      summaryLabel: "BenchLM score",
      firstValue: formatBenchLm(first.benchLm),
      secondValue: formatBenchLm(second.benchLm),
      edge: firstScore !== null && secondScore !== null ? compareNumbers(firstScore, secondScore, false) : "none",
      betterWord: "higher",
    },
    {
      id: "context",
      label: "Context",
      summaryLabel: "context",
      firstValue: first.contextLabel,
      secondValue: second.contextLabel,
      edge: "none",
    },
    {
      id: "best-for",
      label: "Listed best for",
      summaryLabel: "best use",
      firstValue: first.bestFor,
      secondValue: second.bestFor,
      edge: "none",
    },
    {
      id: "price-conditions",
      label: "Price conditions",
      summaryLabel: "price conditions",
      firstValue: getCostCaveat(first) || "None noted",
      secondValue: getCostCaveat(second) || "None noted",
      edge: "none",
    },
  ];

  return { first, second, preset, lines };
}

function joinWithAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** One or two plain sentences saying where each model leads on paper. */
export function summarizePair(comparison: PairComparison): string {
  const firstLeads = comparison.lines.filter((line) => line.edge === "first").map((line) => line.summaryLabel);
  const secondLeads = comparison.lines.filter((line) => line.edge === "second").map((line) => line.summaryLabel);
  const parts: string[] = [];

  if (firstLeads.length > 0) parts.push(`${comparison.first.name} leads on ${joinWithAnd(firstLeads)}.`);
  if (secondLeads.length > 0) parts.push(`${comparison.second.name} leads on ${joinWithAnd(secondLeads)}.`);
  if (parts.length === 0) parts.push("Neither model leads on the measures compared here.");

  return parts.join(" ");
}

/** Text for the "edge" column: the leading model and why, or why there is no comparison. */
export function describeEdge(line: PairLine, comparison: PairComparison): string {
  switch (line.edge) {
    case "first":
      return `${comparison.first.name}${line.betterWord ? ` (${line.betterWord})` : ""}`;
    case "second":
      return `${comparison.second.name}${line.betterWord ? ` (${line.betterWord})` : ""}`;
    case "even":
      return "Even";
    case "none":
      return line.betterWord ? "Not compared (no ranked score on both)" : "Not compared";
  }
}

/** Pairs from different makers with the same input and output list price, a fair starting point for a test. */
export function findSamePricePairs(rows: readonly ModelDirectoryRow[]): SamePricePair[] {
  const pairs: SamePricePair[] = [];

  for (let firstIndex = 0; firstIndex < rows.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < rows.length; secondIndex += 1) {
      const first = rows[firstIndex];
      const second = rows[secondIndex];
      if (
        first.maker !== second.maker &&
        first.inputPricePerMillion === second.inputPricePerMillion &&
        first.outputPricePerMillion === second.outputPricePerMillion
      ) {
        pairs.push({ id: `${first.id}-vs-${second.id}`, first, second });
      }
    }
  }

  return pairs.sort(
    (left, right) =>
      right.first.inputPricePerMillion - left.first.inputPricePerMillion || left.id.localeCompare(right.id),
  );
}

/** Four headline numbers for the hero. */
export function getHeadToHeadStatItems(matchups: readonly Matchup[], rows: readonly ModelDirectoryRow[]): StatItem[] {
  return [
    { value: String(matchups.length), label: "matchup planned at launch" },
    { value: String(matchups.filter((matchup) => matchup.isPublished).length), label: "matchups published" },
    { value: String(TASKS_PER_MATCHUP), label: "tasks in every matchup" },
    { value: String((rows.length * (rows.length - 1)) / 2), label: "pairs you can compare on paper" },
  ];
}