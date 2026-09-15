import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  activeFacetCount,
  applyFilters,
  emptyFacets,
  facetCounts,
  parseFilters,
  toggleFacetValue,
  toQueryString,
  type FacetKey,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { createSearch } from "@/lib/search";
import type { SkillSummary } from "@/lib/summary";
import type { CategoryKey } from "@/lib/taxonomy";

/** Browse-page state lives in the URL. The search box is local and syncs to the URL after a short pause. */
export function useBrowserState(skills: SkillSummary[], lockedCategory?: CategoryKey) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const parsed = useMemo(() => parseFilters(params), [params]);
  const urlState: FilterState = lockedCategory ? { ...parsed, facets: { ...parsed.facets, category: [] } } : parsed;

  // `syncedQ` is the last query seen in (or pushed to) the URL, so back/forward still updates the box.
  const [q, setQ] = useState(urlState.q);
  const [syncedQ, setSyncedQ] = useState(urlState.q);
  if (urlState.q !== syncedQ) {
    setSyncedQ(urlState.q);
    setQ(urlState.q);
  }

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const base = useMemo(() => (lockedCategory ? skills.filter((s) => s.category === lockedCategory) : skills), [skills, lockedCategory]);
  const search = useMemo(() => createSearch(base), [base]);
  const order = useMemo(() => search(q), [search, q]);
  const pool = useMemo(() => {
    if (!order) return base;
    const bySlug = new Map(base.map((s) => [s.slug, s]));
    return order.flatMap((slug) => bySlug.get(slug) ?? []);
  }, [base, order]);
  const languages = useMemo(() => [...new Set(base.flatMap((s) => (s.language ? [s.language] : [])))].sort(), [base]);

  const state: FilterState = { ...urlState, q };
  const defaultSort: SortKey = order ? "relevance" : "newest";

  function navigate(next: FilterState) {
    clearTimeout(timer.current);
    setSyncedQ(next.q.trim());
    const qs = toQueryString(next);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return {
    q,
    state,
    hasQuery: order !== null,
    languages,
    results: applyFilters(base, state, order),
    activeCount: activeFacetCount(state.facets),
    sort: state.sort ?? defaultSort,
    counts: (facet: FacetKey) => facetCounts(pool, state.facets, facet),
    setQuery(value: string) {
      setQ(value);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => navigate({ ...urlState, q: value }), 250);
    },
    toggle(facet: FacetKey, value: string) {
      navigate(toggleFacetValue(state, facet, value));
    },
    setSort(value: SortKey) {
      navigate({ ...state, sort: value === defaultSort ? null : value });
    },
    clearAll() {
      setQ("");
      navigate({ q: "", sort: null, facets: emptyFacets() });
    },
  };
}

/** Focus the input when the user presses "/" outside a text field. */
export function useSlashToFocus(ref: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      event.preventDefault();
      ref.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ref]);
}
