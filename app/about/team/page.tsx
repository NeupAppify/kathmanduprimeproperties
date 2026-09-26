import type { Metadata } from "next";
import Link from "next/link";
import { people } from "@neup/logica/people";
import type { PeopleMember } from "@neup/logica/people/members";

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the team behind Kathmandu Prime Properties.",
};

export default async function TeamPage() {
  let teamMembers: PeopleMember[] = [];

  try {
    const response = await people().members.get();
    teamMembers = response.ok && response.body.success && Array.isArray(response.body.data)
      ? response.body.data
      : [];
  } catch {
    teamMembers = [];
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="max-w-3xl space-y-2">
        <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">
          Meet the team behind us!
        </h1>
        <p className="text-lg leading-8 text-[color:var(--muted)]">
          A focused team delivering clear advice, polished listings, and steady execution.
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <Link
            key={member.id}
            href={`/about/team/${member.slug}`}
            className="group"
          >
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[color:var(--primary-soft)] font-display text-5xl text-[color:var(--primary)]">
              {member.assetId?.startsWith("http") ? (
                <img
                  src={member.assetId}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <span className="inline-block transition-transform duration-500 ease-out group-hover:scale-110">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              )}
            </div>
            <div className="pt-4">
              <h2 className="relative inline-block font-display text-2xl leading-8 text-[color:var(--foreground)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--foreground)] after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100">
                {member.name}
              </h2>
              <p className="mt-1 text-xs font-medium text-[color:var(--muted)]">
                {member.role || "Team member"}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Careers</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">We might be hiring.</h2>
          <p className="mt-3 text-sm leading-7 text-white/80">Check our open positions.</p>
        </div>
        <Link href="/about/career" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">View open positions</Link>
      </section>
    </div>
  );
}
