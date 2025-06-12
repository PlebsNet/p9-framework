import type { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/react';
import { meta } from '@/config/constants';
import { Providers } from "./providers";
import { Gabarito } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

import { QueryClientProviderWrapper } from "@/components/QueryClientProviderWrapper"; // <-- import du wrapper client

const sans = Gabarito({
  variable: "--font-sans",
  subsets: ["latin-ext"],
});

// ... ton metadata, viewport inchangés ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased bg-neutral-950 min-h-screen`}>
       <QueryClientProviderWrapper>
         <Providers>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
       </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
