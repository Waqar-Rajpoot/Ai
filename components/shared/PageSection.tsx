import type { ReactNode } from "react";
import { SECTION_HEADING, SECTION_INTRO } from "./pageStyles";

interface PageSectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** A titled page section with an anchor id, so the table of contents can link to it. */
export function PageSection({ id, title, intro, children }: PageSectionProps) {
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