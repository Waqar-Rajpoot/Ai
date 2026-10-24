import { ADOPTION_FROM_QUARTER, ADOPTION_GROUP, ADOPTION_TO_QUARTER } from "./adoptionData";
import { JOBS_FINDINGS } from "./anchorFigures";
import type { SurveyProfile, WorkTrait } from "./jobs";

/** The three named sources, in Blueprint 5.6 order. No sample sizes are shown because none has been verified. */
export const SURVEY_PROFILES: readonly SurveyProfile[] = [
  {
    id: "net-effect",
    publisher: JOBS_FINDINGS.surveyorNet.publisher,
    title: "Survey of managers on AI and employment",
    kindLabel: "Survey of managers",
    published: JOBS_FINDINGS.surveyorNet.published,
    whoAnswered: "Managers at the firms surveyed.",
    whatWasCounted: "The overall (net) effect of AI on employment, as the managers described it, after counting both jobs reduced and jobs added.",
    evidenceKind: "Opinion: managers' reported view",
    closenessToOutcomes: "The closest of the three to real job changes, but still a manager's report and not payroll data.",
    canTellYou: [
      "How surveyed managers described the net effect on employment at that date.",
      "That the reported net effect was modest in size and negative in direction.",
    ],
    cannotTellYou: [
      "How many jobs were lost or gained across the whole economy.",
      "Who was affected, such as which ages or occupations.",
      "Whether AI caused the change, rather than other pressures on hiring.",
      "What will happen in later years.",
    ],
    checkInOriginal: [
      "How many managers and firms answered, and how they were chosen.",
      "Which countries and sectors were covered.",
      "The exact question wording and what “modestly” means on the survey's scale.",
    ],
    technicalNote: "A net figure hides the gross flows. A small net effect can mean few changes, or real losses in some roles offset by gains in others. A perception survey also records what managers believe, which can differ from what payroll records later show.",
  },
  {
    id: "layoff-plans",
    publisher: JOBS_FINDINGS.ism.publisher,
    title: "Survey of manufacturers and services firms",
    kindLabel: "Survey of firms",
    published: JOBS_FINDINGS.ism.published,
    whoAnswered: "Surveyed manufacturing and services firms.",
    whatWasCounted: JOBS_FINDINGS.ism.statement,
    evidenceKind: "Plan: what firms say they intend to do",
    closenessToOutcomes: "A plan, which may or may not happen, and which says nothing about hiring that firms quietly skip.",
    canTellYou: [
      "That a minority of the surveyed firms reported layoff plans linked to AI.",
      "That the share differed by sector, and was higher among services firms than manufacturers.",
    ],
    cannotTellYou: [
      "Whether the layoffs have happened, or how many people they affect.",
      "Whether AI was the main reason or one of several.",
      "Whether the same firms are hiring or retraining elsewhere.",
      "Anything about other sectors, such as healthcare, education or government.",
    ],
    checkInOriginal: [
      "Whether the percentage is of all surveyed firms or only of firms that have introduced AI.",
      "How many firms answered in each sector.",
      "Whether “layoffs” means a few roles or a large reduction.",
    ],
    technicalNote: "A plan is not an outcome, and firms revise plans. The denominator matters a great deal: a share of all firms and a share of firms already using AI are very different claims. A survey of layoff plans also cannot see a hiring freeze, which reduces jobs without any layoff.",
  },
  {
    id: "adoption",
    publisher: "Fed-hosted adoption tracker",
    title: `Generative AI use, ${ADOPTION_GROUP}`,
    kindLabel: "Official tracker",
    published: `${ADOPTION_FROM_QUARTER} to ${ADOPTION_TO_QUARTER}`,
    whoAnswered: `${ADOPTION_GROUP}.`,
    whatWasCounted: "The share who use generative AI: overall, at work and outside work, by quarter.",
    evidenceKind: "Behaviour: reported use",
    closenessToOutcomes: "Exposure only. It shows how many people use AI, not whether anyone's job changed.",
    canTellYou: [
      "How quickly use of generative AI at work has spread among US adults aged 18 to 64.",
      "That use at work and outside work have both risen over the period.",
    ],
    cannotTellYou: [
      "Whether use replaced anyone's tasks or job.",
      "How much of a person's working week involves AI.",
      "Anything about people under 18 or over 64, or outside the US.",
    ],
    checkInOriginal: [
      "How “use” is defined, and how often someone must use AI to count.",
      "The sample size and how answers are weighted.",
      "Whether later quarters have been released.",
    ],
    technicalNote: "Adoption is a precondition for change, not evidence of it. A rising share of workers using AI is needed for AI to reshape work, but employment outcomes have to be read from separate data, such as employment by occupation and age.",
  },
];

/** Statements for the tasks check. Directions are interleaved on purpose so the order does not hint at an answer. */
export const WORK_TRAITS: readonly WorkTrait[] = [
  { id: "trait-screen", direction: "more-change", text: "Most of my work is done on a screen: writing, reading, sorting or entering information.", why: "AI tools are widely built for text and data work, so screen-based tasks are where tools are most often tried first." },
  { id: "trait-physical", direction: "less-change", text: "My work needs me to be in a particular place or to handle physical things.", why: "Physical presence and hands-on work are hard to hand to software, although the paperwork around them can change." },
  { id: "trait-repeat", direction: "more-change", text: "I do similar tasks over and over in a week.", why: "Repeated tasks with a clear pattern are easier to hand to a tool." },
  { id: "trait-trust", direction: "less-change", text: "People rely on me being there and on trusting me: care, teaching, negotiation or advice.", why: "Trust and presence are part of the service itself, not just a way of delivering it." },
  { id: "trait-template", direction: "more-change", text: "Much of my work follows templates, checklists or fixed steps.", why: "Fixed steps are easier to describe to a tool and to check afterwards." },
  { id: "trait-accountable", direction: "less-change", text: "I am personally accountable for decisions where a mistake is costly or has legal weight.", why: "Someone must own the decision, so a person stays in the loop even when a tool helps." },
  { id: "trait-quick-check", direction: "more-change", text: "A colleague could check my output quickly just by reading it.", why: "When checking is cheap, a tool's draft saves more time than it costs." },
  { id: "trait-messy", direction: "less-change", text: "Every case is different, and I use judgement on messy or unclear situations.", why: "Unclear situations with missing context are where tools are least reliable." },
  { id: "trait-first-drafts", direction: "more-change", text: "A large part of my day is first drafts, summaries or routine replies.", why: "Drafting and summarising are among the most common uses of current tools." },
  { id: "trait-local", direction: "less-change", text: "Much of what I know is local or unwritten: about people, sites or history.", why: "Knowledge that is not written down is hard for a tool to have." },
];