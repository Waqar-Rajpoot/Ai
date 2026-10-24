import Link from "next/link";
import { FaqList } from "@/components/shared/FaqList";
import { PageSection } from "@/components/shared/PageSection";
import { TermGrid } from "@/components/shared/TermGrid";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { BENCHLM_SCORES_AS_OF, QUIZ_RULES_UPDATED_ON } from "@/lib/tools/quizConstants";
import {
  EXAMPLE_PROFILES,
  FAQ,
  KEY_TERMS,
  PASTE_RULES,
  RULE_STEPS,
  SOURCES,
  TIPS,
  WHAT_CAN_GO_WRONG,
} from "@/lib/tools/quizContent";
import {
  BUDGET_QUESTION,
  PRIVACY_QUESTION,
  TASK_QUESTION,
  getOption,
  type TaskId,
} from "@/lib/tools/quizQuestions";
import { RESULT_TYPES, RESULT_TYPE_ORDER } from "@/lib/tools/quizResultTypes";
import { buildRuleMatrix, chooseResultTypes } from "@/lib/tools/quizRules";
import { WhichAiQuiz } from "./WhichAiQuiz";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "quiz", label: "Take the quiz" },
  { id: "terms", label: "Key words" },
  { id: "results", label: "All seven results" },
  { id: "rules", label: "How the rules work" },
  { id: "examples", label: "Example profiles" },
  { id: "tips", label: "Get the most from it" },
  { id: "paste", label: "Before you paste" },
  { id: "limits", label: "What can go wrong" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

interface RuleMatrixProps {
  task: TaskId;
  heading: string;
}

/** Budget-by-privacy grid, built from the real rules. */
function RuleMatrix({ task, heading }: RuleMatrixProps) {
  const rows = buildRuleMatrix(task);
  return (
    <div>
      <h3 className="mb-2 mt-0">{heading}</h3>
      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">{heading}</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Budget</th>
              {PRIVACY_QUESTION.options.map((option) => (
                <th key={option.id} scope="col" className="p-3">{option.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.budget} className="border-t border-[var(--color-border)]">
                <th scope="row" className="p-3 text-left align-top font-semibold">{getOption(BUDGET_QUESTION, row.budget).label}</th>
                {PRIVACY_QUESTION.options.map((option) => (
                  <td key={option.id} className="p-3 align-top">{RESULT_TYPES[row.cells[option.id]].shortName}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Full "Which AI fits me?" page: quiz, terms, every result, rules, examples, tips, limits, FAQ and sources. */
export function WhichAiFitsMeView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 1</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Rules updated {QUIZ_RULES_UPDATED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Runs in your browser</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Which AI fits me? A three-question quiz</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Tell us what you will use AI for, what you can spend and how private your material is. You get a type of AI service that fits, the plans to compare and the models worth a look.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#quiz" className={BUTTON_PRIMARY}>Start the quiz</a>
          <a href="#rules" className={BUTTON_OUTLINE}>See how the rules work</a>
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
            <li><strong>Three questions.</strong> What you will use it for, what you can spend, and how private the material is.</li>
            <li><strong>Two answers.</strong> First a type of service, such as a free plan, a $20 plan, an API or a local model. Then a short list of models worth a look.</li>
            <li><strong>A shortlist, not a verdict.</strong> Try the options on your own tasks before you pay.</li>
            <li><strong>Private by design.</strong> Your answers stay in the page. Nothing is sent or saved.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Payment never changes a result</p>
            <p className="mb-2 mt-1 text-sm">The rules are hand-written and ignore affiliate or sponsor status. The model lists mix makers.</p>
            <p className="m-0 text-sm"><Link href="/about/independence">Read our independence promise</Link></p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying.</p>
      </PageSection>

      <PageSection id="quiz" title="Take the quiz" intro="Answer all three questions. Your result appears below them and updates if you change an answer.">
        <WhichAiQuiz />
      </PageSection>

      <PageSection id="terms" title="Key words in 60 seconds" intro="A few terms make the results easier to read.">
        <TermGrid terms={KEY_TERMS} />
      </PageSection>

      <PageSection id="results" title="All seven possible results" intro="Every answer leads to one of these. Read them all if you want to know what you might be missing.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {RESULT_TYPE_ORDER.map((typeId) => {
            const type = RESULT_TYPES[typeId];
            return (
              <li key={type.id} className={CARD_CLASS}>
                <p className="m-0"><span className={BADGE_CLASS}>{type.shortName}</span></p>
                <h3 className="mb-1 mt-2">{type.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{type.tagline}</p>
                <p className="mb-0 mt-3 text-sm"><strong>Cost:</strong> {type.costSummary}</p>
                <p className="mb-0 mt-2 text-sm"><strong>Suits:</strong> {type.fits}</p>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection id="rules" title="How the rules work" intro="No black box. These are the rules in the order the quiz applies them.">
        <ol className="m-0 mb-8 grid list-none gap-3 p-0 md:grid-cols-2">
          {RULE_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
        <div className="grid gap-6">
          <RuleMatrix task="everyday" heading="Result by budget and privacy: everyday use" />
          <RuleMatrix task="bulk" heading="The same grid for bulk jobs" />
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Both grids are generated from the quiz&apos;s own rules. Your main use does not change the type of service, except for bulk work. It changes the model list.
        </p>
      </PageSection>

      <PageSection id="examples" title="Example profiles" intro="Eight common situations and what the quiz suggests for each. Match yours, or take the quiz to be sure.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {EXAMPLE_PROFILES.map((profile) => {
            const choice = chooseResultTypes(profile.answers);
            const primary = RESULT_TYPES[choice.primary];
            const alternative = choice.alternative ? RESULT_TYPES[choice.alternative.typeId] : null;
            return (
              <li key={profile.id} className={CARD_CLASS}>
                <h3 className="mt-0">{profile.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{profile.story}</p>
                <p className="mb-0 mt-3 flex flex-wrap gap-2 text-xs">
                  <span className={BADGE_CLASS}>{getOption(TASK_QUESTION, profile.answers.task).label}</span>
                  <span className={BADGE_CLASS}>{getOption(BUDGET_QUESTION, profile.answers.budget).label}</span>
                  <span className={BADGE_CLASS}>{getOption(PRIVACY_QUESTION, profile.answers.privacy).label}</span>
                </p>
                <p className="mb-0 mt-3 text-sm">
                  <strong>Suggested:</strong> {primary.title}
                  {alternative ? <span className="text-[var(--color-muted)]"> · or {alternative.shortName}</span> : null}
                </p>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection id="tips" title="Get the most from your result">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip) => (
            <li key={tip.title} className={CARD_CLASS}>
              <h3 className="mt-0 text-base">{tip.title}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{tip.detail}</p>
              <p className="mb-0 mt-3 text-sm"><Link href={tip.link.href}>{tip.link.label}</Link></p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="paste" title="Before you paste anything" intro="Whichever result you get, some things never belong in a chatbot.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {PASTE_RULES.map((rule) => (
            <li key={rule.item} className={`${CARD_CLASS} border-amber-500/60`}>
              <p className="m-0 font-semibold">{rule.item}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{rule.why}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">
          <Link href="/learn/foundations/never-share-with-ai-chatbot">Read the full guide</Link> · <Link href="/tools/ai-safety-checklist">AI safety checklist</Link>
        </p>
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

      <PageSection id="sources" title="Sources and labels" intro={`Rules updated ${QUIZ_RULES_UPDATED_ON}. Independent scores as of ${BENCHLM_SCORES_AS_OF}.`}>
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
          <p className="m-0 font-semibold">See every plan and price side by side</p>
        </div>
        <Link href="/prices/plans" className={BUTTON_PRIMARY}>Open the plan table</Link>
      </footer>
    </div>
  );
}