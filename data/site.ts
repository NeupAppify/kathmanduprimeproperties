export const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About us" },
  { href: "/team", label: "Our team" },
] as const;

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About us" },
  { href: "/team", label: "Our team" },
] as const;

export const serviceAreas = ["Kathmandu", "Lalitpur", "Bhaktapur"] as const;

export const homeStats = [
  { value: "120+", label: "Homes advised" },
  { value: "3", label: "Core service areas" },
  { value: "14 days", label: "Average launch cycle" },
] as const;

export const marketSignals = [
  { label: "Bedrooms", value: "3" },
  { label: "Baths", value: "3" },
  { label: "View", value: "City" },
] as const;

export const homeServices = [
  {
    tag: "Selling",
    title: "List with confidence.",
    description: "Pricing, visuals, and positioning tailored to buyer intent.",
  },
  {
    tag: "Buying",
    title: "Buy with clarity.",
    description: "Curated options, local insight, and direct advisory.",
  },
  {
    tag: "Valuation",
    title: "Value with precision.",
    description: "Evidence-led valuation that protects time and negotiation power.",
  },
] as const;

export const sellingSteps = [
  {
    title: "Discover",
    description:
      "We audit the home, micro-market, and buyer fit.",
  },
  {
    title: "Present",
    description:
      "We shape pricing, visuals, and messaging for launch.",
  },
  {
    title: "Close",
    description:
      "We negotiate with discipline through to handover.",
  },
] as const;

export const neighborhoods = [
  {
    scope: "Central Kathmandu",
    name: "Lazimpat and nearby districts",
    note:
      "Executive homes with high access value.",
  },
  {
    scope: "Kathmandu core",
    name: "Buddhanagar and surrounding areas",
    note:
      "Family homes with practical positioning needs.",
  },
  {
    scope: "Valley lifestyle",
    name: "Jhamsikhel and central Lalitpur",
    note:
      "Walkable districts with rental upside.",
  },
  {
    scope: "City fringe",
    name: "Bhaktapur premium pockets",
    note:
      "Larger plots with calmer surroundings.",
  },
] as const;

export const testimonials = [
  {
    name: "Anika Shrestha",
    role: "Property seller, Kathmandu",
    quote:
      "Sharp listing, clear communication, quick buyer response.",
  },
  {
    name: "Rohit Manandhar",
    role: "Investor, Lalitpur",
    quote:
      "Straight advice on pricing made decisions easy.",
  },
  {
    name: "Sita Koirala",
    role: "Homebuyer, Kathmandu",
    quote:
      "Premium presentation without unnecessary noise.",
  },
] as const;

export const propertiesPageHero = {
  title: "Curated properties across Kathmandu Valley.",
  description:
    "Clear pricing, concise context, and refined listing presentation.",
} as const;

export const aboutHighlights = [
  "Classic tone, modern clarity.",
  "Pricing shaped by local context.",
  "Premium listings, easy to read.",
] as const;

export const teamMembers = [
  {
    name: "Sanjay Basnet",
    role: "Founder and principal advisor",
    focus: "Strategy, valuation, and seller representation",
    bio:
      "Leads strategy with market discipline and calm communication.",
  },
  {
    name: "Mira Thapa",
    role: "Buyer advisor",
    focus: "Shortlists, tours, and neighborhood guidance",
    bio:
      "Helps buyers compare homes and act with confidence.",
  },
  {
    name: "Aarav KC",
    role: "Listing specialist",
    focus: "Presentation, copy, and launch coordination",
    bio:
      "Builds listing presentation with precision and consistency.",
  },
  {
    name: "Nisha Ghimire",
    role: "Client operations",
    focus: "Scheduling, follow-up, and deal support",
    bio:
      "Keeps every transaction organized and on pace.",
  },
] as const;
