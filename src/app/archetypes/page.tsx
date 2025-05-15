import { Suspense } from "react";
import ArchetypesContent from "./ArchetypesContent";

export default function ArchetypesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading archetypes…</div>}>
      <ArchetypesContent />
    </Suspense>
  );
}