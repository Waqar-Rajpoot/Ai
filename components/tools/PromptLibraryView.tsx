import Link from "next/link";
import { CopyButton } from "@/components/shared/CopyButton";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { PROMPTS, PROMPT_LEVELS } from "@/lib/tools/promptLibrary";
import { PROMPTS_REVIEWED_ON } from "@/lib/tools/promptLibraryConstants";
import {
  ADAPT_TIPS,
  CHECK_STEPS,
  FAQ,
  FOLLOW_UPS,
  FORMULA_PARTS,
  LEVEL_NOTES,
  NEVER_PASTE,
  QUICK_STEPS,
  RELATED_LINKS,
  SAFER_WAY,
  STRONG_PROMPT,
  WEAK_PROMPT,
  WRONG_POINTS,
} from "@/lib/tools/promptLibraryContent";
import { countPromptsByLevel } from "@/lib/tools/promptLibraryLogic";
import { LEVEL_NAMES } from "@/lib/tools/toolCatalog";
import { PromptLibrary } from "./PromptLibrary";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "library", label: "Copy-ready prompts" },
  { id: "formula", label: "The five-part formula" },
  { id: "follow-ups", label: "Follow-up prompts" },
  { id: "your-chatbot", label: "Using prompts in your chatbot" },
  { id: "safe-use", label: "Use prompts safely" },
  { id: "levels", label: "What the levels mean" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Where to go next" },
] as const;

const COUNTS_BY_LEVEL = countPromptsByLevel(PROMPTS);

/** Full Prompt library page: the filterable library, the formula, follow-ups, safe-use help, FAQ and links. */
export function PromptLibraryView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools, levels 1 to 3</span>
          <span className={BADGE_CLASS}>Free, no sign-in</span>
          <span className={BADGE_CLASS}>Runs in your browser</span>
          <span className={BADGE_CLASS}>Reviewed {PROMPTS_REVIEWED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Prompt library: copy-ready AI prompts for study, work, home and money</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {PROMPTS.length} prompts you can fill in and paste into any chatbot. Each one follows the five-part formula, shows the level it suits and comes with a tip for checking the answer.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#library" className={BUTTON_PRIMARY}>Browse the prompts</a>
          <a href="#formula" className={BUTTON_OUTLINE}>Learn the formula</a>
        </div>
      </header>

      <dl className="m-0 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className={`${CARD_CLASS} py-3`}>
          <dt className="text-xs text-[var(--color-muted)]">All prompts</dt>
          <dd className="m-0 text-2xl font-extrabold tabular-nums">{PROMPTS.length}</dd>
        </div>
        {PROMPT_LEVELS.map((level) => (
          <div key={level} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">Level {level}: {LEVEL_NAMES[level]}</dt>
            <dd className="m-0 text-2xl font-extrabold tabular-nums">{COUNTS_BY_LEVEL[level]}</dd>
          </div>
        ))}
      </dl>

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

      {/* Short answer */}
      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3 lg:grid-cols-1">
            {QUICK_STEPS.map((step, index) => (
              <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
              </li>
            ))}
          </ol>
          <aside className={`${CARD_CLASS} self-start border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Your words stay on your device</p>
            <p className="mb-2 mt-1 text-sm">The fill-in boxes and the copy button work in your browser. What you type is not sent to us or saved.</p>
            <p className="m-0 text-sm">Even so, keep passwords, IDs and private details out of any prompt. See <a href="#safe-use">use prompts safely</a>.</p>
          </aside>
        </div>
      </PageSection>

      {/* Library */}
      <PageSection id="library" title="Copy-ready prompts" intro="Search, or filter by task and level. Open Fill in the blanks on any card to type your details, and the prompt updates as you go. Brackets mark what is still empty.">
        <PromptLibrary />
      </PageSection>

      {/* Formula */}
      <PageSection id="formula" title="The five-part formula" intro="Every prompt above is built from the same five parts. Use them to write your own.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FORMULA_PARTS.map((part) => (
            <article key={part.part} className={CARD_CLASS}>
              <h3 className="mt-0">{part.part}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{part.question}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Example:</strong> {part.example}</p>
              <p className="mb-0 mt-2 text-sm">{part.whyItHelps}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">A weak prompt</h3>
            <pre className="m-0 whitespace-pre-wrap break-words rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-sans text-sm">{WEAK_PROMPT}</pre>
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">No role, context, format or limits, so the chatbot has to guess what you want.</p>
          </div>
          <div className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <h3 className="mt-0">The same question with all five parts</h3>
            <pre className="m-0 whitespace-pre-wrap break-words rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-sans text-sm">{STRONG_PROMPT}</pre>
            <div className="mt-3">
              <CopyButton text={STRONG_PROMPT} label="Copy prompt" context="the five-part example" />
            </div>
          </div>
        </div>
        <p className="mb-0 mt-4 text-sm">
          Want more examples? Read <Link href="/learn/foundations/write-better-prompts">How to write better prompts</Link>.
        </p>
      </PageSection>

      {/* Follow-ups */}
      <PageSection id="follow-ups" title="Follow-up prompts that improve any answer" intro="Send one of these after the first reply. They work on any topic.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {FOLLOW_UPS.map((followUp) => (
            <li key={followUp.label} className={`${CARD_CLASS} flex flex-col`}>
              <p className="m-0 font-semibold">{followUp.label}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{followUp.text}</p>
              <div className="mt-auto pt-3">
                <CopyButton text={followUp.text} label="Copy" context={followUp.label} />
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Chatbot */}
      <PageSection id="your-chatbot" title="Using a prompt in your own chatbot" intro="The prompts are plain text, so they work almost anywhere. A few things change from one chatbot to the next.">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {ADAPT_TIPS.map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
      </PageSection>

      {/* Safe use */}
      <PageSection id="safe-use" title="Use prompts safely">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">Keep these out of every prompt</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {NEVER_PASTE.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="mb-0 mt-3 text-sm">{SAFER_WAY}</p>
            <p className="mb-0 mt-3 text-sm">
              <Link href="/learn/foundations/never-share-with-ai-chatbot">What you should never share with an AI chatbot</Link>
            </p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Check before you rely on an answer</h3>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {CHECK_STEPS.map((step) => <li key={step}>{step}</li>)}
            </ul>
            <p className="mb-0 mt-3 text-sm">
              <Link href="/learn/practitioner/fact-check-ai-answers">The full five-step routine</Link>
            </p>
          </div>
        </div>
      </PageSection>

      {/* Levels */}
      <PageSection id="levels" title="What the levels mean for prompts" intro="The levels match the Learn pages, so you can move on to the guides that fit each one.">
        <div className="grid gap-4 md:grid-cols-3">
          {LEVEL_NOTES.map((note) => (
            <article key={note.level} className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Level {note.level}: {LEVEL_NAMES[note.level]}</p>
              <p className="mb-0 mt-2 text-sm"><strong>{COUNTS_BY_LEVEL[note.level]} prompts.</strong> {note.looksLike}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>You need:</strong> {note.youNeed}</p>
              <p className="mb-0 mt-3 text-sm"><Link href={note.hubHref}>Open the Level {note.level} guides</Link></p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {WRONG_POINTS.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
      </PageSection>

      {/* FAQ */}
      <PageSection id="faq" title="Frequently asked questions">
        <div className="grid gap-3">
          {FAQ.map((entry) => (
            <details key={entry.question} className={`${CARD_CLASS} group py-3`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none">▸</span>
                {entry.question}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm">
          Have a prompt to suggest? Use the <Link href="/contact">contact page</Link>.
        </p>
      </PageSection>

      {/* Next */}
      <PageSection id="next" title="Where to go next">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {RELATED_LINKS.map((link) => (
            <li key={link.href} className={CARD_CLASS}>
              <h3 className="mt-0"><Link href={link.href}>{link.title}</Link></h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{link.detail}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Learn to write your own prompts</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn/foundations/write-better-prompts" className={BUTTON_PRIMARY}>Read the prompt guide</Link>
          <Link href="/tools" className={BUTTON_OUTLINE}>All tools</Link>
        </div>
      </footer>
    </div>
  );
}