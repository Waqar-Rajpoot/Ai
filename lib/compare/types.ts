export const BEST_FOR_SLUGS = [
  "overall",
  "coding",
  "writing",
  "agents",
  "value",
  "cheap-and-fast",
  "open-weights",
  "local",
  "students",
  "small-business",
  "image",
  "video",
] as const;

export type BestForSlug = (typeof BEST_FOR_SLUGS)[number];

/** How a number was produced. Vendor and independent figures are never mixed. */
export type FigureLabel =
  | "Independent"
  | "Vendor-reported"
  | "Third-party roundup"
  | "Directory";

export interface RelatedLink {
  readonly href: string;
  readonly label: string;
}

/** One dated number with its label and source. */
export interface ReportedFigure {
  readonly subject: string;
  readonly measure: string;
  readonly value: string;
  readonly label: FigureLabel;
  readonly source: string;
  readonly asOf: string;
}

/** A term the reader needs, with a caution about misreading it. */
export interface GlossaryItem {
  readonly term: string;
  readonly meaning: string;
  readonly caution: string;
}

/** "If this is your situation, do this." */
export interface DecisionRule {
  readonly situation: string;
  readonly advice: string;
}

export interface TestStep {
  readonly title: string;
  readonly detail: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface SourceNote {
  readonly name: string;
  readonly url?: string;
  readonly note: string;
}

/** A tool or product to test that is not a directory model (apps, image and video tools, plans). */
export interface CandidateTool {
  readonly name: string;
  readonly maker: string;
  readonly role: string;
  readonly reportedFacts: readonly string[];
  readonly watchOut: string;
}

export interface BestForRoundup {
  readonly slug: BestForSlug;
  readonly label: string;
  readonly level: string;
  readonly question: string;
  readonly description: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  /** Plain-English answer shown first. Never presented as a final ranking. */
  readonly quickAnswer: string;
  readonly whoItIsFor: readonly string[];
  /** Directory model ids. Empty when the directory has no fair basis. */
  readonly startingPointIds: readonly string[];
  readonly startingPointsNote: string;
  /** Why each starting point is listed for this use, keyed by model id. */
  readonly modelRoleNotes: Readonly<Record<string, string>>;
  readonly candidates: readonly CandidateTool[];
  readonly candidatesNote: string;
  readonly decisionGuide: readonly DecisionRule[];
  readonly reportedFigures: readonly ReportedFigure[];
  readonly glossary: readonly GlossaryItem[];
  readonly howWeWillRank: readonly string[];
  readonly selfTest: readonly TestStep[];
  readonly tips: readonly string[];
  readonly commonMistakes: readonly string[];
  readonly keepInMind: readonly string[];
  readonly faq: readonly FaqItem[];
  readonly sources: readonly SourceNote[];
  readonly related: readonly RelatedLink[];
}