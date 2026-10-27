import Link from "next/link";
import {
  DOCUMENT_PROMPTS,
  FACT_CHECK_PROMPTS,
  FACT_CHECK_STEPS,
  FILE_LIMITS,
  MEDIA_CARDS,
  MEDIA_RULES,
  MEMORY_RULES,
  POLICY_CARDS,
  PRACTITIONER_ABILITIES,
  PRACTITIONER_GUIDES,
  PRACTITIONER_LINKED_COMPARISONS,
  PRACTITIONER_RESULT_MESSAGES,
  PRACTITIONER_SELF_CHECK_QUESTIONS,
  PRACTITIONER_SOURCES,
  PRACTITIONER_TOPICS,
  PROJECT_CARDS,
  RESEARCH_BRIEF_TEMPLATE,
  RESEARCH_CARDS,
  SOURCE_CHECKS,
  TASK_FIT_ROWS,
  TECHNIQUES,
} from "@/lib/learn/practitionerContent";
import { ClaimChecker } from "./ClaimChecker";
import { CopyablePrompt } from "./CopyablePrompt";
import { DisclosureBuilder } from "./DisclosureBuilder";
import { FileChecker } from "./FileChecker";
import { FormatPromptBuilder } from "./FormatPromptBuilder";
import { GuideCardList } from "./GuideCardList";
import { CheckList, LearnSection as Section } from "./LearnSection";
import { SelfCheck } from "./SelfCheck";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";
// import { InfoCards } from "./InfoCards";

/** Small card grid used for title + summary pairs. */
function InfoCards({ items }: { items: readonly { id: string; title: string; summary: string }[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className={CARD_CLASS}>
          <strong>{item.title}</strong>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}

/** Level 2 hub: self-check, eight topics, four interactive tools, guides and sources. */
export function PractitionerView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 2 · Practitioner
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Use AI for real tasks, and check the results</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          You know the basics. Now use AI on files, research and everyday work, and learn how to verify what it gives you.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#self-check" className={BUTTON_PRIMARY}>Take the self-check</a>
          <a href="#guides" className={BUTTON_OUTLINE}>Jump to the guides</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: PRACTITIONER_GUIDES.length, label: "guides" },
            { value: PRACTITIONER_TOPICS.length, label: "topics" },
            { value: PRACTITIONER_SELF_CHECK_QUESTIONS.length, label: "quiz questions" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          New to AI? <Link href="/learn/foundations">Start with Level 1: Foundations</Link>. Prices and features change, so confirm them on the provider&apos;s website before buying.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {PRACTITIONER_TOPICS.map((topic) => (
          <a
            key={topic.id}
            href={`#${topic.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {topic.title}
          </a>
        ))}
      </nav>

      <Section id="self-check" title="Self-check: are you ready for Level 2?" intro="Six quick questions. You get feedback after each one, and nothing is stored.">
        <SelfCheck questions={PRACTITIONER_SELF_CHECK_QUESTIONS} messages={PRACTITIONER_RESULT_MESSAGES} />
      </Section>

      <Section id="abilities" title="What you will be able to do">
        <div className={CARD_CLASS}>
          <CheckList items={PRACTITIONER_ABILITIES} mark="✓" />
        </div>
      </Section>

      <Section id="topics" title="Topics in this level" intro="Eight topics. Pick one, or read them in order.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTITIONER_TOPICS.map((topic, index) => (
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

      <Section id="prompting-techniques" title="Prompting techniques" intro="Level 1 gave you the five-part formula. These six moves fix most weak answers.">
        <ul className="m-0 mb-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNIQUES.map((technique) => (
            <li key={technique.id} className={CARD_CLASS}>
              <strong>{technique.title}</strong>
              <p className="mb-2 mt-1 text-sm text-[var(--color-muted)]">{technique.summary}</p>
              <p className="m-0 rounded-xl bg-[var(--color-bg)] p-3 text-sm italic">{technique.example}</p>
            </li>
          ))}
        </ul>
        <FormatPromptBuilder />
      </Section>

      <Section id="files" title="Files and long documents" intro="Uploading a file is not the same as the AI reading it perfectly. Know where it slips.">
        <InfoCards items={FILE_LIMITS} />
        <div className="mt-6">
          <FileChecker />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {DOCUMENT_PROMPTS.map((prompt) => (
            <div key={prompt.id} className={CARD_CLASS}>
              <h3 className="mt-0">{prompt.title}</h3>
              <CopyablePrompt text={prompt.text} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="research" title="Web search and deep research" intro="Both give the AI current pages to work from. Both still need you to check the sources.">
        <InfoCards items={RESEARCH_CARDS} />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">{RESEARCH_BRIEF_TEMPLATE.title}</h3>
            <p className="mt-0 text-sm text-[var(--color-muted)]">Replace the square brackets with your own details.</p>
            <CopyablePrompt text={RESEARCH_BRIEF_TEMPLATE.text} />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How to check the sources it gives</h3>
            <CheckList items={SOURCE_CHECKS} mark="✓" />
          </div>
        </div>
      </Section>

      <Section id="projects-memory" title="Projects, memory and custom assistants" intro="These features save time. They also decide what the AI keeps about you.">
        <InfoCards items={PROJECT_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Ground rules</h3>
          <CheckList items={MEMORY_RULES} mark="•" />
        </div>
      </Section>

      <Section id="media" title="Images, audio and video" intro="Useful for drafts and ideas. Be careful with other people's faces and voices, and with anything that could be mistaken for real.">
        <InfoCards items={MEDIA_CARDS} />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Ground rules</h3>
          <CheckList items={MEDIA_RULES} mark="•" />
        </div>
      </Section>

      <Section id="fact-checking" title="Fact-checking routine" intro="A fluent answer is a draft. This routine turns it into something you can rely on. How much you need depends on what it is for.">
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {FACT_CHECK_STEPS.map((step, index) => (
            <li key={step.id} className={CARD_CLASS}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <strong className="mt-3 block">{step.title}</strong>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{step.summary}</p>
            </li>
          ))}
        </ol>
        <h3 className="mb-3 mt-8">How much checking does this need?</h3>
        <ClaimChecker />
        <h3 className="mb-3 mt-8">Copy-ready fact-check prompts</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          {FACT_CHECK_PROMPTS.map((prompt) => (
            <div key={prompt.id} className={CARD_CLASS}>
              <h4 className="mt-0">{prompt.title}</h4>
              <CopyablePrompt text={prompt.text} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="choosing-model" title="Choosing a model by task" intro="This table names no products. It tells you what to look for, and where to confirm it. For tested picks, see the best-for pages.">
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Task</th>
                <th scope="col" className="p-3">What to look for</th>
                <th scope="col" className="p-3">Where to check</th>
              </tr>
            </thead>
            <tbody>
              {TASK_FIT_ROWS.map((row) => (
                <tr key={row.task} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{row.task}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.lookFor}</td>
                  <td className="p-3 align-top"><Link href={row.checkHref}>{row.checkLabel}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying. See also the <Link href="/prices/plans">consumer plan table</Link>.
        </p>
      </Section>

      <Section id="policies" title="School and workplace policies" intro="The rule that applies to you is set by your school, employer or publisher. Find it before you start, not after you submit.">
        <InfoCards items={POLICY_CARDS} />
        <h3 className="mb-3 mt-8">Build a disclosure sentence</h3>
        <DisclosureBuilder />
      </Section>

      <Section id="guides" title="Guides in this level" intro="Start with the fact-checking guide, or pick the one that matches your task.">
        <GuideCardList items={PRACTITIONER_GUIDES} />
        <h3 className="mb-3 mt-8">Linked comparisons</h3>
        <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">These live under Compare so each page exists once.</p>
        <GuideCardList items={PRACTITIONER_LINKED_COMPARISONS} />
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            <li>Answers that look sourced but are not. Open the sources.</li>
            <li>Files read wrongly, especially scans, tables and very long documents.</li>
            <li>Oversharing through uploads, memory and saved projects.</li>
            <li>Breaking a school or work rule without realising it.</li>
            <li>Treating a general answer as health, legal or money advice. AI is not a doctor, lawyer or financial advisor.</li>
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro="Vendor-reported means the claim comes from the company's own pages.">
        <ul className="m-0 grid list-none gap-2 p-0">
          {PRACTITIONER_SOURCES.map((source) => (
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
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next: Level 3</p>
          <p className="m-0 font-semibold">Power user and builder: control cost per task and build automations</p>
        </div>
        <Link href="/learn/power-user" className={BUTTON_PRIMARY}>Continue to Power user</Link>
      </footer>
    </div>
  );
}


