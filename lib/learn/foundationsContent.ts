export interface SelfCheckOption {
  id: string;
  label: string;
}

export interface SelfCheckQuestion {
  id: string;
  prompt: string;
  options: readonly SelfCheckOption[];
  correctOptionId: string;
  explanation: string;
}

export interface TopicCard {
  id: string;
  title: string;
  summary: string;
}

export interface GuideCard {
  number: number;
  title: string;
  summary: string;
  href: string;
  kind: "Guide" | "Safety";
  minutes: number;
  /** Set to true when the article page exists, so readers never hit a 404. */
  isPublished: boolean;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface SourceEntry {
  publisher: string;
  title: string;
  href: string;
  type: "Government" | "Intergovernmental" | "Vendor-reported";
}

export interface MythFact {
  myth: string;
  fact: string;
}

export const SELF_CHECK_QUESTIONS: readonly SelfCheckQuestion[] = [
  {
    id: "what-is-ai",
    prompt: "Which description is closest to how regulators define an AI system?",
    options: [
      { id: "a", label: "A digital brain that thinks like a person" },
      { id: "b", label: "A machine-based system that takes input and produces outputs such as predictions, content or recommendations" },
      { id: "c", label: "Any program that runs on the internet" },
      { id: "d", label: "Only chatbots such as ChatGPT or Claude" },
    ],
    correctOptionId: "b",
    explanation:
      "This follows the OECD definition, which the EU AI Act also adopted. It covers far more than chatbots.",
  },
  {
    id: "wrong-answer",
    prompt: "A chatbot gives a confident answer with a statistic you cannot verify. What should you do?",
    options: [
      { id: "a", label: "Trust it, because it sounds sure" },
      { id: "b", label: "Check the figure in a reliable source before using it" },
      { id: "c", label: "Ask the same chatbot “are you sure?” and accept its reply" },
      { id: "d", label: "Assume a paid plan is always right" },
    ],
    correctOptionId: "b",
    explanation:
      "Chatbots can produce plausible but false statements. OpenAI researchers argue this happens partly because training and testing reward guessing over admitting uncertainty.",
  },
  {
    id: "never-paste",
    prompt: "Which of these should you never paste into a chatbot?",
    options: [
      { id: "a", label: "A password or bank card number" },
      { id: "b", label: "A question about how photosynthesis works" },
      { id: "c", label: "A paragraph from a public news article" },
      { id: "d", label: "A draft of your own essay" },
    ],
    correctOptionId: "a",
    explanation:
      "Secrets and identity numbers never belong in a chat. Your chats may be stored, and on some plans used for training unless you change a setting.",
  },
  {
    id: "good-prompt",
    prompt: "What helps most when you want a useful answer?",
    options: [
      { id: "a", label: "As few words as possible" },
      { id: "b", label: "Technical jargon" },
      { id: "c", label: "A clear task, enough context, and the format you want" },
      { id: "d", label: "Nothing. Chatbots can read your mind" },
    ],
    correctOptionId: "c",
    explanation:
      "Vendor guidance agrees on this: be specific, give context, and say what the answer should look like.",
  },
  {
    id: "voice-scam",
    prompt: "A caller sounds exactly like your grandson and begs for urgent money. What do you do?",
    options: [
      { id: "a", label: "Send the money now and ask questions later" },
      { id: "b", label: "Hang up and call him on a number you know is his" },
      { id: "c", label: "Keep them on the line and judge by the voice" },
      { id: "d", label: "Text back your bank details" },
    ],
    correctOptionId: "b",
    explanation:
      "The FTC warns that scammers clone voices from short online clips. Do not trust the voice. Verify through a number you already know.",
  },
  {
    id: "free-plans",
    prompt: "Which statement about free chatbot plans is accurate?",
    options: [
      { id: "a", label: "They have no limits" },
      { id: "b", label: "They are always more private than paid plans" },
      { id: "c", label: "Some have usage limits and some show labelled ads" },
      { id: "d", label: "They only use outdated technology" },
    ],
    correctOptionId: "c",
    explanation:
      "Plans differ by provider. For example, OpenAI began testing labelled ads for US Free and Go users in February 2026. Privacy depends on settings, not on price.",
  },
];

export const ABILITIES: readonly string[] = [
  "Explain what AI is, in a sentence a friend would understand",
  "Write a clear prompt using the five-part formula",
  "Spot a wrong or made-up answer before it causes trouble",
  "Keep private data out of chats and check your privacy settings",
  "Tell what a free plan gives you and when paying makes sense",
  "Recognise an AI-assisted scam and verify before you act",
];

export const TOPICS: readonly TopicCard[] = [
  { id: "what-is-ai", title: "What AI is", summary: "Machine learning, generative AI and the tools you already use." },
  { id: "how-chatbots-work", title: "How a chatbot works", summary: "Learning from examples and predicting the next word, without maths." },
  { id: "prompts", title: "Prompts and the five-part formula", summary: "Role, task, context, format and limits, with a builder to try." },
  { id: "key-terms", title: "Key terms", summary: "Twelve plain-English definitions you will meet everywhere." },
  { id: "strengths-limits", title: "What AI does well and badly", summary: "Where to lean on it and where to double-check." },
  { id: "free-vs-paid", title: "Free vs paid plans", summary: "Limits, ads and when an upgrade is worth it." },
  { id: "privacy", title: "Privacy basics", summary: "What never to paste, and how to check your data settings." },
  { id: "scams", title: "Scams and deepfakes", summary: "Cloned voices, fake videos and a simple way to verify." },
];

export const WHERE_YOU_MEET_AI: readonly string[] = [
  "Phone keyboard suggestions and voice assistants",
  "Spam filters in your email",
  "Map apps that predict traffic",
  "Photo apps that group faces and search by subject",
  "Translation and captions on videos",
  "Shopping and video recommendations",
  "Customer-service chat on company websites",
];

export const AI_KINDS: readonly TopicCard[] = [
  { id: "ml", title: "Machine learning", summary: "Software that finds patterns in examples instead of following hand-written rules. Spam filters work this way." },
  { id: "genai", title: "Generative AI", summary: "Machine learning that creates new text, images, audio or code from a request." },
  { id: "chatbots", title: "Chatbots", summary: "Generative AI you talk to in plain language, such as ChatGPT, Claude and Gemini." },
  { id: "media", title: "Image, voice and video tools", summary: "Generators and editors that make or change pictures, speech and clips." },
];

export const MYTHS: readonly MythFact[] = [
  {
    myth: "AI thinks and understands like a person.",
    fact: "A chatbot generates likely text from patterns in its training data. Fluent writing is not proof that it understands or checked the facts.",
  },
  {
    myth: "If it sounds confident, it is right.",
    fact: "Models can state false things with full confidence. This is called a hallucination.",
  },
  {
    myth: "A chatbot always knows the latest news.",
    fact: "A model learns up to a cutoff date. It only knows newer events if it can search the web or use a tool.",
  },
  {
    myth: "A paid plan means every answer is correct.",
    fact: "Paid plans usually give higher limits and more features. They do not remove the need to check important answers.",
  },
];

export const HOW_IT_WORKS_STEPS: readonly TopicCard[] = [
  { id: "learn", title: "It learns from examples", summary: "The model is trained on a huge amount of text, called training data, and picks up patterns in how language fits together." },
  { id: "split", title: "Your message becomes tokens", summary: "Your words are cut into small pieces called tokens. A token is often part of a word." },
  { id: "predict", title: "It predicts what comes next", summary: "The model works out a likely next piece, adds it, then repeats until the reply is finished." },
  { id: "window", title: "It only sees so much at once", summary: "The context window is the amount of text the model can consider in one go: your chat, files and its reply." },
];

export const PROMPT_TIPS: readonly string[] = [
  "Say exactly what you want done, not just the topic.",
  "Give the background a stranger would need.",
  "Name the format: bullets, a table, 100 words, a short email.",
  "Show one example of what good looks like.",
  "Ask a follow-up instead of starting again.",
  "Test your prompt: would a colleague with no context know what to do?",
];

export const WEAK_PROMPT = "Tell me about photosynthesis.";
export const STRONG_PROMPT =
  "Act as a patient science tutor. Explain photosynthesis to a 12-year-old in five bullet points, under 100 words. End with two quiz questions.";

export const KEY_TERMS: readonly KeyTerm[] = [
  { term: "AI", definition: "Software that turns input into outputs such as predictions, content or recommendations." },
  { term: "Model", definition: "The trained system behind an AI tool. Different models have different strengths, costs and limits." },
  { term: "Chatbot", definition: "An app that lets you talk to a model in everyday language." },
  { term: "Prompt", definition: "The message, question or instruction you give the AI." },
  { term: "Token", definition: "A small piece of text the model reads and writes. Usage limits and prices are often counted in tokens." },
  { term: "Context window", definition: "How much text the model can consider at one time. Very long chats can push early details out." },
  { term: "Hallucination", definition: "A confident answer that is false or invented, such as a made-up quote or source." },
  { term: "Training data", definition: "The text, images and other material a model learned from." },
  { term: "Generative AI", definition: "AI that creates new content instead of only sorting or predicting." },
  { term: "Machine learning", definition: "A way of building software by letting it find patterns in examples." },
  { term: "Free plan", definition: "A no-cost tier with lower limits. Some providers show labelled ads on it." },
  { term: "Usage limit", definition: "A cap on how many messages, files or images you can use in a period." },
];

export const DOES_WELL: readonly string[] = [
  "Summarising a long text you can check",
  "Drafting and rewriting emails in a different tone",
  "Explaining a hard idea in simpler words",
  "Brainstorming names, ideas and outlines",
  "Translating and fixing grammar",
  "Making a study plan or practice questions",
];

export const DOES_BADLY: readonly string[] = [
  "Exact facts, figures, quotes and sources without checking",
  "Recent events, unless it can search the web",
  "Maths and counting without you checking the steps",
  "Your private situation, which it cannot see",
  "Medical, legal and money decisions on its own",
  "Judging whether its own answer is correct",
];

export const FREE_VS_PAID_ROWS: readonly { topic: string; free: string; paid: string }[] = [
  { topic: "Usage", free: "Lower message, file and image limits.", paid: "Higher limits. Tiers rise with price." },
  { topic: "Features", free: "Core chat. Some features are limited or missing.", paid: "More tools, longer memory and files, depending on the plan." },
  { topic: "Ads", free: "Some providers show labelled ads. OpenAI began a US test for Free and Go in February 2026.", paid: "OpenAI says Plus, Pro, Business and Enterprise stay ad-free." },
  { topic: "Privacy", free: "Controlled by your settings. Check the training toggle.", paid: "Same: price does not decide privacy. Check the setting." },
];

export const STAY_FREE_IF: readonly string[] = [
  "You ask a few questions a week",
  "You rarely upload files",
  "Hitting a daily limit is only a small annoyance",
];

export const CONSIDER_PAYING_IF: readonly string[] = [
  "You use AI most days for work or study",
  "You often hit limits mid-task",
  "You need larger files, longer memory or extra tools",
];

export const RENEWAL_TIPS: readonly string[] = [
  "Note the renewal date and set a calendar reminder.",
  "Check whether you chose monthly or annual billing.",
  "Cancel from the provider's own billing page, not a third-party link.",
  "Re-check your usage after one month and downgrade if you barely used it.",
];

export const SCAM_TYPES: readonly TopicCard[] = [
  { id: "voice", title: "Cloned voices", summary: "A short clip posted online can be enough to imitate someone. A cloned voice may ask for urgent money." },
  { id: "video", title: "Fake videos", summary: "Edited or generated clips can show people saying things they never said. Do not rely on spotting glitches." },
  { id: "reviews", title: "Fake reviews", summary: "AI makes bulk reviews cheap. Look for sources outside the product page." },
  { id: "phishing", title: "AI-written phishing", summary: "Scam messages can now be fluent and personal. Poor spelling is no longer a reliable sign." },
];

export const VERIFY_STEPS: readonly string[] = [
  "Pause. Urgency is how scams work.",
  "Do not trust the voice, video or message.",
  "Hang up and call back on a number you already know is theirs.",
  "Or reach them through another relative or friend.",
  "Agree a family code word in advance and ask for it.",
];

export const GUIDES: readonly GuideCard[] = [
  { number: 1, title: "What is AI? A plain-English guide", summary: "Machine learning, generative AI, chatbots and where you already meet them.", href: "/learn/foundations/what-is-ai", kind: "Guide", minutes: 6, isPublished: true },
  { number: 2, title: "How AI chatbots work, without math", summary: "Learning from examples, predicting the next word, and why answers sound sure.", href: "/learn/foundations/how-ai-chatbots-work", kind: "Guide", minutes: 7, isPublished: true },
  { number: 3, title: "How to write better prompts (20 examples)", summary: "The five-part formula with copy-ready examples for study, work, home and money.", href: "/learn/foundations/write-better-prompts", kind: "Guide", minutes: 8, isPublished: true },
  { number: 4, title: "Free vs paid AI: what you actually get", summary: "What free plans give, who should upgrade, ads, and avoiding surprise renewals.", href: "/learn/foundations/free-vs-paid-ai", kind: "Guide", minutes: 6, isPublished: true },
  { number: 5, title: "What you should never share with an AI chatbot", summary: "The never-paste list, how to turn off data sharing, and safer ways to get help.", href: "/learn/foundations/never-share-with-ai-chatbot", kind: "Safety", minutes: 5, isPublished: true },
  { number: 6, title: "AI scams and deepfakes: how to spot them", summary: "Cloned voices, fake videos, fake reviews, phishing and how to verify.", href: "/learn/foundations/ai-scams-and-deepfakes", kind: "Safety", minutes: 6, isPublished: true },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "OECD", title: "Explanatory memorandum on the updated OECD definition of an AI system", href: "https://oecd.ai/en/ai-publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system", type: "Intergovernmental" },
  { publisher: "OpenAI", title: "Why language models hallucinate", href: "https://openai.com/index/why-language-models-hallucinate/", type: "Vendor-reported" },
  { publisher: "OpenAI", title: "Our approach to advertising and expanding access", href: "https://openai.com/index/our-approach-to-advertising-and-expanding-access/", type: "Vendor-reported" },
  { publisher: "Anthropic", title: "Prompt engineering overview", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview", type: "Vendor-reported" },
  { publisher: "Anthropic", title: "Privacy policy", href: "https://www.anthropic.com/legal/privacy", type: "Vendor-reported" },
  { publisher: "US Federal Trade Commission", title: "Family emergency scams", href: "https://consumer.ftc.gov/scams/family-emergency-scams", type: "Government" },
];