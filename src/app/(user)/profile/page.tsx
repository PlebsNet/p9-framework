import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import HistoryTable from "./components/HistoryTable";
import WalletConnect from "@/components/WalletConnect";
import { computeDimensionAverages, computeProfile } from "@/lib/scoring";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";

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

  const serializedAssessments = assessments.map(a => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));

  // 4) Pick the latest one to show summary
  const latest = assessments[0] ?? null;

  // 5) Precompute chart & profile for the latest
  let dimData: { dimension: string; score: number }[] = [];
  let primary: { slug: string; name: string; score: number; description: string } | null = null;

  if (latest) {
    const avgs = computeDimensionAverages(latest.answers as Record<string, number>);
    dimData = Object.entries(avgs).map(([dimension, score]) => ({ dimension, score }));
    const prof = computeProfile(latest.answers as Record<string, number>);
    primary = prof[0];
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      {/* 🌟 Latest assessment summary */}
      {latest ? (
        <section className="space-y-4">
          <h2 className="text-2xl">Last Assessment ({latest.createdAt.toLocaleDateString()})</h2>

          <div className="flex flex-wrap gap-6">
            {/* Radar */}
            <div>
              <ArchetypeRadar
                data={dimData.map(d => ({ dimension: d.dimension, user: d.score }))}
                slug="user"
                name="Your Scores"
                withReferenceBands
                showTooltip
              />
            </div>

            {/* Primary archetype */}
            {primary && (() => {
              function isValidArchetypeSlug(slug: string): slug is keyof typeof ArchetypeAvatars {
                return slug in ArchetypeAvatars;
              }

              return isValidArchetypeSlug(primary.slug) ? (
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{ArchetypeAvatars[primary.slug]}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{primary.name}</h3>
                    <p>Score: {primary.score.toFixed(2)}</p>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </section>
      ) : (
        <p>You haven’t taken a test yet.</p>
      )}

      {/* 📜 History table */}
      <HistoryTable assessments={serializedAssessments} />

      {/* 🔗 Wallet connect */}
      {!user?.ethAddress && (
        <section>
          <h2 className="text-xl font-medium mb-2">Connect your Ethereum wallet</h2>
          <WalletConnect />
        </section>
      )}
    </div>
  );
}