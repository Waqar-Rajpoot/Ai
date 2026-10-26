import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Ask a question, report a wrong price or fact, suggest a comparison, or reach us as press, a sponsor or a model maker. Opens your own email app.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}