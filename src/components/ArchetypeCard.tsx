"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { Centroid } from "@/lib/archetypeCentroids";
import { archetypes } from "@/lib/archetypes";
import { ArchetypeAvatars, type ArchetypeSlug } from "./ArchetypeAvatars";

interface Props {
  slug: ArchetypeSlug;
  centroid: Centroid[];
}

export function ArchetypeCard({ slug }: Props) {
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
          className={`m-1 relative h-[550px] rounded-xl bg-gray-800 p-4 shadow-md hover:shadow-xl flex flex-col items-start justify-between overflow-hidden group opacity-50 transition-opacity hover:opacity-100 ${isHovered ? "z-30" : "z-10"}`}
        >
          <div className=" w-full h-16">
            {ArchetypeAvatars[slug]}
          </div>
          <div className="mt-4 w-[240px] opacity-0 group-hover:opacity-100 transition-all">
            <h3 className="font-semibold text-xl mb-1">{name}</h3>
            <p className="text-xs mb-3">{signature}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
