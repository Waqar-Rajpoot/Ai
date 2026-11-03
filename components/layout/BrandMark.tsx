import { BRAND_COLORS } from "@/lib/config/brand";

interface BrandMarkProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 32, className }: BrandMarkProps) {
  const { deepGreen, cream, sunrise } = BRAND_COLORS;

  return (
    <svg
      viewBox="0 0 88 88"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="88" height="88" rx="22" fill={deepGreen} />
      <circle cx="44" cy="44" r="27" fill={cream} />
      <path d="M31 48A13 13 0 0 1 57 48Z" fill={sunrise} />
      <line x1="26" y1="48" x2="62" y2="48" stroke={deepGreen} strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M26 58Q35 51 44 58Q53 51 62 58"
        fill="none"
        stroke={deepGreen}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}