"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { toast } from "sonner";

interface WalletConnectProps {
  /** If you're minting an NFT or saving on-chain, you can pass additional metadata */
  email?: string;
  archetype?: string;
}

export default function WalletConnect({ email, archetype }: WalletConnectProps) {
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const [minting, setMinting] = useState(false);

  // Show connected state
  if (isConnected && address) {
    const truncated = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return (
      <div className="flex flex-col space-y-2">
        <p className="text-sm">
          Connected: <code>{truncated}</code>
        </p>
        <button
          onClick={() => {
            disconnect();
            toast("Wallet disconnected");
          }}
          className="text-xs underline"
          aria-label="Disconnect wallet"
        >
          Disconnect
        </button>
        {email && archetype && (
          <button
            onClick={async () => {
              setMinting(true);
              try {
                const res = await fetch("/api/mint-nft", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, archetype, address }),
                });
                if (!res.ok) throw new Error(await res.text());
                toast.success("Transaction submitted!");
              } catch (err: any) {
                toast.error(err.message || "Transaction failed");
              } finally {
                setMinting(false);
              }
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
            disabled={minting}
            aria-label="Mint NFT"
          >
            {minting ? "Minting…" : "Mint Your NFT"}
          </button>
        )}
      </div>
    );
  }

  // Not connected → show a dynamic list of connectors
  return (
    <div className="flex flex-col space-y-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => void connectAsync({ connector })}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          aria-label={`Connect using ${connector.name}`}
        >
          Connect with {connector.name}
        </button>
      ))}
      {connectError && (
        <p className="text-sm text-red-600">{(connectError as Error).message}</p>
      )}
    </div>
  );
}