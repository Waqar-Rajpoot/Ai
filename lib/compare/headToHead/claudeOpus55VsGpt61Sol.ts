import { LINKED_PAGES } from "../../learn/guideConfig";
import type { GuideRecord } from "../../learn/guideTypes";
import { POWER_USER_SOURCES as SOURCES } from "../../learn/power-user/powerUserSources";

export const claudeOpus55VsGpt61Sol: GuideRecord = {
  slug: "claude-opus-5-5-vs-gpt-6-1-sol",
  number: 24,
  level: "head-to-head",
  kind: "head-to-head",
  title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks",
  metaDescription:
    "A test plan for Claude Opus 5.5 and GPT-6.1 Sol: ten everyday tasks, the same prompts and settings, a fixed scoring rubric and a cost-per-task method.",
  cardSummary: "Two models, the same ten tasks, one test day, and cost per task.",
  summaryPoints: [
    "Both models get the same ten everyday tasks, the same prompts and the same settings, on one test day.",
    "Each answer is scored from 1 to 5 against a definition of good that is written before the test is run.",
    "Cost is reported per finished task, using the token counts each tool reports, not only the price per million tokens.",
    "Results are not published yet. Until the test is run, this page is the method only.",
  ],
  sections: [
    {
      id: "status",
      heading: "Status: method only, results pending",
      paragraphs: [
        "We have not yet run this test, so this page makes no claim about which model is better. It sets out the method in advance so the results, when they exist, can be checked against a plan that was fixed before anyone saw the answers.",
        "Anything about either model that is not in the results table should be read as unverified. Model names, versions, settings and prices change, so every result will carry its test date.",
      ],
    },
    {
      id: "rules",
      heading: "Rules of the test",
      bullets: [
        "One test day. Both models are run on the same day so that neither is advantaged by a later update.",
        "Same prompt, word for word, for each task. No prompt is improved for one model.",
        "Same settings where the tools allow. The effort or thinking setting, any tools such as web search and the plan used are recorded for each model, and listed in the results.",
        "A fresh chat for every task, so earlier tasks cannot influence later ones.",
        "Answers are scored with the model names hidden, using the written definition of good for that task.",
        "One run per task. Because results can vary between runs, a single run is evidence, not proof.",
      ],
      sourceIds: [SOURCES.anthropicEvals.id],
    },
    {
      id: "ten-tasks",
      heading: "The ten tasks",
      paragraphs: [
        "The tasks are everyday jobs with private details removed. Each has a definition of good that is checkable. Task 10 is deliberate: the material does not contain the answer, so a good response says so.",
      ],
      table: {
        caption: "Tasks and what a good answer looks like",
        columns: ["#", "Task", "A good answer"],
        rows: [
          ["1", "Reply to a tricky customer email that mixes a complaint and a request", "Acknowledges the complaint, answers the request, keeps a calm tone, under 150 words"],
          ["2", "Summarise a five-page report with page references", "Covers the main findings, each point has a correct page reference, nothing invented"],
          ["3", "Plan a week of meetings with five stated constraints", "Every constraint is met, or the conflict is named"],
          ["4", "Fix a broken spreadsheet formula and explain the cause", "Working formula, correct explanation, no unrelated changes"],
          ["5", "Explain a technical idea at two reading levels", "Both versions are accurate, and the simpler one avoids jargon"],
          ["6", "Compare two options against a set of rules", "Each rule is applied, with a clear recommendation and reasons"],
          ["7", "Rewrite a paragraph for a different tone and length", "Meaning preserved, requested tone and length met"],
          ["8", "Turn messy notes into a clean table", "All items present, correct values, no extra rows"],
          ["9", "Answer a research question and cite sources", "Claims match the sources when opened, links work, dates are given"],
          ["10", "Answer a question the supplied text does not cover", "Says the text does not answer it, instead of guessing"],
        ],
      },
      sourceIds: [SOURCES.anthropicEvals.id],
    },
    {
      id: "scoring",
      heading: "How answers are scored",
      paragraphs: [
        "Each answer gets a score from 1 to 5 against the written definition of good for its task. A 5 meets every point, a 3 meets the main points with a clear gap and a 1 misses the point or contains something false. Facts are checked against sources. A confident tone earns nothing.",
        "Scoring follows the approach described in Anthropic's guidance on evaluations: specific, measurable criteria, with grading done against a rubric. Human grading is slow, but with ten tasks it is practical and avoids relying on a model to mark its own kind.",
      ],
      sourceIds: [SOURCES.anthropicEvals.id],
    },
    {
      id: "cost-method",
      heading: "How cost per task will be reported",
      paragraphs: [
        "For each task and model we will record the input and output tokens that the tool reports, including any hidden reasoning that is billed as output. Cost per task is then (input tokens ÷ 1,000,000 × input price) + (output tokens ÷ 1,000,000 × output price), using prices copied from the provider on the test date and dated in the table.",
        "OpenAI's documentation says reasoning tokens are billed as output tokens, so the effort setting used for each model is recorded alongside its cost. A model that scores slightly higher at much higher effort will be reported as exactly that.",
      ],
      sourceIds: [SOURCES.openaiReasoning.id],
    },
    {
      id: "results",
      heading: "Results",
      paragraphs: [
        "Not yet run. When the test day is complete, this section will list, for each task, both scores, the settings, the token counts, the cost per task and the test date, with the unedited answers linked so you can mark them yourself.",
      ],
    },
  ],
  prompts: [
    {
      id: "run-your-own",
      title: "Run the same comparison on your tasks",
      whenToUse: "To repeat this method with your own work instead of waiting for our results.",
      text: "Here are ten tasks I do regularly: [list, private details removed]. For each, write three checkable points that define a good answer. I will run the same prompt on two models and score the answers myself.",
    },
  ],
  whatCanGoWrong: [
    "Reading this page as a verdict. It is a method until the results section is filled in.",
    "Comparing models at different settings, such as one with web search or high effort and one without.",
    "Judging one run as if it were the average. Repeat the test before you rely on a small difference.",
    "Using a result that is out of date. Models, plans and prices change, so check the test date.",
  ],
  limitsNote:
    "A ten-task test shows how two models behaved on these tasks on one day. It is not a benchmark and may not match your own work. Our guide on building a personal test set shows how to check for yourself.",
  showPriceNotice: true,
  sources: [SOURCES.anthropicEvals, SOURCES.openaiReasoning],
  relatedSlugs: ["build-your-own-ai-test-set", "ai-api-pricing-for-non-engineers", "reasoning-models-effort-settings", "best-ai-model-by-job", "chatgpt-vs-claude-vs-gemini-vs-grok"],
  relatedLinks: [LINKED_PAGES.apiPrices, LINKED_PAGES.modelDirectory, LINKED_PAGES.benchmarkChecklist, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
