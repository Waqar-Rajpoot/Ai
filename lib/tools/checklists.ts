export interface ChecklistQuestion {
  id: string;
  question: string;
  /** One line on why the question matters. */
  why: string;
}

export type BenchmarkTrust = "lead-only" | "partly-checked" | "well-documented";

export interface BenchmarkAssessment {
  yesCount: number;
  total: number;
  trust: BenchmarkTrust;
  title: string;
  advice: string;
}

/** Yes answers needed for each band. A thinking aid, not a verdict. */
export const BENCHMARK_WELL_DOCUMENTED_MIN_YES = 8;
export const BENCHMARK_PARTLY_CHECKED_MIN_YES = 5;

export const BENCHMARK_QUESTIONS: readonly ChecklistQuestion[] = [
  { id: "independent", question: "Did an independent group run the test, not the maker?", why: "Makers choose which results to publish." },
  { id: "method", question: "Is the method published: prompts, settings and how answers were scored?", why: "Without a method, nobody can repeat or check the number." },
  { id: "version", question: "Are the model version, effort setting and test date stated?", why: "Models and settings change, and so do scores." },
  { id: "task-match", question: "Does the test look like your kind of task?", why: "A coding score says little about long-document work." },
  { id: "margin", question: "Is the test-set size or margin of error given, and is the gap you care about larger than it?", why: "A gap inside the margin is a tie, not a ranking." },
  { id: "votes", question: "For an arena ranking, are vote counts shown for each model?", why: "A model with few votes has a shaky position." },
  { id: "contamination", question: "Do the testers say how they checked for contamination?", why: "Test questions that leaked into training data inflate scores." },
  { id: "repeat-runs", question: "Is the score an average of several runs, or is the spread shown?", why: "One lucky run can look like a real difference." },
  { id: "cost-speed", question: "Are cost and speed reported next to accuracy?", why: "The best score is not always the best value." },
  { id: "second-source", question: "Has a second source confirmed the result?", why: "One source can be wrong or selective." },
];

const TRUST_MESSAGES: Record<BenchmarkTrust, { title: string; advice: string }> = {
  "lead-only": {
    title: "Treat it as a lead",
    advice: "Too little is documented to rely on. Find the method or an independent source before you decide.",
  },
  "partly-checked": {
    title: "Partly checked",
    advice: "Useful for a shortlist. Close the gaps on the questions you left unticked.",
  },
  "well-documented": {
    title: "Well documented",
    advice: "A reasonable input to your choice. Still run your own test set, because your tasks may differ.",
  },
};

/** Scores the ticked questions, or returns null when nothing is ticked. Unknown ids are ignored. */
export function assessBenchmarkChecklist(yesIds: readonly string[]): BenchmarkAssessment | null {
  const knownIds = new Set(BENCHMARK_QUESTIONS.map((question) => question.id));
  const yesCount = new Set(yesIds.filter((id) => knownIds.has(id))).size;
  if (yesCount === 0) return null;

  let trust: BenchmarkTrust = "lead-only";
  if (yesCount >= BENCHMARK_WELL_DOCUMENTED_MIN_YES) trust = "well-documented";
  else if (yesCount >= BENCHMARK_PARTLY_CHECKED_MIN_YES) trust = "partly-checked";

  return { yesCount, total: BENCHMARK_QUESTIONS.length, trust, ...TRUST_MESSAGES[trust] };
}