import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
};