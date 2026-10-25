import type { Metadata } from "next";
import { MythsAndFactsView } from "@/components/society/MythsAndFactsView";

export const metadata: Metadata = {
  title: "AI myths and facts: what the evidence says",
  description:
    "29 common claims about AI, from hallucinations and privacy to jobs and energy, checked against named surveys and official trackers. Dated, sourced and two-sided.",
  alternates: { canonical: "/society/ai-myths-and-facts" },
};

export default function AiMythsAndFactsPage() {
  return <MythsAndFactsView />;
}