import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface SaveResultsPayload {
  testId: string;
  email: string;
  archetype: string;
  answers: Record<string, number>;
  ethAddress?: string;
};

export async function POST(request: Request) {
  let payload: SaveResultsPayload;

  // Parse & basic shape check
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON" },
      { status: 400 }
    );
  };

  const { testId, email, archetype, answers, ethAddress } = payload;

  // Validate testId
  if (typeof testId !== "string" || testId.trim() === "") {
    return NextResponse.json(
      { error: "Missing or invalid testId" },
      { status: 400 }
    );
  };

  // Validate email
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  };

  // Validate archetype
  if (typeof archetype !== "string" || archetype.trim() === "") {
    return NextResponse.json(
      { error: "Invalid archetype" },
      { status: 400 }
    );
  };

  // Validate answers
  if (
    typeof answers !== "object" ||
    answers === null ||
    Array.isArray(answers) ||
    !Object.values(answers).every((v) => typeof v === "number")
  ) {
    return NextResponse.json(
      { error: "Invalid answers payload" },
      { status: 400 }
    );
  };

  // Validate optional ethAddress
  if (
    ethAddress !== undefined &&
    !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)
  ) {
    return NextResponse.json(
      { error: "Invalid Ethereum address" },
      { status: 400 }
    );
  };

  const now = new Date();

  try {
    await prisma.$transaction(async (tx) => {
      // Upsert user record (increment sessionCount)
      const user = await tx.user.upsert({
        where: { email },
        update: {
          archetype,
          answers,
          lastAssessedAt: now,
          completedAt: now,
          sessionCount: { increment: 1 },
          ...(ethAddress && { ethAddress }),
        },
        create: {
          email,
          archetype,
          answers,
          lastAssessedAt: now,
          completedAt: now,
          sessionCount: 1,
          ethAddress,
        },
      });

      // Idempotency check if assessment with testId already exists
      const existing = await tx.assessment.findUnique({
        where: { testId },
      });

      // If doesn't exist create assessment
      if (!existing) {
        await tx.assessment.create({
          data: {
            testId,
            userId: user.id,
            archetype,
            answers,
          },
        });
      }
    });

    // Return success response
    return NextResponse.json({
      success: true,
      alreadySaved: false
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error saving results:", message);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  };
};