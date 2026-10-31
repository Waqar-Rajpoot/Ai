import type { ScorecardPointDefinition } from "./reviewTypes";

/** The seven-point scorecard. Every model gets the same fixed test. */
export const SCORECARD_POINTS: readonly ScorecardPointDefinition[] = [
  {
    id: "accuracy",
    title: "Accuracy",
    fixedTest: "Factual questions, with sources checked by hand.",
  },
  {
    id: "reasoning-maths",
    title: "Reasoning and maths",
    fixedTest: "A fixed set of problems.",
  },
  {
    id: "writing-instructions",
    title: "Writing and instruction following",
    fixedTest: "Drafts with strict format limits.",
  },
  {
    id: "coding-tools",
    title: "Coding and tool use",
    fixedTest: "A small repository task, with each model's recommended settings.",
  },
  {
    id: "long-documents",
    title: "Long documents",
    fixedTest: "A PDF summary and a question about a distant page.",
  },
  {
    id: "cost-per-task",
    title: "Cost per task",
    fixedTest: "The cost of finishing the task, not only the price per token.",
  },
  {
    id: "privacy-limits",
    title: "Privacy and limits",
    fixedTest: "Training settings, data retention and free-plan caps.",
  },
];