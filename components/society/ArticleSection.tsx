import type { ReactNode } from "react";

interface ArticleSectionProps {
  /** Anchor id; also used by the "On this page" navigation. */
  readonly id: string;
  readonly heading: string;
  readonly children: ReactNode;
}

/** A titled article section with a stable anchor and accessible labelling. */
export default function ArticleSection({ id, heading, children }: ArticleSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>{heading}</h2>
      {children}
    </section>
  );
}