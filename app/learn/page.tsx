import type { Metadata } from "next";
import { LearnView } from "@/components/learn/LearnView";

export const metadata: Metadata = {
  title: "Learn AI: guides from basic to expert",
  description:
    "Four levels of plain-English AI guides, from first steps to expert topics, with a glossary, popular guides and a shortcut to the model directory.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return <LearnView />;
}