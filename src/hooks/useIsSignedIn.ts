import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

export function useIsSignedIn(): boolean {
  const { data: session, status } = useSession();
  const { isConnected, address } = useAccount();
  return (
    (status === "authenticated" && !!session?.user) ||
    (isConnected && !!address)
  );
}

export function useIsSignedInDetailed() {
  const { data: session, status } = useSession();
  const { isConnected, address } = useAccount();
  return {
    isSignedIn:
      (status === "authenticated" && !!session?.user) ||
      (isConnected && !!address),
    hasEthAddress: isConnected && !!address,
    status,
    session,
  };
}
