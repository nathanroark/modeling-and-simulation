import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GlobalNav } from "@/components/global-nav";

export const metadata: Metadata = {
  title: {
    default: "Modeling and Simulation",
    template: "%s | M&S",
  },
  description: "Modeling and Simulation",
  openGraph: {
    title: "Modeling and Simulation",
    description: "Nathan Roark",
    url: "https://modeling-and-simulation.nathanroark.dev/",
    siteName: "Nathan Roark",
    images: [
      {
        url: "https://modeling-and-simulation.nathanroark.dev/og",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Nathan Roark",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full w-full bg-black">
        <GlobalNav />
        <main>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
