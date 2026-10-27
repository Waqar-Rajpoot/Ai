import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const isAiWorthPayingFor: GuideRecord = {
  slug: "is-ai-worth-paying-for",
  number: 16,
  level: "practitioner",
  kind: "opinion",
  title: "Is AI worth paying for? Our honest answer",
  metaDescription:
    "Our opinion on when a paid AI plan is worth it: what paid plans add, what research does and does not show, and a simple rule based on limits you actually hit.",
  cardSummary: "Our view: stay free until limits or missing features block work you do often.",
  summaryPoints: [
    "Our answer: for most casual users, a free plan is enough. Pay when you regularly hit a limit or a missing feature on work that matters to you.",
    "Paying buys more usage and extra features. It does not buy correct answers, and it does not make your data private by itself.",
    "Research shows AI can speed up some tasks and slow down others, and people misjudge which is which. Measure your own use.",
    "Pay for one service at a time, note the renewal date and review after a month.",
  ],
  sections: [
    {
      id: "our-answer",
      heading: "Our answer in one paragraph",
      paragraphs: [
        "If you ask an AI a few questions a week, stay on a free plan. If you use it most days for work or study, hit limits in the middle of a task, or need a feature the free plan lacks, a paid plan can be worth it. The test is not how impressive the tool is. It is whether it saves you time or improves work you do often enough to justify a recurring charge. This is our judgement from the evidence below, not a test result.",
      ],
    },
    {
      id: "what-paid-adds",
      heading: "What a paid plan adds, according to the provider",
      paragraphs: [
        "Take Anthropic's help page for its Pro plan as one example of the pattern. It says the paid plan adds more usage per session than the Free plan, longer multi-step tasks, priority access in busy periods, Claude Code access and early access to new features, and that it has a weekly limit across all models.",
        "It also warns that the number of messages you get depends on message length, attached file length, conversation length and the model or feature you use, and that Anthropic may limit usage in other ways. In other words, even paid plans have limits. Other providers have their own plan structures, so use the plan table linked below for current details.",
      ],
      sourceIds: [SOURCES.claudePaidPlan.id],
    },
    {
      id: "evidence",
      heading: "What the research says about getting value",
      paragraphs: [
        "The studies below were not designed to compare free and paid plans, so they cannot tell you whether a subscription pays off. They do show that value is real in some tasks, absent in others, and hard to judge by feel.",
      ],
      bullets: [
        "Writing: in an MIT experiment with 444 professionals, ChatGPT users finished short writing tasks about 10 minutes faster than a 27-minute average, and graders rated the work higher. The tasks were short and self-contained.",
        "Coding by experts: in a randomised trial by METR in early 2025, 16 experienced open-source developers took 19% longer on their tasks when AI was allowed. They had expected a 24% speed-up and still believed afterwards that AI had sped them up by about 20%. METR notes that the study was small and narrow, that it describes early-2025 tools, and that a later update says the historical result no longer reflects current impact.",
        "Learning: in a study of nearly 1,000 students, those with a plain chatbot did better in practice but worse on the exam without it, while those with a hint-based tutor matched the control group. Students using AI were overly optimistic about their own ability.",
      ],
      sourceIds: [SOURCES.noyZhangWriting.id, SOURCES.metrDeveloperStudy.id, SOURCES.bastaniGuardrails.id],
    },
    {
      id: "decision-rule",
      heading: "A decision rule you can use",
      table: {
        caption: "Signs that favour staying free and signs that favour paying",
        columns: ["Stay on the free plan if", "Consider paying if"],
        rows: [
          ["You use AI a few times a week", "You use it on most working days"],
          ["Limits are a minor annoyance", "You regularly hit a limit mid-task on work that matters"],
          ["You mostly ask short questions", "You need long files, longer multi-step tasks or other features the free plan lacks"],
          ["You cannot name the time saved", "You can name the task and roughly the time it saves each week"],
          ["You are still learning what you want from it", "Two weeks of logged use show a clear pattern"],
        ],
      },
    },
    {
      id: "how-to-test",
      heading: "How to find out for yourself",
      steps: [
        {
          title: "Log two weeks on the free plan",
          detail: "Each time you hit a limit or miss a feature, write down the task, what stopped you and how much time it cost.",
        },
        {
          title: "Time one task both ways",
          detail: "Pick a task you do weekly. Time it once with AI and once without, and include the time spent checking the AI's output. Since the developers in the METR study misjudged their own speed, trust the clock more than your impression.",
        },
        {
          title: "Count the checking",
          detail: "An answer that needs full verification saves less than it seems to. Our fact-checking guide explains what to check.",
        },
        {
          title: "Add up the real cost",
          detail: "Use the subscription cost calculator with current prices from the provider's own page. Include any add-ons and the billing period you chose.",
        },
        {
          title: "Subscribe to one service, then review",
          detail: "Note the renewal date, set a reminder and ask a simple question after a month: would I notice if this disappeared tomorrow?",
        },
      ],
      sourceIds: [SOURCES.metrDeveloperStudy.id],
    },
    {
      id: "where-we-could-be-wrong",
      heading: "Where we could be wrong",
      bullets: [
        "Plans and limits change often. A plan that was too restrictive last quarter may suit you now, and the reverse.",
        "Your work is not the average of any study. Your own log is better evidence than ours.",
        "We have not run a head-to-head test of paid plans. If a comparison page on this site makes a claim about plans, check its date and sources.",
      ],
    },
  ],
  prompts: [
    {
      id: "usage-log-summary",
      title: "Turn my usage log into a decision",
      whenToUse: "After two weeks on a free plan. Use general descriptions of tasks only.",
      text: "Here is a two-week log of how I used an AI chatbot: [tasks, times I hit a limit, features I missed, and minutes saved or lost]. Ask me up to five questions, then tell me whether the log suggests a paid plan is likely to be worth it. List what I should confirm on the provider's pricing page. Do not recommend a specific product.",
    },
    {
      id: "time-test-plan",
      title: "Plan a fair time test",
      whenToUse: "To compare doing a task with and without AI.",
      text: "I want to test whether AI saves me time on [task I do weekly]. Design a simple test I can run in a week: what to time, how to include checking time, how to record quality, and how to avoid fooling myself.",
    },
    {
      id: "cancel-checklist",
      title: "Cancellation and renewal checklist",
      whenToUse: "When you start or end a paid plan.",
      text: "Write a short checklist for starting a paid AI plan and for cancelling it. Include: the billing period I chose, where I subscribed, a reminder date before renewal, how to cancel in the same place, and a question to ask myself after one month.",
    },
  ],
  whatCanGoWrong: [
    "Paying for several services at once and using only one of them.",
    "Assuming a higher tier means fewer mistakes. Check important answers whatever you pay.",
    "Judging by how fast the work feels. The METR developers felt faster than they were.",
    "Using an old price or limit from a video or an article. Confirm on the provider's website.",
    "Forgetting the renewal date, and paying for months you did not use.",
  ],
  limitsNote:
    "This is our opinion and general information, not financial advice. Your own budget and usage decide what is worth paying for.",
  showPriceNotice: true,
  sources: [
    SOURCES.claudePaidPlan,
    SOURCES.noyZhangWriting,
    SOURCES.metrDeveloperStudy,
    SOURCES.bastaniGuardrails,
  ],
  relatedSlugs: ["free-vs-paid-ai", "fact-check-ai-answers", "where-ai-helps-and-fails"],
  relatedLinks: [
    LINKED_PAGES.consumerPlans,
    LINKED_PAGES.costCalculator,
    LINKED_PAGES.chatbotComparison,
    LINKED_PAGES.bestModelByJob,
  ],
  lastReviewed: "2026-10-27",
  published: true,
};
