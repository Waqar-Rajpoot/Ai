import Link from "next/link";
import { InfoCards } from "@/components/learn/InfoCards";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  PRICE_PAGES,
  PRICES_LIMITS_NOTE,
  RELATED_LINKS,
  SUBSCRIPTION_VS_API,
  SUBSCRIPTION_VS_API_RULE,
  TABLE_LABELS,
  UPDATE_PROMISES,
} from "@/lib/prices/priceHubContent";
import { describeVerification, summarizeVerification } from "@/lib/prices/verification";
import { PriceDisclaimer } from "./PriceDisclaimer";
import { PricePageCards } from "./PricePageCards";
import { VerifiedOnLabel } from "./VerifiedOnLabel";

const SECTION_LINKS = [
  { id: "pages", label: "What is on each page" },
  { id: "subscription-vs-api", label: "Subscription vs API" },
  { id: "how-to-read", label: "How to read our tables" },
  { id: "verified", label: "Verified-on summary" },
  { id: "updates", label: "How we keep it current" },
  { id: "related", label: "Related guides" },
] as const;

/** Prices hub: the seven data pages, the subscription-vs-API box, labels, verification summary and disclaimer. */
export function PricesHubView() {
  const verification = summarizeVerification(PRICE_PAGES);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Prices · Levels 1 to 3
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI prices and plans, checked and dated</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Plans, API costs, free-plan limits, features and privacy settings in one place. Every figure carries a verified-on date and a link to the provider&apos;s own page.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#pages" className={BUTTON_PRIMARY}>See what is on each page</a>
          <a href="#subscription-vs-api" className={BUTTON_OUTLINE}>Subscription or API?</a>
        </div>
        <div className="relative mt-6 max-w-xl">
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

      <Section id="pages" title="What is on each page" intro="Seven data pages. Each one is updated on its own schedule, shown on the card.">
        <PricePageCards pages={PRICE_PAGES} />
      </Section>

      <Section id="subscription-vs-api" title="Subscription vs API" intro="They are priced differently, and mixing them up is the most common mistake when comparing costs.">
        <InfoCards items={SUBSCRIPTION_VS_API} />
        <p className={`${CARD_CLASS} mb-0 mt-6 border-[var(--color-accent)] font-semibold`}>{SUBSCRIPTION_VS_API_RULE}</p>
        <p className="mt-4 text-sm">
          Learn how API cost works in <Link href="/learn/power-user#api-pricing">API for non-engineers</Link>.
        </p>
      </Section>

      <Section id="how-to-read" title="How to read our tables" intro="The same labels appear on every data page.">
        <InfoCards items={TABLE_LABELS} />
      </Section>

      <Section id="verified" title="Verified-on summary" intro={describeVerification(verification)}>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Page</th>
                <th scope="col" className="p-3">Updated</th>
                <th scope="col" className="p-3">Last check</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_PAGES.map((page) => (
                <tr key={page.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{page.title}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{page.cadence}</td>
                  <td className="p-3 align-top">
                    <VerifiedOnLabel verifiedOn={page.verifiedOn} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="updates" title="How we keep it current" intro="Prices move often. This is the schedule we work to.">
        <div className={CARD_CLASS}>
          <CheckList items={UPDATE_PROMISES} mark="✓" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Spot a mistake? <Link href="/about/corrections">Report an error</Link>. Source rules are in our <Link href="/about/source-policy">source policy</Link>.
        </p>
      </Section>

      <Section id="related" title="Related guides">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-3">
          {RELATED_LINKS.map((item) => (
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