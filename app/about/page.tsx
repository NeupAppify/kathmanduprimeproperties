import type { Metadata } from "next";
import Link from "next/link";
import { aboutHighlights, serviceAreas, sellingSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about the approach behind Kathmandu Prime Properties.",
};

const principles = [
  ["01", "Read the market", "Every recommendation starts with the street, the buyer, and the moment—not a generic formula."],
  ["02", "Make it understandable", "We turn pricing, presentation, and next steps into clear decisions people can act on."],
  ["03", "Stay close", "From the first conversation to handover, responsive communication keeps momentum on your side."],
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="grid gap-10 border-b border-[color:var(--border)] pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20 lg:pb-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">About Kathmandu Prime</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.94] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">Property advice with a point of view.</h1>
        </div>
        <div className="space-y-5 text-base leading-8 text-[color:var(--muted)]">
          <p>Kathmandu Prime Properties is a focused real estate studio for people who want less noise and better decisions.</p>
          <p>We bring together local market understanding, thoughtful presentation, and steady guidance across Kathmandu Valley.</p>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">How we work</p>
          <h2 className="mt-4 max-w-sm font-display text-4xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-5xl">Calm thinking. Stronger outcomes.</h2>
        </div>
        <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {principles.map(([number, title, description]) => (
            <div key={number} className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr]">
              <span className="font-display text-3xl text-[color:var(--primary)]">{number}</span>
              <div>
                <h3 className="font-display text-3xl tracking-[-0.03em] text-[color:var(--foreground)]">{title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-[color:var(--muted)]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] bg-[color:var(--primary)] px-6 py-10 text-white lg:px-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Our promise</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Premium does not need to feel complicated.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {aboutHighlights.map((highlight, index) => (
              <div key={highlight} className="border-t border-white/25 pt-4">
                <span className="text-xs font-semibold tracking-[0.08em] text-white/60">0{index + 1}</span>
                <p className="mt-3 text-sm leading-6 text-white/90">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">From first look to handover</p>
          <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] text-[color:var(--foreground)] sm:text-5xl">A process with purpose.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[color:var(--muted)]">We work across {serviceAreas.join(", ")} with a simple rhythm that keeps every decision moving forward.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {sellingSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.1rem] bg-[color:var(--surface)] p-5">
              <span className="text-xs font-semibold text-[color:var(--primary)]">0{index + 1}</span>
              <h3 className="mt-8 font-display text-2xl text-[color:var(--foreground)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-[color:var(--border)] pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-3xl tracking-[-0.03em] text-[color:var(--foreground)]">Start with a clear conversation.</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Your next property decision can be simpler.</p>
        </div>
        <Link href="/properties" className="inline-flex w-fit rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">View properties</Link>
      </section>
    </div>
  );
}
