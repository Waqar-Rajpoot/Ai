import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { API_MODELS, findModelById } from "@/lib/prices/apiCostTable";
import { API_PRICES_CHECKED_ON, TOKENS_PER_WORD, WORDS_PER_PAGE } from "@/lib/prices/apiPricesConstants";
import {
  FAQ,
  MEASURED_TOKEN_USE,
  PRICING_WORDS,
  PROVIDER_PAGES,
  SAVING_TIPS,
  TRACKER_SOURCES,
  UPCOMING_CHANGES,
  WORKED_EXAMPLES,
  type WorkedExample,
} from "@/lib/prices/apiPricesContent";
import { formatIsoDate, formatUsd } from "@/lib/prices/formatPrice";
import { STANDARD_TASKS } from "@/lib/prices/standardTasks";
import { calculateTaskCost, createUsage } from "@/lib/tools/apiCost";
import { ApiCostTable } from "./ApiCostTable";
import { StandardTaskMatrix } from "./StandardTaskMatrix";
import { TaskCostEstimator } from "./TaskCostEstimator";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "tokens", label: "Tokens in 60 seconds" },
  { id: "price-table", label: "Price table" },
  { id: "cost-per-task", label: "Cost per task" },
  { id: "estimator", label: "Estimator" },
  { id: "changes", label: "Price changes" },
  { id: "examples", label: "Worked examples" },
  { id: "save", label: "Cut your bill" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

function WorkedExampleCard({ example }: { example: WorkedExample }) {
  const usage = createUsage(example.inputTokens, example.outputTokens, {
    cachedSharePercent: example.cachedSharePercent,
    useBatch: example.useBatch,
  });
  const rows = example.modelIds
    .map((modelId) => findModelById(modelId))
    .filter((model): model is NonNullable<typeof model> => model !== undefined)
    .map((model) => ({ model, cost: calculateTaskCost(model, usage) }));

  return (
    <article className={CARD_CLASS}>
      <h3 className="mt-0">{example.title}</h3>
      <p className="mt-0 text-sm text-[var(--color-muted)]">{example.story}</p>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="text-xs text-[var(--color-muted)]">
          <tr>
            <th scope="col" className="py-1 pr-2">Model</th>
            <th scope="col" className="py-1 pr-2">Per task</th>
            <th scope="col" className="py-1">Per month</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ model, cost }) => (
            <tr key={model.id} className="border-t border-[var(--color-border)]">
              <th scope="row" className="py-2 pr-2 text-left font-semibold">
                {model.name}
                {cost.usedLongPromptRate && <span className={`${BADGE_CLASS} ml-2 border-amber-500`}>long-prompt rate</span>}
                {example.useBatch && !cost.batchApplied && <span className={`${BADGE_CLASS} ml-2`}>no batch</span>}
              </th>
              <td className="py-2 pr-2 tabular-nums">{formatUsd(cost.totalUsd)}</td>
              <td className="py-2 font-semibold tabular-nums">{formatUsd(cost.totalUsd * example.tasksPerMonth)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-0 mt-3 text-sm">{example.takeaway}</p>
    </article>
  );
}

/** Full API costs page: price table, cost per task, estimator, rules, examples, FAQ and sources. */
export function ApiPricesView() {
  const makerCount = new Set(API_MODELS.map((model) => model.maker)).size;
  const inputPrices = API_MODELS.map((model) => model.rates.inputPer1M);
  const chatTask = STANDARD_TASKS[0];
  const chatCosts = API_MODELS.map(
    (model) => calculateTaskCost(model, createUsage(chatTask.inputTokens, chatTask.outputTokens)).totalUsd,
  );
  const tokensPerPage = Math.round(WORDS_PER_PAGE * TOKENS_PER_WORD);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Prices · Level 3</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {API_PRICES_CHECKED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI API costs: price per token and cost per task</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          What it costs to use {API_MODELS.length} AI models from {makerCount} makers through their APIs. See the list prices, then
          the number that matters: what one finished task costs you.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#price-table" className={BUTTON_PRIMARY}>See the price table</a>
          <a href="#estimator" className={BUTTON_OUTLINE}>Estimate my cost</a>
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

      {/* Short answer + pinned box */}
      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            <li>
              <strong>Input prices run from {formatUsd(Math.min(...inputPrices))} to {formatUsd(Math.max(...inputPrices))} per million tokens.</strong>{" "}
              Output is usually two to five times more.
            </li>
            <li>
              <strong>A quick chat question costs between {formatUsd(Math.min(...chatCosts))} and {formatUsd(Math.max(...chatCosts))}</strong> depending on the model.
              Casual use is cheap everywhere.
            </li>
            <li>
              <strong>Bills grow with volume, long prompts and hidden thinking.</strong> Reasoning tokens are billed as output, so
              compare cost per finished task, not only price per token.
            </li>
            <li>
              <strong>Caching and batch can cut a bill by half or more.</strong> Several makers also raise prices for very long
              prompts, after intro offers end, or at peak hours.
            </li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">A subscription is not an API</p>
            <p className="mb-2 mt-1 text-sm">
              ChatGPT Plus, Claude Pro and Google AI Pro are flat monthly fees for the apps. API usage is billed separately, per
              token, and does not come with those plans.
            </p>
            <p className="m-0 text-sm">
              Just chatting? See the <Link href="/prices/plans">consumer plan table</Link>. Building something? Read on.
            </p>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Prices and features change. Confirm on the provider&apos;s website before buying. Prices are in US dollars and exclude tax.
        </p>
      </PageSection>

      {/* Tokens */}
      <PageSection id="tokens" title="Tokens in 60 seconds" intro="Every API bill is built from the same few ideas. Learn these and the tables below are easy to read.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_WORDS.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Worked example: one summary</h3>
          <p className="mb-0">
            A 10-page document is about {10 * WORDS_PER_PAGE} words, or roughly {(10 * tokensPerPage).toLocaleString("en-US")} input
            tokens. A one-page summary is about 600 output tokens. The bill is the input tokens times the input price, plus the
            output tokens times the output price. The tables below do this sum for every model.
          </p>
        </div>
        <p className="mb-0 mt-3 text-sm">
          Want a word count turned into tokens? Try the <Link href="/tools/token-estimator">token estimator</Link> or read{" "}
          <Link href="/learn/power-user/context-windows-tokens-memory">context windows, tokens and memory explained</Link>.
        </p>
      </PageSection>

      {/* Table */}
      <PageSection id="price-table" title="Price per million tokens" intro="List prices for standard processing. Filter by tier, sort, and open any row to see price steps, notes and where the number came from.">
        <ApiCostTable />
      </PageSection>

      {/* Matrix */}
      <PageSection id="cost-per-task" title="What one task costs" intro={`Price per token hides the real cost. This grid shows what one finished task costs at list prices with no caching or batch. † marks a long-prompt rate. Sizes are our own assumptions (about ${WORDS_PER_PAGE} words per page).`}>
        <StandardTaskMatrix />
        <aside className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Per token is not per task</h3>
          <p className="mt-0 text-sm text-[var(--color-muted)]">
            Models differ in how many tokens they write to finish the same job. Independent measurements, as reported by secondary
            sources, show why a cheap token price can still mean a dear task:
          </p>
          <ul className="m-0 grid gap-3 pl-5 text-sm">
            {MEASURED_TOKEN_USE.map((item) => (
              <li key={item.model}>
                <strong>{item.model}:</strong> {item.finding} <span className="text-[var(--color-muted)]">({item.source})</span>
              </li>
            ))}
          </ul>
        </aside>
      </PageSection>

      {/* Estimator */}
      <PageSection id="estimator" title="Estimate your own cost" intro="Choose a task, set how often you run it, and see every model ranked. Everything runs in your browser and nothing is saved.">
        <TaskCostEstimator />
        <p className="mb-0 mt-4 text-sm">
          Prefer a standalone page? Use the <Link href="/tools/api-cost-calculator">API cost calculator</Link> and read{" "}
          <Link href="/learn/power-user/ai-api-pricing-for-non-engineers">AI API pricing for non-engineers</Link>.
        </p>
      </PageSection>

      {/* Changes */}
      <PageSection id="changes" title="Price changes to watch" intro="Introductory rates, retirements and peak windows that can change your bill soon.">
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {UPCOMING_CHANGES.map((change) => (
            <li key={change.isoDate} className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">{formatIsoDate(change.isoDate)}</p>
              <p className="mb-0 mt-1 text-sm">{change.text}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Also recurring: DeepSeek charges double on weekdays from 09:00 to 12:00 and 14:00 to 18:00 Beijing time. Tick
          &ldquo;budget for the higher rate&rdquo; in the estimator to see the effect. See also the{" "}
          <Link href="/prices/retirements">retirements tracker</Link>.
        </p>
      </PageSection>

      {/* Examples */}
      <PageSection id="examples" title="Four real-life examples" intro="The same maths, applied to four common situations. Numbers are calculated from the table above.">
        <div className="grid gap-6 lg:grid-cols-2">
          {WORKED_EXAMPLES.map((example) => (
            <WorkedExampleCard key={example.id} example={example} />
          ))}
        </div>
      </PageSection>

      {/* Tips */}
      <PageSection id="save" title="Eight ways to cut your bill">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {SAVING_TIPS.map((tip, index) => (
            <li key={tip} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ol>
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

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            <li>Prices change without notice. A table read last week can already be out of date.</li>
            <li>Estimates ignore tax, cache-storage charges, built-in tool fees and your own retries.</li>
            <li>Token counts differ by model, so the same text can cost more tokens on one than another.</li>
            <li>Hidden thinking can multiply output cost on hard tasks.</li>
          </ul>
        </div>
      </PageSection>

      {/* Sources */}
      <PageSection id="sources" title="Sources and labels" intro={`Verified on ${API_PRICES_CHECKED_ON}. Base prices come from each maker's announcement or pricing page where listed, and were cross-checked on at least two independent price trackers. Batch discounts, long-prompt rules and post-intro prices come mostly from trackers, so they are marked as secondary.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Provider pages</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {PROVIDER_PAGES.map((source) => (
                <li key={source.href}>
                  <span className={`${BADGE_CLASS} mr-2`}>{source.kind}</span>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
              Anthropic, Google AI Studio, DeepSeek and Xiaomi prices were read through trackers. Their own pages are still to be
              recorded here.
            </p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Price trackers used (secondary)</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {TRACKER_SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report a wrong price</Link> ·{" "}
          <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">See which model fits your task before you pick on price</p>
        </div>
        <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
      </footer>
    </div>
  );
}