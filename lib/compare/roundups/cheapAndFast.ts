import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK } from "../links";

export const cheapAndFastRoundup: BestForRoundup = {
  slug: "cheap-and-fast",
  label: "Cheap and fast",
  level: "Levels 2-3",
  question: "Which model suits high-volume or bulk work?",
  description:
    "Low-cost models for work where speed and price matter more than the last few points of quality.",
  metaTitle: "Best cheap and fast AI models",
  metaDescription:
    "Low-cost AI models for high-volume work: list prices, intro and peak-hour rates, price steps and what to test. Starting points now, a ranked list after our test run.",
  quickAnswer:
    "Four models in the directory are listed for low-cost work. Claude Haiku 5.5 and GPT-6 Luna both list at $0.10 in / $0.50 out. DeepSeek V4.1 Flash is $0.15 / $0.60 off-peak. Gemini 3.8 Flash is $0.75 / $3.75 but doubles on Jan 1, 2027. For bulk work the price conditions matter as much as the price: peak hours, introductory rates and long-prompt steps can change your real bill.",
  whoItIsFor: [
    "Developers sorting, tagging or summarising thousands of items.",
    "Small businesses automating short repetitive replies.",
    "Anyone who wants fast answers and will check the results anyway.",
  ],
  startingPointIds: [
    "claude-haiku-5-5",
    "gemini-3-8-flash",
    "gpt-6-luna",
    "deepseek-v4-1-flash",
  ],
  startingPointsNote:
    "Listed for high-volume, low-cost work in the model directory. A starting point, not a final ranking.",
  modelRoleNotes: {
    "claude-haiku-5-5":
      "The cheapest model in the directory with a BenchLM score (70.0). Its price steps up above 100K tokens, so check long prompts.",
    "gemini-3-8-flash":
      "Fast, cheap and multimodal. The $0.75 / $3.75 rate ends on Dec 31, 2026 and becomes $1.50 / $7.50.",
    "gpt-6-luna":
      "Matches Haiku's list price. Not in the BenchLM top 25 and its context size is not confirmed, so test it before you build on it.",
    "deepseek-v4-1-flash":
      "Cheapest capable API at off-peak prices, and its weights are MIT-licensed. Peak hours double the price.",
  },
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "Your jobs are short and simple.",
      advice: "Start with Claude Haiku 5.5 or GPT-6 Luna. Both list at $0.10 / $0.50.",
    },
    {
      situation: "You can schedule jobs overnight.",
      advice: "DeepSeek V4.1 Flash off-peak is the lowest list price among the models with capable scores.",
    },
    {
      situation: "You work with images or screenshots.",
      advice: "Gemini 3.8 Flash is listed for multimodal work. Budget for the January 2027 price.",
    },
    {
      situation: "Prompts are long.",
      advice: "Check the price step. Claude Haiku 5.5 steps up above 100K tokens.",
    },
    {
      situation: "Errors are costly.",
      advice: "Do not choose on price alone. Test accuracy on 50 real items and count the mistakes.",
    },
  ],
  reportedFigures: [
    { subject: "Claude Haiku 5.5", measure: "List price per million tokens (in / out)", value: "$0.10 / $0.50", label: "Directory", source: "Model directory", asOf: "Oct 21, 2026" },
    { subject: "GPT-6 Luna", measure: "List price per million tokens (in / out)", value: "$0.10 / $0.50", label: "Directory", source: "Model directory", asOf: "Oct 21, 2026" },
    { subject: "DeepSeek V4.1 Flash", measure: "Off-peak / peak price (in / out)", value: "$0.15 / $0.60 off-peak, $0.30 / $1.20 peak", label: "Third-party roundup", source: "DataCamp, citing DeepSeek's pricing page", asOf: "Sep 25, 2026" },
    { subject: "Gemini 3.8 Flash", measure: "Price now and from Jan 1, 2027 (in / out)", value: "$0.75 / $3.75 now, $1.50 / $7.50 later", label: "Third-party roundup", source: "DataCamp, citing Google's pricing page", asOf: "Sep 25, 2026" },
    { subject: "Gemini 3.8 Flash", measure: "Terminal-Bench 2.1", value: "89.4%", label: "Vendor-reported", source: "Google evaluation report, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "DeepSeek V4.1 Flash", measure: "Terminal-Bench 2.1", value: "90.6% vendor-reported, 74.5% in Vals AI's run", label: "Independent", source: "Vals AI, via DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "Off-peak price",
      meaning: "A lower price during quiet hours. DeepSeek's peak windows are weekdays 01:00 to 04:00 and 06:00 to 10:00 UTC.",
      caution: "If your jobs run in peak hours, use the peak price.",
    },
    {
      term: "Price step",
      meaning: "A higher rate that applies once a prompt passes a size, such as 100K or 200K tokens.",
      caution: "One long prompt can cost far more than many short ones.",
    },
    {
      term: "Latency",
      meaning: "How long you wait for an answer.",
      caution: "Speed claims depend on load and region. Time it yourself.",
    },
    {
      term: "Not in top 25",
      meaning: "The model is outside the BenchLM snapshot, so no score is shown.",
      caution: "That is not a judgement on the model. Judge it on price, context and your own tests.",
    },
  ],
  howWeWillRank: [
    "The same bulk tasks on every model, such as sorting, tagging and short summaries.",
    "Error rate, since a cheap wrong answer still has to be fixed.",
    "Cost per thousand tasks at the price that will apply when you run them.",
    "Response time measured on a stated day and region.",
  ],
  selfTest: [
    { title: "Take 50 real items", detail: "Use items you can check by hand, such as support tickets to label." },
    { title: "Run each model on all 50", detail: "Same prompt, same settings." },
    { title: "Count wrong answers", detail: "Fix them by hand and time how long it takes." },
    { title: "Work out cost per 1,000", detail: "Add the cost of fixing errors. The cheapest model is not always the cheapest overall." },
  ],
  tips: [
    "Keep prompts short and ask for a fixed output format such as JSON.",
    "Batch work into off-peak windows where a provider discounts them.",
    "Spot-check a sample of results every week.",
  ],
  commonMistakes: [
    "Planning around an introductory price that ends soon.",
    "Ignoring peak-hour pricing.",
    "Skipping a quality check because the model is cheap.",
  ],
  keepInMind: [
    "Two of these models are not in the BenchLM top 25. That is not a judgement on them, so test them on your own tasks.",
    "Off-peak and introductory prices can change the real cost.",
    "Cheap models score lower on the hardest tests. Keep a stronger model for the tasks they fail.",
  ],
  faq: [
    { question: "Which is cheapest, Haiku 5.5 or GPT-6 Luna?", answer: "They list at the same $0.10 / $0.50 per million tokens. Haiku has a price step above 100K tokens. Luna's context size is not confirmed." },
    { question: "Is DeepSeek V4.1 Flash really cheaper?", answer: "Off-peak, its list price is $0.15 / $0.60. At peak it doubles, so the saving depends on when you run jobs." },
    { question: "What happens to Gemini 3.8 Flash after December?", answer: "Reported pricing rises to $1.50 in / $7.50 out per million tokens from Jan 1, 2027. Check Google's page before you build." },
    { question: "Can I use a cheap model for important decisions?", answer: "Use it for drafts and sorting, then check the results. Do not rely on it alone for legal, medical or money decisions." },
  ],
  sources: [
    { name: "Model directory", url: "/compare/models", note: "Prices verified Oct 21, 2026." },
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Used for peak, intro and future prices, each labelled." },
    { name: "Our weekly roundup, Oct 23, 2026", url: "/news/weekly/2026-10-23", note: "Source for the Claude Haiku 5.5 price step above 100K tokens." },
  ],
  related: [
    { href: "/tools/api-cost-calculator", label: "API cost calculator" },
    { href: "/compare/best/value", label: "Best value" },
    { href: "/prices/api", label: "API costs" },
    DIRECTORY_LINK,
  ],
};