// export const LEVEL_ORDER = [
//   'foundation',
//   'practitioner',
//   'powerUser',
//   'expert'
// ] as const;

// export type LevelType = typeof LEVEL_ORDER[number];

// export const PAGE_KIND_LABELS: Record<string, string> = {
//   foundation: 'Foundations',
//   practitioner: 'Practitioner',
//   powerUser: 'Power User',
//   expert: 'Expert'
// };

// export function getLevelBadgeLabel(badge: string): string {
//   return PAGE_KIND_LABELS[badge] || badge;
// }









export const LEVEL_ORDER = [
  "foundation",
  "practitioner",
  "powerUser",
  "expert",
] as const;

export type LevelType = (typeof LEVEL_ORDER)[number];

/** The URL segment under /learn for each level, for example "/learn/power-user". */
export type LevelSlug = "foundations" | "practitioner" | "power-user" | "expert";

export interface LevelDefinition {
  id: LevelType;
  /** 1 to 4, shown in badges such as "Level 3". */
  number: 1 | 2 | 3 | 4;
  /** Full name, used in headings. */
  name: string;
  /** Short name, used in badges and tabs. Matches the old PAGE_KIND_LABELS values. */
  badgeLabel: string;
  slug: LevelSlug;
  /** Who the level is written for. */
  reader: string;
  /** What the reader can do after finishing the level. */
  outcome: string;
  /** The usual shape of a page at this level. */
  typicalPage: string;
}

/** The four learning levels (Blueprint 1.3). */
export const LEVEL_DEFINITIONS: Record<LevelType, LevelDefinition> = {
  foundation: {
    id: "foundation",
    number: 1,
    name: "Foundations",
    badgeLabel: "Foundations",
    slug: "foundations",
    reader: "Complete beginner, parent, student",
    outcome: "Explain what AI is, write a clear prompt, spot a wrong answer, and keep private data out of chats",
    typicalPage: "5 to 10 minute guide",
  },
  practitioner: {
    id: "practitioner",
    number: 2,
    name: "Practitioner",
    badgeLabel: "Practitioner",
    slug: "practitioner",
    reader: "Student, office worker, job seeker, small business owner",
    outcome: "Use AI for real tasks with files and web search, choose the right plan, and verify results",
    typicalPage: "Task guide with copy-ready prompts",
  },
  powerUser: {
    id: "powerUser",
    number: 3,
    name: "Power user and builder",
    badgeLabel: "Power User",
    slug: "power-user",
    reader: "Freelancer, analyst, developer, team lead",
    outcome: "Pick a model per task, control cost per task, build automations and agents, and run your own tests",
    typicalPage: "Workflow guide or tested comparison",
  },
  expert: {
    id: "expert",
    number: 4,
    name: "Expert",
    badgeLabel: "Expert",
    slug: "expert",
    reader: "Developer, researcher, IT or compliance lead",
    outcome: "Read benchmarks critically, self-host open-weight models, assess safety reports, and map legal duties",
    typicalPage: "Deep dive with sources",
  },
};

/** Badge text for each level, built from LEVEL_DEFINITIONS so the names live in one place. */
export const PAGE_KIND_LABELS: Record<string, string> = Object.fromEntries(
  LEVEL_ORDER.map((level) => [level, LEVEL_DEFINITIONS[level].badgeLabel]),
);

export function getLevelBadgeLabel(badge: string): string {
  return PAGE_KIND_LABELS[badge] || badge;
}

/** True when a value is one of the four level keys. Use it on front matter and other untyped input. */
export function isLevelType(value: unknown): value is LevelType {
  return typeof value === "string" && (LEVEL_ORDER as readonly string[]).includes(value);
}

export function getLevelDefinition(level: LevelType): LevelDefinition {
  return LEVEL_DEFINITIONS[level];
}

/** The route of a level hub, for example "/learn/power-user". */
export function getLevelHref(level: LevelType): string {
  return `/learn/${LEVEL_DEFINITIONS[level].slug}`;
}

/** Finds a level from its URL segment. Returns undefined for anything unknown. */
export function getLevelFromSlug(slug: string): LevelType | undefined {
  return LEVEL_ORDER.find((level) => LEVEL_DEFINITIONS[level].slug === slug);
}

/** All URL segments, for generateStaticParams in app/learn/[level]/page.tsx. */
export function getAllLevelSlugs(): LevelSlug[] {
  return LEVEL_ORDER.map((level) => LEVEL_DEFINITIONS[level].slug);
}

/** Finds a level from its number (1 to 4). */
export function getLevelByNumber(levelNumber: number): LevelType | undefined {
  return LEVEL_ORDER.find((level) => LEVEL_DEFINITIONS[level].number === levelNumber);
}

/** The next level up, or undefined at the top. */
export function getNextLevel(level: LevelType): LevelType | undefined {
  return LEVEL_ORDER[LEVEL_ORDER.indexOf(level) + 1];
}

/** The level before this one, or undefined at the bottom. */
export function getPreviousLevel(level: LevelType): LevelType | undefined {
  return LEVEL_ORDER[LEVEL_ORDER.indexOf(level) - 1];
}