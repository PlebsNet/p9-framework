"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import WalletConnect from '@/components/WalletConnect';
import { Logomark } from '@/components/Icons';

export default function Navigation() {
  const pathname = usePathname();
  const signInPage = pathname === "/auth/signin";

  return (
    <>
      <header className="z-999 w-full flex items-center justify-between px-8 py-4">
        {!signInPage && (
          <Link href="/" className="group rounded-lg p-2 flex items-center justify-center">
            <Logomark className="h-9 w-9 group-hover:text-brand-500" />
          </Link>
        )}

        <nav className="absolute right-8 flex flex-col items-center gap-6 text-xl">
          <WalletConnect />
        </nav>
      </header>
    </>
  );
}
