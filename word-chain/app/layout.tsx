import { Header } from "@/components/site/header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Word Chain",
  description: "Minimal, fast, and accessible word chain game",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh flex flex-col">
            <Header />
            <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex-1 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
