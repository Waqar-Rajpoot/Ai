import { StaticPage } from "@/components/shared/StaticPage";
import { STATIC_PAGES } from "@/lib/pages/staticPages";
import { buildPageMetadata } from "@/lib/shared/metadata";

const page = STATIC_PAGES.privacyPolicy;

export const metadata = buildPageMetadata(page);

export default function PrivacyPolicyPage() {
  return <StaticPage page={page} />;
}
