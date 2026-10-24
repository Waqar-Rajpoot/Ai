import type { FaqEntry, GuideLink, SourceNote, TermEntry } from "@/lib/shared/contentTypes";
import { BENCHLM_SCORES_AS_OF, PLAN_PRICES_AS_REPORTED } from "./quizConstants";
import type { QuizAnswers } from "./quizQuestions";

export interface RuleStep {
  title: string;
  detail: string;
}

export interface ExampleProfile {
  id: string;
  title: string;
  story: string;
  answers: QuizAnswers;
}

export interface TipEntry {
  title: string;
  detail: string;
  link: GuideLink;
}

export interface PasteRule {
  item: string;
  why: string;
}

export const KEY_TERMS: readonly TermEntry[] = [
  { term: "App", meaning: "The chatbot you open in a browser or on your phone, such as ChatGPT, Claude, Gemini or Grok." },
  { term: "Model", meaning: "The AI engine behind an app, such as Claude Opus 5.5 or GPT-6.1 Sol. One app can offer several models." },
  { term: "Plan", meaning: "What you pay the app maker each month. Free plans are limited, and paid plans raise the limits and add features." },
  { term: "API", meaning: "A way for software to call a model directly and pay per use. A chat subscription and an API are separate products with separate bills." },
  { term: "Token", meaning: "A small piece of text, roughly a short word or part of one. Models read in tokens, and API prices are set per million of them." },
  { term: "Context window", meaning: "How much text a model can hold in one conversation. Most models in our directory list 1M tokens." },
  { term: "Open weight", meaning: "A model whose files you can download and run yourself, under its licence. Open weight is not always the same as open source." },
  { term: "Training setting", meaning: "A setting that decides whether your chats may be used to improve the maker's models. Check it before you paste anything personal." },
];

export const RULE_STEPS: readonly RuleStep[] = [
  { title: "Privacy decides first", detail: "If you handle confidential or regulated information, the rules choose a business plan or a local model, whatever your budget. Those are the two options that give you data terms you can read, or data that never leaves your computer. With a budget of up to about $10 the answer is a local model." },
  { title: "Bulk work is priced per task", detail: "If your main use is lots of small repeated jobs and you will pay anything, the rules lead with pay-per-use. Chat plans have usage limits, and a large batch can stop partway." },
  { title: "Otherwise budget picks the type", detail: "Nothing leads to a free plan, up to about $10 to a low-cost plan, about $20 to a standard plan, $100 or more to a heavy-use plan, and pay-per-use to an API." },
  { title: "Your main use picks the models", detail: "Each use has a short list built from the \"best for\" labels and BenchLM scores in our model directory. The lists mix makers, and no list depends on affiliate or sponsor status." },
  { title: "A second option appears only for a reason", detail: "You see one when work or client details meet a $20 or higher plan, or when coding meets a budget that heavy sessions can exhaust." },
  { title: "Nothing is stored", detail: "Your answers live in the page while it is open. They are not sent anywhere, saved, or tied to you. Refreshing the page clears them." },
];

export const EXAMPLE_PROFILES: readonly ExampleProfile[] = [
  { id: "student", title: "A student on a tight budget", story: "Wants explanations and practice questions, and has no money for a subscription.", answers: { task: "study", budget: "free", privacy: "relaxed" } },
  { id: "job-seeker", title: "A job seeker polishing a resume", story: "Pastes in work history and a job post, and can spare a few dollars a month.", answers: { task: "writing", budget: "low", privacy: "careful" } },
  { id: "office-worker", title: "An office worker drafting email and reports", story: "Uses AI most days and includes some internal details.", answers: { task: "writing", budget: "standard", privacy: "careful" } },
  { id: "business-owner", title: "A small business owner with client files", story: "Wants to summarize contracts and client records and will pay for the right plan.", answers: { task: "documents", budget: "standard", privacy: "strict" } },
  { id: "hobby-coder", title: "A hobby programmer", story: "Builds side projects on weekends with public code.", answers: { task: "coding", budget: "standard", privacy: "relaxed" } },
  { id: "daily-coder", title: "A developer coding all day", story: "Runs long coding sessions and keeps hitting limits on a $20 plan.", answers: { task: "coding", budget: "high", privacy: "relaxed" } },
  { id: "freelancer", title: "A freelancer labelling thousands of items", story: "Needs 5,000 product descriptions tidied, and wants to pay only for what runs.", answers: { task: "bulk", budget: "pay-per-use", privacy: "relaxed" } },
  { id: "volunteer", title: "A volunteer with confidential records", story: "Handles case notes for a charity, with no budget for software.", answers: { task: "documents", budget: "free", privacy: "strict" } },
];

export const TIPS: readonly TipEntry[] = [
  { title: "Run a one-week trial", detail: "Use the free version first and upgrade only when a limit blocks real work. Write down which limit it was.", link: { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI" } },
  { title: "Test on your own tasks", detail: "Pick ten real tasks, run them on two or three options and score the results. It takes an afternoon and beats any ranking.", link: { href: "/learn/power-user/build-your-own-ai-test-set", label: "Build your own AI test set" } },
  { title: "Write clear prompts", detail: "Give a role, a task, some context, a format and limits. A clear prompt improves results on every plan.", link: { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" } },
  { title: "Check answers that matter", detail: "AI can sound sure and be wrong. Check sources, quotes and numbers, especially for health, legal and money questions.", link: { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" } },
  { title: "Note the renewal date", detail: "Annual plans renew on their own. Put the date in your calendar before you pay.", link: { href: "/prices/plans", label: "Consumer plan table" } },
  { title: "Retake the quiz when things change", detail: "A new job, a new budget or a new plan from a provider can change the best answer.", link: { href: "/news", label: "Latest price and plan news" } },
];

export const PASTE_RULES: readonly PasteRule[] = [
  { item: "Passwords and access codes", why: "A chat is not a safe place to keep a secret." },
  { item: "ID numbers", why: "Passport, tax, bank and national ID numbers can be misused if they leak." },
  { item: "Health and money details", why: "Diagnoses, balances and statements are among the most sensitive things you hold." },
  { item: "Client or customer data", why: "Someone trusted you with it. Check your agreement and your employer's rules first." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Prices and plan features change. The plan prices here were reported through secondary sources, so confirm each on the provider's website.",
  "Model lists use independent composite scores and \"best for\" labels. No model here has been through our own test battery yet.",
  "On a chat plan, the provider decides which model you get. The model list shows what each maker's line-up can do.",
  "The quiz cannot judge your legal or contractual duties. If you handle confidential data, ask your employer, client or compliance lead.",
  "A local model needs enough memory, and a score is a shortlist, not a verdict.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Is this quiz giving me a verdict?", answer: "No. It is a shortlist built from hand-written rules. Test the options on your own tasks before you pay." },
  { question: "Does payment change the result?", answer: "No. Affiliate and sponsor status is never an input to the rules or the model lists. See our independence page." },
  { question: "Does my data leave my browser?", answer: "No. Your answers stay in the page while it is open, and nothing is sent or saved. Refreshing the page clears them." },
  { question: "Why only three questions?", answer: "Task, budget and privacy decide what you need, what you can pay and what is safe. Taste, such as tone and speed, is best judged by trying a free plan." },
  { question: "Why does a free result list models that cost money?", answer: "The model list shows what each maker's line-up can do. Your plan decides which of those models you can use, so confirm on the provider's page." },
  { question: "Should I pay for more than one plan?", answer: "Start with one. Compare the free versions of the others first, and add a second only if a real task needs it." },
  { question: "Why does confidential information skip free chat plans?", answer: "Confidential information needs terms you can read and some say over where data goes. A local model keeps data on your computer, and business plans come with organisational data terms. Check your own organisation's rules first." },
  { question: "What if I want images, audio or video?", answer: "Our directory does not rank these tools yet, so the quiz sends you to the image and video roundups. Judge samples by eye." },
  { question: "How often is this page updated?", answer: "Whenever a plan or model changes, with a weekly check. The date at the top shows when the rules were last changed." },
];

export const SOURCES: readonly SourceNote[] = [
  { label: "Model directory snapshot", detail: `API prices, context sizes and independent BenchLM composite scores (as of ${BENCHLM_SCORES_AS_OF}). A score is a shortlist, not a verdict.`, link: { href: "/compare/models", label: "Open the model directory" } },
  { label: "Consumer plan prices", detail: `US monthly prices as reported in ${PLAN_PRICES_AS_REPORTED} through secondary sources. They have not yet been checked against each provider's own page.`, link: { href: "/prices/plans", label: "See the plan table" } },
  { label: "How we label results", detail: "Independent third party for BenchLM scores. Tested by us: none yet. Vendor-reported numbers are not used on this page.", link: { href: "/about/how-we-test", label: "How we test" } },
  { label: "Independence", detail: "No affiliate links appear on this page. If any are added they will be labelled, and payment never changes a result.", link: { href: "/about/independence", label: "Independence and disclosure" } },
  { label: "Spotted a wrong price or date?", detail: "Tell us and we will fix it and log the change.", link: { href: "/about/corrections", label: "Report an error" } },
];