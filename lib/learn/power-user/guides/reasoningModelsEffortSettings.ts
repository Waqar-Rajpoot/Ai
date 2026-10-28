import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const reasoningModelsEffortSettings: GuideRecord = {
  slug: "reasoning-models-effort-settings",
  number: 18,
  level: "power-user",
  kind: "explainer",
  title: "Reasoning models and effort settings: when thinking longer helps",
  metaDescription:
    "What reasoning models do, why higher effort settings use more tokens, which tasks benefit from thinking longer, and how to test the setting on your own work.",
  cardSummary: "What reasoning models do, when more effort helps, and when it only costs more.",
  summaryPoints: [
    "Reasoning models work through a problem in hidden steps before they answer. Many tools let you choose how much.",
    "Those hidden steps are made of tokens. Provider documentation says they take up space in the context window and are billed as output.",
    "More effort tends to help with multi-step problems and tends to add cost without much gain on simple tasks.",
    "Setting names and defaults differ by provider and model, so test the setting on your own tasks.",
  ],
  sections: [
    {
      id: "what-they-do",
      heading: "What a reasoning model does differently",
      paragraphs: [
        "OpenAI's documentation says reasoning models use internal reasoning tokens before they produce a response, and recommends them for complex problem solving, coding, scientific reasoning and multi-step agent workflows. Anthropic describes extended thinking in similar terms: the model reasons internally before it writes the final answer.",
        "You do not always see this reasoning. OpenAI says its reasoning tokens are not visible through the API. Some apps show a summary of the thinking, and the details differ by tool.",
      ],
      sourceIds: [SOURCES.openaiReasoning.id, SOURCES.anthropicExtendedThinking.id],
    },
    {
      id: "effort-settings",
      heading: "What an effort setting controls",
      paragraphs: [
        "OpenAI's reasoning effort setting controls how much the model thinks before it responds. Lower settings favour speed and fewer tokens. Higher settings favour more thorough answers. The values on offer depend on the model, and defaults vary, so one model's medium may not match another's.",
        "Anthropic has used two approaches. One sets a thinking budget, a target number of tokens for reasoning. The documentation says this is a target, not a strict cap, and that the model may stop well before it. Newer models use an effort level instead, and the documentation says that at lower effort the model may skip thinking on easy inputs. Older settings are being retired on newer models, which is a good example of why you should check the current help page before relying on a setting name.",
      ],
      sourceIds: [SOURCES.openaiReasoning.id, SOURCES.anthropicExtendedThinking.id],
    },
    {
      id: "cost-of-thinking",
      heading: "Why thinking longer costs more",
      paragraphs: [
        "Both providers' documentation says the hidden reasoning is made of tokens, and that they count in three ways.",
      ],
      bullets: [
        "Cost: OpenAI says reasoning tokens are billed as output tokens. Anthropic says thinking tokens are part of the billed output tokens.",
        "Space: reasoning takes up room in the context window, and Anthropic says thinking counts toward the maximum output for the turn.",
        "Truncation: OpenAI says that if output hits the limit, the response is marked incomplete, which can happen before any visible answer is produced. It suggests reserving generous room for reasoning and output when you start out.",
      ],
      sourceIds: [SOURCES.openaiReasoning.id, SOURCES.anthropicExtendedThinking.id],
    },
    {
      id: "when-it-helps",
      heading: "When more effort is worth it",
      paragraphs: [
        "Provider guidance and our own rule of thumb agree on the broad picture. The table is our opinion, not a benchmark result. We have not measured how much each task gains, so test it on your own work.",
      ],
      table: {
        caption: "Rule of thumb for choosing an effort level",
        columns: ["Task", "Effort", "Why"],
        rows: [
          ["Multi-step maths or logic", "Higher", "Intermediate steps are where errors creep in, and thinking time gives room to check them"],
          ["Planning with several constraints", "Higher", "The model has to weigh rules against each other"],
          ["Debugging tricky code", "Higher", "Tracing cause and effect across steps benefits from working it through"],
          ["Rewording or formatting", "Lowest available", "The answer does not depend on working anything out"],
          ["Short summaries and simple lookups", "Low", "Speed matters more than depth, and the content is already in front of the model"],
          ["Classification at high volume", "Low or none", "OpenAI says the lowest setting suits latency-critical tasks that do not benefit from reasoning, such as classification"],
        ],
      },
      sourceIds: [SOURCES.openaiReasoning.id],
    },
    {
      id: "test-it",
      heading: "How to test the setting on your own tasks",
      steps: [
        {
          title: "Pick three tasks you do often",
          detail: "Choose one hard one, one medium and one easy. Use real work with private details removed.",
        },
        {
          title: "Run each at low and high effort",
          detail: "Keep the prompt and model the same and change only the effort setting.",
        },
        {
          title: "Score the answers before you compare",
          detail: "Decide what a good answer looks like first, so you do not favour whichever answer is longer.",
        },
        {
          title: "Record time and tokens too",
          detail: "Note how long each took and, where the tool shows it, how many tokens each used. A tiny gain at large cost is not worth it.",
        },
        {
          title: "Set a default and an exception",
          detail: "Use the lower setting by default, and raise it only for the task types where the test showed a clear gain.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "check-your-work",
      title: "Ask for a check without extra effort settings",
      whenToUse: "When you want more care but are using a tool with no effort control.",
      text: "Solve [problem]. Then check your answer by working it a second way, and tell me if the two results differ. List any assumptions you made.",
    },
    {
      id: "constraint-plan",
      title: "Plan with explicit constraints",
      whenToUse: "For planning tasks where more effort tends to help.",
      text: "Plan [task] under these constraints: [constraint 1], [constraint 2], [constraint 3]. For each constraint, say how the plan meets it. If two constraints conflict, say which you relaxed and why.",
    },
    {
      id: "fast-answer",
      title: "Keep it short when you do not need depth",
      whenToUse: "For simple lookups and rewording where extra thinking only adds cost.",
      text: "Answer in two sentences with no extra explanation: [question]. If you are unsure, say so instead of guessing.",
    },
  ],
  whatCanGoWrong: [
    "Paying for high effort on tasks that do not need it, which adds delay and tokens for no better answer.",
    "Assuming a longer or more confident answer is a more correct one. Reasoning models can still be wrong.",
    "Running out of output room, so the reply is cut off or empty because hidden reasoning used the budget.",
    "Copying a setting name from an old tutorial. Names, values and defaults change by model and over time.",
    "Treating the hidden reasoning as a faithful record you can audit. Check the answer, not the explanation.",
  ],
  limitsNote:
    "Settings, defaults and what apps display differ by provider and change often. This guide reflects the documentation we read on 27 October 2026.",
  showPriceNotice: true,
  sources: [SOURCES.openaiReasoning, SOURCES.anthropicExtendedThinking],
  relatedSlugs: ["context-windows-tokens-memory", "ai-api-pricing-for-non-engineers", "deep-research-modes", "build-your-own-ai-test-set"],
  relatedLinks: [LINKED_PAGES.apiCostCalculator, LINKED_PAGES.modelDirectory, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
