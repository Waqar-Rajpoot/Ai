import type { Metadata } from "next";
import { SafetyChecklistView } from "@/components/tools/SafetyChecklistView";

export const metadata: Metadata = {
  title: "AI safety checklist for individuals, schools and small businesses",
  description:
    "A free, printable AI safety checklist with 84 practical checks: protect your data, verify answers, spot scams and set simple rules. Progress is saved in your browser only.",
  alternates: { canonical: "/tools/ai-safety-checklist" },
};

export default function AiSafetyChecklistPage() {
  return <SafetyChecklistView />;
}