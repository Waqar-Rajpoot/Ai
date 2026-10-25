export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface StepEntry {
  title: string;
  detail: string;
}

export interface ReasonEntry {
  reason: string;
  whatToDo: string;
}

export interface KeyFigure {
  figure: string;
  measures: string;
  sourceId: string;
  note: string;
}

export interface DisagreementRow {
  source: string;
  number: string;
  whoCounted: string;
  whatCounted: string;
  when: string;
}

export interface RuleEntry {
  rule: string;
  detail: string;
}

export interface TermEntry {
  term: string;
  meaning: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LinkEntry {
  title: string;
  href: string;
  note: string;
}

export const SHORT_ANSWER: readonly string[] = [
  "Most AI myths hold a grain of truth. The useful question is not \"is it true?\" but \"how true, for whom, and as of when?\".",
  "Chatbots can be wrong and sound sure. That one fact explains many myths, both the hopeful ones (it always knows) and the fearful ones (it knows everything about me).",
  "Use is wide but not universal. About half of US adults use chatbots, about a quarter daily, and use is far from even around the world.",
  "Jobs and energy are where the evidence is moving fastest. Surveys show limited effects so far on jobs, turning modestly negative, and data-centre electricity use is rising quickly.",
  "Every claim below has a verdict, a plain answer, a technical layer and its sources. Where there is no single source, we say so.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "worried",
    title: "I keep seeing scary (or glowing) headlines",
    who: "Anyone who wants to know what is real",
    points: [
      "Start with the five-step routine to spot a myth.",
      "Use the flip cards to test your instincts, then read the evidence.",
      "Look at the dates: a figure from last year may already be out of date.",
      "Remember that a forecast is not a measurement.",
    ],
    link: { href: "#spot", label: "Jump to the routine" },
  },
  {
    id: "user",
    title: "I use AI at work or school",
    who: "Students, office workers, job seekers and small business owners",
    points: [
      "Read the accuracy and privacy claims first: they change what you do tomorrow.",
      "Check your school's or employer's rules before you rely on AI for graded or client work.",
      "Do not paste passwords, IDs, health or client details into a chatbot.",
      "Verify any fact, quote or number that matters.",
    ],
    link: { href: "/learn/practitioner/fact-check-ai-answers", label: "Learn the fact-check routine" },
  },
  {
    id: "explainer",
    title: "I write, teach or advise other people",
    who: "Journalists, teachers, managers and compliance leads",
    points: [
      "Quote a figure with its source, date and the group counted.",
      "Use the technical layer and the evidence table to cite properly.",
      "Do not mix a measured number with a forecast without saying so.",
      "Send us a correction if a figure has changed.",
    ],
    link: { href: "/about/corrections", label: "Report a correction" },
  },
];

export const WHY_MYTHS_STICK: readonly ReasonEntry[] = [
  { reason: "Fluent text sounds authoritative.", whatToDo: "Check the claim, not the tone." },
  { reason: "Headlines prefer extremes.", whatToDo: "Look for the typical case, not the loudest one." },
  { reason: "Numbers lose their context.", whatToDo: "Find who was counted, and when." },
  { reason: "Tools change faster than advice.", whatToDo: "Check the date and the model version." },
  { reason: "Fiction fills the gaps.", whatToDo: "Separate what exists today from what films imagine." },
  { reason: "Hype and doom both sell.", whatToDo: "Ask who gains if you believe it." },
];

export const SPOT_A_MYTH_ROUTINE: readonly StepEntry[] = [
  { title: "Name the claim", detail: "Say it in one sentence, including who or what it is about. Vague claims are hard to check." },
  { title: "Find who measured it", detail: "A named survey, an official tracker or a company? Unnamed totals are not evidence." },
  { title: "Check the date and the group", detail: "All adults, workers, firms or one company's users? Old numbers may no longer hold." },
  { title: "Separate measurement from forecast", detail: "\"Will\" and \"by 2030\" signal a forecast. Forecasts carry uncertainty and should be labelled." },
  { title: "Look for the other side", detail: "If every source agrees too neatly, look for the best counter-argument before you share it." },
];

export const KEY_FIGURES: readonly KeyFigure[] = [
  { figure: "61.8%", measures: "US adults aged 18 to 64 who use generative AI, at work or outside it", sourceId: "fred-overall", note: "Q2 2026. It was 44.6% in Q3 2024." },
  { figure: "54.8%", measures: "The same group, using it outside work", sourceId: "fred-nonwork", note: "Q2 2026." },
  { figure: "6.3% and 2.2%", measures: "Share of all work hours of employed adults that AI assisted, and the share it saved (self-reported)", sourceId: "fred-hours", note: "Q2 2026. The time-saved figure comes from the FRED Blog." },
  { figure: "49% and 24%", measures: "US adults who use AI chatbots, and who use them daily", sourceId: "pew-2026", note: "Survey of 5,119 adults. The 49% was 33% in 2024." },
  { figure: "18.8%", measures: "World working-age population (15 to 64) using generative AI", sourceId: "msft-q2", note: "June 2026. An estimate from device telemetry." },
  { figure: "28.8% and 16.2%", measures: "The same measure for the Global North and the Global South", sourceId: "msft-q2", note: "June 2026. Microsoft's own grouping of economies." },
  { figure: "565 TWh, +26%", measures: "World data-centre electricity use in 2026, and growth on 2025", sourceId: "gartner-2026", note: "Forecast. 2025 was 447 TWh." },
  { figure: "31%", measures: "Share of data-centre electricity used by AI-optimized servers in 2026", sourceId: "gartner-2026", note: "Forecast. Gartner expects them to pass conventional servers in 2027." },
  { figure: "Above 1,200 TWh", measures: "World data-centre electricity use by 2030", sourceId: "gartner-2026", note: "Forecast. Other forecasters publish different figures." },
  { figure: "-5 and -2", measures: "Net effect of AI on employment, in percentage points: past 12 months and forecast year ahead", sourceId: "sp-global-2026", note: "Global survey of firms, June 2026." },
  { figure: "-13 and +3", measures: "Forecast net employment effect for large firms and for small firms", sourceId: "sp-global-2026", note: "Managers' expectations, not measured jobs." },
  { figure: "5% and 9%", measures: "US manufacturers and services firms planning layoffs after introducing AI", sourceId: "ism-june-2026", note: "June 2026. About 76% and 73% saw no noticeable effect on hiring or layoffs." },
  { figure: "Over 90%", measures: "Executives reporting no effect of AI on employment over the past three years", sourceId: "nber-firm-data", note: "Four-country survey, fieldwork in late 2025." },
];

export const NUMBERS_DISAGREE: readonly DisagreementRow[] = [
  { source: "Pew Research Center", number: "49%", whoCounted: "US adults, 18 and over", whatCounted: "Using AI chatbots", when: "February 2026" },
  { source: "St. Louis Fed tracker", number: "61.8%", whoCounted: "US adults, 18 to 64", whatCounted: "Any generative AI use, at work or outside", when: "Q2 2026" },
  { source: "Microsoft AI Economy Institute", number: "31.3% (US)", whoCounted: "People aged 15 to 64, estimated", whatCounted: "Generative AI product use, from device telemetry adjusted for population and access", when: "Q1 2026" },
];

export const SOCIETY_RULES: readonly RuleEntry[] = [
  { rule: "Two-sided", detail: "Benefits and risks appear together on every claim." },
  { rule: "Dated and sourced", detail: "Each figure shows who measured it and when, or says plainly that no single source exists." },
  { rule: "Forecasts labelled", detail: "A forecast is marked as one, with its uncertainty." },
  { rule: "Named sources only", detail: "We use named surveys and official trackers, not unsourced totals." },
];

export const GOTCHAS: readonly string[] = [
  "A verdict is a summary. Read the evidence before you repeat a claim.",
  "Surveys record what people and firms say, not always what they do.",
  "Forecasts are not facts, even when a respected firm makes them.",
  "Most figures here are about the United States. Other countries can differ a lot.",
  "A myth can be partly true. \"Mostly myth\" means the claim as stated misleads.",
  "Figures update weekly, monthly or quarterly. Check the as-of date.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Why does this page say \"it depends\" so often?", answer: "Because honest answers often do. We use it when the answer changes with the situation, the definition or the person, and we say what it depends on." },
  { question: "How were these claims chosen?", answer: "From the questions readers ask most, and the claims that change what people do: trusting answers, sharing data, planning work and judging headlines." },
  { question: "Why do surveys give different numbers?", answer: "They ask different questions of different groups at different times. Compare like with like, as the table above shows." },
  { question: "Is a forecast a fact?", answer: "No. A forecast is an expert estimate with assumptions. We label forecasts and give the source and date." },
  { question: "Does \"myth\" mean nobody believes it?", answer: "No. It means the evidence points the other way. Many myths are widely believed." },
  { question: "How often is this page updated?", answer: "When a source publishes new figures, and at least when the verified-on date at the top is older than a quarter. Changes are noted in the changelog." },
  { question: "Are these claims about the whole world?", answer: "Only where we say so. Most adoption and jobs figures are for the United States, and we label the exceptions." },
  { question: "How do I suggest a myth or a correction?", answer: "Use the corrections page. Include the claim and, if you can, a source." },
];

export const GLOSSARY: readonly TermEntry[] = [
  { term: "Hallucination", meaning: "An answer that sounds right but is made up or wrong." },
  { term: "Training data", meaning: "The text, images and other material a model learned from." },
  { term: "Weights", meaning: "The numbers a model learned in training. They stay fixed while you chat." },
  { term: "Context", meaning: "The text the model can see in the current conversation." },
  { term: "Telemetry", meaning: "Usage data a product records, often anonymised and combined." },
  { term: "Working-age population", meaning: "People of working age. Surveys define it differently: 18 to 64 or 15 to 64." },
  { term: "Net effect", meaning: "The share of firms reporting an increase minus the share reporting a decrease." },
  { term: "Percentage point", meaning: "The simple difference between two percentages: 49% to 61.8% is 12.8 points." },
  { term: "Forecast", meaning: "An estimate of a future number, with assumptions behind it." },
  { term: "TWh", meaning: "A terawatt hour: one trillion watt hours of electricity." },
  { term: "AI-optimized server", meaning: "Gartner's term for servers built mainly for AI work." },
  { term: "Global North and Global South", meaning: "Microsoft's grouping of richer and poorer economies in its adoption report." },
];

export const METHOD_NOTES: readonly string[] = [
  "Verdicts use a five-step scale: myth, mostly myth, it depends, mostly fact and fact.",
  "Each claim lists its sources. A claim with no source is established general knowledge, and says so.",
  "Every source shows whether we read it on its own page or through a reprint.",
  "Derived figures, such as shares of an increase, are our arithmetic on the source's table, and are marked.",
  "The flip cards use the same claims and verdicts as the list.",
  "Nothing you enter or click on this page is sent or saved.",
];

export const RELATED_LINKS: readonly LinkEntry[] = [
  { title: "AI & Society hub", href: "/society", note: "All society articles and tools." },
  { title: "Myth-or-fact flip cards", href: "/society/myth-or-fact", note: "The card game on its own page." },
  { title: "How fast is AI spreading?", href: "/society/ai-adoption-data", note: "The adoption data explained." },
  { title: "Is AI taking jobs?", href: "/society/is-ai-taking-jobs", note: "What current surveys actually say." },
  { title: "How much power does AI use?", href: "/society/ai-power-use", note: "Data-centre electricity figures." },
  { title: "The future of AI", href: "/society/future-of-ai", note: "Six forces and three scenarios." },
  { title: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers", note: "A five-step routine." },
  { title: "Source policy", href: "/about/source-policy", note: "How we rank sources." },
  { title: "Glossary", href: "/learn/glossary", note: "Plain-English definitions at every level." },
];