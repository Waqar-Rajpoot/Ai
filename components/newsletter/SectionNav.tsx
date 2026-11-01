"use client";

import { useEffect, useState } from "react";
import { NAV_ACTIVE_ROOT_MARGIN } from "@/lib/newsletter/newsletterConstants";
import type { NavSection } from "@/lib/newsletter/newsletterContent";
import styles from "./SectionNav.module.css";

interface SectionNavProps {
  readonly sections: readonly NavSection[];
}

/** Sticky in-page navigation that highlights the section currently on screen. */
export default function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: NAV_ACTIVE_ROOT_MARGIN },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className={styles.nav}>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={styles.link}
              aria-current={section.id === activeId ? "location" : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}