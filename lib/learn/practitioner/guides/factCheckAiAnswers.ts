import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const factCheckAiAnswers: GuideRecord = {
  slug: "fact-check-ai-answers",
  number: 7,
  level: "practitioner",
  kind: "guide",
  title: "How to fact-check AI answers",
  metaDescription:
    "A practical routine for checking a chatbot's answer: split it into claims, open the sources, read laterally, and know when to stop and ask an expert.",
  cardSummary: "A five-step routine for checking claims, quotes and citations before you rely on them.",
  summaryPoints: [
    "A fluent answer can still contain a wrong date, a wrong number or a source that does not say what the chatbot claims.",
    "Check in proportion to the cost of being wrong. A name idea needs no check. A health, legal or money decision needs an independent source and often a professional.",
    "A citation is a lead, not proof. Open it and find the sentence that supports the claim.",
    "Asking the same chatbot to double-check itself is not an independent check.",
  ],
  sections: [
    {
      id: "why-check",
      heading: "Why checking is worth the time",
      paragraphs: [
        "In a study run by public broadcasters in October 2025, researchers reviewed more than 3,000 answers about news from ChatGPT, Copilot, Gemini and Perplexity. They reported that 45% of answers had at least one significant issue, that references were missing or misleading in 31% of cases, and that 20% had major accuracy problems such as fabricated or outdated information.",
        "Tools built for professionals are not immune. A Stanford study of AI legal research tools found hallucination rates of about 17% for two of them and about 33% for a third, where a hallucination meant a false statement or a false claim that a source supports a statement. The authors concluded that users still need to check that key points are supported by the sources cited.",
        "Both studies tested specific tools at a specific time, and tools change. The lesson that lasts is the habit: treat a chatbot answer as a draft that needs checking when the stakes are real.",
      ],
      sourceIds: [SOURCES.ebuNewsIntegrity.id, SOURCES.stanfordLegalHallucination.id],
    },
    {
      id: "how-much-to-check",
      heading: "Decide how much checking an answer needs",
      paragraphs: ["Ask one question first: what happens if this is wrong? Then match your effort to the answer."],
      table: {
        caption: "Matching the amount of checking to the cost of a mistake",
        columns: ["If it is wrong…", "Example", "What to do"],
        rows: [
          ["Nothing is lost", "Name ideas, a rough outline, a joke", "Use it. No check needed."],
          ["You lose some time or look slightly foolish", "A summary of an article you can read yourself", "Spot-check two or three details against the original."],
          ["You could lose money, trust or an opportunity", "A fact in a work email, a figure in a report, a quote you will publish", "Check every fact against an original source before you send or publish."],
          ["Your health, legal position or finances are affected", "Medicine doses, deadlines, contracts, tax, investments", "Use official sources and ask a qualified professional. Treat the chatbot as a way to prepare questions."],
        ],
      },
    },
    {
      id: "five-step-check",
      heading: "A five-step routine",
      steps: [
        {
          title: "Split the answer into claims",
          detail: "Underline every name, number, date, quote and citation. These are the parts that go wrong most often and the parts you can actually check. Our first prompt below does this for you.",
        },
        {
          title: "Stop before you share or act",
          detail: "The SIFT method begins with Stop: pause when something seems surprising, convenient or makes you want to share it, and do not pass it on until you know where it comes from.",
        },
        {
          title: "Investigate the source",
          detail: "For each claim that matters, ask who is behind the page it came from and what they gain. A government statistics office, a court, a peer-reviewed journal or the organisation that made the decision is a stronger source than a blog that repeats it.",
        },
        {
          title: "Find better coverage",
          detail: "Look for two independent sources that agree, using a normal search engine and not the chatbot. If you cannot find the claim anywhere else, treat it as unconfirmed.",
        },
        {
          title: "Trace the claim to where it began",
          detail: "Follow a statistic, quote or study back to the original document and read the sentence in context. Chatbots often get the number right and the context wrong, or the reverse.",
        },
      ],
      sourceIds: [SOURCES.siftMethod.id],
    },
    {
      id: "read-laterally",
      heading: "Read laterally: leave the page to judge the page",
      paragraphs: [
        "Professional fact-checkers do not read a source from top to bottom to decide whether to trust it. They open new tabs and see what other sources say about it. This is called lateral reading.",
        "In a Stanford study of about 500 high school students, six short lessons in this approach made students twice as likely to spot questionable websites. The same report notes that students still earned only half the possible points by the end, so it is a skill that improves with practice and you should expect to be imperfect at first.",
        "Apply it to a chatbot's source in three moves: open the cited site, then open a new tab and search for the site's name plus the word “reviews” or “funding” or “about”, then decide whether to trust it before you read what it says.",
      ],
      sourceIds: [SOURCES.stanfordLateralReading.id],
    },
    {
      id: "check-citations",
      heading: "Check the citation, not just that one exists",
      bullets: [
        "Open the link. If it does not load or leads to a different page, the citation is unreliable.",
        "Search the page for the key words of the claim. If you cannot find a sentence that supports it, the claim is unsupported, even if the page is on the right topic.",
        "Watch for sources that exist but say something different. The Stanford legal study counts this as a hallucination: a response is wrong if it falsely claims that a source supports a statement.",
        "If a tool gives no sources at all, do not assume they were checked. Google's help page for Gemini says that if a response has no Sources button, Gemini did not provide links for it.",
      ],
      sourceIds: [SOURCES.stanfordLegalHallucination.id, SOURCES.geminiSources.id],
    },
    {
      id: "warning-signs",
      heading: "Warning signs to slow down for",
      bullets: [
        "Very specific details (a full quote, an exact figure, a case name) with no source attached.",
        "A citation that looks perfect (author, year, journal) but that you cannot find in a search.",
        "An answer that agrees with whatever you assumed in your question. Rephrase the question neutrally and compare the two answers.",
        "Recent events, prices, rules and deadlines. Unless the tool is searching the web, it may be out of date.",
        "A confident tone on a topic experts disagree about.",
      ],
    },
  ],
  prompts: [
    {
      id: "list-claims",
      title: "List every claim that needs checking",
      whenToUse: "After any answer you plan to use. Paste the answer without names or private details.",
      text: "Below is an answer you gave me. List every factual claim as a numbered list, including names, dates, numbers, quotes and citations. Mark each one as common knowledge, needs a source, or you are unsure. Do not add new claims.\n\nAnswer: [paste the answer]",
    },
    {
      id: "search-plan",
      title: "Turn claims into search queries",
      whenToUse: "When you have the list and want to check it quickly.",
      text: "For each claim marked needs a source, give me two search queries I can type into a search engine and the kind of source that would settle it, such as a government statistics page or the original study. Do not give me the answer.",
    },
    {
      id: "source-audit",
      title: "Test whether a source really says it",
      whenToUse: "After you open a cited source and find the relevant passage.",
      text: "I opened the source you cited. The passage says: [quote the sentence]. Does it fully support your claim, partly support it, or not support it? Quote the exact words you are relying on and say what is missing.",
    },
    {
      id: "what-would-contradict",
      title: "Ask what would prove it wrong",
      whenToUse: "To find the best thing to look up first.",
      text: "If your claim that [claim] were wrong, what would I expect to find? Name two specific things I could look up to test it, and tell me where to find them.",
    },
    {
      id: "show-uncertainty",
      title: "Ask for the weak spots up front",
      whenToUse: "When you ask the question in the first place.",
      text: "Answer the question below. After the answer, list the parts you are least sure about and what I should verify. If you do not know something, say so instead of guessing. Do not invent sources.\n\nQuestion: [your question]",
    },
  ],
  whatCanGoWrong: [
    "Asking the chatbot “are you sure?” and treating a yes as a check. It can repeat the same mistake with more confidence, so look elsewhere.",
    "Checking only the first source. A claim repeated across many pages may all trace back to one weak origin.",
    "Verifying the easy details and skipping the surprising one. The most surprising claim usually needs the most checking.",
    "Searching only for confirmation. Also search for the opposite claim and see what comes up.",
    "Assuming a tool with web search or citations has already done the checking for you.",
  ],
  limitsNote:
    "This is general guidance for everyday checking. It is not legal, medical or financial advice. For decisions in those areas, rely on official sources and a qualified professional.",
  sources: [
    SOURCES.ebuNewsIntegrity,
    SOURCES.stanfordLegalHallucination,
    SOURCES.siftMethod,
    SOURCES.stanfordLateralReading,
    SOURCES.geminiSources,
  ],
  relatedSlugs: ["how-ai-chatbots-work", "write-better-prompts", "deep-research-modes"],
  relatedLinks: [LINKED_PAGES.safetyChecklist, LINKED_PAGES.promptLibrary],
  lastReviewed: "2026-10-27",
  published: true,
};
