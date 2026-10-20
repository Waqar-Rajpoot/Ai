import { SITE_CONFIG } from "@/lib/config/siteConfig";
import type { StaticPageDefinition } from "@/types";
import { PageHeader } from "./PageHeader";

const DRAFT_NOTE = "Content to be written.";

interface StaticPageProps {
  page: StaticPageDefinition;
}

/** Renders a trust, legal or utility page from its heading outline. */
export function StaticPage({ page }: StaticPageProps) {
  return (
    <article className="page">
      <PageHeader title={page.title} badge={page.badge} intro={page.description} />
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.subheadings ? (
            section.subheadings.map((subheading) => (
              <div key={subheading}>
                <h3>{subheading}</h3>
                <p className="draft-note">{DRAFT_NOTE}</p>
              </div>
            ))
          ) : (
            <p className="draft-note">{DRAFT_NOTE}</p>
          )}
        </section>
      ))}
      {page.showContactEmail && (
        <p>
          Email us at{" "}
          <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>.
        </p>
      )}
    </article>
  );
}
