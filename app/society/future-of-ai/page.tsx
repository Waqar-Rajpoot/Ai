import type { Metadata } from "next";
import { FutureOfAiView } from "@/components/society/FutureOfAiView";

export const metadata: Metadata = {
  title: "The future of AI: six forces to watch to 2030",
  description:
    "What the data says about AI today, what is unknown, and which signals to watch. Six forces, three scenarios, dated figures from named sources, and no predictions.",
  alternates: { canonical: "/society/future-of-ai" },
};

export default function FutureOfAiPage() {
  return <FutureOfAiView />;
}