"use client"; 

import { use } from "react"; 
import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { archetypeCentroids, Centroid } from "@/lib/archetypeCentroids";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";
import type { Dimension } from "@/lib/archetypeCentroids";
import { Header, HeaderDescription, HeaderSubtitle, HeaderTitle } from "@/components/ui/Header";
import { ChevronLeft } from "@/components/Icons";


type Params = Promise<{ slug: string }>;

export default function Page({ params }: { params: Params }) {
  const { slug } = use(params);
  
  const archetype = archetypes.find((a) => a.slug === slug);
  if (!archetype) return 

  const rawData: Centroid[] = archetypeCentroids[archetype.slug] || [];
  const data = rawData.map(d => ({
    dimension: d.dimension as Dimension,
    [archetype.slug]: d[archetype.slug] as number,
  }));

  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8" aria-labelledby={`archetype-${archetype.slug}`}>
      <Link href="/" className="text-sm hover:text-gray-50 transition flex items-center gap-1">
        <ChevronLeft /> Go Back
      </Link>

      <Header>
        <HeaderSubtitle>
          <div className="flex justify-center h-16">
          {ArchetypeAvatars[archetype.slug as keyof typeof ArchetypeAvatars]}
          </div>
        </HeaderSubtitle>
        <HeaderTitle>
          {archetype.name}
        </HeaderTitle>
        <HeaderDescription>
          {archetype.signature}
        </HeaderDescription>
      </Header>

      {/* Radar Chart */}
      <section aria-labelledby="radar-chart-heading">
        <h2 id="radar-chart-heading" className="sr-only">
          {archetype.name} Profile Radar
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-lg shadow-sm">
          <div className="flex justify-center">
            <ArchetypeRadar
              data={data}
              slug={archetype.slug}
              name={archetype.name}
              withReferenceBands
              showTooltip
            />
          </div>
        </div>
      </section>

      {/* Psychometric Profile */}
      <section
        aria-labelledby="psychometric-profile-heading"
        className="space-y-8 bg-gray-50 dark:bg-gray-900/30 p-6 rounded-lg shadow-sm"
      >
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
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Strengths</h3>
            <ul className="list-disc list-inside space-y-1">
              {archetype.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Challenges */}
        <section>
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Challenges</h3>
            <ul className="list-disc list-inside space-y-1">
              {archetype.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1">
              {archetype.recommendations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </article>
  );
}
