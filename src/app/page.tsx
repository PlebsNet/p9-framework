"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/components/Icons";
import { Header, HeaderTitle, HeaderSubtitle, HeaderDescription } from "@/components/ui/Header";
import { ArchetypeGallery } from "@/components/ArchetypeGallery";
import { useContainerSize } from '@/hooks/useContainerSize';
import DynamicGraph from '@/components/ForceGraph3D';

export default function Home() {
  const { containerRef, dimensions } = useContainerSize();

  return (
    <>
      <section className="flex flex-col items-center justify-center my-40">
        <Header>
          <HeaderSubtitle>
            Introducing Plebs
          </HeaderSubtitle>
          <HeaderTitle>
            Discover the P in Personality
          </HeaderTitle>
          <HeaderDescription>
            Scientific. Adaptive. Community-driven personality insights—powered by AI.
          </HeaderDescription>
        </Header>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/assessment">
                <span className="z-1">Take the Assessment</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/archetypes">
                <span className="z-1 gradient-text">Explore the Archetypes</span>
                <ChevronRight className="transition-transform duration-200 ease-out group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-12 my-40">
        <Header>
          {/* <HeaderSubtitle>
            Introducing Plebs
          </HeaderSubtitle> */}
          <HeaderTitle>
            Meet the Archetypes
          </HeaderTitle>
          <HeaderDescription>
            There are 9 archetypes under 3 clusters.
          </HeaderDescription>
        </Header>
    
        <ArchetypeGallery archetypes={archetypes} />
      </section>

      <section className="flex flex-col items-center justify-center gap-12 my-40">
        <Header>
          {/* <HeaderSubtitle>
            Introducing Plebs
          </HeaderSubtitle> */}
          <HeaderTitle>
            Meet the Archetypes
          </HeaderTitle>
          <HeaderDescription>
            There are 9 archetypes under 3 clusters.
          </HeaderDescription>
        </Header>

        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100vh',
            position: 'relative'
          }}
        >
          <DynamicGraph
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
      </section>
    </>
  );
}
