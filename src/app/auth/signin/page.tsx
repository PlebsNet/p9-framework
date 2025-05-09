"use client";

import { signIn, getProviders, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, any>>({});

  // If already logged in, bounce to homepage
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  // Load OAuth providers once
  useEffect(() => {
    getProviders().then((prov) => {
      if (prov) setProviders(prov);
    });
  }, []);

  // While checking auth, show loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  // If they somehow hit here authenticated, nothing else to render
  if (session) return null;

  return (
    <div className="bg-[rgb(16,16,16)] rounded-[16px] p-[56px] pt-[48px] min-w-[520px] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Sign in to P9 Framework</h1>

      {Object.values(providers).map((prov: any) => (
        <Button
          key={prov.id}
          onClick={() => signIn(prov.id, { callbackUrl: "/" })}
        >
          Sign in with {prov.name}
        </Button>
      ))}
    </div>
  );
}
