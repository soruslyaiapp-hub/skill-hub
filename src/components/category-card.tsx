import Link from "next/link";
import type { CategoryMeta } from "@/lib/taxonomy";
import { CategoryTile } from "./category-icon";

export function CategoryCard({ category, count }: { category: CategoryMeta; count: number }) {
  return (
    <Link
      href={`/categories/${category.key}`}
      className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition hover:border-foreground/20 hover:shadow-sm"
    >
      <CategoryTile category={category.key} />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="font-medium group-hover:underline group-hover:underline-offset-4">{category.name}</span>
          <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
        </span>
        <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{category.description}</span>
      </span>
    </Link>
  );
}
