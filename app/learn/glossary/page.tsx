import type { Metadata } from "next";
import { GlossaryView } from "@/components/learn/GlossaryView";

export const metadata: Metadata = {
  title: "AI glossary: terms in plain English",
  description:
    "Short plain-English definitions of AI terms, from tokens and prompts to RAG, agents and mixture-of-experts, each tagged by level and linked to its guide.",
  alternates: { canonical: "/learn/glossary" },
};

export default function GlossaryPage() {
  return <GlossaryView />;
}