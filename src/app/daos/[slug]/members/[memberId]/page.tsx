"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AssessmentResults from "@/components/AssessmentResults";
import Image from "next/image";

// À remplacer par un vrai fetch si tu as une API pour les infos membres
async function fetchMemberInfo(memberId: string) {
    // Exemple mock, à remplacer par un vrai appel API
    if (memberId === "mock-1") {
        return {
            id: "mock-1",
            label: "Alice Mock",
            image: "https://i.pravatar.cc/150?img=11",
            wallet_id: "0x1234...abcd",
        };
    }
    if (memberId === "mock-2") {
        return {
            id: "mock-2",
            label: "Bob Mock",
            image: "https://i.pravatar.cc/150?img=22",
            wallet_id: "0x5678...efgh",
        };
    }
    return {
        id: memberId,
        label: "Unknown",
        image: "",
        wallet_id: "N/A",
    };
}

export default function MemberProfilePage() {
    const { memberId } = useParams();
    const [member, setMember] = useState<any>(null);
    const [answers, setAnswers] = useState<Record<string, number> | null>(null);

    // Récupérer les infos du membre
    useEffect(() => {
        fetchMemberInfo(memberId as string).then(setMember);
    }, [memberId]);

    // Récupérer les réponses d'assessment
    useEffect(() => {
        async function fetchAnswers() {
            const res = await fetch(`/api/member-assessment/${memberId}`);
            if (res.ok) {
                setAnswers(await res.json());
            }
        }
        fetchAnswers();
    }, [memberId]);

    if (!member || !answers) return <div>Chargement…</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-8">
            {/* Infos du membre */}
            <div className="flex items-center gap-4 border-b pb-4">
                {member.image && member.image.trim() !== "" ? (
                    <Image
                        src={member.image}
                        alt={member.label}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl text-white">
                        ?
                    </div>
                )}
                <div>
                    <h2 className="text-2xl font-bold">{member.label || "Anonymous"}</h2>
                    <p className="text-gray-500">{member.wallet_id}</p>
                </div>
            </div>

            {/* Résultats d'assessment */}
            <AssessmentResults answers={answers} />
        </div>
    );
}
