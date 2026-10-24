"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LABELS_BY_HREF } from "@/lib/config/navLinks";
import { buildBreadcrumbs } from "@/lib/shared/breadcrumbs";
import styles from "./Breadcrumbs.module.css";

/** Trail under the header on every inner page. Hidden on the home page. */
export function Breadcrumbs() {
  const items = buildBreadcrumbs(usePathname(), NAV_LABELS_BY_HREF);
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;
          return (
            <li key={item.href} className={styles.item}>
              {isCurrentPage ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
