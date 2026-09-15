"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { COMPARE_ROWS, type CompareSkill } from "@/lib/compare";
import { cn } from "@/lib/utils";

type Side = "a" | "b";

export function CompareView({ skills }: { skills: CompareSkill[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const groups = useMemo(() => {
    const map = new Map<string, CompareSkill[]>();
    for (const s of skills) map.set(s.category, [...(map.get(s.category) ?? []), s]);
    return [...map];
  }, [skills]);

  const picked = (side: Side) => skills.find((s) => s.slug === params.get(side));
  const left = picked("a");
  const right = picked("b");

  function choose(side: Side, slug: string) {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set(side, slug);
    else next.delete(side);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const selector = (side: Side, value: CompareSkill | undefined, label: string) => (
    <div className="min-w-0 flex-1">
      <label htmlFor={`compare-${side}`} className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        id={`compare-${side}`}
        value={value?.slug ?? ""}
        onChange={(e) => choose(side, e.target.value)}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        <option value="">Pick a skill</option>
        {groups.map(([category, list]) => (
          <optgroup key={category} label={category}>
            {list.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        {selector("a", left, "First skill")}
        {selector("b", right, "Second skill")}
      </div>
      {left || right ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[36rem] text-sm">
            <caption className="sr-only">Side-by-side comparison</caption>
            <thead>
              <tr className="border-b bg-muted/40">
                <th scope="col" className="w-36 px-4 py-3 text-left font-medium text-muted-foreground">Field</th>
                {[left, right].map((s, i) => (
                  <th key={i} scope="col" className="px-4 py-3 text-left align-top">
                    {s ? (
                      <>
                        <Link href={`/skills/${s.slug}`} className="font-semibold hover:underline">{s.name}</Link>
                        <p className="mt-1 font-normal text-muted-foreground">{s.tagline}</p>
                      </>
                    ) : (
                      <span className="font-normal text-muted-foreground">Not picked yet</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([key, label]) => {
                const differ = Boolean(left && right && left.values[key] !== right.values[key]);
                return (
                  <tr key={key} className="border-b last:border-b-0">
                    <th scope="row" className="px-4 py-3 text-left font-medium text-muted-foreground">{label}</th>
                    {[left, right].map((s, i) => (
                      <td key={i} className={cn("px-4 py-3 align-top", key === "install" && "break-all font-mono text-xs", differ && "font-medium")}>
                        {s ? s.values[key] : "—"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed px-6 py-12 text-center text-muted-foreground">Pick two skills above to see them side by side.</p>
      )}
    </div>
  );
}
