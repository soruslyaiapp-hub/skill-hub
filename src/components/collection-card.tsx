import Link from "next/link";
import type { Collection } from "@/lib/content/collections";
import type { CategoryKey } from "@/lib/taxonomy";
import { CategoryTile } from "./category-icon";

export function CollectionCard({ collection, categories }: { collection: Collection; categories: CategoryKey[] }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex flex-col gap-4 rounded-xl border bg-card p-5 outline-none transition hover:border-foreground/20 hover:shadow-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="flex -space-x-2">
        {categories.slice(0, 4).map((category) => (
          <CategoryTile key={category} category={category} size="sm" className="ring-2 ring-card" />
        ))}
      </div>
      <div>
        <h3 className="font-semibold leading-snug underline-offset-4 group-hover:underline">{collection.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{collection.description}</p>
      </div>
      <p className="mt-auto text-xs text-muted-foreground">{collection.skills.length} skills</p>
    </Link>
  );
}
