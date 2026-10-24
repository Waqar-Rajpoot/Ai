import type { FaqEntry, SourceNote, StepEntry, TermEntry, TipEntry } from "@/lib/shared/contentTypes";
import { PLAN_PRICES_AS_REPORTED } from "@/lib/prices/planTable";
import type { ExampleItem } from "./subscriptionCost";

export interface ExampleStack {
  id: string;
  title: string;
  story: string;
  items: readonly ExampleItem[];
}

export const KEY_TERMS: readonly TermEntry[] = [
  { term: "Monthly equivalent", meaning: "A yearly price divided by 12, so every subscription can be compared on one scale." },
  { term: "Billing cycle", meaning: "How often you are charged: every month, or once a year." },
  { term: "Per seat", meaning: "A price for each person on a team plan. Five seats cost five times the seat price." },
  { term: "Annual billing", meaning: "Paying for a year at once, often at a lower monthly price. Check whether it renews on its own." },
  { term: "Auto-renewal", meaning: "Many plans charge you again at the end of each period unless you cancel first." },
  { term: "Tax", meaning: "Sales tax or VAT added on top of some prices. Enter your rate to see what you really pay." },
  { term: "Usage limit", meaning: "A cap on how much you can use a plan. Heavy-use plans raise it." },
  { term: "Break-even", meaning: "The point where the value of the time you save equals what the subscription costs." },
  { term: "Subscription vs API", meaning: "A chat subscription is a flat fee for an app. An API charges per token. They are separate products with separate bills." },
];

export const HOW_TO_READ: readonly StepEntry[] = [
  { title: "List every plan you pay for", detail: "Include chat assistants, coding tools, image tools and any plan a team pays for you if you want the whole picture. Pick a preset or type your own." },
  { title: "Set the billing cycle", detail: "Enter the price exactly as charged. If you pay once a year, choose Every year and enter the yearly total." },
  { title: "Add seats", detail: "For team plans, enter how many people the plan covers. The price is multiplied by the seats." },
  { title: "Add tax if your bill has it", detail: "Enter your rate once and every row includes it. Leave it blank if your prices already include tax." },
  { title: "Read the four totals", detail: "Per month, per year, per week and per day. The yearly figure is the one that surprises people most." },
  { title: "Read the notices", detail: "The calculator flags two or more chat assistant plans and any renewal in the next 30 days." },
  { title: "Run the worth-it check", detail: "Enter the hours a month AI saves you and what an hour is worth to you. Use a real estimate, not a hope." },
  { title: "Decide, then check again", detail: "Keep it, switch to yearly billing, drop to a cheaper plan or cancel. Come back when prices or your needs change." },
];

export const EXAMPLE_STACKS: readonly ExampleStack[] = [
  { id: "one-standard", title: "One standard plan", story: "A student or office worker with a single $20 plan, billed monthly.", items: [{ planId: "chatgpt-plus", billing: "monthly", seats: 1 }] },
  { id: "one-standard-yearly", title: "The same idea, billed yearly", story: "Claude Pro on its yearly price, which our table lists at $17 a month.", items: [{ planId: "claude-pro", billing: "annual", seats: 1 }] },
  { id: "budget-step", title: "A budget step-up", story: "Someone who outgrew free limits and wants a small step up.", items: [{ planId: "google-ai-plus", billing: "monthly", seats: 1 }] },
  { id: "two-assistants", title: "Two chat assistants", story: "ChatGPT Plus and Claude Pro, both billed monthly.", items: [{ planId: "chatgpt-plus", billing: "monthly", seats: 1 }, { planId: "claude-pro", billing: "monthly", seats: 1 }] },
  { id: "three-assistants", title: "Three chat assistants", story: "ChatGPT Plus, Claude Pro and Google AI Pro, all billed monthly.", items: [{ planId: "chatgpt-plus", billing: "monthly", seats: 1 }, { planId: "claude-pro", billing: "monthly", seats: 1 }, { planId: "google-ai-pro", billing: "monthly", seats: 1 }] },
  { id: "heavy-use", title: "One heavy-use plan", story: "A developer on Claude Max (5x), billed monthly.", items: [{ planId: "claude-max-5x", billing: "monthly", seats: 1 }] },
  { id: "small-team", title: "A team of five", story: "Five Claude Team standard seats on yearly billing.", items: [{ planId: "claude-team-standard", billing: "annual", seats: 5 }] },
  { id: "two-person-business", title: "A two-person business", story: "Two ChatGPT Business seats, billed monthly. The plan has a two-seat minimum.", items: [{ planId: "chatgpt-business", billing: "monthly", seats: 2 }] },
];

export const SAVING_TIPS: readonly TipEntry[] = [
  { title: "Start free", detail: "Use the free plans until a limit blocks real work. Write down which limit it was before you pay.", link: { href: "/prices/free-limits", label: "Free-plan limits compared" } },
  { title: "Keep one assistant plan", detail: "Most people need one chat assistant. Use the free version of another to compare before you add a second subscription.", link: { href: "/compare/apps", label: "ChatGPT vs Claude vs Gemini vs Grok" } },
  { title: "Try yearly billing after a trial month", detail: "A yearly plan can lower the monthly price. Claude Pro is $17 instead of $20 in our table. It only saves money if you keep using it all year.", link: { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI" } },
  { title: "Set renewal reminders", detail: "Add each renewal date to your calendar a week early, so a renewal never surprises you.", link: { href: "/learn/foundations/free-vs-paid-ai", label: "Avoiding surprise renewals" } },
  { title: "Count the bundled extras", detail: "Google AI Plus includes 400 GB and Google AI Pro 5 TB of storage. If you already pay for cloud storage, the real extra cost may be smaller.", link: { href: "/prices/plans", label: "Consumer plan table" } },
  { title: "Check pay-per-use for light technical use", detail: "If you use AI through code or automations, paying per token can cost less than a flat plan. Compare the two with the API calculator.", link: { href: "/tools/api-cost-calculator", label: "API cost calculator" } },
  { title: "Count only people who use team seats", detail: "Business and team plans charge per seat, and ChatGPT Business has a two-seat minimum. Pay for the people who use it.", link: { href: "/prices/plans", label: "Consumer plan table" } },
  { title: "Cancel what you have not opened in a month", detail: "A tool you have not used for a month is the first candidate to cancel. You can always subscribe again.", link: { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" } },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  `Preset prices are US dollars before tax, as reported in ${PLAN_PRICES_AS_REPORTED} through secondary sources. Type the price on your own bill if it differs.`,
  "We read a yearly price such as \"$17 annual\" as $17 a month billed once a year, so $204 for the year. Confirm on the provider's page.",
  "A price can differ by country, currency, tax or where you buy. If you subscribe through an app store, check your receipt for the real price.",
  "Introductory and trial prices end. Enter the price you will pay after the offer if you want the lasting cost.",
  "The worth-it check uses your own estimates. Time one real task with and without AI before you trust it.",
  "Nothing is saved. Refreshing the page clears your list, so use Copy my summary first.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Does the calculator store my subscriptions?", answer: "No. Your list stays in the page while it is open. Nothing is sent or saved, and refreshing clears it." },
  { question: "How do I enter a plan billed once a year?", answer: "Choose Every year and enter the yearly total. The calculator divides it by 12 for the monthly view." },
  { question: "What are the presets?", answer: "They fill in the US price from our plan table so you can start quickly. Edit any field. If a plan lists a yearly price, a button switches the row to yearly billing." },
  { question: "Does it convert currencies?", answer: "No. The currency symbol is a label only. If you pick another symbol, type your own prices, because the presets are in US dollars." },
  { question: "How should I treat free trials and promotional prices?", answer: "Enter the price you will pay after the offer ends to see the lasting cost, or the promotional price to see what you pay now." },
  { question: "Is the worth-it check advice?", answer: "No. It is a rough check built from your own estimates, and it is general information, not financial advice." },
  { question: "Should I use an API instead of a subscription?", answer: "Maybe, if you use AI through code or automations at low volume. A chat subscription and an API are separate products, so compare both with the API cost calculator." },
  { question: "Why does the calculator flag two chat assistants?", answer: "Many people pay for overlapping plans without noticing. The notice shows what dropping the cheapest one would save. You decide." },
  { question: "How often is this updated?", answer: "Whenever a plan price changes, with a weekly check. The date at the top shows when the calculator and its copy last changed." },
];

export const SOURCES: readonly SourceNote[] = [
  { label: "Plan prices", detail: `US monthly prices as reported in ${PLAN_PRICES_AS_REPORTED} through secondary sources. They have not yet been checked against each provider's own page.`, link: { href: "/prices/plans", label: "See the plan table" } },
  { label: "The maths", detail: "Done in your browser. Yearly price ÷ 12 is the monthly equivalent. Yearly = monthly × 12, weekly = yearly ÷ 52 and daily = yearly ÷ 365. Tax is applied to every row." },
  { label: "Independence", detail: "No affiliate links appear on this page. If any are added they will be labelled, and payment never changes a result.", link: { href: "/about/independence", label: "Independence and disclosure" } },
  { label: "Spotted a wrong price or date?", detail: "Tell us and we will fix it and log the change.", link: { href: "/about/corrections", label: "Report an error" } },
];