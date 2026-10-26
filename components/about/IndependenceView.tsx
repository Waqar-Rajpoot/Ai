import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { INDEPENDENCE_UPDATED_ON } from "@/lib/about/independenceConstants";
import {
  AFFILIATE_HOW,
  AFFILIATE_NEVER,
  AFFILIATE_WHERE,
  CURRENT_RELATIONSHIPS,
  DRAFTING_RULES,
  FAQ,
  GLOSSARY,
  GOTCHAS,
  MAKER_ACCESS_RULES,
  METHOD_NOTES,
  NEVER_INPUTS,
  OTHER_INTEREST_RULES,
  PROCESS_STEPS,
  READER_PATHS,
  REGULATOR_LINKS,
  RELATED_LINKS,
  RELATIONSHIP_KIND_LABELS,
  REVENUE_STREAMS,
  SCORE_INPUTS,
  SHORT_ANSWER,
  SPONSOR_CAN,
  SPONSOR_CANNOT,
  SPONSOR_SLOT_RULES,
  SPONSORED_CONTENT_RULES,
  WONT_DO,
} from "@/lib/about/independenceContent";
import {
  AD_LABEL,
  AFFILIATE_DISCLOSURE_FULL,
  AFFILIATE_DISCLOSURE_SHORT,
  AI_SUBJECT_NOTE,
  MAKER_ACCESS_NOTE,
  OWN_PRODUCT_NOTE,
  SPONSOR_SLOT_LABEL,
  SPONSOR_SLOT_NOTE,
  SPONSORED_LABEL,
  SPONSORED_NOTE,
} from "@/lib/shared/disclosure";
import { DisclosureFinder } from "./DisclosureFinder";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "promise", label: "Our promise" },
  { id: "revenue", label: "How we earn money" },
  { id: "affiliate", label: "Affiliate relationships" },
  { id: "sponsors", label: "Sponsors" },
  { id: "conflicts", label: "Conflict of interest" },
  { id: "finder", label: "Disclosure finder" },
  { id: "wording", label: "Label wording" },
  { id: "process", label: "How we keep it separate" },
  { id: "wont", label: "What we won't do" },
  { id: "current", label: "Current relationships" },
  { id: "rules", label: "Rules we follow" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "method", label: "Method" },
] as const;

const WORDING_SAMPLES: readonly { label: string; where: string; text: string }[] = [
  { label: "Affiliate disclosure (short)", where: "Near the first affiliate link", text: AFFILIATE_DISCLOSURE_SHORT },
  { label: "Affiliate disclosure (full)", where: "End of the page", text: AFFILIATE_DISCLOSURE_FULL },
  { label: SPONSORED_LABEL, where: "Top of sponsored content and in listings", text: SPONSORED_NOTE },
  { label: SPONSOR_SLOT_LABEL, where: "The newsletter and roundup sponsor slot", text: SPONSOR_SLOT_NOTE },
  { label: AD_LABEL, where: "Above or on each ad unit", text: "Marks every paid ad unit. Ads never sit inside a summary, scorecard, verdict or ranking." },
  { label: "Maker access", where: "Near the top, before the results", text: MAKER_ACCESS_NOTE },
  { label: "Drafting model is the subject", where: "Near the top of non-scoring pages", text: AI_SUBJECT_NOTE },
  { label: "Our own product", where: "Beside each product and at checkout", text: OWN_PRODUCT_NOTE },
];

const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS = "bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]";

function RuleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 grid gap-2 pl-5 text-sm">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

/** Full Independence and disclosure page: promise, revenue, rules, finder, labels, FAQ and glossary. */
export function IndependenceView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Applies to every page</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Updated {INDEPENDENCE_UPDATED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Independence and disclosure: how we make money, and what money never touches</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Payment never changes a score or a verdict. This page lists every way money can reach the site, how each is labelled, and the rules that keep reviews separate.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#revenue" className={BUTTON_PRIMARY}>How we earn money</a>
          <a href="#finder" className={BUTTON_OUTLINE}>Check what a page must show</a>
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
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SHORT_ANSWER.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Our promise</p>
            <p className="mb-2 mt-1 text-lg font-semibold">Payment never changes a score or verdict.</p>
            <p className="m-0 text-sm">The same promise appears in the <Link href="/about/source-policy">source policy</Link> and on every review.</p>
          </aside>
        </div>
      </PageSection>

      {/* Reader paths */}
      <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one points to the part of this page you need.">
        <div className="grid gap-6 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <article key={path.id} className={CARD_CLASS}>
              <h3 className="mt-0">{path.title}</h3>
              <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
              <RuleList items={path.points} />
              <p className="mb-0 mt-4 text-sm">
                {path.link.href.startsWith("#") ? <a href={path.link.href}>{path.link.label}</a> : <Link href={path.link.href}>{path.link.label}</Link>}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Promise */}
      <PageSection id="promise" title="Promise: payment never changes a score or verdict" intro="A score is built only from tests. Nothing about money is an input.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-l-4 border-l-emerald-500`}>
            <h3 className="mt-0">What a score is built from</h3>
            <ol className="m-0 grid gap-2 pl-5 text-sm">
              {SCORE_INPUTS.map((input) => (
                <li key={input.point}><strong>{input.point}.</strong> <span className="text-[var(--color-muted)]">{input.detail}</span></li>
              ))}
            </ol>
            <p className="mb-0 mt-3 text-sm"><Link href="/about/how-we-test">How we test</Link></p>
          </div>
          <div className={`${CARD_CLASS} border-l-4 border-l-red-500`}>
            <h3 className="mt-0">What never touches a score</h3>
            <RuleList items={NEVER_INPUTS} />
          </div>
        </div>
      </PageSection>

      {/* Revenue */}
      <PageSection id="revenue" title="How we earn money" intro="Every way money can reach the site, how it is labelled, and what it can never do.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[60rem]`}>
            <caption className="sr-only">Each source of income with where it appears, its label and what it never does</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">What it is</th>
                <th scope="col" className="p-3">Where it appears</th>
                <th scope="col" className="p-3">How it is labelled</th>
                <th scope="col" className="p-3">What it never does</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE_STREAMS.map((row) => (
                <tr key={row.stream} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.stream}</th>
                  <td className="p-3 align-top">{row.whatItIs}</td>
                  <td className="p-3 align-top">{row.whereItAppears}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.label}</td>
                  <td className="p-3 align-top">{row.neverDoes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Affiliate */}
      <PageSection id="affiliate" title="Affiliate relationships: where they appear and how they are disclosed">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Where they appear</h3>
            <RuleList items={AFFILIATE_WHERE} />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How they are disclosed</h3>
            <RuleList items={AFFILIATE_HOW} />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What they never do</h3>
            <RuleList items={AFFILIATE_NEVER} />
          </div>
        </div>
      </PageSection>

      {/* Sponsors */}
      <PageSection id="sponsors" title="Sponsors: the newsletter slot and sponsored content">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Newsletter sponsor slot</h3>
            <RuleList items={SPONSOR_SLOT_RULES} />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Sponsored content labels</h3>
            <RuleList items={SPONSORED_CONTENT_RULES} />
          </div>
          <div className={`${CARD_CLASS} border-l-4 border-l-emerald-500`}>
            <h3 className="mt-0">A sponsor can have</h3>
            <RuleList items={SPONSOR_CAN} />
          </div>
          <div className={`${CARD_CLASS} border-l-4 border-l-red-500`}>
            <h3 className="mt-0">A sponsor cannot have</h3>
            <RuleList items={SPONSOR_CANNOT} />
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm">See <Link href="/sponsored">sponsored content</Link> and the <Link href="/newsletter">newsletter</Link>.</p>
      </PageSection>

      {/* Conflicts */}
      <PageSection id="conflicts" title="Conflict-of-interest rule" intro="Two situations need their own rules: models that also draft our content, and makers who want to see their reviews first.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Models that also draft content</h3>
            <RuleList items={DRAFTING_RULES} />
            <p className="mb-0 mt-3 text-sm"><Link href="/about/editorial-standards">Editorial standards</Link></p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">No pre-publication access for makers</h3>
            <RuleList items={MAKER_ACCESS_RULES} />
          </div>
        </div>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Other interests</h3>
          <RuleList items={OTHER_INTEREST_RULES} />
        </div>
      </PageSection>

      {/* Finder */}
      <PageSection id="finder" title="Disclosure finder: what must this page show?" intro="Pick a kind of page and what it contains. See the labels it must carry and what it must not do.">
        <DisclosureFinder />
      </PageSection>

      {/* Wording */}
      <PageSection id="wording" title="The exact wording of each label" intro="Every page uses this wording. It lives in one place, so labels cannot drift.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {WORDING_SAMPLES.map((sample) => (
            <li key={sample.label} className={CARD_CLASS}>
              <p className="m-0 flex flex-wrap items-center gap-2">
                <span className={BADGE_CLASS}>{sample.label}</span>
                <span className="text-xs text-[var(--color-muted)]">{sample.where}</span>
              </p>
              <p className="mb-0 mt-2 text-sm">{sample.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Process */}
      <PageSection id="process" title="How we keep money and judgement separate" intro="The order of work is part of the rule: scores come first, links last.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* Won't do */}
      <PageSection id="wont" title="What we will not do">
        <div className={`${CARD_CLASS} border-l-4 border-l-red-500`}>
          <ul className="m-0 grid gap-2 pl-5 text-sm">
            {WONT_DO.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      {/* Current relationships */}
      <PageSection id="current" title="Our current relationships" intro={`Every affiliate program, sponsor and maker-provided access that is active. Updated ${INDEPENDENCE_UPDATED_ON}.`}>
        {CURRENT_RELATIONSHIPS.length === 0 ? (
          <p className={`${CARD_CLASS} m-0`}>
            No affiliate programs, sponsors or maker-provided access are active as of {INDEPENDENCE_UPDATED_ON}. If that changes, this list and the <Link href="/news/changelog">changelog</Link> will show it.
          </p>
        ) : (
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className={`${TABLE_CLASS} min-w-[44rem]`}>
              <caption className="sr-only">Active affiliate programs, sponsors and maker-provided access</caption>
              <thead className={TABLE_HEAD_CLASS}>
                <tr>
                  <th scope="col" className="p-3">Name</th>
                  <th scope="col" className="p-3">Type</th>
                  <th scope="col" className="p-3">Since</th>
                  <th scope="col" className="p-3">Appears on</th>
                  <th scope="col" className="p-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {CURRENT_RELATIONSHIPS.map((row) => (
                  <tr key={`${row.kind}-${row.name}`} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.name}</th>
                    <td className="p-3 align-top">{RELATIONSHIP_KIND_LABELS[row.kind]}</td>
                    <td className="p-3 align-top">{row.since}</td>
                    <td className="p-3 align-top">{row.appearsOn}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageSection>

      {/* Rules we follow */}
      <PageSection id="rules" title="Rules we follow" intro="Paid relationships are regulated, and the rules differ by country. This is our policy, not legal advice.">
        <ul className="m-0 grid list-none gap-3 p-0">
          {REGULATOR_LINKS.map((link) => (
            <li key={link.href} className={CARD_CLASS}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">{link.title}</a>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{link.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {GOTCHAS.map((item) => <li key={item}>{item}</li>)}
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

      {/* Glossary */}
      <PageSection id="glossary" title="Key words" intro="Short definitions. The full list is in the glossary.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="mb-0 mt-3 text-sm"><Link href="/learn/glossary">Open the full glossary</Link></p>
      </PageSection>

      {/* Method */}
      <PageSection id="method" title="Method and related pages">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How this policy works</h3>
            <RuleList items={METHOD_NOTES} />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Related pages</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {RELATED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.title}</Link>
                  <span className="text-[var(--color-muted)]"> · {link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mb-0 mt-4 text-sm"><Link href="/about/corrections">Report a missing label or an undisclosed link</Link></p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See how we test models and label the results</p>
        </div>
        <Link href="/about/how-we-test" className={BUTTON_PRIMARY}>Open How we test</Link>
      </footer>
    </div>
  );
}