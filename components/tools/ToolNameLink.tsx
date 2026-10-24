import Link from "next/link";
import type { ToolEntry } from "@/lib/tools/toolCatalog";

interface ToolNameLinkProps {
  tool: ToolEntry;
}

/** A link to the tool, or plain text with "coming soon" when its page is not built yet. */
export function ToolNameLink({ tool }: ToolNameLinkProps) {
  if (tool.status === "live") return <Link href={tool.route}>{tool.name}</Link>;
  return (
    <span>
      {tool.name} <span className="text-xs text-[var(--color-muted)]">(coming soon)</span>
    </span>
  );
}