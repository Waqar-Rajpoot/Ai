import type { Metadata } from "next";
import { HowWeTestView } from "@/components/about/HowWeTestView";

export const metadata: Metadata = {
  title: "How we test AI models: the seven-point scorecard",
  description:
    "The seven tests behind every review, how scores are weighted, what we record on each test day, and what tested, independent and vendor-reported labels mean.",
  alternates: { canonical: "/about/how-we-test" },
};

export default function HowWeTestPage() {
  return <HowWeTestView />;
}