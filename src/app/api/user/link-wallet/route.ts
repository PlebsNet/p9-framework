import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ethAddress } = await req.json();

  if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    return NextResponse.json({ error: "Invalid Ethereum address" }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { ethAddress },
  });

  if (existing) {
    return NextResponse.json({ error: "Wallet already linked to another user" }, { status: 409 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { ethAddress },
  });

  return NextResponse.json({ success: true });
}