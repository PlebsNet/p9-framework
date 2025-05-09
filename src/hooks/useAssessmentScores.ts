import { useEffect, useState } from "react";
import { computeDimensionAverages, computeProfile } from "@/lib/scoring";
import { Dimension } from "@/lib/archetypeCentroids";
import type { Centroid } from "@/lib/archetypeCentroids";

type DimensionScore = { dimension: Dimension; score: number };

type ProfileItem = {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  applications: {
    growth: string[];
    collaboration: string[];
    career: string[];
  };
  score: number;
  rank: number;
  primaryLabel?: string;
};

export function useAssessmentScores(
  answers: Record<string, number> | null | undefined
): {
  dimData: Centroid[];
  profile: ProfileItem[];
  loading: boolean;
} {
  const [dimData, setDimData] = useState<Centroid[]>([]);
  const [profile, setProfile] = useState<ProfileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!answers || typeof answers !== "object") {
      setDimData([]);
      setProfile([]);
      setLoading(false);
      return;
    }

    try {
      const averages = computeDimensionAverages(answers);
      const computedProfile = computeProfile(answers) as ProfileItem[];
      
      // Get the primary archetype
      const primary = computedProfile[0];
      if (!primary) throw new Error("No primary archetype found");

      // Format data for radar chart
      setDimData(
        Object.entries(averages).map(([dimension, score]) => ({
          dimension: dimension as Dimension,
          [primary.slug]: score * 100 // Scale to 0-100 range like centroids
        }))
      );
      setProfile(computedProfile);
    } catch (error) {
      console.error("Failed to compute scores", error);
      setDimData([]);
      setProfile([]);
    } finally {
      setLoading(false);
    }
  }, [answers]);

  return { dimData, profile, loading };
}
