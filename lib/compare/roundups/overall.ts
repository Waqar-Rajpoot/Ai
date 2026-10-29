import type { BestForRoundup } from "../types";
import { BENCHMARK_CHECKLIST_LINK, DIRECTORY_LINK } from "../links";

export const overallRoundup: BestForRoundup = {
  slug: "overall",
  label: "Overall",
  level: "Levels 2-3",
  question: "If I could only try one model, which should it be?",
  description:
    "The strongest all-round models right now, with a runner-up and a budget pick.",
  metaTitle: "Best AI model overall",
  metaDescription:
    "The strongest all-round AI models, with API prices, independent scores and reported benchmark numbers. Starting points now, a ranked list after our test run.",
  quickAnswer:
    "If you want one model to start with, the directory points to Claude Opus 5.5. It has the highest BenchLM score (86.6) and a 1M context window, at $4 in / $20 out per million tokens. GPT-6.1 Sol is the value step down: 84.1 at half the token price. GPT-6 Astra is third on score but costs $10 / $50, so choose it only if maths, science or research is your main work. This is a shortlist, not a verdict. Our own test run will decide the final order.",
  whoItIsFor: [
    "Readers who want one model for mixed everyday work and do not want to compare fourteen.",
    "Teams choosing a default model for an API integration.",
    "Anyone deciding whether a premium-priced model is worth the extra cost over a mid-priced one.",
  ],
  startingPointIds: ["claude-opus-5-5", "gpt-6-1-sol", "gpt-6-astra"],
  startingPointsNote:
    "These are the three highest BenchLM scores in the directory. A starting point, not a final ranking.",
  modelRoleNotes: {
    "claude-opus-5-5":
      "Top score in the directory. Third-party coverage reports that Anthropic's own guidance now says to start with this model and move to Claude Fable 5.1 only for demanding long-horizon work.",
    "gpt-6-1-sol":
      "Second on score at half the price of Opus 5.5 per token. This is the closest thing to a free upgrade in the table if you can accept 2.5 fewer points.",
    "gpt-6-astra":
      "Third on score but premium priced. Listed for maths, science and research, and reported to lead Opus 5.5 on some science-heavy agent tests (vendor-reported).",
  },
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "You want the highest score and the price is not your main worry.",
      advice: "Start with Claude Opus 5.5, then check its cost on your own tasks at the effort level you will really use.",
    },
    {
      situation: "You want close-to-top quality at the lowest list price.",
      advice: "Try GPT-6.1 Sol or Claude Sonnet 5.5. Both list at $2 / $10, and the gap to Opus 5.5 is 2.5 to 4.4 points.",
    },
    {
      situation: "Your work is maths, science or research.",
      advice: "Test GPT-6 Astra against a mid-priced model first. Pay the premium only if it clearly wins on your own questions.",
    },
    {
      situation: "You want the hardest long-running agent work done.",
      advice: "Read the Agents roundup. Fable 5.1 is listed for it, but check whether Opus 5.5 already does the job for less.",
    },
    {
      situation: "You use a chat app, not the API.",
      advice: "Prices here are API prices. A chat subscription is a flat monthly fee, so compare plans instead.",
    },
  ],
  reportedFigures: [
    { subject: "Claude Opus 5.5", measure: "BenchLM composite score", value: "86.6", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "GPT-6.1 Sol", measure: "BenchLM composite score", value: "84.1", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "GPT-6 Astra", measure: "BenchLM composite score", value: "83.9", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "Claude Opus 5.5", measure: "Terminal-Bench 4.0 (model-level run)", value: "59.6%", label: "Independent", source: "Artificial Analysis, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "GPT-6 Astra", measure: "Terminal-Bench 4.0 (model-level run)", value: "59.6% (tied)", label: "Independent", source: "Artificial Analysis, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Opus 5.5", measure: "Terminal-Bench 4.0", value: "61.6% (53.5% if safeguard fallbacks count as failures)", label: "Independent", source: "Vals AI, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Opus 5.5", measure: "SWE-bench Pro", value: "89.9%", label: "Vendor-reported", source: "Anthropic system card, via DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "BenchLM composite score",
      meaning: "One number that blends many benchmark results so you can shortlist models quickly.",
      caution: "It can hide a weak spot. A model with a lower total can still be best at your one job.",
    },
    {
      term: "Effort setting",
      meaning: "A control that tells a model how long to think before it answers. Higher effort usually means better answers and more tokens.",
      caution: "More tokens means a higher bill. Compare models at the effort you will actually pay for.",
    },
    {
      term: "Context window",
      meaning: "How much text the model can read at once. 1M means about one million tokens.",
      caution: "A big window does not mean the model uses all of it equally well. Test long documents yourself.",
    },
    {
      term: "API price versus subscription",
      meaning: "The API charges per token. A chat app charges a flat monthly fee.",
      caution: "The two are separate products. An API price tells you nothing about a plan's limits.",
    },
  ],
  howWeWillRank: [
    "The same seven-point scorecard for every model, so none wins by facing easier tasks.",
    "Cost per finished task, not price per token.",
    "Model version, effort setting and test day recorded next to every result.",
    "Vendor-reported and independent numbers kept in separate columns.",
  ],
  selfTest: [
    { title: "Pick ten real tasks", detail: "Use work you actually do: an email, a summary, a spreadsheet question, a bug, a research question. Include at least two you find hard." },
    { title: "Shortlist two or three models", detail: "Take the top starting point, one cheaper option and one you are curious about." },
    { title: "Use the same prompt and effort setting", detail: "Copy each prompt exactly. Do not tweak it per model, or you will test your prompt skill instead." },
    { title: "Score blind if you can", detail: "Hide the model names, then score each answer from 1 to 5 for correctness, usefulness and tone." },
    { title: "Add up cost and time", detail: "Note the tokens used or the plan cost, and how long you spent fixing each answer." },
  ],
  tips: [
    "Check the date on any ranking you read. Models and prices changed several times in the last two months.",
    "Test at the effort level you will pay for, not the maximum a vendor used in a launch table.",
    "Keep one cheaper fallback model for routine tasks and escalate only when it fails.",
  ],
  commonMistakes: [
    "Choosing by the highest score alone and ignoring a price that is two to five times higher.",
    "Treating a vendor launch table as an independent test.",
    "Comparing an API price with a subscription price as if they were the same thing.",
  ],
  keepInMind: [
    "A composite score is a shortlist. A model with a lower total can be better at the one job you care about.",
    "The two highest-scoring models are not the two cheapest. Compare price before you commit.",
    "Models are replaced often. A superseded model should not keep a top pick.",
  ],
  faq: [
    { question: "Is the highest score always the best choice?", answer: "No. A composite blends many tests, and your task may rely on one of them. Use it to pick two or three models, then try your own work." },
    { question: "Why is GPT-6.1 Sol listed if it scores lower than Opus 5.5?", answer: "It scores 84.1 against 86.6 at half the token price. For many readers that is the better trade, which is why the directory lists it as the best value near the frontier." },
    { question: "Does a premium price mean better answers?", answer: "Not by itself. In this snapshot the two premium models, GPT-6 Astra and Claude Fable 5.1, score below Claude Opus 5.5. They are listed for narrower jobs." },
    { question: "How often will this page change?", answer: "We review every best-for page in the first week of each month and re-read it when a model launches or a price changes." },
    { question: "Where do the extra benchmark numbers come from?", answer: "From published launch material and third-party leaderboards read on the dates shown. Each is labelled so vendor numbers never pass as independent ones." },
  ],
  sources: [
    { name: "Model directory (BenchLM scores, prices)", url: "/compare/models", note: "Scores read Oct 17, 2026. Prices verified Oct 21, 2026." },
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Used for release dates and benchmark figures, each labelled." },
  ],
  related: [
    { href: "/compare/best/value", label: "Best value" },
    { href: "/compare/vs", label: "Head-to-head tests" },
    BENCHMARK_CHECKLIST_LINK,
    DIRECTORY_LINK,
  ],
};