import type { CopyPrompt, GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

/** Twenty general-purpose prompts. Every variable part is a [bracket]; none asks for private data. */
const PROMPTS: readonly CopyPrompt[] = [
  // Study
  {
    id: "study-explain-concept",
    group: "Study",
    title: "Explain a concept",
    whenToUse: "When a textbook explanation is not clicking.",
    text: "Act as a patient tutor. Explain [topic] for a [year or level] student. Use one everyday example, then give three practice questions. Keep the answers hidden until I ask for them.",
  },
  {
    id: "study-quiz-me",
    group: "Study",
    title: "Quiz me",
    whenToUse: "To practise recall instead of re-reading.",
    text: "Quiz me on [topic], one question at a time. Wait for my answer, tell me whether it is right, and explain briefly. Start easy and make the questions harder if I keep getting them right.",
  },
  {
    id: "study-plan",
    group: "Study",
    title: "Build a study plan",
    whenToUse: "When an exam or deadline is coming and the topic list feels large.",
    text: "Create a [number]-day study plan for [subject or exam]. I can study [number] minutes a day. Put the hardest topics first, include one review day, and format it as a table with a column for what to do and a column for how I will know I am done.",
  },
  {
    id: "study-check-understanding",
    group: "Study",
    title: "Check my own explanation",
    whenToUse: "To test whether you really understand something. Check your school's rules on AI first.",
    text: "Here is my explanation of [topic] in my own words: [your explanation]. Point out anything wrong or missing, but do not rewrite it for me.",
  },
  {
    id: "study-draft-feedback",
    group: "Study",
    title: "Feedback on my draft, not a rewrite",
    whenToUse: "For your own writing, where you want feedback and not a replacement. Check your school's rules on AI first.",
    text: "Read the draft below and give feedback on structure and clarity only. Do not rewrite my sentences or add new content. Give me three strengths and three things to improve.\n\nDraft: [your draft]",
  },
  // Work
  {
    id: "work-email-draft",
    group: "Work",
    title: "Draft an email",
    whenToUse: "For routine emails. Leave out names and client details.",
    text: "Write a short email to [recipient's role] about [purpose]. Tone: [polite and direct]. Include these points: [key points]. Keep it under [number] words and give me two subject-line options.",
  },
  {
    id: "work-rewrite-tone",
    group: "Work",
    title: "Change the tone of a message",
    whenToUse: "Remove names, numbers and client details from the message before you paste it.",
    text: "Rewrite the message below to sound [friendlier or more formal] without changing the meaning or adding any facts.\n\nMessage: [your message with names removed]",
  },
  {
    id: "work-meeting-agenda",
    group: "Work",
    title: "Plan a meeting agenda",
    whenToUse: "Before a meeting that tends to run long.",
    text: "Create a [number]-minute agenda for a meeting about [topic] with [number] people. Give each item a time limit and name the decision needed. End with a list of actions and owners.",
  },
  {
    id: "work-summarise-text",
    group: "Work",
    title: "Summarise a public or non-sensitive text",
    whenToUse: "For public articles or your own notes. Never for confidential documents.",
    text: "Summarise the text below in [number] bullet points for [audience]. Then list [number] questions it leaves unanswered.\n\nText: [public or non-sensitive text]",
  },
  {
    id: "work-break-down-task",
    group: "Work",
    title: "Break a big task into steps",
    whenToUse: "When a task feels too large to start.",
    text: "I need to [goal] by [date]. Break it into steps that each take under [number] minutes, in order. Mark which steps depend on other people.",
  },
  // Home
  {
    id: "home-meal-plan",
    group: "Home",
    title: "Plan weeknight dinners",
    whenToUse: "For general planning. For allergies or medical diets, check labels and ask a professional, because AI cannot see your situation.",
    text: "Plan [number] dinners for [number] people. Keep them budget-friendly and ready in under [number] minutes, and leave out [foods we do not eat]. Give one shopping list grouped by aisle.",
  },
  {
    id: "home-cleaning-schedule",
    group: "Home",
    title: "Make a cleaning schedule",
    whenToUse: "When chores keep piling up.",
    text: "Create a weekly cleaning schedule for a [size] home with [number] people. Keep each task under [number] minutes and spread the tasks across the week.",
  },
  {
    id: "home-trip-plan",
    group: "Home",
    title: "Sketch a trip plan",
    whenToUse: "Early in planning. Confirm opening times and bookings on official sites.",
    text: "Suggest a [number]-day plan for [destination] for [who is travelling]. Include one rainy-day option per day and say what to book ahead. List the details I should confirm on official sites, such as opening times and entry rules.",
  },
  {
    id: "home-explain-to-child",
    group: "Home",
    title: "Explain a topic to a child",
    whenToUse: "For homework questions you want to talk through together.",
    text: "Explain [topic] to a [age]-year-old in three short paragraphs. Then suggest two questions we can talk about together.",
  },
  {
    id: "home-learn-skill",
    group: "Home",
    title: "Start a new skill",
    whenToUse: "For hobbies and practical skills.",
    text: "I am a beginner at [skill]. Give me a four-week plan with [number] minutes of practice per session. List three common beginner mistakes to avoid and how I can tell I am improving.",
  },
  // Money and careers
  {
    id: "money-compare-options",
    group: "Money and careers",
    title: "Prepare to compare options",
    whenToUse: "Before choosing a product or service. It will not decide for you, and that is the point.",
    text: "I am choosing between [option A] and [option B] for [purpose]. List the questions I should answer before choosing, and what I should check on each provider's official website. Do not tell me which one to buy.",
  },
  {
    id: "money-budget-template",
    group: "Money and careers",
    title: "Get a blank budget template",
    whenToUse: "To set up a budget without sharing any real figures.",
    text: "Explain in plain English how a monthly budget works. Then give me a blank template with these categories: [categories]. Leave every amount empty so I can fill it in myself.",
  },
  {
    id: "money-explain-term",
    group: "Money and careers",
    title: "Explain a financial or legal term",
    whenToUse: "When paperwork uses words you do not know. Use made-up numbers.",
    text: "Explain [financial or legal term] in plain English. Give a simple example using made-up numbers, then list questions I could ask a qualified professional.",
  },
  {
    id: "careers-resume-bullets",
    group: "Money and careers",
    title: "Turn duties into resume bullets",
    whenToUse: "Leave out employer and client names. Add real results yourself afterwards.",
    text: "Turn these general duties into resume bullet points: [duties without employer or client names]. Start each bullet with a verb and keep it under [number] words. Do not invent results, numbers or tools.",
  },
  {
    id: "careers-interview-practice",
    group: "Money and careers",
    title: "Practise an interview",
    whenToUse: "The day before an interview, to practise out loud.",
    text: "Act as an interviewer for a [job title] role. Ask me one question at a time and wait for my answer. After each answer, give feedback on clarity and structure, then ask the next question.",
  },
];

export const writeBetterPrompts: GuideRecord = {
  slug: "write-better-prompts",
  number: 3,
  level: "foundations",
  kind: "guide",
  title: "How to write better prompts (20 examples)",
  metaDescription:
    "A five-part formula for writing clear AI prompts, a before-and-after example, six habits that help, and 20 copy-ready prompts for study, work, home and money.",
  cardSummary: "The five-part formula with copy-ready examples for study, work, home and money.",
  summaryPoints: [
    "A prompt is the instruction you give an AI. Clear, specific prompts get more useful answers than vague ones.",
    "Our five-part formula: Role, Task, Context, Format, Limits. It is this site's own checklist, based on advice in vendor guides.",
    "Test a prompt by asking whether a colleague with no background would know what to do. Twenty prompts to copy are below.",
  ],
  sections: [
    {
      id: "formula",
      heading: "The five-part formula",
      paragraphs: [
        "Anthropic's guide describes the AI as a capable new employee who has no background on your norms or goals. The more precisely you explain what you want, the better the answer. Its tips include giving context such as what the result is for and who it is for, and being specific about what to do. Our formula turns that into five parts.",
      ],
      table: {
        caption: "The five parts of a prompt",
        columns: ["Part", "What it answers", "Example"],
        rows: [
          ["Role", "Who should the AI act as?", "A patient maths tutor"],
          ["Task", "What exactly should it do?", "Explain adding fractions with different denominators"],
          ["Context", "What background does it need?", "I am in year 7 and mix up common denominators"],
          ["Format", "What should the answer look like?", "Three numbered steps, then one worked example"],
          ["Limits", "What length, tone or rules apply?", "Under 150 words, friendly, no jargon"],
        ],
      },
      sourceIds: [SOURCES.anthropicClearDirect.id],
    },
    {
      id: "weak-vs-strong",
      heading: "Weak versus strong",
      table: {
        caption: "The same request, written two ways",
        columns: ["Weak prompt", "Strong prompt"],
        rows: [
          [
            "Tell me about photosynthesis.",
            "Act as a patient science tutor. Explain photosynthesis to a 12-year-old in five bullet points, under 100 words. End with two quiz questions.",
          ],
          [
            "Write an email about the meeting.",
            "Write a polite email to my team moving Thursday's meeting to Friday at the same time. Two sentences, plain tone, with a subject line.",
          ],
        ],
      },
    },
    {
      id: "build-a-prompt",
      heading: "Build a prompt in five steps",
      steps: [
        { title: "Start with the task", detail: "Write one sentence that starts with a verb: explain, draft, compare, plan, check." },
        { title: "Add the context", detail: "Say who the answer is for and what it will be used for. Keep it general: no names, numbers or private details." },
        { title: "Name the format", detail: "Ask for bullets, a table, a short email or a number of words." },
        { title: "Set the limits", detail: "Add length, tone, and anything to avoid, such as jargon or invented facts." },
        { title: "Add a role if it helps", detail: "A role such as “tutor” or “editor” sets the style. It is optional, and the task and context matter more." },
      ],
    },
    {
      id: "six-habits",
      heading: "Six habits that help",
      bullets: [
        "Say exactly what you want done, not just the topic.",
        "Give the background a stranger would need.",
        "Name the format: bullets, a table, 100 words, a short email.",
        "Show one example of what good looks like.",
        "Ask a follow-up instead of starting again.",
        "Run the colleague test: show your prompt to someone with no context. If they would be confused, the AI probably will be too.",
      ],
      sourceIds: [SOURCES.anthropicClearDirect.id],
    },
    {
      id: "when-answer-is-off",
      heading: "When the answer is off",
      steps: [
        { title: "Say what is wrong", detail: "For example: “Too long and too formal. Keep the same points in under 80 words.”" },
        { title: "Add what was missing", detail: "Most poor answers trace back to missing context, so add it in your next message." },
        { title: "Ask it to show its reasoning", detail: "Ask how it got the answer, then check the steps yourself." },
        { title: "Verify before you rely on it", detail: "A well-written prompt gets a better draft, not a guarantee of accuracy." },
      ],
      sourceIds: [SOURCES.openaiHallucinate.id],
    },
  ],
  prompts: PROMPTS,
  whatCanGoWrong: [
    "Pasting private information into a prompt. Keep names, numbers, passwords and confidential documents out. See the guide on what never to share.",
    "Getting invented facts or sources. Tell the AI not to invent them, then check names, dates and quotes yourself.",
    "Breaking school or work rules. Some schools and employers limit AI use for graded or confidential work, so check before you use it.",
    "Taking a prompt that worked once as a rule. Different tools and models respond differently, so adjust and test.",
  ],
  limitsNote:
    "AI is not a financial advisor, doctor or lawyer. The money and health prompts here help you prepare questions and understand terms. They do not replace a qualified professional.",
  sources: [SOURCES.anthropicClearDirect, SOURCES.openaiHallucinate],
  relatedSlugs: ["what-is-ai", "never-share-with-ai-chatbot"],
  relatedLinks: [
    { label: "Prompt library", href: "/tools/prompt-library" },
    { label: "Cheat sheets and templates", href: "/tools/cheat-sheets" },
  ],
  lastReviewed: "2026-10-26",
  published: true,
};
