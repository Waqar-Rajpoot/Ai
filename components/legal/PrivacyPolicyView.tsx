import Link from "next/link";
import { CopyTextButton } from "@/components/shared/CopyTextButton";
import { FaqList } from "@/components/shared/FaqList";
import { PageSection } from "@/components/shared/PageSection";
import { StepList } from "@/components/shared/StepList";
import { TermGrid } from "@/components/shared/TermGrid";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CONTACT_EMAIL } from "@/lib/config/env";
import { isLikelyEmail } from "@/lib/contact/contactForm";
import {
  CHANGE_POINTS,
  CHILDREN_POINTS,
  CHOICE_STEPS,
  FAQ,
  NOT_COLLECTED,
  PLAIN_WORDS,
  RELATED_LINKS,
  RIGHTS,
  RIGHTS_BY_REGION,
  SECURITY_POINTS,
  SUMMARY_POINTS,
  TOOLS_NOTE,
  TOOL_DATA_ROWS,
  WHAT_CAN_GO_WRONG,
} from "@/lib/legal/privacyContent";
import { PRIVACY_EFFECTIVE_ON, PRIVACY_FACTS, PRIVACY_UPDATED_ON } from "@/lib/legal/privacyFacts";
import {
  buildCookieCategories,
  buildDataRows,
  buildLegalBases,
  buildOperatorLines,
  buildPurposes,
  buildThirdPartyRows,
} from "@/lib/legal/privacyPolicy";
import { PolicyTable } from "./PolicyTable";

const TOC = [
  { id: "summary", label: "Summary" },
  { id: "who", label: "1. Who we are" },
  { id: "collect", label: "2. What we collect" },
  { id: "use", label: "3. How we use it" },
  { id: "tools", label: "4. Our tools" },
  { id: "cookies", label: "5. Cookies" },
  { id: "others", label: "6. Who else is involved" },
  { id: "basis", label: "7. Why we may use it" },
  { id: "security", label: "8. Security and transfers" },
  { id: "choices", label: "9. Your choices and rights" },
  { id: "children", label: "10. Children" },
  { id: "changes", label: "11. Changes" },
  { id: "contact", label: "12. Contact" },
  { id: "faq", label: "FAQ" },
] as const;

const DATA_ROWS = buildDataRows(PRIVACY_FACTS);
const THIRD_PARTY_ROWS = buildThirdPartyRows(PRIVACY_FACTS);
const COOKIE_CATEGORIES = buildCookieCategories(PRIVACY_FACTS);
const LEGAL_BASES = buildLegalBases(PRIVACY_FACTS);
const PURPOSES = buildPurposes(PRIVACY_FACTS);
const OPERATOR_LINES = buildOperatorLines(PRIVACY_FACTS);
const HAS_EMAIL = isLikelyEmail(CONTACT_EMAIL);

/** Full privacy policy: summary, then twelve numbered sections, FAQ and related pages. */
export function PrivacyPolicyView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Legal</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Effective {PRIVACY_EFFECTIVE_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Last updated {PRIVACY_UPDATED_ON}</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Privacy policy</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          What {PRIVACY_FACTS.siteName} collects, why, who else is involved, how long we keep it, and what you can do about it. A plain-English summary comes first.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#choices" className={BUTTON_PRIMARY}>Your choices and rights</a>
          <a href="#contact" className={BUTTON_OUTLINE}>Ask a privacy question</a>
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

      <PageSection id="summary" title="The short version">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ul className={`${CARD_CLASS} m-0 grid gap-3 pl-8 text-sm`}>
            {SUMMARY_POINTS.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Quick links</p>
            <ul className="mb-0 mt-2 grid list-none gap-1 p-0 text-sm">
              <li><a href="#cookies">How cookies are used</a></li>
              <li><a href="#tools">What happens to what you type</a></li>
              <li><a href="#choices">Unsubscribe, delete or correct</a></li>
              <li><Link href="/contact">Ask a privacy question</Link></li>
            </ul>
          </aside>
        </div>
        <div className="mt-6">
          <h3 className="mt-0">Words used in this policy</h3>
          <TermGrid terms={PLAIN_WORDS} />
        </div>
      </PageSection>

      <PageSection id="who" title="1. Who we are">
        <div className={`${CARD_CLASS} grid gap-2 text-sm`}>
          {OPERATOR_LINES.map((line) => <p key={line} className="m-0">{line}</p>)}
          <p className="m-0">To reach us about privacy, see <a href="#contact">section 12</a>. Our <Link href="/about">About page</Link> says more about who we are.</p>
        </div>
      </PageSection>

      <PageSection id="collect" title="2. What we collect" intro="Each row says what the data is, where it comes from, why we use it and how long we keep it.">
        <PolicyTable
          caption="The personal data we collect, why, and how long we keep it"
          rows={DATA_ROWS}
          getRowKey={(row) => row.id}
          minWidthRem={60}
          columns={[
            { id: "what", header: "What", isRowHeader: true, render: (row) => row.what },
            { id: "details", header: "Details", render: (row) => row.details },
            { id: "source", header: "Where it comes from", render: (row) => row.source },
            { id: "purpose", header: "Why", render: (row) => row.purpose },
            { id: "retention", header: "How long we keep it", render: (row) => row.retention },
          ]}
        />
        <ul className="mb-0 mt-4 grid gap-1 pl-5 text-sm">
          {NOT_COLLECTED.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </PageSection>

      <PageSection id="use" title="3. How we use it">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {PURPOSES.map((purpose) => <li key={purpose}>{purpose}</li>)}
        </ul>
      </PageSection>

      <PageSection id="tools" title="4. Our tools and your data" intro="Calculators, the quiz, the checklists and the prompt library run in your browser.">
        <PolicyTable
          caption="What you enter into each tool and what happens to it"
          rows={TOOL_DATA_ROWS}
          getRowKey={(row) => row.id}
          minWidthRem={48}
          columns={[
            { id: "tool", header: "Tool", isRowHeader: true, render: (row) => row.tool },
            { id: "enter", header: "What you enter", render: (row) => row.youEnter },
            { id: "happens", header: "What happens to it", render: (row) => row.whatHappens },
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{TOOLS_NOTE}</p>
      </PageSection>

      <PageSection id="cookies" title="5. Cookies and similar technologies" intro="We describe each kind, who sets it and what you can do about it.">
        <PolicyTable
          caption="Kinds of cookie, their purpose, who sets them and your control"
          rows={COOKIE_CATEGORIES}
          getRowKey={(row) => row.id}
          minWidthRem={56}
          columns={[
            { id: "kind", header: "Kind", isRowHeader: true, render: (row) => row.title },
            { id: "purpose", header: "Purpose", render: (row) => row.purpose },
            { id: "setBy", header: "Set by", render: (row) => row.setBy },
            { id: "control", header: "Your control", render: (row) => row.control },
            { id: "optional", header: "Optional?", render: (row) => (row.canSwitchOff ? "Yes" : "No") },
          ]}
        />
      </PageSection>

      <PageSection id="others" title="6. Who else is involved" intro="Other companies handle some of this data for us or on their own pages. Their own policies apply there.">
        <PolicyTable
          caption="Other companies that handle data, and what they receive"
          rows={THIRD_PARTY_ROWS}
          getRowKey={(row) => row.id}
          minWidthRem={48}
          columns={[
            { id: "role", header: "Role", isRowHeader: true, render: (row) => row.role },
            { id: "who", header: "Who", render: (row) => row.who },
            { id: "receives", header: "What they receive", render: (row) => row.receives },
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Affiliate links are always disclosed where they appear. See <Link href="/about/independence">independence and disclosure</Link>. When you follow a link to another site, that site&apos;s policy applies.
        </p>
      </PageSection>

      <PageSection id="basis" title="7. Why we may use it" intro="For readers in the EU and UK, this is the legal reason for each use.">
        <PolicyTable
          caption="The legal reason for each use of personal data"
          rows={LEGAL_BASES}
          getRowKey={(row) => row.id}
          minWidthRem={40}
          columns={[
            { id: "activity", header: "What we do", isRowHeader: true, render: (row) => row.activity },
            { id: "basis", header: "Legal reason", render: (row) => row.basis },
          ]}
        />
      </PageSection>

      <PageSection id="security" title="8. Keeping data safe, and moving it">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {SECURITY_POINTS.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <p className="mb-0 mt-3 text-sm">
          <Link href="/learn/foundations/never-share-with-ai-chatbot">What never to share online</Link> · <Link href="/contact#never">What never to send us</Link>
        </p>
      </PageSection>

      <PageSection id="choices" title="9. Your choices and rights" intro="Six things you can do, then the rights the law may give you.">
        <div className="grid gap-8">
          <StepList steps={CHOICE_STEPS} />
          <div>
            <h3 className="mt-0">Rights you may have</h3>
            <TermGrid terms={RIGHTS} />
            <ul className="mb-0 mt-4 grid gap-1 pl-5 text-sm">
              {RIGHTS_BY_REGION.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="children" title="10. Children">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {CHILDREN_POINTS.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </PageSection>

      <PageSection id="changes" title="11. Changes to this policy">
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {CHANGE_POINTS.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          Effective {PRIVACY_EFFECTIVE_ON}. Last updated {PRIVACY_UPDATED_ON}. See the <Link href="/news/changelog">changelog</Link>.
        </p>
      </PageSection>

      <PageSection id="contact" title="12. Contact" intro="For anything in this policy, including a request to see, correct or remove your data.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Use the contact page</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">Choose &ldquo;A privacy or newsletter request&rdquo;. The page builds the email for you.</p>
            <p className="mb-0 mt-3"><Link href="/contact#form" className={BUTTON_PRIMARY}>Write to us</Link></p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Or email us</h3>
            {HAS_EMAIL ? (
              <>
                <p className="m-0 break-all text-sm"><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                <p className="mb-0 mt-3"><CopyTextButton text={CONTACT_EMAIL} label="Copy address" /></p>
              </>
            ) : (
              <p className="m-0 text-sm">Our email address is not available right now. Please use the contact page.</p>
            )}
            {PRIVACY_FACTS.operatorAddress && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">By post: {PRIVACY_FACTS.operatorAddress}</p>}
          </div>
        </div>
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

      <footer className={`${CARD_CLASS} mt-4 grid gap-3`}>
        <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Related pages</p>
        <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {RELATED_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </p>
      </footer>
    </div>
  );
}