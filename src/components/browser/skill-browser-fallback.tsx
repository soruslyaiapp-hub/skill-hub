import { Search } from "lucide-react";
import { SkillGrid } from "@/components/skill-grid";
import type { SkillSummary } from "@/lib/summary";

/** Server-rendered stand-in for the browser: same layout and the full card list (good for SEO and no-JS). */
export function SkillBrowserFallback({ skills }: { skills: SkillSummary[] }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div aria-hidden className="hidden space-y-3 lg:block lg:w-60 lg:shrink-0">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-8 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative">
          <Search aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <div className="h-10 w-full rounded-lg border bg-background" />
        </div>
        <p className="mt-4 min-h-7 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{skills.length}</span> skills
        </p>
        <div className="mt-4">
          <SkillGrid skills={skills} label="Results" />
        </div>
      </div>
    </div>
  );
}
