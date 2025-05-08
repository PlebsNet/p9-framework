"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { computeProfile, computeDimensionAverages } from "@/lib/scoring";
import DimensionRadar from "@/components/DimensionRadar";
import PracticalApplications from "@/components/PracticalApplications";
import PersonalizedInsights from "@/components/PersonalizedInsights";
import LabelFeedback from "@/components/LabelFeedback";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";
import { SaveBanner } from "@/components/SaveBanner";

// Must match STORAGE_ANS from the questionnaire page
const STORAGE_ANS = "p9_answers";

type RawProfileItem = {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  applications: {
    growth: string[];
    collaboration: string[];
    career: string[];
  };
  score: number;
  rank: number;
  primaryLabel?: string;
};

export default function ResultsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [answers, setAnswers] = useState<Record<string, number> | null>(null);
  const [dimData, setDimData] = useState<{ dimension: string; score: number }[]>([]);
  const [profile, setProfile] = useState<RawProfileItem[] | null>(null);

  // 1) Load answers from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_ANS);
    if (!raw) {
      // nothing to show → redirect back
      router.replace("/questionnaire");
      return;
    }
    let parsed: Record<string, number>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      router.replace("/questionnaire");
      return;
    }
    setAnswers(parsed);

    // dimension averages → radar
    const avgs = computeDimensionAverages(parsed);
    setDimData(
      Object.entries(avgs).map(([dimension, score]) => ({ dimension, score }))
    );

    // full archetype profile → sorted
    const prof = computeProfile(parsed) as RawProfileItem[];
    setProfile(prof);
  }, [router]);

  // 2) Loading states
  if (answers === null || profile === null) {
    return <div className="p-4 text-center">Loading your results…</div>;
  }
  if (status === "loading") {
    return <div className="p-4 text-center">Checking sign-in status…</div>;
  }

  const primary = profile[0];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Save Banner */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <h2 className="text-2xl font-bold">
          Your results are ready — save them to your profile!
        </h2>
        <SaveBanner />
      </section>

      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your P9 Profile</h2>
        <Link href="/questionnaire" className="text-sm text-blue-500 underline">
          Retake Test
        </Link>
      </header>

      {/* Dimension Scores & Radar */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Dimension Scores</h3>
        <ul className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {dimData.map((d) => (
            <li key={d.dimension}>
              <strong>{d.dimension}</strong>: {d.score.toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <DimensionRadar data={dimData} />
        </div>
      </section>

      {/* Primary Archetype Detail */}
      <section className="bg-blue-50 p-4 rounded shadow flex items-start space-x-4">
        <div>{ArchetypeAvatars[primary.slug]}</div>
        <div>
          <h3 className="text-xl font-semibold">{primary.name}</h3>
          <p className="mt-1 mb-2">Score: {primary.score.toFixed(2)}</p>
          <p className="mb-4">{primary.description}</p>
          <Link
            href={`/archetype/${primary.slug}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Other Archetypes */}
      <section>
        <h3 className="text-lg font-medium mb-2 text-gray-600">
          Other Archetypes
        </h3>
        <ul className="flex flex-wrap gap-4 text-sm">
          {profile.slice(1).map((a) => (
            <li key={a.slug} className="flex items-center space-x-1">
              <span className="font-medium">{a.name}:</span>
              <span className="text-gray-500">{a.score.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tailored Content */}
      <PracticalApplications apps={primary.applications} />
      <PersonalizedInsights recommendations={primary.recommendations} />
      <LabelFeedback label={primary.slug} />
    </div>
  );
}
