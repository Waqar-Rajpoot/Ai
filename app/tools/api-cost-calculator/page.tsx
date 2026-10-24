import type { Metadata } from "next";
import { ApiCostCalculatorView } from "@/components/tools/ApiCostCalculatorView";

export const metadata: Metadata = {
  title: "API cost calculator: cost per task and per month for AI models",
  description:
    "Work out what an AI task costs when you pay per token. Pick a model from a dated price table, set your tokens and volume, and compare caching, batch, long prompts and price changes.",
  alternates: { canonical: "/tools/api-cost-calculator" },
};

export default function ApiCostCalculatorPage() {
  return <ApiCostCalculatorView />;
}