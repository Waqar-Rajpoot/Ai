import type { ToolGuideLink, ToolLevel } from "./toolCatalog";

export type PromptTask = "study" | "work" | "home" | "money" | "jobs" | "checking" | "building";

/** The levels the library covers (Blueprint 5.5: Levels 1 to 3). */
export const PROMPT_LEVELS: readonly ToolLevel[] = [1, 2, 3];

export const TASK_ORDER: readonly PromptTask[] = ["study", "work", "home", "money", "jobs", "checking", "building"];

export const TASK_LABELS: Record<PromptTask, string> = {
  study: "Study and learning",
  work: "Work and writing",
  home: "Home and family",
  money: "Money and shopping",
  jobs: "Jobs and resumes",
  checking: "Research and checking",
  building: "Build and test",
};

export interface PromptField {
  /** Matches a {{key}} marker in the template. */
  key: string;
  label: string;
  example: string;
  /** Use a larger box for pasted text. */
  multiline?: boolean;
}

export interface PromptEntry {
  id: string;
  title: string;
  task: PromptTask;
  level: ToolLevel;
  whenToUse: string;
  /** Prompt text with {{key}} markers for each blank. */
  template: string;
  fields: readonly PromptField[];
  checkTip: string;
  guide?: ToolGuideLink;
  /** Extra words the search box should match. */
  keywords?: readonly string[];
}

const GUIDE: Record<string, ToolGuideLink> = {
  prompts: { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
  neverShare: { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
  factCheck: { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
  study: { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
  summarize: { href: "/learn/practitioner/summarize-pdf-with-ai", label: "How to summarize a PDF or long document with AI" },
  email: { href: "/learn/practitioner/ai-for-email-and-writing-at-work", label: "How to use AI for email and writing at work" },
  resume: { href: "/learn/practitioner/ai-resume-and-interview-prep", label: "Resume and interview prep with AI" },
  research: { href: "/learn/practitioner/deep-research-modes", label: "Deep research modes" },
  testSet: { href: "/learn/power-user/build-your-own-ai-test-set", label: "Build your own AI test set in one afternoon" },
  apiPricing: { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
  agents: { href: "/learn/power-user/ai-agents-explained", label: "AI agents explained" },
};

/** All prompts. Order here is the order shown when no filter is set. */
export const PROMPTS: readonly PromptEntry[] = [
  // ---- Study and learning ----
  {
    id: "explain-a-topic",
    title: "Explain a topic in plain English",
    task: "study",
    level: 1,
    whenToUse: "You are stuck on an idea and want it explained at your level, with a way to test yourself.",
    template: "You are a patient tutor. Explain {{topic}} to a {{grade}} student. I already know {{known}}. Use one everyday example and explain any jargon you use. Keep it under {{length}} words, then ask me two questions to check I understood. If you are not sure about something, say so instead of guessing.",
    fields: [
      { key: "topic", label: "Topic", example: "how interest works" },
      { key: "grade", label: "Your level", example: "high school" },
      { key: "known", label: "What you already know", example: "what a bank account is" },
      { key: "length", label: "Word limit", example: "200" },
    ],
    checkTip: "Check key facts and numbers against your textbook or class notes before you study from them.",
    guide: GUIDE.prompts,
  },
  {
    id: "quiz-me",
    title: "Quiz me on what I am learning",
    task: "study",
    level: 1,
    whenToUse: "You want to practice recalling facts instead of rereading notes.",
    template: "You are a friendly quiz master for {{subject}}. Here is what I am studying:\n{{notes}}\n\nAsk me one question at a time and wait for my answer. After each answer, tell me whether I was right and explain why in two sentences. Start easy and get harder. Stop after {{count}} questions and list the topics I should review.",
    fields: [
      { key: "subject", label: "Subject", example: "Spanish past tense" },
      { key: "notes", label: "Your notes", example: "Paste a few paragraphs of your own notes", multiline: true },
      { key: "count", label: "Number of questions", example: "10" },
    ],
    checkTip: "If an answer surprises you, check it in your notes or textbook before you trust it.",
    guide: GUIDE.study,
  },
  {
    id: "study-plan",
    title: "Build a realistic study plan",
    task: "study",
    level: 1,
    whenToUse: "An exam or deadline is coming and you need a plan you can actually follow.",
    template: "You are a study coach. I have {{days}} days to prepare for {{exam}} and about {{hours}} hours a day. My weakest areas are {{weak}}. Make a day-by-day plan as a table with the columns Day, Topic, Activity and Time. Include one review day and short breaks. Keep it realistic and tell me what to drop if I fall behind.",
    fields: [
      { key: "days", label: "Days available", example: "14" },
      { key: "exam", label: "Exam or deadline", example: "my biology final" },
      { key: "hours", label: "Hours per day", example: "2" },
      { key: "weak", label: "Weakest areas", example: "genetics and cell division" },
    ],
    checkTip: "Compare the topic list with your syllabus so nothing the exam covers is missing.",
  },
  {
    id: "feedback-no-rewrite",
    title: "Get feedback on my draft without a rewrite",
    task: "study",
    level: 2,
    whenToUse: "You want to improve your own writing and keep it your own work.",
    template: "You are a writing tutor. Read my draft and give feedback only. Do not rewrite it. List three strengths, three problems in order of importance and one question that would make my argument clearer. Then suggest how I could fix the biggest problem in my own words.\n\nAssignment: {{assignment}}\n\nDraft:\n{{draft}}",
    fields: [
      { key: "assignment", label: "Assignment", example: "a 500-word essay on renewable energy" },
      { key: "draft", label: "Your draft", example: "Paste your draft here", multiline: true },
    ],
    checkTip: "Follow your school's rules on AI help and say how you used it.",
    guide: GUIDE.study,
  },
  {
    id: "notes-to-flashcards",
    title: "Turn my notes into flashcards",
    task: "study",
    level: 2,
    whenToUse: "You have notes and want quick question-and-answer cards.",
    template: "You are a study helper. From the notes below, make {{count}} flashcards. Write each as two lines: 'Q:' followed by the question, then 'A:' followed by the answer. Use only what is in my notes, and add [check] after any answer the notes only partly support.\n\nNotes:\n{{notes}}",
    fields: [
      { key: "count", label: "Number of cards", example: "15" },
      { key: "notes", label: "Your notes", example: "Paste your notes here", multiline: true },
    ],
    checkTip: "Read each card against your notes. Cards marked [check] need your attention first.",
  },

  // ---- Work and writing ----
  {
    id: "reply-to-email",
    title: "Reply to a tricky email",
    task: "work",
    level: 1,
    whenToUse: "You need a clear, polite reply and are not sure how to word it.",
    template: "You are a clear, polite business writer. Write a reply to the email below. My goal: {{goal}}. Tone: {{tone}}. Keep it under {{length}} words and end with one clear next step. Do not invent facts or promises.\n\nEmail:\n{{email}}",
    fields: [
      { key: "goal", label: "Your goal", example: "ask for a one-week extension" },
      { key: "tone", label: "Tone", example: "friendly but firm" },
      { key: "length", label: "Word limit", example: "120" },
      { key: "email", label: "The email", example: "Paste the email, with names and details removed", multiline: true },
    ],
    checkTip: "Remove names and private details before you paste, and read the reply twice before you send it.",
    guide: GUIDE.email,
  },
  {
    id: "summarize-long-document",
    title: "Summarize a long document",
    task: "work",
    level: 2,
    whenToUse: "You attached a PDF or long document and need the key points fast.",
    template: "You are a careful analyst. Summarize the document I attached in about {{length}} words for {{audience}}. Format: a one-sentence overview, five bullet points with the most important facts, and a list of decisions or deadlines with page numbers. Quote figures exactly as written. If something is unclear or missing, say so instead of guessing.",
    fields: [
      { key: "length", label: "Word count", example: "300" },
      { key: "audience", label: "Who will read it", example: "my manager" },
    ],
    checkTip: "Open the pages it cites and check every number and date, especially in tables and scanned pages.",
    guide: GUIDE.summarize,
  },
  {
    id: "meeting-minutes",
    title: "Turn rough notes into meeting minutes",
    task: "work",
    level: 1,
    whenToUse: "You have messy notes and need a clean record with clear actions.",
    template: "You are a clear note-taker. Turn the rough notes below into meeting minutes with three headings: Decisions, Actions (with owner and due date) and Open questions. Use only what the notes say, and write [unclear] where the notes are ambiguous. Keep it under {{length}} words.\n\nNotes:\n{{notes}}",
    fields: [
      { key: "length", label: "Word limit", example: "250" },
      { key: "notes", label: "Your notes", example: "Paste your notes, using first names or roles only", multiline: true },
    ],
    checkTip: "Check every owner and due date against what was actually agreed.",
    guide: GUIDE.email,
  },
  {
    id: "rewrite-for-tone",
    title: "Rewrite text for a different tone and length",
    task: "work",
    level: 1,
    whenToUse: "Your draft is accurate but sounds wrong for the reader.",
    template: "You are an editor. Rewrite the text below so it sounds {{tone}} for {{reader}}. Keep the meaning and every fact the same. Give me two versions: one about the same length and one about half as long. Do not add new claims.\n\nText:\n{{text}}",
    fields: [
      { key: "tone", label: "Tone", example: "warm and professional" },
      { key: "reader", label: "Reader", example: "a new customer" },
      { key: "text", label: "Your text", example: "Paste your text here", multiline: true },
    ],
    checkTip: "Compare names, dates and numbers in the new version with your original.",
    guide: GUIDE.email,
  },
  {
    id: "compare-options",
    title: "Compare my options in a table",
    task: "work",
    level: 2,
    whenToUse: "You have a decision to make and want the trade-offs laid out.",
    template: "You are a practical advisor. I need to decide {{decision}}. My constraints are {{constraints}}. List {{count}} realistic options and compare them in a table with the columns Option, Main benefit, Main risk and Cost or effort. Then recommend one and explain what would change your mind. Label any assumption you made.",
    fields: [
      { key: "decision", label: "The decision", example: "how to track client invoices" },
      { key: "constraints", label: "Your constraints", example: "no budget, one person, needs to work on a phone" },
      { key: "count", label: "Number of options", example: "4" },
    ],
    checkTip: "Treat the recommendation as a starting point. Check costs and facts on the options' own sites.",
  },

  // ---- Home and family ----
  {
    id: "weekly-meal-plan",
    title: "Plan a week of dinners and a shopping list",
    task: "home",
    level: 1,
    whenToUse: "You want a simple meal plan that fits your budget and avoids waste.",
    template: "You are a friendly home cook. Plan {{days}} dinners for {{people}} people with a budget of about {{budget}} for the week. Foods to avoid: {{avoid}}. Reuse ingredients across meals to cut waste. Format: a table of days and meals, then one combined shopping list grouped by store section. Keep each recipe under {{minutes}} minutes of work.",
    fields: [
      { key: "days", label: "Number of dinners", example: "5" },
      { key: "people", label: "People eating", example: "4" },
      { key: "budget", label: "Weekly budget", example: "$100" },
      { key: "avoid", label: "Foods to avoid", example: "peanuts and mushrooms" },
      { key: "minutes", label: "Minutes of work per meal", example: "30" },
    ],
    checkTip: "If anyone has an allergy, read every ingredient label yourself. Do not rely on the plan.",
  },
  {
    id: "trip-itinerary",
    title: "Plan a simple trip itinerary",
    task: "home",
    level: 1,
    whenToUse: "You know where you are going and want a realistic day-by-day outline.",
    template: "You are a practical travel planner. Plan {{days}} days in {{place}} for {{travelers}} with a budget of about {{budget}} per day. We like {{interests}}. Format: a day-by-day list with morning, afternoon and evening, travel time between stops and one rainy-day backup. Tell me which details I should confirm, such as opening times and prices.",
    fields: [
      { key: "days", label: "Number of days", example: "3" },
      { key: "place", label: "Place", example: "Lisbon" },
      { key: "travelers", label: "Who is going", example: "two adults" },
      { key: "budget", label: "Daily budget", example: "$120" },
      { key: "interests", label: "Interests", example: "food, history and walking" },
    ],
    checkTip: "Confirm opening times, prices and bookings on official sites. They change often.",
  },
  {
    id: "firm-polite-letter",
    title: "Write a firm but polite complaint letter",
    task: "home",
    level: 1,
    whenToUse: "A company, landlord or school has not fixed a problem and you want a clear written request.",
    template: "You are a calm customer-service writer. Write a letter to {{recipient}} about {{problem}}. Facts: {{facts}}. What I want: {{outcome}}. Use short paragraphs, make one clear request and name a date by which I expect a reply. Keep it polite and firm, under {{length}} words. Do not threaten anything and do not invent facts.",
    fields: [
      { key: "recipient", label: "Who it goes to", example: "the property manager" },
      { key: "problem", label: "The problem", example: "a broken heater for three weeks" },
      { key: "facts", label: "Facts and dates", example: "reported on Oct 1 and Oct 8, no reply" },
      { key: "outcome", label: "What you want", example: "repair within 7 days" },
      { key: "length", label: "Word limit", example: "200" },
    ],
    checkTip: "For legal disputes, talk to a qualified person before you send anything.",
  },
  {
    id: "explain-to-a-child",
    title: "Explain something to a child",
    task: "home",
    level: 1,
    whenToUse: "A child has asked a question and you want a short, kind, age-fit answer.",
    template: "You are a kind, funny teacher for a {{age}}-year-old. Explain {{topic}} with a simple story and one question the child can answer. Use short sentences and no jargon. Keep it under {{length}} words. If part of the topic is not suitable for a child, leave it out and tell me which part.",
    fields: [
      { key: "age", label: "Child's age", example: "7" },
      { key: "topic", label: "Topic", example: "why the sky is blue" },
      { key: "length", label: "Word limit", example: "150" },
    ],
    checkTip: "Read it yourself first. If it is wrong or too much, adjust before you share it.",
  },

  // ---- Money and shopping ----
  {
    id: "compare-purchases",
    title: "Compare products by what matters to me",
    task: "money",
    level: 2,
    whenToUse: "You are choosing between products and want sources, not just opinions.",
    template: "You are a careful shopping researcher. Compare {{products}} for {{use}}. My budget is {{budget}} and my must-haves are {{musthaves}}. Use web search and cite each source. Format: a table of price, key features, drawbacks and warranty, then a recommendation with one reason. Say when a price or feature could not be confirmed.",
    fields: [
      { key: "products", label: "Products", example: "two robot vacuums" },
      { key: "use", label: "How you will use it", example: "a small apartment with a cat" },
      { key: "budget", label: "Budget", example: "$300" },
      { key: "musthaves", label: "Must-haves", example: "quiet, easy to empty" },
    ],
    checkTip: "Prices and stock change. Open the sources and confirm on the seller's site before you buy.",
    guide: GUIDE.factCheck,
  },
  {
    id: "explain-a-bill",
    title: "Make sense of a bill or contract",
    task: "money",
    level: 1,
    whenToUse: "A bill or agreement is full of terms and you want the key points in plain English.",
    template: "You are a plain-English explainer, not a lawyer. Explain the text below. List every fee, the end date, how to cancel and anything that renews automatically. Flag anything unusual as a question I should ask the company. Do not guess when the text is unclear.\n\nText:\n{{text}}",
    fields: [
      { key: "text", label: "The text", example: "Paste the terms, with account numbers and personal details removed", multiline: true },
    ],
    checkTip: "This is not legal or financial advice. Confirm fees and cancellation terms with the company.",
    guide: GUIDE.neverShare,
  },
  {
    id: "simple-budget",
    title: "Build a simple monthly budget",
    task: "money",
    level: 1,
    whenToUse: "You want to split what is left each month between needs, wants and savings.",
    template: "You are a budgeting coach. My monthly take-home income is about {{income}} and my fixed costs are about {{fixed}}. Help me split what is left into needs, wants and savings, and show it as a table. Ask me up to three questions first if something is missing. Do not recommend specific investments or products.",
    fields: [
      { key: "income", label: "Monthly take-home", example: "$2,400" },
      { key: "fixed", label: "Fixed costs", example: "$1,300" },
    ],
    checkTip: "Use rounded numbers and leave out account details. For big money decisions, talk to a qualified advisor.",
    guide: GUIDE.neverShare,
  },

  // ---- Jobs and resumes ----
  {
    id: "resume-bullets",
    title: "Strengthen my resume bullet points",
    task: "jobs",
    level: 2,
    whenToUse: "Your resume lists duties and you want clearer, result-focused lines that stay true.",
    template: "You are an experienced hiring manager. Rewrite the resume bullets below for a {{role}} job. Keep every fact true: do not add numbers, tools or results I did not give you. Write one bullet per line, each starting with a strong verb and ending with the result if I gave one. Mark any bullet that needs a number with [add a number].\n\nBullets:\n{{bullets}}",
    fields: [
      { key: "role", label: "Job you want", example: "customer support lead" },
      { key: "bullets", label: "Your bullets", example: "Paste your current bullet points", multiline: true },
    ],
    checkTip: "You are responsible for every line. Remove anything you could not explain in an interview.",
    guide: GUIDE.resume,
    keywords: ["cv"],
  },
  {
    id: "tailor-resume",
    title: "Compare my resume with a job post",
    task: "jobs",
    level: 2,
    whenToUse: "You are applying for a specific job and want to know what to emphasize.",
    template: "You are a recruiter reading for the job post below. Compare my resume with the post and tell me: the five skills or keywords the post stresses, which ones my resume already shows and which are missing. Then suggest edits to my existing bullets only. Do not invent experience.\n\nJob post:\n{{jobpost}}\n\nResume:\n{{resume}}",
    fields: [
      { key: "jobpost", label: "Job post", example: "Paste the job post", multiline: true },
      { key: "resume", label: "Your resume", example: "Paste your resume without contact details", multiline: true },
    ],
    checkTip: "Remove contact details and ID numbers before you paste. Only add skills you really have.",
    guide: GUIDE.resume,
    keywords: ["cv"],
  },
  {
    id: "mock-interview",
    title: "Practice an interview one question at a time",
    task: "jobs",
    level: 2,
    whenToUse: "You have an interview coming up and want realistic practice with feedback.",
    template: "You are a friendly interviewer for a {{role}} role at {{employer}}. Ask me one question at a time, starting with an easy one. After each answer, give feedback in two lines: what worked and one thing to improve, then ask the next question. Ask {{count}} questions in total, including one about a weakness and one about a time I handled a conflict. At the end, summarize my strongest and weakest answers.",
    fields: [
      { key: "role", label: "Role", example: "marketing coordinator" },
      { key: "employer", label: "Type of employer", example: "a small nonprofit" },
      { key: "count", label: "Number of questions", example: "8" },
    ],
    checkTip: "Feedback is a rehearsal aid, not a prediction. Practice your answers out loud too.",
    guide: GUIDE.resume,
  },
  {
    id: "thank-you-email",
    title: "Write a thank-you email after an interview",
    task: "jobs",
    level: 1,
    whenToUse: "You want a short, warm follow-up that mentions something specific.",
    template: "You are a professional writer. Write a short thank-you email to {{interviewer}} after my interview for {{role}}. Mention one specific thing we talked about: {{topic}}. Keep it under {{length}} words, warm and not pushy, with a clear closing line. Do not exaggerate my experience.",
    fields: [
      { key: "interviewer", label: "Interviewer", example: "Ms. Patel" },
      { key: "role", label: "Role", example: "office manager" },
      { key: "topic", label: "Something you discussed", example: "the plan to open a second location" },
      { key: "length", label: "Word limit", example: "100" },
    ],
    checkTip: "Check the name, role and detail are right, then send it within a day or two.",
    guide: GUIDE.resume,
  },

  // ---- Research and checking ----
  {
    id: "fact-check-answer",
    title: "Fact-check an AI answer",
    task: "checking",
    level: 2,
    whenToUse: "An answer looks useful and you want to know which parts to verify first.",
    template: "You are a skeptical fact-checker. Here is an answer I received:\n{{claim}}\n\nList each factual statement separately. Rate each one as likely true, uncertain or likely false, and name what kind of source would confirm it. Do not make up sources or links. Tell me which statements I should check by hand first.",
    fields: [
      { key: "claim", label: "The answer to check", example: "Paste the answer you want to check", multiline: true },
    ],
    checkTip: "A chatbot checking itself is a first pass only. Confirm important points in a source you can open.",
    guide: GUIDE.factCheck,
  },
  {
    id: "list-assumptions",
    title: "Ask what the chatbot assumed",
    task: "checking",
    level: 1,
    whenToUse: "You are about to act on an answer and want to see its weak spots.",
    template: "Before I rely on your last answer, list every assumption you made, every point you were unsure about and anything you could not check. Then tell me one question I should ask next to get a more reliable answer.",
    fields: [],
    checkTip: "Send this right after any answer you plan to act on.",
    guide: GUIDE.factCheck,
  },
  {
    id: "research-brief",
    title: "Write a research brief for deep research",
    task: "checking",
    level: 2,
    whenToUse: "You are using a deep research mode and want sourced findings, not a vague essay.",
    template: "You are a research assistant. Research {{question}} for {{audience}}. Use sources from {{timeframe}}, prefer official and primary sources, and cite each claim with a link. Format: a short answer first, then findings in a table with the columns Claim, Source and Confidence, then open questions. Say clearly when sources disagree.",
    fields: [
      { key: "question", label: "Your question", example: "how heat pumps perform in cold climates" },
      { key: "audience", label: "Who it is for", example: "a homeowner" },
      { key: "timeframe", label: "Time frame for sources", example: "the last two years" },
    ],
    checkTip: "Open the links it gives and check that each one supports the claim next to it.",
    guide: GUIDE.research,
  },
  {
    id: "argue-the-other-side",
    title: "Argue the strongest case against my view",
    task: "checking",
    level: 1,
    whenToUse: "You want to test an opinion before you share or act on it.",
    template: "You are a fair debate coach. I believe {{belief}}. Give the strongest case against my view, written the way a thoughtful supporter of the other side would write it. Then list three facts that would change my mind. Do not mock either side.",
    fields: [
      { key: "belief", label: "Your view", example: "a four-day work week would help small businesses" },
    ],
    checkTip: "Treat it as a way to find gaps, not a verdict. Look up any fact it cites.",
  },

  // ---- Build and test ----
  {
    id: "personal-test-set",
    title: "Create a personal test set",
    task: "building",
    level: 3,
    whenToUse: "You want to compare models on your own work instead of trusting headlines.",
    template: "You are an evaluation designer. I use AI for {{job}}. Write 10 realistic test tasks of varying difficulty that I can run on any model. For each task give the prompt, what a good answer must contain and a 0 to 2 scoring rule. Put it in a table. Include two tasks where a wrong answer would be costly.",
    fields: [
      { key: "job", label: "What you use AI for", example: "summarizing customer feedback" },
    ],
    checkTip: "Replace any generic task with a real one from your week, then keep the same set for every re-test.",
    guide: GUIDE.testSet,
  },
  {
    id: "system-prompt",
    title: "Draft a system prompt for an assistant",
    task: "building",
    level: 3,
    whenToUse: "You are setting up an assistant for a team or a customer-facing tool.",
    template: "You are a prompt engineer. Write a system prompt for an assistant that {{purpose}}. Its users are {{users}}. Include its role, what it must always do, what it must never do, how to answer when it does not know and the output format: {{format}}. Keep it under {{length}} words and add three test questions I can use to check that it behaves.",
    fields: [
      { key: "purpose", label: "What it does", example: "answers questions about our returns policy" },
      { key: "users", label: "Who uses it", example: "customers on our website" },
      { key: "format", label: "Output format", example: "short answers with a link to the policy" },
      { key: "length", label: "Word limit", example: "250" },
    ],
    checkTip: "Run the three test questions plus a few hostile ones before anyone relies on it.",
    guide: GUIDE.agents,
  },
  {
    id: "cost-per-task",
    title: "Work out the cost per task",
    task: "building",
    level: 3,
    whenToUse: "You want to see what one task and a month of tasks would cost on an API.",
    template: "You are a cost analyst. A task uses about {{input}} input tokens and {{output}} output tokens. The price is {{inprice}} dollars per million input tokens and {{outprice}} dollars per million output tokens. Show the cost of one task and of {{tasks}} tasks, and explain how caching or batch pricing could change it where they are available. Show your arithmetic step by step so I can check it.",
    fields: [
      { key: "input", label: "Input tokens per task", example: "3,000" },
      { key: "output", label: "Output tokens per task", example: "800" },
      { key: "inprice", label: "Input price per million tokens", example: "2" },
      { key: "outprice", label: "Output price per million tokens", example: "10" },
      { key: "tasks", label: "Tasks per month", example: "5,000" },
    ],
    checkTip: "Models can slip on arithmetic. Check the result with the API cost calculator.",
    guide: GUIDE.apiPricing,
  },
  {
    id: "agent-permissions",
    title: "List the permissions an AI agent really needs",
    task: "building",
    level: 3,
    whenToUse: "You plan to let an agent act on your accounts or files and want the smallest safe setup.",
    template: "You are a security-minded reviewer. I want an AI agent to {{job}} using {{tools}}. List the minimum permissions it needs, what each could do if misused, which actions should need my approval first and which should be impossible. Format: a table with the columns Permission, Needed for, Risk and Approval rule. Assume the agent may read hostile text on a web page or in an email.",
    fields: [
      { key: "job", label: "What the agent should do", example: "sort my inbox and draft replies" },
      { key: "tools", label: "Tools it would use", example: "my email and calendar" },
    ],
    checkTip: "Start with the smallest permissions, add one at a time and review what the agent did.",
    guide: GUIDE.agents,
  },
];