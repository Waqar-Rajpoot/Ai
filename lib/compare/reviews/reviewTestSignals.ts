import {
  CODING_TASK_SCENARIO_ID,
  REVIEW_SITE_PATHS,
  UNCONFIRMED_CONTEXT_LABEL,
} from "./reviewConfig";
import { formatMoney } from "./reviewFormat";
import type { EvidenceHighlight, ReviewPageModel, ScorecardPointId } from "./reviewTypes";

export type TestSignalKind = "independent" | "vendor-reported" | "calculated" | "directory" | "none";

/** The closest existing data point to one of our seven fixed tests. */
export interface TestSignal {
  kind: TestSignalKind;
  text: string;
  href?: string;
}

interface SignalRule {
  /** BenchLM category names that stand in for this point, in priority order. */
  categories: readonly string[];
  /** Matches benchmark labels that stand in for this point. */
  highlightPattern: RegExp;
}

/** Which independent data stands in for which scorecard point. */
const SIGNAL_RULES: Readonly<Partial<Record<ScorecardPointId, SignalRule>>> = {
  accuracy: { categories: ["Knowledge"], highlightPattern: /knowledge|healthbench/i },
  "reasoning-maths": {
    categories: ["Reasoning", "Math"],
    highlightPattern: /arc-agi|math|stem|reasoning/i,
  },
  "coding-tools": {
    categories: ["Coding", "Agentic"],
    highlightPattern: /swe|code|cursor|terminal|bug hunt|hermes/i,
  },
};

const LONG_DOCUMENT_PATTERN = /graphwalks|parsebench|extractbench/i;
const MAX_SIGNAL_PARTS = 2;

function toKind(highlight: EvidenceHighlight): TestSignalKind {
  return highlight.source === "vendor-reported" ? "vendor-reported" : "independent";
}

/** Independent rows first, then vendor-reported ones. */
function findHighlights(
  model: ReviewPageModel,
  pattern: RegExp,
): EvidenceHighlight[] {
  const matches = (model.evidence?.highlights ?? []).filter((highlight) => pattern.test(highlight.label));
  return [...matches.filter((item) => item.source !== "vendor-reported"), ...matches.filter((item) => item.source === "vendor-reported")];
}

function buildFromRule(model: ReviewPageModel, rule: SignalRule): TestSignal | null {
  const categories = (model.evidence?.categories ?? []).filter((entry) =>
    rule.categories.includes(entry.category),
  );
  if (categories.length > 0) {
    const text = categories
      .slice(0, MAX_SIGNAL_PARTS)
      .map((entry) => `${entry.category} ${entry.score.toFixed(1)} (${entry.rankLabel})`)
      .join(", ");
    return { kind: "independent", text: `BenchLM ${text}` };
  }

  const highlights = findHighlights(model, rule.highlightPattern).slice(0, MAX_SIGNAL_PARTS);
  if (highlights.length > 0) {
    return {
      kind: toKind(highlights[0]),
      text: highlights.map((item) => `${item.label} ${item.value}`).join(", "),
    };
  }
  return null;
}

function buildLongDocumentSignal(model: ReviewPageModel): TestSignal {
  const { row } = model;
  const contextText =
    row.contextLabel === UNCONFIRMED_CONTEXT_LABEL
      ? "Context window not confirmed in our directory"
      : `${row.contextLabel} context window`;
  const highlight = findHighlights(model, LONG_DOCUMENT_PATTERN)[0];

  if (highlight) {
    return {
      kind: toKind(highlight),
      text: `${contextText}. ${highlight.label} ${highlight.value}`,
    };
  }
  return { kind: "directory", text: contextText };
}

function buildCostSignal(model: ReviewPageModel): TestSignal {
  const estimate = model.costEstimates.find((item) => item.scenario.id === CODING_TASK_SCENARIO_ID);
  if (!estimate) return { kind: "none", text: "No cost estimate available." };
  return {
    kind: "calculated",
    text: `About ${formatMoney(estimate.costPerTask)} for a coding task at list price, ${formatMoney(estimate.costPerThousandTasks)} per 1,000 tasks`,
  };
}

function buildPrivacySignal(model: ReviewPageModel): TestSignal {
  const count = model.editorial.safetyNotes?.length ?? 0;
  if (count > 0) {
    return {
      kind: "vendor-reported",
      text: `${count} published safety ${count === 1 ? "document" : "documents"} logged. Training and retention terms differ by plan`,
      href: REVIEW_SITE_PATHS.privacyMatrix,
    };
  }
  return {
    kind: "none",
    text: "No safety documentation logged yet. Check plan terms",
    href: REVIEW_SITE_PATHS.privacyMatrix,
  };
}

const NO_SIGNAL: TestSignal = { kind: "none", text: "No independent result logged yet." };

/**
 * For each of the seven scorecard points, finds the closest existing data so
 * the section is useful before our own test run exists. These are stand-ins,
 * never test results.
 */
export function buildTestSignals(model: ReviewPageModel): Record<ScorecardPointId, TestSignal> {
  const fromRule = (id: ScorecardPointId): TestSignal => {
    const rule = SIGNAL_RULES[id];
    return (rule && buildFromRule(model, rule)) ?? NO_SIGNAL;
  };

  return {
    accuracy: fromRule("accuracy"),
    "reasoning-maths": fromRule("reasoning-maths"),
    "writing-instructions": NO_SIGNAL,
    "coding-tools": fromRule("coding-tools"),
    "long-documents": buildLongDocumentSignal(model),
    "cost-per-task": buildCostSignal(model),
    "privacy-limits": buildPrivacySignal(model),
  };
}

/** Number of scorecard points that have a stand-in signal. */
export function countSignals(signals: Record<ScorecardPointId, TestSignal>): number {
  return Object.values(signals).filter((signal) => signal.kind !== "none").length;
}