import { useCallback, useEffect, useState } from "react";
import type { Hex } from "viem";
import { useAccount, useConnect, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { cbWalletConnector } from "@/lib/wagmiConfig"


export function ConnectAndSIWE() {
    const { connect } = useConnect({
        mutation: {
            onSuccess: (data) => {
                const address = data.accounts[0];
                // const chainId = data.chainId;
                const m = new SiweMessage({
                    domain: document.location.host,
                    address,
                    chainId: 84532,
                    uri: document.location.origin,
                    version: "1",
                    statement: "Smart Wallet SIWE Example",
                    nonce: "12345678",
                });
                setMessage(m);
                signMessage({ message: m.prepareMessage() });
            },
        },
    });
    const account = useAccount();
    const client = usePublicClient();
    const [signature, setSignature] = useState<Hex | undefined>(undefined);
    const { signMessage } = useSignMessage({
        mutation: { onSuccess: (sig) => setSignature(sig) },
    });
    const [message, setMessage] = useState<SiweMessage | undefined>(undefined);

    const [valid, setValid] = useState<boolean | undefined>(undefined);

    const checkValid = useCallback(async () => {
        if (!signature || !account.address || !client || !message) return;

        client
            .verifyMessage({
                address: account.address,
                message: message.prepareMessage(),
                signature,
            })
            .then((v) => setValid(v));
    }, [signature, account]);

    useEffect(() => {
        checkValid();
    }, [signature, account]);

    useEffect(() => { });

    return (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold touch-manipulation transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-100/90 h-[34px] px-4 py-2 text-md rounded-[10px] fixed right-6 top-6 z-[1]" >
            <button onClick={() => connect({ connector: cbWalletConnector })}>
                Connect + SIWE
            </button>
            <p>{ }</p>
            {valid != undefined && <p> Is valid: {valid.toString()} </p>}
        </div>
    );
}