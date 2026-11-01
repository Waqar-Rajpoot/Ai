"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { AudienceProfile } from "@/lib/newsletter/newsletterContent";
import styles from "./AudienceExplorer.module.css";

interface AudienceExplorerProps {
  readonly profiles: readonly AudienceProfile[];
}

/** Tabs that show what the roundup flags for each type of reader. Supports arrow keys, Home and End. */
export default function AudienceExplorer({ profiles }: AudienceExplorerProps) {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [selectedId, setSelectedId] = useState(profiles[0].id);
  const selected = profiles.find((profile) => profile.id === selectedId) ?? profiles[0];

  function moveTo(index: number) {
    const target = profiles[(index + profiles.length) % profiles.length];
    setSelectedId(target.id);
    tabRefs.current[target.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") moveTo(index + 1);
    else if (event.key === "ArrowLeft") moveTo(index - 1);
    else if (event.key === "Home") moveTo(0);
    else if (event.key === "End") moveTo(profiles.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className={styles.explorer}>
      <div role="tablist" aria-label="Choose who you are" className={styles.tabs}>
        {profiles.map((profile, index) => (
          <button
            key={profile.id}
            ref={(element) => {
              tabRefs.current[profile.id] = element;
            }}
            id={`${baseId}-tab-${profile.id}`}
            role="tab"
            type="button"
            className={styles.tab}
            aria-selected={profile.id === selected.id}
            aria-controls={`${baseId}-panel`}
            tabIndex={profile.id === selected.id ? 0 : -1}
            onClick={() => setSelectedId(profile.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {profile.label}
          </button>
        ))}
      </div>
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${selected.id}`}
        className={styles.panel}
      >
        <p className={styles.headline}>{selected.headline}</p>
        <h3 className={styles.subheading}>What we flag for you</h3>
        <ul className={styles.list}>
          {selected.watchFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.example}>
          <span className={styles.exampleLabel}>Example headline</span>
          {selected.exampleHeadline}
        </p>
      </div>
    </div>
  );
}