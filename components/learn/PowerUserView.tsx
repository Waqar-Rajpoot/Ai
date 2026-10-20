import Link from "next/link";
import {
  AGENT_CARDS,
  AGENT_FAILURES,
  API_CARDS,
  AUTOMATION_CARDS,
  CONTEXT_CARDS,
  COST_FORMULA,
  EFFORT_COSTS_MORE,
  EFFORT_HELPS,
  EFFORT_INTRO,
  EFFORT_NOTE,
  MCP_SAFE_SETUP,
  POWER_USER_ABILITIES,
  POWER_USER_GUIDES,
  POWER_USER_LINKED_HEAD_TO_HEAD,
  POWER_USER_PREREQUISITES,
  POWER_USER_RESULT_MESSAGES,
  POWER_USER_SELF_CHECK_QUESTIONS,
  POWER_USER_SOURCES,
  POWER_USER_TOPICS,
  RAG_FAILURES,
  RAG_LONG_PROMPT_ENOUGH,
  RAG_STEPS,
  RAG_WINS_WHEN,
  ROUTING_ROWS,
  SUBSCRIPTION_VS_API_NOTE,
  TEST_SET_STEPS,
  TEST_SET_TEMPLATE,
  TOOL_CARDS,
  TRAINING_STEPS,
} from "@/lib/learn/powerUserContent";
import { AgentPermissionChecker } from "./AgentPermissionChecker";
import { ContextBudget } from "./ContextBudget";
import { CopyablePrompt } from "./CopyablePrompt";
import { CostPerTaskEstimator } from "./CostPerTaskEstimator";
import { GuideCardList } from "./GuideCardList";
import { InfoCards, NumberedSteps } from "./InfoCards";
import { CheckList, LearnSection as Section } from "./LearnSection";
import { SelfCheck } from "./SelfCheck";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Level 3 hub: self-check, nine topics, three tools, guides and sources. */
export function PowerUserView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 3 · Power user and builder
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Choose, control and test AI like a builder</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Go beyond one chatbot. Pick a model for each task, keep costs under control, and set up agents and automations you can trust.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#self-check" className={BUTTON_PRIMARY}>Take the self-check</a>
          <a href="#guides" className={BUTTON_OUTLINE}>Jump to the guides</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: POWER_USER_GUIDES.length, label: "guides" },
            { value: POWER_USER_TOPICS.length, label: "topics" },
            { value: POWER_USER_SELF_CHECK_QUESTIONS.length, label: "quiz questions" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Need a refresher? <Link href="/learn/practitioner">Level 2: Practitioner</Link>. Prices and features change, so confirm them on the provider&apos;s website before buying.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {POWER_USER_TOPICS.map((topic) => (
          <a
            key={topic.id}
            href={`#${topic.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {topic.title}
          </a>
        ))}
      </nav>

      <Section id="self-check" title="Self-check: are you ready for Level 3?" intro="Six questions, one at a time, with feedback after each. Nothing is stored.">
        <SelfCheck questions={POWER_USER_SELF_CHECK_QUESTIONS} messages={POWER_USER_RESULT_MESSAGES} />
      </Section>

      <Section id="prerequisites" title="Before you start" intro="Level 3 builds on these pages. Skim any that feel unfamiliar.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {POWER_USER_PREREQUISITES.map((item) => (
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

      <Section id="abilities" title="What you will be able to do">
        <div className={CARD_CLASS}>
          <CheckList items={POWER_USER_ABILITIES} mark="✓" />
        </div>
      </Section>

      <Section id="topics" title="Topics in this level" intro="Nine topics. Pick one, or read them in order.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {POWER_USER_TOPICS.map((topic, index) => (
            <li key={topic.id}>
              <a
                href={`#${topic.id}`}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <span className="text-xs font-bold text-[var(--color-accent)]">{String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-1 block">{topic.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{topic.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="training" title="How models are trained" intro="A short, non-technical picture of where a model's abilities and blind spots come from.">
        <InfoCards items={TRAINING_STEPS} />
      </Section>

      <Section id="reasoning" title="Reasoning models and effort settings" intro={EFFORT_INTRO}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-emerald-500/50`}>
            <h3 className="mt-0">More effort tends to help with</h3>
            <CheckList items={EFFORT_HELPS} mark="✓" />
          </div>
          <div className={`${CARD_CLASS} border-amber-500/50`}>
            <h3 className="mt-0">It mostly adds cost for</h3>
            <CheckList items={EFFORT_COSTS_MORE} mark="•" />
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{EFFORT_NOTE}</p>
      </Section>

      <Section id="context" title="Context engineering" intro="Everything a model reads has to fit in its context window. Deciding what goes in is the main skill. Try your own numbers.">
        <InfoCards items={CONTEXT_CARDS} />
        <h3 className="mb-3 mt-8">Context budget</h3>
        <ContextBudget />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Find a model&apos;s context window in the <Link href="/compare/models">model directory</Link>.
        </p>
      </Section>

      <Section id="rag" title="RAG: answering from your own documents" intro="Retrieval-augmented generation finds the relevant passages first, then asks the model to answer from them.">
        <NumberedSteps items={RAG_STEPS} />
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">RAG tends to win when</h3>
            <CheckList items={RAG_WINS_WHEN} mark="•" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">A long prompt is enough when</h3>
            <CheckList items={RAG_LONG_PROMPT_ENOUGH} mark="•" />
          </div>
          <div className={`${CARD_CLASS} border-rose-500/50`}>
            <h3 className="mt-0">How RAG fails</h3>
            <CheckList items={RAG_FAILURES} mark="!" />
          </div>
        </div>
      </Section>

      <Section id="tools-mcp" title="Tool use and MCP" intro="Tools let a model do things, not just write. The more it can do, the more carefully you should set it up.">
        <InfoCards items={TOOL_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">A safe way to connect tools</h3>
          <CheckList items={MCP_SAFE_SETUP} mark="✓" />
        </div>
      </Section>

      <Section id="agents" title="Agents" intro="An agent plans and carries out several steps with tools, often with little supervision. That is useful, and it is where mistakes get expensive.">
        <InfoCards items={AGENT_CARDS} />
        <div className={`${CARD_CLASS} mt-6 border-rose-500/50`}>
          <h3 className="mt-0">How agents fail</h3>
          <CheckList items={AGENT_FAILURES} mark="!" />
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            Level 4 covers prompt injection and agent security in more depth.
          </p>
        </div>
        <h3 className="mb-3 mt-8">What should this agent be allowed to do?</h3>
        <AgentPermissionChecker />
      </Section>

      <Section id="api-pricing" title="API for non-engineers" intro="The API charges for the tokens you use. What matters is the cost of a whole task, not the price per million tokens on its own.">
        <InfoCards items={API_CARDS} />
        <p className="mb-0 mt-6 rounded-xl bg-[var(--color-surface)] p-4 font-mono text-sm">{COST_FORMULA}</p>
        <h3 className="mb-3 mt-8">Cost per task estimator</h3>
        <CostPerTaskEstimator />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {SUBSCRIPTION_VS_API_NOTE} Current API prices are in the <Link href="/prices/api">API price table</Link>, and plan prices are in the{" "}
          <Link href="/prices/plans">consumer plan table</Link>. Prices and features change. Confirm on the provider&apos;s website before buying.
        </p>
      </Section>

      <Section id="test-set" title="Personal test set" intro="A public score is a shortlist, not a verdict. Ten of your own tasks, scored the same way each time, tell you what works for you.">
        <NumberedSteps items={TEST_SET_STEPS} columnsClass="sm:grid-cols-2 lg:grid-cols-5" />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">{TEST_SET_TEMPLATE.title}</h3>
          <CopyablePrompt text={TEST_SET_TEMPLATE.text} />
        </div>
      </Section>

      <Section id="automations" title="Automations and routing" intro="Once a task is repeatable, you can automate it. Keep a human in the loop for anything that cannot be undone.">
        <InfoCards items={AUTOMATION_CARDS} />
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Task</th>
                <th scope="col" className="p-3">Route to</th>
                <th scope="col" className="p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {ROUTING_ROWS.map((row) => (
                <tr key={row.task} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{row.task}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.route}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          This table names no products. For tested picks by job, see the <Link href="/compare/best">best-for roundups</Link>.
        </p>
      </Section>

      <Section id="guides" title="Guides in this level" intro="Start with context windows and tokens, then follow the topic you need.">
        <GuideCardList items={POWER_USER_GUIDES} />
        <h3 className="mb-3 mt-8">Linked head-to-head</h3>
        <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">This lives under Compare so each page exists once.</p>
        <GuideCardList items={POWER_USER_LINKED_HEAD_TO_HEAD} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            <li>Paying for effort, context or tools the task does not need.</li>
            <li>Retrieval that finds the wrong passage, followed by an answer that sounds sure.</li>
            <li>Agents with more access than the job needs.</li>
            <li>Trusting a public score instead of your own tasks.</li>
            <li>Automations that send or delete without a human check.</li>
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Vendor-reported means the claim comes from the company's own pages.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {POWER_USER_SOURCES.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.type}</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.publisher}: {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      {/* Next level */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next: Level 4</p>
          <p className="m-0 font-semibold">Expert: read benchmarks critically, run models locally and assess safety</p>
        </div>
        <Link href="/learn/expert" className={BUTTON_PRIMARY}>Continue to Expert</Link>
      </footer>
    </div>
  );
}