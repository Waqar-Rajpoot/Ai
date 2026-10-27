import { LINKED_PAGES } from "../../learn/guideConfig";
import type { GuideRecord } from "../../learn/guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../../learn/practitioner/practitionerSources";
import { COMPARE_SOURCES } from "../compareSources";

export const bestModelByJob: GuideRecord = {
  slug: "best-ai-model-by-job",
  number: 14,
  level: "compare",
  kind: "opinion",
  title: "Best AI model right now, by job: what to look for",
  metaDescription:
    "No single AI model wins every job. See what to look for in six everyday jobs, what published studies found, and a short test to find the best fit for your work.",
  cardSummary: "Six everyday jobs, what the evidence says about each, and how to pick for your own work.",
  summaryPoints: [
    "We do not crown one model. We have not run our own benchmark tests, and the studies we found do not rank today's models by job.",
    "For each job the page shows what to look for, what a published study found and a rule of thumb.",
    "Model names change quickly, so choose by the feature the job needs, such as reading charts, citing sources or giving hints.",
    "Test two or three tools on your real task, and check the facts yourself before you rely on the result.",
  ],
  sections: [
    {
      id: "how-to-read",
      heading: "How to read a page about the best model",
      paragraphs: [
        "Lists of the best model go out of date fast. OpenAI's release notes show models being retired and replaced several times in 2026, and say that availability varies by plan and that readers should check the model picker. The same is true of the other providers.",
        "So this page does not name a winner. For each job it shows the feature that matters, the evidence we found and a rule of thumb. The rules of thumb are our opinion. The studies measured particular tools, tasks and people at a particular time, so an older result may not hold for a newer tool.",
      ],
      sourceIds: [COMPARE_SOURCES.openaiModelReleaseNotes.id],
    },
    {
      id: "jobs-table",
      heading: "Six everyday jobs",
      table: {
        caption: "What to look for, what studies found, and our rule of thumb",
        columns: ["Job", "What to look for", "What the evidence found", "Our rule of thumb"],
        rows: [
          [
            "Short professional writing",
            "Good control of tone and length, and an easy way to edit",
            "In a study of 444 professionals, those given ChatGPT took about 10 minutes less than a 27-minute average and were graded higher. Most did not edit the output much",
            "Use for first drafts of routine writing, then edit for accuracy and voice",
          ],
          [
            "Summarising long documents",
            "Whether the tool reads charts and scans, and how long a file it accepts",
            "Claude's help page says charts and images are read in PDFs up to 100 pages. OpenAI's FAQ says plans other than Enterprise use text only. A 2023 preprint found models often used the middle of a long input less reliably",
            "Ask for page numbers, split long files and open the cited pages",
          ],
          [
            "Research with sources",
            "A research mode with an editable plan and links you can open",
            "A public-broadcaster study found references missing or misleading in 31% of news answers. A Stanford study of legal research tools found hallucination rates of about 17% to 33%. Neither tested the research modes",
            "Treat links as things to check. Audit the claims the conclusion rests on",
          ],
          [
            "Studying and homework help",
            "A mode that gives hints and questions instead of answers",
            "In a study of nearly 1,000 maths students, a plain chatbot raised practice scores but lowered exam scores by 17%. A hint-based tutor matched the control on the exam",
            "Try first, ask for hints, then test yourself without the AI",
          ],
          [
            "Expert software work",
            "How well it handles a codebase you know, and how you measure it",
            "In a small 2025 trial, 16 experienced developers took 19% longer with AI on codebases they knew. The researchers say this snapshot no longer reflects current impact",
            "Do not assume a speed-up. Time your own work with and without the tool",
          ],
          [
            "Anything with legal, medical or money stakes",
            "Clear sources and a plain statement of what the tool cannot do",
            "The legal-research study above shows even specialist tools can cite sources that do not support the statement",
            "Use it to prepare questions. Get a qualified professional to decide",
          ],
        ],
      },
      sourceIds: [
        SOURCES.noyZhangWriting.id,
        SOURCES.claudeUploads.id,
        SOURCES.openaiFileUploads.id,
        SOURCES.liuLostInTheMiddle.id,
        SOURCES.ebuNewsIntegrity.id,
        SOURCES.stanfordLegalHallucination.id,
        SOURCES.bastaniGuardrails.id,
        SOURCES.metrDeveloperStudy.id,
      ],
    },
    {
      id: "research-modes",
      heading: "If your job is research, compare the modes",
      paragraphs: [
        "The three big providers describe their research modes differently. ChatGPT and Gemini both let you edit the plan before it starts, and OpenAI says outputs include citations or source links. Claude's help page says Research builds searches on each other and does not describe a plan step. All of them ask you to do the checking, and our deep research guide has a routine for it.",
      ],
      sourceIds: [SOURCES.openaiDeepResearchFaq.id, SOURCES.geminiDeepResearch.id, SOURCES.claudeResearch.id],
    },
    {
      id: "choose-steps",
      heading: "How to pick for your own job",
      steps: [
        {
          title: "Name the job and the risk",
          detail: "A casual email and a contract summary need different care. Write down what a mistake would cost.",
        },
        {
          title: "List the one feature the job needs",
          detail: "For example: reads charts, cites links, gives hints, accepts a long file. Ignore the rest of the feature list.",
        },
        {
          title: "Test two or three tools with the same prompt",
          detail: "Use free plans first and the same wording each time. Our comparison page lists what each help page says.",
        },
        {
          title: "Check the facts and note the limits you hit",
          detail: "Open sources, compare numbers with the original and write down what stopped you. A limit you hit twice is a reason to pay or switch.",
        },
        {
          title: "Re-test when something changes",
          detail: "A new release, a plan change or a new feature can reverse the result. Repeat the test a few times a year.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "job-test",
      title: "Test a tool on one job",
      whenToUse: "Run the same prompt in each tool you are comparing.",
      text: "My job is [describe the task]. The audience is [who reads it]. Complete it in [format and length]. List every claim that needs checking and tell me what you could not see or were unsure about.",
    },
    {
      id: "pick-the-feature",
      title: "Find the feature the job needs",
      whenToUse: "Before you compare tools.",
      text: "I need to [describe the job]. List the three features a chatbot would need to do this well, and for each, give me a simple way to test it myself in ten minutes.",
    },
    {
      id: "limits-of-answer",
      title: "Ask for limits and checks",
      whenToUse: "After any answer you plan to rely on.",
      text: "For the answer you just gave, list what a careful reader should verify, which parts are least certain and what sources I could open to confirm them.",
    },
  ],
  whatCanGoWrong: [
    "You pick a model because a list called it the best, and the list was out of date within weeks.",
    "You assume a study of one tool, task and year applies to a different tool and job.",
    "You trust a confident answer in a high-stakes area such as law, health or money.",
    "You feel faster with a tool but never measure it, so you cannot tell if it helps.",
    "You judge two tools on different plans and blame the model for a plan limit.",
  ],
  limitsNote:
    "This page is our opinion based on the sources below, not our own benchmark. For legal, medical and money decisions, ask a qualified professional.",
  showPriceNotice: true,
  sources: [
    COMPARE_SOURCES.openaiModelReleaseNotes,
    SOURCES.noyZhangWriting,
    SOURCES.claudeUploads,
    SOURCES.openaiFileUploads,
    SOURCES.liuLostInTheMiddle,
    SOURCES.ebuNewsIntegrity,
    SOURCES.stanfordLegalHallucination,
    SOURCES.bastaniGuardrails,
    SOURCES.metrDeveloperStudy,
    SOURCES.openaiDeepResearchFaq,
    SOURCES.geminiDeepResearch,
    SOURCES.claudeResearch,
  ],
  relatedSlugs: ["where-ai-helps-and-fails", "deep-research-modes", "is-ai-worth-paying-for"],
  relatedLinks: [LINKED_PAGES.chatbotComparison, LINKED_PAGES.consumerPlans, LINKED_PAGES.freePlanLimits],
  lastReviewed: "2026-10-27",
  published: true,
};
