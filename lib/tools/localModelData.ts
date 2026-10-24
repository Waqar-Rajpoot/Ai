export type HardwareKind = "gpu" | "unified" | "cpu";
export type PrecisionGroup = "full" | "eight-bit" | "quantized";

export interface PrecisionOption {
  id: string;
  label: string;
  shortLabel: string;
  /** Effective bits per weight, including the scale values that quantized files store. */
  bitsPerWeight: number;
  group: PrecisionGroup;
  quality: string;
}

export interface KvPrecisionOption {
  id: string;
  label: string;
  bytesPerElement: number;
  note: string;
}

export interface ArchitectureClass {
  sizeBillions: number;
  label: string;
  layers: number;
  kvHeads: number;
  headDimension: number;
}

export interface HardwareSpec {
  id: string;
  label: string;
  kind: HardwareKind;
  memoryGb: number;
  /** Published peak memory bandwidth in GB per second, or null when unknown. */
  bandwidthGbPerSecond: number | null;
  note: string;
}

export const CUSTOM_PRECISION_ID = "custom";
export const CUSTOM_HARDWARE_ID = "custom";
export const NO_HARDWARE_ID = "none";

export const PRECISION_GROUP_LABELS: Record<PrecisionGroup, string> = {
  full: "Full precision",
  "eight-bit": "8-bit",
  quantized: "Quantized (smaller files)",
};

export const HARDWARE_KIND_LABELS: Record<HardwareKind, string> = {
  gpu: "Graphics card (VRAM)",
  unified: "Apple Silicon (unified memory)",
  cpu: "PC memory (RAM, CPU only)",
};

/** Ordered from most to fewest bits. Bits per weight are approximate and vary a little by model. */
export const PRECISIONS: readonly PrecisionOption[] = [
  { id: "fp16", label: "16-bit (FP16 or BF16)", shortLabel: "FP16", bitsPerWeight: 16, group: "full", quality: "Reference quality. This is how most open models are first released." },
  { id: "q8_0", label: "8-bit file (Q8_0)", shortLabel: "Q8_0", bitsPerWeight: 8.5, group: "eight-bit", quality: "Very close to full precision in most tests, at about half the size." },
  { id: "fp8", label: "8-bit ideal (FP8 or INT8)", shortLabel: "8-bit", bitsPerWeight: 8, group: "eight-bit", quality: "Very close to full precision in most tests. Needs software that supports it." },
  { id: "q6_k", label: "6-bit (Q6_K)", shortLabel: "Q6_K", bitsPerWeight: 6.56, group: "quantized", quality: "Hard to tell from full precision in everyday use." },
  { id: "q5_k_m", label: "5-bit (Q5_K_M)", shortLabel: "Q5_K_M", bitsPerWeight: 5.7, group: "quantized", quality: "A small loss that most people never notice." },
  { id: "q4_k_m", label: "4-bit (Q4_K_M)", shortLabel: "Q4_K_M", bitsPerWeight: 4.85, group: "quantized", quality: "The usual sweet spot: a small quality loss for roughly a third of the 16-bit size." },
  { id: "q4_ideal", label: "4-bit ideal (half a byte)", shortLabel: "4-bit ideal", bitsPerWeight: 4, group: "quantized", quality: "The textbook half-byte rule. Real 4-bit files are about 20% larger because they store scale values." },
  { id: "q3_k_m", label: "3-bit (Q3_K_M)", shortLabel: "Q3_K_M", bitsPerWeight: 3.9, group: "quantized", quality: "Noticeable loss on harder tasks, and more so on small models." },
  { id: "q2_k", label: "2-bit (Q2_K)", shortLabel: "Q2_K", bitsPerWeight: 3.35, group: "quantized", quality: "Large loss. Use only if nothing larger fits." },
];

export const KV_PRECISIONS: readonly KvPrecisionOption[] = [
  { id: "fp16", label: "16-bit (default in most apps)", bytesPerElement: 2, note: "Safest for quality." },
  { id: "q8", label: "8-bit cache", bytesPerElement: 1, note: "Halves the cache. Support depends on the software." },
  { id: "q4", label: "4-bit cache", bytesPerElement: 0.5, note: "Quarters the cache, with a higher risk to quality on long contexts." },
];

/** Bytes per cache value used by the reference tables (the 16-bit default). */
export const KV_TABLE_BYTES_PER_ELEMENT = 2;

/**
 * Typical dense layouts of widely used open models of each size class, from their public model cards.
 * Real models differ, and models with sliding-window attention need less cache than shown.
 */
export const ARCHITECTURE_CLASSES: readonly ArchitectureClass[] = [
  { sizeBillions: 1, label: "1B class", layers: 16, kvHeads: 8, headDimension: 64 },
  { sizeBillions: 3, label: "3B class", layers: 28, kvHeads: 8, headDimension: 128 },
  { sizeBillions: 8, label: "8B class", layers: 32, kvHeads: 8, headDimension: 128 },
  { sizeBillions: 14, label: "14B class", layers: 48, kvHeads: 8, headDimension: 128 },
  { sizeBillions: 27, label: "27B class", layers: 62, kvHeads: 16, headDimension: 128 },
  { sizeBillions: 32, label: "32B class", layers: 64, kvHeads: 8, headDimension: 128 },
  { sizeBillions: 70, label: "70B class", layers: 80, kvHeads: 8, headDimension: 128 },
  { sizeBillions: 405, label: "405B class", layers: 126, kvHeads: 8, headDimension: 128 },
];

export const CONTEXT_OPTIONS: readonly number[] = [4_096, 8_192, 16_384, 32_768, 65_536, 131_072, 262_144];

export const SIZE_PRESETS: readonly number[] = [1, 3, 8, 14, 27, 32, 70];

/** Device presets use published peak figures. See HARDWARE_SPECS_VERIFIED_ON. */
export const HARDWARE_PRESETS: readonly HardwareSpec[] = [
  { id: "rtx-3060-12", label: "NVIDIA GeForce RTX 3060, 12 GB", kind: "gpu", memoryGb: 12, bandwidthGbPerSecond: 360, note: "Entry-level card with generous memory for its price." },
  { id: "rtx-4060ti-16", label: "NVIDIA GeForce RTX 4060 Ti, 16 GB", kind: "gpu", memoryGb: 16, bandwidthGbPerSecond: 288, note: "16 GB version only. Low bandwidth for its memory size." },
  { id: "rtx-3090-24", label: "NVIDIA GeForce RTX 3090, 24 GB", kind: "gpu", memoryGb: 24, bandwidthGbPerSecond: 936, note: "A popular used card for local models." },
  { id: "rtx-4090-24", label: "NVIDIA GeForce RTX 4090, 24 GB", kind: "gpu", memoryGb: 24, bandwidthGbPerSecond: 1008, note: "Same memory as a 3090, faster." },
  { id: "rtx-5090-32", label: "NVIDIA GeForce RTX 5090, 32 GB", kind: "gpu", memoryGb: 32, bandwidthGbPerSecond: 1792, note: "Highest memory and bandwidth of the consumer cards listed." },
  { id: "mac-m3-air-16", label: "MacBook Air with M3, 16 GB", kind: "unified", memoryGb: 16, bandwidthGbPerSecond: 100, note: "Fine for small models; low bandwidth." },
  { id: "mac-m4-pro-24", label: "Mac with M4 Pro, 24 GB", kind: "unified", memoryGb: 24, bandwidthGbPerSecond: 273, note: "A good middle step for 8B to 14B models." },
  { id: "mac-m4-max-64", label: "Mac with M4 Max (40-core GPU), 64 GB", kind: "unified", memoryGb: 64, bandwidthGbPerSecond: 546, note: "Fits 70B-class models at 4 bits." },
  { id: "mac-m3-ultra-96", label: "Mac Studio with M3 Ultra, 96 GB", kind: "unified", memoryGb: 96, bandwidthGbPerSecond: 819, note: "Large memory pool with high bandwidth." },
  { id: "pc-16-ddr4", label: "PC, 16 GB RAM (dual-channel DDR4-3200)", kind: "cpu", memoryGb: 16, bandwidthGbPerSecond: 51.2, note: "CPU only. Small models, patient speeds." },
  { id: "pc-32-ddr5", label: "PC, 32 GB RAM (dual-channel DDR5-5600)", kind: "cpu", memoryGb: 32, bandwidthGbPerSecond: 89.6, note: "CPU only. Roomier, still slow for larger models." },
];

/** Sizes shown in the weights table, from tiny to far beyond a home computer. */
export const TABLE_SIZES_BILLIONS: readonly number[] = [1, 3, 8, 14, 27, 32, 70, 405];
export const TABLE_PRECISION_IDS: readonly string[] = ["fp16", "q8_0", "q4_k_m", "q3_k_m"];
/** Precisions used for the "largest model that fits" list. */
export const WHAT_FITS_PRECISION_IDS: readonly string[] = ["fp16", "q8_0", "q4_k_m", "q3_k_m"];
export const KV_TABLE_SIZES_BILLIONS: readonly number[] = [8, 32, 70];
export const KV_TABLE_CONTEXTS: readonly number[] = [8_192, 32_768, 131_072];
export const CAPACITY_TIERS_GB: readonly number[] = [8, 16, 24, 32, 64, 128];
export const CAPACITY_PRECISION_ID = "q4_k_m";