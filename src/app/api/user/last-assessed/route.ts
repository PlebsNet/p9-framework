import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const SIX_MONTHS_IN_MS = 1000 * 60 * 60 * 24 * 180;

export async function GET() {
  // Get the session via NextAuth
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Fetch last assessment timestamp
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { lastAssessedAt: true },
  });

  // Determine if it’s been over six months
  const lastTs = user?.lastAssessedAt?.getTime() ?? 0;
  const due = Date.now() - lastTs > SIX_MONTHS_IN_MS;

  // Return JSON
  return NextResponse.json(
    { due },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
