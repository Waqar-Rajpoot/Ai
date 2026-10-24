import type { Metadata } from "next";
import { ProsConsView } from "@/components/society/ProsConsView";

export const metadata: Metadata = {
  title: "Pros and cons of AI: an honest scorecard",
  description:
    "Nine themes, benefits and costs side by side: time, learning, accuracy, privacy, fairness, jobs, safety, the environment and skills. Named sources only, with evidence labelled.",
  alternates: { canonical: "/society/pros-and-cons-of-ai" },
};

export default function ProsAndConsOfAiPage() {
  return <ProsConsView />;
}