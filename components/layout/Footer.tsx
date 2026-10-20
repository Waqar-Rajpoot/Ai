import Link from "next/link";
import { FOOTER_GROUPS } from "@/lib/config/navLinks";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import styles from "./Footer.module.css";

/** Site footer with the three link groups from the blueprint. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <ul className={styles.list}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {SITE_CONFIG.name}
      </p>
    </footer>
  );
}
