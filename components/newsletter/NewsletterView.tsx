import Link from "next/link";
import {
  AUDIENCE_PROFILES,
  DEADLINES_DATA,
  HERO,
  ISSUE_CATEGORIES,
  NEWSLETTER_FAQ,
  NEWSLETTER_LAST_REVIEWED,
  NEWSLETTER_NAV,
  NEWSLETTER_RELATED_LINKS,
  PROMISES,
  ROUNDUP_NOTICE,
  SAMPLE_ISSUE,
  SPONSOR_TEXT,
  WHATS_INSIDE,
} from "@/lib/newsletter/newsletterContent";
import AudienceExplorer from "./AudienceExplorer";
import DeadlineTracker from "./DeadlineTracker";
import FaqAccordion from "./FaqAccordion";
import IssuePreview from "./IssuePreview";
import SectionNav from "./SectionNav";
import styles from "./NewsletterView.module.css";

/** Renders the newsletter page. Content comes from `lib/newsletter/newsletterContent`; interactivity lives in the child components. */
export default function NewsletterView() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link> / Newsletter
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>{HERO.eyebrow}</p>
          <h1 className={styles.title}>{HERO.heading}</h1>
          <p className={styles.lead}>{HERO.lead}</p>
          <div className={styles.actions}>
            <Link href={HERO.primaryHref} className={styles.primaryButton}>
              {HERO.primaryLabel}
            </Link>
            <Link href={HERO.secondaryHref} className={styles.secondaryButton}>
              {HERO.secondaryLabel}
            </Link>
          </div>
          <ul className={styles.chips}>
            {HERO.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <p className={styles.notice}>{ROUNDUP_NOTICE}</p>
        </header>

        <SectionNav sections={NEWSLETTER_NAV} />

        <section id="audience" aria-labelledby="audience-heading" className={styles.section}>
          <h2 id="audience-heading">Who it is for</h2>
          <p className={styles.sectionIntro}>Pick who you are to see what we flag for you.</p>
          <AudienceExplorer profiles={AUDIENCE_PROFILES} />
        </section>

        <section id="inside" aria-labelledby="inside-heading" className={styles.section}>
          <h2 id="inside-heading">What is in each issue</h2>
          <ol className={styles.cardGrid}>
            {WHATS_INSIDE.map((item, index) => (
              <li key={item.title} className={styles.card}>
                <span className={styles.cardNumber}>{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="preview" aria-labelledby="preview-heading" className={styles.section}>
          <h2 id="preview-heading">{SAMPLE_ISSUE.heading}</h2>
          <p className={styles.sectionIntro}>{SAMPLE_ISSUE.intro}</p>
          <IssuePreview
            items={SAMPLE_ISSUE.items}
            categories={ISSUE_CATEGORIES}
            href={SAMPLE_ISSUE.href}
            hrefLabel={SAMPLE_ISSUE.hrefLabel}
          />
        </section>

        <section id="dates" aria-labelledby="dates-heading" className={styles.section}>
          <h2 id="dates-heading">{DEADLINES_DATA.heading}</h2>
          <p className={styles.sectionIntro}>{DEADLINES_DATA.intro}</p>
          <DeadlineTracker
            deadlines={DEADLINES_DATA.items}
            verifiedOn={DEADLINES_DATA.verifiedOn}
            trackerHref={DEADLINES_DATA.trackerHref}
            trackerLabel={DEADLINES_DATA.trackerLabel}
          />
        </section>

        <section id="promises" aria-labelledby="promises-heading" className={styles.section}>
          <h2 id="promises-heading">Our promises</h2>
          <ul className={styles.cardGrid}>
            {PROMISES.map((promise) => (
              <li key={promise.title} className={styles.card}>
                <h3>{promise.title}</h3>
                <p>{promise.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.sponsor}>
            {SPONSOR_TEXT} Read the <Link href="/about/independence">independence promise</Link> and how{" "}
            <Link href="/sponsored">sponsored content</Link> is labelled.
          </p>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className={styles.section}>
          <h2 id="faq-heading">Common questions</h2>
          <FaqAccordion items={NEWSLETTER_FAQ} />
        </section>

        <section aria-labelledby="related-heading" className={styles.section}>
          <h2 id="related-heading">Keep reading</h2>
          <ul className={styles.cardGrid}>
            {NEWSLETTER_RELATED_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.linkCard}>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className={styles.reviewed}>Last reviewed {NEWSLETTER_LAST_REVIEWED}.</p>
      </div>
    </div>
  );
}