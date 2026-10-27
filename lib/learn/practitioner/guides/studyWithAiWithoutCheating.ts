import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const studyWithAiWithoutCheating: GuideRecord = {
  slug: "use-ai-to-study-without-cheating",
  number: 8,
  level: "practitioner",
  kind: "guide",
  title: "How to use AI to study without cheating",
  metaDescription:
    "Use AI as a tutor, not a ghostwriter: what the research says about learning, how study modes work, how to follow your school's rules, and a try-first routine.",
  cardSummary: "Use AI to learn the material, follow your school's rules, and keep proof of your own work.",
  summaryPoints: [
    "Your school or instructor sets the rules. The same tool can be allowed in one course and banned in another, so ask before you use it on graded work.",
    "In one large study, students who got plain answers from a chatbot did worse on the exam once it was taken away. Students using a hint-based tutor did about as well as students with no AI.",
    "The safe pattern is to try first, ask for hints and then test yourself without the AI.",
    "AI detectors are not reliable proof either way, so keep your drafts and notes.",
  ],
  sections: [
    {
      id: "rules-first",
      heading: "Start with the rules, not the tool",
      paragraphs: [
        "Academic integrity is decided by your school, your course and your instructor, not by the AI company. Some instructors allow AI for brainstorming but not drafting. Some allow it with a note saying how you used it. Some ban it for graded work.",
        "OpenAI's own help page for study mode says it does not replace teachers, tutors or course materials, and that graded work should follow your school's AI-use policies. Anthropic's launch page for its education features describes helping students think for themselves, and does not address academic integrity, so it cannot tell you what your school permits.",
        "If a policy is unclear, ask in writing and keep the answer. “May I use AI to quiz myself and to get feedback on a draft I wrote?” is a reasonable question for any instructor.",
      ],
      sourceIds: [SOURCES.openaiStudyMode.id, SOURCES.anthropicClaudeForEducation.id],
    },
    {
      id: "what-research-says",
      heading: "What the research says about learning with AI",
      paragraphs: [
        "A study of nearly 1,000 high school maths students in Turkey, published in PNAS in 2025, compared three groups: students with a plain ChatGPT-style assistant, students with a tutor version that gave hints and had teacher input, and a control group with ordinary notes and textbooks.",
        "During practice, the plain assistant group scored 48% higher than the control and the tutor group scored 127% higher. On the later exam, with the AI taken away, the plain assistant group scored 17% lower than the control group, while the tutor group scored about the same as the control. The researchers concluded that students using the plain assistant relied on it to solve problems without grasping the ideas, and that students using AI were overly optimistic about their own ability.",
        "The takeaway is not that AI cannot help you learn. It is that getting answers feels like learning and is not. The version that gave hints protected learning in this study.",
      ],
      sourceIds: [SOURCES.bastaniGuardrails.id],
    },
    {
      id: "learning-vs-shortcut",
      heading: "Learning use versus shortcut",
      table: {
        caption: "The same tool can be used to learn or to skip learning",
        columns: ["Use AI to learn", "Shortcut to avoid"],
        rows: [
          ["Quiz you on notes you wrote, one question at a time", "Answer a graded quiz or take-home test for you"],
          ["Explain one step you are stuck on after you tried it", "Solve the whole problem set"],
          ["Give feedback on a draft you wrote", "Write the draft, then lightly reword it"],
          ["Build a study schedule from your syllabus", "Summarise a book you were assigned instead of reading any of it, then write about it"],
          ["Check your own explanation of a concept", "Rewrite an essay so it avoids detection"],
        ],
      },
    },
    {
      id: "study-modes",
      heading: "Study modes: what they do and where they stop",
      bullets: [
        "ChatGPT study mode: OpenAI says it guides you with questions, explains ideas in layers, checks understanding, quizzes you and can work with uploaded notes. On the web you can type @study or choose Study from the plus menu, and on mobile you choose Study from the plus menu. It is not available in Temporary Chats, GPTs or Projects.",
        "OpenAI also says study mode can make mistakes, may sometimes give a direct answer (you can ask for hints or step-by-step guidance instead) and follows the same plan limits as regular chats.",
        "Claude learning mode: Anthropic described it at launch as a feature within Projects that asks guiding questions such as “How would you approach this problem?” instead of giving the solution straight away, uses Socratic questioning and points out core concepts. Check Anthropic's current pages for where it is available today.",
      ],
      paragraphs: [
        "These modes make the learning pattern easier. They do not make any particular use allowed. That is still your school's decision.",
      ],
      sourceIds: [SOURCES.openaiStudyMode.id, SOURCES.anthropicClaudeForEducation.id],
    },
    {
      id: "try-first-routine",
      heading: "The try-first routine",
      steps: [
        {
          title: "Attempt it alone first",
          detail: "Set a timer for ten or fifteen minutes and write down what you know, even if it is wrong. Struggling at this stage is what makes the explanation stick later.",
        },
        {
          title: "Ask for a hint, not the answer",
          detail: "Tell the AI what you tried and ask for the next step only. Use the hint-based prompt below, or turn on a study mode.",
        },
        {
          title: "Explain it back in your own words",
          detail: "Write or say the idea without looking. Ask the AI to point out errors without rewriting your explanation.",
        },
        {
          title: "Test yourself with the AI closed",
          detail: "Do practice questions from your textbook or past papers with no AI, as you will in the exam. This is the step the study above suggests students skip.",
        },
        {
          title: "Keep a record of how you used AI",
          detail: "Save the chat, or note the date and what you asked. If your course asks for disclosure, you can describe your process accurately.",
        },
      ],
    },
    {
      id: "ai-detectors",
      heading: "AI detectors: do not rely on them, and do not try to beat them",
      paragraphs: [
        "A research paper by Liang, Zou and colleagues found that the GPT detectors they tested consistently misclassified writing by non-native English speakers as AI-generated, while accurately identifying native writing. That means a detector flag is not proof that you cheated, and a clean result is not proof that you did not.",
        "The practical answer is to keep evidence of your own process: notes, outlines, drafts and version history. Using tools to disguise AI-written text as your own is the dishonest behaviour a policy is meant to stop, so it does not help you.",
      ],
      sourceIds: [SOURCES.liangDetectorBias.id],
    },
  ],
  prompts: [
    {
      id: "hints-only-tutor",
      group: "Learn",
      title: "Hint-only tutor",
      whenToUse: "When you are stuck on a problem you have already tried.",
      text: "Act as a tutor. I am working on [subject and topic]. Here is the problem and what I tried: [problem and your attempt]. Do not give me the final answer. Tell me what I did right, then give one hint toward the next step and ask me one question.",
    },
    {
      id: "quiz-from-notes",
      group: "Learn",
      title: "Quiz me on my notes",
      whenToUse: "For revision. Paste notes you wrote yourself.",
      text: "Here are my notes on [topic]: [notes]. Ask me one question at a time based only on these notes. Wait for my answer, tell me if it is right and why, then ask a harder one if I am doing well.",
    },
    {
      id: "explain-back",
      group: "Learn",
      title: "Check my explanation",
      whenToUse: "To find out whether you really understand an idea.",
      text: "This is my explanation of [concept] in my own words: [your explanation]. Point out anything wrong or missing. Do not rewrite it. Ask me two follow-up questions to test my understanding.",
    },
    {
      id: "find-gaps",
      group: "Learn",
      title: "Find the gaps in my notes",
      whenToUse: "A few days before a test.",
      text: "Here are my notes for [subject]: [notes]. List five questions a teacher could reasonably ask about this topic that my notes cannot answer. Do not answer them.",
    },
    {
      id: "feedback-not-rewrite",
      group: "Write",
      title: "Feedback on my draft, not a rewrite",
      whenToUse: "Only if your instructor allows AI feedback. Paste your own draft.",
      text: "Read my draft below and give feedback on structure and clarity only. Give three strengths and three things to improve. Do not rewrite my sentences or add content.\n\nDraft: [your draft]",
    },
    {
      id: "study-schedule",
      group: "Plan",
      title: "Study schedule",
      whenToUse: "When you have a list of topics and a date.",
      text: "I have an exam on [date] covering [list of topics]. I can study [number] minutes on weekdays and [number] minutes on weekends. Build a day-by-day plan that puts my weakest topics first, includes two review sessions and ends with a practice test without notes.",
    },
  ],
  whatCanGoWrong: [
    "Feeling that you understand because the explanation was clear. Test yourself without the AI to find out.",
    "The AI being wrong. A chatbot can explain a wrong method with total confidence, so check against your textbook or teacher.",
    "Breaking a course rule you did not know about. Read the syllabus policy before you start.",
    "Pasting private details about yourself or classmates into a prompt. Keep prompts general.",
    "Relying on a detector result as proof in either direction.",
  ],
  limitsNote:
    "This guide describes good study habits. It cannot tell you what your school allows. For that, ask your instructor or read your institution's academic integrity policy.",
  sources: [
    SOURCES.openaiStudyMode,
    SOURCES.anthropicClaudeForEducation,
    SOURCES.bastaniGuardrails,
    SOURCES.liangDetectorBias,
  ],
  relatedSlugs: ["fact-check-ai-answers", "write-better-prompts", "never-share-with-ai-chatbot"],
  relatedLinks: [LINKED_PAGES.bestToolsForStudents, LINKED_PAGES.promptLibrary],
  lastReviewed: "2026-10-27",
  published: true,
};
