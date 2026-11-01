"use client";

import styles from "./FilterChips.module.css";

export interface ChipOption {
  readonly id: string;
  readonly label: string;
  readonly count?: number;
}

interface FilterChipsProps {
  /** Accessible name for the group, for example "Filter by topic". */
  readonly label: string;
  readonly options: readonly ChipOption[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

/** A row of toggle buttons where exactly one option is selected. */
export default function FilterChips({ label, options, selectedId, onSelect }: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className={styles.group}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.chip}
          aria-pressed={option.id === selectedId}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
          {option.count !== undefined ? <span className={styles.count}>{option.count}</span> : null}
        </button>
      ))}
    </div>
  );
}