"use client";

import React from 'react';
import { useAccount } from 'wagmi';
import { useGetTriplesWithPositionsQuery, GetTriplesWithPositionsQuery } from '@0xintuition/graphql';
import { questions } from '../assessment/components/questions';

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
    return `${value.toPrecision(3).split('e')[0]}%`;
};

export default function TriplesPage() {
    const { address } = useAccount();

    // Fetch positions for all triples
    const { data: positionsData, isLoading, error } = useGetTriplesWithPositionsQuery({
        where: {
            id: { _in: allTripleIds }
        },
        address: address?.toLowerCase() as `0x${string}`
    });

    if (!address) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-gray-600">Please connect your wallet to view your positions.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-gray-600">Loading positions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
                <p className="text-red-600">Error loading positions: {error.toString()}</p>
            </div>
        );
    }

    const triples = positionsData?.triples || [];
    const total = positionsData?.total.aggregate?.count || 0;

    // Calculate total ETH amount across all positions
    const totalEthAmount = triples.reduce((sum, triple) => {
        const vaultPosition = triple.vault?.positions[0];
        const counterVaultPosition = triple.counter_vault?.positions[0];

        const vaultEthAmount = vaultPosition ? (vaultPosition.shares * triple.vault?.current_share_price) : 0;
        const counterVaultEthAmount = counterVaultPosition ? (counterVaultPosition.shares * triple.counter_vault?.current_share_price) : 0;

        return sum + vaultEthAmount + counterVaultEthAmount;
    }, 0);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Triple Positions</h1>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">Total positions: {total}</p>
                <p className="text-sm font-medium">
                    Total Value: {formatUSD(totalEthAmount)}
                </p>
            </div>

            {triples.length === 0 ? (
                <p className="text-gray-600">You don&apos;t have any positions yet.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {triples.map((triple: NonNullable<GetTriplesWithPositionsQuery['triples']>[number]) => {
                        // Find the corresponding question for this triple
                        const question = questions.find(q => q.triple.id === parseInt(triple.id));
                        const vaultPosition = triple.vault?.positions[0];
                        const counterVaultPosition = triple.counter_vault?.positions[0];

                        // Calculate ETH amounts
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
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
} 