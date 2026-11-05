import type { Metadata } from "next";
import { AiPowerUseView } from "@/components/society/AiPowerUseView";

export const metadata: Metadata = {
  title: "How much power does AI use? What the IEA data shows",
  description:
    "What the International Energy Agency says about electricity use by data centres and AI: totals, projections, per-query figures, where the load lands, and the source for every number.",
  alternates: { canonical: "/society/ai-power-use" },
};

export default function AiPowerUsePage() {
  return <AiPowerUseView />;
}