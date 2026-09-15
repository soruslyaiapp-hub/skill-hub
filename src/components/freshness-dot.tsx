import type { FreshnessKey } from "@/lib/facets";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const DOT: Record<FreshnessKey, string> = {
  fresh: "bg-emerald-500",
  recent: "bg-amber-500",
  stale: "bg-zinc-400 dark:bg-zinc-500",
};

const LABEL: Record<FreshnessKey, string> = {
  fresh: "Active",
  recent: "Recent",
  stale: "Stale",
};

export function FreshnessDot({ freshness, date, withLabel = false, className }: { freshness: FreshnessKey; date: string; withLabel?: boolean; className?: string }) {
  const title = `Last activity ${formatDate(date)}`;
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} title={title}>
      <span aria-hidden className={cn("size-2 rounded-full", DOT[freshness])} />
      {withLabel ? <span>{LABEL[freshness]}</span> : <span className="sr-only">{`${LABEL[freshness]}. ${title}`}</span>}
    </span>
  );
}
