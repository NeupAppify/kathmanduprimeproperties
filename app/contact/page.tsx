import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Connect with Kathmandu Prime Properties for thoughtful property advice.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="grid gap-8 pb-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl tracking-[-0.035em] text-[color:var(--foreground)] sm:text-5xl">Tell us what you’re looking for.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            Whether you’re buying, selling, or simply exploring your options, our team is here to help you move with clarity.
          </p>
        </div>
        <div className="grid gap-5 rounded-[1.5rem] bg-[color:var(--primary)] p-7 text-white lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">Email</p>
            <a href="mailto:hello@kathmanduprimeproperties.com" className="mt-2 inline-block text-sm leading-6 transition-colors hover:text-white/70">
              hello@kathmanduprimeproperties.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">Service areas</p>
            <p className="mt-2 text-sm leading-6 text-white/90">Kathmandu · Lalitpur · Bhaktapur</p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 border-t border-[color:var(--border)] pt-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="font-display text-3xl tracking-[-0.03em] text-[color:var(--foreground)]">Start a conversation</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[color:var(--muted)]">
            Share a few details and we’ll get back to you with a thoughtful next step.
          </p>
        </div>
        <form className="grid gap-5" action="mailto:hello@kathmanduprimeproperties.com" method="post" encType="text/plain">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--foreground)]">
              Name
              <input name="name" required className="h-12 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 font-normal outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]" placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--foreground)]">
              Phone
              <input type="tel" name="phone" required className="h-12 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 font-normal outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]" placeholder="Your phone number" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--foreground)]">
              Email
              <input type="email" name="email" required className="h-12 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 font-normal outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]" placeholder="you@example.com" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--foreground)]">
            What can we help with?
            <textarea name="message" required rows={6} className="resize-y rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 font-normal outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]" placeholder="Tell us a little about your plans..." />
          </label>
          <button type="submit" className="w-fit rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[color:var(--primary-strong)]">
            Send inquiry
          </button>
        </form>
      </section>
    </div>
  );
}
