import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

export const whatIsAi: GuideRecord = {
  slug: "what-is-ai",
  number: 1,
  level: "foundations",
  kind: "guide",
  title: "What is AI? A plain-English guide",
  metaDescription:
    "What AI actually is, how machine learning, generative AI and chatbots differ, where you already use it, and why a confident answer can still be wrong.",
  cardSummary: "Machine learning, generative AI, chatbots and where you already meet them.",
  summaryPoints: [
    "AI is software that works out how to produce an output, such as a prediction, a draft or a recommendation, from the input it is given.",
    "A chatbot is one kind of AI. Spam filters, map apps and photo search are others.",
    "Chatbots write fluent text by predicting likely words. Fluent is not the same as correct, so check anything you will act on.",
  ],
  sections: [
    {
      id: "definition",
      heading: "A definition you can use",
      paragraphs: [
        "The OECD, an international policy organisation, describes an AI system as a machine-based system that works out, from the input it receives, how to generate outputs such as predictions, content, recommendations or decisions. Those outputs can affect the physical or the virtual world.",
        "In everyday words: you give it something, it works out a response, and the response can be a guess, a draft, a suggestion or a decision. That is why the label covers far more than chatbots.",
      ],
      sourceIds: [SOURCES.oecdDefinition.id],
    },
    {
      id: "three-terms",
      heading: "Three terms that get mixed up",
      bullets: [
        "Machine learning: software that finds patterns in many examples instead of following only hand-written rules. A spam filter learns from messages people have marked as spam.",
        "Generative AI: machine learning that produces new text, images, audio or code from a request.",
        "Chatbot: a generative AI tool you talk to in ordinary language, such as ChatGPT, Claude or Gemini.",
      ],
      paragraphs: [
        "Most of the AI you use in a normal day is not a chatbot. It sits quietly inside other products.",
      ],
    },
    {
      id: "where-you-meet-it",
      heading: "Where you already meet AI",
      bullets: [
        "Phone keyboards that suggest the next word, and voice assistants",
        "Spam filters in your email",
        "Map apps that predict traffic",
        "Photo apps that group faces and search by subject",
        "Captions and translation on videos",
        "Shopping and video recommendations",
        "Customer-service chat on company websites",
      ],
    },
    {
      id: "good-and-careful",
      heading: "Where it helps, and where to check",
      paragraphs: [
        "A useful rule: let AI draft, explain and brainstorm, and keep the final check for yourself.",
      ],
      table: {
        caption: "Tasks where AI usually helps, and tasks that need a second check",
        columns: ["Usually helpful for", "Check before relying on it"],
        rows: [
          ["Summarising a text you can read yourself", "Exact facts, figures, quotes and sources"],
          ["Rewriting an email in a different tone", "Recent events, unless the tool can search the web"],
          ["Explaining a hard idea in simpler words", "Maths and counting, unless you check the steps"],
          ["Brainstorming names, ideas and outlines", "Medical, legal and money decisions"],
          ["Fixing grammar and translating", "Whether its own answer is correct"],
        ],
      },
    },
    {
      id: "confident-but-wrong",
      heading: "Why a confident answer can still be wrong",
      paragraphs: [
        "Researchers at OpenAI define a hallucination as a plausible but false statement from a language model. They argue that models produce them partly because standard training and testing reward a guess more than an honest “I don't know”.",
        "OpenAI says its latest models hallucinate less, and also says the problem is not solved. That is a company's own statement, so treat it as one data point, not a guarantee.",
      ],
      steps: [
        {
          title: "Ask what happens if it is wrong",
          detail: "A wrong movie suggestion costs nothing. A wrong dose, deadline or legal claim can cost a lot.",
        },
        {
          title: "Find the official source",
          detail: "Check the number, date or rule on the website of the organisation responsible for it.",
        },
        {
          title: "Check what you gave it",
          detail: "If the answer is vague, the question may have been vague. See the guide on better prompts.",
        },
      ],
      sourceIds: [SOURCES.openaiHallucinate.id],
    },
  ],
  prompts: [
    {
      id: "explain-at-my-level",
      title: "Explain a term at my level",
      whenToUse: "When a word in an article or app is unfamiliar. Use general details only.",
      text: "Explain [term] to me as if I am [your situation, for example a parent, a first-year student or a shop owner]. Use one everyday example. Then give me two questions I could ask myself to check that I understood.",
    },
    {
      id: "check-my-understanding",
      title: "Check my understanding",
      whenToUse: "After reading about a topic, to find gaps in what you took away.",
      text: "I think [topic] works like this: [your explanation in your own words]. Tell me what is right, what is missing and what is wrong. List anything I should confirm in an official source.",
    },
  ],
  whatCanGoWrong: [
    "Treating a fluent answer as a checked answer. Models can state false things in a confident tone.",
    "Assuming a chatbot knows today's news. Many only know what they learned up to a cutoff date, unless they can search the web.",
    "Picturing AI as a mind that understands. The definition above describes software producing outputs, and “thinks” or “wants” are only figures of speech.",
  ],
  limitsNote:
    "AI is not a doctor, lawyer or financial advisor. For health, legal or money decisions, use a qualified professional or the official source.",
  sources: [SOURCES.oecdDefinition, SOURCES.openaiHallucinate],
  relatedSlugs: ["how-ai-chatbots-work", "write-better-prompts"],
  relatedLinks: [{ label: "Glossary", href: "/learn/glossary" }],
  lastReviewed: "2026-10-26",
  published: true,
};
