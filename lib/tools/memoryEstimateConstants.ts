/** Eight bits make one byte. */
export const BITS_PER_BYTE = 8;
/** One decimal gigabyte. One billion parameters at one byte each is exactly 1 GB. */
export const BYTES_PER_GB = 1_000_000_000;

/**
 * Extra room on top of the weights for runtime buffers and scratch space.
 * 27B at an ideal 4 bits: 13.5 GB x 1.2 = 16.2 GB, the "about 16 GB" rule of thumb.
 */
export const RUNTIME_MARGIN_FRACTION = 0.2;
/** The context cache stores one key tensor and one value tensor per layer. */
export const KV_TENSORS_PER_LAYER = 2;
/** Rough English rule of thumb, used only to describe context lengths in words. */
export const WORDS_PER_TOKEN_APPROX = 0.75;
export const WORDS_ROUNDING_STEP = 1_000;

/** Memory held back on a graphics card for the display and driver. */
export const GPU_RESERVED_GB = 1;
/** Memory held back on a PC for the operating system and other apps. */
export const CPU_RESERVED_GB = 4;
/** Commonly reported macOS default: the GPU may use about two thirds of smaller memory sizes. */
export const UNIFIED_SMALL_MEMORY_LIMIT_GB = 36;
export const UNIFIED_GPU_SHARE_SMALL = 0.67;
export const UNIFIED_GPU_SHARE_LARGE = 0.75;

/** At or below this share of usable memory, a fit is called comfortable. */
export const COMFORTABLE_FIT_FRACTION = 0.9;
/** Below this many bits per weight, quality drops faster. */
export const LOW_QUALITY_BITS_BELOW = 4;

export const MIN_PARAMETERS_BILLIONS = 0.1;
export const MAX_PARAMETERS_BILLIONS = 2_000;
export const MIN_BYTES_PER_PARAMETER = 0.1;
export const MAX_BYTES_PER_PARAMETER = 4;
export const MIN_CONTEXT_TOKENS = 256;
export const MAX_CONTEXT_TOKENS = 2_000_000;
export const MIN_LAYERS = 1;
export const MAX_LAYERS = 400;
export const MIN_KV_HEADS = 1;
export const MAX_KV_HEADS = 256;
export const MIN_HEAD_DIMENSION = 8;
export const MAX_HEAD_DIMENSION = 1_024;
export const MIN_MEMORY_GB = 1;
export const MAX_MEMORY_GB = 4_096;
export const MIN_BANDWIDTH_GB_PER_SECOND = 10;
export const MAX_BANDWIDTH_GB_PER_SECOND = 10_000;

export const GB_WHOLE_NUMBER_FROM = 100;
export const GB_ONE_DECIMAL_FROM = 1;
export const TOKENS_PER_SECOND_WHOLE_FROM = 10;
export const COPY_FEEDBACK_MILLISECONDS = 2_000;

export const DEFAULT_PARAMETERS_TEXT = "27";
export const DEFAULT_CONTEXT_TOKENS = 8_192;


export const HARDWARE_SPECS_VERIFIED_ON: string | null = null;