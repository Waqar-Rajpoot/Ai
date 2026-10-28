import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const aiApiPricingForNonEngineers: GuideRecord = {
  slug: "ai-api-pricing-for-non-engineers",
  number: 22,
  level: "power-user",
  kind: "guide",
  title: "AI API pricing for non-engineers: cost per task, not per token",
  metaDescription:
    "How to work out what an AI task costs through an API: input and output tokens, hidden reasoning tokens, caching and batch discounts, with a worked example.",
  cardSummary: "Input and output tokens, caching, batch pricing and a worked example.",
  summaryPoints: [
    "An API charges for the tokens you use, with input and output priced separately. A subscription is a flat fee with usage limits, which is a different thing.",
    "The number that matters is the cost of one whole task: tokens in and out for one job, times the prices, times how often you run it.",
    "Chat history, long files and hidden reasoning can all add tokens you did not type.",
    "Caching and batch processing can lower the bill for the right jobs. Check the provider's pricing page for the current terms.",
  ],
  sections: [
    {
      id: "subscription-vs-api",
      heading: "Subscription or API?",
      paragraphs: [
        "A chatbot subscription charges a flat monthly fee for an app, with usage limits. An API is how software, or a tool you set up yourself, calls a model directly, and it charges for the tokens you use. You might use an API through an automation, a no-code tool or a small script. If you only chat in an app, you can skip this guide and use the plan table instead.",
      ],
    },
    {
      id: "what-you-pay-for",
      heading: "What you pay for",
      paragraphs: [
        "API prices are usually quoted per million tokens, with one price for input and a higher one for output. Tokens are pieces of words. About 100 tokens is roughly 75 words in English, and other languages can use more.",
        "Input is everything you send, and Anthropic's documentation lists what that includes: the system prompt, every message in the conversation, tool results, images and documents, and tool definitions. Output is what the model writes back, and for reasoning models that includes hidden reasoning. OpenAI says its reasoning tokens are billed as output tokens, and Anthropic says its thinking tokens are part of the billed output.",
      ],
      sourceIds: [SOURCES.openaiTokens.id, SOURCES.anthropicContextWindows.id, SOURCES.openaiReasoning.id, SOURCES.anthropicExtendedThinking.id],
    },
    {
      id: "formula",
      heading: "The cost-per-task formula",
      paragraphs: [
        "Cost per task = (input tokens ÷ 1,000,000 × input price) + (output tokens ÷ 1,000,000 × output price).",
        "Monthly cost = cost per task × the number of tasks you run. Copy the real prices from the API price table, which is dated and sourced, rather than from memory.",
      ],
    },
    {
      id: "worked-example",
      heading: "A worked example",
      paragraphs: [
        "To avoid quoting real prices that will change, the example uses made-up units. Suppose the input price is 2 units per million tokens and the output price is 10 units per million. A task sends 3,000 input tokens (instructions plus a document) and receives 500 output tokens.",
      ],
      table: {
        caption: "Worked example with made-up prices (units, not currency)",
        columns: ["Step", "Calculation", "Result"],
        rows: [
          ["Input cost", "3,000 ÷ 1,000,000 × 2", "0.006 units"],
          ["Output cost", "500 ÷ 1,000,000 × 10", "0.005 units"],
          ["Cost per task", "0.006 + 0.005", "0.011 units"],
          ["5,000 tasks in a month", "0.011 × 5,000", "55 units"],
          ["Same task with 2,000 hidden reasoning tokens", "Output becomes 2,500: 2,500 ÷ 1,000,000 × 10 = 0.025, plus 0.006 input", "0.031 units per task, 155 units for 5,000 tasks"],
        ],
      },
      sourceIds: [SOURCES.openaiReasoning.id],
    },
    {
      id: "hidden-tokens",
      heading: "Where extra tokens hide",
      bullets: [
        "Chat history. In a conversation, earlier messages are sent again with each new request, so a long chat costs more per turn than a short one.",
        "Long files and tool results. Anything pasted or returned by a tool counts as input.",
        "Reasoning. Hidden thinking is billed as output, so a higher effort setting can raise the bill even when the visible answer is short.",
        "Retries. An automation that repeats a failed step pays again each time.",
      ],
      sourceIds: [SOURCES.anthropicContextWindows.id, SOURCES.openaiReasoning.id, SOURCES.anthropicExtendedThinking.id],
    },
    {
      id: "caching-batch",
      heading: "Caching and batch pricing",
      paragraphs: [
        "Two features can lower the bill for the right jobs. Both are described here from Anthropic's documentation. Other providers offer similar features under their own terms, so check each pricing page.",
      ],
      bullets: [
        "Prompt caching. The provider reuses a prompt prefix it has already processed, so repeated material is cheaper and faster. Anthropic says cached reads are billed at a fraction of normal input, cache writes cost more than normal input, and the default cache lasts five minutes, refreshed each time it is used. The repeated part has to be identical, so it pays off when the same long instructions or document go with many requests.",
        "Batch processing. You submit many requests together and collect the results later. Anthropic says most batches finish within an hour, results are available within 24 hours, and usage is charged at a discount to standard prices (50 percent when we read the page). It suits work that can wait, such as tagging or summarising a large set of items. It does not suit anything you need immediately.",
      ],
      sourceIds: [SOURCES.anthropicPromptCaching.id, SOURCES.anthropicBatches.id],
    },
    {
      id: "control-cost",
      heading: "A routine for keeping cost under control",
      steps: [
        {
          title: "Measure one task first",
          detail: "Run a single typical task and read the token counts the tool reports. Do not guess.",
        },
        {
          title: "Work out cost per task and monthly cost",
          detail: "Use the formula above or the API cost calculator, with prices copied from the provider.",
        },
        {
          title: "Trim what you send",
          detail: "Cut instructions you do not need, start a fresh chat for a new topic and send only the part of a document the task needs.",
        },
        {
          title: "Match model and effort to the task",
          detail: "Use a cheaper model and a lower effort setting for simple work, and keep the stronger setting for hard work.",
        },
        {
          title: "Check whether caching or batching fits",
          detail: "Repeated long prompts suit caching. Work that can wait suits batches.",
        },
        {
          title: "Set a spending limit",
          detail: "Where the provider offers one, set a cap or alert so a loop or a mistake cannot run up a large bill.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "cost-explainer",
      title: "Check your cost arithmetic",
      whenToUse: "After you have noted the token counts and prices for one task.",
      text: "My task uses [number] input tokens and [number] output tokens. The input price is [number] per million tokens and the output price is [number] per million tokens. I run it [number] times a month. Show the calculation step by step and give the cost per task and the monthly cost.",
    },
    {
      id: "trim-prompt",
      title: "Shorten a long prompt",
      whenToUse: "When a prompt you reuse is longer than it needs to be.",
      text: "Here is a prompt I use often: [paste prompt, no private details]. Rewrite it to be as short as possible while keeping every requirement. List anything you removed so I can check it still does what I need.",
    },
    {
      id: "route-by-task",
      title: "Sort tasks by difficulty",
      whenToUse: "When you want to send easy work to a cheaper model.",
      text: "Here are the tasks I run: [list]. For each, say whether it is simple and high volume, or hard and high stakes, and suggest whether it needs a stronger model, a higher effort setting or a human check.",
    },
  ],
  whatCanGoWrong: [
    "Comparing models by price per million tokens alone. A cheaper model that needs more retries can cost more per finished task.",
    "Forgetting that hidden reasoning, chat history and long files add tokens.",
    "Using old prices. They change, so copy current ones from the provider.",
    "Running an automation without a spending limit, so a loop becomes an expensive surprise.",
    "Assuming caching or batch discounts apply to every request. Check the conditions on the pricing page.",
  ],
  limitsNote:
    "This guide shows how to calculate cost, not what any model costs today. Prices and features change, so confirm on the provider's website before you commit.",
  showPriceNotice: true,
  sources: [
    SOURCES.openaiTokens,
    SOURCES.anthropicContextWindows,
    SOURCES.openaiReasoning,
    SOURCES.anthropicExtendedThinking,
    SOURCES.anthropicPromptCaching,
    SOURCES.anthropicBatches,
  ],
  relatedSlugs: ["context-windows-tokens-memory", "reasoning-models-effort-settings", "is-ai-worth-paying-for", "build-your-own-ai-test-set"],
  relatedLinks: [LINKED_PAGES.apiPrices, LINKED_PAGES.apiCostCalculator, LINKED_PAGES.consumerPlans, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
