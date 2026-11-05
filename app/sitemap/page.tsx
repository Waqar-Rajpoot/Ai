import type { Metadata } from "next";
import { SitemapView } from "@/components/sitemap/SitemapView";
import { BRAND_NAME } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Sitemap: find any page fast",
  description: `Every page on ${BRAND_NAME} in one place: guides, reviews, prices, free tools, news and trust pages. Search, filter, or tell us what you want to do.`,
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return <SitemapView />;
}