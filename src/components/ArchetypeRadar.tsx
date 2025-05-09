"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import type { Centroid } from "@/lib/archetypeCentroids";

interface ArchetypeRadarProps {
  data: Centroid[];
  slug: string;
  name: string;
  width?: number;
  height?: number;
  showTooltip?: boolean;
  withReferenceBands?: boolean;
  tickLabels?: boolean;
}

export default function ArchetypeRadar({
  data,
  slug,
  name,
  width = 300,
  height = 300,
  showTooltip = true,
  withReferenceBands = true,
  tickLabels = true,
}: ArchetypeRadarProps) {
  const chartData = data.map((d) => ({
    dimension: d.dimension,
    score: d[slug] as number,
  }));

  // Hydration guard for tooltip
  const [mounted, setMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | undefined>();
  const handleMouseMove = (e: any) => {
    if (e && typeof e.chartX === "number" && typeof e.chartY === "number") {
      setTooltipPos({ x: e.chartX, y: e.chartY });
    }
  };
  const handleMouseLeave = useCallback(() => {
    setTooltipPos(undefined);
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <RadarChart
      width={width}
      height={height}
      data={chartData}
      outerRadius={120}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" tick={tickLabels ? { fontSize: 12 } : false} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
      {withReferenceBands && (
        <>
          <Radar
            name="25th Percentile"
            dataKey={() => 25}
            stroke="#ddd"
            fill="#eee"
            fillOpacity={0.05}
            isAnimationActive={false}
          />
          <Radar
            name="50th Percentile"
            dataKey={() => 50}
            stroke="#ccc"
            fill="#ccc"
            fillOpacity={0.05}
            isAnimationActive={false}
          />
          <Radar
            name="75th Percentile"
            dataKey={() => 75}
            stroke="#ddd"
            fill="#eee"
            fillOpacity={0.05}
            isAnimationActive={false}
          />
        </>
      )}
      <Radar
        dataKey="score"
        stroke="#3a5fcd"
        fill="#3a5fcd"
        fillOpacity={0.8}
      />
      {showTooltip && tooltipPos && (
        <Tooltip
          position={tooltipPos}
          wrapperStyle={{
            pointerEvents: "none",
            transition: "opacity 150ms ease-in-out",
            opacity: tooltipPos ? 1 : 0,
          }}
          contentStyle={{
            backgroundColor: "#000",
            borderRadius: 10,
            padding: "8px 12px",
            border: "none",
          }}
          labelStyle={{
            fontSize: "0.85rem",
            marginBottom: 4,
          }}
          itemStyle={{
            color: "#fff",
            fontSize: "1rem",
          }}
          labelFormatter={() => name}
          formatter={(value, key, props) => {
            const dim = props?.payload?.dimension ?? key;
            return [`${value}`, `${dim}`];
          }}
        />
      )}
    </RadarChart>
  );
}