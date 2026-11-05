import {
  IEA_2025_DEMAND_URL,
  IEA_2025_URL,
  IEA_2026_PDF_URL,
  IEA_2026_SOURCE_LABEL,
  IEA_NEWS_URL,
} from "./aiPowerUseConstants";
import type { FigureUnit, RegistryFigure } from "./figureRegistry";

export type PowerSourceId = "iea-2026" | "iea-news-2026" | "iea-2025";

export interface PowerSource {
  label: string;
  href: string;
  /** "text" means we read the document text; "extract" means only a web extract of the page. */
  readAs: "text" | "extract";
}

export interface PowerFigure extends RegistryFigure {
  sourceId: PowerSourceId;
}

export interface SeriesPointDefinition {
  label: string;
  figureId: string;
  /** A fixed comparison line, such as all-time peak demand. Left out of step arithmetic. */
  isReference?: boolean;
}

export interface SeriesDefinition {
  id: string;
  label: string;
  caution?: string;
  /** Whether to show the change between consecutive points. Off when points are scenarios, not dates. */
  showSteps: boolean;
  points: readonly SeriesPointDefinition[];
}

export interface CalculatorPreset {
  id: string;
  label: string;
  figureId: string;
}

export interface CalculatorVolume {
  id: string;
  label: string;
  figureId: string;
  multiplier: number;
}

export const POWER_SOURCES: Record<PowerSourceId, PowerSource> = {
  "iea-2026": { label: IEA_2026_SOURCE_LABEL, href: IEA_2026_PDF_URL, readAs: "text" },
  "iea-news-2026": { label: "IEA news release, 16 April 2026", href: IEA_NEWS_URL, readAs: "extract" },
  "iea-2025": { label: "IEA, Energy and AI (April 2025)", href: IEA_2025_URL, readAs: "extract" },
};

const DC_ALL = "All data centres worldwide";
const AI_DC = "AI-focused data centres worldwide";
const GLOBAL_ELECTRICITY = "Global electricity demand";
const SITES = "21 large AI-focused data centres in the United States";
const ERCOT = "ERCOT (Texas) large-load connection queue";
const BIG_TECH = "The largest technology companies";

interface FigureOptions {
  to?: number;
  source?: PowerSourceId;
  note?: string;
}

function fig(
  unit: FigureUnit,
  id: string,
  value: number,
  measure: string,
  base: string,
  period: string,
  reportSection: string,
  options: FigureOptions = {},
): PowerFigure {
  return { id, unit, value, valueTo: options.to, measure, base, period, reportSection, sourceId: options.source ?? "iea-2026", note: options.note };
}

export const POWER_FIGURES: readonly PowerFigure[] = [
  // Scale
  fig("twh", "dc-2024", 415, "Electricity used by data centres", DC_ALL, "2024", "1.4"),
  fig("twh", "dc-2025", 485, "Electricity used by data centres", DC_ALL, "2025", "Executive summary", { note: "Section 1 of the report says almost 500." }),
  fig("twh", "dc-2030", 950, "Projected electricity use of data centres (Base Case)", DC_ALL, "2030", "Executive summary"),
  fig("twh", "dc-2030-2025report", 945, "Projected electricity use of data centres (Base Case), as the 2025 report put it", DC_ALL, "2030", "Executive summary", { source: "iea-2025" }),
  fig("percent", "dc-share-2025", 1.5, "Data centres' share of global electricity demand", GLOBAL_ELECTRICITY, "2025", "1", { note: "Reported as slightly more than 1.5%." }),
  fig("percent", "dc-share-2030", 3, "Projected share of global electricity demand", GLOBAL_ELECTRICITY, "2030", "Executive summary", { note: "Reported as around 3%." }),
  fig("percent", "dc-growth-2025", 17, "Growth in electricity demand from data centres", DC_ALL, "2025", "Executive summary"),
  fig("percent", "ai-growth-2025", 50, "Growth in electricity consumption of AI-focused data centres", AI_DC, "2025", "Executive summary"),
  fig("percent", "global-growth-2025", 3, "Growth in global electricity demand", GLOBAL_ELECTRICITY, "2025", "News release", { source: "iea-news-2026" }),
  fig("twh", "dc-added-2025", 70, "Electricity demand added by data centres between 2024 and 2025", DC_ALL, "2025", "1", { note: "Reported as around 70 TWh." }),
  fig("twh", "ai-2030", 465, "Projected electricity use of AI-focused data centres (Base Case)", AI_DC, "2030", "1.4, Figure 1.5", { note: "Reported as around 465 TWh." }),
  fig("times", "ai-multiple", 3, "Growth of AI-focused data centre consumption from 2025 to 2030, as a multiple", AI_DC, "2025 to 2030", "1.4", { note: "Reported as more than threefold." }),
  fig("percent", "dc-growth-share", 10, "Data centres' share of the growth in global electricity demand to 2030", "Growth in global electricity demand", "2025 to 2030", "1.4", { note: "Reported as slightly less than 10%." }),
  fig("percent", "cluster-share", 20, "Data centres' share of electricity demand where they cluster", "Demand in the states, metropolitan clusters or regions that host clusters", "2025", "3", { to: 30 }),
  fig("twh", "hyperscalers-2024", 110, "Combined electricity use of four major hyperscalers", "Amazon Web Services, Microsoft, Alphabet and Meta", "2024", "1"),
  fig("percent", "hyperscalers-growth-2024", 20, "Growth in those four hyperscalers' electricity use", "Amazon Web Services, Microsoft, Alphabet and Meta", "2024", "1"),
  fig("twh", "scen-higheff-2035", 970, "Data centre electricity use, High Efficiency Case", DC_ALL, "2035", "Energy demand from AI", { source: "iea-2025", note: "Reported as around 970 TWh." }),
  fig("twh", "scen-base-2035", 1200, "Data centre electricity use, Base Case", DC_ALL, "2035", "Executive summary", { source: "iea-2025", note: "Reported as around 1 200 TWh." }),
  fig("twh", "scen-lift-2035", 1700, "Data centre electricity use, Lift-Off Case", DC_ALL, "2035", "Energy demand from AI", { source: "iea-2025", note: "Reported as exceeding 1 700 TWh, about 45% above the Base Case." }),
  fig("mw", "dc100-mw", 100, "Size of the IEA's example data centre", "One data centre", "2025 report", "Executive summary", { source: "iea-2025" }),
  fig("count", "dc100-households", 100000, "Households whose electricity use a data centre of that size can match", "One data centre", "2025 report", "Executive summary", { source: "iea-2025" }),

  // Per task
  fig("wh", "q-google", 0.24, "Median Gemini text prompt, as reported by Google", "One median text prompt", "2025", "Box 2.1"),
  fig("wh", "q-openai", 0.34, "Average ChatGPT query, as reported by OpenAI", "One average query", "2025", "Box 2.1"),
  fig("wh", "q-microsoft", 0.34, "Median for frontier-scale models above 200 billion parameters, a Microsoft Research bottom-up estimate", "One median query", "2025", "Box 2.1"),
  fig("wh", "q-blended", 1, "The IEA's generous blended average per query, allowing for reasoning and multimodal use", "One blended query", "IEA illustration", "Box 2.1"),
  fig("billionPerDay", "q-volume-searches", 10, "Estimated daily internet searches worldwide, used by the IEA as a comparison", "Queries per day", "Mid-2025", "Box 2.1"),
  fig("billionPerDay", "q-volume-chatgpt", 2.5, "ChatGPT's reported daily prompts", "Prompts per day", "Mid-2025", "Box 2.1"),
  fig("twh", "q-annual", 3.6, "Annual electricity for 10 billion queries a day at 1 Wh each (IEA illustration)", "Annual electricity", "IEA illustration", "Box 2.1", { note: "Reported as roughly 3.6 TWh." }),
  fig("percent", "q-annual-share", 1, "Upper bound on that illustration's share of data centre electricity use", DC_ALL, "2025", "Box 2.1", { note: "Reported as less than 1%." }),
  fig("twh", "search-all-twh", 4, "Upper bound if all conventional internet searches were simple AI text queries", "Annual electricity", "Today", "Executive summary", { note: "Reported as less than 4 TWh." }),
  fig("times", "efficiency-order", 10, "Minimum yearly fall in energy per AI task, as a factor", "Energy per AI task", "Recent years", "Executive summary", { note: "Reported as at least an order of magnitude a year." }),
  fig("times", "google-33x", 33, "Fall in energy per Gemini prompt over the 12 months to May 2025, as reported by Google", "Energy per median text prompt", "12 months to May 2025", "Box 2.1"),
  fig("percent", "hw-gains", 30, "Yearly gain in performance per watt of leading AI chips, averaged over the past decade", "Leading AI processors and accelerators", "Past decade", "2.2", { to: 40 }),
  fig("times", "heavy-multiple", 100, "Energy per query for video, reasoning and agentic tasks, relative to simple text generation", "One query", "2026", "Executive summary", { to: 1000, note: "Reported as hundreds or thousands of times more." }),
  fig("times", "image-multiple", 10, "Energy per request for high-resolution image generation, relative to a short text query", "One request", "2026", "2.1", { note: "Reported as about ten times more." }),
  fig("times", "users-growth", 3, "Growth in active users reported by major model providers", "Major model providers", "Past year", "Executive summary", { note: "Reported as a threefold increase." }),
  fig("times", "revenue-growth", 5, "Growth in revenue reported by major model providers", "Major model providers", "Past year", "Executive summary", { note: "Reported as a fivefold increase." }),

  // Where the load lands
  fig("count", "rack-households", 65, "Households whose peak power one advanced server rack could match", "One server rack", "2027", "4", { note: "Reported as around 65 households." }),
  fig("times", "density-growth", 11, "Growth in power density of AI servers, as a multiple", "AI servers", "2020 to 2025", "Executive summary"),
  fig("times", "density-next", 4, "Further expected growth in AI server power density, as a multiple", "AI servers", "By 2027", "Executive summary"),
  fig("times", "ai-factory-capacity", 3, "Growth in AI factory capacity over 18 months, as a multiple", "AI factories worldwide", "Past 18 months", "Executive summary", { note: "Reported as more than tripled." }),
  fig("percent", "swing", 50, "Swings in server load within a second, as a share of rated capacity", AI_DC, "2026", "Executive summary", { note: "Reported as more than 50%." }),
  fig("count", "sites-count", 21, "Large AI-focused data centres in the United States analysed", SITES, "2026", "Box 3.2"),
  fig("count", "sites-near-city", 19, "Of those, sites near a city of at least 100,000 people", SITES, "2026", "Box 3.2"),
  fig("km", "sites-km", 65, "Distance from a city centre used to judge closeness", SITES, "2026", "Box 3.2"),
  fig("gw", "sites-gw", 6, "Cumulative installed capacity of those sites, after tripling in 18 months", SITES, "2026", "Box 3.2", { note: "Reported as exceeding 6 GW." }),
  fig("gw", "sites-size", 0.6, "Nameplate capacity of each of those sites", SITES, "2026", "Box 3.2", { to: 5 }),
  fig("count", "sites-households", 600000, "Households whose electricity use each site equals once complete", SITES, "2026", "Box 3.2", { to: 5000000 }),
  fig("gw", "ercot-2024", 63, "Large-load connection queue, about three-quarters data centres", ERCOT, "December 2024", "1.4, queue box"),
  fig("gw", "ercot-2025", 130, "Large-load connection queue", ERCOT, "April 2025", "1.4, queue box"),
  fig("gw", "ercot-2026", 230, "Large-load connection queue", ERCOT, "January 2026", "1.4, queue box", { note: "Reported as over 230 GW." }),
  fig("gw", "ercot-peak", 85, "All-time peak demand on the Texas grid", ERCOT, "All-time high", "1.4, queue box"),

  // Money and bottlenecks
  fig("usdBillion", "capex-2025", 400, "Capital expenditure of the largest technology companies", BIG_TECH, "2025", "Executive summary", { note: "Reported as exceeding USD 400 billion." }),
  fig("percent", "capex-growth", 75, "Expected rise in that capital expenditure", BIG_TECH, "2026", "Executive summary"),
  fig("usdBillion", "capex-2026", 715, "Announced 2026 capital expenditure of leading hyperscalers and neo-clouds", "Leading hyperscalers and neo-clouds", "2026", "1.1"),
  fig("usdTrillion", "invest-cumulative", 3.9, "Cumulative investment in data centres implied by the IEA's estimates", DC_ALL, "2026 to 2030", "1.1"),
  fig("usdBillion", "debt-2025", 200, "Debt issued by normally cash-rich AI companies", "AI companies", "2025", "1.1", { note: "Reported as around USD 200 billion." }),
  fig("percent", "turbine-orders", 70, "Surge in gas turbine orders", "Global gas turbine orders", "2025", "Executive summary"),
  fig("year", "memory-shortage", 2027, "End of the year to which the high-bandwidth memory shortage is expected to last at least", "High-bandwidth memory for AI chips", "Expected", "Executive summary"),
  fig("years", "lead-transformers", 2, "Average lead time for transformers", "Transformers", "2025", "1.3", { to: 3 }),
  fig("years", "lead-turbines", 5, "Delivery time for gas turbines", "Gas turbines", "2025", "1.3", { note: "Reported as around five years." }),
  fig("years", "lead-grid", 5, "Waiting time for grid connections in many jurisdictions", "Grid connections", "2025", "1.3", { to: 10, note: "Reported as as long as five to ten years." }),
  fig("count", "blocked-projects", 20, "US data centre projects blocked or delayed, per Data Center Watch", "US data centre projects", "Q2 2025", "1.3"),
  fig("usdBillion", "blocked-value", 98, "Estimated investment in those blocked or delayed projects", "US data centre projects", "Q2 2025", "1.3"),

  // Powering data centres
  fig("twh", "ppa-2025", 40, "Renewable power purchase agreements signed by data centre operators", "Data centre operators", "2025", "5.1", { note: "Reported as more than 40 TWh." }),
  fig("percent", "tech-ppa-share", 40, "Tech sector's share of corporate renewable PPAs signed worldwide", "Corporate renewable PPAs", "2025", "Executive summary", { note: "Reported as around 40%." }),
  fig("percent", "renew-half", 50, "Share of the growth in data centre demand met by renewables", "Growth in data centre demand to 2030", "To 2030", "Executive summary", { source: "iea-2025", note: "Reported as half." }),
  fig("twh", "gas-growth", 175, "Expansion of natural gas generation to meet data centre demand", "Natural gas generation", "To 2030", "Executive summary", { source: "iea-2025" }),
  fig("gw", "smr-2024", 25, "Data centre offtake agreements with small modular reactors", "Announced SMR capacity for data centres", "End 2024", "Executive summary"),
  fig("gw", "smr-2025", 45, "Data centre offtake agreements with small modular reactors", "Announced SMR capacity for data centres", "End 2025", "Executive summary"),
  fig("year", "smr-first", 2030, "Year the first of those SMR projects is expected online", "SMR projects", "Expected", "Executive summary", { note: "Reported as around 2030." }),
  fig("gw", "onsite-gas", 15, "Onsite natural gas that may power data centres, mostly in the United States", "Onsite gas power", "2030", "Executive summary", { to: 27 }),
  fig("percent", "onsite-overbuild", 30, "Extra onsite gas generation needed relative to demand for reliable supply", "Onsite gas power", "2026", "Executive summary", { to: 70 }),
  fig("gw", "battery", 20, "Battery storage that could be installed in data centres worldwide", "Data centre battery storage", "2030", "Executive summary", { to: 25 }),
  fig("mt", "emissions-2035", 350, "Projected emissions associated with data centres", "Data centres worldwide", "2035", "Executive summary", { note: "Reported as around 350 million tonnes." }),
  fig("percent", "emissions-share", 2, "Data centres' share of global electricity-sector emissions", "Global electricity-sector emissions", "2035", "Executive summary", { note: "Reported as about 2%." }),

  // The other side of the ledger
  fig("ej", "savings-ej", 13, "Energy savings from well-documented AI use cases, if barriers are overcome", "Global final energy", "2035", "Executive summary", { note: "Reported as over 13 EJ." }),
  fig("percent", "savings-share", 3, "Those savings as a share of global final energy consumption", "Global final energy consumption", "2035", "Executive summary"),
  fig("points", "cost-cut", 3, "Possible fall in energy costs from AI-enabled optimisation", "Energy-intensive industries", "Potential", "Executive summary", { to: 10 }),
  fig("percent", "gdp-energy", 1, "Rise in global energy demand from an AI-driven growth boost", "Global energy demand", "2035", "Executive summary", { to: 4 }),
  fig("percent", "open-data", 10, "Share of global electricity consumption covered by open electricity data policies", "Global electricity consumption", "2026", "Executive summary"),
];

export const SERIES_DEFINITIONS: readonly SeriesDefinition[] = [
  {
    id: "dc-electricity",
    label: "Electricity used by data centres worldwide",
    caution: "2030 is the IEA's Base Case projection, not a measurement.",
    showSteps: true,
    points: [
      { label: "2024", figureId: "dc-2024" },
      { label: "2025", figureId: "dc-2025" },
      { label: "2030 (projection)", figureId: "dc-2030" },
    ],
  },
  {
    id: "scenarios-2035",
    label: "Data centre electricity use in 2035, by IEA case (2025 report)",
    caution: "Scenarios, not forecasts. The IEA says uncertainty widens after 2030.",
    showSteps: false,
    points: [
      { label: "High Efficiency Case", figureId: "scen-higheff-2035" },
      { label: "Base Case", figureId: "scen-base-2035" },
      { label: "Lift-Off Case (exceeds)", figureId: "scen-lift-2035" },
    ],
  },
  {
    id: "ercot-queue",
    label: "Large-load connection queue in Texas (ERCOT)",
    caution: "A queue is requests, not demand. The IEA says only a limited share of such pipelines may be realised.",
    showSteps: true,
    points: [
      { label: "Dec 2024", figureId: "ercot-2024" },
      { label: "Apr 2025", figureId: "ercot-2025" },
      { label: "Jan 2026 (over)", figureId: "ercot-2026" },
      { label: "All-time peak demand", figureId: "ercot-peak", isReference: true },
    ],
  },
  {
    id: "smr-offtake",
    label: "Data centre offtake agreements with small modular reactors",
    caution: "Agreements, not power: the first projects are not expected online until around 2030.",
    showSteps: true,
    points: [
      { label: "End 2024", figureId: "smr-2024" },
      { label: "End 2025", figureId: "smr-2025" },
    ],
  },
];

export const CALCULATOR_PRESETS: readonly CalculatorPreset[] = [
  { id: "google", label: "Google's median text prompt", figureId: "q-google" },
  { id: "openai", label: "OpenAI's average query", figureId: "q-openai" },
  { id: "blended", label: "The IEA's blended average", figureId: "q-blended" },
];

export const CALCULATOR_VOLUMES: readonly CalculatorVolume[] = [
  { id: "chatgpt", label: "ChatGPT's reported daily prompts", figureId: "q-volume-chatgpt", multiplier: 1 },
  { id: "searches", label: "All daily web searches", figureId: "q-volume-searches", multiplier: 1 },
  { id: "five-times", label: "Five times all daily searches (our scenario)", figureId: "q-volume-searches", multiplier: 5 },
];

/** Shares of queries treated as heavy, as fractions. */
export const HEAVY_SHARE_OPTIONS: readonly number[] = [0, 0.01, 0.05, 0.1, 0.25];

export const DEFAULT_PRESET_ID = "blended";
export const DEFAULT_VOLUME_ID = "searches";
export const DEFAULT_HEAVY_SHARE = 0;

export { IEA_2025_DEMAND_URL };