"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/site";

const LOGO_SRC = "/logo.png";
const mobileLinks = [
  ...navLinks,
  { href: "/search", label: "Search" },
  { href: "/properties", label: "Schedule viewing" },
] as const;

/*
::neup.documentation::site-header
::component SiteHeader
::title Site Header
::owner Kathmandu Prime Properties

::public

Renders the sticky site header with desktop navigation and a full-screen mobile
navigation expansion.

The mobile menu keeps the logo and menu toggle in the top bar, then reveals the
site links as bordered rows across the full viewport.

::public end

::private

Uses a client component so the small-screen header can animate between its
collapsed and expanded states and lock page scrolling while the menu is open.

::private end

::end
*/

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`top-0 z-50 border-[color:var(--border)] transition-[height,background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)] ${
        isMenuOpen
          ? "fixed inset-x-0 h-dvh border-b-0 bg-[color:var(--surface)]/98 backdrop-blur-2xl"
          : "sticky border-b bg-[color:var(--surface)]/95 backdrop-blur"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,31,45,0.16),transparent_28%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.78),transparent_24%),linear-gradient(180deg,rgba(253,250,246,0.98),rgba(242,235,226,0.96))] transition-opacity duration-700 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 lg:px-8">
        <div className="relative flex min-h-[5rem] items-center justify-between gap-4 py-4">
          <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] transition-transform duration-200 group-hover:-translate-y-0.5">
              <Image
                src={LOGO_SRC}
                alt="Kathmandu Prime Properties logo"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
                priority
              />
            </span>
            <span>
              <span className="block font-display text-[1.42rem] leading-none tracking-[-0.02em] text-[color:var(--foreground)] sm:text-[1.5rem]">
                Kathmandu Prime Properties
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-5 text-sm font-semibold text-[color:var(--foreground)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
            >
              Search
            </Link>
            <Link
              href="/properties"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--primary)] bg-[color:var(--primary)] px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--primary-strong)]"
            >
              Schedule viewing
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)] transition-colors duration-300 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] lg:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen ? "top-[0.45rem] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[0.45rem] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen ? "bottom-[0.45rem] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`relative overflow-hidden transition-[max-height,opacity,transform,padding] duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)] lg:hidden ${
            isMenuOpen
              ? "max-h-[calc(100dvh-5rem)] opacity-100 pb-8"
              : "pointer-events-none max-h-0 -translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col border-t border-[color:var(--border)]">
            {mobileLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`group flex min-h-[4.5rem] items-center justify-between gap-4 px-1 text-[1.1rem] font-medium tracking-[-0.02em] text-[color:var(--foreground)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[color:var(--primary)] ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                } ${
                  index === mobileLinks.length - 1
                    ? ""
                    : "border-b border-[color:var(--border)]"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${120 + index * 60}ms` : "0ms",
                }}
              >
                <span>{link.label}</span>
                <span className="text-sm text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--primary)]">
                  {link.href}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
