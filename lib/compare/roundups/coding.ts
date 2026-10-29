import type { BestForRoundup } from "../types";
import { BENCHMARK_CHECKLIST_LINK, DIRECTORY_LINK } from "../links";

export const codingRoundup: BestForRoundup = {
  slug: "coding",
  label: "Coding",
  level: "Levels 2-3",
  question: "Which model writes and fixes code best?",
  description:
    "Models ranked for everyday coding and for hard, multi-step coding work, with the cost of a small task.",
  metaTitle: "Best AI model for coding",
  metaDescription:
    "AI models for coding with API prices, reported SWE-bench Pro and Terminal-Bench figures, and how to read them. Starting points now, a ranked list after our test run.",
  quickAnswer:
    "The directory lists Claude Sonnet 5.5 for everyday coding, Claude Fable 5.1 for the hardest agentic work, and Kimi K3 as the open-weight option. Third-party coverage from September 2026 reports that Claude Opus 5.5 posts higher coding figures than Fable 5.1 on Anthropic's own table, at less than half the price, so test it too. The old headline benchmark, SWE-bench Verified, is now saturated and no longer separates top models. Read SWE-bench Pro and Terminal-Bench instead, and run your own tasks before you pay.",
  whoItIsFor: [
    "Developers choosing a model for a coding assistant or agent.",
    "Non-developers who use AI to write scripts, spreadsheet formulas or small tools.",
    "Team leads who need to justify a model bill.",
  ],
  startingPointIds: ["claude-sonnet-5-5", "claude-fable-5-1", "kimi-k3"],
  startingPointsNote:
    "Listed for coding in the model directory. A starting point, not a final ranking. Claude Opus 5.5 is not listed for coding in the directory, but its reported figures below make it worth testing.",
  modelRoleNotes: {
    "claude-sonnet-5-5":
      "Listed for everyday coding and knowledge work at $2 / $10. The sensible first model to try for fixing bugs and writing small functions.",
    "claude-fable-5-1":
      "Listed for the hardest agentic coding. It posts the top Terminal-Bench 2.1 score on Artificial Analysis (91.4%), but it costs 5 times Sonnet 5.5 per token.",
    "kimi-k3":
      "The open-weight pick. It reports 88.3% on Terminal-Bench 2.1 in its own harness, but at 2.8 trillion parameters you will use it through a hosted API, not at home.",
  },
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "You fix bugs and write small functions most days.",
      advice: "Start with Claude Sonnet 5.5. Move up only if it fails on your real tasks.",
    },
    {
      situation: "You run long agent tasks that touch many files.",
      advice: "Test Claude Opus 5.5 and Claude Fable 5.1 on the same ticket. Third-party coverage reports Anthropic points developers to Opus 5.5 first.",
    },
    {
      situation: "Your code cannot leave your machine.",
      advice: "See the Local roundup. A 27B open model can run on one 24 GB graphics card.",
    },
    {
      situation: "You run huge volumes and cost is the limit.",
      advice: "Look at DeepSeek V4.1 Flash off-peak or Gemini 3.8 Flash. Check the harder agent scores before you trust either.",
    },
    {
      situation: "You need an open licence you can build a product on.",
      advice: "Read the licence. DeepSeek V4.1 Flash is MIT. Kimi K3 uses a custom licence that needs a legal check.",
    },
  ],
  reportedFigures: [
    { subject: "Claude Opus 5.5", measure: "SWE-bench Pro", value: "89.9%", label: "Vendor-reported", source: "Anthropic system card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Fable 5.1", measure: "SWE-bench Pro", value: "81.2%", label: "Vendor-reported", source: "Anthropic system card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Fable 5.1", measure: "Terminal-Bench 2.1 (max effort)", value: "91.4%", label: "Independent", source: "Artificial Analysis, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Claude Opus 5.5", measure: "Terminal-Bench 4.0 (model-level run)", value: "59.6% (Artificial Analysis), 61.6% (Vals AI)", label: "Independent", source: "Artificial Analysis and Vals AI, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "GPT-6 Astra", measure: "Terminal-Bench 4.0 (agent leaderboard)", value: "58.2%", label: "Independent", source: "tbench.ai, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Kimi K3", measure: "Terminal-Bench 2.1 (Kimi Code harness)", value: "88.3%", label: "Vendor-reported", source: "Moonshot AI, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Qwen3.8-27B", measure: "Terminal-Bench 2.1", value: "73.0%", label: "Vendor-reported", source: "Alibaba model card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "GPT-6.1 Sol", measure: "DeepSWE 1.1", value: "68.8%", label: "Vendor-reported", source: "OpenAI chart, via DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "SWE-bench Verified",
      meaning: "500 human-checked GitHub issues from Python projects. The model must write a patch that passes hidden tests.",
      caution: "Top models now score above 96% on one independent board, and that board was archived as saturated. It no longer separates the leaders.",
    },
    {
      term: "SWE-bench Pro",
      meaning: "A harder set of professional repository tasks across several languages, where the average fix touches about four files.",
      caution: "Vendors often run it on their own settings, and a newer version cut some invalid tasks. Check which version a score used.",
    },
    {
      term: "Terminal-Bench",
      meaning: "Gives a model a live command line and a task such as fixing a build. Versions 2.1 and 4.0 are in use.",
      caution: "The harness changes the score. The same model can score several points differently in another harness.",
    },
    {
      term: "Harness",
      meaning: "The program around the model that feeds it files, runs commands and shows results. Claude Code, Codex and Cursor are harnesses.",
      caution: "A result is for the model plus the harness. Compare like with like.",
    },
  ],
  howWeWillRank: [
    "Everyday tasks, such as fixing a bug or writing a small function, scored separately from hard multi-step work.",
    "Whether the code runs and passes tests, not only whether it looks right.",
    "The cost of one small coding task on each model, including retries.",
    "The harness and effort setting recorded for every result.",
  ],
  selfTest: [
    { title: "Collect 20 real tickets", detail: "Take bugs and small features from your own backlog, with the tests that prove each is done." },
    { title: "Run each model at the effort you will pay for", detail: "Do not copy a vendor's maximum-effort setting unless you will pay for it." },
    { title: "Judge by passing tests", detail: "Count how many tasks pass without edits, how many pass after one fix, and how many fail." },
    { title: "Record tokens and time", detail: "Cost per solved ticket is the number to compare, not price per token." },
  ],
  tips: [
    "Give the model the failing test or error message, not only a description.",
    "Ask for a small change and review the diff before you accept it.",
    "Keep secrets, keys and customer data out of prompts.",
  ],
  commonMistakes: [
    "Trusting a single benchmark number when top models sit within a point or two of each other.",
    "Comparing scores from different harnesses as if they were the same test.",
    "Running generated code without reading it first.",
  ],
  keepInMind: [
    "Review and run any generated code before you rely on it.",
    "Never paste secrets, keys or private customer data into a chat.",
    "Most benchmark numbers here are vendor-reported and are best read as an upper bound.",
  ],
  faq: [
    { question: "Why not rank by SWE-bench Verified?", answer: "Because the best models are now within a few points of the ceiling. It still works for older and smaller models, but it cannot tell the leaders apart." },
    { question: "Is the most expensive model the best for coding?", answer: "Not automatically. Third-party coverage reports that Claude Opus 5.5 beats the pricier Claude Fable 5.1 on several of Anthropic's own coding rows." },
    { question: "Can an open model match a closed one?", answer: "On older tests, nearly. On the hardest agent tasks the frontier models still lead, and the strongest open models need datacenter hardware." },
    { question: "Does effort setting matter for cost?", answer: "Yes. At maximum effort a model can use far more tokens, so a cheaper-looking model can cost about the same per task." },
    { question: "Should I pick a model or a coding tool first?", answer: "Pick the model on score and price, then the tool on workflow. Most tools let you swap the model." },
  ],
  sources: [
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Most figures are vendor-published and are labelled so." },
    { name: "Model directory", url: "/compare/models", note: "Scores read Oct 17, 2026. Prices verified Oct 21, 2026." },
  ],
  related: [
    { href: "/compare/best/agents", label: "Best for agents" },
    { href: "/compare/best/local", label: "Best for local use" },
    { href: "/tools/api-cost-calculator", label: "API cost calculator" },
    BENCHMARK_CHECKLIST_LINK,
    DIRECTORY_LINK,
  ],
};