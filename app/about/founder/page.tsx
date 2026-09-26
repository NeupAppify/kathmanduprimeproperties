import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder",
  description: "Meet the founder of Kathmandu Prime Properties.",
};

export default function FounderPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="border-b border-[color:var(--border)] pb-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">Our founder</h1>
          <p className="text-lg leading-8 text-[color:var(--muted)]">Thoughtful property advice, grounded in local understanding.</p>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Sourav Poudyal</h2>
          <p className="mt-2 text-sm font-medium text-[color:var(--muted)]">Founder and principal advisor</p>
          <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--muted)]">
            <p>Sourav leads Kathmandu Prime Properties with a calm, practical approach to property decisions across Kathmandu Valley.</p>
            <p>His work brings together market context, considered presentation, and clear communication so buyers, sellers, and investors can move forward with confidence.</p>
            <p>From valuation and strategy to negotiation and handover, he keeps the process focused on what matters most to each client.</p>
          </div>
        </div>
        <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[color:var(--primary-soft)] font-display text-7xl text-[color:var(--primary)]">
          <Image src="/logo.png" alt="Kathmandu Prime Properties logo" width={360} height={360} className="h-56 w-56 object-contain opacity-90 sm:h-72 sm:w-72" />
        </div>
      </section>

      <section className="grid gap-10 border-y border-[color:var(--border)] py-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">A clear point of view.</h2>
        <p className="text-base leading-8 text-[color:var(--muted)]">Property decisions deserve time, context, and reliable information. Sourav’s approach is straightforward: understand the need, share relevant options, and keep communication clear from the first conversation through the next step.</p>
      </section>

      <section className="grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Take the next step</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Ready to make your next move?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/properties" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Explore properties</Link>
          <Link href="/about/team" className="inline-flex w-fit rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Meet the team</Link>
        </div>
      </section>
    </div>
  );
}
