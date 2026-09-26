import type { Metadata } from "next";
import { aboutHighlights } from "@/data/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about the approach behind Kathmandu Prime Properties.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">
          About us
        </p>
        <h1 className="font-display text-5xl tracking-tight text-[color:var(--foreground)] sm:text-6xl">
          A classic advisory approach, built for today&apos;s buyers and sellers.
        </h1>
        <p className="text-lg leading-8 text-[color:var(--muted)]">
          We combine clear market thinking with modern listing execution.
        </p>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        {aboutHighlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--primary-soft)] font-display text-2xl text-[color:var(--primary)]">
              •
            </div>
            <p className="mt-5 font-display text-2xl text-[color:var(--foreground)]">
              {highlight}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-8 rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">
            Our philosophy
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-[color:var(--foreground)]">
            Clear communication builds market confidence.
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-[color:var(--muted)]">
          <p>
            In Kathmandu real estate, clarity outperforms noise.
          </p>
          <p>
            We focus on believable pricing, polished presentation, and quick response.
          </p>
          <p>
            That gives sellers, buyers, and investors a direct path to decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
