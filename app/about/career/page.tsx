import type { Metadata } from "next";
import Link from "next/link";
import { people } from "@neup/logica/people";
import type { SitesCareer } from "@neup/logica/people/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore career opportunities with Kathmandu Prime Properties.",
};

export default async function CareerPage() {
  let careers: SitesCareer[] = [];

  try {
    const response = await people().careers.get();
    careers = response.ok && response.body.success ? response.body.data ?? [] : [];
  } catch {
    careers = [];
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="border-b border-[color:var(--border)] pb-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">Careers</h1>
          <p className="text-lg leading-8 text-[color:var(--muted)]">Build a more thoughtful property experience with us.</p>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">We might be hiring.</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--muted)]">
            <p>We are building a focused team for a clearer, more personal property experience across Kathmandu Valley.</p>
            <p>If you care about people, property, and doing thoughtful work, we would be glad to hear from you.</p>
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-[color:var(--primary)] p-8 text-white lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Open positions</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">Check our open positions.</h2>
          <p className="mt-5 text-sm leading-7 text-white/80">{careers.length > 0 ? `${careers.length} open ${careers.length === 1 ? "position" : "positions"} available.` : "We do not have a listed opening right now, but we are always interested in meeting thoughtful people."}</p>
          <a href="mailto:hello@kathmanduprimeproperties.com" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Send your introduction</a>
        </div>
      </section>

      {careers.length > 0 && (
        <section className="grid gap-4 py-16 sm:grid-cols-2">
          {careers.map((career) => (
            <article key={career.id} className="rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="font-display text-2xl text-[color:var(--foreground)]">{career.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{[career.location, career.type].filter(Boolean).join(" · ") || "Kathmandu Valley"}</p>
              {career.description && <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{career.description}</p>}
            </article>
          ))}
        </section>
      )}

      <section className="grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Our team</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Learn more about our team.</h2>
        </div>
        <Link href="/about/team" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Meet the team</Link>
      </section>
    </div>
  );
}
