import type { Metadata } from "next";
import { CompareHubView } from "@/components/compare/CompareHubView";

export const metadata: Metadata = {
  title: "Compare AI models",
  description:
    "Start with the model directory, then open reviews, best-for roundups, head-to-head tests, app comparisons and alternatives. Every result is dated and labelled.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return <CompareHubView />;
}