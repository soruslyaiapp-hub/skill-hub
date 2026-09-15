"use client";

import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import { SkillGrid } from "@/components/skill-grid";
import { buttonVariants } from "@/components/ui/button";
import { facetLabel } from "@/lib/facet-labels";
import { FACET_KEYS, SORT_KEYS, SORT_LABELS, type SortKey } from "@/lib/filters";
import type { SkillSummary } from "@/lib/summary";
import type { CategoryKey } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";
import { FilterPanel } from "./filter-panel";
import { useBrowserState, useSlashToFocus } from "./use-browser-state";

export function SkillBrowser({ skills, lockedCategory }: { skills: SkillSummary[]; lockedCategory?: CategoryKey }) {
  const view = useBrowserState(skills, lockedCategory);
  const [panelOpen, setPanelOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useSlashToFocus(inputRef);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside aria-label="Filters" className={cn("lg:block lg:w-60 lg:shrink-0", panelOpen ? "block" : "hidden")}>
        <FilterPanel
          facets={view.state.facets}
          counts={view.counts}
          languages={view.languages}
          hideCategory={Boolean(lockedCategory)}
          onToggle={view.toggle}
        />
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1 basis-60">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={inputRef}
              type="search"
              value={view.q}
              onChange={(event) => view.setQuery(event.target.value)}
              placeholder="Search skills"
              aria-label="Search skills"
              className="h-10 w-full rounded-lg border bg-background pl-9 pr-10 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            />
            {!view.q ? (
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground sm:block">
                /
              </kbd>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            aria-expanded={panelOpen}
            className={cn(buttonVariants({ variant: "outline" }), "h-10 px-3 lg:hidden")}
          >
            <SlidersHorizontal />
            Filters{view.activeCount ? ` (${view.activeCount})` : ""}
          </button>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={view.sort}
            onChange={(event) => view.setSort(event.target.value as SortKey)}
            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            {SORT_KEYS.filter((key) => key !== "relevance" || view.hasQuery).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex min-h-7 flex-wrap items-center gap-2 text-sm">
          <p className="mr-1 text-muted-foreground" aria-live="polite">
            <span className="font-medium tabular-nums text-foreground">{view.results.length}</span>{" "}
            {view.results.length === 1 ? "skill" : "skills"}
          </p>
          {FACET_KEYS.flatMap((facet) =>
            view.state.facets[facet].map((value) => (
              <button
                key={`${facet}:${value}`}
                type="button"
                onClick={() => view.toggle(facet, value)}
                aria-label={`Remove filter ${facetLabel(facet, value)}`}
                className="inline-flex items-center gap-1 rounded-full border bg-muted/60 py-0.5 pl-2.5 pr-1.5 text-xs font-medium transition hover:bg-muted"
              >
                {facetLabel(facet, value)}
                <X aria-hidden className="size-3" />
              </button>
            )),
          )}
          {view.activeCount > 0 || view.q ? (
            <button type="button" onClick={view.clearAll} className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Clear all
            </button>
          ) : null}
        </div>

        <div className="mt-4">
          {view.results.length > 0 ? (
            <SkillGrid skills={view.results} label="Results" />
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center">
              <SearchX aria-hidden className="size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No skills match.</p>
              <p className="mt-1 text-sm text-muted-foreground">Try fewer filters or a shorter search.</p>
              <button type="button" onClick={view.clearAll} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
