import Link from "next/link";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** One glossary entry. The id makes each term linkable, for example /learn/glossary#token. */
export function GlossaryTermCard({ term }: { term: any }) {
  const anchorId = term.slug || term.id;
  const guideHref = term.guideHref || term.guide?.href;
  const guideTitle = term.guideTitle || term.guide?.title || "Read guide";

  return (
    <article id={anchorId} className={`${CARD_CLASS} h-full scroll-mt-24`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-lg">{term.term}</h3>
        <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs font-semibold">
          Level {term.level}
        </span>
      </div>
      <p className="mb-3 mt-2">{term.definition}</p>
      {guideHref && (
        <Link href={guideHref} className={`text-sm text-[var(--color-accent)] no-underline hover:underline ${FOCUS_RING}`}>
          Learn more: {guideTitle}
        </Link>
      )}
    </article>
  );
}