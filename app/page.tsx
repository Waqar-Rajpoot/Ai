import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";
import { getNewsletterActionUrl } from "@/lib/config/env";

export const metadata: Metadata = {
  title: { absolute: "AI Tools for Everyday People: learn AI, compare models, stay current" },
  description:
    "Plain-English AI guides in four levels, dated model tests and reviews, sourced prices, free tools and a weekly roundup. Independent, with every number dated.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeView newsletterActionUrl={getNewsletterActionUrl()} />;
}