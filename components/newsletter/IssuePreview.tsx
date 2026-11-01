"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_FILTER_ID, type AllFilterId } from "@/lib/newsletter/newsletterConstants";
import type { IssueCategory, IssueCategoryOption, IssueItem } from "@/lib/newsletter/newsletterContent";
import { countByCategory, filterIssueItems, formatDisplayDate, isCategoryFilter } from "@/lib/newsletter/roundupFilters";
import FilterChips, { type ChipOption } from "./FilterChips";
import styles from "./IssuePreview.module.css";

interface IssuePreviewProps {
  readonly items: readonly IssueItem[];
  readonly categories: readonly IssueCategoryOption[];
  readonly href: string;
  readonly hrefLabel: string;
}

/** Lets visitors filter a sample issue's items by topic. */
export default function IssuePreview({ items, categories, href, hrefLabel }: IssuePreviewProps) {
  const [selected, setSelected] = useState<IssueCategory | AllFilterId>(ALL_FILTER_ID);

  const options: readonly ChipOption[] = useMemo(() => {
    const counts = countByCategory(items);
    return [
      { id: ALL_FILTER_ID, label: "All", count: items.length },
      ...categories.map((category) => ({ id: category.id, label: category.label, count: counts[category.id] })),
    ];
  }, [items, categories]);

  const visibleItems = filterIssueItems(items, selected);
  const labelByCategory = new Map(categories.map((category) => [category.id, category.label]));

  return (
    <div>
      <FilterChips
        label="Filter by topic"
        options={options}
        selectedId={selected}
        onSelect={(id) => {
          if (isCategoryFilter(id, categories)) setSelected(id);
        }}
      />
      <p className={styles.status} role="status" aria-live="polite">
        Showing {visibleItems.length} of {items.length} items
      </p>
      <ul className={styles.list}>
        {visibleItems.map((item) => (
          <li key={item.id} className={styles.card}>
            <div className={styles.meta}>
              <span className={`${styles.tag} ${styles[item.category]}`}>{labelByCategory.get(item.category)}</span>
              <time dateTime={item.date}>{formatDisplayDate(item.date)}</time>
            </div>
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>
      <p>
        <Link href={href} className={styles.more}>
          {hrefLabel} →
        </Link>
      </p>
    </div>
  );
}