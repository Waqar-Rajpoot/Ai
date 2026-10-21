import Link from "next/link";
import {
  APP_FEATURES,
  APPS,
  getAppsStatItems,
} from "@/lib/compare/appsComparison";
import {
  APPS_FAQ,
  APP_SITUATIONS,
  LIMIT_SHAPES,
  PRIVACY_CHECKS,
  RELATED_LINKS,
  SUBSCRIPTION_VS_API,
  SWITCHING_CHECKLIST,
  TRY_BEFORE_YOU_PAY,
  VERDICT_SLOTS,
  WHAT_CAN_GO_WRONG,
} from "@/lib/compare/appsComparisonContent";
import { RESULT_LABELS } from "@/lib/compare/compareStandards";
import { DIRECTORY_SCORES_AS_OF, formatIsoDate } from "@/lib/compare/modelDirectory";
import {
  CONSUMER_PLANS,
  formatPlanDollars,
  getPlansForApp,
  getUsageValues,
  PLAN_SNAPSHOTS,
} from "@/lib/prices/planTable";
import { NumberedSteps } from "../learn/InfoCards";
import { CheckList, LearnSection as Section } from "../learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { AppSummaryCards } from "./AppSummaryCards";
import { DefinitionList } from "./DefinitionList";
import { FaqList } from "./FaqList";
import { FeatureMatrix } from "./FeatureMatrix";
import { PlanFinder } from "./PlanFinder";
import { PlanLadderTable } from "./PlanLadderTable";
import { StatStrip } from "./StatStrip";
import { SubscriptionVsApiEstimator } from "./SubscriptionVsApiEstimator";

const PRICE_DISCLAIMER = "Prices and features change. Confirm on the provider's website before buying.";

const PAGE_LINKS: readonly { id: string; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "plans", label: "Plans and prices" },
  { id: "limits", label: "Limits" },
  { id: "features", label: "Features" },
  { id: "privacy", label: "Privacy and data" },
  { id: "which-app", label: "Which app?" },
  { id: "subscription-vs-api", label: "Subscription vs API" },
  { id: "switching", label: "Switching" },
  { id: "wrong", label: "What can go wrong" },
  { id: "sources", label: "Sources and dates" },
  { id: "faq", label: "FAQ" },
];

/** Article 13: ChatGPT vs Claude vs Gemini vs Grok as consumer products. */
export function AppsComparisonView() {
  const scoresAsOf = formatIsoDate(DIRECTORY_SCORES_AS_OF);
  const freePlans = CONSUMER_PLANS.filter((plan) => plan.audience === "free");
  const heavyPlans = CONSUMER_PLANS.filter((plan) => plan.audience === "heavy");
  const adsPlans = CONSUMER_PLANS.filter((plan) => plan.adsNote !== undefined);
  const appsWithoutPlans = APPS.filter((app) => getPlansForApp(CONSUMER_PLANS, app.id).length === 0);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 2 · Comparison · Article 13
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">ChatGPT vs Claude vs Gemini vs Grok</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Four AI apps compared as products you chat in: what each plan costs, where it stops, which features it has and what happens to your data. Use it to decide what to try, and what to pay for.
        </p>
        <StatStrip items={getAppsStatItems(CONSUMER_PLANS, APPS)} />
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#plans" className={BUTTON_PRIMARY}>See plans and prices</a>
          <a href="#which-app" className={BUTTON_OUTLINE}>Which app should I use?</a>
        </div>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">{PRICE_DISCLAIMER}</p>
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {PAGE_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Section id="summary" title="Summary" intro="Three questions most readers ask, and one box to keep in mind before you compare prices.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {VERDICT_SLOTS.map((slot) => (
            <li key={slot.id}>
              <div className={`${CARD_CLASS} h-full`}>
                <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{slot.label}</p>
                <p className="mb-0 mt-1 font-semibold">{slot.status}</p>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{slot.howWeDecide}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          We name no winner before our test run. Until then, the cards below give you the plan facts we have.{" "}
          <Link href="/about/how-we-test">How we test</Link>
        </p>

        <h3 className="mb-3 mt-8">The four apps at a glance</h3>
        <AppSummaryCards />

        <div className={`${CARD_CLASS} mt-6 border-amber-500/60`}>
          <p className="m-0 font-semibold">Subscription is not an API</p>
          <p className="mb-0 mt-1 text-sm">
            Every price on this page is a chat subscription. API prices, billed per token, are separate. A subscription does not include API use.{" "}
            <a href="#subscription-vs-api">Read the full box</a>.
          </p>
        </div>
      </Section>

      <Section id="plans" title="Plans and prices" intro="Every plan in our snapshot, cheapest first within each app. US monthly prices.">
        <PlanLadderTable />
        <ul className="mb-0 mt-4 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
          <li>Prices are from secondary sources until we replace each with the provider&apos;s own page. See the dates under Sources.</li>
          <li>Team prices are per seat. Annual savings are the monthly price minus the yearly-billed price, times twelve.</li>
          <li>{PRICE_DISCLAIMER}</li>
        </ul>

        <h3 className="mb-3 mt-8">Find a plan for your budget</h3>
        <PlanFinder />
        <p className="mb-0 mt-4 text-sm">
          Add up several subscriptions in the <Link href="/tools/subscription-cost-calculator">subscription cost calculator</Link>, or see the full <Link href="/prices/plans">consumer plan table</Link>.
        </p>
      </Section>

      <Section id="limits" title="Limits" intro="Every plan has a limit somewhere. Know which kind matters for your work.">
        <DefinitionList items={LIMIT_SHAPES} />

        <h3 className="mb-3 mt-8">What the free plans say</h3>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {freePlans.map((plan) => (
            <li key={plan.id}>
              <div className={`${CARD_CLASS} h-full`}>
                <strong className="block">{plan.name}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">
                  {plan.notes}
                  {plan.adsNote ? ` ${plan.adsNote}` : ""}
                </span>
              </div>
            </li>
          ))}
          {appsWithoutPlans.map((app) => (
            <li key={app.id}>
              <div className={`${CARD_CLASS} h-full`}>
                <strong className="block">{app.name}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">Free-plan limits not collected yet.</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Our source says only &quot;limited&quot; for each free plan. We publish exact limits on the <Link href="/prices/free-limits">free-plan limits page</Link> once checked.
        </p>

        <h3 className="mb-3 mt-8">Heavy-use tiers: usage per dollar</h3>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Heavy-use plans, their price points and what the source says about usage</caption>
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Plan</th>
                <th scope="col" className="p-3">Price points</th>
                <th scope="col" className="p-3">What the source says about usage</th>
              </tr>
            </thead>
            <tbody>
              {heavyPlans.map((plan) => {
                const usageValues = getUsageValues(CONSUMER_PLANS, plan);
                return (
                  <tr key={plan.id} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 align-top">{plan.name}</th>
                    <td className="p-3 align-top">{plan.priceLabel}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">
                      {usageValues.length === 0 ? (
                        <>{plan.notes} The source gives no multiples.</>
                      ) : (
                        <ul className="m-0 grid list-none gap-1 p-0">
                          {usageValues.map((value) => (
                            <li key={value.monthlyDollars}>
                              {formatPlanDollars(value.monthlyDollars)}: {value.usageMultiple}x {value.baseName ? `${value.baseName} usage` : "usage"}
                              {value.priceMultiple !== null
                                ? `, at ${value.priceMultiple}x the price`
                                : ". The source does not name the base allowance, so price per usage cannot be worked out"}
                              .
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          A bigger multiple at a smaller price multiple means more usage per dollar. It does not mean you will use it. Pay for a heavy tier only if you keep hitting the limit of the plan below.
        </p>
      </Section>

      <Section id="features" title="Features" intro="Voice, images, video, file upload, web search, agents and memory. Each cell is filled only after we open the provider's own page.">
        <FeatureMatrix />
        <div className={`${CARD_CLASS} mt-6`}>
          <p className="m-0 font-semibold">Why some cells say &quot;Not verified yet&quot;</p>
          <p className="mb-0 mt-1 text-sm">
            Features change often, and a wrong yes or no costs you money. Our source rule is to use the provider&apos;s own page opened on the day, so a cell stays empty until we have done that.{" "}
            <Link href="/about/source-policy">Source policy</Link> · <Link href="/prices/features">Feature matrix</Link>
          </p>
        </div>

        <h3 className="mb-3 mt-8">What each feature is, and what to check</h3>
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {APP_FEATURES.map((feature) => (
            <li key={feature.id}>
              <article className={`${CARD_CLASS} h-full`}>
                <h4 className="m-0 text-lg">{feature.label}</h4>
                <p className="mb-0 mt-2">{feature.whatItIs}</p>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{feature.whyItMatters}</p>
                <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
                  {feature.whatToCheck.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
                {feature.guide && (
                  <p className="mb-0 mt-3 text-sm">
                    <Link href={feature.guide.href}>{feature.guide.label}</Link>
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="privacy" title="Privacy and data" intro="What happens to what you type matters more than most feature lists. Check these seven things before you paste anything private.">
        <div className={CARD_CLASS}>
          <CheckList items={PRIVACY_CHECKS} mark="✓" />
          <p className="mb-0 mt-3 text-sm">
            Compare all four on the <Link href="/prices/privacy">privacy matrix</Link>, and read <Link href="/learn/foundations/never-share-with-ai-chatbot">what you should never share with an AI chatbot</Link>.
          </p>
        </div>

        <h3 className="mb-3 mt-8">Ads in free plans</h3>
        <div className={CARD_CLASS}>
          {adsPlans.length > 0 ? (
            <ul className="m-0 grid gap-1 pl-5">
              {adsPlans.map((plan) => (
                <li key={plan.id}>
                  <strong>{plan.name}:</strong> {plan.adsNote}
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0">No ads are noted in our snapshot.</p>
          )}
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            We have no ad information for the other plans. Check each provider&apos;s page and settings. Privacy is also a test point: see the seventh point of the scorecard, privacy and limits.
          </p>
        </div>
      </Section>

      <Section id="which-app" title="Which app should you use?" intro="No winner yet, so start from your situation. Find the line closest to yours, then compare what it points to.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {APP_SITUATIONS.map((item) => (
            <li key={item.id}>
              <article className={`${CARD_CLASS} h-full`}>
                <h3 className="m-0 text-lg">{item.situation}</h3>
                <p className="mb-0 mt-2 text-sm"><strong>Compare first:</strong> {item.compareFirst}</p>
                <p className="mb-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {item.links.map((link) => (
                    <Link key={link.href} href={link.href}>{link.label}</Link>
                  ))}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <h3 className="mb-3 mt-8">Try before you pay: a 30-minute test</h3>
        <NumberedSteps items={TRY_BEFORE_YOU_PAY} />
        <p className="mb-0 mt-4 text-sm">
          Check answers with <Link href="/learn/practitioner/fact-check-ai-answers">the fact-checking routine</Link>, or build a longer test with <Link href="/learn/power-user/build-your-own-ai-test-set">your own AI test set</Link>.
        </p>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Our own test-based pick for each situation will appear here after the test run. For a pick by model and job, see <Link href="/compare/best/by-job">Best AI model right now, by job</Link>.
        </p>
      </Section>

      <Section id="subscription-vs-api" title="Subscription vs API" intro="The box that stops the most expensive mix-ups.">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <DefinitionList items={SUBSCRIPTION_VS_API} />
        </div>
        <h3 className="mb-3 mt-8">How far does a budget go through the API?</h3>
        <SubscriptionVsApiEstimator />
        <p className="mb-0 mt-4 text-sm">
          Learn more in <Link href="/learn/power-user/ai-api-pricing-for-non-engineers">AI API pricing for non-engineers</Link>, see the <Link href="/prices/api">API price table</Link>, or compare models in the <Link href="/compare/models">model directory</Link>.
        </p>
      </Section>

      <Section id="switching" title="Switching apps" intro="Leaving one app for another is easier if you prepare.">
        <div className={CARD_CLASS}>
          <CheckList items={SWITCHING_CHECKLIST} mark="✓" />
          <p className="mb-0 mt-3 text-sm">
            Looking for a specific replacement? See <Link href="/compare/alternatives">alternatives</Link>.
          </p>
        </div>
      </Section>

      <Section id="wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources, dates and labels" intro="Where each number on this page came from, and when.">
        <div className={CARD_CLASS}>
          <ul className="m-0 grid gap-2 pl-5">
            {PLAN_SNAPSHOTS.map((snapshot) => {
              const app = APPS.find((candidate) => candidate.id === snapshot.appId);
              return (
                <li key={snapshot.appId}>
                  <strong>{app?.name} plan prices:</strong>{" "}
                  {snapshot.sourceDate ? `secondary source, ${formatIsoDate(snapshot.sourceDate)}` : "not collected yet"}
                </li>
              );
            })}
            <li><strong>API prices and BenchLM scores:</strong> the model directory, as of {scoresAsOf}.</li>
            <li><strong>Tested on:</strong> no test run yet, so this page has no test results.</li>
            <li><strong>Feature support:</strong> not verified yet. See the features section.</li>
          </ul>
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            Plan prices are leads until confirmed on each provider&apos;s own page, which is first in our source hierarchy. {PRICE_DISCLAIMER}
          </p>
        </div>
        <h3 className="mb-3 mt-8">Labels we use</h3>
        <DefinitionList items={RESULT_LABELS} />
        <p className="mb-0 mt-4 text-sm">
          <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/independence">Independence and disclosure</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={APPS_FAQ} />
      </Section>

      <Section id="related" title="Related pages">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {RELATED_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Ready for the next step?</p>
          <p className="m-0 font-semibold">Compare the models behind the apps, or move up to Level 3</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare" className={BUTTON_OUTLINE}>Back to Compare</Link>
          <Link href="/learn/power-user" className={BUTTON_OUTLINE}>Level 3: Power user</Link>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
        </div>
      </footer>
    </div>
  );
}