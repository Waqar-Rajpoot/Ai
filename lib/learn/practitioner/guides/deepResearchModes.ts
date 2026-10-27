import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const deepResearchModes: GuideRecord = {
  slug: "deep-research-modes",
  number: 12,
  level: "practitioner",
  kind: "guide",
  title: "Deep research modes: how to use them and check the sources",
  metaDescription:
    "How deep research modes in ChatGPT, Gemini and Claude work, how to write a good research brief, how to audit the citations, and when a normal chat is better.",
  cardSummary: "Write a tight brief, edit the plan, then audit the report's sources before you rely on it.",
  summaryPoints: [
    "Deep research modes search many sources and write a report with links. They take more time than a normal chat and are meant for questions that need reading widely.",
    "The links let you verify the report. They do not verify it for you. Open the sources behind every claim that matters.",
    "Write a narrow brief, edit the research plan if the tool offers one, and be careful which connected accounts the tool may search.",
    "For a quick fact or a short answer, a normal chat or a web search is usually faster.",
  ],
  sections: [
    {
      id: "what-they-are",
      heading: "What deep research modes are",
      paragraphs: [
        "A deep research mode is a setting where the chatbot plans a research task, runs many searches, reads what it finds and writes a longer report. The three major providers describe it differently, and features, limits and plans change, so use the table as a snapshot and check each help page.",
      ],
      table: {
        caption: "What each provider's help page says (as read on 27 October 2026)",
        columns: ["", "ChatGPT deep research", "Gemini Deep Research", "Claude Research"],
        rows: [
          ["How you start it", "Describe the outcome you want, optionally choose websites or files", "Choose Deep Research from the Add Files menu, then submit your question", "Choose Research from the plus menu in a chat. Web search must be on"],
          ["Plan step", "ChatGPT proposes a plan you can edit before it begins", "Gemini creates a plan and you can choose Edit plan before starting", "Searches build on each other and Claude decides what to look into next. The help page does not describe a plan step"],
          ["Sources it can use", "The web, plus selected sites, files and supported apps", "Google Search by default, and Gmail, Drive, uploaded files and NotebookLM notebooks if you add them", "The web and your connected tools, such as Gmail, Calendar and Docs, if enabled"],
          ["What you get", "A structured report with citations or source links, downloadable as Markdown, Word or PDF", "A written report, usually in about 5 to 10 minutes. It can be exported to Docs", "A comprehensive response. The help page does not describe the format"],
          ["Availability", "Depends on your plan and country or territory", "Signed in and 18 or older, with daily limits", "Paid plans, on web, desktop and mobile"],
        ],
      },
      sourceIds: [SOURCES.openaiDeepResearchFaq.id, SOURCES.geminiDeepResearch.id, SOURCES.claudeResearch.id],
    },
    {
      id: "links-are-not-verification",
      heading: "The links let you verify. They do not verify",
      paragraphs: [
        "OpenAI's FAQ says deep research outputs include citations or source links so you can verify the information. That puts the checking in your hands. The help pages we read for Gemini and Claude do not give advice on verifying the results either.",
        "Independent studies show why checking matters. In a public-broadcaster study of AI assistants answering news questions, references were missing or misleading in 31% of cases. A Stanford study of legal research tools counted a response as a hallucination if it falsely claimed that a source supports a statement, and still found rates of about 17% to 33% for the tools it tested. Neither study tested these deep research modes, so we cannot give you an error rate for them. They show the type of mistake to look for.",
      ],
      sourceIds: [SOURCES.openaiDeepResearchFaq.id, SOURCES.ebuNewsIntegrity.id, SOURCES.stanfordLegalHallucination.id],
    },
    {
      id: "research-steps",
      heading: "A research routine that works",
      steps: [
        {
          title: "Decide if you need it",
          detail: "OpenAI says that for quick lookups or short conversations standard chat may be faster. Use deep research for questions that need many sources, such as comparing options or surveying a topic.",
        },
        {
          title: "Write a narrow brief",
          detail: "State the question, the purpose, the region and date range, the kinds of source you trust (official statistics, peer-reviewed studies, company filings) and what to exclude. A vague question gets a long, generic report.",
        },
        {
          title: "Edit the plan before it starts",
          detail: "ChatGPT and Gemini both let you edit the plan first. Remove sub-questions you do not need and add the ones that matter. It is much cheaper to fix the plan than the report.",
        },
        {
          title: "Check which accounts it can search",
          detail: "Gemini can use Gmail and Drive if connected, and Claude's help page says Research uses connected tools without asking for approval each time. If your question does not need your own email or files, leave those connections off.",
        },
        {
          title: "Audit the sources",
          detail: "Pick the five or ten claims the conclusion rests on. For each, open the cited page and find the sentence that supports it. Our fact-checking guide has the full routine.",
        },
        {
          title: "Check balance and dates",
          detail: "Look for missing viewpoints, weak sources such as forums or marketing pages, and out-of-date figures. Ask the tool to search again for the opposite view.",
        },
        {
          title: "Write your own conclusion",
          detail: "Use the report to build your own understanding and cite the original sources, not the AI report, in anything you publish or submit.",
        },
      ],
      sourceIds: [SOURCES.openaiDeepResearchFaq.id, SOURCES.geminiDeepResearch.id, SOURCES.claudeResearch.id],
    },
    {
      id: "source-quality",
      heading: "How to judge the sources it found",
      bullets: [
        "Primary sources (laws, court records, official statistics, original studies, company filings) are stronger than articles that describe them.",
        "Several citations that all trace back to one original are one source, not several.",
        "Check dates. A statistic from several years ago may be superseded.",
        "Be cautious about sources written to sell something, such as product pages and affiliate sites.",
        "If the report states a figure with no link, treat it as unverified until you find it yourself.",
      ],
    },
  ],
  prompts: [
    {
      id: "research-brief",
      title: "Write a research brief",
      whenToUse: "Before you start a deep research run, to make the question precise.",
      text: "I want a research report on [question]. Purpose: [what I will use it for]. Region and period: [for example the United States, the last five years]. Prefer these source types: [official statistics, peer-reviewed studies, original documents]. Exclude: [for example marketing pages and opinion pieces]. Include a short section on where sources disagree and a list of every source with its publication date.",
    },
    {
      id: "claims-table",
      title: "Claims table with quotes",
      whenToUse: "After the report, to make checking easy.",
      text: "Turn the report's five most important conclusions into a table with columns: claim, source link, and the exact sentence from the source that supports it. If you cannot quote supporting text, write not found.",
    },
    {
      id: "opposite-view",
      title: "Search for the opposite view",
      whenToUse: "To test whether the report is one-sided.",
      text: "Search for credible evidence that contradicts or complicates the main conclusion of your report. Summarise the strongest counter-argument, say who makes it, and link the sources.",
    },
    {
      id: "weak-sources",
      title: "Rate the sources",
      whenToUse: "When the report cites many websites.",
      text: "List the sources you cited and label each as primary, secondary or commercial. Point out any source that appears to depend on another source in your list, and any whose date is older than [number] years.",
    },
    {
      id: "what-would-change",
      title: "What would change the answer?",
      whenToUse: "At the end, before you decide.",
      text: "What new information or event would change the conclusion of your report? List the three most important unknowns and where I could look for each.",
    },
  ],
  whatCanGoWrong: [
    "Treating a long, well-formatted report as reliable because it looks thorough.",
    "Citations that exist but do not support the claim, or sources that all copy each other.",
    "A connected email or document account being searched when the question did not need it.",
    "A vague brief that produces a broad report that answers a different question from the one you asked.",
    "Running into usage limits. Claude's help page says Research sessions can use up limits faster than ordinary chats, and Gemini applies daily and simultaneous request limits.",
  ],
  limitsNote:
    "Deep research is a starting point for your own reading. For medical, legal or financial decisions, use official sources and a qualified professional.",
  showPriceNotice: true,
  sources: [
    SOURCES.openaiDeepResearchFaq,
    SOURCES.geminiDeepResearch,
    SOURCES.claudeResearch,
    SOURCES.ebuNewsIntegrity,
    SOURCES.stanfordLegalHallucination,
  ],
  relatedSlugs: ["fact-check-ai-answers", "how-ai-chatbots-work", "summarize-pdf-with-ai"],
  relatedLinks: [LINKED_PAGES.bestModelByJob, LINKED_PAGES.consumerPlans],
  lastReviewed: "2026-10-27",
  published: true,
};
