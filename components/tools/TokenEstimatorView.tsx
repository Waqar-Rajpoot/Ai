import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  FIT_LABELS,
  estimateTokens,
  formatApproxCount,
  formatCompactTokens,
  formatCount,
  formatQuantity,
  smallestWindowHolding,
  tokensPerThousandWords,
  windowCapacity,
  type FitStatus,
} from "@/lib/tools/tokenEstimate";
import {
  COMMON_WINDOW_TOKENS,
  CONTEXT_DATA_AS_OF,
  TOKEN_RULES_CHECKED_ON,
  WORDS_PER_BOOK,
  WORDS_PER_PAGE,
} from "@/lib/tools/tokenEstimateConstants";
import {
  FAQ,
  FIT_ADVICE,
  HOW_TO_READ,
  PROVIDER_SOURCES,
  READER_PATHS,
  READING_ASSUMPTIONS,
  SAVE_TOKENS_TIPS,
  SHORT_ANSWER_POINTS,
  TERMS,
  WHAT_CAN_GO_WRONG,
  WHAT_COUNTS_IN_WINDOW,
  WHY_ESTIMATES_DIFFER,
  WORKED_EXAMPLES,
} from "@/lib/tools/tokenEstimatorContent";
import { CONTENT_TYPES, getContentType } from "@/lib/tools/tokenProfiles";
import { TokenEstimator } from "./TokenEstimator";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "estimator", label: "Estimator" },
  { id: "how-to-read", label: "Read your result" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "terms", label: "Key words" },
  { id: "what-counts", label: "What fills the window" },
  { id: "by-type", label: "Rules by text type" },
  { id: "window-sizes", label: "What fits" },
  { id: "examples", label: "Examples" },
  { id: "why-differ", label: "Why counts differ" },
  { id: "save-tokens", label: "Save tokens" },
  { id: "what-can-go-wrong", label: "What can go wrong" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const VERDICT_ORDER: readonly FitStatus[] = ["comfortable", "fits", "tight", "borderline", "too-long", "unknown"];

const TYPE_ROWS = CONTENT_TYPES.map((profile) => ({ profile, perThousand: tokensPerThousandWords(profile) }));

const WINDOW_ROWS = COMMON_WINDOW_TOKENS.map((windowTokens) => ({ windowTokens, capacity: windowCapacity(windowTokens) }));

const EXAMPLE_ROWS = WORKED_EXAMPLES.map((example) => {
  const { measure, tokens } = estimateTokens({ mode: example.mode, amount: example.amount }, getContentType(example.contentTypeId));
  return { example, measure, tokens, smallestWindow: smallestWindowHolding(tokens.high) };
});

/** Full Token and context estimator page: calculator, guidance, reference tables, FAQ and sources. */
export function TokenEstimatorView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 2</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Rules checked {TOKEN_RULES_CHECKED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Runs in your browser</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Token and context estimator: will your text fit in an AI model?</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Enter a word count, a page count or the text itself. See roughly how many tokens it is, and whether it fits the context window of each model we review.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#estimator" className={BUTTON_PRIMARY}>Estimate my text</a>
          <Link href="/learn/power-user/context-windows-tokens-memory" className={BUTTON_OUTLINE}>Read the guide</Link>
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

      {/* Short answer */}
      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SHORT_ANSWER_POINTS.map((point) => (
              <li key={point.lead}><strong>{point.lead}</strong> {point.text}</li>
            ))}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">An estimate, not a count</p>
            <p className="mb-2 mt-1 text-sm">Every provider counts tokens its own way, so no tool outside the provider can give the exact number. This page gives you a range you can plan with.</p>
            <p className="m-0 text-sm">Want the theory first? Read <Link href="/learn/power-user/context-windows-tokens-memory">context windows, tokens and memory explained</Link>.</p>
          </aside>
        </div>
      </PageSection>

      {/* Calculator */}
      <PageSection id="estimator" title="Estimate your text" intro="Everything is calculated in your browser. Nothing you type or paste is sent or saved.">
        <TokenEstimator />
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Context sizes: model directory launch data from {CONTEXT_DATA_AS_OF}, to be confirmed on each provider&apos;s page. See the <Link href="/compare/models">model directory</Link>.
        </p>
      </PageSection>

      {/* How to read */}
      <PageSection id="how-to-read" title="How to read your result" intro="Four things appear after you enter your text.">
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3 text-sm`}>
            {HOW_TO_READ.map((point) => (
              <li key={point.lead}><strong>{point.lead}</strong> {point.text}</li>
            ))}
          </ul>
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <caption className="sr-only">What each verdict means and what to do</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Verdict</th>
                  <th scope="col" className="p-3">What it means</th>
                  <th scope="col" className="p-3">What to do</th>
                </tr>
              </thead>
              <tbody>
                {VERDICT_ORDER.map((status) => (
                  <tr key={status} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{FIT_LABELS[status]}</th>
                    <td className="p-3 align-top">{FIT_ADVICE[status].meaning}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{FIT_ADVICE[status].action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      {/* Reader paths */}
      <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one says how to use the estimator and where to go next.">
        <div className="grid gap-6 lg:grid-cols-3">
          {READER_PATHS.map((path) => (
            <article key={path.id} className={CARD_CLASS}>
              <h3 className="mt-0">{path.title}</h3>
              <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {path.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="mb-0 mt-4 text-sm"><Link href={path.link.href}>{path.link.label}</Link></p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Terms */}
      <PageSection id="terms" title="Key words in 60 seconds" intro="Six terms you will see in every AI price list and limit. The full list is in the glossary.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TERMS.map((term) => (
            <div key={term.lead} className={CARD_CLASS}>
              <dt className="font-bold">{term.lead}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{term.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mb-0 mt-3 text-sm"><Link href="/learn/glossary">Open the glossary</Link></p>
      </PageSection>

      {/* What fills the window */}
      <PageSection id="what-counts" title="What fills the context window" intro="The window is shared. Your pasted text is only one of the things inside it.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_COUNTS_IN_WINDOW.map((item) => (
            <li key={item.lead} className={CARD_CLASS}>
              <p className="m-0 font-bold">{item.lead}</p>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">The estimator covers your text, the reply and anything you add under &quot;Add the reply and what is already there&quot;. It does not see the other items.</p>
      </PageSection>

      {/* Rules by type */}
      <PageSection id="by-type" title="Rules of thumb by type of text" intro="Planning values, not measurements. The wide ranges are deliberate.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Characters per token and tokens per 1,000 words by type of text</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Type of text</th>
                <th scope="col" className="p-3">Characters per token</th>
                <th scope="col" className="p-3">Tokens per 1,000 words</th>
                <th scope="col" className="p-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_ROWS.map(({ profile, perThousand }) => (
                <tr key={profile.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">
                    {profile.label}
                    <span className="block text-xs font-normal text-[var(--color-muted)]">{profile.examples}</span>
                  </th>
                  <td className="p-3 align-top tabular-nums">
                    about {profile.charactersPerToken.typical}
                    <span className="block text-xs text-[var(--color-muted)]">
                      range {profile.charactersPerToken.low} to {profile.charactersPerToken.high}
                    </span>
                  </td>
                  <td className="p-3 align-top tabular-nums">
                    about {formatApproxCount(perThousand.typical)}
                    <span className="block text-xs text-[var(--color-muted)]">
                      range {formatApproxCount(perThousand.low)} to {formatApproxCount(perThousand.high)}
                    </span>
                  </td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{profile.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          The English row follows the guidance OpenAI publishes: about 4 characters, or three-quarters of a word, per token. The other rows are our own rounded planning values. &quot;Words&quot; for code and data means chunks separated by spaces.
        </p>
      </PageSection>

      {/* Window sizes */}
      <PageSection id="window-sizes" title="How much English text fits in a window" intro="Common window sizes turned into words, pages and books. Real windows must also hold your reply.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">Approximate words, pages and books that fit in common context window sizes</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Window</th>
                <th scope="col" className="p-3">About words</th>
                <th scope="col" className="p-3">About pages</th>
                <th scope="col" className="p-3">About books</th>
              </tr>
            </thead>
            <tbody>
              {WINDOW_ROWS.map(({ windowTokens, capacity }) => (
                <tr key={windowTokens} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold tabular-nums">{formatCompactTokens(windowTokens)} tokens</th>
                  <td className="p-3 tabular-nums">{formatApproxCount(capacity.words)}</td>
                  <td className="p-3 tabular-nums">{formatQuantity(capacity.pages)}</td>
                  <td className="p-3 tabular-nums">{formatQuantity(capacity.books)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mb-0 mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-sm text-[var(--color-muted)]">
          {READING_ASSUMPTIONS.map((assumption) => <li key={assumption}>{assumption}</li>)}
        </ul>
      </PageSection>

      {/* Examples */}
      <PageSection id="examples" title="Worked examples" intro="Typical jobs, run through the same estimator. The last column uses the high estimate and ignores the reply.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Estimated tokens for common jobs</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Example</th>
                <th scope="col" className="p-3">Size</th>
                <th scope="col" className="p-3">Estimated tokens</th>
                <th scope="col" className="p-3">Smallest common window that holds it</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_ROWS.map(({ example, measure, tokens, smallestWindow }) => (
                <tr key={example.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">
                    {example.label}
                    <span className="block text-xs font-normal text-[var(--color-muted)]">{example.detail}</span>
                  </th>
                  <td className="p-3 align-top tabular-nums">
                    {example.mode === "words" ? `${formatCount(measure.words)} words` : `${formatCount(measure.characters)} characters`}
                  </td>
                  <td className="p-3 align-top tabular-nums">
                    about {formatApproxCount(tokens.typical)}
                    <span className="block text-xs text-[var(--color-muted)]">
                      range {formatApproxCount(tokens.low)} to {formatApproxCount(tokens.high)}
                    </span>
                  </td>
                  <td className="p-3 align-top tabular-nums">
                    {smallestWindow === null ? "More than 1M" : `${formatCompactTokens(smallestWindow)} tokens`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          A {WORDS_PER_PAGE}-word page and a {formatCount(WORDS_PER_BOOK)}-word book are typical lengths. Your own documents will differ, so use the estimator above for the real thing.
        </p>
      </PageSection>

      {/* Why counts differ */}
      <PageSection id="why-differ" title="Why counts differ between tools" intro="If two tools give different numbers, one of these is usually the reason.">
        <div className="grid gap-4 md:grid-cols-2">
          {WHY_ESTIMATES_DIFFER.map((item) => (
            <article key={item.lead} className={CARD_CLASS}>
              <h3 className="mt-0 text-base">{item.lead}</h3>
              <p className="mb-0 text-sm text-[var(--color-muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Save tokens */}
      <PageSection id="save-tokens" title="Eight ways to use fewer tokens" intro="Shorter inputs fit more easily, cost less on the API and usually keep the model focused.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {SAVE_TOKENS_TIPS.map((tip, index) => (
            <li key={tip.lead} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{tip.lead}</strong> {tip.text}</span>
            </li>
          ))}
        </ol>
        <p className="mb-0 mt-3 text-sm">
          Related: <Link href="/learn/power-user/rag-explained">RAG explained</Link> · <Link href="/learn/practitioner/summarize-pdf-with-ai">summarize a long document</Link>
        </p>
      </PageSection>

      {/* What can go wrong */}
      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {WHAT_CAN_GO_WRONG.map((item) => <li key={item}>{item}</li>)}
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
      </PageSection>

      {/* Sources */}
      <PageSection
        id="sources"
        title="Sources and labels"
        intro={`Rules of thumb checked on ${TOKEN_RULES_CHECKED_ON} against the provider pages below. Context sizes come from the model directory snapshot of ${CONTEXT_DATA_AS_OF}. Label: estimate, from published rules of thumb.`}
      >
        <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
          {PROVIDER_SOURCES.map((source) => (
            <li key={source.href} className="text-sm">
              <span className={`${BADGE_CLASS} mr-2`}>Provider page</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
              <span className="block text-[var(--color-muted)]">{source.supports}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Turn tokens per task into a monthly cost</p>
        </div>
        <Link href="/tools/api-cost-calculator" className={BUTTON_PRIMARY}>Open the API cost calculator</Link>
      </footer>
    </div>
  );
}