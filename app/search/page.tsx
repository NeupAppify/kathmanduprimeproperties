/*
::neup.documentation::search-page
::function SearchPage(searchParams)
::title Search Page

::public

Renders the public `/search` page with a shared query that filters both the
property feed and the agent list.

::param external searchParams
::datatype Promise<{ q?: string }>

The query-string values used to filter the page contents.

::public end

::end
*/
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PropertyFeed } from "@/components/property-feed";
import { getProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Search",
  description: "Search property posts and listing agents.",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

type AgentPreview = {
  accountId: string;
  displayName: string;
  displayImage: string;
  neupId: string;
  propertyCount: number;
  areas: string[];
};

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function buildAgentPreviews(
  properties: Awaited<ReturnType<typeof getProperties>>,
): AgentPreview[] {
  const previews = new Map<string, AgentPreview>();

  for (const property of properties) {
    if (!property.listingAgentNeupId) {
      continue;
    }

    const existing = previews.get(property.listingAgentNeupId);

    if (existing) {
      existing.propertyCount += 1;
      if (!existing.areas.includes(property.location)) {
        existing.areas.push(property.location);
      }
      continue;
    }

    previews.set(property.listingAgentNeupId, {
      accountId: property.listingAgentAccountId,
      displayName: property.listingAgent,
      displayImage: property.listingAgentImageUrl,
      neupId: property.listingAgentNeupId,
      propertyCount: 1,
      areas: [property.location],
    });
  }

  return Array.from(previews.values()).sort((left, right) =>
    left.displayName.localeCompare(right.displayName),
  );
}

function matchesPropertyQuery(
  query: string,
  property: Awaited<ReturnType<typeof getProperties>>[number],
) {
  if (!query) {
    return true;
  }

  return [
    property.title,
    property.location,
    property.purpose,
    property.category,
    property.type,
    property.listingAgent,
    property.agencyName,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function matchesAgentQuery(query: string, agent: AgentPreview) {
  if (!query) {
    return true;
  }

  return [agent.displayName, agent.neupId, ...agent.areas]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const normalizedQuery = normalizeSearchValue(q);
  const hasQuery = normalizedQuery.length > 0;
  const properties = hasQuery ? await getProperties() : [];
  const filteredProperties = properties.filter((property) =>
    matchesPropertyQuery(normalizedQuery, property),
  );
  const agents = buildAgentPreviews(properties).filter((agent) =>
    matchesAgentQuery(normalizedQuery, agent),
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <section className="rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-sm lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
          Search
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-[color:var(--foreground)] sm:text-5xl">
          For your property requirements.
        </h1>

        <form action="/search" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search by title, area, agent, or property type"
            className="h-12 flex-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--primary-strong)]"
          >
            Search
          </button>
        </form>
      </section>

      {hasQuery ? (
        <>
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
                  Agents
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                  Agent view
                </h2>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                {agents.length} match{agents.length === 1 ? "" : "es"}
              </p>
            </div>

            {agents.length > 0 ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {agents.map((agent) => (
                  <Link
                    key={agent.neupId}
                    href={`/agent/${agent.neupId}`}
                    className="rounded-[1.3rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]">
                        {agent.displayImage ? (
                          <Image
                            src={agent.displayImage}
                            alt={agent.displayName}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-display text-xl text-[color:var(--primary)]">
                            {agent.displayName
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-lg font-semibold text-[color:var(--foreground)]">
                          {agent.displayName}
                        </div>
                        <div className="mt-1 text-sm text-[color:var(--muted)]">
                          @{agent.neupId}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--foreground)]">
                      <span>
                        <span className="font-semibold">{agent.propertyCount}</span> posts
                      </span>
                      <span>
                        <span className="font-semibold">{agent.areas.length}</span> areas
                      </span>
                    </div>

                    <div className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                      {agent.areas.join(" • ")}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[1.3rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 text-sm text-[color:var(--muted)] shadow-sm">
                No agents matched this search.
              </div>
            )}
          </section>

          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
                  Properties
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                  Feed view
                </h2>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                {filteredProperties.length} match{filteredProperties.length === 1 ? "" : "es"}
              </p>
            </div>

            <PropertyFeed properties={filteredProperties} />
          </section>
        </>
      ) : null}
    </div>
  );
}
