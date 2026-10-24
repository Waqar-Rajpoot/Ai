export interface TermEntry {
  term: string;
  meaning: string;
}

export interface SituationRow {
  situation: string;
  safestChoice: string;
  why: string;
  link: { href: string; label: string } | null;
}

export interface MythEntry {
  myth: string;
  truth: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface PrivacySource {
  publisher: string;
  title: string;
  href: string;
  kind: "Provider page" | "Tracker (secondary)";
}

export const PRIVACY_TERMS: readonly TermEntry[] = [
  { term: "Training", meaning: "Using your chats to teach future models. Being trained on does not mean your chat can be replayed word for word, but it does mean it is no longer only yours." },
  { term: "Retention", meaning: "How long the company keeps your data, including copies kept for safety checks, backups and legal reasons." },
  { term: "Deletion", meaning: "What happens when you press delete. Usually it is hidden from you at once and wiped from systems some weeks later." },
  { term: "Human review", meaning: "Staff or contractors reading a sample of chats to check quality or safety. Some services keep reviewed chats even after you delete yours." },
  { term: "Temporary or incognito chat", meaning: "A mode that keeps a chat out of your history and out of training. It is not invisible: services may still hold a copy for days." },
  { term: "Zero data retention (ZDR)", meaning: "A business arrangement where the provider stores no prompts or answers after processing. Usually by approval, not by default." },
  { term: "De-identified", meaning: "Personal details stripped out. It lowers risk but is not the same as deleted." },
  { term: "Data location", meaning: "Where your data is stored and processed. It decides which country's laws can reach it." },
];

export const SITUATIONS: readonly SituationRow[] = [
  { situation: "Everyday questions with nothing personal", safestChoice: "Any major app, with the training switch checked", why: "Low risk, but the switch takes a minute and applies to all future chats.", link: null },
  { situation: "Health, money, passwords or ID numbers", safestChoice: "Do not paste them at all", why: "No setting makes this safe. Delete does not undo a copy kept for safety, review or backup.", link: { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share" } },
  { situation: "Client or company documents", safestChoice: "A work plan or API with no training by default, and a signed agreement", why: "Personal plans can train on chats. Work plans and APIs usually do not, and come with contract terms.", link: { href: "/prices/plans", label: "Compare plans" } },
  { situation: "School and children", safestChoice: "The account the school approves", why: "School and work accounts follow the admin's rules. Google, for example, says users cannot change activity settings on them.", link: null },
  { situation: "You want nothing to leave your device", safestChoice: "A local open-weight model", why: "If the model runs on your own computer, there is no provider to retain anything.", link: { href: "/learn/expert/run-ai-on-your-own-computer", label: "Run AI on your own computer" } },
  { situation: "You build an app that handles other people's data", safestChoice: "An API with no training by default, plus zero data retention if the provider offers it", why: "You become responsible for your users' data. Check logging windows, subprocessors and data location.", link: { href: "/prices/api", label: "See API costs" } },
];

export const MYTHS: readonly MythEntry[] = [
  { myth: "Turning off training deletes my chats.", truth: "No. In ChatGPT, for example, the switch stops new chats from being used and leaves saved chats where they are. Training and history are separate controls." },
  { myth: "If I delete a chat, it is gone from the AI.", truth: "Not entirely. Deleted chats are usually wiped from systems within about 30 days, but data already used in a training run, or kept for legal reasons, can stay." },
  { myth: "Private modes mean nobody can see the chat.", truth: "They mean the chat is not saved to your history or used for training. Services still hold a copy for days: up to 30 for ChatGPT's Temporary Chat and Grok's Private Chat, and 72 hours for Gemini with activity off." },
  { myth: "Paying makes it private.", truth: "Not by itself. ChatGPT Plus and Claude Pro are personal plans with a training setting. The protection comes from work plans and APIs, and Gemini's free API tier trains while its paid tier does not." },
  { myth: "A thumbs up or down is harmless.", truth: "Feedback can be treated differently. Anthropic keeps feedback data for 5 years, and X says feedback lets it use a conversation for training even after you opt out." },
];

export const VENDOR_QUESTIONS: readonly TermEntry[] = [
  { term: "Is my data used for training by default?", meaning: "Get the answer in writing, per product and plan." },
  { term: "How long are prompts and answers kept?", meaning: "Ask for the logging window, the deletion window and any exceptions for safety or law." },
  { term: "Is zero data retention available for the models I use?", meaning: "It can differ by model, endpoint and feature." },
  { term: "Can humans read my content, and when?", meaning: "Ask what triggers review and how long reviewed content is kept." },
  { term: "Where is data stored and processed?", meaning: "Ask for regions, and whether you can choose one." },
  { term: "Who are the subprocessors?", meaning: "Ask for notice of new ones and a right to object." },
  { term: "What happens when we leave?", meaning: "Ask for deletion on exit, including backups, with a date." },
  { term: "What if the model changes?", meaning: "A replacement model can have different data terms from the one it replaced." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Which AI is the most private?", answer: "None is private by default on a personal plan. The most private options are a local open-weight model, then work plans and APIs that do not train by default, then personal apps with training switched off and temporary modes for sensitive chats." },
  { question: "Does my chat history train the AI if I never opted in?", answer: "On ChatGPT personal plans, Grok and the Gemini app, it can unless you turn it off. On Claude, it depends on the setting, which you should check. Work plans and APIs from OpenAI and Anthropic say no by default." },
  { question: "I turned the switch off. Is my past data safe?", answer: "The switch usually covers future use. Past chats may still be in models already trained, and anything you sent feedback on can be treated differently." },
  { question: "Why do ads appear in a free chatbot?", answer: "Free tiers can carry ads. OpenAI says advertisers cannot see your chats and that Temporary Chats show no ads. You can turn off ad personalization, and you will still see ads based on the current chat." },
  { question: "Can I trust a privacy page that says data is deleted in 30 days?", answer: "It is a published commitment with exceptions for law, security and review. It is stronger than silence, and weaker than a contract." },
  { question: "Is a Chinese app riskier than a US app?", answer: "The difference is the law that applies to the servers. DeepSeek says its data is stored in China, which brings Chinese data laws into play. Run its open-weight models locally if that concerns you." },
  { question: "How often is this page updated?", answer: "Quarterly for the full matrix, and sooner when a provider changes a default or a retention window. The verified-on date shows the last check." },
];

export const PROVIDER_SOURCES: readonly PrivacySource[] = [
  { publisher: "OpenAI", title: "Data controls in ChatGPT", href: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt", kind: "Provider page" },
  { publisher: "OpenAI", title: "Chat and file retention in ChatGPT", href: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt", kind: "Provider page" },
  { publisher: "OpenAI", title: "Ads in ChatGPT", href: "https://help.openai.com/en/articles/20001047-ads-in-chatgpt", kind: "Provider page" },
  { publisher: "Anthropic", title: "How long do you store my data? (consumer)", href: "https://privacy.claude.com/en/articles/10023548", kind: "Provider page" },
  { publisher: "Anthropic", title: "How do I change my model improvement settings?", href: "https://privacy.claude.com/en/articles/12109829", kind: "Provider page" },
  { publisher: "Anthropic", title: "How long do you store my organization's data?", href: "https://privacy.claude.com/en/articles/7996866", kind: "Provider page" },
  { publisher: "Google", title: "Manage Gemini Apps activity", href: "https://support.google.com/gemini/answer/13278892", kind: "Provider page" },
  { publisher: "Google", title: "Gemini API Additional Terms of Service", href: "https://ai.google.dev/gemini-api/terms", kind: "Provider page" },
  { publisher: "X", title: "About Grok", href: "https://help.x.com/en/using-x/about-grok", kind: "Provider page" },
];

export const TRACKER_SOURCES: readonly PrivacySource[] = [
  { publisher: "Developers Digest", title: "OpenAI data retention", href: "https://www.developersdigest.tech/models/data-retention/openai", kind: "Tracker (secondary)" },
  { publisher: "Developers Digest", title: "Google data retention", href: "https://www.developersdigest.tech/models/data-retention/google", kind: "Tracker (secondary)" },
  { publisher: "Softkraft", title: "Is OpenAI safe? Data security", href: "https://www.softkraft.co/openai-data-security/", kind: "Tracker (secondary)" },
  { publisher: "DeleteMe", title: "Claude privacy settings guide", href: "https://joindeleteme.com/ai-privacy-settings/claude-privacy-settings-guide/", kind: "Tracker (secondary)" },
  { publisher: "Which?", title: "Google Gemini is accessing your data", href: "https://www.which.co.uk/news/article/google-gemini-is-accessing-your-data-how-to-disable-it-abbZE6X0pNJA", kind: "Tracker (secondary)" },
  { publisher: "Terms.Law", title: "Gemini privacy watchdog", href: "https://www.terms.law/Privacy-Watchdog/ai-services/gemini/", kind: "Tracker (secondary)" },
  { publisher: "Private Internet Access", title: "Is Grok safe?", href: "https://www.privateinternetaccess.com/blog/is-grok-safe/", kind: "Tracker (secondary)" },
  { publisher: "Kaspersky", title: "DeepSeek privacy and security", href: "https://www.kaspersky.com/blog/deepseek-privacy-and-security/54643/", kind: "Tracker (secondary)" },
  { publisher: "Aona", title: "DeepSeek assessment", href: "https://aona.ai/ai-tools/deepseek/", kind: "Tracker (secondary)" },
  { publisher: "Fast Company", title: "AI privacy cheat sheet", href: "https://www.fastcompany.com/91379336", kind: "Tracker (secondary)" },
];