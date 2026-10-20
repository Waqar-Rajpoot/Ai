import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SITEMAP_SECTIONS } from "@/lib/config/navLinks";

/** HTML sitemap built from the navigation config. */
export function SitemapView() {
  return (
    <div className="page">
      <PageHeader title="Sitemap" badge="utility" />
      {SITEMAP_SECTIONS.map((section) => (
        <section key={section.href}>
          <h2>
            <Link href={section.href}>{section.label}</Link>
          </h2>
          <ul>
            {section.children?.map((child) => (
              <li key={child.href}>
                <Link href={child.href}>{child.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
