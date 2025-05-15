import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { label, rating } = body as {
    label?: unknown;
    rating?: unknown;
  };

  if (
    typeof label !== "string" ||
    label.trim() === "" ||
    typeof rating !== "number" ||
    (rating !== 0 && rating !== 1)
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid input: `label` must be a non-empty string and `rating` must be 0 or 1",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.labelFeedback.create({
      data: {
        label: label.trim(),
        rating,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error saving label feedback:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
