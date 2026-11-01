/**
 * The single place that reads environment variables.
 * Server-only: never import this from a client component.
 */

export interface NewsletterProviderConfig {
  readonly url: string;
  readonly apiKey: string;
}

/**
 * Reads the email provider settings.
 * @returns The provider URL and key, or `null` when either is missing,
 * so callers can respond with a clear "not configured" error instead of crashing.
 */
export function getNewsletterProviderConfig(): NewsletterProviderConfig | null {
  const url = process.env.NEWSLETTER_PROVIDER_URL;
  const apiKey = process.env.NEWSLETTER_PROVIDER_API_KEY;
  if (!url || !apiKey) {
    return null;
  }
  return { url, apiKey };
}