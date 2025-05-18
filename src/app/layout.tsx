import type { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/react';
import { meta } from '@/config/constants';
import { Providers } from "./providers";
import { Gabarito } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = Gabarito({
  variable: "--font-sans",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: `${meta.name}: ${meta.title}`,
    template: `%s | ${meta.name}`,
  },
  description: meta.description,
  alternates: {
    canonical: meta.canonical ?? meta.url,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: meta.name,
    images: [
      {
        url: meta.og.image,
        width: meta.og.width,
        height: meta.og.height,
      },
    ],
    locale: meta.og.locale,
    type: meta.og.type,
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.og.image],
    creator: meta.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: false,
    noimageindex: true,
    nocache: true,
  },
  icons: {
    icon: meta.icons.favicon,
    shortcut: meta.icons.app,
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: meta.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased bg-neutral-950 min-h-screen`}>
        <Providers>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
