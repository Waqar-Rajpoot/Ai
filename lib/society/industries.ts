import type { VerificationLevel } from "@/lib/prices/apiCostTable";

export type IndustryId =
  | "professional-technical"
  | "business-financial"
  | "manufacturing-services"
  | "healthcare"
  | "finance-banking"
  | "education"
  | "customer-service-retail"
  | "media-creative-legal";

/** Our reading of timing: changing now, likely next, or later. A judgement, not a measurement. */
export type Stage = "now" | "next" | "later";

/** "named-survey" rows carry numbers. "directional" rows carry none (Blueprint 5.6). */
export type EvidenceLevel = "named-survey" | "directional";

export interface Figure {
  label: string;
  value: string;
  source: string;
  period: string;
  verification: VerificationLevel;
  url: string;
}

export interface Industry {
  id: IndustryId;
  name: string;
  stage: Stage;
  evidence: EvidenceLevel;
  headline: string;
  whatChanges: string;
  whoFeelsIt: string;
  watch: string;
  figures: readonly Figure[];
  /** Shown on directional cards in place of numbers. */
  directionalNote?: string;
  deeperHref?: string;
  deeperLabel?: string;
}

export interface AdoptionPoint {
  id: string;
  label: string;
  /** Percent of firms using AI in the past two weeks. */
  current: number;
  /** Low and high ends of the share expecting to use AI within six months. */
  expectedLow: number;
  expectedHigh: number;
  expectedText: string;
}

export const STAGE_LABELS: Record<Stage, string> = {
  now: "Changing now",
  next: "Next",
  later: "Later",
};

export const STAGE_HINTS: Record<Stage, string> = {
  now: "Highest use in the surveys we checked.",
  next: "Use is rising or the pressure is clear, but the data is thinner.",
  later: "Lowest use among the sectors we checked.",
};

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  "named-survey": "Named survey",
  directional: "Directional",
};

const CENSUS = "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html";
const FED = "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html";
const AMA = "https://ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey";
const AXIS = "https://axis-intelligence.com/ai-adoption-by-industry-statistics/";

export const INDUSTRIES: readonly Industry[] = [
  {
    id: "professional-technical",
    name: "Professional and technical",
    stage: "now",
    evidence: "named-survey",
    headline: "The heaviest use anywhere in the data: work made of text, numbers and code.",
    whatChanges:
      "The surveys show the highest use in sectors whose output is information. They measure whether people use AI, not which tasks, so the usual suspects (drafting, summarising, analysis, code) are our reading, not a measured finding.",
    whoFeelsIt: "Early-career staff doing routine drafting and analysis. See the jobs signal below, which is about exposed occupations rather than this sector alone.",
    watch: "Whether firm use (39.7% in Information) catches up with worker use (about 70%).",
    figures: [
      { label: "Workers using generative AI for their job: information", value: "About 70%", source: "Federal Reserve note, Real-Time Population Survey", period: "Nov 2025", verification: "provider", url: FED },
      { label: "Workers using generative AI for their job: professional services", value: "About 62%", source: "Federal Reserve note, Real-Time Population Survey", period: "Nov 2025", verification: "provider", url: FED },
      { label: "Firms using AI: information sector", value: "39.7%", source: "Census Bureau BTOS", period: "Wave ending May 3, 2026", verification: "provider", url: CENSUS },
    ],
    deeperHref: "/society/role-of-ai-in-our-lives",
    deeperLabel: "Where people meet AI today",
  },
  {
    id: "manufacturing-services",
    name: "Manufacturing and services",
    stage: "later",
    evidence: "named-survey",
    headline: "Lower use from a low base, and layoff plans are a minority.",
    whatChanges:
      "Hands-on work and in-person service show the lowest use in the sectors we checked. Growth is reported to be fast from that low base, but the growth figures conflict between sources, so we do not quote one.",
    whoFeelsIt: "Planners, schedulers, quality and admin roles first. Floor and front-of-house roles are far less affected in the data.",
    watch: "Whether the ISM layoff-plan shares (5% and 9%) rise in the next reports.",
    figures: [
      { label: "Workers using generative AI for their job: accommodation and food", value: "About 21%", source: "Federal Reserve note, Real-Time Population Survey", period: "Nov 2025", verification: "provider", url: FED },
      { label: "Manufacturers / services firms planning layoffs after introducing AI", value: "5% / 9%", source: "ISM survey, as carried in our tracker notes", period: "Jun 2026", verification: "secondary", url: AXIS },
      { label: "Firms using AI: manufacturing", value: "About 12%", source: "Minneapolis Fed BTOS supplement, via a tracker", period: "Apr 2026", verification: "secondary", url: AXIS },
    ],
    deeperHref: "/society/is-ai-taking-jobs",
    deeperLabel: "Is AI taking jobs?",
  },
  {
    id: "education",
    name: "Education",
    stage: "next",
    evidence: "directional",
    headline: "The questions are changing faster than the evidence.",
    whatChanges:
      "Tutoring, teacher time-saving and cheating are the three live debates. Some education uses are treated as high-risk under the EU AI Act, which brings duties for the people deploying them.",
    whoFeelsIt: "Students, teachers and anyone being assessed.",
    watch: "Assessment rules, and the first named surveys of student and teacher use.",
    figures: [],
    directionalNote: "Directional. We have not yet checked a named survey for this sector, so there are no numbers here.",
    deeperHref: "/society/ai-in-education",
    deeperLabel: "AI in education: tutor, teacher aid or shortcut?",
  },
  {
    id: "customer-service-retail",
    name: "Customer service and retail",
    stage: "next",
    evidence: "named-survey",
    headline: "Retail sits below the national average today, with modest growth expected.",
    whatChanges:
      "Retail firms report use below the national rate, and only a small rise is expected. Customer service is a role, not a sector, so its direction is our reading and carries no number.",
    whoFeelsIt: "Shoppers meeting chatbots first, and support staff handling the harder cases that remain.",
    watch: "Whether the roughly 17% of retailers expecting to use AI follow through.",
    figures: [
      { label: "Firms using AI: retail trade", value: "About 14%", source: "Census Bureau BTOS", period: "Wave ending May 3, 2026", verification: "provider", url: CENSUS },
      { label: "Retail firms expecting to use AI within six months", value: "About 17%", source: "Census Bureau BTOS", period: "Wave ending May 3, 2026", verification: "provider", url: CENSUS },
    ],
    directionalNote: "The customer-service half of this card is directional: no named survey checked yet.",
    deeperHref: "/society/is-ai-taking-jobs",
    deeperLabel: "Is AI taking jobs?",
  },
  {
    id: "media-creative-legal",
    name: "Media, creative and legal",
    stage: "next",
    evidence: "directional",
    headline: "Heavy experimentation, with open questions about quality and rights.",
    whatChanges:
      "Drafting, summarising and image and video generation are the uses to watch, alongside disputes over copyright and fabricated citations. Census's Information sector (39.7% of firms) includes publishing and broadcasting but also software and telecom, so it is not a media number.",
    whoFeelsIt: "Writers, designers, editors, paralegals and the people who rely on their work.",
    watch: "Court and licensing outcomes, and a named survey of creative and legal workers.",
    figures: [],
    directionalNote: "Directional. No named survey for these professions has been checked yet, so there are no numbers here.",
    deeperHref: "/society/ai-myths-and-facts",
    deeperLabel: "AI myths and facts",
  },
];

/** Census BTOS points for the chart, wave ending May 3, 2026. */
export const ADOPTION_POINTS: readonly AdoptionPoint[] = [
  { id: "national", label: "All US firms", current: 19.8, expectedLow: 20, expectedHigh: 23, expectedText: "20% to 23%" },
  { id: "information", label: "Information", current: 39.7, expectedLow: 42, expectedHigh: 42, expectedText: "about 42%" },
  { id: "finance", label: "Finance and insurance", current: 33.9, expectedLow: 39, expectedHigh: 39, expectedText: "roughly 39%" },
  { id: "retail", label: "Retail trade", current: 14, expectedLow: 17, expectedHigh: 17, expectedText: "about 17%" },
];