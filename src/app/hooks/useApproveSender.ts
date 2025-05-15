import { useContractWrite, useContractRead } from "wagmi";
import { multivaultAbi } from "../../lib/abis/multivault";

export function useApproveSender(contractAddress: `0x${string}`) {
  // Read approval status
  const { data: isApproved, isLoading: isLoadingApproval } = useContractRead({
    address: contractAddress,
    abi: multivaultAbi,
    functionName: "approvals",
    args: [contractAddress, contractAddress], // [receiver, sender]
  });

  // Write approval
  const { writeContractAsync: approveSender, isPending: isApproving } =
    useContractWrite({
      abi: multivaultAbi,
      functionName: "approveSender",
    });

  const handleApprove = async (sender: `0x${string}`) => {
    return approveSender({
      address: contractAddress,
      args: [sender],
    });
  };

  return {
    isApproved,
    isLoadingApproval,
    approveSender: handleApprove,
    isApproving,
  };
}
