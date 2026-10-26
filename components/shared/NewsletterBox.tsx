import Link from "next/link";
import { BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "./pageStyles";

interface NewsletterBoxProps {
  /** External sign-up form URL, or null to link to the newsletter page instead. */
  actionUrl: string | null;
}

/** Weekly roundup sign-up. Posts to an external form provider, so no email is stored on this site. */
export function NewsletterBox({ actionUrl }: NewsletterBoxProps) {
  return (
    <aside className={`${CARD_CLASS} grid gap-6 md:grid-cols-[1fr_24rem] md:items-center`} aria-labelledby="newsletter-heading">
      <div>
        <h2 id="newsletter-heading" className="m-0 text-2xl font-extrabold tracking-tight">The weekly roundup, in your inbox</h2>
        <p className="mb-0 mt-2 text-[var(--color-muted)]">
          New models, price changes, retirements and policy news in one short email, sent the same day every week. It may include one clearly labelled sponsor slot.
        </p>
      </div>
      {actionUrl ? (
        <form action={actionUrl} method="post" target="_blank" className="grid gap-2">
          <label htmlFor="newsletter-email" className="text-sm font-semibold">Email address</label>
          <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={INPUT_CLASS} />
          <button type="submit" className={`${BUTTON_PRIMARY} ${FOCUS_RING}`}>Subscribe</button>
          <p className="m-0 text-xs text-[var(--color-muted)]">One email a week. Unsubscribe any time. See the <Link href="/privacy-policy">privacy policy</Link>.</p>
        </form>
      ) : (
        <div>
          <Link href="/newsletter" className={BUTTON_PRIMARY}>See what you get</Link>
        </div>
      )}
    </aside>
  );
}