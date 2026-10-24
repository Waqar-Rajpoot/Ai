import Link from "next/link";
import { FaqList } from "@/components/shared/FaqList";
import { PageSection } from "@/components/shared/PageSection";
import { StepList } from "@/components/shared/StepList";
import { TermGrid } from "@/components/shared/TermGrid";
import { TipGrid } from "@/components/shared/TipGrid";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CONSUMER_PLANS, PLAN_PRICES_AS_REPORTED, getPlanById } from "@/lib/prices/planTable";
import { DEFAULT_CURRENCY_SYMBOL, SUBSCRIPTION_CALCULATOR_UPDATED_ON } from "@/lib/tools/subscriptionConstants";
import {
  EXAMPLE_STACKS,
  FAQ,
  HOW_TO_READ,
  KEY_TERMS,
  SAVING_TIPS,
  SOURCES,
  WHAT_CAN_GO_WRONG,
} from "@/lib/tools/subscriptionContent";
import { buildPlanYearlyRows, calculateExampleTotals, formatMoney } from "@/lib/tools/subscriptionCost";
import { SubscriptionCostCalculator } from "./SubscriptionCostCalculator";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "calculator", label: "Calculator" },
  { id: "read", label: "How to read it" },
  { id: "examples", label: "Example setups" },
  { id: "reference", label: "Yearly cost by plan" },
  { id: "tips", label: "Ways to spend less" },
  { id: "limits", label: "What can go wrong" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const EXAMPLES = EXAMPLE_STACKS.map((stack) => ({ stack, totals: calculateExampleTotals(stack.items) }));
const PLAN_YEARLY_ROWS = buildPlanYearlyRows(CONSUMER_PLANS);
const ONE_PLAN_TOTALS = calculateExampleTotals(EXAMPLE_STACKS.find((stack) => stack.id === "one-standard")?.items ?? []);
const THREE_PLANS_TOTALS = calculateExampleTotals(EXAMPLE_STACKS.find((stack) => stack.id === "three-assistants")?.items ?? []);

/** Full Subscription cost calculator page: tool, guide, examples, reference table, tips, limits, FAQ and sources. */
export function SubscriptionCostView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 1</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Updated {SUBSCRIPTION_CALCULATOR_UPDATED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Runs in your browser</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI subscription cost calculator: what you really pay per month and per year</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          List the AI plans you pay for and see the monthly, yearly, weekly and daily cost, with tax and seats. It flags overlapping plans and upcoming renewals, and checks whether the time you save covers the price.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#calculator" className={BUTTON_PRIMARY}>Open the calculator</a>
          <a href="#examples" className={BUTTON_OUTLINE}>See example setups</a>
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

      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            <li><strong>One scale for everything.</strong> Monthly and yearly plans are converted to the same monthly and yearly totals.</li>
            <li><strong>Seats and tax included.</strong> Team plans are multiplied by seats, and one tax rate applies to every row.</li>
            <li><strong>Two warnings.</strong> You are told when you pay for two or more chat assistants, and when a renewal is within 30 days.</li>
            <li><strong>A pays-for-itself check.</strong> It uses your own estimate of the hours AI saves you.</li>
            <li><strong>Private.</strong> Nothing leaves your browser and nothing is saved.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Plans add up</p>
            <p className="mb-2 mt-1 text-sm">
              One $20-level plan costs {formatMoney(ONE_PLAN_TOTALS.yearly, DEFAULT_CURRENCY_SYMBOL)} a year. Three cost {formatMoney(THREE_PLANS_TOTALS.yearly, DEFAULT_CURRENCY_SYMBOL)}, on our table&apos;s prices.
            </p>
            <p className="m-0 text-sm">Still choosing? Take the <Link href="/tools/which-ai-fits-me">Which AI fits me?</Link> quiz.</p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying.</p>
      </PageSection>

      <PageSection id="calculator" title="The calculator" intro="Add each plan you pay for. Edit any field, and the totals update as you type.">
        <SubscriptionCostCalculator />
      </PageSection>

      <PageSection id="read" title="How to read your result" intro="Eight steps from a blank list to a decision, and the words you will meet on the way.">
        <div className="grid gap-8">
          <StepList steps={HOW_TO_READ} />
          <TermGrid terms={KEY_TERMS} />
        </div>
      </PageSection>

      <PageSection id="examples" title="Example setups" intro="Eight common setups, worked out with the same maths as the calculator and the prices in our plan table.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {EXAMPLES.map(({ stack, totals }) => (
            <li key={stack.id} className={CARD_CLASS}>
              <h3 className="mt-0">{stack.title}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{stack.story}</p>
              <p className="mb-0 mt-3 flex flex-wrap gap-2 text-xs">
                {stack.items.map((item) => {
                  const plan = getPlanById(item.planId);
                  return (
                    <span key={`${item.planId}-${item.billing}`} className={BADGE_CLASS}>
                      {plan.label}{item.seats > 1 ? ` × ${item.seats}` : ""}{item.billing === "annual" ? ", yearly billing" : ""}
                    </span>
                  );
                })}
              </p>
              <p className="mb-0 mt-3 text-sm">
                <strong className="tabular-nums">{formatMoney(totals.monthly, DEFAULT_CURRENCY_SYMBOL)}</strong> a month ·{" "}
                <strong className="tabular-nums">{formatMoney(totals.yearly, DEFAULT_CURRENCY_SYMBOL)}</strong> a year ·{" "}
                <span className="tabular-nums text-[var(--color-muted)]">{formatMoney(totals.daily, DEFAULT_CURRENCY_SYMBOL)} a day</span>
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="reference" title="Yearly cost by plan" intro={`One seat per plan, in US dollars before tax, as reported in ${PLAN_PRICES_AS_REPORTED}. The savings column shows plans that list a yearly price.`}>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Yearly cost of each paid consumer plan, billed monthly and billed yearly</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Plan</th>
                <th scope="col" className="p-3">Price per month</th>
                <th scope="col" className="p-3">Per year, billed monthly</th>
                <th scope="col" className="p-3">Per year, billed yearly</th>
                <th scope="col" className="p-3">You save</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_YEARLY_ROWS.map((row) => (
                <tr key={row.plan.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{row.plan.label}</th>
                  <td className="p-3 align-top tabular-nums">{formatMoney(row.plan.monthlyPrice, DEFAULT_CURRENCY_SYMBOL)}</td>
                  <td className="p-3 align-top tabular-nums">{formatMoney(row.yearlyBilledMonthly, DEFAULT_CURRENCY_SYMBOL)}</td>
                  <td className="p-3 align-top tabular-nums">{row.yearlyBilledAnnually === null ? "Not listed" : formatMoney(row.yearlyBilledAnnually, DEFAULT_CURRENCY_SYMBOL)}</td>
                  <td className="p-3 align-top tabular-nums">{row.yearlySavings === null ? "—" : formatMoney(row.yearlySavings, DEFAULT_CURRENCY_SYMBOL)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying. See the full <Link href="/prices/plans">consumer plan table</Link>.
        </p>
      </PageSection>

      <PageSection id="tips" title="Ways to spend less">
        <TipGrid tips={SAVING_TIPS} />
      </PageSection>

      <PageSection id="limits" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-2 pl-5 text-sm">
            {WHAT_CAN_GO_WRONG.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions">
        <FaqList entries={FAQ} />
      </PageSection>

      <PageSection id="sources" title="Sources and labels" intro={`Calculator updated ${SUBSCRIPTION_CALCULATOR_UPDATED_ON}. Plan prices as reported in ${PLAN_PRICES_AS_REPORTED}.`}>
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-4`}>
          {SOURCES.map((source) => (
            <li key={source.label} className="text-sm">
              <strong>{source.label}.</strong> {source.detail}
              {source.link ? <> <Link href={source.link.href}>{source.link.label}</Link></> : null}
            </li>
          ))}
        </ul>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Is AI worth paying for? Our honest answer</p>
        </div>
        <Link href="/learn/practitioner/is-ai-worth-paying-for" className={BUTTON_PRIMARY}>Read the guide</Link>
      </footer>
    </div>
  );
}