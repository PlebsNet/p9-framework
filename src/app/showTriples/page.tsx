'use client'

import { useGetTriplesQuery } from '@0xintuition/graphql'
import { Card } from '@/components/ui/card'
import { question } from '@/data/question'

export default function ShowTriplesPage() {
    const { data, isLoading, error } = useGetTriplesQuery()

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Loading Triples...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Error Loading Triples</h1>
                <p className="text-red-500">{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Created Triples</h1>
            <div className="grid gap-4">
                {data?.triples.map((triple) => (
                    <Card key={triple.id} className="p-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Triple ID:</span>
                                <span>{triple.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Subject:</span>
                                <span>{triple.subject.label}</span>
                                <span className="text-sm text-gray-500">(ID: {triple.subject.id})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Predicate:</span>
                                <span>{triple.predicate.label}</span>
                                <span className="text-sm text-gray-500">(ID: {triple.predicate.id})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Object:</span>
                                <span>{triple.object.label}</span>
                                <span className="text-sm text-gray-500">(ID: {triple.object.id})</span>
                            </div>
                            {triple.creator && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Creator:</span>
                                    <span>{triple.creator.label}</span>
                                </div>
                            )}
                            {triple.vault && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Vault Shares:</span>
                                    <span>{triple.vault.total_shares}</span>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
} 