import { decodeHeadline } from "@/lib/society/bankingFinance";
import { HEADLINES } from "@/lib/society/bankingFinanceContent";
import { HeadlineDecoderPanel } from "./HeadlineDecoderPanel";

const DECODED_HEADLINES = HEADLINES.map(decodeHeadline);

export function HeadlineDecoder() {
  return <HeadlineDecoderPanel entries={DECODED_HEADLINES} sourceNote="Source: the 2026 survey, every figure in the ledger below" />;
}