/**
 * Content, types and helpers for the "AI in education" page.
 * Pure data with no React, so it can be tested and reused without rendering.
 * Every statistic points at a source id; the view turns ids into [n] links.
 */

export const AI_IN_EDUCATION_TITLE = "AI in education: tutor, teacher aid or shortcut?";
export const AI_IN_EDUCATION_DESCRIPTION =
  "What students, teachers and parents actually do with AI, what the research says about learning, how to set fair rules, why AI detectors are unreliable, and which age and privacy rules apply.";
/** Shown as "Last reviewed". Update whenever the text or sources are rechecked. */
export const AI_IN_EDUCATION_LAST_REVIEWED = "1 November 2026";

/* ------------------------------ Sources ------------------------------ */

export interface EducationSource {
  readonly id: string;
  /** Kind of source, so readers can weigh it (e.g. "Peer-reviewed"). */
  readonly label: string;
  readonly title: string;
  readonly url: string;
}

/** Order matters: the position in this list is the number shown as [n]. */
export const EDUCATION_SOURCES = [
  {
    id: "hepi",
    label: "Independent survey",
    title: "HEPI and Kortext: Student Generative AI Survey 2026 (Report 199)",
    url: "https://www.hepi.ac.uk/reports/student-generative-ai-survey-2026/",
  },
  {
    id: "decoder",
    label: "Secondary report",
    title: "The Decoder: 95% of UK students now use AI, and their experiences could not be more divided",
    url: "https://the-decoder.com/95-of-uk-students-now-use-ai-and-their-experiences-couldnt-be-more-divided/",
  },
  {
    id: "pew",
    label: "Independent survey",
    title: "Pew Research Center: How Teens Use and View AI (24 February 2026)",
    url: "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
  },
  {
    id: "academica",
    label: "Survey",
    title: "Academica Group: How are Canadian postsecondary students using generative AI today? (2026)",
    url: "https://forum.academica.ca/forum/studentvu-generative-ai-2026-1",
  },
  {
    id: "gallupEdsource",
    label: "Secondary report",
    title: "EdSource: AI tools help teachers save time, new survey finds (Gallup and Walton Family Foundation)",
    url: "https://edsource.org/news-updates/page/artificial-intelligence-tools-help-teachers-save-time-new-survey-finds",
  },
  {
    id: "crpe",
    label: "Independent analysis",
    title: "CRPE: The AI Dividend, does AI create more time for teachers?",
    url: "https://crpe.substack.com/p/the-ai-dividenddoes-ai-create-more",
  },
  {
    id: "pnas",
    label: "Peer-reviewed",
    title: "Bastani et al., PNAS 2025: Generative AI without guardrails can harm learning",
    url: "https://doi.org/10.1073/pnas.2422633122",
  },
  {
    id: "mtRoyal",
    label: "University guidance",
    title: "Mount Royal University: Advisory on AI writing detection",
    url: "https://www.mtroyal.ca/AI/ai-detection-advisory.htm",
  },
  {
    id: "markup",
    label: "News report",
    title: "The Markup: AI detection tools falsely accuse international students of cheating",
    url: "https://themarkup.org/machine-learning/2023/08/14/ai-detection-tools-falsely-accuse-international-students-of-cheating",
  },
  {
    id: "openaiAge",
    label: "Vendor-reported",
    title: "OpenAI Help Center: Age requirements for ChatGPT",
    url: "https://help.openai.com/en/articles/8313401-age-requirements-for-chatgpt",
  },
  {
    id: "jisc",
    label: "Public body guidance",
    title: "Jisc National Centre for AI: AI tools and their age restrictions",
    url: "https://nationalcentreforai.jiscinvolve.org/wp/?p=5658",
  },
  {
    id: "sig",
    label: "Secondary report",
    title: "Software Improvement Group: EU AI Act summary (updated 14 August 2026)",
    url: "https://www.softwareimprovementgroup.com/eu-ai-act-summary/",
  },
  {
    id: "gibson",
    label: "Law firm summary",
    title: "Gibson Dunn: EU AI Act Omnibus agreement, postponed high-risk deadlines",
    url: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/",
  },
  {
    id: "casrai",
    label: "Secondary report",
    title: "CASRAI: Digital Omnibus on AI summary (Annex III education uses)",
    url: "https://casrai.org/wp/tag/digital-omnibus-summary/",
  },
] as const satisfies readonly EducationSource[];

export type SourceId = (typeof EDUCATION_SOURCES)[number]["id"];

/** Date the sources above were last opened and checked. */
export const SOURCES_VERIFIED_ON = "1 November 2026";

/**
 * Returns the 1-based number of a source, used for [n] citations.
 * @param sourceId - Id of a source in {@link EDUCATION_SOURCES}.
 * @returns The source's position in the list, starting at 1.
 * @throws If the id is not in the list (a content bug worth failing loudly on).
 */
export function getSourceNumber(sourceId: SourceId): number {
  const index = EDUCATION_SOURCES.findIndex((source) => source.id === sourceId);
  if (index === -1) {
    throw new Error(`Unknown education source id: ${sourceId}`);
  }
  return index + 1;
}

/* ------------------------------ Shared types ------------------------------ */

export interface PageSection {
  readonly id: string;
  readonly label: string;
}

export interface CitedText {
  readonly text: string;
  readonly sourceIds: readonly SourceId[];
}

export interface KeyNumber {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly detail: string;
  readonly sourceIds: readonly SourceId[];
}

export interface UsageTable {
  readonly id: string;
  readonly title: string;
  readonly activityHeading: string;
  readonly shareHeading: string;
  readonly note: string;
  readonly rows: readonly { readonly activity: string; readonly share: string }[];
  readonly sourceIds: readonly SourceId[];
}

export interface Step {
  readonly title: string;
  readonly description: string;
}

export interface CopyReadyPrompt {
  readonly id: string;
  readonly audience: "Student" | "Teacher" | "Parent" | "School leader";
  readonly title: string;
  readonly when: string;
  readonly text: string;
}

export interface AgeRuleRow {
  readonly service: string;
  readonly minimumAge: string;
  readonly notes: string;
  readonly sourceIds: readonly SourceId[];
}

export interface PolicyLevel {
  readonly tone: "green" | "amber" | "red";
  readonly label: string;
  readonly meaning: string;
  readonly examples: readonly string[];
}

export interface DatedItem {
  readonly date: string;
  readonly text: string;
  readonly sourceIds: readonly SourceId[];
}

export interface MythRow {
  readonly myth: string;
  readonly fact: string;
  readonly sourceIds: readonly SourceId[];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface RelatedLink {
  readonly href: string;
  readonly label: string;
}

/* ------------------------------ Page content ------------------------------ */

export const PAGE_SECTIONS: readonly PageSection[] = [
  { id: "in-short", label: "In short" },
  { id: "key-numbers", label: "Key numbers" },
  { id: "how-it-is-used", label: "How AI is used" },
  { id: "learning-evidence", label: "What the research says" },
  { id: "learn-or-shortcut", label: "Learning or shortcut?" },
  { id: "for-students", label: "For students" },
  { id: "for-parents", label: "For parents" },
  { id: "for-teachers", label: "For teachers" },
  { id: "detectors", label: "AI detectors" },
  { id: "for-leaders", label: "For school leaders" },
  { id: "age-and-privacy", label: "Age and privacy" },
  { id: "prompts", label: "Copy-ready prompts" },
  { id: "myths", label: "Myths and facts" },
  { id: "faq", label: "Questions" },
  { id: "this-week", label: "Do this week" },
  { id: "sources", label: "Sources" },
];

export const IN_SHORT: readonly string[] = [
  "Most students already use AI. In a December 2025 UK survey, 95% of undergraduates did, so the useful question is how well they use it, not whether they do.",
  "What matters is whether AI is doing the thinking or helping with it. In one randomised trial, students with an unrestricted chatbot did better on practice problems and then worse on the exam without it.",
  "Rules are patchy. Only 19% of US teachers said their school had an AI policy in 2025, and only 36% of UK students feel their institution encourages AI use.",
  "AI detectors are not reliable enough to accuse anyone. Use them, at most, as a reason to start a conversation.",
  "Anything graded, quoted or acted on needs a human check. Fluent answers can still be wrong.",
];

export const KEY_NUMBERS: readonly KeyNumber[] = [
  {
    id: "uk-students-use",
    value: "95%",
    label: "of UK undergraduates use AI in at least one way",
    detail: "94% use generative AI to help with assessed work. 1,054 full-time undergraduates, surveyed December 2025.",
    sourceIds: ["hepi"],
  },
  {
    id: "uk-text-in-work",
    value: "12%",
    label: "put AI-generated text directly into assessed work",
    detail: "Up from 3% in 2024 and 8% in 2025, in the same UK survey series.",
    sourceIds: ["hepi", "decoder"],
  },
  {
    id: "us-teens-schoolwork",
    value: "54%",
    label: "of US teens used chatbots for schoolwork",
    detail: "10% say they do all or most of their schoolwork with chatbot help. 1,458 teens aged 13 to 17, fielded September to October 2025.",
    sourceIds: ["pew"],
  },
  {
    id: "us-teens-cheating",
    value: "59%",
    label: "of US teens say AI cheating happens often at their school",
    detail: "This is a perception, not a measured cheating rate. It is higher among teens who use chatbots themselves.",
    sourceIds: ["pew"],
  },
  {
    id: "us-teachers-use",
    value: "60%",
    label: "of US public K-12 teachers used AI for work in 2024-25",
    detail: "32% used it at least weekly, 28% used it less often, and 40% did not use it. Gallup and Walton Family Foundation survey.",
    sourceIds: ["gallupEdsource"],
  },
  {
    id: "teacher-hours",
    value: "5.9 h",
    label: "saved per week, as estimated by weekly-user teachers",
    detail: "About six weeks a school year. It is a self-reported estimate from weekly users only, so the average across all teachers is much smaller.",
    sourceIds: ["gallupEdsource", "crpe"],
  },
  {
    id: "uk-encouraged",
    value: "36%",
    label: "of UK students feel their institution encourages AI use",
    detail: "Only 38% say they are provided with AI tools, although nearly all students use AI.",
    sourceIds: ["hepi"],
  },
  {
    id: "us-policy",
    value: "19%",
    label: "of US teachers say their school has an AI policy",
    detail: "Teachers in schools with a policy were more likely to use AI and saved more time (2025).",
    sourceIds: ["crpe"],
  },
];

export const USAGE_TABLES: readonly UsageTable[] = [
  {
    id: "uk-assessed-work",
    title: "UK undergraduates: how they use generative AI for assessed work (2026)",
    activityHeading: "Use",
    shareHeading: "Share of students",
    note: "Most common uses reported in December 2025. Students could pick more than one.",
    rows: [
      { activity: "Having concepts explained", share: "61%" },
      { activity: "Summarising articles", share: "49%" },
      { activity: "Generating research ideas", share: "40%" },
      { activity: "Structuring their thoughts", share: "39%" },
      { activity: "Using it as a search engine", share: "36%" },
    ],
    sourceIds: ["hepi", "decoder"],
  },
  {
    id: "us-teens-tasks",
    title: "US teens: what they use chatbots for (2025 survey)",
    activityHeading: "Use",
    shareHeading: "Share of all teens",
    note: "Teens aged 13 to 17. Pew also found that 12% had used a chatbot for emotional support or advice.",
    rows: [
      { activity: "Searching for information", share: "57%" },
      { activity: "Help with schoolwork", share: "54%" },
      { activity: "Fun or entertainment", share: "47%" },
      { activity: "Researching a topic for school", share: "48%" },
      { activity: "Solving a math problem", share: "43%" },
      { activity: "Editing something they wrote", share: "35%" },
    ],
    sourceIds: ["pew"],
  },
];

export const USAGE_RULES_NOTE: CitedText = {
  text: "Rules vary a lot. In a 2026 Canadian survey, 58% of postsecondary students said they could use generative AI in at least some capacity for coursework and 30% said they were not allowed to.",
  sourceIds: ["academica"],
};

export const LEARNING_EVIDENCE = {
  intro:
    "The best-known experiment so far is a pre-registered randomised trial with nearly 1,000 high school maths students. Students reviewed material in practice sessions, then sat an exam with no AI. One group had a chatbot that behaved like standard ChatGPT. Another had a tutor prompted to guide rather than solve. A third had no AI.",
  columns: ["Group", "Practice problems", "Later exam without AI"],
  rows: [
    ["No AI (control)", "Baseline", "Baseline"],
    ["Standard chatbot", "Grades 48% higher", "17% lower than the control group"],
    ["Guided tutor", "Grades 127% higher", "The drop was largely avoided"],
  ],
  rowsSourceIds: ["pnas"] as readonly SourceId[],
  takeaways: [
    "AI can lift performance while you use it and still leave you less able on your own. Students used the standard chatbot as a crutch during practice.",
    "How the tool is set up matters. A tutor that asks questions and gives hints protected learning in this trial.",
    "Both effects are about the same tool, so the lesson is about how it is used, not about whether AI is good or bad.",
  ],
  caveats: [
    "One school, one subject (maths), one country and a short run of sessions. Treat it as strong evidence about a design choice, not a verdict on all AI use.",
    "Longer-term effects, other subjects and other tools are less well tested.",
  ],
} as const;

export const LEARN_VS_SHORTCUT_ROWS: readonly { readonly learning: string; readonly shortcut: string }[] = [
  {
    learning: "Ask for a hint, then try the next step yourself",
    shortcut: "Paste the question and copy the answer",
  },
  {
    learning: "Explain the idea back in your own words and ask what is wrong",
    shortcut: "Ask for an essay and change a few words",
  },
  {
    learning: "Ask for practice questions, answer them, then check",
    shortcut: "Ask for the answers to the practice sheet",
  },
  {
    learning: "Get feedback on a draft you wrote",
    shortcut: "Have it write the draft, then ask for feedback on that",
  },
  {
    learning: "Summarise a reading you will still read",
    shortcut: "Replace the reading with the summary",
  },
  {
    learning: "Test yourself the next day with the book closed",
    shortcut: "Assume you know it because the chat made sense",
  },
];

export const LEARN_VS_SHORTCUT_TEST =
  "A quick test: could you do a similar task tomorrow, alone, with the chat closed? If not, the AI did the learning for you.";

export const STUDENT_ROUTINE: readonly Step[] = [
  {
    title: "Check the rules first",
    description:
      "Look for your teacher's or school's AI rule for each assignment. If it is unclear, ask in writing. Rules differ between courses.",
  },
  {
    title: "Try it yourself before asking",
    description:
      "Spend a few minutes on the problem first. Then you can tell the AI exactly where you are stuck, and you learn more from the answer.",
  },
  {
    title: "Ask for hints, not answers",
    description:
      "Ask it to guide you step by step, or to check your working. Tell it not to give the final answer.",
  },
  {
    title: "Verify anything you will use",
    description:
      "Check facts, numbers, quotes and references against a textbook or an official source. Chatbots can invent sources that look real.",
  },
  {
    title: "Write the final work yourself",
    description:
      "Use your own words and your own reasoning. Keep notes and drafts, which also protect you if your work is ever questioned.",
  },
  {
    title: "Say what you used",
    description:
      "Where your school asks, state which tool you used and what for. Use the disclosure line below.",
  },
  {
    title: "Self-test the next day",
    description:
      "Close the chat and try a few questions from memory. This is the check that learning actually happened.",
  },
];

export const DISCLOSURE_TEMPLATE =
  "AI use statement: I used [tool name] on [date] to [what it did, for example explain a concept, give feedback on my draft]. I wrote the final text myself and checked the facts I used against [sources].";

export const POLICY_LEVELS: readonly PolicyLevel[] = [
  {
    tone: "green",
    label: "Allowed freely",
    meaning: "Using AI supports learning and does not replace the thing being assessed.",
    examples: [
      "Explaining a concept in simpler words",
      "Generating practice questions",
      "Brainstorming ideas to research",
      "Checking grammar on your own draft",
    ],
  },
  {
    tone: "amber",
    label: "Allowed with disclosure",
    meaning: "AI plays a visible role, so the student says what it did.",
    examples: [
      "Feedback on a draft the student wrote",
      "Summarising a long source before reading it",
      "Translating or rephrasing for language practice",
      "Help structuring an outline",
    ],
  },
  {
    tone: "red",
    label: "Not allowed",
    meaning: "The task exists to show the student's own skill or knowledge.",
    examples: [
      "Submitting AI-written text as the student's own",
      "Using AI during an exam or a closed-book task",
      "Citing sources the AI produced without checking them",
      "Entering other people's personal details into a chatbot",
    ],
  },
];

export const POLICY_LEVELS_NOTE =
  "This three-level model is our suggestion, not a legal standard. Adapt it to your school's own rules, and state the level on each assignment.";

export const PARENT_SECTION = {
  intro:
    "You do not need to be a technology expert. Staying curious, and asking your child to explain what they did, covers most of what matters.",
  schoolQuestions: [
    "What is the school's AI policy, and is it written down?",
    "Which AI tools, if any, are approved for students, and at what ages?",
    "How should students disclose AI use on homework?",
    "How does the school handle suspected misuse, and does it rely on AI detectors?",
    "What happens to student data entered into approved tools?",
  ],
  homeRules: [
    "AI can explain and quiz. The final work is your own.",
    "No full names, addresses, school names, photos or other people's details in a chat.",
    "Tell me if an answer feels wrong, strange or upsetting, and you will not be in trouble for showing me.",
    "Check facts in a second source before you use them.",
    "Chatbots are not a replacement for people when you feel low or worried. Talk to someone you trust.",
  ],
  talkStarters: [
    "Show me how you used it today. What did you ask?",
    "Could you explain that answer to me without looking at the screen?",
    "How did you check whether it was right?",
    "Is this allowed for this assignment? How do you know?",
  ],
  signsToTalk: [
    "Your child cannot explain work they handed in",
    "A sudden change in writing style or vocabulary",
    "Work finished far faster than the task would normally take",
    "Hiding the screen, or reluctance to talk about how homework was done",
  ],
  signsNote:
    "These are reasons to have a calm conversation, not proof of cheating. Many students use AI openly and within the rules.",
  wellbeingNote:
    "Some young people use chatbots for company or emotional support: 12% of US teens in Pew's survey, and 15% of UK undergraduates in the HEPI survey reported using AI for friendship, company or loneliness. A chatbot is not a counsellor. If your child seems low, anxious or isolated, involve a trusted adult or a qualified professional.",
  wellbeingSourceIds: ["pew", "decoder"] as readonly SourceId[],
};

export const TEACHER_SECTION = {
  intro:
    "Teachers report real benefits and real unease. Clear rules and assignments that show the thinking help more than trying to catch misuse afterwards.",
  designIdeas: [
    "State the AI level (allowed, disclose, not allowed) on every assignment.",
    "Grade the process as well as the product: outlines, drafts, notes and reflections.",
    "Use short in-class writing or a quick oral explanation to confirm understanding.",
    "Tie tasks to class discussion, local examples or personal experience that a chatbot cannot know.",
    "Ask students to critique an AI answer and find its errors. This builds the checking skill they need.",
    "Offer a hint-only tutor prompt for practice, so students have a safer way to use AI than copying.",
  ],
  keepHuman: [
    "Final grades and decisions about a student",
    "Feedback on sensitive or personal work",
    "Any step that needs knowledge of a particular child",
    "Judgements about academic misconduct",
  ],
  privacyRules: [
    "Use only tools your school has approved.",
    "Remove names and identifying details before pasting student work into any tool.",
    "Never enter grades, health or behaviour records into a general chatbot.",
    "Check the tool's minimum age before asking students to sign up.",
  ],
  timeNote: {
    text: "Teachers who use AI weekly estimate they save 5.9 hours a week, about six weeks a school year. That is a self-reported figure from weekly users. Occasional users report much less, and saved time does not always become free time.",
    sourceIds: ["gallupEdsource", "crpe"] as readonly SourceId[],
  },
};

export const DETECTOR_EVIDENCE = {
  intro:
    "AI-writing detectors claim to tell human text from machine text. Independent testing shows they make mistakes in both directions, and the mistakes are not evenly spread.",
  facts: [
    {
      text: "Stanford researchers tested seven detectors on essays by non-native English writers. On average, 61.3% of those essays were wrongly flagged as AI-written, and 18 of the 91 were flagged by all seven. Essays by US-born students were almost never flagged.",
      sourceIds: ["mtRoyal", "markup"],
    },
    {
      text: "Detectors look for predictable word choice. Writers working in a second language often write in a plainer style, which the tools read as machine-like.",
      sourceIds: ["markup"],
    },
    {
      text: "A 2023 study of fourteen detectors, including Turnitin, found that none reached 80% overall accuracy, and simple edits such as paraphrasing lowered accuracy further.",
      sourceIds: ["mtRoyal"],
    },
    {
      text: "OpenAI withdrew its own AI text classifier in July 2023, citing low accuracy.",
      sourceIds: ["mtRoyal", "markup"],
    },
  ] as readonly CitedText[],
  advice: [
    "Never treat a detector score as proof. A false accusation can cost a student a grade, a scholarship or their reputation.",
    "If work looks unusual, talk with the student first. Ask them to explain their argument, show drafts or version history, or redo part of the task in class.",
    "Be most careful with students who write in a second language.",
    "Prefer assignment design and clear rules over after-the-fact detection.",
  ],
};

export const LEADER_CHECKLIST: readonly string[] = [
  "Write a short AI policy that students, parents and teachers can all find, and review it each term.",
  "Adopt a simple model, such as the three levels above, so rules are consistent across subjects.",
  "List approved tools with their age limits and data terms, and keep the list current.",
  "Train staff. Teachers using AI with no training or guidance are guessing.",
  "Do not use detector scores as the sole basis for a misconduct decision.",
  "Plan for equity: students without home devices or paid plans should not be disadvantaged.",
  "Give students a clear route to ask questions and to appeal a decision.",
];

export const EU_ACT_NOTE =
  "This section is general information, not legal advice. If you run a school or education service in the EU, or sell to one, check the current text of the AI Act and ask a qualified adviser.";

export const EU_ACT_ITEMS: readonly DatedItem[] = [
  {
    date: "2 February 2025",
    text: "The ban on certain unacceptable-risk AI practices and the AI literacy duty began to apply.",
    sourceIds: ["gibson"],
  },
  {
    date: "Education uses",
    text: "The Act treats some education uses as high-risk: deciding admission or access, evaluating learning outcomes, assessing a person's appropriate level of education, and monitoring prohibited behaviour during tests.",
    sourceIds: ["casrai"],
  },
  {
    date: "2 December 2027",
    text: "Obligations for stand-alone high-risk systems, including these education uses, now apply from this date. They were due on 2 August 2026 until the Digital Omnibus on AI (Regulation (EU) 2026/1744), in force since 27 July 2026, moved them.",
    sourceIds: ["sig"],
  },
];

export const AGE_RULE_ROWS: readonly AgeRuleRow[] = [
  {
    service: "ChatGPT",
    minimumAge: "13+, with parental consent under 18",
    notes: "OpenAI says ChatGPT is not meant for children under 13 and requires parental consent for ages 13 to 18.",
    sourceIds: ["openaiAge"],
  },
  {
    service: "Claude",
    minimumAge: "18+ for individual accounts",
    notes: "Schools and universities may offer managed access for younger users under supervision.",
    sourceIds: ["jisc"],
  },
  {
    service: "Gemini",
    minimumAge: "Varies by account type and country",
    notes: "Sources differ. School-managed accounts can follow the school's admin settings and consent rules. Check Google's current terms for your country.",
    sourceIds: ["jisc"],
  },
];

export const AGE_RULES_NOTE =
  "Terms and age limits change. Check the provider's own terms and your school's approved-tool list before a child signs up. Never enter a false birth date to get around an age limit.";

export const PRIVACY_BASICS: readonly string[] = [
  "Treat everything typed into a chatbot as something that could be stored.",
  "Do not enter full names, addresses, school names, photos, health details or passwords.",
  "Look for a setting that stops your chats being used to train the model, and check whether it applies to your account.",
  "Prefer school-approved tools, which usually have agreements about student data.",
  "See our guide on what never to share with an AI chatbot, and our privacy matrix for each service's training and retention settings.",
];

export const COPY_READY_PROMPTS: readonly CopyReadyPrompt[] = [
  {
    id: "hint-only-tutor",
    audience: "Student",
    title: "Hint-only tutor",
    when: "Stuck on a problem you have already tried.",
    text: "Act as a tutor for [subject] at [level]. I am stuck on this problem: [paste problem]. Here is what I tried: [your attempt]. Do not give me the final answer. Give one hint, then wait for me to try again.",
  },
  {
    id: "explain-back",
    audience: "Student",
    title: "Explain it back to me",
    when: "After reading about a topic, to find gaps.",
    text: "I will explain [topic] in my own words: [your explanation]. Tell me what is correct, what is missing and what is wrong. Do not rewrite it for me. List anything I should confirm in my textbook.",
  },
  {
    id: "quiz-me",
    audience: "Student",
    title: "Quiz me without giving answers away",
    when: "Revising a topic you have already studied.",
    text: "Ask me five questions on [topic] at [level], one at a time. Wait for my answer before saying whether I am right, then explain any mistake briefly. Finish by listing the areas I should review.",
  },
  {
    id: "feedback-not-rewrite",
    audience: "Student",
    title: "Feedback on my draft, not a rewrite",
    when: "You wrote the draft and want it improved.",
    text: "Here is my draft: [paste text]. Do not rewrite it. Name the three biggest weaknesses, quote the sentence each refers to, and give me one question to ask myself to fix each one.",
  },
  {
    id: "argument-holes",
    audience: "Student",
    title: "Find the holes in my argument",
    when: "Preparing an essay or a debate.",
    text: "My argument is: [your argument]. Give the three strongest objections a critic would raise, and the kind of evidence that would answer each. Do not write my paragraphs.",
  },
  {
    id: "rubric-draft",
    audience: "Teacher",
    title: "Draft a rubric to edit",
    when: "Starting a rubric for an assignment.",
    text: "Draft a four-level rubric for [assignment] for students aged [age range]. Criteria: [list]. Use plain language a student could follow. I will edit it, so mark anything that depends on our curriculum.",
  },
  {
    id: "reading-level",
    audience: "Teacher",
    title: "Adjust a reading for my class",
    when: "A text is too hard or too easy for part of your class.",
    text: "Rewrite the passage below for students reading at [level]. Keep every key fact and term. List anything you simplified so I can check it. Passage: [paste text without student names]",
  },
  {
    id: "practice-set",
    audience: "Teacher",
    title: "Differentiated practice set",
    when: "Planning practice for mixed abilities.",
    text: "Create 10 practice questions on [topic] in three levels: support, core and stretch. Give a short answer key and note the common mistake each level targets. I will check the answers before using them.",
  },
  {
    id: "family-agreement",
    audience: "Parent",
    title: "Family AI agreement",
    when: "Setting house rules with your child.",
    text: "Help me write a one-page family agreement about using AI for homework with a [age]-year-old. Include when AI is fine, when it is not, what never to share, and what to do if an answer feels wrong. Use friendly language.",
  },
  {
    id: "policy-outline",
    audience: "School leader",
    title: "AI policy outline",
    when: "Starting a school or department policy.",
    text: "Draft an outline for a school AI policy for [age range]. Include allowed and not-allowed uses, a disclosure rule, approved tools, data protection, academic integrity, staff training and an appeals process. Leave blanks for details I must fill in.",
  },
];

export const MYTH_ROWS: readonly MythRow[] = [
  {
    myth: "AI detectors can prove a student cheated.",
    fact: "Independent tests show frequent false positives, especially for second-language writers. A score is not proof.",
    sourceIds: ["mtRoyal", "markup"],
  },
  {
    myth: "Students are not really using AI.",
    fact: "In the latest surveys, 95% of UK undergraduates and 54% of US teens use it for study.",
    sourceIds: ["hepi", "pew"],
  },
  {
    myth: "AI tutors always help students learn.",
    fact: "It depends on the design. In one trial an unrestricted chatbot hurt later exam results, while a guided tutor largely avoided that.",
    sourceIds: ["pnas"],
  },
  {
    myth: "AI saves every teacher six weeks a year.",
    fact: "That is the self-reported estimate of teachers who use AI weekly. The typical saving across all teachers is smaller.",
    sourceIds: ["gallupEdsource", "crpe"],
  },
  {
    myth: "If an answer sounds confident, it is correct.",
    fact: "Chatbots can state false things fluently. Check facts, numbers and references yourself.",
    sourceIds: [],
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Can my child use ChatGPT or another chatbot for homework?",
    answer:
      "First check the school's rule for that assignment, then the tool's age limit. ChatGPT requires parental consent for ages 13 to 18, and some tools set the minimum at 18. If both are fine, use it to learn, with hints and checking, not to produce the final answer.",
  },
  {
    question: "Is using AI for schoolwork cheating?",
    answer:
      "It depends on the rules and on what the task is meant to show. Using AI to explain a concept is usually fine. Submitting AI text as your own work where it is not allowed is not. When in doubt, ask your teacher before you start.",
  },
  {
    question: "How do I reference or disclose AI use?",
    answer:
      "Follow your teacher's instructions first. If none are given, state the tool, the date and what it did, using a short statement like the one in this guide. Citation styles such as APA and MLA publish their own guidance, so check the one your course uses.",
  },
  {
    question: "How can I tell if an AI answer is wrong?",
    answer:
      "Check the facts, numbers, dates and references against a textbook or an official source. Ask the AI to show its steps, and be most careful with maths, quotes and anything that sounds specific but unsourced.",
  },
  {
    question: "Are AI detectors accurate enough to use?",
    answer:
      "Not as proof. Tests have found high false-positive rates, particularly for second-language writers. If you use one, treat the result as a prompt for a conversation and gather other evidence.",
  },
  {
    question: "What should a teacher do first?",
    answer:
      "Pick a simple rule model, state it on each assignment, redesign one task to show process, and try a hint-only tutor prompt with the class. Do not rely on detectors, and keep student details out of general chatbots.",
  },
  {
    question: "Do AI tools in school collect student data?",
    answer:
      "Many do, and terms differ. Use school-approved tools, remove names before pasting anything, and ask the school what happens to student data. Our privacy matrix compares training and retention settings.",
  },
];

export const THIS_WEEK: readonly { readonly audience: string; readonly actions: readonly string[] }[] = [
  {
    audience: "Students",
    actions: [
      "Find the AI rule for each of your current assignments.",
      "Try the hint-only tutor prompt on one problem.",
      "Self-test tomorrow with the chat closed.",
    ],
  },
  {
    audience: "Parents",
    actions: [
      "Ask your child to show you how they used AI today.",
      "Agree three home rules, including what never to share.",
      "Ask the school for its AI policy.",
    ],
  },
  {
    audience: "Teachers",
    actions: [
      "Put an AI level on your next assignment.",
      "Add one process step, such as a draft or short oral check.",
      "Drop reliance on detector scores.",
    ],
  },
  {
    audience: "School leaders",
    actions: [
      "Publish a one-page AI policy.",
      "List approved tools with their age limits.",
      "Schedule a short training session for staff.",
    ],
  },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Submitting AI-written work as your own where the rules forbid it.",
  "Trusting invented facts or fake references because they sound confident.",
  "Letting AI do the practice that was meant to build the skill.",
  "Sharing a child's personal details in a tool the school has not approved.",
  "Accusing a student on the strength of a detector score.",
  "Using a tool below its minimum age, or with a false birth date.",
  "Leaving students without home devices or paid plans behind.",
];

export const LIMITS_TEXT =
  "School rules differ by country, school and teacher. Survey numbers describe particular groups and years and may not match your school. This page is general information, not professional, legal or safeguarding advice. Some figures come from secondary reports, labelled as such below.";

export const EDUCATION_RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/learn/foundations/what-is-ai", label: "What is AI? A plain-English guide" },
  { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
  { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
  { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
  { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes: how to spot them" },
  { href: "/prices/privacy", label: "Which AI chatbots train on your chats?" },
  { href: "/news/eu-ai-act", label: "EU AI Act timeline" },
];