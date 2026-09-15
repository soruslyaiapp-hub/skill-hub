/** ISO 8601 week number (weeks start on Monday; week 1 holds the first Thursday). */
export function isoWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return { year: d.getUTCFullYear(), week: Math.ceil(((d.getTime() - yearStart) / 86_400_000 + 1) / 7) };
}

/** One featured skill per week, in a fixed rotation. Falls back to all skills when none are featured. */
export function skillOfTheWeek<T extends { slug: string; featured: boolean }>(skills: T[], date: Date): { skill: T; week: number; year: number } | null {
  const featured = skills.filter((s) => s.featured);
  const pool = (featured.length > 0 ? featured : skills).slice().sort((a, b) => a.slug.localeCompare(b.slug));
  if (pool.length === 0) return null;
  const { year, week } = isoWeek(date);
  return { skill: pool[(year * 53 + week) % pool.length], week, year };
}
