import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { EXPERT_SOURCES as SOURCES } from "../expertSources";

export const howToReadAiBenchmark: GuideRecord = {
  slug: "how-to-read-ai-benchmark",
  number: 27,
  level: "expert",
  kind: "explainer",
  title: "How to read an AI benchmark: what the numbers hide",
  metaDescription:
    "What an AI benchmark score does and does not tell you: prompt format, data contamination, human-preference leaderboards, who ran the test, and questions to ask.",
  cardSummary: "What a score hides, six questions to ask, and why your own tasks beat a leaderboard.",
  summaryPoints: [
    "A benchmark score is one number from one test, run one way. It is a shortlist tool, not a verdict on which model is best for you.",
    "Results can move with the prompt format, and a model may have seen the test during training, which can inflate a score.",
    "A human-preference leaderboard measures what voters preferred, which is not the same as what is correct or right for your task.",
    "Ask who ran the test, which version and settings, and whether you can repeat it. Then check on your own tasks.",
  ],
  sections: [
    {
      id: "what-a-score-is",
      heading: "What a benchmark score is",
      paragraphs: [
        "A benchmark is a fixed set of questions or tasks with a way of scoring the answers. A model is run on it and the result is reported as a percentage, a rank or a rating. That makes models easy to compare, but only on what the test measures and only under the conditions it was run in.",
        "This guide explains four things that numbers can hide, then gives a list of questions you can ask of any score. We have not run our own benchmark tests for this page. Everything below comes from the studies and pages cited.",
      ],
    },
    {
      id: "format-sensitivity",
      heading: "Hidden factor 1: the prompt format",
      paragraphs: [
        "A 2023 preprint tested what happens when only the formatting of a prompt changes while its meaning stays the same, such as separators and spacing. It found that several widely used open models were highly sensitive to this in few-shot settings, and that formatting alone shifted one model's accuracy by up to 76 points. It found the sensitivity persisted as models got larger, as more examples were added and after instruction tuning.",
        "The authors argue that evaluations should report a range of results across plausible formats instead of a single one, and found that a model's results across formats correlated only weakly with other models'. That means a comparison that used one arbitrary format may not be a fair ranking. The paper studied the open models of its time, so it shows the kind of effect to look for, not the size of the effect today.",
      ],
      sourceIds: [SOURCES.promptFormatSensitivity.id],
    },
    {
      id: "contamination",
      heading: "Hidden factor 2: the model may have seen the test",
      paragraphs: [
        "Benchmark data contamination happens when a model unintentionally learns information from an evaluation benchmark during training. A 2024 survey describes this as making the scores inaccurate or unreliable, because a model that has effectively seen the test material may not behave the same way in real use. The survey names widely used models among those affected and reviews other ways of assessing models that reduce the risk.",
        "As a reader you usually cannot tell whether a particular score is affected. What you can do is prefer tests that are kept private or refreshed, treat a very high score on an old, public test with caution, and check on tasks of your own.",
      ],
      sourceIds: [SOURCES.benchmarkContamination.id],
    },
    {
      id: "human-preference",
      heading: "Hidden factor 3: what a preference vote measures",
      paragraphs: [
        "Some leaderboards do not use a fixed test. Chatbot Arena, described in a 2024 paper, collects pairwise comparisons: a person sees two answers and picks the one they prefer. The authors report more than 240,000 votes, that the questions were diverse and discriminating, and that the crowd's votes agreed well with expert raters. It is one of the most referenced leaderboards.",
        "That is a strength, because the questions come from real users. It also defines what the ranking means. It shows which answers voters preferred, and that is not necessarily the answer that is correct, safe or right for your work. Answers that look polished can win votes. Use a preference ranking as a clue about general quality and style, then test your own tasks for accuracy.",
      ],
      sourceIds: [SOURCES.chatbotArena.id],
    },
    {
      id: "who-ran-it",
      heading: "Hidden factor 4: who ran it, and how",
      paragraphs: [
        "Scores in a launch announcement are normally run by the company that made the model, on tests it chose, with settings it chose. This site labels such claims vendor-reported. That is not a reason to ignore them, but it is a reason to look for an independent result before relying on them.",
        "Also look at what is not on the chart: the model version, the effort or thinking setting, whether tools were switched on, how many attempts were allowed, and what it cost to get the result. A higher score at much higher cost, or with the best of several tries, is a different claim from a single default run.",
      ],
    },
    {
      id: "questions",
      heading: "Six questions to ask of any score",
      table: {
        caption: "A checklist for reading a benchmark claim",
        columns: ["Question", "Why it matters", "A warning sign"],
        rows: [
          ["Who ran the test?", "Vendor-reported and independent results differ in how far you can trust them", "Only the maker's own chart"],
          ["Which model version and settings?", "The same name can mean different versions, effort levels or tools", "No version, no date"],
          ["How was the prompt written?", "Format alone can move results", "One format, no range reported"],
          ["Could the model have seen the test?", "Contamination inflates scores", "An old, public test with near-perfect results"],
          ["What does the score actually measure?", "A preference vote, an exam and a coding task are different things", "A single 'overall' number"],
          ["Does it resemble your work?", "A test of unrelated tasks tells you little about yours", "No task matching what you do"],
        ],
      },
      sourceIds: [SOURCES.promptFormatSensitivity.id, SOURCES.benchmarkContamination.id],
    },
    {
      id: "use-scores",
      heading: "How to use scores sensibly",
      steps: [
        {
          title: "Use scores to shortlist",
          detail: "Pick two or three models that look promising from several independent sources, not one chart.",
        },
        {
          title: "Check the date and the version",
          detail: "A score for an older version says little about the one you can use today.",
        },
        {
          title: "Run your own tasks",
          detail: "Ten of your own tasks, scored the same way every time, tell you more about your work than a public number.",
        },
        {
          title: "Repeat on a schedule",
          detail: "Models and plans change, so re-test now and then and record the date.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "explain-claim",
      title: "Pick apart a benchmark claim",
      whenToUse: "When you see a chart or a headline score and want to know what to check.",
      text: "Here is a benchmark claim: [paste the claim, no private details]. List what it does not tell me. In particular, say what I would need to know about who ran it, the model version and settings, how the prompt was formatted, whether the test could be in the training data, and what the score measures. Do not guess any of these. Say 'not stated' where the claim leaves it out.",
    },
    {
      id: "map-to-my-work",
      title: "Match a benchmark to your work",
      whenToUse: "To see whether a test is relevant to what you do.",
      text: "A benchmark is described like this: [description]. I mainly use AI for [your tasks]. How closely does the benchmark resemble my work, and what tests of my own would tell me more? Suggest three.",
    },
    {
      id: "format-check",
      title: "Test prompt format sensitivity yourself",
      whenToUse: "When you want to see how fragile a result is.",
      text: "I will give you the same question written in three layouts: [layout A], [layout B], [layout C]. Answer each separately in a fresh reply, and then tell me if your three answers differ and why.",
    },
  ],
  whatCanGoWrong: [
    "Choosing a model because of one headline number, from one chart, run by its maker.",
    "Comparing scores that used different prompt formats, settings or versions as if they were comparable.",
    "Trusting a near-perfect score on an old, public test.",
    "Treating a popularity ranking as a measure of correctness.",
    "Relying on an old score after the model or its settings have changed.",
  ],
  limitsNote:
    "This guide explains how to read benchmark claims. It does not rank models, and we have not run our own benchmark tests for it.",
  showPriceNotice: false,
  sources: [SOURCES.promptFormatSensitivity, SOURCES.benchmarkContamination, SOURCES.chatbotArena],
  relatedSlugs: ["build-your-own-ai-test-set", "best-ai-model-by-job", "fact-check-ai-answers", "reasoning-models-effort-settings"],
  relatedLinks: [LINKED_PAGES.benchmarkChecklist, LINKED_PAGES.benchmarkPrices, LINKED_PAGES.modelDirectory, LINKED_PAGES.expertHub],
  lastReviewed: "2026-10-27",
  published: true,
};
