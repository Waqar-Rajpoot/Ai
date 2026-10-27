import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES } from "../../foundations/foundationsSources";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const aiForEmailAndWritingAtWork: GuideRecord = {
  slug: "ai-for-email-and-writing-at-work",
  number: 10,
  level: "practitioner",
  kind: "guide",
  title: "How to use AI for email and writing at work",
  metaDescription:
    "Where AI saves time on work writing, what an MIT experiment found, a draft-edit-check workflow, and how to protect confidential information and your own voice.",
  cardSummary: "A draft, edit, check workflow for work writing, with privacy rules and ready prompts.",
  summaryPoints: [
    "In a controlled experiment, professionals using ChatGPT finished short writing tasks faster and their work was graded higher. Most did not edit the output much.",
    "You stay responsible for what you send. Check names, dates, numbers and promises before it leaves your outbox.",
    "Do not paste confidential or personal information into a public chatbot. Use your employer's approved tool if there is one.",
    "AI works best when you give it your points and ask it to improve the wording, not when you ask it to invent the message.",
  ],
  sections: [
    {
      id: "what-the-evidence-shows",
      heading: "What the evidence shows",
      paragraphs: [
        "In an MIT experiment by Noy and Zhang, 444 college-educated professionals (including marketers, grant writers, consultants, data analysts, HR professionals and managers) did two short writing tasks that resembled real work. Half were randomly given ChatGPT for the second task. Those with ChatGPT took about 10 minutes less than the others, who averaged 27 minutes, and evaluators graded their work about 0.45 standard deviations higher.",
        "Lower-scoring workers gained the most, and most people who used ChatGPT submitted its output without much editing.",
        "Be careful about how far this stretches. The tasks took 20 to 30 minutes, were self-contained and needed little knowledge of a specific company, which the authors note may make AI look more useful than it will on messy real work. The version we cite is a 2023 working paper, so it tested an older model.",
      ],
      sourceIds: [SOURCES.noyZhangWriting.id],
    },
    {
      id: "where-it-helps",
      heading: "Where AI helps at work, and where you should take over",
      table: {
        caption: "Work writing tasks, sorted by how much care they need",
        columns: ["Task", "How AI helps", "What you must do"],
        rows: [
          ["Routine email and replies", "Turns your bullet points into clear sentences", "Check names, dates and anything you promise"],
          ["Shortening or restructuring", "Cuts length and fixes order", "Make sure no important caveat disappeared"],
          ["Tone changes", "Makes a message friendlier or firmer", "Read it as the recipient would. Tone depends on your relationship"],
          ["Meeting notes into actions", "Lists decisions and owners from notes you provide", "Confirm each owner and deadline with the people involved"],
          ["Reports and proposals", "Drafts structure and first paragraphs", "Supply the facts and numbers, and verify every one"],
          ["HR, legal, safety or customer-complaint messages", "Optional help with clarity only", "Write the substance yourself and follow your organisation's process"],
        ],
      },
    },
    {
      id: "confidentiality",
      heading: "Confidential information stays out of public chatbots",
      paragraphs: [
        "The UK National Cyber Security Centre advises not to include sensitive information in queries to public chatbots and not to submit queries that would cause problems if they became public. It explains that your query is visible to the organisation providing the chatbot, and that stored queries could be used to develop future services or be exposed through a hack or leak.",
        "At work that means customer names, contracts, unreleased figures, employee matters and anything covered by a confidentiality agreement. Before using AI on a work message, check whether your employer has a policy and an approved tool. If it does, use that tool. If it does not, ask.",
      ],
      bullets: [
        "Replace real names with roles, such as “the client” or “the supplier”.",
        "Describe numbers in general terms, then add the real figures yourself afterwards.",
        "Never paste an email thread that contains other people's personal details.",
      ],
      sourceIds: [FOUNDATIONS_SOURCES.ncscChatbots.id],
    },
    {
      id: "draft-edit-check",
      heading: "A workflow that keeps you in control",
      steps: [
        {
          title: "Start with your own points",
          detail: "Write three to five bullets: what you want, what the reader needs to know, and any deadline. This keeps the facts yours and stops the AI from inventing content.",
        },
        {
          title: "Give context in the prompt",
          detail: "Say who the reader is, what you want them to do, the tone you want and a word limit. Our guide on writing better prompts explains why these details matter.",
        },
        {
          title: "Ask for two options",
          detail: "Two versions show you choices and make it easier to see what you like. Pick one and combine parts if you want.",
        },
        {
          title: "Edit in your own voice",
          detail: "Change words you would never say, remove padding and keep a sentence or two that sounds like you. The experiment above found that most users did not edit, and unedited AI text often reads generic.",
        },
        {
          title: "Check every fact and promise",
          detail: "Read the message for names, dates, amounts, attachments and commitments. Make sure nothing in it is something you did not write or intend.",
        },
        {
          title: "Send it yourself",
          detail: "Read it once out loud, then send it. Do not give an AI tool permission to send messages on your behalf unless you have reviewed each one.",
        },
      ],
      sourceIds: [SOURCES.noyZhangWriting.id],
    },
  ],
  prompts: [
    {
      id: "draft-from-bullets",
      group: "Draft",
      title: "Turn bullets into an email",
      whenToUse: "For routine email. Use roles in place of names.",
      text: "Write an email to [recipient's role] about [purpose]. Use these points: [your bullets]. Tone: [polite and direct]. Maximum [number] words. Give me two versions and two subject lines. Do not add facts that are not in my points.",
    },
    {
      id: "reply-to-difficult",
      group: "Draft",
      title: "Reply to a difficult message",
      whenToUse: "When you want to stay calm and clear. Remove names and private details first.",
      text: "Here is a message I received, with names removed: [message]. I want to [goal, for example agree to part of it and decline the rest]. Draft a reply that is professional, acknowledges their main concern in one sentence, and does not admit fault or make promises beyond these points: [your points].",
    },
    {
      id: "shorten",
      group: "Edit",
      title: "Make it shorter without losing meaning",
      whenToUse: "For long emails and reports.",
      text: "Shorten the text below by about a third. Keep every date, number, name and commitment. Tell me if you removed any caveat or condition.\n\nText: [your text]",
    },
    {
      id: "change-tone",
      group: "Edit",
      title: "Change the tone",
      whenToUse: "When a message sounds too blunt or too stiff.",
      text: "Rewrite the message below to sound [warmer, more formal or more direct] without changing the meaning or adding facts. Keep my own phrases where possible.\n\nMessage: [your message]",
    },
    {
      id: "proofread-only",
      group: "Edit",
      title: "Proofread only",
      whenToUse: "When you wrote it and only want errors fixed.",
      text: "Proofread the text below. Fix spelling, grammar and punctuation only. Do not change wording or style. List each change you made.\n\nText: [your text]",
    },
    {
      id: "notes-to-actions",
      group: "Organise",
      title: "Meeting notes to action list",
      whenToUse: "After a meeting. Paste notes you wrote and use roles in place of names.",
      text: "From the notes below, list decisions made, action items with the owner and deadline if stated, and open questions. Write not stated when an owner or deadline is missing. Do not guess.\n\nNotes: [your notes]",
    },
  ],
  whatCanGoWrong: [
    "Sending an AI draft without editing it. It may carry a wrong figure, an over-friendly tone or a promise you did not mean to make.",
    "Pasting confidential or personal information into a public chatbot, which may break your employer's rules or the law.",
    "Losing your voice, so colleagues notice every message sounds the same.",
    "Using AI for a sensitive message, such as discipline, a complaint response or a safety issue, where wording has legal or human consequences.",
    "Believing a study result will apply to your work. The experiment used short, self-contained tasks.",
  ],
  limitsNote:
    "This guide is general. Your employer's policies and any legal duties of confidentiality come first. If you are unsure whether you may use AI with certain information, ask before you do.",
  sources: [SOURCES.noyZhangWriting, FOUNDATIONS_SOURCES.ncscChatbots],
  relatedSlugs: ["write-better-prompts", "never-share-with-ai-chatbot", "fact-check-ai-answers"],
  relatedLinks: [LINKED_PAGES.promptLibrary, LINKED_PAGES.privacyMatrix],
  lastReviewed: "2026-10-27",
  published: true,
};
