export interface PrecisionOption {
  id: string;
  label: string;
  bytesPerParameter: number;
}

export interface MemoryEstimateInput {
  /** Total parameters, in billions. For a mixture-of-experts model, use the total, not the active count. */
  parametersInBillions: number;
  bytesPerParameter: number;
}

export type MemoryEstimateProblem = "not-a-number" | "not-positive";

export type MemoryEstimateResult =
  | { ok: true; weightsGigabytes: number; estimatedGigabytes: number }
  | { ok: false; reason: MemoryEstimateProblem };

/**
 * Rule-of-thumb multiplier for working space on top of the weights.
 * Real overhead grows with context length, so treat the result as a starting point.
 */
export const MEMORY_OVERHEAD_FACTOR = 1.2;

export const PRECISION_OPTIONS: readonly PrecisionOption[] = [
  { id: "16-bit", label: "16-bit (2 bytes per parameter)", bytesPerParameter: 2 },
  { id: "8-bit", label: "8-bit (1 byte per parameter)", bytesPerParameter: 1 },
  { id: "4-bit", label: "4-bit (0.5 bytes per parameter)", bytesPerParameter: 0.5 },
];

export const DEFAULT_PRECISION_ID = "4-bit";

/** Example size so the tool shows a result shape. */
export const MEMORY_STARTING_PARAMETERS = "27";

export const MEMORY_PROBLEM_MESSAGES: Record<MemoryEstimateProblem, string> = {
  "not-a-number": "Enter the number of parameters, in billions.",
  "not-positive": "Parameters must be more than zero.",
};

/** One billion parameters at one byte each is one gigabyte, so weights = billions x bytes. */
export function calculateLocalModelMemory(input: MemoryEstimateInput): MemoryEstimateResult {
  if (!Number.isFinite(input.parametersInBillions) || !Number.isFinite(input.bytesPerParameter)) {
    return { ok: false, reason: "not-a-number" };
  }
  if (input.parametersInBillions <= 0 || input.bytesPerParameter <= 0) {
    return { ok: false, reason: "not-positive" };
  }

  const weightsGigabytes = input.parametersInBillions * input.bytesPerParameter;
  return { ok: true, weightsGigabytes, estimatedGigabytes: weightsGigabytes * MEMORY_OVERHEAD_FACTOR };
}

/** Formats a memory size with at most one decimal, for example "16.2 GB". */
export function formatGigabytes(gigabytes: number): string {
  return `${gigabytes.toLocaleString("en-US", { maximumFractionDigits: 1 })} GB`;
}