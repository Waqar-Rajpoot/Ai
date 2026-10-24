import type { Metadata } from "next";
import { PromptLibraryView } from "@/components/tools/PromptLibraryView";

export const metadata: Metadata = {
  title: "Prompt library: copy-ready AI prompts for study, work, home and money",
  description:
    "Free, copy-ready AI prompts you can fill in and paste into any chatbot, with search, task and level filters, a five-part formula, follow-up prompts and tips for checking answers.",
  alternates: { canonical: "/tools/prompt-library" },
};

export default function PromptLibraryPage() {
  return <PromptLibraryView />;
}