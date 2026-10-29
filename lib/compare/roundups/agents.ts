import type { BestForRoundup } from "../types";
import { BENCHMARK_CHECKLIST_LINK, DIRECTORY_LINK } from "../links";

export const agentsRoundup: BestForRoundup = {
  slug: "agents",
  label: "Agents",
  level: "Levels 2-3",
  question: "Which model can carry out longer tasks with tools?",
  description:
    "Models ranked for tool use and long-running tasks, with notes on where agents fail and which permissions to limit.",
  metaTitle: "Best AI model for agents",
  metaDescription:
    "AI models for agent work and tool use, with reported Terminal-Bench figures, costs and safety notes. Starting points now, a ranked list after our test run.",
  quickAnswer:
    "The directory lists Claude Fable 5.1 and Kimi K3 for agent work. Fable 5.1 holds the top Terminal-Bench 2.1 score on one independent board. Third-party coverage also reports that Claude Opus 5.5 and GPT-6 Astra are close or ahead on the newer Terminal-Bench 4.0 for less money in Opus 5.5's case. Agent scores depend on the harness, the effort setting and how many retries a task needs, so treat every figure here as a lead, not a result.",
  whoItIsFor: [
    "Developers building an assistant that calls tools or runs commands.",
    "Power users letting an AI work through a multi-step task.",
    "Managers deciding what an agent is allowed to touch.",
  ],
  startingPointIds: ["claude-fable-5-1", "kimi-k3"],
  startingPointsNote:
    "Listed for agents in the model directory. A starting point, not a final ranking. Reported figures for Claude Opus 5.5 and GPT-6 Astra are shown below because they are close.",
  modelRoleNotes: {
    "claude-fable-5-1":
      "Listed for the hardest agentic coding. 91.4% on Terminal-Bench 2.1 at maximum effort (independent), but only 55.8% on the harder 4.0 set in Anthropic's own table.",
    "kimi-k3":
      "The open-weight option for agents. Its 88.3% Terminal-Bench 2.1 comes from Moonshot's own harness, so it is not like-for-like with independent boards.",
  },
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "Your agent runs for minutes to hours on real files.",
      advice: "Test Claude Opus 5.5, Claude Fable 5.1 and GPT-6 Astra on the same task. Compare cost per finished task, not per token.",
    },
    {
      situation: "You run many cheap, short agent steps.",
      advice: "Consider Gemini 3.8 Flash or DeepSeek V4.1 Flash, but note their scores on the hardest tests are much lower.",
    },
    {
      situation: "The agent can spend money, send email or delete files.",
      advice: "Require a human check on each of those actions. Limit permissions to the minimum the task needs.",
    },
    {
      situation: "You must self-host.",
      advice: "Kimi K3 needs a cluster. A smaller open model on your own hardware will be weaker. See the Local roundup.",
    },
  ],
  reportedFigures: [
    { subject: "Claude Opus 5.5", measure: "Terminal-Bench 4.0", value: "66.4%", label: "Vendor-reported", source: "Anthropic system card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Fable 5.1", measure: "Terminal-Bench 4.0", value: "55.8%", label: "Vendor-reported", source: "Anthropic system card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "GPT-6 Astra", measure: "Terminal-Bench 4.0 (agent leaderboard)", value: "58.2%", label: "Independent", source: "tbench.ai, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Fable 5.1", measure: "Terminal-Bench 4.0 (agent leaderboard)", value: "57.9%", label: "Independent", source: "tbench.ai, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Fable 5.1", measure: "Terminal-Bench 2.1 (max effort)", value: "91.4%", label: "Independent", source: "Artificial Analysis, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Kimi K3", measure: "Terminal-Bench 2.1 (Kimi Code harness)", value: "88.3%", label: "Vendor-reported", source: "Moonshot AI, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Gemini 3.8 Flash", measure: "Terminal-Bench 4.0", value: "19.1%", label: "Third-party roundup", source: "DataCamp", asOf: "Sep 25, 2026" },
    { subject: "DeepSeek V4.1 Flash", measure: "Terminal-Bench 4.0", value: "31.2%", label: "Vendor-reported", source: "DeepSeek report, via DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "Agent",
      meaning: "A model that plans steps, calls tools and checks its own results instead of answering once.",
      caution: "Every extra step is another chance to go wrong, and another bill.",
    },
    {
      term: "Terminal-Bench",
      meaning: "Tasks run in a live command line, such as fixing a build or recovering a corrupted file. 2.1 is the older set, 4.0 the harder one.",
      caution: "A model can look strong on 2.1 and weak on 4.0. Check which set a number comes from.",
    },
    {
      term: "Harness",
      meaning: "The software that connects the model to tools. It changes results.",
      caution: "The same model scored several points higher in one vendor's own tool than in a neutral one.",
    },
    {
      term: "Permissions",
      meaning: "What the agent is allowed to read, write, send or spend.",
      caution: "Grant the least you can. Add approval steps for anything you cannot undo.",
    },
  ],
  howWeWillRank: [
    "Long tasks that need several tool calls in a row.",
    "Whether the model stops, asks or recovers when a step fails.",
    "Total cost of a finished task, including retries.",
    "The harness, effort setting and number of runs recorded for every result.",
  ],
  selfTest: [
    { title: "Pick one real multi-step job", detail: "For example: read three files, change a setting, run a check, report what changed." },
    { title: "Run it three times per model", detail: "Agents vary between runs. One lucky pass proves little." },
    { title: "Watch for silent failures", detail: "Check the end state yourself. Agents sometimes report success when a step failed." },
    { title: "Total the cost per finished run", detail: "Include retries and the tokens used on dead ends." },
  ],
  tips: [
    "Run agents in a sandbox or a copy of your files first.",
    "Log every tool call so you can see what happened.",
    "Set a token or time limit so a stuck agent cannot run up a bill.",
  ],
  commonMistakes: [
    "Giving an agent broad access because it worked once.",
    "Believing a success message without checking the result.",
    "Comparing scores that used different harnesses.",
  ],
  keepInMind: [
    "Give an agent the fewest permissions it needs. Do not let it spend money or delete files without a check.",
    "Long tasks can use many tokens, so cost per task can be far above one chat reply.",
    "Some security-related prompts are restricted on certain models, which can stop a legitimate task.",
  ],
  faq: [
    { question: "Why do Terminal-Bench 2.1 and 4.0 tell different stories?", answer: "4.0 is a harder set with longer tasks. Models that look strong on 2.1 can drop sharply on 4.0, as Gemini 3.8 Flash does." },
    { question: "Is Fable 5.1 or Opus 5.5 better for agents?", answer: "Reports disagree by benchmark. On Anthropic's own table Opus 5.5 is ahead. On one independent board Fable 5.1 leads the older 2.1 set. Test both on your task." },
    { question: "Can I trust an agent to run unattended?", answer: "Only with limited permissions, logging and a check on the result. Treat it like a new employee on a trial task." },
    { question: "Why does cost vary so much?", answer: "Agents loop, retry and read many files. A model with a low token price can still cost more per finished task if it needs more steps." },
  ],
  sources: [
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. It quotes Artificial Analysis, Vals AI, tbench.ai and vendor reports, each labelled here." },
    { name: "Model directory", url: "/compare/models", note: "Scores read Oct 17, 2026. Prices verified Oct 21, 2026." },
  ],
  related: [
    { href: "/compare/best/coding", label: "Best for coding" },
    { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
    BENCHMARK_CHECKLIST_LINK,
    DIRECTORY_LINK,
  ],
};