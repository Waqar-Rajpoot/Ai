import type { Metadata } from "next";
import { SitemapView } from "@/components/sitemap/SitemapView";

export const metadata: Metadata = {
  title: "Sitemap: every page, and the fastest way to the one you need",
  description:
    "All pages on AI Tools for Everyday People in one place: guides by level, reviews, prices, free tools, AI and society, news and trust pages. Search, filter, or tell us what you want to do.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return <SitemapView />;
}