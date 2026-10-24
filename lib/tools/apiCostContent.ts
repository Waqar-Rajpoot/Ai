import type { FaqItem, RelatedLink } from "@/lib/compare/openVsClosedContent";
import type { ComparisonTableContent } from "@/lib/learn/expertContent";
import type { TopicCard } from "@/lib/learn/foundationsContent";

/** Date the page text was last updated. Prices carry their own checked-on date. */
export const API_COST_PAGE_UPDATED_ON = "October 21, 2026";
/** Placeholder byline until the author and editor are named. */
export const API_COST_AUTHOR = "Editorial team";
export const API_COST_READ_MINUTES = 8;
export const API_COST_PRICE_DISCLAIMER = "Prices and features change. Confirm on the provider's website before buying.";

export const API_COST_SECTIONS: readonly { id: string; label: string }[] = [
  { id: "calculator", label: "Calculator" },
  { id: "how-to-use", label: "How to use it" },
  { id: "the-maths", label: "The maths" },
  { id: "token-counts", label: "Token counts" },
  { id: "what-changes-the-bill", label: "What changes the bill" },
  { id: "save-money", label: "Ways to save" },
  { id: "subscription-vs-api", label: "Subscription vs API" },
  { id: "price-table", label: "Price table" },
  { id: "not-included", label: "What is not included" },
  { id: "faq", label: "FAQ" },
];

export const HOW_TO_USE_STEPS: readonly TopicCard[] = [
  { id: "price", title: "Pick a price", summary: "Choose a model from our table, or enter your own prices." },
  { id: "task", title: "Describe one task", summary: "Choose a typical task, or enter the tokens you send and get back." },
  { id: "volume", title: "Set your volume", summary: "Enter how many times you run the task each month." },
  { id: "read", title: "Read the result", summary: "See cost per task, month and year, plus what caching or batch could save." },
];

export const COST_FORMULA =
  "Cost per task = (input tokens ÷ 1,000,000 × input price) + (output tokens ÷ 1,000,000 × output price)";

export const WORKED_EXAMPLE_TITLE = "Worked example (made-up prices, for illustration only)";

export const WORKED_EXAMPLE_LINES: readonly string[] = [
  "A task sends 3,000 input tokens and gets 800 output tokens back.",
  "Made-up prices: $2 per million input tokens and $10 per million output tokens.",
  "Input: 3,000 ÷ 1,000,000 × $2 = $0.006",
  "Output: 800 ÷ 1,000,000 × $10 = $0.008",
  "Cost per task: $0.006 + $0.008 = $0.014",
  "At 2,000 tasks a month: 2,000 × $0.014 = $28",
];

export const TOKEN_CARDS: readonly TopicCard[] = [
  { id: "usage-report", title: "Your provider's usage report", summary: "API responses and dashboards report how many input and output tokens each call used. Real numbers from a few runs beat any guess." },
  { id: "estimator", title: "The token estimator", summary: "No usage data yet? Turn a word count into a rough token count with the token and context estimator." },
  { id: "rule-of-thumb", title: "A rule of thumb", summary: "In English, one token is about three-quarters of a word, so 1,000 words is roughly 1,300 tokens. Code, numbers and other languages use more." },
  { id: "hidden-parts", title: "Count the hidden parts", summary: "Input includes system instructions, attached files, chat history and tool results. Output includes any visible or hidden reasoning." },
  { id: "sample", title: "Average a sample", summary: "Run five to ten real tasks and average them, because lengths vary a lot from task to task." },
];

export const BILL_FACTORS_TABLE: ComparisonTableContent = {
  caption: "What changes an API bill",
  headers: ["What changes the bill", "What happens", "What to do"],
  rows: [
    ["Chat history", "Each turn re-sends earlier messages as input, so later turns cost more", "Start a fresh chat for a new topic, or summarize the history"],
    ["Reasoning and effort", "Hidden thinking can use many output tokens, and many services bill it as output", "Use a lower effort setting for easy tasks, and measure cost per task"],
    ["Long prompts", "Some providers bill the whole request at a higher rate once the input passes a threshold", "Stay under the threshold, or split the work. The calculator applies the thresholds in our table"],
    ["Caching", "Repeated input can cost far less when it is read from a cache", "Put stable instructions first and reuse them"],
    ["Batch mode", "Work that can wait is often discounted", "Run non-urgent jobs in batch where the provider offers it"],
    ["Introductory prices", "Some prices rise on a set date", "Budget for the later price, which the calculator shows"],
    ["Peak hours", "A few providers charge more at busy times", "Schedule heavy jobs off-peak where you can"],
    ["Tools and search", "Web search, grounding and code tools can carry separate fees", "Check the tool pricing on the provider's page"],
    ["Retries and errors", "Failed or repeated calls can still use tokens", "Log usage, and cap retries"],
  ],
};

export const SAVE_MONEY_CHECKLIST: readonly string[] = [
  "Send the cheapest model that passes your own test for easy, high-volume tasks",
  "Keep the strongest model for hard or high-stakes work",
  "Trim inputs: send only the passages the task needs",
  "Ask for a shorter output when a short answer will do, and cap the output length",
  "Put stable instructions first so caching can reuse them",
  "Move non-urgent work to batch mode where it is offered",
  "Start new chats instead of re-sending long histories",
  "Lower the reasoning effort for simple tasks",
  "Set a budget and an alert with your provider, and log usage per request",
];

export const SUBSCRIPTION_VS_API_TABLE: ComparisonTableContent = {
  caption: "A chat subscription compared with the API",
  headers: ["What to compare", "Subscription (chat app)", "API (pay per token)"],
  rows: [
    ["How you pay", "A flat monthly fee, with usage limits", "You pay for the tokens you use"],
    ["Cost control", "Predictable, but you may hit limits", "Scales with use, so set budgets and alerts"],
    ["Setup", "Sign up and chat", "Needs an API key and an app or script that calls it"],
    ["Built-in features", "Search, files, memory, voice and apps come with the plan", "You get the model. Features are extra, or you build them"],
    ["Best for", "Personal and small-team use", "Products, automations, and high or uneven volume"],
    ["Data terms", "Consumer or team terms", "Often separate business terms. Check them"],
  ],
};

export const NOT_INCLUDED: readonly string[] = [
  "Separate fees for web search, grounding, code execution or other tools",
  "Taxes, which can be added at checkout",
  "Minimum spend, credits or free allowances",
  "Rate limits and the account tier you need to use a model",
  "Price differences by region or by reseller",
  "Failed calls and retries that still use tokens",
  "Your own time, hardware and engineering work",
];

export const API_COST_FAQ: readonly FaqItem[] = [
  { question: "What is a token?", answer: "A small chunk of text, often a short word or part of a longer word. Models read and write in tokens, and providers bill by the million." },
  { question: "Why do output tokens cost more than input tokens?", answer: "Prices usually are higher for output because generating text takes more computing than reading it. The ratio differs by provider, which is why the calculator keeps the two apart." },
  { question: "Is the cheapest model the best choice?", answer: "No. The cheapest per token can cost more per task if it needs many more output tokens or retries, and a weaker model may fail your task. Compare cost per task and test quality on your own tasks." },
  { question: "How accurate is the estimate?", answer: "As accurate as your token counts and the prices you use. Treat it as a planning number, then compare it with a real usage report after a few days." },
  { question: "Why can the same model cost different amounts at different providers?", answer: "Open-weight models are sold by several hosts, and each sets its own price. The prices in our table are the maker's own, so check a host's page if you use one." },
  { question: "Do the prices include tax?", answer: "No. Taxes and any minimum spend are extra and depend on your account and country." },
  { question: "Can I use this for a chat subscription?", answer: "Use the subscription cost calculator for plan prices. This tool is for paying per token. The optional comparison box compares the two for your usage." },
  { question: "Does this page store my numbers?", answer: "No. Everything runs in your browser, and nothing you type is sent or saved." },
];

export const API_COST_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Guessing token counts instead of reading a real usage report.",
  "Forgetting that chat history is re-sent with every turn.",
  "Missing a long-prompt threshold that bills the whole request at a higher rate.",
  "Budgeting at an introductory price that ends soon.",
  "Counting only the price per token, and not the extra output tokens a model uses.",
  "Leaving out tool, search and retry costs.",
];

export const API_COST_RELATED: readonly RelatedLink[] = [
  { id: "article-22", title: "AI API pricing for non-engineers", reason: "Article 22: cost per task, not per token.", href: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { id: "token-estimator", title: "Token and context estimator", reason: "Turn a word count into a rough token count.", href: "/tools/token-estimator" },
  { id: "subscription", title: "Subscription cost calculator", reason: "Add up plan prices by month and year.", href: "/tools/subscription-cost-calculator" },
  { id: "api-table", title: "API price and cost-per-task table", reason: "Every model's prices on one page.", href: "/prices/api" },
  { id: "plans", title: "Consumer plan table", reason: "What each chat plan costs and includes.", href: "/prices/plans" },
  { id: "free-limits", title: "Free-plan limits", reason: "Where each free plan stops.", href: "/prices/free-limits" },
  { id: "context", title: "Context windows, tokens and memory", reason: "Article 17: what a window holds.", href: "/learn/power-user/context-windows-tokens-memory" },
  { id: "effort", title: "Reasoning models and effort settings", reason: "Article 18: when thinking longer costs more.", href: "/learn/power-user/reasoning-models-effort-settings" },
  { id: "directory", title: "Model directory", reason: "Every model we cover, with reviews.", href: "/compare/models" },
  { id: "open-vs-closed", title: "Open-weight vs closed models", reason: "Article 25: when to host or run a model yourself.", href: "/compare/open-vs-closed" },
];