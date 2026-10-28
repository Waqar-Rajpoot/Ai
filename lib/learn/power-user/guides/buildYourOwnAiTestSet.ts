import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES } from "../../practitioner/practitionerSources";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const buildYourOwnAiTestSet: GuideRecord = {
  slug: "build-your-own-ai-test-set",
  number: 23,
  level: "power-user",
  kind: "guide",
  title: "Build your own AI test set in one afternoon",
  metaDescription:
    "Pick ten of your own tasks, define what a good answer looks like, score each model the same way, record results and re-test on a schedule, with a scoring sheet.",
  cardSummary: "Pick 10 tasks, build a scoring sheet, run and record, and plan re-tests.",
  summaryPoints: [
    "A public score is a shortlist, not a verdict. Ten of your own tasks, scored the same way each time, tell you what works for you.",
    "Write down what a good answer looks like before you run anything, so you are not swayed by whichever answer sounds best.",
    "Keep settings the same across models, and record the model version, the settings and the date.",
    "Models and plans change, so repeat the test now and then.",
  ],
  sections: [
    {
      id: "why",
      heading: "Why test on your own tasks",
      paragraphs: [
        "Benchmark scores measure particular tests, not your work. Anthropic's guidance on evaluations makes the same point from the builder's side: a good evaluation is specific to the task, mirrors the real mix of inputs and includes the awkward cases, not only the easy ones. You do not need code to apply that idea. A spreadsheet and an afternoon are enough.",
      ],
      sourceIds: [SOURCES.anthropicEvals.id],
    },
    {
      id: "steps",
      heading: "The afternoon plan",
      steps: [
        {
          title: "Pick 10 real tasks (30 minutes)",
          detail: "Use jobs you actually do, with private details removed. Mix easy, medium and hard, and include at least two awkward cases, such as unclear instructions, a very long input, or a question the material does not answer.",
        },
        {
          title: "Define good (30 minutes)",
          detail: "For each task, write what a good answer looks like before you run anything. Anthropic's guidance says good criteria are specific and measurable, so write things you can check, such as 'includes all three dates' or 'under 150 words with a clear next step'.",
        },
        {
          title: "Run each one (60 minutes)",
          detail: "Use the same prompt and the same settings for every model. Paste the prompt in exactly, without improving it for the model you prefer.",
        },
        {
          title: "Score and record (45 minutes)",
          detail: "Score from 1 to 5 against your own definition of good. Note the score, the model version, the settings and the date. Score the answers with the model names hidden if you can, to avoid favouring a brand you like.",
        },
        {
          title: "Plan the re-test (15 minutes)",
          detail: "Put a date in your calendar to repeat the test, and whenever a model or plan you use changes.",
        },
      ],
      sourceIds: [SOURCES.anthropicEvals.id],
    },
    {
      id: "scoring-sheet",
      heading: "The scoring sheet",
      paragraphs: [
        "Use one row per task per model. Copy these column headings into a spreadsheet.",
      ],
      table: {
        caption: "Scoring sheet columns",
        columns: ["Column", "What to write"],
        rows: [
          ["Task", "A short name for the job"],
          ["What a good answer looks like", "Specific points you can check, written before you run it"],
          ["Model and settings", "Model name and version, effort setting, any tools turned on"],
          ["Score (1 to 5)", "Against your definition of good, not how impressive it sounds"],
          ["Notes", "What was missing, wrong or surprising"],
          ["Test date", "The day you ran it, since models and plans change"],
        ],
      },
    },
    {
      id: "grading",
      heading: "Scoring fairly",
      paragraphs: [
        "Anthropic's guidance describes three ways to grade. Code-based grading, such as an exact match, is fastest and most reliable but less nuanced. Grading by another model is fast and flexible, and suited to complex judgements. Human grading is the most flexible and highest quality but slow. For ten tasks, doing it yourself is fine.",
        "If you do ask a model to grade, the guidance suggests giving it a detailed rubric, asking for a simple score, and using a different model from the one that wrote the answer where you can. Test the grader on a few answers you have already judged yourself before you trust it.",
      ],
      bullets: [
        "Use the same scale and the same rubric for every model.",
        "Read the whole answer. A long, polished answer is not necessarily a correct one.",
        "Check facts against their sources, as in our fact-checking routine. A Stanford study of legal research tools counted a response as a hallucination if it falsely claimed that a source supports a statement, and still found rates of about 17% to 33% for the tools it tested.",
        "Include cost and time in your notes, because a slightly better answer that costs much more may not be worth it.",
      ],
      sourceIds: [SOURCES.anthropicEvals.id, PRACTITIONER_SOURCES.stanfordLegalHallucination.id],
    },
    {
      id: "using-results",
      heading: "Using the results",
      paragraphs: [
        "A small test is evidence, not proof. Ten tasks cannot tell you how a model behaves on everything, and one run can be lucky or unlucky. Use the results to choose a default, to find the task types where a stronger model is worth the extra cost, and to decide which work can go to a cheaper model. Then check the cheaper path against your test set before you rely on it.",
      ],
    },
  ],
  prompts: [
    {
      id: "draft-tasks",
      title: "Draft a first set of test tasks",
      whenToUse: "When you are not sure which ten tasks to choose.",
      text: "I work as [role] and use AI for [kinds of work]. Suggest ten realistic test tasks for comparing AI models: three easy, four medium, two hard and one awkward case such as unclear instructions. For each, write a short task description and three checkable points that would make an answer good.",
    },
    {
      id: "rubric",
      title: "Turn 'good' into a checklist",
      whenToUse: "When your idea of a good answer is still vague.",
      text: "For this task: [task]. Write a scoring rubric on a 1 to 5 scale. Describe what a 1, 3 and 5 answer looks like, using points that can be checked without guessing.",
    },
    {
      id: "blind-labels",
      title: "Compare answers without the model names",
      whenToUse: "When you have answers from several models and want to avoid brand bias.",
      text: "Here are [number] answers to the same task, labelled A, B and C: [paste answers]. Using this rubric: [paste rubric], score each from 1 to 5 and explain the main reason for each score in one sentence.",
    },
  ],
  whatCanGoWrong: [
    "Changing the prompt or settings between models, so you are comparing the prompts rather than the models.",
    "Choosing tasks that are all easy, or all like the ones the model already handles well.",
    "Writing the definition of good after you have seen the answers, which tends to favour the one you read first or liked best.",
    "Putting private or client material into a tool your organisation has not approved.",
    "Treating one run as final, when models and plans change and results can vary between runs.",
  ],
  limitsNote:
    "A personal test set shows what works for your tasks at one point in time. It is not a scientific benchmark and does not replace checking important answers yourself.",
  showPriceNotice: false,
  sources: [SOURCES.anthropicEvals, PRACTITIONER_SOURCES.stanfordLegalHallucination],
  relatedSlugs: ["fact-check-ai-answers", "reasoning-models-effort-settings", "ai-api-pricing-for-non-engineers", "best-ai-model-by-job"],
  relatedLinks: [LINKED_PAGES.benchmarkChecklist, LINKED_PAGES.bestModelByJob, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
