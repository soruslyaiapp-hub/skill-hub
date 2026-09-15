import type { MetadataRoute } from "next";
import { getSummaries, getTagCounts } from "@/lib/catalog";
import { getAllSkills } from "@/lib/content/skills";
import { absoluteUrl } from "@/lib/site";
import { CATEGORY_KEYS } from "@/lib/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const skills = getAllSkills();
  const newest = skills.reduce((max, s) => (s.updatedAt > max ? s.updatedAt : max), "1970-01-01");
  return [
    { url: absoluteUrl("/"), lastModified: newest, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/skills"), lastModified: newest, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/categories"), changeFrequency: "weekly", priority: 0.6 },
    ...CATEGORY_KEYS.map((key) => ({ url: absoluteUrl(`/categories/${key}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...skills.map((skill) => ({
      url: absoluteUrl(`/skills/${skill.slug}`),
      lastModified: skill.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getTagCounts(getSummaries()).map(({ tag }) => ({ url: absoluteUrl(`/tags/${tag}`), changeFrequency: "weekly" as const, priority: 0.3 })),
  ];
}
