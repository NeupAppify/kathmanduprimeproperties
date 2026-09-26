/*
::neup.documentation::not-found-page
::function NotFound()
::title Not Found Page

::public

Renders the root 404 experience for unmatched routes and route segments that
throw `notFound()` within the app router.

::public end

::end
*/
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="max-w-3xl rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[0.98] tracking-tight text-[color:var(--foreground)] sm:text-5xl">
          This page could not be found.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          The page may have moved, the link may be outdated, or the address may
          be incorrect. Browse the live property feed or search for an agent and
          listing instead.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--primary-strong)]"
          >
            Go to homepage
          </Link>
          <Link
            href="/search"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            Search listings
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            View feed
          </Link>
        </div>
      </div>
    </section>
  );
}
