import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CHEAT_SHEETS_REVIEWED_ON, MODEL_PICKS_CHECKED_ON } from "@/lib/tools/cheatSheetConstants";
import {
  COMMON_MISTAKES,
  FAQ,
  GLOSSARY,
  READER_ROWS,
  RELATED_LINKS,
  TIPS,
} from "@/lib/tools/cheatSheetContent";
import { CHEAT_SHEETS } from "@/lib/tools/cheatSheetData";
import { describeLevels } from "@/lib/tools/cheatSheets";
import { CheatSheetList } from "./CheatSheetList";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "which-sheet", label: "Which sheet?" },
  { id: "sheets", label: "The sheets" },
  { id: "tips", label: "Get more from them" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources and labels" },
] as const;

const TEMPLATE_COUNT = CHEAT_SHEETS.flatMap((sheet) => sheet.blocks).filter((block) => block.kind === "template").length;

function findSheetTitle(sheetId: string): string {
  return CHEAT_SHEETS.find((sheet) => sheet.id === sheetId)?.shortTitle ?? sheetId;
}

/** Full cheat sheets page: four sheets you can fill in, copy, download or print, plus guidance. */
export function CheatSheetsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <div className="print:hidden">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
          <Link href="/">Home</Link> › <Link href="/tools">Tools</Link> › <span aria-current="page">Cheat sheets and templates</span>
        </nav>

        <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
          <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Levels 1 to 3</span>
            <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {CHEAT_SHEETS_REVIEWED_ON}</span>
            <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data stays in your browser</span>
          </p>
          <h1 className="relative mb-3 mt-4 max-w-3xl">AI cheat sheets and templates you can copy, fill in and print</h1>
          <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
            {CHEAT_SHEETS.length} one-page sheets and {TEMPLATE_COUNT} fill-in templates: write clearer prompts, choose a model, prepare a resume and set safe limits for an AI agent.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <a href="#sheets" className={BUTTON_PRIMARY}>Open the sheets</a>
            <a href="#which-sheet" className={BUTTON_OUTLINE}>Which one do I need?</a>
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

        <PageSection id="summary" title="The short answer">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
            <ul className={`${CARD_CLASS} m-0 grid list-none gap-3`}>
              <li><strong>Good prompts have a shape.</strong> Role, task, context, format and limits fix most weak requests.</li>
              <li><strong>Choose a model by task, not by hype.</strong> Start cheap, test on your own tasks and move up only where it fails.</li>
              <li><strong>Templates save time but not judgement.</strong> You check the facts, and you own what you send.</li>
              <li><strong>Give agents the least access.</strong> The more an agent can reach, the more a mistake or a trick can cost.</li>
            </ul>
            <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Use them safely</p>
              <p className="mb-0 mt-1 text-sm">Never type passwords, ID numbers, card details or client data into a template or a chat. See the <Link href="/tools/ai-safety-checklist">AI safety checklist</Link>.</p>
            </aside>
          </div>
        </PageSection>

        <PageSection id="which-sheet" title="Which sheet do you need?" intro="Pick the line that sounds like you.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">Which cheat sheet suits which reader</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">If you are</th>
                  <th scope="col" className="p-3">Start with</th>
                  <th scope="col" className="p-3">Why</th>
                </tr>
              </thead>
              <tbody>
                {READER_ROWS.map((row) => {
                  const sheet = CHEAT_SHEETS.find((candidate) => candidate.id === row.sheetId);
                  return (
                    <tr key={row.reader} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="p-3 text-left align-top font-semibold">{row.reader}</th>
                      <td className="p-3 align-top">
                        <a href={`#${row.sheetId}`}>{findSheetTitle(row.sheetId)}</a>
                        {sheet && <span className="block text-xs text-[var(--color-muted)]">{describeLevels(sheet.levels)}</span>}
                      </td>
                      <td className="p-3 align-top text-[var(--color-muted)]">{row.why}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PageSection>
      </div>

      <PageSection id="sheets" title="The sheets" intro="Open a sheet, fill in the boxes, then copy, download or print it. Every sheet works without an account.">
        <CheatSheetList />
      </PageSection>

      <div className="print:hidden">
        <PageSection id="tips" title="Get more from every sheet">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((tip) => (
              <li key={tip.title} className={CARD_CLASS}>
                <h3 className="mt-0">{tip.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{tip.detail}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="mistakes" title="Common mistakes">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {COMMON_MISTAKES.map((mistake) => (
              <li key={mistake.title} className={CARD_CLASS}>
                <h3 className="mt-0">{mistake.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{mistake.detail}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="glossary" title="Terms in plain English">
          <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map((entry) => (
              <div key={entry.term} className={CARD_CLASS}>
                <dt className="font-bold">{entry.term}</dt>
                <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
              </div>
            ))}
          </dl>
        </PageSection>

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
              <li>A template does not make an answer correct. Check facts, numbers and quotes.</li>
              <li>Model names, prices and features change. Prices and features change. Confirm on the provider&apos;s website before buying.</li>
              <li>The model picks are a snapshot from {MODEL_PICKS_CHECKED_ON}. A score is a shortlist, not a verdict.</li>
              <li>A ticked agent checklist lowers risk and does not remove it.</li>
            </ul>
          </div>
        </PageSection>

        <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${CHEAT_SHEETS_REVIEWED_ON}. These sheets are hand-written guidance labelled "Tested by us: no". The model picks come from our own model directory snapshot of ${MODEL_PICKS_CHECKED_ON}.`}>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Related on this site</h3>
            <ul className="m-0 grid list-none gap-3 p-0 text-sm sm:grid-cols-2">
              {RELATED_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                  <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
          </p>
        </PageSection>

        <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next</p>
            <p className="m-0 font-semibold">Browse copy-ready prompts by task and level</p>
          </div>
          <Link href="/tools/prompt-library" className={BUTTON_PRIMARY}>Open the prompt library</Link>
        </footer>
      </div>
    </div>
  );
}