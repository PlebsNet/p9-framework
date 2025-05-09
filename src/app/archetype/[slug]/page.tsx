import { Metadata } from "next";
import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { archetypeCentroids, Centroid } from "@/lib/archetypeCentroids";
import ArchetypeRadar from "@/components/ArchetypeRadar";
import { ArchetypeAvatars } from "@/components/ArchetypeAvatars";

interface ArchetypePageProps {
  params: { slug: string };
}

export function generateMetadata({
  params,
}: ArchetypePageProps): Metadata {
  const arch = archetypes.find((a) => a.slug === params.slug);
  return {
    title: arch ? `${arch.name} • P9 Archetypes` : "Archetype Not Found • P9",
    description:
      arch?.description || "Discover your P9 archetype profile and insights.",
  };
}

export default function ArchetypePage({ params }: ArchetypePageProps) {
  const archetype = archetypes.find((a) => a.slug === params.slug);
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

  const data: Centroid[] = archetypeCentroids[archetype.slug] || [];

  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Icon */}
      <header className="flex justify-center">
        {ArchetypeAvatars[archetype.slug]}
      </header>

      {/* Title & Description */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold">{archetype.name}</h1>
        <p className="text-gray-700">{archetype.description}</p>
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

      {/* Strengths */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Strengths</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {archetype.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Challenges</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {archetype.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {archetype.recommendations.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
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
