/*
::neup.documentation::agent-profile-page
::function AgentProfilePage(params)
::title Agent Profile Page

::public

Renders a public agent profile page using the resolved `neupId` route segment and
shows that agent's active property feed.

::param external params
::datatype Promise<{ neupid: string }>

The dynamic route params for the public agent profile page.

::public end

::end
*/
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyFeed } from "@/components/property-feed";
import { getAgentProfileByNeupId } from "@/lib/properties";

type AgentPageProps = {
  params: Promise<{
    neupid: string;
  }>;
};

export async function generateMetadata({
  params,
}: AgentPageProps): Promise<Metadata> {
  const { neupid } = await params;
  const agent = await getAgentProfileByNeupId(neupid);

  if (!agent) {
    return {
      title: "Agent not found",
    };
  }

  return {
    title: agent.displayName,
    description: `Property listings represented by ${agent.displayName}.`,
  };
}

export default async function AgentProfilePage({ params }: AgentPageProps) {
  const { neupid } = await params;
  const agent = await getAgentProfileByNeupId(neupid);

  if (!agent) {
    notFound();
  }

  const propertyCountText =
    agent.properties.length === 1
      ? "1 active property listing"
      : `${agent.properties.length} active property listings`;

  const areaCount = new Set(
    agent.properties.map((property) => property.location.trim()),
  ).size;

  const startingPrice = agent.properties.reduce<number | null>((lowest, property) => {
    if (property.priceValue === null) {
      return lowest;
    }

    if (lowest === null || property.priceValue < lowest) {
      return property.priceValue;
    }

    return lowest;
  }, null);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-sm lg:p-10">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
        >
          Back to feed
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="rounded-full border border-[color:var(--border)] p-1.5 shadow-sm">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-[color:var(--surface)] sm:h-40 sm:w-40">
                {agent.displayImage ? (
                  <Image
                    src={agent.displayImage}
                    alt={agent.displayName}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-4xl text-[color:var(--primary)]">
                    {agent.displayName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-[2rem]">
                {agent.neupId ? `@${agent.neupId}` : agent.displayName}
              </h1>
              <div className="inline-flex h-8 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm font-semibold text-[color:var(--foreground)]">
                View feed
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[0.98rem] text-[color:var(--foreground)]">
              <span>
                <span className="font-semibold">{agent.properties.length}</span> posts
              </span>
              <span>
                <span className="font-semibold">{areaCount}</span> areas
              </span>
              <span>
                <span className="font-semibold">
                  {startingPrice === null
                    ? "On request"
                    : `Rs ${new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(startingPrice)}`}
                </span>{" "}
                starting
              </span>
            </div>

            <div className="mt-6 max-w-2xl space-y-1.5">
              <p className="text-lg font-semibold text-[color:var(--foreground)]">
                {agent.displayName}
              </p>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Property advisor at Kathmandu Prime Properties.
              </p>
              <p className="text-sm leading-7 text-[color:var(--foreground)]">
                {propertyCountText}. Directly sourced from the live bridge feed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
            Agent feed
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
            Posts represented by {agent.displayName}
          </h2>
        </div>

        <PropertyFeed properties={agent.properties} />
      </section>
    </div>
  );
}
