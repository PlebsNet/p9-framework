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
  const [, assessments] = await Promise.all([
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
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <p className="text-sm text-blue-500 underline mb-4">
        <Link href="/assessment">Retake test</Link>
      </p>

      {latest ? (
        <ProfileClient
          dimData={dimData}
          primary={primary}
          assessments={assessmentsForClient}
        />
      ) : (
        <p>You haven’t taken a test yet.</p>
      )}

      <HistoryTable assessments={assessmentsForClient} />
    </div>
  );
}