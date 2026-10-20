import type { Metadata } from "next";
import { PowerUserView } from "@/components/learn/PowerUserView";

export const metadata: Metadata = {
  title: "Level 3: Power user and builder",
  description:
    "Understand how models are trained, when to use reasoning effort, how RAG, tools and agents work, and how to control cost per task and test models yourself.",
  alternates: { canonical: "/learn/power-user" },
};

export default function PowerUserPage() {
  return <PowerUserView />;
}