"use client";

import { archetypes, type Archetype } from "@/lib/archetypes";
import { archetypeCentroids } from "@/lib/archetypeCentroids";
import { ArchetypeCard } from "./ArchetypeCard";
import type { ArchetypeSlug } from "./ArchetypeAvatars";

export function ArchetypeGrid() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Meet the Archetypes
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
    </section>
  );
}
