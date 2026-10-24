import type { Metadata } from "next";
import { TenPlacesView } from "@/components/society/TenPlacesView";

export const metadata: Metadata = {
  title: "Ten places you meet AI in a normal day",
  description:
    "From your phone alarm to your evening stream: ten everyday places where AI is at work, what it does, what to watch out for and what you can change. Plain and technical layers.",
  alternates: { canonical: "/society/ten-places-you-meet-ai" },
};

export default function TenPlacesYouMeetAiPage() {
  return <TenPlacesView />;
}