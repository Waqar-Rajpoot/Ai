import type { Metadata } from "next";
import { OpenVsClosedView } from "@/components/compare/OpenVsClosedView";

export const metadata: Metadata = {
  title: "Open-weight vs closed AI models: cost, privacy, licences and hardware",
  description:
    "A plain-English guide to hosted, open-weight and open source AI models: what the terms mean, what each costs, where your data goes, what the licences allow, and which to choose.",
  alternates: { canonical: "/compare/open-vs-closed" },
};

export default function OpenVsClosedPage() {
  return <OpenVsClosedView />;
}