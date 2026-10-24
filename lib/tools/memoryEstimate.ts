import {
  BITS_PER_BYTE,
  BYTES_PER_GB,
  COMFORTABLE_FIT_FRACTION,
  CPU_RESERVED_GB,
  DEFAULT_CONTEXT_TOKENS,
  DEFAULT_PARAMETERS_TEXT,
  GB_ONE_DECIMAL_FROM,
  GB_WHOLE_NUMBER_FROM,
  GPU_RESERVED_GB,
  KV_TENSORS_PER_LAYER,
  LOW_QUALITY_BITS_BELOW,
  MAX_BANDWIDTH_GB_PER_SECOND,
  MAX_BYTES_PER_PARAMETER,
  MAX_CONTEXT_TOKENS,
  MAX_HEAD_DIMENSION,
  MAX_KV_HEADS,
  MAX_LAYERS,
  MAX_MEMORY_GB,
  MAX_PARAMETERS_BILLIONS,
  MIN_BANDWIDTH_GB_PER_SECOND,
  MIN_BYTES_PER_PARAMETER,
  MIN_CONTEXT_TOKENS,
  MIN_HEAD_DIMENSION,
  MIN_KV_HEADS,
  MIN_LAYERS,
  MIN_MEMORY_GB,
  MIN_PARAMETERS_BILLIONS,
  RUNTIME_MARGIN_FRACTION,
  TOKENS_PER_SECOND_WHOLE_FROM,
  UNIFIED_GPU_SHARE_LARGE,
  UNIFIED_GPU_SHARE_SMALL,
  UNIFIED_SMALL_MEMORY_LIMIT_GB,
  WORDS_PER_TOKEN_APPROX,
  WORDS_ROUNDING_STEP,
} from "./memoryEstimateConstants";
import {
  ARCHITECTURE_CLASSES,
  CUSTOM_HARDWARE_ID,
  CUSTOM_PRECISION_ID,
  HARDWARE_PRESETS,
  KV_PRECISIONS,
  NO_HARDWARE_ID,
  PRECISIONS,
  WHAT_FITS_PRECISION_IDS,
  type ArchitectureClass,
  type HardwareKind,
  type HardwareSpec,
  type PrecisionOption,
} from "./localModelData";

export interface Architecture {
  layers: number;
  kvHeads: number;
  headDimension: number;
}

export interface MemoryEstimate {
  weightsGb: number;
  marginGb: number;
  kvCacheGb: number;
  totalGb: number;
}

export type FitStatus = "comfortable" | "tight" | "too-big";

export interface FitAssessment {
  status: FitStatus;
  usableGb: number;
  /** Positive when there is room to spare, negative when the model is too big. */
  headroomGb: number;
}

export interface MaxSizeRow {
  precision: PrecisionOption;
  maxParametersBillions: number;
}

/** Raw form state. Numbers typed by the reader stay as text until they are validated. */
export interface EstimatorFormValues {
  parametersText: string;
  precisionId: string;
  customBytesText: string;
  isMixtureOfExperts: boolean;
  activeParametersText: string;
  contextTokens: number;
  kvPrecisionId: string;
  useCustomArchitecture: boolean;
  layersText: string;
  kvHeadsText: string;
  headDimensionText: string;
  hardwareId: string;
  customMemoryText: string;
  customKind: HardwareKind;
  customBandwidthText: string;
}

export const DEFAULT_FORM_VALUES: EstimatorFormValues = {
  parametersText: DEFAULT_PARAMETERS_TEXT,
  precisionId: "q4_k_m",
  customBytesText: "0.5",
  isMixtureOfExperts: false,
  activeParametersText: "",
  contextTokens: DEFAULT_CONTEXT_TOKENS,
  kvPrecisionId: "fp16",
  useCustomArchitecture: false,
  layersText: "",
  kvHeadsText: "",
  headDimensionText: "",
  hardwareId: NO_HARDWARE_ID,
  customMemoryText: "24",
  customKind: "gpu",
  customBandwidthText: "",
};

export interface EstimatorResult {
  parametersBillions: number;
  activeParametersBillions: number;
  isMixtureOfExperts: boolean;
  bytesPerParameter: number;
  bitsPerWeight: number;
  precisionLabel: string;
  precisionQuality: string | null;
  contextTokens: number;
  kvPrecisionLabel: string;
  architecture: Architecture;
  architectureLabel: string;
  estimate: MemoryEstimate;
  hardware: HardwareSpec | null;
  fit: FitAssessment | null;
  /** Upper bound on generation speed, or null when no bandwidth is known. */
  speedCeilingTokensPerSecond: number | null;
  /** Empty when no device is chosen. */
  maxSizes: MaxSizeRow[];
  warnings: string[];
}

export type EstimatorOutcome = { ok: true; result: EstimatorResult } | { ok: false; errors: string[] };

export interface MemoryTableRow {
  sizeBillions: number;
  cells: { precisionId: string; totalGb: number }[];
}

export interface KvTableRow {
  contextTokens: number;
  cells: { sizeBillions: number; kvCacheGb: number }[];
}

export interface CapacityRow {
  memoryGb: number;
  gpuMaxBillions: number;
  unifiedMaxBillions: number;
  cpuMaxBillions: number;
}

// ---- Core formulas ----

/** Converts bits per weight to bytes per parameter. */
export function convertBitsToBytes(bitsPerWeight: number): number {
  return bitsPerWeight / BITS_PER_BYTE;
}

/** Weights in GB: billions of parameters times bytes per parameter. */
export function estimateWeightsGb(parametersBillions: number, bytesPerParameter: number): number {
  return parametersBillions * bytesPerParameter;
}

/** Context (KV) cache in GB: 2 x layers x KV heads x head size x bytes, per token, times tokens. */
export function estimateKvCacheGb(
  architecture: Architecture,
  contextTokens: number,
  kvBytesPerElement: number,
): number {
  const bytesPerToken =
    KV_TENSORS_PER_LAYER * architecture.layers * architecture.kvHeads * architecture.headDimension * kvBytesPerElement;
  return (bytesPerToken * contextTokens) / BYTES_PER_GB;
}

export interface EstimateMemoryInput {
  parametersBillions: number;
  bytesPerParameter: number;
  architecture: Architecture;
  contextTokens: number;
  kvBytesPerElement: number;
}

/** Weights, safety margin and context cache, and their total. */
export function estimateMemory(input: EstimateMemoryInput): MemoryEstimate {
  const weightsGb = estimateWeightsGb(input.parametersBillions, input.bytesPerParameter);
  const marginGb = weightsGb * RUNTIME_MARGIN_FRACTION;
  const kvCacheGb = estimateKvCacheGb(input.architecture, input.contextTokens, input.kvBytesPerElement);
  return { weightsGb, marginGb, kvCacheGb, totalGb: weightsGb + marginGb + kvCacheGb };
}

/** The typical layout of the size class nearest to the given size (compared on a log scale). */
export function pickArchitectureClass(parametersBillions: number): ArchitectureClass {
  return ARCHITECTURE_CLASSES.reduce((closest, candidate) =>
    Math.abs(Math.log(parametersBillions / candidate.sizeBillions)) <
    Math.abs(Math.log(parametersBillions / closest.sizeBillions))
      ? candidate
      : closest,
  );
}

/** Share of unified memory the GPU may use by default. */
export function getUnifiedGpuShare(memoryGb: number): number {
  return memoryGb <= UNIFIED_SMALL_MEMORY_LIMIT_GB ? UNIFIED_GPU_SHARE_SMALL : UNIFIED_GPU_SHARE_LARGE;
}

/** Memory a model can really use on a device, after what the system keeps for itself. */
export function getUsableMemoryGb(hardware: Pick<HardwareSpec, "kind" | "memoryGb">): number {
  switch (hardware.kind) {
    case "gpu":
      return Math.max(0, hardware.memoryGb - GPU_RESERVED_GB);
    case "cpu":
      return Math.max(0, hardware.memoryGb - CPU_RESERVED_GB);
    case "unified":
      return hardware.memoryGb * getUnifiedGpuShare(hardware.memoryGb);
  }
}

/** Compares the total need with usable memory. */
export function assessFit(totalGb: number, usableGb: number): FitAssessment {
  const headroomGb = usableGb - totalGb;
  let status: FitStatus = "too-big";
  if (totalGb <= usableGb * COMFORTABLE_FIT_FRACTION) status = "comfortable";
  else if (totalGb <= usableGb) status = "tight";
  return { status, usableGb, headroomGb };
}

/** Largest model (billions of parameters) whose weights and margin fit. Ignores the context cache. */
export function estimateMaxParametersBillions(usableGb: number, bytesPerParameter: number): number {
  if (usableGb <= 0) return 0;
  return usableGb / (bytesPerParameter * (1 + RUNTIME_MARGIN_FRACTION));
}

/**
 * Upper bound on tokens per second: each new token reads every active weight once,
 * so speed cannot beat memory bandwidth divided by the active weights in GB.
 */
export function estimateSpeedCeilingTokensPerSecond(
  activeParametersBillions: number,
  bytesPerParameter: number,
  bandwidthGbPerSecond: number,
): number {
  return bandwidthGbPerSecond / (activeParametersBillions * bytesPerParameter);
}

export function findPrecision(precisionId: string): PrecisionOption | undefined {
  return PRECISIONS.find((option) => option.id === precisionId);
}

// ---- Formatting ----

/** "5.8 GB", "0.13 GB" or "142 GB". */
export function formatGb(valueGb: number): string {
  if (valueGb >= GB_WHOLE_NUMBER_FROM) return `${Math.round(valueGb).toLocaleString("en-US")} GB`;
  if (valueGb >= GB_ONE_DECIMAL_FROM) return `${valueGb.toFixed(1)} GB`;
  return `${valueGb.toFixed(2)} GB`;
}

/** "27B" or "0.5B". */
export function formatParameters(parametersBillions: number): string {
  return `${Number.parseFloat(parametersBillions.toFixed(1))}B`;
}

export function formatTokenCount(tokens: number): string {
  return tokens.toLocaleString("en-US");
}

export function formatTokensPerSecond(tokensPerSecond: number): string {
  return tokensPerSecond >= TOKENS_PER_SECOND_WHOLE_FROM
    ? Math.round(tokensPerSecond).toLocaleString("en-US")
    : tokensPerSecond.toFixed(1);
}

/** "8,192 tokens (about 6,000 words)". */
export function describeContextLength(tokens: number): string {
  const words = Math.round((tokens * WORDS_PER_TOKEN_APPROX) / WORDS_ROUNDING_STEP) * WORDS_ROUNDING_STEP;
  return `${formatTokenCount(tokens)} tokens (about ${words.toLocaleString("en-US")} words)`;
}

export function describeFit(fit: FitAssessment): string {
  if (fit.status === "too-big") return `needs ${formatGb(-fit.headroomGb)} more than is usable`;
  if (fit.status === "tight") return `fits, but only ${formatGb(fit.headroomGb)} to spare`;
  return `fits with ${formatGb(fit.headroomGb)} to spare`;
}

/** One sentence on how much of a device's memory is counted as usable, and why. */
export function describeUsableMemory(hardware: HardwareSpec): string {
  const usable = formatGb(getUsableMemoryGb(hardware));
  const total = formatGb(hardware.memoryGb);
  switch (hardware.kind) {
    case "gpu":
      return `${usable} of ${total} is counted as usable (${GPU_RESERVED_GB} GB is held back for the display and driver).`;
    case "cpu":
      return `${usable} of ${total} is counted as usable (${CPU_RESERVED_GB} GB is held back for the operating system and other apps).`;
    case "unified": {
      const percent = Math.round(getUnifiedGpuShare(hardware.memoryGb) * 100);
      return `${usable} of ${total} is counted as usable (macOS usually lets the GPU use about ${percent}% by default).`;
    }
  }
}

// ---- Form validation and the full estimate ----

function parseNumberInRange(text: string, min: number, max: number): number | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}

function parseIntegerInRange(text: string, min: number, max: number): number | null {
  const value = parseNumberInRange(text, min, max);
  return value !== null && Number.isInteger(value) ? value : null;
}

interface WarningInput {
  estimate: MemoryEstimate;
  isMixtureOfExperts: boolean;
  bitsPerWeight: number;
  fit: FitAssessment | null;
  hardware: HardwareSpec | null;
}

function buildWarnings(input: WarningInput): string[] {
  const warnings: string[] = [];
  const { estimate, hardware, fit } = input;
  if (estimate.kvCacheGb > estimate.weightsGb) {
    warnings.push("The context cache is larger than the model itself. A shorter context or an 8-bit cache would cut it sharply.");
  }
  if (input.isMixtureOfExperts) {
    warnings.push("Mixture-of-experts: every expert must sit in memory, so the total size sets the memory. The active size only affects speed.");
  }
  if (input.bitsPerWeight < LOW_QUALITY_BITS_BELOW) {
    warnings.push("Below 4 bits per weight, quality drops faster, especially on small models. Test it on your own tasks.");
  }
  if (fit?.status === "too-big") {
    warnings.push("Try a smaller model, fewer bits per weight or a shorter context. Spilling layers into system RAM works, but is much slower.");
  }
  if (fit?.status === "tight") {
    warnings.push("A tight fit can fail once other apps open or the conversation grows. Close heavy apps first.");
  }
  if (hardware?.kind === "unified") {
    warnings.push("On a Mac the GPU limit is a default setting. It can be raised, but leave enough for macOS.");
  }
  if (hardware?.kind === "cpu") {
    warnings.push("CPU-only runs work, but expect slow answers on anything above a small model.");
  }
  return warnings;
}

/** Validates the form and, if it is valid, computes the whole result. Pure and easy to test. */
export function runEstimator(values: EstimatorFormValues): EstimatorOutcome {
  const errors: string[] = [];

  const parametersBillions = parseNumberInRange(values.parametersText, MIN_PARAMETERS_BILLIONS, MAX_PARAMETERS_BILLIONS);
  if (parametersBillions === null) {
    errors.push(`Model size must be a number from ${MIN_PARAMETERS_BILLIONS} to ${MAX_PARAMETERS_BILLIONS.toLocaleString("en-US")} (billions of parameters).`);
  }

  let bytesPerParameter: number | null = null;
  let precisionLabel = "";
  let precisionQuality: string | null = null;
  if (values.precisionId === CUSTOM_PRECISION_ID) {
    bytesPerParameter = parseNumberInRange(values.customBytesText, MIN_BYTES_PER_PARAMETER, MAX_BYTES_PER_PARAMETER);
    if (bytesPerParameter === null) {
      errors.push(`Bytes per parameter must be a number from ${MIN_BYTES_PER_PARAMETER} to ${MAX_BYTES_PER_PARAMETER}.`);
    } else {
      precisionLabel = `${bytesPerParameter} bytes per parameter`;
    }
  } else {
    const precision = findPrecision(values.precisionId);
    if (!precision) {
      errors.push("Choose a precision.");
    } else {
      bytesPerParameter = convertBitsToBytes(precision.bitsPerWeight);
      precisionLabel = precision.label;
      precisionQuality = precision.quality;
    }
  }

  let activeParametersBillions: number | null = parametersBillions;
  if (values.isMixtureOfExperts) {
    activeParametersBillions = parseNumberInRange(
      values.activeParametersText,
      MIN_PARAMETERS_BILLIONS,
      parametersBillions ?? MAX_PARAMETERS_BILLIONS,
    );
    if (activeParametersBillions === null) {
      errors.push("Active parameters must be a number no larger than the total size.");
    }
  }

  const kvPrecision = KV_PRECISIONS.find((option) => option.id === values.kvPrecisionId);
  if (!kvPrecision) errors.push("Choose a context-cache precision.");

  if (
    !Number.isFinite(values.contextTokens) ||
    values.contextTokens < MIN_CONTEXT_TOKENS ||
    values.contextTokens > MAX_CONTEXT_TOKENS
  ) {
    errors.push("Choose a context length.");
  }

  let architecture: Architecture | null = null;
  let architectureLabel = "";
  if (values.useCustomArchitecture) {
    const layers = parseIntegerInRange(values.layersText, MIN_LAYERS, MAX_LAYERS);
    const kvHeads = parseIntegerInRange(values.kvHeadsText, MIN_KV_HEADS, MAX_KV_HEADS);
    const headDimension = parseIntegerInRange(values.headDimensionText, MIN_HEAD_DIMENSION, MAX_HEAD_DIMENSION);
    if (layers === null || kvHeads === null || headDimension === null) {
      errors.push("Layers, KV heads and head size must be whole numbers in a sensible range. Your model card lists them.");
    } else {
      architecture = { layers, kvHeads, headDimension };
      architectureLabel = "your own layout";
    }
  } else if (parametersBillions !== null) {
    const sizeClass = pickArchitectureClass(parametersBillions);
    architecture = { layers: sizeClass.layers, kvHeads: sizeClass.kvHeads, headDimension: sizeClass.headDimension };
    architectureLabel = `typical ${sizeClass.label} layout`;
  }

  let hardware: HardwareSpec | null = null;
  if (values.hardwareId === CUSTOM_HARDWARE_ID) {
    const memoryGb = parseNumberInRange(values.customMemoryText, MIN_MEMORY_GB, MAX_MEMORY_GB);
    const bandwidthText = values.customBandwidthText.trim();
    const bandwidth =
      bandwidthText === ""
        ? null
        : parseNumberInRange(bandwidthText, MIN_BANDWIDTH_GB_PER_SECOND, MAX_BANDWIDTH_GB_PER_SECOND);
    if (memoryGb === null) {
      errors.push(`Device memory must be a number from ${MIN_MEMORY_GB} to ${MAX_MEMORY_GB.toLocaleString("en-US")} GB.`);
    } else if (bandwidthText !== "" && bandwidth === null) {
      errors.push("Memory bandwidth must be a number in GB per second, or left empty.");
    } else {
      hardware = {
        id: CUSTOM_HARDWARE_ID,
        label: "Your device",
        kind: values.customKind,
        memoryGb,
        bandwidthGbPerSecond: bandwidth,
        note: "",
      };
    }
  } else if (values.hardwareId !== NO_HARDWARE_ID) {
    hardware = HARDWARE_PRESETS.find((preset) => preset.id === values.hardwareId) ?? null;
    if (!hardware) errors.push("Choose a device from the list.");
  }

  if (
    errors.length > 0 ||
    parametersBillions === null ||
    activeParametersBillions === null ||
    bytesPerParameter === null ||
    architecture === null ||
    !kvPrecision
  ) {
    return { ok: false, errors };
  }

  const estimate = estimateMemory({
    parametersBillions,
    bytesPerParameter,
    architecture,
    contextTokens: values.contextTokens,
    kvBytesPerElement: kvPrecision.bytesPerElement,
  });
  const usableGb = hardware ? getUsableMemoryGb(hardware) : null;
  const fit = usableGb !== null ? assessFit(estimate.totalGb, usableGb) : null;
  const bitsPerWeight = bytesPerParameter * BITS_PER_BYTE;

  const speedCeilingTokensPerSecond =
    hardware?.bandwidthGbPerSecond != null
      ? estimateSpeedCeilingTokensPerSecond(activeParametersBillions, bytesPerParameter, hardware.bandwidthGbPerSecond)
      : null;

  const maxSizes: MaxSizeRow[] =
    usableGb === null
      ? []
      : WHAT_FITS_PRECISION_IDS.flatMap((precisionId) => {
          const precision = findPrecision(precisionId);
          if (!precision) return [];
          return [
            {
              precision,
              maxParametersBillions: estimateMaxParametersBillions(usableGb, convertBitsToBytes(precision.bitsPerWeight)),
            },
          ];
        });

  return {
    ok: true,
    result: {
      parametersBillions,
      activeParametersBillions,
      isMixtureOfExperts: values.isMixtureOfExperts,
      bytesPerParameter,
      bitsPerWeight,
      precisionLabel,
      precisionQuality,
      contextTokens: values.contextTokens,
      kvPrecisionLabel: kvPrecision.label,
      architecture,
      architectureLabel,
      estimate,
      hardware,
      fit,
      speedCeilingTokensPerSecond,
      maxSizes,
      warnings: buildWarnings({ estimate, isMixtureOfExperts: values.isMixtureOfExperts, bitsPerWeight, fit, hardware }),
    },
  };
}

/** Plain-text summary for the copy button. */
export function buildSummaryText(result: EstimatorResult): string {
  const { estimate } = result;
  const lines = [
    `${formatParameters(result.parametersBillions)} model, ${result.precisionLabel}, ${formatTokenCount(result.contextTokens)}-token context`,
    `Weights ${formatGb(estimate.weightsGb)} + safety margin ${formatGb(estimate.marginGb)} + context cache ${formatGb(estimate.kvCacheGb)} = about ${formatGb(estimate.totalGb)}`,
  ];
  if (result.hardware && result.fit) lines.push(`${result.hardware.label}: ${describeFit(result.fit)}`);
  if (result.speedCeilingTokensPerSecond !== null) {
    lines.push(`Speed ceiling: about ${formatTokensPerSecond(result.speedCeilingTokensPerSecond)} tokens per second (real speeds are lower)`);
  }
  lines.push("This is an estimate calculated from a formula, not a measurement.");
  return lines.join("\n");
}

// ---- Reference tables built from the same formulas ----

/** Weights plus margin (no context) for each size and precision. */
export function buildMemoryTable(
  sizesBillions: readonly number[],
  precisionIds: readonly string[],
): MemoryTableRow[] {
  return sizesBillions.map((sizeBillions) => ({
    sizeBillions,
    cells: precisionIds.flatMap((precisionId) => {
      const precision = findPrecision(precisionId);
      if (!precision) return [];
      const weightsGb = estimateWeightsGb(sizeBillions, convertBitsToBytes(precision.bitsPerWeight));
      return [{ precisionId, totalGb: weightsGb * (1 + RUNTIME_MARGIN_FRACTION) }];
    }),
  }));
}

/** Context cache size for typical layouts at several context lengths. */
export function buildKvTable(
  sizesBillions: readonly number[],
  contextTokensList: readonly number[],
  kvBytesPerElement: number,
): KvTableRow[] {
  return contextTokensList.map((contextTokens) => ({
    contextTokens,
    cells: sizesBillions.map((sizeBillions) => {
      const sizeClass = pickArchitectureClass(sizeBillions);
      return {
        sizeBillions,
        kvCacheGb: estimateKvCacheGb(
          { layers: sizeClass.layers, kvHeads: sizeClass.kvHeads, headDimension: sizeClass.headDimension },
          contextTokens,
          kvBytesPerElement,
        ),
      };
    }),
  }));
}

/** Largest model per memory size on each kind of device. Weights and margin only. */
export function buildCapacityTable(tiersGb: readonly number[], bytesPerParameter: number): CapacityRow[] {
  return tiersGb.map((memoryGb) => ({
    memoryGb,
    gpuMaxBillions: estimateMaxParametersBillions(getUsableMemoryGb({ kind: "gpu", memoryGb }), bytesPerParameter),
    unifiedMaxBillions: estimateMaxParametersBillions(getUsableMemoryGb({ kind: "unified", memoryGb }), bytesPerParameter),
    cpuMaxBillions: estimateMaxParametersBillions(getUsableMemoryGb({ kind: "cpu", memoryGb }), bytesPerParameter),
  }));
}

/** Estimate for a named precision, or null if the precision id is unknown. Used by the worked examples. */
export function estimateForPreset(
  parametersBillions: number,
  precisionId: string,
  contextTokens: number,
  kvBytesPerElement: number,
): MemoryEstimate | null {
  const precision = findPrecision(precisionId);
  if (!precision) return null;
  const sizeClass = pickArchitectureClass(parametersBillions);
  return estimateMemory({
    parametersBillions,
    bytesPerParameter: convertBitsToBytes(precision.bitsPerWeight),
    architecture: { layers: sizeClass.layers, kvHeads: sizeClass.kvHeads, headDimension: sizeClass.headDimension },
    contextTokens,
    kvBytesPerElement,
  });
}