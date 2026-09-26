import type { Metadata } from "next";
import { teamMembers } from "@/data/site";

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the team behind Kathmandu Prime Properties.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">
          Our team
        </p>
        <h1 className="font-display text-5xl tracking-tight text-[color:var(--foreground)] sm:text-6xl">
          The people shaping every property conversation.
        </h1>
        <p className="text-lg leading-8 text-[color:var(--muted)]">
          A focused team delivering clear advice, polished listings, and steady execution.
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--primary-soft)] font-display text-xl text-[color:var(--primary)]">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h2 className="mt-5 font-display text-[2rem] leading-9 text-[color:var(--foreground)]">
              {member.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              {member.role}
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              {member.bio}
            </p>
            <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--muted)]">
              {member.focus}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
