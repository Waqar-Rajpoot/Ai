import {
  MAX_SUBJECT_LENGTH,
  MIN_ANSWERED_FOR_RATING,
  MODERATE_EVIDENCE_PERCENT,
  STRONG_EVIDENCE_PERCENT,
} from "./benchmarkConstants";
import { BENCHMARK_QUESTIONS, TIER_COPY, type BenchmarkQuestion } from "./benchmarkChecklistData";
import {
  createBlankAnswers,
  getAnswer,
  listOpenItemIds,
  scoreChecklist,
  type ChecklistAnswer,
  type ChecklistAnswers,
  type ChecklistScore,
  type ChecklistThresholds,
} from "./checklists";

export const BENCHMARK_THRESHOLDS: ChecklistThresholds = {
  strongPercent: STRONG_EVIDENCE_PERCENT,
  moderatePercent: MODERATE_EVIDENCE_PERCENT,
  minAnswered: MIN_ANSWERED_FOR_RATING,
};

export function createBlankBenchmarkAnswers(): Record<string, ChecklistAnswer> {
  return createBlankAnswers(BENCHMARK_QUESTIONS);
}

export function scoreBenchmarkChecklist(answers: ChecklistAnswers): ChecklistScore {
  return scoreChecklist(BENCHMARK_QUESTIONS, answers, BENCHMARK_THRESHOLDS);
}

export function findBenchmarkQuestion(questionId: string): BenchmarkQuestion | undefined {
  return BENCHMARK_QUESTIONS.find((question) => question.id === questionId);
}

/** Questions answered "no" or "not sure", most important first. */
export function getOpenQuestions(answers: ChecklistAnswers): BenchmarkQuestion[] {
  return listOpenItemIds(BENCHMARK_QUESTIONS, answers).flatMap((questionId) => {
    const question = findBenchmarkQuestion(questionId);
    return question ? [question] : [];
  });
}

/** Limits the free-text subject to a sensible length. */
export function trimSubject(text: string): string {
  return text.slice(0, MAX_SUBJECT_LENGTH);
}

/** Plain-text summary for the copy button. */
export function buildBenchmarkSummary(subject: string, answers: ChecklistAnswers, score: ChecklistScore): string {
  const tierCopy = TIER_COPY[score.tier ?? "incomplete"];
  const lines = [
    "Benchmark reading checklist",
    `Checking: ${subject.trim() || "(not named)"}`,
    `Rating: ${tierCopy.label} (${score.answeredCount} of ${score.totalCount} answered${score.tier ? `, ${Math.round(score.percent)}% of the weighted evidence` : ""})`,
  ];
  const redFlags = score.criticalNoIds.flatMap((questionId) => {
    const question = findBenchmarkQuestion(questionId);
    return question ? [question.shortTitle] : [];
  });
  if (redFlags.length > 0) lines.push(`Red flags: ${redFlags.join("; ")}`);

  const openQuestions = getOpenQuestions(answers);
  if (openQuestions.length > 0) {
    lines.push("Open questions:");
    for (const question of openQuestions) {
      const label = getAnswer(answers, question.id) === "no" ? "No" : "Not sure";
      lines.push(`- ${question.shortTitle} (${label}): ${question.ifUnsure}`);
    }
  }
  lines.push("A score is a shortlist, not a verdict.");
  return lines.join("\n");
}