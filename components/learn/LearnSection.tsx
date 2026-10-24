import type { ReactNode } from "react";
import { SECTION_HEADING, SECTION_INTRO } from "./learnStyles";

interface LearnSectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Anchored page section with a heading and optional intro. Shared by every level hub. */
export function LearnSection({ id, title, intro, children }: LearnSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-8">
      <h2 id={`${id}-heading`} className={SECTION_HEADING}>
        {title}
      </h2>
      {intro && <p className={SECTION_INTRO}>{intro}</p>}
      {children}
    </section>
  );
}

/** Plain list with a visible marker character. */
export function CheckList({ items, mark }: { items: readonly string[]; mark: string }) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="font-bold text-[var(--color-accent)]">{mark}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}