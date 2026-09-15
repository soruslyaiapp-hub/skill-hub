import { Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { SkillGrid } from "@/components/skill-grid";
import { buttonVariants } from "@/components/ui/button";
import { countByCategory, getSummaries } from "@/lib/catalog";
import { CATEGORIES, categoryList } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

const POPULAR = ["token-cost", "coding", "media", "agent-optimization"] as const;

export default function HomePage() {
  const skills = getSummaries();
  const counts = countByCategory(skills);

  return (
    <>
      <section className="border-b bg-gradient-to-b from-muted/60 to-background">
        <Container className="py-16 sm:py-24">
          <p className="text-sm font-medium text-muted-foreground">
            {skills.length} skills · {categoryList.length} categories · open source
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Find the right AI skill for the job.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Skills, agents, MCP servers and tools for Claude Code, Codex, Cursor and more, sorted by what they actually do.
          </p>
          <Form action="/skills" role="search" className="mt-8 flex max-w-xl gap-2">
            <label htmlFor="hero-search" className="sr-only">
              Search skills
            </label>
            <div className="relative flex-1">
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Try token, video or browser"
                className="h-12 w-full rounded-xl border bg-background pl-11 pr-3 text-base shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              />
            </div>
            <button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-xl px-5")}>
              Search
            </button>
          </Form>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {POPULAR.map((key) => (
              <Link key={key} href={`/categories/${key}`} className="rounded-full border bg-background px-3 py-1 transition hover:bg-muted">
                {CATEGORIES[key].short}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeader title="Browse by category" href="/categories" linkLabel="All categories" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((category) => (
            <CategoryCard key={category.key} category={category} count={counts[category.key]} />
          ))}
        </div>
      </Container>

      <Container className="pb-6">
        <SectionHeader title="Recently added" href="/skills" linkLabel="Browse all" />
        <SkillGrid skills={skills.slice(0, 6)} />
      </Container>
    </>
  );
}
