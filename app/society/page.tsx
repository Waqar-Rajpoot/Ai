import type { Metadata } from "next";
import { SocietyHubView } from "@/components/society/SocietyHubView";

export const metadata: Metadata = {
  title: "AI & Society: how AI is changing daily life, work and the world",
  description:
    "Balanced, dated and sourced articles on how AI affects daily life, jobs, health, learning, money and energy, plus interactive features and the latest numbers from named surveys.",
  alternates: { canonical: "/society" },
};

export default function SocietyHubPage() {
  return <SocietyHubView />;
}