import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK } from "../links";

export const valueRoundup: BestForRoundup = {
  slug: "value",
  label: "Value",
  level: "Levels 2-3",
  question: "Which model gives the most for the least money?",
  description:
    "Models ranked by quality per dollar, using cost per task rather than price per token.",
  metaTitle: "Best value AI model",
  metaDescription:
    "AI models with the best quality for the price: list prices, introductory rates, hidden cost traps and a cost-per-task method. Ranked list follows our test run.",
  quickAnswer:
    "The directory lists GPT-6.1 Sol as the best value near the frontier: 84.1 on BenchLM at $2 in / $10 out. Claude Sonnet 5.5 has the same list price and scores 82.2. Both cost half as much per token as Claude Opus 5.5, which scores 86.6. Value depends on cost per finished task, and some models use many more tokens than others, so a low token price is only half the story.",
  whoItIsFor: [
    "Anyone paying API bills who wants to cut cost without a big drop in quality.",
    "Readers deciding between a flagship and a mid-priced model.",
    "Teams budgeting for a feature that will run thousands of times.",
  ],
  startingPointIds: ["gpt-6-1-sol", "claude-sonnet-5-5"],
  startingPointsNote:
    "Listed for value in the model directory. A starting point, not a final ranking.",
  modelRoleNotes: {
    "gpt-6-1-sol":
      "84.1 for $2 / $10. It sits 2.5 points under the top score at half the token price.",
    "claude-sonnet-5-5":
      "82.2 for $2 / $10, and its cache-read price was halved on Oct 7, 2026, which helps workloads that reuse the same long prompt.",
  },
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "Quality matters, but you cannot justify flagship prices.",
      advice: "Try GPT-6.1 Sol or Claude Sonnet 5.5 first. Both list at $2 / $10.",
    },
    {
      situation: "Your prompts repeat the same long text.",
      advice: "Check cache prices. Cache reads cost a fraction of normal input and can change which model is cheapest.",
    },
    {
      situation: "You run simple bulk work.",
      advice: "See Cheap and fast. A budget model may be enough, and a flagship would be wasted.",
    },
    {
      situation: "A price looks too good.",
      advice: "Check whether it is an introductory rate. Gemini 4 Argon's ends Nov 30 and Gemini 3.8 Flash's ends Dec 31.",
    },
    {
      situation: "You use a model at maximum effort.",
      advice: "Measure real cost. One independent test found Claude Opus 5.5 at maximum effort cost almost the same per task as its pricier predecessor.",
    },
  ],
  reportedFigures: [
    { subject: "GPT-6.1 Sol", measure: "List price per million tokens (in / out)", value: "$2 / $10", label: "Directory", source: "Model directory", asOf: "Oct 21, 2026" },
    { subject: "Claude Sonnet 5.5", measure: "List price per million tokens (in / out)", value: "$2 / $10", label: "Directory", source: "Model directory", asOf: "Oct 21, 2026" },
    { subject: "Claude Opus 5.5", measure: "List price per million tokens (in / out)", value: "$4 / $20", label: "Directory", source: "Model directory", asOf: "Oct 21, 2026" },
    { subject: "Claude Opus 5.5", measure: "Cost per task on an intelligence index (max effort)", value: "$5.98 (about level with its predecessor at $5.86)", label: "Independent", source: "Artificial Analysis, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Gemini 3.8 Flash", measure: "Price from Jan 1, 2027 (in / out)", value: "$1.50 / $7.50", label: "Third-party roundup", source: "DataCamp, citing Google's pricing page", asOf: "Sep 25, 2026" },
    { subject: "DeepSeek V4.1 Flash", measure: "Peak-hour price (in / out)", value: "$0.30 / $1.20", label: "Third-party roundup", source: "DataCamp, citing DeepSeek's pricing page", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "Cost per task",
      meaning: "What one finished job costs, including every token the model used, retries included.",
      caution: "A cheap token price can still cost more per task if the model writes long answers or needs retries.",
    },
    {
      term: "Cache price",
      meaning: "A lower price for input the provider has already seen, such as a long system prompt you resend.",
      caution: "It only helps if your prompts repeat. Check how long the cache lasts.",
    },
    {
      term: "Introductory rate",
      meaning: "A temporary low price with an end date.",
      caution: "Budget for the price after the end date, not the one shown today.",
    },
    {
      term: "Price tier",
      meaning: "Our label for budget, mid-priced or premium, based on list prices.",
      caution: "A tier is a rough group. Work out your own cost per task.",
    },
  ],
  howWeWillRank: [
    "Quality score divided by what one finished task costs.",
    "A model that needs more tokens to finish is charged for them.",
    "Introductory prices flagged, with the price after they end.",
    "Cache and peak-hour pricing noted where they apply.",
  ],
  selfTest: [
    { title: "Measure one real task", detail: "Run your usual job once and note tokens in and out." },
    { title: "Multiply by volume", detail: "Take that cost times the tasks you run each month." },
    { title: "Repeat on a cheaper model", detail: "Score both answers for quality. If the cheaper one is good enough, the savings are real." },
    { title: "Use our calculator", detail: "The API cost calculator turns tokens per task and tasks per month into a monthly bill." },
  ],
  tips: [
    "Send the shortest prompt that works. Input tokens are billed too.",
    "Route easy tasks to a cheap model and hard ones to a strong model.",
    "Re-check prices monthly. Several changed in October 2026.",
  ],
  commonMistakes: [
    "Comparing price per million tokens without looking at how many tokens each model writes.",
    "Forgetting that introductory prices end.",
    "Using a flagship for every simple task.",
  ],
  keepInMind: [
    "A cheap token price can still cost more per task if a model writes long answers.",
    "Prices here are API prices. A chat subscription is a separate flat price.",
    "Value changes with price drops. A model can lose its place the week a rival cuts its price.",
  ],
  faq: [
    { question: "Is GPT-6.1 Sol or Claude Sonnet 5.5 the better value?", answer: "They list at the same price. Sol scores 84.1 and Sonnet 82.2 in this snapshot, but your task decides. Test both." },
    { question: "Why not rank the cheapest model as the best value?", answer: "Because a cheap wrong answer still costs you time. Value means quality per dollar, not the lowest price." },
    { question: "Do cache prices really matter?", answer: "For repeated long prompts, yes. Cache reads can cost a fraction of normal input, and two models were cut in October 2026." },
    { question: "How do I check cost before I commit?", answer: "Measure tokens on one real task, multiply by your monthly volume, and use the API cost calculator." },
  ],
  sources: [
    { name: "Model directory", url: "/compare/models", note: "Prices verified Oct 21, 2026." },
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Used for cost-per-task and price-change figures, each labelled." },
  ],
  related: [
    { href: "/prices/api", label: "API costs" },
    { href: "/tools/api-cost-calculator", label: "API cost calculator" },
    { href: "/compare/best/cheap-and-fast", label: "Cheap and fast" },
    DIRECTORY_LINK,
  ],
};