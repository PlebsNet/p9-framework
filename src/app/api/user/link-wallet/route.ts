// app/api/user/link-wallet/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, ethAddress } = await req.json();
  if (!userId || !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { ethAddress },
  });
  return NextResponse.json({ success: true });
}