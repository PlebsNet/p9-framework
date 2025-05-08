"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { Centroid } from "@/lib/archetypeCentroids";

interface ArchetypeRadarProps {
  slug: string;
  name: string;
  // We know each Centroid has a `dimension` and also a numeric value at [slug]
  data: Centroid[];
}

export default function ArchetypeRadar({
  slug,
  name,
  data,
}: ArchetypeRadarProps) {
  // Map Centroid[] to the shape recharts expects
  const chartData = data.map((d) => ({
    dimension: d.dimension,
    // TS knows Centroid has an index signature for slug
    score: d[slug] as number,
  }));

  return (
    <RadarChart width={300} height={300} data={chartData} outerRadius={120}>
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      <Radar
        name={name}
        dataKey="score"
        stroke="#7598F9"
        fill="#7598F9"
        fillOpacity={0.6}
      />
      <Tooltip />
    </RadarChart>
  );
}
