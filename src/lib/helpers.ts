import { isAddress } from "ethers";

// Check if the query "address" is present in the URL
// Format the address to lowercase
export function getAddressParams(props: { address?: string }): string | null {
  const address: string | undefined = props?.address?.toLowerCase();
  if (isAddress(address)) {
    return address;
  } else {
    return null;
  }
};

// Create a constructor to enable language-sensitive number formatting
export function getCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumSignificantDigits: 3,
  }).format(value)
};

// Format EVM address to show 4 chars in the beguining and end
export function formatEvmAddress(address?: string): string | null {
  // Use a Regular Expression and test if the address is valid
  // const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  // const evmAddressValidation = evmAddressRegex.test(props);

  // Use ethers to check if the address is valid
  // Ethers ensures the address is valid but also properly checksummed 
  const formated = address?.toLowerCase();
  if (isAddress(formated) && typeof address === 'string') {
    const firstPart = address.slice(0, 6); // "0x" + first 4 characters
    const lastPart = address.slice(-4);    // Last 4 characters
    return `${firstPart}...${lastPart}`;
  } else {
    return null;
  }
}
