"use client";

import type { RefObject } from "react";
import { BUTTON_PRIMARY, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { MAX_QUERY_LENGTH } from "@/lib/shared/searchConstants";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  /** Called when the reader presses Enter or the Search button. */
  onSubmit: () => void;
  onClear: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

/** The search field. Escape clears it, and pressing "/" anywhere on the page focuses it. */
export function SearchBox({ value, onChange, onSubmit, onClear, inputRef }: SearchBoxProps) {
  return (
    <form
      role="search"
      aria-label="Search the site"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="mb-6 grid gap-2 sm:grid-cols-[1fr_auto]"
    >
      <div className="relative">
        <label htmlFor="site-search" className="sr-only">Search guides, glossary, reviews, tools and data pages</label>
        <input
          ref={inputRef}
          id="site-search"
          type="text"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          maxLength={MAX_QUERY_LENGTH}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            if (value) onClear();
            else inputRef.current?.blur();
          }}
          placeholder="Search guides, terms, models, prices and tools"
          className={`${INPUT_CLASS} !rounded-full !py-3 pl-5 pr-24 text-base`}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)] ${FOCUS_RING}`}
          >
            Clear
          </button>
        )}
      </div>
      <button type="submit" className={BUTTON_PRIMARY}>Search</button>
      <p className="m-0 text-xs text-[var(--color-muted)] sm:col-span-2">Results update as you type. Press / to search from anywhere on this page.</p>
    </form>
  );
}