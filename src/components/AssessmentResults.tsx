"use client";
import { useAssessmentScores } from "@/hooks/useAssessmentScores";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import PracticalApplications from "@/components/PracticalApplications";
import PersonalizedInsights from "@/components/PersonalizedInsights";
import LabelFeedback from "@/components/LabelFeedback";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";

export default function AssessmentResults({ answers }: { answers: Record<string, number> }) {
    const { dimData, profile } = useAssessmentScores(answers);

    if (!profile) return <div>Chargement…</div>;

    const primary = profile[0];

    return (
        <div className="space-y-8">
            

            {primary && (
                <section className="bg-blue-50 p-4 rounded shadow flex items-start space-x-4">
                    <div>{ArchetypeAvatars[primary.slug as keyof typeof ArchetypeAvatars]}</div>
                    <div>
                        <h3 className="text-xl font-semibold">{primary.name}</h3>
                        <p className="text-sm text-gray-600">
                            Label: <em>{primary.primaryLabel}</em>
                        </p>
                        <p className="mt-1 mb-2">Score: {(primary.score * 100).toFixed(0)}%</p>
                        <p className="mb-4">{primary.description}</p>
                    </div>
                </section>
            )}

            
        </div>
    );
}