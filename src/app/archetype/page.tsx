import Image from "next/image";
import Link from "next/link";
import { ArchetypeGrid } from "@/components/ArchetypeGrid";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12">

      <div
        className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
          <ArchetypeGrid />
        </div>
      </div>
    </>
  );
}
