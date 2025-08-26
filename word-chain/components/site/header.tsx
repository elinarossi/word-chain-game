"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/play", label: "Play" },
  { href: "/archive", label: "Archive" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-5xl flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          WordChain
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="container mx-auto max-w-5xl py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
