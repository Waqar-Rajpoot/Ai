import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES } from "../../practitioner/practitionerSources";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const contextWindowsTokensMemory: GuideRecord = {
  slug: "context-windows-tokens-memory",
  number: 17,
  level: "power-user",
  kind: "explainer",
  title: "Context windows, tokens and memory explained",
  metaDescription:
    "Tokens versus words, what a context window holds, why more context is not always better, and how a model's memory differs from the text it can see right now.",
  cardSummary: "Tokens versus words, what a window holds, and memory versus context.",
  summaryPoints: [
    "A token is a piece of a word. In English, 100 tokens is roughly 75 words, and other languages can use more tokens for the same text.",
    "The context window is everything the model can look at in one go: instructions, chat history, files, tool results and its own reply.",
    "More context is not automatically better. Accuracy can drop as the window fills, so put in what the task needs and leave the rest out.",
    "A model keeps nothing between requests. An app that seems to remember is putting earlier text back into the window.",
  ],
  sections: [
    {
      id: "tokens",
      heading: "Tokens are not words",
      paragraphs: [
        "Before a model reads your text, it splits it into tokens. OpenAI's help page describes a token as a piece of a word, and says tokens do not always line up with word boundaries. A token can be a whole short word, part of a long one, or include a trailing space.",
        "The same page gives rules of thumb for English: one token is about four characters, or about three quarters of a word, so 100 tokens is about 75 words. These are estimates, not exact counts.",
        "Other languages can cost more. The page shows a Spanish phrase of 10 characters that comes to 5 tokens, and says that text in other languages can have a higher ratio of tokens to characters. If you work in more than one language, count tokens for each rather than reusing an English estimate.",
      ],
      sourceIds: [SOURCES.openaiTokens.id],
    },
    {
      id: "what-a-window-holds",
      heading: "What a context window holds",
      paragraphs: [
        "Anthropic's documentation describes the context window as all the text a model can refer to when it writes a response, including the response itself. It calls it the model's working memory, which is separate from the data it was trained on.",
        "For a chat, that working memory is shared between several things.",
      ],
      bullets: [
        "Your instructions and the system prompt the app adds.",
        "Every earlier message in the conversation, because the app sends them again each turn.",
        "Files, images and documents you attach, and tool results such as search output.",
        "Tool definitions, if the app has connected tools.",
        "The reply the model is writing now, including any hidden reasoning (see our guide on reasoning models).",
      ],
      sourceIds: [SOURCES.anthropicContextWindows.id],
    },
    {
      id: "when-it-fills",
      heading: "What happens when the window fills up",
      paragraphs: [
        "The behaviour depends on the tool. In Anthropic's API, a request whose input alone is too long is rejected with an error, and for newer models a reply that runs out of room stops with a specific stop reason instead of finishing. Consumer apps handle this in their own way, for example by dropping or summarising older messages, so you may not see an error at all. The risk is that the app quietly leaves out something you needed.",
        "Window sizes differ by model and change often. Look up the current figure in our model directory rather than relying on a number you remember.",
      ],
      sourceIds: [SOURCES.anthropicContextWindows.id],
    },
    {
      id: "more-is-not-better",
      heading: "More context is not always better",
      paragraphs: [
        "A bigger window lets you include more, but it does not guarantee the model uses all of it well. Anthropic's documentation says that as the number of tokens grows, accuracy and recall can degrade, and gives this the name context rot.",
        "An academic preprint reached a similar conclusion from a different direction. It found that models often used information in the middle of a long input less reliably than information at the start or end. It tested models available in 2023, so treat it as a reason to check, not as a current ranking.",
        "The practical rule: put in what the task needs, in a sensible order, and leave out what it does not. Our guide on RAG covers what to do when your material is too big to include.",
      ],
      sourceIds: [SOURCES.anthropicContextWindows.id, PRACTITIONER_SOURCES.liuLostInTheMiddle.id],
    },
    {
      id: "memory-versus-context",
      heading: "Memory versus context",
      paragraphs: [
        "These two words get mixed up. In this guide, context is what is in the window right now. Memory is anything that survives after the window is cleared.",
        "The model itself starts every request with no recollection of earlier ones. When an app appears to remember a conversation, it is sending the earlier messages again. When an app offers a saved-memory feature, it is storing notes outside the model and adding some of them to the window. Names, controls and limits differ by provider, so check the app's help page for what it stores and how to delete it.",
        "This matters for two reasons. Remembered text uses window space like anything else. And anything saved as memory is stored somewhere, so apply the same rules about private information that you would to a pasted file.",
      ],
      sourceIds: [SOURCES.anthropicContextWindows.id],
    },
    {
      id: "budget-routine",
      heading: "A routine for managing context",
      steps: [
        {
          title: "Estimate before you paste",
          detail: "Use the token and context estimator to turn pages or words into tokens, and compare the total with the model's window.",
        },
        {
          title: "Leave room for the reply",
          detail: "Everything you send plus the reply must fit. A long answer or long reasoning can fail if the input already fills most of the window.",
        },
        {
          title: "Split big jobs",
          detail: "Work through a long document section by section, then ask for a combined summary, instead of pasting everything at once.",
        },
        {
          title: "Start a fresh chat for a new topic",
          detail: "Old messages are sent again every turn. A new chat clears them, which leaves more room and removes irrelevant material.",
        },
        {
          title: "Restate the essentials",
          detail: "In a long chat, repeat the key rules and facts near the end instead of assuming the model still weights the start of the conversation.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "carry-over-summary",
      title: "Summarise a long chat to start a new one",
      whenToUse: "When a conversation has run long and you want a fresh window without losing the thread.",
      text: "Summarise this conversation in under 300 words so I can paste it into a new chat. Include: my goal, decisions we made, facts you should keep using, and anything still unresolved. Leave out anything that is no longer relevant.",
    },
    {
      id: "context-audit",
      title: "Ask what the model is relying on",
      whenToUse: "When an answer seems to ignore something you said earlier.",
      text: "Before you answer, list the instructions and facts from this conversation that you are using for this task, in order of importance. Tell me if two of them conflict.",
    },
    {
      id: "section-by-section",
      title: "Work through a long document in parts",
      whenToUse: "When a document is too long to paste in one go.",
      text: "I will paste a long document in [number] parts. After each part, reply only with 'received part N' and one line on what it covers. When I say 'done', write a summary of the whole document with the page or section for each point.",
    },
  ],
  whatCanGoWrong: [
    "Assuming the model can see everything you ever told it. Only what is in the window, or put back into it by the app, is available.",
    "Pasting a very long file and trusting the answer, when details in the middle may be handled less reliably.",
    "Letting a long chat fill the window with old messages that crowd out what matters now.",
    "Counting words instead of tokens, especially for non-English text, and running out of room.",
    "Treating saved memory as private by default. Check what the app stores and where.",
  ],
  limitsNote:
    "Window sizes, memory features and how apps handle long chats change often. Check the provider's help page for current details.",
  showPriceNotice: true,
  sources: [
    SOURCES.openaiTokens,
    SOURCES.anthropicContextWindows,
    PRACTITIONER_SOURCES.liuLostInTheMiddle,
  ],
  relatedSlugs: ["how-ai-chatbots-work", "summarize-pdf-with-ai", "rag-explained", "reasoning-models-effort-settings"],
  relatedLinks: [LINKED_PAGES.tokenEstimator, LINKED_PAGES.modelDirectory, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
