"use client";

import { useSearchParams } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logomark } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { ConnectAndSIWE } from "@/components/ConnectAndSIWE";


export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = decodeURIComponent(searchParams.get("callbackUrl") || "/");
  const [providers, setProviders] = useState<Record<string, any>>({});
  const [walletAuthenticated, setWalletAuthenticated] = useState(false);

  // If already logged in, redirect to callback URL
  useEffect(() => {
    if (status === "authenticated" || session) {
      const redirectTo = callbackUrl === "/auth/signin" ? "/" : callbackUrl;
      router.replace(redirectTo);
    }
  }, [status, session, router, callbackUrl]);

  // Load OAuth providers once
  useEffect(() => {
    getProviders().then((prov) => {
      if (prov) {
        // Filter out the SIWE provider as we handle it separately
        const filteredProviders = Object.values(prov).reduce((acc, provider) => {
          if (provider.id !== "siwe") {
            acc[provider.id] = provider;
          }
          return acc;
        }, {} as Record<string, any>);

        setProviders(filteredProviders);
      }
    });
  }, []);

  // Handle wallet authentication callback
  const handleWalletVerified = (address: string) => {
    setWalletAuthenticated(true);

    // Redirect after successful wallet authentication
    const redirectTo = callbackUrl === "/auth/signin" ? "/" : callbackUrl;
    router.replace(redirectTo);
  };

  // While checking auth, show loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="translate-y-[-50%] flex flex-col items-center justify-center">
        <Link href="/" className="group">
          <Logomark className="h-12 w-12 mb-12 group-hover:stroke-brand-500" />
        </Link>

        <h2 className="text-lg font-medium mb-6 text-gray-500">
          Sign in to Plebs
        </h2>

        {/* Regular OAuth providers */}
        {Object.values(providers).map((prov) => (
          <Button
            size="lg"
            key={prov.id}
            onClick={() => signIn(prov.id, { callbackUrl })}
            className="mb-3 w-full"
          >
            Sign in with {prov.name}
          </Button>
        ))}

        {/* Wallet connector with SIWE */}
        <ConnectAndSIWE
          onVerified={handleWalletVerified}
          onConnectChange={(connected) => {
            // This can be used for UI feedback
          }}
        />
      </div>
    </div>
  );
}