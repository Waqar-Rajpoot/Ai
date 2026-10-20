import Link from "next/link";
import {
  ARCHITECTURE_CARDS,
  ARCHITECTURE_NOTE,
  ARCHITECTURE_TABLE,
  EVALUATION_CARDS,
  EXPERT_ABILITIES,
  EXPERT_GUIDES,
  EXPERT_LINKED_EXPLAINER,
  EXPERT_PREREQUISITES,
  EXPERT_RESULT_MESSAGES,
  EXPERT_SELF_CHECK_QUESTIONS,
  EXPERT_SOURCES,
  EXPERT_TOPICS,
  EXPERT_WHAT_CAN_GO_WRONG,
  FINE_TUNING_CARDS,
  FINE_TUNING_CHECKLIST,
  FINE_TUNING_LADDER,
  GOVERNANCE_CARDS,
  GOVERNANCE_NOTE,
  GOVERNANCE_POLICY_CHECKLIST,
  HOSTED_VS_OPEN_TABLE,
  INFERENCE_CARDS,
  INFERENCE_NOTE,
  LABELS_TABLE,
  OPEN_WEIGHT_CARDS,
  OPEN_WEIGHT_NOTE,
  SAFETY_CARDS,
  SAFETY_NOTE,
  SECURITY_CARDS,
  SECURITY_CONTAINMENT,
  SECURITY_NOTE,
  SYSTEM_CARD_CHECKLIST,
} from "@/lib/learn/expertContent";
import { BenchmarkChecklist } from "./BenchmarkChecklist";
import { ComparisonTable } from "./ComparisonTable";
import { GuideCardList } from "./GuideCardList";
import { InfoCards, NumberedSteps } from "./InfoCards";
import { CheckList, LearnSection as Section } from "./LearnSection";
import { LocalModelMemoryEstimator } from "./LocalModelMemoryEstimator";
import { SelfCheck } from "./SelfCheck";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Level 4 hub: self-check, eight topics, two tools, guides and sources. */
export function ExpertView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 4 · Expert
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Read the evidence, run the models, manage the risk</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Go from using AI to judging it. Read benchmarks critically, understand what is inside a model, run open-weight models yourself, and map the safety and legal duties.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#self-check" className={BUTTON_PRIMARY}>Take the self-check</a>
          <a href="#guides" className={BUTTON_OUTLINE}>Jump to the guides</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: EXPERT_GUIDES.length, label: "guides" },
            { value: EXPERT_TOPICS.length, label: "topics" },
            { value: EXPERT_SELF_CHECK_QUESTIONS.length, label: "quiz questions" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Need a refresher? <Link href="/learn/power-user">Level 3: Power user and builder</Link>. Prices and features change, so confirm them on the provider&apos;s website before buying.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {EXPERT_TOPICS.map((topic) => (
          <a
            key={topic.id}
            href={`#${topic.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {topic.title}
          </a>
        ))}
      </nav>

      <Section id="self-check" title="Self-check: are you ready for Level 4?" intro="Six questions, one at a time, with feedback after each. Nothing is stored.">
        <SelfCheck questions={EXPERT_SELF_CHECK_QUESTIONS} messages={EXPERT_RESULT_MESSAGES} />
      </Section>

      <Section id="prerequisites" title="Before you start" intro="Level 4 builds on these pages. Skim any that feel unfamiliar.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {EXPERT_PREREQUISITES.map((item) => (
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
          <CheckList items={EXPERT_ABILITIES} mark="✓" />
        </div>
      </Section>

      <Section id="topics" title="Topics in this level" intro="Eight topics. Pick one, or read them in order.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERT_TOPICS.map((topic, index) => (
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

      <Section id="architectures" title="Architectures" intro="Two numbers matter when a model is described: how many parameters it has in total, and how many it uses for each token.">
        <InfoCards items={ARCHITECTURE_CARDS} />
        <div className="mt-6">
          <ComparisonTable {...ARCHITECTURE_TABLE} />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{ARCHITECTURE_NOTE}</p>
      </Section>

      <Section id="inference" title="Inference and cost" intro="Inference means running a trained model to get an answer. Speed, memory and cost all depend on how it is run.">
        <InfoCards items={INFERENCE_CARDS} />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {INFERENCE_NOTE} Level 3 explains <Link href="/learn/power-user#api-pricing">cost per task</Link>.
        </p>
        <h3 className="mb-3 mt-8">Local model memory estimator</h3>
        <LocalModelMemoryEstimator />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Step-by-step setup is in <Link href="/learn/expert/run-ai-on-your-own-computer">Run an AI model on your own computer</Link>.
        </p>
      </Section>

      <Section id="open-weights" title="Open weight vs open source" intro="These terms are often mixed up. What you can download and what you are allowed to do with it are separate questions.">
        <InfoCards items={OPEN_WEIGHT_CARDS} />
        <div className="mt-6">
          <ComparisonTable {...HOSTED_VS_OPEN_TABLE} />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {OPEN_WEIGHT_NOTE} The full comparison is in <Link href="/compare/open-vs-closed">Open-weight vs closed models</Link>.
        </p>
      </Section>

      <Section id="fine-tuning" title="Fine-tuning and adapters" intro="Training a model further is the heaviest option. Try the lighter ones first.">
        <InfoCards items={FINE_TUNING_CARDS} />
        <h3 className="mb-3 mt-8">Climb the ladder one step at a time</h3>
        <NumberedSteps items={FINE_TUNING_LADDER} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Before you fine-tune</h3>
          <CheckList items={FINE_TUNING_CHECKLIST} mark="✓" />
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            Your <Link href="/learn/power-user#test-set">personal test set</Link> is how you know whether training helped.
          </p>
        </div>
      </Section>

      <Section id="evaluation" title="Evaluation" intro="A score is a shortlist, not a verdict. Learn who produced it, how, and how big the gap really is.">
        <InfoCards items={EVALUATION_CARDS} />
        <h3 className="mb-3 mt-8">How this site labels results</h3>
        <ComparisonTable {...LABELS_TABLE} />
        <h3 className="mb-3 mt-8">Benchmark reading checklist</h3>
        <BenchmarkChecklist />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Read the full walkthrough in <Link href="/learn/expert/how-to-read-ai-benchmark">How to read an AI benchmark</Link>. Current scores are in the <Link href="/prices/benchmarks">benchmark digest</Link> and the{" "}
          <Link href="/compare/models">model directory</Link>.
        </p>
      </Section>

      <Section id="safety" title="Safety and system cards" intro="Makers publish documents about what their models can do and where they fail. Read them with a list of questions.">
        <InfoCards items={SAFETY_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">What to look for in a system card</h3>
          <CheckList items={SYSTEM_CARD_CHECKLIST} mark="✓" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{SAFETY_NOTE}</p>
      </Section>

      <Section id="security" title="Security" intro="Once an AI can read untrusted content and take actions, the content itself can become an attack.">
        <InfoCards items={SECURITY_CARDS} />
        <div className={`${CARD_CLASS} mt-6 border-rose-500/50`}>
          <h3 className="mt-0">Containment steps</h3>
          <CheckList items={SECURITY_CONTAINMENT} mark="✓" />
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{SECURITY_NOTE}</p>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Try the <Link href="/learn/power-user#agents">agent permission checker</Link> in Level 3, then read{" "}
          <Link href="/learn/expert/prompt-injection-agent-security">Prompt injection and agent security</Link>.
        </p>
      </Section>

      <Section id="governance" title="Governance and the EU AI Act" intro="Rules now shape how AI can be used at work, in schools and in customer service.">
        <InfoCards items={GOVERNANCE_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">A one-page AI policy for a small team</h3>
          <CheckList items={GOVERNANCE_POLICY_CHECKLIST} mark="✓" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {GOVERNANCE_NOTE} See the <Link href="/news/eu-ai-act">EU AI Act timeline</Link> and{" "}
          <Link href="/learn/expert/eu-ai-act-for-everyday-users">The EU AI Act for everyday users and small businesses</Link>.
        </p>
      </Section>

      <Section id="guides" title="Guides in this level" intro="Start with the one that matches your work.">
        <GuideCardList items={EXPERT_GUIDES} />
        <h3 className="mb-3 mt-8">Linked explainer</h3>
        <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">This lives under Compare so each page exists once.</p>
        <GuideCardList items={EXPERT_LINKED_EXPLAINER} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            {EXPERT_WHAT_CAN_GO_WRONG.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Official means a regulator or public body. Independent third party means an outside group that publishes its own work.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {EXPERT_SOURCES.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.label}</span>
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

      {/* Back to Level 3 */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Top level reached</p>
          <p className="m-0 font-semibold">Put it to work, or go back over the Level 3 prerequisites</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn/power-user" className={BUTTON_OUTLINE}>Back to Level 3</Link>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Browse the model directory</Link>
        </div>
      </footer>
    </div>
  );
}