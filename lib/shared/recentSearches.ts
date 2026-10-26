import { MAX_RECENT_SEARCHES, MIN_QUERY_LENGTH } from "./searchConstants";

function tidy(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

/** Puts a query first, removes earlier copies (ignoring case), and keeps the newest few. */
export function addRecentSearch(list: readonly string[], query: string): string[] {
  const cleaned = tidy(query);
  if (cleaned.length < MIN_QUERY_LENGTH) return [...list];
  const rest = list.filter((item) => item.toLowerCase() !== cleaned.toLowerCase());
  return [cleaned, ...rest].slice(0, MAX_RECENT_SEARCHES);
}

export function serializeRecentSearches(list: readonly string[]): string {
  return JSON.stringify(list);
}

/** Reads saved searches. Anything malformed is ignored, so old saves never break the page. */
export function parseRecentSearches(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((value): value is string => typeof value === "string")
      .map(tidy)
      .filter((value) => value.length >= MIN_QUERY_LENGTH)
      .slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}