import type { Metadata } from "next";
import Link from "next/link";
import { logica } from "@neup/logica";
import type { SitesMemberDirectoryItem } from "@neup/logica/sites";

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the team behind Kathmandu Prime Properties.",
};

export default async function TeamPage() {
  let teamMembers: SitesMemberDirectoryItem[] = [];

  try {
    const response = await logica.sites().members.get();
    console.log("[team] Logica sites members response:", response);
    teamMembers = response.ok && response.body.success
      ? response.body.members ?? []
      : [];
  } catch (error) {
    console.error("[team] Logica sites members request failed:", error);
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

      <section className="mt-16 flex flex-col gap-5 border-t border-[color:var(--border)] pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-3xl tracking-[-0.03em] text-[color:var(--foreground)]">We might be hiring.</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">Check our open positions.</p>
        </div>
        <Link href="/about/career" className="inline-flex w-fit rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">View open positions</Link>
      </section>
    </div>
  );
}
