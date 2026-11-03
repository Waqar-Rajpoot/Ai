import Link from "next/link";
import {
  FOOTER_BRAND,
  FOOTER_EXPLORE_GROUPS,
  FOOTER_REPORT_ERROR,
  type FooterGroup,
} from "@/lib/config/footerLinks";
import { getCopyrightYears } from "@/lib/shared/copyright";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const LINK_CLASS = `group inline-flex items-center rounded-sm text-[var(--color-muted)] no-underline transition-all duration-200 hover:translate-x-1 hover:text-[var(--color-text)] motion-reduce:transform-none motion-reduce:transition-none ${FOCUS_RING}`;

/** One labelled list of links. Links marked `isLive: false` are left out. */
function FooterLinkGroup({ group }: { group: FooterGroup }) {
  const headingId = `footer-${group.id}`;
  const links = group.links.filter((link) => link.isLive !== false);
  if (links.length === 0) return null;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-4 mt-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text)]"
      >
        <span aria-hidden="true" className="h-3 w-1 rounded-full bg-[var(--color-accent)]" />
        {group.title}
      </h2>
      <ul className="m-0 grid list-none gap-2.5 p-0 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={LINK_CLASS}>
              <span
                aria-hidden="true"
                className="w-0 overflow-hidden text-[var(--color-accent)] opacity-0 transition-all duration-200 group-hover:mr-1.5 group-hover:w-3 group-hover:opacity-100 group-focus-visible:mr-1.5 group-focus-visible:w-3 group-focus-visible:opacity-100 motion-reduce:transition-none"
              >
                →
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Site-wide footer: link groups and copyright bar. */
export function Footer() {
  const copyrightYears = getCopyrightYears(FOOTER_BRAND.foundedYear, new Date().getFullYear());

  return (
    <footer className="mt-0 bg-[var(--color-surface)]">
      {/* Accent line */}
      <div
        aria-hidden="true"
        className="h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent"
      />

      <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-x-8 gap-y-10">
          {FOOTER_EXPLORE_GROUPS.map((group) => (
            <FooterLinkGroup key={group.id} group={group} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]">
          <p className="m-0">
            © {copyrightYears} {FOOTER_BRAND.name}
          </p>
          <Link
            href={FOOTER_REPORT_ERROR.href}
            className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-[var(--color-text)] no-underline transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {FOOTER_REPORT_ERROR.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}