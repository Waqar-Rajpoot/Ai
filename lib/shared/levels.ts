import type { Level, PageBadge } from "@/types";

/** Name, URL slug and target reader of one learning level (Blueprint 1.3). */
export interface LevelDefinition {
  readonly name: string;
  readonly slug: string;
  readonly reader: string;
}

export const LEVEL_DEFINITIONS: Readonly<Record<Level, LevelDefinition>> = {
  1: {
    name: "Foundations",
    slug: "foundations",
    reader: "Complete beginner, parent, student",
  },
  2: {
    name: "Practitioner",
    slug: "practitioner",
    reader: "Student, office worker, job seeker, small business owner",
  },
  3: {
    name: "Power user and builder",
    slug: "power-user",
    reader: "Freelancer, analyst, developer, team lead",
  },
  4: {
    name: "Expert",
    slug: "expert",
    reader: "Developer, researcher, IT or compliance lead",
  },
};

/** Levels in learning order. */
export const LEVEL_ORDER: readonly Level[] = [1, 2, 3, 4];

const PAGE_KIND_LABELS = {
  "all-levels": "All levels",
  trust: "Trust",
  legal: "Legal",
  utility: "Utility",
} as const;

/** Route of a level hub page. */
export function getLevelHref(level: Level): string {
  return `/learn/${LEVEL_DEFINITIONS[level].slug}`;
}

/** Text shown inside a badge, for example "Level 1: Foundations". */
export function getBadgeLabel(badge: PageBadge): string {
  if (typeof badge === "number") {
    return `Level ${badge}: ${LEVEL_DEFINITIONS[badge].name}`;
  }
  return PAGE_KIND_LABELS[badge];
}
