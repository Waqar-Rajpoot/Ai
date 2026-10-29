import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK, HOW_WE_TEST_LINK } from "../links";

export const studentsRoundup: BestForRoundup = {
  slug: "students",
  label: "Students",
  level: "Level 2",
  question: "Which AI tool helps me study without doing the work for me?",
  description:
    "Tools and plans ranked on study tasks, with school-policy and honesty notes.",
  metaTitle: "Best AI tools for students",
  metaDescription:
    "AI tools and plans for students: free tiers, study modes, student offers that change, and how to use AI honestly. Picks follow our study tests and plan checks.",
  quickAnswer:
    "We are not naming a student pick yet. It depends on study tasks and plan prices, and student offers change often and conflict between sources. What we can say: the major chat apps have free plans, several offer a guided study or learning mode, and a free plan is enough for many students. Third-party roundups report that discounts come and go, so check the provider's page before you pay anything.",
  whoItIsFor: [
    "School and university students who want help understanding, not just answers.",
    "Parents comparing free and paid plans.",
    "Anyone studying alone who wants practice questions and feedback.",
  ],
  startingPointIds: [],
  startingPointsNote:
    "Student picks depend on study tasks and plan prices, which we test and check before ranking. No pick is shown yet.",
  modelRoleNotes: {},
  candidates: [
    {
      name: "ChatGPT (Free)",
      maker: "OpenAI",
      role: "General study helper with a guided study mode",
      reportedFacts: [
        "A study mode that works like a tutor is reported on the free plan (third-party roundup, 2026).",
        "OpenAI's 2025 student discount is reported to have ended, with no standing student plan (third-party roundups, mid-2026).",
      ],
      watchOut: "Free usage limits can stop a long study session.",
    },
    {
      name: "Claude (Free)",
      maker: "Anthropic",
      role: "Long documents and writing feedback",
      reportedFacts: [
        "Third-party roundups report a free plan with a learning mode and long-document handling.",
        "Roundups report no public individual student discount. Universities can buy education access.",
      ],
      watchOut: "Free usage runs on a rolling limit, so a heavy session can hit it.",
    },
    {
      name: "Gemini",
      maker: "Google",
      role: "Works inside Google Docs, Sheets and Gmail",
      reportedFacts: [
        "Third-party roundups report that earlier free student offers ended in early 2026 and that discounted student pricing exists in some regions.",
        "Roundups report ads in the free app for US users since February 2026.",
      ],
      watchOut: "Offers differ by country and date. Confirm on Google's page.",
    },
    {
      name: "NotebookLM and Perplexity",
      maker: "Google and Perplexity",
      role: "Study from your own notes, and cited research",
      reportedFacts: [
        "NotebookLM is reported as a free tool that answers from documents you upload.",
        "Perplexity is reported to offer student pricing and a study mode with citations.",
      ],
      watchOut: "Check each citation yourself. A cited answer can still be wrong.",
    },
    {
      name: "GitHub Copilot Student",
      maker: "GitHub",
      role: "Coding help for verified students",
      reportedFacts: [
        "A Copilot Student plan launched in March 2026 and is reported as free for verified students (third-party roundups).",
        "Some premium models were reported moved to automatic selection only (March 2026).",
      ],
      watchOut: "Verification is required, and plan details change.",
    },
  ],
  candidatesNote:
    "Tools to test, with facts reported by third-party roundups in 2026. These sources conflict in places, so each offer is a lead to confirm on the provider's own page. We have not tested these ourselves.",
  decisionGuide: [
    {
      situation: "You want to understand a topic, not just get the answer.",
      advice: "Use a study or learning mode and ask the tool to quiz you. Then explain the idea back in your own words.",
    },
    {
      situation: "You work with long readings or lecture slides.",
      advice: "Try a tool that answers from your own uploaded notes, and check its answers against the source pages.",
    },
    {
      situation: "You are on a tight budget.",
      advice: "Start with free plans. Combine one or two, and look for a verified student offer before paying full price.",
    },
    {
      situation: "You code for class.",
      advice: "Check whether a verified-student coding plan is available, and follow your course's rules on AI help.",
    },
    {
      situation: "Your school has an AI policy.",
      advice: "Read it first. If it is unclear, ask your teacher before you use AI on graded work.",
    },
  ],
  reportedFigures: [],
  glossary: [
    {
      term: "Study or learning mode",
      meaning: "A setting where the tool asks questions and gives hints instead of handing over the answer.",
      caution: "It only helps if you answer the questions yourself.",
    },
    {
      term: "Verified-student offer",
      meaning: "A discount you unlock by proving enrolment, often through a school email or a verification service.",
      caution: "Offers change and vary by country. Be wary of sites selling codes. Several roundups warn about scams.",
    },
    {
      term: "Training opt-out",
      meaning: "A setting that stops your chats being used to improve models.",
      caution: "Turn it off before you paste coursework, and never paste other people's private data.",
    },
  ],
  howWeWillRank: [
    "Study tasks such as explaining a topic, making practice questions and checking an answer.",
    "Whether the tool teaches the idea or only hands over the answer.",
    "Free-plan limits and the price of paid plans, checked on the provider's page.",
    "Privacy settings that matter to students, such as training opt-out.",
  ],
  selfTest: [
    { title: "Pick one topic you find hard", detail: "Choose something from this week's course." },
    { title: "Ask each tool to teach it", detail: "Use the same request: 'Explain this, then ask me three questions.'" },
    { title: "Answer the questions yourself", detail: "Note which tool's questions made you think and gave useful feedback." },
    { title: "Check one claim against your textbook", detail: "If the tool is wrong, note how it handled being corrected." },
    { title: "Note the limit", detail: "See how long a free plan lasts in a real session." },
  ],
  tips: [
    "Ask for practice questions, then answer before you look at the solution.",
    "Keep your own notes. Do not let the tool become the only record of what you learned.",
    "Cite AI help when your school requires it.",
  ],
  commonMistakes: [
    "Pasting an assignment and submitting the answer as your own work.",
    "Trusting a fluent explanation without checking a source.",
    "Buying a student code from a stranger.",
  ],
  keepInMind: [
    "Check your school's AI policy before you use any tool for graded work.",
    "AI can be wrong. Check facts against your course material.",
    "Student offers change quickly. Treat every price here as a lead to verify.",
  ],
  faq: [
    { question: "Is there a free AI tool good enough for school?", answer: "Several free plans are reported to cover explanations, drafts and practice questions. Limits apply, so a long session may stop." },
    { question: "Is there an official student discount?", answer: "It varies by company and date, and sources conflict. Check the provider's own pricing page." },
    { question: "Will using AI count as cheating?", answer: "That depends on your school's rules. Read the policy and ask your teacher if it is unclear." },
    { question: "How do I use AI without cheating myself?", answer: "Use it to quiz you, explain ideas and check your reasoning. Do the thinking yourself." },
  ],
  sources: [
    { name: "Leland: AI student discounts", url: "https://www.joinleland.com/library/a/ai-student-discounts", note: "Third-party roundup (2026). Reports no public student discount for some providers. Offers change." },
    { name: "Dupple: ChatGPT for students", url: "https://dupple.com/learn/chatgpt-for-students", note: "Third-party roundup (2026). Reports on student tools and free tiers. Some details conflict with other sources." },
  ],
  related: [
    { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
    { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
    { href: "/prices/free-limits", label: "Free-plan limits" },
    { href: "/prices/privacy", label: "Privacy matrix" },
    HOW_WE_TEST_LINK,
    DIRECTORY_LINK,
  ],
};