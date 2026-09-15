"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button";
import { draftToFile, EMPTY_DRAFT, githubLinks, type DraftField, type SubmissionDraft } from "@/lib/submission";
import { cn } from "@/lib/utils";
import type { FormCtx } from "./fields";
import { BasicsSection, ClassifySection, CreditSection, WriteupSection } from "./sections";
import { SubmitPreview } from "./submit-preview";

const noSubscribe = () => () => {};
const todayIso = () => new Date().toISOString().slice(0, 10);

export function SubmitForm({ repo }: { repo: { url: string; branch: string } | null }) {
  const [draft, setDraft] = useState<SubmissionDraft>(EMPTY_DRAFT);
  const [touched, setTouched] = useState<ReadonlySet<DraftField>>(new Set());
  const [showAll, setShowAll] = useState(false);
  // The server renders a fixed date; the browser swaps in today after hydration.
  const today = useSyncExternalStore(noSubscribe, todayIso, () => "2026-01-01");

  const result = useMemo(() => draftToFile(draft, today), [draft, today]);
  const firstError = useMemo(() => {
    const map = new Map<DraftField, string>();
    for (const issue of result.issues) if (!map.has(issue.field)) map.set(issue.field, issue.message);
    return map;
  }, [result]);

  const ctx: FormCtx = {
    draft,
    update: (field, value) => setDraft((d) => ({ ...d, [field]: value })),
    touch: (field) => setTouched((t) => new Set(t).add(field)),
    errorOf: (field) => (showAll || touched.has(field) ? firstError.get(field) : undefined),
  };

  const ok = result.issues.length === 0;
  const links = githubLinks(repo, result.slug, result.text, draft.name);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
      <form
        noValidate
        className="min-w-0 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setShowAll(true);
        }}
      >
        <BasicsSection ctx={ctx} />
        <ClassifySection ctx={ctx} />
        <CreditSection ctx={ctx} />
        <WriteupSection ctx={ctx} />
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Check my entry
          </button>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {ok ? "Looks good. Use the button on the right to open a pull request." : showAll ? `${result.issues.length} thing(s) to fix.` : ""}
          </p>
        </div>
      </form>
      <SubmitPreview slug={result.slug} text={result.text} ok={ok} issueCount={result.issues.length} links={links} onCheck={() => setShowAll(true)} />
    </div>
  );
}
