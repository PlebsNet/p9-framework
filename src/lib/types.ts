
import type { Dimension } from "@/lib/archetypeCentroids";
import type { ProfileItem } from "@/lib/assessment";

export type ProfileItemWithExtras = ProfileItem & {
  primaryTraits?: Dimension[];
  cognitiveFrame?: string;
};