import type { Metadata } from "next";
import { ExpertView } from "@/components/learn/ExpertView";

export const metadata: Metadata = {
  title: "Level 4: Expert",
  description:
    "Read benchmarks critically, understand dense and mixture-of-experts models, run open-weight models locally, and map safety, security and EU AI Act duties.",
  alternates: { canonical: "/learn/expert" },
};

export default function ExpertPage() {
  return <ExpertView />;
}