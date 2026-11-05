import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  ReaderActions,
  RelatedLink,
  SourceEntry,
} from "./societyContentTypes";
import type { HeadlineEntry } from "./bankingFinanceData";
import { FSB_PRACTICES_URL, SURVEY_2024_URL, SURVEY_TITLE, SURVEY_URL, SURVEY_PUBLISHER } from "./bankingFinanceConstants";

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "AI use is near-universal among the firms that answered.", detail: "86% of the 196 firms that responded say they use AI, up from 75% in 2024. All responding UK banks and international banks do." },
  { headline: "Most of it sits in back-office work.", detail: "Operations and IT hold about 31% of reported AI systems, and no other business area holds more than 11%. Enterprise productivity, such as coding assistants and summaries, is the most common use, at 86%." },
  { headline: "AI agents are common, but they mostly advise.", detail: "80% of full-survey firms have agents deployed, but only 2% report an agent with broad autonomy. Even counting plans, no more than 9% expect agents to approve customer outcomes, handle payments, place trades or change limits." },
  { headline: "More of the important AI now comes from suppliers.", detail: "Third parties supply 39% of reported systems and 53% of the high-materiality ones. 24% of firms report deep knowledge of their high-materiality third-party systems, against 77% for ones built in-house." },
];

export const ONE_LINE_SUMMARY =
  "86% of 196 responding UK financial firms said they used AI in the 2026 survey, up from 75% in 2024. That is firms, not customers, and the two surveys did not ask the same firms.";

export const CAN_SAY: readonly string[] = [
  "How responding UK financial firms describe their own use of AI, as reported in October 2026.",
  "That use is widespread, concentrated in operations and IT, and that agents are mostly advisory.",
  "That firms rely more on outside suppliers than in 2024, and report more checks before launch than after.",
];

export const CANNOT_SAY: readonly string[] = [
  "How many UK financial firms use AI. The survey covers 196 responders, not every firm.",
  "What happens to customers. The survey asks firms, not customers, and measures no outcomes such as errors, fraud caught or complaints.",
  "Anything outside the UK. Other countries need their own regulator or central-bank data.",
  "How well the AI works or whether it saves money. Benefit and risk scores are firms' own ratings.",
  "The exact change since 2024. The two surveys did not have the same respondents or identical questions.",
  "What the numbers will be next year. We show no forecast, and firms' own expectations are labelled as expectations.",
];

export const WHO_POINTS: readonly PointEntry[] = [
  { headline: "Half the responders are investment and capital-markets firms.", detail: "About 51% of the 196 responders are in that group, and most of them are small. Banks and insurers are a smaller part of the sample, so the overall 86% is not a banking figure. All responding UK banks and international banks reported using AI, as did 93% of insurers." },
  { headline: "Smaller firms answered a shorter form.", detail: "Firms with fewer than 100 employees could choose a short questionnaire. Of those, 73% used AI, and 58% of those users mainly used general-purpose large language models." },
  { headline: "Most percentages come from the full survey.", detail: "105 of the 196 firms completed the full questionnaire. Unless the report says otherwise, its percentages, and ours, are shares of full-survey respondents who answered that question." },
];

export const ADOPTION_NOTES: readonly PointEntry[] = [
  { headline: "Up, but not like for like.", detail: "Use rose from 58% in 2022 to 75% in 2024 and 86% in 2026 among responders. The report warns that the populations differ, so read the direction, not the exact gap." },
  { headline: "Almost every full-survey firm has something in production.", detail: "94% of full-survey firms had at least one AI system in production." },
  { headline: "A few firms hold many systems.", detail: "The ten firms reporting the most systems held 43% of all reported systems, so the totals are shaped by a handful of heavy users." },
];

export const WHERE_POINTS: readonly PointEntry[] = [
  { headline: "Back office first.", detail: "Operations and IT held about 31% of reported systems in 2026, up from about 22% in 2024." },
  { headline: "Generative AI is now most of the systems counted.", detail: "56% of reported systems were generative AI. In 2024 the survey counted foundation models at 17% of use cases. The report says the two measures are not directly comparable, so we draw no line between them." },
  { headline: "Customer decisions are a smaller use.", detail: "28% use AI for customer decisioning today (38% with planned use), against 86% for enterprise productivity." },
  { headline: "Few systems are rated high materiality.", detail: "Firms rated 7% of systems high materiality, down from 16%, though the absolute number rose. Ten firms held 62% of the high-materiality ones." },
];

export const AGENT_POINTS: readonly PointEntry[] = [
  { headline: "The autonomy levels overlap.", detail: "A firm can run agents at several levels, so 80%, 46%, 22% and 2% add up to far more than 100%. They are four separate questions, not slices of one pie." },
  { headline: "More autonomy shows up in a few areas.", detail: "Where agents had more autonomy, they were most likely in Operations and IT, Risk and Compliance, and Sales and Marketing." },
  { headline: "Plans stay cautious.", detail: "Even including plans for the next 12 months, no more than 9% of firms expected agents to approve or decline customer outcomes, place trades, handle payments or change limits and controls." },
];

export const SUPPLIER_POINTS: readonly PointEntry[] = [
  { headline: "Concentration is highest in cloud and compute.", detail: "The three largest cloud and compute providers hold 79% of reported relationships, and 98% of firms use at least one of them. For model API and hosting providers the top three hold 54%." },
  { headline: "Some of these relationships are hard to leave.", detail: "37% of reported cloud and compute relationships were judged both highly critical and hard to substitute, and only 35% of those had a tested exit plan. For model API and hosting providers the first figure was 14%." },
  { headline: "Firms know less about outside systems.", detail: "24% report deep knowledge of high-materiality third-party systems, against 77% for in-house ones. 81% rely on vendor assurance and contracts for the third-party ones." },
  { headline: "Extra checks are common, resilience checks less so.", detail: "77% add AI-specific risk steps for third-party AI. 27% add enhanced resilience steps such as joint incident testing or exit planning." },
  { headline: "What holds firms back.", detail: "40% name information-security and operational-resilience concerns a major constraint on third-party AI, and 34% name limited transparency into those systems." },
];

export const RISK_POINTS: readonly PointEntry[] = [
  { headline: "Checks come earlier than reviews.", detail: "95% report human review or approval for higher-risk uses, but 51% report periodic review or recertification afterwards. 49% have incident playbooks, and 39% routinely monitor customer-impact metrics." },
  { headline: "Governance is formal on paper.", detail: "94% have firm-wide AI policies or standards and 84% have a central governance forum." },
  { headline: "Mitigations are uneven.", detail: "91% have mitigations for data protection and security risk, but 69% for model behaviour and reliability." },
  { headline: "Cyber risk is the systemic worry.", detail: "57% rate cyber risk amplification a high or severe concern today, and 80% expect to in one to three years. 88% expect frontier AI cyber capabilities to have a moderate or high impact on their risk profile within two years, and 64% say vulnerability management and patching has had the biggest rise in management attention." },
  { headline: "Rules and legacy systems both slow firms down.", detail: "42% see UK data protection rules as a high compliance burden and 29% say the same of international regulation, while 28% report no regulatory constraints. 23% name integration into existing processes a large constraint and 22% name legacy systems." },
];

export const CUSTOMER_POINTS: readonly PointEntry[] = [
  { headline: "The survey is about firms' systems, not customers' experience.", detail: "It records what firms say they run and check. It does not record errors, fair treatment, refunds or complaints." },
  { headline: "Firms rate conduct risk as their lowest AI risk today.", detail: "Consumer and market conduct had the lowest average risk score of the eight listed. That is a self-rating, and it is expected to rise." },
  { headline: "Customer-facing use is growing from a small base.", detail: "16% use agents for automated customer communications now, rising to 34% with planned use. Only 39% routinely monitor customer-impact metrics for AI." },
];

export const READER_ACTIONS: readonly ReaderActions[] = [
  { reader: "Customers of banks and insurers", actions: ["If a decision about you looks wrong, ask the firm to explain it and use its complaints process.", "Keep copies of messages when an automated chat or letter gives you a decision.", "This page is not legal or financial advice."] },
  { reader: "Students and writers", actions: ["Say “responding UK financial firms”, not “banks” or “the industry”.", "Give the survey year and the base, such as full-survey respondents.", "Do not present 2024 and 2026 as the same firms measured twice."] },
  { reader: "Journalists and analysts", actions: ["Say whether a figure is a share of firms, systems or relationships.", "Treat benefit and risk scores as opinions.", "Check chart descriptions against report text. We found small differences and list them in the ledger."] },
  { reader: "Small business owners using AI suppliers", actions: ["Ask a supplier where your data goes and how you would leave.", "Do not assume large-firm checks apply to a small supplier.", "This is general practice, not a survey finding."] },
];

export const HEADLINES: readonly HeadlineEntry[] = [
  {
    id: "firms-using-ai",
    headline: "“86% of financial firms use AI”",
    figureIds: ["adoption-2026", "respondents-total", "sector-investment-count"],
    measures: "Of the 196 UK firms that answered, 86% said they use AI.",
    notClaim: "It is not 86% of all UK financial firms, and not 86% of banks. Half the responders are investment and capital-markets firms, many of them small.",
    technical: "Compare with 2024 only with caution, because respondents and scope differ. The sector mix drives the headline: all responding UK banks and international banks said yes.",
  },
  {
    id: "firms-with-agents",
    headline: "“80% of firms have AI agents”",
    figureIds: ["agents-deployed", "agents-planned", "agent-type-client-facing-current"],
    measures: "80% of full-survey respondents have at least one AI agent deployed, and a further 14% plan to within a year.",
    notClaim: "It does not mean agents do 80% of the work. Most deployed agents only recommend actions, and people decide.",
    technical: "The base is full-survey respondents. Enterprise and coding agents were the most widely deployed types, and client-facing agents were less common.",
  },
  {
    id: "broad-autonomy",
    headline: "“Only 2% give AI broad autonomy”",
    figureIds: ["autonomy-all-broad-autonomy", "autonomy-all-conditional-autonomy", "autonomy-all-constrained-execution"],
    measures: "2% report an agent that can start and carry out actions with little real-time human involvement.",
    notClaim: "It does not mean 98% use no autonomous agents. 46% report agents acting within set limits and 22% report conditional autonomy.",
    technical: "The levels overlap, because a firm can report several. The four figures add up to more than 100%, so do not subtract one from another.",
  },
  {
    id: "third-party-ai",
    headline: "“AI is increasingly bought, not built”",
    figureIds: ["tp-systems-2026", "tp-highmat-2026", "understanding-tp-deep", "understanding-internal-deep"],
    measures: "Suppliers provide 39% of reported AI systems and 53% of the high-materiality ones.",
    notClaim: "It does not mean firms have handed over responsibility. It does show they report knowing less about those systems: 24% have deep knowledge, against 77% for in-house ones.",
    technical: "Shares count systems as firms reported them. A few firms report very many, and the ten with the most hold 43% of all systems, so they weigh heavily.",
  },
  {
    id: "governance",
    headline: "“94% of firms have AI policies”",
    figureIds: ["gov-policies", "control-pre-human", "control-periodic-review"],
    measures: "94% report firm-wide AI policies, principles or standards.",
    notClaim: "A policy shows intent, not performance. Checks before launch are more common than reviews afterwards: 95% against 51%.",
    technical: "All controls are self-reported. Nothing in the survey tests whether a control works.",
  },
  {
    id: "genai-share",
    headline: "“Generative AI is 56% of AI systems”",
    figureIds: ["genai-share", "foundation-share-2024", "genai-top-ten-share"],
    measures: "56% of all reported AI systems are generative AI.",
    notClaim: "It counts systems, not spending, staff time or customers served. Do not set it against the 17% foundation-model figure from 2024: the report says they are not directly comparable.",
    technical: "Counting systems treats a small tool and a core platform alike, and ten firms hold 44% of the generative AI systems.",
  },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "How many banks use AI?", answer: "All responding UK banks and international banks said they use AI. That covers 23 UK banks and 21 international banks and broker/dealers that answered, a small part of the 196 responders, so it is not a count of every bank." },
  { question: "Is 86% the share of UK financial firms using AI?", answer: "No. It is the share of the 196 firms that responded. Firms chose to take part, and the report says to read the results as evidence from participating firms, not a complete picture of the sector." },
  { question: "Why not just say use is up 11 points since 2024?", answer: "Because the 2026 and 2024 responders are not the same firms, and some questions changed. We show the difference as our own arithmetic, from 75% to 86%, with the report's caution beside it." },
  { question: "What is an AI agent here?", answer: "The report describes AI agents as software that perceives and acts on its environment with some autonomy, using tools to reach goals. That is a narrower idea than a chatbot that only answers questions." },
  { question: "Does 2% mean firms rarely trust agents?", answer: "It means 2% report broad autonomy. 46% report agents executing within set limits and 22% report conditional autonomy. The levels overlap, so they cannot be added." },
  { question: "What does high materiality mean?", answer: "Firms judged this themselves, so what counts as high can differ between firms. The report gives the 7% figure as the share of reported systems that firms assessed that way." },
  { question: "Does this show AI is safe or risky in finance?", answer: "No. It shows what firms say they use, check and worry about. It measures no outcomes for customers or for the financial system." },
  { question: "Where do the 2024 and 2022 figures come from?", answer: "From the 2026 report's own comparisons. The 2024 cloud-concentration figure of 72% is read from a chart description, and the ledger says so." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "AI system", meaning: "A machine-based system that infers from its input how to produce outputs such as predictions, content, recommendations or decisions." },
  { term: "Generative AI", meaning: "AI that creates new text, images, audio or code from a request." },
  { term: "AI agent", meaning: "Software that acts toward a goal with some autonomy, using tools as needed." },
  { term: "Autonomy", meaning: "How much an agent can do without a person approving each step." },
  { term: "Materiality", meaning: "How important a system is to the firm, as the firm itself judges it." },
  { term: "Third-party implementation", meaning: "An AI system supplied by an outside vendor rather than built in-house." },
  { term: "Concentration", meaning: "How much of a market sits with a few providers." },
  { term: "Exit plan", meaning: "A plan for moving away from a supplier without breaking the service." },
  { term: "Percentage point", meaning: "The difference between two percentages. A rise from 75% to 86% is 11 points." },
  { term: "Base", meaning: "The group a percentage is taken from, such as firms, systems or relationships." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "This is one survey of 196 firms that chose to respond, and every answer is self-reported.",
  "Comparisons with 2024 and 2022 are not like for like, because the respondents and some questions changed.",
  "A few figures differ slightly between the report text and its chart descriptions. We use the text and flag each case in the ledger.",
  "The explanations are our reading of the report. Check the original before you quote a figure.",
  "We opened the report on the date shown at the top. If the Bank and FCA revise it, our figures may need updating.",
  "This page is general information, not legal, financial or career advice.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: SURVEY_PUBLISHER, title: SURVEY_TITLE, href: SURVEY_URL, use: "Every figure in the ledger" },
  { publisher: SURVEY_PUBLISHER, title: "Artificial intelligence in UK financial services - 2024", href: SURVEY_2024_URL, use: "Context only. 2024 figures here are as restated in the 2026 report" },
  { publisher: "Financial Stability Board", title: "Sound Practices for Responsible Adoption of Artificial Intelligence: final report", href: FSB_PRACTICES_URL, use: "A pointer for international context. We have not read the full report, and no figure here comes from it" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/ai-adoption-data", label: "How fast is AI spreading? The adoption data explained", note: "Article 41: people, not firms" },
  { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs? What current surveys actually say", note: "Article 34" },
  { href: "/society/pros-and-cons-of-ai", label: "Pros and cons of AI: an honest scorecard", note: "Article 33" },
  { href: "/society/ten-places-you-meet-ai", label: "Ten places you meet AI in a normal day", note: "Article 31" },
  { href: "/about/source-policy", label: "Source policy", note: "How we choose and label sources" },
];

function pointTexts(points: readonly PointEntry[]): string[] {
  return points.flatMap((point) => [point.headline, point.detail]);
}

/** All prose on the page that can contain a number. Feed to findUnledgeredPercentages in a test. */
export const ALL_COPY_TEXTS: readonly string[] = [
  ...pointTexts(SUMMARY_POINTS),
  ONE_LINE_SUMMARY,
  ...CAN_SAY,
  ...CANNOT_SAY,
  ...pointTexts(WHO_POINTS),
  ...pointTexts(ADOPTION_NOTES),
  ...pointTexts(WHERE_POINTS),
  ...pointTexts(AGENT_POINTS),
  ...pointTexts(SUPPLIER_POINTS),
  ...pointTexts(RISK_POINTS),
  ...pointTexts(CUSTOMER_POINTS),
  ...READER_ACTIONS.flatMap((group) => group.actions),
  ...HEADLINES.flatMap((entry) => [entry.headline, entry.measures, entry.notClaim, entry.technical]),
  ...FAQ.flatMap((entry) => [entry.question, entry.answer]),
  ...GLOSSARY.map((entry) => entry.meaning),
  ...WHAT_CAN_GO_WRONG,
];