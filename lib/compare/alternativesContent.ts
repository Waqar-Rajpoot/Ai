import type { TopicCard } from "@/lib/learn/foundationsContent";
import type { FaqItem, RelatedLink } from "./openVsClosedContent";

export interface SwitchReason {
  id: string;
  title: string;
  summary: string;
  checks: readonly string[];
  lookAt: readonly { label: string; href: string }[];
  tradeOff: string;
}

export interface SummaryPoint {
  id: string;
  label: string;
  text: string;
}

/** Date this hub was last updated. The hub states no prices or outside figures. */
export const ALTERNATIVES_HUB_UPDATED_ON = "October 21, 2026";
/** Placeholder byline until the author and editor are named. */
export const ALTERNATIVES_HUB_AUTHOR = "Editorial team";
export const ALTERNATIVES_HUB_READ_MINUTES = 9;

export const ALTERNATIVES_SECTIONS: readonly { id: string; label: string }[] = [
  { id: "short-answer", label: "Short answer" },
  { id: "all-alternatives", label: "All alternatives" },
  { id: "how-pages-work", label: "How a page works" },
  { id: "why-switch", label: "Why people switch" },
  { id: "switch-or-stay", label: "Switch or stay" },
  { id: "how-we-choose", label: "How we choose" },
  { id: "checklist", label: "Switching checklist" },
  { id: "faq", label: "FAQ" },
];

export const SUMMARY_POINTS: readonly SummaryPoint[] = [
  { id: "what", label: "What this hub is", text: "The home for every 'Alternatives to…' page. Each page covers one app or model and lists options for readers who are thinking of leaving it." },
  { id: "get", label: "What you get", text: "For each tool: why people leave it, a table of options with price and what you give up, a switching checklist and a verdict." },
  { id: "not", label: "What it is not", text: "Not a ranking of the best AI. For that, use the best-for roundups. Alternatives pages start from a tool you already use." },
  { id: "rule", label: "The practical rule", text: "Switch for a clear reason you can test. Try the alternative on your own tasks while you keep the old plan." },
];

export const HOW_PAGES_WORK: readonly TopicCard[] = [
  { id: "why", title: "Why people switch", summary: "The common reasons for leaving this tool, so you can check whether yours is on the list." },
  { id: "table", title: "Best alternatives", summary: "A table with four columns: option, best for, price and what you give up." },
  { id: "checklist", title: "Switching checklist", summary: "Export your data, re-create your prompts and check privacy settings." },
  { id: "verdict", title: "Verdict", summary: "Who should switch, who should stay, and what to test first." },
];

export const SWITCH_REASONS: readonly SwitchReason[] = [
  {
    id: "price",
    title: "Cost",
    summary: "The plan costs more than the value you get, or the ladder of tiers is confusing.",
    checks: ["Compare the monthly price and what each tier includes", "Check whether pay-per-token use would cost less than a subscription for you", "Find the date any introductory price ends"],
    lookAt: [
      { label: "Consumer plan table", href: "/prices/plans" },
      { label: "API prices", href: "/prices/api" },
      { label: "Is AI worth paying for?", href: "/learn/practitioner/is-ai-worth-paying-for" },
    ],
    tradeOff: "A cheaper plan usually means lower limits or fewer features.",
  },
  {
    id: "limits",
    title: "Usage limits",
    summary: "You keep hitting message, file or usage caps.",
    checks: ["Compare free-plan limits and where each plan stops", "Check file size and context limits for your documents", "See whether a higher tier or the API removes the cap"],
    lookAt: [
      { label: "Free-plan limits", href: "/prices/free-limits" },
      { label: "Feature matrix", href: "/prices/features" },
    ],
    tradeOff: "Higher limits usually cost more, and limits change often.",
  },
  {
    id: "quality",
    title: "Quality",
    summary: "The answers are not good enough for the tasks you do.",
    checks: ["Run the same five to ten of your own tasks on both tools", "Read a review's test results and its 'who should skip it' section", "Check whether an effort or reasoning setting made the difference"],
    lookAt: [
      { label: "Build your own AI test set", href: "/learn/power-user/build-your-own-ai-test-set" },
      { label: "Model reviews", href: "/compare/reviews" },
      { label: "Best-for roundups", href: "/compare/best" },
    ],
    tradeOff: "A model that wins a public score may still lose on your tasks.",
  },
  {
    id: "privacy",
    title: "Privacy and data",
    summary: "You want clearer control over training, retention or where your data goes.",
    checks: ["Check training and retention settings", "Check how to delete your data", "For sensitive work, consider a business plan or a model you run yourself"],
    lookAt: [
      { label: "Privacy matrix", href: "/prices/privacy" },
      { label: "Open-weight vs closed models", href: "/compare/open-vs-closed" },
      { label: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" },
    ],
    tradeOff: "Stricter privacy can mean fewer features, or more setup.",
  },
  {
    id: "features",
    title: "Missing features",
    summary: "You need voice, images, video, web search, agents or memory, and your tool lacks one.",
    checks: ["List your must-have features and rank them", "Check each against the feature matrix", "Check that the feature is in your plan tier, and what its limits are"],
    lookAt: [
      { label: "Feature matrix", href: "/prices/features" },
      { label: "ChatGPT vs Claude vs Gemini vs Grok", href: "/compare/apps" },
    ],
    tradeOff: "No tool has everything. Decide what matters most before you compare.",
  },
  {
    id: "ads",
    title: "Ads in free tiers",
    summary: "The free tier shows ads, or you want an ad-free experience.",
    checks: ["Check whether the free tier or the lowest paid tier shows ads", "Check what changes at the first ad-free tier", "Check whether a free plan elsewhere covers your needs"],
    lookAt: [
      { label: "Free vs paid AI", href: "/learn/foundations/free-vs-paid-ai" },
      { label: "Free-plan limits", href: "/prices/free-limits" },
    ],
    tradeOff: "Going ad-free often means paying.",
  },
  {
    id: "retirement",
    title: "Retirement or change",
    summary: "Your model or plan is being retired, replaced or changed.",
    checks: ["Find the retirement date and the named successor", "Re-test your prompts on the successor first", "Compare alternatives before you renew for another year"],
    lookAt: [
      { label: "Retirements tracker", href: "/prices/retirements" },
      { label: "Latest news", href: "/news" },
      { label: "Model directory", href: "/compare/models" },
    ],
    tradeOff: "A successor can behave differently, so re-test before you rely on it.",
  },
  {
    id: "control",
    title: "Control and openness",
    summary: "You want to run a model yourself, avoid lock-in, or rely on a licence you can read.",
    checks: ["Decide whether you need open weights or just the option to leave", "Check the licence and the hardware you would need", "Try an open-weight model through a host before buying hardware"],
    lookAt: [
      { label: "Open-weight vs closed models", href: "/compare/open-vs-closed" },
      { label: "Best open-weight models", href: "/compare/best/open-weights" },
      { label: "Best models to run locally", href: "/compare/best/local" },
    ],
    tradeOff: "More control means more setup and upkeep.",
  },
];

export const SWITCH_WHEN: readonly string[] = [
  "A limit, price or missing feature blocks work you do often",
  "The same tasks keep failing, and a test shows another tool does better",
  "Your plan or model is being retired or changed",
  "You need a privacy or data setting your current tool does not offer",
  "The cost no longer matches how much you use it",
];

export const STAY_WHEN: readonly string[] = [
  "Your tasks work and the cost is fine",
  "A new model wins a public score, but not on your own tasks",
  "You rely on saved projects, memory or connected apps that cannot move",
  "The time to move is worth more than the saving",
  "You are switching because of a headline, not a problem",
];

export const USING_TWO_NOTE =
  "Using two tools is normal. Many readers keep their current plan while they test another one, and only cancel once the new tool has handled their own tasks.";

export const HOW_WE_CHOOSE: readonly TopicCard[] = [
  { id: "covered", title: "Only tools we cover", summary: "Every option appears in the model directory or the app comparison, so it has a verified-on date and a source." },
  { id: "labels", title: "Same sources, same labels", summary: "Results are labelled tested by us, independent third party or vendor-reported. Vendor numbers never share a column with independent ones." },
  { id: "give-up", title: "What you give up is always shown", summary: "No alternatives page lists only the upsides." },
  { id: "dated", title: "Prices are dated", summary: "Every price carries a verified-on date, and introductory rates show when they end." },
  { id: "independent", title: "Payment never changes a ranking", summary: "Affiliate or sponsor status is never a scoring input, and affiliate links are disclosed." },
  { id: "superseded", title: "Superseded options are marked", summary: "A replaced model or plan links to its successor instead of being deleted." },
];

export const ALTERNATIVES_FAQ: readonly FaqItem[] = [
  { question: "Is switching free?", answer: "Switching itself usually is. Most tools have a free plan, and many paid plans are monthly, so you can test before you commit. Watch for annual plans and for the renewal date on the one you are leaving." },
  { question: "Will my chats and settings move over?", answer: "Rarely by themselves. Some apps let you export your data, but a new tool usually cannot import it as a working history. Save your custom instructions, saved prompts and projects as text before you switch." },
  { question: "Can I use two tools at once?", answer: "Yes. Many people keep one as the main tool and another for tasks it handles better. Keep private data to tools whose settings you have checked." },
  { question: "Should I switch whenever a new model is released?", answer: "No. A release is a reason to test, not to move. Run your own tasks first. The guide Build your own AI test set shows how." },
  { question: "How do I know an alternative is better for me?", answer: "Run the same five to ten tasks on both, on the same day, with the same files and settings, and score them with the same sheet. Public scores are a shortlist, not a verdict." },
  { question: "What if my model or plan is being retired?", answer: "Check the retirements tracker for the date and the successor, test your prompts on the successor first, and compare alternatives before you renew." },
  { question: "Are the alternatives sponsored?", answer: "No score or verdict depends on payment. Affiliate or sponsor status is never a scoring input, and any affiliate link is disclosed on the page where it appears." },
  { question: "My tool is not listed. What now?", answer: "Tell us which tool you are leaving on the contact page. Meanwhile, the model directory and the best-for roundups cover every model we track." },
];

export const ALTERNATIVES_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Switching for a headline score instead of a problem you can test.",
  "Losing saved instructions, projects or chats because nothing was exported.",
  "Paying for a year upfront before the new tool has proved itself.",
  "Missing the old plan's renewal date and paying twice.",
  "Pasting private data into the new tool before checking its privacy settings.",
  "Judging the new tool on one task, on a different day, or with different settings.",
];

export const ALTERNATIVES_SOURCE_NOTE =
  "This hub states no prices, scores or dates from outside sources. Each alternatives page carries its own source and label line (tested by us, independent third party or vendor-reported) and a verified-on date for every price.";

export const ALTERNATIVES_RELATED: readonly RelatedLink[] = [
  { id: "directory", title: "Model directory", reason: "Every model we cover, with prices and context.", href: "/compare/models" },
  { id: "reviews", title: "Model reviews", reason: "Tested reviews with a scorecard and a verdict.", href: "/compare/reviews" },
  { id: "best", title: "Best-for roundups", reason: "Ranked picks by use case.", href: "/compare/best" },
  { id: "vs", title: "Head-to-head", reason: "Two models, the same ten tasks.", href: "/compare/vs" },
  { id: "apps", title: "ChatGPT vs Claude vs Gemini vs Grok", reason: "Article 13: the four apps side by side.", href: "/compare/apps" },
  { id: "open", title: "Open-weight vs closed models", reason: "Article 25: when to leave hosted models.", href: "/compare/open-vs-closed" },
  { id: "plans", title: "Consumer plan table", reason: "What each paid plan costs and includes.", href: "/prices/plans" },
  { id: "privacy", title: "Privacy matrix", reason: "Training, retention and deletion by plan.", href: "/prices/privacy" },
  { id: "retirements", title: "Retirements tracker", reason: "Dates and successors for retiring models.", href: "/prices/retirements" },
  { id: "test-set", title: "Build your own AI test set", reason: "Article 23: judge a tool on your tasks.", href: "/learn/power-user/build-your-own-ai-test-set" },
];