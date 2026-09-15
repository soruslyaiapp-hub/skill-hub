const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

/** 80428 -> "80.4K" */
export function formatCompact(value: number): string {
  return compact.format(value);
}

/** "2026-09-14" -> "Sep 14, 2026" (UTC, so server and browser agree). */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
