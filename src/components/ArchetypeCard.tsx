"use client";

import Link from "next/link";
import { Centroid } from "@/lib/archetypeCentroids";
import { archetypes, type Archetype } from "@/lib/archetypes";
import { ArchetypeAvatars, type ArchetypeSlug } from "./ArchetypeAvatars";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { Plus } from '@/components/Icons';
import type { Dimension } from "@/lib/archetypeCentroids";

interface Props {
  slug: ArchetypeSlug;
  centroid: Centroid[];
}

export function ArchetypeCard({ slug, centroid }: Props) {
  const archetype = archetypes.find((a) => a.slug === slug);
  if (!archetype) {
    throw new Error(`Unknown archetype slug "${slug}"`);
  }
  const { name, signature } = archetype;

  const scaledCentroid = centroid.map((d) => ({
    dimension: d.dimension as Dimension,
    [slug]: d[slug] as number,
  }));

  return (
    <Link
      href={`/archetypes/${slug}`}
      className="group rounded-2xl bg-zinc-900 border hover:bg-zinc-800/60 border-zinc-800 p-6 shadow hover:shadow-lg transition flex flex-col items-center"
    >
      <div className="mb-4 w-16 h-16">
        {ArchetypeAvatars[slug]}
      </div>

      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-center mb-4">{signature}</p>

      <ArchetypeRadar
        data={scaledCentroid}
        slug={slug}
        name={name}
        withReferenceBands
        showTooltip
      />

      <div className="mt-4 text-center text-xs text-zinc-400">
        {archetype.cognitiveFrame && (
          <p className="mb-1">
            <span className="font-medium text-zinc-300">Cognitive frame:</span>{" "}
            {archetype.cognitiveFrame}
          </p>
        )}
        {archetype.primaryTraits && (
          <p>
            <span className="font-medium text-zinc-300">Primary traits:</span>{" "}
            {archetype.primaryTraits.join(", ")}
          </p>
        )}
      </div>
      
      <span className="self-end group-hover:border-zinc-800 group-hover:bg-zinc-800 flex items-center border border-zinc-800 rounded-full justify-center m-0 p-0 transition-all duration-150 ease-in-out h-12 w-12">
        <Plus />
      </span>
    </Link>
  );
}
