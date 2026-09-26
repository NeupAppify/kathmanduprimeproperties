import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { people } from "@neup/logica/people";

type TeamMemberPageProps = {
  params: Promise<{
    "member-slug": string;
  }>;
};

async function getMember(slug: string) {
  try {
    const response = await people().members.get();

    if (!response.ok || !response.body.success) {
      return null;
    }

    return (
      (Array.isArray(response.body.data) ? response.body.data : []).find(
        (member) => member.slug.trim().toLowerCase() === slug.trim().toLowerCase(),
      ) ?? null
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { "member-slug": slug } = await params;
  const member = await getMember(slug);

  return {
    title: member?.name ?? "Team member",
    description: member?.role
      ? `${member.name}, ${member.role} at Kathmandu Prime Properties.`
      : "Meet the Kathmandu Prime Properties team.",
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { "member-slug": slug } = await params;
  const member = await getMember(slug);

  if (!member) {
    notFound();
  }

  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-8 lg:px-8 lg:py-12">
      <Link
        href="/about/team"
        className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
      >
        Back to our team
      </Link>

      <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[color:var(--primary-soft)] font-display text-6xl text-[color:var(--primary)]">
          {member.assetId?.startsWith("http") ? (
            <img
              src={member.assetId}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">
            Team member
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">
            {member.name}
          </h1>
          <p className="mt-4 text-lg font-medium uppercase tracking-[0.08em] text-[color:var(--muted)]">
            {member.role || "Team member"}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            Bringing local perspective, thoughtful guidance, and a steady approach
            to every property conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Explore properties
            </Link>
            <Link
              href="/about/team"
              className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface)]"
            >
              Meet the whole team
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 border-t border-[color:var(--border)] pt-10 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">
            Approach
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--foreground)]">
            Clear advice, considered decisions.
          </h2>
        </div>
        <div className="md:col-span-2 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[1.1rem] bg-[color:var(--surface)] p-6">
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Whether you are buying, selling, or simply finding your bearings,
              {" "}{member.name.split(" ")[0]} brings clarity to the next step.
            </p>
          </div>
          <div className="rounded-[1.1rem] bg-[color:var(--surface)] p-6">
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Part of a focused team built around responsive service and a refined
              Kathmandu property experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
