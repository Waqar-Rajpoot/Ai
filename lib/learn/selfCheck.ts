// import type { SelfCheckQuestion } from "./foundationsContent";
// import { GOOD_START_MIN_CORRECT, READY_MIN_CORRECT } from "./learnConstants";

// export interface SelfCheckResult {
//   correct: number;
//   total: number;
//   headline: string;
//   advice: string;
// }

// /** Scores the answers (question id to chosen option id) and picks a result message. */
// export function scoreSelfCheck(
//   questions: readonly SelfCheckQuestion[],
//   answers: Readonly<Record<string, string>>,
// ): SelfCheckResult {
//   const correct = questions.filter((question) => answers[question.id] === question.correctOptionId).length;
//   const total = questions.length;

//   if (correct >= READY_MIN_CORRECT) {
//     return { correct, total, headline: "You are ready for Level 2", advice: "Skim the guides below, then move on to the Practitioner level." };
//   }
//   if (correct >= GOOD_START_MIN_CORRECT) {
//     return { correct, total, headline: "A good start", advice: "Read the guides for the questions you missed, then try again." };
//   }
//   return { correct, total, headline: "Start with guide 1", advice: "The guides below take 5 to 8 minutes each. Begin at the top." };
// }






import type { SelfCheckQuestion } from "./foundationsContent";
import { GOOD_START_MIN_CORRECT, READY_MIN_CORRECT } from "./learnConstants";

export interface SelfCheckMessage {
  headline: string;
  advice: string;
}

/** Result copy for each score band, so every level hub can word its own. */
export interface SelfCheckMessages {
  ready: SelfCheckMessage;
  goodStart: SelfCheckMessage;
  startOver: SelfCheckMessage;
}

export interface SelfCheckResult extends SelfCheckMessage {
  correct: number;
  total: number;
}

export const FOUNDATIONS_RESULT_MESSAGES: SelfCheckMessages = {
  ready: { headline: "You are ready for Level 2", advice: "Skim the guides below, then move on to the Practitioner level." },
  goodStart: { headline: "A good start", advice: "Read the guides for the questions you missed, then try again." },
  startOver: { headline: "Start with guide 1", advice: "The guides below take 5 to 8 minutes each. Begin at the top." },
};

/** Scores the answers (question id to chosen option id) and picks a result message. */
export function scoreSelfCheck(
  questions: readonly SelfCheckQuestion[],
  answers: Readonly<Record<string, string>>,
  messages: SelfCheckMessages,
): SelfCheckResult {
  const correct = questions.filter((question) => answers[question.id] === question.correctOptionId).length;
  const total = questions.length;

  if (correct >= READY_MIN_CORRECT) return { correct, total, ...messages.ready };
  if (correct >= GOOD_START_MIN_CORRECT) return { correct, total, ...messages.goodStart };
  return { correct, total, ...messages.startOver };
}