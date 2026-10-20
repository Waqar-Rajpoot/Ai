import type { Metadata } from "next";
import { PractitionerView } from "@/components/learn/PractitionerView";

export const metadata: Metadata = {
  title: "Level 2: AI Practitioner",
  description:
    "Use AI for real tasks: fixed formats, long files, web search and deep research, fact-checking, choosing a plan, and following school and work rules.",
  alternates: { canonical: "/learn/practitioner" },
};

export default function PractitionerPage() {
  return <PractitionerView />;
}