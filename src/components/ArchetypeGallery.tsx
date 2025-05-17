"use client";

import { ArchetypeCard } from "./ArchetypeCard";
import { archetypeCentroids } from "@/lib/archetypeCentroids";
import type { Archetype } from "@/lib/archetypes";
import type { ArchetypeSlug } from "@/components/ArchetypeAvatars";

export function ArchetypeGallery({ archetypes }: { archetypes: Archetype[] }) {
  return (
    <div className="max-xl:flex-wrap overflow-x-auto scrollbar-hide w-full flex px-6 py-8 align-center justify-center">
      {archetypes.map((a: Archetype) => {
        const slug = a.slug as ArchetypeSlug;
        const centroid = archetypeCentroids[slug];

        return (
            <ArchetypeCard
              key={slug}
              slug={slug}
              centroid={centroid}
            />
        );
      })}
    </div>
  );
}