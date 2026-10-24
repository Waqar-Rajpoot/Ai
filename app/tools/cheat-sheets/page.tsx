import type { Metadata } from "next";
import { CheatSheetsView } from "@/components/tools/CheatSheetsView";

export const metadata: Metadata = {
  title: "AI cheat sheets and templates: prompts, model choice, resume and agent safety",
  description:
    "Free, printable AI cheat sheets: the prompt formula, a model-choice sheet, resume and interview prompt templates, and an agent permission checklist. Fill in, copy, download or print.",
  alternates: { canonical: "/tools/cheat-sheets" },
};

export default function CheatSheetsPage() {
  return <CheatSheetsView />;
}