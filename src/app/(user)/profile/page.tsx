import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { computeDimensionAverages, computeProfile } from "@/lib/scoring";
import type { Dimension } from "@/lib/archetypeCentroids";
import type { ProfileItemWithExtras } from "@/lib/types";

import ProfileClient from "@/components/ProfileClient";
import HistoryTable from "./components/HistoryTable";

export default async function ProfilePage() {
  // 1) Get the current user session
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !session.user.id) {
    // Not signed in → send to sign-in page
    redirect("/auth/signin?callbackUrl=/profile");
  }

  const userId = session.user.id;

  // 2) Load user row (to get ethAddress) and assessments in parallel
  const [user, assessments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        ethAddress: true,
      },
    }),
    prisma.assessment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        archetype: true,
        answers: true,
        createdAt: true,
      },
    }),
  ]);

  // 3) Serialize assessments for the client
  const assessmentsForClient = assessments.map(a => ({
    id: a.id,
    archetype: a.archetype,
    createdAt: a.createdAt.toISOString(),
    answers: a.answers as Record<string, number>,
  }));

  // 4) Pick the latest one to show summary
  const latest = assessments[0] ?? null;

  // 5) Precompute chart & profile for the latest
  let dimData: { dimension: Dimension; score: number }[] = [];
  let primary: ProfileItemWithExtras | null = null;

  if (latest) {
    const avgs = computeDimensionAverages(latest.answers as Record<string, number>);
    dimData = Object.entries(avgs).map(([dimension, score]) => ({ dimension: dimension as Dimension, score }));
    const prof = computeProfile(latest.answers as Record<string, number>);
    primary = {
      ...prof[0],
      primaryTraits: prof[0].primaryTraits as Dimension[],
      cognitiveFrame: prof[0].cognitiveFrame,
    };
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:py-16 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Your Personality Profile</h1>
        <Link
          href="/assessment"
          className="inline-block text-sm text-primary underline hover:text-primary/80 transition"
        >
          Retake the assessment
        </Link>
      </div>

      {latest ? (
        <div className="bg-gray-900 rounded-lg p-6 shadow-sm">
          <ProfileClient
            dimData={dimData}
            primary={primary}
            assessments={assessmentsForClient}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">You haven’t taken a test yet.</p>
      )}

      <div className="bg-gray-900 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Past Assessments</h2>
        <HistoryTable assessments={assessmentsForClient} />
      </div>
    </div>
  );
}