/** Formats a per-million-token rate: $10, $2.50, $0.10, $0.0036. */
export function formatRate(amount: number): string {
  const trimmed = amount.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  const [whole, decimals] = trimmed.split(".");
  if (decimals === undefined) return `$${whole}`;
  return `$${whole}.${decimals.padEnd(2, "0")}`;
}

/** Formats a cost estimate. Small amounts keep enough decimals to stay meaningful. */
export function formatUsd(amount: number): string {
  if (amount === 0) return "$0";
  if (amount < 0.00001) return "<$0.00001";
  let maxDecimals = 2;
  if (amount < 0.001) maxDecimals = 5;
  else if (amount < 0.01) maxDecimals = 4;
  else if (amount < 1) maxDecimals = 3;
  else if (amount >= 100) maxDecimals = 0;

  const text = amount.toLocaleString("en-US", {
    minimumFractionDigits: amount >= 100 ? 0 : 2,
    maximumFractionDigits: maxDecimals,
  });
  return `$${text}`;
}

/** Formats a token count: 500K, 1M, 1.05M. */
export function formatTokens(count: number): string {
  if (count >= 1_000_000) return `${Number((count / 1_000_000).toFixed(2))}M`;
  if (count >= 1000) return `${Math.round(count / 1000)}K`;
  return String(count);
}

/** Formats an ISO date (YYYY-MM-DD) the same way on the server and in the browser. */
export function formatIsoDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}