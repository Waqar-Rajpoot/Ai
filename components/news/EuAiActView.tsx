import Link from "next/link";
import { CARD_CLASS } from "@/components/shared/pageStyles";
import { EuAiActRoleGuide } from "@/components/news/EuAiActRoleGuide";
import { EuAiActTimeline } from "@/components/news/EuAiActTimeline";
import { AI_ACT_NAME, LEGAL_DISCLAIMER, OMNIBUS_NAME, OMNIBUS_STEPS, SOURCE_CHECK_NOTE } from "@/lib/news/euAiActConstants";
import { EU_SOURCES, FINE_TIERS, MILESTONES, ROLE_GUIDES, STALE_CLAIMS } from "@/lib/news/euAiActData";
import { validateEuAiAct } from "@/lib/news/euAiActLogic";
import { formatIsoLabel } from "@/lib/news/changelogLogic";

const problems = validateEuAiAct(MILESTONES, EU_SOURCES, ROLE_GUIDES);
if (problems.length > 0) {
  throw new Error(`EU AI Act page data is invalid:\n${problems.join("\n")}`);
}

/** /news/eu-ai-act: the dates, what they mean in plain English, and what to do about them. */
export function EuAiActView() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6">
        <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">News · EU AI Act</p>
        <h1 className="mb-2 mt-1">The EU AI Act timeline: what already applies, what moved, and what is next</h1>
        <p className="m-0 text-lg">
          Most online timelines are out of date. In July 2026 the EU changed several dates. This page shows the current ones, what each means in plain English, and what you should do about it.
        </p>
      </header>

      <aside className={`${CARD_CLASS} mb-8`} role="note" aria-label="Not legal advice">
        <p className="m-0 text-sm"><strong>Not legal advice.</strong> {LEGAL_DISCLAIMER}</p>
      </aside>

      <section aria-labelledby="short-version" className="mb-10">
        <h2 id="short-version">The short version</h2>
        <ul className="space-y-2 pl-5">
          <li>The EU did <strong>not</strong> cancel or delay the whole AI Act. Banned practices (February 2025) and rules for general-purpose models (August 2025) already apply.</li>
          <li>The <strong>transparency rules</strong> (tell people it is AI, label deepfakes, mark generated content) started on August 2, 2026.</li>
          <li>The <strong>high-risk rules</strong> for hiring, credit and education moved from August 2, 2026 to <strong>December 2, 2027</strong>. For AI inside regulated products, from August 2, 2027 to <strong>August 2, 2028</strong>.</li>
          <li>The nearest date is <strong>December 2, 2026</strong>, when a marking grace period ends for older generative tools and two new bans start.</li>
        </ul>
      </section>

      <section aria-labelledby="dates" className="mb-10">
        <h2 id="dates">The dates</h2>
        <EuAiActTimeline milestones={MILESTONES} sources={EU_SOURCES} />
      </section>

      <section aria-labelledby="what-to-do" className="mb-10">
        <h2 id="what-to-do">What it means for you</h2>
        <p className="mt-0 text-sm text-[var(--color-muted)]">Pick the line that sounds most like you.</p>
        <EuAiActRoleGuide guides={ROLE_GUIDES} />
      </section>

      <section aria-labelledby="omnibus" className="mb-10">
        <h2 id="omnibus">How the dates moved</h2>
        <p className="mt-0">
          The changes came from the &ldquo;digital omnibus&rdquo; ({OMNIBUS_NAME}), which amends the AI Act ({AI_ACT_NAME}). It was agreed, passed and published in about eleven weeks:
        </p>
        <ol className="list-none space-y-1 p-0 text-sm">
          {OMNIBUS_STEPS.map((step) => (
            <li key={step.dateIso}>
              <strong>{formatIsoLabel(step.dateIso)}</strong>: {step.label}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fines" className="mb-10">
        <h2 id="fines">What breaking the rules can cost</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Maximum fines by type of breach</caption>
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th scope="col" className="py-2 pr-3">Breach</th>
                <th scope="col" className="py-2">Maximum fine</th>
              </tr>
            </thead>
            <tbody>
              {FINE_TIERS.map((tier) => (
                <tr key={tier.id} className="border-b border-[var(--color-border)]">
                  <th scope="row" className="py-2 pr-3 font-normal">{tier.breach}</th>
                  <td className="py-2 font-semibold">{tier.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
          Small and some mid-sized companies pay the lower of the two figures for the second and third tiers. These are ceilings, not typical fines.
        </p>
      </section>

      <section aria-labelledby="stale" className="mb-10">
        <h2 id="stale">Out-of-date claims you will still see online</h2>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {STALE_CLAIMS.map((claim) => (
            <li key={claim.id} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">{claim.seenIn}</p>
              <p className="mb-1 mt-1 font-semibold line-through decoration-[var(--color-muted)]">{claim.claim}</p>
              <p className="m-0 text-sm"><strong>Today:</strong> {claim.today}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sources" className="mb-8">
        <h2 id="sources">Sources and how sure we are</h2>
        <p className="mt-0 text-sm">{SOURCE_CHECK_NOTE}</p>
        <ul className="space-y-2 pl-5 text-sm">
          {EU_SOURCES.map((source) => (
            <li key={source.id}>
              <a href={source.url} rel="noopener noreferrer">{source.label}</a> ({source.kind}). {source.note}
            </li>
          ))}
        </ul>
        <p className="mb-0 text-sm">
          Where sources disagreed, see the <Link href="/news/changelog#eu-watermarking-date">changelog entry on the December 2 date</Link>. Spot a mistake? Use the <Link href="/about/corrections">corrections page</Link>.
        </p>
      </section>

      <aside className={CARD_CLASS} role="note" aria-label="Not legal advice">
        <p className="m-0 text-sm"><strong>Not legal advice.</strong> {LEGAL_DISCLAIMER}</p>
      </aside>
    </main>
  );
}