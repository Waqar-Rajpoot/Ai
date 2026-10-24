import type { ChecklistGroup } from "./checklists";

export type AudienceId = "individuals" | "schools" | "businesses";

export interface AudienceChecklist {
  id: AudienceId;
  label: string;
  whoFor: string;
  groups: readonly ChecklistGroup[];
}

export const DEFAULT_AUDIENCE: AudienceId = "individuals";

const INDIVIDUAL_GROUPS: readonly ChecklistGroup[] = [
  {
    id: "ind-private-data",
    title: "Protect your private data",
    summary: "What you type into a chatbot may be stored, reviewed or used to improve the service, depending on the plan and settings.",
    items: [
      { id: "ind-no-secrets", priority: "essential", text: "I never paste passwords, PINs, one-time codes, recovery phrases or card numbers into a chatbot.", why: "A secret in a chat can be stored, leaked in a breach or seen in a shared link. A password cannot be taken back.", how: "Use a password manager. If an AI needs to help with a login problem, describe the error without the secret.", guide: { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share" } },
      { id: "ind-no-ids", priority: "essential", text: "I remove names, ID numbers, addresses and account numbers before pasting a document.", why: "Most tasks work just as well with placeholders, and placeholders cannot be misused.", how: "Replace details with tags such as [NAME], [ID] and [ADDRESS] before you paste. Re-add them yourself afterwards." },
      { id: "ind-training-setting", priority: "essential", text: "I have found the data settings in each AI app I use and chosen whether my chats may be used to improve the model.", why: "Defaults differ by provider and plan, and they change. You can only choose if you have looked.", how: "Open settings and look for names like data controls, privacy, or improve the model for everyone. Wording differs, so read each label.", guide: { href: "/prices/privacy", label: "Privacy matrix" } },
      { id: "ind-delete-sensitive", priority: "recommended", text: "I delete chats that contain anything sensitive once I am done with them.", why: "Chats you keep can be seen by anyone who gets into your account.", how: "Delete the chat, then check the provider's page on how long deleted chats are kept." },
      { id: "ind-temporary-chat", priority: "recommended", text: "I use a temporary or private chat mode, where offered, for one-off sensitive questions.", why: "It keeps the chat out of your history and memory. It is not the same as invisible.", how: "Read what the provider says about how long temporary chats are kept." },
      { id: "ind-memory", priority: "recommended", text: "I have looked at what the memory feature has saved about me, and I edit or switch it off.", why: "Saved facts can show up in later answers, including in chats you thought were separate.", how: "Open the memory or personalisation settings, read the list, and delete anything you would not want repeated." },
      { id: "ind-shared-links", priority: "recommended", text: "I treat a shared chat link like a public web page.", why: "Anyone who gets the link can read the chat. Links get forwarded.", how: "Check the chat for private details before sharing, and delete the link when it is no longer needed." },
      { id: "ind-account-security", priority: "essential", text: "My AI accounts have a unique password and two-step sign-in.", why: "Your chat history is a record of your questions, drafts and files. Taking over the account exposes all of it.", how: "Turn on two-step sign-in with an authenticator app or passkey where available." },
      { id: "ind-official-apps", priority: "recommended", text: "I install AI apps and browser extensions only from official stores, and I check the permissions they ask for.", why: "Fake AI apps and extensions exist, and an extension that can read every page you visit can read your private chats too.", how: "Check the publisher name and review count, and refuse permissions the app does not need." },
    ],
  },
  {
    id: "ind-check-answers",
    title: "Check what AI tells you",
    summary: "Chatbots sound sure even when they are wrong. Checking is part of using them.",
    items: [
      { id: "ind-verify-facts", priority: "essential", text: "I check facts, numbers, dates and quotes before I act on them or share them.", why: "Models can state invented details in a confident tone.", how: "Search the claim on a trusted source. If you cannot find it, treat it as unproven.", guide: { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI" } },
      { id: "ind-open-sources", priority: "essential", text: "I open every source or link the AI gives me and check that it exists and says what the AI claims.", why: "Invented citations and links that look real are a known failure.", how: "Click each link. Search the title. If neither works, drop the citation." },
      { id: "ind-high-stakes", priority: "essential", text: "For health, legal and money decisions, I use AI to prepare questions and a professional to decide.", why: "The cost of a wrong answer is high, and the AI does not know your full situation.", how: "Ask the AI what to ask your doctor, lawyer or adviser, then ask them." },
      { id: "ind-ask-doubt", priority: "recommended", text: "I ask the AI what it is unsure about and what a different view would say.", why: "It surfaces weak points. It does not replace checking, because the AI can be wrong about its own doubts.", how: "Try: \"What in this answer might be wrong, and how could I check it?\"" },
      { id: "ind-recent-info", priority: "recommended", text: "For anything recent, I confirm it is current.", why: "A model may not know about recent events, prices or rules unless it searched the web.", how: "Check the date on the source and look for a newer one." },
      { id: "ind-agreeable", priority: "recommended", text: "I notice when the AI just agrees with me, and I ask for the strongest argument against my view.", why: "Chatbots can lean toward telling you what you want to hear.", how: "Ask it to disagree, and compare the answer with a human you trust." },
    ],
  },
  {
    id: "ind-scams",
    title: "Spot scams and fakes",
    summary: "AI makes cloned voices, fake videos and polished phishing cheap. Habits beat detection.",
    items: [
      { id: "ind-code-word", priority: "essential", text: "My family and I have agreed a code word for emergencies.", why: "A cloned voice can sound like someone you love. A code word cannot be cloned.", how: "Choose something that is not on social media, and do not share it online.", guide: { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes" } },
      { id: "ind-call-back", priority: "essential", text: "If a call or message asks for money or secrets, I hang up and call back on a number I already have.", why: "Scammers control the incoming call. They do not control the number you already saved.", how: "Use a saved contact, an official website or the number on your card." },
      { id: "ind-no-rush-money", priority: "essential", text: "I never send money, gift cards or crypto because of a call, video or message that pushes me to hurry.", why: "Urgency is the scammer's main tool, because it stops you from checking.", how: "Say you will call back, then take ten minutes and talk to someone else." },
      { id: "ind-spelling", priority: "essential", text: "I do not trust a message just because it is well written.", why: "AI-written phishing no longer has the spelling mistakes people used to look for.", how: "Judge by what it asks you to do, not how it reads. Open the site yourself instead of using the link." },
      { id: "ind-fake-ads", priority: "recommended", text: "I am wary of investment ads and videos that show a celebrity or expert recommending something.", why: "Faces and voices can be faked to sell scams.", how: "Search the offer on the official site of the person or company, not through the ad." },
      { id: "ind-fake-reviews", priority: "recommended", text: "I read a mix of reviews, and I distrust a wall of similar five-star ones.", why: "Fake reviews can be generated in bulk.", how: "Look for specific details, different writing styles and reviews from several sites." },
      { id: "ind-voice-clips", priority: "recommended", text: "I think before posting long, clear clips of my voice or my family's voices in public.", why: "Short samples can be enough to imitate a voice.", how: "Use privacy settings so only people you know can see videos." },
      { id: "ind-check-image", priority: "recommended", text: "Before sharing a shocking image or video, I check its source.", why: "Fake images spread quickly, and sharing them helps scammers and liars.", how: "Run a reverse image search, look for the original publisher, and wait for confirmation." },
    ],
  },
  {
    id: "ind-wellbeing",
    title: "Use AI honestly and in a healthy way",
    summary: "Rules, money and your own wellbeing also belong on a safety list.",
    items: [
      { id: "ind-follow-rules", priority: "essential", text: "I follow the AI rules of my school or workplace, and I disclose AI use where it is required.", why: "Breaking a rule can cost a grade or a job, even when the AI output was good.", how: "Ask if the rule is unclear. Keep a short note of what you used AI for.", guide: { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "Study without cheating" } },
      { id: "ind-crisis", priority: "essential", text: "If I or someone I know is in crisis, I contact a person or the local emergency number, not a chatbot.", why: "A chatbot cannot see you, call for help or take responsibility for your safety.", how: "Use your local emergency number or a crisis line in your country, or go to someone you trust." },
      { id: "ind-kids", priority: "recommended", text: "If children use AI, I set it up with them and we talk about not sharing personal details.", why: "Children may not know what is private, and tools differ in what they allow.", how: "Check the tool's age rules, use the strongest content settings available and ask what they use it for." },
      { id: "ind-own-skills", priority: "recommended", text: "I keep practising the skills I want to keep, such as writing, maths and reading.", why: "Skills you stop using fade, and you need them to spot a wrong answer.", how: "Try first, then use AI to check or improve." },
      { id: "ind-renewals", priority: "recommended", text: "I know what my AI subscriptions cost and when they renew.", why: "Trials and yearly plans can renew without a reminder.", how: "Put the renewal date in your calendar and cancel what you do not use.", guide: { href: "/prices/plans", label: "Plan prices" } },
    ],
  },
];

const SCHOOL_GROUPS: readonly ChecklistGroup[] = [
  {
    id: "sch-policy",
    title: "Policy and approved tools",
    summary: "Clear rules, written down and shared, prevent most problems.",
    items: [
      { id: "sch-policy-written", priority: "essential", text: "We have a plain-language AI policy that says what is allowed, for whom and in which tasks.", why: "Without one, staff and pupils guess, and each class ends up with different rules.", how: "Keep it to one or two pages, give examples, and publish it where parents can see it." },
      { id: "sch-approved-list", priority: "essential", text: "We keep a list of approved AI tools, each with a named owner.", why: "You cannot protect data in tools you do not know about.", how: "For each tool, record what it is for, who may use it, and who reviews it." },
      { id: "sch-vet-terms", priority: "essential", text: "Before approving a tool, we check its data terms: training use, retention, storage location and who can access chats.", why: "School tools handle children's data, and consumer terms differ from education terms.", how: "Ask the vendor in writing. Compare with our privacy matrix.", guide: { href: "/prices/privacy", label: "Privacy matrix" } },
      { id: "sch-age-limits", priority: "essential", text: "We check each tool's minimum age and do not ask pupils below it to create accounts.", why: "Many general chatbots set age limits or need parental consent.", how: "Use school-managed accounts or education versions made for the pupils' age." },
      { id: "sch-data-protection", priority: "recommended", text: "Our data protection lead has reviewed AI use, with a privacy assessment where local law requires one.", why: "Rules on children's data differ by country, and the lead knows ours.", how: "Check local requirements. This page is not legal advice." },
      { id: "sch-review-term", priority: "recommended", text: "We review the policy and tool list every term.", why: "Tools, settings and rules change quickly.", how: "Put the review in the school calendar and log changes." },
    ],
  },
  {
    id: "sch-data",
    title: "Pupil data and privacy",
    summary: "The safest pupil data in an AI tool is none.",
    items: [
      { id: "sch-no-pupil-data", priority: "essential", text: "Staff never paste names, grades, behaviour notes, special-needs or health details into a consumer AI tool.", why: "That data is sensitive, and a consumer chat is not a controlled school system.", how: "Anonymise first. Use \"Pupil A\" and remove anything that identifies a child.", guide: { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share" } },
      { id: "sch-no-photos", priority: "essential", text: "Nobody uploads pupil photos, voice recordings or videos to an AI tool without a clear approved purpose.", why: "Images and voices identify children and can be misused or copied.", how: "State this in the policy and in staff guidance." },
      { id: "sch-managed-accounts", priority: "essential", text: "Pupils and staff use school-managed accounts, not personal ones, for school work.", why: "The school can set controls and remove access, and personal accounts mix school and private data.", how: "Switch off personal sign-in for approved tools where possible." },
      { id: "sch-tell-parents", priority: "essential", text: "We tell parents which AI tools are used, why, and what data they touch, and we get consent where it is required.", why: "Parents are entitled to know, and trust is easier to keep than to rebuild.", how: "Add a short section to the term letter or the website." },
      { id: "sch-deletion", priority: "recommended", text: "We know how to delete a pupil's data from each approved tool.", why: "Families may ask, and rules may require it.", how: "Write the steps and the contact for each tool next to its entry on the list." },
    ],
  },
  {
    id: "sch-teaching",
    title: "Teaching and assessment",
    summary: "Fair rules, honest assessment and a teacher who stays in charge.",
    items: [
      { id: "sch-task-rules", priority: "essential", text: "Each assignment states whether AI is not allowed, allowed for ideas only, or allowed with disclosure.", why: "A blanket rule is hard to follow. Pupils cannot tell what is expected on each task.", how: "Add one line to every task sheet, such as \"AI: ideas only. Say how you used it.\"" },
      { id: "sch-no-detector-proof", priority: "essential", text: "We never treat an AI-detector score as proof of cheating.", why: "Detectors make mistakes in both directions, and a false accusation harms a pupil.", how: "Talk to the pupil, look at drafts and version history, and ask them to explain the work." },
      { id: "sch-cite-ai", priority: "essential", text: "We teach pupils how to cite and disclose AI use.", why: "Honest use needs a clear way to show it.", how: "Provide a one-line template: tool, date, what you asked, what you changed." },
      { id: "sch-teacher-marks", priority: "essential", text: "A teacher reviews any AI-assisted marking or feedback before pupils see it, and AI never makes final decisions about a pupil.", why: "AI feedback can be wrong or biased. In the EU, AI that evaluates learning outcomes is treated as high-risk.", how: "Use AI for draft comments only. See our EU AI Act timeline for dates.", guide: { href: "/news/eu-ai-act", label: "EU AI Act timeline" } },
      { id: "sch-process-evidence", priority: "recommended", text: "We assess the process as well as the product: drafts, notes and short spoken check-ins.", why: "It is harder to fake a process than a finished essay.", how: "Ask for a draft stage, or a two-minute conversation about the work." },
      { id: "sch-check-skills", priority: "recommended", text: "We teach pupils to check AI answers and notice bias.", why: "The most useful AI skill for pupils is knowing when not to trust it.", how: "Set tasks where pupils find the errors in an AI answer." },
      { id: "sch-equal-access", priority: "recommended", text: "We do not require pupils to buy a paid AI plan.", why: "Required paid tools widen gaps between families.", how: "Offer school-provided access or a task that works without AI." },
    ],
  },
  {
    id: "sch-wellbeing",
    title: "Safeguarding and wellbeing",
    summary: "AI adds new ways to bully, impersonate and mislead, and pupils need a way to say so.",
    items: [
      { id: "sch-safeguarding-policy", priority: "essential", text: "Our safeguarding and anti-bullying policies cover AI-made fake images, voices and messages about pupils or staff.", why: "Fake images of real people are now easy to make, and the harm to the child is real even if the image is fake.", how: "Name it in the policy, and say what the consequences are." },
      { id: "sch-report-route", priority: "essential", text: "Pupils know exactly who to tell if they see a fake image of themselves or a classmate, and they know they will be supported.", why: "Shame stops reporting.", how: "Show the route in assembly and in the planner, and respond quickly and calmly." },
      { id: "sch-companions", priority: "recommended", text: "We talk to older pupils about AI chat companions and relying on them emotionally.", why: "Some tools are built to feel like friends, and young people may share private worries with them.", how: "Explain the limits, and make sure pupils know the people they can talk to." },
      { id: "sch-staff-training", priority: "recommended", text: "Staff have had short training on AI use, risks and our policy.", why: "In the EU, employers must support AI literacy for staff who use AI, from Feb 2, 2025. Elsewhere it is still good practice.", how: "Run a one-hour session each year, and add new staff to it.", guide: { href: "/learn/expert/eu-ai-act-for-everyday-users", label: "EU AI Act guide" } },
    ],
  },
];

const BUSINESS_GROUPS: readonly ChecklistGroup[] = [
  {
    id: "biz-rules",
    title: "Rules and ownership",
    summary: "Most small-business AI risk comes from staff using AI with no rules, not from AI itself.",
    items: [
      { id: "biz-owner", priority: "essential", text: "One named person is responsible for how the business uses AI.", why: "A job everyone shares is a job nobody does.", how: "Write the name in the policy. Review it when the person leaves." },
      { id: "biz-policy", priority: "essential", text: "We have a one-page AI-use policy covering allowed tools, data we never paste and when to disclose AI use.", why: "Staff cannot follow rules they have not seen.", how: "Keep it short, use examples from your own work, and ask each person to read it.", guide: { href: "/tools/cheat-sheets", label: "Cheat sheets and templates" } },
      { id: "biz-inventory", priority: "essential", text: "We keep a list of every AI tool staff use, including free personal accounts.", why: "Unapproved tools used at work (sometimes called shadow AI) are where business data escapes.", how: "Ask the team directly, without blame, and add what you find to the list." },
      { id: "biz-business-plans", priority: "essential", text: "We use business plans with admin controls instead of personal free accounts for work.", why: "Business plans typically offer admin controls and clearer data terms than free personal plans. Check each provider's own terms.", how: "Compare training, retention and admin settings in the plan tables before you buy.", guide: { href: "/prices/privacy", label: "Privacy matrix" } },
      { id: "biz-vendor-check", priority: "recommended", text: "Before adopting a tool, we ask the vendor about training use, retention, data location, sub-processors and breach notice.", why: "Your customers' data may flow through the vendor and its suppliers.", how: "Get the answers in writing and keep them with the tool entry." },
    ],
  },
  {
    id: "biz-data",
    title: "Customer and company data",
    summary: "Decide what may go into AI before someone pastes it.",
    items: [
      { id: "biz-classify", priority: "essential", text: "We sort data into simple classes (public, internal, confidential, regulated) and say which may go into which tool.", why: "A clear rule is faster than a judgement call every time.", how: "Start with three classes. Write one example of each." },
      { id: "biz-client-data", priority: "essential", text: "Nobody pastes client data, contracts under NDA, unreleased financials or personal data into a tool that is not approved for it.", why: "It may breach a contract or a law, and you cannot take it back.", how: "Anonymise, or use an approved tool with a business agreement." },
      { id: "biz-secrets", priority: "essential", text: "API keys, passwords and access tokens are kept out of prompts, chats and shared code.", why: "A key pasted into a chat or a public repository can be found and used by others.", how: "Use environment variables and a secrets manager. Rotate any key that was pasted." },
      { id: "biz-privacy-notice", priority: "essential", text: "Our privacy notice says so if customer data is processed by AI, and we have checked local data law.", why: "Laws such as the GDPR require clear information about how personal data is used.", how: "Ask a qualified adviser. This page is not legal advice." },
      { id: "biz-redact", priority: "recommended", text: "Staff replace names and numbers with placeholders before pasting a document.", why: "Most tasks do not need the real details.", how: "Share a find-and-replace routine, and check the output before you put the details back." },
      { id: "biz-contract-clauses", priority: "recommended", text: "We have checked our client contracts for clauses that limit or require disclosure of AI use.", why: "Some clients ban it, and others require it to be disclosed.", how: "Search contracts for \"AI\", \"subcontractor\" and \"confidential\"." },
    ],
  },
  {
    id: "biz-quality",
    title: "Quality and accountability",
    summary: "Your name is on the work, whoever wrote the first draft.",
    items: [
      { id: "biz-human-review", priority: "essential", text: "A person checks AI output before it goes to a customer, a regulator or the public.", why: "You are responsible for what you send, and a polished mistake is still a mistake.", how: "Name the reviewer for each type of document." },
      { id: "biz-no-solo-decisions", priority: "essential", text: "AI never makes the final decision about hiring, firing, credit or pricing for an individual.", why: "These decisions affect people's lives, and AI can be biased. In the EU, such systems are treated as high-risk, with duties applying from Dec 2, 2027.", how: "Use AI to organise information. A person decides and can explain why.", guide: { href: "/news/eu-ai-act", label: "EU AI Act timeline" } },
      { id: "biz-tell-chatbot", priority: "essential", text: "If customers talk to a chatbot, we tell them it is AI.", why: "In the EU, transparency duties for chatbots apply from Aug 2, 2026, and telling people is good practice everywhere.", how: "Put a clear line at the start of the chat, and give an easy route to a person." },
      { id: "biz-verify-claims", priority: "essential", text: "We check every fact, price, legal statement and customer quote that AI writes for us.", why: "Invented claims in marketing can mislead customers and create liability.", how: "Keep a source for each claim, and never publish a statistic you cannot trace." },
      { id: "biz-label-media", priority: "recommended", text: "We label AI-generated images, audio and video where rules or good practice require it.", why: "People increasingly expect it, and some rules require it.", how: "Add a short label and keep the original files." },
      { id: "biz-ip", priority: "recommended", text: "We have read the terms on who owns and may use AI output, and we avoid prompting with other people's copyrighted work.", why: "Ownership and licence terms differ by tool and by country.", how: "Check each tool's terms, and ask a qualified adviser for important cases." },
      { id: "biz-log", priority: "recommended", text: "We keep a simple log of important AI-assisted work: date, tool, purpose, reviewer.", why: "It helps you answer a customer or regulator, and fix a mistake.", how: "A shared spreadsheet is enough." },
    ],
  },
  {
    id: "biz-security",
    title: "Agents, connectors and security",
    summary: "The more access an AI has, the more a mistake or a trick can cost.",
    items: [
      { id: "biz-least-access", priority: "essential", text: "Any agent or connector gets the least access it needs, read-only where possible.", why: "An AI with full access to your mailbox or files can leak or delete a lot by mistake.", how: "Connect one folder or one mailbox first. Review the permissions it asks for.", guide: { href: "/learn/power-user/mcp-and-connectors", label: "MCP and connectors" } },
      { id: "biz-approve-actions", priority: "essential", text: "A person approves actions that send, pay, publish or delete before the AI performs them.", why: "Agents can misunderstand a task, and a sent email cannot be unsent.", how: "Use approval prompts, and do not switch them off to save time." },
      { id: "biz-untrusted-content", priority: "essential", text: "We treat web pages, emails and documents that an AI reads as untrusted, because they can contain hidden instructions.", why: "This is called prompt injection. An AI can follow instructions planted in content it reads.", how: "Do not let an agent with access to sensitive data read unknown content unsupervised.", guide: { href: "/learn/expert/prompt-injection-agent-security", label: "Prompt injection and agent security" } },
      { id: "biz-two-step", priority: "essential", text: "Every AI account, especially admin accounts, has two-step sign-in.", why: "A stolen admin account gives access to everything staff have shared.", how: "Require an authenticator app or passkey, not text messages if you can avoid them." },
      { id: "biz-offboarding", priority: "recommended", text: "When someone leaves, we remove their access to AI tools and connectors the same day.", why: "Forgotten accounts are an easy way in.", how: "Add AI tools to the leaver checklist." },
      { id: "biz-incident-plan", priority: "recommended", text: "We know what to do if someone pastes sensitive data into the wrong tool.", why: "Speed matters, and panic wastes it.", how: "Keep the steps on this page where staff can find them." },
    ],
  },
  {
    id: "biz-people",
    title: "People and fraud",
    summary: "Staff are your best defence when they know what to look for.",
    items: [
      { id: "biz-training", priority: "essential", text: "Staff have had a short training on safe AI use, and it is repeated for new joiners.", why: "In the EU, employers must support AI literacy for staff who use AI, from Feb 2, 2025. Elsewhere it is good practice.", how: "Thirty minutes on the policy, the never-paste list and scams is a good start." },
      { id: "biz-payment-check", priority: "essential", text: "Any change to bank details or an urgent payment request is confirmed on a known number, and a second person approves it.", why: "Cloned voices and AI-written emails make fake bosses and suppliers convincing.", how: "Never use contact details from the message itself." },
      { id: "biz-ask-freely", priority: "recommended", text: "Staff can ask about AI use and report mistakes without being blamed.", why: "People hide mistakes when they fear punishment, and the problem grows.", how: "Say it out loud, and thank the first person who reports one." },
    ],
  },
];

/** The three checklists, in tab order. */
export const AUDIENCES: readonly AudienceChecklist[] = [
  { id: "individuals", label: "For individuals", whoFor: "Anyone who uses a chatbot, an AI app or a voice assistant at home, at school or at work.", groups: INDIVIDUAL_GROUPS },
  { id: "schools", label: "For schools", whoFor: "Teachers, school leaders and the people who choose or oversee tools for pupils.", groups: SCHOOL_GROUPS },
  { id: "businesses", label: "For small businesses", whoFor: "Owners and managers of small teams who use AI for customers, content, code or admin.", groups: BUSINESS_GROUPS },
];