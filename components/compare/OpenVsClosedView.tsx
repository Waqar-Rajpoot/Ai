import Link from "next/link";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { InfoCards } from "@/components/learn/InfoCards";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { LocalModelMemoryEstimator } from "@/components/learn/LocalModelMemoryEstimator";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  AT_A_GLANCE_TABLE,
  BEFORE_HOSTED_CHECKLIST,
  BEFORE_OPEN_CHECKLIST,
  BEYOND_CARDS,
  BLURRY_CARDS,
  CHOOSE_TABLE,
  COST_CARDS,
  COST_RULE_OF_THUMB,
  DEFINITION_CARDS,
  EU_AI_ACT_CARDS,
  FAQ_ITEMS,
  HARDWARE_CARDS,
  HARDWARE_NOTE,
  HARDWARE_OPTION_CARDS,
  HOSTED_HIDDEN_COSTS,
  HYBRID_NOTE,
  LICENCE_CARDS,
  LICENCE_CHECKLIST,
  LICENCE_EXAMPLES_NOTE,
  LICENCE_EXAMPLES_TABLE,
  MEMORY_EXAMPLE_TABLE,
  MYTHS_TABLE,
  OPEN_VS_CLOSED_AUTHOR,
  OPEN_VS_CLOSED_READ_MINUTES,
  OPEN_VS_CLOSED_RELATED,
  OPEN_VS_CLOSED_SECTIONS,
  OPEN_VS_CLOSED_SOURCES,
  OPEN_VS_CLOSED_VERIFIED_ON,
  OPEN_VS_CLOSED_WHAT_CAN_GO_WRONG,
  PRICE_DISCLAIMER,
  PRIVACY_CARDS,
  PRIVACY_TABLE,
  QUALITY_CARDS,
  QUALITY_CHECKLIST,
  SELF_HOST_HIDDEN_COSTS,
  SPECTRUM_TABLE,
  SUMMARY_POINTS,
  TERM_CARDS,
} from "@/lib/compare/openVsClosedContent";
import { GOVERNANCE_NOTE } from "@/lib/learn/expertContent";
import { ModelTypeChooser } from "./ModelTypeChooser";
import { SelfHostBreakEven } from "./SelfHostBreakEven";

/** Article 25: open-weight vs closed models. Definitions, cost, privacy, licences, hardware and a chooser. */
export function OpenVsClosedView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 4 · Explainer
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Open-weight vs closed AI models: what the difference means and which to use</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          A plain-English guide to hosted models, open-weight models and open source AI. It covers cost, privacy, licences and hardware, and ends with a tool to help you choose.
        </p>
        <p className="relative mb-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
          <span>By {OPEN_VS_CLOSED_AUTHOR}</span>
          <span>Verified on {OPEN_VS_CLOSED_VERIFIED_ON}</span>
          <span>{OPEN_VS_CLOSED_READ_MINUTES} min read</span>
          <span>Uses independent, official and vendor-reported sources</span>
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#short-answer" className={BUTTON_PRIMARY}>Read the short answer</a>
          <a href="#choose" className={BUTTON_OUTLINE}>Help me choose</a>
        </div>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          New to the terms? Start with <Link href="/learn/foundations#key-terms">key terms</Link> and <Link href="/learn/power-user#context">context windows and tokens</Link>.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {OPEN_VS_CLOSED_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <Section id="short-answer" title="The short answer" intro="Anyone can follow this page. The first half needs no technical background, and the hardware and licence sections go deeper.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2">
          {SUMMARY_POINTS.map((point) => (
            <div key={point.id} className={CARD_CLASS}>
              <dt className="font-bold">{point.label}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{point.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="definitions" title="Definitions" intro="Three words get mixed up all the time. They describe what you can download and what you are allowed to do with it.">
        <InfoCards items={DEFINITION_CARDS} />
        <h3 className="mb-3 mt-8">What you get from each kind of release</h3>
        <ComparisonTable {...SPECTRUM_TABLE} />
        <h3 className="mb-3 mt-8">Where the words get blurry</h3>
        <InfoCards items={BLURRY_CARDS} />
        <h3 className="mb-3 mt-8">Terms used on this page</h3>
        <InfoCards items={TERM_CARDS} />
      </Section>

      <Section id="at-a-glance" title="At a glance" intro="The main differences in one table. The sections below explain each row.">
        <ComparisonTable {...AT_A_GLANCE_TABLE} />
      </Section>

      <Section id="quality" title="Is open as good as closed?" intro="It depends on which model, which size and which task. Size classes help set expectations.">
        <InfoCards items={QUALITY_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">How to judge quality</h3>
          <CheckList items={QUALITY_CHECKLIST} mark="✓" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          See current scores in the <Link href="/prices/benchmarks">benchmark digest</Link> and the <Link href="/compare/models">model directory</Link>. To read scores critically, use{" "}
          <Link href="/learn/expert/how-to-read-ai-benchmark">How to read an AI benchmark</Link>.
        </p>
      </Section>

      <Section id="cost" title="Cost" intro="Open weights do not mean zero cost, and hosted does not mean expensive. The shape of the bill is what differs.">
        <InfoCards items={COST_CARDS} />
        <p className="mt-6 rounded-xl bg-[var(--color-surface)] p-4 text-sm">{COST_RULE_OF_THUMB}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Costs people forget when self-hosting</h3>
            <CheckList items={SELF_HOST_HIDDEN_COSTS} mark="•" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Costs people forget when hosted</h3>
            <CheckList items={HOSTED_HIDDEN_COSTS} mark="•" />
          </div>
        </div>
        <h3 className="mb-3 mt-8">Self-hosting break-even calculator</h3>
        <SelfHostBreakEven />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {PRICE_DISCLAIMER} Work out a hosted cost per task with the <Link href="/tools/api-cost-calculator">API cost calculator</Link>, and see current prices in the{" "}
          <Link href="/prices/api">API price table</Link>. For the reasoning, read <Link href="/learn/power-user/ai-api-pricing-for-non-engineers">AI API pricing for non-engineers</Link>.
        </p>
      </Section>

      <Section id="privacy" title="Privacy" intro="The model type does not decide where your data goes. The setup does.">
        <InfoCards items={PRIVACY_CARDS} />
        <h3 className="mb-3 mt-8">Who can see your prompts</h3>
        <ComparisonTable {...PRIVACY_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Compare plan settings in the <Link href="/prices/privacy">privacy matrix</Link>. Never paste secrets or client data into a tool you have not checked. See{" "}
          <Link href="/learn/foundations/never-share-with-ai-chatbot">what you should never share with an AI chatbot</Link> and{" "}
          <Link href="/learn/expert/prompt-injection-agent-security">prompt injection and agent security</Link>.
        </p>
      </Section>

      <Section id="licences" title="Licences" intro="A licence is the real answer to what you may do. Read it before you build anything on a model.">
        <InfoCards items={LICENCE_CARDS} />
        <h3 className="mb-3 mt-8">Examples from our directory</h3>
        <ComparisonTable {...LICENCE_EXAMPLES_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {LICENCE_EXAMPLES_NOTE} Our reviews: <Link href="/compare/reviews/mimo-v2-6-pro">MiMo-V2.6-Pro</Link>, <Link href="/compare/reviews/qwen3-8-max-27b">Qwen3.8 Max / 27B</Link> and{" "}
          <Link href="/compare/reviews/kimi-k3">Kimi K3</Link>.
        </p>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">What to look for in a licence</h3>
          <CheckList items={LICENCE_CHECKLIST} mark="✓" />
        </div>
        <h3 className="mb-3 mt-8">Does the EU AI Act treat open models differently?</h3>
        <InfoCards items={EU_AI_ACT_CARDS} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {GOVERNANCE_NOTE} See the <Link href="/news/eu-ai-act">EU AI Act timeline</Link> and{" "}
          <Link href="/learn/expert/eu-ai-act-for-everyday-users">The EU AI Act for everyday users and small businesses</Link>.
        </p>
      </Section>

      <Section id="hardware" title="Hardware" intro="Running a model yourself comes down to memory. If the weights do not fit, nothing else matters.">
        <InfoCards items={HARDWARE_CARDS} />
        <h3 className="mb-3 mt-8">What fits where</h3>
        <InfoCards items={HARDWARE_OPTION_CARDS} />
        <h3 className="mb-3 mt-8">Rough memory by model size</h3>
        <ComparisonTable {...MEMORY_EXAMPLE_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">{HARDWARE_NOTE}</p>
        <h3 className="mb-3 mt-8">Local model memory estimator</h3>
        <LocalModelMemoryEstimator />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Use the full <Link href="/tools/local-model-memory">local model memory tool</Link> and follow the setup steps in{" "}
          <Link href="/learn/expert/run-ai-on-your-own-computer">Run an AI model on your own computer</Link>.
        </p>
      </Section>

      <Section id="beyond" title="Beyond cost and privacy" intro="Other differences often decide the choice once the basics are clear.">
        <InfoCards items={BEYOND_CARDS} />
      </Section>

      <Section id="choose" title="Which to choose" intro="Start with the table, then answer five questions for a tailored starting point.">
        <ComparisonTable {...CHOOSE_TABLE} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">{HYBRID_NOTE}</p>
        <h3 className="mb-3 mt-8">Where should you start?</h3>
        <ModelTypeChooser />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Before you choose open weights</h3>
            <CheckList items={BEFORE_OPEN_CHECKLIST} mark="✓" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Before you choose hosted</h3>
            <CheckList items={BEFORE_HOSTED_CHECKLIST} mark="✓" />
          </div>
        </div>
      </Section>

      <Section id="myths" title="Myths and facts">
        <ComparisonTable {...MYTHS_TABLE} />
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <div className="grid gap-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={CARD_CLASS}>
              <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>{item.question}</summary>
              <p className="mb-0 mt-3 text-[var(--color-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {OPEN_VS_CLOSED_WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{PRICE_DISCLAIMER}</p>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Official means a regulator or public body. Independent third party means an outside group that publishes its own work. Vendor-reported means the maker's own page. Secondary sources are leads, not the final word.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {OPEN_VS_CLOSED_SOURCES.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.label}</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.publisher}: {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/news/changelog">Changelog</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      <Section id="related" title="Related pages">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {OPEN_VS_CLOSED_RELATED.map((item) => (
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

      {/* Previous and next */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next in Level 4</p>
          <p className="m-0 font-semibold">Run an AI model on your own computer</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
            Want updates like this each week? <Link href="/newsletter">Get the weekly roundup</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn/expert" className={BUTTON_OUTLINE}>Back to Level 4</Link>
          <Link href="/learn/expert/run-ai-on-your-own-computer" className={BUTTON_PRIMARY}>Continue</Link>
        </div>
      </footer>
    </div>
  );
}