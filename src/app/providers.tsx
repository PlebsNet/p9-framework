'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WagmiProvider } from 'wagmi';
import { Toaster } from "sonner";

import { config } from "@/lib/wagmiConfig"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";





export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());



  const pathname = usePathname() ?? '/';
  const isHome = pathname === '/';


  useEffect(() => {
    const bodyClasses = document.body.classList;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isHome ? bodyClasses.add('home') : bodyClasses.remove('home');
  }, [isHome]);

  return (
    <>
      <Toaster position="top-right" />
      <SessionProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
    </>
  )
}
