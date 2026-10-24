import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LEVEL_BLURBS, LEVEL_NAMES, TOOLS, TOOL_LEVELS } from "@/lib/tools/toolCatalog";
import { countToolsByLevel, getToolById, getToolsByIds } from "@/lib/tools/toolCatalogLogic";
import { TOOLS_HUB_REVIEWED_ON } from "@/lib/tools/toolsHubConstants";
import {
  BROWSER_POINTS,
  CURRENT_POINTS,
  FAQ,
  GOALS,
  LEVEL_PATHS,
  LIMIT_POINTS,
  READER_PATHS,
  READ_RESULT_ROWS,
  RELATED_LINKS,
  START_HERE_IDS,
  WRONG_POINTS,
} from "@/lib/tools/toolsHubContent";
import { ToolCatalogBrowser } from "./ToolCatalogBrowser";
import { ToolNameLink } from "./ToolNameLink";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "goals", label: "What do you want to do?" },
  { id: "all-tools", label: "All tools" },
  { id: "by-reader", label: "By reader type" },
  { id: "by-level", label: "By level" },
  { id: "how-to-read", label: "How to read each result" },
  { id: "your-data", label: "Data stays in your browser" },
  { id: "current", label: "Staying current" },
  { id: "faq", label: "FAQ" },
  { id: "next", label: "Where to go next" },
] as const;

const COUNTS_BY_LEVEL = countToolsByLevel(TOOLS);
const START_HERE_TOOLS = getToolsByIds(TOOLS, START_HERE_IDS);

/** Full Tools hub: tool browser, goals, reader and level paths, results guide, privacy, FAQ and next steps. */
export function ToolsHubView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools, levels 1 to 4</span>
          <span className={BADGE_CLASS}>Free, no sign-in</span>
          <span className={BADGE_CLASS}>Runs in your browser</span>
          <span className={BADGE_CLASS}>Reviewed {TOOLS_HUB_REVIEWED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Free AI tools: cost calculators, a model quiz, prompts and checklists</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {TOOLS.length} tools that turn the guides on this site into something you can use. Work out what a plan or an API will cost, find a model type that fits, copy a better prompt, check a benchmark claim or print a safety list.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#all-tools" className={BUTTON_PRIMARY}>Browse all tools</a>
          <a href="#goals" className={BUTTON_OUTLINE}>Not sure? Start here</a>
        </div>
      </header>

      <dl className="m-0 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOOL_LEVELS.map((level) => (
          <div key={level} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">Level {level}: {LEVEL_NAMES[level]}</dt>
            <dd className="m-0 text-2xl font-extrabold tabular-nums">
              {COUNTS_BY_LEVEL[level]}{" "}
              <span className="text-sm font-normal text-[var(--color-muted)]">{COUNTS_BY_LEVEL[level] === 1 ? "tool" : "tools"}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">A tool can suit more than one level, so these counts overlap.</p>

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
            <li><strong>{TOOLS.length} free tools in three groups:</strong> calculators, a quiz and prompt library, and checklists and downloads.</li>
            <li><strong>Every card tells you what to enter, what you get</strong> and which guide explains the result, so you know what the answer means before you act on it.</li>
            <li><strong>Everything runs in your browser</strong> on what you type. No account, and nothing you enter is sent to us.</li>
            <li><strong>Results are estimates and starting points.</strong> Use them to shortlist and plan, then confirm on the provider&apos;s own page.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Not sure where to begin?</p>
            <p className="mb-2 mt-1 text-sm">Start with these two. Both are Level 1 and take a few minutes.</p>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {START_HERE_TOOLS.map((tool) => (
                <li key={tool.id}><ToolNameLink tool={tool} /></li>
              ))}
            </ul>
          </aside>
        </div>
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">Prices and features change. Confirm on the provider&apos;s website before buying.</p>
      </PageSection>

      {/* Goals */}
      <PageSection id="goals" title="What do you want to do?" intro="Pick the goal closest to yours. Each one points to a single tool and tells you how to use it.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((goal) => {
            const tool = getToolById(TOOLS, goal.toolId);
            if (!tool) return null;
            return (
              <li key={goal.id} className={CARD_CLASS}>
                <p className="m-0 font-semibold">{goal.goal}</p>
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{goal.tip}</p>
                <p className="mb-0 mt-3 text-sm"><strong>Use:</strong> <ToolNameLink tool={tool} /></p>
              </li>
            );
          })}
        </ul>
      </PageSection>

      {/* All tools */}
      <PageSection id="all-tools" title="All tools" intro="Each card carries a level badge so you can tell whether a tool is for you. Filter by level or group, or search for a task.">
        <ToolCatalogBrowser />
      </PageSection>

      {/* By reader type */}
      <PageSection id="by-reader" title="Tools by reader type" intro="The same six reader groups as the home page, plus builders and researchers. Start with the tools listed for you.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {READER_PATHS.map((path) => {
            const tools = getToolsByIds(TOOLS, path.toolIds);
            return (
              <article key={path.id} className={CARD_CLASS}>
                <h3 className="mt-0">{path.title}</h3>
                <p className="mt-0 text-sm text-[var(--color-muted)]">{path.who}</p>
                <p className="m-0 text-sm">{path.why}</p>
                <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
                  {tools.map((tool) => (
                    <li key={tool.id}><ToolNameLink tool={tool} /></li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </PageSection>

      {/* By level */}
      <PageSection id="by-level" title="A tool order for each level" intro="Levels work the same way as on the Learn pages. Follow the order for your level, and use the Learn hub self-check if you are unsure which level fits.">
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {LEVEL_PATHS.map((path) => {
            const tools = getToolsByIds(TOOLS, path.toolIds);
            return (
              <li key={path.level} className={CARD_CLASS}>
                <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Level {path.level}: {LEVEL_NAMES[path.level]}</p>
                <h3 className="mb-1 mt-1">{path.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{LEVEL_BLURBS[path.level]}</p>
                <p className="mb-0 mt-2 text-sm">{path.note}</p>
                <ol className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
                  {tools.map((tool) => (
                    <li key={tool.id}><ToolNameLink tool={tool} /></li>
                  ))}
                </ol>
                <p className="mb-0 mt-3 text-sm"><Link href={path.hubHref}>Open the Level {path.level} guides</Link></p>
              </li>
            );
          })}
        </ol>
      </PageSection>

      {/* How to read */}
      <PageSection id="how-to-read" title="How to read each result" intro="A result is only useful if you know what it covers. This table says what each tool tells you, what it leaves out and how to check it.">
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
            <caption className="sr-only">What each tool result means, what it does not mean and how to check it</caption>
            <thead className="bg-[var(--color-bg)] text-xs text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="p-3">Tool</th>
                <th scope="col" className="p-3">The result tells you</th>
                <th scope="col" className="p-3">It does not tell you</th>
                <th scope="col" className="p-3">Check it by</th>
                <th scope="col" className="p-3">Learn more</th>
              </tr>
            </thead>
            <tbody>
              {READ_RESULT_ROWS.map((row) => {
                const tool = getToolById(TOOLS, row.toolId);
                if (!tool) return null;
                return (
                  <tr key={row.toolId} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold"><ToolNameLink tool={tool} /></th>
                    <td className="p-3 align-top">{row.tellsYou}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.doesNotTellYou}</td>
                    <td className="p-3 align-top">{row.checkBy}</td>
                    <td className="p-3 align-top">
                      <ul className="m-0 grid list-none gap-1 p-0">
                        {tool.guides.map((guide) => (
                          <li key={guide.href}><Link href={guide.href}>{guide.label}</Link></li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Data stays in your browser */}
      <PageSection id="your-data" title="Data stays in your browser" intro="You can use every tool without handing over anything about yourself.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What stays on your device</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {BROWSER_POINTS.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <h3 className="mt-0">What you should still keep out</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {LIMIT_POINTS.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </div>
        <p className="mb-0 mt-4 text-sm">
          Read the <Link href="/privacy-policy">privacy policy</Link> and the guide on <Link href="/learn/foundations/never-share-with-ai-chatbot">what you should never share with an AI chatbot</Link>.
        </p>
      </PageSection>

      {/* Staying current */}
      <PageSection id="current" title="How the tools stay current" intro="Tools that use prices are only as good as those prices, so they follow the same dated tables as the rest of the site.">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {CURRENT_POINTS.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <p className="mb-0 mt-3 text-sm">
          See <Link href="/about/source-policy">how we choose sources</Link>, the <Link href="/news/changelog">changelog</Link> and the <Link href="/about/corrections">corrections log</Link>.
        </p>
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
          More on how drafts are written and checked: <Link href="/about/editorial-standards">editorial standards</Link>.
        </p>
      </PageSection>

      {/* Where to go next */}
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
          <p className="m-0 font-semibold">Learn the ideas behind each result</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn" className={BUTTON_PRIMARY}>Open Learn</Link>
          <Link href="/newsletter" className={BUTTON_OUTLINE}>Get the weekly roundup</Link>
        </div>
      </footer>
    </div>
  );
}