import { base, baseSepolia } from "viem/chains";

// export const CURRENT_ENV =
//   typeof window !== 'undefined' ? window.ENV.DEPLOY_ENV : process.env.DEPLOY_ENV

export const CURRENT_ENV = "development";

export const DEFAULT_CHAIN_ID =
  CURRENT_ENV === "development"
    ? baseSepolia.id.toString()
    : base.id.toString();

export const DEFAULT_VERIFIER = function (): void {
  throw new Error("verify function must be implemented");
};

export const MULTIVAULT_CONTRACT_ADDRESS =
  CURRENT_ENV === "development"
    ? "0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665" // dev contract address
    : "0x430BbF52503Bd4801E51182f4cB9f8F534225DE5"; // prod contract address

export const RELIC_CONTRACT_ADDRESS =
  CURRENT_ENV === "development"
    ? "0x7aB2F10CaC6E27971fa93A5D5470Bb84126Bb734" // dev contract address
    : "0x7aB2F10CaC6E27971fa93A5D5470Bb84126Bb734"; // prod contract address

export const DEFAULT_LIMIT = 10;

export const MIN_DEPOSIT =
  CURRENT_ENV === "development" ? "0.00069" : "0.00042";
// Form constants
export const MAX_NAME_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 512;
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];

export const BLOCK_EXPLORER_URL =
  CURRENT_ENV === "development"
    ? "https://sepolia.basescan.org"
    : "https://basescan.org";

export const IPFS_GATEWAY_URL = "https://ipfs.io/ipfs";
