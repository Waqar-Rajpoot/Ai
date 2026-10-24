"use client";

import { useMemo, useState } from "react";
import { DEFAULT_SORT_KEY, MODEL_DIRECTORY_ROWS, sortModels, type DirectorySortKey } from "@/lib/compare/modelDirectory";
import { DEFAULT_MODEL_FILTERS, filterModels, type ModelFilters } from "@/lib/compare/modelFilters";

/** Filter and sort state for the directory table and the review cards. */
export function useFilteredModels() {
  const [filters, setFilters] = useState<ModelFilters>(DEFAULT_MODEL_FILTERS);
  const [sortKey, setSortKey] = useState<DirectorySortKey>(DEFAULT_SORT_KEY);

  const rows = useMemo(() => sortModels(filterModels(MODEL_DIRECTORY_ROWS, filters), sortKey), [filters, sortKey]);

  function resetFilters() {
    setFilters(DEFAULT_MODEL_FILTERS);
  }

  return { filters, setFilters, sortKey, setSortKey, rows, resetFilters, totalCount: MODEL_DIRECTORY_ROWS.length };
}