import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  ReaderActions,
  RelatedLink,
  SourceEntry,
} from "./societyContentTypes";
import type { ClaimReading } from "./adoptionExplained";

export interface ReadingCopy {
  label: string;
  message: string;
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Use of generative AI has risen quickly among US adults.", detail: "The Fed-hosted tracker shows the share of adults aged 18 to 64 rising between Q3 2024 and Q2 2026, overall, at work and outside work." },
  { headline: "Outside-work use is higher than work use, and the gap widened.", detail: "More people use it in their own time than for their job, and the difference grew over the period." },
  { headline: "Different surveys give different numbers, and that is normal.", detail: "They ask different groups different questions about different kinds of use on different dates." },
  { headline: "This is a count of chosen use of generative AI.", detail: "It does not include the AI inside feeds, maps, spam filters and fraud checks, and it says nothing about jobs." },
];

export const CAN_SAY: readonly string[] = [
  "How the share of US adults aged 18 to 64 who report using generative AI changed between two dates.",
  "That use outside work was higher than use at work at both dates.",
  "That the two kinds of use overlap, so they must not be added together.",
];

export const CANNOT_SAY: readonly string[] = [
  "How the share moved between the two dates. We show two points only, so there is no trend line here.",
  "Anything about people under 18 or over 64, or outside the US.",
  "How often or how much people use AI, or what for.",
  "Whether use has changed anyone's job, pay or school results. That needs different data.",
  "What the share will be in a later year. Any such figure is a forecast.",
];

export const WORK_OUTSIDE_POINTS: readonly PointEntry[] = [
  { headline: "They overlap.", detail: "Someone can use AI at work and at home. The work and outside-work shares therefore cannot be added, and both can be above half." },
  { headline: "Work and outside work are shares of the same group.", detail: "Both are shares of US adults aged 18 to 64, so work use is not a share of workers. Check the original before comparing it with a worker-only survey." },
  { headline: "Most users do both.", detail: "Under our assumption, the largest part of overall use is people who use it in both settings, and that part grew." },
];

export const READING_COPY: Record<ClaimReading, ReadingCopy> = {
  "lead-only": { label: "A lead, not a source", message: "Most of the basics are missing. Use this number only to find the original, and do not repeat it." },
  "partly-checkable": { label: "Partly checkable", message: "Some basics are there, but gaps remain. Find the original and fill the missing answers before you rely on it." },
  checkable: { label: "Checkable", message: "The basics are in place. That does not make the number right, but you can check it and compare it fairly." },
};

export const CITE_STEPS: readonly PointEntry[] = [
  { headline: "Name the source and the group.", detail: "For example: “US adults aged 18 to 64, per the Fed-hosted adoption tracker”." },
  { headline: "Give the quarter, not “now”.", detail: "Say Q2 2026, so the reader knows how old it is." },
  { headline: "Say what was counted.", detail: "“Use generative AI” is not the same as “use AI”, and “at work” is not “overall”." },
  { headline: "Do not add or average the work and outside-work shares.", detail: "They overlap." },
  { headline: "Open the original first.", detail: "Check our figures against it, and tell us if they differ." },
];

export const READER_ACTIONS: readonly ReaderActions[] = [
  { reader: "Students and writers", actions: ["Cite the tracker with its group and quarter.", "Do not call 61.8% “everyone”: it is US adults aged 18 to 64.", "Link to the original, not to this page."] },
  { reader: "Journalists and researchers", actions: ["Report the definition and the base with every adoption figure.", "Treat our arithmetic (overlap, averages) as a starting point and redo it from the tracker's own data.", "Look for the quarters between the two we show."] },
  { reader: "Managers and small business owners", actions: ["Use work-use figures as a reason to set a policy, not as proof that your team is using AI.", "Ask staff what they use, without blame.", "See the safety checklist for businesses."] },
  { reader: "Teachers and parents", actions: ["Remember this series covers adults 18 to 64. It says nothing about pupils.", "Ask your school what it knows about its own pupils' use."] },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "So how many people use AI?", answer: "It depends on the group and the definition. For US adults aged 18 to 64, the tracker reports 61.8% using generative AI in Q2 2026. That is not a figure for the world, for children or for older adults." },
  { question: "Why do other surveys give lower or higher numbers?", answer: "Because they ask different groups different questions, with different ideas of what counts as use and how often. Comparing numbers across surveys without checking those is the most common mistake." },
  { question: "Why do you show only two quarters?", answer: "Those are the figures we hold from the tracker. We will not draw a line between them or invent the quarters in between. Open the tracker's own page for the full series." },
  { question: "Can I add the work and outside-work figures?", answer: "No. Many people use AI in both settings, so adding them counts those people twice." },
  { question: "What is the overlap estimate?", answer: "It is our arithmetic, assuming the overall figure counts anyone who uses AI at work or outside work. If the tracker defines it differently, the estimate does not hold, so check the original." },
  { question: "Does this show AI is taking jobs?", answer: "No. It measures use, which is a precondition for change and not evidence of it. See our article on jobs for what named surveys say." },
  { question: "Why are the Pew and Microsoft figures marked unverified?", answer: "We have only seen them summarised in secondary sources, and we have not opened the originals. Until we do, we show them only as examples of figures to check, and we do not rely on them." },
  { question: "How often is this page updated?", answer: "When the tracker releases new figures, and otherwise every few months. The reviewed date is at the top." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Adoption", meaning: "The share of a group that uses a technology." },
  { term: "Generative AI", meaning: "AI that creates new text, images, audio or video from a request." },
  { term: "Percentage point", meaning: "The difference between two percentages. Going from 44.6% to 61.8% is 17.2 points." },
  { term: "Relative change", meaning: "A change as a share of the starting value. A 17.2-point rise from 44.6% is about 39%." },
  { term: "Denominator", meaning: "The group a percentage is taken from." },
  { term: "Overlap", meaning: "People who fall into two groups at once, such as using AI at work and outside work." },
  { term: "Self-report", meaning: "A survey answer given by the person, not measured by anyone else." },
  { term: "Forecast", meaning: "A statement about the future. It carries uncertainty and can be wrong." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Our tracker figures come from our planning notes and have not yet been checked against the tracker's own page. Treat them as unverified until the verified-on date is set.",
  "We hold two quarters only. Nothing here describes the path between them.",
  "The overlap and average figures are our arithmetic under stated assumptions, not published results.",
  "The Pew and Microsoft figures are secondary summaries and are shown only as examples to check.",
  "This page is general information, not legal, financial or career advice.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "Fed-hosted adoption tracker", title: "US generative AI adoption, adults aged 18 to 64", href: null, use: "All figures in the series, Q3 2024 and Q2 2026" },
  { publisher: "Pew (secondary summary)", title: "Chatbot use figures", href: null, use: "Shown unverified, as an example of a figure to check" },
  { publisher: "Microsoft (secondary summary)", title: "Worldwide adoption figure", href: null, use: "Shown unverified, as an example of a figure to check" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/role-of-ai-in-our-lives", label: "The role of AI in our lives: home, school and work", note: "Article 32" },
  { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs? What current surveys actually say", note: "Article 34" },
  { href: "/society/pros-and-cons-of-ai", label: "Pros and cons of AI: an honest scorecard", note: "Article 33" },
  { href: "/society/ten-places-you-meet-ai", label: "Ten places you meet AI in a normal day", note: "Article 31" },
  { href: "/learn/expert/how-to-read-ai-benchmark", label: "How to read an AI benchmark", note: "Level 4 explainer" },
  { href: "/tools/benchmark-checklist", label: "Benchmark reading checklist", note: "Ten questions before you trust a score" },
  { href: "/society/day-quiz", label: "How much AI is in your day? (quiz)", note: "Interactive" },
  { href: "/about/source-policy", label: "Source policy", note: "How we choose and label sources" },
];