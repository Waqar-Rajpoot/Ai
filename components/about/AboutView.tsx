import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LABELS } from "@/lib/news/newsContent";
import { countPillarSections, describeRoleHolder } from "@/lib/about/about";
import { ABOUT_REVIEWED_ON, SITE_NAME, UNNAMED_ROLE_LABEL } from "@/lib/about/aboutConstants";
import {
  AI_DRAFTING_POINTS,
  BEFORE_YOU_WRITE,
  CONTACT_ROUTES,
  CURRENT_CHECK,
  FAQ,
  GLOSSARY,
  PROMISES,
  READER_STARTS,
  RELATED_LINKS,
  SCORECARD_POINTS,
  SOURCES,
  SUMMARY_POINTS,
  WE_DO_NOT,
  WHAT_CAN_GO_WRONG,
  WHY_THE_SITE_EXISTS,
} from "@/lib/about/aboutContent";
import { CADENCE, DATA_PAGES, FUNDING, LEVELS, PILLARS, TEAM_ROLES } from "@/lib/about/aboutData";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "who", label: "Who runs the site" },
  { id: "why", label: "Why it exists" },
  { id: "cover", label: "What we cover" },
  { id: "levels", label: "Four levels" },
  { id: "current", label: "How we stay current" },
  { id: "promises", label: "Our promises" },
  { id: "funding", label: "How it is funded" },
  { id: "readers", label: "Where to start" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Pillars", value: String(PILLARS.length) },
  { label: "Learning levels", value: String(LEVELS.length) },
  { label: "Sections you can open", value: String(countPillarSections(PILLARS)) },
  { label: "Scorecard points", value: String(SCORECARD_POINTS.length) },
];

/** About us: who runs the site, what it covers, how it stays current, how it is funded and how to reach us. */
export function AboutView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <span aria-current="page">About us</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">About · Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {ABOUT_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Dated and sourced</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">About {SITE_NAME}</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          A publisher, a school and a review desk for AI models. We teach, we compare with dated tests, and we keep every price, score and rule sourced, so you can judge it yourself.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#cover" className={BUTTON_PRIMARY}>See what we cover</a>
          <a href="#promises" className={BUTTON_OUTLINE}>Read our promises</a>
        </div>
      </header>

      <dl className="m-0 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">{fact.label}</dt>
            <dd className="m-0 text-2xl font-extrabold tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>

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

      <PageSection id="summary" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SUMMARY_POINTS.map((point) => (
              <li key={point.headline}><strong>{point.headline}</strong> {point.detail}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">New here?</p>
            <p className="mb-2 mt-1 text-sm">Start with <Link href="/learn/foundations/what-is-ai">What is AI?</Link> or open the <Link href="/compare/models">model directory</Link>.</p>
            <p className="m-0 text-sm">Want proof first? Read <a href="#promises">our promises</a>.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="who" title="Who runs the site" intro="Two roles stand behind every page: someone who writes and tests, and someone who reviews.">
        <div className="grid gap-4 md:grid-cols-2">
          {TEAM_ROLES.map((role) => (
            <article key={role.id} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{role.role}</p>
              <h3 className="mb-1 mt-1">{describeRoleHolder(role)}</h3>
              {role.background ? (
                <p className="m-0 text-sm text-[var(--color-muted)]">{role.background}</p>
              ) : (
                <p className="m-0 text-xs text-[var(--color-muted)]">{role.name ? "" : `${UNNAMED_ROLE_LABEL}. We will not publish a page of claims about people we have not named.`}</p>
              )}
              <p className="mb-1 mt-3 text-sm font-semibold">What this role does</p>
              <ul className="m-0 grid gap-1 pl-5 text-sm">
                {role.responsibilities.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <h3>AI tools and the human edit</h3>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {AI_DRAFTING_POINTS.map((point) => (
            <li key={point.headline} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">Full detail: <Link href="/about/editorial-standards">editorial standards</Link> and <Link href="/about/independence">independence and disclosure</Link>.</p>
      </PageSection>

      <PageSection id="why" title="Why the site exists">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {WHY_THE_SITE_EXISTS.map((point) => (
            <li key={point.headline} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="cover" title="What we cover" intro="Three jobs, with a layer of trust pages under all of them.">
        <div className="grid gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.id} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{pillar.name}</p>
              <h3 className="mb-1 mt-1 text-base">{pillar.question}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{pillar.whatItDoes}</p>
              <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
                {pillar.sections.map((section) => <li key={section.href}><Link href={section.href}>{section.label}</Link></li>)}
              </ul>
              <p className="mb-0 mt-3 text-sm font-semibold"><Link href={pillar.start.href}>{pillar.start.label}</Link></p>
            </article>
          ))}
        </div>
        <div className={`${CARD_CLASS} mt-4`}>
          <p className="m-0 text-sm"><strong>Trust sits under all three.</strong> Editorial standards, how we test, source policy, independence and corrections explain how every page above is made. See <a href="#promises">our promises</a>.</p>
        </div>
      </PageSection>

      <PageSection id="levels" title="Four learning levels" intro="Every guide, review and tool carries a level badge, so you know whether a page is for you and what to read next.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <caption className="sr-only">The four learning levels, who each is for and what you can do afterwards</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Level</th>
                <th scope="col" className="p-3">Reader</th>
                <th scope="col" className="p-3">After this level you can</th>
                <th scope="col" className="p-3">Typical page</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((level) => (
                <tr key={level.level} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><Link href={level.href}>{level.level}. {level.name}</Link></th>
                  <td className="p-3 align-top">{level.reader}</td>
                  <td className="p-3 align-top">{level.afterThisLevel}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{level.typicalPage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">Each level hub opens with a short self-check. Every Level 3 and Level 4 page links back to the Level 1 or 2 page that explains its prerequisite.</p>
      </PageSection>

      <PageSection id="current" title="How we stay current" intro="Our targets for each kind of change. They are targets, not guarantees, and the date on every page shows what actually happened.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">Update cadence: what triggers an update, what we publish, our target and where</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">When this happens</th>
                <th scope="col" className="p-3">We publish</th>
                <th scope="col" className="p-3">Our target</th>
                <th scope="col" className="p-3">Where</th>
              </tr>
            </thead>
            <tbody>
              {CADENCE.map((row) => (
                <tr key={row.trigger} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.trigger}</th>
                  <td className="p-3 align-top">{row.whatWePublish}</td>
                  <td className="p-3 align-top font-semibold">{row.target}</td>
                  <td className="p-3 align-top"><Link href={row.where.href}>{row.where.label}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>How often each data page is refreshed</h3>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">Update frequency by data page</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Data page</th>
                <th scope="col" className="p-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {DATA_PAGES.map((row) => (
                <tr key={row.page.href} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold"><Link href={row.page.href}>{row.page.label}</Link></th>
                  <td className="p-3">{row.updateTrigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Four labels you will see</h3>
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LABELS.map((entry) => (
            <div key={entry.label} className={CARD_CLASS}>
              <dt className="font-bold">{entry.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">The changelog</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">Every update to the site goes in the changelog: what changed, and when. It also records source conflicts, such as two sources giving different dates, and how we settled them.</p>
            <p className="mb-0 mt-3 text-sm"><Link href="/news/changelog">Open the changelog</Link> · <Link href="/about/corrections">Corrections log</Link></p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Is this page current? Five checks</h3>
            <ol className="m-0 grid gap-2 pl-5 text-sm">
              {CURRENT_CHECK.map((step) => <li key={step.headline}><strong>{step.headline}</strong> {step.detail}</li>)}
            </ol>
          </div>
        </div>
      </PageSection>

      <PageSection id="promises" title="Our promises" intro="Six commitments, each with the page that explains it. If we ever break one, tell us.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((promise, index) => (
            <li key={promise.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm">
                <strong>{promise.title}</strong> {promise.detail}
                <span className="mt-2 block"><Link href={promise.link.href}>{promise.link.label}</Link></span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What we do not do</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {WE_DO_NOT.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How we test, in one list</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">Every review uses the same seven-point scorecard.</p>
            <ol className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {SCORECARD_POINTS.map((point) => <li key={point}>{point}</li>)}
            </ol>
            <p className="mb-0 mt-3 text-sm"><Link href="/about/how-we-test">Weights, settings and labels</Link></p>
          </div>
        </div>
      </PageSection>

      <PageSection id="funding" title="How the site is funded" intro="A site that reviews products should be open about money. These are the ways it may earn, and the rule for each.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Ways the site may earn money and the rule for each</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="p-3">Our rule</th>
              </tr>
            </thead>
            <tbody>
              {FUNDING.map((row) => (
                <tr key={row.source} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.source}</th>
                  <td className="p-3 align-top">{row.ourRule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${CARD_CLASS} mt-4 border-[var(--color-accent)]`}>
          <p className="m-0 text-sm"><strong>The promise:</strong> payment never changes a score or a verdict. Read the full rules on <Link href="/about/independence">independence and disclosure</Link>.</p>
        </div>
      </PageSection>

      <PageSection id="readers" title="Where to start" intro="Pick the line that sounds like you.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Where to start for each kind of reader</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">If you are</th>
                <th scope="col" className="p-3">Start with</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {READER_STARTS.map((row) => (
                <tr key={row.reader} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.reader}</th>
                  <td className="p-3 align-top"><Link href={row.start.href}>{row.start.label}</Link></td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="contact" title="Contact" intro="Three ways to reach us, depending on what you need.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {CONTACT_ROUTES.map((route) => (
            <li key={route.title} className={CARD_CLASS}>
              <h3 className="mt-0">{route.title}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{route.detail}</p>
              <p className="mb-0 mt-3 text-sm font-semibold"><Link href={route.link.href}>{route.link.label}</Link></p>
            </li>
          ))}
        </ul>
        <div className={`${CARD_CLASS} mt-4`}>
          <h3 className="mt-0">Before you write</h3>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {BEFORE_YOU_WRITE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
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

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${ABOUT_REVIEWED_ON}. This page is hand-written and labelled “Tested by us: no”. It describes how we work, and each policy page holds the detail.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Our trust pages</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {SOURCES.map((source) => (
                <li key={source.title}>
                  {source.href ? <Link href={source.href}>{source.title}</Link> : <span className="font-semibold">{source.title}</span>}
                  <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Also useful</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm">
              {RELATED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                  <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See exactly how we test the models we review</p>
        </div>
        <Link href="/about/how-we-test" className={BUTTON_PRIMARY}>Read how we test</Link>
      </footer>
    </div>
  );
}