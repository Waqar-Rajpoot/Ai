import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES } from "../../foundations/foundationsSources";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const summarizePdfWithAi: GuideRecord = {
  slug: "summarize-pdf-with-ai",
  number: 9,
  level: "practitioner",
  kind: "guide",
  title: "How to summarize a PDF or long document with AI",
  metaDescription:
    "How chatbots read PDFs, why scanned pages and charts can be missed, how to ask for a summary you can verify with page numbers, and what to keep private.",
  cardSummary: "Get a summary you can check: page references, missing-section checks and privacy basics.",
  summaryPoints: [
    "A chatbot may read only the text of a PDF. Charts, images and scanned pages can be skipped, depending on the tool and plan.",
    "Ask for page references, then open those pages for the numbers and quotes you will rely on.",
    "Long documents are harder: research found that models use information in the middle of a long input less reliably than information at the start or end.",
    "Remove private details before you upload, and treat a summary of a contract or medical document as a way to get oriented, not a decision.",
  ],
  sections: [
    {
      id: "how-tools-read-pdfs",
      heading: "How chatbots actually read a PDF",
      paragraphs: [
        "Providers describe different behaviour, and it changes, so check your tool's help page. Two examples show why it matters.",
        "Anthropic's help page says that for chat uploads Claude analyses both text and visual elements such as charts and images in PDFs up to 100 pages. For PDFs from 101 to 1,000 pages it processes text only, and over 1,000 pages the upload is rejected. It also says non-PDF documents are read for text only.",
        "OpenAI's file upload FAQ says that on plans other than Enterprise, ChatGPT uses text-based retrieval only: images are discarded and only digital text is extracted. A scanned page is a picture of text, so by the same logic it may contain no digital text to extract. OpenAI does not address scans directly, so test this yourself with a page you know.",
      ],
      table: {
        caption: "What two providers say about PDFs (check current help pages, because limits change)",
        columns: ["Question", "Claude (Anthropic help page)", "ChatGPT (OpenAI help page)"],
        rows: [
          ["Charts and images inside PDFs", "Read for PDFs up to 100 pages in chat", "Not read on plans other than Enterprise. Only digital text is extracted"],
          ["Very long PDFs", "Text only from 101 to 1,000 pages. Rejected above that", "Text and document files are capped at 2 million tokens per file"],
          ["Upload allowances", "Chat limit of 20 files per chat", "Limits vary by plan, and free users have a small daily upload allowance"],
        ],
      },
      sourceIds: [SOURCES.claudeUploads.id, SOURCES.openaiFileUploads.id],
    },
    {
      id: "long-documents",
      heading: "Why long documents need extra care",
      paragraphs: [
        "A study of how language models use long inputs found that performance was often highest when the relevant information was at the beginning or end, and dropped significantly when it was in the middle, even for models built for long contexts. It is a 2023 preprint on older models, so the gap may be smaller today, but it is a good reason not to trust a one-shot summary of a 200-page report.",
        "The practical fix is to work in pieces. Summarise chapter by chapter, then ask for a summary of the summaries, and check the middle chapters hardest.",
      ],
      sourceIds: [SOURCES.liuLostInTheMiddle.id],
    },
    {
      id: "privacy-first",
      heading: "Before you upload: privacy",
      paragraphs: [
        "The UK National Cyber Security Centre advises not to include sensitive information in queries to public chatbots, and notes that the query is visible to the organisation providing the service. Treat a PDF upload the same way.",
      ],
      bullets: [
        "Remove or black out names, addresses, account numbers, ID numbers and medical details you do not need the summary to include.",
        "Do not upload documents covered by a confidentiality agreement unless your employer has approved the specific tool.",
        "Check the data setting for your plan. Our guide on what never to share explains where each switch is.",
      ],
      sourceIds: [FOUNDATIONS_SOURCES.ncscChatbots.id],
    },
    {
      id: "six-step-method",
      heading: "A summary you can verify, in six steps",
      steps: [
        {
          title: "Check that the PDF has real text",
          detail: "Open it and try to select a sentence with your cursor. If you cannot, it is probably a scan, and a chatbot may see nothing or guess. Run optical character recognition (OCR) first, or use a tool that states it reads scanned pages.",
        },
        {
          title: "Say what the summary is for",
          detail: "A summary for a decision, a briefing or exam revision looks different. Tell the AI who will read it and what they need to do afterwards.",
        },
        {
          title: "Ask for a structure and for page references",
          detail: "Request headings, key figures and the page where each point appears. Anthropic's help page advises using the page numbers shown in your PDF viewer, not the numbers printed on the page, when referring to specific pages.",
        },
        {
          title: "Open the cited pages for anything important",
          detail: "Check every number, date, name and quote you will use against the original. A summary that sounds right can swap two figures or drop a condition.",
        },
        {
          title: "Ask what the summary left out",
          detail: "Request a list of sections or tables the summary did not use, and read those yourself. This also catches the middle-of-the-document problem.",
        },
        {
          title: "Split very long files",
          detail: "Anthropic's help page recommends splitting large files into smaller sections to stay within limits. Do the same when a document seems to be handled badly.",
        },
      ],
      sourceIds: [SOURCES.claudeUploads.id, SOURCES.liuLostInTheMiddle.id],
    },
    {
      id: "document-types",
      heading: "What to expect from different kinds of document",
      table: {
        caption: "Where summaries work well and where to be careful",
        columns: ["Document", "Useful for", "Be careful about"],
        rows: [
          ["Research paper or report", "Finding the question, method and main result so you can decide whether to read it", "Numbers, sample sizes and the limitations section"],
          ["Meeting notes or transcript", "Decisions, owners and next steps", "Who said what. Check names against the transcript"],
          ["Contract, lease or terms", "A plain-language map of the sections", "Dates, fees, penalties and exceptions. Read these in the original, and ask a professional for anything binding"],
          ["Medical or test report", "Preparing questions for your clinician", "Any interpretation. Do not make health decisions from a chatbot summary"],
          ["Scanned or photographed pages", "Nothing until the text has been extracted", "Missing or guessed content"],
        ],
      },
    },
  ],
  prompts: [
    {
      id: "structured-summary",
      title: "Structured summary with page references",
      whenToUse: "For any report or paper. Upload the PDF first.",
      text: "Summarise the attached document for [reader and purpose]. Use these headings: purpose, key findings, key numbers, limitations, and what the reader should do next. After each point, give the page number from the PDF viewer where it appears. If something is not in the document, write not stated instead of guessing.",
    },
    {
      id: "numbers-table",
      title: "Pull out the numbers",
      whenToUse: "When you need figures you will check and reuse.",
      text: "List every figure, date and percentage in the attached document as a table with three columns: the value, what it measures, and the page it appears on. Quote the exact sentence for each. Do not round or convert anything.",
    },
    {
      id: "what-was-left-out",
      title: "What did the summary miss?",
      whenToUse: "Straight after you get a summary.",
      text: "List the sections, tables and appendices of the document that your summary did not use, with page numbers. For each, say in one line what it contains and whether it could change the conclusions.",
    },
    {
      id: "plain-language-section",
      title: "Explain one section simply",
      whenToUse: "When one section is hard to follow.",
      text: "Explain pages [start] to [end] of the attached document in plain language for someone with no background in [field]. Keep technical terms but define each one in a short phrase. Point out anything you are unsure about.",
    },
    {
      id: "questions-for-author",
      title: "Questions to ask the author or an expert",
      whenToUse: "For a contract, report or paper you need to act on.",
      text: "Based on the attached document, list ten questions I should ask [the author, my adviser or a professional in this field] before acting on it. Put the most important first and cite the page each question comes from.",
    },
  ],
  whatCanGoWrong: [
    "The tool never saw your charts, images or scanned pages, so the summary describes only part of the document.",
    "The summary swaps, rounds or drops a figure, or leaves out a condition that changes the meaning.",
    "Page numbers are wrong because the chatbot used the printed page number and not the one in your PDF viewer.",
    "A confident summary hides the fact that the middle of a long document was handled poorly.",
    "You uploaded a document with private or confidential details to a tool you were not allowed to use.",
  ],
  limitsNote:
    "A summary is a reading aid. For contracts, medical reports, tax and legal papers, read the original and ask a qualified professional before you act.",
  sources: [
    SOURCES.claudeUploads,
    SOURCES.openaiFileUploads,
    SOURCES.liuLostInTheMiddle,
    FOUNDATIONS_SOURCES.ncscChatbots,
  ],
  relatedSlugs: ["fact-check-ai-answers", "never-share-with-ai-chatbot", "how-ai-chatbots-work"],
  relatedLinks: [LINKED_PAGES.privacyMatrix, LINKED_PAGES.freePlanLimits],
  lastReviewed: "2026-10-27",
  published: true,
};
