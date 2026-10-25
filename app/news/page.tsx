import type { Metadata } from "next";
import { NewsHubView } from "@/components/news/NewsHubView";

export const metadata: Metadata = {
  title: "AI news: releases, price changes and policy, dated and sourced",
  description:
    "Short, dated and sourced AI news: new model releases, price-change notes, safety and policy explainers and a weekly roundup. See upcoming retirements and subscribe by email.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return <NewsHubView />;
}