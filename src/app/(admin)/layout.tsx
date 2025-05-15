import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/auth/signin");
  return <>{children}</>;
}
