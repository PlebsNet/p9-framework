"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArchetypeGallery } from "@/components/ArchetypeGallery";
import { archetypes } from "@/lib/archetypes";
import type { Dimension } from "@/lib/archetypeCentroids";

export default function ArchetypesContent() {
  const allDimensions: Dimension[] = [
    "Honesty-Humility", "Emotionality", "Extraversion", "Agreeableness",
    "Conscientiousness", "Openness", "Adaptability", "Analytical",
    "Pragmatic", "Strategic", "Intrinsic", "Extrinsic", "Values",
  ];

  const [selected, setSelected] = useState<Dimension[]>([]);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const dims = searchParams.get("dimensions");
    if (dims) {
      const parsed = dims
        .split(",")
        .filter((dim): dim is Dimension => allDimensions.includes(dim as Dimension));
      setSelected(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelectedDimension = (dim: Dimension) => {
    const updated = selected.includes(dim)
      ? selected.filter((d) => d !== dim)
      : [...selected, dim];
    setSelected(updated);
    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set("dimensions", updated.join(","));
    } else {
      params.delete("dimensions");
    }
    router.push(`?${params.toString()}`);
  };

  const filteredArchetypes = archetypes.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.signature?.toLowerCase().includes(search.toLowerCase()) ||
      a.description?.toLowerCase().includes(search.toLowerCase());
    const matchesDimension =
      selected.length === 0 || selected.some((dim) => a.primaryTraits?.includes(dim));
    return matchesSearch && matchesDimension;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search archetypes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 p-4">
          {allDimensions.map((dim) => (
            <button
              key={dim}
              onClick={() => toggleSelectedDimension(dim)}
              aria-pressed={selected.includes(dim)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors duration-150 ${selected.includes(dim)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {dim}
            </button>
          ))}
        </div>
        <div className="w-full text-center mt-2 space-y-1">
          {selected.length > 0 && (
            <button
              onClick={() => {
                setSelected([]);
                const params = new URLSearchParams(searchParams.toString());
                params.delete("dimensions");
                router.push(`?${params.toString()}`);
              }}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Clear filters
            </button>
          )}
          <p className="text-sm text-gray-500">
            Showing {filteredArchetypes.length} of {archetypes.length} archetypes
          </p>
        </div>
        <ArchetypeGallery archetypes={filteredArchetypes} />
      </div>
    </div>
  );
}