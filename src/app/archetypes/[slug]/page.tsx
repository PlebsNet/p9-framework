"use client"; 

import { use } from "react"; 
import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { archetypeCentroids, Centroid } from "@/lib/archetypeCentroids";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";
import type { Dimension } from "@/lib/archetypeCentroids";


type Params = Promise<{ slug: string }>;

export default function Page({ params }: { params: Params }) {
  const { slug } = use(params);
  
  const archetype = archetypes.find((a) => a.slug === slug);
  if (!archetype) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Archetype Not Found</h1>
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          ← Back to Archetype Grid
        </Link>
      </main>
    );
  }

  const rawData: Centroid[] = archetypeCentroids[archetype.slug] || [];
  const data = rawData.map(d => ({
    dimension: d.dimension as Dimension,
    [archetype.slug]: d[archetype.slug] as number,
  }));

  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8" aria-labelledby={`archetype-${archetype.slug}`}>
      {/* Icon */}
      <header className="flex justify-center">
        {ArchetypeAvatars[archetype.slug as keyof typeof ArchetypeAvatars]}
      </header>

      {/* Title & Description */}
      <section className="text-center space-y-2">
        <h1 id={`archetype-${archetype.slug}`} className="text-4xl font-bold">{archetype.name}</h1>
        <p className="text-gray-700 text-lg">{archetype.signature}</p>
      </section>

      {/* Radar Chart */}
      <section aria-labelledby="radar-chart-heading">
        <h2 id="radar-chart-heading" className="sr-only">
          {archetype.name} Profile Radar
        </h2>
        <div className="flex justify-center">
          <ArchetypeRadar
            data={data}
            slug={archetype.slug}
            name={archetype.name}
            withReferenceBands
            showTooltip
          />
        </div>
      </section>

      {/* Psychometric Profile */}
      <section aria-labelledby="psychometric-profile-heading" className="space-y-8">
        <h2 id="psychometric-profile-heading" className="text-2xl font-semibold">Psychometric Profile</h2>
        <p className="text-gray-700">{archetype.description}</p>
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          {archetype.cognitiveFrame && (
            <p>
              <span className="font-semibold">Cognitive frame:</span> {archetype.cognitiveFrame}
            </p>
          )}
          {archetype.primaryTraits && (
            <p>
              <span className="font-semibold">Primary traits:</span> {archetype.primaryTraits.join(", ")}
            </p>
          )}
        </div>

        {/* Strengths */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Strengths</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {archetype.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        {/* Challenges */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Challenges</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {archetype.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Recommendations */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {archetype.recommendations.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </section>

      {/* Back Link */}
      <footer className="text-center">
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          ← Back to Archetype Grid
        </Link>
      </footer>
    </article>
  );
}
