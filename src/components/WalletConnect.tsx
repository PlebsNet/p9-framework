"use client"; 

import Link from 'next/link';
import { signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useIsSignedIn } from "@/hooks/useIsSignedIn";
import { Button } from './ui/Button';
import { useSession } from "next-auth/react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { cbWalletConnector } from "@/lib/wagmiConfig";
import { Separator } from '@/components/ui/Separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

export default function WalletConnect() {
  const { data: session } = useSession();
  const isSignedIn = useIsSignedIn();
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  if (pathname === "/auth/signin") return null;

  const connectAndLinkWallet = async () => {
    try {
      await connect({ connector: cbWalletConnector });
      const connectedAddress = address;
      if (!connectedAddress || session?.user?.ethAddress === connectedAddress) return;
      if (!session?.user?.id) return;
      const res = await fetch("/api/user/link-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, ethAddress: connectedAddress }),
      });
      if (res.ok) {
        await signIn("credentials", { redirect: false });
      } else console.error("Failed to link wallet.");
    } catch (err) {
      console.error("Wallet connection or linking failed:", err);
    }
  };

  return (
    <>
      <div className="fixed right-6 top-6 z-[999] flex flex-col gap-2 items-end">
        {isSignedIn && (
          <div className='flex flex-col gap-4 items-end p-4 rounded-lg bg-gray-800 text-xs'>
            <Link href="/assessment" className="hover:opacity-80">
              Assessment
            </Link>
            <Link href="/profile" className="hover:opacity-80">
              Profile
            </Link>

            <Separator />

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.email || 'User'} />
                <AvatarFallback>{session?.user?.email?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
              </Avatar>
              {session?.user?.name && (
                <p className="text-sm font-medium text-white">
                  {session.user.name}
                </p>
              )}
              <p className="text-xs text-right text-gray-500">
                Signed in as {session?.user?.email}
              </p>
            </div>

            {session?.user?.ethAddress && (
              <>
                <p className="text-xs text-right text-gray-500">
                  Wallet: {session.user.ethAddress}{" "}
                </p>
                {(!session?.user?.ethAddress || session.user.ethAddress !== address) && (
                  <Button onClick={connectAndLinkWallet}>
                    {!session?.user?.ethAddress ? "Link Wallet" : "Connect Wallet"}
                  </Button>
                )}
              </>
            )}

            <Button variant="destructive" onClick={() => {
              disconnect();
              signOut();
            }}>
              Sign out
            </Button>
          </div>
        )}

        {!isSignedIn && (
          <Button asChild className="fixed right-6 top-6 z-[1]">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </>
  );
}
