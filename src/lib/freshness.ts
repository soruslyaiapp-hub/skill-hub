import type { FreshnessKey } from "./facets";

const DAY_MS = 86_400_000;

export function daysSince(isoDate: string, now: Date): number {
  return Math.floor((now.getTime() - Date.parse(`${isoDate}T00:00:00Z`)) / DAY_MS);
}

/** Green under 30 days, amber under ~6 months, grey after that. */
export function freshnessOf(isoDate: string, now: Date): FreshnessKey {
  const days = daysSince(isoDate, now);
  if (days < 30) return "fresh";
  if (days < 183) return "recent";
  return "stale";
}
