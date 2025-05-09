"use client";
import { useState, useEffect } from "react";

/**
 * Pulls the testId from sessionStorage (set in assessment).
 * Returns null if none is found.
 */
export function useTestId(): string | null {
  const [testId, setTestId] = useState<string | null>(null);

  useEffect(() => {
    const tid = sessionStorage.getItem("testId");
    setTestId(tid);
  }, []);

  return testId;
}
