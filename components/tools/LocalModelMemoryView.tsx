import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  CAPACITY_PRECISION_ID,
  CAPACITY_TIERS_GB,
  KV_TABLE_BYTES_PER_ELEMENT,
  KV_TABLE_CONTEXTS,
  KV_TABLE_SIZES_BILLIONS,
  PRECISIONS,
  TABLE_PRECISION_IDS,
  TABLE_SIZES_BILLIONS,
} from "@/lib/tools/localModelData";
import {
  buildCapacityTable,
  buildKvTable,
  buildMemoryTable,
  convertBitsToBytes,
  describeContextLength,
  estimateForPreset,
  findPrecision,
  formatGb,
  formatParameters,
} from "@/lib/tools/memoryEstimate";
import {
  DEVICE_GUIDES,
  FAQ,
  FIND_MEMORY,
  FORMULA_STEPS,
  GLOSSARY,
  GOTCHAS,
  METHOD_NOTES,
  MIXTURE_OF_EXPERTS_POINTS,
  READER_PATHS,
  SHORT_ANSWER,
  SOFTWARE_LINKS,
  WORKED_EXAMPLES,
} from "@/lib/tools/memoryEstimateContent";
import { HARDWARE_SPECS_VERIFIED_ON, RUNTIME_MARGIN_FRACTION } from "@/lib/tools/memoryEstimateConstants";
import { LocalModelMemoryEstimator } from "./LocalModelMemoryEstimator";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "who-for", label: "Which reader are you?" },
  { id: "find-memory", label: "Find your memory" },
  { id: "estimator", label: "Estimator" },
  { id: "how-it-works", label: "How it works" },
  { id: "precision", label: "Precision" },
  { id: "size-table", label: "Size table" },
  { id: "context", label: "Context cost" },
  { id: "moe", label: "Experts" },
  { id: "devices", label: "Devices" },
  { id: "examples", label: "Examples" },
  { id: "gotchas", label: "What can go wrong" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "method", label: "Method" },
] as const;

const MARGIN_PERCENT = Math.round(RUNTIME_MARGIN_FRACTION * 100);
const MEMORY_TABLE = buildMemoryTable(TABLE_SIZES_BILLIONS, TABLE_PRECISION_IDS);
const KV_TABLE = buildKvTable(KV_TABLE_SIZES_BILLIONS, KV_TABLE_CONTEXTS, KV_TABLE_BYTES_PER_ELEMENT);
const CAPACITY_PRECISION = findPrecision(CAPACITY_PRECISION_ID);
const CAPACITY_TABLE = CAPACITY_PRECISION
  ? buildCapacityTable(CAPACITY_TIERS_GB, convertBitsToBytes(CAPACITY_PRECISION.bitsPerWeight))
  : [];

const EXAMPLE_ROWS = WORKED_EXAMPLES.flatMap((example) => {
  const estimate = estimateForPreset(example.parametersBillions, example.precisionId, example.contextTokens, KV_TABLE_BYTES_PER_ELEMENT);
  const precision = findPrecision(example.precisionId);
  return estimate && precision ? [{ example, estimate, precision }] : [];
});

const TABLE_CLASS = "w-full border-collapse text-left text-sm";
const TABLE_HEAD_CLASS = "bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]";

/** Full Local model memory estimator page: tool, explanations, reference tables, FAQ and glossary. */
export function LocalModelMemoryView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 4</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Calculated, not measured</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>
            {HARDWARE_SPECS_VERIFIED_ON ? `Device specs verified on ${HARDWARE_SPECS_VERIFIED_ON}` : "Device specs: pending check"}
          </span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Local model memory estimator: how much memory does an AI model need?</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Enter a model size, a precision and a context length. See the memory it needs, whether it fits your computer, and a ceiling on how fast it can answer.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#estimator" className={BUTTON_PRIMARY}>Open the estimator</a>
          <a href="#find-memory" className={BUTTON_OUTLINE}>Find my computer&apos;s memory</a>
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

      <aside className={`${CARD_CLASS} mt-6 text-sm`}>
        <p className="m-0 font-semibold">Before you start</p>
        <p className="mb-0 mt-1 text-[var(--color-muted)]">
          This is a Level 4 tool. New to the words? Read{" "}
          <Link href="/learn/foundations/how-ai-chatbots-work">How AI chatbots work</Link> for tokens, then{" "}
          <Link href="/learn/power-user/context-windows-tokens-memory">Context windows, tokens and memory explained</Link>. To turn words into tokens, use the{" "}
          <Link href="/tools/token-estimator">token and context estimator</Link>.
        </p>
      </aside>

      {/* Short answer */}
      <PageSection id="short-answer" title="The short answer">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
            {SHORT_ANSWER.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">The one-line formula</p>
            <p className="mb-2 mt-1 text-lg font-semibold">GB ≈ billions of parameters × bytes per parameter × {(1 + RUNTIME_MARGIN_FRACTION).toFixed(1)}</p>
            <p className="m-0 text-sm">At 4-bit, a byte count of 0.5 means 27B needs about 16 GB, before context. Real 4-bit files run a little larger.</p>
          </aside>
        </div>
      </PageSection>

      {/* Reader paths */}
      <PageSection id="who-for" title="Which reader are you?" intro="Pick the path that fits. Each one points to the part of this page you need.">
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

      {/* Find memory */}
      <PageSection id="find-memory" title="Find your computer's memory in 30 seconds" intro="You need two numbers: your graphics-card memory (if you have a graphics card) and your total RAM.">
        <div className="grid gap-4 md:grid-cols-3">
          {FIND_MEMORY.map((entry) => (
            <article key={entry.system} className={CARD_CLASS}>
              <h3 className="mt-0">{entry.system}</h3>
              <p className="m-0 text-sm text-[var(--color-muted)]">{entry.steps}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Estimator */}
      <PageSection id="estimator" title="The estimator" intro="Change any input and the result updates at once. It runs in your browser and saves nothing.">
        <LocalModelMemoryEstimator />
      </PageSection>

      {/* How it works */}
      <PageSection id="how-it-works" title="How the estimate is built" intro="Five steps. Each one is a few lines of arithmetic you can check yourself.">
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {FORMULA_STEPS.map((step, index) => (
            <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* Precision */}
      <PageSection id="precision" title="Precision and quantization" intro="Quantization stores each weight in fewer bits. The file shrinks, and quality slips a little. Bits per weight are approximate and include the scale values that real files carry.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[44rem]`}>
            <caption className="sr-only">Bits per weight, bytes per parameter and expected quality for each precision</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Precision</th>
                <th scope="col" className="p-3">Bits per weight</th>
                <th scope="col" className="p-3">Bytes per parameter</th>
                <th scope="col" className="p-3">What to expect</th>
              </tr>
            </thead>
            <tbody>
              {PRECISIONS.map((precision) => (
                <tr key={precision.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">{precision.label}</th>
                  <td className="p-3 align-top tabular-nums">{precision.bitsPerWeight}</td>
                  <td className="p-3 align-top tabular-nums">{convertBitsToBytes(precision.bitsPerWeight).toFixed(2)}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{precision.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Quality notes are general guidance from how these formats are usually described, not our own test results. Build a small test set of your own tasks to be sure: see <Link href="/learn/power-user/build-your-own-ai-test-set">Build your own AI test set</Link>.
        </p>
      </PageSection>

      {/* Size table */}
      <PageSection id="size-table" title="Memory by model size and precision" intro={`Weights plus a ${MARGIN_PERCENT}% margin, with no context cache. Add the context cost below for a full picture.`}>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[36rem]`}>
            <caption className="sr-only">Approximate memory in GB by model size and precision</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Model size</th>
                {TABLE_PRECISION_IDS.map((precisionId) => (
                  <th key={precisionId} scope="col" className="p-3">{findPrecision(precisionId)?.shortLabel ?? precisionId}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMORY_TABLE.map((row) => (
                <tr key={row.sizeBillions} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{formatParameters(row.sizeBillions)}</th>
                  {row.cells.map((cell) => (
                    <td key={cell.precisionId} className="p-3 tabular-nums">{formatGb(cell.totalGb)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Context */}
      <PageSection id="context" title="What a long context costs" intro="The context cache grows in a straight line with the number of tokens. These figures use typical layouts and a 16-bit cache, so they are upper bounds for models that use sliding-window attention.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[32rem]`}>
            <caption className="sr-only">Approximate context cache size by context length and model size class</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Context length</th>
                {KV_TABLE_SIZES_BILLIONS.map((size) => (
                  <th key={size} scope="col" className="p-3">{formatParameters(size)} class</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KV_TABLE.map((row) => (
                <tr key={row.contextTokens} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{describeContextLength(row.contextTokens)}</th>
                  {row.cells.map((cell) => (
                    <td key={cell.sizeBillions} className="p-3 tabular-nums">{formatGb(cell.kvCacheGb)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">An 8-bit cache halves these numbers and a 4-bit cache quarters them, at some risk to quality on long contexts. Support depends on your software.</p>
      </PageSection>

      {/* MoE */}
      <PageSection id="moe" title="Mixture-of-experts: total size versus active size" intro="The two sizes in a name like 30B-A3B answer two different questions.">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {MIXTURE_OF_EXPERTS_POINTS.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </PageSection>

      {/* Devices */}
      <PageSection id="devices" title="Which kind of computer?" intro="The same model behaves differently on each kind of memory.">
        <div className="grid gap-4 md:grid-cols-3">
          {DEVICE_GUIDES.map((guide) => (
            <article key={guide.title} className={CARD_CLASS}>
              <h3 className="mt-0">{guide.title}</h3>
              <p className="m-0 text-sm">{guide.summary}</p>
              <p className="mb-0 mt-2 text-sm"><strong>Good for:</strong> {guide.goodFor}</p>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Watch out:</strong> {guide.watchOut}</p>
            </article>
          ))}
        </div>
        <h3 className="mb-2 mt-8">Largest model by memory size{CAPACITY_PRECISION ? ` (${CAPACITY_PRECISION.shortLabel})` : ""}</h3>
        <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">Weights and margin only. Leave room for the context cache, so choose a size below these figures.</p>
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[32rem]`}>
            <caption className="sr-only">Largest model size by memory size for each kind of device</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Memory</th>
                <th scope="col" className="p-3">Graphics card</th>
                <th scope="col" className="p-3">Apple Silicon</th>
                <th scope="col" className="p-3">PC RAM</th>
              </tr>
            </thead>
            <tbody>
              {CAPACITY_TABLE.map((row) => (
                <tr key={row.memoryGb} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left font-semibold">{row.memoryGb} GB</th>
                  <td className="p-3 tabular-nums">{formatParameters(row.gpuMaxBillions)}</td>
                  <td className="p-3 tabular-nums">{formatParameters(row.unifiedMaxBillions)}</td>
                  <td className="p-3 tabular-nums">{formatParameters(row.cpuMaxBillions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection id="examples" title="Worked examples" intro="Each row uses the same formulas as the estimator, with a 16-bit context cache.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className={`${TABLE_CLASS} min-w-[52rem]`}>
            <caption className="sr-only">Worked memory examples</caption>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className="p-3">Example</th>
                <th scope="col" className="p-3">Weights</th>
                <th scope="col" className="p-3">Margin</th>
                <th scope="col" className="p-3">Context cache</th>
                <th scope="col" className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_ROWS.map(({ example, estimate, precision }) => (
                <tr key={example.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold">
                    {example.title}
                    <span className="block text-xs font-normal text-[var(--color-muted)]">
                      {formatParameters(example.parametersBillions)} · {precision.shortLabel} · {describeContextLength(example.contextTokens)}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-[var(--color-muted)]">{example.story}</span>
                  </th>
                  <td className="p-3 align-top tabular-nums">{formatGb(estimate.weightsGb)}</td>
                  <td className="p-3 align-top tabular-nums">{formatGb(estimate.marginGb)}</td>
                  <td className="p-3 align-top tabular-nums">{formatGb(estimate.kvCacheGb)}</td>
                  <td className="p-3 align-top font-semibold tabular-nums">{formatGb(estimate.totalGb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Gotchas */}
      <PageSection id="gotchas" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {GOTCHAS.map((item) => <li key={item}>{item}</li>)}
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

      {/* Glossary */}
      <PageSection id="glossary" title="Key words" intro="Short definitions. The full list is in the glossary.">
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="mb-0 mt-3 text-sm"><Link href="/learn/glossary">Open the full glossary</Link></p>
      </PageSection>

      {/* Method */}
      <PageSection id="method" title="Method, labels and software" intro="How the figures were produced, and where to look next.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">How we calculated this</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {METHOD_NOTES.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Software and references</h3>
            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
              {SOFTWARE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.title}</a>
                  <span className="text-[var(--color-muted)]"> · {link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/corrections">Report a wrong figure</Link> · <Link href="/compare/models">Model directory</Link> · <Link href="/compare/open-vs-closed">Open-weight vs closed models</Link> · <Link href="/tools/api-cost-calculator">Prefer a hosted model? Estimate API cost</Link>
        </p>
      </PageSection>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
          <p className="m-0 font-semibold">Read the full guide to running an AI model on your own computer</p>
        </div>
        <Link href="/learn/expert/run-ai-on-your-own-computer" className={BUTTON_PRIMARY}>Open the guide</Link>
      </footer>
    </div>
  );
}