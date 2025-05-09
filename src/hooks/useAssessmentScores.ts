import { useEffect, useState } from "react";
import { computeDimensionAverages, computeProfile } from "@/lib/scoring";

type DimensionScore = { dimension: string; score: number };

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
  dimData: DimensionScore[];
  profile: ProfileItem[];
  loading: boolean;
} {
  const [dimData, setDimData] = useState<DimensionScore[]>([]);
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

      setDimData(
        Object.entries(averages).map(([dimension, score]) => ({
          dimension,
          score,
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
