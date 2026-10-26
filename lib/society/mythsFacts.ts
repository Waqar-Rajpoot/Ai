import type { EvidenceKind } from "./forces";

export type MythFactVerdict = "Myth" | "Fact";

export interface MythFactEvidence {
  text: string;
  source: string;
  date: string;
  href: string;
}

export interface MythFactItem {
  id: string;
  claim: string;
  verdict: MythFactVerdict;
  explanation: string;
  kind: EvidenceKind;
  evidence: MythFactEvidence;
}

export interface MythFactScore {
  correct: number;
  answered: number;
  total: number;
  headline: string;
  advice: string;
}

/** Share of correct answers, in percent, for each result band. */
export const MYTH_FACT_SHARP_MIN_PERCENT = 80;
export const MYTH_FACT_GOOD_START_MIN_PERCENT = 50;

export const MYTH_FACT_VERDICTS: readonly MythFactVerdict[] = ["Myth", "Fact"];

/** Six sourced cards. The full myth-or-fact page can extend this list. */
export const MYTH_FACT_ITEMS: readonly MythFactItem[] = [
  {
    id: "most-adults-dont-use",
    claim: "Most American adults aged 18 to 64 do not use generative AI.",
    verdict: "Myth",
    explanation: "About 62% reported using it in Q2 2026, up from about 45% in 2024. That counts use for work, personal use or both.",
    kind: "Measured",
    evidence: { text: "61.8% of adults aged 18 to 64 used generative AI in Q2 2026.", source: "Real-Time Population Survey, via FRED", date: "Q2 2026", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREALL" },
  },
  {
    id: "most-businesses-use",
    claim: "More than half of US businesses use AI.",
    verdict: "Myth",
    explanation: "Use among people is far higher than use among firms, and the two surveys ask different questions. Census data show roughly one business in five.",
    kind: "Measured",
    evidence: { text: "About 17% to 20% of US businesses used AI in any business function between December 2025 and May 2026.", source: "Census Bureau, Business Trends and Outlook Survey", date: "December 2025 to May 2026", href: "https://census.gov/library/stories/2026/05/ai-use-businesses.html" },
  },
  {
    id: "hiring-already-changed",
    claim: "Most firms say AI has already changed their hiring or layoffs.",
    verdict: "Myth",
    explanation: "Most surveyed firms said AI had no noticeable effect on hiring or layoff decisions so far. A minority were planning layoffs, not hiring, or creating positions because of AI.",
    kind: "Measured",
    evidence: { text: "76% of manufacturers and 73% of services firms reported no noticeable effect.", source: "ISM, as reported by Staffing Industry Analysts", date: "June 2026", href: "https://www.staffingindustry.com/news/global-daily-news/only-modest-employment-expectations-for-remainder-of-the-year" },
  },
  {
    id: "most-power-is-ai",
    claim: "Most data-centre electricity already goes to AI servers.",
    verdict: "Myth",
    explanation: "Gartner estimates AI-optimized servers use 31% of data-centre power in 2026, up from about 20% a year earlier. It expects them to pass conventional servers in 2027.",
    kind: "Projected",
    evidence: { text: "AI-optimized servers: 31% of data-centre power in 2026.", source: "Gartner", date: "June 2026", href: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026" },
  },
  {
    id: "power-grows-quarter",
    claim: "Gartner forecasts that global data-centre electricity use will grow by about a quarter in 2026.",
    verdict: "Fact",
    explanation: "Gartner forecasts 565 TWh in 2026, up 26% from 447 TWh in 2025. It is a forecast, and other named forecasters, such as the IEA, project lower totals for 2030.",
    kind: "Projected",
    evidence: { text: "565 TWh in 2026, up 26% from 447 TWh in 2025.", source: "Gartner", date: "June 2026", href: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026" },
  },
  {
    id: "eu-delayed",
    claim: "The EU has delayed its main AI Act rules for high-risk systems.",
    verdict: "Fact",
    explanation: "Rules for stand-alone high-risk systems moved from August 2, 2026 to December 2, 2027, and rules for AI built into regulated products moved to August 2, 2028. Transparency duties still began on August 2, 2026.",
    kind: "In law",
    evidence: { text: "Regulation (EU) 2026/1744 entered into force on July 27, 2026.", source: "Summary of the Official Journal text", date: "July 2026", href: "https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027" },
  },
];

export function isGuessCorrect(item: MythFactItem, guess: MythFactVerdict): boolean {
  return item.verdict === guess;
}

/** Scores the answers given so far. Unanswered cards count as not answered, not as wrong. */
export function summariseMythFactScore(
  items: readonly MythFactItem[],
  guesses: Readonly<Record<string, MythFactVerdict>>,
): MythFactScore {
  let correct = 0;
  let answered = 0;
  for (const item of items) {
    const guess = guesses[item.id];
    if (guess === undefined) continue;
    answered += 1;
    if (isGuessCorrect(item, guess)) correct += 1;
  }

  const total = items.length;
  const percent = total === 0 ? 0 : (correct / total) * 100;

  if (percent >= MYTH_FACT_SHARP_MIN_PERCENT) {
    return { correct, answered, total, headline: "Sharp eyes", advice: "You spotted most of them. Check the sources behind the claims you see online, too." };
  }
  if (percent >= MYTH_FACT_GOOD_START_MIN_PERCENT) {
    return { correct, answered, total, headline: "A good start", advice: "Several of these are easy to get wrong. Read the evidence lines and try again." };
  }
  return { correct, answered, total, headline: "Worth a second look", advice: "Many popular claims about AI do not match the data. The articles below explain each one with sources." };
}