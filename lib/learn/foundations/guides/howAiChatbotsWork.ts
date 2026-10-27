import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

export const howAiChatbotsWork: GuideRecord = {
  slug: "how-ai-chatbots-work",
  number: 2,
  level: "foundations",
  kind: "guide",
  title: "How AI chatbots work, without math",
  metaDescription:
    "A plain-English look at how a chatbot learns from examples, turns your message into tokens, predicts the next word, and why answers can sound sure but be wrong.",
  cardSummary: "Learning from examples, predicting the next word, and why answers sound sure.",
  summaryPoints: [
    "A chatbot runs on a model trained on a very large amount of text, so it learns patterns in how language fits together.",
    "Your message is split into small pieces called tokens, and the reply is built one piece at a time.",
    "It can only consider a limited amount of text at once. In a long chat, restate what matters.",
  ],
  sections: [
    {
      id: "learning-from-examples",
      heading: "Step 1: it learns from examples",
      paragraphs: [
        "A chatbot is built around a model. The model is trained on a huge amount of text, called training data, and gets better at predicting what text is likely to come next.",
        "It is not looking your question up in a table of ready-made answers. It is producing a new reply each time, based on patterns it learned.",
      ],
      sourceIds: [SOURCES.openaiHallucinate.id],
    },
    {
      id: "tokens",
      heading: "Step 2: your message becomes tokens",
      paragraphs: [
        "The model does not read words the way you do. Your text is cut into tokens, which are small building blocks. Spaces, punctuation and parts of words all count. OpenAI gives these rules of thumb for English text, and the exact count depends on the model.",
      ],
      table: {
        caption: "Rules of thumb for English text, from OpenAI's help page",
        columns: ["Amount of text", "Roughly this many tokens"],
        rows: [
          ["1 token", "About 4 characters, or three quarters of a word"],
          ["1 to 2 sentences", "About 30 tokens"],
          ["1 paragraph", "About 100 tokens"],
          ["100 tokens", "About 75 words"],
        ],
      },
      sourceIds: [SOURCES.openaiTokens.id],
    },
    {
      id: "predicting",
      heading: "Step 3: it predicts what comes next",
      paragraphs: [
        "The model works out a likely next token, adds it to the reply, then repeats until the reply is finished. This is why you can ask the same question twice and sometimes get different wording.",
        "Nothing in that loop checks the answer against the real world. Tools that search the web or open your files can add sources, but you still need to open those sources yourself.",
      ],
    },
    {
      id: "context-window",
      heading: "Step 4: it only sees so much at once",
      paragraphs: [
        "The amount of text a model can consider at one time is called its context window. It includes your messages, any files you add and the reply being written. The size differs by model and by plan, so check the plan table and the provider's page rather than guessing.",
        "Developers who connect to AI through code are charged by the token. For everyday use, the practical effect is that very long chats and very large files hit limits sooner.",
      ],
      sourceIds: [SOURCES.openaiTokens.id],
    },
    {
      id: "sounds-sure",
      heading: "Why answers sound sure even when they are wrong",
      paragraphs: [
        "OpenAI's researchers argue that models guess partly because training and testing reward a guess more than admitting uncertainty. They describe hallucinations as plausible but false statements, and say the problem persists in the latest models.",
        "So the tone of an answer tells you nothing about whether it is true. Confidence is a style, not a measurement.",
      ],
      sourceIds: [SOURCES.openaiHallucinate.id],
    },
    {
      id: "in-practice",
      heading: "What this means when you use one",
      steps: [
        {
          title: "Give it the background",
          detail: "It only has what is in the chat plus what it learned in training. Say who the answer is for and what it is used for.",
        },
        {
          title: "Ask for sources, then open them",
          detail: "A list of sources is a starting point. Confirm each one exists and says what the chatbot claims.",
        },
        {
          title: "Restate key facts in long chats",
          detail: "If a chat has gone on for a long time, summarise the goal and decisions so far and start a new chat with that summary.",
        },
        {
          title: "Check anything you will act on",
          detail: "Dates, numbers, quotes, medical, legal and money details belong on the official source.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "show-uncertainty",
      title: "Ask it to separate sure from unsure",
      whenToUse: "For factual questions where a wrong answer would matter.",
      text: "Answer the question below. After your answer, list which parts you are confident about and which parts I should verify in an official source. If you do not know something, say so instead of guessing.\n\nQuestion: [your question]",
    },
    {
      id: "restart-long-chat",
      title: "Summarise a long chat to restart it",
      whenToUse: "When a conversation is long and the replies are getting less accurate.",
      text: "Summarise our conversation so far in ten lines or fewer: the goal, the decisions made, and the open questions. I will start a new chat with your summary.",
    },
  ],
  whatCanGoWrong: [
    "Reading a smooth explanation as proof. OpenAI's own researchers say models can produce plausible but false statements.",
    "Trusting a model's rating of its own confidence. Asking it to flag uncertainty can help, but it can be wrong about that too, so check important facts elsewhere.",
    "Forgetting the limit on what it can consider at once. In a long chat or with a long file, details can be missed. Restate what matters.",
  ],
  sources: [SOURCES.openaiHallucinate, SOURCES.openaiTokens],
  relatedSlugs: ["what-is-ai", "write-better-prompts"],
  relatedLinks: [
    { label: "Token and context estimator", href: "/tools/token-estimator" },
    { label: "Consumer plan table", href: "/prices/plans" },
  ],
  lastReviewed: "2026-10-26",
  published: true,
};
