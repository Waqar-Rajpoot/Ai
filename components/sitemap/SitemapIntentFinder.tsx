"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { findIntent, getPageStatus } from "@/lib/sitemap/sitemapLogic";
import type { Intent } from "@/lib/sitemap/sitemapTypes";

interface Props {
  intents: readonly Intent[];
  /** Paths that are live. Passed as an array because a Set cannot cross the server/client line. */
  publishedPaths: readonly string[];
}

/** "I want to ..." picker. Shows one page and why it fits. */
export function SitemapIntentFinder({ intents, publishedPaths }: Props) {
  const [selectedId, setSelectedId] = useState<string>(intents[0].id);
  const published = useMemo(() => new Set(publishedPaths), [publishedPaths]);
  const intent = findIntent(intents, selectedId) ?? intents[0];
  const live = getPageStatus(intent.path, published) === "live";

  return (
    <div className={CARD_CLASS}>
      <label htmlFor="sitemap-intent" className="text-sm font-semibold">I want to…</label>
      <select id="sitemap-intent" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className={`${INPUT_CLASS} mt-2`}>
        {intents.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
      <div className="mt-4" role="status" aria-live="polite">
        <p className="m-0 text-sm text-[var(--color-muted)]">{intent.why}</p>
        <p className="mb-0 mt-2 font-semibold">
          {live ? (
            <Link href={intent.path}>Go to {intent.path}</Link>
          ) : (
            <span>
              {intent.path} <span className="text-sm font-normal text-[var(--color-muted)]">(coming soon)</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}