import type { Metadata } from "next";
import { FoundationsView } from "@/components/learn/FoundationsView";

export const metadata: Metadata = {
  title: "Level 1: AI Foundations",
  description:
    "Learn what AI is, how chatbots work, how to write a clear prompt, when to doubt an answer, and what to keep private. Plain English, sourced and dated.",
  alternates: { canonical: "/learn/foundations" },
};

export default function FoundationsPage() {
  return <FoundationsView />;
}