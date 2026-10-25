import { suggestNextWeek } from "./roundupDates";
import type { WeeklyRoundup } from "./roundupTypes";

const SAMPLE_DATE = "2026-10-26";

/**
 * Every weekly roundup. To publish one, add a record here (newest anywhere; the site sorts by date).
 * The sample below is a layout preview with placeholder text. Delete it once the first real roundup exists.
 */
export const ROUNDUPS: readonly WeeklyRoundup[] = [
  {
    slug: "sample-roundup",
    title: "Sample weekly roundup (layout preview)",
    publishedOn: SAMPLE_DATE,
    verifiedOn: SAMPLE_DATE,
    author: null,
    levels: [1, 2, 3, 4],
    summary: "This is a layout preview with placeholder text. A real roundup puts the week in two sentences here.",
    highlights: [
      "A real roundup lists the one or two things most readers should know.",
      "Each point is a short sentence that links to the part below.",
    ],
    releases: [
      {
        id: "sample-release",
        model: "Example Model One",
        maker: "Example Maker",
        summary: "A real entry says what changed in one short paragraph. This is not real news.",
        claimLabel: "vendor-reported",
        priceNote: "A real entry shows the price per million tokens and the date it was verified.",
        contextNote: "A real entry shows the context window.",
        forBeginners: "A real entry says whether a beginner needs to do anything.",
        forPowerUsers: "A real entry says whether builders should test or switch.",
        reviewStatus: "test-scheduled",
        releasePostHref: null,
        directoryHref: "/compare/models",
        reviewHref: null,
      },
    ],
    priceChanges: [
      {
        id: "sample-price",
        provider: "Example Provider",
        subject: "Example plan",
        before: "Old price",
        after: "New price",
        effectiveOn: SAMPLE_DATE,
        sourceUrl: null,
        verifiedOn: SAMPLE_DATE,
        whatItMeans: "A real entry says how the change affects a typical reader's cost.",
      },
    ],
    policyItems: [
      {
        id: "sample-policy",
        title: "Example safety, privacy or policy item",
        whatHappened: "A real entry says what happened, in plain English.",
        whatItMeans: "A real entry says what it means for readers, and what to do.",
        occurredOn: SAMPLE_DATE,
        sourceName: "A named source",
        sourceUrl: null,
        guideHref: "/tools/ai-safety-checklist",
        guideLabel: "AI safety checklist",
      },
    ],
    nextWeek: suggestNextWeek(SAMPLE_DATE),
    sponsor: {
      name: "Example sponsor",
      message: "A real roundup carries at most one labelled sponsor message here.",
      url: null,
    },
    hasAffiliateLinks: false,
    corrections: [],
    isSample: true,
  },
];