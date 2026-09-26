/* eslint-disable @next/next/no-img-element */
import type { PropertyListing } from "@/lib/properties";

type PropertyCardProps = {
  property: PropertyListing;
  compact?: boolean;
};

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] shadow-sm">
      {compact ? (
        <>
          <div className="relative min-h-44 border-b border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(110,31,45,0.1),rgba(255,255,255,1))] p-5">
            {property.imageUrl ? (
              <img
                src={property.imageUrl}
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(110,31,45,0.08),rgba(255,255,255,1)_44%),radial-gradient(circle_at_top_right,rgba(198,30,58,0.18),transparent_46%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,238,230,0.96))]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,20,0.08),rgba(30,20,20,0.46))]" />
            <div className="relative flex h-full min-h-44 flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)] shadow-sm">
                  {property.purpose}
                </div>
                <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)] shadow-sm">
                  {property.status}
                </div>
              </div>
              <div className="space-y-2 text-white">
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/80">
                  {property.category} · {property.type}
                </div>
                <h3 className="font-display text-3xl leading-tight">
                  {property.title}
                </h3>
                <p className="text-sm leading-6 text-white/85">{property.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <p className="text-sm leading-7 text-[color:var(--muted)]">{property.summary}</p>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-[color:var(--primary-soft)] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  Price
                </div>
                <div className="mt-2 font-display text-2xl text-[color:var(--foreground)]">
                  {property.priceLabel}
                </div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  Agency
                </div>
                <div className="mt-2 flex items-center gap-3">
                  {property.agencyLogoUrl ? (
                    <img
                      src={property.agencyLogoUrl}
                      alt={property.agencyName}
                      className="h-8 w-24 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--primary-soft)] text-xs font-semibold text-[color:var(--primary)]">
                      {property.agencyName.slice(0, 1)}
                    </div>
                  )}
                  <div className="text-base font-semibold text-[color:var(--foreground)]">
                    {property.agencyName}
                  </div>
                </div>
                <div className="mt-1 text-sm text-[color:var(--muted)]">
                  {property.imageCount > 0
                    ? `${property.imageCount} image${property.imageCount === 1 ? "" : "s"}`
                    : "No images uploaded"}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-48 border-b border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(110,31,45,0.1),rgba(255,255,255,1))] p-5 lg:border-b-0 lg:border-r">
            {property.imageUrl ? (
              <img
                src={property.imageUrl}
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(110,31,45,0.08),rgba(255,255,255,1)_44%),radial-gradient(circle_at_top_right,rgba(198,30,58,0.18),transparent_46%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,238,230,0.96))]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,20,0.08),rgba(30,20,20,0.46))]" />
            <div className="relative flex h-full min-h-48 flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)] shadow-sm">
                  {property.purpose}
                </div>
                <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)] shadow-sm">
                  {property.status}
                </div>
              </div>
              <div className="space-y-2 text-white">
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/80">
                  {property.category} · {property.type}
                </div>
                <h3 className="font-display text-3xl leading-tight">
                  {property.title}
                </h3>
                <p className="text-sm leading-6 text-white/85">{property.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <p className="text-sm leading-7 text-[color:var(--muted)]">{property.summary}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[color:var(--primary-soft)] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  Price
                </div>
                <div className="mt-2 font-display text-2xl text-[color:var(--foreground)]">
                  {property.priceLabel}
                </div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  Agency
                </div>
                <div className="mt-2 flex items-center gap-3">
                  {property.agencyLogoUrl ? (
                    <img
                      src={property.agencyLogoUrl}
                      alt={property.agencyName}
                      className="h-8 w-24 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--primary-soft)] text-xs font-semibold text-[color:var(--primary)]">
                      {property.agencyName.slice(0, 1)}
                    </div>
                  )}
                  <div className="text-base font-semibold text-[color:var(--foreground)]">
                    {property.agencyName}
                  </div>
                </div>
                <div className="mt-1 text-sm text-[color:var(--muted)]">
                  {property.imageCount > 0
                    ? `${property.imageCount} image${property.imageCount === 1 ? "" : "s"}`
                    : "No images uploaded"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
