"use client";

import React from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { useGetTriplesWithPositionsQuery, GetTriplesWithPositionsQuery } from '@0xintuition/graphql';
import { questions } from '../assessment/components/questions';
import { useRedeemTriple } from '../../hooks/useRedeemTriple';
import { CURRENT_ENV } from '../../consts';
import { getChainEnvConfig } from '../../lib/utils/environment';
import { parseUnits } from 'viem';
import { multivaultAbi } from '../../lib/abis/multivault'; // Import the ABI
import { useApproveSender } from '../hooks/useApproveSender';

// Extract all triple IDs from questions
const allTripleIds = questions.map(q => q.triple.id);

// Helper function to format USD amounts
const formatUSD = (ethAmount: number) => {
    const usdAmount = ethAmount * 2000; // Using $2000 as ETH price
    if (usdAmount < 0.01) return '<$0.01';
    return `$${usdAmount.toPrecision(3).split('e')[0]}`;
};

// Helper function to format percentages
const formatPercentage = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0.00%'; // Handle NaN/Infinity
    return `${value.toPrecision(3).split('e')[0]}%`;
};

export default function TriplesPage() {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const { contractAddress: multivaultContractAddress } = getChainEnvConfig(CURRENT_ENV);
    const redeemTripleHook = useRedeemTriple(multivaultContractAddress);
    const { isApproved, isLoadingApproval, approveSender, isApproving } = useApproveSender(multivaultContractAddress);

    // Fetch positions for all triples
    const { data: positionsData, isLoading: isLoadingPositions, error: positionsError } = useGetTriplesWithPositionsQuery({
        where: {
            id: { _in: allTripleIds }
        },
        address: address?.toLowerCase() as `0x${string}`
    });

    const handleWithdraw = async (tripleIdFromCard: string, vaultSharesFromCard?: number, counterVaultSharesFromCard?: number) => {
        if (!address || !redeemTripleHook || !redeemTripleHook.writeContractAsync) {
            console.error("Withdraw prerequisites not met: address, redeemTripleHook, or writeContractAsync missing.");
            return;
        }

        let sharesToRedeemBigInt: bigint;
        let idForContractTx = BigInt(tripleIdFromCard);
        let attemptingToRedeem: "For" | "Against" | null = null;

        if (vaultSharesFromCard && vaultSharesFromCard > 0) {
            sharesToRedeemBigInt = parseUnits(vaultSharesFromCard.toString(), 0);
            attemptingToRedeem = "For";
            console.log(`Preparing to withdraw ${sharesToRedeemBigInt} 'For' shares from vault ID ${idForContractTx}`);
        } else if (counterVaultSharesFromCard && counterVaultSharesFromCard > 0) {
            sharesToRedeemBigInt = parseUnits(counterVaultSharesFromCard.toString(), 0);
            attemptingToRedeem = "Against";
            console.log(`Preparing to withdraw ${sharesToRedeemBigInt} 'Against' shares using vault ID ${idForContractTx}.`);
        } else {
            console.log("No shares available to withdraw for this position on triple:", tripleIdFromCard);
            return;
        }

        if (!attemptingToRedeem) {
            console.error("Logical error: No redeem type determined.");
            return;
        }

        try {
            // Check if approval is needed
            if (!isApproved) {
                console.log("Sender not approved, attempting to approve...");
                try {
                    const approveTx = await approveSender(address as `0x${string}`);
                    console.log("Approval transaction:", approveTx);
                    // Wait for approval to be mined
                    const receipt = await publicClient.waitForTransactionReceipt({
                        hash: approveTx
                    });
                    console.log("Approval transaction mined:", receipt);
                } catch (approveErr) {
                    console.error("Approval failed:", approveErr);
                    throw approveErr; // Re-throw to be caught by outer catch
                }
            }

            console.log(`Calling redeemTriple with args: [shares=${sharesToRedeemBigInt}, receiver=${address}, id=${idForContractTx}] for ${attemptingToRedeem} position.`);

            const tx = await redeemTripleHook.writeContractAsync({
                address: multivaultContractAddress,
                abi: multivaultAbi,
                functionName: 'redeemTriple',
                args: [sharesToRedeemBigInt, address, idForContractTx]
            });

            console.log("Transaction submitted:", tx);

        } catch (err: any) {
            console.error("Detailed withdrawal error:", {
                error: err,
                message: err?.message,
                code: err?.code,
                data: err?.data,
                transaction: err?.transaction,
                stack: err?.stack
            });

            if (err?.message?.includes("execution reverted")) {
                console.error("Transaction reverted. This might be due to account abstraction permissions.");
            }
        }
    };

    if (!address) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-gray-600">Please connect your wallet to view your positions.</p>
            </div>
        );
    }

    if (isLoadingPositions) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-gray-600">Loading positions...</p>
            </div>
        );
    }

    if (positionsError) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-red-600">Error loading positions: {positionsError.toString()}</p>
            </div>
        );
    }

    const triples = positionsData?.triples || [];
    const total = positionsData?.total.aggregate?.count || 0;
    const isRedeeming = redeemTripleHook.awaitingWalletConfirmation || redeemTripleHook.awaitingOnChainConfirmation;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
            <p className="text-sm text-gray-600 mb-6">Total positions: {total}</p>
            {isRedeeming && <p className="text-blue-500">Processing withdrawal...</p>}
            {isApproving && <p className="text-blue-500">Approving sender...</p>}
            {isLoadingApproval && <p className="text-blue-500">Checking approval status...</p>}
            {redeemTripleHook.isError && <p className="text-red-500">Withdrawal error occurred. Please check console.</p>}
            {/* Access receipt when available: redeemTripleHook.receipt */}

            {triples.length === 0 ? (
                <p className="text-gray-600">You don't have any positions yet.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {triples.map((triple: NonNullable<GetTriplesWithPositionsQuery['triples']>[number]) => {
                        const question = questions.find(q => q.triple.id === parseInt(triple.id));
                        const vaultPosition = triple.vault?.positions[0];
                        const counterVaultPosition = triple.counter_vault?.positions[0];

                        const vaultEthAmount = vaultPosition ? (vaultPosition.shares * triple.vault?.current_share_price) : 0;
                        const counterVaultEthAmount = counterVaultPosition ? (counterVaultPosition.shares * triple.counter_vault?.current_share_price) : 0;
                        const totalVaultEth = triple.vault?.total_shares * triple.vault?.current_share_price;
                        const totalCounterVaultEth = triple.counter_vault?.total_shares * triple.counter_vault?.current_share_price;

                        return (
                            <div
                                key={triple.id}
                                className="p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-[250px] flex-1 basis-[250px]"
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-base">
                                        {question?.text || `Triple #${triple.id}`}
                                    </h3>
                                    <p className="text-xs text-gray-500">ID: {triple.id}</p>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1 text-xs text-gray-600">
                                            <p>Subject: {triple.subject.label}</p>
                                            <p>Predicate: {triple.predicate.label}</p>
                                            <p>Object: {triple.object.label}</p>
                                        </div>
                                        <div className="text-right">
                                            {vaultPosition && (
                                                <div className="mb-1">
                                                    <p className="text-xs font-medium text-green-600">
                                                        For: {formatUSD(vaultEthAmount)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatPercentage((vaultEthAmount / totalVaultEth) * 100)} of total
                                                    </p>
                                                </div>
                                            )}
                                            {counterVaultPosition && (
                                                <div>
                                                    <p className="text-xs font-medium text-red-600">
                                                        Against: {formatUSD(counterVaultEthAmount)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatPercentage((counterVaultEthAmount / totalCounterVaultEth) * 100)} of total
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {(vaultPosition || counterVaultPosition) && (
                                        <button
                                            onClick={() => handleWithdraw(triple.id, vaultPosition?.shares, counterVaultPosition?.shares)}
                                            disabled={isRedeeming || (!vaultPosition?.shares && !counterVaultPosition?.shares)}
                                            className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs disabled:opacity-50"
                                        >
                                            {isRedeeming ? 'Withdrawing...' : 'Withdraw'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
} 