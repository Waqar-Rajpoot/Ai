import Link from "next/link";
import {
  GUIDE_AUTHOR_LABEL,
  GUIDE_KIND_LABELS,
  GUIDE_LAYOUT_LABELS,
  LEVEL_BASE_PATHS,
  LEVEL_LABELS,
  LEVEL_NUMBERS,
  OPINION_NOTE_TEXT,
  PRICE_NOTICE_TEXT,
  SOURCE_KIND_LABELS,
} from "@/lib/learn/guideConfig";

import {
  estimateReadMinutes,
  formatIsoDate,
  groupPrompts,
  guideHref,
} from "@/lib/learn/guideHelpers";
import type { GuideRecord, GuideSection } from "@/lib/learn/guideTypes";
import { CopyPromptButton } from "./CopyPromptButton";

interface GuideArticleProps {
  readonly guide: GuideRecord;
  /** Published guides to list under "Related". Resolve with `resolveRelatedGuides`. */
  readonly relatedGuides: readonly GuideRecord[];
}

/**
 * The one standard layout for a guide: summary box, sections, copy-ready prompts,
 * "what can go wrong" box, limits note, sources, related links. It renders data only.
 */
export function GuideArticle({ guide, relatedGuides }: GuideArticleProps) {
  const sourceNumbers = new Map(guide.sources.map((source, index) => [source.id, index + 1]));
  const levelPath = LEVEL_BASE_PATHS[guide.level];
const levelNumber = guide.level === "compare" ? null : LEVEL_NUMBERS[guide.level];
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap gap-x-2">
  <li><Link className="underline" href="/">Home</Link></li>
  <li aria-hidden="true">/</li>
  {levelNumber !== null && (
    <>
      <li><Link className="underline" href="/learn">Learn</Link></li>
      <li aria-hidden="true">/</li>
    </>
  )}
  <li><Link className="underline" href={levelPath}>{LEVEL_LABELS[guide.level]}</Link></li>
</ol>
      </nav>

      <header className="mt-4">
        <p className="text-sm text-slate-600">
          Level {levelNumber} · {GUIDE_KIND_LABELS[guide.kind]} {guide.number} · {estimateReadMinutes(guide)} min read
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{guide.title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          By {GUIDE_AUTHOR_LABEL}. Last reviewed{" "}
          <time dateTime={guide.lastReviewed}>{formatIsoDate(guide.lastReviewed)}</time>.
        </p>
      </header>

      {guide.kind === "opinion" && (
        <p className="mt-4 rounded border-l-4 border-slate-500 bg-slate-50 p-3 text-sm text-slate-800">
          {OPINION_NOTE_TEXT}
        </p>
      )}

      <section aria-labelledby="summary-heading" className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-4">
        <h2 id="summary-heading" className="text-lg font-semibold text-slate-900">
          {GUIDE_LAYOUT_LABELS.summary}
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-800">
          {guide.summaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      {guide.sections.map((section) => (
        <GuideSectionView key={section.id} section={section} sourceNumbers={sourceNumbers} />
      ))}

      <section aria-labelledby="prompts-heading" className="mt-10">
        <h2 id="prompts-heading" className="text-2xl font-semibold text-slate-900">
          {GUIDE_LAYOUT_LABELS.prompts}
        </h2>
        <p className="mt-2 text-slate-700">{GUIDE_LAYOUT_LABELS.promptsHint}</p>
        {groupPrompts(guide.prompts).map((group) => (
          <div key={group.heading ?? "all"} className="mt-6">
            {group.heading && <h3 className="text-xl font-semibold text-slate-900">{group.heading}</h3>}
            <ul className="mt-3 space-y-4">
              {group.prompts.map((prompt) => (
                <li key={prompt.id} className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold text-slate-900">{prompt.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{prompt.whenToUse}</p>
                  <pre className="mt-3 whitespace-pre-wrap rounded bg-slate-50 p-3 font-sans text-sm text-slate-900">
                    {prompt.text}
                  </pre>
                  <div className="mt-3">
                    <CopyPromptButton text={prompt.text} promptTitle={prompt.title} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="wrong-heading" className="mt-10 rounded-lg border-l-4 border-amber-600 bg-amber-50 p-4">
        <h2 id="wrong-heading" className="text-xl font-semibold text-slate-900">
          {GUIDE_LAYOUT_LABELS.whatCanGoWrong}
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-800">
          {guide.whatCanGoWrong.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {guide.limitsNote && (
        <aside aria-labelledby="limits-heading" className="mt-6 rounded-lg border border-slate-300 p-4">
          <h2 id="limits-heading" className="text-base font-semibold text-slate-900">
            {GUIDE_LAYOUT_LABELS.limits}
          </h2>
          <p className="mt-1 text-slate-800">{guide.limitsNote}</p>
        </aside>
      )}

      {guide.showPriceNotice && <p className="mt-6 text-sm text-slate-700">{PRICE_NOTICE_TEXT}</p>}

      <section aria-labelledby="sources-heading" className="mt-10">
        <h2 id="sources-heading" className="text-xl font-semibold text-slate-900">
          {GUIDE_LAYOUT_LABELS.sources}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Vendor-reported means the claim comes from the company's own pages.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-800">
          {guide.sources.map((source) => (
            <li key={source.id} id={`source-${source.id}`}>
              <span className="font-medium">{SOURCE_KIND_LABELS[source.kind]}.</span>{" "}
              <a className="underline" href={source.url} rel="noopener noreferrer">
                {source.publisher}: {source.title}
              </a>{" "}
              (verified on <time dateTime={source.verifiedOn}>{formatIsoDate(source.verifiedOn)}</time>)
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="related-heading" className="mt-10">
        <h2 id="related-heading" className="text-xl font-semibold text-slate-900">
          {GUIDE_LAYOUT_LABELS.related}
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {relatedGuides.map((related) => (
            <li key={related.slug}>
              <Link className="underline" href={guideHref(related)}>{related.title}</Link>
            </li>
          ))}
          {guide.relatedLinks.map((link) => (
            <li key={link.href}>
              <Link className="underline" href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

interface GuideSectionViewProps {
  readonly section: GuideSection;
  readonly sourceNumbers: ReadonlyMap<string, number>;
}

/** Renders one section: paragraphs, bullets, steps and table, then its source markers. */
function GuideSectionView({ section, sourceNumbers }: GuideSectionViewProps) {
  const headingId = `${section.id}-heading`;
  return (
    <section id={section.id} aria-labelledby={headingId} className="mt-10">
      <h2 id={headingId} className="text-2xl font-semibold text-slate-900">
        {section.heading}
      </h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-slate-800">{paragraph}</p>
      ))}
      {section.bullets && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-800">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-slate-800">
          {section.steps.map((step) => (
            <li key={step.title}>
              <span className="font-semibold">{step.title}.</span> {step.detail}
            </li>
          ))}
        </ol>
      )}
      {section.table && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="mb-2 text-left text-sm text-slate-600">{section.table.caption}</caption>
            <thead>
              <tr>
                {section.table.columns.map((column) => (
                  <th key={column} scope="col" className="border-b border-slate-300 px-3 py-2 font-semibold text-slate-900">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]} className="align-top">
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cell} scope="row" className="border-b border-slate-200 px-3 py-2 font-medium text-slate-900">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${row[0]}-${cellIndex}`} className="border-b border-slate-200 px-3 py-2 text-slate-800">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.sourceIds && section.sourceIds.length > 0 && (
        <p className="mt-3 text-sm text-slate-600">
          Sources:{" "}
          {section.sourceIds.map((sourceId, index) => (
            <span key={sourceId}>
              {index > 0 && ", "}
              <a className="underline" href={`#source-${sourceId}`}>[{sourceNumbers.get(sourceId)}]</a>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
