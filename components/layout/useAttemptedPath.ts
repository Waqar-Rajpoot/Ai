"use client";

import { useEffect, useState } from "react";

export function useAttemptedPath(): string | null {
  const [attemptedPath, setAttemptedPath] = useState<string | null>(null);

  useEffect(() => {
    setAttemptedPath(window.location.pathname);
  }, []);

  return attemptedPath;
}