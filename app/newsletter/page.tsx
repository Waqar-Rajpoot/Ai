import type { Metadata } from "next";
import NewsletterView from "@/components/newsletter/NewsletterView";
import { NEWSLETTER_DESCRIPTION, NEWSLETTER_TITLE } from "@/lib/newsletter/newsletterContent";

export const metadata: Metadata = {
  title: NEWSLETTER_TITLE,
  description: NEWSLETTER_DESCRIPTION,
};

export default function NewsletterPage() {
  return <NewsletterView />;
}