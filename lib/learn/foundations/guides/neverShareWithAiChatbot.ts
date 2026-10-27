import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

export const neverShareWithAiChatbot: GuideRecord = {
  slug: "never-share-with-ai-chatbot",
  number: 5,
  level: "foundations",
  kind: "safety",
  title: "What you should never share with an AI chatbot",
  metaDescription:
    "What to keep out of AI chats, where the data settings are in ChatGPT, Claude and Gemini, what they do not do, and what to do if you already shared something.",
  cardSummary: "The never-paste list, how to turn off data sharing, and safer ways to get help.",
  summaryPoints: [
    "Providers store chats, and on some consumer plans may use them to improve their models unless you change a setting. Type only what you could live with being stored or reviewed.",
    "Keep out passwords and one-time codes, card, bank and ID numbers, medical records, other people's private details, and work documents you are not cleared to share.",
    "Check the data setting on every tool, and use a work-approved tool for work.",
  ],
  sections: [
    {
      id: "why-it-matters",
      heading: "Why this matters",
      paragraphs: [
        "In 2023, the UK's National Cyber Security Centre explained that what you type is visible to the company running the chatbot. Stored queries could be hacked, leaked or accidentally made public. Its advice was to keep sensitive information out of public chatbots, and to avoid typing anything that would cause trouble if it became public. That article is about early chatbots and providers have added controls since, so also use the settings below.",
        "Provider policies today show why the caution still helps. OpenAI's help page says that for Free, Plus and Pro, content may be used to train its models unless you opt out. Google's Gemini notice says human reviewers review some chats. Anthropic's page says conversations flagged by its safety systems may still be used for safety work even if you turn training off.",
      ],
      sourceIds: [
        SOURCES.ncscChatbots.id,
        SOURCES.openaiDataUse.id,
        SOURCES.googleGeminiPrivacy.id,
        SOURCES.anthropicPrivacySetting.id,
      ],
    },
    {
      id: "keep-out",
      heading: "What to keep out of a chat",
      table: {
        caption: "Information to keep out of a chatbot, and what to do instead",
        columns: ["Keep out", "Why", "Do this instead"],
        rows: [
          [
            "Passwords, PINs and one-time codes",
            "Anyone who sees them can get into the account",
            "Ask how to make a strong password in general. Never type a real one",
          ],
          [
            "Card, bank, tax and ID numbers",
            "They are used for fraud and identity theft",
            "Use made-up numbers in examples",
          ],
          [
            "Medical records and test results",
            "Very personal, and the AI cannot see your whole situation",
            "Ask the general question, and take your results to a clinician",
          ],
          [
            "Other people's private details",
            "They are not yours to share",
            "Replace names with roles, such as “my colleague”",
          ],
          [
            "Client, customer or internal work documents",
            "It may break your employer's rules or a contract",
            "Use a work-approved tool, or ask your IT or policy team",
          ],
          [
            "Anything you would regret seeing public",
            "Stored chats can be reviewed, leaked or kept longer than you expect",
            "Rewrite it as a general question",
          ],
        ],
      },
      sourceIds: [SOURCES.ncscChatbots.id],
    },
    {
      id: "check-settings",
      heading: "Check your data settings",
      paragraphs: [
        "Settings and names change, so treat this as a map and confirm on each provider's own page. Services are listed alphabetically.",
      ],
      table: {
        caption: "Where to find the data switch and what it does not do",
        columns: ["Service", "Where to look", "What the switch does", "What it does not do"],
        rows: [
          [
            "ChatGPT",
            "Settings, Data controls, Improve the model for everyone",
            "Stops new conversations being used to train OpenAI models. Chat history stays",
            "Does not delete or hide saved chats",
          ],
          [
            "Claude",
            "Settings, Privacy, Help improve Claude",
            "Stops new chats and coding sessions being used for future model training",
            "Data already used in training that has started stays in. Flagged conversations may still be used for safety work",
          ],
          [
            "Gemini",
            "Gemini Apps Activity, Keep Activity",
            "Controls whether your data is used to improve Google AI",
            "With it off, Google still uses chats to respond and for protection, including with human reviewers. Chats already reviewed are not deleted when you delete your activity",
          ],
        ],
      },
      sourceIds: [
        SOURCES.openaiDataControls.id,
        SOURCES.anthropicPrivacySetting.id,
        SOURCES.googleGeminiPrivacy.id,
      ],
    },
    {
      id: "temporary-chats",
      heading: "Use a temporary chat for one-off questions",
      paragraphs: [
        "ChatGPT's Temporary Chat does not appear in your history, does not create memories, and is not used to improve OpenAI models while it stays temporary. If you save it, it becomes a regular chat. OpenAI's help page says temporary chats are deleted from its systems after 30 days.",
        "Temporary modes reduce what is kept. They do not make it safe to paste passwords, card numbers or other people's private details.",
      ],
      sourceIds: [SOURCES.openaiDataUse.id, SOURCES.openaiDataControls.id],
    },
    {
      id: "safer-ways",
      heading: "Safer ways to get the same help",
      bullets: [
        "Ask the general version: “How do tenancy deposits usually work?” instead of pasting your agreement.",
        "Use a made-up example with the same shape as the real one, such as invented names and round numbers.",
        "Remove names, addresses, numbers and dates before you paste any text, then read it again before you send.",
        "For work, ask which AI tools your employer approves. Work and school plans have their own terms.",
        "For health, legal and money questions, use AI to prepare questions and understand terms, then ask a qualified person.",
      ],
    },
    {
      id: "already-shared",
      heading: "If you already shared something",
      steps: [
        {
          title: "Stop and do not add more",
          detail: "Do not paste more details to explain or correct what you shared.",
        },
        {
          title: "Delete the chat and check your data setting",
          detail: "Deleting removes it from your history, but it may not undo everything, as the provider table above shows.",
        },
        {
          title: "Secure anything that gives access",
          detail: "For a password or code, change it through the official site. For a card or bank number, call your bank using the number on your card or its official site.",
        },
        {
          title: "Tell the owner of other people's or work data",
          detail: "If it was someone else's information or your employer's, tell them or your IT or security contact, so they can decide what to do.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "make-a-safe-version",
      title: "Make a safe version of my question",
      whenToUse: "Before you share any details, to decide what to leave out.",
      text: "I want help with [task]. Before I give you any details, tell me which kinds of details I should leave out or replace with placeholders, and show me how to write the question using made-up examples.",
    },
    {
      id: "what-not-to-paste-at-work",
      title: "List what not to paste in my job",
      whenToUse: "When you start using AI at work. Describe the job in general terms.",
      text: "I work as [job type] and want to use AI for [task]. List the types of information from this kind of work that I should never paste into a public chatbot, and suggest three safer ways to get the same help.",
    },
    {
      id: "strong-password-help",
      title: "Learn about strong passwords safely",
      whenToUse: "When you want better password habits without sharing any real password.",
      text: "Explain how to create a strong passphrase and how a password manager helps. Do not ask me for any real passwords or account details.",
    },
  ],
  whatCanGoWrong: [
    "Believing that turning a setting off means the data is gone. The table above shows what each switch does not do.",
    "Assuming that deleting a chat removes every copy. For example, Google says chats already reviewed by human reviewers are not deleted when you delete your activity.",
    "Following an out-of-date settings guide. Menu names change, so confirm on the provider's own privacy page.",
    "Pasting someone else's information because it is only a test. It is still theirs.",
  ],
  limitsNote:
    "This is general safety guidance, not legal advice. Your employer, school or country may have its own rules about what you can share.",
  sources: [
    SOURCES.ncscChatbots,
    SOURCES.openaiDataUse,
    SOURCES.openaiDataControls,
    SOURCES.anthropicPrivacySetting,
    SOURCES.googleGeminiPrivacy,
  ],
  relatedSlugs: ["ai-scams-and-deepfakes", "free-vs-paid-ai"],
  relatedLinks: [
    { label: "Privacy matrix", href: "/prices/privacy" },
    { label: "AI safety checklist", href: "/tools/ai-safety-checklist" },
  ],
  lastReviewed: "2026-10-26",
  published: true,
};
