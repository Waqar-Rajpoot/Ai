import type { AiKind } from "./tenPlaces";

export interface SummaryPoint {
  headline: string;
  detail: string;
}

export interface KindExplainer {
  kind: AiKind;
  plainMeaning: string;
  everydayExample: string;
}

export interface ThemeRow {
  theme: string;
  helps: string;
  costs: string;
}

export interface AuditStep {
  title: string;
  detail: string;
}

export interface MythEntry {
  myth: string;
  fact: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  meaning: string;
}

export interface SourceEntry {
  publisher: string;
  title: string;
  href: string | null;
  use: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export const SUMMARY_POINTS: readonly SummaryPoint[] = [
  { headline: "You meet AI far more often than you type to a chatbot.", detail: "Most of these ten moments happen inside apps and services you already use." },
  { headline: "It does four jobs.", detail: "It recognises (faces, voices, images), ranks (feeds, search, shops), predicts (traffic, fraud, spam) and generates (text, summaries, translation)." },
  { headline: "Every place has a benefit and a cost.", detail: "Convenience comes with privacy, accuracy or attention trade-offs, so each card shows both." },
  { headline: "You have more control in some places than others.", detail: "Feeds, autoplay and location history are easy to limit. Fraud screening is not up to you." },
];

export const KIND_EXPLAINERS: readonly KindExplainer[] = [
  { kind: "recognition", plainMeaning: "Matching what a sensor picks up (a face, a voice, an object, a handwriting sample) to something it has learned.", everydayExample: "Face unlock, voice typing, a doorbell that says “person at the door”." },
  { kind: "ranking", plainMeaning: "Putting a very long list in an order, based on a guess about what you will find most relevant or engaging.", everydayExample: "Your feed, search results, “recommended for you”." },
  { kind: "prediction", plainMeaning: "Estimating what is likely to happen or what something probably is, from patterns in past data.", everydayExample: "Arrival times, spam filters, card fraud alerts, sleep scores." },
  { kind: "generation", plainMeaning: "Producing new text, speech, images or summaries that fit a request, one likely piece after another.", everydayExample: "Suggested replies, AI search summaries, translation, writing help." },
];

export const SCORECARD_ROWS: readonly ThemeRow[] = [
  { theme: "Time", helps: "Routine tasks, routes and sorting take seconds.", costs: "Time can leak away through endless feeds and autoplay." },
  { theme: "Accuracy", helps: "Spam, fraud and traffic problems are caught early.", costs: "Errors sound confident: a wrong summary, a wrongly blocked payment, a bad route." },
  { theme: "Privacy", helps: "Some processing can happen on your own device.", costs: "Location, voice, purchases and health signals are personal data, and services may keep or share them." },
  { theme: "Fairness", helps: "Consistent checks can reduce some human slips.", costs: "Systems can work worse for some accents, faces, languages or groups, and can repeat bias in their data." },
  { theme: "Choice and attention", helps: "You discover things you would not have searched for.", costs: "Ranking can narrow what you see, and paid results can look like neutral ones." },
  { theme: "Skills and dependence", helps: "More people can write, translate and learn with support.", costs: "Skills you stop practising fade, and you may stop noticing wrong answers." },
];

export const AUDIT_STEPS: readonly AuditStep[] = [
  { title: "Phone and assistant", detail: "Open the assistant's privacy settings and delete saved voice history you do not need." },
  { title: "Location history", detail: "Look at what your maps app stores, pause it if you prefer, and delete old entries." },
  { title: "One feed", detail: "Pick the app you scroll most. Switch off autoplay, set a time limit and mark three posts “not interested”." },
  { title: "Messages and payments", detail: "Turn on payment alerts, agree a family code word and glance at your spam folder." },
  { title: "Cameras and speakers", detail: "Check who can see your camera clips and which devices are listening for a wake word." },
];

export const MYTHS: readonly MythEntry[] = [
  { myth: "“I don't use AI.”", fact: "If you use a smartphone, email, search or maps, you probably meet AI several times a day, even if you never open a chatbot." },
  { myth: "“AI understands me.”", fact: "Most of these systems find patterns in data. They do not know you the way a person does, and they can be wrong about you." },
  { myth: "“Turning off one app switches AI off.”", fact: "AI is built into many services. You can reduce personalisation and data collection, but you cannot avoid it entirely." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do I really meet AI ten times a day?", answer: "If you use a smartphone, email, search and maps, very likely. The ten places are common examples, and your own day will differ." },
  { question: "Is all of this “AI” or just ordinary software?", answer: "Companies do not always say which parts of a service use AI, so we describe common uses and do not claim what a particular app does. Some of what you see is hand-written rules, and some is machine learning." },
  { question: "Which of these is generative AI?", answer: "Suggested replies, written search summaries, translation, writing help and review summaries are generative. Feeds, traffic, spam and fraud checks mostly rank, sort or predict." },
  { question: "Why are there no percentages for each place?", answer: "We only publish figures from named surveys and official trackers, and we do not have a reliable named figure for each of these moments. The adoption snapshot below is the one series we use." },
  { question: "Does AI listen to me all the time?", answer: "Voice assistants listen for a wake word. What is stored afterwards differs by product and settings, so check the privacy settings of each device you own." },
  { question: "Can I avoid AI altogether?", answer: "Not realistically, because it sits inside services such as email filtering and fraud checks. You can reduce the data you give and limit personalisation where the app allows it." },
  { question: "Is any of this dangerous?", answer: "Mostly it is convenient. The risks are privacy, errors, bias, scams and lost attention, and each card says what to do about them." },
  { question: "How often is this page updated?", answer: "Every few months, and sooner when a figure or a rule changes. The reviewed date is at the top of the page." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Algorithm", meaning: "A set of steps a computer follows. Not every algorithm is AI." },
  { term: "Machine learning", meaning: "A way of building software by letting it find patterns in examples instead of writing every rule by hand." },
  { term: "Recommender system", meaning: "Software that predicts what you will want next and ranks content to match." },
  { term: "Classifier", meaning: "A model that puts things in categories, such as spam or not spam." },
  { term: "Generative AI", meaning: "AI that creates new text, images, audio or video from a request." },
  { term: "Personalisation", meaning: "Changing what you see based on data about you." },
  { term: "On-device processing", meaning: "Work done on your phone or gadget, so the data does not have to be sent to a server." },
  { term: "Deepfake", meaning: "A fake image, video or voice made with AI to look or sound like a real person." },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "Fed-hosted adoption tracker", title: "US generative AI adoption, adults aged 18 to 64", href: null, use: "Adoption snapshot figures, Q3 2024 and Q2 2026" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/day-quiz", label: "How much AI is in your day? (quiz)", note: "Interactive, takes two minutes" },
  { href: "/society/role-of-ai-in-our-lives", label: "The role of AI in our lives: home, school and work", note: "Article 32" },
  { href: "/society/pros-and-cons-of-ai", label: "Pros and cons of AI: an honest scorecard", note: "Article 33" },
  { href: "/society/ai-myths-and-facts", label: "AI myths and facts", note: "Article 42" },
  { href: "/learn/foundations/what-is-ai", label: "What is AI? A plain-English guide", note: "Level 1 guide" },
  { href: "/learn/foundations/how-ai-chatbots-work", label: "How AI chatbots work, without math", note: "Level 1 guide" },
  { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot", note: "Level 1 safety" },
  { href: "/tools/ai-safety-checklist", label: "AI safety checklist", note: "For individuals, schools and businesses" },
];