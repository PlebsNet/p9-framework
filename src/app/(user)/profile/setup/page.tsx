"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function ProfileSetup() {
  const { data: session } = useSession();
  const router = useRouter();
  // const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  // After login, auto-save the run:
  useEffect(() => {
    if (!session) return;
    (async () => {
      setSaving(true);
      const answers = JSON.parse(localStorage.getItem("answers") || "{}");
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          archetype: profile.slug,
          answers,
        }),
      });
      setSaving(false);
      router.push("/profile/history");
    })();
  }, [session, router]);

  // If not signed in, show login prompt
  if (!session) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <h2 className="text-xl font-bold">Save Your Profile</h2>
        <button
          onClick={() => signIn("email")}
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          Sign in with Email
        </button>
      </div>
    );
  }

  // If signed in but still saving…
  if (saving) {
    return <p className="text-center mt-8">Saving your profile…</p>;
  }

  // Once saved, redirect to history
  return null;
}
