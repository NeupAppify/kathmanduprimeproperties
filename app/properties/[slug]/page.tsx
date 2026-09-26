import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties } from "@/lib/properties";

type PropertyPageProps = { params: Promise<{ slug: string }> };

async function getProperty(slug: string) {
  const properties = await getProperties();
  return properties.find((property) => property.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  return { title: property?.title ?? "Property", description: property?.summary };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <Link href="/properties" className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">Back to properties</Link>
      <section className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[color:var(--primary-soft)]">
          {property.imageUrl ? <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" /> : <span className="font-display text-6xl text-[color:var(--primary)]">{property.title.slice(0, 1)}</span>}
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-[color:var(--muted)]">{property.category} · {property.type}</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.04em] text-[color:var(--foreground)] sm:text-5xl">{property.title}</h1>
          <p className="mt-4 font-display text-2xl text-[color:var(--primary)]">{property.priceLabel}</p>
          <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">{property.summary}</p>
        </div>
      </section>
    </main>
  );
}
