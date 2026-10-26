"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITE_SEARCH_INDEX } from "@/lib/search/siteSearchIndex";
import {
  buildSearchQueryString,
  DEFAULT_SEARCH_STATE,
  isDefaultSearchState,
  readSearchState,
  runSearch,
  type LevelFilter,
  type SearchSection,
  type SearchSort,
  type SearchState,
  type SectionFilter,
} from "@/lib/shared/search";
import { URL_UPDATE_DELAY_MS } from "@/lib/shared/searchConstants";
import { SearchBox } from "./SearchBox";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { SearchStart } from "./SearchStart";
import { useRecentSearches } from "./useRecentSearches";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/**
 * Search page. State lives in the URL (?q=, section, level, sort), so searches can be shared and the back
 * button works. Must be rendered inside <Suspense> because it reads the URL on the client.
 */
export function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlKey = searchParams.toString();

  const [state, setState] = useState<SearchState>(() => readSearchState((key) => searchParams.get(key)));
  const lastWrittenRef = useRef(urlKey);
  const inputRef = useRef<HTMLInputElement>(null);
  const { recent, add: addRecent, clear: clearRecent } = useRecentSearches();

  // URL to state: a header search, or the back and forward buttons, changed the address.
  useEffect(() => {
    if (urlKey === lastWrittenRef.current) return;
    lastWrittenRef.current = urlKey;
    setState(readSearchState((key) => searchParams.get(key)));
  }, [urlKey, searchParams]);

  // State to URL, after a short pause so every keystroke is not a history entry.
  useEffect(() => {
    const queryString = buildSearchQueryString(state);
    if (queryString === lastWrittenRef.current) return;
    const timer = window.setTimeout(() => {
      lastWrittenRef.current = queryString;
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, URL_UPDATE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state, pathname, router]);

  // Press "/" to focus the search box.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const outcome = useMemo(() => runSearch(SITE_SEARCH_INDEX, state), [state]);

  const setQuery = useCallback((query: string) => setState((current) => ({ ...current, query })), []);
  const setSection = useCallback((section: SectionFilter) => setState((current) => ({ ...current, section })), []);
  const setLevel = useCallback((level: LevelFilter) => setState((current) => ({ ...current, level })), []);
  const setSort = useCallback((sort: SearchSort) => setState((current) => ({ ...current, sort })), []);
  const resetFilters = useCallback(() => setState((current) => ({ ...current, section: "all", level: "all" })), []);
  const applyQuery = useCallback((query: string) => {
    setState((current) => ({ ...current, query }));
    addRecent(query);
    inputRef.current?.focus();
  }, [addRecent]);
  const browseSection = useCallback((section: SearchSection) => setState({ ...DEFAULT_SEARCH_STATE, section }), []);

  return (
    <div className="page">
      <PageHeader title="Search" badge="utility" />
      <SearchBox
        value={state.query}
        onChange={setQuery}
        onSubmit={() => addRecent(state.query)}
        onClear={() => setQuery("")}
        inputRef={inputRef}
      />

      {isDefaultSearchState(state) ? (
        <SearchStart recent={recent} onPickQuery={applyQuery} onClearRecent={clearRecent} onBrowseSection={browseSection} />
      ) : (
        <>
          <SearchFilters
            state={state}
            outcome={outcome}
            onSectionChange={setSection}
            onLevelChange={setLevel}
            onSortChange={setSort}
            onReset={resetFilters}
          />
          <SearchResults
            key={`${state.query}|${state.section}|${state.level}|${state.sort}`}
            state={state}
            outcome={outcome}
            onSectionChange={setSection}
            onApplySuggestion={applyQuery}
            onResetFilters={resetFilters}
            onNavigate={() => addRecent(state.query)}
          />
        </>
      )}
    </div>
  );
}