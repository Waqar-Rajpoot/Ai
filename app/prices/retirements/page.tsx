import type { Metadata } from "next";
import { RetirementsView } from "@/components/prices/RetirementsView";

export const metadata: Metadata = {
  title: "AI model and feature retirements tracker",
  description:
    "Which AI models and features are being retired, when, and what replaces them. Dated, sourced and updated weekly, with a tool to check your own model IDs.",
  alternates: { canonical: "/prices/retirements" },
};

export default function RetirementsPage() {
  return <RetirementsView />;
}