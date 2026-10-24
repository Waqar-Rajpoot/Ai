const PERCENT = 100;

export type ChecklistAnswer = "yes" | "no" | "unsure" | "unanswered";
export type EvidenceTier = "strong" | "moderate" | "weak";

/** One question. "yes" is always the reassuring answer. */
export interface ChecklistItem {
  id: string;
  /** Importance, higher counts more. */
  weight: number;
  /** A "no" on a critical item lowers the rating by one step. */
  isCritical: boolean;
}

export type ChecklistAnswers = Readonly<Record<string, ChecklistAnswer>>;

export interface ChecklistThresholds {
  strongPercent: number;
  moderatePercent: number;
  /** Answers needed before any rating is given. */
  minAnswered: number;
}

export interface ChecklistScore {
  totalCount: number;
  answeredCount: number;
  yesCount: number;
  noCount: number;
  unsureCount: number;
  earnedPoints: number;
  /** Points available among the questions answered so far. */
  answeredPoints: number;
  /** Earned share of the answered points, 0 to 100. */
  percent: number;
  criticalNoIds: string[];
  /** Null until enough questions are answered. */
  tier: EvidenceTier | null;
}

const TIER_ORDER: readonly EvidenceTier[] = ["strong", "moderate", "weak"];

export function getAnswer(answers: ChecklistAnswers, itemId: string): ChecklistAnswer {
  return answers[itemId] ?? "unanswered";
}

/** Every item unanswered. */
export function createBlankAnswers(items: readonly ChecklistItem[]): Record<string, ChecklistAnswer> {
  return Object.fromEntries(items.map((item) => [item.id, "unanswered" satisfies ChecklistAnswer]));
}

/** Base rating from the percentage, then one step down for each critical "no" (never below weak). */
export function rateEvidence(
  percent: number,
  criticalNoCount: number,
  thresholds: ChecklistThresholds,
): EvidenceTier {
  let baseIndex = TIER_ORDER.length - 1;
  if (percent >= thresholds.strongPercent) baseIndex = 0;
  else if (percent >= thresholds.moderatePercent) baseIndex = 1;
  const index = Math.min(baseIndex + criticalNoCount, TIER_ORDER.length - 1);
  return TIER_ORDER[index] ?? "weak";
}

/** Scores the answered questions. "Not sure" earns nothing, like "no", but is not a red flag. */
export function scoreChecklist(
  items: readonly ChecklistItem[],
  answers: ChecklistAnswers,
  thresholds: ChecklistThresholds,
): ChecklistScore {
  let answeredCount = 0;
  let yesCount = 0;
  let noCount = 0;
  let unsureCount = 0;
  let earnedPoints = 0;
  let answeredPoints = 0;
  const criticalNoIds: string[] = [];

  for (const item of items) {
    const answer = getAnswer(answers, item.id);
    if (answer === "unanswered") continue;
    answeredCount += 1;
    answeredPoints += item.weight;
    if (answer === "yes") {
      yesCount += 1;
      earnedPoints += item.weight;
    } else if (answer === "no") {
      noCount += 1;
      if (item.isCritical) criticalNoIds.push(item.id);
    } else {
      unsureCount += 1;
    }
  }

  const percent = answeredPoints > 0 ? (earnedPoints / answeredPoints) * PERCENT : 0;
  const tier =
    answeredCount < thresholds.minAnswered ? null : rateEvidence(percent, criticalNoIds.length, thresholds);

  return {
    totalCount: items.length,
    answeredCount,
    yesCount,
    noCount,
    unsureCount,
    earnedPoints,
    answeredPoints,
    percent,
    criticalNoIds,
    tier,
  };
}

/** Ids of questions answered "no" or "not sure", heaviest first, then in original order. */
export function listOpenItemIds(items: readonly ChecklistItem[], answers: ChecklistAnswers): string[] {
  return items
    .map((item, position) => ({ item, position }))
    .filter(({ item }) => {
      const answer = getAnswer(answers, item.id);
      return answer === "no" || answer === "unsure";
    })
    .sort((first, second) => second.item.weight - first.item.weight || first.position - second.position)
    .map(({ item }) => item.id);
}