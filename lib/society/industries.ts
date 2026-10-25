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
    id: "business-financial",
    name: "Business and financial",
    stage: "now",
    evidence: "named-survey",
    headline: "High use by firms and workers, and the biggest jump in expected use.",
    whatChanges:
      "About one in three finance and insurance firms used AI in the past two weeks, and roughly 39% expect to within six months. Census found no statistically significant change in this sector since December, so this is a high plateau, not a surge.",
    whoFeelsIt: "Back-office, reporting and client-service staff. Worker use is high, which suggests change is happening through individuals before it shows in company programmes.",
    watch: "Whether the roughly 39% who expect to use AI turn into actual use in the next waves.",
    figures: [
      { label: "Firms using AI: finance and insurance", value: "33.9%", source: "Census Bureau BTOS", period: "Wave ending May 3, 2026", verification: "provider", url: CENSUS },
      { label: "Firms expecting to use AI within six months", value: "Roughly 39%", source: "Census Bureau BTOS", period: "Wave ending May 3, 2026", verification: "provider", url: CENSUS },
      { label: "Workers using generative AI for their job: finance", value: "About 63%", source: "Federal Reserve note, Real-Time Population Survey", period: "Nov 2025", verification: "provider", url: FED },
    ],
    deeperHref: "/society/ai-in-banking-and-finance",
    deeperLabel: "AI in banking and finance",
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
    id: "healthcare",
    name: "Healthcare",
    stage: "now",
    evidence: "named-survey",
    headline: "Individual use is high. Organisation-wide change is harder to read.",
    whatChanges:
      "Four in five physicians say they use AI professionally, mostly for summarising research and paperwork. Only a small share use it for assisted diagnosis. Concern about skills and privacy is just as high as use.",
    whoFeelsIt: "Clinicians doing documentation, and patients receiving AI-drafted messages and notes.",
    watch: "Whether privacy and safety validation, which doctors call critical, catch up with use.",
    figures: [
      { label: "Physicians using AI professionally", value: "81%", source: "AMA 2026 Physician Survey on Augmented Intelligence, about 1,700 physicians", period: "Published Mar 12, 2026", verification: "provider", url: AMA },
      { label: "Using it for assistive diagnosis", value: "17%", source: "AMA 2026 Physician Survey", period: "Published Mar 12, 2026", verification: "provider", url: AMA },
      { label: "Concerned about skill loss from health AI", value: "88%", source: "AMA 2026 Physician Survey", period: "Published Mar 12, 2026", verification: "provider", url: AMA },
      { label: "Firms using AI: health care", value: "About 20%", source: "Minneapolis Fed BTOS supplement, via a tracker", period: "Apr 2026", verification: "secondary", url: AXIS },
    ],
    deeperHref: "/society/ai-in-healthcare",
    deeperLabel: "AI in healthcare: what it can and cannot do",
  },
  {
    id: "finance-banking",
    name: "Finance and banking",
    stage: "now",
    evidence: "directional",
    headline: "Beyond the sector-wide numbers above, bank-specific claims are not yet sourced.",
    whatChanges:
      "Fraud detection, customer service, credit decisions and explaining those decisions are the areas to follow. The sector-wide use figures are on the Business and financial card. This card makes no bank-specific numbers.",
    whoFeelsIt: "Customers, through faster service and through credit decisions they may want explained.",
    watch: "Rules on explaining automated credit decisions, and any named survey of banks themselves.",
    figures: [],
    directionalNote: "Directional. No named survey of banks specifically has been checked yet, so there are no numbers here.",
    deeperHref: "/society/ai-in-banking-and-finance",
    deeperLabel: "AI in banking and finance",
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