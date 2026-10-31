import type { ModelDirectoryRow } from "@/lib/compare/modelDirectory";
import {
  BENCHLM_LEADER,
  BENCHLM_RANKED_MODEL_COUNT,
  BENCHLM_SNAPSHOT,
  BENCHLM_SNAPSHOT_DATE,
} from "./benchLmSnapshot";
import { CODING_TASK_SCENARIO_ID, COST_SCENARIOS, PRICE_TIER_LABELS } from "./reviewConfig";
import {
  calculateTaskCost,
  getBenchLmScore,
  getBlendedPrice,
  getDirectoryScore,
} from "./reviewAnalysis";
import { formatDate, formatPriceRange, formatPricePerMillion } from "./reviewFormat";
import type {
  HeadToHeadEntry,
  PricePosition,
  PriceTier,
  RankingFacts,
  ValueMetrics,
} from "./reviewTypes";

/** Rank, score change, gaps and price mismatches for one model. */
export function buildRankingFacts(
  row: ModelDirectoryRow,
  rows: readonly ModelDirectoryRow[],
): RankingFacts {
  const entry = BENCHLM_SNAPSHOT[row.id] ?? null;
  const liveScore = entry ? entry.score : null;
  const directoryScore = getDirectoryScore(row);
  const scores = rows
    .map(getBenchLmScore)
    .filter((score): score is number => score !== null);
  const topDirectoryScore = Math.max(...scores);

  const mismatch =
    entry &&
    entry.listedOutputPricePerMillion !== null &&
    Math.abs(entry.listedOutputPricePerMillion - row.outputPricePerMillion) > 0.001;

  return {
    entry,
    liveScore,
    directoryScore,
    scoreChange: liveScore !== null && directoryScore !== null ? liveScore - directoryScore : null,
    liveRank: entry ? entry.rank : null,
    rankedModelCount: BENCHLM_RANKED_MODEL_COUNT,
    directoryRank: liveScore === null ? null : 1 + scores.filter((score) => score > liveScore).length,
    directoryScoredCount: scores.length,
    gapToLeader: liveScore === null ? null : BENCHLM_LEADER.score - liveScore,
    percentOfLeader: liveScore === null ? null : (liveScore / BENCHLM_LEADER.score) * 100,
    percentOfDirectoryBest: liveScore === null ? null : (liveScore / topDirectoryScore) * 100,
    priceMismatch:
      mismatch && entry?.listedOutputPricePerMillion != null
        ? `BenchLM lists a ${formatPricePerMillion(entry.listedOutputPricePerMillion)} output price. Our directory shows ${formatPricePerMillion(row.outputPricePerMillion)}${row.priceNote ? ` (${row.priceNote.toLowerCase()})` : ""}.`
        : null,
  };
}

/** Price rank, cost against the top scorer, and score per blended dollar. */
export function buildValueMetrics(
  row: ModelDirectoryRow,
  rows: readonly ModelDirectoryRow[],
): ValueMetrics {
  const blendedPrice = getBlendedPrice(row);
  const score = getBenchLmScore(row);
  const topScorer = rows.reduce((best, candidate) =>
    (getBenchLmScore(candidate) ?? -1) > (getBenchLmScore(best) ?? -1) ? candidate : best,
  );

  return {
    blendedPrice,
    priceRank: 1 + rows.filter((candidate) => getBlendedPrice(candidate) < blendedPrice).length,
    costlierModelCount: rows.filter((candidate) => getBlendedPrice(candidate) > blendedPrice).length,
    topScorerName: topScorer.name,
    costVsTopScorer: blendedPrice / getBlendedPrice(topScorer),
    scorePerBlendedDollar: score === null ? null : score / blendedPrice,
    blendedPricePerScorePoint: score === null ? null : blendedPrice / score,
  };
}

/**
 * "Efficient" when no other directory model scores at least as high for the
 * same or a lower blended price. "Beaten" lists the models that do.
 */
export function buildPricePosition(
  row: ModelDirectoryRow,
  rows: readonly ModelDirectoryRow[],
): PricePosition {
  const score = getBenchLmScore(row);
  if (score === null) return { status: "unscored", beatenBy: [] };

  const price = getBlendedPrice(row);
  const beatenBy = rows
    .filter((candidate) => {
      const candidateScore = getBenchLmScore(candidate);
      if (candidate.id === row.id || candidateScore === null) return false;
      const candidatePrice = getBlendedPrice(candidate);
      return (
        candidateScore >= score &&
        candidatePrice <= price &&
        (candidateScore > score || candidatePrice < price)
      );
    })
    .map((candidate) => candidate.name);

  return { status: beatenBy.length > 0 ? "beaten" : "efficient", beatenBy };
}

/** Compares the model against the given rivals on score, price and a coding task. */
export function buildHeadToHead(
  row: ModelDirectoryRow,
  rivals: readonly ModelDirectoryRow[],
  hrefOf: (rival: ModelDirectoryRow) => string,
): HeadToHeadEntry[] {
  const codingScenario =
    COST_SCENARIOS.find((scenario) => scenario.id === CODING_TASK_SCENARIO_ID) ?? COST_SCENARIOS[0];
  const ownScore = getBenchLmScore(row);
  const ownPrice = getBlendedPrice(row);

  return rivals.map((rival) => {
    const rivalScore = getBenchLmScore(rival);
    return {
      rival,
      href: hrefOf(rival),
      scoreDelta: ownScore !== null && rivalScore !== null ? rivalScore - ownScore : null,
      priceRatio: getBlendedPrice(rival) / ownPrice,
      rivalCodingTaskCost: calculateTaskCost(rival, codingScenario),
    };
  });
}

/** One-sentence summary of where the model stands. */
export function buildSnapshotTakeaway(
  row: ModelDirectoryRow,
  tier: PriceTier,
  ranking: RankingFacts,
): string {
  const tierText = `${PRICE_TIER_LABELS[tier].toLowerCase()} tier`;
  const date = formatDate(BENCHLM_SNAPSHOT_DATE);
  const price = `${formatPriceRange(row)} per million tokens (input / output)`;

  if (ranking.entry === null || ranking.liveRank === null || ranking.liveScore === null) {
    return `It has no ranked BenchLM entry on ${date}, so there is no independent overall score yet. It sits in the ${tierText}, at ${price}.`;
  }
  return `It ranks ${ranking.liveRank} of ${ranking.rankedModelCount} on BenchLM (${ranking.liveScore.toFixed(2)}) and ${ranking.directoryRank} of ${ranking.directoryScoredCount} in our directory, as of ${date}. It sits in the ${tierText}, at ${price}.`;
}