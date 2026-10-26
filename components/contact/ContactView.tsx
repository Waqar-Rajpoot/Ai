import Link from "next/link";
import { CopyTextButton } from "@/components/shared/CopyTextButton";
import { FaqList } from "@/components/shared/FaqList";
import { PageSection } from "@/components/shared/PageSection";
import { StepList } from "@/components/shared/StepList";
import { TermGrid } from "@/components/shared/TermGrid";
import { TipGrid } from "@/components/shared/TipGrid";
import { BADGE_CLASS, BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CONTACT_EMAIL } from "@/lib/config/env";
import { CONTACT_REVIEWED_ON } from "@/lib/contact/contactConstants";
import {
  BEFORE_YOU_WRITE,
  CANNOT_HELP,
  CAN_HELP,
  ERROR_REPORT_STEPS,
  FAQ,
  NEVER_SEND,
  PRESS_AUDIENCES,
  QUICK_LINKS,
  RESPONSE_NOTE,
  WHAT_CAN_GO_WRONG,
  WHAT_HAPPENS_NEXT,
} from "@/lib/contact/contactContent";
import { isLikelyEmail } from "@/lib/contact/contactForm";
import { ContactForm } from "./ContactForm";
import { ContactReasonList } from "./ContactReasonList";

const TOC = [
  { id: "short-answer", label: "Short answer" },
  { id: "reasons", label: "Reasons to write" },
  { id: "form", label: "Write to us" },
  { id: "before", label: "Before you write" },
  { id: "errors", label: "Report an error" },
  { id: "next", label: "What happens next" },
  { id: "press", label: "Press and partners" },
  { id: "help", label: "What we can help with" },
  { id: "never", label: "What never to send" },
  { id: "limits", label: "What can go wrong" },
  { id: "faq", label: "FAQ" },
] as const;

const HAS_EMAIL = isLikelyEmail(CONTACT_EMAIL);

/** Full Contact page: reasons, a guided email builder, error-report guide, press and partner details, limits, FAQ and quick links. */
export function ContactView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">Contact · Utility</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Reviewed {CONTACT_REVIEWED_ON}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Opens your own email app</span>
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Contact us</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          Ask a question, report a wrong number, suggest a comparison, or reach us as press, a sponsor or a model maker.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#form" className={BUTTON_PRIMARY}>Write to us</a>
          <a href="#errors" className={BUTTON_OUTLINE}>Report an error</a>
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
            <li><strong>Pick a reason.</strong> The form asks only for what we need for that reason.</li>
            <li><strong>Your own email app sends it.</strong> The site is static and has no server, so nothing is sent from this page.</li>
            <li><strong>Errors come first.</strong> Give us the page, what it says, what it should say and a source link.</li>
            <li><strong>Keep secrets out.</strong> Never send passwords, ID numbers, health or money details, or client data.</li>
          </ul>
          <aside className={`${CARD_CLASS} border-[var(--color-accent)]`}>
            <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Payment never changes a result</p>
            <p className="mb-2 mt-1 text-sm">Sponsors and makers cannot buy a score, a ranking or early access to a review.</p>
            <p className="m-0 text-sm"><Link href="/about/independence">Read the independence page</Link></p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="reasons" title="Reasons to write" intro="Five reasons, and what to include for each so we can help quickly.">
        <ContactReasonList />
      </PageSection>

      <PageSection id="form" title="Write to us" intro="Pick a reason, fill in the fields and open the message in your email app. Or copy it and paste it into webmail.">
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ContactForm email={CONTACT_EMAIL} />
          <aside className="grid gap-4 self-start">
            <div className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Prefer to write it yourself?</p>
              {HAS_EMAIL ? (
                <>
                  <p className="mb-2 mt-1 break-all text-sm"><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                  <CopyTextButton text={CONTACT_EMAIL} label="Copy address" />
                </>
              ) : (
                <p className="mb-0 mt-1 text-sm">Our email address is not available right now. Please try again later.</p>
              )}
            </div>
            <div className={CARD_CLASS}>
              <p className="m-0 text-sm font-bold text-[var(--color-accent)]">What to expect</p>
              <p className="mb-0 mt-1 text-sm">{RESPONSE_NOTE}</p>
            </div>
          </aside>
        </div>
      </PageSection>

      <PageSection id="before" title="Before you write" intro="A quick look here often answers your question sooner than a message can.">
        <TipGrid tips={BEFORE_YOU_WRITE} />
      </PageSection>

      <PageSection id="errors" title="How to report an error well" intro="Six details that let us confirm and fix a mistake fast.">
        <StepList steps={ERROR_REPORT_STEPS} />
        <p className="mb-0 mt-4 text-sm">
          Check the <Link href="/about/corrections">corrections log</Link> first to see whether it is already fixed. Then choose Report an error in the form above.
        </p>
      </PageSection>

      <PageSection id="next" title="What happens next">
        <StepList steps={WHAT_HAPPENS_NEXT} />
      </PageSection>

      <PageSection id="press" title="Press, sponsors and model makers" intro="The rules that apply before you write. They are the same for everyone.">
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {PRESS_AUDIENCES.map((audience) => (
            <li key={audience.id} className={CARD_CLASS}>
              <h3 className="mt-0">{audience.title}</h3>
              <ul className="m-0 grid gap-2 pl-5 text-sm">
                {audience.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="mb-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {audience.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="help" title="What we can and cannot help with">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">We can</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {CAN_HELP.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">We cannot</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {CANNOT_HELP.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="never" title="What never to send" intro="The same rule we give for chatbots applies to email.">
        <TermGrid terms={NEVER_SEND} />
        <p className="mb-0 mt-3 text-sm">
          <Link href="/learn/foundations/never-share-with-ai-chatbot">Read the full guide</Link> · <Link href="/privacy-policy">Privacy policy</Link>
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

      <footer className={`${CARD_CLASS} mt-4 grid gap-3`}>
        <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">More pages</p>
        <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {QUICK_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </p>
      </footer>
    </div>
  );
}