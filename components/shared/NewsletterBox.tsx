import Link from "next/link";
import { BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "./pageStyles";

export interface NewsletterBoxProps {
  /** External sign-up form URL, or null/undefined to link to the newsletter page instead. */
  actionUrl?: string | null;
  /** Field name used by the form provider (e.g. "email"). */
  emailFieldName?: string;
  /** Custom heading text. */
  heading?: string;
  /** Custom description text. */
  description?: string;
  /** Custom list of newsletter benefits. */
  benefits?: readonly string[];
}

/** Weekly roundup sign-up. Posts to an external form provider, so no email is stored on this site. */
export function NewsletterBox({
  actionUrl,
  emailFieldName = "email",
  heading = "The weekly roundup, in your inbox",
  description = "New models, price changes, retirements and policy news in one short email, sent the same day every week. It may include one clearly labelled sponsor slot.",
  benefits,
}: NewsletterBoxProps) {
  return (
    <aside className={`${CARD_CLASS} grid gap-6 md:grid-cols-[1fr_24rem] md:items-center`} aria-labelledby="newsletter-heading">
      <div>
        <h2 id="newsletter-heading" className="m-0 text-2xl font-extrabold tracking-tight">
          {heading}
        </h2>
        <p className="mb-0 mt-2 text-[var(--color-muted)]">
          {description}
        </p>
        {benefits && benefits.length > 0 && (
          <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        )}
      </div>
      {actionUrl ? (
        <form action={actionUrl} method="post" target="_blank" className="grid gap-2">
          <label htmlFor="newsletter-email" className="text-sm font-semibold">Email address</label>
          <input
            id="newsletter-email"
            name={emailFieldName}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
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