import type { Metadata } from "next";
import { WhichAiFitsMeView } from "@/components/tools/WhichAiFitsMeView";

export const metadata: Metadata = {
  title: "Which AI fits me? A three-question quiz",
  description:
    "Answer three questions about your task, budget and privacy needs. Get a suggested type of AI service, plans to compare and models worth a look. Runs in your browser.",
  alternates: { canonical: "/tools/which-ai-fits-me" },
};

export default function WhichAiFitsMePage() {
  return <WhichAiFitsMeView />;
}