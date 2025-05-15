"use client";

import React, { ReactNode } from "react";

// All valid slugs
export type ArchetypeSlug =
  | "visionary"
  | "innovator"
  | "investigator"
  | "commander"
  | "strategist"
  | "guardian"
  | "influencer"
  | "mediator"
  | "integrator";

// Cluster colors (as literal)
const CLUSTER_COLOR = {
  explorer: "#65E2E2",
  executor: "#E2B865",
  enabler: "#E265E2",
} as const;

// Assign each archetype to a cluster
const ARCH_CLUSTER: Record<ArchetypeSlug, keyof typeof CLUSTER_COLOR> = {
  visionary: "explorer",
  innovator: "explorer",
  integrator: "explorer",
  commander: "executor",
  strategist: "executor",
  influencer: "executor",
  guardian: "enabler",
  mediator: "enabler",
  investigator: "enabler",
};

// Silhouette outline (simplified head+shoulders)
const SILHOUETTE_PATH =
  "M32 4C21 4 12 12 12 23v18c0 11 9 19 20 19s20-8 20-19V23c0-11-9-19-20-19z";

// Signature shapes
function Signature({ slug }: { slug: ArchetypeSlug }) {
  const color = CLUSTER_COLOR[ARCH_CLUSTER[slug]];
  const sigProps = {
    stroke: color,
    strokeWidth: 2 as const,
    fill: "none" as const,
    strokeLinecap: "round" as const,
  };

  switch (slug) {
    case "visionary":
      return (
        <>
          <circle cx="32" cy="32" r="3" {...sigProps} />
          <circle cx="32" cy="32" r="9" {...sigProps} />
          <circle cx="32" cy="32" r="15" {...sigProps} />
        </>
      );
    case "innovator":
      return <circle cx="32" cy="32" r="10" {...sigProps} />;
    case "investigator":
      return (
        <>
          <line x1="32" y1="24" x2="32" y2="18" {...sigProps} />
          <line x1="32" y1="40" x2="32" y2="46" {...sigProps} />
          <line x1="18" y1="32" x2="24" y2="32" {...sigProps} />
          <line x1="40" y1="32" x2="46" y2="32" {...sigProps} />
          <rect width="16" height="16" x="24" y="24" {...sigProps} />
        </>
      );
    case "commander":
      return (
        <>  
          <line x1="40" y1="38" x2="32" y2="26" {...sigProps} />
          <line x1="24" y1="38" x2="32" y2="26" {...sigProps} />
          <line x1="24" y1="38" x2="40" y2="38" {...sigProps} />
        </>  
      );
    case "strategist":
      return (
        <>
          <circle cx="32" cy="24" r="2" {...sigProps} />
          <circle cx="23" cy="38" r="2" {...sigProps} />
          <circle cx="41" cy="38" r="2" {...sigProps} />
          <path d="M32 26 L32 34 M32 34 L26 37 M32 34 L38 37" {...sigProps} />
        </>
      );
    case "guardian":
      return (
        <>
          <rect width="20" height="20" x="22" y="22" {...sigProps} />
          <line x1="22" y1="27" x2="32" y2="27" {...sigProps} />
          <line x1="37" y1="22" x2="37" y2="32" {...sigProps} />
          <line x1="32" y1="37" x2="42" y2="37" {...sigProps} />
          <line x1="27" y1="42" x2="27" y2="32" {...sigProps} />
        </>
      );
    case "influencer":
      return (
        <>
          <line x1="28" y1="24" x2="28" y2="44" {...sigProps} />
          <line x1="32" y1="24" x2="32" y2="44" {...sigProps} />
          <line x1="36" y1="24" x2="36" y2="44" {...sigProps} />
        </>
      );
    case "mediator":
      return (
        <>
          <line x1="20" y1="32" x2="32" y2="20" {...sigProps} />
          <line x1="20" y1="32" x2="32" y2="44" {...sigProps} />
          <line x1="44" y1="32" x2="32" y2="44" {...sigProps} />
          <line x1="32" y1="20" x2="44" y2="32" {...sigProps} />
        </>
      );
    case "integrator":
      return (
        <>
          <circle cx="28" cy="32" r="10" {...sigProps} />
          <circle cx="36" cy="32" r="10" {...sigProps} />
        </>
      );
    default:
      return null;
  }
}

// Build the final SVG for each slug
export const ArchetypeAvatars: Record<ArchetypeSlug, ReactNode> =
  (Object.keys(ARCH_CLUSTER) as ArchetypeSlug[]).reduce((acc, slug) => {
    const color = CLUSTER_COLOR[ARCH_CLUSTER[slug]];

    acc[slug] = (
      <svg
        key={slug}
        viewBox="0 0 64 64"
        className="w-12 h-12 overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id={`blur-${slug}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>

        <ellipse
          cx="32"
          cy="32"
          rx="30"
          ry="28"
          fill={color}
          filter={`url(#blur-${slug})`}
          transform="rotate(-10 32 32)"
        />

        <path
          d={SILHOUETTE_PATH}
          fill="#FFF"
          stroke={color}
          strokeWidth={3}
        />

        <Signature slug={slug} />
      </svg>
    );

    return acc;
  }, {} as Record<ArchetypeSlug, ReactNode>);
