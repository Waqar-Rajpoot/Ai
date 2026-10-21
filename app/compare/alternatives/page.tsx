import type { Metadata } from "next";
import { AlternativesHubView } from "@/components/compare/AlternativesHubView";

export const metadata: Metadata = {
  title: "AI alternatives: how to switch from one app or model to another",
  description:
    "Find an 'Alternatives to' page for the AI app or model you are leaving, see why people switch, check what you may give up, and use a step-by-step switching checklist.",
  alternates: { canonical: "/compare/alternatives" },
};

export default function AlternativesHubPage() {
  return <AlternativesHubView />;
}