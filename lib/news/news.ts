export type PostType = "weekly" | "release" | "explainer";
export type PostTypeFilter = PostType | "all";
export type NewsLevel = 1 | 2 | 3 | 4;

export interface NewsPost {
  /** Unique and stable. */
  id: string;
  type: PostType;
  title: string;
  /** One or two sentences. */
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  publishedOn: string;
  href: string;
  levels: readonly NewsLevel[];
  /** ISO date the facts were last checked, or null if the post has no checked figures. */
  verifiedOn: string | null;
}

/** A short note about one price, plan or limit change. It is shown on the hub, with no page of its own. */
export interface PriceChangeNote {
  id: string;
  /** ISO date the note was published. */
  publishedOn: string;
  provider: string;
  /** The plan, model or limit that changed. */
  subject: string;
  before: string;
  after: string;
  /** ISO date the change takes effect. */
  effectiveOn: string;
  /** The provider's own page, or null if none was opened. */
  sourceUrl: string | null;
  /** ISO date the provider's page was checked. */
  verifiedOn: string;
}

export const POST_TYPES: readonly PostType[] = ["weekly", "release", "explainer"];

export const POST_TYPE_LABELS: Record<PostType, string> = {
  weekly: "Weekly roundup",
  release: "Release post",
  explainer: "Explainer",
};

export const POST_TYPE_PLURAL_LABELS: Record<PostType, string> = {
  weekly: "Weekly roundups",
  release: "Release posts",
  explainer: "Explainers",
};

/** Our publishing target for each type (Blueprint 6.4). */
export const POST_TYPE_CADENCE: Record<PostType, string> = {
  weekly: "Every week, on a fixed weekday",
  release: "Within 48 hours of a model release",
  explainer: "Within 3 days of the news",
};

/** "Level 2", "Levels 1 to 4". */
export function describePostLevels(levels: readonly NewsLevel[]): string {
  if (levels.length === 0) return "All levels";
  const lowest = Math.min(...levels);
  const highest = Math.max(...levels);
  return lowest === highest ? `Level ${lowest}` : `Levels ${lowest} to ${highest}`;
}

/** Newest first, then by title so the order is stable. Returns a new array. */
export function sortNewestFirst(posts: readonly NewsPost[]): NewsPost[] {
  return [...posts].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || a.title.localeCompare(b.title));
}

export function sortNotesNewestFirst(notes: readonly PriceChangeNote[]): PriceChangeNote[] {
  return [...notes].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || a.subject.localeCompare(b.subject));
}

/** Filters by type and by search text in the title or summary. Returns a new array. */
export function filterPosts(posts: readonly NewsPost[], type: PostTypeFilter, query: string): NewsPost[] {
  const needle = query.trim().toLowerCase();
  return posts.filter((post) => {
    if (type !== "all" && post.type !== type) return false;
    if (needle && !`${post.title} ${post.summary}`.toLowerCase().includes(needle)) return false;
    return true;
  });
}

export function countByType(posts: readonly NewsPost[]): Record<PostType, number> {
  const counts: Record<PostType, number> = { weekly: 0, release: 0, explainer: 0 };
  for (const post of posts) counts[post.type] += 1;
  return counts;
}

/** The most recent post of a type, or undefined if there is none yet. */
export function getNewestOfType(posts: readonly NewsPost[], type: PostType): NewsPost | undefined {
  return sortNewestFirst(posts.filter((post) => post.type === type))[0];
}