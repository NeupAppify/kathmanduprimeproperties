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
    careers = response.ok && response.body.success
      ? response.body.data ?? []
      : [];
  } catch {
    careers = [];
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="pb-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">Careers</h1>
          <p className="text-lg leading-8 text-[color:var(--muted)]">Build a more thoughtful property experience with us.</p>
        </div>
      </section>

      <section className="py-16">
        {careers.length > 0 ? (
          <div className="grid gap-4">
          {careers.map((career) => (
            <Link href={`/about/careers/${career.slug}`} key={career.slug} className="group relative block w-full rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 pr-16 transition-transform hover:-translate-y-0.5">
              <h2 className="font-display text-2xl text-[color:var(--foreground)]">{career.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{[career.location, career.type].filter(Boolean).join(" · ") || "Kathmandu Valley"}</p>
              {career.description && <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{career.description}</p>}
              <span aria-hidden="true" className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-[color:var(--primary)] transition-transform duration-200 group-hover:translate-x-1">
                <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
          </div>
        ) : (
          <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">There are no open positions at the moment.</p>
        )}
      </section>

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
