"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useIsSignedIn } from "@/hooks/useIsSignedIn";
import { useIsMobile } from '@/hooks/useIsMobile';
import WalletConnect from '@/components/WalletConnect';
import { motion, AnimatePresence } from "framer-motion";
import { Dot, Logomark, Minimize } from '@/components/Icons';
import { Button } from '@/components/ui/Button';

const menu = {
  open: {
    opacity: 1,
    minWidth: "200px",
    minHeight: "320px",
    top: "-4px",
    right: "-4px",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1]
    }
  },
  closed: {
    opacity: 0,
    width: "32px",
    height: "8px",
    top: "0",
    right: "0",
    transition: {
      duration: 0.3,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const menuContent = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1]
    }
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

export default function Navigation() {
  const isSignedIn = useIsSignedIn();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  if (pathname === "/auth/signin") return null;

  return (
    <>
      <header className="z-9 w-full flex items-center justify-between px-8 py-4">

        <Link href="/" className="group rounded-lg p-2 flex items-center justify-center">
          <Logomark className="h-9 w-9 group-hover:text-brand-500" />
        </Link>

        <nav className="fixed top-4 right-4">
          <motion.div
            className="absolute bg-gray-800 rounded-lg"
            variants={menu}
            initial="closed"
            animate={isActive ? "open" : "closed"}
            // initial="closed"
          >
            <div className="pt-8 ">
            <AnimatePresence>
              <motion.div
                className="h-full w-full flex items-center justify-center"
                variants={menuContent}
                initial="closed"
                animate={isActive ? "open" : "closed"}
              >
                <WalletConnect />
              </motion.div>
            </AnimatePresence>
            </div>
          </motion.div>

          <div className="flex gap-2 items-center justify-center absolute top-2 right-2 overflow-hidden z-999">
            {isSignedIn && !isActive && <Dot className="text-green-500 animate-blink" />}

            {isSignedIn ? (
              <Button
                variant={isActive ? "outline" : "primary"}
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? <Minimize height="18px" /> : "Connected"}
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign in</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
