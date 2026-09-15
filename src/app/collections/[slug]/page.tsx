import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { SkillGrid } from "@/components/skill-grid";
import { getSummaries } from "@/lib/catalog";
import { getAllCollections, getCollection } from "@/lib/content/collections";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description, alternates: { canonical: `/collections/${collection.slug}` } };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const bySlug = new Map(getSummaries().map((s) => [s.slug, s]));
  const skills = collection.skills.flatMap((slug) => bySlug.get(slug) ?? []);

  return (
    <Container className="py-10">
      <p className="text-sm text-muted-foreground">
        <Link href="/collections" className="hover:text-foreground">Collections</Link>
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{collection.title}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{collection.description}</p>
      {collection.body ? (
        <div className="mt-6 max-w-3xl">
          <Markdown>{collection.body}</Markdown>
        </div>
      ) : null}
      <div className="mt-10">
        <SkillGrid skills={skills} label={`Skills in ${collection.title}`} />
      </div>
    </Container>
  );
}
