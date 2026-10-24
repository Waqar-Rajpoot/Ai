import type { Metadata } from "next";
import { ToolsHubView } from "@/components/tools/ToolsHubView";

export const metadata: Metadata = {
  title: "Free AI tools: cost calculators, model quiz, prompts and checklists",
  description:
    "Free tools for everyday AI users: plan and API cost calculators, a model quiz, a prompt library, a token estimator, a benchmark checklist and printable safety lists. They run in your browser.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return <ToolsHubView />;
}