import type { OpenVsClosedSourceLabel } from "@/lib/compare/openVsClosedContent";
import type { FaqItem, RelatedLink } from "@/lib/compare/openVsClosedContent";
import type { ComparisonTableContent } from "@/lib/learn/expertContent";
import type { EvidenceKind } from "./forces";

export interface KeyNumber {
  id: string;
  value: string;
  label: string;
  source: string;
  date: string;
  kind: EvidenceKind;
}

export interface FutureSource {
  publisher: string;
  title: string;
  href: string;
  label: OpenVsClosedSourceLabel;
}

/** Date the figures on this page were last checked. */
export const FUTURE_OF_AI_CHECKED_ON = "October 25, 2026";
/** Placeholder byline until the author and editor are named. */
export const FUTURE_OF_AI_AUTHOR = "Editorial team";
export const FUTURE_OF_AI_READ_MINUTES = 12;

export const FUTURE_OF_AI_SECTIONS: readonly { id: string; label: string }[] = [
  { id: "short-answer", label: "Short answer" },
  { id: "how-to-read", label: "How to read this page" },
  { id: "where-we-stand", label: "Where we stand" },
  { id: "six-forces", label: "Six forces" },
  { id: "signals", label: "Signals to watch" },
  { id: "scenarios", label: "Three scenarios" },
  { id: "for-you", label: "What it means for you" },
  { id: "forecasts-shift", label: "Forecasts shift" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export const SHORT_ANSWER_POINTS: readonly { id: string; label: string; text: string }[] = [
  { id: "what", label: "What this page is", text: "A way to follow AI to 2030 by watching six forces: model progress, adoption, energy, work, rules and autonomy. For each one it shows what the data says today, what is unknown, and which signals to watch." },
  { id: "know", label: "What we know", text: "Use of generative AI has spread fast among people, more slowly among firms. Data-centre electricity is rising. Measured effects on jobs are modest so far. EU rules have already moved once." },
  { id: "dont", label: "What we do not know", text: "How fast capability will grow, whether power and chips can keep up, and how work will change. Named forecasts already disagree, so any single number is one estimate." },
  { id: "use", label: "How to use it", text: "Treat the three scenarios as frameworks, not forecasts. Watch the signals, check the date on every figure, and change plans when the signals change." },
];

export const RULES_OF_THE_PAGE: readonly string[] = [
  "Two-sided: benefits and risks appear together",
  "Dated and sourced: every figure shows who published it and when",
  "Forecasts are labelled, with their uncertainty",
  "Only named surveys, official trackers and named forecasters are used",
];

export const LEGEND_TABLE: ComparisonTableContent = {
  caption: "The labels used on this page",
  headers: ["Label", "What it means", "How to treat it"],
  rows: [
    ["Measured", "A survey or tracker reports what happened", "Check the date and the question that was asked"],
    ["Projected", "A named organization's forecast", "One estimate among several. Other forecasts differ"],
    ["Estimate", "A fitted trend or a modelled figure", "Expect it to move when the method changes"],
    ["In law", "A rule that has been adopted", "Dates can still be amended. Check the official text"],
    ["Scenario", "A story built to test ideas", "A framework, not a forecast. No probabilities are given"],
  ],
};

export const KEY_NUMBERS: readonly KeyNumber[] = [
  { id: "progress", value: "About 131 days", label: "Doubling time of the task length AI agents can finish, since 2023", source: "METR, Time Horizon 1.1", date: "January 2026", kind: "Estimate" },
  { id: "people", value: "61.8%", label: "Of US adults aged 18 to 64 used generative AI", source: "Real-Time Population Survey, via FRED", date: "Q2 2026", kind: "Measured" },
  { id: "firms", value: "17% to 20%", label: "Of US businesses used AI in any business function", source: "Census Bureau BTOS", date: "December 2025 to May 2026", kind: "Measured" },
  { id: "energy", value: "565 TWh", label: "Forecast global data-centre electricity use in 2026, up 26% on 2025", source: "Gartner", date: "June 2026", kind: "Projected" },
  { id: "work", value: "−5 points", label: "Net effect of AI on employment over the past 12 months, as reported by surveyed firms", source: "S&P Global PMI special survey", date: "June 2026", kind: "Measured" },
  { id: "rules", value: "December 2, 2027", label: "New date for high-risk EU AI Act rules on stand-alone systems", source: "Regulation (EU) 2026/1744", date: "In force July 27, 2026", kind: "In law" },
];

export const SIGNALS_TABLE: ComparisonTableContent = {
  caption: "Signals to watch, with source and how often they update",
  headers: ["Signal", "Force", "Source", "How often", "A change worth noticing"],
  rows: [
    ["Task length agents can finish", "Model progress, Autonomy", "METR time horizons", "When new model results are published", "A doubling time well above or below about four months"],
    ["Independent benchmark scores", "Model progress", "Our benchmark digest", "Weekly", "A new model clearly pulling ahead, or the top models bunching together"],
    ["Share of adults using generative AI", "Adoption", "Real-Time Population Survey, via FRED", "Quarterly", "Growth flattening, or a rise in daily use"],
    ["Share of firms using AI", "Adoption", "Census Bureau BTOS", "Every two weeks", "A sustained climb past the 17% to 20% range, outside definition changes"],
    ["Data-centre electricity forecasts", "Energy", "Gartner and the IEA", "At each new release", "Forecasts for 2030 converging, moving apart, or being cut"],
    ["Net employment effect of AI", "Work", "S&P Global PMI", "Periodic special surveys", "A net balance moving well beyond −5 points"],
    ["Layoff and hiring plans after AI", "Work", "ISM surveys", "When ISM repeats the question", "More firms planning layoffs, or fewer reporting no effect"],
    ["Work hours saved", "Work", "Real-Time Population Survey, via FRED", "Quarterly", "The share saved rising well above about 2.2%"],
    ["EU AI Act dates", "Rules", "European Commission and the Official Journal", "As published", "Further changes to the December 2, 2026 and December 2, 2027 dates"],
    ["Agent permissions and incidents", "Autonomy", "Makers' documentation and incident reports", "Ongoing", "More actions allowed without approval, or serious incidents"],
  ],
};

export const READER_TABLE: ComparisonTableContent = {
  caption: "What the six forces mean for different readers",
  headers: ["If you are…", "Forces to watch first", "What to do now"],
  rows: [
    ["A student", "Model progress, Work", "Use AI to learn, not to hand in its work. Build skills AI cannot show for you: explaining, checking and judgment"],
    ["A parent or teacher", "Adoption, Rules", "Find out which tools children and classes already use, follow school policies, and teach checking answers"],
    ["A job seeker", "Work, Model progress", "Learn the tools your target roles use, use AI for resumes and interview practice, and be ready to explain how you used it"],
    ["An office worker or freelancer", "Work, Autonomy", "Measure your own time saved, start with tasks you can check, and keep client data out of unapproved tools"],
    ["A small business owner", "Adoption, Work, Rules", "Start with one measurable task, track cost per task, check privacy terms, and note the EU dates if you serve EU customers"],
    ["A beginner", "Adoption", "Start with the Level 1 guides, then revisit the signals a couple of times a year"],
  ],
};

export const READER_LINKS: readonly { label: string; href: string }[] = [
  { label: "What is AI?", href: "/learn/foundations/what-is-ai" },
  { label: "How to use AI to study without cheating", href: "/learn/practitioner/use-ai-to-study-without-cheating" },
  { label: "How to write a resume and prepare for interviews with AI", href: "/learn/practitioner/ai-resume-and-interview-prep" },
  { label: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" },
  { label: "Build your own AI test set", href: "/learn/power-user/build-your-own-ai-test-set" },
];

export const HABITS_CHECKLIST: readonly string[] = [
  "Check important answers before you use them",
  "Keep private and client data out of tools you have not checked",
  "Learn one level at a time, and re-test your skills",
  "Track what AI actually saves you, in hours and in money",
  "Prefer a dated source and a named survey over a headline",
  "Revisit the signals on this page every few months",
];

export const FORECASTS_SHIFTED_TABLE: ComparisonTableContent = {
  caption: "Four ways named figures and forecasts have already shifted",
  headers: ["Topic", "Earlier", "Later", "Lesson"],
  rows: [
    ["EU high-risk rules", "Stand-alone high-risk rules from August 2, 2026", "December 2, 2027, with August 2, 2028 for AI built into products", "Dates written into law can still move"],
    ["Pace of AI task-length growth", "About 7 months to double (METR, 2019 to 2025)", "About 131 days since 2023 (METR, January 2026)", "A trend depends on the tasks and the method"],
    ["Data-centre electricity in 2030", "About 945 TWh (IEA base case, April 2025)", "More than 1,200 TWh (Gartner, June 2026)", "Forecasts from different organizations and dates can differ by more than a quarter"],
    ["Business AI use", "Asked about AI 'in producing goods or services'", "Asked about AI 'in any business function' from November 2025", "A jump after a wording change is not adoption"],
  ],
};

export const FUTURE_OF_AI_FAQ: readonly FaqItem[] = [
  { question: "Is this a prediction?", answer: "No. The scenarios are frameworks for thinking, and we give no probabilities. The figures are measured, projected or estimated by named sources, and each one is labelled." },
  { question: "Why these six forces?", answer: "They cover capability, use, resources, people, law and control, which are the main things that decide how fast AI spreads and who is affected. They are a way to organize evidence, not the only possible list." },
  { question: "Which scenario is most likely?", answer: "We do not rank them. Today's evidence fits parts of each one, which is why each scenario lists the evidence for and against it. Watch the signals instead." },
  { question: "Will AI take my job?", answer: "No source can say that for one person. Measured effects on employment are modest so far and differ by firm size, sector and role. Read Is AI taking jobs? for what the surveys say, and keep learning how to use and check these tools." },
  { question: "Why do the energy forecasts disagree?", answer: "They come from different organizations, at different dates, with different assumptions about chips, efficiency and demand. The IEA's April 2025 base case and Gartner's June 2026 forecast for 2030 differ by more than a quarter." },
  { question: "Why do adoption figures differ between surveys?", answer: "They ask different people different questions. One survey asks adults whether they use generative AI at all. Another asks businesses whether they used AI in the past two weeks. Compare each series with itself over time, and watch for wording changes." },
  { question: "How often are the figures updated?", answer: "The date at the top shows when we last checked them. The signals table shows how often each source publishes new data." },
  { question: "Where can I read the original sources?", answer: "Every source is listed at the bottom of the page, with a label that says whether it is official, independent or secondary." },
];

export const FUTURE_OF_AI_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Treating a scenario as a prediction.",
  "Extending a trend line without asking what it was fitted to.",
  "Mixing figures from surveys that ask different questions.",
  "Reading a jump after a wording change as real growth.",
  "Quoting only the most optimistic or most pessimistic forecast.",
  "Confusing capacity in GW with energy in TWh.",
];

export const FUTURE_OF_AI_SOURCES: readonly FutureSource[] = [
  { publisher: "Federal Reserve Bank of St. Louis", title: "Generative AI adoption rate, overall, working-age adults (FRED)", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREALL", label: "Official" },
  { publisher: "Federal Reserve Bank of St. Louis", title: "Generative AI adoption rate, outside of work (FRED)", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHARENONWORK", label: "Official" },
  { publisher: "Federal Reserve Bank of St. Louis", title: "Generative AI time savings, employed adults (FRED)", href: "https://fred.stlouisfed.org/data/RPSGENAITSALL", label: "Official" },
  { publisher: "Federal Reserve Bank of St. Louis", title: "What work does generative AI do?", href: "https://www.stlouisfed.org/on-the-economy/2026/sep/what-work-does-generative-ai-do", label: "Official" },
  { publisher: "US Census Bureau", title: "Large firms with at least 20 employees are the biggest AI users (BTOS)", href: "https://census.gov/library/stories/2026/05/ai-use-businesses.html", label: "Official" },
  { publisher: "Gartner", title: "Data center electricity consumption to grow 26% in 2026", href: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026", label: "Independent third party" },
  { publisher: "International Energy Agency", title: "Energy and AI: executive summary", href: "https://www.iea.org/reports/energy-and-ai/executive-summary", label: "Official" },
  { publisher: "S&P Global", title: "The AI and labor landscape 2026", href: "https://www.spglobal.com/en/research-insights/special-reports/ai-impact-on-employment-2026", label: "Independent third party" },
  { publisher: "Staffing Industry Analysts", title: "Report on ISM's June 2026 AI and employment question", href: "https://www.staffingindustry.com/news/global-daily-news/only-modest-employment-expectations-for-remainder-of-the-year", label: "Secondary source" },
  { publisher: "Axios", title: "Services sector is strong in June, and data-centre supply strains show", href: "https://www.axios.com/2026/07/06/services-ai-data-centers", label: "Secondary source" },
  { publisher: "METR", title: "Time Horizon 1.1", href: "https://metr.org/blog/2026-01-29-time-horizon-1-1/", label: "Independent third party" },
  { publisher: "METR", title: "Measuring AI ability to complete long tasks", href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/", label: "Independent third party" },
  { publisher: "European Commission", title: "The EU's regulatory framework for AI", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", label: "Official" },
  { publisher: "AIACTO", title: "Digital Omnibus adopted: AI Act high-risk delayed to 2027", href: "https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027", label: "Secondary source" },
  { publisher: "Gibson Dunn", title: "EU AI Act Omnibus agreement: postponed high-risk deadlines", href: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/", label: "Secondary source" },
];

export const FUTURE_OF_AI_RELATED: readonly RelatedLink[] = [
  { id: "role", title: "The role of AI in our lives", reason: "Article 32: where people meet AI today.", href: "/society/role-of-ai-in-our-lives" },
  { id: "pros-cons", title: "Pros and cons of AI", reason: "Article 33: an honest scorecard.", href: "/society/pros-and-cons-of-ai" },
  { id: "jobs", title: "Is AI taking jobs?", reason: "Article 34: what current surveys say.", href: "/society/is-ai-taking-jobs" },
  { id: "power", title: "How much power does AI use?", reason: "Article 37: the energy force in depth.", href: "/society/ai-power-use" },
  { id: "adoption", title: "How fast is AI spreading?", reason: "Article 41: the adoption data explained.", href: "/society/ai-adoption-data" },
  { id: "myths", title: "AI myths and facts", reason: "Article 42: check common claims.", href: "/society/ai-myths-and-facts" },
  { id: "agents", title: "AI agents explained", reason: "Article 20: what agents can do and how they fail.", href: "/learn/power-user/ai-agents-explained" },
  { id: "eu", title: "EU AI Act timeline", reason: "Dates and a plain-English summary.", href: "/news/eu-ai-act" },
  { id: "benchmarks", title: "Benchmark digest", reason: "Independent scores, updated weekly.", href: "/prices/benchmarks" },
  { id: "quiz", title: "How much AI is in your day?", reason: "A short quiz with a shareable card.", href: "/society/day-quiz" },
];