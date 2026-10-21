import type { DefinitionItem, FaqItem } from "./compareStandards";

/** Blueprint 5.3: the sections of every roundup page. */
export const ROUNDUP_TEMPLATE_SECTIONS: readonly DefinitionItem[] = [
  { id: "summary", term: "Summary box", description: "A top pick, a runner-up and a budget pick, so you get the answer before you scroll." },
  { id: "chose", term: "How we chose", description: "The tests and sources behind the ranking, with the test date." },
  { id: "ranked", term: "Ranked list", description: "Each model with why it ranks there, its price, and a link to its full review." },
  { id: "skip", term: "Who should skip each", description: "A plain note on who is better served by a different pick." },
  { id: "cost", term: "Cost per task", description: "What a typical task costs on each model, not only the price per token." },
  { id: "changed", term: "What changed since last review", description: "New models, price changes and movements in the ranking since the last monthly review." },
  { id: "superseded", term: "Superseded models", description: "Models that have been replaced, each linking to its successor instead of being deleted." },
];

/** Blueprint 5.3 "How we rank": by use case, test date, verified-on. */
export const HOW_WE_RANK: readonly DefinitionItem[] = [
  { id: "use-case", term: "By use case", description: "Each roundup answers one question, such as coding or local use. Ranking by use case ages better than one overall score and matches what readers are trying to decide." },
  { id: "test-date", term: "Test date", description: "Every ranking shows when our own tests ran, with the model version and effort setting. A ranking without a test date is a lead, not a result." },
  { id: "verified-on", term: "Verified-on", description: "Every price and fact shows the date it was checked against the provider's own page." },
  { id: "scorecard", term: "Same scorecard for every model", description: "Rankings use the seven-point scorecard, so a model cannot win by being tested on easier tasks." },
  { id: "labels", term: "Labelled results", description: "Each number is marked as tested by us, independent third party or vendor-reported. Vendor numbers never share a column with independent ones." },
  { id: "cost", term: "Cost per task, not price per token", description: "A cheap token price can still cost more per task if a model needs more tokens to finish." },
];

export const RANKING_LIMITS: readonly string[] = [
  "A ranking is a shortlist. Your own tasks may favour a different model.",
  "A ranking is one test on one day. Models and settings change.",
  "Starting points on this page come from the model directory. They are not final rankings.",
  "Payment, affiliate links and sponsorship never change a position.",
];

/** Blueprint 6.4: how often roundups are touched. */
export const ROUNDUP_UPDATE_RULES: readonly DefinitionItem[] = [
  { id: "monthly", term: "Every month", description: "Every best-for page is reviewed during the first week of the month." },
  { id: "launch", term: "A new model launches", description: "Roundups the model could affect are re-read, and any replaced model is marked superseded." },
  { id: "price", term: "A price, plan or limit changes", description: "A price-change note is published within 24 hours, then costs per task are updated." },
  { id: "quarter", term: "Every quarter", description: "The full test battery is re-run, so rankings rest on fresh results." },
];

export const SUPERSEDED_RULES: readonly string[] = [
  "A replaced model is marked Superseded. It is not deleted.",
  "The page links to the successor, so old links and search results still help.",
  "A superseded model never keeps a top pick, runner-up or budget pick.",
  "The 'What changed since last review' box says when and why a model moved.",
];

export const BEST_FOR_FAQ: readonly FaqItem[] = [
  { id: "why-no-picks", question: "Why do some roundups show no starting points?", answer: "Where the model directory has no fair basis for a pick, such as writing, students, small business, image and video, we wait for our own tests instead of guessing.", link: { label: "How we test", href: "/about/how-we-test" } },
  { id: "starting-points", question: "Are the starting-point models the final ranking?", answer: "No. They come from the 'best for' labels and scores in the model directory. The final order, with reasons and costs, appears on each roundup after our test run.", link: { label: "Open the model directory", href: "/compare/models" } },
  { id: "overall", question: "Why not just use the highest-scoring model?", answer: "A composite score can hide weak spots. A cheaper or more specialised model often wins on the one job you care about, which is why roundups are split by use case." },
  { id: "fresh", question: "How do I know a roundup is current?", answer: "Look for the test date and the verified-on date at the top. Roundups are reviewed monthly, and a replaced model is marked superseded." },
  { id: "image-video", question: "Why are there image and video roundups when the directory lists only text models?", answer: "Many readers ask which tool makes the best pictures or clips. Those tools need their own tests, so the roundups stay empty of picks until the tests are done." },
  { id: "pay", question: "Can a maker or sponsor pay for a better position?", answer: "No. Payment never changes a score or verdict, affiliate links are always disclosed, and sponsored content is kept apart from reviews.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { id: "disagree", question: "A roundup disagrees with a maker's own claims. Which should I trust?", answer: "Maker numbers are labelled vendor-reported and kept apart from independent and tested results. Treat them as a lead to check.", link: { label: "How to read an AI benchmark", href: "/learn/expert/how-to-read-ai-benchmark" } },
  { id: "own-test", question: "Can I check a ranking against my own tasks?", answer: "Yes, and you should. Pick ten real tasks, score them on two or three shortlisted models, and compare.", link: { label: "Build your own AI test set", href: "/learn/power-user/build-your-own-ai-test-set" } },
];