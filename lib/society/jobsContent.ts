import type {
  DisagreementEntry,
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  ReaderActions,
  RelatedLink,
  SourceEntry,
} from "./societyContentTypes";
import type { ProfileReading } from "./jobs";

export interface UnusedFigureRow {
  kind: string;
  example: string;
  whyNotUsed: string;
  whatWeDo: string;
}

export interface TaskShiftRow {
  task: string;
  aiOftenHelps: string;
  humanStillNeeded: string;
  watchFor: string;
}

export interface SignalEntry {
  signal: string;
  why: string;
  whereToLook: string;
}

export interface ReadingCopy {
  label: string;
  message: string;
  nextSteps: readonly string[];
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "No named survey measures total jobs lost to AI.", detail: "The three sources we use measure managers' views, firms' plans and workers' use. Each is a different step away from actual job changes." },
  { headline: "The signals so far are modest and mixed.", detail: "Surveyed managers reported a modestly negative net effect, and a minority of surveyed firms report layoff plans linked to AI, more in services than in manufacturing." },
  { headline: "Use at work is rising.", detail: "The Fed-hosted tracker shows more US adults using generative AI at work, which is exposure, not proof of job loss." },
  { headline: "Tasks change before jobs do.", detail: "Most jobs are bundles of tasks. AI changes some of them, and what that means for a given job depends on the mix." },
  { headline: "The entry-level worry is a serious hypothesis, not yet a measured fact.", detail: "It is plausible, and the figures we use do not break results down by career stage, so they can neither confirm nor rule it out." },
];

export const CAN_SAY: readonly string[] = [
  "Surveyed managers described a small, negative net effect on employment at the date of the survey.",
  "A minority of surveyed firms reported plans for layoffs after introducing AI, and more services firms than manufacturers did.",
  "Use of generative AI at work among US adults aged 18 to 64 rose over the tracker's period.",
  "The three sources measure different things and should not be added together or compared as if they were one series.",
];

export const CANNOT_SAY: readonly string[] = [
  "How many jobs AI has removed or created in total.",
  "That AI is the main cause of any layoff, or of any fall in hiring.",
  "Which occupations, ages or regions are most affected.",
  "What will happen by 2030 or any other year. Anything about the future is a forecast with uncertainty.",
];

export const UNUSED_FIGURES: readonly UnusedFigureRow[] = [
  { kind: "Headline totals of jobs “lost to AI”", example: "A round number of jobs in a headline, with no named survey behind it.", whyNotUsed: "Often a forecast presented as a fact, with no stated method.", whatWeDo: "Use measured data where it exists, and label every forecast as one." },
  { kind: "Unnamed “studies” and screenshots", example: "A chart or quote with no publisher, date or method.", whyNotUsed: "It cannot be checked, so it cannot be corrected either.", whatWeDo: "Use only figures with a named publisher and a date." },
  { kind: "Vendor and consultant claims", example: "A company says its tool makes teams much faster or replaces a role.", whyNotUsed: "The source has an interest in the result, and the claim is about its own product.", whatWeDo: "Keep vendor-reported numbers separate and labelled, as on our benchmark pages." },
  { kind: "Layoffs credited to AI by the company", example: "A firm says a round of cuts is “because of AI”.", whyNotUsed: "A stated reason is a statement, not a measurement. Costs, demand, interest rates and earlier over-hiring also matter.", whatWeDo: "Report it as a company statement if we mention it, never as proof of cause." },
  { kind: "Social media polls", example: "An online poll about whether people fear losing their job.", whyNotUsed: "Self-selected respondents do not represent workers or firms.", whatWeDo: "Prefer surveys that say who was asked and how they were chosen." },
  { kind: "Second-hand summaries of surveys", example: "A blog or news post quoting a survey it did not run.", whyNotUsed: "Wording, base and date often drift in the retelling.", whatWeDo: "Go to the original page first, and treat summaries as leads only." },
  { kind: "Figures from one firm or country shown as global", example: "A national or single-company number used for “workers everywhere”.", whyNotUsed: "The scope does not match the claim.", whatWeDo: "State the group in every figure, such as “US adults aged 18 to 64”." },
];

export const TASK_SHIFTS: readonly TaskShiftRow[] = [
  { task: "Writing and communication", aiOftenHelps: "First drafts, rewriting, translation, tone changes.", humanStillNeeded: "Knowing the audience, standing behind the claims, building the relationship.", watchFor: "Text that reads well and is wrong." },
  { task: "Research and summarising", aiOftenHelps: "Sorting long documents, first-pass summaries, finding the right page.", humanStillNeeded: "Judging sources and deciding what matters.", watchFor: "Invented sources and missing context." },
  { task: "Data and admin", aiOftenHelps: "Sorting, extracting fields, filling forms, scheduling.", humanStillNeeded: "Exceptions, approvals and responsibility.", watchFor: "Small errors that repeat quietly." },
  { task: "Customer support", aiOftenHelps: "Answering common questions and sorting requests.", humanStillNeeded: "Complex cases, upset customers and judgement calls.", watchFor: "Chatbots with no route to a person." },
  { task: "Software and technical work", aiOftenHelps: "Code suggestions, tests, explanations.", humanStillNeeded: "Design decisions, security and understanding what is really needed.", watchFor: "Code that looks right and is not." },
  { task: "Hands-on and in-person work", aiOftenHelps: "Paperwork, planning, notes and scheduling around the job.", humanStillNeeded: "The physical work, presence and trust.", watchFor: "Tools that add admin instead of removing it." },
  { task: "Care, teaching and advice", aiOftenHelps: "Preparing materials, notes and drafts.", humanStillNeeded: "The relationship, judgement and duty of care.", watchFor: "Privacy leaks and over-reliance." },
];

export const ENTRY_LEVEL_WORRY: readonly PointEntry[] = [
  { headline: "First jobs often consist of routine tasks.", detail: "Drafting, sorting, checking and routine support are common starter work, and they are also tasks that AI tools are widely used for." },
  { headline: "Those tasks are also how people learn the job.", detail: "If routine tasks shrink, the way juniors build experience may need to change, even if the job title stays." },
  { headline: "Hiring is easier to cut than staff.", detail: "A firm can hire fewer juniors without announcing a layoff. A survey of layoff plans would not capture that." },
];

export const ENTRY_LEVEL_CAUTION: readonly PointEntry[] = [
  { headline: "The figures we use do not measure it.", detail: "None of the three sources, as we show them, splits results by age or career stage. They can neither confirm nor rule out the worry." },
  { headline: "Other forces move hiring.", detail: "Demand, interest rates and company decisions also affect junior hiring, so a fall cannot be assigned to AI without careful analysis." },
  { headline: "Tasks can move up instead of vanishing.", detail: "Juniors may be given review and checking work earlier, which changes the job without removing it." },
];

export const SIGNALS: readonly SignalEntry[] = [
  { signal: "Employment by occupation", why: "Shows real changes in headcount, not opinions or plans.", whereToLook: "Your country's official labour statistics, split by occupation." },
  { signal: "Unemployment and hiring for new and young workers", why: "The most direct test of the entry-level worry.", whereToLook: "Official labour statistics split by age and by years of experience." },
  { signal: "Job postings by type of task", why: "Shows whether employers are asking for different skills.", whereToLook: "Job-board data from named analysts who publish their method." },
  { signal: "Pay and hours in exposed occupations", why: "Shows whether work is being reshaped even when headcount holds steady.", whereToLook: "Official earnings and hours series." },
  { signal: "Repeat surveys with the same questions", why: "A repeated question shows direction in a way a one-off poll cannot.", whereToLook: "Official trackers, such as the adoption series on this page." },
  { signal: "Before-and-after studies of firms", why: "Can separate AI from other causes by comparing similar firms.", whereToLook: "Published research that states its method and data." },
];

export const DISAGREEMENTS: readonly DisagreementEntry[] = [
  { topic: "What a small net effect means", oneView: "Effects are small so far and mostly happen inside jobs, as tasks change.", otherView: "A small net figure can hide losses concentrated among some groups, offset by gains elsewhere.", whatWouldHelp: "Employment data broken down by occupation and age." },
  { topic: "How fast change will arrive", oneView: "Firms adopt slowly, so effects will build over many years.", otherView: "Tools are improving quickly, so change could be sudden in some fields.", whatWouldHelp: "Repeat measurement over time. Any view about future speed is a forecast." },
  { topic: "Is AI the real cause of layoffs?", oneView: "Some firms genuinely replace roles with AI.", otherView: "Some firms credit AI for cuts that have other causes, such as cost pressure.", whatWouldHelp: "Matched data on hiring, output and costs at the same firms." },
  { topic: "Who gains from productivity", oneView: "Gains lift output and wages and create new demand.", otherView: "Gains go mainly to owners and to workers with scarce skills.", whatWouldHelp: "Wage and income data by group, over several years." },
];

export const READER_ACTIONS: readonly ReaderActions[] = [
  { reader: "If you have a job", actions: ["List your main tasks and mark which ones an AI tool already helps with.", "Try a tool on low-stakes work and time it, including the checking.", "Build the part of your work that depends on judgement, trust and accountability.", "Learn your employer's rules, and never paste employer or client data into a personal account."] },
  { reader: "If you are starting out", actions: ["Show judgement, not only output: projects, reviewed work and clear explanations.", "Use AI honestly, and disclose it where rules require it.", "Ask employers how juniors are trained in their team.", "Apply widely, and watch the hiring signals listed above rather than one headline."] },
  { reader: "If you are a student or a parent", actions: ["Favour skills that transfer: writing, numbers, checking and talking to people.", "Use AI to practise and get feedback, not to skip the learning.", "Do not choose a course or career from a single headline or number."] },
  { reader: "If you manage a team or a business", actions: ["Decide what AI is for, and name one person who owns it.", "Keep a way for juniors to learn the work.", "Tell staff your plans early, and measure before and after.", "Treat layoff or hiring decisions as human decisions, with AI as an input only."] },
  { reader: "If you are worried", actions: ["Talk to a career adviser, an employment service or a professional body.", "Write down your tasks and your next step, rather than reading headlines.", "Use the tasks check below as a thinking aid, not a verdict."] },
];

export const READING_COPY: Record<ProfileReading, ReadingCopy> = {
  "need-more": {
    label: "Tick at least three",
    message: "Tick the statements that describe most of your week. The check needs at least three before it gives a reading.",
    nextSteps: [],
  },
  "many-tasks-may-change": {
    label: "Many of your tasks may change",
    message: "Most of what you ticked points to tasks that AI tools are already used for. That does not mean your job will disappear. It often means the tasks, and the skills that set you apart, will shift.",
    nextSteps: [
      "Pick one task and try a tool on low-stakes work, then compare time and quality including checking.",
      "Build the parts of your work that depend on judgement, relationships and accountability.",
      "Ask your employer or school what the rules on AI use are.",
    ],
  },
  mixed: {
    label: "A mix of tasks",
    message: "Your work combines tasks that tools are often used for with tasks that depend on people and judgement. Some of your week may change, and some may not.",
    nextSteps: [
      "Separate the two groups in your own week and try a tool only on the first.",
      "Keep investing in the human-centred half, because it is what makes the tool-assisted half useful.",
      "Revisit this in a few months, since tools and your tasks both change.",
    ],
  },
  "tasks-mostly-human": {
    label: "Mostly human-centred tasks",
    message: "Most of what you ticked points to work that depends on presence, judgement or trust. AI may still change the paperwork, planning and communication around it.",
    nextSteps: [
      "Look for admin or preparation tasks where a tool could save you time.",
      "Keep your skills current, because colleagues and clients will use these tools too.",
      "Stay alert to changes in how your field is organised, not only in what you do.",
    ],
  },
};

export const FAQ: readonly FaqEntry[] = [
  { question: "So, is AI taking jobs?", answer: "The honest answer is: it is changing tasks, some firms report layoff plans linked to it, and the overall effect is not yet clear. Surveyed managers reported a modestly negative net effect, and a minority of surveyed firms report layoff plans. None of the sources we use measures total jobs lost." },
  { question: "Why not quote a number of jobs lost or created?", answer: "Because we have no named, reliable measurement of it. We only publish figures from named surveys and official trackers, with a date. Round totals in headlines are usually forecasts or unsourced." },
  { question: "Which jobs are safe?", answer: "No job is untouched, and none is certain to disappear. Tasks change at different speeds. The tasks check shows kinds of task that tend to matter, and it is not a prediction." },
  { question: "Will AI create new jobs?", answer: "New technology has created new roles before, and roles connected to AI are appearing. We do not have a named, reliable count, so we do not publish one. Who gets the new roles is uneven." },
  { question: "Is it only office work that is affected?", answer: "Many exposed tasks are screen-based, so office and knowledge work come up first. Hands-on and in-person work is touched too, often through the paperwork and planning around it. Evidence on this is still emerging." },
  { question: "What do the ISM percentages mean?", answer: "The survey reports the share of surveyed manufacturers and services firms that say they plan layoffs after introducing AI. We show the percentages as reported. Before relying on them, check in the original whether the base is all surveyed firms or only those that have introduced AI." },
  { question: "Should I change my career or course because of this?", answer: "Not because of a single headline or number. Look at several named sources, talk to a career adviser, and think in terms of tasks and skills rather than whole jobs." },
  { question: "How often is this page updated?", answer: "Every few months, and sooner when a named source releases new figures. The reviewed date is at the top of the page." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Net employment effect", meaning: "The overall change in jobs after counting both those lost and those created." },
  { term: "Task", meaning: "One piece of work inside a job. Most jobs are a bundle of many tasks." },
  { term: "Automation", meaning: "Software doing a task that a person used to do." },
  { term: "Augmentation", meaning: "Software helping a person do a task, with the person still responsible." },
  { term: "Entry-level", meaning: "A first job or a role that needs little prior experience." },
  { term: "Hiring freeze", meaning: "A firm hires fewer people or none, without laying anyone off." },
  { term: "Denominator", meaning: "The group a percentage is taken from. “9% of firms” and “9% of firms using AI” are different claims." },
  { term: "Forecast", meaning: "A statement about the future. It carries uncertainty and can be wrong." },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "S&P Global", title: "Survey of managers on AI and employment, June 2026", href: null, use: "Modestly negative net employment effect among surveyed managers" },
  { publisher: "ISM", title: "Survey of manufacturers and services firms, June 2026", href: null, use: "Share of surveyed firms reporting layoff plans after introducing AI, by sector" },
  { publisher: "Fed-hosted adoption tracker", title: "US generative AI adoption, adults aged 18 to 64", href: null, use: "Share using generative AI overall, at work and outside work, Q3 2024 and Q2 2026" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/pros-and-cons-of-ai", label: "Pros and cons of AI: an honest scorecard", note: "Article 33" },
  { href: "/society/industries-changing-most", label: "Which industries are changing most, and which are next", note: "Article 35" },
  { href: "/society/ai-adoption-data", label: "How fast is AI spreading? The adoption data explained", note: "Article 41" },
  { href: "/society/future-of-ai", label: "The future of AI: six forces to watch to 2030", note: "Article 36" },
  { href: "/society/weigh-up", label: "Pros and cons weigh-up", note: "Interactive" },
  { href: "/learn/practitioner/ai-resume-and-interview-prep", label: "Resume and interview prep with AI", note: "Level 2 guide" },
  { href: "/learn/practitioner/ai-for-email-and-writing-at-work", label: "How to use AI for email and writing at work", note: "Level 2 guide" },
  { href: "/tools/cheat-sheets", label: "Cheat sheets and templates", note: "Includes resume prompt templates" },
];