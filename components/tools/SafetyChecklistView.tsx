import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { AUDIENCES } from "@/lib/tools/safetyChecklistData";
import { getAllItems } from "@/lib/tools/checklists";
import { SAFETY_CHECKLIST_REVIEWED_ON } from "@/lib/tools/safetyChecklistConstants";
import {
  ANSWER_RED_FLAGS,
  FAQ,
  GLOSSARY,
  INCIDENT_STEPS,
  NEVER_PASTE,
  RELATED_LINKS,
  SAFETY_RULES,
  SAFETY_SOURCES,
  SCAM_ROWS,
  SETTINGS_GUIDE,
} from "@/lib/tools/safetyGuideContent";
import { SafetyChecklist } from "./SafetyChecklist";

const TOC = [
  { id: "summary", label: "Short answer" },
  { id: "rules", label: "Three rules" },
  { id: "checklist", label: "Your checklist" },
  { id: "never-paste", label: "Never paste" },
  { id: "bad-answers", label: "Bad answers" },
  { id: "scams", label: "Scams" },
  { id: "settings", label: "Settings" },
  { id: "incident", label: "If something goes wrong" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const TOTAL_ITEMS = AUDIENCES.reduce((sum, audience) => sum + getAllItems(audience.groups).length, 0);

/** Full AI safety checklist page: three checklists plus the guides that explain them. */
export function SafetyChecklistView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <div className="print:hidden">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)]">
          <Link href="/">Home</Link> › <Link href="/tools">Tools</Link> › <span aria-current="page">AI safety checklist</span>
        </nav>

        <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
          <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Tools · Level 1</span>
            <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {SAFETY_CHECKLIST_REVIEWED_ON}</span>
            <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Data stays in your browser</span>
          </p>
          <h1 className="relative mb-3 mt-4 max-w-3xl">AI safety checklist for individuals, schools and small businesses</h1>
          <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
            {TOTAL_ITEMS} practical checks across three lists. Tick what you have done, see what is left, and print it. Nothing you tick leaves your device.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <a href="#checklist" className={BUTTON_PRIMARY}>Start the checklist</a>
            <a href="#incident" className={BUTTON_OUTLINE}>I already made a mistake</a>
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
              <li><strong>Most AI harm comes from habits, not hacking.</strong> Pasting private data, trusting an answer without checking, and acting fast on a convincing fake cause most problems.</li>
              <li><strong>Settings matter.</strong> Whether your chats can be used to improve a model depends on the provider, the plan and your choices.</li>
              <li><strong>Scams now sound and look real.</strong> A code word and a call-back habit work better than trying to spot a fake.</li>
              <li><strong>Organisations need rules.</strong> Schools and small businesses need an owner, a short policy and an approved tool list.</li>
            </ul>
            <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Five minutes, biggest effect</p>
              <ol className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
                <li>Open your AI app&apos;s data settings and choose on purpose.</li>
                <li>Turn on two-step sign-in.</li>
                <li>Agree a family code word.</li>
                <li>Delete one old sensitive chat.</li>
              </ol>
            </aside>
          </div>
        </PageSection>

        <PageSection id="rules" title="Three rules behind every item" intro="If you remember nothing else, remember these.">
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {SAFETY_RULES.map((rule, index) => (
              <li key={rule.title} className={`${CARD_CLASS} flex gap-3`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm"><strong>{rule.title}.</strong> {rule.detail}</span>
              </li>
            ))}
          </ol>
        </PageSection>
      </div>

      <PageSection id="checklist" title="Your checklist" intro="Pick your list. Essential items cover the biggest risks. Open Why and how under any item for the reason and the steps.">
        <SafetyChecklist />
      </PageSection>

      <div className="print:hidden">
        <PageSection id="never-paste" title="What never to paste into a chatbot" intro="Removing the sensitive part usually costs you nothing, and you can still get the help you wanted.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">Types of information to keep out of AI chats, with safer alternatives</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Kind of information</th>
                  <th scope="col" className="p-3">Examples</th>
                  <th scope="col" className="p-3">Safer way</th>
                </tr>
              </thead>
              <tbody>
                {NEVER_PASTE.map((row) => (
                  <tr key={row.category} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.category}</th>
                    <td className="p-3 align-top">{row.examples}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.saferWay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-3 text-sm">Full guide: <Link href="/learn/foundations/never-share-with-ai-chatbot">What you should never share with an AI chatbot</Link>.</p>
        </PageSection>

        <PageSection id="bad-answers" title="Signs an AI answer needs checking" intro="Any one of these is a reason to slow down.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Warning signs in AI answers and what to do</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Warning sign</th>
                  <th scope="col" className="p-3">What to do</th>
                </tr>
              </thead>
              <tbody>
                {ANSWER_RED_FLAGS.map((row) => (
                  <tr key={row.sign} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.sign}</th>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.whatToDo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-3 text-sm">Full routine: <Link href="/learn/practitioner/fact-check-ai-answers">How to fact-check AI answers</Link>.</p>
        </PageSection>

        <PageSection id="scams" title="Scams and fakes: what to do" intro="You do not need to spot the fake. You need a habit that works even when the fake is perfect.">
          <div className="grid gap-4 md:grid-cols-2">
            {SCAM_ROWS.map((row) => (
              <article key={row.scam} className={CARD_CLASS}>
                <h3 className="mt-0">{row.scam}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]"><strong>Looks like:</strong> {row.looksLike}</p>
                <p className="mb-0 mt-2 text-sm"><strong>Do this:</strong> {row.safeResponse}</p>
              </article>
            ))}
          </div>
          <p className="mb-0 mt-3 text-sm">Full guide: <Link href="/learn/foundations/ai-scams-and-deepfakes">AI scams and deepfakes</Link>.</p>
        </PageSection>

        <PageSection id="settings" title="Settings to check in any AI app" intro="Menu names and defaults differ by app and change often, so we describe what to look for, not where to click. For provider-by-provider details, see the privacy matrix.">
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <caption className="sr-only">Privacy and security settings to check in AI apps</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Setting</th>
                  <th scope="col" className="p-3">What to look for</th>
                  <th scope="col" className="p-3">Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {SETTINGS_GUIDE.map((row) => (
                  <tr key={row.setting} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{row.setting}</th>
                    <td className="p-3 align-top">{row.lookFor}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{row.suggestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-3 text-sm">Compare providers: <Link href="/prices/privacy">Privacy matrix</Link>.</p>
        </PageSection>

        <PageSection id="incident" title="If something goes wrong" intro="Pasted something you should not have, or fell for a fake? Do these in order.">
          <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
            {INCIDENT_STEPS.map((step, index) => (
              <li key={step.title} className={`${CARD_CLASS} flex gap-3`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm"><strong>{step.title}.</strong> {step.detail}</span>
              </li>
            ))}
          </ol>
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">If you sent money or think someone is at risk, contact your bank or your local emergency services first.</p>
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
              <li>A ticked list is not a guarantee. It lowers common risks and does not remove them.</li>
              <li>Provider settings, terms and defaults change. Re-check them, and trust the provider&apos;s own page over any summary.</li>
              <li>Laws on data, AI and children differ by country. This page is general guidance, not legal advice.</li>
              <li>Your ticks live in this browser only. A new device or cleared data starts fresh.</li>
            </ul>
          </div>
        </PageSection>

        <PageSection id="sources" title="Sources and labels" intro={`Reviewed ${SAFETY_CHECKLIST_REVIEWED_ON}. This is hand-written guidance labelled "Tested by us: no". The sources below are general references, not a test of any single product.`}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={CARD_CLASS}>
              <h3 className="mt-0">References</h3>
              <ul className="m-0 grid list-none gap-3 p-0 text-sm">
                {SAFETY_SOURCES.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                    <span className="block text-xs text-[var(--color-muted)]">{source.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={CARD_CLASS}>
              <h3 className="mt-0">Related on this site</h3>
              <ul className="m-0 grid list-none gap-3 p-0 text-sm">
                {RELATED_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                    <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
          </p>
        </PageSection>

        <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next level</p>
            <p className="m-0 font-semibold">Learn a fact-checking routine for school, work, health and money</p>
          </div>
          <Link href="/learn/practitioner" className={BUTTON_PRIMARY}>Go to Practitioner</Link>
        </footer>
      </div>
    </div>
  );
}