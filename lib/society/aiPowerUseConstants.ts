/** Date the article copy was last reviewed (Blueprint 6.2). Bump on every edit. */
export const AI_POWER_REVIEWED_ON = "November 4, 2026";

/** Date the figures were last checked against the sources. */
export const AI_POWER_VERIFIED_ON = "November 4, 2026";

export const IEA_2026_TITLE = "Key Questions on Energy and AI";
export const IEA_2026_PUBLISHED_ON = "16 April 2026";
export const IEA_2026_SOURCE_LABEL = `International Energy Agency, ${IEA_2026_TITLE} (${IEA_2026_PUBLISHED_ON})`;

export const IEA_2026_URL = "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary";
export const IEA_2026_PDF_URL =
  "https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf";
export const IEA_NEWS_URL =
  "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions";
export const IEA_2025_URL = "https://www.iea.org/reports/energy-and-ai/executive-summary";
export const IEA_2025_DEMAND_URL = "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai";
export const IEA_POWERING_AI_URL =
  "https://iea.blob.core.windows.net/assets/cd360a30-aaef-43cd-84e6-a125c3a0bc67/PoweringArtificialIntelligence.pdf";

export const DAYS_PER_YEAR = 365;
export const BILLION = 1_000_000_000;
export const WH_PER_TWH = 1_000_000_000_000;

/** Heavy tasks are modelled at the low end of the IEA's "hundreds or thousands of times" a simple text query. Our choice. */
export const HEAVY_TASK_MULTIPLIER = 100;

/** Annual totals below this many TWh are shown to one decimal place. */
export const TWH_ONE_DECIMAL_LIMIT = 10;
/** Shares below this percentage are shown as "under". */
export const SHARE_FLOOR_PERCENT = 0.1;
export const FULL_SHARE = 1;