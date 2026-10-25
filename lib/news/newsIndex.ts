import type { NewsPost, PriceChangeNote } from "./news";


export const NEWS_POSTS: readonly NewsPost[] = [];

/** Price, plan and limit changes. Add one entry per change, within 24 hours of confirming it. */
export const PRICE_CHANGE_NOTES: readonly PriceChangeNote[] = [];