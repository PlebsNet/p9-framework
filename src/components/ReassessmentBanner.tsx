"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ReassessmentBanner: React.FC = () => {
  const { status } = useSession();
  const [due, setDue] = useState(false);

  useEffect(() => {
    // Only run once session is loaded and authenticated
    if (status !== "authenticated") return;

    fetch("/api/user/last-assessed") // should return { due: boolean }
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.due === "boolean") {
          setDue(data.due);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch reassessment status:", err);
      });
  }, [status]);

  // If not logged in or not due yet, don’t render anything
  if (status !== "authenticated" || !due) {
    return null;
  }

  return (
    <div className="bg-yellow-100 p-4 rounded mb-4 text-center">
      <p>
        It’s been a while since your last assessment.{" "}
        <Link
          href="/assessment"
          className="underline font-semibold text-blue-600 hover:text-blue-800"
        >
          Re-take the P9 Assessment
        </Link>{" "}
        to keep your profile up to date.
      </p>
    </div>
  );
};

export default ReassessmentBanner;
