import Link from "next/link";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { RENEWAL_TIPS } from "@/lib/learn/foundationsContent";
import { describePlanVerification } from "@/lib/prices/planLogic";
import { PLAN_RECORDS, PROVIDERS } from "@/lib/prices/planRecords";
import {
  CHOOSE_ROWS,
  PLANS_FAQ,
  PLANS_RELATED,
  PRICE_EXCLUDES,
} from "@/lib/prices/plansPageContent";
import { PRICES_LIMITS_NOTE, SUBSCRIPTION_VS_API_RULE } from "@/lib/prices/priceHubContent";
import { summarizeVerification } from "@/lib/prices/verification";
import { PlanExplorer } from "./PlanExplorer";
import { PriceBandsView } from "./PriceBandsView";
import { PriceDisclaimer } from "./PriceDisclaimer";

const SECTION_LINKS = [
  { id: "plans", label: "Plans and prices" },
  { id: "by-price", label: "Grouped by price" },
  { id: "choose", label: "Match a plan to your use" },
  { id: "not-included", label: "What a price leaves out" },
  { id: "faq", label: "Questions" },
  { id: "sources", label: "Sources" },
] as const;

/** Consumer plans page: filterable tables, price bands, a neutral guide, FAQ and sources. */
export function PlansView() {
  const verification = summarizeVerification(PLAN_RECORDS);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Prices · Levels 1 to 2
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI consumer plans and prices (US)</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Free and paid plans from {PROVIDERS.map((provider) => provider.name.split(" (")[0]).join(", ")} side by side: price per month, annual billing, usage level and what is included. Every row links to the provider&apos;s own pricing page.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#plans" className={BUTTON_PRIMARY}>See the plans</a>
          <a href="#choose" className={BUTTON_OUTLINE}>Which plan fits my use?</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: PROVIDERS.length, label: "providers" },
            { value: PLAN_RECORDS.length, label: "plans" },
            { value: "US$", label: "prices" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <div className="relative mt-6 grid max-w-2xl gap-3">
          <p role="status" className="m-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm">
            {describePlanVerification(verification)}{" "}
            <Link href="/about/source-policy">How we verify</Link>
          </p>
          <PriceDisclaimer />
        </div>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {SECTION_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <aside aria-label="Subscription is not an API" className={`${CARD_CLASS} mt-6 border-[var(--color-accent)]`}>
        <p className="m-0 font-semibold">{SUBSCRIPTION_VS_API_RULE}</p>
        <p className="mb-0 mt-2 text-sm">
          <Link href="/prices#subscription-vs-api">See how the two differ</Link>
        </p>
      </aside>

      <Section id="plans" title="Plans and prices" intro="Filter by provider, audience or budget. Each provider has the same columns, in the same order.">
        <PlanExplorer />
      </Section>

      <Section id="by-price" title="Grouped by price" intro="Every plan sorted by its monthly price. This groups by price only. It does not rank quality, and plans are listed in provider order.">
        <PriceBandsView />
      </Section>

      <Section id="choose" title="Match a plan to how you use AI" intro="Start from what you do, not from the plan name. Try the free plan first and note when you hit a limit.">
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">If this is you</th>
                <th scope="col" className="p-3">Look at</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {CHOOSE_ROWS.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{row.need}</th>
                  <td className="p-3 align-top">{row.lookAt}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          This guide names no provider. Our reasoning is shown in each row, and no plan is ranked above another.
        </p>
      </Section>

      <Section id="not-included" title="What a price leaves out">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Read the price with these in mind</h3>
            <CheckList items={PRICE_EXCLUDES} mark="!" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Avoid surprise renewals</h3>
            <CheckList items={RENEWAL_TIPS} mark="•" />
          </div>
        </div>
      </Section>

      <Section id="faq" title="Questions">
        <div className="grid gap-3">
          {PLANS_FAQ.map((entry) => (
            <details key={entry.id} className={`${CARD_CLASS} group py-3`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true">▸</span>
                {entry.question}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Every price comes from a provider's own page. Until a row shows a verified-on date, it is a third-party report.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {PROVIDERS.map((provider) => (
            <li key={provider.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Provider page</span>
              <a href={provider.pricingUrl} target="_blank" rel="noopener noreferrer">
                {provider.maker}: {provider.name} pricing
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS_RELATED.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <strong className="block">{item.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.reason}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <footer className={`${CARD_CLASS} mt-4 grid gap-3`}>
        <PriceDisclaimer />
        <p className="m-0 text-sm text-[var(--color-muted)]">{PRICES_LIMITS_NOTE}</p>
      </footer>
    </div>
  );
}