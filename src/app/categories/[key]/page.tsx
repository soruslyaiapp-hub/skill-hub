import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SkillBrowser } from "@/components/browser/skill-browser";
import { SkillBrowserFallback } from "@/components/browser/skill-browser-fallback";
import { CategoryTile, hueStyle } from "@/components/category-icon";
import { Container } from "@/components/container";
import { getSummaries } from "@/lib/catalog";
import { CATEGORIES, CATEGORY_KEYS, type CategoryKey } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_KEYS.map((key) => ({ key }));
}

function findCategory(key: string) {
  return (CATEGORY_KEYS as readonly string[]).includes(key) ? CATEGORIES[key as CategoryKey] : undefined;
}

export async function generateMetadata({ params }: PageProps<"/categories/[key]">): Promise<Metadata> {
  const category = findCategory((await params).key);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.description} Browse ${category.name} skills, agents and tools.`,
    alternates: { canonical: `/categories/${category.key}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[key]">) {
  const category = findCategory((await params).key);
  if (!category) notFound();
  const skills = getSummaries().filter((skill) => skill.category === category.key);

  return (
    <Container className="py-10">
      <div style={hueStyle(category.key)} className="tint-soft mb-8 flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8">
        <CategoryTile category={category.key} size="lg" />
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            <Link href="/categories" className="hover:text-foreground">Categories</Link>
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
        </div>
        <p className="text-sm text-muted-foreground sm:ml-auto">
          <span className="text-2xl font-semibold tabular-nums text-foreground">{skills.length}</span> {skills.length === 1 ? "skill" : "skills"}
        </p>
      </div>
      {skills.length > 0 ? (
        <Suspense fallback={<SkillBrowserFallback skills={skills} />}>
          <SkillBrowser skills={skills} lockedCategory={category.key} />
        </Suspense>
      ) : (
        <div className="rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">No skills here yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">Know a good one? It can be the first.</p>
        </div>
      )}
    </Container>
  );
}
