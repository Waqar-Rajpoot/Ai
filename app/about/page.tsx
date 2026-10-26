import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About AI Tools for Everyday People: who we are and how we work",
  description:
    "Who runs the site, what we cover, how we keep prices and tests current, how the site is funded, and how to reach us. Dated, sourced and independent.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}