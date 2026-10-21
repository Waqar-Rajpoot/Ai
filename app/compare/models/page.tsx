import type { Metadata } from "next";
import { ModelDirectoryView } from "@/components/compare/ModelDirectoryView";

export const metadata: Metadata = {
  title: "AI model directory: prices, context and scores",
  description:
    "Named AI models side by side with API prices per million tokens, context size, independent BenchLM scores and best use, each dated and sourced.",
  alternates: { canonical: "/compare/models" },
};

export default function ModelDirectoryPage() {
  return <ModelDirectoryView />;
}