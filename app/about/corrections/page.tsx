import type { Metadata } from "next";
import { CorrectionsView } from "@/components/trust/CorrectionsView";

export const metadata: Metadata = {
  title: "Corrections policy and log: report an error",
  description:
    "How to report an error on this site, how fast we respond, how we fix and label corrections, and a public log of every substantive correction with dates and what changed.",
  alternates: { canonical: "/about/corrections" },
};

export default function CorrectionsPage() {
  return <CorrectionsView />;
}