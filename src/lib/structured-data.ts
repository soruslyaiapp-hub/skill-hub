// schema.org JSON-LD for search engines.
import type { Skill } from "./content/parse";
import { absoluteUrl, site } from "./site";
import { CATEGORIES } from "./taxonomy";

type JsonLd = Record<string, unknown>;

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/skills")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function skillJsonLd(skill: Skill): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: skill.name,
    description: skill.tagline,
    url: absoluteUrl(`/skills/${skill.slug}`),
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: CATEGORIES[skill.category].name,
    operatingSystem: "Any",
    keywords: skill.tags.join(", "),
    sameAs: [skill.links.source],
    author: { "@type": "Organization", name: skill.author.name, ...(skill.author.url ? { url: skill.author.url } : {}) },
    datePublished: skill.addedAt,
    dateModified: skill.updatedAt,
    ...(skill.price === "free" ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
