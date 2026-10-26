import Link from "next/link";
import { PRICE_DISCLAIMER } from "@/lib/config/disclaimers";
import {
  FOOTER_AFFILIATE_NOTE,
  FOOTER_BRAND,
  FOOTER_EXPLORE_GROUPS,
  FOOTER_FRESHNESS,
  FOOTER_NEWSLETTER,
  FOOTER_NOT_ADVICE_NOTE,
  FOOTER_PROMISES,
  FOOTER_REPORT_ERROR,
  FOOTER_SITE_GROUPS,
  type FooterGroup,
} from "@/lib/config/footerLinks";
import { getCopyrightYears } from "@/lib/shared/copyright";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const LINK_CLASS = `text-[var(--color-muted)] no-underline transition hover:text-[var(--color-text)] hover:underline motion-reduce:transition-none ${FOCUS_RING}`;

const CTA_CLASS = `inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-accent)] px-5 py-2.5 font-semibold text-white no-underline shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition hover:brightness-110 motion-reduce:transition-none ${FOCUS_RING}`;

const CARD_CLASS = "rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5";

/** One labelled list of links. Links marked `isLive: false` are left out. */
function FooterLinkGroup({ group }: { group: FooterGroup }) {
  const headingId = `footer-${group.id}`;
  const links = group.links.filter((link) => link.isLive !== false);
  if (links.length === 0) return null;

  return (
    <nav aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-3 mt-0 text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
        {group.title}
      </h2>
      <ul className="m-0 grid list-none gap-2 p-0 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Site footer: brand and newsletter, promises, navigation columns, trust and company links, and legal notes. */
export function Footer() {
  const copyrightYears = getCopyrightYears(FOOTER_BRAND.foundedYear, new Date().getFullYear());

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] py-12">
        {/* Brand and newsletter */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="m-0 text-xl font-extrabold tracking-tight">{FOOTER_BRAND.name}</p>
            <p className="mb-0 mt-2 max-w-md text-sm text-[var(--color-muted)]">{FOOTER_BRAND.tagline}</p>
          </div>
          <div className={CARD_CLASS}>
            <h2 className="m-0 text-base font-bold">{FOOTER_NEWSLETTER.title}</h2>
            <p className="mb-4 mt-1 text-sm text-[var(--color-muted)]">{FOOTER_NEWSLETTER.text}</p>
            <Link href={FOOTER_NEWSLETTER.href} className={CTA_CLASS}>
              {FOOTER_NEWSLETTER.ctaLabel}
            </Link>
          </div>
        </div>

        {/* Promises */}
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_PROMISES.map((promise) => (
            <li key={promise.id} className={CARD_CLASS}>
              <p className="m-0 text-sm font-semibold">{promise.text}</p>
              <p className="mb-0 mt-2 text-sm">
                <Link href={promise.link.href} className={LINK_CLASS}>
                  {promise.link.label}
                </Link>
              </p>
            </li>
          ))}
        </ul>

        {/* Explore: mirrors the top navigation */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {FOOTER_EXPLORE_GROUPS.map((group) => (
            <FooterLinkGroup key={group.id} group={group} />
          ))}
        </div>

        {/* Trust, company, products */}
        <div className="mt-10 grid gap-8 border-t border-[var(--color-border)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {FOOTER_SITE_GROUPS.map((group) => (
            <FooterLinkGroup key={group.id} group={group} />
          ))}
        </div>

        {/* Freshness and legal notes */}
        <div className="mt-10 grid gap-3 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
          <p className="m-0">
            {FOOTER_FRESHNESS.text}{" "}
            <Link href={FOOTER_FRESHNESS.link.href} className={LINK_CLASS}>
              {FOOTER_FRESHNESS.link.label}
            </Link>
            .
          </p>
          <p className="m-0 font-semibold text-[var(--color-text)]">{PRICE_DISCLAIMER}</p>
          <p className="m-0">{FOOTER_NOT_ADVICE_NOTE}</p>
          <p className="m-0">{FOOTER_AFFILIATE_NOTE}</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]">
          <p className="m-0">
            © {copyrightYears} {FOOTER_BRAND.name}
          </p>
          <p className="m-0 flex flex-wrap gap-x-5 gap-y-2">
            <Link href={FOOTER_REPORT_ERROR.href} className={LINK_CLASS}>
              {FOOTER_REPORT_ERROR.label}
            </Link>
            <a href="#" aria-label="Back to top of page" className={LINK_CLASS}>
              Back to top
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}