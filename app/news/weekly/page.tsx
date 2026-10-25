import type { Metadata } from "next";
import { WeeklyArchiveView } from "@/components/news/WeeklyArchiveView";

export const metadata: Metadata = {
  title: "Weekly AI roundups: archive by date",
  description:
    "Every weekly AI roundup in one place: new models, price changes, safety and policy news and what to watch next week. Dated, sourced, and sent by email on a fixed weekday.",
  alternates: { canonical: "/news/weekly" },
};

export default function WeeklyRoundupArchivePage() {
  return <WeeklyArchiveView />;
}