import type { FaqEntry, GuideLink, StepEntry, TermEntry } from "@/lib/shared/contentTypes";

export interface ToolDataRow {
  id: string;
  tool: string;
  youEnter: string;
  whatHappens: string;
}

export const SUMMARY_POINTS: readonly string[] = [
  "There are no accounts on this site. Nothing to sign in to.",
  "We get your email address only if you sign up for the newsletter, write to us or buy something.",
  "Our calculators, quizzes and checklists run in your browser. What you type in them is not sent to us.",
  "Analytics and cookies show us which pages are used.",
  "Affiliate links, and ads if we add them, are labelled and may involve partner cookies.",
  "You can ask us to correct or remove your data, and you can unsubscribe at any time.",
];

export const PLAIN_WORDS: readonly TermEntry[] = [
  { term: "Personal data", meaning: "Information about you, such as your email address, or data that can be linked to you." },
  { term: "Cookie", meaning: "A small file a website saves in your browser. Similar technologies do the same job." },
  { term: "Analytics", meaning: "Counting visits and page views to see what is used, usually without naming you." },
  { term: "Affiliate link", meaning: "A link that may pay us a commission if you buy. We label them wherever they appear." },
  { term: "Third party", meaning: "Another company that handles data for us or on its own pages, such as a newsletter service." },
  { term: "Consent", meaning: "Your clear yes to a specific use of your data, which you can take back." },
];

export const TOOL_DATA_ROWS: readonly ToolDataRow[] = [
  { id: "quiz", tool: "Which AI fits me? quiz", youEnter: "Your three answers", whatHappens: "They stay in the page. They are not sent to us or saved, and refreshing clears them." },
  { id: "subscriptions", tool: "Subscription cost calculator", youEnter: "Plan names, prices, seats, tax, renewal dates and your worth-it numbers", whatHappens: "They stay in the page. Copy my summary uses your clipboard. Nothing is sent to us or saved." },
  { id: "others", tool: "Other calculators, checklists and the prompt library", youEnter: "Whatever you type", whatHappens: "They run in your browser. Nothing you type is sent to us." },
  { id: "contact", tool: "Contact form", youEnter: "Your reason, details and message", whatHappens: "The page builds an email in your browser. It reaches us only when you send it from your own email app." },
];

export const TOOLS_NOTE =
  "Our analytics tool may still record that you visited a tool's page, as it does for any page. It does not record what you type into the tool.";

export const NOT_COLLECTED: readonly string[] = [
  "We do not run accounts or logins.",
  "Our tools do not need personal details to work.",
  "We never ask you for passwords, ID numbers, or health or money details. Please do not send them.",
];

export const RIGHTS: readonly TermEntry[] = [
  { term: "Access", meaning: "Ask what personal data we hold about you, and get a copy." },
  { term: "Correct", meaning: "Ask us to fix data that is wrong." },
  { term: "Delete", meaning: "Ask us to remove your data, unless we must keep it by law." },
  { term: "Object or restrict", meaning: "Ask us to stop or limit some uses, such as analytics." },
  { term: "Withdraw consent", meaning: "Take back consent you gave, such as for the newsletter. It does not affect what we did before." },
  { term: "Portability", meaning: "Ask for data you gave us in a common format, where the law gives you that right." },
  { term: "Complain", meaning: "Contact your data protection authority if you think we handled your data wrongly. You are always free to contact us first." },
];

export const RIGHTS_BY_REGION: readonly string[] = [
  "Which rights you have depends on where you live.",
  "People in the EU and UK have the rights above under data protection law (the GDPR and its UK equivalent).",
  "California residents have similar rights under state law, including to know, delete and correct personal information, and to opt out of its sale or sharing.",
  "Other places have their own laws. Ask us if you are unsure.",
];

export const CHOICE_STEPS: readonly StepEntry[] = [
  { title: "Unsubscribe any time", detail: "Use the unsubscribe link in any newsletter email, or ask us." },
  { title: "Control cookies in your browser", detail: "Your browser's privacy settings let you block or delete cookies. Blocking non-essential cookies is safe: the site is static and the tools run in your browser." },
  { title: "Use privacy tools", detail: "Tracker-blocking extensions and the Global Privacy Control setting, where your browser offers them, reduce tracking by analytics and ad partners." },
  { title: "Ask us", detail: "Use the contact page and choose a privacy or newsletter request. Include the address you signed up with, if it is about the newsletter." },
  { title: "Check your own rights", detail: "Your rights depend on where you live. The list above is a guide." },
  { title: "Take it further if you need to", detail: "You can complain to your data protection authority. We would like the chance to fix it first." },
];

export const SECURITY_POINTS: readonly string[] = [
  "The site is static: pages are prepared in advance and there is no login, so there is little personal data to protect.",
  "Most personal data we hold is kept by the services listed above, under their own security measures.",
  "No way of storing or sending data is perfectly secure. Email is not a secure channel, so please keep secrets out of it.",
  "Some of our providers are based outside your country, for example in the United States, so your data may be processed there. Where the law requires safeguards for that, we rely on the safeguards our providers put in place.",
  "If we learn of a breach that puts your rights at risk, we will tell the people affected, and the authorities where the law requires it.",
];

export const CHILDREN_POINTS: readonly string[] = [
  "Our guides are written for a general audience, including parents, teachers and students.",
  "We do not knowingly collect personal data from children. The age that counts as a child varies: 13 in the US, and 13 to 16 in the EU depending on the country.",
  "If you think a child has sent us personal data, tell us and we will delete it.",
];

export const CHANGE_POINTS: readonly string[] = [
  "We may update this policy when the site or the law changes.",
  "The dates at the top show when it took effect and when it last changed.",
  "If we make a change that matters to you, such as adding ads that use cookies, we will say so on this page and in the changelog.",
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "This page describes what the site does today. If a service is added or changed, this page changes with it.",
  "Other sites that we link to, including affiliate partners and checkout pages, have their own policies, and theirs apply on their pages.",
  "The summaries are for convenience. If anything seems to differ, the full sections below are the policy.",
  "This policy is general information and not legal advice. For decisions about your rights, ask your data protection authority or a qualified adviser.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do I need an account to use the site?", answer: "No. There are no accounts or logins." },
  { question: "Do your tools see what I type?", answer: "No. Calculators, quizzes and checklists run in your browser, and what you type is not sent to us. Our analytics tool may record that you visited the page." },
  { question: "Do you collect my email address if I only read the site?", answer: "No. We get it only if you sign up for the newsletter, write to us or buy something. Analytics data does not include your email address." },
  { question: "Can I use the site with cookies blocked?", answer: "Yes. Blocking non-essential cookies is safe. The pages are static and the tools run in your browser." },
  { question: "Does this site use a chatbot or train AI on my data?", answer: "There is no chatbot on this site, and what you type into our tools never reaches us." },
  { question: "Who else gets my data?", answer: "Only the services listed in the section on who else is involved: for example our newsletter service, analytics, hosting and, if you follow an affiliate link, that partner." },
  { question: "How do I unsubscribe or have my data removed?", answer: "Use the unsubscribe link in any newsletter. For anything else, use the contact page and choose a privacy or newsletter request." },
  { question: "What are my rights if I live in the EU, UK or California?", answer: "You can ask to see, correct or delete your data, and to object or withdraw consent. The section on your choices and rights explains each." },
  { question: "How will I know if the policy changes?", answer: "The dates at the top change, and we note significant changes in the changelog." },
];

export const RELATED_LINKS: readonly GuideLink[] = [
  { href: "/terms", label: "Terms of use" },
  { href: "/contact", label: "Contact" },
  { href: "/about/independence", label: "Independence and disclosure" },
  { href: "/news/changelog", label: "Changelog" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share with a chatbot" },
];