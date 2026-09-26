/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { PropertyListing } from "@/lib/properties";

type PropertyCardProps = {
  property: PropertyListing;
  compact?: boolean;
};

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  return (
    <article className={compact ? "group" : "overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] shadow-sm"}>
      {compact ? (
        <Link href={`/properties/${property.slug}`} className="block">
            <div className="relative min-h-44 overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(110,31,45,0.1),rgba(255,255,255,1))] p-5">
            {property.imageUrl ? (
              <img
                src={property.imageUrl}
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(110,31,45,0.08),rgba(255,255,255,1)_44%),radial-gradient(circle_at_top_right,rgba(198,30,58,0.18),transparent_46%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,238,230,0.96))]" />
            )}
            <div className="relative flex h-full min-h-44 flex-col justify-between gap-4">
            </div>
          </div>

          <div className="space-y-5 pt-4">
            <div>
              <h3 className="relative inline-block font-display text-2xl leading-tight tracking-[-0.03em] text-[color:var(--foreground)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--foreground)] after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100">
                {property.title} @ {property.priceLabel}
              </h3>
            </div>
          </div>
        </Link>
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
              <div className="space-y-2 text-white">
                <h3 className="font-display text-2xl leading-tight">
                  {property.title} @ {property.priceLabel}
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
          </div>
        </div>
      )}
    </article>
  );
}
