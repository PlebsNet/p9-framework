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
import { formatEvmAddress } from '@/lib/helpers';
import { User } from './Icons';

export default function WalletConnect() {
  const { data: session } = useSession();
  const isSignedIn = useIsSignedIn();
  const pathname = usePathname();
  const { address: connectedAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  if (pathname === "/auth/signin") return null;

  const connectAndLinkWallet = async () => {
    try {
      await connect({ connector: cbWalletConnector });
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
      <div className="font-semibold flex flex-col">
        {isSignedIn && (
          <div className='flex flex-col gap-4 m-4 text-xs'>

              <div className='flex items-center mt-1 gap-2'>
                <Button asChild className="w-full border-gray-700 bg-gray-700" variant="outline">
                  <Link href="/profile" >
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image || ''}
                        alt="Profile picture"
                      />
                      <AvatarFallback>
                        {session?.user?.email?.[0]?.toUpperCase() ?? <User />}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">
                      {session?.user?.name ? session.user.name : "Profile"}
                    </p>
                  </Link>
                </Button>
              </div>

            <Separator />

            {/* Email */}
            <div className="flex flex-col gap-2">
              <p className="flex flex-col text-xs">
                <span>Email</span>
                <span>{session?.user?.email}</span>
              </p>
            </div>

            <Separator />
            
            {/* Address */}
            <div className="flex items-center gap-2">
              {session?.user?.ethAddress && isConnected && connectedAddress === session.user.ethAddress && (
                <p className="flex flex-col text-xs">
                  <span>Wallet</span>
                  <span>{formatEvmAddress(session.user.ethAddress)}</span>
                </p>
              )}
              {session?.user?.ethAddress && (!isConnected || connectedAddress !== session.user.ethAddress) && (
                <Button
                  size="xs"
                  onClick={connectAndLinkWallet}
                >
                  {!session?.user?.ethAddress ? "Link Wallet" : "Connect Wallet"}
                </Button>
              )}
            </div>

            <Separator />

            <Button variant="destructive" onClick={() => {
              disconnect();
              signOut();
            }}>
              Sign out
            </Button>
          </div>
        )}

        {!isSignedIn && (
          <Button asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </>
  );
}
