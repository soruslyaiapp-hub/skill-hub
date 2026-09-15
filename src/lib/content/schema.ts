import { z } from "zod";
import { CATEGORY_KEYS } from "../taxonomy";
import { DIFFICULTY_KEYS, PLATFORM_KEYS, PRICE_KEYS, STATUS_KEYS, TYPE_KEYS } from "../facets";

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const httpsUrl = z.string().trim().refine(isHttpsUrl, "must be a full https:// URL");

// Local files live in /public and are referenced as "/covers/x.png".
const assetPath = z
  .string()
  .trim()
  .refine(
    (v) => (v.startsWith("/") ? !v.includes("..") : isHttpsUrl(v)),
    "must be a /public path (like /covers/x.png) or an https:// URL",
  );

const isoDate = z
  .string()
  .regex(DATE_RE, "must be a date like 2026-09-15")
  .refine((v) => !Number.isNaN(Date.parse(v)), "is not a real date");

const linkedinUrl = httpsUrl.refine(
  (v) => new URL(v).hostname.replace(/^www\./, "").endsWith("linkedin.com"),
  "must be a linkedin.com URL",
);

export const skillSchema = z.strictObject({
  slug: z.string().regex(SLUG_RE, "must be lowercase-kebab-case, like my-skill"),
  name: z.string().trim().min(2, "use 2 to 60 characters").max(60, "use 2 to 60 characters"),
  tagline: z.string().trim().min(10, "use 10 to 140 characters").max(140, "use 10 to 140 characters"),
  category: z.enum(CATEGORY_KEYS),
  type: z.enum(TYPE_KEYS),
  tags: z.array(z.string().regex(SLUG_RE, "tags must be lowercase-kebab-case")).max(8).default([]),
  platforms: z.array(z.enum(PLATFORM_KEYS)).min(1, "pick at least one platform"),
  difficulty: z.enum(DIFFICULTY_KEYS),
  price: z.enum(PRICE_KEYS),
  status: z.enum(STATUS_KEYS).default("community"),
  language: z.string().trim().max(30).optional(),
  author: z.strictObject({
    name: z.string().trim().min(1, "is required").max(80),
    url: httpsUrl.optional(),
  }),
  links: z.strictObject({
    source: httpsUrl,
    docs: httpsUrl.optional(),
    install: z.string().trim().max(400).optional(),
  }),
  media: z
    .strictObject({
      cover: assetPath.optional(),
      video: httpsUrl.optional(),
      screenshots: z.array(assetPath).max(8).default([]),
    })
    .prefault({}),
  origin: z
    .strictObject({
      linkedinUrl: linkedinUrl.optional(),
      postedAt: isoDate.optional(),
    })
    .prefault({}),
  // Filled by `npm run sync:github`. Do not edit by hand.
  metrics: z
    .strictObject({
      githubStars: z.number().int().nonnegative().optional(),
      lastCommit: isoDate.nullable().optional(),
      license: z.string().nullable().optional(),
      archived: z.boolean().optional(),
    })
    .prefault({}),
  addedAt: isoDate,
  updatedAt: isoDate,
  featured: z.boolean().default(false),
});

export type SkillFrontMatter = z.output<typeof skillSchema>;
export type SkillFrontMatterInput = z.input<typeof skillSchema>;
