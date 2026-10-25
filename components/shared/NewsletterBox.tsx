import Link from "next/link";
import { BUTTON_PRIMARY, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";

interface NewsletterBoxProps {
  /** External signup form URL. Null when signup is not set up yet. */
  actionUrl: string | null;
  /** Name of the email field the external form expects. */
  emailFieldName: string;
  heading: string;
  description: string;
  benefits?: readonly string[];
}

/** Email signup that posts to an external provider. Nothing is stored on this site. */
export function NewsletterBox({ actionUrl, emailFieldName, heading, description, benefits = [] }: NewsletterBoxProps) {
  return (
    <aside className={`${CARD_CLASS} border-[var(--color-accent)]`} aria-labelledby="newsletter-heading">
      <h3 id="newsletter-heading" className="mt-0">{heading}</h3>
      <p className="m-0 text-sm text-[var(--color-muted)]">{description}</p>
      {benefits.length > 0 && (
        <ul className="mb-0 mt-3 grid gap-1 pl-5 text-sm">
          {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
        </ul>
      )}
      {actionUrl ? (
        <form action={actionUrl} method="post" target="_blank" className="mt-4 flex flex-wrap gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            name={emailFieldName}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`${INPUT_CLASS} min-w-0 flex-1`}
          />
          <button type="submit" className={BUTTON_PRIMARY}>Subscribe</button>
        </form>
      ) : (
        <p className="mb-0 mt-4 text-sm font-semibold">Signup is not open yet. Check back soon.</p>
      )}
      <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
        The form is run by our email provider, in a new tab. We use your address only to send the newsletter. See our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </aside>
  );
}