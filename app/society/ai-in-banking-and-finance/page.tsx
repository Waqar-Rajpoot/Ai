import type { Metadata } from "next";
import { BankingFinanceView } from "@/components/society/BankingFinanceView";

export const metadata: Metadata = {
  title: "AI in banking and finance: what the 2026 UK regulators’ survey shows",
  description:
    "What the Bank of England and FCA survey of UK financial firms says about AI use, agents, outside suppliers and risks, with the source and base for every number.",
  alternates: { canonical: "/society/ai-in-banking-and-finance" },
};

export default function AiInBankingAndFinancePage() {
  return <BankingFinanceView />;
}