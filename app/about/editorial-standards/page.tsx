import { StaticPage } from "@/components/shared/StaticPage";
import { STATIC_PAGES } from "@/lib/pages/staticPages";
import { buildPageMetadata } from "@/lib/shared/metadata";

const page = STATIC_PAGES.editorialStandards;

export const metadata = buildPageMetadata(page);

export default function EditorialStandardsPage() {
  return <StaticPage page={page} />;
}
