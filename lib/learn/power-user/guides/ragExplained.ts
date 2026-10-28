import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { PRACTITIONER_SOURCES } from "../../practitioner/practitionerSources";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const ragExplained: GuideRecord = {
  slug: "rag-explained",
  number: 19,
  level: "power-user",
  kind: "explainer",
  title: "RAG explained: making AI answer from your documents",
  metaDescription:
    "Retrieval-augmented generation in plain English: chunks, embeddings and retrieval, when RAG beats a long prompt, how it fails, and how to check its answers.",
  cardSummary: "Retrieval in plain English, embeddings, when RAG beats a long prompt, and failure modes.",
  summaryPoints: [
    "RAG finds the passages most relevant to your question, then asks the model to answer from them. It is an add-on around the model, not a different model.",
    "It helps most when your documents are too big for one prompt, or when you want answers tied to a source passage.",
    "If everything fits in the prompt and the model needs to see it all at once, a long prompt is simpler.",
    "RAG can retrieve the wrong passage and still sound sure. Check the cited passage, not just the answer.",
  ],
  sections: [
    {
      id: "why-rag",
      heading: "Why RAG exists",
      paragraphs: [
        "A model only knows what was in its training data up to a cutoff date, and it cannot see your private documents. The paper that introduced the name, from 2020, pointed to related weaknesses: models struggle to access and precisely use the knowledge stored in them, offer little evidence for where an answer came from, and are hard to update.",
        "Its proposal was to pair a language model with a searchable index of documents, so the model can draw on retrieved passages when it writes. The authors reported that this beat comparable approaches on several question-answering tests and produced more specific and factual text than a model without retrieval. That study tested the research systems of its time, so it explains the idea, not how today's products perform.",
      ],
      sourceIds: [SOURCES.lewisRag.id],
    },
    {
      id: "how-it-works",
      heading: "How it works in four steps",
      steps: [
        {
          title: "Split",
          detail: "Your documents are cut into short passages called chunks. Anthropic describes chunks as usually no more than a few hundred tokens.",
        },
        {
          title: "Embed",
          detail: "Each chunk is turned into a list of numbers, an embedding, that captures its meaning. These are stored in a searchable index.",
        },
        {
          title: "Find",
          detail: "Your question is turned into numbers too, and the chunks whose numbers are closest in meaning are retrieved.",
        },
        {
          title: "Answer",
          detail: "The model receives your question plus the retrieved chunks and writes an answer from them. A good setup also shows which chunks it used.",
        },
      ],
      sourceIds: [SOURCES.anthropicContextualRetrieval.id],
    },
    {
      id: "rag-vs-long-prompt",
      heading: "RAG or a long prompt?",
      paragraphs: [
        "If your material fits in the context window, you can often skip retrieval and paste it all in. Anthropic's guidance, written for its own models, says that a knowledge base under about 200,000 tokens, roughly 500 pages, can simply be included in the prompt. Windows differ by model, so check the current size in the model directory.",
      ],
      table: {
        caption: "Choosing between RAG and a long prompt (our rule of thumb)",
        columns: ["Situation", "Better fit", "Why"],
        rows: [
          ["One or two documents that fit in the window", "Long prompt", "Simpler, and nothing can be missed by retrieval"],
          ["Comparing two contracts clause by clause", "Long prompt", "The model needs to see both in full at once"],
          ["Hundreds of documents or a large archive", "RAG", "Too big for one prompt"],
          ["Many different questions over the same documents", "RAG", "You retrieve only what each question needs"],
          ["You need each answer tied to a source passage", "RAG", "Retrieved chunks give you something to check against"],
        ],
      },
      sourceIds: [SOURCES.anthropicContextualRetrieval.id],
    },
    {
      id: "how-it-fails",
      heading: "How RAG fails",
      paragraphs: [
        "RAG adds a step that can go wrong before the model writes anything. The failures below are the ones to look for.",
      ],
      bullets: [
        "A chunk loses its context. Anthropic gives the example of a sentence about revenue growth that does not name the company or the period, which makes it hard to retrieve or use correctly.",
        "Meaning-based search misses exact terms. Anthropic notes that embeddings can miss exact matches such as error codes, and that keyword search is often combined with them.",
        "It retrieves the wrong passage and the answer still sounds sure. The model writes fluent text from whatever it was given.",
        "The answer is not in your documents, and the model guesses instead of saying so.",
        "The documents are out of date, or a chunk is cut so that the key sentence is missing.",
      ],
      sourceIds: [SOURCES.anthropicContextualRetrieval.id],
    },
    {
      id: "long-context-trap",
      heading: "A caution about retrieving too much",
      paragraphs: [
        "It is tempting to retrieve many chunks to be safe. But more text is not always better for the model. A 2023 preprint found that models often used information in the middle of a long input less reliably than information at the start or end. It tested older models, so treat it as a reason to check rather than a current ranking. Retrieve a small number of good chunks and look at which ones were used.",
      ],
      sourceIds: [PRACTITIONER_SOURCES.liuLostInTheMiddle.id],
    },
    {
      id: "check-routine",
      heading: "A routine for trusting a RAG answer",
      steps: [
        {
          title: "Ask for the source passage",
          detail: "Request the exact quote and where it came from. If the tool cannot show it, treat the answer as unverified.",
        },
        {
          title: "Open the passage yourself",
          detail: "Check that it says what the answer claims, and read the sentences around it.",
        },
        {
          title: "Test a question you know the answer to",
          detail: "Before you rely on a setup, ask questions where you already know the right answer, including one whose answer is not in the documents.",
        },
        {
          title: "Check the dates",
          detail: "Confirm the document is the current version, and say so in the question if the date matters.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "answer-from-documents",
      title: "Answer only from the documents",
      whenToUse: "When you ask questions over your own documents or search results.",
      text: "Answer only from the documents I have provided. Quote the exact sentence that supports each point and name its source. If the documents do not contain the answer, say 'not in the documents' instead of guessing.",
    },
    {
      id: "disagreement-check",
      title: "Look for conflicts between sources",
      whenToUse: "When several documents may say different things.",
      text: "Compare what each document says about [topic]. List any points where they disagree, with a quote from each, and say which document is newer.",
    },
    {
      id: "retrieval-test",
      title: "Write test questions for a setup",
      whenToUse: "Before you rely on a RAG tool for real work.",
      text: "Based on the text below, write eight questions: five whose answers are clearly in the text, two that are partly covered, and one that is not covered at all. Give the correct answer or 'not covered' for each. [paste a short excerpt]",
    },
  ],
  whatCanGoWrong: [
    "Trusting a confident answer built from the wrong passage.",
    "Assuming 'answered from your documents' means every claim in the answer is in your documents. Ask for quotes.",
    "Uploading confidential documents to a tool without checking where the data goes and how long it is kept.",
    "Letting documents go out of date while the tool keeps answering from the old version.",
    "Using RAG when a long prompt would be simpler, and adding a step that can fail.",
  ],
  limitsNote:
    "Do not rely on a RAG answer alone for medical, legal or financial decisions. Check the source passage and ask a qualified professional.",
  showPriceNotice: false,
  sources: [SOURCES.lewisRag, SOURCES.anthropicContextualRetrieval, PRACTITIONER_SOURCES.liuLostInTheMiddle],
  relatedSlugs: ["context-windows-tokens-memory", "summarize-pdf-with-ai", "fact-check-ai-answers", "mcp-and-connectors"],
  relatedLinks: [LINKED_PAGES.tokenEstimator, LINKED_PAGES.modelDirectory, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
