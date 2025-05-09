"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/Dialog";
import { useState, useMemo } from "react";
import { computeAssessmentScores } from "@/lib/assessment";

interface Assessment {
  id: string;
  archetype: string;
  createdAt: string;
  dimensionScores?: Record<string, number>;
  answers?: any;
}

interface Props {
  assessments: Assessment[];
}

function AssessmentDialog({ assessment }: { assessment: Assessment }) {
  const isFlat = assessment?.answers && typeof assessment.answers === "object" && !Array.isArray(assessment.answers);
  const dimScores = useMemo(() => {
    return isFlat ? computeAssessmentScores(assessment.answers).dimData : [];
  }, [assessment]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline" aria-label={`View assessment ${assessment.createdAt}`}>
          View
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-semibold mb-2">Assessment Details</DialogTitle>
        <div className="space-y-2">
          <p><strong>ID:</strong> {assessment.id}</p>
          <p><strong>Archetype:</strong> {assessment.archetype}</p>
          <p><strong>Date:</strong> {new Intl.DateTimeFormat("en-US", {
            year: "numeric", month: "short", day: "numeric",
          }).format(new Date(assessment.createdAt))}</p>
          {isFlat && (
            <div>
              <h4 className="font-medium mt-4">Dimension Scores</h4>
              <ul className="list-disc list-inside">
                {dimScores.map(({ dimension, score }) => (
                  <li key={dimension}>{dimension}: {score.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HistoryTable({ assessments }: Props) {
  const [selected, setSelected] = useState<Assessment | null>(null);

  const isFlatAnswerMap = selected?.answers && typeof selected.answers === "object" && !Array.isArray(selected.answers);

  const dimScores = useMemo(() => {
    return isFlatAnswerMap ? Object.entries(computeAssessmentScores(selected!.answers).dimData).map(([dimension, score]) => ({ dimension, score })) : [];
  }, [selected]);

  if (assessments.length === 0) {
    return <p>No previous assessments.</p>;
  }
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-zinc-100">
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Archetype</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {assessments.map((a) => (
          <tr key={a.id} className="border-t">
            <td className="p-2">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(a.createdAt))}
            </td>
            <td className="p-2">{a.archetype}</td>
            <td className="p-2 text-right">
              <AssessmentDialog assessment={a} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}