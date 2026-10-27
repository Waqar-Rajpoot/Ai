import { LINKED_PAGES } from "../../learn/guideConfig";
import type { GuideRecord } from "../../learn/guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../../learn/practitioner/practitionerSources";

export const bestToolsForStudents: GuideRecord = {
  slug: "best-ai-tools-for-students",
  number: 15,
  level: "compare",
  kind: "opinion",
  title: "Best AI tools for students: what to use for each study job",
  metaDescription:
    "Which AI tools help students learn, not just finish: study modes, reading help and research, what each provider says, and the school rules to check first.",
  cardSummary: "Study modes, reading help and research: pick the tool by study job and check your school's rules.",
  summaryPoints: [
    "Your school or instructor sets the rules. Check them before using any tool on graded work.",
    "For learning, choose a mode that asks questions and gives hints. In one large study, plain answers hurt exam results.",
    "For reading and research, choose the tool by what it can read and how it shows sources, then check the sources yourself.",
    "We have not run our own tests. This page is our opinion, based on the sources below.",
  ],
  sections: [
    {
      id: "rules-first",
      heading: "Start with your school's rules",
      paragraphs: [
        "OpenAI's help page for study mode says graded work should follow your school's AI-use policies. Anthropic's launch page for its education features describes helping students think for themselves and does not address academic integrity. Neither can tell you what your instructor allows.",
        "If a policy is unclear, ask in writing. \"May I use AI to quiz myself and to get feedback on a draft I wrote?\" is a reasonable question for any instructor.",
      ],
      sourceIds: [SOURCES.openaiStudyMode.id, SOURCES.anthropicClaudeForEducation.id],
    },
    {
      id: "learning-modes",
      heading: "For learning: pick a tool that makes you think",
      paragraphs: [
        "A study of nearly 1,000 maths students found that those who got plain answers from a chatbot did worse on the exam once it was taken away. Students using a hint-based tutor did about as well as students with no AI. That is why a mode built around hints matters more than a longer feature list.",
        "OpenAI describes study mode as guiding you with questions, explaining in layers, quizzing you and working with uploaded notes. On the web you type @study or choose Study from the plus menu, and on mobile you choose Study from the plus menu. It is not available in Temporary Chats, GPTs or Projects. OpenAI also says it can make mistakes and may sometimes give a direct answer, in which case you can ask for hints.",
        "Anthropic described Claude's learning mode at launch as a feature within Projects that asks guiding questions and uses Socratic questioning. Check Anthropic's current pages for where it is available today. We did not compare a Gemini study feature on this page.",
      ],
      sourceIds: [SOURCES.bastaniGuardrails.id, SOURCES.openaiStudyMode.id, SOURCES.anthropicClaudeForEducation.id],
    },
    {
      id: "jobs-table",
      heading: "Match the tool to the study job",
      table: {
        caption: "Study jobs, what to look for and what to be careful about",
        columns: ["Study job", "What to look for", "Be careful about"],
        rows: [
          [
            "Understanding a hard idea",
            "A study or learning mode that asks questions and gives hints",
            "A direct answer that you copy without trying first",
          ],
          [
            "Reading a long paper or chapter",
            "Whether the tool reads charts and scanned pages, and its file limits",
            "Claude's help page says charts and images are read in PDFs up to 100 pages. OpenAI's FAQ says plans other than Enterprise use text only. Open the cited pages for any figure you will use",
          ],
          [
            "Researching an essay topic",
            "A research mode with links you can open, and an editable plan where offered",
            "Links are not proof. A public-broadcaster study found references missing or misleading in 31% of news answers",
          ],
          [
            "Revising your own draft",
            "Feedback on structure and clarity, not a rewrite",
            "Submitting AI-written text as yours when your rules do not allow it",
          ],
          [
            "Proving your work is yours",
            "Saved drafts, notes and dates",
            "Relying on an AI detector as proof either way",
          ],
        ],
      },
      sourceIds: [SOURCES.claudeUploads.id, SOURCES.openaiFileUploads.id, SOURCES.ebuNewsIntegrity.id],
    },
    {
      id: "research-modes",
      heading: "Research modes for essays",
      paragraphs: [
        "ChatGPT and Gemini both let you edit the plan before a research run starts, and OpenAI says outputs include citations or source links. Google's help page says Gemini Deep Research needs you to be signed in and 18 or older, with daily limits. Claude's help page says Research is on paid plans and does not describe a plan step. Whichever you use, open the sources behind each claim your essay depends on.",
      ],
      sourceIds: [SOURCES.openaiDeepResearchFaq.id, SOURCES.geminiDeepResearch.id, SOURCES.claudeResearch.id],
    },
    {
      id: "detectors",
      heading: "AI detectors: do not rely on them",
      paragraphs: [
        "A research paper by Liang, Zou and colleagues found that the detectors they tested consistently misclassified writing by non-native English speakers as AI-generated. A detector flag is not proof that you cheated, and a clean result is not proof that you did not. Keep your drafts, notes and the questions you asked.",
      ],
      sourceIds: [SOURCES.liangDetectorBias.id],
    },
    {
      id: "routine",
      heading: "A try-first routine",
      steps: [
        { title: "Check the rules", detail: "Read your course policy and ask if it is unclear." },
        { title: "Try the problem yourself", detail: "Write down what you tried and where you got stuck before you open the tool." },
        { title: "Ask for a hint, not the answer", detail: "Say what you tried and ask for the next step only, or use a study mode." },
        { title: "Test yourself without the tool", detail: "Close it and answer a practice question from memory." },
        { title: "Keep a record", detail: "Save your drafts and notes with dates, so you can show how the work developed." },
      ],
    },
  ],
  prompts: [
    {
      id: "hint-tutor",
      group: "Learn",
      title: "Hint-based tutor",
      whenToUse: "When you are stuck on a problem you have already tried.",
      text: "Act as a tutor. Here is the problem and what I tried: [problem and your attempt]. Do not give me the answer. Ask me one guiding question, then wait for my reply.",
    },
    {
      id: "quiz-me",
      group: "Learn",
      title: "Quiz me",
      whenToUse: "After you study a topic.",
      text: "Quiz me on [topic] with five questions, one at a time. Wait for my answer before the next question. After each, tell me what I got right and what to review.",
    },
    {
      id: "reading-map",
      group: "Read",
      title: "Map a reading with page numbers",
      whenToUse: "For a paper or chapter you have uploaded.",
      text: "Give me a map of the attached reading: main question, method, result and limits, with the PDF page number for each. List anything you could not read, such as charts or scanned pages.",
    },
    {
      id: "draft-feedback",
      group: "Write",
      title: "Feedback on my own draft",
      whenToUse: "When your rules allow AI feedback.",
      text: "Here is my draft: [paste your draft]. Give feedback on structure and clarity only. Do not rewrite it. List three things to improve and explain why.",
    },
  ],
  whatCanGoWrong: [
    "You use AI on graded work that your course does not allow.",
    "You copy answers, feel you understand and then struggle in the exam.",
    "A summary leaves out a chart or a scanned page, and you quote a figure you never saw.",
    "An essay cites a source that does not say what the AI claimed.",
    "A detector flags your honest work, and you have no drafts to show.",
  ],
  limitsNote:
    "This page is our opinion based on the sources below, not our own tests. Your school's policy decides what is allowed.",
  showPriceNotice: true,
  sources: [
    SOURCES.openaiStudyMode,
    SOURCES.anthropicClaudeForEducation,
    SOURCES.bastaniGuardrails,
    SOURCES.claudeUploads,
    SOURCES.openaiFileUploads,
    SOURCES.ebuNewsIntegrity,
    SOURCES.openaiDeepResearchFaq,
    SOURCES.geminiDeepResearch,
    SOURCES.claudeResearch,
    SOURCES.liangDetectorBias,
  ],
  relatedSlugs: ["use-ai-to-study-without-cheating", "summarize-pdf-with-ai", "fact-check-ai-answers"],
  relatedLinks: [LINKED_PAGES.chatbotComparison, LINKED_PAGES.bestModelByJob, LINKED_PAGES.promptLibrary],
  lastReviewed: "2026-10-27",
  published: true,
};
