import Link from "next/link";
import { InfoCards, NumberedSteps } from "@/components/learn/InfoCards";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  ALTERNATIVES_FAQ,
  ALTERNATIVES_HUB_AUTHOR,
  ALTERNATIVES_HUB_READ_MINUTES,
  ALTERNATIVES_HUB_UPDATED_ON,
  ALTERNATIVES_RELATED,
  ALTERNATIVES_SECTIONS,
  ALTERNATIVES_SOURCE_NOTE,
  ALTERNATIVES_WHAT_CAN_GO_WRONG,
  HOW_PAGES_WORK,
  HOW_WE_CHOOSE,
  STAY_WHEN,
  SUMMARY_POINTS,
  SWITCH_REASONS,
  SWITCH_WHEN,
  USING_TWO_NOTE,
  type SwitchReason,
} from "@/lib/compare/alternativesContent";
import { ALTERNATIVE_ENTRIES } from "@/lib/compare/alternativesIndex";
import { SWITCHING_CHECKLIST } from "@/lib/compare/switchingChecklist";
import { AlternativesExplorer } from "./AlternativesExplorer";
import { FaqList } from "./FaqList";
import { RelatedLinks } from "./RelatedLinks";
import { SwitchingChecklist } from "./SwitchingChecklist";

function ReasonCard({ reason }: { reason: SwitchReason }) {
  return (
    <li className={`${CARD_CLASS} flex flex-col`}>
      <h3 className="mb-1 mt-0 text-lg">{reason.title}</h3>
      <p className="mt-0 text-sm text-[var(--color-muted)]">{reason.summary}</p>
      <p className="mb-1 mt-3 text-sm font-semibold">What to check</p>
      <CheckList items={reason.checks} mark="✓" />
      <p className="mb-1 mt-3 text-sm font-semibold">Where to look</p>
      <ul className="m-0 grid list-none gap-1 p-0 text-sm">
        {reason.lookAt.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <p className="mb-0 mt-3 rounded-xl bg-[var(--color-surface)] p-3 text-sm">
        <strong>You may give up:</strong> {reason.tradeOff}
      </p>
    </li>
  );
}

/** Alternatives hub: list of 'Alternatives to…' pages, why people switch, and a switching checklist. */
export function AlternativesHubView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Levels 2-3 · Hub
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI alternatives: how to switch from one app or model to another</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Thinking of leaving a chatbot or model? Find the page for it, see why others switch, and use the checklist so you do not lose your work on the way.
        </p>
        <p className="relative mb-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
          <span>By {ALTERNATIVES_HUB_AUTHOR}</span>
          <span>Updated on {ALTERNATIVES_HUB_UPDATED_ON}</span>
          <span>{ALTERNATIVES_HUB_READ_MINUTES} min read</span>
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#all-alternatives" className={BUTTON_PRIMARY}>Find my tool</a>
          <a href="#checklist" className={BUTTON_OUTLINE}>Open the switching checklist</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: ALTERNATIVE_ENTRIES.length, label: "alternatives pages" },
            { value: SWITCH_REASONS.length, label: "reasons covered" },
            { value: SWITCHING_CHECKLIST.length, label: "checklist steps" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {ALTERNATIVES_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <Section id="short-answer" title="The short answer">
        <dl className="m-0 grid gap-4 sm:grid-cols-2">
          {SUMMARY_POINTS.map((point) => (
            <div key={point.id} className={CARD_CLASS}>
              <dt className="font-bold">{point.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{point.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="all-alternatives" title="All alternatives pages" intro="Pick the tool you are thinking of leaving. Pages marked coming soon are being written, and the model directory covers every model meanwhile.">
        <AlternativesExplorer />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Want a ranking by use case instead? See the <Link href="/compare/best">best-for roundups</Link>. Comparing two specific models? See{" "}
          <Link href="/compare/vs">head-to-head tests</Link>.
        </p>
      </Section>

      <Section id="how-pages-work" title="How an alternatives page works" intro="Every page uses the same four parts, so you can compare pages and find what you need quickly.">
        <NumberedSteps items={HOW_PAGES_WORK} />
      </Section>

      <Section id="why-switch" title="Why people switch" intro="Find your reason, check what matters for it, and see what you might give up. The pages linked under each reason hold the current data.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {SWITCH_REASONS.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </ul>
      </Section>

      <Section id="switch-or-stay" title="Switch or stay?" intro="Switching costs time. Be sure the gain is worth it.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-emerald-500/50`}>
            <h3 className="mt-0">Signs you should switch</h3>
            <CheckList items={SWITCH_WHEN} mark="✓" />
          </div>
          <div className={`${CARD_CLASS} border-amber-500/50`}>
            <h3 className="mt-0">Signs you should stay</h3>
            <CheckList items={STAY_WHEN} mark="•" />
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-[var(--color-surface)] p-4 text-sm">{USING_TWO_NOTE}</p>
      </Section>

      <Section id="how-we-choose" title="How we choose alternatives" intro="The same standards apply to every alternatives page.">
        <InfoCards items={HOW_WE_CHOOSE} />
        <p className="mt-4 text-sm">
          <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/independence">Independence and disclosure</Link>
        </p>
      </Section>

      <Section id="checklist" title="Switching checklist" intro="Use it for any move between apps or models. Tick steps as you go.">
        <SwitchingChecklist />
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={ALTERNATIVES_FAQ} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {ALTERNATIVES_WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels">
        <p className="m-0 text-[var(--color-muted)]">{ALTERNATIVES_SOURCE_NOTE}</p>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/news/changelog">Changelog</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <RelatedLinks items={ALTERNATIVES_RELATED} />
      </Section>

      {/* Back to Compare */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Not sure where to start?</p>
          <p className="m-0 font-semibold">Browse every model we cover, with prices and context</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
            Want updates when plans and models change? <Link href="/newsletter">Get the weekly roundup</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare" className={BUTTON_OUTLINE}>Back to Compare</Link>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
        </div>
      </footer>
    </div>
  );
}