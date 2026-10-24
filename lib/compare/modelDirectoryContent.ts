import type { DefinitionItem, FaqItem } from "./compareStandards";

export const READING_TIPS: readonly DefinitionItem[] = [
  { id: "shortlist", term: "A score is a shortlist, not a verdict", description: "A composite score helps you decide which models to try. It cannot tell you which one is best for your own tasks." },
  { id: "list-prices", term: "Prices are list prices", description: "US dollars per million tokens, input first and then output. Extra conditions, such as off-peak pricing, are noted under the price." },
  { id: "intro-rates", term: "Intro-rate end dates", description: "Some prices are introductory. The end date is shown under the price, so check what the model costs afterwards." },
  { id: "context", term: "Context is shown as written", description: "Sizes differ by variant, and one is not confirmed. 1M means about one million tokens of text at once." },
];

export const COLUMN_GUIDE: readonly DefinitionItem[] = [
  { id: "model", term: "Model", description: "The named model. Where a name covers two variants, the row says which one a number applies to." },
  { id: "maker", term: "Maker", description: "The company that builds and sells the model." },
  { id: "price", term: "API price, in / out per 1M tokens", description: "What the API charges for text sent in and text written back, per million tokens. This is not a chat subscription price." },
  { id: "context", term: "Context", description: "How much text the model can take in at once. See the glossary entry for context window." },
  { id: "benchlm", term: "BenchLM score", description: "An independent composite score. 'est.' marks an estimate. 'Not in top 25' means no score is shown, which is not a judgement on the model." },
  { id: "best-for", term: "Best for", description: "A short label for the use the model is listed for. It is a starting point, not a test result." },
  { id: "review", term: "Review", description: "A link to our own review once it is published. 'Review coming' means it has not been tested yet." },
];

export const SUBSCRIPTION_VS_API_NOTE =
  "Every price in this table is an API price, billed per token. A chat subscription, such as a monthly plan for a chat app, is a separate flat price and does not include API use.";

export const RANKING_CHECKS: readonly string[] = [
  "The vote count for each model. A model with few votes has a shaky position.",
  "The statistical margin. A gap smaller than the margin is a tie, not a ranking.",
  "Whether the gap you care about is bigger than the margin.",
  "Who runs the arena, and whether its method is published.",
];

export const UPDATE_RULES: readonly DefinitionItem[] = [
  { id: "launch", term: "A model launches", description: "A row is added, and a short 'What changed and should you care?' post follows within 48 hours." },
  { id: "price", term: "A price, plan or limit changes", description: "A price-change note is published within 24 hours, then the tables are updated." },
  { id: "tested", term: "We finish testing a model", description: "A full review with scorecard and test date follows within 7 days." },
  { id: "weekly", term: "Every week", description: "Prices are re-checked on each provider's pricing page, and introductory rates ending within 30 days are flagged." },
];

export const DIRECTORY_FAQ: readonly FaqItem[] = [
  { id: "benchlm", question: "What does the BenchLM score measure?", answer: "It is an independent composite score published by BenchLM, read on the date shown at the top of the page. It combines results into one number so you can shortlist models. For how the composite is built, see BenchLM's own method page." },
  { id: "higher-better", question: "Is a higher score always better for me?", answer: "No. A composite can hide that a model is weak at the one thing you need. Use it to pick two or three models to try, then run your own tasks.", link: { label: "Build your own AI test set", href: "/learn/power-user/build-your-own-ai-test-set" } },
  { id: "not-top-25", question: "Why do some models show 'Not in top 25'?", answer: "Those models were not among the top 25 in the snapshot we read, so no score is shown. That does not make them poor. Judge them on price, context and your own tests." },
  { id: "est", question: "What does 'est.' mean next to a score?", answer: "The score is an estimate, not a figure published directly. Treat it as rough until it is confirmed." },
  { id: "chat-price", question: "Why are these prices different from what I pay in a chat app?", answer: "A chat app charges a flat monthly plan. The API charges per token. They are separate products with separate prices.", link: { label: "Consumer plan prices", href: "/prices/plans" } },
  { id: "intro-rate", question: "What is an intro rate?", answer: "A temporary lower price. The end date is shown under the price. After it ends, the list price may be higher, so check the provider's page before you build something on it." },
  { id: "review-coming", question: "Why do the review links say 'Review coming'?", answer: "We publish a full review only after our own test run. Until then, the directory shows independent scores only.", link: { label: "How we test", href: "/about/how-we-test" } },
  { id: "pay-to-rank", question: "Can a maker pay to change its position?", answer: "No. Payment, affiliate links and sponsorship never change a score or verdict.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { id: "update", question: "How often is the table updated?", answer: "On any model launch or price change, and prices are re-checked every week. The update rules are listed below on this page." },
];