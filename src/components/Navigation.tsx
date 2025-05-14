"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/Button';
import {
  Logomark,
  User,
  More,
  Brain,
  Menu,
  X,
  Triples,
} from '@/components/Icons';
import { AuthPopup } from './AuthPopup';
import { useState } from 'react';

export default function Navigation() {
  const { data: session } = useSession();
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar - hidden when sidebar is open */}
      {!isMobileMenuOpen && (
        <div className="fixed top-0 w-full h-16 bg-zinc-900/60 backdrop-blur-md z-[60] md:hidden flex items-center justify-between px-4 box-border">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-zinc-900/60 backdrop-blur-md p-2 rounded-md"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          {session ? (
            <Button
              onClick={() => signOut()}
              variant="secondary"
              size="sm"
              className="px-4"
            >
              Sign out
            </Button>
          ) : (
            <Button
              onClick={() => setIsAuthPopupOpen(true)}
              variant="secondary"
              size="sm"
              className="px-4"
            >
              Sign in
            </Button>
          )}
        </div>
      )}

      {/* Sidebar Navigation */}
      <header className={`fixed top-0 left-0 h-screen bg-zinc-900/60 backdrop-blur-md z-[70] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-[76px] flex flex-col items-center justify-between py-4 px-2 md:top-0`}>
        <div className="flex flex-col items-center space-y-6 mt-4 w-full">
          {/* Close button for mobile, only visible when sidebar is open */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden self-start ml-2 mb-2 bg-zinc-900/60 backdrop-blur-md p-2 rounded-md"
            aria-label="Close menu"
            style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
          >
            <X className="w-6 h-6" />
          </button>
          <Link
            href="/"
            className="h-10 w-10 flex items-center justify-center"
          >
            <Logomark className="w-full h-full" />
          </Link>
          <nav className="flex flex-col items-center justify-center space-y-4 mt-6">
            <Button size="icon" variant="ghost" asChild>
              <Link href="/assessment">
                <Brain className="w-full h-full" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link href="/profile">
                <User className="w-full h-full" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link href="/triples">
                <Triples className="w-full h-full" />
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/more">
              <More className="w-full h-full" />
            </Link>
          </Button>
        </div>
      </header>

      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
      />
    </>
  );
}
