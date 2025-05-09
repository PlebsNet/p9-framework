import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface SaveResultsPayload {
  testId: string;
  email?: string;
  ethAddress?: string;
  archetype: string;
  answers: Record<string, number>;
  identityType: "web2" | "web3" | "anonymous";
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

  const { testId, email, ethAddress, archetype, answers, identityType = "web2" } = payload;

  // Validate testId
  if (typeof testId !== "string" || testId.trim() === "") {
    return NextResponse.json(
      { error: "Missing or invalid testId" },
      { status: 400 }
    );
  };

  // Validate identity based on type
  if (identityType === "web2" && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json(
      { error: "Web2 auth requires a valid email address" },
      { status: 400 }
    );
  }

  if (identityType === "web3" && (!ethAddress || !/^0x[a-fA-F0-9]{40}$/.test(ethAddress))) {
    return NextResponse.json(
      { error: "Web3 auth requires a valid Ethereum address" },
      { status: 400 }
    );
  }

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

  const now = new Date();

  try {
    // Separate answers into neutral/non-neutral categories
    const definiteAnswers: Record<string, number> = {};
    const neutralResponses: Record<string, number> = {};
    
    // Identify neutral (value 4) and followup responses
    Object.entries(answers).forEach(([key, value]) => {
      // Regular questions with value 4 are neutral
      if (value === 4 && !key.includes('_followup')) {
        neutralResponses[key] = value;
      }
      // Follow-up questions are always stored in the database
      else if (key.includes('_followup')) {
        neutralResponses[key] = value;
      }
      // Non-neutral original questions are stored as definitive answers
      else if (value !== 4) {
        definiteAnswers[key] = value;
      }
    });

    // Store both the full answers and the prepared blockchain-ready answers
    await prisma.$transaction(async (tx) => {
      // Determine where clause based on identity type
      let whereClause: any = {};
      
      if (identityType === "web2" && email) {
        whereClause = { email };
      } else if (identityType === "web3" && ethAddress) {
        whereClause = { ethAddress };
      } else {
        // For anonymous users, create a new record each time
        whereClause = { id: `anon_${testId}` }; 
      }

      // Upsert user record (increment sessionCount)
      const user = await tx.user.upsert({
        where: whereClause,
        update: {
          type: identityType,
          archetype,
          answers, // Store complete answers in database
          lastAssessedAt: now,
          completedAt: now,
          sessionCount: { increment: 1 },
          ...(email && { email }),
          ...(ethAddress && { ethAddress }),
        },
        create: {
          type: identityType,
          email: email || undefined,
          ethAddress: ethAddress || undefined,
          archetype,
          answers, // Store complete answers in database
          lastAssessedAt: now,
          completedAt: now,
          sessionCount: 1,
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
            answers, // Store complete answers in database
          },
        });
      }
    });

    // Return success response with separated answers for frontend use
    return NextResponse.json({
      success: true,
      alreadySaved: false,
      // Include these in the response for potential blockchain storage
      definiteAnswers,
      neutralResponses,
      identityType
    });
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  };
};