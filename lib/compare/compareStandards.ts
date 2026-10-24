export interface DefinitionItem {
  id: string;
  term: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: { label: string; href: string };
}

/** Blueprint 6.2. */
export const FRESHNESS_LABELS: readonly DefinitionItem[] = [
  { id: "verified-on", term: "Verified on", description: "The date the prices and facts were checked." },
  { id: "tested-on", term: "Tested on", description: "The date our own test run happened, with the model version and effort setting." },
  { id: "vendor-reported", term: "Vendor-reported", description: "The number comes from the maker's own announcement." },
  { id: "superseded", term: "Superseded", description: "The model or plan has been replaced. The page links to its successor instead of being deleted." },
];

/** Blueprint 6.6: how each number on a review is labelled. */
export const RESULT_LABELS: readonly DefinitionItem[] = [
  { id: "tested-by-us", term: "Tested by us", description: "We ran the test and publish the model version, settings and date. It is one test on one day." },
  { id: "independent", term: "Independent third party", description: "An outside group ran it and publishes its method. Good for a shortlist." },
  { id: "vendor", term: "Vendor-reported", description: "The maker's own number. A lead to check, never the only source, and never in the same column as independent scores." },
];