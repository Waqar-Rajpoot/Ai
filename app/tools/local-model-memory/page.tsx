import type { Metadata } from "next";
import { LocalModelMemoryView } from "@/components/tools/LocalModelMemoryView";

export const metadata: Metadata = {
  title: "Local model memory estimator: how much RAM or VRAM does an AI model need?",
  description:
    "Estimate the memory a local AI model needs from its size, precision and context length. Check the fit on your graphics card, Mac or PC and get a speed ceiling.",
  alternates: { canonical: "/tools/local-model-memory" },
};

export default function LocalModelMemoryPage() {
  return <LocalModelMemoryView />;
}