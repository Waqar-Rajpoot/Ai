import type { VerificationLevel } from "@/lib/prices/apiCostTable";

export interface LeadText {
  lead: string;
  text: string;
}

export interface MeasureRow {
  measure: string;
  who: string;
  value: string;
  period: string;
  source: string;
  verification: VerificationLevel;
  whyDifferent: string;
}

export interface JobsFigure {
  label: string;
  value: string;
}

export interface Signal {
  title: string;
  why: string;
  whereToLook: string;
}

export interface ReaderAction {
  audience: string;
  actions: readonly string[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SourceLink {
  publisher: string;
  title: string;
  href: string;
  kind: "Agency or provider page" | "Secondary: confirm before relying";
}

export const SHORT_ANSWER: readonly LeadText[] = [
  { lead: "AI is moving fastest where the work is text, numbers and screens.", text: "About 70% of information workers, 63% of finance workers and 62% of professional-services workers used generative AI for their job in Nov 2025. In accommodation and food it was about 21%." },
  { lead: "Most companies have not formally adopted it.", text: "19.8% of US firms used AI in the past two weeks (Census, wave ending May 3, 2026). That figure has stayed between 17% and 20% since December." },
  { lead: "Size matters almost as much as industry.", text: "37% of firms with 250 or more employees use AI. Among firms with four or fewer, it is under 20%." },
  { lead: "The sharpest jobs signal is about hiring the young, not mass layoffs.", text: "One payroll study links a fall in employment for 22 to 25 year olds in the most AI-exposed jobs to reduced hiring. The authors say it cannot prove AI caused it." },
];

export const MEASURE_ROWS: readonly MeasureRow[] = [
  { measure: "Firms using AI in any business function, past two weeks", who: "US businesses", value: "19.8%", period: "Wave ending May 3, 2026", source: "Census Bureau BTOS", verification: "provider", whyDifferent: "Counts companies, not people. A firm counts as a user only if the business reports use." },
  { measure: "Workers using generative AI for their job", who: "US labour force", value: "About 41%", period: "Nov 2025", source: "Federal Reserve note, Real-Time Population Survey", verification: "provider", whyDifferent: "Counts individuals, including people using AI without a company programme." },
  { measure: "Adults 18 to 64 using generative AI at work", who: "US adults 18 to 64", value: "45.2%", period: "Q2 2026", source: "Fed-hosted adoption tracker", verification: "secondary", whyDifferent: "A later period, and adults only. Confirm on the tracker page." },
  { measure: "Adults 18 to 64 using generative AI at all", who: "US adults 18 to 64", value: "61.8%", period: "Q2 2026", source: "Fed-hosted adoption tracker", verification: "secondary", whyDifferent: "Includes use outside work. Confirm on the tracker page." },
];

export const JOBS_FIGURES: readonly JobsFigure[] = [
  { label: "Ages 22 to 25 in the most AI-susceptible 40% of occupations", value: "Employment fell about 11%" },
  { label: "Ages 22 to 25 in the other 60% of occupations", value: "Employment rose about 10%" },
  { label: "Gap versus the comparison trend", value: "About 19% below expected" },
  { label: "Ages 35 to 49 in the most susceptible 40%", value: "Employment rose about 10%" },
];

export const JOBS_CAVEATS: readonly string[] = [
  "The authors say the results are consistent with AI causing the decline, but cannot prove it.",
  "Pre-ChatGPT differences already existed between exposed and less-exposed jobs, and the gap narrowed when graduate share was controlled.",
  "The payroll data over-represents large firms and AI-exposed occupations. National statistics show similar trends but smaller.",
  "The first edition (Aug 2025) reported a 13% relative decline using a different method, so the two numbers are not directly comparable.",
];

export const JOBS_MECHANISM =
  "The researchers attribute the fall mainly to reduced hiring, not more layoffs or resignations. They link it to knowledge that can be learned from schools and manuals being easier for AI to replace than knowledge gained through practice.";

export const EVIDENCE_RULES: readonly LeadText[] = [
  { lead: "Named survey.", text: "A numbered claim needs a named survey or official tracker, a date and a definition. The card shows all three." },
  { lead: "Directional.", text: "No named survey checked yet. The card describes direction only and gives no numbers." },
  { lead: "Agency page or secondary.", text: "Every figure says whether we read it on the agency's own page or through a tracker. Secondary figures are marked and are to be replaced." },
  { lead: "Stage is our reading.", text: "Changing now, next and later is a judgement drawn from the highest and lowest use in the data. It is not a forecast." },
];

export const WHY_NOT_USED: readonly LeadText[] = [
  { lead: "Headlines with no definition.", text: "One tracker reports about 78% of firms on an employment-weighted measure, against 19.8% on Census. Both can be true, because they count differently. We use the number with a stated question." },
  { lead: "Composite scores.", text: "Some sites rank industries on their own indexes that blend growth with use. A high rank can mean fast growth from a low start, so we do not copy rankings." },
  { lead: "Different questions across years.", text: "Census revised its AI question in Nov 2025 from use 'in producing goods or services' to use 'in any business function'. Numbers before and after are not like for like." },
  { lead: "Single-source growth rates.", text: "Reported manufacturing growth figures disagree between sources, so we leave them out rather than pick one." },
];

export const SIGNALS: readonly Signal[] = [
  { title: "Does the national firm figure leave its 17% to 20% band?", why: "It has been flat since December even as 20% to 23% said they expected to use AI.", whereToLook: "Census Bureau BTOS" },
  { title: "Do expected users become actual users?", why: "Finance and information firms forecast a rise of a few points. If it does not appear, forecasts are running ahead of practice.", whereToLook: "Census Bureau BTOS" },
  { title: "Do small firms move?", why: "Use among firms with fewer than 20 employees did not change significantly this year, while larger firms rose.", whereToLook: "Census Bureau BTOS by firm size" },
  { title: "Does the young-worker effect spread to older groups?", why: "Employment for ages 35 to 49 in the same exposed jobs rose about 10%. A reversal would be a stronger signal.", whereToLook: "Stanford Digital Economy Lab payroll study updates" },
  { title: "Does healthcare use turn into validated, safe use?", why: "Physicians cite privacy (86%) and safety and efficacy validation (88%) as critical to wider adoption.", whereToLook: "AMA physician AI survey" },
  { title: "Do rules arrive for education and healthcare?", why: "Some uses in both are treated as high-risk under the EU AI Act. Dates are being checked against the official text.", whereToLook: "Our EU AI Act explainer in News" },
];

export const READER_ACTIONS: readonly ReaderAction[] = [
  { audience: "If you are an employee", actions: ["Learn which of your tasks are text, data or screen work. Those change first.", "Check AI output before you rely on it. Our fact-checking guide shows how.", "Ask your employer what AI use is allowed with company data before pasting anything in."] },
  { audience: "If you are early in your career", actions: ["Build the knowledge that comes from practice: judgement, client contact and context. The study links that to lower replacement risk.", "Use AI to learn faster, not to skip the practice that builds judgement.", "Expect fewer routine entry tasks in exposed jobs and ask for the work that carries responsibility."] },
  { audience: "If you run a small business", actions: ["You are in good company if you have not started: firms with four or fewer employees mostly have not.", "Pick one repeated task and test it before buying anything.", "Read the privacy matrix before putting customer data into any tool."] },
  { audience: "If you manage people", actions: ["Ask which tasks change, not which jobs vanish. Layoff plans after AI are a minority in the ISM figures (5% of manufacturers, 9% of services firms).", "Watch hiring, not just headcount. The measured effect is on who gets hired.", "Set a clear rule on data and checking before use spreads on its own."] },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Which industry uses AI the most?", answer: "In the named surveys we checked, information (39.7% of firms, about 70% of workers), then finance and insurance (33.9% of firms, about 63% of workers) and professional services (about 62% of workers)." },
  { question: "Which industry uses it the least?", answer: "Accommodation and food services in the Fed's worker data (about 21%). In firm data, retail is about 14%, below the 19.8% national figure." },
  { question: "Why does one industry have several different numbers?", answer: "Firms and workers are counted separately, and surveys use different questions and dates. Information is 39.7% of firms but about 70% of workers." },
  { question: "Is AI taking jobs in these industries?", answer: "The best-documented effect we found is reduced hiring of 22 to 25 year olds in the most exposed occupations. Layoff plans after AI are a minority in the ISM figures. Neither shows AI caused wider job losses." },
  { question: "Why do some cards have no numbers?", answer: "Because we only publish a figure when a named survey supports it. Directional cards say so and are due a primary source." },
  { question: "How often is this page updated?", answer: "The data is reviewed at least every 30 days, and sooner when Census, the Fed or another named source publishes a new wave." },
  { question: "Does this cover countries outside the US?", answer: "Not yet. All figures here are US data. Rules such as the EU AI Act are covered separately." },
];

export const CAVEATS: readonly string[] = [
  "All numbers describe the US only.",
  "Surveys measure use, not benefit, quality or safety.",
  "Rows marked secondary were read through a tracker and are due to be replaced with the original page.",
  "Stage labels are our judgement and can change when new data arrives.",
];

export const AGENCY_SOURCES: readonly SourceLink[] = [
  { publisher: "US Census Bureau", title: "Large firms with at least 20 employees are the biggest AI users (BTOS, May 2026)", href: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html", kind: "Agency or provider page" },
  { publisher: "US Census Bureau", title: "Business Trends and Outlook Survey (BTOS)", href: "https://www.census.gov/programs-surveys/btos.html", kind: "Agency or provider page" },
  { publisher: "Federal Reserve Board", title: "Monitoring AI adoption in the US economy (FEDS Note, Apr 3, 2026)", href: "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html", kind: "Agency or provider page" },
  { publisher: "American Medical Association", title: "More than 80% of physicians use AI professionally (survey, Mar 2026)", href: "https://ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey", kind: "Agency or provider page" },
];

export const SECONDARY_SOURCES: readonly SourceLink[] = [
  { publisher: "GIGAZINE", title: "Report on the Aug 2026 revision of the Stanford payroll study", href: "https://www.gigazine.net/gsc_news/en/20260827-ai-entry-level-employment/", kind: "Secondary: confirm before relying" },
  { publisher: "Stanford Digital Economy Lab", title: "Canaries in the Coal Mine? (first edition, Aug 2025)", href: "https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf", kind: "Secondary: confirm before relying" },
  { publisher: "Axis Intelligence", title: "AI adoption by industry statistics 2026 (tracker)", href: "https://axis-intelligence.com/ai-adoption-by-industry-statistics/", kind: "Secondary: confirm before relying" },
];