import { SitemapView } from "@/components/layout/SitemapView";
import { buildPageMetadata } from "@/lib/shared/metadata";

export const metadata = buildPageMetadata({
  title: "Sitemap",
  description: "Every section of the site in one list.",
  route: "/sitemap",
});

export default function SitemapPage() {
  return <SitemapView />;
}
