/*
::neup.documentation::property-bridge-listings
::function getProperties()
::title Property Bridge Listings

::public

Fetches the public property feed through the Logica estate object API and
normalizes each entry into the website listing shape.

::returns
::datatype Promise<PropertyListing[]>

A promise that resolves to the normalized property listings used by the home and
properties pages.

::public end

::private

The Logica estate object is scoped by agency id. The implementation also accepts
legacy `PROPERTIES_ACCOUNT_ID` environment configuration as a fallback source
for the agency identifier.

::private end

::end
*/
import { logica } from "@/logica";

const DEFAULT_AGENCY_ID = "2a1511da-1092-4c1a-bb4a-973c301d2670";

export type PropertyApiAgency = {
  id?: string;
  name?: string;
  logoUrl?: string;
};

export type PropertyApiItem = {
  id?: string;
  slug?: string;
  title?: string;
  price?: number | string;
  location?: string;
  purpose?: string;
  category?: string;
  type?: string;
  images?: string[];
  agency?: PropertyApiAgency;
  listingAgent?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AccountLookupRecord = {
  accountId?: string;
  displayName?: string;
  displayImage?: string;
  accountType?: string;
  neupId?: string;
};

export type PropertyListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  purpose: string;
  category: string;
  type: string;
  priceLabel: string;
  priceValue: number | null;
  agencyName: string;
  agencyLogoUrl: string;
  status: string;
  images: string[];
  imageUrl: string | null;
  imageCount: number;
  summary: string;
  listingAgent: string;
  listingAgentAccountId: string;
  listingAgentNeupId: string;
  listingAgentImageUrl: string;
  createdAt: string | null;
};

export type AgentProfile = {
  accountId: string;
  displayName: string;
  displayImage: string;
  neupId: string;
  properties: PropertyListing[];
};

type AccountDirectory = Map<string, AccountLookupRecord>;
type AccountDirectoryEntry = readonly [string, AccountLookupRecord];

function getPropertiesAgencyId() {
  return (
    process.env.PROPERTIES_AGENCY_ID ??
    process.env.PROPERTIES_ACCOUNT_ID ??
    DEFAULT_AGENCY_ID
  );
}

function formatPrice(priceValue: number | null) {
  if (priceValue === null || Number.isNaN(priceValue)) {
    return "Price on request";
  }

  return `Rs ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(priceValue)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeApiAgency(value: unknown): PropertyApiAgency | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return {
    id: getString(value.id),
    name: getString(value.name),
    logoUrl: getString(value.logoUrl),
  };
}

function normalizeApiItem(value: unknown): PropertyApiItem | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    id: getString(value.id),
    slug: getString(value.slug),
    title: getString(value.title),
    price:
      typeof value.price === "number" || typeof value.price === "string"
        ? value.price
        : undefined,
    location: getString(value.location),
    purpose: getString(value.purpose),
    category: getString(value.category),
    type: getString(value.type),
    images: getStringArray(value.images),
    agency: normalizeApiAgency(value.agency),
    listingAgent: getString(value.listingAgent),
    status: getString(value.status),
    createdAt: getString(value.createdAt),
    updatedAt: getString(value.updatedAt),
  };
}

async function getAccountDirectory(
  properties: PropertyApiItem[],
): Promise<AccountDirectory> {
  const accountIds = Array.from(
    new Set(
      properties.flatMap((property) =>
        [property.agency?.id?.trim(), property.listingAgent?.trim()].filter(
          (accountId): accountId is string => Boolean(accountId),
        ),
      ),
    ),
  );

  const accountEntries: (AccountDirectoryEntry | null)[] = await Promise.all(
    accountIds.map(async (accountId) => {
      try {
        const response = await logica.account.lookup.byId(accountId).get([
          "neupid",
          "displayName",
          "accountId",
          "displayImage",
          "accountType",
        ]);

        if (!response.ok || !response.body.success || !response.body.accountId) {
          return null;
        }

        return [
          response.body.accountId,
          {
            accountId: response.body.accountId,
            displayName: response.body.displayName ?? undefined,
            displayImage: response.body.displayImage ?? undefined,
            accountType: response.body.accountType ?? undefined,
            neupId: response.body.neupid ?? undefined,
          },
        ] satisfies AccountDirectoryEntry;
      } catch {
        return null;
      }
    }),
  );

  return new Map(
    accountEntries.filter(
      (entry): entry is AccountDirectoryEntry => Boolean(entry),
    ),
  );
}

function normalizeProperty(
  item: PropertyApiItem,
  accountDirectory: AccountDirectory,
): PropertyListing | null {
  const title = item.title?.trim();
  const slug = item.slug?.trim();

  if (!title || !slug) {
    return null;
  }

  const agencyId = item.agency?.id?.trim() || "";
  const agencyAccount = accountDirectory.get(agencyId);
  const listingAgentId = item.listingAgent?.trim() || "";
  const listingAgentAccount = accountDirectory.get(listingAgentId);
  const priceValue = typeof item.price === "number" ? item.price : Number(item.price);
  const agencyName =
    agencyAccount?.displayName?.trim() || item.agency?.name?.trim() || "Owner";
  const images = item.images?.filter((image) => Boolean(image?.trim())) ?? [];
  const imageUrl = images[0] ?? null;
  const location = item.location?.trim() || "Location unavailable";
  const purpose = item.purpose?.trim() || "Listing";
  const category = item.category?.trim() || "Property";
  const type = item.type?.trim() || "Listing";
  const listingAgent =
    listingAgentAccount?.displayName?.trim() ||
    item.listingAgent?.trim() ||
    `${agencyName} Desk`;
  const listingAgentAccountId =
    listingAgentAccount?.accountId?.trim() || item.listingAgent?.trim() || "";
  const listingAgentNeupId = listingAgentAccount?.neupId?.trim() || "";
  const listingAgentImageUrl = listingAgentAccount?.displayImage?.trim() || "";

  return {
    id: item.id ?? slug,
    slug,
    title,
    location,
    purpose,
    category,
    type,
    priceLabel: formatPrice(Number.isFinite(priceValue) ? priceValue : null),
    priceValue: Number.isFinite(priceValue) ? priceValue : null,
    agencyName,
    agencyLogoUrl:
      agencyAccount?.displayImage?.trim() || item.agency?.logoUrl?.trim() || "",
    status: item.status?.trim() || "UNKNOWN",
    images,
    imageUrl,
    imageCount: images.length,
    summary: `${purpose} ${category.toLowerCase()} in ${location}.`,
    listingAgent,
    listingAgentAccountId,
    listingAgentNeupId,
    listingAgentImageUrl,
    createdAt: item.createdAt?.trim() || null,
  };
}

export async function getProperties(): Promise<PropertyListing[]> {
  try {
    const response = await logica.estate
      .agency(getPropertiesAgencyId())
      .property.list();
    const properties = response.body.properties
      .map((item) => normalizeApiItem(item))
      .filter((item): item is PropertyApiItem => Boolean(item));

    if (!response.ok || !response.body.success) {
      return [];
    }

    const accountDirectory = await getAccountDirectory(properties);

    return properties
      .map((item) => normalizeProperty(item, accountDirectory))
      .filter((item): item is PropertyListing => Boolean(item));
  } catch {
    return [];
  }
}

export async function getAgentProfileByNeupId(
  neupId: string,
): Promise<AgentProfile | null> {
  const normalizedNeupId = neupId.trim().toLowerCase();

  if (!normalizedNeupId) {
    return null;
  }

  const properties = await getProperties();
  const agentProperties = properties.filter(
    (property) => property.listingAgentNeupId.toLowerCase() === normalizedNeupId,
  );

  if (agentProperties.length === 0) {
    return null;
  }

  const [firstProperty] = agentProperties;

  return {
    accountId: firstProperty.listingAgentAccountId,
    displayName: firstProperty.listingAgent,
    displayImage: firstProperty.listingAgentImageUrl,
    neupId: firstProperty.listingAgentNeupId,
    properties: agentProperties,
  };
}
