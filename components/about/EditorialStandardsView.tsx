import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { describeRoleHolder } from "@/lib/about/about";
import { LEVELS, TEAM_ROLES } from "@/lib/about/aboutData";
import {
  STAGE_OWNER_LABELS,
  SCOPE_LABELS,
  countChecksByScope,
  countStagesByOwner,
  hasPublishedAiDisclosure,
  listConflictedTools,
  type CheckScope,
} from "@/lib/about/editorial";
import { EDITORIAL_REVIEWED_ON } from "@/lib/about/editorialConstants";
import {
  AI_CONFLICT_NOTE,
  AI_PLACEHOLDER_NOTE,
  FAQ,
  GLOSSARY,
  RELATED_LINKS,
  SOURCES,
  STALE_RULE_STATUS,
  SUMMARY_POINTS,
  WHAT_CAN_GO_WRONG,
} from "@/lib/about/editorialContent";
import {
  AI_ALLOWED,
  AI_NOT_ALLOWED,
  AI_TOOLS_USED,
  CONTENT_BADGES,
  FIRST_TEN,
  FIRST_TEN_REASONS,
  HUMAN_EDIT_STEPS,
  LEVEL_BADGE_RULES,
  NEWS_TRIGGERS,
  NOT_COVERED,
  PRE_CHECKS,
  PUBLISHING_STAGES,
  REVIEW_RULE,
  TOPIC_QUESTIONS,
  TOPIC_SOURCES,
} from "@/lib/about/editorialData";
import { LABELS, POST_BOTTOM_PARTS, POST_TOP_PARTS } from "@/lib/news/newsContent";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { ReviewAgeChecker } from "./ReviewAgeChecker";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "topics", label: "How topics are chosen" },
  { id: "writing", label: "How pages are written" },
  { id: "checks", label: "Review checklist" },
  { id: "stale", label: "Stale-review rule" },
  { id: "ai", label: "AI tools" },
  { id: "levels", label: "Levels and badges" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
] as const;

const CHECK_SCOPES: readonly CheckScope[] = ["all", "prices", "reviews", "affiliate"];
const STAGE_COUNTS = countStagesByOwner(PUBLISHING_STAGES);
const CHECK_COUNTS = countChecksByScope(PRE_CHECKS);
const AI_PUBLISHED = hasPublishedAiDisclosure(AI_TOOLS_USED);
const CONFLICTED_TOOLS = listConflictedTools(AI_TOOLS_USED);

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Steps from idea to page", value: String(PUBLISHING_STAGES.length) },
  { label: "Pre-publish checks", value: String(PRE_CHECKS.length) },
  { label: "Learning levels", value: String(LEVELS.length) },
  { label: "Content types", value: String(CONTENT_BADGES.length) },
];

/** Editorial standards: how topics are chosen, how pages are written and checked, AI use, and badges. */
export function EditorialStandardsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link> › <Link href="/about">About</Link> › <span aria-current="page">Editorial standards</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">About · Trust</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {EDITORIAL_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Policy page</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Editorial standards: how we choose, write, check and label pages</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          How a topic becomes a page, who checks it, when a review counts as old, how we use AI tools, and what the badges on every page mean.
        </p>
        <p className="relative mb-0 mt-3 text-sm text-[var(--color-muted)]">By {ARTICLE_AUTHOR_LABEL}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#writing" className={BUTTON_PRIMARY}>See how a page is made</a>
          <a href="#ai" className={BUTTON_OUTLINE}>How we use AI</a>
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
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Spot a page that breaks these rules?</p>
            <p className="mb-0 mt-1 text-sm">Tell us on the <Link href="/about/corrections">corrections page</Link>. We log what was wrong and when it was fixed.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="topics" title="How topics are chosen" intro="Three sources feed the list of pages. A topic needs a real question behind it.">
        <div className="grid gap-4 lg:grid-cols-3">
          {TOPIC_SOURCES.map((source) => (
            <article key={source.id} className={CARD_CLASS}>
              <h3 className="mt-0">{source.name}</h3>
              <p className="mb-1 mt-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Where it comes from</p>
              <ul className="m-0 grid gap-1 pl-5 text-sm">
                {source.whereItComes.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className="mb-0 mt-3 text-sm"><strong>What we do:</strong> {source.whatWeDo}</p>
              <p className="mb-0 mt-3 flex flex-wrap gap-4 text-sm">
                {source.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
              </p>
            </article>
          ))}
        </div>

        <h3>Our publishing targets after a news trigger</h3>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">News triggers, what we publish and our target time</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Trigger</th>
                <th scope="col" className="p-3">We publish</th>
                <th scope="col" className="p-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {NEWS_TRIGGERS.map((row) => (
                <tr key={row.trigger} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.trigger}</th>
                  <td className="p-3 align-top">{row.whatWePublish}</td>
                  <td className="p-3 align-top font-semibold">{row.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">These are targets, not guarantees. The date on each page shows what actually happened.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Six questions before we write</h3>
            <ol className="m-0 grid gap-2 pl-5 text-sm">
              {TOPIC_QUESTIONS.map((q) => <li key={q.title}><strong>{q.title}</strong> {q.detail}</li>)}
            </ol>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What we do not cover</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {NOT_COVERED.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </div>

        <h3>How we picked the first ten articles</h3>
        <ul className="m-0 mb-3 grid gap-1 pl-5 text-sm">
          {FIRST_TEN_REASONS.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-sm">
          {FIRST_TEN.map((entry) => (
            <li key={entry.number} className={BADGE_CLASS}>
              <Link href={entry.href}>{entry.number}. {entry.title}</Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="writing" title="How pages are written and checked" intro={`Nine steps, from idea to a page that is kept current. ${STAGE_COUNTS.writer} are the writer's, ${STAGE_COUNTS.reviewer} the reviewer's and ${STAGE_COUNTS.both} are shared.`}>
        <div className="grid gap-4 md:grid-cols-2">
          {TEAM_ROLES.map((role) => (
            <article key={role.id} className={CARD_CLASS}>
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{role.role}</p>
              <h3 className="mb-1 mt-1">{describeRoleHolder(role)}</h3>
              <ul className="m-0 grid gap-1 pl-5 text-sm">
                {role.responsibilities.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">The reviewer is never the person who wrote the page. More about the team on <Link href="/about#who">the About page</Link>.</p>

        <ol className="m-0 mt-6 grid list-none gap-3 p-0">
          {PUBLISHING_STAGES.map((stage, index) => (
            <li key={stage.id} className={`${CARD_CLASS} grid gap-3 md:grid-cols-[2.5rem_1fr_16rem]`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <div>
                <p className="m-0 flex flex-wrap items-center gap-2 font-semibold">
                  {stage.title}
                  <span className={BADGE_CLASS}>{STAGE_OWNER_LABELS[stage.owner]}</span>
                </p>
                <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{stage.what}</p>
              </div>
              <p className="m-0 text-sm"><strong>You see:</strong> {stage.readerSees}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">At the top of every post</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {POST_TOP_PARTS.map((part) => <li key={part}>{part}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">At the bottom</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {POST_BOTTOM_PARTS.map((part) => <li key={part}>{part}</li>)}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="checks" title="The review checklist" intro="The reviewer applies the checks that fit the page. Prices, reviews and affiliate links each add their own.">
        <ul className="m-0 mb-4 flex list-none flex-wrap gap-2 p-0 text-xs">
          {CHECK_SCOPES.map((scope) => (
            <li key={scope} className={BADGE_CLASS}>{SCOPE_LABELS[scope]}: <strong className="tabular-nums">{CHECK_COUNTS[scope]}</strong></li>
          ))}
        </ul>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Pre-publication checks, who they apply to and why</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Applies to</th>
                <th scope="col" className="p-3">Check</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {PRE_CHECKS.map((check) => (
                <tr key={check.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{SCOPE_LABELS[check.scope]}</th>
                  <td className="p-3 align-top">{check.text}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{check.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="stale" title="The stale-review rule" intro="A review is a snapshot. The rule says how old a snapshot may be before we mark it stale, and what keeps pages fresh in the meantime.">
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {STALE_RULE_STATUS.map((point) => (
            <li key={point.headline} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{point.headline}</strong> {point.detail}</p>
            </li>
          ))}
        </ul>
        <div className={`${CARD_CLASS} mt-4 ${REVIEW_RULE.staleAfterDays === null ? "border-amber-500/60" : "border-[var(--color-accent)]"}`}>
          <p className="m-0 text-sm">
            <strong>Current limit:</strong>{" "}
            {REVIEW_RULE.staleAfterDays === null ? "not yet decided." : `${REVIEW_RULE.staleAfterDays} days from the test date.`}
          </p>
        </div>
        <h3>How old is the review you are reading?</h3>
        <ReviewAgeChecker />
      </PageSection>

      <PageSection id="ai" title="AI tools used for drafting" intro="A site about AI should say how it uses AI. Which models, what they did, and how a person edited the result.">
        <h3 className="mt-0">Which models, and what they did</h3>
        {AI_PUBLISHED ? (
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">AI tools used to help draft content</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Model</th>
                  <th scope="col" className="p-3">What it did</th>
                  <th scope="col" className="p-3">Human edit</th>
                  <th scope="col" className="p-3">Also reviewed here?</th>
                </tr>
              </thead>
              <tbody>
                {AI_TOOLS_USED.map((use) => (
                  <tr key={`${use.maker}-${use.model}`} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{use.model}<span className="block text-xs font-normal text-[var(--color-muted)]">{use.maker}</span></th>
                    <td className="p-3 align-top">{use.whatItDid}</td>
                    <td className="p-3 align-top">{use.humanEdit}</td>
                    <td className="p-3 align-top">{use.isAlsoReviewed ? "Yes, see the independence page" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <p className="m-0 text-sm">{AI_PLACEHOLDER_NOTE}</p>
          </div>
        )}
        {CONFLICTED_TOOLS.length > 0 && (
          <p className="mb-0 mt-3 text-sm">{CONFLICTED_TOOLS.map((use) => use.model).join(", ")} also appear in our reviews. {AI_CONFLICT_NOTE}</p>
        )}
        {CONFLICTED_TOOLS.length === 0 && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{AI_CONFLICT_NOTE}</p>}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What AI help may be used for</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {AI_ALLOWED.map((rule) => <li key={rule.title}><strong>{rule.title}.</strong> {rule.detail}</li>)}
            </ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What it may not do</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {AI_NOT_ALLOWED.map((rule) => <li key={rule.title}><strong>{rule.title}.</strong> {rule.detail}</li>)}
            </ul>
          </div>
        </div>

        <h3>The human edit</h3>
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {HUMAN_EDIT_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">Read the full conflict rule on <Link href="/about/independence">independence and disclosure</Link>.</p>
      </PageSection>

      <PageSection id="levels" title="Levels and badges" intro="Every guide, review and tool carries badges, so you can tell before you read whether a page is right for you.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">The four levels, who each is for and what you can do afterwards</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Level</th>
                <th scope="col" className="p-3">Reader</th>
                <th scope="col" className="p-3">After this level you can</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((level) => (
                <tr key={level.level} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold"><Link href={level.href}>{level.level}. {level.name}</Link></th>
                  <td className="p-3 align-top">{level.reader}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{level.afterThisLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="m-0 mt-4 grid list-none gap-3 p-0 md:grid-cols-2">
          {LEVEL_BADGE_RULES.map((rule) => (
            <li key={rule.title} className={CARD_CLASS}>
              <p className="m-0 text-sm"><strong>{rule.title}</strong> {rule.detail}</p>
            </li>
          ))}
        </ul>

        <h3>Content-type badges</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENT_BADGES.map((badge) => (
            <article key={badge.type} className={CARD_CLASS}>
              <p className="m-0"><span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{badge.type}</span></p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{badge.meaning}</p>
              <p className="mb-0 mt-2 text-sm"><Link href={badge.exampleHref}>{badge.exampleLabel}</Link></p>
            </article>
          ))}
        </div>

        <h3>Freshness and result labels</h3>
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LABELS.map((entry) => (
            <div key={entry.label} className={CARD_CLASS}>
              <dt className="font-bold">{entry.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
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

      <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${EDITORIAL_REVIEWED_ON}. This page is hand-written policy, labelled “Tested by us: no”. It describes how we work, and the other trust pages hold the detail.`}>
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
          <p className="m-0 font-semibold">Where our numbers come from, and how conflicts are settled</p>
        </div>
        <Link href="/about/source-policy" className={BUTTON_PRIMARY}>Read the source policy</Link>
      </footer>
    </div>
  );
}