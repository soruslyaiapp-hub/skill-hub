import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { countByCategory, getSummaries } from "@/lib/catalog";
import { categoryList } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Categories",
  description: "Every skill has one primary category: the job it does.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const counts = countByCategory(getSummaries());
  return (
    <Container className="py-10">
      <PageHeader title="Categories" description="Every skill has one primary category: the job it does. Tags and filters cover the rest." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((category) => (
          <CategoryCard key={category.key} category={category} count={counts[category.key]} />
        ))}
      </div>
    </Container>
  );
}
