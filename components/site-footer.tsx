import Image from "next/image";
import Link from "next/link";
import { footerLinks, serviceAreas } from "@/data/site";

const LOGO_SRC =
  "/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)]">
              <Image
                src={LOGO_SRC}
                alt="Kathmandu Prime Properties logo"
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
              />
            </span>
            <div className="font-display text-3xl text-[color:var(--foreground)]">
              Kathmandu Prime Properties
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-[color:var(--muted)]">
            Classic trust, modern execution for premium property across the
            valley.
          </p>
          <Link
            href="https://neupgroup.com/estate/manage"
            className="inline-flex text-sm font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
          >
            Management panel
          </Link>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
            Navigate
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
            Service areas
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm text-[color:var(--muted)]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-[color:var(--muted)] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>© 2026 Kathmandu Prime Properties. All rights reserved.</span>
          <span>Kathmandu • Lalitpur • Bhaktapur</span>
        </div>
      </div>
    </footer>
  );
}
