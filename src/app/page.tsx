import Image from "next/image";
import Link from "next/link";
import { ArchetypeGrid } from "@/components/ArchetypeGrid";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12">
        <h2 className="flex flex-col items-center justify-center gap-2 text-[48px] leading-[72px]">
          Discover Your P9 Archetype
        </h2>
        <p>Scientific. Adaptive. Community-driven personality insights—powered by AI.</p>
        <Link
          href="/questionnaire"
          className="cursor-pointer overflow-hidden relative flex flex-row items-end justify-between gap-2 aspect-[9/3.5] w-[206px] p-3 rounded-md text-sm text-[var(--background)] bg-[var(--brand)] after:content-[''] after:absolute after:inset-0 after:bg-[var(--brand)] after:[image-rendering:pixelated] after:bg-[url('/crystal.webp')] after:bg-no-repeat after:bg-center after:[object-fit:50%] after:[filter:url('/duotone.svg#crystal')] after:opacity-0 after:transition-opacity after:duration-150 after:ease-in-out hover:after:opacity-100"
        >
          <span className="z-1">Take the P9 Assessment</span>
          <svg className="z-1" width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </Link>
        <Link
          href="/questionnaire"
          className="cursor-pointer overflow-hidden relative flex flex-row items-end justify-between gap-2 aspect-[9/3.5] w-[206px] p-3 rounded-md text-sm text-[var(--foreground)] bg-[var(--background)] hover:after:opacity-100"
        >
          <span className="z-1">Explore Archetypes</span>
          <svg className="z-1" width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </Link>
      </div>

      <div
        className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <ArchetypeGrid />
      </div>
    </>
  );
}
