import { LINKED_PAGES } from "../../learn/guideConfig";
import type { GuideRecord } from "../../learn/guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../../learn/practitioner/practitionerSources";
import { COMPARE_SOURCES } from "../compareSources";

export const chatbotComparison: GuideRecord = {
  slug: "chatgpt-vs-claude-vs-gemini-vs-grok",
  number: 13,
  level: "compare",
  kind: "opinion",
  title: "ChatGPT vs Claude vs Gemini vs Grok: how to choose",
  metaDescription:
    "A plain comparison of ChatGPT, Claude, Gemini and Grok: what each help page says about files, research and study, and how to test them on your own work.",
  cardSummary: "What the help pages say about files, research and study, and a test you can run yourself.",
  summaryPoints: [
    "Model names and plan access change often, so compare the features you will use and the limits you will hit, not version numbers.",
    "The big four differ in the details that matter: how they read PDFs, how their research modes start and what they export.",
    "No published study we know of ranks all four on everyday tasks, so we do not name an overall winner.",
    "The safest way to choose is a one-evening test on three of your own tasks, using the free plans first.",
  ],
  sections: [
    {
      id: "why-not-model-names",
      heading: "Why we compare features, not model names",
      paragraphs: [
        "OpenAI's own release notes show how fast the lineup moves. In 2026 alone they record several models being retired from ChatGPT, with existing conversations moved to the current replacement, and a newer flagship reasoning model that rolled out to eligible paid plans only. The same notes say availability varies by product and plan, and tell readers to check the model picker.",
        "They also say that thinking time is adjusted from time to time and is not comparable across models, because each is tuned independently. So a claim like \"model A thinks longer than model B\" ages quickly. A comparison of what each product lets you do holds up better, and the table below is a snapshot to check against each help page.",
      ],
      sourceIds: [COMPARE_SOURCES.openaiModelReleaseNotes.id],
    },
    {
      id: "files-and-research",
      heading: "Files and research: what three help pages say",
      paragraphs: [
        "These are the two features where the products differ most in ways you can feel. The rows below come from the providers' own help pages as we read them on 27 October 2026. We have not tested them ourselves.",
      ],
      table: {
        caption: "Files and deep research (check current help pages, because limits change)",
        columns: ["Question", "ChatGPT", "Claude", "Gemini"],
        rows: [
          [
            "Charts and images inside PDFs",
            "Not read on plans other than Enterprise. Only digital text is extracted",
            "Read for PDFs up to 100 pages in chat, text only from 101 to 1,000 pages",
            "Not compared here. We have not read a matching Gemini help page",
          ],
          [
            "How deep research starts",
            "Describe the outcome you want, optionally choose websites or files",
            "Choose Research from the plus menu. Web search must be on",
            "Choose Deep Research from the Add Files menu, then submit your question",
          ],
          [
            "Plan you can edit first",
            "Yes, ChatGPT proposes a plan you can edit",
            "The help page does not describe a plan step",
            "Yes, you can choose Edit plan before it starts",
          ],
          [
            "What you get",
            "A structured report with citations or source links, downloadable as Markdown, Word or PDF",
            "A comprehensive response. The help page does not describe the format",
            "A written report that can be exported to Docs",
          ],
        ],
      },
      sourceIds: [
        SOURCES.claudeUploads.id,
        SOURCES.openaiFileUploads.id,
        SOURCES.openaiDeepResearchFaq.id,
        SOURCES.geminiDeepResearch.id,
        SOURCES.claudeResearch.id,
      ],
    },
    {
      id: "sources-and-study",
      heading: "Checking answers and studying: what the help pages say",
      table: {
        caption: "Source links and learning modes",
        columns: ["Question", "ChatGPT", "Claude", "Gemini"],
        rows: [
          [
            "Showing where an answer came from",
            "Deep research outputs include citations or source links so you can verify them",
            "Not covered on the pages we read",
            "A Sources button when links are provided. If it is missing, Gemini did not provide links for that response",
          ],
          [
            "A mode built for learning",
            "Study mode: guiding questions, quizzes, can work with uploaded notes. OpenAI says it can still make mistakes",
            "Learning mode, described at launch as a Projects feature that asks guiding questions. Check where it is available now",
            "Not compared here",
          ],
        ],
      },
      paragraphs: [
        "A link is something you can check, not a check that has been done. Our guide on fact-checking AI answers shows the routine.",
      ],
      sourceIds: [
        SOURCES.openaiDeepResearchFaq.id,
        SOURCES.geminiSources.id,
        SOURCES.openaiStudyMode.id,
        SOURCES.anthropicClaudeForEducation.id,
      ],
    },
    {
      id: "grok",
      heading: "Grok: where you use it changes what you get",
      paragraphs: [
        "xAI's documentation says the same Grok models power grok.com, the iOS and Android apps and the Grok experience inside X. Its comparison table describes Grok in X as having fewer features than the full web assistant, and says billing is separate for each: a purchase on X does not change your status on the xAI developer service, and the reverse.",
        "We did not find official xAI help pages for the consumer app that describe file limits, research modes or study tools in the detail the other three providers give, so we leave Grok out of the feature tables instead of filling them from third-party blogs. If a feature matters to you, check it inside the app.",
      ],
      sourceIds: [COMPARE_SOURCES.xaiIntroduction.id],
    },
    {
      id: "what-studies-cover",
      heading: "What the studies cover, and what they do not",
      paragraphs: [
        "A study by public broadcasters in October 2025 reviewed more than 3,000 answers to news questions from ChatGPT, Copilot, Gemini and Perplexity. It reported that 45% of answers had at least one significant issue and that references were missing or misleading in 31% of cases.",
        "It did not test Claude or Grok, and it tested news questions only. So it shows the type of mistake every assistant can make. It does not tell you which of the four is best for your job.",
      ],
      sourceIds: [SOURCES.ebuNewsIntegrity.id],
    },
    {
      id: "test-evening",
      heading: "A one-evening test that beats any review",
      steps: [
        {
          title: "Pick three real tasks",
          detail: "Choose work you actually do: a long document to summarise, a question that needs sources, and a piece of writing you need to edit. Avoid tasks that need private details.",
        },
        {
          title: "Use the same prompt in each tool",
          detail: "Start on free plans. Copy the prompt word for word so the only difference is the tool.",
        },
        {
          title: "Check the facts, not the tone",
          detail: "Open the sources, check the numbers against the original and note which tool admitted what it could not see.",
        },
        {
          title: "Write down the limits you hit",
          detail: "Note any file size, daily limit or missing feature that stopped you. Those limits, not the answers, are often the reason to pay or to switch.",
        },
        {
          title: "Decide, then re-test in a few months",
          detail: "Features and plans change. Repeat the test when a tool you rejected announces something you needed.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "same-task-test",
      title: "The same-task test prompt",
      whenToUse: "Paste the identical prompt into each chatbot you are comparing.",
      text: "Here is my task: [task in one sentence]. Audience: [who will read the result]. Give me the answer in [format and length]. For every factual claim, name the source. If you cannot see part of what I gave you, such as a chart or a page, say so instead of guessing.",
    },
    {
      id: "limits-check",
      title: "Ask a tool what it could not see",
      whenToUse: "After uploading a file, before you trust the summary.",
      text: "List anything in the attached document that you could not read or only partly read, such as images, charts, scanned pages or tables. Give page numbers where you can.",
    },
    {
      id: "score-the-answers",
      title: "Score the answers side by side",
      whenToUse: "When you have three answers and want a fair comparison.",
      text: "I will paste three answers to the same question, labelled A, B and C. For each, list the factual claims that can be checked, the claims that have no source, and anything that looks invented. Do not pick a winner. Then give me a checklist of what I should verify myself.",
    },
  ],
  whatCanGoWrong: [
    "You choose a tool because of a version name or a review that was out of date a month later.",
    "You judge by tone and confidence, and miss a swapped figure or a source that does not support the claim.",
    "You assume a feature is on your plan because it is on the provider's website.",
    "You compare the free plan of one tool with the paid plan of another, so the test is not fair.",
    "You treat a study of news answers as a ranking of all four tools for every job.",
  ],
  limitsNote:
    "This page is our opinion based on the sources below. Features and plan access change often, so confirm on each provider's help page before you rely on a row of the tables.",
  showPriceNotice: true,
  sources: [
    COMPARE_SOURCES.openaiModelReleaseNotes,
    SOURCES.claudeUploads,
    SOURCES.openaiFileUploads,
    SOURCES.openaiDeepResearchFaq,
    SOURCES.geminiDeepResearch,
    SOURCES.claudeResearch,
    SOURCES.geminiSources,
    SOURCES.openaiStudyMode,
    SOURCES.anthropicClaudeForEducation,
    COMPARE_SOURCES.xaiIntroduction,
    SOURCES.ebuNewsIntegrity,
  ],
  relatedSlugs: ["free-vs-paid-ai", "fact-check-ai-answers", "deep-research-modes"],
  relatedLinks: [
    LINKED_PAGES.bestModelByJob,
    LINKED_PAGES.bestToolsForStudents,
    LINKED_PAGES.consumerPlans,
    LINKED_PAGES.freePlanLimits,
  ],
  lastReviewed: "2026-10-27",
  published: true,
};
