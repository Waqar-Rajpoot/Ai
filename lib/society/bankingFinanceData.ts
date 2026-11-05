export type FigureUnit = "percent" | "score" | "count";

/** One number from the survey, with the base it is a share of and where it sits in the report. */
export interface SurveyFigure {
  id: string;
  value: number;
  unit: FigureUnit;
  measure: string;
  base: string;
  period: string;
  reportSection: string;
  /** A known wrinkle in the original, such as report text and a chart description differing by a point. */
  note?: string;
}

export interface DomainUse {
  id: string;
  label: string;
  currentPercent: number;
  withPlannedPercent: number;
}

export interface AgentTypeUse {
  id: string;
  label: string;
  currentPercent: number;
  withPlannedPercent: number;
}

export interface AutonomyLevel {
  id: string;
  label: string;
  description: string;
}

export interface AutonomyRow {
  id: string;
  label: string;
  /** Percent of respondents, in the same order as AUTONOMY_LEVELS. */
  values: readonly [number, number, number, number];
}

export interface SectorRespondents {
  id: string;
  label: string;
  count: number;
  /** Null where the report text does not give the sector's adoption figure. */
  adoptionPercent: number | null;
}

export interface OutlookRow {
  id: string;
  label: string;
  scaleNote: string;
  unit: FigureUnit;
  today: number;
  future: number;
}

export interface ComparisonDefinition {
  id: string;
  label: string;
  caution?: string;
  points: readonly { year: string; figureId: string }[];
}

/** A common headline claim, decoded into what it measures and what it does not. */
export interface HeadlineEntry {
  id: string;
  headline: string;
  figureIds: readonly string[];
  measures: string;
  notClaim: string;
  technical: string;
}

const CURRENT_YEAR = "2026";
const PREVIOUS_YEAR = "2024";
const FIRST_YEAR = "2022";
const TODAY_LABEL = "Today";
const FUTURE_LABEL = "Next one to three years";

const BASE_ALL = "All 196 responding firms (full and short form)";
const BASE_FULL = "Full-survey respondents";
const BASE_SMALL = "Short-form respondents (firms with fewer than 100 employees)";
const BASE_SYSTEMS_ALL = "All AI systems reported (full and short form)";
const BASE_SYSTEMS_FULL = "All AI systems reported by full-survey respondents";
const BASE_HIGH_MATERIALITY = "High-materiality AI systems reported";
const BASE_DOMAIN = "100 firms answering at least one question on this topic";
const BASE_AGENT_TYPES = "101 responding firms";
const BASE_CLOUD = "Reported cloud and compute relationships";
const BASE_MODEL = "Reported model API and hosting relationships";
const BASE_SECTOR = "Responding firms in that sector";

interface FigureOptions {
  period?: string;
  note?: string;
}

type FigureArgs = [
  id: string,
  value: number,
  measure: string,
  base: string,
  reportSection: string,
  options?: FigureOptions,
];

function makeFigure(
  unit: FigureUnit,
  id: string,
  value: number,
  measure: string,
  base: string,
  reportSection: string,
  options: FigureOptions = {},
): SurveyFigure {
  return { id, value, unit, measure, base, reportSection, period: options.period ?? CURRENT_YEAR, note: options.note };
}

const percentFigure = (...args: FigureArgs): SurveyFigure => makeFigure("percent", ...args);
const countFigure = (...args: FigureArgs): SurveyFigure => makeFigure("count", ...args);

export const DOMAIN_USE: readonly DomainUse[] = [
  { id: "enterprise-productivity", label: "Enterprise productivity (coding assistants, summaries)", currentPercent: 86, withPlannedPercent: 91 },
  { id: "technology-security", label: "Technology and security", currentPercent: 70, withPlannedPercent: 80 },
  { id: "compliance-regulatory", label: "Compliance and regulatory", currentPercent: 59, withPlannedPercent: 79 },
  { id: "customer-communications", label: "Customer and participant interaction and communications", currentPercent: 59, withPlannedPercent: 71 },
  { id: "operations-processing", label: "Operations and processing", currentPercent: 52, withPlannedPercent: 71 },
  { id: "financial-crime", label: "Financial crime, fraud and identity", currentPercent: 43, withPlannedPercent: 59 },
  { id: "markets-trading", label: "Markets and trading", currentPercent: 41, withPlannedPercent: 47 },
  { id: "customer-decisioning", label: "Customer decisioning", currentPercent: 28, withPlannedPercent: 38 },
  { id: "liquidity-treasury", label: "Liquidity and treasury decisioning", currentPercent: 10, withPlannedPercent: 17 },
  { id: "algorithmic-execution", label: "Algorithmic execution, market making or hedging automation", currentPercent: 14, withPlannedPercent: 16 },
];

export const AGENT_TYPES: readonly AgentTypeUse[] = [
  { id: "enterprise", label: "Enterprise agents", currentPercent: 61.4, withPlannedPercent: 79.2 },
  { id: "coding", label: "Coding agents", currentPercent: 51.5, withPlannedPercent: 72.3 },
  { id: "multi-agent", label: "Multi-agent systems", currentPercent: 22.8, withPlannedPercent: 39.6 },
  { id: "client-facing", label: "Client-facing agents", currentPercent: 15.8, withPlannedPercent: 27.7 },
];

export const AUTONOMY_LEVELS: readonly AutonomyLevel[] = [
  { id: "decision-support", label: "Decision support", description: "Agents recommend, people decide and act." },
  { id: "constrained-execution", label: "Constrained execution", description: "Agents act within set limits and rules." },
  { id: "conditional-autonomy", label: "Conditional autonomy", description: "Agents act alone but need human approval for some actions." },
  { id: "broad-autonomy", label: "Broad autonomy", description: "Agents start and carry out actions with little real-time human involvement." },
];

/** Selected rows of the report's Table B. "all" is the report's total row. */
export const AUTONOMY_ROWS: readonly AutonomyRow[] = [
  { id: "all", label: "All respondents", values: [80, 46, 22, 2] },
  { id: "operations-it", label: "Operations and IT", values: [53, 34, 14, 1] },
  { id: "risk-compliance", label: "Risk and compliance", values: [30, 10, 3, 1] },
  { id: "sales-marketing", label: "Sales and marketing", values: [22, 9, 5, 0] },
  { id: "retail-banking", label: "Retail banking", values: [8, 3, 1, 1] },
  { id: "payments", label: "Payments", values: [7, 5, 2, 0] },
  { id: "trade-execution", label: "Trade and execution", values: [7, 5, 1, 0] },
];

export const SECTORS: readonly SectorRespondents[] = [
  { id: "investment", label: "Investment and capital markets", count: 100, adoptionPercent: null },
  { id: "fmi-payments", label: "Financial market infrastructure, payments and other", count: 26, adoptionPercent: null },
  { id: "uk-banks", label: "UK banks", count: 23, adoptionPercent: 100 },
  { id: "international-banks", label: "International banks and broker/dealers", count: 21, adoptionPercent: 100 },
  { id: "insurance", label: "Insurance", count: 15, adoptionPercent: 93 },
  { id: "non-bank-lending", label: "Non-bank lending", count: 11, adoptionPercent: null },
];

export const OUTLOOK_ROWS: readonly OutlookRow[] = [
  { id: "benefit-efficiency", label: "Benefit: operational efficiency, automation and productivity", scaleNote: "Score 1 (none) to 5 (transformational)", unit: "score", today: 2.95, future: 4.34 },
  { id: "benefit-revenue", label: "Benefit: revenue generation and competitive positioning", scaleNote: "Score 1 (none) to 5 (transformational)", unit: "score", today: 1.87, future: 3.34 },
  { id: "risk-data", label: "Risk: data protection and security", scaleNote: "Score 1 (no risk) to 5 (severe)", unit: "score", today: 3.28, future: 3.65 },
  { id: "risk-conduct", label: "Risk: consumer and market conduct", scaleNote: "Score 1 (no risk) to 5 (severe)", unit: "score", today: 2.16, future: 2.7 },
  { id: "risk-average", label: "Risk: average of all eight firm-level risks", scaleNote: "Score 1 (no risk) to 5 (severe)", unit: "score", today: 2.79, future: 3.28 },
  { id: "systemic-cyber", label: "Systemic risk: cyber risk amplification", scaleNote: "Share of firms rating concern high or severe", unit: "percent", today: 57, future: 80 },
  { id: "systemic-third-party", label: "Systemic risk: critical third-party dependencies", scaleNote: "Share of firms rating concern high or severe", unit: "percent", today: 40, future: 63 },
];

const OPINION_CAUTION =
  "The 2026 and 2024 figures do not come from the same population of firms, so the report says to compare them with caution.";

export const COMPARISON_DEFINITIONS: readonly ComparisonDefinition[] = [
  {
    id: "adoption",
    label: "Responding firms that use AI",
    caution: OPINION_CAUTION,
    points: [
      { year: FIRST_YEAR, figureId: "adoption-2022" },
      { year: PREVIOUS_YEAR, figureId: "adoption-2024" },
      { year: CURRENT_YEAR, figureId: "adoption-2026" },
    ],
  },
  {
    id: "operations-it-share",
    label: "Operations and IT share of all reported AI systems",
    points: [
      { year: PREVIOUS_YEAR, figureId: "opsit-share-2024" },
      { year: CURRENT_YEAR, figureId: "opsit-share-2026" },
    ],
  },
  {
    id: "high-materiality-share",
    label: "Share of reported AI systems rated high materiality",
    points: [
      { year: PREVIOUS_YEAR, figureId: "highmat-share-2024" },
      { year: CURRENT_YEAR, figureId: "highmat-share-2026" },
    ],
  },
  {
    id: "third-party-systems",
    label: "Share of reported AI systems supplied by third parties",
    points: [
      { year: FIRST_YEAR, figureId: "tp-systems-2022" },
      { year: PREVIOUS_YEAR, figureId: "tp-systems-2024" },
      { year: CURRENT_YEAR, figureId: "tp-systems-2026" },
    ],
  },
  {
    id: "third-party-high-materiality",
    label: "Share of high-materiality AI systems supplied by third parties",
    points: [
      { year: PREVIOUS_YEAR, figureId: "tp-highmat-2024" },
      { year: CURRENT_YEAR, figureId: "tp-highmat-2026" },
    ],
  },
  {
    id: "cloud-concentration",
    label: "Share of cloud and compute relationships held by the top three providers",
    points: [
      { year: PREVIOUS_YEAR, figureId: "cloud-top3-2024" },
      { year: CURRENT_YEAR, figureId: "cloud-top3-2026" },
    ],
  },
];

const SINGLE_FIGURES: readonly SurveyFigure[] = [
  // Respondents (1.2, Chart 1)
  countFigure("respondents-total", 196, "Firms that responded", BASE_ALL, "1.2"),
  countFigure("respondents-large", 101, "Larger firms that responded", BASE_ALL, "1.2"),
  countFigure("respondents-small", 95, "Smaller firms that responded", BASE_ALL, "1.2"),
  countFigure("respondents-full", 105, "Respondents that completed the full survey", BASE_ALL, "1.2"),
  countFigure("sector-investment-small", 72, "Small firms among investment and capital-markets responders", "Investment and capital-markets responders", "Chart 1"),
  countFigure("relationships-cloud", 169, "Distinct cloud and compute relationships reported", BASE_FULL, "4.2"),
  countFigure("relationships-model", 226, "Distinct model API and hosting relationships reported", BASE_FULL, "4.2"),

  // Adoption (2.1)
  percentFigure("adoption-2022", 58, "Firms using AI", "Respondent firms in the 2022 survey", "2.1", { period: FIRST_YEAR }),
  percentFigure("adoption-2024", 75, "Firms using AI", "Respondent firms in the 2024 survey", "2.1", { period: PREVIOUS_YEAR }),
  percentFigure("adoption-2026", 86, "Firms using AI", BASE_ALL, "2.1"),
  percentFigure("adoption-small-firms", 73, "Smaller firms using AI", BASE_SMALL, "10"),
  percentFigure("small-firms-llm", 58, "Smaller firms using AI that mainly use general-purpose large language models", "Short-form respondents that use AI", "10"),
  percentFigure("production-at-least-one", 94, "Firms with at least one AI system in production", BASE_FULL, "2.1"),
  percentFigure("systems-top-ten-share", 43, "Share of all reported AI systems held by the ten firms reporting the most", BASE_SYSTEMS_ALL, "2.1"),

  // Technology mix and business areas (2.2, 2.3, 2.5)
  percentFigure("genai-share", 56, "Generative AI share of all reported AI systems", BASE_SYSTEMS_ALL, "2.3", { note: "Chart 4 shows 56.5%." }),
  percentFigure("genai-top-ten-share", 44, "Share of generative AI systems held by ten firms", "All reported generative AI systems", "2.3"),
  percentFigure("foundation-share-2024", 17, "Foundation models' share of reported AI use cases", "Reported AI use cases in the 2024 survey", "2.3", { period: PREVIOUS_YEAR, note: "The report says this is not directly comparable with the 2026 generative AI share." }),
  percentFigure("opsit-share-2026", 31, "Operations and IT share of all reported AI systems", BASE_SYSTEMS_ALL, "2.2", { note: "Reported as approximately 31%." }),
  percentFigure("opsit-share-2024", 22, "Operations and IT share of all reported AI systems", "All AI systems reported in the 2024 survey", "2.2", { period: PREVIOUS_YEAR, note: "Reported as around 22%." }),
  percentFigure("area-other-max", 11, "Upper bound on the share held by any other single business area", BASE_SYSTEMS_ALL, "2.2", { note: "The report says no other area exceeded this share." }),
  percentFigure("highmat-share-2026", 7, "Share of reported AI systems assessed as high materiality", BASE_SYSTEMS_FULL, "2.5"),
  percentFigure("highmat-share-2024", 16, "Share of reported AI systems assessed as high materiality", "All AI systems reported in the 2024 survey", "2.5", { period: PREVIOUS_YEAR }),
  percentFigure("highmat-top-ten-share", 62, "Share of high-materiality systems held by ten firms", BASE_HIGH_MATERIALITY, "2.5"),

  // Agents (3.1, 3.2)
  percentFigure("agents-deployed", 80, "Firms with AI agents currently deployed", BASE_FULL, "3.1"),
  percentFigure("agents-planned", 14, "Firms planning to deploy AI agents in the next 12 months", BASE_FULL, "3.1"),
  percentFigure("agent-customer-comms-now", 16, "Firms using agents for automated customer communications now", BASE_FULL, "3.2"),
  percentFigure("agent-customer-comms-planned", 34, "Same, including planned deployment in the next 12 months", BASE_FULL, "3.2"),
  percentFigure("agent-records-now", 8, "Firms using agents to create or modify records in core systems now", BASE_FULL, "3.2"),
  percentFigure("agent-records-planned", 25, "Same, including planned deployment in the next 12 months", BASE_FULL, "3.2"),
  percentFigure("agent-sensitive-max", 9, "Upper bound: firms expecting agents to approve or decline customer outcomes, trade, handle payments or change limits, including plans", BASE_FULL, "3.2", { note: "The report says no more than this share for each action." }),

  // Third parties (4.1 to 4.4, 7.3, 7.5)
  percentFigure("tp-systems-2022", 17, "Third-party share of reported AI systems", "All AI systems reported in the 2022 survey", "4.1", { period: FIRST_YEAR }),
  percentFigure("tp-systems-2024", 33, "Third-party share of reported AI systems", "All AI systems reported in the 2024 survey", "4.1", { period: PREVIOUS_YEAR }),
  percentFigure("tp-systems-2026", 39, "Third-party share of reported AI systems", BASE_SYSTEMS_FULL, "4.1"),
  percentFigure("tp-highmat-2024", 35, "Third-party share of high-materiality AI systems", "High-materiality systems in the 2024 survey", "4.1", { period: PREVIOUS_YEAR }),
  percentFigure("tp-highmat-2026", 53, "Third-party share of high-materiality AI systems", BASE_HIGH_MATERIALITY, "4.1"),
  percentFigure("cloud-top3-2024", 72, "Share of cloud and compute relationships held by the top three providers", "Reported cloud and compute relationships, 2024 survey", "Chart 9", { period: PREVIOUS_YEAR, note: "Read from the chart description, not the report text." }),
  percentFigure("cloud-top3-2026", 79, "Share of cloud and compute relationships held by the top three providers", BASE_CLOUD, "4.2"),
  percentFigure("cloud-top3-respondents", 98, "Respondents using at least one of the three largest cloud or compute providers", BASE_FULL, "4.2"),
  percentFigure("model-top3-2026", 54, "Share of model API and hosting relationships held by the top three providers", BASE_MODEL, "4.2", { note: "Report text says 54%; the Chart 9 description says 55%." }),
  percentFigure("cloud-critical-hard", 37, "Cloud and compute relationships judged both highly critical and hard to substitute", "Reported cloud and compute relationships (169)", "4.2"),
  percentFigure("cloud-exit-tested", 35, "Of those, the share with a tested exit plan", "Cloud and compute relationships judged highly critical and hard to substitute", "4.2", { note: "Report text says 35%; the Chart 10 description says 36%." }),
  percentFigure("model-critical-hard", 14, "Model API and hosting relationships judged both highly critical and hard to substitute", "Reported model API and hosting relationships (226)", "4.2"),
  percentFigure("tp-extra-ai-risk", 77, "Firms adding AI-specific risk identification and management for third-party AI", BASE_FULL, "4.3"),
  percentFigure("tp-extra-resilience", 27, "Firms adding enhanced resilience steps, such as joint incident testing or exit planning, for third-party AI", BASE_FULL, "4.3"),
  percentFigure("tp-constraint-infosec", 40, "Firms naming information security and operational resilience a major constraint on third-party AI", BASE_FULL, "4.4"),
  percentFigure("tp-constraint-transparency", 34, "Firms naming limited transparency into third-party AI a major constraint", BASE_FULL, "4.4"),
  percentFigure("understanding-internal-deep", 77, "Firms relying on deep knowledge of high-materiality systems built in-house", BASE_FULL, "7.3"),
  percentFigure("understanding-tp-deep", 24, "Firms relying on deep knowledge of high-materiality third-party systems", BASE_FULL, "7.3"),
  percentFigure("understanding-tp-vendor", 81, "Firms relying on vendor assurance and contracts for high-materiality third-party systems", BASE_FULL, "7.3"),
  percentFigure("gov-tp-mrm", 54, "Firms naming model-risk management of vendor models as a challenge", BASE_FULL, "7.5"),

  // Governance and controls (5.2, 7.2, 7.4)
  percentFigure("gov-policies", 94, "Firms with firm-wide AI policies, principles or standards", BASE_FULL, "7.2"),
  percentFigure("gov-forum", 84, "Firms with a centralised AI or model-risk governance forum", BASE_FULL, "7.2"),
  percentFigure("gov-incident-playbooks", 49, "Firms with incident-management and response playbooks for AI", BASE_FULL, "7.2"),
  percentFigure("control-pre-human", 95, "Firms reporting human review or approval for higher-risk AI uses", BASE_FULL, "7.4"),
  percentFigure("control-periodic-review", 51, "Firms reporting periodic review or recertification of AI systems", BASE_FULL, "7.4"),
  percentFigure("metric-customer-impact", 39, "Firms routinely monitoring customer-impact metrics for AI systems", BASE_FULL, "7.4"),
  percentFigure("mitigation-data", 91, "Firms with mitigations in place for data protection and security risk", BASE_FULL, "5.2"),
  percentFigure("mitigation-model", 69, "Firms with mitigations in place for model behaviour and reliability risk", BASE_FULL, "5.2"),

  // Constraints (6.1, 6.2) and frontier AI (8)
  percentFigure("constraint-data-protection", 42, "Firms seeing UK data protection and privacy rules as a high compliance burden", BASE_FULL, "6.1"),
  percentFigure("constraint-international", 29, "Firms seeing international regulation as a high compliance burden", BASE_FULL, "6.1"),
  percentFigure("constraint-none", 28, "Firms reporting no regulatory constraints", BASE_FULL, "6.1"),
  percentFigure("constraint-integration", 23, "Firms naming integration into existing processes a large constraint", BASE_FULL, "6.2"),
  percentFigure("constraint-legacy", 22, "Firms naming legacy systems or infrastructure a large constraint", BASE_FULL, "6.2"),
  percentFigure("frontier-impact", 88, "Firms expecting frontier AI cyber capabilities to have a moderate or high impact on their risk profile within two years", BASE_FULL, "8"),
  percentFigure("frontier-patching", 64, "Firms naming vulnerability management and patching as the area with the biggest rise in management attention", "Firms answering that question", "8"),
];

function buildDomainFigures(): SurveyFigure[] {
  return DOMAIN_USE.flatMap((domain) => [
    percentFigure(`domain-${domain.id}-current`, domain.currentPercent, `Firms currently using AI for: ${domain.label}`, BASE_DOMAIN, "2.4, Chart 5"),
    percentFigure(`domain-${domain.id}-planned`, domain.withPlannedPercent, `Firms using or planning to use AI for: ${domain.label}`, BASE_DOMAIN, "2.4, Chart 5"),
  ]);
}

function buildAgentTypeFigures(): SurveyFigure[] {
  return AGENT_TYPES.flatMap((type) => [
    percentFigure(`agent-type-${type.id}-current`, type.currentPercent, `Firms currently deploying: ${type.label}`, BASE_AGENT_TYPES, "3.1, Chart 7"),
    percentFigure(`agent-type-${type.id}-planned`, type.withPlannedPercent, `Firms deploying or planning to deploy: ${type.label}`, BASE_AGENT_TYPES, "3.1, Chart 7"),
  ]);
}

function buildAutonomyFigures(): SurveyFigure[] {
  return AUTONOMY_ROWS.flatMap((row) =>
    AUTONOMY_LEVELS.map((level, index) =>
      percentFigure(
        `autonomy-${row.id}-${level.id}`,
        row.values[index],
        `Firms with agents deployed at the "${level.label}" level: ${row.label}`,
        BASE_FULL,
        "3.2, Table B",
      ),
    ),
  );
}

function buildSectorFigures(): SurveyFigure[] {
  return SECTORS.flatMap((sector) => {
    const countRow = countFigure(`sector-${sector.id}-count`, sector.count, `Responding firms: ${sector.label}`, BASE_ALL, "Chart 1");
    if (sector.adoptionPercent === null) return [countRow];
    return [
      countRow,
      percentFigure(`sector-${sector.id}-adoption`, sector.adoptionPercent, `Firms using AI: ${sector.label}`, BASE_SECTOR, "2.1"),
    ];
  });
}

function buildOutlookFigures(): SurveyFigure[] {
  return OUTLOOK_ROWS.flatMap((row) => [
    makeFigure(row.unit, `outlook-${row.id}-today`, row.today, row.label, `${row.scaleNote}; full-survey respondents`, "5.1 to 5.3", { period: TODAY_LABEL }),
    makeFigure(row.unit, `outlook-${row.id}-future`, row.future, row.label, `${row.scaleNote}; full-survey respondents`, "5.1 to 5.3", { period: FUTURE_LABEL }),
  ]);
}

/** Every survey number the page shows. The ledger and all displayed figures read from this list. */
export const SURVEY_FIGURES: readonly SurveyFigure[] = [
  ...SINGLE_FIGURES,
  ...buildDomainFigures(),
  ...buildAgentTypeFigures(),
  ...buildAutonomyFigures(),
  ...buildSectorFigures(),
  ...buildOutlookFigures(),
];