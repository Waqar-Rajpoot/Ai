import Link from "next/link";
import { FaqList } from "@/components/compare/FaqList";
import { RelatedLinks } from "@/components/compare/RelatedLinks";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { InfoCards, NumberedSteps } from "@/components/learn/InfoCards";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { ApiCostTable } from "@/components/prices/ApiCostTable";
import { SUBSCRIPTION_VS_API_NOTE } from "@/lib/learn/powerUserContent";
import { API_PRICE_ROWS, API_PRICES_CHECKED_ON, uniquePriceSources } from "@/lib/prices/apiCostTable";
import {
  API_COST_AUTHOR,
  API_COST_FAQ,
  API_COST_PAGE_UPDATED_ON,
  API_COST_PRICE_DISCLAIMER,
  API_COST_READ_MINUTES,
  API_COST_RELATED,
  API_COST_SECTIONS,
  API_COST_WHAT_CAN_GO_WRONG,
  BILL_FACTORS_TABLE,
  COST_FORMULA,
  HOW_TO_USE_STEPS,
  NOT_INCLUDED,
  SAVE_MONEY_CHECKLIST,
  SUBSCRIPTION_VS_API_TABLE,
  TOKEN_CARDS,
  WORKED_EXAMPLE_LINES,
  WORKED_EXAMPLE_TITLE,
} from "@/lib/tools/apiCostContent";
import { ApiCostCalculator } from "./ApiCostCalculator";

/** /tools/api-cost-calculator: the calculator plus a full explanation of how API pricing works. */
export function ApiCostCalculatorView() {
  const sources = uniquePriceSources(API_PRICE_ROWS);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 3 · Tool
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">API cost calculator: work out cost per task and per month</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          See what an AI task really costs when you pay per token. Pick a model, describe a task, set your volume, and get a clear number, with caching, batch, long prompts and price changes handled.
        </p>
        <p className="relative mb-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
          <span>By {API_COST_AUTHOR}</span>
          <span>Page updated {API_COST_PAGE_UPDATED_ON}</span>
          <span>Prices checked {API_PRICES_CHECKED_ON}</span>
          <span>{API_COST_READ_MINUTES} min read</span>
          <span>Your data stays in your browser</span>
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#calculator" className={BUTTON_PRIMARY}>Open the calculator</a>
          <Link href="/learn/power-user/ai-api-pricing-for-non-engineers" className={BUTTON_OUTLINE}>Read article 22 first</Link>
        </div>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {API_COST_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <Section id="calculator" title="Calculator" intro="The task sizes are illustrative. For a real plan, use token counts from your own usage report.">
        <ApiCostCalculator />
      </Section>

      <Section id="how-to-use" title="How to use it">
        <NumberedSteps items={HOW_TO_USE_STEPS} />
      </Section>

      <Section id="the-maths" title="The maths" intro="Providers bill input and output tokens separately, per million tokens. The calculator does the same.">
        <p className="m-0 rounded-xl bg-[var(--color-surface)] p-4 font-mono text-sm">{COST_FORMULA}</p>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">{WORKED_EXAMPLE_TITLE}</h3>
          <ul className="m-0 grid list-none gap-1 p-0 font-mono text-sm">
            {WORKED_EXAMPLE_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Monthly cost is cost per task times tasks per month. Caching lowers the price of the share of input read from a cache. Batch lowers the price of the share of tasks run in batch mode.
        </p>
      </Section>

      <Section id="token-counts" title="Where to find your token counts" intro="The result is only as good as these numbers.">
        <InfoCards items={TOKEN_CARDS} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Learn more in <Link href="/learn/power-user/context-windows-tokens-memory">Context windows, tokens and memory explained</Link>.
        </p>
      </Section>

      <Section id="what-changes-the-bill" title="What changes the bill" intro="Price per million tokens is only one part of it.">
        <ComparisonTable {...BILL_FACTORS_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Thinking longer can cost more. See <Link href="/learn/power-user/reasoning-models-effort-settings">Reasoning models and effort settings</Link>.
        </p>
      </Section>

      <Section id="save-money" title="Ways to spend less">
        <div className={CARD_CLASS}>
          <CheckList items={SAVE_MONEY_CHECKLIST} mark="✓" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          To route tasks by difficulty, see <Link href="/learn/power-user#automations">automations and routing</Link>. To judge quality before you switch to a cheaper model, <Link href="/learn/power-user/build-your-own-ai-test-set">build your own test set</Link>.
        </p>
      </Section>

      <Section id="subscription-vs-api" title="Subscription vs API" intro="A pinned reminder, because the two are easy to confuse.">
        <p className="m-0 rounded-xl border border-[var(--color-accent)] p-4 font-semibold">{SUBSCRIPTION_VS_API_NOTE}</p>
        <div className="mt-6">
          <ComparisonTable {...SUBSCRIPTION_VS_API_TABLE} />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Plan prices are in the <Link href="/prices/plans">consumer plan table</Link>. Add them up with the <Link href="/tools/subscription-cost-calculator">subscription cost calculator</Link>, and see{" "}
          <Link href="/learn/practitioner/is-ai-worth-paying-for">Is AI worth paying for?</Link>.
        </p>
      </Section>

      <Section id="price-table" title="The price table behind the calculator" intro={`List prices per million tokens in US dollars, checked ${API_PRICES_CHECKED_ON}. Each row links to the provider's own page.`}>
        <ApiCostTable />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          The same data appears on the <Link href="/prices/api">API price and cost-per-task table</Link>. {API_COST_PRICE_DISCLAIMER}
        </p>
      </Section>

      <Section id="not-included" title="What is not included" intro="The number you see is a planning estimate. Real bills can include more.">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <CheckList items={NOT_INCLUDED} mark="•" />
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={API_COST_FAQ} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {API_COST_WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{API_COST_PRICE_DISCLAIMER}</p>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Every price comes from a provider's own pricing page. Provider page is the top source in our source hierarchy.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {sources.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Provider page</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/news/changelog">Changelog</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <RelatedLinks items={API_COST_RELATED} />
      </Section>

      {/* Previous and next */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Understand the numbers</p>
          <p className="m-0 font-semibold">AI API pricing for non-engineers: cost per task, not per token</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
            Want price changes as they happen? <Link href="/newsletter">Get the weekly roundup</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools" className={BUTTON_OUTLINE}>Back to Tools</Link>
          <Link href="/learn/power-user/ai-api-pricing-for-non-engineers" className={BUTTON_PRIMARY}>Read article 22</Link>
        </div>
      </footer>
    </div>
  );
}