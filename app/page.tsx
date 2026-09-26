import { PropertyFeed } from "@/components/property-feed";
import { getProperties } from "@/lib/properties";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const properties = await getProperties();

  return <PropertyFeed properties={properties} />;
}
