import { serializeJsonLd } from "@/lib/seo/structuredData";

interface JsonLdProps {
  data: object;
}

/** Renders structured data for search engines. Visitors never see it. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}