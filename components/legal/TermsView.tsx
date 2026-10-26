import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import {
  countByGroup,
  countFlaggedClauses,
  describeDetail,
  describeEffectiveDate,
  sortHistoryNewestFirst,
} from "@/lib/legal/terms";
import { TERMS_EFFECTIVE_ON, TERMS_IS_DRAFT, TERMS_REVIEWED_ON, TERMS_VERSION } from "@/lib/legal/termsConstants";
import {
  DRAFT_BANNER,
  FAQ,
  GLOSSARY,
  QUICK_ANSWERS,
  RELATED_LINKS,
  RESPONSIBILITIES,
  SUMMARY_POINTS,
  WHAT_CAN_GO_WRONG,
} from "@/lib/legal/termsContent";
import { OPERATOR_DETAILS, TERMS_CLAUSES, TERMS_HISTORY } from "@/lib/legal/termsData";
import { TermsDocument } from "./TermsDocument";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "operator", label: "Who these terms are with" },
  { id: "terms", label: "The terms" },
  { id: "quick", label: "Quick answers" },
  { id: "responsibilities", label: "Who is responsible for what" },
  { id: "history", label: "Version history" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
] as const;

const GROUP_COUNTS = countByGroup(TERMS_CLAUSES);
const HISTORY = sortHistoryNewestFirst(TERMS_HISTORY);
const FACTS: readonly { label: string; value: string }[] = [
  { label: "Clauses", value: String(TERMS_CLAUSES.length) },
  { label: "Core terms", value: String(GROUP_COUNTS.core) },
  { label: "Version", value: TERMS_VERSION },
  { label: "Awaiting legal review", value: TERMS_IS_DRAFT ? String(countFlaggedClauses(TERMS_CLAUSES)) : "0" },
];

/** Terms of use: using the site, no professional advice, affiliate and sponsor notice, and changes. */
export function TermsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)] print:hidden">
        <Link href="/">Home</Link> › <span aria-current="page">Terms of use</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl print:hidden" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Legal</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Version {TERMS_VERSION}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>In effect from {describeEffectiveDate(TERMS_EFFECTIVE_ON)}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {TERMS_REVIEWED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Terms of use</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          The rules for using this site, in plain English first and full wording second. Free to use, general information only, and money is always disclosed.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3 print:hidden">
          <a href="#terms" className={BUTTON_PRIMARY}>Read the terms</a>
          <Link href="/privacy-policy" className={BUTTON_OUTLINE}>Privacy policy</Link>
        </div>
      </header>

      {TERMS_IS_DRAFT && (
        <div className={`${CARD_CLASS} mt-6 border-amber-500/60`} role="note">
          <p className="m-0 text-sm font-semibold">{DRAFT_BANNER}</p>
        </div>
      )}

      <dl className="m-0 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 print:hidden">
        {FACTS.map((fact) => (
          <div key={fact.label} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">{fact.label}</dt>
            <dd className="m-0 text-xl font-extrabold tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 print:hidden">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <PageSection id="summary" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SUMMARY_POINTS.map((point) => (
              <li key={point.headline}><strong>{point.headline}</strong> {point.detail}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)] print:hidden`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Only have a minute?</p>
            <p className="mb-0 mt-1 text-sm">Read the four core terms: <a href="#using-the-site">using the site</a>, <a href="#not-advice">not advice</a>, <a href="#affiliate-sponsor">affiliate and sponsor notice</a> and <a href="#changes">changes</a>.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="operator" title="Who these terms are with" intro="The details of the operator, the version and the date they take effect.">
        <dl className={`${CARD_CLASS} m-0 grid gap-3 text-sm sm:grid-cols-2`}>
          {OPERATOR_DETAILS.map((detail) => (
            <div key={detail.id}>
              <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">{detail.label}</dt>
              <dd className="m-0 mt-1 font-semibold">
                {detail.id === "effective" ? describeEffectiveDate(TERMS_EFFECTIVE_ON) : describeDetail(detail)}
                {detail.id === "contact" && <> · <Link href="/contact">Contact page</Link></>}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="terms" title="The terms" intro="Four core terms, then seven that support them. Switch between a plain-English summary and the full wording.">
        <TermsDocument />
      </PageSection>

      <div className="print:hidden">
        <PageSection id="quick" title="Quick answers" intro="The most common questions, each pointing to the clause that decides it.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Common questions about using the site, with short answers and the clause that applies</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Question</th>
                  <th scope="col" className="p-3">Short answer</th>
                  <th scope="col" className="p-3">Clause</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_ANSWERS.map((row) => {
                  const clause = TERMS_CLAUSES.find((candidate) => candidate.id === row.clauseId);
                  return (
                    <tr key={row.question} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="p-3 text-left align-top font-semibold">{row.question}</th>
                      <td className="p-3 align-top">{row.answer}</td>
                      <td className="p-3 align-top"><a href={`#${row.clauseId}`}>{clause?.title ?? row.clauseId}</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection id="responsibilities" title="Who is responsible for what" intro="A fair split: what we ask of you, and what we commit to.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">What is expected of the reader and of the site, by topic</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Topic</th>
                  <th scope="col" className="p-3">You</th>
                  <th scope="col" className="p-3">Us</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIBILITIES.map((row) => (
                  <tr key={row.topic} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.topic}</th>
                    <td className="p-3 align-top">{row.you}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection id="history" title="Version history" intro="Every change to these terms, newest first.">
          {HISTORY.length === 0 ? (
            <div className={CARD_CLASS}>
              <p className="m-0 text-sm text-[var(--color-muted)]">No earlier versions. The first version has not taken effect yet. Each later change will be listed here with its version, date and a short summary.</p>
            </div>
          ) : (
            <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <caption className="sr-only">Versions of the terms of use</caption>
                <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  <tr>
                    <th scope="col" className="p-3">Version</th>
                    <th scope="col" className="p-3">In effect from</th>
                    <th scope="col" className="p-3">What changed</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((entry) => (
                    <tr key={entry.version} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="p-3 text-left align-top font-semibold">{entry.version}</th>
                      <td className="p-3 align-top tabular-nums">{formatIsoDate(entry.effectiveOn)}</td>
                      <td className="p-3 align-top">{entry.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mb-0 mt-3 text-sm">Site changes are logged separately in the <Link href="/news/changelog">changelog</Link>.</p>
        </PageSection>

        <PageSection id="faq" title="Frequently asked questions">
          <div className="grid gap-3">
            {FAQ.map((entry) => (
              <details key={entry.question} className={`${CARD_CLASS} group py-3`}>
                <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                  <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none">▸</span>
                  {entry.question}
                </summary>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
              </details>
            ))}
          </div>
        </PageSection>

        <PageSection id="glossary" title="Terms in plain English">
          <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GLOSSARY.map((entry) => (
              <div key={entry.term} className={CARD_CLASS}>
                <dt className="font-bold">{entry.term}</dt>
                <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
              </div>
            ))}
          </dl>
        </PageSection>

        <PageSection id="what-can-go-wrong" title="What can go wrong">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {WHAT_CAN_GO_WRONG.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </PageSection>

        <PageSection id="sources" title="Related pages" intro={`Reviewed ${TERMS_REVIEWED_ON}. This page is hand-written and is general information, not legal advice.`}>
          <ul className="m-0 grid list-none gap-3 p-0 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {RELATED_LINKS.map((link) => (
              <li key={link.href} className={CARD_CLASS}>
                <Link href={link.href}>{link.label}</Link>
                <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
              </li>
            ))}
          </ul>
        </PageSection>

        <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
            <p className="m-0 font-semibold">See what we collect, and how to control it</p>
          </div>
          <Link href="/privacy-policy" className={BUTTON_PRIMARY}>Read the privacy policy</Link>
        </footer>
      </div>
    </div>
  );
}