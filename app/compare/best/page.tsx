import type { Metadata } from "next";
import { BestForView } from "@/components/compare/BestForView";

export const metadata: Metadata = {
  title: "Best AI models by use: coding, writing, agents and more",
  description:
    "Thirteen dated roundups ranking AI models by use case, with starting points from the model directory, how we rank, and how each roundup stays fresh.",
  alternates: { canonical: "/compare/best" },
};

export default function BestForHubPage() {
  return <BestForView />;
}