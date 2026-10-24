"use client";

import { useCallback, useEffect, useState } from "react";
import { CHECKLIST_STORAGE_KEY } from "@/lib/tools/safetyChecklistConstants";
import { parseCheckedIds, removeIds, serializeCheckedIds, toggleChecked } from "@/lib/tools/checklists";

/**
 * Ticked checklist ids, saved in this browser only under the given key.
 * Starts empty and loads after mount so server HTML and hydration match.
 * Storage can be blocked, so every access is wrapped and the page works without it.
 */
export function useCheckedIds(validIds: ReadonlySet<string>, storageKey: string = CHECKLIST_STORAGE_KEY) {
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      setCheckedIds(parseCheckedIds(window.localStorage.getItem(storageKey), validIds));
    } catch {
      // Storage blocked: keep the empty set.
    }
    setIsLoaded(true);
  }, [validIds, storageKey]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(storageKey, serializeCheckedIds(checkedIds));
    } catch {
      // Storage blocked or full: ticks last for this visit only.
    }
  }, [checkedIds, isLoaded, storageKey]);

  const toggle = useCallback((id: string) => {
    setCheckedIds((current) => toggleChecked(current, id));
  }, []);

  const clear = useCallback((ids: readonly string[]) => {
    setCheckedIds((current) => removeIds(current, ids));
  }, []);

  return { checkedIds, isLoaded, toggle, clear };
}