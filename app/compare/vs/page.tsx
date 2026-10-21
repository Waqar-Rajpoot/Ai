import type { Metadata } from "next";
import { HeadToHeadView } from "@/components/compare/HeadToHeadView";

export const metadata: Metadata = {
  title: "AI model head-to-head tests",
  description:
    "Two AI models, the same ten everyday tasks on one test day, with a winner per task and the cost per task. Compare any two models on paper and request a matchup.",
  alternates: { canonical: "/compare/vs" },
};

export default function HeadToHeadHubPage() {
  return <HeadToHeadView />;
}