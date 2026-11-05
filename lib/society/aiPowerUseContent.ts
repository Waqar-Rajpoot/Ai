import type { FaqEntry, GlossaryEntry, PointEntry, ReaderActions, RelatedLink, SourceEntry } from "./societyContentTypes";
import type { HeadlineEntry } from "./figureRegistry";
import {
  IEA_2025_DEMAND_URL,
  IEA_2025_URL,
  IEA_2026_PDF_URL,
  IEA_2026_SOURCE_LABEL,
  IEA_NEWS_URL,
  IEA_POWERING_AI_URL,
} from "./aiPowerUseConstants";

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Data centres used about 485 TWh in 2025, around 1.5% of the world’s electricity.", detail: "That is 17% more than in 2024, while global electricity demand grew 3%. AI-focused data centres grew faster still, by 50%." },
  { headline: "The IEA expects the total to roughly double by 2030.", detail: "Its central case is 950 TWh, around 3% of global demand, with AI-focused data centres more than tripling to about 465 TWh. Data centres would still supply slightly less than 10% of the growth in global electricity demand." },
  { headline: "One question costs very little. The number and type of questions is what counts.", detail: "Company figures put a median text prompt at 0.24 Wh to 0.34 Wh. The IEA says video, reasoning and agent tasks can use hundreds or thousands of times more per query." },
  { headline: "The strain is local and physical.", detail: "Data centres can be 20–30% of electricity demand in the regions where they cluster. Grid connections, transformers, gas turbines and memory chips are all bottlenecks." },
];

export const ONE_LINE_SUMMARY =
  "Data centres used about 485 TWh of electricity in 2025 and the IEA expects about 950 TWh in 2030. Text queries are cheap one by one. The totals come from volume, heavier tasks and the AI-focused data centres being built.";

export const CAN_SAY: readonly string[] = [
  "How much electricity data centres used in 2025, and how fast the IEA expects that to grow.",
  "That AI-focused data centres are growing faster than data centres as a whole.",
  "That one short text query uses very little, and that heavier uses use far more.",
];

export const CANNOT_SAY: readonly string[] = [
  "How much of that electricity is “AI”. The IEA counts AI-focused data centres as a group, defined by their accelerator-equipped servers.",
  "What one person’s AI use costs in electricity. Company figures are medians or averages for text prompts, not anyone’s total.",
  "How the total splits between training and use. The IEA says the balance has shifted decisively towards use, but we saw no split.",
  "What happens after 2030. The IEA says uncertainty widens, with a possible upside.",
  "Anything beyond data-centre electricity, such as water use or the energy used to make chips.",
  "Any forecast of ours. Every projection here is the IEA’s, and is labelled as one.",
];

export const SCALE_POINTS: readonly PointEntry[] = [
  { headline: "Fast growth from a small base.", detail: "Data centres were slightly more than 1.5% of global electricity in 2025 and are projected at around 3% in 2030. They are projected to supply slightly less than 10% of the growth in global demand to 2030." },
  { headline: "AI is the fastest-growing part.", detail: "AI-focused data centres grew 50% in 2025, against 17% for data centres overall. Their consumption is projected to more than triple by 2030." },
  { headline: "A few companies are a large part.", detail: "Four major hyperscalers used 110 TWh in 2024, up 20% on the year before." },
  { headline: "Scenarios matter more than any single number.", detail: "The IEA’s 2025 report gave four cases. For 2035 it showed about 970 TWh in the High Efficiency case, about 1,200 TWh in the Base case and more than 1,700 TWh in the Lift-Off case." },
];

export const TASK_POINTS: readonly PointEntry[] = [
  { headline: "Efficiency per task is improving very fast.", detail: "The IEA says energy per AI task has fallen by at least an order of magnitude a year in recent years. Google reported a 33-fold fall per prompt over the 12 months to May 2025." },
  { headline: "Short text queries are small.", detail: "Reported figures are 0.24 Wh (Google, median Gemini text prompt), 0.34 Wh (OpenAI, average ChatGPT query) and 0.34 Wh (a Microsoft Research estimate for large models). If every conventional internet search were a simple AI text query, the total would be under 4 TWh a year." },
  { headline: "Heavier tasks change the picture.", detail: "Video generation, reasoning and agent tasks can use hundreds or thousands of times more energy per query than simple text. High-resolution image generation may need about ten times more." },
  { headline: "Use is growing as costs fall.", detail: "Major model providers reported threefold growth in active users and fivefold growth in revenue over the past year. The IEA says total AI electricity use is set to keep rising in the near term despite efficiency gains." },
  { headline: "Chips help, more slowly.", detail: "Leading AI chips have improved performance per watt by roughly 30–40% a year over the past decade, with gains gradually slowing." },
];

export const WHERE_POINTS: readonly PointEntry[] = [
  { headline: "New AI sites sit near cities.", detail: "19 of 21 large AI data centres under construction in the United States are within 65 km of a city of at least 100,000 people. Each is estimated to use as much electricity as 600,000 to 5 million households once complete." },
  { headline: "Power per rack is rising fast.", detail: "A single advanced rack could draw as much peak power as 65 households by 2027. AI server power density rose 11 times between 2020 and 2025 and is set to rise a further four times by 2027." },
  { headline: "Loads swing sharply.", detail: "Server load can swing by more than 50% of rated capacity within a second, which is why batteries are becoming part of data centres." },
  { headline: "Capacity is being built quickly.", detail: "AI factory capacity more than tripled in 18 months, and the 21 large US sites analysed have passed 6 GW between them." },
  { headline: "Queues are not demand.", detail: "In Texas the large-load queue grew from 63 GW to over 230 GW between December 2024 and January 2026, against an all-time peak demand of 85 GW. The IEA warns that only part of such pipelines may be built." },
];

export const POWERING_POINTS: readonly PointEntry[] = [
  { headline: "Renewables and gas lead, with nuclear later.", detail: "The IEA’s 2025 report had renewables meeting half of the growth in data centre demand and natural gas adding 175 TWh. Data centre agreements with small modular reactors reached 45 GW by the end of 2025, but the first projects are not expected until around 2030." },
  { headline: "Contracts are not the same as the power used.", detail: "Data centre operators signed more than 40 TWh of renewable power agreements in 2025, and the tech sector made up around 40% of corporate renewable agreements worldwide. The IEA notes that electricity actually used is often supplied by the grid, whose mix can differ." },
  { headline: "Onsite gas is a stopgap in the United States.", detail: "15–27 GW of onsite gas may power data centres by 2030. Reliable onsite supply needs 30–70% more generation than demand, and the IEA doubts it is faster to build, given a supply crunch for gas turbines." },
  { headline: "Storage is becoming standard.", detail: "20–25 GW of battery storage could be installed in data centres by 2030, which could make them useful to the grid if the incentives are right." },
  { headline: "Emissions roughly double but stay small.", detail: "Data centre emissions are projected to double to around 350 million tonnes in 2035, about 2% of global electricity-sector emissions." },
  { headline: "Prices depend on the place.", detail: "The IEA says data centres need not raise electricity prices where supply is ample, but can in tight systems because they trigger new generation and grid investment. How costs are shared is a policy choice." },
];

export const MONEY_POINTS: readonly PointEntry[] = [
  { headline: "The spending is enormous.", detail: "The largest technology companies spent over USD 400 billion in 2025 and the IEA expects a 75% rise in 2026, to USD 715 billion for leading hyperscalers and neo-clouds. Its growth estimate implies USD 3.9 trillion of data centre investment from 2026 to 2030." },
  { headline: "Investors have become more cautious.", detail: "Market value across the AI chain stopped growing after October 2025, except for chip makers. AI companies issued around USD 200 billion of debt in 2025." },
  { headline: "Physical bottlenecks set the pace.", detail: "Transformers take two to three years to deliver, gas turbines around five, and grid connections can take five to ten years in many places. Gas turbine orders surged 70% in 2025, and a high-bandwidth memory shortage is expected to last at least to the end of 2027." },
  { headline: "Local opposition is real.", detail: "20 US projects worth USD 98 billion were blocked or delayed in the second quarter of 2025, according to Data Center Watch as cited by the IEA." },
];

export const UPSIDE_POINTS: readonly PointEntry[] = [
  { headline: "AI could also save energy.", detail: "Well-documented uses could save over 13 EJ by 2035, about 3% of global final energy consumption, if barriers are overcome. AI-enabled optimisation could cut energy costs by 3–10 percentage points in energy-intensive industries." },
  { headline: "Growth from AI adds less energy demand than growth itself.", detail: "An AI-driven growth boost could raise global energy demand in 2035 by 1–4% compared with no boost. The IEA says energy policy and technology matter more." },
  { headline: "Energy firms are slow to adopt.", detail: "Only 10% of global electricity consumption is covered by open electricity data policies, and the IEA names a lack of digital skills as the largest barrier." },
];

export const READER_ACTIONS: readonly ReaderActions[] = [
  { reader: "Students and writers", actions: ["Say “data centres” for the total and “AI-focused data centres” for the AI subset.", "Give the year, and say whether a number is measured, projected or a scenario.", "Do not quote a per-query figure as a person’s footprint."] },
  { reader: "Journalists and analysts", actions: ["Treat grid queues and project pipelines as requests, not demand.", "Check whether a figure comes from the IEA or from a company disclosure the IEA reports.", "Note that 2025 totals are estimates and the IEA gives them in two slightly different forms."] },
  { reader: "Residents and local councillors", actions: ["Ask a developer for the planned load, connection date, power source and who pays for grid upgrades.", "The IEA says cost allocation is ultimately a policy choice, so ask your utility regulator how it is being decided.", "This is general guidance, not legal advice."] },
  { reader: "Everyday users", actions: ["A short text query is small. Long video or heavy multi-step tasks use far more.", "Pick the tool that fits the job. We make no claim about your own footprint."] },
];

export const HEADLINES: readonly HeadlineEntry[] = [
  {
    id: "country-sized",
    headline: "“AI will use as much electricity as a country”",
    figureIds: ["dc-2030", "dc-2030-2025report", "ai-2030"],
    measures: "All data centres, not just AI, are projected to use about 950 TWh in 2030. The IEA’s 2025 report compared its 945 TWh version with Japan’s current total.",
    notClaim: "It is a Base Case projection for all data centres. AI-focused data centres are projected at about 465 TWh.",
    technical: "The IEA gives four cases and says uncertainty widens after 2030. The 2030 figure changed from 945 TWh to about 950 TWh between reports.",
  },
  {
    id: "global-share",
    headline: "“Data centres are 1.5% of the world’s electricity”",
    figureIds: ["dc-share-2025", "cluster-share"],
    measures: "Data centres were slightly more than 1.5% of global electricity demand in 2025.",
    notClaim: "A global share hides local concentration. In the regions where data centres cluster, they can be 20–30% of demand.",
    technical: "The report notes that clusters make reliable, quick and affordable supply harder for local grids.",
  },
  {
    id: "ai-growth",
    headline: "“AI electricity use grew 50% last year”",
    figureIds: ["ai-growth-2025", "dc-growth-2025", "global-growth-2025"],
    measures: "Electricity consumption of AI-focused data centres rose 50% in 2025, against 17% for all data centres and 3% for global demand.",
    notClaim: "It is growth from a smaller base, not a count of queries and not AI’s share of world electricity.",
    technical: "“AI-focused” is the IEA’s grouping of data centres with large numbers of accelerator-equipped servers, so AI run elsewhere is not separated out.",
  },
  {
    id: "per-query",
    headline: "“A ChatGPT question uses 0.34 Wh”",
    figureIds: ["q-openai", "q-google", "q-blended", "heavy-multiple"],
    measures: "OpenAI puts an average ChatGPT query at 0.34 Wh and Google puts a median Gemini text prompt at 0.24 Wh. The IEA uses a generous 1 Wh blend for illustration.",
    notClaim: "These are 2025 figures for text. Video, reasoning and agent tasks can use hundreds or thousands of times more, and none of this is a person’s total.",
    technical: "The IEA notes the figures are likely already lower, and that the companies have not said how their planned capacity splits across workloads.",
  },
  {
    id: "electricity-bills",
    headline: "“Data centres are pushing up your electricity bill”",
    figureIds: ["dc-growth-share", "cluster-share"],
    measures: "The IEA finds no single answer. The effect depends on how tight supply is, the shape of the new load and policy choices.",
    notClaim: "Neither “always” nor “never”. Data centres supply slightly less than 10% of global demand growth to 2030 but far more locally.",
    technical: "Peak load is often uncertain because data centres fill gradually and often oversize their grid connections at first, which can misalign grid investment.",
  },
  {
    id: "net-saver",
    headline: "“AI will save more energy than it uses”",
    figureIds: ["savings-ej", "savings-share", "open-data"],
    measures: "The IEA says well-documented AI uses could save over 13 EJ of energy by 2035, about 3% of global final energy consumption, if barriers are overcome.",
    notClaim: "It is a potential saving of final energy, a different measure from data-centre electricity, so the two cannot be netted directly.",
    technical: "Barriers include skills and data: only 10% of global electricity consumption is covered by open data policies.",
  },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "How much electricity does AI use?", answer: "The IEA gives no single all-in AI number in the text we used. It reports data centres overall, at 485 TWh in 2025, and AI-focused data centres as a faster-growing group, projected at about 465 TWh in 2030." },
  { question: "Is one chatbot question bad for the climate?", answer: "One short text query is small: reported at 0.24–0.34 Wh. The concern is volume and heavier uses, not a single question. We make no claim about any individual’s footprint." },
  { question: "Why do you give 945 and 950 for 2030?", answer: "The IEA’s April 2025 report said around 945 TWh and its April 2026 update says roughly 950 TWh. It describes the central projection as close to its earlier trajectory." },
  { question: "What is an AI-focused data centre?", answer: "As the IEA uses the term, one with large numbers of servers fitted with specialised accelerators designed to train and run AI models." },
  { question: "Do data centres drive most electricity growth?", answer: "No. The IEA’s 2025 report put them at around one-tenth of global demand growth to 2030, less than industrial motors, air conditioning or electric vehicles. The 2026 update says slightly less than 10%." },
  { question: "Will efficiency fix the problem?", answer: "It slows growth. The IEA says the energy per task is falling fast, but use is rising and heavier tasks are spreading, so total AI electricity use is set to rise in the near term." },
  { question: "Is the Texas queue real demand?", answer: "Not all of it. A queue records requests to connect, and the IEA says only a limited and uncertain share of project pipelines may be realised." },
  { question: "Where do the 2025 figures come from?", answer: "They are the IEA’s estimates. The summary gives 485 TWh for 2025 and Section 1 says almost 500, so we use the summary figure and say so in the ledger." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Terawatt-hour", meaning: "A billion kilowatt-hours. Used for national and global electricity totals." },
  { term: "Gigawatt", meaning: "A million kilowatts. Used for the size of power plants and data centres." },
  { term: "Watt-hour", meaning: "The energy a one-watt load uses in one hour. Used here for a single AI query." },
  { term: "Data centre", meaning: "A building of computers that runs online services, including AI." },
  { term: "AI-focused data centre", meaning: "A data centre with many accelerator-equipped servers built for AI." },
  { term: "Hyperscaler", meaning: "A very large cloud company, such as Amazon Web Services, Microsoft, Alphabet or Meta." },
  { term: "Inference", meaning: "Day-to-day use of a trained AI model, as opposed to training it." },
  { term: "Base Case", meaning: "The IEA’s central projection. Other cases show higher or lower outcomes." },
  { term: "Power purchase agreement", meaning: "A long-term contract to buy electricity from a generator." },
  { term: "Order of magnitude", meaning: "A factor of ten." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Every projection here is the IEA’s, mostly its Base Case. Other cases differ widely, and the IEA says uncertainty grows after 2030.",
  "Data on the sector is patchy. The IEA says there are no comprehensive statistics on how often or how deeply AI is used.",
  "2025 totals are estimates. The summary gives 485 TWh and Section 1 gives almost 500, so we flag the difference in the ledger.",
  "Per-query figures are company disclosures from 2025, measured in different ways, and the IEA says they are likely already lower.",
  "We read the IEA 2026 report text up to the start of its Section 5, plus its executive summary. The 2025 report and the news release we read only as web extracts, and the ledger marks those rows.",
  "This page is general information, not energy, investment or planning advice.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "International Energy Agency", title: "Key Questions on Energy and AI (16 April 2026)", href: IEA_2026_PDF_URL, use: "Most figures in the ledger" },
  { publisher: "International Energy Agency", title: "Data centre electricity use surged in 2025 (news release, 16 April 2026)", href: IEA_NEWS_URL, use: "Global electricity demand growth in 2025" },
  { publisher: "International Energy Agency", title: "Energy and AI (April 2025)", href: IEA_2025_URL, use: "2035 scenarios, renewables and gas shares, the household comparison. Read as web extracts" },
  { publisher: "International Energy Agency", title: "Energy and AI: energy demand from AI (April 2025)", href: IEA_2025_DEMAND_URL, use: "Scenario figures for 2035. Read as a web extract" },
  { publisher: "International Energy Agency", title: "Powering Artificial Intelligence (G7 France presidency)", href: IEA_POWERING_AI_URL, use: "A pointer only. We have not read it, and no figure here comes from it" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/pros-and-cons-of-ai", label: "Pros and cons of AI: an honest scorecard", note: "Article 33" },
  { href: "/society/ten-places-you-meet-ai", label: "Ten places you meet AI in a normal day", note: "Article 31" },
  { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs? What current surveys actually say", note: "Article 34" },
  { href: "/society/ai-adoption-data", label: "How fast is AI spreading? The adoption data explained", note: "Article 41" },
  { href: "/about/source-policy", label: "Source policy", note: "How we choose and label sources" },
];

export const SOURCE_LABEL = IEA_2026_SOURCE_LABEL;

function pointTexts(points: readonly PointEntry[]): string[] {
  return points.flatMap((point) => [point.headline, point.detail]);
}

/** All prose on the page that can contain a number. Feed to findUnledgeredCopyNumbers in a test. */
export const ALL_COPY_TEXTS: readonly string[] = [
  ...pointTexts(SUMMARY_POINTS),
  ONE_LINE_SUMMARY,
  ...CAN_SAY,
  ...CANNOT_SAY,
  ...pointTexts(SCALE_POINTS),
  ...pointTexts(TASK_POINTS),
  ...pointTexts(WHERE_POINTS),
  ...pointTexts(POWERING_POINTS),
  ...pointTexts(MONEY_POINTS),
  ...pointTexts(UPSIDE_POINTS),
  ...READER_ACTIONS.flatMap((group) => group.actions),
  ...HEADLINES.flatMap((entry) => [entry.headline, entry.measures, entry.notClaim, entry.technical]),
  ...FAQ.flatMap((entry) => [entry.question, entry.answer]),
  ...GLOSSARY.map((entry) => entry.meaning),
  ...WHAT_CAN_GO_WRONG,
];