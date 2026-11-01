"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/newsletter/newsletterContent";
import { matchesFaqQuery } from "@/lib/newsletter/roundupFilters";
import styles from "./FaqAccordion.module.css";

interface FaqAccordionProps {
  readonly items: readonly FaqItem[];
}

/** Searchable FAQ where one answer is open at a time. */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const visible = items.filter((item) => matchesFaqQuery(item, query));

  return (
    <div>
      <label htmlFor={`${baseId}-search`} className={styles.visuallyHidden}>
        Search the questions
      </label>
      <input
        id={`${baseId}-search`}
        type="search"
        className={styles.search}
        placeholder="Search the questions…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className={styles.status} role="status" aria-live="polite">
        {visible.length === 0 ? "No questions match your search." : `${visible.length} of ${items.length} questions`}
      </p>
      <ul className={styles.list}>
        {visible.map((item) => {
          const isOpen = item.id === openId;
          return (
            <li key={item.id} className={styles.item}>
              <h3 className={styles.heading}>
                <button
                  type="button"
                  id={`${baseId}-q-${item.id}`}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-a-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  {item.question}
                  <span className={styles.chevron} aria-hidden="true" />
                </button>
              </h3>
              <div
                id={`${baseId}-a-${item.id}`}
                role="region"
                aria-labelledby={`${baseId}-q-${item.id}`}
                hidden={!isOpen}
                className={styles.answer}
              >
                <p>{item.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}