"use client";
import Link from "next/link";
import { ReactNode } from "react";


export default function DaosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-4">
          <Link href="/daos" className="block font-semibold hover:text-blue-600">
            DAOs
          </Link>
        </nav>
      </aside>

   
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
