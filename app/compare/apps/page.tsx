import type { Metadata } from "next";
import { AppsComparisonView } from "@/components/compare/AppsComparisonView";

export const metadata: Metadata = {
  title: "ChatGPT vs Claude vs Gemini vs Grok: plans, limits and privacy",
  description:
    "Four AI apps compared as consumer products: plans and prices, limits, features, privacy and data, and how to choose, with dated sources and a plan finder.",
  alternates: { canonical: "/compare/apps" },
};

export default function AppsComparisonPage() {
  return <AppsComparisonView />;
}