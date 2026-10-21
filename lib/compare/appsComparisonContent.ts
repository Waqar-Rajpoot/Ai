import type { TopicCard } from "../learn/foundationsContent";
import type { DefinitionItem, FaqItem } from "./compareStandards";

export interface VerdictSlot {
  id: string;
  label: string;
  status: string;
  howWeDecide: string;
}

export interface AppSituation {
  id: string;
  situation: string;
  compareFirst: string;
  links: readonly { label: string; href: string }[];
}

/** Blueprint 5.3 summary box: Best for, Best value, Best for privacy. No winner is named before the tests. */
export const VERDICT_SLOTS: readonly VerdictSlot[] = [
  { id: "best-for", label: "Best for", status: "Decided after our test run", howWeDecide: "We run the seven-point scorecard on what each app offers on the test day, with the model and settings recorded." },
  { id: "best-value", label: "Best value", status: "Decided after our test run", howWeDecide: "We weigh cost per task and what each plan includes at its price, and compare free plans separately from paid ones." },
  { id: "best-privacy", label: "Best for privacy", status: "Decided after our test run", howWeDecide: "We read training settings, retention, deletion and data location on each provider's own page, and note ads in free tiers." },
];

export const SUBSCRIPTION_VS_API: readonly DefinitionItem[] = [
  { id: "subscription", term: "A chat subscription", description: "A flat monthly price for an app: the chat window, plan limits, and features such as voice, files and memory. This page compares these." },
  { id: "api", term: "The API", description: "Direct access for software, billed per token. It has no app around it. The model directory and API price table cover this." },
  { id: "separate", term: "They are separate products", description: "A subscription does not include API use, and API credit does not unlock a chat plan. Each has its own price and its own limits." },
  { id: "who", term: "Who needs which", description: "Most people who chat, write, study or work in documents need a subscription or a free plan. The API is for people building tools or automations." },
];

export const LIMIT_SHAPES: readonly DefinitionItem[] = [
  { id: "window", term: "Messages or work in a time window", description: "A cap on how much you can do per few hours or per day. Hitting it can mean waiting or paying for more." },
  { id: "model-access", term: "Model access by plan", description: "A free plan may give fewer uses of the strongest model than a paid one." },
  { id: "feature-caps", term: "Feature allowances", description: "Images, video, voice and deep research often have their own allowance, separate from chat." },
  { id: "files", term: "File and context size", description: "Maximum file size, page count and chat length decide whether your real documents fit." },
  { id: "multiples", term: "Usage multiples", description: "Heavy tiers are sold as multiples of a base allowance, such as 5x. Compare the multiple with the price multiple." },
];

export const PRIVACY_CHECKS: readonly string[] = [
  "Are your chats used to train models by default, and can you turn that off?",
  "Is there a temporary or incognito mode, and how long are those chats kept?",
  "How long is a chat kept after you delete it?",
  "Where is your data stored (data location)?",
  "Do business or team plans treat data differently from personal plans?",
  "Does the free plan show ads, and does the provider say how ads relate to your chats?",
  "What happens to files and connected apps you give the app access to?",
];

export const APP_SITUATIONS: readonly AppSituation[] = [
  { id: "free", situation: "I just want to try AI without paying", compareFirst: "The free plans of two apps, using the same three or four of your real tasks. Note where each one stops and whether it shows ads.", links: [{ label: "Free-plan limits", href: "/prices/free-limits" }, { label: "Free vs paid AI", href: "/learn/foundations/free-vs-paid-ai" }] },
  { id: "cheapest", situation: "I want the lowest-cost paid step", compareFirst: "The entry plan on each app card above, and what it includes besides chat: storage, ads, usage. A cheaper plan with ads or lower limits is not always cheaper in practice.", links: [{ label: "Consumer plan table", href: "/prices/plans" }] },
  { id: "standard", situation: "I want one standard paid plan for everyday work", compareFirst: "The mainstream plan of each app: price, limits and the features you actually use. These are the plans most people mean by 'the paid version'.", links: [{ label: "Is AI worth paying for?", href: "/learn/practitioner/is-ai-worth-paying-for" }] },
  { id: "heavy", situation: "I code or use AI heavily every day", compareFirst: "The heavy-use tiers: usage per dollar, and which coding or agent tools each includes. See the heavy-tier table in the Limits section.", links: [{ label: "Best for coding", href: "/compare/best/coding" }, { label: "Best for agents", href: "/compare/best/agents" }] },
  { id: "storage", situation: "I already pay for cloud storage, or use a lot of it", compareFirst: "The notes column. Some plans list a storage allowance. Check whether it would replace a subscription you pay for now.", links: [{ label: "Consumer plan table", href: "/prices/plans" }] },
  { id: "private", situation: "I handle client, school or health information", compareFirst: "Read what never to paste, then compare training settings, retention and the business or team plan on each provider's own page.", links: [{ label: "What never to share with a chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" }, { label: "Privacy matrix", href: "/prices/privacy" }] },
  { id: "team", situation: "I am buying for a team", compareFirst: "Price per seat, the annual price, seat minimums and admin controls. Smallest team bills are in the plan table.", links: [{ label: "Subscription cost calculator", href: "/tools/subscription-cost-calculator" }] },
  { id: "student", situation: "I am a student", compareFirst: "Free plans first, then school policy. Study with AI without handing in its work as yours.", links: [{ label: "Best AI tools for students", href: "/compare/best/students" }, { label: "Study without cheating", href: "/learn/practitioner/use-ai-to-study-without-cheating" }] },
  { id: "web", situation: "I need answers that use current web information", compareFirst: "The web search row of the feature table: whether it is on by default and whether it shows sources.", links: [{ label: "Deep research modes", href: "/learn/practitioner/deep-research-modes" }] },
];

export const TRY_BEFORE_YOU_PAY: readonly TopicCard[] = [
  { id: "tasks", title: "Pick five real tasks", summary: "Use work you actually do: an email, a summary of a document, a study question, a small spreadsheet job." },
  { id: "free", title: "Run them on two free plans", summary: "Use the same wording on both. Save the answers side by side." },
  { id: "check", title: "Check the answers", summary: "Use the fact-checking routine on anything that matters. Note which answer you would send or submit." },
  { id: "limits", title: "Note where each one stops", summary: "Write down any limit you hit, any ad you saw and any feature you wanted that was missing." },
  { id: "decide", title: "Pay only if a limit blocks you", summary: "If a free plan does the job, stay on it. If not, compare the next paid step for the app that did best." },
];

export const SWITCHING_CHECKLIST: readonly string[] = [
  "Export your data and chats if the app offers it",
  "Save the prompts, instructions and custom setups you rely on, so you can re-create them",
  "Check privacy settings on the new app before you paste anything private",
  "Write down the renewal date, and cancel the old plan before it renews",
  "On an annual plan, check refund terms before you switch",
  "Run your five real tasks on the new app to confirm it does the job",
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Comparing one app's free plan with another app's paid plan.",
  "Treating a model's API price as the price of the app.",
  "Trusting an old price. The snapshot dates are shown, and plans change.",
  "Overlooking ads and data settings on free plans.",
  "Assuming the same plan name has the same limits in every country or on every date.",
  "Paying for a year before testing the app on your own tasks.",
  "Pasting private information before checking the privacy settings.",
];

export const APPS_FAQ: readonly FaqItem[] = [
  { id: "no-winner", question: "Why does the summary not name a winner yet?", answer: "A winner needs our own test run, with the model and settings recorded on the test day. Until then, the page gives you the plan facts we have and a way to decide for yourself.", link: { label: "How we test", href: "/about/how-we-test" } },
  { id: "prices", question: "Why might the prices differ from what I see?", answer: "These are US monthly prices from secondary sources, read on the dates shown. Your price can differ by country, tax, app-store billing or a promotion. Confirm on the provider's own page before you buy.", link: { label: "Consumer plan table", href: "/prices/plans" } },
  { id: "free-enough", question: "Is a free plan enough?", answer: "It can be, if your use is light. Try five real tasks and see whether you hit a limit. If you do not, there is no reason to pay.", link: { label: "Free vs paid AI", href: "/learn/foundations/free-vs-paid-ai" } },
  { id: "ads", question: "Do free plans show ads?", answer: "Our plan snapshot notes ads on some ChatGPT tiers. We have not collected ad information for the other apps, so check each provider's page and settings." },
  { id: "api", question: "Does a chat subscription include API use?", answer: "No. They are separate products with separate prices. The model directory shows API prices per million tokens.", link: { label: "Open the model directory", href: "/compare/models" } },
  { id: "annual", question: "Should I pay annually?", answer: "Annual billing lowers the monthly price on plans that offer it, as the plan table shows. You are committing for a year, so test first and check refund and renewal terms.", link: { label: "Avoiding surprise renewals", href: "/learn/foundations/free-vs-paid-ai" } },
  { id: "two-apps", question: "Can I use more than one app?", answer: "Yes. Many people try two free plans side by side. The same rule applies to every app: do not paste private data before you check its settings.", link: { label: "What never to share with a chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" } },
  { id: "grok-gap", question: "Why is Grok's plan data missing?", answer: "Our plan snapshot covers ChatGPT, Claude and Gemini only. Grok's API price is in the model directory. We add its plans once they are checked on the provider's own page." },
  { id: "apps-vs-models", question: "Is an app the same as a model?", answer: "No. An app is the product you chat in. A model is the engine behind it, and an app may let you choose between several. Reviews and the directory cover models, and this page covers apps.", link: { label: "Model reviews", href: "/compare/reviews" } },
  { id: "conflict", question: "Could the AI tools that help draft this site bias the comparison?", answer: "The editorial standards page lists which AI tools helped draft content, what they did and what a person edited. Payment, affiliate links and sponsorship never change a verdict.", link: { label: "Editorial standards", href: "/about/editorial-standards" } },
];

export const RELATED_LINKS: readonly { label: string; href: string }[] = [
  { label: "Consumer plan table", href: "/prices/plans" },
  { label: "Free-plan limits", href: "/prices/free-limits" },
  { label: "Feature matrix", href: "/prices/features" },
  { label: "Privacy matrix", href: "/prices/privacy" },
  { label: "Free vs paid AI (article 4)", href: "/learn/foundations/free-vs-paid-ai" },
  { label: "Is AI worth paying for? (article 16)", href: "/learn/practitioner/is-ai-worth-paying-for" },
  { label: "Best model right now, by job (article 14)", href: "/compare/best/by-job" },
  { label: "Subscription cost calculator", href: "/tools/subscription-cost-calculator" },
];