"use client";

import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { facetLabel } from "@/lib/facet-labels";
import { DIFFICULTY_KEYS, FRESHNESS_KEYS, PLATFORM_KEYS, PRICE_KEYS, STATUS_KEYS, TYPE_KEYS } from "@/lib/facets";
import type { FacetKey, Facets } from "@/lib/filters";
import { CATEGORIES, CATEGORY_KEYS, type CategoryKey } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

type Group = { facet: FacetKey; title: string; values: readonly string[] | "languages"; showEmpty?: boolean };

const GROUPS: Group[] = [
  { facet: "category", title: "Category", values: CATEGORY_KEYS, showEmpty: true },
  { facet: "type", title: "Type", values: TYPE_KEYS },
  { facet: "platform", title: "Platform", values: PLATFORM_KEYS },
  { facet: "difficulty", title: "Difficulty", values: DIFFICULTY_KEYS },
  { facet: "price", title: "Price", values: PRICE_KEYS },
  { facet: "freshness", title: "Last activity", values: FRESHNESS_KEYS },
  { facet: "status", title: "Status", values: STATUS_KEYS },
  { facet: "language", title: "Language", values: "languages" },
];

type Props = {
  facets: Facets;
  counts: (facet: FacetKey) => Map<string, number>;
  languages: string[];
  hideCategory?: boolean;
  onToggle: (facet: FacetKey, value: string) => void;
};

export function FilterPanel({ facets, counts, languages, hideCategory = false, onToggle }: Props) {
  return (
    <div className="space-y-1">
      {GROUPS.filter((group) => !(hideCategory && group.facet === "category")).map((group) => {
        const values = group.values === "languages" ? languages : group.values;
        const groupCounts = counts(group.facet);
        const selected = facets[group.facet];
        const visible = values.filter((v) => group.showEmpty || (groupCounts.get(v) ?? 0) > 0 || selected.includes(v));
        if (visible.length === 0) return null;

        return (
          <details key={group.facet} open className="group border-b pb-2 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
              {group.title}
              {selected.length > 0 ? (
                <span className="rounded-full bg-foreground px-1.5 text-[10px] leading-4 text-background">{selected.length}</span>
              ) : null}
              <ChevronDown aria-hidden className="ml-auto size-4 transition group-open:rotate-180" />
            </summary>
            <fieldset>
              <legend className="sr-only">{group.title}</legend>
              <ul className="space-y-0.5">
                {visible.map((value) => {
                  const count = groupCounts.get(value) ?? 0;
                  const checked = selected.includes(value);
                  const id = `filter-${group.facet}-${value.replace(/[^a-z0-9-]/gi, "_")}`;
                  return (
                    <li key={value}>
                      <label
                        htmlFor={id}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-muted",
                          count === 0 && !checked && "opacity-50",
                        )}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(group.facet, value)}
                          className="size-4 shrink-0 cursor-pointer accent-foreground"
                        />
                        {group.facet === "category" ? (
                          <span
                            aria-hidden
                            className="tint-dot size-2 shrink-0 rounded-full"
                            style={{ "--h": CATEGORIES[value as CategoryKey].hue } as CSSProperties}
                          />
                        ) : null}
                        <span className="min-w-0 flex-1 truncate">{facetLabel(group.facet, value)}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </details>
        );
      })}
    </div>
  );
}
