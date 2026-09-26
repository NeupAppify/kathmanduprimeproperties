import type { Metadata } from "next";
import { PropertyCard } from "@/components/property-card";
import { getProperties } from "@/lib/properties";
import { propertiesPageHero, sellingSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Properties",
  description: "Focused property listings for the Kathmandu market.",
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  const propertyCountText =
    properties.length === 1
      ? "1 property available right now."
      : `${properties.length} properties available right now.`;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">
          Properties
        </p>
        <h1 className="font-display text-5xl tracking-tight text-[color:var(--foreground)] sm:text-6xl">
          {propertiesPageHero.title}
        </h1>
        <p className="text-lg leading-8 text-[color:var(--muted)]">
          {propertiesPageHero.description}
        </p>
        <p className="text-sm font-medium text-[color:var(--muted)]">
          {properties.length > 0
            ? propertyCountText
            : "No properties are available right now."}
        </p>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-sm text-[color:var(--muted)] lg:col-span-3">
            Property listings could not be loaded from the upstream API.
          </div>
        )}
      </section>

      <section className="mt-16 rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">
              Buying and selling flow
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-[color:var(--foreground)]">
              Structured process, cleaner outcomes.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sellingSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-[color:var(--border)] bg-white/70 p-5"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  0{index + 1}
                </div>
                <h3 className="mt-3 font-display text-2xl text-[color:var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
