import { useCallback, useEffect, useState } from "react";
import { addRecentSearch, parseRecentSearches, serializeRecentSearches } from "@/lib/shared/recentSearches";
import { RECENT_SEARCHES_STORAGE_KEY } from "@/lib/shared/searchConstants";

/** Recent searches kept in this browser only. Storage can fail (private mode), so every access is guarded. */
export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      setRecent(parseRecentSearches(window.localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY)));
    } catch {
      setRecent([]);
    }
    setIsLoaded(true);
  }, []);

  // Save only after the first load, or the empty starting list would erase what was saved.
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (recent.length === 0) window.localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
      else window.localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, serializeRecentSearches(recent));
    } catch {
      // Storage is unavailable. Searching still works.
    }
  }, [recent, isLoaded]);

  const add = useCallback((query: string) => setRecent((current) => addRecentSearch(current, query)), []);
  const clear = useCallback(() => setRecent([]), []);

  return { recent, add, clear };
}