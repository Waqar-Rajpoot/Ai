import type { ClaimQuestion } from "./adoptionExplained";

export interface MetricNote {
  plain: string;
  technical: string;
}

export interface DifferenceFactor {
  id: string;
  factor: string;
  question: string;
  whyItMatters: string;
}

export interface UseLadderRung {
  level: string;
  wording: string;
  whatItCaptures: string;
}

/** A figure we have only seen in a secondary summary. Kept separate, labelled, and never headlined. */
export interface SecondaryFigure {
  id: string;
  publisher: string;
  valueText: string;
  measure: string;
  /** Null until the original page is opened. */
  group: string | null;
  period: string | null;
}

export const METRIC_NOTES: Record<string, MetricNote> = {
  overall: {
    plain: "Share of US adults aged 18 to 64 who use generative AI at all, at work or outside it.",
    technical: "A prevalence measure at two dates. It depends on how the tracker defines use (ever, recent, regular), which we have not confirmed from the original, so a change may reflect more users, more frequent users, or both.",
  },
  work: {
    plain: "Share who use generative AI for their job. It is a share of all adults in the group, not only of people who have a job.",
    technical: "Check the denominator in the original. “45.2% at work” of all adults 18 to 64 is a different claim from 45.2% of employed adults, and the second would be a higher share of workers.",
  },
  "outside-work": {
    plain: "Share who use generative AI in their own time: study, hobbies, chat and everyday questions.",
    technical: "Outside-work use started above work use and pulled further ahead. A rising share here does not say what people use it for, only that they report using it.",
  },
};

export const DIFFERENCE_FACTORS: readonly DifferenceFactor[] = [
  { id: "group", factor: "Who was asked", question: "Adults, workers, students or teenagers? Which ages and which countries?", whyItMatters: "A figure for US adults 18 to 64 says nothing about people over 64, children, or other countries." },
  { id: "definition", factor: "What counts as “AI”", question: "Only chatbots, or also AI in search, photo apps and spell-check?", whyItMatters: "Wide definitions give larger numbers, and a person may use AI without knowing it." },
  { id: "frequency", factor: "How often counts as “use”", question: "Ever tried, used this month, weekly, or daily?", whyItMatters: "“Has ever used” and “uses every day” are very different claims about the same people." },
  { id: "purpose", factor: "Work, home or both", question: "Is the question about job use, personal use or any use?", whyItMatters: "The tracker splits these. Many other surveys do not, so their numbers are not comparable." },
  { id: "wording", factor: "Question wording and answer options", question: "What exactly was asked, and what choices were offered?", whyItMatters: "Small wording changes move the result, and a list of examples can prompt people to say yes." },
  { id: "date", factor: "When it was asked", question: "Which quarter or month?", whyItMatters: "Use is rising fast, so a figure from a year earlier describes a different world." },
  { id: "method", factor: "How people were chosen and reached", question: "A random sample, an online panel, an open poll? How was it weighted?", whyItMatters: "Self-selected respondents are not a fair picture of the population." },
  { id: "measure", factor: "Measured or estimated", question: "Did people report their own use, or did someone estimate it from other data?", whyItMatters: "Self-reports can be wrong, and estimates rest on assumptions." },
];

export const USE_LADDER: readonly UseLadderRung[] = [
  { level: "Ever used", wording: "“Have you ever used a generative AI tool?”", whatItCaptures: "The widest net. It counts a single try years ago." },
  { level: "Recent use", wording: "“Have you used one in the past month?”", whatItCaptures: "People still using it, but not how much." },
  { level: "Regular use", wording: "“Do you use one every week?”", whatItCaptures: "A habit. Always smaller than ever-used." },
  { level: "Daily use", wording: "“Do you use one every day?”", whatItCaptures: "The narrowest. Always smaller than regular use." },
];

/** The Blueprint (6.10, 7.3) says replace these with the original pages before publishing. */
export const SECONDARY_FIGURES: readonly SecondaryFigure[] = [
  { id: "pew-chatbots", publisher: "Pew (as summarised secondhand)", valueText: "49%", measure: "Reported share who use chatbots", group: null, period: null },
  { id: "pew-daily", publisher: "Pew (as summarised secondhand)", valueText: "24%", measure: "Reported share who use them daily", group: null, period: null },
  { id: "microsoft-worldwide", publisher: "Microsoft (as summarised secondhand)", valueText: "18.8%", measure: "Reported worldwide share", group: "Worldwide", period: null },
];

export const CLAIM_QUESTIONS: readonly ClaimQuestion[] = [
  { id: "named-source", question: "A named publisher is given, and the original page can be opened.", whyItMatters: "A screenshot or “a recent study” cannot be checked or corrected." },
  { id: "date", question: "The date or quarter of the data is stated.", whyItMatters: "Adoption is moving fast, so an undated number is hard to use." },
  { id: "group", question: "The group is stated, such as “US adults 18 to 64”.", whyItMatters: "A number about one group is often quoted as if it were about everyone." },
  { id: "definition", question: "It says what counts as “use” and what counts as “AI”.", whyItMatters: "“Ever tried” and “uses daily” are different claims." },
  { id: "base", question: "It is clear what the percentage is a share of.", whyItMatters: "A share of all adults and a share of workers are different numbers." },
  { id: "method", question: "The method is available: sample size, how people were chosen, and weighting.", whyItMatters: "Without it you cannot tell a survey from an open poll." },
];