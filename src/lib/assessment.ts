import { computeDimensionAverages, computeProfile } from "@/lib/scoring";

export type DimensionScore = {
  dimension: string;
  score: number;
};

export type ProfileItem = {
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

/**
 * Computes dimensional data and archetypal profile from answer map.
 * 
 * @param answers A flat object with question IDs as keys and numerical scores as values.
 * @returns Object containing dimData and profile arrays.
 */
export function computeAssessmentScores(
  answers: Record<string, number>
): { dimData: DimensionScore[]; profile: ProfileItem[] } {
  if (!answers || typeof answers !== "object") {
    throw new Error("Invalid input: answers must be a record of scores.");
  }

  const averages = computeDimensionAverages(answers);

  const dimData: DimensionScore[] = Object.entries(averages).map(
    ([dimension, score]) => ({
      dimension,
      score,
    })
  );

  const profile = computeProfile(answers) as ProfileItem[];

  return { dimData, profile };
}