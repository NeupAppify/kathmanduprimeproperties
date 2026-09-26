import type { Metadata } from "next";
import { PropertyCard } from "@/components/property-card";
import { getProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description: "Focused property listings for the Kathmandu market.",
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="max-w-3xl space-y-2 pb-10">
        <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">Find a place that feels like yours.</h1>
        <p className="text-lg leading-8 text-[color:var(--muted)]">A considered selection of homes, land, and investment opportunities across Kathmandu Valley.</p>
      </section>

      <section className="py-10">
        {properties.length > 0 ? (
          <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => <PropertyCard key={property.id} property={property} compact />)}
          </div>
        ) : (
          <div className="rounded-[1.25rem] bg-[color:var(--surface)] px-6 py-16 text-center">
            <p className="font-display text-3xl text-[color:var(--foreground)]">The collection is being refreshed.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">We could not load the live listings right now. Please check back shortly.</p>
          </div>
        )}
      </section>

      <section className="mt-4 grid gap-8 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/70">Looking for something specific?</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Tell us what would make it feel right.</h2>
        </div>
        <a href="mailto:hello@kathmanduprimeproperties.com" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition-transform hover:-translate-y-0.5">Start a conversation</a>
      </section>
    </div>
  );
}
