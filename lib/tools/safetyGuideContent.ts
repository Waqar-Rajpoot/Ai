import type { ReadinessLevel } from "./checklists";

export interface Rule {
  title: string;
  detail: string;
}

export interface NeverPasteRow {
  category: string;
  examples: string;
  saferWay: string;
}

export interface RedFlagRow {
  sign: string;
  whatToDo: string;
}

export interface ScamRow {
  scam: string;
  looksLike: string;
  safeResponse: string;
}

export interface SettingRow {
  setting: string;
  lookFor: string;
  suggestion: string;
}

export interface IncidentStep {
  title: string;
  detail: string;
}

export interface GlossaryEntry {
  term: string;
  meaning: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SafetySource {
  publisher: string;
  title: string;
  href: string;
  use: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export const SAFETY_RULES: readonly Rule[] = [
  { title: "Type as if someone else may read it", detail: "A chat is not a private diary. It can be stored, shown in a shared link, or seen by whoever gets into your account." },
  { title: "Check before you act", detail: "AI can be fluent and wrong at the same time. The higher the stakes, the more you check." },
  { title: "Keep a person in charge", detail: "Use AI to help you decide. Do not let it decide for you, especially about money, health, jobs or other people." },
];

export const READINESS_COPY: Record<ReadinessLevel, { label: string; advice: string }> = {
  starting: { label: "Just starting", advice: "Begin with the essential items. Even five of them remove most of the common risks." },
  "getting-there": { label: "Getting there", advice: "You have covered about half of the essentials. Finish those before the recommended items." },
  "essentials-done": { label: "Essentials covered", advice: "Every essential item is ticked. The recommended items add a second layer, so work through them when you can." },
  complete: { label: "All done", advice: "Everything is ticked. Rules and settings change, so come back and review every few months." },
};

export const NEVER_PASTE: readonly NeverPasteRow[] = [
  { category: "Secrets and logins", examples: "Passwords, PINs, one-time codes, recovery phrases, API keys", saferWay: "Use a password manager. Describe the problem without the secret." },
  { category: "Identity documents and numbers", examples: "Passport, national ID, tax or social security numbers, driving licence", saferWay: "Replace with a placeholder such as [ID]." },
  { category: "Bank and card details", examples: "Card numbers, account numbers, statements", saferWay: "Ask a general question, or hide the numbers before you paste." },
  { category: "Health records", examples: "Diagnoses, test results and prescriptions with your name or date of birth", saferWay: "Remove identifiers, ask general questions, and let a clinician decide." },
  { category: "Other people's private information", examples: "Private messages, addresses, photos, someone's story", saferWay: "Ask permission, or anonymise so the person cannot be identified." },
  { category: "Work and client secrets", examples: "Client data, NDA documents, unreleased numbers, private source code", saferWay: "Use an approved business tool, or redact and summarise." },
  { category: "Children's details", examples: "Names, school, photos, voice recordings, locations", saferWay: "Leave them out. Describe the situation in general terms." },
];

export const ANSWER_RED_FLAGS: readonly RedFlagRow[] = [
  { sign: "A source or link that does not open or does not say what is claimed", whatToDo: "Remove it. Search for the claim yourself on a trusted site." },
  { sign: "Very precise numbers or quotes with no source", whatToDo: "Ask for the source. If it cannot give one you can open, treat the number as unproven." },
  { sign: "Confident answers about recent events, prices or rules", whatToDo: "Check the date on an official or news source." },
  { sign: "The answer changes when you ask again", whatToDo: "The model is guessing. Check with another source." },
  { sign: "Specific medical, legal or money instructions", whatToDo: "Use the answer to prepare questions, and ask a professional." },
  { sign: "It agrees with everything you say", whatToDo: "Ask for the strongest argument against your view." },
  { sign: "It refers to something you never gave it", whatToDo: "It may be making things up. Restart with the text pasted in." },
];

export const SCAM_ROWS: readonly ScamRow[] = [
  { scam: "Cloned-voice emergency call", looksLike: "A relative's voice says they are in trouble and need money now.", safeResponse: "Ask for the code word. Hang up, and call them on their saved number." },
  { scam: "Fake boss or supplier", looksLike: "A message or call asks you to pay a new account or buy gift cards.", safeResponse: "Confirm on a known number. Never use the contact details in the message. Get a second person to approve." },
  { scam: "AI-written phishing", looksLike: "A polished email or text about a parcel, bank or account problem, with a link.", safeResponse: "Do not click. Open the site or app yourself." },
  { scam: "Fake video call", looksLike: "A video call where the face or voice seems slightly off, with an urgent request.", safeResponse: "Ask something only the real person would know. End the call and verify another way." },
  { scam: "Celebrity investment ad", looksLike: "A video of a known person promising big returns.", safeResponse: "Search the person's official site. Never invest through the ad." },
  { scam: "Fake support chatbot", looksLike: "A chat window asking for your login or a code to fix an issue.", safeResponse: "Go to the company's official site. No real support needs your password." },
];

export const SETTINGS_GUIDE: readonly SettingRow[] = [
  { setting: "Training and improvement", lookFor: "Settings called data controls, privacy, or improve the model for everyone.", suggestion: "Decide on purpose. If you handle anything sensitive, switch sharing off or use a plan with stronger terms." },
  { setting: "Chat history and deletion", lookFor: "A history list, a delete option and a note on how long deleted chats are kept.", suggestion: "Delete sensitive chats. Read the retention note." },
  { setting: "Temporary or private chat", lookFor: "A mode that does not save the chat to your history or memory.", suggestion: "Use it for one-off sensitive questions, and check what is still kept." },
  { setting: "Memory and personalisation", lookFor: "A list of saved facts about you, with a switch to turn it off.", suggestion: "Read the list. Delete or switch off what you do not want carried over." },
  { setting: "Shared links", lookFor: "A list of chats you have shared, with an option to remove the link.", suggestion: "Remove links you no longer need." },
  { setting: "Connected apps and files", lookFor: "Connectors to email, calendar, drive or other accounts.", suggestion: "Connect only what you need, with read-only access where offered." },
  { setting: "Account security", lookFor: "Password, two-step sign-in and a list of signed-in devices.", suggestion: "Turn on two-step sign-in and remove devices you do not know." },
  { setting: "Export and deletion of your account", lookFor: "Options to export your data or delete the account.", suggestion: "Know where it is before you need it." },
];

export const INCIDENT_STEPS: readonly IncidentStep[] = [
  { title: "Stop and do not paste more", detail: "Close the chat window. Do not keep explaining the problem in the same chat." },
  { title: "Delete the chat and any shared link", detail: "Remove the chat from your history and delete shared links. Check the provider's page on how long deleted chats are kept." },
  { title: "Change what was exposed", detail: "If it was a password, key or code, change it now. For a card or bank detail, call the bank. For an API key, rotate it." },
  { title: "Tell the right people", detail: "At work, tell your manager or the person who owns AI use. At school, tell your data protection lead. If customer or pupil data was involved, the organisation may have legal duties to act quickly." },
  { title: "Write down what happened", detail: "Note the date, the tool, what was pasted and what you did. It helps if anyone needs to respond later." },
  { title: "Close the gap", detail: "Ask why it happened: unclear rules, a missing approved tool, or a rushed task. Fix that cause." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Hallucination", meaning: "An answer that sounds right but is invented or wrong." },
  { term: "Deepfake", meaning: "A fake image, video or voice made with AI to look or sound like a real person." },
  { term: "Training data", meaning: "The material a model learns from. Some providers may also use chats to improve models, depending on settings and plan." },
  { term: "Retention", meaning: "How long a provider keeps your data, including chats you have deleted." },
  { term: "Prompt injection", meaning: "Hidden instructions in a web page, email or file that trick an AI into doing something you did not ask for." },
  { term: "Shadow AI", meaning: "AI tools used for work without the organisation knowing or approving." },
  { term: "Two-step sign-in", meaning: "A second proof, such as an authenticator code or passkey, needed in addition to your password." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Is it safe to use ChatGPT, Claude or Gemini?", answer: "For everyday questions, usually yes, if you follow the basics: keep private data out, check important answers and secure your account. Safety depends on what you share and which plan and settings you use." },
  { question: "Do paid plans protect my privacy better?", answer: "Not automatically. Terms differ by provider and plan, and business or education plans often offer stronger controls than free personal ones. Read the provider's own page, or see our privacy matrix." },
  { question: "Can AI companies read my chats?", answer: "It depends on the provider, plan and settings. Chats may be stored, and some may be reviewed for safety or used to improve models unless you opt out. Check the provider's terms." },
  { question: "What if I already pasted something I should not have?", answer: "Follow the six steps in the \"If something goes wrong\" section above. The first priority is to change any password, key or card detail that was exposed." },
  { question: "Is my checklist progress saved?", answer: "Your ticks are saved in this browser only, on this device. Nothing is sent to us. Clearing your browser data removes them." },
  { question: "Does this checklist meet legal requirements?", answer: "No. It is general guidance and not legal advice. Laws on data, AI and children differ by country. Ask a qualified adviser for your own case." },
  { question: "Can I print or share the checklist?", answer: "Yes. Use the print buttons above the checklist. You can print one list or all three, and ticks you have made will show on paper." },
  { question: "How often should I review this?", answer: "Every few months, and whenever you start using a new AI tool or a provider changes its terms." },
];

export const SAFETY_SOURCES: readonly SafetySource[] = [
  { publisher: "NIST", title: "AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework", use: "General approach to identifying and managing AI risk" },
  { publisher: "OWASP", title: "Top 10 for Large Language Model Applications", href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", use: "Prompt injection and data-leak risks for businesses" },
  { publisher: "UK National Cyber Security Centre", title: "AI and cyber security: what you need to know", href: "https://www.ncsc.gov.uk/guidance/ai-and-cyber-security-what-you-need-to-know", use: "Security advice for organisations using AI" },
  { publisher: "US Federal Trade Commission", title: "Scammers use AI to enhance their family emergency schemes", href: "https://consumer.ftc.gov/articles/scammers-use-ai-enhance-their-family-emergency-schemes", use: "Cloned-voice scams and call-back advice" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot", note: "Level 1 guide" },
  { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes: how to spot them", note: "Level 1 guide" },
  { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers", note: "Level 2 guide" },
  { href: "/learn/expert/prompt-injection-agent-security", label: "Prompt injection and agent security", note: "Level 4 guide" },
  { href: "/prices/privacy", label: "Privacy matrix", note: "Training, retention and deletion by provider" },
  { href: "/tools/cheat-sheets", label: "Cheat sheets and templates", note: "Includes the agent permission checklist" },
];