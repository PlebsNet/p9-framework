// Results service to handle scoring functionality
import { computeProfile, computeDimensionAverages } from "@/lib/scoring";
import { getAnswers } from "@/app/questionnaire/services/storageService";

/**
 * Gets the stored answers
 */
export function getStoredAnswers(): Record<string, number> | null {
  return getAnswers();
}

/**
 * Computes the dimension data for the radar chart
 */
export function getDimensionData(answers: Record<string, number>) {
  const averages = computeDimensionAverages(answers);
  return Object.entries(averages).map(([dimension, score]) => ({ dimension, score }));
}

/**
 * Computes the archetype profile based on answers
 */
export function getArchetypeProfile(answers: Record<string, number>) {
  return computeProfile(answers);
} 