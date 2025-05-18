"use client";

import { useState } from "react";
import { scaleScoreTo100, computeDimensionAverages } from "@/lib/scoring";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";
import type { Dimension } from "@/lib/archetypeCentroids";
import type { ProfileItem } from "@/lib/assessment";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";

type ProfileItemWithExtras = ProfileItem & {
  primaryTraits?: Dimension[];
  cognitiveFrame?: string;
};

export default function ProfileClient({
  dimData,
  primary,
  assessments,
}: {
  dimData: { dimension: Dimension; score: number }[];
  primary: ProfileItemWithExtras | null;
  assessments: { answers: Record<string, number>; archetype: string; createdAt: string }[];
}) {
  const allTraitNames = dimData.map((d) => d.dimension);
  const [selectedTrait, setSelectedTrait] = useState<Dimension>(allTraitNames[0]);

  const trendData = assessments.map((a) => {
    const avgs = computeDimensionAverages(a.answers);
    return {
      date: new Date(a.createdAt).toLocaleDateString(),
      score: scaleScoreTo100(avgs[selectedTrait] ?? 0),
    };
  });

  const prevAssessment = assessments.length > 1 ? assessments[1] : null;

  const deltas = prevAssessment
    ? dimData
        .map(({ dimension, score }) => {
          const prevAvg = computeDimensionAverages(prevAssessment.answers)[dimension] ?? 0;
          const diff = scaleScoreTo100(score) - scaleScoreTo100(prevAvg);
          return { dimension, diff };
        })
        .filter((d) => d.diff !== 0)
    : [];

  return (
    <div className="space-y-8 flex flex-col gap-4">
      {primary && (primary.slug as keyof typeof ArchetypeAvatars) in ArchetypeAvatars && (
        <div className="flex items-start space-x-4">
          <div className="text-4xl">{ArchetypeAvatars[primary.slug as keyof typeof ArchetypeAvatars]}</div>
          <div>
            <h3 className="text-xl font-semibold">{primary.name}</h3>
            <p className="mt-1 mb-2">Score: {scaleScoreTo100(primary.score).toFixed(0)}%</p>
            {primary.primaryLabel && (
              <p className="text-sm text-gray-600 italic">Label: {primary.primaryLabel}</p>
            )}
            <p className="mb-2">{primary.description}</p>
            {primary.cognitiveFrame && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Cognitive frame:</span> {primary.cognitiveFrame}
              </p>
            )}
            {primary.primaryTraits && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Primary traits:</span>{" "}
                {primary.primaryTraits.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {primary && (
        <p className="text-sm text-gray-500 italic mt-2 ">
          You scored highly in {primary.primaryTraits?.slice(0, 2).join(" and ")}, aligning you with the <strong>{primary.name}</strong> archetype.
        </p>
      )}

      <ArchetypeRadar
        data={dimData.map((d) => ({
          dimension: d.dimension,
          user: Number(scaleScoreTo100(d.score).toFixed(1)),
        }))}
        slug="user"
        name="Your Scores"
        withReferenceBands
        showTooltip
      />

      <div className="bg-gray-800 rounded-lg p-6 shadow-sm space-y-1 text-sm text-gray-600">
        <h4 className="font-semibold">Top Traits</h4>
        {[...dimData]
          .sort((a, b) => scaleScoreTo100(b.score) - scaleScoreTo100(a.score))
          .slice(0, 5)
          .map((d) => (
            <p key={d.dimension}>
              {d.dimension}: {scaleScoreTo100(d.score).toFixed(0)}%
            </p>
          ))}
        <p className="text-xs text-gray-500">
          Scores reflect your alignment with each trait, scaled from 0–100%.
        </p>
      </div>

      {selectedTrait && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="space-y-2 bg-gray-800 rounded-lg p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Track a Trait Over Time
          </h3>
          <select
            value={selectedTrait}
            onChange={(e) => setSelectedTrait(e.target.value as Dimension)}
            className="mb-2 p-1 rounded border text-sm"
          >
            {allTraitNames.map((trait) => (
              <option key={trait} value={trait}>
                {trait}
              </option>
            ))}
          </select>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis domain={[0, 100]} fontSize={10} />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
          {assessments.length > 1 && (
            <div className="space-y-2 bg-gray-800 rounded-lg p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">Your archetype journey</h3>
                <p>{assessments.map((a) => a.archetype).join(" → ")}</p>
              </div>
              <div>
                <h4 className="font-semibold">What’s changed since your last test</h4>
                <ul>
                  {deltas.map((d) => (
                    <li key={d.dimension}>
                      {d.dimension}: {d.diff > 0 ? "+" : ""}
                      {d.diff.toFixed(1)}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}