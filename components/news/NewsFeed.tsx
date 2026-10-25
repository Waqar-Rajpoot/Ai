"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { LATEST_POSTS_VISIBLE } from "@/lib/news/newsConstants";
import {
  POST_TYPES,
  POST_TYPE_CADENCE,
  POST_TYPE_LABELS,
  POST_TYPE_PLURAL_LABELS,
  countByType,
  describePostLevels,
  filterPosts,
  getNewestOfType,
  sortNewestFirst,
  type PostTypeFilter,
} from "@/lib/news/news";
import { NEWS_POSTS } from "@/lib/news/newsIndex";

/** The newest post of each type, then a filterable, searchable list of every post. */
export function NewsFeed() {
  const [type, setType] = useState<PostTypeFilter>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(LATEST_POSTS_VISIBLE);

  const counts = useMemo(() => countByType(NEWS_POSTS), []);
  const posts = useMemo(() => sortNewestFirst(filterPosts(NEWS_POSTS, type, query)), [type, query]);
  const shown = posts.slice(0, visibleCount);

  const filters: readonly { id: PostTypeFilter; label: string }[] = [
    { id: "all", label: `All (${NEWS_POSTS.length})` },
    ...POST_TYPES.map((postType) => ({ id: postType, label: `${POST_TYPE_PLURAL_LABELS[postType]} (${counts[postType]})` })),
  ];

  function selectType(next: PostTypeFilter) {
    setType(next);
    setVisibleCount(LATEST_POSTS_VISIBLE);
  }

  return (
    <div>
      <ul className="m-0 mb-6 grid list-none gap-3 p-0 md:grid-cols-3">
        {POST_TYPES.map((postType) => {
          const newest = getNewestOfType(NEWS_POSTS, postType);
          return (
            <li key={postType} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Newest {POST_TYPE_LABELS[postType].toLowerCase()}</p>
              {newest ? (
                <>
                  <p className="mb-1 mt-2 font-semibold"><Link href={newest.href}>{newest.title}</Link></p>
                  <p className="m-0 text-xs text-[var(--color-muted)]">{formatIsoDate(newest.publishedOn)}</p>
                </>
              ) : (
                <>
                  <p className="mb-1 mt-2 font-semibold">None published yet</p>
                  <p className="m-0 text-xs text-[var(--color-muted)]">Target: {POST_TYPE_CADENCE[postType].toLowerCase()}.</p>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_16rem]">
        <div role="group" aria-label="Filter by type of post" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={type === filter.id}
              onClick={() => selectType(filter.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                type === filter.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="text-sm">
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(LATEST_POSTS_VISIBLE);
            }}
            placeholder="Search posts"
            className={INPUT_CLASS}
          />
        </label>
      </div>

      <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {shown.length} of {posts.length} post{posts.length === 1 ? "" : "s"}, newest first.
      </p>

      {NEWS_POSTS.length === 0 ? (
        <div className={CARD_CLASS}>
          <p className="m-0 font-semibold">No posts yet.</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
            Posts appear here as soon as they are published. We would rather show an empty list than invent news. Subscribe below to get the first weekly roundup.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className={CARD_CLASS}>
          <p className="m-0 text-sm text-[var(--color-muted)]">Nothing matches that search. Try fewer words, or choose All.</p>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-3 p-0">
          {shown.map((post) => (
            <li key={post.id} className={CARD_CLASS}>
              <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
                <span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{POST_TYPE_LABELS[post.type]}</span>
                <span className={BADGE_CLASS}>{describePostLevels(post.levels)}</span>
                <span className="tabular-nums text-[var(--color-muted)]">{formatIsoDate(post.publishedOn)}</span>
                {post.verifiedOn && <span className="text-[var(--color-muted)]">Verified on {formatIsoDate(post.verifiedOn)}</span>}
              </p>
              <h3 className="mb-1 mt-2 text-lg"><Link href={post.href}>{post.title}</Link></h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{post.summary}</p>
            </li>
          ))}
        </ul>
      )}

      {posts.length > shown.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((current) => current + LATEST_POSTS_VISIBLE)}
          className={`mt-4 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
        >
          Show more
        </button>
      )}
    </div>
  );
}