import type { BestForRoundup } from "../types";
import { BENCHMARK_CHECKLIST_LINK, DIRECTORY_LINK, HOW_WE_TEST_LINK } from "../links";

export const writingRoundup: BestForRoundup = {
  slug: "writing",
  label: "Writing",
  level: "Levels 2-3",
  question: "Which model writes the best drafts and follows format limits?",
  description:
    "Models ranked on drafts with strict length and format rules, the third point of the scorecard.",
  metaTitle: "Best AI model for writing",
  metaDescription:
    "How to choose an AI model for writing: what leaderboards measure, what to test yourself, and common mistakes. Picks follow our own writing tests.",
  quickAnswer:
    "We are not naming a writing pick yet. The directory's labels do not cover writing, and the public leaderboards we found mostly rank older model versions. Writing quality is also partly a matter of taste, so the honest answer is to run your own test. This page shows what the leaderboards measure, what to check in a draft, and a five-step test you can finish in an afternoon. Our ranking will follow our own writing tests.",
  whoItIsFor: [
    "Anyone who writes emails, reports, posts or essays with AI help.",
    "Small teams that need a consistent voice and strict format.",
    "Writers deciding whether a paid plan beats a free one.",
  ],
  startingPointIds: [],
  startingPointsNote:
    "The directory's labels do not cover writing, so this ranking comes from our writing tests and no pick is shown yet.",
  modelRoleNotes: {},
  candidates: [],
  candidatesNote: "",
  decisionGuide: [
    {
      situation: "You need a draft that obeys a strict length, tone or template.",
      advice: "Test instruction following first. Give each model the same brief with three hard limits and count how many it keeps.",
    },
    {
      situation: "You want a distinctive creative voice.",
      advice: "Read each model's output side by side with names hidden. Human-preference arenas help, but taste varies.",
    },
    {
      situation: "You write in a language other than English.",
      advice: "Test in that language. Reviewers report that quality differs by language, and English results may not carry over.",
    },
    {
      situation: "You need sourced facts and quotes.",
      advice: "Use a tool with live search and citations for research, then draft separately. Check every quote against its source.",
    },
    {
      situation: "You write inside Google Docs or Word.",
      advice: "An assistant built into the editor may save more time than a slightly better model in another window.",
    },
  ],
  reportedFigures: [],
  glossary: [
    {
      term: "Creative writing arena",
      meaning: "A leaderboard where people vote between two anonymous answers to the same prompt.",
      caution: "Check the vote count and margin. Small gaps are ties, and a leaderboard may list older model versions.",
    },
    {
      term: "Instruction following",
      meaning: "How well a model keeps to rules such as word count, tone, format or banned words.",
      caution: "A fluent draft that ignores your limits costs more editing time than a plainer draft that obeys them.",
    },
    {
      term: "Tone drift",
      meaning: "When a long document slowly loses the voice you asked for.",
      caution: "It shows up late. Test with a long draft, not only a paragraph.",
    },
  ],
  howWeWillRank: [
    "The same brief given to every model, such as an email, a summary and a short article.",
    "Whether the draft keeps to a stated length, tone and format, counted rather than judged by feel.",
    "How much editing each draft needs before you could send it.",
    "Blind scoring where we can, so model names do not sway the result.",
  ],
  selfTest: [
    { title: "Write three briefs", detail: "One short email, one 300-word summary, one piece with a strict template. Add three hard limits to each." },
    { title: "Run each brief on every model you are considering", detail: "Use the same text every time and the same effort setting." },
    { title: "Check the limits", detail: "Count words, check the format, and note every rule that was broken." },
    { title: "Edit one draft from each model", detail: "Time yourself. The model that takes least time to fix is often the one to choose." },
    { title: "Verify facts", detail: "Check names, numbers and quotes against sources before you send anything." },
  ],
  tips: [
    "Paste a sample of your own writing and ask the model to match its tone.",
    "State limits as numbers: 120 words, three bullets, no jargon.",
    "Ask for two versions and keep the better parts of each.",
  ],
  commonMistakes: [
    "Judging a model on one lucky paragraph.",
    "Sending a draft without checking facts and quotes.",
    "Assuming an English result applies to your language.",
  ],
  keepInMind: [
    "Read every draft yourself. AI can state wrong facts in smooth sentences.",
    "Check quotes, names and numbers against the source.",
    "Writing taste is personal. A ranking is a shortlist, not a verdict.",
  ],
  faq: [
    { question: "Why is there no writing pick yet?", answer: "The directory does not label any model for writing, and we do not guess. Picks will follow our own writing tests." },
    { question: "Are writing leaderboards useful?", answer: "As a rough guide, yes. Many list older versions and small margins, so use them to build a shortlist, not to decide." },
    { question: "Do I need a paid plan to write well?", answer: "Often not. Free plans are enough for many drafts, but they have usage limits that can stop a long session." },
    { question: "Can AI writing be detected?", answer: "Detection is unreliable. The safer habit is to edit the draft in your own voice and follow any rules your school or employer sets." },
  ],
  sources: [
    { name: "BenchLM: Best LLM for writing", url: "https://www.benchlm.ai/blog/posts/best-llm-writing", note: "Third-party roundup that lists arena and instruction-following scores. It names earlier model generations, so we use it only to explain what is measured." },
    { name: "Model directory", url: "/compare/models", note: "Used for starting points on other roundups. It has no writing label." },
  ],
  related: [
    { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
    { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
    BENCHMARK_CHECKLIST_LINK,
    HOW_WE_TEST_LINK,
    DIRECTORY_LINK,
  ],
};