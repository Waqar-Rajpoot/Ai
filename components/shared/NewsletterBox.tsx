import { SITE_CONFIG } from "@/lib/config/siteConfig";
import styles from "./NewsletterBox.module.css";

/** Newsletter signup. Posts to an external form; hidden until a URL is configured. */
export function NewsletterBox() {
  const actionUrl = SITE_CONFIG.newsletterActionUrl;

  return (
    <section className={styles.box}>
      <h2 className={styles.title}>Get the weekly roundup</h2>
      {actionUrl ? (
        <form action={actionUrl} method="post" className={styles.form}>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      ) : (
        <p className={styles.note}>The weekly newsletter is coming soon.</p>
      )}
    </section>
  );
}
