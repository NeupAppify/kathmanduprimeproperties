import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { people } from "@neup/logica/people";
import type { SitesCareer } from "@neup/logica/people/careers";

type CareerPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCareer(slug: string): Promise<SitesCareer | null> {
  try {
    const response = await people().career(slug).get();
    return response.ok && response.body.success ? response.body.data ?? null : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareer(slug);

  return {
    title: career?.title ?? "Career opportunity",
    description: career?.description ?? "Explore a career opportunity with Kathmandu Prime Properties.",
  };
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = await getCareer(slug);

  if (!career) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <Link href="/about/career" className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]">
        Back to careers
      </Link>

      <section className="mt-8 border-b border-[color:var(--border)] pb-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--primary)]">Career opportunity</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-6xl">{career.title}</h1>
          <p className="mt-5 text-base text-[color:var(--muted)]">{[career.location, career.type].filter(Boolean).join(" · ") || "Kathmandu Valley"}</p>
        </div>
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-20">
        <div className="max-w-2xl space-y-5 text-base leading-8 text-[color:var(--muted)]">
          {career.description ? <p>{career.description}</p> : <p>We are looking for thoughtful people to join our team and help create a clearer property experience.</p>}
          {career.qualifications && typeof career.qualifications === "string" && <p>{career.qualifications}</p>}
        </div>
        <a href="mailto:hello@kathmanduprimeproperties.com" className="inline-flex w-fit rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Apply for this position</a>
      </section>

      <section className="grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Kathmandu Prime Properties</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Do thoughtful work with a focused team.</h2>
        </div>
        <Link href="/about/team" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Meet the team</Link>
      </section>
    </div>
  );
}
