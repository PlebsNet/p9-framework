import { questions } from "@/app/questionnaire/components/questions";
import { archetypes, Archetype } from "./archetypes";
import { Dimension, archetypeCentroids } from "./archetypeCentroids";
import { z } from "zod";

const ThresholdConfig = z.object({
  PRIMARY_MIN: z.number().min(0).max(1),
  SECONDARY_MIN: z.number().min(0).max(1),
  MULTI_MIN: z.number().min(0).max(1),
  DUALCORE_GAP: z.number().min(0).max(1),
});

export type ThresholdConfig = z.infer<typeof ThresholdConfig>;
export const T: ThresholdConfig = ThresholdConfig.parse({
  PRIMARY_MIN: 0.7,
  SECONDARY_MIN: 0.3,
  MULTI_MIN: 0.5,
  DUALCORE_GAP: 0.15,
});

export type QuestionId = typeof questions[number]['id'];
export type Answers = Record<QuestionId, number>;

// 1) Map Likert 1–7 to –3...+3
export function mapLikert(raw: number): number {
  return raw - 4;
};

// 2) Initialize buckets for all dimensions based on questions
function initBuckets(): Record<Dimension, number[]> {
  // Collect all unique dimensions from questions' dimensions arrays
  const dims = Array.from(
    new Set(
      questions.flatMap(q =>
        Array.isArray(q.dimensions)
          ? q.dimensions
          : (q.dimensions ? [q.dimensions] : [])
      )
    )
  ) as Dimension[];
  const buckets: Record<Dimension, number[]> = {} as any;
  dims.forEach(dim => { buckets[dim] = []; });
  return buckets;
}

// 3) Group and average
function groupByDimension(answers: Answers) {
  const buckets = initBuckets();
  for (const q of questions) {
    // Support multi-dimensional questions
    const dims = Array.isArray(q.dimensions)
      ? q.dimensions
      : (q.dimensions ? [q.dimensions] : []);
    let raw = answers[q.id] ?? 4;
    if (q.reverse) raw = 8 - raw;
    const value = mapLikert(raw);
    const weight = typeof (q as any).weight === "number" ? (q as any).weight : 1.0;
    for (const dim of dims) {
      if (!buckets[dim]) continue;
      buckets[dim].push(value * weight);
    }
  }
  return buckets;
}

export function computeDimensionAverages(
  answers: Answers
): Record<Dimension, number> {
  const grouped = groupByDimension(answers);
  const avgs: Record<Dimension, number> = {} as any;
  for (const dim in grouped) {
    const vals = grouped[dim as Dimension];
    avgs[dim as Dimension] = vals.length
      ? vals.reduce((sum, v) => sum + v, 0) / vals.length
      : 0;
  }
  return avgs;
};

// 4) Compute archetype similarity scores
function scaleTo100(x: number): number {
  return ((x + 3) / 6) * 100;
};

function computeDistances(
  user: Record<Dimension, number>
): Record<string, number> {
  const distances: Record<string, number> = {};
  for (const [slug, centroids] of Object.entries(archetypeCentroids)) {
    let sumSq = 0;
    centroids.forEach(c => {
      const dim = c.dimension;
      const u = scaleTo100(user[dim] ?? 0);
      const cent = c[slug] as number;
      sumSq += (u - cent) ** 2;
    });
    distances[slug] = Math.sqrt(sumSq);
  }
  return distances;
};

export function computeArchetypeScores(
  dimAvgs: Record<Dimension, number>
): Record<string, number> {
  const distances = computeDistances(dimAvgs);
  // normalize to similarity 0–1
  const maxDist = Math.max(...Object.values(distances));
  const scores: Record<string, number> = {};
  Object.entries(distances).forEach(([slug, d]) => {
    scores[slug] = maxDist > 0 ? (maxDist - d) / maxDist : 0;
  });
  return scores;
};

// 5) Label rules engine
interface LabelRule { condition: (s: number[]) => boolean; formatter: (n: string[]) => string; }
const labelRules: LabelRule[] = [
  { condition: ([s1]) => s1 >= T.PRIMARY_MIN, formatter: ([n1]) => n1 },
  { condition: ([s1, s2]) => s1 - s2 <= T.DUALCORE_GAP && s2 >= T.SECONDARY_MIN, formatter: ([n1, n2]) => `Dual-Core ${n1}–${n2}` },
  { condition: ([s1, s2]) => s1 >= T.MULTI_MIN && s2 >= T.SECONDARY_MIN, formatter: ([n1]) => `Multifaceted ${n1}` },
  { condition: ([s1, s2, s3]) => s1 <= T.MULTI_MIN && s2 >= T.SECONDARY_MIN && s3 >= T.SECONDARY_MIN, formatter: ([n1, n2, n3]) => `Generalist ${n1}–${n2}–${n3}` }
];

export interface ProfileItem extends Archetype { score: number; rank: number; primaryLabel?: string; }
export function computeProfile(answers: Answers): ProfileItem[] {
  const dimAvgs = computeDimensionAverages(answers);
  const rawScores = computeArchetypeScores(dimAvgs);
  const sorted = archetypes.map(a => ({ ...a, score: rawScores[a.slug] ?? 0 }))
    .sort((a, b) => b.score - a.score);
  const scores = sorted.map(a => a.score);
  const names = sorted.map(a => a.name);
  const rule = labelRules.find(r => r.condition(scores));
  const primaryLabel = rule ? rule.formatter(names) : names[0];
  return sorted.map((a, i) => ({ ...a, rank: i + 1, primaryLabel: i === 0 ? primaryLabel : undefined }));
};
