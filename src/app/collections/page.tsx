import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { categoriesOf, getSummaries } from "@/lib/catalog";
import { getAllCollections } from "@/lib/content/collections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Hand-picked stacks of AI skills and tools that work well together.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  const bySlug = new Map(getSummaries().map((s) => [s.slug, s]));
  return (
    <Container className="py-10">
      <PageHeader title="Collections" description="Hand-picked stacks of skills and tools that work well together." />
      <h2 className="sr-only">All collections</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getAllCollections().map((c) => (
          <CollectionCard key={c.slug} collection={c} categories={categoriesOf(c.skills, bySlug)} />
        ))}
      </div>
    </Container>
  );
}
