"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { Centroid } from "@/lib/archetypeCentroids";
import { archetypes } from "@/lib/archetypes";
import { ARCH_CLUSTER, CLUSTER_COLOR, ArchetypeAvatars, type ArchetypeSlug } from "./ArchetypeAvatars";
import ArchetypeCardEffect from '@/components/ArchetypeCardEffect';

interface Props {
  slug: ArchetypeSlug;
  centroid: Centroid[];
};

export function ArchetypeCard({ slug }: Props) {
  const clusterKey = ARCH_CLUSTER[slug]
  const mainColor = CLUSTER_COLOR[clusterKey];
  const archetype = archetypes.find((a) => a.slug === slug);

  if (!archetype) {
    throw new Error(`Unknown archetype slug "${slug}"`);
  };

  const { name, signature } = archetype;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView && { opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Link href={`/archetypes/${slug}`}>
        <motion.div
          initial={{ width: 120 }}
          animate={isHovered ? { width: 240 } : { width: 120 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className={`max-md:aspect-square m-1 relative h-[550px] rounded-xl bg-gray-800 shadow-md hover:shadow-xl flex flex-col items-start justify-between overflow-hidden group border-transparent hover:border-gray-800 transition-border transition-opacity ${isHovered ? "z-30" : "z-10"}`}
        >
          <ArchetypeCardEffect mainColor={mainColor}>
            <div className="flex flex-col w-full h-full">
              <div className="w-full h-16">
                {ArchetypeAvatars[slug]}
              </div>
              <div className="mt-auto pt-4 min-w-[240px] opacity-0 group-hover:opacity-100 transition-all">
                <h3 className="font-semibold text-xl mb-1">{name}</h3>
                <p className="text-xs mb-3">{signature}</p>
              </div>
            </div>
          </ArchetypeCardEffect>
        </motion.div>
      </Link>
    </motion.div>
  );
}
