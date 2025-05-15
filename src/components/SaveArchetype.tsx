"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { computeProfile } from "@/lib/scoring";

const STORAGE_ANS = "plebs_answers";
const STORAGE_IDX = "plebs_currentIndex";
const STORAGE_TEST = "plebs_testId";

export function SaveArchetype() {
  const { data: session, status } = useSession();
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleSave = useCallback(async () => {
    if (saving || done) return;
    setSaving(true);

    try {
      // 1) Grab or generate testId
      let testId = sessionStorage.getItem(STORAGE_TEST);
      if (!testId) {
        testId = nanoid();
        sessionStorage.setItem(STORAGE_TEST, testId);
      }

      // 2) Load answers & compute primary archetype
      const raw = sessionStorage.getItem(STORAGE_ANS) || "{}";
      const answers = JSON.parse(raw) as Record<string, number>;
      const prof = computeProfile(answers);
      if (!prof.length) throw new Error("No completed test to save.");

      // 3) POST to your endpoint
      const res = await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId,
          email: session?.user?.email,
          archetype: prof[0].slug,
          answers,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || res.statusText);

      // 4) Notify & clear storage on first-time save
      if (payload.alreadySaved) {
        toast("Already saved!");
      } else {
        toast.success("Saved to your profile!");
        sessionStorage.removeItem(STORAGE_ANS);
        sessionStorage.removeItem(STORAGE_IDX);
        sessionStorage.removeItem(STORAGE_TEST);
      }

      setDone(true);
    } catch (err) {
      const error = err as Error;
      console.error("SaveArchetype error:", error);
      toast.error(error.message || "Couldn’t save your results");
    } finally {
      setSaving(false);
    }
  }, [saving, done, session]);

  // While NextAuth is initializing
  if (status === "loading") return null;

  // Not signed in → prompt login
  if (!session?.user?.email) {
    return (
      <button
        onClick={() =>
          signIn(undefined, { callbackUrl: window.location.href })
        }
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign in to Save
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving || done}
      className={`
        px-4 py-2 rounded text-white transition
        ${saving || done
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
        }
      `}
    >
      {saving ? "Saving…" : done ? "Saved ✓" : "Save Results"}
    </button>
  );
}
