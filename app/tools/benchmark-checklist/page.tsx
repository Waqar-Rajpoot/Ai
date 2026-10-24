import type { Metadata } from "next";
import { BenchmarkChecklistView } from "@/components/tools/BenchmarkChecklistView";

export const metadata: Metadata = {
  title: "Benchmark reading checklist: ten questions before you trust an AI score",
  description:
    "Ten questions to ask before you trust an AI benchmark score, a margin check for gaps between models, and a printable rating. Free, and nothing leaves your browser.",
  alternates: { canonical: "/tools/benchmark-checklist" },
};

export default function BenchmarkChecklistPage() {
  return <BenchmarkChecklistView />;
}