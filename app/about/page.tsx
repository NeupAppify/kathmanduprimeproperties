import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { people } from "@neup/logica/people";
import type { PeopleMember } from "@neup/logica/people/members";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about Kathmandu Prime Properties and our advisory approach.",
};

const commitments = [
  ["We listen first.", "We learn what you need before suggesting properties or next steps."],
  ["We present properties thoughtfully.", "Clear information helps you compare options with confidence."],
  ["We keep communication direct.", "You receive responsive guidance throughout your property journey."],
] as const;

export default async function AboutPage() {
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
      <section className="border-b border-[color:var(--border)] pb-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">About us</h1>
        <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Property decisions deserve clear guidance.</h2>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="max-w-md font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Clear guidance for your next move.</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--muted)]">
            <p>At Kathmandu Prime Properties, we help people make informed decisions about buying, selling, and investing in property across Kathmandu Valley.</p>
            <p>Every property journey is different. We take time to understand your priorities, share relevant options, and guide you through the process with clear communication and a considered approach.</p>
          </div>
        </div>
        <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(110,31,45,0.12),rgba(245,238,230,0.96))] p-10">
          <Image src="/logo.png" alt="Kathmandu Prime Properties" width={420} height={420} className="h-56 w-56 object-contain opacity-90 sm:h-72 sm:w-72" />
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] py-16">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Local understanding. Personal advice.</h2>
          <p className="text-base leading-8 text-[color:var(--muted)]">Kathmandu’s property market can feel complex. Our local knowledge helps us discuss locations, property options, and market context in a way that supports your goals—whether you are looking for a home, preparing to sell, or exploring an investment.</p>
        </div>
      </section>

      <section className="grid gap-10 border-b border-[color:var(--border)] py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">How we work</h2>
          <ul className="mt-6 space-y-5 text-base leading-8 text-[color:var(--muted)]">
            {commitments.map(([title, description]) => <li key={title}><strong className="font-semibold text-[color:var(--foreground)]">{title}</strong> {description}</li>)}
          </ul>
        </div>
        <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(110,31,45,0.12),rgba(245,238,230,0.96))] p-10">
          <Image src="/logo.png" alt="Kathmandu Prime Properties" width={360} height={360} className="h-52 w-52 object-contain opacity-90 sm:h-64 sm:w-64" />
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-end justify-between gap-5">
          <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Our Team</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.slice(0, 3).map((member) => (
            <Link key={member.slug} href={`/about/team/${member.slug}`} className="group">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[color:var(--primary-soft)] font-display text-5xl text-[color:var(--primary)]">
                {member.assetId?.startsWith("http") ? (
                  <img src={member.assetId} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                ) : (
                  <span className="transition-transform duration-500 ease-out group-hover:scale-110">{member.name.split(" ").map((part) => part[0]).join("")}</span>
                )}
              </div>
              <div className="pt-4">
                <h3 className="font-display text-2xl leading-8 text-[color:var(--foreground)]">{member.name}</h3>
                <p className="mt-1 text-xs font-medium text-[color:var(--muted)]">{member.role || "Team member"}</p>
              </div>
            </Link>
          ))}
          <Link href="/about/team" className="group">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[color:var(--primary-soft)] font-display text-5xl text-[color:var(--primary)]">
              <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out group-hover:scale-110">→</span>
            </div>
            <div className="pt-4">
              <h3 className="font-display text-2xl leading-8 text-[color:var(--foreground)]">View all members</h3>
              <p className="mt-1 text-xs font-medium text-[color:var(--muted)]">Meet the full team</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="mb-16 w-1/2 border-t border-[color:var(--border)]" />

      <section className="grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="font-display text-3xl tracking-[-0.03em]">A trusted partner for your next move.</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-white/80">From your first inquiry to the next step, our team is here to make the process clearer and more personal.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/properties" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Explore properties</Link>
          <Link href="/about/team" className="inline-flex w-fit rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Speak with our team</Link>
        </div>
      </section>
    </div>
  );
}
