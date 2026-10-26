import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { ACKNOWLEDGE_WITHIN_BUSINESS_DAYS, CORRECTIONS_POLICY_REVIEWED_ON } from "@/lib/trust/correctionsConstants";
import {
  CORRECTION_KINDS,
  CORRECTION_VS_UPDATE,
  FAQ,
  FRESHNESS_LABELS,
  LOG_FIELD_GUIDE,
  POLICY_LIMITS,
  PROCESS_STEPS,
  PROMISES,
  READER_PATHS,
  RELATED_LINKS,
  REPORT_ERROR_PATH,
  REPORT_STEPS,
  REPORT_TEMPLATE,
  SHORT_ANSWER,
  SPECIAL_CASES,
  WHAT_COUNTS,
  WHAT_DOES_NOT_COUNT,
} from "@/lib/trust/correctionsContent";
import { CORRECTIONS_LOG } from "@/lib/trust/correctionsLog";
import { SEVERITY_LEVELS } from "@/lib/trust/correctionsPolicy";
import { CopyTemplateButton } from "./CopyTemplateButton";
import { CorrectionsLog } from "./CorrectionsLog";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "what-counts", label: "What counts as an error" },
  { id: "how-to-report", label: "How to report" },
  { id: "response-time", label: "Response time" },
  { id: "how-we-correct", label: "How we correct" },
  { id: "log", label: "Corrections log" },
  { id: "special-cases", label: "Special cases" },
  { id: "promises", label: "Our promises" },
  { id: "labels", label: "Freshness labels" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "limits", label: "Limits" },
  { id: "faq", label: "FAQ" },
] as const;

/** Full Corrections policy and log page: how to report an error, response times, how fixes are made and the public log. */
export function CorrectionsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/about">About</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Corrections policy and log</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">About · Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Policy reviewed {CORRECTIONS_POLICY_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>All levels</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Corrections policy and log: how to report an error and what we do about it</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          We will get things wrong. This page says how to tell us, how fast we respond, how we fix what is wrong, and shows our own record in public.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link href={REPORT_ERROR_PATH} className={BUTTON_PRIMARY}>Report an error</Link>
          <a href="#log" className={BUTTON_OUTLINE}>See the corrections log</a>
        </div>
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
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

      {/* Short answer */}
      <PageSection id="short-answer" title="The short answer">
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
          {SHORT_ANSWER.map((point) => (
            <li key={point.lead}><strong>{point.lead}</strong> {point.text}</li>
          ))}
        </ul>
      </PageSection>

      {/* What counts */}
      <PageSection id="what-counts" title="What counts as an error" intro="If you are unsure, report it. We would rather check than have a mistake stay up.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Report these</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {WHAT_COUNTS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">These are handled differently</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {WHAT_DOES_NOT_COUNT.map((item) => (
                <li key={item.lead}><strong>{item.lead}</strong> <span className="text-[var(--color-muted)]">{item.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      {/* How to report */}
      <PageSection id="how-to-report" title="How to report an error" intro="Five steps, about three minutes. The more exact your report, the faster we can fix it.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ol className="m-0 grid list-none gap-3 p-0">
            {REPORT_STEPS.map((step, index) => (
              <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm"><strong>{step.title}.</strong> <span className="text-[var(--color-muted)]">{step.text}</span></span>
              </li>
            ))}
          </ol>
          <div className={`${CARD_CLASS} self-start`}>
            <h3 className="mt-0">Copy-ready report template</h3>
            <p className="mt-0 text-sm text-[var(--color-muted)]">Paste this into the Contact form and fill in the square brackets.</p>
            <pre className="m-0 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm">{REPORT_TEMPLATE}</pre>
            <div className="mt-3">
              <CopyTemplateButton text={REPORT_TEMPLATE} label="Copy template" />
            </div>
            <p className="mb-0 mt-4"><Link href={REPORT_ERROR_PATH} className={BUTTON_PRIMARY}>Go to the Contact page</Link></p>
          </div>
        </div>
      </PageSection>

      {/* Response time */}
      <PageSection id="response-time" title="Our response time" intro={`We reply within ${ACKNOWLEDGE_WITHIN_BUSINESS_DAYS} business days. How quickly we fix depends on how much harm the mistake could do.`}>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Severity levels, what they mean, examples and our fix targets</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Severity</th>
                <th scope="col" className="p-3">What it means</th>
                <th scope="col" className="p-3">Examples</th>
                <th scope="col" className="p-3">We aim to fix within</th>
              </tr>
            </thead>
            <tbody>
              {SEVERITY_LEVELS.map((level) => (
                <tr key={level.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{level.label}</th>
                  <td className="p-3 align-top">{level.meaning}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">
                    <ul className="m-0 grid gap-1 pl-4">
                      {level.examples.map((example) => <li key={example}>{example}</li>)}
                    </ul>
                  </td>
                  <td className="p-3 align-top font-bold tabular-nums">
                    {level.fixTargetDays} {level.fixTargetDays === 1 ? "day" : "days"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          These targets follow the site&apos;s update schedule: 24 hours for price and plan changes, 3 days for safety, privacy and policy news, and the weekly maintenance pass for the rest. They are targets, not guarantees. The log below shows how often we meet them.
        </p>

        <h3 className="mb-3 mt-8">What happens after you report</h3>
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold text-[var(--color-accent)]">Step {index + 1}</p>
              <p className="m-0 mt-1 font-bold">{step.title}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{step.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* How we correct */}
      <PageSection id="how-we-correct" title="How we correct a page" intro="Four ways a page can change. Only the ones that change what a page claims are shown on the page and logged.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">The four kinds of fix, when each is used, what readers see and whether it is logged</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Kind</th>
                <th scope="col" className="p-3">When we use it</th>
                <th scope="col" className="p-3">What readers see</th>
                <th scope="col" className="p-3">Logged?</th>
              </tr>
            </thead>
            <tbody>
              {CORRECTION_KINDS.map((kind) => (
                <tr key={kind.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{kind.name}</th>
                  <td className="p-3 align-top">{kind.when}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{kind.whatReadersSee}</td>
                  <td className="p-3 align-top">{kind.logged}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 mt-8">Correction, update or superseded?</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {CORRECTION_VS_UPDATE.map((row) => (
            <article key={row.term} className={CARD_CLASS}>
              <h4 className="mt-0 text-base">{row.term}</h4>
              <p className="mt-0 text-sm">{row.meaning}</p>
              <p className="m-0 text-sm text-[var(--color-muted)]"><strong>Example:</strong> {row.example}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Recorded in:</strong> {row.where}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Log */}
      <PageSection id="log" title="Corrections log" intro="Every substantive correction, with the date reported, the date fixed and what changed. Typos and broken links are fixed without a row.">
        <CorrectionsLog entries={CORRECTIONS_LOG} />
        <p className={`${CARD_CLASS} mt-4 text-sm`}>
          <strong>An empty or short log is not proof the site is right.</strong> It only shows what has been reported and confirmed. If you find something, please report it.
        </p>

        <details className={`${CARD_CLASS} mt-4 py-3`}>
          <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>How to read a row</summary>
          <dl className="m-0 mt-3 grid gap-3 text-sm sm:grid-cols-2">
            {LOG_FIELD_GUIDE.map((field) => (
              <div key={field.column}>
                <dt className="font-bold">{field.column}</dt>
                <dd className="m-0 text-[var(--color-muted)]">{field.meaning}</dd>
              </div>
            ))}
          </dl>
        </details>
      </PageSection>

      {/* Special cases */}
      <PageSection id="special-cases" title="Special cases" intro="Some kinds of errors need their own rules.">
        <div className="grid gap-4 md:grid-cols-2">
          {SPECIAL_CASES.map((item) => (
            <article key={item.lead} className={CARD_CLASS}>
              <h3 className="mt-0 text-base">{item.lead}</h3>
              <p className="mb-0 text-sm text-[var(--color-muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Promises */}
      <PageSection id="promises" title="What we promise">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-5">
          {PROMISES.map((promise) => (
            <li key={promise.lead} className={CARD_CLASS}>
              <p className="m-0 font-bold">{promise.lead}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{promise.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Freshness labels */}
      <PageSection id="labels" title="Check a page yourself: the freshness labels" intro="Every page shows how current it is. These four labels tell you what to check, and what to report if it looks wrong.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">The four freshness labels and what to do if one looks wrong</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Label</th>
                <th scope="col" className="p-3">What it means</th>
                <th scope="col" className="p-3">If it looks wrong</th>
              </tr>
            </thead>
            <tbody>
              {FRESHNESS_LABELS.map((entry) => (
                <tr key={entry.label} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{entry.label}</th>
                  <td className="p-3 align-top">{entry.meaning}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{entry.ifItLooksWrong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Reader paths */}
      <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits.">
        <div className="grid gap-6 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <article key={path.id} className={CARD_CLASS}>
              <h3 className="mt-0">{path.title}</h3>
              <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {path.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="mb-0 mt-4 text-sm"><Link href={path.link.href}>{path.link.label}</Link></p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Limits */}
      <PageSection id="limits" title="What this policy cannot do">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {POLICY_LIMITS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      {/* FAQ */}
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

      {/* Related */}
      <PageSection id="related" title="Related pages">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {RELATED_LINKS.map((link) => (
            <li key={link.href} className={CARD_CLASS}>
              <p className="m-0 font-semibold"><Link href={link.href}>{link.title}</Link></p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{link.why}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Found something wrong?</p>
          <p className="m-0 font-semibold">Tell us. It takes about three minutes.</p>
        </div>
        <Link href={REPORT_ERROR_PATH} className={BUTTON_PRIMARY}>Report an error</Link>
      </footer>
    </div>
  );
}