import type { NewsPost, PriceChangeNote } from "./news";

/**
 * Every published post. Add one entry per post when it goes live.
 * Starts empty on purpose: the hub shows an honest empty state until real posts exist.
 * When `lib/content/loadPosts.ts` is built, this list can be generated from the MDX front matter instead.
 */
export const NEWS_POSTS: readonly NewsPost[] = [];

/** Price, plan and limit changes. Add one entry per change, within 24 hours of confirming it. */
export const PRICE_CHANGE_NOTES: readonly PriceChangeNote[] = [];