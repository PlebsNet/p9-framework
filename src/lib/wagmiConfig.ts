import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { parseEther, toHex } from "viem";

export const chains = [baseSepolia, base];
export const defaultChain = baseSepolia;

export const cbWalletConnector = coinbaseWallet({
  appName: "Plebs",
  preference: {
    keysUrl: "https://keys-dev.coinbase.com/connect",
    options: "smartWalletOnly",
  },
  subAccounts: {
    enableAutoSubAccounts: true,
    defaultSpendLimits: {
      84532: [
        {
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          allowance: toHex(parseEther("0.01")),
          period: 864000,
        },
      ],
      8453: [
        {
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          allowance: toHex(parseEther("0.01")),
          period: 864000,
        },
      ],
    },
  },
});

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [cbWalletConnector],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
};
