"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { Centroid } from "@/lib/archetypeCentroids";

interface Props {
  data: Centroid[];   // array of { dimension, [slug]: number }
  slug: string;       // key in each object to extract the score
  name: string;       // for the legend
}

export default function ClientRadar({ data, slug, name }: Props) {
  // Only render chart after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  // Track whether we've ever moved (so we don't flash 0,0), allow 'undefined' when hidden
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | undefined>();

  const handleMouseMove = (e: any) => {
    if (e && typeof e.chartX === "number" && typeof e.chartY === "number") {
      setTooltipPos({ x: e.chartX, y: e.chartY });
    }
  };

  // Hide on mouse leave
  const handleMouseLeave = useCallback((e: any) => {
    setTooltipPos(undefined);
  }, []);

  if (!mounted) return null;
  
  const chartData = data.map((item) => ({
    dimension: item.dimension,
    score: item[slug] as number,
  }));

  return (
    <RadarChart
      width={200}
      height={200}
      data={chartData}
      outerRadius="70%"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <PolarGrid />
      <PolarAngleAxis name="Score"  dataKey="dimension" tick={false} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />

      <Radar
        name="Score"
        dataKey="score"
        stroke="#4F46E5"
        fill="#4F46E5"
        fillOpacity={0.6}
        isAnimationActive={false}
      />

      {tooltipPos && (
        <Tooltip
          position={tooltipPos}
          // Outer wrapper (to disable pointer events, etc.)
          wrapperStyle={{
            pointerEvents: "none",
            transition: "opacity 150ms ease-in-out",
            opacity: tooltipPos ? 1 : 0,
          }}
          // Tooltip “box” itself
          contentStyle={{
            backgroundColor: "#000",
            borderRadius: 10,
            padding: "8px 12px",
            border: "none",
          }}
          // Style the “label” line (i.e. dimension name)
          labelStyle={{
            fontSize: "0.85rem",
            marginBottom: 4,
          }}
          // Style each item (i.e. score)
          itemStyle={{
            color: "#fff",
            fontSize: "1rem",
          }}
          labelFormatter={() => name}
          formatter={(value, key) => [`${value}`, `${key}`]}
        />
      )}
    </RadarChart>
  );
}
