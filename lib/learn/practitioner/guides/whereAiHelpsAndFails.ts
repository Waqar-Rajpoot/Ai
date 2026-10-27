import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const whereAiHelpsAndFails: GuideRecord = {
  slug: "where-ai-helps-and-fails",
  number: 30,
  level: "practitioner",
  kind: "opinion",
  title: "Where AI helps and where it fails: what the evidence shows",
  metaDescription:
    "Six published studies on writing, learning, news answers, legal research, coding and long documents, with a plain rule for each and a test you can run yourself.",
  cardSummary: "What six published studies show about where AI saves time, where it slips and how to test it yourself.",
  summaryPoints: [
    "AI has helped most on short, self-contained writing tasks, and in studies it has also been wrong in checkable ways on news answers, legal research and long documents.",
    "People are poor judges of their own results. Developers and students in two studies believed AI helped more than the measurements showed.",
    "Match the amount of checking to the cost of a mistake, and measure your own tasks before you trust a general claim.",
    "This page reports published research. We have not run our own benchmark tests.",
  ],
  sections: [
    {
      id: "how-to-read",
      heading: "How to read this page",
      paragraphs: [
        "Each row below is one published study, summarised with its own limits. Studies measure particular tools, tasks and people at a particular time. AI tools change quickly, so an older result may no longer hold, and a result in one field may not carry over to another.",
        "We chose studies that measured outcomes instead of asking people how they felt. Where a study has a caveat that changes how far you can generalise, we say so. Our recommendations in the right-hand column are our opinion.",
      ],
    },
    {
      id: "evidence-table",
      heading: "What the evidence shows, task by task",
      table: {
        caption: "Six studies and what to take from each",
        columns: ["Task", "What the study found", "Our rule of thumb"],
        rows: [
          ["Short professional writing", "444 professionals did two 20 to 30 minute writing tasks. Those given ChatGPT took about 10 minutes less than a 27-minute average and were graded higher. Most did not edit the output much.", "Good for first drafts of routine writing. Edit for accuracy and voice."],
          ["Learning maths", "Nearly 1,000 students. A plain chatbot raised practice scores but lowered exam scores by 17% against the control. A hint-based tutor matched the control on the exam.", "Use AI for hints and quizzes, then test yourself without it."],
          ["News questions", "Public broadcasters reviewed more than 3,000 answers from four assistants. 45% had at least one significant issue and 31% had sourcing problems.", "Do not rely on a chatbot for news. Go to the original reporting."],
          ["Legal research", "Tools built for lawyers hallucinated on about 17% to 33% of queries in a Stanford study.", "Check every cited case and rule against the original."],
          ["Expert software work", "In a trial with 16 experienced developers on codebases they knew, tasks took 19% longer with AI in early 2025. METR says this snapshot no longer reflects current impact.", "Do not assume a speed-up. Time your own work."],
          ["Long documents", "A 2023 preprint found models used information in the middle of a long input less reliably than at the start or end.", "Summarise in sections and check the middle."],
        ],
      },
      sourceIds: [
        SOURCES.noyZhangWriting.id,
        SOURCES.bastaniGuardrails.id,
        SOURCES.ebuNewsIntegrity.id,
        SOURCES.stanfordLegalHallucination.id,
        SOURCES.metrDeveloperStudy.id,
        SOURCES.liuLostInTheMiddle.id,
      ],
    },
    {
      id: "helps",
      heading: "Where AI tends to help",
      bullets: [
        "Turning your own notes into a clear draft of an email, a summary or an outline. The MIT experiment found faster work and higher grades, with the biggest gains for lower-scoring workers.",
        "Practice and feedback: quizzing you, explaining a step after you tried it, and pointing out gaps. The learning study protected exam results only when the tool gave hints and not answers.",
        "Getting started: structure, options and wording to react to. You still supply the facts and make the decisions.",
      ],
      sourceIds: [SOURCES.noyZhangWriting.id, SOURCES.bastaniGuardrails.id],
    },
    {
      id: "fails",
      heading: "Where AI tends to fail, and how",
      bullets: [
        "Sourcing. The news study found references missing or misleading in 31% of cases. The legal study found tools that cite sources which do not support the statement.",
        "Specific facts. Numbers, dates, case names and quotes are the details to verify first.",
        "Long inputs. Summaries of large documents can handle the middle poorly. Ask for page references and spot-check.",
        "Confidence. An answer reads the same whether it is right or wrong, so fluency tells you nothing about accuracy.",
      ],
      sourceIds: [SOURCES.ebuNewsIntegrity.id, SOURCES.stanfordLegalHallucination.id, SOURCES.liuLostInTheMiddle.id],
    },
    {
      id: "misjudging",
      heading: "Why we misjudge our own results",
      paragraphs: [
        "In the METR trial, developers forecast that AI would speed them up by 24%. They measured 19% slower, and afterwards still believed AI had sped them up by about 20%. In the maths study, students using AI were overly optimistic about their own ability.",
        "Both results say the same thing: feeling productive and being productive are different. The METR authors also caution that the sample was small, the setting narrow and the tools older. So the lesson is not “AI slows experts down”. It is that your impression is not a measurement.",
      ],
      sourceIds: [SOURCES.metrDeveloperStudy.id, SOURCES.bastaniGuardrails.id],
    },
    {
      id: "test-yourself",
      heading: "A ten-minute test you can run yourself",
      steps: [
        {
          title: "Pick three tasks you do every week",
          detail: "Choose real tasks, such as a weekly summary, a reply to a standard enquiry, or a lookup. Avoid one-off tasks.",
        },
        {
          title: "Time each task without AI, then with AI",
          detail: "Include the time you spend checking and fixing the AI's output. Use a clock, not your impression.",
        },
        {
          title: "Check the output for errors",
          detail: "Count wrong facts, missing points and parts you had to rewrite. Note how serious each would have been if it had gone out unchecked.",
        },
        {
          title: "Decide task by task",
          detail: "Keep AI for tasks where it saves time and errors are cheap to catch. Do the others yourself, or use it only for hints and feedback.",
        },
        {
          title: "Repeat after a few months",
          detail: "Tools change. A task that failed may work better later, and the reverse can also happen.",
        },
      ],
    },
    {
      id: "not-tested",
      heading: "What we have not tested",
      paragraphs: [
        "We have not run our own benchmark of these tools, and we do not present any of the numbers above as our measurements. If we later publish our own tests, we will describe the method, the date and the tool versions and keep them separate from the published studies here.",
      ],
    },
  ],
  prompts: [
    {
      id: "task-audit",
      title: "Audit my weekly tasks",
      whenToUse: "To decide where AI is worth trying. Use general descriptions of tasks.",
      text: "I do these tasks each week: [list of tasks]. For each one, ask me what happens if there is a mistake. Then tell me whether AI is likely to help, what I must check myself, and which tasks I should not use AI for.",
    },
    {
      id: "timing-sheet",
      title: "Set up a timing sheet",
      whenToUse: "Before you run the ten-minute test.",
      text: "Create a simple table I can fill in to compare doing [task] with and without AI. Columns: date, method, minutes to produce, minutes to check and fix, errors found, how serious they were, and a one-line note. Add a row at the end that totals each method.",
    },
    {
      id: "challenge-my-result",
      title: "Challenge my result",
      whenToUse: "After the test, to avoid fooling yourself.",
      text: "Here are my timing results: [results]. List three reasons my comparison might be unfair to either method, and what I should change in a second test.",
    },
  ],
  whatCanGoWrong: [
    "Treating a single study as a law. Each one covers certain tools, people and tasks at a certain time.",
    "Citing an old result as if it described today's tools. The METR authors themselves say that result is a snapshot.",
    "Reading this as proof that AI is useless or flawless. The evidence says it depends on the task and the checking.",
    "Skipping the time spent on checking when you compare methods.",
    "Trusting your impression of speed and quality instead of measuring.",
  ],
  limitsNote:
    "This page summarises published research and states our opinion about how to apply it. It is not a benchmark and not advice for any specific professional decision.",
  sources: [
    SOURCES.noyZhangWriting,
    SOURCES.bastaniGuardrails,
    SOURCES.ebuNewsIntegrity,
    SOURCES.stanfordLegalHallucination,
    SOURCES.metrDeveloperStudy,
    SOURCES.liuLostInTheMiddle,
  ],
  relatedSlugs: ["fact-check-ai-answers", "is-ai-worth-paying-for", "how-ai-chatbots-work"],
  relatedLinks: [LINKED_PAGES.chatbotComparison, LINKED_PAGES.bestModelByJob],
  lastReviewed: "2026-10-27",
  published: true,
};
