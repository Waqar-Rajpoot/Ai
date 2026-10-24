import { DOWNLOAD_MIME_TYPE } from "@/lib/tools/cheatSheetConstants";

/** Saves text as a file on the reader's device. Runs entirely in the browser. */
export function downloadTextFile(fileName: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: DOWNLOAD_MIME_TYPE }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}